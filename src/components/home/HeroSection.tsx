import React from "react";
import { media } from "../../data/media";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";

export const HeroSection: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(90vh - 80px)",
        display: "flex",
        alignItems: "center",
        paddingTop: "2rem",
        paddingBottom: "4rem",
        backgroundColor: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Editorial Copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              zIndex: 2,
            }}
          >
            {/* Metadata Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1.5rem",
                width: "fit-content",
              }}
            >
              <span className="badge-tag badge-tag-wine">
                AUTUMN / WINTER 2026
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                }}
              >
                HANDWOVEN IN INDIA
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif"
              style={{
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
                letterSpacing: "-0.015em",
                lineHeight: 1.05,
              }}
            >
              Draped in <br />
              <span style={{ fontStyle: "italic", color: "var(--accent-wine)" }}>
                Heritage.
              </span>{" "}
              Crafted <br />
              for Today.
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                color: "var(--text-secondary)",
                maxWidth: "480px",
                lineHeight: 1.6,
                marginBottom: "2.5rem",
              }}
            >
              Modern sarees born of generational Indian looms. Pure katan silks,
              tested gold zari, and featherweight organzas tailored for contemporary elegance.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              <MagneticButton
                onClick={() => onNavigate("/shop")}
                className="btn-wine"
              >
                Shop The Collection <ArrowRight size={15} />
              </MagneticButton>

              <button
                onClick={() => onNavigate("/craftsmanship")}
                className="btn-secondary"
              >
                Explore The Craft
              </button>
            </div>

            {/* Micro Specs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2.5rem",
                marginTop: "3.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    display: "block",
                  }}
                >
                  Pure Silk Certified
                </span>
                <strong
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  Silk Mark Guaranteed
                </strong>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    display: "block",
                  }}
                >
                  Handloom Origin
                </span>
                <strong
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  Varanasi & Chanderi
                </strong>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Main Visual Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "520px",
                aspectRatio: "3/4",
                boxShadow: "var(--shadow-elevated)",
                backgroundColor: "#EDE7DD",
                overflow: "hidden",
              }}
            >
              <img
                src={media.hero}
                alt="Contemporary Indian Saree Drape"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />

              {/* Floating Product Tag */}
              <div
                onClick={() => onNavigate("/product/raga-silk-saree")}
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  backgroundColor: "rgba(23, 21, 19, 0.88)",
                  backdropFilter: "blur(10px)",
                  padding: "1rem 1.25rem",
                  color: "#F8F4EE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  border: "1px solid rgba(248, 244, 238, 0.15)",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(124, 36, 48, 0.95)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(23, 21, 19, 0.88)")
                }
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--accent-gold)",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    FEATURED DRAPE • 01
                  </span>
                  <strong
                    className="font-serif"
                    style={{ fontSize: "1.1rem", fontWeight: 400 }}
                  >
                    Raga Katan Silk in Deep Wine
                  </strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₹14,800</span>
                  <ArrowRight size={15} style={{ color: "var(--accent-gold)" }} />
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Border */}
            <div
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "100%",
                maxWidth: "520px",
                height: "100%",
                border: "1px solid var(--accent-gold)",
                opacity: 0.35,
                pointerEvents: "none",
                zIndex: 0,
              }}
              className="desktop-only"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
