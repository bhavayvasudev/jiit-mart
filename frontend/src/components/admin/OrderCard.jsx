// components/admin/OrderCard.jsx
"use client";
import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const OrderCard = ({ order, onUpdateStatus }) => {
  
  // Logic to determine the next status and button color
  const getNextAction = () => {
    switch (order.status) {
      case 'PENDING': return { label: 'Accept & Cook', next: 'PREPARING', color: 'bg-blue-600 hover:bg-blue-700' };
      case 'PREPARING': return { label: 'Mark Ready', next: 'READY', color: 'bg-orange-500 hover:bg-orange-600' };
      case 'READY': return { label: 'Complete Order', next: 'COMPLETED', color: 'bg-green-600 hover:bg-green-700' };
      default: return null;
    }
  };

  const action = getNextAction();

  // Color mapping for status badges
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    PREPARING: "bg-blue-100 text-blue-800 border-blue-300",
    READY: "bg-green-100 text-green-800 border-green-300",
    COMPLETED: "bg-gray-100 text-gray-500",
    CANCELLED: "bg-red-100 text-red-800"
  };

  // Don't render completed/cancelled orders in the active view
  if (order.status === 'COMPLETED' || order.status === 'CANCELLED') return null;

  return (
    <div className={`border-2 rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between min-h-[320px] ${order.paymentMethod === 'CASH' ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {order.id.split('-')[1]} 
            <span className="text-base font-normal text-gray-600 ml-2">| {order.customerName}</span>
          </h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <Clock size={14} className="mr-1" /> {order.timestamp}
            <MapPin size={14} className="ml-2 mr-1" /> {order.location}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>

      {/* ITEMS LIST */}
      <div className="flex-grow border-t border-b border-gray-100 py-3 my-2 space-y-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">{item.name}</span>
            <span className="text-lg font-bold text-gray-900 bg-gray-100 px-2 rounded">x{item.qty}</span>
          </div>
        ))}
      </div>

      {/* FOOTER & ACTIONS */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Total Amount</span>
            <span className="text-2xl font-black text-gray-800">₹{order.totalAmount}</span>
          </div>
          
          {/* Payment Status Indicator */}
          <div className={`px-3 py-1 rounded border text-sm font-bold ${order.paymentMethod === 'CASH' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
            {order.paymentMethod === 'CASH' ? '⚠️ CASH DUE' : '✅ UPI PAID'}
          </div>
        </div>

        {/* MAIN ACTION BUTTON */}
        {action && (
          <button 
            onClick={() => onUpdateStatus(order.id, action.next)}
            className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition-all active:scale-95 ${action.color}`}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;