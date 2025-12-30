import React, { useState } from "react";
import { Clock, MapPin, Check, X, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// MOCK DATA
const initialOrders = [
  { id: "101", items: ["Veg Burger x2", "Coke x1"], total: 140, loc: "Hostel B-304", pay: "UPI", status: "Pending" },
  { id: "102", items: ["Chicken Momos x1"], total: 120, loc: "Girls H-102", pay: "CASH", status: "Preparing" }, // CASH Highlight
  { id: "103", items: ["Cold Coffee x1", "Sandwich x1"], total: 180, loc: "Library", pay: "UPI", status: "Ready" },
];

export default function OrdersManager() {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Preparing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Ready": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Live Kitchen Orders</h1>
        <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">
          {orders.length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AnimatePresence>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white rounded-2xl p-6 border-2 shadow-sm relative overflow-hidden ${
                order.pay === "CASH" ? "border-red-400" : "border-gray-100"
              }`}
            >
              {/* CASH BADGE */}
              {order.pay === "CASH" && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl">
                  CASH PAYMENT
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">#{order.id}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1 gap-2">
                    <MapPin size={14} /> {order.loc}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="space-y-1 py-3 border-t border-b border-gray-100 my-3">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-bold text-gray-700 text-lg">{item}</p>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-2xl font-black text-gray-900">₹{order.total}</p>
                
                <div className="flex gap-2">
                  {order.status === "Pending" && (
                    <button 
                      onClick={() => updateStatus(order.id, "Preparing")}
                      className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <ChefHat size={18} /> Cook
                    </button>
                  )}
                  {order.status === "Preparing" && (
                    <button 
                      onClick={() => updateStatus(order.id, "Ready")}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.status === "Ready" && (
                    <button 
                      onClick={() => {
                         // Remove from list or mark completed
                         setOrders(prev => prev.filter(o => o.id !== order.id));
                      }}
                      className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                      <Check size={18} /> Complete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}