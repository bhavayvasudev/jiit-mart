import { useState, useEffect } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Printer,
  Utensils,
  ShoppingBag,
  ArrowLeft,
  Trash2,
} from "lucide-react";

import Login from "./pages/Login";
import PublicHeader from "./components/PublicHeader";
// 1. Import the Custom Cursor
import CustomCursor from "./components/ui/CustomCursor";

/* -----------------------------
   MOCK BACKEND (No Real Server Needed)
--------------------------------*/
const w = {
  student_login: async (enrollment, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // ALLOW ANY LOGIN FOR DEMO
    return { 
        token: "mock-token-123", 
        user: { name: enrollment } 
    };
  },
};

/* -----------------------------
   MAIN APP
--------------------------------*/
export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Data State
  const [products, setProducts] = useState([
    { _id: 1, name: "Veg Burger", price: 40, category: "food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60" },
    { _id: 2, name: "Cold Coffee", price: 60, category: "food", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=60" },
    { _id: 3, name: "Notebook", price: 50, category: "essential", image: "https://images.unsplash.com/photo-1531346878377-a51349593f45?auto=format&fit=crop&w=500&q=60" },
    { _id: 4, name: "Pen Set", price: 20, category: "essential", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=500&q=60" },
  ]);
  const [cart, setCart] = useState([]);
  const [printFile, setPrintFile] = useState(null);

  // Order State
  const [deliveryMode, setDeliveryMode] = useState("pickup");
  const [paymentMode, setPaymentMode] = useState("upi");
  const [roomNo, setRoomNo] = useState("");
  const [loading, setLoading] = useState(false);

  /* -----------------------------
     INIT & THEME
  --------------------------------*/
  useEffect(() => {
    // 1. Check Auth
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser({ name: storedUser });
    }

    // 2. Check Theme
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  /* -----------------------------
     AUTH HANDLERS
  --------------------------------*/
  const handleLoginSuccess = () => {
    setUser({ name: localStorage.getItem("username") });
    setView("home");
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    setUser(null);
    setView("home");
    setCart([]);
  };

  /* -----------------------------
     CART LOGIC
  --------------------------------*/
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  /* -----------------------------
     PRINT LOGIC (MOCK)
  --------------------------------*/
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    // Mock Upload Delay
    setTimeout(() => {
        setPrintFile({ filename: file.name, cost: 20 });
        setLoading(false);
    }, 1500);
  };

  /* -----------------------------
     ORDER LOGIC (MOCK)
  --------------------------------*/
  const placeOrder = async () => {
    if (deliveryMode === "delivery" && !roomNo) {
      alert("Enter room number");
      return;
    }

    // Mock Order Success
    setTimeout(() => {
        setCart([]);
        setPrintFile(null);
        setView("home");
        alert("Order placed successfully!");
    }, 1000);
  };

  /* -----------------------------
     COMPONENTS
  --------------------------------*/
  const ProductCard = ({ item }) => (
    <div className="glass p-4 flex flex-col gap-3 rounded-2xl transition-all hover:scale-[1.02]">
      <img
        src={item.image}
        alt={item.name}
        className="h-32 w-full rounded-xl object-cover"
      />
      <div>
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground">₹{item.price}</p>
      </div>
      <button
        onClick={() => addToCart(item)}
        className="mt-auto rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );

  /* -----------------------------
     ROUTING & RENDER
  --------------------------------*/
  
  // 1. Login Screen
  if (!user) {
    return (
      <>
        {/* ADD CURSOR */}
        <CustomCursor />
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          w={w} 
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </>
    );
  }

  // Common Header Props for authenticated views
  const headerProps = {
    isDarkMode,
    toggleTheme,
    onSignOut: handleSignOut
  };

  // 2. Authenticated Home
  if (view === "home") {
    const actions = [
      {
        title: "Canteen",
        icon: <Utensils size={32} />,
        desc: "Order food from campus vendors",
        action: () => setView("canteen"),
      },
      {
        title: "Mart",
        icon: <ShoppingBag size={32} />,
        desc: "Daily essentials delivered fast",
        action: () => setView("mart"),
      },
      {
        title: "Print",
        icon: <Printer size={32} />,
        desc: "Upload PDFs & collect prints",
        action: () => setView("print"),
      },
    ];

    return (
      <div className="min-h-screen bg-background flex flex-col transition-colors duration-500">
        {/* ADD CURSOR */}
        <CustomCursor />
        
        <PublicHeader {...headerProps} />

        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <h2 className="mb-12 text-2xl md:text-3xl font-semibold text-foreground/80 text-center">
            What do you want to do?
          </h2>

          <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-3 gap-10">
            {actions.map((item) => (
              <div key={item.title} className="relative group">
                {/* TOOLTIP */}
                <div className="
                    pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2
                    opacity-0 translate-y-2 scale-95
                    transition-all duration-500 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                  ">
                  <div className="relative">
                    <div className="glass px-4 py-2 rounded-lg text-xs font-medium text-foreground shadow-xl whitespace-nowrap">
                      {item.desc}
                    </div>
                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-3 h-3 rotate-45 bg-white/10 backdrop-blur-xl border-r border-b border-white/20" />
                  </div>
                </div>

                {/* CARD */}
                <button
                  onClick={item.action}
                  className="
                    glass h-36 w-full rounded-2xl p-6
                    text-left
                    transition-all duration-500 ease-out
                    hover:scale-[1.04] hover:shadow-2xl
                    focus:outline-none
                  "
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-foreground">{item.icon}</span>
                    <span className="text-lg font-semibold text-foreground">
                      {item.title}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </main>

        <footer className="border-t border-border bg-background/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 px-6 py-4">
            <button className="glass px-6 py-2 rounded-xl text-sm font-medium text-foreground transition hover:scale-105">
              📅 Academic Calendar
            </button>
            <button className="glass px-6 py-2 rounded-xl text-sm font-medium text-foreground transition hover:scale-105">
              🍽️ Mess Menu
            </button>
          </div>
        </footer>

        {(cart.length > 0 || printFile) && (
          <button
            onClick={() => setView("cart")}
            className="
              fixed bottom-6 right-6
              flex items-center gap-2
              rounded-full bg-primary px-5 py-3
              text-primary-foreground
              shadow-xl
              transition hover:scale-105
            "
          >
            <ShoppingCart size={20} />
            {cart.length}
          </button>
        )}
      </div>
    );
  }

  // 3. Sub-pages (Canteen / Mart)
  if (view === "canteen" || view === "mart") {
    const items = products.filter(
      (p) => p.category === (view === "canteen" ? "food" : "essential")
    );

    return (
      <div className="min-h-screen bg-background p-6 transition-colors duration-500">
        {/* ADD CURSOR */}
        <CustomCursor />
        
        <PublicHeader {...headerProps} />
        
        <div className="max-w-7xl mx-auto mt-6">
          <button
            onClick={() => setView("home")}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {items.map((i) => (
              <ProductCard key={i._id} item={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. Cart View
  if (view === "cart") {
    const total =
      cart.reduce((s, i) => s + i.price, 0) + (printFile ? printFile.cost : 0);

    return (
      <div className="min-h-screen bg-background p-6 transition-colors duration-500">
        {/* ADD CURSOR */}
        <CustomCursor />
        
        <PublicHeader {...headerProps} />
        
        <div className="max-w-2xl mx-auto mt-6">
          <button
            onClick={() => setView("home")}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Your Cart</h2>
            
            {cart.length === 0 && !printFile ? (
              <p className="text-muted-foreground">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((i, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-foreground font-medium">{i.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">₹{i.price}</span>
                      <button 
                        onClick={() => removeFromCart(idx)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {printFile && (
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-foreground font-medium">Print Job ({printFile.filename})</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">₹{printFile.cost}</span>
                      <button 
                        onClick={() => setPrintFile(null)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={placeOrder}
                disabled={cart.length === 0 && !printFile}
                className="
                  w-full rounded-xl bg-primary py-4 
                  font-bold text-primary-foreground
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-transform active:scale-[0.98]
                "
              >
                Pay ₹{total}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Print View
  if (view === "print") {
    return (
      <div className="min-h-screen bg-background p-6 transition-colors duration-500">
        {/* ADD CURSOR */}
        <CustomCursor />
        
        <PublicHeader {...headerProps} />
        
        <div className="max-w-xl mx-auto mt-10">
           <button
            onClick={() => setView("home")}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="glass rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Upload Document</h2>
            <p className="text-muted-foreground mb-8">PDF files only (Max 10MB)</p>
            
            <label className="
              cursor-pointer
              block w-full rounded-2xl border-2 border-dashed border-white/20
              bg-white/5 p-10
              hover:bg-white/10 hover:border-white/40
              transition-all
            ">
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileUpload} />
              <Printer className="mx-auto mb-4 text-foreground/50" size={48} />
              <span className="text-sm font-medium text-foreground">Click to upload PDF</span>
            </label>
            
            {loading && <p className="mt-6 text-sm animate-pulse text-primary">Uploading...</p>}
          </div>
        </div>
      </div>
    );
  }

  return null;
}