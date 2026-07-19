import { motion } from "motion/react";

function CircuitryBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-20">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <path d="M0 20 L60 20 L80 40 L140 40 L160 20 L200 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-terminal-green/30" />
            <path d="M0 100 L40 100 L60 120 L120 120 L140 100 L200 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-terminal-blue/30" />
            <path d="M0 180 L80 180 L100 160 L160 160 L180 180 L200 180" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-terminal-red/30" />
            
            {/* Vertical lines */}
            <path d="M20 0 L20 60 L40 80 L40 140 L20 160 L20 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-terminal-green/30" />
            <path d="M100 0 L100 40 L120 60 L120 120 L100 140 L100 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-terminal-blue/30" />
            <path d="M180 0 L180 80 L160 100 L160 160 L180 180 L180 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-terminal-red/30" />

            {/* Nodes */}
            <circle cx="60" cy="20" r="1.5" className="fill-terminal-green/50" />
            <circle cx="140" cy="100" r="1.5" className="fill-terminal-blue/50" />
            <circle cx="100" cy="160" r="1.5" className="fill-terminal-red/50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>

      {/* Animated Pulses */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5],
              filter: ["blur(0px)", "blur(4px)"]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-1 h-1 bg-terminal-green rounded-full shadow-[0_0_10px_#00ff41]"
          />
        ))}
      </div>
    </div>
  );
}

export default CircuitryBackground;
