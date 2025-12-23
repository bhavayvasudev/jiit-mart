import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Printer, Utensils, ShoppingBag, ArrowLeft, Trash2, Upload } from 'lucide-react';
import Login from './components/Login'; // Import the new Login Component

// --- BACKEND WRAPPER (Simulates the 'w' object from your example) ---
class BackendWrapper {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async student_login(enrollmentNumber, password) {
    // In a real app, this would hit your backend API
    // For MVP, we will simulate a success for now or hit a real endpoint if you have one
    console.log(`Authenticating ${enrollmentNumber}...`);
    
    // Simulating API Call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple Mock Validation (Accepts anything for demo)
    if (enrollmentNumber && password) {
      return { success: true, token: "mock-jwt-token" };
    } else {
      throw new Error("Invalid credentials");
    }
  }
}

const w = new BackendWrapper('http://localhost:5000'); // Initialize Wrapper

export default function App() {
  // --- STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth State
  
  const [view, setView] = useState('home'); 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [printFile, setPrintFile] = useState(null);
  const [orders, setOrders] = useState([]); 
  
  // Checkout State
  const [deliveryMode, setDeliveryMode] = useState('pickup');
  const [paymentMode, setPaymentMode] = useState('upi');
  const [roomNo, setRoomNo] = useState('');
  const [loading, setLoading] = useState(false);

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    // Check if user is already logged in (Local Storage)
    if (localStorage.getItem("username")) {
      setIsAuthenticated(true);
    }

    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // --- LOGIN HANDLERS ---
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setIsAuthenticated(false);
    setCart([]);
  };

  // --- APP ACTIONS ---
  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, qty: 1 }]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setPrintFile({ ...res.data, cost: 20 }); 
      alert("File uploaded!");
    } catch (err) {
      alert("Upload failed");
    }
    setLoading(false);
  };

  const placeOrder = async () => {
    if (deliveryMode === 'delivery' && !roomNo) return alert("Please enter Room Number!");
    
    const total = cart.reduce((sum, i) => sum + i.price, 0) + (printFile ? printFile.cost : 0);
    const orderData = {
      items: cart,
      printJob: printFile,
      deliveryMode,
      paymentMode,
      hostelRoom: roomNo,
      totalAmount: total
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      alert(`✅ Order Placed! Pay ₹${total} via ${paymentMode.toUpperCase()}`);
      setCart([]);
      setPrintFile(null);
      setView('home');
    } catch (err) {
      alert("Order failed. Server error?");
    }
  };

  // --- ADMIN ACTIONS ---
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
    fetchOrders(); 
  };

  // --- SUB-COMPONENTS ---
  const ProductCard = ({ item }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <img src={item.image} alt={item.name} className="h-32 w-full object-cover rounded-md mb-3" />
      <div>
        <h3 className="font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-500 text-sm">₹{item.price}</p>
      </div>
      <button onClick={() => addToCart(item)} className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-transform">
        Add to Cart
      </button>
    </div>
  );

  // --- VIEW ROUTING ---

  // 1. IF NOT LOGGED IN -> SHOW LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess} 
        onDemoLogin={handleLoginSuccess}
        w={w} // Passing the backend wrapper
      />
    );
  }

  // 2. HOME SCREEN
  if (view === 'home') return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="absolute top-6 right-6">
        <button onClick={handleLogout} className="text-red-500 font-bold hover:underline text-sm">Sign Out</button>
      </div>
      
      <h1 className="text-5xl font-extrabold text-blue-900 mb-2 tracking-tight">JIITMart 🚀</h1>
      <p className="text-gray-500 mb-12 text-lg">Your Campus Super App</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div onClick={() => setView('canteen')} className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-orange-500 cursor-pointer transition-all hover:-translate-y-1">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
            <Utensils className="text-orange-600 group-hover:text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Canteen</h2>
          <p className="text-gray-400 mt-2">Hungry? Order Food Now.</p>
        </div>

        <div onClick={() => setView('mart')} className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-blue-500 cursor-pointer transition-all hover:-translate-y-1">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
            <ShoppingBag className="text-blue-600 group-hover:text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Mart</h2>
          <p className="text-gray-400 mt-2">Notebooks, Pens & More.</p>
        </div>

        <div onClick={() => setView('print')} className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-green-500 cursor-pointer transition-all hover:-translate-y-1">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
            <Printer className="text-green-600 group-hover:text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Print Store</h2>
          <p className="text-gray-400 mt-2">Upload PDF, Pickup Later.</p>
        </div>
      </div>

      {(cart.length > 0 || printFile) && (
        <button onClick={() => setView('cart')} className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
          <ShoppingCart size={24} />
          <span className="font-bold">{cart.length + (printFile ? 1 : 0)} Items</span>
        </button>
      )}

      <button onClick={() => { setView('admin'); fetchOrders(); }} className="mt-12 text-gray-400 text-xs hover:text-red-500 underline">
        Shopkeeper Login
      </button>
    </div>
  );

  // 3. CART SCREEN
  if (view === 'cart') {
    const total = cart.reduce((sum, i) => sum + i.price, 0) + (printFile ? printFile.cost : 0);
    return (
      <div className="min-h-screen bg-gray-50 p-6 max-w-2xl mx-auto">
        <button onClick={() => setView('home')} className="flex items-center text-gray-500 font-bold mb-6 hover:text-black"><ArrowLeft size={20} className="mr-2"/> Back</button>
        <h2 className="text-3xl font-bold mb-6">Your Cart 🛒</h2>

        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-bold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={18} /></button>
            </div>
          ))}
          {printFile && (
            <div className="flex justify-between items-center py-3 border-b last:border-0 bg-green-50 px-2 rounded">
              <div>
                <p className="font-bold text-green-800">Print: {printFile.fileName}</p>
                <p className="text-sm text-green-600">₹{printFile.cost}</p>
              </div>
              <button onClick={() => setPrintFile(null)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={18} /></button>
            </div>
          )}
          <div className="flex justify-between mt-4 text-xl font-bold border-t pt-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <div>
            <label className="block font-bold mb-2 text-gray-700">Delivery Mode</label>
            <div className="flex gap-4">
              {['pickup', 'delivery'].map(m => (
                <button key={m} onClick={() => setDeliveryMode(m)} className={`flex-1 py-3 rounded-xl capitalize font-medium border-2 ${deliveryMode === m ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500'}`}>
                  {m} {m === 'delivery' && '(+₹10)'}
                </button>
              ))}
            </div>
          </div>

          {deliveryMode === 'delivery' && (
             <input type="text" placeholder="Enter Hostel Room (e.g. H2-404)" value={roomNo} onChange={e => setRoomNo(e.target.value)} 
               className="w-full p-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          )}

          <div>
            <label className="block font-bold mb-2 text-gray-700">Payment Method</label>
            <div className="flex gap-4">
              {['upi', 'cash'].map(m => (
                <button key={m} onClick={() => setPaymentMode(m)} className={`flex-1 py-3 rounded-xl uppercase font-bold border-2 ${paymentMode === m ? (m === 'upi' ? 'border-green-500 bg-green-500 text-white' : 'border-yellow-500 bg-yellow-500 text-white') : 'border-gray-200 text-gray-400'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button onClick={placeOrder} className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors shadow-lg">
            CONFIRM ORDER
          </button>
        </div>
      </div>
    );
  }

  // 4. ADMIN DASHBOARD
  if (view === 'admin') return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">👨‍🍳 Shopkeeper Dashboard</h1>
        <button onClick={() => setView('home')} className="bg-white px-4 py-2 rounded shadow text-sm font-bold hover:bg-red-50 text-red-600">Log Out</button>
      </div>

      <div className="grid gap-6">
        {orders.map(order => (
          <div key={order._id} className={`p-6 rounded-xl shadow-md border-l-8 ${order.status === 'Completed' ? 'border-green-500 bg-gray-50 opacity-60' : 'border-orange-500 bg-white'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-gray-200 text-xs font-bold px-2 py-1 rounded uppercase">{order.deliveryMode}</span>
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase">{order.paymentMode}</span>
                <h3 className="font-bold text-xl mt-2">{order.hostelRoom ? `Room: ${order.hostelRoom}` : "Counter Pickup"}</h3>
                <p className="text-gray-500 text-sm">Order ID: {order._id.slice(-6)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{order.totalAmount}</p>
                <p className={`font-bold ${order.status === 'Pending' ? 'text-orange-500' : 'text-green-600'}`}>{order.status}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b last:border-0 border-gray-200">
                  <span>{item.name}</span>
                  <span className="font-mono">₹{item.price}</span>
                </div>
              ))}
              {order.printJob && (
                 <div className="flex justify-between text-sm py-1 text-blue-600 font-bold">
                  <span>🖨️ PDF Print ({order.printJob.fileName})</span>
                  <span>₹{order.printJob.cost}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {order.status === 'Pending' && (
                <button onClick={() => updateStatus(order._id, 'Ready')} className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600">
                  Mark Ready
                </button>
              )}
              {order.status === 'Ready' && (
                <button onClick={() => updateStatus(order._id, 'Completed')} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700">
                  Complete Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 5. GENERIC LIST (Canteen/Mart)
  const categoryItems = products.filter(p => p.category === (view === 'canteen' ? 'food' : 'essential'));

  if (view === 'canteen' || view === 'mart') return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setView('home')} className="bg-white p-2 rounded-full shadow-sm hover:shadow-md"><ArrowLeft size={24} /></button>
        <h1 className="text-3xl font-bold capitalize">{view}</h1>
        <div className="w-10"></div> 
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryItems.map(item => <ProductCard key={item._id} item={item} />)}
      </div>
      {(cart.length > 0 || printFile) && (
        <button onClick={() => setView('cart')} className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
          <ShoppingCart size={24} />
          <span className="font-bold">{cart.length + (printFile ? 1 : 0)} Items</span>
        </button>
      )}
    </div>
  );

  // 6. PRINT STORE
  if (view === 'print') return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <button onClick={() => setView('home')} className="self-start bg-white p-2 rounded-full shadow-sm mb-8"><ArrowLeft size={24} /></button>
      <h2 className="text-3xl font-bold mb-8">Print Store 🖨️</h2>
      
      <div className="bg-white p-10 rounded-3xl shadow-lg border-2 border-dashed border-gray-300 text-center w-full max-w-md">
        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">Upload your PDF</p>
        <p className="text-sm text-gray-400 mb-6">Max size 10MB</p>
        <input type="file" accept="application/pdf" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
      </div>
      
      {loading && <p className="mt-4 text-blue-600 font-bold">Uploading...</p>}
      
      {printFile && (
        <div className="mt-8 bg-green-100 p-6 rounded-2xl w-full max-w-md border border-green-200">
          <p className="font-bold text-green-900 text-lg">✅ File Ready</p>
          <p className="text-green-700">{printFile.fileName}</p>
          <div className="mt-4 flex gap-4">
             <button onClick={() => setView('cart')} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold">Add to Cart</button>
             <button onClick={() => setPrintFile(null)} className="text-red-500 font-bold px-4">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}