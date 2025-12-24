import { motion } from "framer-motion";
import { motionMedium, motionSlow } from "@/ui/motion";

export default function ActionCard({
  title,
  description,
  icon,
  onClick,
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={motionSlow}
      className="
        relative group
        h-[150px] w-full
        rounded-2xl
        border border-white/10
        bg-white/[0.05]
        backdrop-blur-xl
        p-6
        text-left
        shadow-[0_20px_40px_rgba(0,0,0,0.35)]
        hover:bg-white/[0.07]
        focus:outline-none
      "
    >
      {/* Tooltip wrapper */}
      <div
        className="
          pointer-events-none
          absolute -top-[52px] left-1/2
          -translate-x-1/2
          opacity-0 translate-y-2
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all
          delay-100
        "
        style={motionMedium}
      >
        {/* Tooltip bubble */}
        <div
          className="
            relative
            rounded-xl
            bg-black/70
            backdrop-blur-xl
            px-4 py-2
            text-xs font-medium
            text-white
            shadow-xl
            whitespace-nowrap
          "
        >
          {description}

          {/* Connector */}
          <span
            className="
              absolute left-1/2 top-full
              -translate-x-1/2
              h-2 w-px
              bg-white/30
            "
          />
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col gap-4">
        <span className="text-white/85">{icon}</span>
        <span className="text-lg font-semibold text-white">
          {title}
        </span>
      </div>
    </motion.button>
  );
}
