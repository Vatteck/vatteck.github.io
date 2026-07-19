import { motion } from "motion/react";

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-10 h-10 overflow-hidden rounded-lg border border-white/10 ${className}`}>
      {/* Left Side: Purple/Gold */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[#2d1b4d] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:4px_4px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ffd700] fill-current opacity-80">
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z" />
          </svg>
        </div>
      </div>

      {/* Right Side: Black/Red */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ff003c_1px,transparent_1px)] [background-size:3px_3px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border border-terminal-red/50 rounded-sm rotate-45 animate-pulse" />
        </div>
        {/* Red Cracks/Pipes */}
        <div className="absolute top-2 right-1 w-4 h-[1px] bg-terminal-red/40 rotate-12" />
        <div className="absolute bottom-3 right-2 w-3 h-[1px] bg-terminal-red/40 -rotate-45" />
      </div>

      {/* Center Glitch: Green */}
      <motion.div 
        animate={{ 
          opacity: [0.4, 1, 0.4],
          x: [-1, 1, -1]
        }}
        transition={{ duration: 0.2, repeat: Infinity }}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-terminal-green shadow-[0_0_8px_#00ff41]"
      />
      
      {/* Glitch Sparks */}
      <motion.div 
        animate={{ 
          y: ["0%", "100%"],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full blur-[1px]"
      />
    </div>
  );
}

export default Logo;
