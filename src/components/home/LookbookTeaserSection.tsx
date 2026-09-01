import React from "react";
import { lookbookItems } from "../../data/lookbook";
import { ArrowRight, Sparkles } from "lucide-react";

export const LookbookTeaserSection: React.FC<{
  onNavigate: (href: string) => void;
}> = ({ onNavigate }) => {
  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        backgroundColor: "var(--bg-dark)",
        color: "var(--text-inverse)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3.5rem",
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
                color: "var(--accent-gold)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "0.4rem",
              }}
            >
              <Sparkles size={13} /> EDITORIAL CAMPAIGN
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#F8F4EE",
              }}
            >
              The Season's Lookbook
            </h2>
          </div>

          <button
            onClick={() => onNavigate("/lookbook")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F8F4EE",
              borderBottom: "1px solid #F8F4EE",
              paddingBottom: "2px",
            }}
          >
            View Complete Lookbook <ArrowRight size={14} />
          </button>
        </div>

        {/* Carousel / Grid of 3 Looks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {lookbookItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(`/product/${item.productSlug}`)}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
              className="lookbook-teaser-card"
            >
              <div
                style={{
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  backgroundColor: "rgba(248, 244, 238, 0.05)",
                  position: "relative",
                  marginBottom: "1.25rem",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(23, 21, 19, 0.8)",
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--accent-gold)",
                  }}
                >
                  LOOK {item.lookNumber}
                </div>
              </div>

              <div>
                <h4
                  className="font-serif"
                  style={{ fontSize: "1.35rem", color: "#F8F4EE", marginBottom: "0.3rem" }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-inverse-muted)",
                    lineHeight: 1.5,
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.narrative}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent-gold)",
                  }}
                >
                  <span>Shop This Drape ({new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(item.productPrice)})</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lookbook-teaser-card:hover img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
};
