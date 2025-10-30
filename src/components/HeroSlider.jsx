import React from "react";

export default function HeroSlider({ slides = [] }) {
  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  React.useEffect(() => {
    if (!timerRef.current || slides.length <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [index, slides.length]);

  return (
    <section className="hero-slider" id="heroSlider">
      {slides.map((s, i) => (
        <div key={i} className={`hero-slide ${i === index ? "active" : ""}`}>
          <div
            className="hero-slide-image"
            style={s.image ? { backgroundImage: `url('${s.image}')` } : {}}
          />
          <div className="hero-slide-content">
            <div className="box">
              {s.label && <div className="hero-label">{s.label}</div>}
              {s.title && <h1 className="hero-title">{s.title}</h1>}
              {s.subtitle && <p className="hero-sub">{s.subtitle}</p>}
              {s.ctaText && (
                <a className="hero-cta" href={s.ctaHref || "#"}>
                  {s.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`slider-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
