import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { homepageCMS } = useData();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(90vh - 72px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
        paddingTop: "2.5rem",
        paddingBottom: "4.5rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Narrative Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              zIndex: 2,
            }}
          >
            {/* Season Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent-wine)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Sparkles size={13} /> {homepageCMS.heroBadge || "AUTUMN / WINTER 2026"}
              </span>
              <span style={{ color: "var(--border-medium)" }}>•</span>
              <span
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                }}
              >
                100% PURE SILK MARK
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(2.75rem, 5.2vw, 4.75rem)",
                lineHeight: 1.05,
                color: "var(--text-primary)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {homepageCMS.heroHeading}{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--accent-wine)",
                  fontWeight: 400,
                }}
              >
                {homepageCMS.heroAccentWord}
              </span>
            </h1>

            {/* Editorial Lead Paragraph */}
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1.125rem)",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                maxWidth: "520px",
                fontWeight: 400,
              }}
            >
              {homepageCMS.heroSubheading}
            </p>

            {/* Call To Actions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1.25rem",
                marginTop: "0.5rem",
              }}
            >
              <MagneticButton>
                <button
                  onClick={() => onNavigate(homepageCMS.primaryCtaLink || "/shop")}
                  className="btn-wine"
                  style={{
                    padding: "1rem 2rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>{homepageCMS.primaryCtaText || "Shop The Collection"}</span>
                  <ArrowRight size={16} />
                </button>
              </MagneticButton>

              <button
                onClick={() => onNavigate(homepageCMS.secondaryCtaLink || "/craftsmanship")}
                className="btn-link"
                style={{
                  fontSize: "0.85rem",
                  padding: "0.5rem 0",
                }}
              >
                <span>{homepageCMS.secondaryCtaText || "Explore The Craft"}</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Trust Assurances */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.75rem",
                marginTop: "1.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={16} style={{ color: "var(--accent-gold)" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Pure Silk Mark Certified
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--accent-gold)", fontSize: "0.9rem" }}>✦</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Kadwa Pit Loom Weave
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                aspectRatio: "3/4",
                boxShadow: "var(--shadow-elevated)",
                overflow: "hidden",
                backgroundColor: "#EDE7DD",
              }}
            >
              <img
                src={homepageCMS.heroImage}
                alt="Evara Vastra Saree"
                fetchPriority="high"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Floating Craftsmanship Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  backgroundColor: "rgba(248, 244, 238, 0.95)",
                  backdropFilter: "blur(8px)",
                  padding: "1rem 1.25rem",
                  border: "1px solid rgba(177, 138, 82, 0.3)",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--accent-wine)",
                    display: "block",
                    marginBottom: "0.2rem",
                  }}
                >
                  FEATURED DRAPE
                </span>
                <p
                  className="font-serif"
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--text-primary)",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Raga Katan Silk in Deep Wine
                </p>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    display: "block",
                    marginTop: "0.25rem",
                  }}
                >
                  18 days on handloom • Antique gold Kadwa zari
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
