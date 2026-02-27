import React from 'react';
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
  Monitor
} from 'lucide-react';
import { motion } from 'motion/react';

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-2"
    >
      <div className="h-px w-8 bg-substrate-orange" />
      <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-substrate-orange">{title}</h2>
    </motion.div>
    {subtitle && <h3 className="text-3xl font-bold tracking-tight">{subtitle}</h3>}
  </div>
);

const SkillPill = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(242, 125, 38, 0.1)' }}
    className="flex items-center gap-3 px-4 py-3 bg-hardware-card border border-hardware-border rounded-lg transition-colors"
  >
    <Icon size={18} className="text-substrate-orange" />
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

const ProjectCard = ({ title, description, tags, status }: { title: string; description: string; tags: string[]; status?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative bg-hardware-card border border-hardware-border rounded-xl overflow-hidden hover:border-substrate-orange/50 transition-all duration-300"
  >
    <div className="aspect-video bg-slate-900/50 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <Layers size={48} className="text-substrate-orange/20 group-hover:scale-110 transition-transform duration-500" />
      {status && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-substrate-orange/10 border border-substrate-orange/30 rounded-full">
          <span className="text-[10px] font-mono uppercase tracking-wider text-substrate-orange">{status}</span>
        </div>
      )}
    </div>
    <div className="p-6">
      <h4 className="text-xl font-bold mb-2 group-hover:text-substrate-orange transition-colors">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300 uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-substrate-orange/30">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="scanline" />
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hardware-bg/50 to-hardware-bg" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-substrate-orange/10 border border-substrate-orange/20 rounded-full">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-substrate-orange">System Online // v1.0.4</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4 text-white">
            VATTECK<span className="text-substrate-orange">.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide mb-10 max-w-2xl mx-auto">
            Substrate Architect <span className="text-substrate-orange/50 mx-2">|</span> 
            Hardware Technician <span className="text-substrate-orange/50 mx-2">|</span> 
            Developer
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://github.com/Vatteck"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 bg-substrate-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-substrate-orange/20"
            >
              <Github size={20} />
              ACCESS GITHUB
            </motion.a>
            
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 bg-hardware-card border border-hardware-border text-white font-bold rounded-lg hover:border-substrate-orange/50 transition-all"
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
          <div className="w-px h-12 bg-gradient-to-b from-substrate-orange to-transparent mx-auto" />
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-48">
        
        {/* About Section */}
        <section id="about" className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SectionHeader title="Bio" subtitle="Hardware Soul, Software Mind" />
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                I operate at the intersection of physical hardware and low-level software. As a professional 
                <span className="text-white font-medium"> Hardware Device Technician</span>, I've spent years 
                diagnosing, repairing, and optimizing complex circuitry.
              </p>
              <p>
                My digital home is built on <span className="text-substrate-orange font-mono">Arch Linux</span> (specifically CachyOS), 
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
            <div className="absolute -inset-4 bg-substrate-orange/10 blur-3xl rounded-full opacity-30" />
            <div className="relative bg-hardware-card border border-hardware-border p-8 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-substrate-orange to-transparent" />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-orange mb-2"><Monitor size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">OS Preference</div>
                  <div className="text-sm font-bold">Arch / CachyOS</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-orange mb-2"><Smartphone size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">Android</div>
                  <div className="text-sm font-bold">Root & Kernel Mod</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-orange mb-2"><Gamepad2 size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">Gaming</div>
                  <div className="text-sm font-bold">Modding & Dev</div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-hardware-border">
                  <div className="text-substrate-orange mb-2"><Wrench size={24} /></div>
                  <div className="text-xs font-mono text-slate-500 uppercase mb-1">Hardware</div>
                  <div className="text-sm font-bold">Expert Repair</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeader title="Projects" subtitle="Featured Creations" />
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard 
              title="SUBSTRATE: Miner"
              description="An upcoming Android idle-clicker tycoon game where players build and optimize a massive mining operation. Features deep progression systems, custom shaders, and a hardware-inspired UI aesthetic."
              tags={["Unity", "C#", "Android", "Game Dev"]}
              status="In Development"
            />
            <ProjectCard 
              title="CachyOS Optimization Suite"
              description="A collection of scripts and configurations designed to squeeze every ounce of performance out of the Arch-based CachyOS, focusing on gaming latency and kernel responsiveness."
              tags={["Linux", "Bash", "Kernel", "Performance"]}
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
            <div className="text-xl font-bold tracking-tighter">
              VATTECK<span className="text-substrate-orange">.</span>
            </div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} // All Rights Reserved
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="mailto:Vatteck@gmail.com" className="text-slate-400 hover:text-substrate-orange transition-colors">
              <Mail size={20} />
            </a>
            <a href="https://github.com/Vatteck" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-substrate-orange transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-substrate-orange transition-colors">
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
