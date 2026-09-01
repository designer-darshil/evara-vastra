import React from "react";
import { ArrowRight } from "lucide-react";

export const NotFoundPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <div
      className="animate-fade-in"
      style={{
        padding: "8rem 1rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--accent-wine)",
          marginBottom: "0.5rem",
        }}
      >
        404 ERROR • PAGE NOT FOUND
      </span>
      <h1 className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1rem" }}>
        Lost Between the Folds
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "var(--text-secondary)",
          maxWidth: "460px",
          lineHeight: 1.6,
          marginBottom: "2.5rem",
        }}
      >
        The drape or page you are looking for has been moved or does not exist. Allow us to guide you back to our contemporary saree collection.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => onNavigate("/")} className="btn-secondary">
          Return Home
        </button>
        <button onClick={() => onNavigate("/shop")} className="btn-wine">
          Explore Sarees <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
