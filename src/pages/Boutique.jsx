import React from "react";
import HeroSlider from "../components/HeroSlider.jsx";

// ===== COMPOSANT: HeartIcon =====
const HeartIcon = () => (
  <svg className="wishlist-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// ===== COMPOSANT: DetailCard =====
function DetailCard({ item }) {
  return (
    <div className="detail-card group">
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

// ===== COMPOSANT: ProductSection =====
function ProductSection({ reverse = false, mainImage, details = [] }) {
  const sectionRef = React.useRef(null);

  // Animation au scroll
  React.useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".detail-card") || [];
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
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      io.observe(el);
    });

    return () => io.disconnect();
  }, [details]);

  return (
    <div className="product-scroll-section" ref={sectionRef}>
      <div className={`product-layout ${reverse ? "reverse" : ""}`}>
        {/* Image principale */}
        {!reverse && (
          <div className="main-product">
            <div
              className="main-product-image"
              style={mainImage ? { backgroundImage: `url('${mainImage}')` } : {}}
            />
          </div>
        )}

        {/* Détails */}
        <div className="details-sidebar">
          {details.map((d, i) => (
            <DetailCard key={i} item={d} />
          ))}
        </div>

        {/* Image principale (reverse) */}
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
  );
}

// ===== COMPOSANT: TextSection =====
function TextSection({ block }) {
  return (
    <div className="section">
      <div className="container">
        <div className={`section-grid ${block?.reverse ? "reverse" : ""}`}>
          {/* Image */}
          {!block?.reverse && (
            <div
              className="section-image"
              style={block?.image ? { backgroundImage: `url('${block.image}')` } : {}}
            />
          )}

          {/* Contenu */}
          <div className={block?.reverse ? "md:order-1" : ""}>
            {block?.label && <div className="section-label">{block.label}</div>}
            {block?.title && <h2 className="section-title">{block.title}</h2>}
            {block?.text && <p className="section-text">{block.text}</p>}
          </div>

          {/* Image (reverse) */}
          {block?.reverse && (
            <div
              className="section-image md:order-2"
              style={block?.image ? { backgroundImage: `url('${block.image}')` } : {}}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ===== PAGE: Boutique =====
export default function Boutique() {
  const [boutique, setBoutique] = React.useState(null);

  // Charger data.json
  React.useEffect(() => {
    fetch("/data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => setBoutique(json.boutique || null))
      .catch((e) => console.error("⚠️ data.json non chargé", e));
  }, []);

  // Loading state
  if (!boutique) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center text-secondary text-lg tracking-[3px] uppercase">
          Chargement…
        </div>
      </div>
    );
  }

  // Préparer slide hero
  const heroSlide = boutique?.hero
    ? [
        {
          title: boutique.hero.title,
          subtitle: boutique.hero.subtitle,
          image: boutique.hero.image,
        },
      ]
    : [];

  return (
    <>
      {/* Hero */}
      <div className="container">
        <HeroSlider slides={heroSlide} autoplay={false} showDots={false} height="90vh" />
      </div>

      {/* Sections + TextBlocks alternés */}
      {(boutique.sections || []).map((sec, idx) => (
        <React.Fragment key={`sec-${idx}`}>
          <ProductSection
            reverse={!!sec.reverse}
            mainImage={sec.mainImage}
            details={sec.details || []}
          />

          {/* TextBlock correspondant (si existe) */}
          {boutique.textBlocks?.[idx] && <TextSection block={boutique.textBlocks[idx]} />}
        </React.Fragment>
      ))}
    </>
  );
}
