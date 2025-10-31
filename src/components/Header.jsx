import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react"; // icône roue crantée

export default function Header({
  logo = "Zellige",
  menu = [
    { label: "Collections", href: "#collections" },
    { label: "Boutiques", href: "/boutique" },
    { label: "Histoire", href: "#histoire" },
    { label: "Contact", href: "#contact" },
  ],
}) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 100) ref.current.classList.add("scrolled");
      else ref.current.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header" ref={ref}>
      <div className="nav-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="logo text-xl font-bold">
          {logo}
        </Link>

        {/* Menu principal */}
        <nav>
          <ul className="nav-menu flex items-center gap-6">
            {menu.map((item, i) => (
              <li key={i}>
                {item.href.startsWith("/") ? (
                  <Link to={item.href}>{item.label}</Link>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
            ))}

            {/* Bouton Admin */}
            <li>
              {/* ouvre dans un nouvel onglet si tu veux */}
              <a href="/admin/index.html" title="Administration" rel="noopener" target="_blank">
                <Settings size={18} />
                <span className="sr-only">Admin</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
