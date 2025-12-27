import { Moon, Sun, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { motionMedium } from "./ui/motion";
import { useEffect, useState } from "react";

export default function PublicHeader({ onSignOut }) {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-50 h-16 bg-background/70 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <button
          onClick={() => window.location.reload()}
          className="text-2xl font-extrabold tracking-tighter uppercase text-foreground hover:opacity-80 transition"
        >
          JIITMart
        </button>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={motionMedium}
            className="rounded-full p-2 text-foreground hover:bg-muted"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* SIGN OUT */}
          {onSignOut && (
            <motion.button
              onClick={onSignOut}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={motionMedium}
              className="rounded-full p-2 text-foreground hover:bg-muted"
            >
              <LogOut size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
