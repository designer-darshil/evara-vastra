import React from "react";

export const EditorialMarquee: React.FC = () => {
  const marqueeItems = [
    "PURE MULBERRY SILK",
    "KADWA PIT LOOM WEAVE",
    "TESTED GOLD ZARI",
    "100-COUNT HANDSPUN MULMUL",
    "CHANDERE SILK",
    "ORGANIC LINEN DRAPES",
    "GENUINE SILK MARK CERTIFIED",
    "DIRECT FROM WEAVER GUILDS",
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
    >
      <div
        style={{
          display: "inline-flex",
          animation: "marqueeScroll 35s linear infinite",
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
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
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
      `}</style>
    </div>
  );
};
