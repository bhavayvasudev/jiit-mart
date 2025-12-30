import React from "react";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Printer, 
  Settings, 
  LogOut, 
  Store 
} from "lucide-react";

export default function OwnerSidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Live Kitchen", icon: UtensilsCrossed },
    { id: "print", label: "Print Queue", icon: Printer },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* BRAND HEADER */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
          <Store size={20} strokeWidth={3} />
        </div>
        <div>
          <h2 className="font-black text-lg tracking-tight text-gray-800">OWNER PANEL</h2>
          <p className="text-xs text-gray-500 font-medium">Manage Operations</p>
        </div>
      </div>

      {/* MENU ITEMS */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 group ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 translate-x-1" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white" : "text-gray-400 group-hover:text-gray-900"} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}