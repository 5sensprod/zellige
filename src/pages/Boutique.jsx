import React from "react";
import HeroSlider from "../components/HeroSlider.jsx";
import ProductSection from "../components/ProductSection.jsx";
import TextSection from "../components/TextSection.jsx";

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
