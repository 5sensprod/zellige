import React from "react";

export default function SectionTitle({ label = "", title = "", className = "" }) {
  if (!label && !title) return null;

  return (
    <div className={`text-center py-12 md:py-20 px-6 md:px-10 ${className}`}>
      {label && (
        <div className="text-xs md:text-sm tracking-[3px] md:tracking-[4px] uppercase text-secondary mb-4 md:mb-5">
          {label}
        </div>
      )}
      {title && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[3px] md:tracking-[4px] uppercase text-foreground">
          {title}
        </h2>
      )}
    </div>
  );
}
