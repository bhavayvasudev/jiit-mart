import ActionCard from "../components/ActionCard";
import { Utensils, ShoppingBag, Printer } from "lucide-react";

export default function Home({ navigate }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <h2 className="mb-12 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground text-center uppercase">
        Explore
      </h2>

      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-3 gap-8">
        <ActionCard
          title="Canteen"
          description="Order food from campus vendors"
          icon={<Utensils size={24} />}
          onClick={() => navigate("canteen")}
        />

        <ActionCard
          title="Mart"
          description="Daily essentials delivered fast"
          icon={<ShoppingBag size={24} />}
          onClick={() => navigate("mart")}
        />

        <ActionCard
          title="Print"
          description="Upload PDFs & collect prints"
          icon={<Printer size={24} />}
          onClick={() => navigate("print")}
        />
      </div>
    </main>
  );
}