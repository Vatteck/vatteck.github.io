#!/usr/bin/env node
/**
 * Build-time prerender: snapshots the SPA routes into real HTML so any
 * crawler (JS-less or not) sees full page content in the raw response.
 *
 * Runs after `vite build` (npm postbuild hook). Loads each route in headless
 * Chrome against a local static server of dist/, waits for React to render,
 * then overwrites dist/<route>/index.html with the rendered DOM.
 *
 * Environment:
 *   CHROME_PATH  - explicit Chrome/Chromium binary (CI sets this)
 *   PRERENDER_PORT - optional fixed port (default: ephemeral)
 */
import { createServer } from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize, sep } from "node:path";
import puppeteer from "puppeteer-core";

const DIST = new URL("../dist/", import.meta.url).pathname;
const ROUTES = ["/", "/atlas/"];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let rel = decodeURIComponent(url.pathname);
      if (rel.endsWith("/")) rel += "index.html";
      if (rel === "/") rel = "/index.html";
      const file = normalize(join(DIST, rel));
      if (!file.startsWith(DIST) || !existsSync(file)) {
        res.writeHead(404).end("not found");
        return;
      }
      const data = await readFile(file);
      res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
      res.end(data);
    } catch (err) {
      res.writeHead(500).end(String(err));
    }
  });
  return new Promise((resolve) => {
    server.listen(Number(process.env.PRERENDER_PORT) || 0, "127.0.0.1", () =>
      resolve({ server, port: server.address().port }),
    );
  });
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const hit = candidates.find((c) => existsSync(c));
  if (!hit) throw new Error("No Chrome/Chromium found. Set CHROME_PATH.");
  return hit;
}

async function main() {
  const { server, port } = await startServer();
  const chrome = findChrome();
  console.log(`[prerender] chrome: ${chrome}`);

  const args = ["--disable-dev-shm-usage"];
  // GitHub Actions / docker run as root: Chrome sandbox needs dropping.
  if (typeof process.getuid === "function" && process.getuid() === 0) args.push("--no-sandbox");

  const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  for (const route of ROUTES) {
    const url = `http://127.0.0.1:${port}${route}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForSelector("#root > *", { timeout: 15000 });
    // Let the clock tick once and lazy effects settle.
    await new Promise((r) => setTimeout(r, 800));

    const snapshot = await page.evaluate(() => {
      const root = document.querySelector("#root");
      if (!root || !root.firstElementChild) throw new Error("React never mounted");
      const words = (document.body.innerText || "").trim().split(/\s+/).filter(Boolean).length;
      if (words < 150) throw new Error(`Suspiciously thin render: ${words} words`);
      return { html: "<!DOCTYPE html>\n" + document.documentElement.outerHTML, words };
    });

    const out = join(DIST, route === "/" ? "index.html" : "atlas/index.html");
    await writeFile(out, snapshot.html, "utf-8");
    console.log(`[prerender] ${route} -> ${snapshot.words} words`);
  }

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error("[prerender] FAILED:", err.message);
  process.exit(1);
});
