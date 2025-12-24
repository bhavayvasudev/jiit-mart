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

/* -----------------------------
   TEMP BACKEND WRAPPER
--------------------------------*/
class BackendWrapper {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async student_login(enrollment, password) {
    await new Promise((r) => setTimeout(r, 600));
    if (!enrollment || !password) {
      throw new Error("Invalid credentials");
    }
    return { token: "mock-token" };
  }
}

const w = new BackendWrapper("http://localhost:5000");

/* -----------------------------
   MAIN APP
--------------------------------*/
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState("home");

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [printFile, setPrintFile] = useState(null);

  const [deliveryMode, setDeliveryMode] = useState("pickup");
  const [paymentMode, setPaymentMode] = useState("upi");
  const [roomNo, setRoomNo] = useState("");
  const [loading, setLoading] = useState(false);

  /* -----------------------------
     INIT
  --------------------------------*/
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setIsAuthenticated(true);
    }

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => {});
  }, []);

  /* -----------------------------
     AUTH
  --------------------------------*/
  const handleLoginSuccess = () => {
    localStorage.setItem("username", "student");
    setIsAuthenticated(true);
    setView("home");
  };

  /* -----------------------------
     CART
  --------------------------------*/
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  /* -----------------------------
     PRINT
  --------------------------------*/
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      setPrintFile({ ...res.data, cost: 20 });
    } catch {
      alert("Upload failed");
    }
    setLoading(false);
  };

  /* -----------------------------
     ORDER
  --------------------------------*/
  const placeOrder = async () => {
    if (deliveryMode === "delivery" && !roomNo) {
      alert("Enter room number");
      return;
    }

    const total =
      cart.reduce((s, i) => s + i.price, 0) +
      (printFile ? printFile.cost : 0);

    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: cart,
        printJob: printFile,
        deliveryMode,
        paymentMode,
        hostelRoom: roomNo,
        totalAmount: total,
      });

      setCart([]);
      setPrintFile(null);
      setView("home");
    } catch {
      alert("Order failed");
    }
  };

  /* -----------------------------
     PRODUCT CARD
  --------------------------------*/
  const ProductCard = ({ item }) => (
    <div className="glass p-4 flex flex-col gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-32 w-full rounded-lg object-cover"
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
     ROUTING
  --------------------------------*/
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} w={w} />;
  }

  /* -----------------------------
     HOME (CONNECTED TOOLTIP)
  --------------------------------*/
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
      <div className="min-h-screen bg-background flex flex-col">
        <PublicHeader />

        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <h2 className="mb-12 text-2xl md:text-3xl font-semibold text-muted-foreground">
            What do you want to do?
          </h2>

          <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-3 gap-10">
            {actions.map((item) => (
              <div key={item.title} className="relative group">
                {/* CONNECTED TOOLTIP */}
                <div
                  className="
                    pointer-events-none
                    absolute -top-12 left-1/2 -translate-x-1/2
                    opacity-0 translate-y-2 scale-95
                    transition-all duration-500 ease-out
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    group-hover:scale-100
                  "
                >
                  <div className="relative">
                    <div className="glass px-4 py-2 rounded-lg text-xs font-medium text-foreground shadow-xl">
                      {item.desc}
                    </div>

                    {/* CARET */}
                    <div
                      className="
                        absolute left-1/2 -bottom-1
                        -translate-x-1/2
                        w-3 h-3
                        rotate-45
                        bg-white/10
                        backdrop-blur-xl
                        border-r border-b border-white/20
                      "
                    />
                  </div>
                </div>

                {/* CARD */}
                <button
                  onClick={item.action}
                  className="
                    glass h-36 w-full rounded-2xl p-6
                    text-left
                    transition-all duration-500 ease-out
                    hover:scale-[1.04]
                    hover:shadow-2xl
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

  /* -----------------------------
     CANTEEN / MART
  --------------------------------*/
  if (view === "canteen" || view === "mart") {
    const items = products.filter(
      (p) => p.category === (view === "canteen" ? "food" : "essential")
    );

    return (
      <div className="min-h-screen bg-background p-6">
        <PublicHeader />
        <button
          onClick={() => setView("home")}
          className="mb-6 flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {items.map((i) => (
            <ProductCard key={i._id} item={i} />
          ))}
        </div>
      </div>
    );
  }

  /* -----------------------------
     CART
  --------------------------------*/
  if (view === "cart") {
    const total =
      cart.reduce((s, i) => s + i.price, 0) +
      (printFile ? printFile.cost : 0);

    return (
      <div className="min-h-screen bg-background p-6 max-w-xl mx-auto">
        <PublicHeader />
        <button
          onClick={() => setView("home")}
          className="mb-6 flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {cart.map((i, idx) => (
          <div
            key={idx}
            className="flex justify-between py-2 border-b border-border"
          >
            <span>{i.name}</span>
            <button onClick={() => removeFromCart(idx)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <button
          onClick={placeOrder}
          className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground"
        >
          Pay ₹{total}
        </button>
      </div>
    );
  }

  /* -----------------------------
     PRINT
  --------------------------------*/
  if (view === "print") {
    return (
      <div className="min-h-screen bg-background p-6">
        <PublicHeader />
        <button
          onClick={() => setView("home")}
          className="mb-6 flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        {loading && <p className="mt-4">Uploading…</p>}
      </div>
    );
  }

  return null;
}
