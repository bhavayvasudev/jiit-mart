import { Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function PublicHeader() {
  return (
    <header
      className="
        sticky top-0 z-50
        h-16
        border-b border-white/10
        bg-background/70
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex h-full max-w-6xl
          items-center justify-between
          px-6
        "
      >
        {/* Brand */}
        <span
          className="
            text-xl font-semibold
            tracking-tight
            text-white
          "
        >
          JIITMart
        </span>

        {/* Actions */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          transition={motionMedium}
          className="
            rounded-full
            p-2
            text-white/80
            hover:bg-white/10
            focus:outline-none
          "
          aria-label="Toggle theme"
        >
          <Moon size={18} />
        </motion.button>
      </div>
    </header>
  );
}
