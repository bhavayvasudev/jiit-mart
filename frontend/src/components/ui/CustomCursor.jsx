import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ label }) {
  // 1. Mouse Position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Smooth Spring Physics for "Floating" feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 }; // Snappy but smooth
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Hide cursor when leaving window
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable on touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
      return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex flex-col items-start"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* CUSTOM POINTER SVG (Figma-style Arrow) */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black dark:text-white drop-shadow-md relative z-20"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19827L11.7841 12.3673H5.65376Z"
          fill="currentColor"
          stroke="white" 
          strokeWidth="1" // White outline for contrast
        />
      </svg>

      {/* NAME TAG (Pill shape) */}
      <motion.div
        className="
          ml-4 -mt-4
          px-3 py-1 
          rounded-full rounded-tl-none
          bg-black dark:bg-white 
          text-white dark:text-black
          text-[10px] font-bold uppercase tracking-wider
          shadow-lg
          whitespace-nowrap
        "
        animate={{
          scale: isClicking ? 0.9 : 1, // Subtle bounce on click
        }}
      >
        {label || "Guest"}
      </motion.div>
    </motion.div>
  );
}