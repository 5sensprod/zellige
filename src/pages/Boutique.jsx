import React from "react";
import HeroSlider from "../components/HeroSlider.jsx";
import "../styles/Boutique.css";

function BoutiqueHero({ hero }) {
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      const scrolled = window.pageYOffset;
      if (imgRef.current) imgRef.current.style.transform = `translateY(${scrolled * 0.2}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="hero">
      <div
        ref={imgRef}
        className="hero-image"
        style={hero?.image ? { backgroundImage: `url('${hero.image}')` } : {}}
      />
      <div className="hero-content">
        {hero?.title && <h1 className="hero-title">{hero.title}</h1>}
        {hero?.subtitle && <p className="hero-subtitle">{hero.subtitle}</p>}
      </div>
    </div>
  );
}

const HeartIcon = () => (
  <svg className="wishlist-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

function DetailCard({ item }) {
  return (
    <div className="detail-card">
      <div
        className="detail-image"
        style={item?.image ? { backgroundImage: `url('${item.image}')` } : {}}
      >
        <button
          className="wishlist-btn"
          aria-label="Ajouter aux favoris"
          onClick={(e) => e.currentTarget.classList.toggle("active")}
        >
          <HeartIcon />
        </button>
      </div>
      <div className="product-label">{item?.label || ""}</div>
      <div className="product-name">{item?.name || ""}</div>
    </div>
  );
}

function ProductSection({ reverse = false, mainImage, details = [] }) {
  const sectionRef = React.useRef(null);
  React.useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".section-grid, .detail-card") || [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity .8s ease, transform .8s ease";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="product-scroll-section" ref={sectionRef}>
      <div className="product-scroll-wrapper">
        <div className={`product-layout ${reverse ? "reverse" : ""}`}>
          {!reverse && (
            <div className="main-product">
              <div
                className="main-product-image"
                style={mainImage ? { backgroundImage: `url('${mainImage}')` } : {}}
              />
            </div>
          )}
          <div className={`details-sidebar ${reverse ? "left" : "right"}`}>
            {details.map((d, i) => (
              <DetailCard key={i} item={d} />
            ))}
          </div>
          {reverse && (
            <div className="main-product">
              <div
                className="main-product-image"
                style={mainImage ? { backgroundImage: `url('${mainImage}')` } : {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextSection({ block }) {
  return (
    <div className="section container">
      <div className={`section-grid ${block?.reverse ? "reverse" : ""}`}>
        <div
          className="section-image"
          style={block?.image ? { backgroundImage: `url('${block.image}')` } : {}}
        />
        <div className="section-content">
          {block?.label && <div className="section-label">{block.label}</div>}
          {block?.title && <h2 className="section-title">{block.title}</h2>}
          {block?.text && <p className="section-text">{block.text}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Boutique() {
  const [boutique, setBoutique] = React.useState(null);
  const oneSlide = boutique?.hero
    ? [{ title: boutique.hero.title, subtitle: boutique.hero.subtitle, image: boutique.hero.image }]
    : [];

  React.useEffect(() => {
    fetch("/data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => setBoutique(json.boutique || null))
      .catch((e) => console.error("data.json non chargé", e));
  }, []);

  if (!boutique) {
    return (
      <div style={{ marginTop: 140, textAlign: "center", padding: "40px", opacity: 0.7 }}>
        Chargement…
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <HeroSlider
          slides={oneSlide}
          autoplay={false} // une seule vignette => pas d’autoplay
          showDots={false} // pas de points
          height="90vh" // même hauteur que ta section boutique
          theme="dark" // texte sombre, cohérent avec Boutique
          parallax="false"
        />
      </div>

      {(boutique.sections || []).map((sec, idx) => (
        <React.Fragment key={`sec-${idx}`}>
          <ProductSection
            reverse={!!sec.reverse}
            mainImage={sec.mainImage}
            details={sec.details || []}
          />
          {boutique.textBlocks && boutique.textBlocks[idx] && (
            <TextSection block={boutique.textBlocks[idx]} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
