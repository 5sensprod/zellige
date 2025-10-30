import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button.jsx";
import { cn } from "./lib/utils.js";
import Home from "./pages/Home.jsx";
import { Sun, Moon } from "lucide-react";

function NotFound() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-2">404</h2>
      <p>
        Page introuvable.{" "}
        <Link className="underline" to="/">
          Retour à l’accueil
        </Link>
      </p>
    </div>
  );
}

function HeaderBar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // pointer-events comme le HTML
        "fixed inset-x-0 top-0 z-50 transition-all duration-400 pointer-events-none",
        scrolled
          ? "bg-white/95 backdrop-blur shadow-[0_2px_20px_rgba(0,0,0,0.05)] py-5 px-[60px] pointer-events-auto"
          : "py-8 px-[60px]"
      )}
    >
      <div className="max-w-[100%] mx-auto flex items-center justify-between">
        {/* LOGO : blanc en haut, noir au scroll */}
        <Link
          to="/"
          className={cn(
            "pointer-events-auto uppercase tracking-[0.25em] font-light no-underline transition-colors",
            scrolled ? "text-[hsl(var(--foreground))]" : "text-white"
          )}
          style={{ fontSize: "1.5rem" }}
        >
          Maison Luxe
        </Link>

        {/* MENU : caché en haut, visible au scroll */}
        <nav
          className={cn(
            "hidden md:block transition-all duration-400",
            scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          )}
        >
          <ul className="flex gap-10 list-none">
            {[
              { label: "Collections", to: "/" },
              { label: "Boutiques", to: "/boutique" },
              { label: "Histoire", to: "/histoire" },
              { label: "Contact", to: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-[hsl(var(--foreground))] no-underline uppercase font-light tracking-[0.125em] text-[0.9rem] hover:opacity-60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Seul bouton conservé du boilerplate */}
        <div className="pointer-events-auto">
          <Button variant="secondary" onClick={() => setDark((v) => !v)}>
            {dark ? <Sun className="size-4 mr-2" /> : <Moon className="size-4 mr-2" />}
            Thème
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={cn(dark ? "dark" : "")}>
      <BrowserRouter>
        <HeaderBar dark={dark} setDark={setDark} />
        {/* Rien d'autre que le contenu des pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* routes futures */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
