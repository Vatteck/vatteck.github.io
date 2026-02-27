import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SectionHeader = ({ title, subtitle, glitch }: { title: string; subtitle?: string; glitch?: boolean }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-2"
    >
      <div className="h-px w-8 bg-substrate-accent" />
      <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-substrate-accent">{title}</h2>
    </motion.div>
    {subtitle && (
      <h3 className={`text-3xl font-bold tracking-tight ${glitch ? 'glitch' : ''}`} data-text={subtitle}>
        {subtitle}
      </h3>
    )}
  </div>
);

const SkillPill = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(127, 85, 255, 0.1)' }}
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
  repoUrl
}: { 
  title: string; 
  description: string; 
  details: string; 
  tags: string[]; 
  status?: string;
  icon?: any;
  repoUrl?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-hardware-card rounded-xl overflow-hidden flex flex-col cyber-card p-6"
    >
      <div className="cyber-border-accent" />
      
      <div className="flex items-start justify-between mb-6">
        <div className="cyber-icon-box">
          <Icon size={32} className="text-substrate-accent relative z-10" />
        </div>
        {status && (
          <div className={`cyber-badge ${status === 'PLANNED' ? 'cyber-badge-planned' : ''}`}>
            {status}
          </div>
        )}
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
            <button 
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 text-xs font-mono text-substrate-accent hover:text-white transition-colors group/btn"
            >
              <Info size={14} />
              VIEW DETAILS
              <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>

            {repoUrl && (
              <a 
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                  <p className="mb-4 text-slate-200">{description}</p>
                  <div className="h-px w-full bg-hardware-border my-6" />
                  <div className="space-y-4">
                    <h5 className="text-substrate-accent font-mono text-xs uppercase tracking-widest">Technical Breakdown</h5>
                    <p className="whitespace-pre-line text-sm">{details}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  {repoUrl && (
                    <a 
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-hardware-card border border-hardware-border text-white font-bold rounded-lg hover:border-substrate-accent/50 transition-all flex items-center gap-2"
                    >
                      <Github size={18} />
                      VIEW REPOSITORY
                    </a>
                  )}
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="px-8 py-3 bg-substrate-accent text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-substrate-accent/20"
                  >
                    CLOSE INTERFACE
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
  return (
    <div className="min-h-screen selection:bg-substrate-accent/30 noise-bg crt-flicker">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="scanline" />
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hardware-bg/50 to-hardware-bg" />
        
        {/* Cyber Corners */}
        <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-substrate-accent/30 pointer-events-none" />
        <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-substrate-accent/30 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-substrate-accent/30 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-substrate-accent/30 pointer-events-none" />

        {/* Corner Data */}
        <div className="absolute top-12 left-12 hidden lg:block">
          <div className="text-[8px] font-mono text-substrate-accent/40 space-y-1">
            <p>LOC: 45.5231° N, 122.6765° W</p>
            <p>SATELLITE: LINK_ESTABLISHED</p>
            <p>LATENCY: 12ms</p>
          </div>
        </div>
        <div className="absolute top-12 right-12 hidden lg:block">
          <div className="text-[8px] font-mono text-substrate-accent/40 text-right space-y-1">
            <p>CPU_LOAD: 12%</p>
            <p>MEM_AVAIL: 64GB</p>
            <p>UPLINK: ACTIVE</p>
          </div>
        </div>

        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-substrate-accent/10 border border-substrate-accent/20 rounded-full backdrop-blur-md"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-substrate-accent">System Online // v1.0.4 // AUTH_LEVEL_0</span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-white glitch-main uv-glow" data-text="VATTECK">
            VATTECK<span className="text-substrate-accent">.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-light tracking-widest mb-10 max-w-2xl mx-auto uppercase">
            Substrate Architect <span className="text-substrate-accent/50 mx-4">|</span> 
            Hardware Technician <span className="text-substrate-accent/50 mx-4">|</span> 
            Developer
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://github.com/Vatteck"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(127, 85, 255, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 bg-substrate-accent text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-substrate-accent/20"
            >
              <Github size={20} />
              ACCESS GITHUB
            </motion.a>
            
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 bg-hardware-card border border-hardware-border text-white font-bold rounded-lg hover:border-substrate-accent/50 transition-all"
            >
              VIEW PROJECTS
              <ChevronRight size={20} />
            </motion.a>
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

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-48">
        
        {/* About Section */}
        <section id="about" className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SectionHeader title="Bio" subtitle="Hardware Soul, Software Mind" glitch />
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
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
          
          <div className="relative">
            <div className="absolute -inset-4 bg-substrate-accent/10 blur-3xl rounded-full opacity-30" />
            <div className="relative bg-hardware-card border border-hardware-border p-8 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-substrate-accent to-transparent" />
              
              {/* Profile Picture Integration */}
              <div className="mb-8 relative group">
                <div className="absolute inset-0 bg-substrate-accent/20 blur-xl group-hover:bg-substrate-accent/40 transition-all duration-500 rounded-xl" />
                <img 
                  src="input_file_1.png" 
                  alt="Vatteck Profile" 
                  className="relative w-full aspect-[4/3] object-cover rounded-xl border border-substrate-accent/30 grayscale hover:grayscale-0 transition-all duration-700"
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
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all">
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Wrench size={24} />
              </div>
              <h4 className="text-lg font-bold">Hardware Engineering</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Specializing in component-level repair, SMD soldering, and diagnostic analysis of mobile and computing devices. I don't just fix devices; I optimize their physical thermal and power delivery systems.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all">
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Terminal size={24} />
              </div>
              <h4 className="text-lg font-bold">Systems Architecture</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Building highly-optimized Linux environments from the ground up. Expertise in kernel configuration, filesystem optimization (BTRFS/ZFS), and automated system deployment using custom shell architecture.
              </p>
            </div>
            <div className="p-8 bg-hardware-card border border-hardware-border rounded-2xl space-y-4 hover:border-substrate-accent/30 transition-all">
              <div className="w-12 h-12 bg-substrate-accent/10 rounded-lg flex items-center justify-center text-substrate-accent">
                <Smartphone size={24} />
              </div>
              <h4 className="text-lg font-bold">Mobile Forensics & Mod</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Deep-level Android customization including bootloader unlocking, custom recovery deployment, and building tailored kernel modules for specific hardware acceleration needs.
              </p>
            </div>
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
              description="An upcoming Android idle-clicker tycoon game where players build and optimize a massive mining operation."
              details={`SUBSTRATE: Miner is a deep dive into the world of industrial mining automation. 

              Key Features:
              - Procedural resource generation with hardware-inspired aesthetics.
              - Complex upgrade trees that mimic real-world hardware optimization.
              - Custom C# backend for handling thousands of simultaneous resource calculations.
              - Native Android optimization for low-latency touch response.
              
              The game is currently in closed alpha, focusing on balancing the 'prestige' mechanics and refining the visual feedback loops.`}
              tags={["Unity", "C#", "Android", "Game Dev"]}
              status="IN PROGRESS"
            />
            <ProjectCard 
              title="CachyOS Optimization Suite"
              icon={Terminal}
              description="A collection of scripts and configurations designed to squeeze every ounce of performance out of the Arch-based CachyOS."
              details={`This suite is the result of hundreds of hours of benchmarking and kernel testing. 

              Included Tools:
              - Automated CPU governor tuning for Zen 3/4 architectures.
              - Custom memory management scripts to reduce micro-stutter in high-load gaming scenarios.
              - X11/Wayland latency reduction configurations.
              - One-click setup for gaming-optimized kernel parameters.
              
              Designed specifically for power users who demand zero-compromise performance from their Linux workstations.`}
              tags={["Linux", "Bash", "Kernel", "Performance"]}
              status="PLANNED"
            />
            <ProjectCard 
              title="Kernel-Level Android Firewall"
              icon={Smartphone}
              description="A planned project to build a low-level network filtering system directly into the Android kernel for maximum security."
              details={`This project aims to bypass standard Android VPN/Firewall APIs to provide true hardware-level network isolation.

              Planned Features:
              - eBPF-based packet filtering for zero-latency overhead.
              - Hardware-backed encryption for all outbound traffic.
              - Per-app network permission control at the syscall level.
              - Integrated dashboard for real-time packet inspection.`}
              tags={["C", "Android", "Kernel", "Security"]}
              status="PLANNED"
            />
            <ProjectCard 
              title="Substrate Hardware Monitor"
              icon={Monitor}
              description="A custom hardware monitoring dashboard designed for high-refresh rate displays and low-level sensor polling."
              details={`A lightweight, hardware-accelerated monitoring tool that interfaces directly with Linux sysfs and hwmon.

              Planned Features:
              - Real-time voltage and frequency tracking for Zen architectures.
              - Custom fan curve control with PID loop logic.
              - GPU power delivery monitoring for modern NVIDIA/AMD cards.
              - Exportable telemetry data for performance analysis.`}
              tags={["Rust", "Linux", "Hardware", "UI"]}
              status="PLANNED"
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeader title="Arsenal" subtitle="Technical Proficiency" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkillPill icon={Wrench} label="Hardware Diagnostics & Repair" />
            <SkillPill icon={Terminal} label="Arch Linux Mastery" />
            <SkillPill icon={Smartphone} label="Android Customization" />
            <SkillPill icon={Cpu} label="Kernel Tweaking" />
            <SkillPill icon={Gamepad2} label="Game Development" />
            <SkillPill icon={Code2} label="AI Prompt Engineering" />
            <SkillPill icon={Layers} label="Device Modding" />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-hardware-border bg-hardware-card/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-bold tracking-tighter glitch" data-text="VATTECK">
              VATTECK<span className="text-substrate-accent">.</span>
            </div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} // All Rights Reserved
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="mailto:Vatteck@gmail.com" className="text-slate-400 hover:text-substrate-accent transition-colors">
              <Mail size={20} />
            </a>
            <a href="https://github.com/Vatteck" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-substrate-accent transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-substrate-accent transition-colors">
              <Gamepad2 size={20} />
            </a>
          </div>
          
          <div className="text-xs font-mono text-slate-500 uppercase text-center md:text-right">
            Built with React & Tailwind<br />
            Optimized for Substrate Architect
          </div>
        </div>
      </footer>
    </div>
  );
}
