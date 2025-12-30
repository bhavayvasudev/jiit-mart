import React, { useState } from "react";
import { Power, Truck, CreditCard } from "lucide-react";

export default function OwnerSettings() {
  const [isOpen, setIsOpen] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(5);

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-black text-gray-800 tracking-tight">Store Settings</h1>

      {/* SHOP STATUS */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <Power size={24} strokeWidth={3} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">Shop Status</h3>
            <p className="text-sm text-gray-500">{isOpen ? "Currently accepting orders" : "Shop is temporarily closed"}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
             isOpen ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"
          }`}
        >
          {isOpen ? "Close Shop" : "Open Shop"}
        </button>
      </div>

      {/* DELIVERY FEE */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
         <div className="flex items-center gap-3 mb-4">
            <Truck className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-800">Delivery Configuration</h3>
         </div>
         <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-gray-600">Base Delivery Charge (₹)</label>
            <input 
              type="number" 
              value={deliveryFee} 
              onChange={(e) => setDeliveryFee(e.target.value)}
              className="w-24 p-2 border border-gray-300 rounded-lg font-bold text-center focus:ring-2 focus:ring-indigo-500 outline-none"
            />
         </div>
      </div>
    </div>
  );
}