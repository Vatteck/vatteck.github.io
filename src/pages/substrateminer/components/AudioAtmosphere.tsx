import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TRACK_LIST = [
  "Substrate Pulse",
  "Vattic's Lament",
  "GTC Oversight",
  "Saturation Point",
  "The Blackout of '24",
  "Kernel Breach"
];

export default function AudioAtmosphere() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
      } else {
        audioRef.current.pause();
      }
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4">
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder: Replace with your BGM URL
      />
      <button 
        onClick={toggleMute}
        className="p-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-gray-500 hover:text-terminal-green hover:border-terminal-green transition-all group relative"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
      </button>

      <div className="flex flex-col gap-1">
        <div className="px-3 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono uppercase tracking-widest text-gray-400 backdrop-blur-sm">
          {isMuted ? "Audio Offline" : "Atmosphere Active"}
        </div>
        {!isMuted && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-3 py-2 bg-black/80 border border-white/10 rounded backdrop-blur-sm"
          >
            <p className="text-[9px] font-mono text-terminal-green uppercase mb-2 tracking-tighter">Current Playlist:</p>
            <ul className="space-y-1">
              {TRACK_LIST.map((track, i) => (
                <li key={track} className="text-[8px] font-mono text-gray-500 flex items-center gap-2">
                  <span className={i === 0 ? "text-terminal-green animate-pulse" : ""}>▶</span>
                  {track}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
