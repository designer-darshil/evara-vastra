import React from "react";
import { occasions } from "../../data/colors";
import { media } from "../../data/media";
import { ArrowRight } from "lucide-react";

export const OccasionGridSection: React.FC<{
  onNavigate: (href: string) => void;
}> = ({ onNavigate }) => {
  const occasionImages: Record<string, string> = {
    wedding: media.occasions.wedding,
    festive: media.occasions.festive,
    everyday: media.occasions.everyday,
    evening: media.occasions.evening,
    work: media.occasions.work,
    gifting: media.heroSecondary,
  };

  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-gold)",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            OCCASION EDIT
          </span>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}
          >
            Dressed for the Moment
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              maxWidth: "500px",
              margin: "0.5rem auto 0 auto",
            }}
          >
            Whether standing at the wedding altar or entering a morning meeting, find the exact drape tailored to your occasion.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {occasions.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onNavigate(`/shop?occasion=${occ.id}`)}
              style={{
                position: "relative",
                aspectRatio: "16/10",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: "var(--bg-dark)",
              }}
              className="occasion-card"
            >
              <img
                src={occasionImages[occ.id] || media.hero}
                alt={occ.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.85,
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(23,21,19,0.92) 0%, rgba(23,21,19,0.2) 60%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.75rem",
                  color: "#F8F4EE",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--accent-gold)",
                    marginBottom: "0.2rem",
                  }}
                >
                  OCCASION CURATION
                </span>
                <h3
                  className="font-serif"
                  style={{ fontSize: "1.6rem", color: "#F8F4EE", lineHeight: 1.2 }}
                >
                  {occ.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-inverse-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  {occ.tagline}
                </p>

                <div
                  style={{
                    marginTop: "0.85rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                  }}
                >
                  <span>Explore Edits</span>
                  <ArrowRight size={13} style={{ color: "var(--accent-wine)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .occasion-card:hover img {
          transform: scale(1.06);
          opacity: 0.95;
        }
      `}</style>
    </section>
  );
};
