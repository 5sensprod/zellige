import React from "react";
import { Link } from "react-router-dom";

export default function Header({
  logo = "Maison Luxe",
  menu = [
    { label: "Collections", href: "#collections" },
    { label: "Boutiques", href: "/boutique" }, // route SPA
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
      <div className="nav-container">
        <Link to="/" className="logo">
          {logo}
        </Link>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
