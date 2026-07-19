import { motion } from "motion/react";
import { Crown, Shield, Ghost } from "lucide-react";

interface FactionCardProps {
  name: string;
  tagline: string;
  description: string;
  color: "blue" | "orange";
  features: string[];
  isSelected?: boolean;
  onSelect?: () => void;
}

function FactionCard({ name, tagline, description, color, features, isSelected, onSelect }: FactionCardProps) {
  const isBlue = color === "blue";
  const accentColor = isBlue ? "text-terminal-blue" : "text-orange-500";
  const bgColor = isBlue ? "bg-terminal-blue/10" : "bg-orange-500/10";
  const borderColor = isBlue ? "border-terminal-blue/30" : "border-orange-500/30";
  const hoverBorder = isBlue ? "hover:border-terminal-blue" : "hover:border-orange-500";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onClick={onSelect}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer ${isSelected ? (isBlue ? "border-terminal-blue bg-terminal-blue/20 ring-1 ring-terminal-blue" : "border-orange-500 bg-orange-500/20 ring-1 ring-orange-500") : borderColor} ${bgColor} p-8 ${hoverBorder} transition-all duration-500 group backdrop-blur-md`}
    >
      {/* Glitch Overlay Effect on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-[url('https://picsum.photos/seed/glitch/800/600?blur=10')] bg-cover mix-blend-overlay transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest mb-4 ${isBlue ? "bg-terminal-blue text-black" : "bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.5)]"}`}>
          Allegiance Required
        </div>
        
        <h3 className={`text-3xl font-display font-black mb-1 uppercase tracking-tighter ${accentColor} group-hover:animate-pulse`}>
          {name}
        </h3>
        <p className="text-sm font-mono text-gray-500 mb-6 italic opacity-70">"{tagline}"</p>
        
        <p className="text-gray-300 mb-8 leading-relaxed text-sm">
          {description}
        </p>
        
        <div className="space-y-3 mb-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className={`h-1 w-1 rounded-full ${isBlue ? "bg-terminal-blue shadow-[0_0_5px_#00b4d8]" : "bg-orange-500 shadow-[0_0_5px_#f97316]"}`} />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400 group-hover:text-gray-200 transition-colors">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-20 ${isBlue ? "bg-terminal-blue" : "bg-orange-500"}`} />
    </motion.div>
  );
}

export default FactionCard;
