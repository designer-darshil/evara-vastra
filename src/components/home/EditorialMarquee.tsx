import React from "react";

export const EditorialMarquee: React.FC = () => {
  const marqueeItems = [
    "AUTHENTIC SURAT ATELIER WEAVES",
    "PURE CHINON & FANDY SATIN SILK",
    "HANDCRAFTED ZARI & RESHAM WORK",
    "CONTEMPORARY CO-ORD SETS",
    "GENUINE QUALITY ASSURED",
    "FREE SHIPPING PAN INDIA",
    "EXTRA 10% OFF PREPAID ORDERS",
    "7-DAY HASSLE-FREE EXCHANGE",
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--bg-dark)",
        color: "var(--text-inverse)",
        padding: "0.85rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="Atelier Highlights"
    >
      <div
        style={{
          display: "inline-flex",
          animation: "marqueeScroll 38s linear infinite",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {marqueeItems.concat(marqueeItems).map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2.5rem",
              fontSize: "0.74rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <span>{item}</span>
            <span style={{ color: "var(--accent-gold)", fontSize: "0.6rem" }}>✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: marqueeScroll"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
