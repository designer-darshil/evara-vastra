import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight } from "lucide-react";

export const CategoriesSection: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { activeCategories } = useData();

  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "5rem",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
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
              EXPLORE BY WEAVE
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
              The Master Categories
            </h2>
          </div>

          <button
            onClick={() => onNavigate("/shop")}
            className="btn-link"
            style={{ fontSize: "0.825rem", paddingBottom: "0.25rem" }}
          >
            View Complete Catalog ({activeCategories.length} Categories) <ArrowRight size={14} />
          </button>
        </div>

        {/* Asymmetrical Grid of Categories */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {activeCategories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/shop/${cat.slug}`)}
              data-cursor="EXPLORE"
              style={{
                cursor: "pointer",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                boxShadow: "var(--shadow-subtle)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="category-card"
            >
              <div
                style={{
                  aspectRatio: idx % 3 === 0 ? "4/5" : "1/1",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-surface-subtle)",
                  position: "relative",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.35rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {cat.shortDescription}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--accent-wine)",
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
