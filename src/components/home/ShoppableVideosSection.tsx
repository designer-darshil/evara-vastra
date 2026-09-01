import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { Play, X, ShoppingBag, ArrowRight } from "lucide-react";
import { ShoppableVideo } from "../../types";

export const ShoppableVideosSection: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { publishedVideos } = useData();
  const [activeVideo, setActiveVideo] = useState<ShoppableVideo | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeVideo) {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  if (publishedVideos.length === 0) return null;

  return (
    <section style={{ padding: "4.5rem 0", backgroundColor: "var(--bg-surface-subtle)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            REAL DRAPES & DETAILS
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--text-primary)", margin: "0 0 0.75rem 0" }}>
            Shoppable Videos
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0 }}>
            Watch the fabric drape, embroidery sheen, and fit in motion before you decide.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {publishedVideos.map((video) => (
            <div
              key={video.id}
              style={{
                position: "relative",
                aspectRatio: "9/16",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "var(--shadow-subtle)",
                backgroundColor: "var(--bg-dark-surface)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="video-card-hover"
              onClick={() => setActiveVideo(video)}
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.9)",
                  transition: "transform 0.4s ease",
                }}
              />

              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
                }}
              />

              {/* Play Icon Pulse */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "54px",
                  height: "54px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "var(--accent-wine)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
              >
                <Play size={22} style={{ marginLeft: "3px", fill: "var(--accent-wine)" }} />
              </div>

              {/* Bottom Details */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.25rem",
                  color: "#FFFFFF",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.5rem",
                    backgroundColor: "rgba(124, 36, 48, 0.85)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    marginBottom: "0.4rem",
                  }}
                >
                  Featured Look
                </span>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    margin: "0 0 0.5rem 0",
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {video.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "0.5rem",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>
                    ₹{video.productPrice.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/product/${video.productSlug}`);
                    }}
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "var(--accent-wine)",
                      border: "none",
                      padding: "0.35rem 0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      cursor: "pointer",
                    }}
                  >
                    Shop <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "420px",
              aspectRatio: "9/16",
              backgroundColor: "#000",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            {/* Video preview / player */}
            <img
              src={activeVideo.thumbnailUrl}
              alt={activeVideo.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Modal Product Footer */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.5rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)",
                color: "#FFFFFF",
              }}
            >
              <p style={{ fontSize: "0.8rem", color: "var(--accent-gold)", margin: "0 0 0.25rem 0", fontWeight: 600 }}>
                AUTHENTIC PRODUCT
              </p>
              <h4 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem 0", lineHeight: 1.3 }}>{activeVideo.productTitle}</h4>
              <p style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem 0" }}>
                ₹{activeVideo.productPrice.toLocaleString("en-IN")}
              </p>
              <button
                onClick={() => {
                  setActiveVideo(null);
                  onNavigate(`/product/${activeVideo.productSlug}`);
                }}
                className="btn btn-primary"
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                <ShoppingBag size={18} /> View Product Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
