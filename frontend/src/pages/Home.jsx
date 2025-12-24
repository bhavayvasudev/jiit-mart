import ActionCard from "@/ui/ActionCard";
import { text } from "@/ui/typography";
import { Utensils, ShoppingBag, Printer } from "lucide-react";

export default function Home({ navigate }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6">
      <h2 className="mb-14 text-2xl md:text-3xl font-medium text-white/80">
        What do you want to do?
      </h2>

      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-3 gap-10">
        <ActionCard
          title="Canteen"
          description="Order food from campus vendors"
          icon={<Utensils size={28} />}
          onClick={() => navigate("canteen")}
        />

        <ActionCard
          title="Mart"
          description="Daily essentials delivered fast"
          icon={<ShoppingBag size={28} />}
          onClick={() => navigate("mart")}
        />

        <ActionCard
          title="Print"
          description="Upload PDFs & collect prints"
          icon={<Printer size={28} />}
          onClick={() => navigate("print")}
        />
      </div>
    </main>
  );
}
