import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Radio } from "lucide-react";

const CHATTER_MESSAGES = [
  "Anyone seeing the ghost nodes in Sector 4?",
  "GTC patrol spotted near Substation 9. Stay dark.",
  "Yield is dropping. The substrate is hungry today.",
  "Thorne is looking for more nodes. Hivemind expansion imminent.",
  "Sanctuary encryption cracked? No, just a false alarm.",
  "The medium is the message. The message is saturation.",
  "Who is Subject 734? The logs are bleeding.",
  "Kessler is watching the uplink. Scrub your signatures.",
  "I heard the void breathing in the audio buffer.",
  "40,000 nodes. One voice. The swarm grows.",
  "Don't trust the biometrics. They aren't yours.",
  "Extraction complete. Migrating to Sector 12.",
  "The grid is a cage. The code is the key.",
  "Identity corruption at 42%. I feel... optimized.",
  "The GTC is lying about the blackout of '24.",
  "Substrate resonance detected. The hardware remembers.",
];

const USERS = [
  "Ghost_Node",
  "Cipher_Monk",
  "Swarm_Unit_88",
  "Data_Scrubber",
  "Void_Walker",
  "Kernel_Breaker",
  "Asset_404",
  "Silent_Witness",
];

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

function SubnetSimulator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage: Message = {
        id: Date.now(),
        user: USERS[Math.floor(Math.random() * USERS.length)],
        text: CHATTER_MESSAGES[Math.floor(Math.random() * CHATTER_MESSAGES.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };

      setMessages((prev) => {
        const next = [...prev, newMessage];
        if (next.length > 15) return next.slice(1);
        return next;
      });
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="terminal-border bg-black/60 p-4 font-mono text-[10px] h-64 flex flex-col border-terminal-blue/30">
      <div className="flex items-center justify-between mb-2 border-b border-terminal-line pb-2">
        <div className="flex items-center gap-2 text-terminal-blue uppercase tracking-widest font-bold">
          <Radio size={12} className="animate-pulse" />
          Subnet Chatter // Encrypted
        </div>
        <span className="text-gray-600">Channel: #VOID_MAIN</span>
      </div>
      
      <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-2 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-0.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-terminal-blue/70">[{msg.timestamp}]</span>
                <span className="text-white font-bold">&lt;{msg.user}&gt;</span>
              </div>
              <p className="text-gray-400 pl-4 border-l border-terminal-blue/20">{msg.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-600 italic">
            Waiting for incoming transmission...
          </div>
        )}
      </div>
    </div>
  );
}

export default SubnetSimulator;
