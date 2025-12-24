import { motion } from "framer-motion";
import { motionMedium, motionSlow } from "@/ui/motion"; // Make sure to fix this import path if needed

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
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={motionSlow}
      className="
        relative group
        h-[180px] w-full
        rounded-3xl
        border border-white/60
        bg-white/60
        backdrop-blur-xl
        p-7
        text-left
        shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        hover:bg-white/80 hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)]
        transition-all
        focus:outline-none
      "
    >
      {/* Icon & Title */}
      <div className="flex flex-col justify-between h-full">
        <div className="
          self-start 
          p-3 rounded-2xl 
          bg-white shadow-sm text-black
        ">
          {icon}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            {title}
          </h3>
          <p className="text-sm font-medium text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}