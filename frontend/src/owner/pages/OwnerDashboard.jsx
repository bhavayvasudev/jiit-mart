export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Orders Today", "Pending", "Completed", "Revenue"].map((title) => (
          <div
            key={title}
            className="p-4 rounded-xl border bg-card"
          >
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
