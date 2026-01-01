import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

/* ======================
   STUDENT PAGES
====================== */
import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Print from "./pages/Print";
import AcademicCalendar from "./pages/AcademicCalendar";
import MessMenu from "./pages/MessMenu";

/* ======================
   OWNER PAGES
====================== */
import OwnerLayout from "./owner/layout/OwnerLayout";
import OwnerDashboard from "./owner/pages/OwnerDashboard";

/* ======================
   LAYOUT & UI
====================== */
import MainLayout from "./layouts/MainLayout";
import CustomCursor from "./components/ui/CustomCursor";

/* ======================
   MOCK BACKEND
====================== */
const w = {
  student_login: async (enrollment, password) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { token: "mock-token-123", user: { name: enrollment } };
  },
};

export default function App() {
  /* ======================
     CORE STATE
  ====================== */
  const [appMode, setAppMode] = useState("student");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("username");
    return saved ? { name: saved } : null;
  });
  const [view, setView] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  /* ======================
     STUDENT STATE
  ====================== */
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [savedLocations, setSavedLocations] = useState(
    () => JSON.parse(localStorage.getItem("savedLocations")) || []
  );
  const [selectedLocation, setSelectedLocation] = useState("");
  const [paymentMode, setPaymentMode] = useState(
    () => localStorage.getItem("paymentMode") || "upi"
  );
  const [printFile, setPrintFile] = useState(null);

  const [products] = useState([
    { _id: 1, name: "Veg Burger", price: 40, category: "food" },
    { _id: 2, name: "Cold Coffee", price: 60, category: "food" },
    { _id: 3, name: "Notebook", price: 50, category: "essential" },
    { _id: 4, name: "Pen Set", price: 20, category: "essential" },
  ]);

  /* ======================
     EFFECTS
  ====================== */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  useEffect(() => {
    localStorage.setItem("paymentMode", paymentMode);
  }, [paymentMode]);

  /* ======================
     ACTIONS
  ====================== */
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    setUser(null);
    setView("home");
    setCart([]);
    setAppMode("student");
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing)
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const placeOrder = () => {
    if (!selectedLocation) return alert("Select location");
    setLoading(true);
    setTimeout(() => {
      setCart([]);
      setPrintFile(null);
      setLoading(false);
      setView("home");
      alert("Order placed!");
    }, 1500);
  };

  /* ======================
     LOGIN
  ====================== */
  if (!user) {
    return (
      <>
        <CustomCursor />
        <Login
          onLoginSuccess={(role) => {
            setUser({ name: role === "owner" ? "Owner" : "Student" });
            setAppMode(role);
            setView("home");
          }}
          w={w}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </>
    );
  }

  /* ======================
     OWNER MODE
  ====================== */
  if (appMode === "owner") {
    return (
      <>
        {/* 👇 FIXED: Added CustomCursor here. 
            Without this, index.css hides the cursor, but nothing replaces it. 
        */}
        <CustomCursor /> 
        <OwnerLayout>
          <OwnerDashboard onLogout={handleSignOut} />
        </OwnerLayout>
      </>
    );
  }

  /* ======================
     STUDENT MODE
  ====================== */
  return (
    <MainLayout
      user={user}
      cart={cart}
      printFile={printFile}
      setView={setView}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
      handleSignOut={handleSignOut}
      toastMsg={toastMsg}
      setToastMsg={setToastMsg}
      setAppMode={setAppMode} 
    >
      {view === "home" && <Home setView={setView} />}

      {view === "canteen" && (
        <Shop
          category="food"
          products={products}
          cart={cart}
          addToCart={addToCart}
          setView={setView}
        />
      )}

      {view === "mart" && (
        <Shop
          category="essential"
          products={products}
          cart={cart}
          addToCart={addToCart}
          setView={setView}
        />
      )}

      {view === "cart" && (
        <Cart
          cart={cart}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
          placeOrder={placeOrder}
          loading={loading}
          setView={setView}
        />
      )}

      {view === "print" && (
        <Print setPrintFile={setPrintFile} loading={loading} setView={setView} />
      )}

      {view === "calendar" && <AcademicCalendar setView={setView} />}
      {view === "mess" && <MessMenu setView={setView} />}
    </MainLayout>
  );
}