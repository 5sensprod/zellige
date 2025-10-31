import React from "react";

/**
 * HeroSlider — style calqué sur ton CSS + parallaxe JS (scroll)
 *
 * - Image positionnée en bas (background-position: bottom)
 * - Parallaxe JS fluide (compatible mobile)
 * - Fondu 1s entre slides
 * - Ombrages de texte identiques à ton CSS
 * - Bouton et dots au même look/placement
 */
export default function HeroSlider({
  slides = [],
  autoplay = false,
  interval = 5000,
  showDots = true,
  height = "100vh",
  theme = "light",
  map,
  parallax = true,
  parallaxSpeed = 0.35, // 0.2–0.5 recommandé
  parallaxZoom = 1.0, // 1.0 si tu ne veux pas de zoom
}) {
  const normSlides = React.useMemo(() => (map ? slides.map(map) : slides), [slides, map]);

  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef(null);

  const containerRef = React.useRef(null);
  const containerTopRef = React.useRef(0);
  const rafRef = React.useRef(0);

  const many = normSlides.length > 1;
  const doAutoplay = autoplay && many;
  const isDark = theme === "dark";

  // --- Autoplay (fondu identique à ton CSS)
  React.useEffect(() => {
    if (!doAutoplay) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % normSlides.length), interval);
    return () => clearInterval(timerRef.current);
  }, [doAutoplay, normSlides.length, interval]);

  React.useEffect(() => {
    if (!doAutoplay || !timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % normSlides.length), interval);
    return () => clearInterval(timerRef.current);
  }, [index, doAutoplay, normSlides.length, interval]);

  // --- Parallaxe JS (au scroll)
  React.useLayoutEffect(() => {
    if (!parallax) return;

    const measureTop = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      containerTopRef.current = window.scrollY + rect.top;
    };

    const update = () => {
      rafRef.current = 0;
      if (!containerRef.current) return;
      const active = containerRef.current.querySelector(".js-parallax.active-img");
      if (!active) return;

      const scrollY = window.scrollY;
      const rel = scrollY - containerTopRef.current;
      const translateY = Math.round(rel * parallaxSpeed);
      active.style.transform = `translateY(${translateY}px) scale(${parallaxZoom})`;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    measureTop();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureTop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureTop);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [parallax, parallaxSpeed, parallaxZoom, index]);

  // --- Styles CTA (identiques à ton CSS)
  const ctaBase =
    "inline-block px-[45px] py-[15px] uppercase tracking-[3px] text-[0.9rem] transition";
  const ctaClass = isDark
    ? `${ctaBase} border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white`
    : `${ctaBase} border-2 border-white text-white hover:bg-white hover:text-[#222]`;

  // --- Ombrages comme ton CSS
  const shadowLabel = { textShadow: "0 2px 8px rgba(0,0,0,0.3)" };
  const shadowTitle = { textShadow: "0 2px 8px rgba(0,0,0,0.2)" };
  const shadowSub = { textShadow: "0 2px 8px rgba(0,0,0,0.3)" };

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden" style={{ height }}>
      {normSlides.map((s, i) => {
        const active = i === index;
        const label = s.label?.trim();
        const title = s.title?.trim();
        const subtitle = s.subtitle?.trim();
        const ctaText = s.ctaText?.trim();
        const ctaHref = s.ctaHref?.trim() || "#";

        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!active}
          >
            {/* Image de fond (parallaxe target) — bottom/cover/no-repeat */}
            <div
              className={[
                "absolute inset-0 w-full h-full",
                "bg-bottom bg-cover bg-no-repeat",
                "will-change-transform",
                "js-parallax",
                active ? "active-img" : "",
              ].join(" ")}
              style={{
                backgroundImage: s.image ? `url('${s.image}')` : undefined,
                backgroundPosition: "bottom",
                transform: parallax ? undefined : `scale(${parallaxZoom})`,
              }}
            />

            {/* Voile léger (comme .hero-slide::before) */}
            <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0)" }} />

            {/* Contenu centré (identique .hero-slide-content) */}
            <div className="absolute inset-0 z-[2] grid place-items-center text-center px-10 animate-[fadeUp_1.2s_ease-out_both]">
              <div className="max-w-5xl mx-auto text-white">
                {label && (
                  <div
                    className="mb-[25px] uppercase tracking-[4px] text-[1rem]"
                    style={shadowLabel}
                  >
                    {label}
                  </div>
                )}

                {title && (
                  <h1
                    className="mb-[20px] uppercase font-normal leading-[1.2] tracking-[5px] text-[2rem] md:text-[3rem] lg:text-[4rem]"
                    style={shadowTitle}
                  >
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p
                    className="mb-[35px] font-light leading-[1.8] tracking-[1px] text-[1.2rem] text-[#f9f9f9]"
                    style={shadowSub}
                  >
                    {subtitle}
                  </p>
                )}

                {ctaText && (
                  <a className={ctaClass} href={ctaHref}>
                    {ctaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Dots (mêmes dimensions/placement) */}
      {showDots && many && (
        <div className="absolute left-1/2 -translate-x-1/2 z-[3] flex gap-[12px] bottom-[120px]">
          {normSlides.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                aria-label={`Aller à la slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={[
                  "w-[12px] h-[12px] rounded-full border-[2px] transition cursor-pointer",
                  "border-white",
                  active ? "bg-white" : "bg-transparent",
                ].join(" ")}
              />
            );
          })}
        </div>
      )}

      {/* SR live region */}
      <div className="sr-only" aria-live="polite">
        Slide {index + 1} sur {normSlides.length}
      </div>

      {/* Keyframes identiques */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
