import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Categories({ items = [] }) {
  const sectionRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const headerRef = React.useRef(null);

  // Intersection animations
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".category-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(30px)";
      c.style.transition = "opacity .8s ease, transform .8s ease";
      io.observe(c);
    });
    return () => io.disconnect();
  }, [items]);

  // ScrollTrigger horizontal
  React.useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const getScrollWidth = () => container.scrollWidth - window.innerWidth + 120;

    const tween = gsap.to(container, {
      x: () => -getScrollWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top+=250",
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeave: () => {
          if (headerRef.current) headerRef.current.style.position = "relative";
        },
        onEnterBack: () => {
          if (headerRef.current) headerRef.current.style.position = "sticky";
        },
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [items]);

  return (
    <section className="categories-section" id="categoriesSection">
      <div className="categories-header" id="categoriesHeader" ref={headerRef}>
        <div className="categories-label">Nos ambiance</div>
        <h2 className="categories-title">Explorez Les Univers</h2>
      </div>
      <div className="categories-scroll-section" id="categoriesScrollSection" ref={sectionRef}>
        <div className="categories-scroll-container" id="categoriesContainer" ref={containerRef}>
          {items.map((c, i) => (
            <div className="category-card" key={i}>
              <div
                className="category-image"
                style={c.image ? { backgroundImage: `url('${c.image}')` } : {}}
              >
                <div className="category-overlay">
                  <p style={{ color: "#fff", fontSize: ".9rem", lineHeight: "1.6" }}>
                    {c.overlay || ""}
                  </p>
                </div>
              </div>
              <h3 className="category-name">{c.name || ""}</h3>
              <p className="category-description">{c.description || ""}</p>
              <div className="category-count">{c.count ?? 0} Créations</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
