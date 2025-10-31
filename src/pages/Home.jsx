import React, { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider.jsx";
import Categories from "../components/Categories.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Home() {
  const [data, setData] = useState({ hero: [], categories: [] });
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
        autoplay={true}
        interval={5000}
        showDots={true}
        height="100vh"
      />

      <SectionTitle label="Nos valeurs" title="Tradition & modernité" />

      <Categories items={data.categories} />

      <SectionTitle
        label="Nouvelle Collection"
        title="Découvrez Nos Créations"
        className="bg-muted"
      />

      {/* Vous pouvez ajouter d'autres sections ici */}
    </>
  );
}
