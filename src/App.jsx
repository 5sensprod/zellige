import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HeroSlider from "./components/HeroSlider.jsx";
import Categories from "./components/Categories.jsx";

export default function App() {
  const [data, setData] = React.useState({ hero: [], categories: [] });

  React.useEffect(() => {
    let mounted = true;
    // data.json dans /public => accessible via /data.json
    fetch("/data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setData({ hero: json.hero || [], categories: json.categories || [] });
      })
      .catch((e) => console.error("⚠️ data.json non chargé", e));
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Header />
      <HeroSlider slides={data.hero} />
      <Categories items={data.categories} />
      <Footer />
    </>
  );
}
