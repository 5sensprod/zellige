import { Button } from "../components/ui/button.jsx";
import { Rocket } from "lucide-react";

export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Home</h1>
      <p className="text-muted-foreground">
        Projet clé en main : Vite + Tailwind + style shadcn + Lucide + Router + ESLint + Prettier.
      </p>
      <div className="flex gap-3">
        <Button>
          <Rocket className="size-4 mr-2" />
          C’est parti
        </Button>
        <Button variant="outline">Bouton outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </section>
  );
}
