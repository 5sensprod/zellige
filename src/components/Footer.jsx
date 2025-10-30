import React from "react";

export default function Footer() {
  return (
    <footer className="footer-cta">
      <h3 className="footer-cta-title">Visitez Nos Boutiques</h3>
      <p className="footer-cta-text">
        Nos créations ont été soigneusement sélectionnées par chacune de nos boutiques. Pour en
        savoir plus, trouvez la boutique la plus proche.
      </p>
      <a href="/boutique.html" className="cta-button">
        Trouver Une Boutique
      </a>
    </footer>
  );
}
