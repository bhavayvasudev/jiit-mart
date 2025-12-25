import { ArrowLeft, Coffee } from "lucide-react";

export default function MessMenu({ setView }) {
  const menu = {
    Monday: { Breakfast: "Aloo Paratha, Curd", Lunch: "Rajma Chawal", Dinner: "Mix Veg, Roti" },
    Tuesday: { Breakfast: "Idli Sambar", Lunch: "Kadi Chawal", Dinner: "Egg Curry / Paneer" },
    Wednesday: { Breakfast: "Poha, Jalebi", Lunch: "Dal Makhani", Dinner: "Chicken / Malai Kofta" },
    Thursday: { Breakfast: "Sandwich, Milk", Lunch: "Chole Bhature", Dinner: "Soyabean, Rice" },
    Friday: { Breakfast: "Puri Bhaji", Lunch: "Fried Rice, Manchurian", Dinner: "Paneer Butter Masala" },
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto mt-6">
        <button onClick={() => setView("home")} className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </button>

        <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
          <Coffee className="text-primary" /> Mess Menu
        </h2>

        <div className="grid gap-4">
          {Object.entries(menu).map(([day, meals]) => (
            <div key={day} className="glass rounded-2xl p-6 hover:scale-[1.01] transition-transform">
              <h3 className="text-xl font-bold text-primary mb-3">{day}</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><span className="block text-xs text-muted-foreground uppercase">Breakfast</span>{meals.Breakfast}</div>
                <div><span className="block text-xs text-muted-foreground uppercase">Lunch</span>{meals.Lunch}</div>
                <div><span className="block text-xs text-muted-foreground uppercase">Dinner</span>{meals.Dinner}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}