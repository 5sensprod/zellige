import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [data, setData] = useState({ hero: [], categories: [] });

  // Load JSON (public/data.json)
  useEffect(() => {
    fetch("/data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => setData({ hero: json.hero || [], categories: json.categories || [] }))
      .catch((e) => console.error("data.json error", e));
  }, []);

  return (
    <main className="bg-lux-bg text-lux-text">
      {/* <HeaderBar /> */}
      <HeroSlider slides={data.hero} />
      <Categories items={data.categories} />
      <CTA />
      <FooterBar />
    </main>
  );
}

/* ---------- Header minimal (logo cliquable + nav) ---------- */
function HeaderBar() {
  const headerRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) headerRef.current?.classList.add("backdrop");
      else headerRef.current?.classList.remove("backdrop");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-8 py-7 transition-all pointer-events-none
                 [&.backdrop]:bg-white/95 [&.backdrop]:backdrop-blur [&.backdrop]:shadow-md [&.backdrop]:pointer-events-auto"
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <a
          href="/index.html"
          className="pointer-events-auto text-[1.5rem] font-light tracking-[0.25em] uppercase no-underline hover:opacity-70"
        >
          Maison Luxe
        </a>
        <nav className="pointer-events-auto">
          <ul className="hidden md:flex gap-10 uppercase text-sm tracking-[0.15em]">
            <li>
              <a href="#collections" className="hover:opacity-60">
                Collections
              </a>
            </li>
            <li>
              <a href="/boutique.html" className="hover:opacity-60">
                Boutiques
              </a>
            </li>
            <li>
              <a href="#histoire" className="hover:opacity-60">
                Histoire
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:opacity-60">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Hero Slider ---------- */
function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="w-full h-full border border-lux-border"
            style={{
              backgroundImage: s.image ? `url('${s.image}')` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 grid place-items-center text-white px-6">
            <div className="max-w-3xl text-center">
              {s.label && (
                <div className="text-xs uppercase tracking-[0.3em] mb-5 opacity-90">{s.label}</div>
              )}
              {s.title && (
                <h1 className="text-5xl md:text-6xl font-light tracking-[0.2em] uppercase mb-6">
                  {s.title}
                </h1>
              )}
              {s.subtitle && <p className="text-lg font-light leading-8 mb-10">{s.subtitle}</p>}
              {s.ctaText && (
                <a
                  href={s.ctaHref || "#"}
                  className="inline-block px-10 py-4 border border-white uppercase tracking-[0.25em] text-sm hover:bg-white hover:text-lux-text transition"
                >
                  {s.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full border border-white ${i === index ? "bg-white" : "bg-transparent"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Catégories (scroll horizontal GSAP pin) ---------- */
function Categories({ items = [] }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return;

    const getScrollW = () => trackRef.current.scrollWidth - window.innerWidth + 120;

    const tween = gsap.to(trackRef.current, {
      x: () => -getScrollW(),
      ease: "none",
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top top+=250",
        end: () => `+=${getScrollW()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [items.length]);

  // Fade-in items
  useEffect(() => {
    const els = trackRef.current?.querySelectorAll(".cat-card") ?? [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("opacity-0", "translate-y-6");
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    els.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6", "transition", "duration-700");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section id="collections" className="bg-white pt-24">
      <div className="sticky top-20 z-10 text-center px-6 py-14 shadow-sm bg-white">
        <div className="text-xs uppercase tracking-[0.3em] text-lux-accent mb-3">Nos Univers</div>
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.15em] uppercase">
          Explorez Les Collections
        </h2>
      </div>

      <div ref={wrapRef} className="py-10">
        <div ref={trackRef} className="flex gap-16 px-16 will-change-transform">
          {items.map((c, i) => (
            <article key={i} className="cat-card flex-none w-[600px] md:w-[500px] lg:w-[600px]">
              <div
                className="w-full aspect-[16/9] border border-lux-border mb-6 relative overflow-hidden"
                style={{
                  backgroundImage: c.image ? `url('${c.image}')` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 p-8 text-white"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,.7), transparent)" }}
                >
                  <p className="text-sm leading-6">{c.overlay || ""}</p>
                </div>
              </div>
              <h3 className="text-2xl font-light tracking-wider uppercase text-center mb-4">
                {c.name}
              </h3>
              <p className="text-sm text-neutral-600 text-center">{c.description}</p>
              <div className="text-xs uppercase tracking-[0.2em] text-lux-accent text-center mt-3">
                {c.count ?? 0} Créations
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA Footer (Shadcn demo) ---------- */
function CTA() {
  return (
    <section className="max-w-screen-lg mx-auto px-6 py-20 text-center">
      <h3 className="text-2xl font-light tracking-[0.25em] uppercase mb-6">Prêt ?</h3>
      <p className="text-muted-foreground mb-8">
        Stack: Vite + Tailwind + shadcn + Lucide + Router + ESLint + Prettier + GSAP.
      </p>
      <div className="flex justify-center gap-3">
        <Button>
          <Rocket className="size-4 mr-2" />
          C’est parti
        </Button>
        <Button variant="outline">Bouton outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </section>
  );
}

/* ---------- Footer minimal ---------- */
function FooterBar() {
  return (
    <footer className="bg-lux-text text-white text-center px-6 py-20">
      <h4 className="text-2xl font-light tracking-[0.25em] uppercase mb-6">
        Visitez Nos Boutiques
      </h4>
      <p className="max-w-2xl mx-auto opacity-90 mb-10 font-light">
        Nos créations ont été soigneusement sélectionnées par chacune de nos boutiques. Pour en
        savoir plus, trouvez la boutique la plus proche.
      </p>
      <a
        href="/boutique.html"
        className="inline-block px-12 py-4 border border-white uppercase tracking-[0.25em] text-sm hover:bg-white hover:text-lux-text transition"
      >
        Trouver Une Boutique
      </a>
    </footer>
  );
}
