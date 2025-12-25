import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ item, cart, addToCart, removeFromCart }) {
  const cartItem = cart.find((c) => c._id === item._id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="glass p-4 flex flex-col gap-3 rounded-2xl transition-all hover:scale-[1.02] relative group">
      <div className="relative overflow-hidden rounded-xl bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <AnimatePresence>
          {qty > 0 && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
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

      <div className="mt-auto h-10 relative">
        <AnimatePresence mode="wait" initial={false}>
          {qty > 0 ? (
            <motion.div
              key="controls"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-between bg-black dark:bg-white rounded-xl p-1 h-full w-full shadow-md"
            >
              <button onClick={() => removeFromCart(item, true)} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white rounded-lg active:scale-90 transition-transform">
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="text-white dark:text-black text-sm font-bold w-6 text-center">{qty}</span>
              <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white rounded-lg active:scale-90 transition-transform">
                <Plus size={14} strokeWidth={3} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="add"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => addToCart(item)}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={16} /> Add
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}