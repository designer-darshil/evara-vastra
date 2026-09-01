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
        animationDelay: `${(index % 8) * 0.08}s`,
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
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
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
              transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        )}

        {/* Badges */}
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
          {isOutOfStock ? (
            <span className="badge-tag" style={{ backgroundColor: "#171513", color: "#FFFFFF" }}>
              SOLD OUT
            </span>
          ) : isLowStock ? (
            <span className="badge-tag badge-tag-wine">
              ONLY {product.inventoryCount} LEFT
            </span>
          ) : product.bestseller ? (
            <span className="badge-tag badge-tag-wine">BESTSELLER</span>
          ) : product.newArrival ? (
            <span className="badge-tag">NEW SEASON</span>
          ) : (
            <span className="badge-tag">{product.craft.split(" ")[0]}</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          className="wishlist-btn"
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            zIndex: 3,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(248, 244, 238, 0.9)",
            backdropFilter: "blur(4px)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isSaved ? "var(--accent-wine)" : "var(--text-primary)",
            transition: "transform 0.2s ease, background-color 0.2s ease",
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
              padding: "0.75rem",
              display: "flex",
              gap: "0.5rem",
              zIndex: 3,
              transform: "translateY(100%)",
              transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <button
              onClick={handleQuickAdd}
              className="btn-primary"
              style={{
                flex: 1,
                padding: "0.6rem 0.75rem",
                fontSize: "0.72rem",
                justifyContent: "center",
                backgroundColor: "var(--accent-wine)",
                color: "#FFFFFF",
                borderColor: "var(--accent-wine)",
              }}
            >
              <ShoppingBag size={14} /> Quick Add
            </button>
            <button
              onClick={handleQuickViewClick}
              className="btn-secondary"
              title="Quick Preview"
              style={{
                padding: "0.6rem 0.75rem",
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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent-gold)",
          }}
        >
          {product.fabric} • {product.color}
        </span>

        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            lineHeight: 1.35,
            transition: "color 0.2s ease",
            margin: 0,
          }}
        >
          {product.title}
        </h3>

        {/* Pricing */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.2rem" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
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
      </div>
    </article>
  );
};
