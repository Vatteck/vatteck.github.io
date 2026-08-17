import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Terminal,
  Mail,
  ExternalLink,
  Gamepad2,
  ChevronRight,
  ImageOff,
  X,
  ArrowUp,
  CheckCircle2,
  Send,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  bioData,
  deepDiveData,
  projectsData,
  skillsData,
  benchSpecs,
  statusLabel,
  type ProjectItem,
  type ProjectMedia,
  type ProjectStatus
} from './config/portfolio';

const EMAIL = 'admin@vatteck.com';

const SECTIONS = [
  { id: 'work', label: 'Worklog' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

const statusColor: Record<ProjectStatus, string> = {
  released: 'bg-state-released',
  testing: 'bg-state-testing',
  building: 'bg-state-building'
};

const statusText: Record<ProjectStatus, string> = {
  released: 'text-state-released',
  testing: 'text-state-testing',
  building: 'text-state-building'
};

/* -------------------------------------------------------------------------- */
/* PCB backdrop — routed traces and silkscreen labels behind a section.        */
/* -------------------------------------------------------------------------- */

const TraceField = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 800 600"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <g stroke="#33333E" strokeWidth="1" vectorEffect="non-scaling-stroke">
      <path d="M40 520 H240 L280 480 V380 L320 340 H520 L560 300 V180 L600 140 H760" />
      <path d="M40 60 H180 L220 100 V200 L260 240 H420 L460 280 V380 L500 420 H640" />
      <path d="M40 290 H120 L160 250 V150 L200 110 H420" />
      <path d="M760 560 V480 L720 440 H640" />
    </g>
    <g fill="#E7A15E" opacity="0.45">
      <circle cx="40" cy="520" r="4" />
      <circle cx="760" cy="140" r="4" />
      <circle cx="40" cy="60" r="4" />
      <circle cx="640" cy="420" r="4" />
      <circle cx="40" cy="290" r="4" />
      <circle cx="760" cy="560" r="4" />
    </g>
  </svg>
);

/* Silkscreen label — board text printed on the substrate. */
const Silkscreen = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={`pointer-events-none select-none font-mono text-[9px] uppercase tracking-[0.35em] text-white/[0.06] ${className ?? ''}`}
    aria-hidden="true"
  >
    {children}
  </span>
);

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({
  index,
  kicker,
  title,
  lead,
  size = 'md'
}: {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  size?: 'md' | 'lg';
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45 }}
    className="relative mb-10"
  >
    <span className="ghost-num" aria-hidden="true">
      {index}
    </span>
    <div className="relative mb-3 flex items-center gap-3">
      <span className="pad" aria-hidden="true" />
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-substrate-accent">
        {index} / {kicker}
      </span>
      <span className="rule-fade h-px flex-grow" />
    </div>
    <h2
      className={`relative font-bold tracking-tight text-slate-50 ${
        size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
      }`}
    >
      {title}
    </h2>
    {lead && <p className="relative mt-3 max-w-2xl leading-relaxed text-slate-400">{lead}</p>}
  </motion.div>
);

const StatusMark = ({ status, version }: { status: ProjectStatus; version?: string }) => (
  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
    <span className={`status-led ${statusColor[status]}`} aria-hidden="true" />
    <span className={statusText[status]}>{statusLabel[status]}</span>
    {version && <span className="text-slate-500">{version}</span>}
  </span>
);

const MediaFrame = ({
  media,
  title,
  fill = false
}: {
  media?: ProjectMedia;
  title: string;
  fill?: boolean;
}) => {
  // A capture that 404s falls back to the same panel as no capture at all, so a
  // missing file degrades quietly instead of showing a broken image.
  const [failed, setFailed] = useState(false);

  if (!media || failed) {
    return (
      <div
        className={`project-media project-media-empty ${fill ? 'fill' : ''}`}
        data-kind="wide"
      >
        <ImageOff size={22} className="text-slate-700" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
          No build capture yet
        </span>
        <span className="sr-only">{title} has no screenshot available.</span>
      </div>
    );
  }

  return (
    <div className={`project-media ${fill ? 'fill' : ''}`} data-kind={media.kind}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Project card + detail dialog                                                */
/* -------------------------------------------------------------------------- */

const ProjectDialog = ({
  project,
  index,
  onClose
}: {
  project: ProjectItem;
  index: number;
  onClose: () => void;
}) => {
  const dialogId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const href = project.siteUrl?.startsWith('http')
    ? project.siteUrl
    : `https://${project.siteUrl}`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.97, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-hardware-border bg-hardware-card shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogId}
      >
        <div className="flex items-start justify-between gap-6 border-b border-hardware-border p-6 sm:p-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                REC {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-3 w-px bg-hardware-border" aria-hidden="true" />
              <StatusMark status={project.status} version={project.version} />
            </div>
            <h2 id={dialogId} className="mt-2 text-2xl font-bold text-slate-50">
              {project.title}
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-400">
              {project.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={`Close ${project.title} details`}
            autoFocus
          >
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar max-h-[55vh] overflow-y-auto p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">
                Specification
              </h3>
              <dl>
                {project.specs.map((spec) => (
                  <div key={spec.label} className="spec-row">
                    <dt className="shrink-0 text-xs uppercase tracking-wide text-slate-500">
                      {spec.label}
                    </dt>
                    <dd className="text-right font-mono text-xs text-slate-200">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">
                What's in it
              </h3>
              <ul className="space-y-2.5">
                {project.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <ChevronRight
                      size={14}
                      className="mt-1 shrink-0 text-substrate-accent"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">
                Screens
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {project.gallery.map((shot) => (
                  <div
                    key={shot.src}
                    className="overflow-hidden rounded-lg border border-hardware-border bg-hardware-raised"
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      decoding="async"
                      // Phone captures keep a tall frame; cropping them to 4:3
                      // from the top would show only the status bar.
                      className={`w-full object-cover object-top ${
                        shot.kind === 'phone' ? 'aspect-[9/16]' : 'aspect-[4/3]'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {project.siteUrl && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-substrate-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-substrate-accent/85"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Visit project
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-hardware-border bg-hardware-raised px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-substrate-accent/50"
              >
                <Github size={16} aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  index,
  featured = false
}: {
  project: ProjectItem;
  index: number;
  featured?: boolean;
  key?: React.Key;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const href = project.siteUrl?.startsWith('http')
    ? project.siteUrl
    : `https://${project.siteUrl}`;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.06 }}
        className={`record-card ${featured ? 'featured' : ''}`}
      >
        <div className="record-header">
          <span className="flex items-center gap-2">
            <project.icon size={12} className="text-substrate-accent" aria-hidden="true" />
            <span>REC {String(index + 1).padStart(2, '0')}</span>
          </span>
          <StatusMark status={project.status} version={project.version} />
        </div>

        <MediaFrame media={project.media} title={project.title} fill={featured} />

        <div className="flex flex-grow flex-col p-6">
          <h3 className="text-lg font-bold text-slate-50">{project.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {featured && project.specs.length > 0 && (
            <div className="mt-auto pt-6">
              <p className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500">
                <span className="via" aria-hidden="true" />
                Specification
              </p>
              <dl>
                {project.specs.map((spec) => (
                  <div key={spec.label} className="spec-row">
                    <dt className="text-[10px] uppercase tracking-wide text-slate-400">
                      {spec.label}
                    </dt>
                    <dd className="text-right font-mono text-xs text-slate-100">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4 border-t border-hardware-line pt-4">
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs font-semibold text-slate-300 transition-colors hover:text-white"
            >
              Details
            </button>
            <span className="h-3 w-px bg-hardware-border" aria-hidden="true" />
            {project.siteUrl && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-substrate-accent transition-colors hover:text-substrate-soft"
              >
                Visit
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
              >
                <Github size={13} aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen && (
          <ProjectDialog
            project={project}
            index={index}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Signal trace divider — draws itself on scroll, fault spike last             */
/* -------------------------------------------------------------------------- */

const TraceDivider = () => (
  <div className="trace-strip px-5 sm:px-8" aria-hidden="true">
    <svg
      viewBox="0 0 1200 30"
      preserveAspectRatio="none"
      className="trace"
      focusable="false"
    >
      <motion.path
        d="M0 15 H280 L300 7 L310 23 L320 15 H560 L580 9 L590 21 L600 15 H850 L870 4 L885 26 L895 15 H1090 V25 H1150"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <motion.path
        className="fault"
        d="M850 15 L870 4 L885 26 L895 15"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 1, duration: 0.35 }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 1.15, duration: 0.3 }}
      >
        <circle cx="8" cy="15" r="5" fill="none" stroke="rgba(231, 161, 94, 0.4)" />
        <circle cx="8" cy="15" r="2" fill="rgba(231, 161, 94, 0.6)" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 1.25, duration: 0.3 }}
      >
        <circle cx="1150" cy="25" r="5" fill="none" stroke="rgba(231, 161, 94, 0.4)" />
        <circle cx="1150" cy="25" r="2" fill="rgba(231, 161, 94, 0.6)" />
      </motion.g>
    </svg>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Hero — scope readout panel                                                  */
/* -------------------------------------------------------------------------- */

/* Live oscilloscope display: graticule + scrolling phosphor trace + sweep. */
const SCOPE_W = 600;
const SCOPE_H = 150;

const buildTracePoints = (t: number, maxX: number): string => {
  const step = 6;
  const pts: string[] = [];
  const scroll = t * 90;
  // Occasional fault spike: a narrow burst that rides along with the trace.
  const burst = Math.pow(Math.max(0, Math.sin(t * 0.35)), 26);
  for (let x = 0; x <= maxX; x += step) {
    const phase = (x + scroll) * 0.026;
    const spike = burst * 16 * Math.exp(-Math.pow(((x + scroll) % 480) - 300, 2) / 22);
    // Tiny deterministic jitter so the signal feels sampled, not drawn.
    const jitter = Math.sin(x * 12.9898) * 0.7;
    // Integer harmonics: a mains-ish sine with a soft 3rd and 5th — reads as a
    // real (slightly distorted) signal, not an arbitrary squiggle.
    const y =
      75 +
      Math.sin(phase) * 24 +
      Math.sin(phase * 3) * 8 +
      Math.sin(phase * 5) * 4 +
      spike +
      jitter;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return pts.join(' ');
};

const ScopeDisplay = () => {
  const traceRef = useRef<SVGPolylineElement>(null);
  const glowRef = useRef<SVGPolylineElement>(null);
  const cursorRef = useRef<SVGGElement>(null);
  const [staticTrace] = useState(() => buildTracePoints(0, SCOPE_W));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      const sweepX = Math.min(((t * 0.2) % 1.0) * SCOPE_W, SCOPE_W - 4);
      const pts = buildTracePoints(t, sweepX);
      traceRef.current?.setAttribute('points', pts);
      glowRef.current?.setAttribute('points', pts);
      cursorRef.current?.setAttribute('transform', `translate(${sweepX.toFixed(1)}, 0)`);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="scope-screen">
      <svg
        viewBox={`0 0 ${SCOPE_W} ${SCOPE_H}`}
        preserveAspectRatio="none"
        focusable="false"
        aria-hidden="true"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`v${i}`}
            className="scope-graticule-minor"
            x1={(i + 1) * 60}
            y1={0}
            x2={(i + 1) * 60}
            y2={SCOPE_H}
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`h${i}`}
            className="scope-graticule-minor"
            x1={0}
            y1={(i + 1) * 15}
            x2={SCOPE_W}
            y2={(i + 1) * 15}
          />
        ))}
        {[120, 240, 360, 480].map((x) => (
          <line key={`vm${x}`} className="scope-graticule-major" x1={x} y1={0} x2={x} y2={SCOPE_H} />
        ))}
        {[30, 60, 90, 120].map((y) => (
          <line key={`hm${y}`} className="scope-graticule-major" x1={0} y1={y} x2={SCOPE_W} y2={y} />
        ))}
        <line className="scope-centerline" x1={0} y1={75} x2={SCOPE_W} y2={75} />
        <polyline ref={glowRef} className="scope-trace-glow" points={staticTrace} />
        <polyline ref={traceRef} className="scope-trace" points={staticTrace} />
        <g ref={cursorRef as React.RefObject<SVGGElement>} transform={`translate(${SCOPE_W - 4}, 0)`}>
          <line className="scope-sweep-cursor" x1={0} y1={0} x2={0} y2={SCOPE_H} />
          <path className="scope-cursor-mark" d="M-4.5 0 H4.5 L0 7 Z" />
        </g>
      </svg>
      <span className="scope-label left-2.5 top-2">
        <b>CH1</b> · 500mV/DIV
      </span>
      <span className="scope-label right-2.5 top-2">
        20ms/DIV · <b>1.00 MS/s</b>
      </span>
      <span className="scope-label bottom-2 left-2.5">
        TRIG ▸ <b>AUTO</b>
      </span>
      <span className="scope-label bottom-2 right-2.5">
        NET: <b>MAIN</b>
      </span>
    </div>
  );
};

const ScopePanel = () => (
  <div className="bench-panel">
    <span className="corner-tick tl" aria-hidden="true" />
    <span className="corner-tick tr" aria-hidden="true" />
    <span className="corner-tick bl" aria-hidden="true" />
    <span className="corner-tick br" aria-hidden="true" />

    <div className="flex items-center justify-between gap-4 border-b border-hardware-border px-5 py-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">
          Bench readout
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-50">Current builds</h2>
      </div>
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-state-released">
        <span className="status-led pulse bg-state-released" aria-hidden="true" />
        Live
      </span>
    </div>

    <ScopeDisplay />

    <div>
      {projectsData.map((project) => {
        const href = project.siteUrl?.startsWith('http')
          ? project.siteUrl
          : `https://${project.siteUrl}`;
        return (
          <a
            key={project.title}
            href={href}
            className="bench-row group"
            aria-label={`Open ${project.title}`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <project.icon
                size={16}
                className="shrink-0 text-substrate-accent"
                aria-hidden="true"
              />
              <span className="truncate text-sm font-medium text-slate-100">
                {project.title}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="hidden sm:inline">
                <StatusMark status={project.status} version={project.version} />
              </span>
              <ChevronRight
                size={15}
                className="text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-substrate-accent"
                aria-hidden="true"
              />
            </span>
          </a>
        );
      })}
    </div>

    <div className="flex items-center justify-between gap-4 border-t border-hardware-border bg-hardware-raised/60 px-5 py-3 font-mono text-[9px] uppercase tracking-widest text-slate-500">
      <span className="flex items-center gap-2">
        <span className="via" aria-hidden="true" />
        Load: {projectsData.length} units
      </span>
      <span className="text-state-released">State: operational</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Hero telemetry strip — status, bench load, live uptime                      */
/* -------------------------------------------------------------------------- */

const TelemetryStrip = () => {
  const [uptime, setUptime] = useState('00:00:00');
  const [utc, setUtc] = useState('--:--:--');

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const total = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(total / 3600)).padStart(2, '0');
      const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
      const s = String(total % 60).padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
      setUtc(new Date().toISOString().slice(11, 19));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="telemetry">
      <span className="flex items-center gap-2">
        <span className="status-led bg-state-released" aria-hidden="true" />
        <span className="text-slate-400">Status:</span>
        <span className="font-semibold text-state-released">Open for work</span>
      </span>
      <span className="sep" aria-hidden="true" />
      <span>
        <span className="text-slate-400">Units on bench:</span>{' '}
        <span className="text-slate-100">{projectsData.length}</span>
      </span>
      <span className="sep" aria-hidden="true" />
      <span className="hidden sm:inline">
        <span className="text-slate-400">Uptime:</span>{' '}
        <span className="text-slate-100">{uptime}</span>
        <span className="blink ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-substrate-accent/70" aria-hidden="true" />
      </span>
      <span className="sep" aria-hidden="true" />
      <span className="hidden lg:inline" aria-live="off">
        <span className="text-slate-400">UTC:</span>{' '}
        <span className="text-slate-100 tabular-nums">{utc}</span>
      </span>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Terminal easter egg                                                         */
/* -------------------------------------------------------------------------- */

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'VATTECK_DIAG v1.0.4',
    'Type "help" for commands...'
  ]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (cmd === '') return;
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const responses: Record<string, string> = {
      help: 'Commands: help, about, status, clear, whoami, uname, root',
      about: 'Hardware technician. Independent developer. Ships things.',
      status: 'Operational. Four units on the bench — two released, two in build.',
      whoami: 'guest@vatteck — read-only',
      uname: 'CachyOS x86_64 · linux-cachyos',
      root: 'Access denied. Insufficient privileges.'
    };

    setHistory((prev) => [
      ...prev,
      `> ${input}`,
      responses[cmd] ?? `Command not found: ${cmd}`
    ]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-[60] rounded-full border border-hardware-border bg-hardware-card p-2.5 text-slate-500 transition-colors hover:border-substrate-accent/40 hover:text-substrate-accent"
        title="Open diagnostic console"
        aria-label="Open diagnostic console easter egg"
        aria-expanded={isOpen}
      >
        <Terminal size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 left-6 z-[70] flex h-80 w-[min(20rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-xl border border-hardware-border bg-black/95 shadow-2xl backdrop-blur-xl"
            role="dialog"
            aria-label="Diagnostic console"
          >
            <div className="flex items-center justify-between border-b border-hardware-border px-3 py-2">
              <span className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest text-substrate-accent">
                <span className="status-led bg-state-released" aria-hidden="true" />
                VATTECK_DIAG
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white"
                aria-label="Close diagnostic console"
              >
                <X size={13} />
              </button>
            </div>
            <div
              ref={logRef}
              className="custom-scrollbar flex-grow space-y-1 overflow-y-auto p-3 font-mono text-[11px]"
            >
              {history.map((line, i) => (
                <p
                  key={i}
                  className={line.startsWith('>') ? 'text-substrate-accent' : 'text-slate-400'}
                >
                  {line}
                </p>
              ))}
            </div>
            <form
              onSubmit={handleCommand}
              className="flex items-center gap-2 border-t border-hardware-border p-3"
            >
              <span className="font-mono text-[11px] text-substrate-accent">{'>'}</span>
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Terminal command"
                className="w-full border-none bg-transparent font-mono text-[11px] text-white outline-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* Junction points for the capabilities routing — where traces land on panels.
   Edge x/y were measured against the rendered grid (panel edges at vb 24/976,
   middle pins at vb y≈135/397 at lg widths). Only visible junctions carry
   vias — anything behind an opaque card is pointless. */
const CAP_JUNCTIONS: [number, number][] = [
  // Panel-edge landings where margin traces meet the card borders.
  [24, 135], [24, 397], [976, 135], [976, 397],
  // Row-gap T-junctions where the feed ticks join the horizontal net.
  [160, 255], [840, 255],
  // Backbone crossing + spine terminations at the board edges.
  [500, 255], [500, 10], [500, 490],
  // Lateral taps from the spine into the cards' inner edges (mid-pin height).
  [493, 135], [507, 135], [493, 397], [507, 397]
];

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  // Scroll progress — a 2px position readout pinned to the top edge.
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav item for whichever section is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = `[Contact] ${formData.subject || 'New message'}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setIsSent(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSent(false), 6000);
  };

  const [leadProject, ...restProjects] = projectsData;

  return (
    <div className="min-h-screen">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progressScaleX }}
        aria-hidden="true"
      />
      <TerminalEasterEgg />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[60] rounded-full border border-hardware-border bg-hardware-card p-2.5 text-slate-400 transition-colors hover:border-substrate-accent/40 hover:text-substrate-accent"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Nav — device status bar */}
      <nav
        className="sticky top-0 z-50 border-b border-hardware-border bg-hardware-bg/85 backdrop-blur-lg"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-10">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white sm:tracking-[0.22em]"
            aria-label="Vatteck — back to top"
          >
            <span className="via" aria-hidden="true" />
            VATTECK<span className="text-substrate-accent">-01</span>
          </a>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wide sm:gap-7 sm:text-xs sm:tracking-widest">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`transition-colors hover:text-white ${
                  activeSection === id
                    ? 'text-substrate-accent underline decoration-substrate-accent/60 decoration-1 underline-offset-[6px]'
                    : 'text-slate-400'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex" aria-hidden="true">
            <span className="status-led pulse bg-state-released" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
              Operational
            </span>
          </div>
        </div>
      </nav>

      {/* Hero — diagnostic summary */}
      <header className="relative overflow-hidden px-5 sm:px-10">
        {/* Routed backdrop: traces + silkscreen, purely structural. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Silkscreen className="absolute right-[7%] top-28 hidden lg:block">NET: MAIN</Silkscreen>
          <Silkscreen className="absolute bottom-32 left-[3%] hidden lg:block">
            VATTECK-01 · REV C
          </Silkscreen>
          <Silkscreen className="absolute right-[3%] bottom-24 hidden xl:block">U1 · OPERATOR</Silkscreen>
          <TraceField className="absolute -right-28 top-14 hidden w-[540px] opacity-70 lg:block" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-start gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-substrate-accent sm:text-xs">
              <span className="pad" aria-hidden="true" />
              <span>U1</span>
              <span className="text-slate-600">·</span>
              <span>Hardware technician · independent developer</span>
            </p>
            <h1 className="max-w-3xl font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-50 sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]">
              I repair hardware and build software that{' '}
              <em className="italic">ships</em>
              <span className="text-substrate-accent">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
              Component-level diagnostics, tuned Linux and Android systems, and
              independently built apps and games — from first fault or first commit
              through release.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-substrate-accent px-6 py-3.5 font-semibold text-white shadow-[0_8px_24px_-8px_rgba(255,42,38,0.55)] transition-all hover:-translate-y-0.5 hover:bg-substrate-accent/90 hover:shadow-[0_12px_32px_-8px_rgba(255,42,38,0.7)]"
              >
                View the work
                <ChevronRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-slate-600/50 bg-hardware-card px-6 py-3.5 font-semibold text-slate-100 transition-all hover:-translate-y-0.5 hover:border-substrate-accent/60 hover:bg-white/[0.03]"
              >
                Start a conversation
              </a>
            </div>

            <div className="mt-8">
              <TelemetryStrip />
            </div>

            <a
              href="https://github.com/Vatteck"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-slate-400 transition-colors hover:text-white"
            >
              <Github size={14} aria-hidden="true" />
              github.com/Vatteck
              <ExternalLink size={11} className="text-slate-600" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <ScopePanel />
          </motion.div>
        </div>
      </header>

      <TraceDivider />

      {/* Work — the worklog, first because it is the point of the page */}
      <section id="work" className="relative px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            index="01"
            kicker="Worklog"
            title="Four things on the bench"
            size="lg"
            lead="A package manager, two games, and a simulator — all shipped or shipping solo. Open any one for the specification."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-3">
              <ProjectCard project={leadProject} index={0} featured />
            </div>
            {restProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <TraceDivider />

      {/* Capabilities — routed like traces between ICs */}
      <section id="capabilities" className="relative px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader index="02" kicker="Capabilities" title="What I'm hired for" />
          <div className="relative">
            {/* Routing between panels — hidden on small screens where it's noise.
                Traces enter from the page margins (visible), run through the
                row/column gaps, and land on vias at the panel edges. */}
            <svg
              className="pointer-events-none absolute -inset-x-8 hidden h-full w-[calc(100%+4rem)] lg:block"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <g stroke="rgba(231, 161, 94, 0.65)" strokeWidth="2" vectorEffect="non-scaling-stroke">
                <path d="M0 135 H160 V255 H500" />
                <path d="M1000 135 H840 V255 H500" />
                <path d="M0 397 H160 V255" />
                <path d="M1000 397 H840 V255" />
                <path d="M500 10 V490" />
                {/* Lateral taps from the spine into the cards' inner edges. */}
                <path d="M493 135 H507" />
                <path d="M493 397 H507" />
              </g>
              {CAP_JUNCTIONS.map(([cx, cy]) => {
                const isJunction = cx === 500 && cy === 255;
                const isInnerTap = cx === 493 || cx === 507;
                return (
                  <g key={`${cx}-${cy}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isJunction ? 9 : isInnerTap ? 8 : 7}
                      fill="none"
                      stroke="#E7A15E"
                      strokeOpacity={isJunction ? 0.65 : isInnerTap ? 0.6 : 0.5}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isJunction ? 4.5 : 3}
                      fill="#E7A15E"
                      fillOpacity={isJunction ? 1 : 0.9}
                    />
                  </g>
                );
              })}
            </svg>

            <div className="relative grid gap-5 md:grid-cols-2">
              {deepDiveData.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: Math.min(idx, 3) * 0.06 }}
                  className="panel relative p-6 transition-colors hover:border-substrate-accent/30"
                >
                  {/* Pin rail — the IC's legs, waiting for a routed trace.
                      Right-column ICs mirror their pins to the outboard edge. */}
                  <div
                    className={idx % 2 === 1 ? 'ic-pins ic-pins--right' : 'ic-pins'}
                    aria-hidden="true"
                  >
                    <span className="ic-pin" />
                    <span className="ic-pin" />
                    <span className="ic-pin" />
                  </div>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-substrate-accent/20 bg-substrate-accent/10 text-substrate-accent">
                      <item.icon size={19} />
                    </div>
                    <span className="designator-chip" aria-hidden="true">
                      U{idx + 2} · {item.code}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-50">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
              <span className="via" aria-hidden="true" />
              Toolkit inventory
            </p>
            <div className="overflow-hidden rounded-xl border border-hardware-border bg-hardware-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hardware-border bg-hardware-raised font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
                    <th className="w-16 px-4 py-1.5 text-left font-medium">Qty</th>
                    <th className="w-28 px-4 py-1.5 text-left font-medium">Ref</th>
                    <th className="px-4 py-1.5 text-left font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {skillsData.map((skill, i) => (
                    <tr
                      key={skill.label}
                      className="border-b border-hardware-line transition-colors last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <td className="w-16 px-4 py-1.5 font-mono text-xs text-slate-600">1</td>
                      <td className="w-28 px-4 py-1.5 font-mono text-xs text-slate-400">R{i + 10}</td>
                      <td className="px-4 py-1.5">
                        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                          <skill.icon size={14} className="text-substrate-accent" aria-hidden="true" />
                          {skill.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <TraceDivider />

      {/* About */}
      <section id="about" className="relative px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader index="03" kicker="About" title="Hardware soul, software mind" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-[15px] leading-relaxed text-slate-400">
              {bioData.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-2xl border border-hardware-border bg-hardware-card">
                <span className="corner-tick tl" aria-hidden="true" />
                <span className="corner-tick tr" aria-hidden="true" />
                <span className="corner-tick bl" aria-hidden="true" />
                <span className="corner-tick br" aria-hidden="true" />
                <Silkscreen className="absolute left-3 top-3">Side A</Silkscreen>
                <Silkscreen className="absolute bottom-3 right-3">Rev C</Silkscreen>
                <img
                  src="/vatteck-profile.jpg"
                  alt="Portrait illustration of Vatteck"
                  width="460"
                  height="460"
                  className="aspect-square w-full bg-hardware-raised object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/vatteck-logo.svg';
                  }}
                />
              </div>

              <div className="panel p-5">
                <p className="mb-3 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">
                  <span className="pad" aria-hidden="true" />
                  System report
                </p>
                <dl>
                  {benchSpecs.map((spec) => (
                    <div key={spec.label} className="spec-row">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">
                        {spec.label}
                      </dt>
                      <dd className="font-mono text-xs text-slate-200">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TraceDivider />

      {/* Contact */}
      <section id="contact" className="relative px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            index="04"
            kicker="Contact"
            title="Start a conversation"
            lead="Got a board that needs fixing, a kernel that needs tuning, or an idea that needs building? If it's technical and interesting, I want to hear about it."
          />

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="panel flex items-center gap-4 p-5 transition-colors hover:border-substrate-accent/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-substrate-accent/20 bg-substrate-accent/10 text-substrate-accent">
                  <Mail size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500">
                    Email
                  </span>
                  <span className="block truncate font-mono text-sm text-slate-200">
                    {EMAIL}
                  </span>
                </span>
              </a>

              <a
                href="https://github.com/Vatteck"
                target="_blank"
                rel="noopener noreferrer"
                className="panel flex items-center gap-4 p-5 transition-colors hover:border-substrate-accent/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-substrate-accent/20 bg-substrate-accent/10 text-substrate-accent">
                  <Github size={17} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500">
                    GitHub
                  </span>
                  <span className="block font-mono text-sm text-slate-200">@Vatteck</span>
                </span>
              </a>

              <div className="panel p-5">
                <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
                  <MessageSquare size={12} aria-hidden="true" />
                  What I take on
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Component-level repair and diagnostics, custom Android and kernel
                  configuration, and software commissions in Python, Flutter or Kotlin.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="panel space-y-4 p-6 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-slate-500"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className="field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-slate-500"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-slate-500"
                >
                  Subject <span className="text-slate-700">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="field"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-slate-500"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="field resize-none"
                />
              </div>

              <button
                type="submit"
                className={`flex w-full items-center justify-center gap-2.5 rounded-lg py-3.5 font-semibold transition-colors ${
                  isSent
                    ? 'bg-state-released text-black'
                    : 'bg-substrate-accent text-white hover:bg-substrate-accent/85'
                }`}
              >
                {isSent ? (
                  <>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    Draft opened in your mail app
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Open email draft
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-600" aria-live="polite">
                {isSent
                  ? 'Finish and send the message from your mail app.'
                  : `This composes a message to ${EMAIL} in your own mail app.`}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hardware-border px-5 py-10 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-white">
                VATTECK<span className="text-substrate-accent">-01</span>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-600">
                © {new Date().getFullYear()} Vatteck. Built with React and Tailwind.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <button
                onClick={copyEmail}
                className="text-slate-500 transition-colors hover:text-substrate-accent"
                aria-label={`Copy ${EMAIL}`}
              >
                {copied ? (
                  <CheckCircle2 size={17} className="text-state-released" />
                ) : (
                  <Mail size={17} />
                )}
              </button>
              <a
                href="https://github.com/Vatteck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-substrate-accent"
                aria-label="GitHub profile"
              >
                <Github size={17} />
              </a>
              <a
                href="https://steamcommunity.com/id/vatteck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-substrate-accent"
                aria-label="Steam profile"
              >
                <Gamepad2 size={17} />
              </a>
            </div>
          </div>

          {/* Board silkscreen: the frame closes with the same serial as the hero. */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="via" aria-hidden="true" />
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">
              VATTECK-01 · REV C · NET: MAIN
            </span>
            <span className="via" aria-hidden="true" />
          </div>

          {/* The record terminates here. */}
          <div className="end-rail mt-8">
            <span className="via" aria-hidden="true" />
            <span className="line" aria-hidden="true" />
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600">
              // End of record
            </span>
            <span className="line" aria-hidden="true" />
            <span className="via" aria-hidden="true" />
          </div>
        </div>
      </footer>
    </div>
  );
}
