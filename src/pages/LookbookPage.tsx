import React from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight, MapPin } from "lucide-react";

export const LookbookPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { publishedLookbookItems } = useData();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Editorial Lookbook" }]} onNavigate={onNavigate} />

        <div style={{ textAlign: "center", maxWidth: "700px", margin: "1rem auto 4.5rem auto" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            EDITORIAL CAMPAIGN • 2026
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", color: "var(--text-primary)" }}>
            The Season's Lookbook
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            A visual anthology exploring the versatility of Indian drapes across contemporary architectural settings, from twilight galas to sunlit courtyards.
          </p>
        </div>

        {/* Lookbook Items Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {publishedLookbookItems.map((look, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={look.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  display: "grid",
                  gridTemplateColumns: isEven ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-medium)",
                }}
                className="lookbook-row-grid"
              >
                {/* Visual */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    backgroundColor: "#EDE7DD",
                  }}
                >
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Editorial Content */}
                <div
                  style={{
                    order: isEven ? 2 : 1,
                    padding: "clamp(2rem, 4vw, 3.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--accent-gold)" }}>
                        LOOK {look.lookNumber}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <MapPin size={12} /> {look.location}
                      </span>
                    </div>

                    <h2 className="font-serif" style={{ fontSize: "2.2rem", color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "0.75rem" }}>
                      {look.title}
                    </h2>

                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                      {look.narrative}
                    </p>

                    {/* Styling Notes Checklist */}
                    {look.stylingDetails && look.stylingDetails.length > 0 && (
                      <div style={{ backgroundColor: "var(--bg-primary)", padding: "1.25rem", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
                        <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>
                          Styling Ensemble
                        </strong>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.825rem", color: "var(--text-secondary)" }}>
                          {look.stylingDetails.map((detail, dIdx) => (
                            <li key={dIdx} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ color: "var(--accent-wine)" }}>✦</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Saree Card Connection */}
                  <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <div>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Featured Saree</span>
                        <strong style={{ display: "block", fontSize: "0.95rem", color: "var(--text-primary)" }}>{look.productTitle}</strong>
                      </div>
                      <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(look.productPrice || 0)}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate(`/product/${look.productSlug}`)}
                      className="btn-wine"
                      style={{ width: "100%", padding: "0.9rem" }}
                    >
                      Shop This Drape <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lookbook-row-grid {
            grid-template-columns: 1fr !important;
          }
          .lookbook-row-grid > div {
            order: initial !important;
          }
        }
      `}</style>
    </div>
  );
};
