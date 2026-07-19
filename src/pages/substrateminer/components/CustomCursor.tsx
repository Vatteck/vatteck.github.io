import { useEffect, useState } from "react";
import { motion } from "motion/react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor if device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsVisible(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mediaQuery.matches) return;
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-terminal-green pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.5 : 1,
          rotate: isPointer ? 45 : 0,
        }}
        transition={{ 
          x: { type: "tween", duration: 0 },
          y: { type: "tween", duration: 0 },
          scale: { type: "spring", damping: 20, stiffness: 250, mass: 0.5 },
          rotate: { type: "spring", damping: 20, stiffness: 250, mass: 0.5 }
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-terminal-green" />
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-terminal-green pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{ 
          x: { type: "tween", duration: 0 },
          y: { type: "tween", duration: 0 }
        }}
      />
    </div>
  );
}

export default CustomCursor;
