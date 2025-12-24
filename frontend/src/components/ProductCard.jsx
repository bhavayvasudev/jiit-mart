import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ item, cart, addToCart, removeFromCart }) {
  const cartItem = cart.find((c) => c._id === item._id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="glass p-4 flex flex-col gap-3 rounded-2xl transition-all hover:scale-[1.02] relative group">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.name}
          className="h-32 w-full object-cover bg-muted transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Top Right Badge */}
        <AnimatePresence>
          {qty > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg"
            >
              {qty}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h3 className="font-semibold text-foreground leading-tight">{item.name}</h3>
        <p className="text-sm text-muted-foreground">₹{item.price}</p>
      </div>

      {/* Action Button Area */}
      <div className="mt-auto h-10 relative">
        <AnimatePresence mode="wait" initial={false}>
          {qty > 0 ? (
            // CONTROLS STATE
            <motion.div
              key="controls"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center justify-between bg-black dark:bg-white rounded-xl p-1 h-full w-full shadow-md"
            >
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => removeFromCart(item, true)}
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white rounded-lg"
              >
                <Minus size={14} strokeWidth={3} />
              </motion.button>

              <motion.span
                key={qty} // Triggers pop animation on change
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white dark:text-black text-sm font-bold w-6 text-center"
              >
                {qty}
              </motion.span>

              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => addToCart(item)}
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white rounded-lg"
              >
                <Plus size={14} strokeWidth={3} />
              </motion.button>
            </motion.div>
          ) : (
            // ADD BUTTON STATE
            <motion.button
              key="add"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(item)}
              className="w-full h-full rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={16} />
              Add
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}