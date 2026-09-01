import React from "react";
import { categories } from "../../data/categories";
import { ArrowRight } from "lucide-react";

export const CategoriesSection: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            gap: "1.5rem",
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
                marginBottom: "0.4rem",
              }}
            >
              SHOP BY CRAFT & FIBER
            </span>
            <h2
              className="font-serif"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}
            >
              Curated Weaves & Textures
            </h2>
          </div>

          <button
            onClick={() => onNavigate("/shop")}
            className="btn-link"
          >
            View All Sarees <ArrowRight size={14} />
          </button>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {categories.slice(0, 6).map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/shop/${cat.slug}`)}
              style={{
                cursor: "pointer",
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                e.currentTarget.style.borderColor = "var(--border-medium)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              <div
                style={{
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  backgroundColor: "#EDE7DD",
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
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--accent-gold)",
                      }}
                    >
                      CATEGORY / 0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {cat.itemCount} Designs
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.45rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {cat.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {cat.shortDescription}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-primary)",
                  }}
                >
                  <span>Explore Edit</span>
                  <ArrowRight size={13} style={{ color: "var(--accent-wine)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
