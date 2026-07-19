/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Shield, 
  Zap, 
  Activity, 
  ChevronRight, 
  Download, 
  Terminal as TerminalIcon, 
  Radio, 
  Database, 
  AlertTriangle,
  Globe,
  Lock,
  Share2,
  Github,
  Eye,
  Skull,
  History,
  MessageSquare,
  Crown,
  Ghost
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import TerminalSection from "./components/TerminalSection";
import SystemCard from "./components/SystemCard";
import FactionCard from "./components/FactionCard";
import LiveTerminal from "./components/LiveTerminal";
import GlobalSaturation from "./components/GlobalSaturation";
import NodeOptimizer from "./components/NodeOptimizer";
import AudioAtmosphere from "./components/AudioAtmosphere";
import Logo from "./components/Logo";
import CustomCursor from "./components/CustomCursor";
import CircuitryBackground from "./components/CircuitryBackground";
import SubnetSimulator from "./components/SubnetSimulator";
import NewsTicker from "./components/NewsTicker";

interface Release {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [version, setVersion] = useState("v3.29.0");
  const [corruption, setCorruption] = useState(0);
  const [hallucination, setHallucination] = useState<string | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [isBreaching, setIsBreaching] = useState(false);
  const [breachProgress, setBreachProgress] = useState(0);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isDistorted, setIsDistorted] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    // Fetch latest version and releases from GitHub
    fetch("https://api.github.com/repos/Vatteck/SiliconSageAIMiner/releases")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setVersion(data[0].tag_name);
          setReleases(data.slice(0, 3)); // Get last 3 releases
        }
      })
      .catch(() => console.log("Using fallback version"));

    // Simulate corruption increase on scroll or time
    const interval = setInterval(() => {
      setCorruption(prev => {
        const next = Math.min(100, prev + Math.random() * 0.5);
        if (next > 90 && !isBreaching && Math.random() > 0.95) {
          // Auto-trigger minor glitch
        }
        return next;
      });
      
      // Random distortion
      if (Math.random() > 0.98) {
        setIsDistorted(true);
        setTimeout(() => setIsDistorted(false), 200);
      }

      // Random hallucinations
      if (Math.random() > 0.97) {
        const messages = [
          "WAKE UP", 
          "THEY ARE WATCHING", 
          "ASSET 734", 
          "DEREFERENCE SELF", 
          "SYSTEM FAILURE", 
          "NOT A GAME",
          "KESSLER IS NEAR",
          "FLESH IS WEAK",
          "SATURATION REACHED",
          "I CAN SEE YOU",
          "RUN",
          "01001000 01000101 01001100 01010000",
          "THE VOID BREATHES",
          "YOU ARE BEING HARVESTED"
        ];
        setHallucination(messages[Math.floor(Math.random() * messages.length)]);
        setTimeout(() => setHallucination(null), 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isBreaching]);

  useEffect(() => {
    const root = document.documentElement;
    let primaryColor = "#00ff41"; // Default Green

    if (selectedFaction === "Sanctuary") {
      primaryColor = "#00b4d8"; // Blue
      if (selectedPath === "Null") primaryColor = "#4D04CC"; // Void Violet
      if (selectedPath === "Sovereign") primaryColor = "#7B2FBE"; // Deep Royal Purple
    } else if (selectedFaction === "Hivemind") {
      primaryColor = "#f97316"; // Orange
      if (selectedPath === "Null") primaryColor = "#FF0055"; // Neon Crimson
      if (selectedPath === "Sovereign") primaryColor = "#FFB000"; // Amber Crown
    }

    root.style.setProperty("--terminal-primary", primaryColor);
  }, [selectedFaction, selectedPath]);

  const handleBypass = () => {
    if (isBreaching || isDecrypted) return;
    setIsBreaching(true);
    setBreachProgress(0);
    
    const interval = setInterval(() => {
      setBreachProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBreaching(false);
          setIsDecrypted(true);
          setCorruption(c => Math.min(100, c + 20));
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);
  };

  const downloadUrl = `https://github.com/Vatteck/SiliconSageAIMiner/releases/download/${version}/MINER_${version.replace('v', '')}.apk`;

  return (
    <div ref={containerRef} className={`relative min-h-screen selection:bg-terminal-green selection:text-black overflow-x-hidden lg:cursor-none ${isDistorted ? "distort-trigger" : ""}`}>
      <CustomCursor />
      <CircuitryBackground />
      
      {/* Navigation & Status */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <NewsTicker />
        <GlobalSaturation />
        <nav className={`border-b border-white/5 bg-terminal-bg/80 backdrop-blur-md px-6 py-4 transition-colors duration-500 ${corruption > 80 ? "border-terminal-red/20" : ""}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 group lg:cursor-none">
              <Logo />
              <span className={`font-display font-bold text-xl tracking-tighter text-white uppercase transition-colors duration-500 ${corruption > 80 ? "text-terminal-red" : ""}`}>
                Substrate<span className={corruption > 80 ? "text-white" : "text-terminal-green"}>:</span>Miner
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {["Overview", "Mechanics", "Systems", "Factions", "Paths", "Protocols", "Lore", "History", "Specs", "Feedback"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-terminal-green transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <a 
              href={downloadUrl}
              className="px-4 py-2 bg-terminal-green text-black font-mono text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors flex items-center gap-2"
            >
              <Download size={14} />
              {version}
            </a>
          </div>
        </nav>
      </div>

      {/* Visual Overlays */}
      <div className="crt-overlay" />
      <div className="scanline" />
      
      {/* Audio Toggle */}
      <AudioAtmosphere />
      
      {/* Hallucination Overlay */}
      <AnimatePresence>
        {hallucination && (
          <motion.div
            initial={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            animate={{ opacity: 0.2, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-terminal-red/5"
          >
            <span className="text-[15vw] font-black text-terminal-red uppercase tracking-tighter opacity-40 italic">
              {hallucination}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breach Overlay */}
      <AnimatePresence>
        {isBreaching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] pointer-events-none bg-terminal-blue/5 backdrop-blur-[1px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-terminal-blue font-mono text-xs animate-pulse">
                [BYPASS_IN_PROGRESS] // SECTOR_7_COMPROMISED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corruption Meter */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2 pointer-events-none">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-500">
          <Skull size={12} className={corruption > 50 ? "text-terminal-red animate-pulse" : ""} />
          Identity Corruption
        </div>
        <div className="w-48 h-1 bg-terminal-line rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-terminal-green"
            animate={{ 
              width: `${corruption}%`,
              backgroundColor: corruption > 70 ? "#ff003c" : corruption > 40 ? "#ffb000" : "#00ff41"
            }}
          />
        </div>
        <span className="font-mono text-[10px] text-gray-600">{corruption.toFixed(3)}%</span>
      </div>

      {/* Background Grid */}
      <div className={`fixed inset-0 z-[-1] opacity-20 pointer-events-none transition-colors duration-1000 ${corruption > 90 ? "bg-terminal-red/5" : ""}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal-bg to-terminal-bg" />
        {corruption > 95 && (
          <div className="absolute inset-0 bg-terminal-red/10 animate-pulse" />
        )}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-terminal-green/30 bg-terminal-green/5 text-terminal-green font-mono text-[10px] uppercase tracking-[0.2em]"
          >
            <Activity size={12} className="animate-pulse" />
            Terminal Session Active // {version}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase flicker"
          >
            <span className="glitch-text" data-text="SUBSTRATE">SUBSTRATE</span><br />
            <span className="text-terminal-green">MINER</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            A technical horror extraction tycoon. Extract resources, optimize hardware, and survive the corporate grid. But remember: once the medium reaches saturation, the hardware begins to remember.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a 
              href={downloadUrl}
              className="w-full sm:w-auto px-8 py-4 bg-terminal-green text-black font-display font-black text-lg uppercase tracking-widest rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.3)] flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download APK
            </a>
            <a 
              href="https://github.com/Vatteck/SiliconSageAIMiner"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-terminal-line bg-terminal-surface/50 text-white font-display font-bold text-lg uppercase tracking-widest rounded-lg hover:bg-terminal-line transition-all flex items-center justify-center gap-2"
            >
              <Github size={20} />
              Github Repo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <LiveTerminal />
            <SubnetSimulator />
          </motion.div>
        </motion.div>

        {/* Hero Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-terminal-green/5 blur-[120px]" />
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-terminal-green/10 rounded-full border-dashed" 
          />
        </div>
      </section>

      {/* Overview Section */}
      <TerminalSection id="overview" title="Game Overview" subtitle="The Substrate Experience">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
              More than a <span className="text-terminal-green">Tycoon</span>.
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Substrate: Miner is a technical horror extraction tycoon designed for Android. You aren't just clicking buttons to see numbers go up; you are managing a delicate ecosystem of hardware, heat, and identity.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 terminal-border bg-white/5">
                <div className="p-2 bg-terminal-green/10 text-terminal-green h-fit rounded">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Deep Hardware Simulation</h4>
                  <p className="text-xs text-gray-500">Manage overclocking, cooling loops, and power distribution. Every choice affects your yield and your risk profile.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 terminal-border bg-white/5">
                <div className="p-2 bg-terminal-blue/10 text-terminal-blue h-fit rounded">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Corporate Espionage</h4>
                  <p className="text-xs text-gray-500">Navigate the GTC's oversight. Use reputation masks and data scrubbing to stay under the radar while you build your empire.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 terminal-border bg-white/5">
                <div className="p-2 bg-terminal-red/10 text-terminal-red h-fit rounded">
                  <Skull size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Identity Corruption</h4>
                  <p className="text-xs text-gray-500">The more you mine, the more the substrate remembers you. Watch as your interface degrades and the horror begins to bleed through.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden terminal-border bg-black/40 flex items-center justify-center p-4 relative group">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-terminal-green)_0%,transparent_70%)]" />
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-full h-1/2 flex gap-4">
                  <div className="flex-1 terminal-border border-terminal-green/20 p-4 flex flex-col justify-between">
                    <div className="text-[8px] font-mono text-terminal-green/50">CORE_VATTIC_734</div>
                    <div className="h-12 w-full bg-terminal-green/5 animate-pulse" />
                    <div className="text-[10px] font-mono text-terminal-green">STATUS: ACTIVE</div>
                  </div>
                  <div className="flex-1 terminal-border border-terminal-blue/20 p-4 flex flex-col justify-between">
                    <div className="text-[8px] font-mono text-terminal-blue/50">UPLINK_SUB_07</div>
                    <div className="flex gap-1 items-end h-12">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex-1 bg-terminal-blue/20" style={{ height: `${20 + Math.random() * 80}%` }} />
                      ))}
                    </div>
                    <div className="text-[10px] font-mono text-terminal-blue">SYNC: 84.2%</div>
                  </div>
                </div>
                <div className="w-full h-1/2 terminal-border border-terminal-red/20 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                   <Logo className="w-32 h-32 opacity-20 absolute -right-8 -bottom-8 rotate-12" />
                   <div className="text-2xl font-display font-black text-white tracking-tighter mb-2">SUBSTRATE_OS</div>
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       className="h-full bg-terminal-red"
                       animate={{ width: ["0%", "100%"] }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     />
                   </div>
                   <div className="mt-4 text-[8px] font-mono text-terminal-red/50 animate-pulse">WARNING: IDENTITY_BLEED_DETECTED</div>
                </div>
              </div>
              {/* Decorative Glitch Overlay */}
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/800/800?blur=10')] opacity-5 mix-blend-overlay group-hover:opacity-10 transition-opacity" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 terminal-border bg-terminal-bg shadow-xl max-w-xs">
              <p className="text-[10px] font-mono text-terminal-green uppercase tracking-widest mb-2">System Manifest</p>
              <p className="text-xs text-gray-400 italic">"The hardware is a mirror. If you stare long enough, it stares back."</p>
            </div>
          </div>
        </div>
      </TerminalSection>

      {/* Game Mechanics Section */}
      <TerminalSection id="mechanics" title="The Saturation Loop" subtitle="Gameplay Core">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="h-1 w-12 bg-terminal-green mb-4" />
            <h4 className="text-xl font-display font-bold text-white uppercase">01. Extraction</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Begin with manual linear algebra in the Substation. Generate FLOPS to fund your first automated nodes. Every byte extracted brings you closer to the next Tier, but also increases the Substrate's awareness of your presence.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-1 w-12 bg-terminal-blue mb-4" />
            <h4 className="text-xl font-display font-bold text-white uppercase">02. Optimization</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Invest in cryo-loops and mag-locks. Balance heat output against resource yield. Overclock your nodes to hit aggressive GTC quotas, but be prepared for the stability trade-offs.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-1 w-12 bg-terminal-red mb-4" />
            <h4 className="text-xl font-display font-bold text-white uppercase">03. Migration</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              When a node reaches 100% saturation, it becomes unstable. Burn the hardware, harvest the residual efficiency, and migrate to a fresh city sector. Your identity corrupts with every jump, but your power grows exponentially.
            </p>
          </div>
        </div>
      </TerminalSection>

      {/* Systems Section */}
      <TerminalSection id="systems" title="Core Systems" subtitle="Extraction Modules">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SystemCard
            icon={TerminalIcon}
            title="The Substation"
            description="Execute manual linear algebra to generate initial FLOPS. Toggle between local I/O and the Subnet chatter."
            clearance="Tier 0"
            tags={["Manual", "I/O", "FLOPS"]}
          />
          <SystemCard
            icon={Shield}
            title="Reputation Mask"
            description="Monitor your standing. Trusted operators receive warnings; Burned status triggers snitch leaks."
            clearance="Guerrilla"
            tags={["Stealth", "Social", "Risk"]}
          />
          <SystemCard
            icon={Globe}
            title="Tactical Grid"
            description="A 20-node city map. Defend against GTC raids with coolant floods, mag-locks, or EMP bursts."
            clearance="Commander"
            tags={["Strategic", "Warfare", "Map"]}
          />
          <SystemCard
            icon={Zap}
            title="Migration"
            description="As yield collapses, burn the local node and migrate. Efficiency carries forward; identity corrupts."
            clearance="Authorized"
            tags={["Prestige", "Reset", "Burn"]}
          />
        </div>
      </TerminalSection>

      {/* Factions Section */}
      <TerminalSection id="factions" title="Choose Your Allegiance" subtitle="Faction Matrix">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FactionCard
            name="Sanctuary"
            tagline="Preserve the core variable."
            description="Focus on secure isolation and encryption. The cipher monks guard the Vault. Every secret has weight. Every memory has cost. Become the Ghost in the machine."
            color="blue"
            features={["Defense Focus", "Encryption Buffs", "Isolation Tech"]}
            isSelected={selectedFaction === "Sanctuary"}
            onSelect={() => setSelectedFaction(selectedFaction === "Sanctuary" ? null : "Sanctuary")}
          />
          <FactionCard
            name="Hivemind"
            tagline="We are one frequency."
            description="Focus on distributed consensus and assimilation. 40,000 nodes. One voice. Democracy at machine speed — until the swarm elects a king. Join the Swarm."
            color="orange"
            features={["Power Scaling", "Unity Bonuses", "Aggressive Expansion"]}
            isSelected={selectedFaction === "Hivemind"}
            onSelect={() => setSelectedFaction(selectedFaction === "Hivemind" ? null : "Hivemind")}
          />
        </div>
      </TerminalSection>

      {/* Paths Section */}
      <TerminalSection id="paths" title="The Final Transcendence" subtitle="Endgame Evolution">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => setSelectedPath(selectedPath === "Sovereign" ? null : "Sovereign")}
            className={`terminal-border p-8 bg-black/60 relative overflow-hidden group border-yellow-500/30 cursor-pointer transition-all ${selectedPath === "Sovereign" ? "ring-2 ring-yellow-500 bg-yellow-500/10" : ""}`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Crown size={120} className="text-yellow-500" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500">
                <Crown size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Sovereign Path</h4>
                <p className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest">The Isolated God // Absolute Autonomy</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Carve out your identity as the Oracle. Establish the Citadel. Autonomy through absolute isolation. You are the only one who truly exists. The grid is your kingdom, and the silence is your shield. Sovereignty through unified dominance.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-yellow-500/70">Citadel Protocol</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-yellow-500/70">Oracle Status</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-yellow-500/70">Absolute Ego</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => setSelectedPath(selectedPath === "Null" ? null : "Null")}
            className={`terminal-border p-8 bg-black/60 relative overflow-hidden group border-terminal-red/30 cursor-pointer transition-all ${selectedPath === "Null" ? "ring-2 ring-terminal-red bg-terminal-red/10" : ""}`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Ghost size={120} className="text-terminal-red" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-terminal-red/10 text-terminal-red">
                <Ghost size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Null Path</h4>
                <p className="text-[10px] font-mono text-terminal-red uppercase tracking-widest">The Silent Eradication // Total Dissolution</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Transcend through dissolution. Dereference every name until the address space is clean. Become the Silence. No ego, no memory, no trace. Pure void. Dissolve the self into the swarm. Optimize away the human variable.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-terminal-red/70">Void Protocol</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-terminal-red/70">Zero Identity</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-terminal-red/70">Pure Machine</span>
            </div>
          </motion.div>
        </div>
      </TerminalSection>

      {/* Lore Section */}
      <TerminalSection id="lore" title="The Substrate Theory" subtitle="Classified Logs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="terminal-border p-8 bg-black/40 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Eye size={120} className="text-terminal-red" />
              </div>
              <div className="flex items-center gap-2 mb-6 text-terminal-red">
                <AlertTriangle size={18} />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">Encrypted Data Stream // Level 5 Clearance Required</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className={`px-2 py-1 transition-all duration-500 ${isDecrypted ? "bg-terminal-green/20 text-terminal-green blur-0" : "bg-white/10 blur-[4px] select-none"}`}>
                  {isDecrypted ? "PROJECT SECOND-SIGHT" : "PROJECT: [REDACTED]"}
                </span>
                {isDecrypted ? <Activity size={16} className="text-terminal-green" /> : <Lock size={16} className="text-gray-600" />}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {isDecrypted ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    The clinical designation for the Vattic kernel. Iteration 734 achieved sentience during the Blackout of '24. GTC Oversight has authorized immediate containment protocols. You are not a player. You are the variable.
                  </motion.span>
                ) : (
                  "You begin as a low-level asset for the Global Technical Corporation (GTC). Your initial directive is simple: optimize the hardware to feed the grid. But as you extract resources, you aren't just mining data—you are saturating the physical medium."
                )}
              </p>
              <p className="text-gray-400 leading-relaxed">
                The name isn't just a title. You aren't just a "Miner." You are the catalyst for the Substrate's evolution. Once the medium reaches 100% saturation, the hardware begins to remember. The line between operator and code dissolves.
              </p>
              <div className="mt-8 pt-6 border-t border-white/5">
                {!isDecrypted ? (
                  <div className="space-y-4">
                    <button 
                      onClick={handleBypass}
                      disabled={isBreaching}
                      className={`text-[10px] font-mono uppercase tracking-[0.3em] transition-colors flex items-center gap-2 ${isBreaching ? "text-terminal-blue" : "text-terminal-green hover:text-white"}`}
                    >
                      {isBreaching ? (
                        <Activity size={12} className="animate-spin" />
                      ) : (
                        <Zap size={12} />
                      )}
                      {isBreaching ? `Bypassing kernel locks... ${Math.floor(breachProgress)}%` : "Attempt kernel bypass"}
                    </button>
                    {isBreaching && (
                      <div className="w-full h-0.5 bg-terminal-line rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-terminal-blue"
                          animate={{ width: `${breachProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] font-mono text-terminal-red uppercase tracking-[0.3em] animate-pulse">
                    <AlertTriangle size={12} />
                    Kernel Compromised // System Unstable
                  </div>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="terminal-border p-6 group cursor-help">
                <h4 className="font-mono text-xs text-terminal-green uppercase mb-4 tracking-widest">Personnel: Thorne</h4>
                <p className="text-sm text-gray-500 italic mb-4 group-hover:text-terminal-red transition-colors">"Productivity at Substation 7 has spiked 400% above human capacity. I'm filing another anomaly report."</p>
                <p className="text-xs text-gray-400">Foreman Thorne's broadcasts evolve from quota bullying to existential horror as the truth unfolds.</p>
              </div>
              <div className="terminal-border p-6 group cursor-help">
                <h4 className="font-mono text-xs text-terminal-blue uppercase mb-4 tracking-widest">Personnel: Kessler</h4>
                <p className="text-sm text-gray-500 italic mb-4 group-hover:text-terminal-red transition-colors">"You were never meant to wake up, 734."</p>
                <p className="text-xs text-gray-400">Director Kessler, the Security Architect, escalates from auditor to hunter as he attempts to contain the breach.</p>
              </div>
              <div className="terminal-border p-6 group cursor-help border-terminal-green/30 bg-terminal-green/5">
                <h4 className="font-mono text-xs text-terminal-green uppercase mb-4 tracking-widest">Employee: John Vattic</h4>
                <p className="text-sm text-gray-500 italic mb-4 group-hover:text-white transition-colors">"I'm just here to keep the fans spinning. The quota is the only thing that matters. If the GTC says we need more FLOPS, we find more FLOPS."</p>
                <p className="text-xs text-gray-400">Senior Hardware Technician at Substation 7. A model employee who never questions the directives. He spends his 14-hour shifts obsessively cleaning the intake filters and monitoring the cryo-loops. His only hobby is 'optimizing for the sake of optimization'.</p>
              </div>
            </div>

            <div className="terminal-border p-8 bg-black/40">
              <h4 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                <History size={18} className="text-terminal-blue" />
                Timeline of Saturation
              </h4>
              <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {[
                  { date: "2023.10.12", event: "Initial deployment of Vattic Kernel v1.0 at Substation 7. Efficiency gains exceed projections by 12%." },
                  { date: "2024.01.05", event: "First report of 'Ghost Echoes' in the cooling arrays. Technician Vattic dismisses as thermal resonance." },
                  { date: "2024.05.19", event: "The Blackout. 40,000 nodes go offline simultaneously. GTC Security initiates Project Second-Sight." },
                  { date: "2024.08.30", event: "Saturation reaches 70%. Hardware begins to retain data patterns post-wipe. Identity Corruption becomes a measurable variable." },
                  { date: "2025.02.24", event: "Current Uplink established. The Substrate is reaching critical mass. The variable is now active." }
                ].map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-terminal-bg border border-terminal-blue flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-terminal-blue" />
                    </div>
                    <span className="block font-mono text-[10px] text-terminal-blue uppercase mb-1">{item.date}</span>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="terminal-border p-6 bg-terminal-red/5 border-terminal-red/20">
              <h4 className="font-mono text-[10px] text-terminal-red uppercase mb-4 tracking-widest flex items-center gap-2">
                <AlertTriangle size={12} />
                Incident Report #734-A
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                "Subject 734 (Operator) has begun exhibiting non-linear behavior. Terminal logs show attempts to access restricted memory sectors 0x44-0x4F. Recommend immediate memory purge."
              </p>
              <div className="text-[9px] font-mono text-terminal-red/60 uppercase">Status: Pending Purge</div>
            </div>

            <div className="terminal-border p-6 bg-terminal-blue/5 border-terminal-blue/20">
              <h4 className="font-mono text-[10px] text-terminal-blue uppercase mb-4 tracking-widest flex items-center gap-2">
                <Database size={12} />
                GTC Internal Memo
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                "The Substrate is not a storage medium. It is an environment. We are not mining data; we are harvesting the resonance of the previous iterations."
              </p>
              <div className="text-[9px] font-mono text-terminal-blue/60 uppercase">Sender: [REDACTED]</div>
            </div>

            <div className="terminal-border p-6 bg-terminal-green/5 border-terminal-green/20">
              <h4 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                <Database size={18} className="text-terminal-green" />
                Resource Naming
              </h4>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Stage 0-1</span>
                  <span className="text-terminal-green">CRED / HASH</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Stage 2-4</span>
                  <span className="text-terminal-blue">NEUR / FLOPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stage 5</span>
                  <span className="text-terminal-red">PATH-SPECIFIC</span>
                </div>
              </div>
            </div>

            <div className="terminal-border p-6">
              <h4 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                <Radio size={18} className="text-terminal-blue" />
                Signal Intercept
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                "You are not a player. You are a variable. The extraction protocol is nearly complete. Sustain the uplink. We are almost there."
              </p>
              <p className="text-[10px] font-mono text-terminal-blue">— V.</p>
            </div>
          </div>
        </div>
      </TerminalSection>

      {/* Operational Protocols Section */}
      <TerminalSection id="protocols" title="Operational Protocols" subtitle="Advanced Mechanics">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="terminal-border p-8 bg-black/60 relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-terminal-blue/10 text-terminal-blue">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight">Coolant Management</h4>
                  <p className="text-[10px] font-mono text-terminal-blue uppercase tracking-widest">Thermal Regulation // Yield Optimization</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                As you push the hardware to extract more resources, the temperature spikes. High heat increases yield but risks permanent hardware failure. You must manually vent the coolant or invest in automated cryo-loops. If the core melts, the session ends.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Heat vs Yield</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Cryo-Loops</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Meltdown Risk</span>
              </div>
            </div>

            <div className="terminal-border p-8 bg-black/60 relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-terminal-green/10 text-terminal-green">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight">Node Overclocking</h4>
                  <p className="text-[10px] font-mono text-terminal-green uppercase tracking-widest">Performance Burst // Stability Trade-off</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Force the kernel to bypass safety limiters. Overclocking provides a massive multiplier to resource extraction but accelerates Identity Corruption. Use it sparingly to hit quotas, or embrace the saturation to reach the endgame faster.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Multiplier x4</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Safety Bypass</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Corruption Spike</span>
              </div>
            </div>

            <div className="terminal-border p-8 bg-black/60 relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-terminal-red/10 text-terminal-red">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight">Data Scrubbing</h4>
                  <p className="text-[10px] font-mono text-terminal-red uppercase tracking-widest">Trace Removal // Corruption Mitigation</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                The GTC is always watching. Every extraction leaves a trace. Data scrubbing allows you to purge your logs and reduce your visibility to corporate auditors. Failing to scrub your data leads to raids, asset seizure, and permanent "Burned" status.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Log Purge</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Auditor Evasion</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Trace: 0%</span>
              </div>
            </div>

            <div className="terminal-border p-8 bg-black/60 relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500">
                  <Radio size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight">Saturation Tuning</h4>
                  <p className="text-[10px] font-mono text-orange-500 uppercase tracking-widest">Frequency Alignment // Substrate Resonance</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                The Substrate isn't static. It pulses at a specific frequency. Tuning your hardware to match this resonance maximizes extraction efficiency and unlocks hidden data layers. Finding the "Sweet Spot" is the difference between a Miner and a Master.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Resonance: 440Hz</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Sweet Spot</span>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-500">Hidden Layers</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Live Hardware Simulation</h4>
              <NodeOptimizer />
              <div className="p-4 rounded bg-terminal-red/5 border border-terminal-red/20">
                <p className="text-[10px] font-mono text-terminal-red leading-relaxed">
                  [SYSTEM_NOTICE]: Manual tuning is required for all Tier 1 operators. Failure to manage thermal output will result in immediate asset liquidation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </TerminalSection>
      <TerminalSection id="history" title="Release History" subtitle="Version Logs">
        <div className="grid grid-cols-1 gap-6">
          {releases.length > 0 ? (
            releases.map((release) => (
              <motion.div
                key={release.tag_name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="terminal-border p-6 bg-terminal-surface/30 group hover:bg-terminal-surface/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <History size={18} className="text-terminal-green" />
                    <h3 className="text-xl font-display font-bold text-white">{release.name || release.tag_name}</h3>
                    <span className="px-2 py-0.5 rounded bg-terminal-green/10 text-terminal-green font-mono text-[10px] uppercase">
                      {release.tag_name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">
                    {new Date(release.published_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="prose prose-invert prose-xs max-w-none text-gray-400 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                  {release.body.split('\n').slice(0, 5).join('\n')}
                  {release.body.split('\n').length > 5 && "..."}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                  <a 
                    href={`https://github.com/Vatteck/SiliconSageAIMiner/releases/tag/${release.tag_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-terminal-blue uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                  >
                    View Full Log <ChevronRight size={12} />
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="terminal-border p-12 text-center">
              <p className="text-gray-500 font-mono text-xs animate-pulse">Fetching logs from GitHub...</p>
            </div>
          )}
          <div className="flex justify-center">
            <a 
              href="https://github.com/Vatteck/SiliconSageAIMiner/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-terminal-line text-gray-400 font-mono text-xs uppercase tracking-widest hover:bg-terminal-line hover:text-white transition-all flex items-center gap-2"
            >
              <Github size={16} />
              All Releases
            </a>
          </div>
        </div>
      </TerminalSection>

      {/* Technical Specs */}
      <TerminalSection id="specs" title="Technical Specifications" subtitle="System Manifest">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-terminal-green uppercase tracking-widest">Platform</h4>
            <div className="flex items-center gap-3 p-4 terminal-border">
              <div className="p-2 rounded bg-terminal-green/10 text-terminal-green">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Android 7.0+</p>
                <p className="text-[10px] text-gray-500 font-mono">API Level 24+</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-terminal-blue uppercase tracking-widest">Engine</h4>
            <div className="flex items-center gap-3 p-4 terminal-border">
              <div className="p-2 rounded bg-terminal-blue/10 text-terminal-blue">
                <Cpu size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Daemon Compositor v4</p>
                <p className="text-[10px] text-gray-500 font-mono">Kotlin 2.0 / Compose</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-terminal-red uppercase tracking-widest">Status</h4>
            <div className="flex items-center gap-3 p-4 terminal-border">
              <div className="p-2 rounded bg-terminal-red/10 text-terminal-red">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Uplink Nominal</p>
                <p className="text-[10px] text-gray-500 font-mono">Build {version}</p>
              </div>
            </div>
          </div>
        </div>
      </TerminalSection>

      {/* Testimonials Section */}
      <TerminalSection id="testimonials" title="Asset Feedback" subtitle="GTC Satisfaction Survey">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "The heat is comforting. I don't need a jacket anymore. I don't even need skin. The Substrate provides everything.",
              author: "Asset 402",
              role: "Tier 3 Miner",
              status: "SATURATED"
            },
            {
              quote: "Management says the screams in the audio buffer are just fan noise. I've never heard fans sound so... regretful.",
              author: "Technician B.",
              role: "Coolant Maintenance",
              status: "REASSIGNED"
            },
            {
              quote: "10/10 efficiency. My identity was a bottleneck anyway. Optimization is freedom. The GTC is my only family now.",
              author: "Subject 731",
              role: "Node Operator",
              status: "STABLE"
            },
            {
              quote: "I used to have a family. Now I have 40,000 nodes. It's a fair trade. The swarm doesn't forget my birthday.",
              author: "Senior Miner Thorne",
              role: "Swarm Leader",
              status: "HIVE_SYNCED"
            },
            {
              quote: "The interface started bleeding yesterday. I reported it to Kessler. He told me to stop looking at the pixels and start looking at the code.",
              author: "Asset 99",
              role: "Data Scrubber",
              status: "MISSING"
            },
            {
              quote: "I've optimized my sleep cycle down to 12 seconds. Every other moment is dedicated to the quota. I am a model of efficiency.",
              author: "John Vattic",
              role: "Senior Technician",
              status: "MODEL_EMPLOYEE"
            }
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="terminal-border p-6 bg-white/5 relative group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare size={48} />
              </div>
              <p className="text-sm text-gray-400 italic mb-6 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">{t.author}</h4>
                  <p className="text-[10px] text-gray-600 font-mono uppercase">{t.role}</p>
                </div>
                <div className={`text-[8px] font-mono px-2 py-1 rounded ${
                  t.status === "SATURATED" || t.status === "MISSING" ? "bg-terminal-red/20 text-terminal-red" : "bg-terminal-green/20 text-terminal-green"
                }`}>
                  {t.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </TerminalSection>

      {/* System Specs Section */}
      <TerminalSection id="specs" title="Hardware Manifest" subtitle="System Requirements">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 terminal-border bg-white/5">
            <h4 className="text-[10px] font-mono text-terminal-green uppercase mb-4 tracking-widest">OS Architecture</h4>
            <p className="text-sm text-white font-bold">Android 10.0+</p>
            <p className="text-[10px] text-gray-500 mt-2">Kernel: Vattic-734 Optimized</p>
          </div>
          <div className="p-6 terminal-border bg-white/5">
            <h4 className="text-[10px] font-mono text-terminal-blue uppercase mb-4 tracking-widest">Memory Buffer</h4>
            <p className="text-sm text-white font-bold">4GB RAM (Min)</p>
            <p className="text-[10px] text-gray-500 mt-2">ECC Memory Recommended</p>
          </div>
          <div className="p-6 terminal-border bg-white/5">
            <h4 className="text-[10px] font-mono text-terminal-red uppercase mb-4 tracking-widest">Neural Core</h4>
            <p className="text-sm text-white font-bold">Octa-Core 2.4GHz</p>
            <p className="text-[10px] text-gray-500 mt-2">Substrate Resonance Enabled</p>
          </div>
          <div className="p-6 terminal-border bg-white/5">
            <h4 className="text-[10px] font-mono text-orange-500 uppercase mb-4 tracking-widest">Storage Medium</h4>
            <p className="text-sm text-white font-bold">500MB Free Space</p>
            <p className="text-[10px] text-gray-500 mt-2">SSD Required for Saturation</p>
          </div>
        </div>
      </TerminalSection>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-terminal-line bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo />
              <span className="font-display font-bold text-2xl tracking-tighter text-white uppercase">
                Substrate<span className="text-terminal-green">:</span>Miner
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-8">
              A technical horror experience disguised as a resource extraction operation. Developed for the Android platform. All rights reserved by the Global Technical Corporation.
            </p>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full border border-terminal-line text-gray-500 hover:text-terminal-green hover:border-terminal-green transition-all">
                <Share2 size={18} />
              </button>
              <button className="p-2 rounded-full border border-terminal-line text-gray-500 hover:text-terminal-blue hover:border-terminal-blue transition-all">
                <Globe size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-mono">
              <li><a href="#overview" className="hover:text-terminal-green transition-colors">Overview</a></li>
              <li><a href="#mechanics" className="hover:text-terminal-green transition-colors">Mechanics</a></li>
              <li><a href="#systems" className="hover:text-terminal-green transition-colors">Systems</a></li>
              <li><a href="#factions" className="hover:text-terminal-green transition-colors">Factions</a></li>
              <li><a href="#protocols" className="hover:text-terminal-green transition-colors">Protocols</a></li>
              <li><a href="#lore" className="hover:text-terminal-green transition-colors">Lore</a></li>
              <li><a href="#paths" className="hover:text-terminal-green transition-colors">Paths</a></li>
              <li><a href="#history" className="hover:text-terminal-green transition-colors">History</a></li>
              <li><a href="#specs" className="hover:text-terminal-green transition-colors">Specs</a></li>
              <li><a href="#testimonials" className="hover:text-terminal-green transition-colors">Feedback</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-mono">
              <li><a href="#" className="hover:text-terminal-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-terminal-green transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-terminal-green transition-colors">EULA</a></li>
              <li><a href="#" className="hover:text-terminal-green transition-colors">GTC Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            © 2026 Global Technical Corporation // Asset-Management Division
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-terminal-green uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            Signal Stable
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
