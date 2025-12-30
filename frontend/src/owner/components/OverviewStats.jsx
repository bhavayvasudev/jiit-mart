import React from "react";
import { TrendingUp, ShoppingBag, Clock, CheckCircle } from "lucide-react";

export default function OverviewStats() {
  // MOCK DATA
  const stats = [
    { label: "Today's Revenue", value: "₹4,250", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Orders", value: "48", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending", value: "12", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed", value: "36", icon: CheckCircle, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800 tracking-tight">Dashboard Overview</h1>
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* REVENUE CHART PLACEHOLDER */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-gray-400">
        <TrendingUp size={48} className="mb-4 opacity-20" />
        <p className="font-medium">Revenue Analytics Graph will appear here</p>
      </div>
    </div>
  );
}