import { AnimatePresence } from "framer-motion";
import CustomCursor from "../components/ui/CustomCursor";
import PublicHeader from "../components/PublicHeader";
import FloatingCart from "../components/FloatingCart";
import Toast from "../components/ui/Toast";

export default function MainLayout({ 
  children, 
  user, 
  cart, 
  printFile, 
  setView, 
  isDarkMode, 
  toggleTheme, 
  handleSignOut,
  toastMsg,
  setToastMsg 
}) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary selection:text-white">
      {/* 1. Global UI Elements (Persistent) */}
      <CustomCursor label={user?.name || "Guest"} />
      
      <PublicHeader 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onSignOut={handleSignOut} 
      />

      {/* 2. Page Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* 3. Global Overlays */}
      <FloatingCart cart={cart} printFile={printFile} setView={setView} />
      
      <AnimatePresence>
        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      </AnimatePresence>
    </div>
  );
}