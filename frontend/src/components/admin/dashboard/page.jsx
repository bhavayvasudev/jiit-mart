// app/admin/dashboard/page.jsx
"use client";
import React, { useState } from 'react';
import OrderCard from '@/components/admin/OrderCard';
import { initialOrders } from '@/data/orders';
import { Power, Bell, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('ALL');
  const [isShopOpen, setIsShopOpen] = useState(true);

  // Handle Status Update
  const updateStatus = (id, newStatus) => {
    // In a real app, this is where you'd call your API
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  // Filter Logic
  const filteredOrders = orders.filter(o => {
    if (o.status === 'COMPLETED' || o.status === 'CANCELLED') return false;
    if (filter === 'ALL') return true;
    return o.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* TOP NAV BAR */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
           <h1 className="text-xl font-black text-gray-800 tracking-tight hidden sm:block">CANTEEN ADMIN</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 relative">
            <Bell size={20} className="text-gray-600"/>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>
          
          <button 
            onClick={() => setIsShopOpen(!isShopOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors border ${
              isShopOpen 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            <Power size={18} />
            <span className="hidden sm:inline">{isShopOpen ? 'SHOP OPEN' : 'CLOSED'}</span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        
        {/* FILTER TABS */}
        <div className="px-6 py-6 sticky top-[73px] bg-gray-50 z-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['ALL', 'PENDING', 'PREPARING', 'READY'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all border ${
                  filter === tab 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
            
            <button 
              onClick={() => setOrders(initialOrders)} // Reset for demo
              className="ml-auto px-4 py-2 text-gray-400 hover:text-indigo-600 flex items-center gap-2 text-sm font-medium"
            >
              <RefreshCw size={16} /> Reset Demo
            </button>
          </div>
        </div>

        {/* ORDERS GRID */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                 <Bell size={32} className="text-gray-400" />
              </div>
              <p className="text-xl font-medium">No active orders in this view.</p>
              <p className="text-sm">Great job! The kitchen is clear.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} onUpdateStatus={updateStatus} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}