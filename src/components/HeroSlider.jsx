import React, { useState, useEffect, useRef } from "react";

export default function HeroSlider({
  slides = [],
  autoplay = false,
  interval = 5000,
  showDots = true,
  height = "100vh",
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const hasMultiple = slides.length > 1;
  const shouldAutoplay = autoplay && hasMultiple;

  // Autoplay
  useEffect(() => {
    if (!shouldAutoplay) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [shouldAutoplay, slides.length, interval]);

  // Reset timer au changement manuel
  useEffect(() => {
    if (!shouldAutoplay || !timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [index, shouldAutoplay, slides.length, interval]);

  if (!slides.length) return null;

  return (
    <section className="relative w-full overflow-hidden" style={{ height }}>
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === index ? "active" : ""}`}>
          {/* Image background */}
          <div
            className="w-full h-full bg-cover bg-top bg-fixed"
            style={
              slide.useGradient
                ? { background: "linear-gradient(135deg, #d4b896 0%, #f5e6d3 50%, #e8d5b7 100%)" }
                : slide.image
                  ? { backgroundImage: `url('${slide.image}')` }
                  : { background: "linear-gradient(135deg, #d4b896 0%, #f5e6d3 50%, #e8d5b7 100%)" }
            }
          />

          {/* Contenu */}
          <div className="hero-slide-content absolute inset-0 grid place-items-center text-center px-6 md:px-10 z-2">
            <div className="max-w-[800px]">
              {slide.label && (
                <div className="text-sm md:text-base tracking-[4px] uppercase mb-5 md:mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  {slide.label}
                </div>
              )}

              {slide.title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-[3px] md:tracking-[5px] uppercase leading-tight mb-4 md:mb-5 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                  {slide.title}
                </h1>
              )}

              {slide.subtitle && (
                <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed tracking-wide mb-6 md:mb-9 text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  {slide.subtitle}
                </p>
              )}

              {slide.ctaText && (
                <a
                  href={slide.ctaHref || "#"}
                  className="inline-block px-8 md:px-11 py-3.5 md:py-4 border-2 border-white text-white uppercase tracking-[2px] md:tracking-[3px] text-xs md:text-sm transition-all duration-300 hover:bg-white hover:text-[#222]"
                >
                  {slide.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      {showDots && hasMultiple && (
        <div className="absolute bottom-20 md:bottom-30 left-1/2 -translate-x-1/2 flex gap-2.5 md:gap-3 z-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-white cursor-pointer transition-all ${
                i === index ? "bg-white" : "bg-transparent"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
