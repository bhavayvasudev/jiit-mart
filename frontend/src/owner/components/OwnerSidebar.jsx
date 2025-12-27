import { LayoutDashboard, ShoppingBag, Printer, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Orders", icon: ShoppingBag },
  { label: "Print Queue", icon: Printer },
  { label: "Settings", icon: Settings },
];

export default function OwnerSidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card p-4">
      <h2 className="text-xl font-bold mb-6">Owner Panel</h2>

      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition"
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
