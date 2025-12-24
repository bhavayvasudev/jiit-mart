import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Print from "./pages/Print";

import PublicHeader from "./components/PublicHeader";
import CustomCursor from "./components/ui/CustomCursor";
import Toast from "./components/ui/Toast";
import FloatingCart from "./components/FloatingCart";

/* -----------------------------
   MOCK BACKEND
--------------------------------*/
const w = {
  student_login: async (enrollment, password) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { token: "mock-token-123", user: { name: enrollment } };
  },
};

export default function App() {
  // --- GLOBAL STATE ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("username");
    return saved ? { name: saved } : null;
  });
  const [view, setView] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Cart & Orders
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [savedLocations, setSavedLocations] = useState(() => JSON.parse(localStorage.getItem("savedLocations")) || []);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [paymentMode, setPaymentMode] = useState(() => localStorage.getItem("paymentMode") || "upi");
  const [printFile, setPrintFile] = useState(null);

  // Mock Products
  const [products] = useState([
    { _id: 1, name: "Veg Burger", price: 40, category: "food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60" },
    { _id: 2, name: "Cold Coffee", price: 60, category: "food", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=60" },
    { _id: 3, name: "Notebook", price: 50, category: "essential", image: "https://images.unsplash.com/photo-1531346878377-a51349593f45?auto=format&fit=crop&w=500&q=60" },
    { _id: 4, name: "Pen Set", price: 20, category: "essential", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=500&q=60" },
  ]);

  // --- EFFECTS ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("savedLocations", JSON.stringify(savedLocations)); }, [savedLocations]);
  useEffect(() => { localStorage.setItem("paymentMode", paymentMode); }, [paymentMode]);

  // --- ACTIONS ---
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("username", "student");
    setUser({ name: "student" });
    setView("home");
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    setUser(null);
    setView("home");
    setCart([]);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) => i._id === item._id ? { ...i, qty: (i.qty || 1) + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    if (!cart.find((c) => c._id === item._id)) {
      setToastMsg(`${item.name} added`);
    }
  };

  const removeFromCart = (itemOrIndex, decrease = false) => {
    setCart((prev) => {
      if (decrease) {
        const item = itemOrIndex;
        return prev.map((i) => (i._id === item._id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0);
      } else {
        const index = itemOrIndex;
        return prev.filter((_, i) => i !== index);
      }
    });
  };

  const updateQuantity = (index, delta) => {
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item))
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setPrintFile({ filename: file.name, cost: 20 });
      setLoading(false);
    }, 1500);
  };

  const placeOrder = () => {
    if (!selectedLocation) return alert("Please select a delivery location.");
    const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0) + (printFile ? printFile.cost : 0) + 5;
    setLoading(true);
    setTimeout(() => {
      setCart([]);
      setPrintFile(null);
      setLoading(false);
      setView("home");
      alert(`Order placed! Total: ₹${total} (Cash: ${paymentMode === "cash"})`);
    }, 1500);
  };

  // --- RENDER ---
  if (!user) return <><CustomCursor /><Login onLoginSuccess={handleLoginSuccess} w={w} isDarkMode={isDarkMode} toggleTheme={toggleTheme} /></>;

  // Common Wrapper
  const Layout = ({ children }) => (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <CustomCursor />
      <PublicHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} onSignOut={handleSignOut} />
      {children}
      <FloatingCart cart={cart} printFile={printFile} setView={setView} />
      <AnimatePresence>
        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      </AnimatePresence>
    </div>
  );

  return (
    <Layout>
      {view === "home" && <Home setView={setView} />}
      
      {/* Reuse Shop Component for Canteen & Mart */}
      {view === "canteen" && <Shop category="food" products={products} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} setView={setView} />}
      {view === "mart" && <Shop category="essential" products={products} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} setView={setView} />}
      
      {view === "cart" && (
        <Cart 
          cart={cart} printFile={printFile} setPrintFile={setPrintFile}
          updateQuantity={updateQuantity} removeFromCart={removeFromCart}
          savedLocations={savedLocations} setSavedLocations={setSavedLocations}
          selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}
          paymentMode={paymentMode} setPaymentMode={setPaymentMode}
          placeOrder={placeOrder} loading={loading} setView={setView}
        />
      )}
      
      {view === "print" && <Print handleFileUpload={handleFileUpload} loading={loading} setView={setView} />}
    </Layout>
  );
}