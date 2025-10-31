import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Categories({ items = [] }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  // Animation cards au scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".category-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [items]);

  // ScrollTrigger horizontal
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container || items.length === 0) return;

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

  if (!items.length) return null;

  return (
    <section className="bg-white pt-25" id="categoriesSection">
      {/* Header sticky */}
      <div
        ref={headerRef}
        id="categoriesHeader"
        className="sticky top-[70px] bg-white z-[100] text-center py-12 md:py-20 px-6 md:px-10 shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
      >
        <div className="text-xs md:text-sm tracking-[3px] md:tracking-[4px] uppercase text-secondary mb-4 md:mb-5">
          Nos ambiances
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[3px] md:tracking-[4px] uppercase text-foreground">
          Explorez Les Univers
        </h2>
      </div>

      {/* Container scroll horizontal */}
      <div ref={sectionRef} id="categoriesScrollSection" className="py-10 pb-20 md:pb-25">
        <div
          ref={containerRef}
          id="categoriesContainer"
          className="categories-scroll-container flex gap-10 md:gap-15 px-6 md:px-15"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="category-card group flex-none w-full sm:w-[500px] lg:w-[600px] cursor-pointer transition-transform duration-400 hover:-translate-y-2.5"
            >
              {/* Image avec overlay */}
              <div className="relative w-full aspect-video bg-muted bg-cover bg-center border-2 border-border mb-7.5 overflow-hidden">
                {item.image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                )}

                {item.overlay && (
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/70 to-transparent text-white translate-y-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm leading-relaxed">{item.overlay}</p>
                  </div>
                )}
              </div>

              {/* Infos */}
              <h3 className="text-2xl lg:text-3xl font-light tracking-[3px] uppercase mb-7.5 text-center">
                {item.name}
              </h3>

              {item.description && (
                <p className="text-base leading-relaxed text-muted-foreground text-center tracking-wide">
                  {item.description}
                </p>
              )}

              {item.count !== undefined && (
                <div className="text-xs tracking-[2px] uppercase text-secondary text-center mt-4">
                  {item.count} Créations
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
