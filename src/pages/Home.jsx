import React from "react";
import HeroSlider from "../components/HeroSlider.jsx";
import Categories from "../components/Categories.jsx";

export default function Home() {
  const [data, setData] = React.useState({ hero: [], categories: [] });

  React.useEffect(() => {
    let mounted = true;
    fetch("/data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(
        (json) => mounted && setData({ hero: json.hero || [], categories: json.categories || [] })
      )
      .catch((e) => console.error("⚠️ data.json non chargé", e));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <HeroSlider slides={data.hero} />
      <Categories items={data.categories} />
    </>
  );
}
