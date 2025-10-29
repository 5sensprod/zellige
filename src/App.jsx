import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button.jsx";
import { cn } from "./lib/utils.js";
import { Rocket, Sun, Moon, Home as HomeIcon } from "lucide-react";
import { config } from "./config.js";
import Home from "./pages/Home.jsx";

function NotFound() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-2">404</h2>
      <p>Page introuvable. <Link className="text-primary underline" to="/">Retour à l’accueil</Link></p>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={cn(dark ? "dark" : "")}>
      <BrowserRouter>
        <nav className="border-b bg-card text-card-foreground">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <Link to="/" className="inline-flex items-center font-semibold">
              <HomeIcon className="size-4 mr-2" /> Accueil
            </Link>
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost">
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">Tailwind</a>
              </Button>
              <Button variant="secondary" onClick={() => setDark(v => !v)}>
                {dark ? <Sun className="size-4 mr-2" /> : <Moon className="size-4 mr-2" />}
                Thème
              </Button>
            </div>
          </div>
        </nav>

        <main className="p-8">
          <div className="max-w-5xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <div className="mt-10 rounded-2xl border p-6 bg-card text-card-foreground shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Env/Config</h2>
              <p>
                <span className="font-mono px-2 py-1 rounded bg-muted">MODE</span>&nbsp;
                <strong>{config.env}</strong> — API:&nbsp;
                <code className="font-mono">{config.apiUrl}</code>
              </p>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}
