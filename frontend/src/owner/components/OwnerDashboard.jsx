import React, { useState } from "react";
import OwnerSidebar from "../components/OwnerSidebar";
import OverviewStats from "../components/OverviewStats";
import OrdersManager from "../components/OrdersManager";
import OwnerSettings from "../components/OwnerSettings";
import { Printer } from "lucide-react"; // Placeholder for Print Queue

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock Logout function (Prop drilling from App.jsx would be better in real app)
  const handleLogout = () => {
    window.location.reload(); // Simple reload to reset state for now
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewStats />;
      case "orders": return <OrdersManager />;
      case "settings": return <OwnerSettings />;
      case "print": 
        return (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
             <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Printer size={32} />
             </div>
             <h2 className="text-xl font-bold text-gray-600">Print Queue Empty</h2>
             <p>No documents waiting to be printed.</p>
          </div>
        );
      default: return <OverviewStats />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR */}
      <OwnerSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}