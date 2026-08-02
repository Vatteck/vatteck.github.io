import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { motion, AnimatePresence } from 'motion/react';
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
  { id: 'work', label: 'Work' },
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
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({
  kicker,
  title,
  lead,
  size = 'md'
}: {
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
    className="mb-10"
  >
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-6 bg-substrate-accent" />
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-substrate-accent">
        {kicker}
      </span>
      <span className="rule-fade h-px flex-grow" />
    </div>
    <h2
      className={`font-bold tracking-tight text-slate-50 ${
        size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
      }`}
    >
      {title}
    </h2>
    {lead && <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">{lead}</p>}
  </motion.div>
);

const StatusMark = ({ status, version }: { status: ProjectStatus; version?: string }) => (
  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
    <span className={`status-dot ${statusColor[status]}`} aria-hidden="true" />
    <span className={statusText[status]}>{statusLabel[status]}</span>
    {version && <span className="text-slate-600">{version}</span>}
  </span>
);

const MediaFrame = ({ media, title }: { media?: ProjectMedia; title: string }) => {
  // A capture that 404s falls back to the same panel as no capture at all, so a
  // missing file degrades quietly instead of showing a broken image.
  const [failed, setFailed] = useState(false);

  if (!media || failed) {
    return (
      <div className="project-media project-media-empty" data-kind="wide">
        <ImageOff size={22} className="text-slate-700" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
          No build capture yet
        </span>
        <span className="sr-only">{title} has no screenshot available.</span>
      </div>
    );
  }

  return (
    <div className="project-media" data-kind={media.kind}>
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
  onClose
}: {
  project: ProjectItem;
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
            <StatusMark status={project.status} version={project.version} />
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
  index
}: {
  project: ProjectItem;
  index: number;
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
        className="project-card"
      >
        <MediaFrame media={project.media} title={project.title} />

        <div className="flex flex-grow flex-col p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <project.icon size={18} className="text-substrate-accent" aria-hidden="true" />
            <StatusMark status={project.status} version={project.version} />
          </div>

          <h3 className="text-lg font-bold text-slate-50">{project.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

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
                className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-white"
              >
                <Github size={13} aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen && <ProjectDialog project={project} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Hero bench index                                                            */
/* -------------------------------------------------------------------------- */

const ProjectBenchIndex = () => (
  <div className="bench-index">
    <div className="flex items-center justify-between gap-4 border-b border-hardware-border px-5 py-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">
          Workbench index
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-50">Current builds</h2>
      </div>
      <span
        className="h-2 w-2 rounded-full bg-state-released shadow-[0_0_12px_rgba(52,211,153,0.8)]"
        aria-hidden="true"
      />
    </div>
    <div>
      {projectsData.map((project) => {
        const href = project.siteUrl?.startsWith('http')
          ? project.siteUrl
          : `https://${project.siteUrl}`;
        return (
          <a
            key={project.title}
            href={href}
            className="bench-index-row group"
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
  </div>
);

/* -------------------------------------------------------------------------- */
/* Terminal easter egg                                                         */
/* -------------------------------------------------------------------------- */

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'VATTECK OS v1.0.4',
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
      help: 'Commands: help, about, clear, whoami, uname, root',
      about: 'Hardware technician. Independent developer. Ships things.',
      whoami: 'guest@vatteck — read-only',
      uname: 'CachyOS x86_64 · linux-cachyos-bore',
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
        title="Open terminal"
        aria-label="Open terminal easter egg"
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
            aria-label="Terminal"
          >
            <div className="flex items-center justify-between border-b border-hardware-border px-3 py-2">
              <span className="font-mono text-[10px] font-semibold tracking-widest text-substrate-accent">
                VATTECK_TERMINAL
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white"
                aria-label="Close terminal"
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

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isGlitched, setIsGlitched] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const triggerGlitch = useCallback(() => {
    setIsGlitched(true);
    setTimeout(() => setIsGlitched(false), 480);
  }, []);

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

  return (
    <div className="noise-bg min-h-screen selection:bg-substrate-accent/30">
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

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b border-hardware-border bg-hardware-bg/80 backdrop-blur-lg"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <button
            type="button"
            onClick={triggerGlitch}
            className={`glitch-main shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs sm:tracking-[0.28em] ${
              isGlitched ? 'is-active' : ''
            }`}
            data-text="VATTECK"
            aria-label="Vatteck — activate wordmark glitch"
          >
            VATTECK<span className="text-substrate-accent">.</span>
          </button>
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wide sm:gap-7 sm:text-[10px] sm:tracking-widest">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`transition-colors hover:text-white ${
                  activeSection === id ? 'text-substrate-accent' : 'text-slate-500'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-hardware-border px-5 sm:px-8">
        <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-substrate-accent sm:text-xs">
              Hardware technician · independent developer
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl lg:text-[3.4rem]">
              I repair hardware and build software that ships.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
              Component-level diagnostics, tuned Linux and Android systems, and
              independently built apps and games — from first fault or first commit
              through release.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-substrate-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-substrate-accent/85"
              >
                View the work
                <ChevronRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-hardware-border bg-hardware-card px-6 py-3.5 font-semibold text-slate-100 transition-colors hover:border-substrate-accent/50"
              >
                Start a conversation
              </a>
            </div>

            <a
              href="https://github.com/Vatteck"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 font-mono text-xs text-slate-500 transition-colors hover:text-white"
            >
              <Github size={14} aria-hidden="true" />
              github.com/Vatteck
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <ProjectBenchIndex />
          </motion.div>
        </div>
      </header>

      {/* Work — first, because it is the point of the page */}
      <section id="work" className="border-b border-hardware-border px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="Work"
            title="Four things I'm building"
            size="lg"
            lead="A package manager, two games, and a simulator — all shipped or shipping solo. Open any one for the specification."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projectsData.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="border-b border-hardware-border px-5 py-20 sm:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader kicker="Capabilities" title="What I'm hired for" />
          <div className="grid gap-5 md:grid-cols-2">
            {deepDiveData.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: Math.min(idx, 3) * 0.06 }}
                className="panel p-6 transition-colors hover:border-substrate-accent/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-substrate-accent/20 bg-substrate-accent/10 text-substrate-accent">
                  <item.icon size={19} />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-50">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
              Toolkit
            </p>
            <div className="flex flex-wrap gap-2">
              {skillsData.map((skill) => (
                <span
                  key={skill.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-hardware-border bg-hardware-card px-3.5 py-2 text-sm text-slate-300 transition-colors hover:border-substrate-accent/30"
                >
                  <skill.icon size={14} className="text-substrate-accent" aria-hidden="true" />
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-hardware-border px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader kicker="About" title="Hardware soul, software mind" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-[15px] leading-relaxed text-slate-400">
              {bioData.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-5">
              <div className="overflow-hidden rounded-2xl border border-hardware-border bg-hardware-card">
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
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">
                  Daily driver
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

      {/* Contact */}
      <section id="contact" className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
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
      <footer className="border-t border-hardware-border px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-white">
              VATTECK<span className="text-substrate-accent">.</span>
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
      </footer>
    </div>
  );
}
