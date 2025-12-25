import { Utensils, ShoppingBag, Printer, Calendar, Coffee } from "lucide-react";

export default function Home({ setView }) {
  const actions = [
    { title: "Canteen", icon: <Utensils size={32} />, desc: "Order food", action: () => setView("canteen") },
    { title: "Mart", icon: <ShoppingBag size={32} />, desc: "Daily essentials", action: () => setView("mart") },
    { title: "Print", icon: <Printer size={32} />, desc: "Print PDFs", action: () => setView("print") },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <h2 className="mb-12 text-2xl md:text-3xl font-semibold text-foreground/80 text-center">
          What do you want to do?
        </h2>
        <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-3 gap-10">
          {actions.map((item) => (
            <button
              key={item.title}
              onClick={item.action}
              className="glass h-36 w-full rounded-2xl p-6 text-left relative group transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                <span className="text-foreground">{item.icon}</span>
                <span className="text-lg font-semibold text-foreground">{item.title}</span>
              </div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* NEW FOOTER */}
      <footer className="border-t border-border bg-background/60 backdrop-blur-xl w-full mt-auto">
        <div className="mx-auto flex flex-wrap items-center justify-center gap-6 px-6 py-6">
          <button 
            onClick={() => setView("calendar")}
            className="glass px-6 py-3 rounded-xl text-sm font-bold text-foreground transition-transform hover:scale-105 hover:bg-primary/5 flex items-center gap-2 border border-white/10"
          >
            <Calendar size={18} className="text-primary" /> 
            Academic Calendar
          </button>
          
          <button 
            onClick={() => setView("mess")}
            className="glass px-6 py-3 rounded-xl text-sm font-bold text-foreground transition-transform hover:scale-105 hover:bg-primary/5 flex items-center gap-2 border border-white/10"
          >
            <Coffee size={18} className="text-primary" /> 
            Mess Menu
          </button>
        </div>
      </footer>
    </div>
  );
}