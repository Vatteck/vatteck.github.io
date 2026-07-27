import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Cpu, 
  Terminal, 
  Gamepad2, 
  Smartphone, 
  Mail, 
  ExternalLink, 
  Code2, 
  Wrench, 
  Layers,
  ChevronRight,
  Monitor,
  Info,
  X,
  ArrowUp,
  CheckCircle2,
  Send,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { bioData, deepDiveData, projectsData, skillsData } from './config/portfolio';

const DataStream = () => {
  const hexChars = "0123456789ABCDEF";
  const generateStream = (length: number) => {
    return Array.from({ length }, () => hexChars[Math.floor(Math.random() * hexChars.length)]).join("");
  };

  return (
    <>
      <div className="data-stream">
        {Array.from({ length: 20 }, () => generateStream(50)).join(" ")}
      </div>
      <div className="data-stream-left">
        {Array.from({ length: 20 }, () => generateStream(50)).join(" ")}
      </div>
    </>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "0123456789ABCDEF";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FF1F1F";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

const SystemStatus = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [cpuLoad, setCpuLoad] = useState(45);
  const [memAvail, setMemAvail] = useState(64.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setCpuLoad(Math.floor(Math.random() * 15) + 8);
      setMemAvail(prev => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-16 right-16 z-20 hidden lg:flex flex-col gap-2 font-mono text-[10px] text-slate-400 text-right bg-black/40 p-4 rounded-lg border border-substrate-accent/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-end gap-2">
        <span className="opacity-50">SYSTEM_TIME:</span>
        <span className="text-white">{time}</span>
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="opacity-50">CPU_LOAD:</span>
        <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${cpuLoad}%` }}
            className="h-full bg-substrate-accent"
          />
        </div>
        <span className="text-white w-6">{cpuLoad}%</span>
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="opacity-50">MEM_AVAIL:</span>
        <span className="text-white">{memAvail}GB</span>
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="opacity-50">STATUS:</span>
        <span className="text-emerald-500 animate-pulse">OPTIMAL</span>
      </div>
    </div>
  );
};

const LiveSystemLog = () => {
  const [logs, setLogs] = useState<{ time: string; msg: string; type: 'info' | 'warn' | 'error' | 'success' }[]>([]);
  const messages = [
    { msg: "INITIALIZING_SUBSTRATE_LAYERS...", type: 'info' },
    { msg: "KERNEL_MODULE_LOADED: VATTECK_CORE", type: 'success' },
    { msg: "SCANNING_HARDWARE_INTERFACES...", type: 'info' },
    { msg: "UPLINK_ESTABLISHED: PORT_8080", type: 'success' },
    { msg: "ENCRYPTING_DATA_STREAM: AES-256", type: 'warn' },
    { msg: "OPTIMIZING_THERMAL_PROFILES...", type: 'info' },
    { msg: "NEURAL_LINK_SYNC_READY", type: 'success' },
    { msg: "SILICON_DIAGNOSTICS_OPTIMAL", type: 'success' },
    { msg: "ARCH_LINUX_CACHYOS_DETECTED", type: 'info' },
    { msg: "ROOT_ACCESS_LEVEL_0_CONFIRMED", type: 'error' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const rawMsg = messages[Math.floor(Math.random() * messages.length)];
        const next = [...prev, { 
          time: new Date().toLocaleTimeString([], { hour12: false }), 
          ...rawMsg 
        }];
        if (next.length > 4) return next.slice(1);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-emerald-400';
      case 'warn': return 'text-amber-400';
      case 'error': return 'text-substrate-accent';
      default: return 'text-sky-400';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-16 w-full max-w-md mx-auto bg-black/40 border border-substrate-accent/20 rounded-lg p-4 font-mono text-[10px] overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-substrate-accent/30" />
      <div className="flex flex-col gap-1.5 min-h-[80px]">
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-slate-600">[{log.time}]</span>
            <span className={getTypeColor(log.type)}>{log.msg}</span>
          </motion.div>
        ))}
        {logs.length === 0 && <div className="text-slate-600 animate-pulse">ESTABLISHING_DATA_LINK...</div>}
      </div>
      <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center text-[8px] text-slate-500">
        <span>UPLINK_STATUS: ACTIVE</span>
        <span className="animate-pulse">● LIVE</span>
      </div>
    </motion.div>
  );
};

const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
  return (
    <div className="bg-[#0d1117] rounded-xl border border-hardware-border overflow-hidden font-mono text-xs my-6 shadow-2xl group relative">
      <div className="bg-[#161b22] px-4 py-2 border-b border-hardware-border flex justify-between items-center">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{language}</span>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-slate-300">
          {code.split('\n').map((line, i) => {
            const highlighted = line
              .replace(/(sudo|pacman|yay|git|cd|mkdir|rm|cp|mv|ls|cat|grep|sed|awk|chmod|chown|systemctl|journalctl|echo|export|alias)/g, '<span class="text-[#ff7b72]">$1</span>')
              .replace(/(-S|-Sy|-Syu|-R|-U|-Q|-F|-G|-h|--help|--version|--noconfirm)/g, '<span class="text-[#79c0ff]">$1</span>')
              .replace(/(".*?"|'.*?')/g, '<span class="text-[#a5d6ff]">$1</span>')
              .replace(/(#.*)/g, '<span class="text-[#8b949e]">$1</span>')
              .replace(/(https?:\/\/[^\s]+)/g, '<span class="text-[#a5d6ff] underline">$1</span>');
            
            return (
              <div key={i} className="flex gap-4">
                <span className="text-slate-600 w-4 text-right select-none">{i + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: highlighted }} />
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['VATTECK OS v1.0.4', 'Type "help" for commands...']);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = '';

    if (cmd === 'help') response = 'Commands: help, about, clear, whoami, root';
    else if (cmd === 'about') response = 'Substrate Architect. Hardware Soul. Software Mind.';
    else if (cmd === 'clear') { setHistory([]); setInput(''); return; }
    else if (cmd === 'whoami') response = 'User: Vatteck@Guest_Terminal';
    else if (cmd === 'root') response = 'Access Denied. Insufficient Privileges.';
    else if (cmd === '') return;
    else response = `Command not found: ${cmd}`;

    setHistory([...history, `> ${input}`, response]);
    setInput('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[60] p-3 bg-hardware-card border border-substrate-accent/30 text-substrate-accent rounded-full hover:bg-substrate-accent hover:text-white transition-all group"
        title="Open Terminal"
        aria-label="Open terminal easter egg"
      >
        <Terminal size={20} className="group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-8 z-[70] w-80 h-96 bg-black/90 border border-substrate-accent/50 rounded-xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terminal-title"
          >
            <div className="bg-substrate-accent/10 p-3 border-b border-substrate-accent/20 flex justify-between items-center">
              <span id="terminal-title" className="text-[10px] font-mono text-substrate-accent font-bold tracking-widest">VATTECK_TERMINAL</span>
              <button onClick={() => setIsOpen(false)} className="text-substrate-accent hover:text-white" aria-label="Close terminal"><X size={14} /></button>
            </div>
            <div className="flex-grow p-4 font-mono text-[10px] overflow-y-auto custom-scrollbar space-y-1">
              {history.map((line, i) => (
                <p key={i} className={line.startsWith('>') ? 'text-substrate-accent' : 'text-slate-300'}>{line}</p>
              ))}
            </div>
            <form onSubmit={handleCommand} className="p-3 bg-black/50 border-t border-substrate-accent/10 flex gap-2">
              <span className="text-substrate-accent font-mono text-[10px]">{'>'}</span>
              <input 
                autoFocus
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] font-mono text-white w-full"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionHeader = ({ title, subtitle, glitch }: { title: string; subtitle?: string; glitch?: boolean }) => (
  <div className="mb-12 relative">
    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-substrate-accent via-substrate-accent/50 to-transparent" />
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="h-px w-8 bg-substrate-accent" />
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-substrate-accent">{title}</h2>
        <div className="h-px flex-grow bg-gradient-to-r from-substrate-accent/30 to-transparent" />
      </div>
      {subtitle && (
        <h3 className={`text-4xl md:text-5xl font-bold tracking-tighter uppercase ${glitch ? 'glitch' : ''}`} data-text={subtitle}>
          {subtitle}<span className="text-substrate-accent">_</span>
        </h3>
      )}
    </motion.div>
  </div>
);

const CircuitLine = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path 
        d="M0 50 L40 50 L50 40 L60 50 L100 50" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="0.5"
        className="text-substrate-accent/20"
      />
      <circle cx="50" cy="40" r="1.5" className="fill-substrate-accent/40 animate-pulse" />
    </svg>
  </div>
);

const SkillPill = ({ icon: Icon, label }: { icon: any; label: string; key?: React.Key }) => (
  <motion.div 
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 31, 31, 0.1)' }}
    className="flex items-center gap-3 px-4 py-3 bg-hardware-card border border-hardware-border rounded-lg transition-colors"
  >
    <Icon size={18} className="text-substrate-accent" />
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

const ProjectCard = ({ 
  title, 
  description, 
  details,
  tags, 
  status,
  icon: Icon = Layers,
  repoUrl,
  siteUrl
}: { 
  title: string; 
  description: string; 
  details: string; 
  tags: string[]; 
  status?: string;
  icon?: any;
  repoUrl?: string;
  siteUrl?: string;
  key?: React.Key;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dialogId = `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  useEffect(() => {
    if (!isExpanded) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-hardware-card rounded-xl overflow-hidden flex flex-col cyber-card p-6"
    >
      <div className="cyber-corner cyber-corner-tl" />
      <div className="cyber-corner cyber-corner-tr" />
      <div className="cyber-corner cyber-corner-bl" />
      <div className="cyber-corner cyber-corner-br" />
      <div className="cyber-border-accent" />
      
      <div className="flex items-start justify-between mb-6">
        <div className="cyber-icon-box">
          <Icon size={32} className="text-substrate-accent relative z-10" />
        </div>
        <div className="flex flex-col items-end gap-2">
          {status && (
            <div className={`cyber-badge ${status === 'PLANNED' ? 'cyber-badge-planned' : ''}`}>
              {status}
            </div>
          )}
          {siteUrl && (
            <div className="text-[8px] font-mono text-substrate-accent animate-pulse">
              LIVE_DEPLOYMENT_ACTIVE
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <h4 className="text-xl font-bold mb-2 group-hover:text-substrate-accent transition-colors group-hover:uv-glow">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300 uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between border-t border-hardware-border pt-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2 text-xs font-mono text-substrate-accent hover:text-white transition-colors group/btn"
              >
                <Info size={14} />
                DETAILS
              </button>

              {siteUrl && (
                <a 
                  href={siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`View Live Deployment of ${title}`}
                  className="flex items-center gap-2 text-xs font-mono text-substrate-accent hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                  LIVE
                </a>
              )}
            </div>

            {repoUrl && (
              <a 
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`View Source Code for ${title} on GitHub`}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                <Github size={14} />
                REPO
              </a>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-hardware-card border border-hardware-border max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogId}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-substrate-accent shadow-[0_0_15px_rgba(127,85,255,0.5)]" />
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 id={dialogId} className="text-2xl font-bold text-white mb-2 glitch" data-text={title}>{title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-substrate-accent/10 border border-substrate-accent/30 text-substrate-accent rounded uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                    aria-label={`Close ${title} details`}
                    autoFocus
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  <div className="bg-black/40 p-4 rounded-lg border border-hardware-border mb-6 font-mono text-xs">
                    <div className="flex items-center gap-2 text-substrate-accent mb-2">
                      <Terminal size={12} />
                      <span>SYSTEM_LOG // {title.toUpperCase().replace(/\s+/g, '_')}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{description}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-substrate-accent font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Code2 size={14} />
                        Technical Breakdown
                      </h5>
                      <CodeBlock code={details} language="technical_specs" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-end gap-4">
                  {siteUrl && (
                    <a 
                      href={siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-substrate-accent text-white font-bold rounded-lg hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg shadow-substrate-accent/20"
                    >
                      <ExternalLink size={18} />
                      VISIT SITE
                    </a>
                  )}
                  {repoUrl && (
                    <a 
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-hardware-card border border-hardware-border text-white font-bold rounded-lg hover:border-substrate-accent/50 transition-all flex items-center gap-2"
                    >
                      <Github size={18} />
                      REPOSITORY
                    </a>
                  )}
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="px-8 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-all"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const projectBenchNotes: Record<string, string> = {
  "Atlas Package Manager": "v0.16.1 · released",
  "Hash Factory": "v0.1.0 · rebuilding",
  "Continuity": "v1.2.0 · closed testing",
  "LifeOS": "active development"
};

const ProjectBenchIndex = () => (
  <div className="bench-index">
    <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-substrate-accent">Workbench index</p>
        <h2 className="mt-1 text-lg font-semibold text-white">Current builds</h2>
      </div>
      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" aria-hidden="true" />
    </div>
    <div>
      {projectsData.map((project) => {
        const href = project.siteUrl?.startsWith('http') ? project.siteUrl : `https://${project.siteUrl}`;
        return (
          <a
            key={project.title}
            href={href}
            className="bench-index-row group"
            aria-label={`Open ${project.title}`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <project.icon size={18} className="shrink-0 text-substrate-accent" aria-hidden="true" />
              <span className="truncate font-semibold text-slate-100">{project.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="hidden font-mono text-[9px] uppercase tracking-wider text-slate-500 sm:inline">
                {projectBenchNotes[project.title]}
              </span>
              <ChevronRight size={16} className="text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-substrate-accent" aria-hidden="true" />
            </span>
          </a>
        );
      })}
    </div>
  </div>
);

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isGlitched, setIsGlitched] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [secretCode, setSecretCode] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newCode = (secretCode + e.key).slice(-4);
      setSecretCode(newCode);
      if (newCode === 'root') {
        setIsMatrixActive(prev => !prev);
        triggerGlitch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretCode]);

  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const triggerGlitch = () => {
    setIsGlitched(true);
    setTimeout(() => setIsGlitched(false), 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('admin@vatteck.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsTransmitting(true);
    
    // Construct mailto link
    const subject = `[CONTACT] ${formData.subject || 'New Message'}`;
    const body = `Identity: ${formData.name}\nReturn Address: ${formData.email}\n\nPayload:\n${formData.message}`;
    const mailtoUrl = `mailto:admin@vatteck.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Give the browser a moment to register the button state before opening mail.
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsTransmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 200);
  };

  return (
    <div className={`min-h-screen selection:bg-substrate-accent/30 noise-bg overflow-hidden transition-all duration-300 circuit-bg ${isGlitched ? 'invert hue-rotate-90' : ''}`}>
      {isMatrixActive && <MatrixRain />}
      <DataStream />
      <TerminalEasterEgg />
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="scanline" />
      </div>

      {/* Hardware Scan Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] pointer-events-none flex flex-col items-center justify-center bg-substrate-accent/5"
          >
            <div className="w-full h-1 bg-substrate-accent/50 absolute top-0 animate-[scan_2s_ease-in-out_infinite]" />
            <div className="text-substrate-accent font-mono text-xl animate-pulse">HARDWARE_SCAN_IN_PROGRESS...</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[60] p-3 bg-substrate-accent text-white rounded-full shadow-lg shadow-substrate-accent/40 hover:bg-red-700 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative overflow-hidden px-5 sm:px-6">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hardware-bg/50 to-hardware-bg" />
        <nav className="relative z-20 mx-auto flex max-w-5xl items-center justify-between border-b border-white/10 py-4" aria-label="Primary navigation">
          <a href="#" className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-white">
            VATTECK<span className="text-substrate-accent">.</span>
          </a>
          <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-widest text-slate-500 sm:gap-7">
            <a href="#projects" className="hover:text-white">Work</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:py-16 xl:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <button
              type="button"
              onClick={triggerGlitch}
              className={`glitch-main uv-glow mb-5 block text-left text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl ${isGlitched ? 'is-active' : ''}`}
              data-text="VATTECK"
              aria-label="Activate Vatteck wordmark glitch"
            >
              VATTECK<span className="text-substrate-accent">.</span>
            </button>

            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-substrate-accent sm:text-xs">
              Hardware technician · independent developer
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl">
              I repair hardware and build software that ships.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
              Component-level diagnostics, tuned Linux and Android systems, and independently built apps and games — from first fault or first commit through release.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-substrate-accent px-7 py-4 font-bold text-white shadow-lg shadow-substrate-accent/20 hover:bg-red-700"
              >
                VIEW THE WORK
                <ChevronRight size={19} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-hardware-border bg-hardware-card px-7 py-4 font-bold text-white hover:border-substrate-accent/50"
              >
                START A CONVERSATION
              </motion.a>
            </div>

            <a
              href="https://github.com/Vatteck"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-white"
            >
              <Github size={15} aria-hidden="true" />
              github.com/Vatteck
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <ProjectBenchIndex />
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32 md:space-y-40 relative">
        <CircuitLine className="top-0 left-0 w-full h-24 opacity-50" />
        <CircuitLine className="top-1/4 right-0 w-full h-24 opacity-30 rotate-180" />
        <CircuitLine className="top-2/4 left-0 w-full h-24 opacity-40" />
        <CircuitLine className="top-3/4 right-0 w-full h-24 opacity-30 rotate-180" />
        
        {/* About Section */}
        <section id="about" className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SectionHeader title="Bio" subtitle="Hardware Soul, Software Mind" glitch />
            <div className="bg-hardware-card border border-hardware-border p-6 rounded-2xl relative overflow-hidden group">
              <div className="cyber-corner cyber-corner-tl opacity-50" />
              <div className="cyber-corner cyber-corner-br opacity-50" />
              <div className="absolute top-0 left-0 w-full h-1 bg-substrate-accent/30" />
              <div className="flex items-center gap-2 mb-4 text-substrate-accent font-mono text-xs">
                <Terminal size={14} />
                <span>USER_BIO_DECRYPTED // ACCESS_GRANTED</span>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                {bioData.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-substrate-accent/10 blur-3xl rounded-full opacity-30" />
            <div className="relative bg-hardware-card border border-hardware-border p-8 rounded-2xl overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-50" />
              <div className="cyber-corner cyber-corner-bl opacity-50" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-substrate-accent to-transparent" />
              
              {/* Profile Picture Integration */}
              <div className="mb-8 relative group cyber-image-container">
                <div className="absolute inset-0 bg-substrate-accent/20 blur-xl group-hover:bg-substrate-accent/40 transition-all duration-500 rounded-xl z-0" />
                <img 
                  src="/vatteck-profile.jpg"
                  alt="Portrait illustration of Vatteck"
                  className="relative z-10 aspect-[4/3] w-full rounded-xl border border-substrate-accent/30 bg-black/60 object-contain object-center grayscale transition-all duration-700 hover:grayscale-0 cyber-image"
                  width="460"
                  height="460"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/vatteck-logo.svg';
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-accent mb-2"><Monitor size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">OS Preference</div>
                  <div className="text-sm font-bold">Arch / CachyOS</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-accent mb-2"><Smartphone size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">Android</div>
                  <div className="text-sm font-bold">Root & Kernel Mod</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-accent mb-2"><Gamepad2 size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">Gaming</div>
                  <div className="text-sm font-bold">Modding & Dev</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-accent mb-2"><Wrench size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">Hardware</div>
                  <div className="text-sm font-bold">Expert Repair</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Deep Dive Section */}
        <section id="experience" className="space-y-12">
          <SectionHeader title="Deep Dive" subtitle="Technical Operations" />
          <div className="grid md:grid-cols-2 gap-6">
            {deepDiveData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
                  <div className="cyber-corner cyber-corner-tr opacity-30" />
                  <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* System Configuration Section */}
        <section id="config" className="space-y-12">
          <SectionHeader title="System Config" subtitle="Kernel & Environment" glitch />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-slate-400 leading-relaxed">
                My primary workstation runs a heavily modified <span className="text-substrate-accent">CachyOS</span> (Arch-based) environment. 
                Below are some of the core optimizations I apply to ensure maximum throughput and minimal latency.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-hardware-card border border-hardware-border rounded-xl">
                  <div className="text-xs text-slate-500 uppercase mb-1">Kernel</div>
                  <div className="text-sm font-mono text-substrate-accent">linux-cachyos-bore</div>
                </div>
                <div className="p-4 bg-hardware-card border border-hardware-border rounded-xl">
                  <div className="text-xs text-slate-500 uppercase mb-1">Scheduler</div>
                  <div className="text-sm font-mono text-substrate-accent">BORE / EEVDF</div>
                </div>
              </div>
            </div>
            <CodeBlock 
              language="bash"
              code={`# Update system and optimize mirrors
sudo pacman -Syu --noconfirm
yay -S linux-cachyos-bore cachyos-settings

# Optimize CPU governor for performance
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# Configure BTRFS mount options for SSD
# /etc/fstab: compress=zstd:3,discard=async,noatime`}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeader title="Projects" subtitle="Featured Creations" glitch />
          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.map((project, idx) => (
              <ProjectCard 
                key={idx}
                title={project.title}
                icon={project.icon}
                repoUrl={project.repoUrl}
                siteUrl={project.siteUrl}
                description={project.description}
                details={project.details}
                tags={project.tags}
                status={project.status}
              />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeader title="Arsenal" subtitle="Technical Proficiency" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsData.map((skill, idx) => (
              <SkillPill key={idx} icon={skill.icon} label={skill.label} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pb-24">
          <SectionHeader title="Contact" subtitle="Establish Connection" glitch />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-hardware-card border border-hardware-border p-8 rounded-2xl relative overflow-hidden">
                <div className="cyber-corner cyber-corner-tl opacity-50" />
                <div className="cyber-corner cyber-corner-br opacity-50" />
                <div className="absolute top-0 left-0 w-full h-1 bg-substrate-accent/30" />
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <MessageSquare className="text-substrate-accent" />
                  Direct Uplink
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Got a board that needs fixing, a kernel that needs tuning, or an idea that needs building? I take on hardware diagnostics, custom Android configurations, and software commissions. If it's technical and interesting, I want to hear about it.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm font-mono text-slate-300">
                    <div className="w-10 h-10 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent border border-substrate-accent/20">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Primary Email</p>
                      <p>admin@vatteck.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-mono text-slate-300">
                    <div className="w-10 h-10 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent border border-substrate-accent/20">
                      <Github size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">GitHub Handle</p>
                      <p>@Vatteck</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-substrate-accent/5 border border-substrate-accent/20 rounded-xl font-mono text-[10px] text-substrate-accent/60 space-y-2">
                <p>// ENCRYPTION: AES-256-GCM</p>
                <p>// STATUS: SECURE_CHANNEL_READY</p>
                <p>// ORIGIN: {typeof window !== 'undefined' ? window.location.hostname : 'LOCAL_HOST'}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-hardware-card border border-hardware-border p-8 rounded-2xl relative">
              <div className="cyber-corner cyber-corner-tr opacity-50" />
              <div className="cyber-corner cyber-corner-bl opacity-50" />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Name</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="NAME / ALIAS"
                    className="w-full bg-black/40 border border-hardware-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-substrate-accent/50 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Email</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="EMAIL@DOMAIN.COM"
                    className="w-full bg-black/40 border border-hardware-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-substrate-accent/50 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Subject</label>
                <input 
                  id="contact-subject"
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="ENQUIRY_TYPE"
                  className="w-full bg-black/40 border border-hardware-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-substrate-accent/50 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="ENTER_MESSAGE_DATA..."
                  className="w-full bg-black/40 border border-hardware-border rounded-lg px-4 py-4 text-sm text-white placeholder:text-slate-600 focus:border-substrate-accent/50 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                disabled={isTransmitting}
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 31, 31, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 font-bold rounded-lg flex items-center justify-center gap-3 transition-all ${
                  isSent 
                    ? 'bg-green-600 text-white' 
                    : 'bg-substrate-accent text-white hover:bg-red-700 shadow-lg shadow-substrate-accent/20'
                } ${isTransmitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isTransmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    OPENING MAIL APP...
                  </>
                ) : isSent ? (
                  <>
                    <CheckCircle2 size={18} />
                    EMAIL DRAFT OPENED
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    OPEN EMAIL DRAFT
                  </>
                )}
              </motion.button>
              {isSent && (
                <p className="text-[10px] font-mono text-green-500 text-center mt-2" aria-live="polite">
                  // FINISH AND SEND THE MESSAGE IN YOUR MAIL APP
                </p>
              )}
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-hardware-border bg-hardware-card/50 py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-bold tracking-tighter glitch" data-text="VATTECK">
              VATTECK<span className="text-substrate-accent">.</span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} // All Rights Reserved // AUTH_SIG_VALID
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={copyEmail}
              className="text-slate-400 hover:text-substrate-accent transition-all relative group"
              title="Copy Email"
              aria-label="Copy admin@vatteck.com"
            >
              {copied ? <CheckCircle2 size={20} className="text-green-500" /> : <Mail size={20} />}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-substrate-accent text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {copied ? 'COPIED!' : 'COPY EMAIL'}
              </span>
            </button>
            <a href="https://github.com/Vatteck" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-substrate-accent transition-colors" title="GitHub Profile">
              <Github size={20} />
            </a>
            <a href="https://steamcommunity.com/id/vatteck" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-substrate-accent transition-colors" title="Steam Profile">
              <Gamepad2 size={20} />
            </a>
          </div>
          
          <div className="text-[10px] font-mono text-slate-500 uppercase text-center md:text-right leading-relaxed">
            Built with React & Tailwind<br />
            Optimized for Substrate Architect<br />
            <span className="text-substrate-accent/40">LAST_UPDATE: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
