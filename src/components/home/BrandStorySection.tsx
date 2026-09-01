import React from "react";
import { media } from "../../data/media";
import { ArrowRight } from "lucide-react";

export const BrandStorySection: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <section
      style={{
        paddingTop: "7rem",
        paddingBottom: "7rem",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 6vw, 6rem)",
            alignItems: "center",
          }}
          className="brand-story-grid"
        >
          {/* Left Dual Visual Composition */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "85%",
                aspectRatio: "4/5",
                backgroundColor: "#EDE7DD",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
              }}
            >
              <img
                src={media.brandStory}
                alt="Artisanal Saree Drape"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Overlapping Loom Detail Shot */}
            <div
              style={{
                position: "absolute",
                bottom: "-10%",
                right: "0",
                width: "55%",
                aspectRatio: "1/1",
                backgroundColor: "var(--bg-dark)",
                border: "6px solid var(--bg-primary)",
                boxShadow: "var(--shadow-elevated)",
                overflow: "hidden",
              }}
            >
              <img
                src={media.craftLoom}
                alt="Silk Looms in Varanasi"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Editorial Story */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-wine)",
              }}
            >
              THE PHILOSOPHY
            </span>

            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                lineHeight: 1.15,
                color: "var(--text-primary)",
              }}
            >
              "Some pieces are made to be worn once. Others become part of a family story."
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              At EVARA, we believe a saree is not just six yards of fabric; it is an enduring repository of craft, patience, and human touch. Each warp and weft is counted by hand, spun from unadulterated natural yarns, and hand-locked by generational master weavers in Varanasi, Chanderi, and Bengal.
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              We strip away synthetic fast-fashion shortcuts to create quiet, commanding silhouettes that feel weightless today and remain timeless thirty years from now.
            </p>

            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={() => onNavigate("/about")}
                className="btn-primary"
              >
                Read Our Story & Atelier Roots <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .brand-story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
