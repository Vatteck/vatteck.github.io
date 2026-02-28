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

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) || target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor hidden lg:block ${isHovering ? 'hovering' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const bootLogs = [
    "VATTECK_OS_LOADER v1.0.4",
    "CHECKING_HARDWARE_INTEGRITY...",
    "CPU_CORE_0: OK",
    "CPU_CORE_1: OK",
    "MEM_CHECK: 65536MB RAM DETECTED",
    "UPLINK_STATUS: SECURE",
    "LOADING_SUBSTRATE_LAYERS...",
    "DECRYPTING_USER_BIO...",
    "INITIALIZING_NEURAL_LINK...",
    "SYSTEM_READY."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[i]]);
        setProgress(((i + 1) / bootLogs.length) * 100);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-log">
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="opacity-50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            <span className="animate-pulse">{log}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-substrate-accent shadow-[0_0_10px_rgba(255,31,31,0.5)]"
        />
      </div>
    </div>
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
          >
            <div className="bg-substrate-accent/10 p-3 border-b border-substrate-accent/20 flex justify-between items-center">
              <span className="text-[10px] font-mono text-substrate-accent font-bold tracking-widest">VATTECK_TERMINAL</span>
              <button onClick={() => setIsOpen(false)} className="text-substrate-accent hover:text-white"><X size={14} /></button>
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

const SkillPill = ({ icon: Icon, label }: { icon: any; label: string }) => (
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
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-substrate-accent shadow-[0_0_15px_rgba(127,85,255,0.5)]" />
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 glitch" data-text={title}>{title}</h2>
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
  const [typedText, setTypedText] = useState('');
  const [isGlitched, setIsGlitched] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const fullText = "Substrate Architect | Hardware Technician | Developer";

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
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
    
    // Aesthetic delay for "transmission"
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsTransmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen selection:bg-substrate-accent/30 noise-bg crt-flicker overflow-hidden transition-all duration-300 circuit-bg ${isGlitched ? 'invert hue-rotate-90' : ''}`}>
      <AnimatePresence>
        {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <CustomCursor />
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
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <SystemStatus />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hardware-bg/50 to-hardware-bg" />
        
        {/* Cyber Corners */}
        <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-substrate-accent/30 pointer-events-none" />
        <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-substrate-accent/30 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-substrate-accent/30 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-substrate-accent/30 pointer-events-none" />

        {/* Corner Data */}
        <div className="absolute top-16 left-16 hidden lg:block z-20 bg-black/40 p-4 rounded-lg border border-substrate-accent/20 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="text-[10px] font-mono text-slate-400 space-y-1">
            <p className="flex items-center gap-2">
              <span className="opacity-50">LOC:</span> 
              <span className="text-white">45.5231° N, 122.6765° W</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="opacity-50">SATELLITE:</span> 
              <span className="text-white">LINK_ESTABLISHED</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="opacity-50">LATENCY:</span> 
              <span className="text-white">12ms</span>
            </p>
          </div>
        </div>

        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-2 bg-substrate-accent/10 border border-substrate-accent/20 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(255,31,31,0.1)]"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-substrate-accent font-bold">System Online // v1.0.4 // AUTH_LEVEL_0</span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 
            onClick={triggerGlitch}
            className={`text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-white glitch-main uv-glow cursor-pointer select-none ${isGlitched ? 'animate-pulse' : ''}`} 
            data-text="VATTECK"
          >
            VATTECK<span className="text-substrate-accent">.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-light tracking-widest mb-10 max-w-4xl mx-auto uppercase min-h-[1.75rem]">
            <span className="typing-text">{typedText}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="https://github.com/Vatteck"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit VATTECK's GitHub Profile"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 31, 31, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-substrate-accent text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-substrate-accent/20"
              >
                <Github size={20} />
                ACCESS GITHUB
              </motion.a>
            
            <motion.a
              href="#projects"
              title="View VATTECK's Hardware and Software Projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 bg-hardware-card border border-hardware-border text-white font-bold rounded-lg hover:border-substrate-accent/50 transition-all"
            >
              VIEW PROJECTS
              <ChevronRight size={20} />
            </motion.a>
          </div>

          <LiveSystemLog />

          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={triggerScan}
              aria-label="Run Hardware Diagnostics Scan"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 bg-hardware-card border border-substrate-accent/50 text-substrate-accent font-bold rounded-lg hover:bg-substrate-accent/10 transition-all"
            >
              <Cpu size={20} className={isScanning ? 'animate-spin' : ''} />
              RUN DIAGNOSTICS
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-px h-12 bg-gradient-to-b from-substrate-accent to-transparent mx-auto" />
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-48 relative">
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
                <p>
                  I operate at the intersection of physical hardware and low-level software. As a professional 
                  <span className="text-white font-medium"> Hardware Device Technician</span>, I've spent years 
                  diagnosing, repairing, and optimizing complex circuitry.
                </p>
                <p>
                  My digital home is built on <span className="text-substrate-accent font-mono">Arch Linux</span> (specifically CachyOS), 
                  where I indulge my obsession with performance and customization. From kernel-tweaking Android devices 
                  to rooting and modding everything I own, I believe technology is meant to be mastered, not just used.
                </p>
                <p>
                  When I'm not in the terminal or under the microscope, I'm deeply immersed in gaming and game modding, 
                  translating that passion into interactive experiences through game development.
                </p>
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
                  src="input_file_1.png" 
                  alt="VATTECK - Substrate Architect and Hardware Systems Engineer Profile" 
                  className="relative w-full aspect-[4/3] object-cover rounded-xl border border-substrate-accent/30 grayscale hover:grayscale-0 transition-all duration-700 cyber-image z-10"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/vatteck/800/600';
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Wrench size={24} />
              </div>
              <h4 className="text-lg font-bold">Hardware Engineering</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Specializing in component-level repair, SMD soldering, and diagnostic analysis of mobile and computing devices. I don't just fix devices; I optimize their physical thermal and power delivery systems.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Terminal size={24} />
              </div>
              <h4 className="text-lg font-bold">Systems Architecture</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Building highly-optimized Linux environments from the ground up. Expertise in kernel configuration, filesystem optimization (BTRFS/ZFS), and automated system deployment using custom shell architecture.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Smartphone size={24} />
              </div>
              <h4 className="text-lg font-bold">Mobile Forensics & Mod</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Deep-level Android customization including bootloader unlocking, custom recovery deployment, and building tailored kernel modules for specific hardware acceleration needs.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Cpu size={24} />
              </div>
              <h4 className="text-lg font-bold">Silicon Optimization</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Advanced undervolting and overclocking strategies for modern CPU/GPU architectures. Maximizing performance-per-watt through low-level firmware and kernel-space adjustments.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Code2 size={24} />
              </div>
              <h4 className="text-lg font-bold">Game Engine Logic</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Developing custom game mechanics in Unity and C#. Focusing on performance-critical systems like procedural generation, AI pathfinding, and high-frequency physics calculations.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Layers size={24} />
              </div>
              <h4 className="text-lg font-bold">Substrate Integration</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Designing end-to-end solutions that bridge the gap between custom hardware sensors and digital dashboards, utilizing MQTT and low-latency protocols.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Monitor size={24} />
              </div>
              <h4 className="text-lg font-bold">Legacy Recovery</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Specialized data extraction and restoration from vintage hardware. Reviving "dead" silicon through custom interface bridges and low-level signal analysis.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Info size={24} />
              </div>
              <h4 className="text-lg font-bold">Neural Interface Research</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Exploring the boundaries of human-machine interaction through EEG signal processing and custom haptic feedback hardware. Mapping digital intent to physical response.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all relative group overflow-hidden">
              <div className="cyber-corner cyber-corner-tr opacity-30" />
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-lg font-bold">Encrypted Comms</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Deploying hardened communication nodes using decentralized protocols. Ensuring data integrity and anonymity through hardware-backed cryptographic modules.
              </p>
            </div>
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
            <ProjectCard 
              title="SUBSTRATE: Miner"
              icon={Cpu}
              repoUrl="https://github.com/Vatteck/SiliconSageAIMiner"
              siteUrl="vatteck.com/SubstrateMiner"
              description="An upcoming Android idle-clicker tycoon game where players build and optimize a massive mining operation."
              details={`[PROJECT_SPECIFICATIONS]
NAME: SUBSTRATE_MINER
PLATFORM: ANDROID_OS
ENGINE: UNITY_2023.2
LANGUAGE: C#_DOTNET_7

# CORE_SYSTEMS
- PROCEDURAL_RESOURCE_GEN: ACTIVE
- HARDWARE_INSPIRED_UI: LOADED
- BACKEND_CALC_ENGINE: OPTIMIZED
- LOW_LATENCY_INPUT: ENABLED

# STATUS
CURRENT_PHASE: CLOSED_ALPHA
FOCUS: PRESTIGE_MECHANICS_BALANCING`}
              tags={["Unity", "C#", "Android", "Game Dev"]}
              status="IN PROGRESS"
            />
            <ProjectCard 
              title="CachyOS Optimization Suite"
              icon={Terminal}
              description="A collection of scripts and configurations designed to squeeze every ounce of performance out of the Arch-based CachyOS."
              details={`[OPTIMIZATION_SUITE_V2.0]
OS_TARGET: ARCH_LINUX_CACHYOS
ARCHITECTURE: ZEN_3_4_OPTIMIZED

# INCLUDED_TOOLS
- CPU_GOVERNOR_TUNER: ENABLED
- MEMORY_MANAGEMENT_SCRIPTS: ACTIVE
- LATENCY_REDUCTION_CONFIGS: LOADED
- KERNEL_PARAM_OPTIMIZER: READY

# PERFORMANCE_METRICS
- MICRO_STUTTER_REDUCTION: 15%
- INPUT_LATENCY_DECREASE: 8ms`}
              tags={["Linux", "Bash", "Kernel", "Performance"]}
              status="PLANNED"
            />
            <ProjectCard 
              title="Kernel-Level Android Firewall"
              icon={Smartphone}
              description="A planned project to build a low-level network filtering system directly into the Android kernel for maximum security."
              details={`[SECURITY_PROTOCOL_ALPHA]
OS_TARGET: ANDROID_KERNEL_6.1+
SECURITY_LEVEL: HARDWARE_ISOLATION

# PLANNED_FEATURES
- EBPF_PACKET_FILTERING: RESEARCHING
- HARDWARE_BACKED_ENCRYPTION: PLANNED
- SYSCALL_LEVEL_CONTROL: PROTOTYPING
- REAL_TIME_INSPECTION_HUD: DESIGNING

# GOAL
BYPASS_STANDARD_API: CONFIRMED`}
              tags={["C", "Android", "Kernel", "Security"]}
              status="PLANNED"
            />
            <ProjectCard 
              title="Substrate Hardware Monitor"
              icon={Monitor}
              description="A custom hardware monitoring dashboard designed for high-refresh rate displays and low-level sensor polling."
              details={`[HARDWARE_MONITOR_V1.0]
INTERFACE: LINUX_SYSFS_HWMON
ACCELERATION: HARDWARE_GPU_RENDERED

# PLANNED_FEATURES
- ZEN_ARCH_VOLTAGE_TRACKING: ACTIVE
- PID_LOOP_FAN_CONTROL: TESTING
- GPU_POWER_DELIVERY_MONITOR: READY
- HIGH_REFRESH_RATE_UI: 144HZ_SUPPORT

# SENSOR_POLLING
- FREQUENCY: 1000HZ
- OVERHEAD: <0.5%_CPU`}
              tags={["Rust", "Linux", "Hardware", "UI"]}
              status="PLANNED"
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeader title="Arsenal" subtitle="Technical Proficiency" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkillPill icon={Wrench} label="Hardware Diagnostics" />
            <SkillPill icon={Terminal} label="Arch Linux Mastery" />
            <SkillPill icon={Smartphone} label="Android Modding" />
            <SkillPill icon={Cpu} label="Kernel Tweaking" />
            <SkillPill icon={Gamepad2} label="Game Development" />
            <SkillPill icon={Code2} label="AI Engineering" />
            <SkillPill icon={Layers} label="Device Modding" />
            <SkillPill icon={Monitor} label="System Optimization" />
            <SkillPill icon={CheckCircle2} label="SMD Soldering" />
            <SkillPill icon={MessageSquare} label="Technical Support" />
            <SkillPill icon={Info} label="Hardware Forensics" />
            <SkillPill icon={ExternalLink} label="Network Security" />
            <SkillPill icon={Terminal} label="Bash/Python Scripting" />
            <SkillPill icon={Cpu} label="Reverse Engineering" />
            <SkillPill icon={Layers} label="PCB Design & Prototyping" />
            <SkillPill icon={Monitor} label="KVM/QEMU Virtualization" />
            <SkillPill icon={Smartphone} label="Embedded Systems" />
            <SkillPill icon={Code2} label="Low-level C/C++" />
            <SkillPill icon={Wrench} label="Thermal Management" />
            <SkillPill icon={CheckCircle2} label="Logic Analysis" />
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
                  Have a project in mind or want to discuss hardware optimization? Drop a message through the secure channel. I'm always open to technical collaborations and architectural challenges.
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
                  <label className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Identity</label>
                  <input 
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
                  <label className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Return Address</label>
                  <input 
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
                <label className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="ENQUIRY_TYPE"
                  className="w-full bg-black/40 border border-hardware-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-substrate-accent/50 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-substrate-accent uppercase tracking-widest ml-1">Payload</label>
                <textarea 
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
                    TRANSMITTING...
                  </>
                ) : isSent ? (
                  <>
                    <CheckCircle2 size={18} />
                    TRANSMISSION SUCCESSFUL
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    TRANSMIT MESSAGE
                  </>
                )}
              </motion.button>
              {isSent && (
                <p className="text-[10px] font-mono text-green-500 text-center mt-2 animate-pulse">
                  // MAIL_CLIENT_TRIGGERED // PLEASE_COMPLETE_SEND
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
