import React, { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider.jsx";
import Categories from "../components/Categories.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ProductSection from "../components/ProductSection.jsx";
import TextSection from "../components/TextSection.jsx";

export default function Home() {
  const [data, setData] = useState({
    hero: [],
    categories: [],
    productSections: [],
    textBlocks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (mounted) {
          setData({
            hero: json.hero || [],
            categories: json.categories || [],
            productSections: json.productSections || [],
            textBlocks: json.textBlocks || [],
          });
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error("⚠️ data.json non chargé", e);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center text-secondary text-lg tracking-[3px] uppercase">
          Chargement…
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSlider
        slides={data.hero}
        autoplay={false}
        interval={5000}
        showDots={true}
        height="100vh"
      />

      <SectionTitle label="Nos valeurs" title="Tradition & modernité" className="bg-muted" />

      {data.textBlocks.map((block, idx) => (
        <TextSection key={idx} block={block} />
      ))}

      <Categories items={data.categories} />

      <SectionTitle
        label="Nouvelle Collection"
        title="Découvrez Nos Créateurs"
        className="bg-muted"
      />

      {data.productSections.map((section, idx) => (
        <ProductSection
          key={idx}
          reverse={section.reverse}
          mainImage={section.mainImage}
          details={section.details || []}
        />
      ))}
    </>
  );
}
