import { useState, useEffect } from 'react';

const FALLBACK = 'v0.14.0';
const GITHUB_API = 'https://api.github.com/repos/Vatteck/atlas/releases/latest';

interface CachedVersion {
  version: string;
  fetchedAt: number;
}

const CACHE_KEY = 'atlas_latest_version';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function readCache(): string | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedVersion = JSON.parse(raw);
    if (Date.now() - cached.fetchedAt > CACHE_TTL) return null;
    if (typeof cached.version !== 'string' || !cached.version.startsWith('v')) return null;
    return cached.version;
  } catch {
    return null;
  }
}

function writeCache(version: string) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ version, fetchedAt: Date.now() }));
  } catch { /* localStorage unavailable — no-op */ }
}

/**
 * Returns the latest Atlas release version, fetching from the GitHub releases API.
 * Falls back to localStorage cache, then a hardcoded default.
 */
export function useLatestVersion(): string {
  const cached = readCache();
  const [version, setVersion] = useState<string>(cached ?? FALLBACK);

  useEffect(() => {
    let cancelled = false;

    fetch(GITHUB_API)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        const tag = data?.tag_name;
        if (typeof tag === 'string' && tag.startsWith('v')) {
          setVersion(tag);
          writeCache(tag);
        }
      })
      .catch(() => {
        // API unavailable — keep cached/fallback; silently degrade
      });

    return () => { cancelled = true; };
  }, []);

  return version;
}
