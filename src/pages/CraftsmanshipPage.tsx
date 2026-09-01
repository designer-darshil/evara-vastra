import React from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight } from "lucide-react";

export const CraftsmanshipPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { craftsmanshipCMS } = useData();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Artisanal Craftsmanship" }]} onNavigate={onNavigate} />

        {/* Hero */}
        <div style={{ maxWidth: "780px", margin: "1rem 0 4.5rem 0" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            THE LIVING TRADITION
          </span>
          <h1
            className="font-serif"
            style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", color: "var(--text-primary)", lineHeight: 1.08 }}
          >
            {craftsmanshipCMS.heroHeading}
          </h1>
          <p style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--accent-gold)", marginTop: "0.5rem" }}>
            {craftsmanshipCMS.heroSubhead}
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.75rem", lineHeight: 1.6 }}>
            {craftsmanshipCMS.introNarrative}
          </p>
        </div>

        {/* 4 Craft Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
          {craftsmanshipCMS.steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.step}
                style={{
                  display: "grid",
                  gridTemplateColumns: isEven ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
                  gap: "clamp(2rem, 5vw, 5rem)",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  padding: "clamp(1.5rem, 3.5vw, 3rem)",
                  border: "1px solid var(--border-subtle)",
                }}
                className="craft-step-grid"
              >
                <div style={{ order: isEven ? 1 : 2 }}>
                  <span
                    className="font-serif"
                    style={{
                      fontSize: "2.5rem",
                      color: "var(--accent-gold)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    STEP / {step.step}
                  </span>
                  <h3 className="font-serif" style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>

                <div
                  style={{
                    order: isEven ? 2 : 1,
                    aspectRatio: "16/11",
                    overflow: "hidden",
                    backgroundColor: "#EDE7DD",
                  }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "6rem",
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "var(--bg-dark)",
            color: "var(--text-inverse)",
          }}
        >
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 600 }}>
            EXPLORE THE WEAVES
          </span>
          <h3 className="font-serif" style={{ fontSize: "2.4rem", color: "#F8F4EE", margin: "0.5rem 0 1rem 0" }}>
            Experience Master Handloom Drape
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-inverse-muted)", maxWidth: "480px", margin: "0 auto 2rem auto" }}>
            Each piece arrives with an Artisan Certificate of Provenance and Silk Mark authentication.
          </p>
          <button onClick={() => onNavigate("/shop")} className="btn-wine">
            Shop Handloom Sarees <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .craft-step-grid {
            grid-template-columns: 1fr !important;
          }
          .craft-step-grid > div {
            order: initial !important;
          }
        }
      `}</style>
    </div>
  );
};
