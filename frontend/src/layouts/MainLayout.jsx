import { LogOut } from "lucide-react";

export default function MainLayout({
  children,
  onSignOut,
  title = "JIITMart",
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* HEADER */}
      <header
        className="
          sticky top-0 z-50
          bg-background/80 backdrop-blur-xl
          border-b border-border
          transition-all duration-500
        "
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h1>

          {/* Actions */}
          <button
            onClick={onSignOut}
            className="
              flex items-center gap-2
              text-sm font-medium
              text-muted-foreground
              transition-all duration-500
              hover:text-foreground
              hover:scale-[1.05]
            "
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main
        className="
          flex-1
          mx-auto w-full max-w-7xl
          px-6 py-10
          transition-all duration-500
        "
      >
        {/* Light surface for content (Hybrid palette) */}
        <div
          className="
            rounded-3xl
            bg-card text-card-foreground
            shadow-xl
            p-6 md:p-10
            transition-all duration-500
          "
        >
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="
          border-t border-border
          bg-background/70 backdrop-blur-xl
        "
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-center gap-6">
          <button
            className="
              rounded-xl px-5 py-2
              text-sm font-medium
              bg-muted text-muted-foreground
              transition-all duration-500
              hover:bg-accent hover:text-foreground
              hover:scale-[1.03]
            "
          >
            📅 Academic Calendar
          </button>

          <button
            className="
              rounded-xl px-5 py-2
              text-sm font-medium
              bg-muted text-muted-foreground
              transition-all duration-500
              hover:bg-accent hover:text-foreground
              hover:scale-[1.03]
            "
          >
            🍽️ Mess Menu
          </button>
        </div>
      </footer>
    </div>
  );
}
