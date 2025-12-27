import OwnerSidebar from "../components/OwnerSidebar";

export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
