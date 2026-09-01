import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight } from "lucide-react";

export const BrandStorySection: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { homepageCMS } = useData();

  return (
    <section
      style={{
        paddingTop: "6.5rem",
        paddingBottom: "6.5rem",
        backgroundColor: "var(--bg-primary)",
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
          {/* Visual Showcase Left */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                aspectRatio: "4/5",
                backgroundColor: "#EDE7DD",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
              }}
            >
              <img
                src={homepageCMS.manifestoImage}
                alt="Evara Vastra Saree Drape"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Overlapping Loom Inset */}
            <div
              className="desktop-only"
              style={{
                position: "absolute",
                bottom: "-2rem",
                right: "-2rem",
                width: "55%",
                aspectRatio: "1/1",
                backgroundColor: "#EDE7DD",
                border: "6px solid var(--bg-primary)",
                boxShadow: "var(--shadow-elevated)",
                overflow: "hidden",
              }}
            >
              <img
                src={homepageCMS.manifestoLoomImage}
                alt="Master Weaver on Pit Loom"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* Right Narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-wine)",
                display: "block",
              }}
            >
              OUR MANIFESTO
            </span>

            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                lineHeight: 1.15,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              "{homepageCMS.manifestoQuote}"
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {homepageCMS.manifestoNarrative1}
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {homepageCMS.manifestoNarrative2}
            </p>

            <div style={{ paddingTop: "0.75rem" }}>
              <button
                onClick={() => onNavigate("/about")}
                className="btn-wine"
                style={{ padding: "0.9rem 1.75rem", fontSize: "0.825rem" }}
              >
                Read The Atelier Story <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .brand-story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
