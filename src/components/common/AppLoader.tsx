import React from "react";

export const AppLoader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--bg-primary)",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "340px", padding: "0 1.5rem" }}>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent-gold)",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          ATELIER HANDLOOMS
        </span>

        <h1
          className="font-serif"
          style={{
            fontSize: "2.2rem",
            letterSpacing: "0.08em",
            color: "var(--text-primary)",
            lineHeight: 1.1,
            margin: "0 0 0.5rem 0",
          }}
        >
          EVARA VASTRA
        </h1>

        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "2rem",
          }}
        >
          CRAFT • FORM • DETAIL
        </p>

        {/* Minimal luxury line loader */}
        <div
          style={{
            width: "120px",
            height: "2px",
            backgroundColor: "rgba(177, 138, 82, 0.2)",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "45%",
              backgroundColor: "var(--accent-wine)",
              animation: "loaderSlide 1.2s infinite ease-in-out",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loaderSlide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(120%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};
