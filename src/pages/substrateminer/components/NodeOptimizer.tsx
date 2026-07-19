import { motion } from "motion/react";
import { Zap, Activity, Thermometer, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";

export default function NodeOptimizer() {
  const [overclock, setOverclock] = useState(0);
  const [coolant, setCoolant] = useState(50);
  const [temp, setTemp] = useState(35);
  const [yieldVal, setYieldVal] = useState(1.0);
  const [corruption, setCorruption] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Logic: Overclock increases temp and yield and corruption
      // Coolant decreases temp but slightly decreases yield
      const targetTemp = 30 + (overclock * 15) - (coolant * 0.4);
      setTemp(prev => prev + (targetTemp - prev) * 0.1);
      
      const targetYield = 1.0 + (overclock * 0.5) - (coolant * 0.05);
      setYieldVal(prev => prev + (targetYield - prev) * 0.1);

      if (overclock > 2) {
        setCorruption(prev => Math.min(100, prev + (overclock * 0.05)));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [overclock, coolant]);

  const isOverheating = temp > 85;

  return (
    <div className="terminal-border p-6 bg-black/80 backdrop-blur-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h4 className="font-display font-bold text-white uppercase tracking-tight flex items-center gap-2">
          <Zap size={18} className="text-terminal-green" />
          Node Optimizer v1.4
        </h4>
        <div className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${isOverheating ? "bg-terminal-red text-white animate-pulse" : "bg-terminal-green/10 text-terminal-green"}`}>
          {isOverheating ? "CRITICAL_HEAT" : "STATUS_NOMINAL"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-mono uppercase text-gray-500">
              <span>Overclock Level</span>
              <span className="text-terminal-green">x{overclock}</span>
            </div>
            <input 
              type="range" min="0" max="5" step="1" 
              value={overclock} 
              onChange={(e) => setOverclock(parseInt(e.target.value))}
              className="w-full accent-terminal-green bg-terminal-line h-1 rounded-full appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-mono uppercase text-gray-500">
              <span>Coolant Flow</span>
              <span className="text-terminal-blue">{coolant}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="1" 
              value={coolant} 
              onChange={(e) => setCoolant(parseInt(e.target.value))}
              className="w-full accent-terminal-blue bg-terminal-line h-1 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Readouts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase mb-1">
              <Thermometer size={10} /> Temp
            </div>
            <div className={`text-xl font-display font-bold ${temp > 80 ? "text-terminal-red" : "text-white"}`}>
              {temp.toFixed(1)}°C
            </div>
          </div>
          <div className="p-3 rounded bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase mb-1">
              <Activity size={10} /> Yield
            </div>
            <div className="text-xl font-display font-bold text-terminal-green">
              {yieldVal.toFixed(2)}x
            </div>
          </div>
          <div className="p-3 rounded bg-white/5 border border-white/5 col-span-2">
            <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase mb-1">
              <ShieldAlert size={10} /> Corruption Trace
            </div>
            <div className="w-full h-1 bg-terminal-line rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-terminal-red"
                animate={{ width: `${corruption}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-[9px] font-mono text-gray-600 italic border-t border-white/5 pt-4">
        // WARNING: Sustained overclocking above level 3 may result in permanent identity fragmentation.
      </div>
    </div>
  );
}
