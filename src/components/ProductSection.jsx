import React, { useRef, useEffect } from "react";

const HeartIcon = () => (
  <svg className="wishlist-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

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

export default function ProductSection({ reverse = false, mainImage, details = [] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
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
        {!reverse && (
          <div className="main-product">
            <div
              className="main-product-image"
              style={mainImage ? { backgroundImage: `url('${mainImage}')` } : {}}
            />
          </div>
        )}

        <div className="details-sidebar">
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
  );
}
