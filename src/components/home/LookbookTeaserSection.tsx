import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight, MapPin } from "lucide-react";

export const LookbookTeaserSection: React.FC<{
  onNavigate: (href: string) => void;
}> = ({ onNavigate }) => {
  const { publishedLookbookItems } = useData();

  const previewLooks = publishedLookbookItems.slice(0, 3);

  return (
    <section
      style={{
        paddingTop: "6.5rem",
        paddingBottom: "6.5rem",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "1.25rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-wine)",
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              EDITORIAL ANTHOLOGY
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--text-primary)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              The Season's Lookbook
            </h2>
          </div>

          <button
            onClick={() => onNavigate("/lookbook")}
            className="btn-link"
            style={{ fontSize: "0.825rem", paddingBottom: "0.25rem" }}
          >
            Explore Complete Campaign ({publishedLookbookItems.length} Looks) <ArrowRight size={14} />
          </button>
        </div>

        {/* 3-Column Editorial Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {previewLooks.map((look) => (
            <div
              key={look.id}
              onClick={() => onNavigate(`/products/${look.productSlug}`)}
              data-cursor="VIEW LOOK"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                boxShadow: "var(--shadow-subtle)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-surface-subtle)",
                  position: "relative",
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
                    transition: "transform 0.8s ease",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    left: "0.75rem",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    backgroundColor: "rgba(23, 21, 19, 0.85)",
                    color: "#FFFFFF",
                    padding: "0.25rem 0.55rem",
                  }}
                >
                  LOOK {look.lookNumber}
                </span>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <MapPin size={11} />
                    <span>{look.location}</span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {look.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.825rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {look.narrative}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "1.25rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>{look.productFabric}</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "var(--accent-wine)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    Shop Drape <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
