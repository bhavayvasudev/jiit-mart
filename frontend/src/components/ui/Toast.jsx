import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass bg-black/80 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-xl border border-white/10">
        <CheckCircle size={18} className="text-green-400" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </motion.div>
  );
}