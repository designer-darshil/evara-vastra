import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";

export const QuickViewModal: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    if (quickViewProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(quickViewProduct.price);

  const handleFullView = () => {
    closeQuickView();
    onNavigate(`/product/${quickViewProduct.slug}`);
  };

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    closeQuickView();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 21, 19, 0.7)",
        backdropFilter: "blur(6px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease-out forwards",
      }}
      onClick={closeQuickView}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          maxWidth: "880px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-elevated)",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close quick view"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(248, 244, 238, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            zIndex: 10,
          }}
        >
          <X size={18} />
        </button>

        {/* Product Gallery Left */}
        <div
          style={{
            backgroundColor: "var(--bg-primary)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              aspectRatio: "3/4",
              overflow: "hidden",
              backgroundColor: "#EDE7DD",
            }}
          >
            <img
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: "56px",
                    height: "72px",
                    border:
                      activeImageIndex === idx
                        ? "2px solid var(--accent-wine)"
                        : "1px solid var(--border-medium)",
                    overflow: "hidden",
                    opacity: activeImageIndex === idx ? 1 : 0.6,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Right */}
        <div
          style={{
            padding: "2rem",
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
                marginBottom: "0.4rem",
              }}
            >
              <span className="badge-tag">{quickViewProduct.craft}</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {quickViewProduct.code}
              </span>
            </div>

            <h3
              className="font-serif"
              style={{
                fontSize: "1.65rem",
                lineHeight: 1.2,
                color: "var(--text-primary)",
              }}
            >
              {quickViewProduct.title}
            </h3>

            <div
              style={{
                fontSize: "1.35rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: "0.75rem 0",
              }}
            >
              {formattedPrice}
            </div>

            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.5,
                color: "var(--text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              {quickViewProduct.shortDescription}
            </p>

            {/* Quick Specs */}
            <div
              style={{
                backgroundColor: "var(--bg-primary)",
                padding: "0.85rem 1rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem",
                fontSize: "0.78rem",
                marginBottom: "1.5rem",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>
                  Fabric
                </span>
                <strong>{quickViewProduct.fabric}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>
                  Origin
                </span>
                <strong>{quickViewProduct.details.origin}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>
                  Length
                </span>
                <strong>{quickViewProduct.details.length}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>
                  Blouse Piece
                </span>
                <strong style={{ color: "var(--accent-gold)" }}>
                  {quickViewProduct.details.blousePiece ? "Included" : "Not Included"}
                </strong>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleAdd}
                className="btn-wine"
                style={{ flex: 1, padding: "0.85rem" }}
              >
                <ShoppingBag size={16} /> Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                aria-label="Save to Wishlist"
                style={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid var(--border-medium)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isSaved ? "var(--accent-wine)" : "var(--text-primary)",
                }}
              >
                <Heart size={18} fill={isSaved ? "var(--accent-wine)" : "none"} />
              </button>
            </div>

            <button
              onClick={handleFullView}
              className="btn-link"
              style={{
                alignSelf: "center",
                marginTop: "0.5rem",
                fontSize: "0.78rem",
              }}
            >
              View Full Product Details & Styling Notes <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
