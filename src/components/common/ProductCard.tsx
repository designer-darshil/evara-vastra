import React from "react";
import { Product } from "../../types";
import { useShop } from "../../context/ShopContext";
import { Heart, ShoppingBag, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
  onNavigate: (href: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onNavigate,
}) => {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useShop();

  const isSaved = isInWishlist(product.id);

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

  const handleCardClick = () => {
    onNavigate(`/product/${product.slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isLowStock = product.inventoryCount <= 3 && product.inventoryCount > 0;
  const isOutOfStock = !product.inStock || product.inventoryCount <= 0;

  return (
    <article
      className="product-card group"
      onClick={handleCardClick}
      data-cursor="VIEW"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        animationDelay: `${(index % 8) * 0.06}s`,
      }}
    >
      {/* Visual Image Container */}
      <div
        className="product-image-container"
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          backgroundColor: "#EDE7DD",
          marginBottom: "0.85rem",
          borderRadius: "2px",
        }}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="product-primary-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          }}
        />

        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} detail`}
            loading="lazy"
            className="product-secondary-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0,
              transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        )}

        {/* Badges */}
        <div
          style={{
            position: "absolute",
            top: "0.6rem",
            left: "0.6rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            zIndex: 2,
          }}
        >
          {isOutOfStock ? (
            <span className="badge-tag" style={{ backgroundColor: "#171513", color: "#FFFFFF", fontSize: "0.65rem", padding: "0.2rem 0.45rem" }}>
              SOLD OUT
            </span>
          ) : isLowStock ? (
            <span className="badge-tag badge-tag-wine" style={{ fontSize: "0.65rem", padding: "0.2rem 0.45rem" }}>
              ONLY {product.inventoryCount} LEFT
            </span>
          ) : product.bestseller ? (
            <span className="badge-tag badge-tag-wine" style={{ fontSize: "0.65rem", padding: "0.2rem 0.45rem" }}>
              BESTSELLER
            </span>
          ) : product.newArrival ? (
            <span className="badge-tag" style={{ fontSize: "0.65rem", padding: "0.2rem 0.45rem" }}>
              NEW SEASON
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isSaved ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          className="wishlist-btn"
          style={{
            position: "absolute",
            top: "0.6rem",
            right: "0.6rem",
            zIndex: 3,
            width: "38px",
            height: "38px",
            minWidth: "38px",
            minHeight: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isSaved ? "var(--accent-wine)" : "var(--text-primary)",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Heart size={16} fill={isSaved ? "var(--accent-wine)" : "none"} strokeWidth={1.75} />
        </button>

        {/* Hover Quick Action Drawer */}
        {!isOutOfStock && (
          <div
            className="product-actions-overlay"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0.6rem",
              display: "flex",
              gap: "0.4rem",
              zIndex: 3,
              transform: "translateY(100%)",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.title} to bag`}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: "0.55rem 0.6rem",
                fontSize: "0.75rem",
                justifyContent: "center",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <ShoppingBag size={14} /> Quick Add
            </button>
            <button
              onClick={handleQuickViewClick}
              aria-label={`Quick view ${product.title}`}
              className="btn btn-secondary"
              title="Quick Preview"
              style={{
                padding: "0.55rem 0.65rem",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Eye size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Product Metadata Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent-gold)",
          }}
        >
          {product.fabric} • {product.color}
        </span>

        {/* 2-line clamped title for uniform grid alignment */}
        <h3
          style={{
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            lineHeight: 1.35,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.45rem",
          }}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price & Discount Hierarchy */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.2rem" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
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
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#2E7D32",
                backgroundColor: "#E8F5E9",
                padding: "0.1rem 0.35rem",
                borderRadius: "2px",
                lineHeight: 1.2,
              }}
            >
              {product.discountPercentage}% OFF
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};
