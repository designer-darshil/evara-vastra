import React from "react";
import { Product } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import { Heart, Eye, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onNavigate: (href: string) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  index,
}) => {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    openQuickView,
    setCursorLabel,
  } = useShop();

  const isSaved = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedComparePrice = product.compareAtPrice
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(product.compareAtPrice)
    : null;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setCursorLabel("VIEW")}
      onMouseLeave={() => setCursorLabel(null)}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Wrap */}
      <div
        className="product-image-container"
        onClick={() => onNavigate(`/product/${product.slug}`)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <img
          src={secondaryImage}
          alt={`${product.title} detail`}
          className="product-image-secondary"
          loading="lazy"
        />

        {/* Top Badges */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            zIndex: 2,
          }}
        >
          {product.newArrival && (
            <span className="badge-tag badge-tag-wine">NEW ARRIVAL</span>
          )}
          {product.bestseller && (
            <span className="badge-tag badge-tag-gold">BESTSELLER</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isSaved ? "var(--accent-wine)" : "var(--text-primary)",
            zIndex: 3,
            transition: "transform 0.2s ease, background-color 0.2s ease",
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Heart
            size={18}
            fill={isSaved ? "var(--accent-wine)" : "none"}
            strokeWidth={1.8}
          />
        </button>

        {/* Quick Actions Hover Bar (Desktop) */}
        <div
          className="product-quick-actions"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            backgroundColor: "rgba(23, 21, 19, 0.9)",
            backdropFilter: "blur(8px)",
            padding: "0.6rem",
            gap: "0.5rem",
            transform: "translateY(100%)",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 3,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => openQuickView(product)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F8F4EE",
              padding: "0.5rem",
              border: "1px solid rgba(248, 244, 238, 0.2)",
            }}
          >
            <Eye size={14} /> Quick View
          </button>
          <button
            onClick={() => addToCart(product, 1)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor: "var(--accent-wine)",
              color: "#ffffff",
              padding: "0.5rem",
              border: "1px solid var(--accent-wine)",
            }}
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div
        style={{
          paddingTop: "0.85rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          <span>{product.craft}</span>
          {index !== undefined && <span>0{index + 1}</span>}
        </div>

        <h4
          onClick={() => onNavigate(`/product/${product.slug}`)}
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            cursor: "pointer",
            lineHeight: 1.35,
            fontFamily: "var(--font-sans)",
            marginTop: "0.1rem",
          }}
        >
          {product.title}
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "0.2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {formattedPrice}
            </span>
            {formattedComparePrice && (
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  textDecoration: "line-through",
                }}
              >
                {formattedComparePrice}
              </span>
            )}
          </div>

          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              fontStyle: "italic",
            }}
          >
            {product.fabric}
          </span>
        </div>
      </div>

      <style>{`
        .product-card:hover .product-quick-actions {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};
