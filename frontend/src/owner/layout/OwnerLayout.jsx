import OwnerSidebar from "../components/OwnerSidebar";

export default function OwnerLayout({
  children,
  activeTab,
  setActiveTab,
  onLogout,
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <OwnerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
