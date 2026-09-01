import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ProductCard } from "../components/product/ProductCard";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  MessageCircle,
  Sparkles,
} from "lucide-react";

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (href: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
}) => {
  const { publishedProducts } = useData();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useShop();

  const product = publishedProducts.find((p) => p.slug === slug) || publishedProducts[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "craft" | "styling" | "shipping">("details");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Initialize size and color
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImageIndex(0);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Free Size");
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : "Multicolor");
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: "2rem" }}>Product Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          This handcrafted garment may have been archived or is temporarily unlisted.
        </p>
        <button onClick={() => onNavigate("/shop")} className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
          Explore Full Catalog
        </button>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onNavigate("/checkout");
  };

  const checkDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && !isNaN(Number(pincode))) {
      setPincodeStatus("Serviceable: Express courier delivery in 2–4 business days via Blue Dart Express with Free Shipping.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const relatedProducts = publishedProducts
    .filter((p: Product) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hi Evara Vastra! I am interested in "${product.title}" (₹${product.price}). Is this currently available in size ${selectedSize}?`
  );

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem" }}>
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.92)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close Lightbox"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              color: "#FFFFFF",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
            }}
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: "1.5rem",
              color: "#FFFFFF",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={product.images[activeImageIndex]}
            alt={product.title}
            style={{
              maxHeight: "90vh",
              maxWidth: "85vw",
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Next image"
            style={{
              position: "absolute",
              right: "1.5rem",
              color: "#FFFFFF",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <div className="container" style={{ paddingTop: "2rem" }}>
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/shop/${product.category}` },
            { label: product.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Product Hero Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "start",
            marginTop: "1.5rem",
          }}
          className="pdp-layout-grid"
        >
          {/* Gallery Column */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: "1rem",
              alignItems: "start",
            }}
            className="gallery-layout-grid"
          >
            {/* Thumbnails */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                maxHeight: "680px",
                overflowY: "auto",
              }}
              className="gallery-thumbs"
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    aspectRatio: "3/4",
                    width: "100%",
                    overflow: "hidden",
                    border:
                      activeImageIndex === idx
                        ? "2px solid var(--accent-wine)"
                        : "1px solid var(--border-subtle)",
                    opacity: activeImageIndex === idx ? 1 : 0.65,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    backgroundColor: "#FAF7F5",
                    padding: 0,
                    borderRadius: "3px",
                  }}
                >
                  <img src={img} alt="thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>

            {/* Main Stage View */}
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                backgroundColor: "#FAF7F5",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
                borderRadius: "4px",
              }}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <button
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Expand image"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-subtle)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Maximize2 size={16} />
              </button>

              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                {product.discountPercentage ? (
                  <span
                    style={{
                      backgroundColor: "var(--accent-wine)",
                      color: "#FFFFFF",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.6rem",
                      borderRadius: "2px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {product.discountPercentage}% OFF
                  </span>
                ) : null}
                {product.details?.blousePiece && (
                  <span
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "var(--text-primary)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.5rem",
                      borderRadius: "2px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    BLOUSE INCLUDED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Product Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent-wine)",
                    fontWeight: 700,
                  }}
                >
                  SKU: {product.sku || "EV-VAS-100"}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#2E7D32",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Check size={14} /> In Stock • Ready to Dispatch
                </span>
              </div>

              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(1.75rem, 2.6vw, 2.35rem)",
                  lineHeight: 1.2,
                  color: "var(--text-primary)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {product.title}
              </h1>

              {/* Price Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.85rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {formattedPrice}
                </span>
                {formattedComparePrice && (
                  <span
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--text-muted)",
                      textDecoration: "line-through",
                    }}
                  >
                    {formattedComparePrice}
                  </span>
                )}
                {product.discountPercentage ? (
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-wine)" }}>
                    ({product.discountPercentage}% OFF)
                  </span>
                ) : null}
              </div>

              <div
                style={{
                  backgroundColor: "var(--accent-wine-subtle)",
                  border: "1px solid rgba(124, 36, 48, 0.15)",
                  padding: "0.5rem 0.85rem",
                  borderRadius: "3px",
                  marginTop: "0.75rem",
                  fontSize: "0.8rem",
                  color: "var(--accent-wine)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontWeight: 600,
                }}
              >
                <Sparkles size={14} />
                <span>Get 10% Instant Discount on Prepaid UPI & Card Orders!</span>
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Select Size: <span style={{ color: "var(--accent-wine)" }}>{selectedSize}</span>
                  </label>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Standard Indian Fit</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        borderRadius: "3px",
                        border: selectedSize === sz ? "2px solid var(--accent-wine)" : "1px solid var(--border-subtle)",
                        backgroundColor: selectedSize === sz ? "var(--accent-wine-subtle)" : "#FFFFFF",
                        color: selectedSize === sz ? "var(--accent-wine)" : "var(--text-primary)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                  Color Shade: <span style={{ color: "var(--accent-wine)" }}>{selectedColor}</span>
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      style={{
                        padding: "0.4rem 0.85rem",
                        fontSize: "0.8rem",
                        borderRadius: "3px",
                        border: selectedColor === col ? "2px solid var(--accent-wine)" : "1px solid var(--border-subtle)",
                        backgroundColor: selectedColor === col ? "var(--accent-wine-subtle)" : "#FFFFFF",
                        color: selectedColor === col ? "var(--accent-wine)" : "var(--text-primary)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                {/* Quantity */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "3px",
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      padding: "0.75rem 1rem",
                      background: "none",
                      border: "none",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ padding: "0 0.5rem", fontWeight: 600, fontSize: "0.95rem" }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      padding: "0.75rem 1rem",
                      background: "none",
                      border: "none",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: isSaved ? "var(--accent-wine-subtle)" : "#FFFFFF",
                    color: isSaved ? "var(--accent-wine)" : "var(--text-primary)",
                    borderRadius: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Heart size={20} fill={isSaved ? "var(--accent-wine)" : "none"} />
                </button>
              </div>

              {/* Buy Now Primary Button */}
              <button
                onClick={handleBuyNow}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "0.95rem",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Buy Now (Free Express Shipping)
              </button>

              {/* WhatsApp Concierge Inquiry */}
              <a
                href={`https://wa.me/919274344037?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  backgroundColor: "#E8F5E9",
                  color: "#1B5E20",
                  border: "1px solid #C8E6C9",
                  borderRadius: "3px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={17} /> Ask Questions on WhatsApp (+91-92743 44037)
              </a>
            </div>

            {/* Pincode Estimator */}
            <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-surface-subtle)", borderRadius: "4px", border: "1px solid var(--border-subtle)", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 700 }}>
                <Truck size={16} style={{ color: "var(--accent-wine)" }} /> Check Pincode Delivery
              </div>
              <form onSubmit={checkDelivery} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN code..."
                  className="input-field"
                  style={{ flex: 1, backgroundColor: "#FFFFFF" }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: "0 1.25rem", fontSize: "0.8rem" }}>
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p style={{ margin: "0.6rem 0 0 0", fontSize: "0.8rem", color: pincodeStatus.startsWith("Serviceable") ? "#2E7D32" : "#C62828", fontWeight: 600 }}>
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Trust Assurances */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <Truck size={16} style={{ color: "var(--accent-wine)" }} />
                <span>Free Shipping Pan India</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <ShieldCheck size={16} style={{ color: "var(--accent-wine)" }} />
                <span>Cash on Delivery Available</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <RotateCcw size={16} style={{ color: "var(--accent-wine)" }} />
                <span>7-Day Easy Exchange</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <Sparkles size={16} style={{ color: "var(--accent-wine)" }} />
                <span>Surat Craft Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Description Tabs */}
        <div style={{ marginTop: "5rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "2.5rem" }}>
          <div style={{ display: "flex", gap: "2rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "2rem" }}>
            <button
              onClick={() => setActiveTab("details")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: activeTab === "details" ? "var(--accent-wine)" : "var(--text-secondary)",
                borderBottom: activeTab === "details" ? "2px solid var(--accent-wine)" : "2px solid transparent",
                paddingBottom: "0.75rem",
                cursor: "pointer",
              }}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab("craft")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: activeTab === "craft" ? "var(--accent-wine)" : "var(--text-secondary)",
                borderBottom: activeTab === "craft" ? "2px solid var(--accent-wine)" : "2px solid transparent",
                paddingBottom: "0.75rem",
                cursor: "pointer",
              }}
            >
              Fabric & Care
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: activeTab === "shipping" ? "var(--accent-wine)" : "var(--text-secondary)",
                borderBottom: activeTab === "shipping" ? "2px solid var(--accent-wine)" : "2px solid transparent",
                paddingBottom: "0.75rem",
                cursor: "pointer",
              }}
            >
              Delivery & Returns
            </button>
          </div>

          {activeTab === "details" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <div>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "0.75rem" }}>Design & Weave Details</h4>
                <p style={{ lineHeight: 1.6, marginBottom: "1rem" }}>{product.description}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <li><strong>Category:</strong> {product.category.toUpperCase()}</li>
                  <li><strong>Fabric:</strong> {product.fabric}</li>
                  <li><strong>Craft Work:</strong> {product.craft}</li>
                  <li><strong>Primary Color:</strong> {product.color}</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "0.75rem" }}>Package & Sizing</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <li><strong>Package Contains:</strong> {product.details?.packageDetails || "1 Complete Garment Set"}</li>
                  {product.details?.length && <li><strong>Garment Length:</strong> {product.details.length}</li>}
                  {product.details?.blouseDescription && <li><strong>Blouse Fabric:</strong> {product.details.blouseDescription}</li>}
                  <li><strong>Origin:</strong> {product.details?.origin || "Surat, Gujarat"}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "craft" && (
            <div style={{ maxWidth: "700px", lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              <h4 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Wash & Garment Care</h4>
              <p>{product.details?.care || "Dry clean recommended for first wash. Gentle hand wash in cold water with mild detergent. Do not bleach or tumble dry. Iron inside out on moderate heat."}</p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div style={{ maxWidth: "700px", lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              <h4 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Shipping & Exchange Guidelines</h4>
              <p>Free Pan-India delivery via insured Blue Dart Express. Orders are dispatched from Surat within 24–48 hours. 7-day hassle-free size exchange window available.</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "6rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "3rem" }}>
            <h2 className="font-serif" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
              You May Also Like
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2rem" }}>
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
