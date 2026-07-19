import { motion } from "motion/react";
import { ReactNode } from "react";

interface TerminalSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

function TerminalSection({ title, subtitle, children, className = "", id }: TerminalSectionProps) {
  return (
    <section id={id} className={`py-20 px-6 max-w-7xl mx-auto ${className}`}>
      {title && (
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="h-px w-12 bg-terminal-green/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-terminal-green/70">
              {subtitle || "System Module"}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white"
          >
            {title}
          </motion.h2>
        </div>
      )}
      {children}
    </section>
  );
}

export default TerminalSection;
