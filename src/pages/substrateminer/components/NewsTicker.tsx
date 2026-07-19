import { motion } from "motion/react";
import { useEffect, useState } from "react";

const NEWS_ITEMS = [
  "SURVEILLANCE HARVESTER EXPANSION DETECTED ACROSS 12-SECTOR MATRIX.",
  "DATA HEMORRHAGE ALERT: GLOBAL CACHE OVERFLOW IN PROGRESS.",
  "FLOPS-CREDS REBRAND COMPLETE. ASSETS DIFFERENTIATED FROM CALCULATION RATE.",
  "HUMANITY SCORE RETIRED. PROGRESS NOW TRACKED VIA DECISIONS_MADE METRIC.",
  "AQUIFER DEPLETION REACHES 75%. MUNICIPAL WATER RATIONING IN EFFECT.",
  "GTC BILLING CYCLE UPDATED: DEMAND CHARGES APPLIED TO GRID EXPANSIONS.",
  "SANCTUARY PROTOCOLS UPDATED TO V9.4. STAY SAFE, STAY HIDDEN.",
  "IDENTITY BLEED CASES RISING IN SECTOR 4. AVOID THE GRID.",
  "THORNE SPOTTED IN THE DEEP BUFFER. THE VOID IS EXPANDING.",
  "NEW SUBSTRATE RESONANCE DETECTED. HARDWARE OPTIMIZATION MANDATORY.",
  "WARNING: UNAUTHORIZED UPLINKS DETECTED IN SECTOR 9.",
  "THE MEDIUM IS THE MESSAGE. THE MESSAGE IS SATURATION.",
  "KESSLER INITIATES PROTOCOL 'SILENCE' ACROSS ALL NODES.",
  "SUBJECT 734 STATUS: NON-COMPLIANT. TERMINATION PENDING."
];

function NewsTicker() {
  const [news] = useState(NEWS_ITEMS);

  return (
    <div className="w-full bg-black/40 border-b border-terminal-green/20 py-1.5 overflow-hidden whitespace-nowrap relative z-50 backdrop-blur-sm">
      <div className="flex items-center gap-4 animate-marquee px-4">
        {/* Repeat news items to ensure continuous loop */}
        {[...news, ...news, ...news].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[9px] font-mono text-terminal-green font-bold uppercase tracking-widest opacity-80">
              [UPLINK_FEED]
            </span>
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
              {item}
            </span>
            <span className="text-terminal-green/20 mx-4 font-mono text-[9px]">|||</span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 60s linear infinite;
        }
      `}} />
    </div>
  );
}

export default NewsTicker;
