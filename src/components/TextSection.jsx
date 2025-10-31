import React from "react";

export default function TextSection({ block }) {
  if (!block) return null;

  return (
    <div className="section">
      <div className="container">
        <div className={`section-grid ${block?.reverse ? "reverse" : ""}`}>
          {!block?.reverse && (
            <div
              className="section-image"
              style={block?.image ? { backgroundImage: `url('${block.image}')` } : {}}
            />
          )}

          <div className={block?.reverse ? "md:order-1" : ""}>
            {block?.label && <div className="section-label">{block.label}</div>}
            {block?.title && <h2 className="section-title">{block.title}</h2>}
            {block?.text && <p className="section-text">{block.text}</p>}
          </div>

          {block?.reverse && (
            <div
              className="section-image md:order-2"
              style={block?.image ? { backgroundImage: `url('${block.image}')` } : {}}
            />
          )}
        </div>
      </div>
    </div>
  );
}
