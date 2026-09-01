import React from "react";
import { collections, Collection } from "../data/collections";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight, Sparkles } from "lucide-react";

export const CollectionsListPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Collections" }]} onNavigate={onNavigate} />

        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 4rem auto" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              marginBottom: "0.4rem",
            }}
          >
            <Sparkles size={14} /> SIGNATURE CURATIONS
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", color: "var(--text-primary)" }}>
            The Atelier Collections
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Each collection represents a curated exploration into a distinct Indian weaving tradition, reimagined with contemporary restraint.
          </p>
        </div>

        {/* Collections Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {collections.map((col: Collection, idx: number) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={col.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  display: "grid",
                  gridTemplateColumns: isEven ? "1.2fr 0.8fr" : "0.8fr 1.2fr",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-subtle)",
                }}
                className="collection-row-grid"
              >
                {/* Visual */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    aspectRatio: "16/10",
                    overflow: "hidden",
                    backgroundColor: "#EDE7DD",
                  }}
                >
                  <img
                    src={col.heroImage}
                    alt={col.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s ease",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    order: isEven ? 2 : 1,
                    padding: "clamp(2rem, 4vw, 3.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent-gold)",
                    }}
                  >
                    COLLECTION • 0{idx + 1} / {col.season}
                  </span>

                  <h2 className="font-serif" style={{ fontSize: "2.2rem", color: "var(--text-primary)", lineHeight: 1.15 }}>
                    {col.title}
                  </h2>

                  <p className="font-serif" style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--accent-wine)" }}>
                    "{col.editorialStatement}"
                  </p>

                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {col.story}
                  </p>

                  <div style={{ marginTop: "1rem" }}>
                    <button
                      onClick={() => onNavigate(`/collections/${col.slug}`)}
                      className="btn-wine"
                    >
                      Explore Collection <ArrowRight size={15} />
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
          .collection-row-grid {
            grid-template-columns: 1fr !important;
          }
          .collection-row-grid > div {
            order: initial !important;
          }
        }
      `}</style>
    </div>
  );
};
