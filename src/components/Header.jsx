import React from "react";

export default function Header({
  logo = "Maison Luxe",
  menu = [
    { label: "Collections", href: "#collections" },
    { label: "Boutiques", href: "boutique.html" },
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
        <a href="index.html" className="logo">
          {logo}
        </a>
        <nav>
          <ul className="nav-menu">
            {menu.map((item, i) => (
              <li key={i}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
