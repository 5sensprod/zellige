import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export default function Header({
  logo = "Zellige",
  menu = [
    { label: "Boutiques", href: "/boutique" },
    { label: "Collections", href: "#collections" },
    { label: "Histoire", href: "#histoire" },
    { label: "Contact", href: "#contact" },
  ],
}) {
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      if (window.pageYOffset > 100) {
        ref.current.classList.add("scrolled");
      } else {
        ref.current.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header" ref={ref}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="logo">
          {logo}
        </Link>

        {/* Menu */}
        <nav>
          <ul className="nav-menu">
            {menu.map((item, i) => (
              <li key={i}>
                {item.href.startsWith("/") ? (
                  <Link to={item.href}>{item.label}</Link>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
            ))}

            {/* Admin */}
            <li>
              <a
                href="/admin/index.html"
                title="Administration"
                rel="noopener"
                target="_blank"
                className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              >
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
