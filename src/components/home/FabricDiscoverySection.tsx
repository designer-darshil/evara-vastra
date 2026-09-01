import React, { useState } from "react";
import { fabrics } from "../../data/fabrics";
import { ArrowRight } from "lucide-react";

export const FabricDiscoverySection: React.FC<{
  onNavigate: (href: string) => void;
}> = ({ onNavigate }) => {
  const [selectedFabricId, setSelectedFabricId] = useState(fabrics[0].id);
  const activeFabric = fabrics.find((f) => f.id === selectedFabricId) || fabrics[0];

  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        backgroundColor: "var(--bg-surface-subtle)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
            MATERIAL INTELLIGENCE
          </span>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}
          >
            Understanding Our Fabrics
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0.5rem auto 0 auto",
            }}
          >
            Every yarn tells a tactile story. Discover the drape, weight, and care instructions behind each signature fiber.
          </p>
        </div>

        {/* Fabric Pill Selector */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.6rem",
            marginBottom: "3rem",
          }}
        >
          {fabrics.map((fabric) => {
            const isSelected = fabric.id === selectedFabricId;
            return (
              <button
                key={fabric.id}
                onClick={() => setSelectedFabricId(fabric.id)}
                style={{
                  padding: "0.65rem 1.25rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: isSelected ? "var(--accent-wine)" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                  border: isSelected
                    ? "1px solid var(--accent-wine)"
                    : "1px solid var(--border-medium)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {fabric.name.split(" ")[0]} {fabric.name.includes("Silk") && !fabric.name.startsWith("Silk") ? "Silk" : ""}
              </button>
            );
          })}
        </div>

        {/* Active Fabric Showcase Card */}
        <div
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-medium)",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            overflow: "hidden",
          }}
          className="fabric-card-grid"
        >
          {/* Fabric Image Swatch */}
          <div
            style={{
              aspectRatio: "4/3",
              backgroundColor: "var(--bg-surface-subtle)",
              overflow: "hidden",
            }}
          >
            <img
              src={activeFabric.image}
              alt={activeFabric.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Fabric Specs Breakdown */}
          <div
            style={{
              padding: "clamp(1.5rem, 4vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span className="badge-tag badge-tag-gold">NATURAL FIBER SPEC</span>
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "2rem",
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}
              >
                {activeFabric.name}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                  fontSize: "0.85rem",
                  marginBottom: "1.5rem",
                }}
                className="fabric-specs-grid"
              >
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Tactile Feel & Weight
                  </strong>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {activeFabric.feel}
                  </p>
                </div>

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Visual Luster & Appearance
                  </strong>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {activeFabric.appearance}
                  </p>
                </div>

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Ideal Occasion
                  </strong>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {activeFabric.typicalUse}
                  </p>
                </div>

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Preservation & Care
                  </strong>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {activeFabric.care}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
              <button
                onClick={() => onNavigate(`/shop?fabric=${activeFabric.id}`)}
                className="btn-wine"
              >
                Shop All {activeFabric.name.split(" ")[0]} Sarees <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .fabric-card-grid {
            grid-template-columns: 1fr !important;
          }
          .fabric-specs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
