import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function FloatingCart({ cart, printFile, setView }) {
  const count = cart.reduce((acc, item) => acc + (item.qty || 1), 0) + (printFile ? 1 : 0);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0, y: 50 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setView("cart")}
          className="fixed bottom-6 right-6 flex items-center gap-3 rounded-full bg-primary pl-6 pr-2 py-2 text-primary-foreground shadow-2xl z-40"
        >
          <div className="flex flex-col items-start mr-1">
            <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Checkout</span>
            <span className="text-sm font-bold leading-none">View Cart</span>
          </div>
          <motion.div 
            key={count} 
            initial={{ scale: 0.5 }} animate={{ scale: 1 }}
            className="bg-white dark:bg-black text-black dark:text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm"
          >
            {count}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}