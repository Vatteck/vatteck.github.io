import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface SystemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  clearance: string;
  tags: string[];
}

function SystemCard({ icon: Icon, title, description, clearance, tags }: SystemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="terminal-border p-6 flex flex-col h-full group"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-lg bg-terminal-green/10 text-terminal-green group-hover:bg-terminal-green group-hover:text-black transition-colors duration-300">
          <Icon size={24} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-tighter text-gray-500">Clearance Level</p>
          <p className="text-xs font-mono text-terminal-green">{clearance}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-terminal-green transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 pt-4 border-t border-terminal-line">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-terminal-line text-gray-400 uppercase">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default SystemCard;
