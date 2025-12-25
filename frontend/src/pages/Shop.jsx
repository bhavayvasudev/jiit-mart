import { ArrowLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Shop({ category, products, cart, addToCart, removeFromCart, setView }) {
  const items = products.filter((p) => p.category === category);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto mt-6">
        <button
          onClick={() => setView("home")}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 pb-20">
          {items.map((i) => (
            <ProductCard
              key={i._id}
              item={i}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}