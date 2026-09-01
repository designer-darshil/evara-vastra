import React from "react";
import { media } from "../data/media";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight } from "lucide-react";

export const CraftsmanshipPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const craftSteps = [
    {
      step: "01",
      title: "Hand-Spun Yarn Selection & Reeling",
      description: "High-twist mulberry silk and wild tussar filaments are degummed and spun by hand onto wooden charkhas, preserving their organic tactile variations.",
      image: media.craftLoom,
    },
    {
      step: "02",
      title: "The Kadwa Pit Loom Technique",
      description: "Unlike Jacquard powerlooms where threads float loosely across the back, Kadwa requires the weaver to engrave and lock each motif with a tiny wooden shuttle. The back is as smooth as the front.",
      image: media.craftHero,
    },
    {
      step: "03",
      title: "Tested Antique Gold & Silver Zari",
      description: "Our metallic threads are formulated from electroplated tested alloys, providing a warm, candlelit antique glow rather than harsh synthetic glitter.",
      image: media.craftDetail,
    },
    {
      step: "04",
      title: "Finishing, Tasseling & Cotton Packaging",
      description: "Every saree is hand-finished with knotted silk tassels along the pallu and placed inside our breathable unbleached cotton keepsake pouch.",
      image: media.packaging,
    },
  ];

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
            The Hand Behind The Loom.
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.75rem", lineHeight: 1.6 }}>
            In an era of rapid mechanical reproduction, we honor the deliberate patience of the human hand. It takes between 14 to 28 days of uninterrupted loom work to bring a single EVARA Banarasi saree to life.
          </p>
        </div>

        {/* 4 Craft Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
          {craftSteps.map((step, idx) => {
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
            Each piece arrives with an Artisan Certificate of Lineage and Silk Mark authentication.
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
