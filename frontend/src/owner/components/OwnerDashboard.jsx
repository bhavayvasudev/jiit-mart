import { useState } from "react";
import OrdersManager from "../components/OrdersManager";
import OverviewStats from "../components/OverviewStats";
import { Printer } from "lucide-react";

export default function OwnerDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewStats />;
      case "orders":
        return <OrdersManager />;
      case "print":
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <Printer size={40} />
            <p className="mt-4 font-medium">No print jobs</p>
          </div>
        );
      default:
        return <OverviewStats />;
    }
  };

  return renderContent();
}
