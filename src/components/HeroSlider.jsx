import React from "react";

export default function HeroSlider({
  slides = [],
  autoplay = false,
  interval = 5000,
  showDots = true,
  height = "100vh",
  theme = "light",
  map,
}) {
  const normSlides = React.useMemo(() => (map ? slides.map(map) : slides), [slides, map]);

  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef(null);

  const many = normSlides.length > 1;
  const doAutoplay = autoplay && many;

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

  const isDark = theme === "dark";
  const contentStyle = {
    color: isDark ? "#2c2c2c" : "#fff",
  };
  const ctaStyle = isDark
    ? { borderColor: "#2c2c2c", color: "#2c2c2c" }
    : { borderColor: "#fff", color: "#fff" };

  return (
    <section className="hero-slider" id="heroSlider" style={{ height }}>
      {normSlides.map((s, i) => (
        <div key={i} className={`hero-slide ${i === index ? "active" : ""}`}>
          <div
            className="hero-slide-image"
            style={s.image ? { backgroundImage: `url('${s.image}')` } : {}}
          />
          <div className="hero-slide-content" style={contentStyle}>
            <div className="box">
              {s.label && <div className="hero-label">{s.label}</div>}
              {s.title && <h1 className="hero-title">{s.title}</h1>}
              {s.subtitle && <p className="hero-sub">{s.subtitle}</p>}
              {s.ctaText && (
                <a className="hero-cta" style={ctaStyle} href={s.ctaHref || "#"}>
                  {s.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {showDots && many && (
        <div className="slider-dots">
          {normSlides.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
