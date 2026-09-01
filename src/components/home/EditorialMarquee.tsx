import React from "react";

export const EditorialMarquee: React.FC = () => {
  const statements = [
    "HAND-SPUN MULBERRY SILK",
    "VARANASI KADWA PIT LOOMS",
    "100-COUNT BREATHABLE MULMUL",
    "TESTED METALLIC GOLD ZARI",
    "NATURAL DYES & ZERO HARSH ACIDS",
    "MUMBAI ATELIER",
    "CHANDERI WEAVERS GUILD",
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--bg-dark)",
        color: "var(--text-inverse)",
        padding: "0.85rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: "1px solid var(--border-dark)",
        borderBottom: "1px solid var(--border-dark)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: "2.5rem",
          alignItems: "center",
          animation: "marqueeScroll 35s linear infinite",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        {[...statements, ...statements].map((text, i) => (
          <React.Fragment key={i}>
            <span>{text}</span>
            <span style={{ color: "var(--accent-gold)" }}>✦</span>
          </React.Fragment>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
