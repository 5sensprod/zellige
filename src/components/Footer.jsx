import React from "react";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";

function DemoLink({ className = "", children }) {
  // Composant utilitaire pour "couper" les liens en démo
  return (
    <span
      onClick={(e) => e.preventDefault()}
      role="link"
      aria-disabled="true"
      title="Démo — lien inactif"
      className={`cursor-not-allowed select-none ${className}`}
    >
      {children}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#F4EFE7] text-neutral-800 border-t border-neutral-300/60">
      {/* Section d'accroche */}
      <div className="max-w-6xl mx-auto px-6 pt-14 text-center">
        <p className="text-sm tracking-[0.35em] uppercase text-neutral-500">
          L’esprit Zellige Boutique
        </p>
        <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Le sens du geste, l’élégance du détail
        </h3>
      </div>

      {/* Corps du footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-12">
        {/* Colonne gauche : Contact */}
        <div className="text-center md:text-left">
          <p className="text-sm tracking-[0.25em] uppercase text-neutral-500 mb-4">
            Contactez-nous
          </p>
          <p className="text-[1.05rem] text-neutral-700 leading-relaxed mb-3">
            Une question, une demande particulière ou envie d’en savoir plus sur nos créations ?
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-[1.05rem] text-neutral-800 mb-1">
            <Mail className="w-5 h-5" />
            <DemoLink className="hover:opacity-70 transition">
              contact@zellige-boutique.com
            </DemoLink>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-[1.05rem] text-neutral-800">
            <MapPin className="w-5 h-5" /> Marrakech, Maroc
          </p>
        </div>

        {/* Colonne centrale : Liens légaux (désactivés) */}
        <div className="text-center md:text-left">
          <p className="text-sm tracking-[0.25em] uppercase text-neutral-500 mb-4">Informations</p>
          <ul className="space-y-2 text-[1.05rem] text-neutral-800">
            <li>
              <DemoLink className="hover:underline underline-offset-4">Mentions légales</DemoLink>
            </li>
            <li>
              <DemoLink className="hover:underline underline-offset-4">
                Politique de confidentialité
              </DemoLink>
            </li>
            <li>
              <DemoLink className="hover:underline underline-offset-4">Contact</DemoLink>
            </li>
          </ul>
        </div>

        {/* Colonne droite : Réseaux sociaux (désactivés) */}
        <div className="text-center md:text-left">
          <p className="text-sm tracking-[0.25em] uppercase text-neutral-500 mb-4">Suivez-nous</p>
          <div className="flex items-center justify-center md:justify-start gap-5">
            <DemoLink className="p-2 rounded-full border border-neutral-400/60 hover:border-neutral-800 hover:-translate-y-0.5 transition inline-flex">
              <Facebook className="w-5 h-5" />
            </DemoLink>
            <DemoLink className="p-2 rounded-full border border-neutral-400/60 hover:border-neutral-800 hover:-translate-y-0.5 transition inline-flex">
              <Instagram className="w-5 h-5" />
            </DemoLink>
            <DemoLink className="p-2 rounded-full border border-neutral-400/60 hover:border-neutral-800 hover:-translate-y-0.5 transition inline-flex">
              <Mail className="w-5 h-5" />
            </DemoLink>
          </div>
        </div>
      </div>

      {/* Sous-footer (identique, mais liens coupés) */}
      <div className="border-t border-neutral-200 py-5 text-center text-[0.975rem] text-neutral-600">
        <p className="tracking-[0.18em] uppercase text-xs md:text-sm text-neutral-700">
          © 2025 <span className="font-medium">ZELLIGE BOUTIQUE</span>
          <span className="mx-3 text-neutral-400">—</span>
          <span className="normal-case tracking-normal">
            Design by <DemoLink className="hover:underline underline-offset-4">5sensprod</DemoLink>
          </span>
        </p>
      </div>
    </footer>
  );
}
