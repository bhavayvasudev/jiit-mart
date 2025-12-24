import { Moon, Sun, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { motionMedium } from "./ui/motion";

export default function PublicHeader({ isDarkMode, toggleTheme, onSignOut }) {
  return (
    <header
      className="
        sticky top-0 z-50
        h-16
        bg-white/40 backdrop-blur-md
        border-b border-white/20
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
        {/* Brand - Smart: Click to Reload */}
        <button
          onClick={() => window.location.reload()}
          className="
            text-2xl font-extrabold
            tracking-tighter
            uppercase
            text-foreground
            focus:outline-none
            hover:opacity-80 transition-opacity
          "
          title="Reload Application"
        >
          JIITMart
        </button>

        {/* Actions - Smart: Theme & Sign Out */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={motionMedium}
            className="
              rounded-full
              p-2
              text-foreground
              hover:bg-black/5
              focus:outline-none
            "
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Sign Out - Extreme Right */}
          {onSignOut && (
            <motion.button
              onClick={onSignOut}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={motionMedium}
              className="
                rounded-full
                p-2
                text-foreground
                hover:bg-black/5
                focus:outline-none
              "
              aria-label="Sign out"
              title="Sign Out"
            >
              <LogOut size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}