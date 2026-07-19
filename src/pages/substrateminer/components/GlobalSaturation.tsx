import { motion } from "motion/react";
import { Activity, Zap, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

function GlobalSaturation() {
  const [value, setValue] = useState(84.293);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        const increment = Math.random() * 0.001;
        return prev + increment;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black border-b border-terminal-line py-2 px-6 overflow-hidden relative group">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-terminal-green uppercase tracking-widest">
            <Activity size={12} className="animate-pulse" />
            Global Saturation
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="text-xs font-mono text-white font-bold">
            {value.toFixed(5)}%
          </div>
        </div>

        <div className="flex-1 h-1.5 bg-terminal-line rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-terminal-green via-terminal-blue to-terminal-red"
            animate={{ width: `${value}%` }}
            transition={{ duration: 2, ease: "linear" }}
          />
          {/* Pulse effect */}
          <motion.div 
            className="absolute inset-0 bg-white/20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
            <Zap size={10} />
            Nodes Active: <span className="text-white">41,209</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
            <AlertTriangle size={10} className="text-terminal-red" />
            Breach Imminent
          </div>
        </div>
      </div>
      
      {/* Glitch line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-terminal-red w-full opacity-0 group-hover:opacity-50"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default GlobalSaturation;
