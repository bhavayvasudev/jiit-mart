import { Utensils, ShoppingBag, Printer } from "lucide-react";

export default function Home({ setView }) {
  const actions = [
    { title: "Canteen", icon: <Utensils size={32} />, desc: "Order food", action: () => setView("canteen") },
    { title: "Mart", icon: <ShoppingBag size={32} />, desc: "Daily essentials", action: () => setView("mart") },
    { title: "Print", icon: <Printer size={32} />, desc: "Print PDFs", action: () => setView("print") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
    </div>
  );
}