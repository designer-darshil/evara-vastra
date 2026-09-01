import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ProductCard } from "../components/common/ProductCard";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
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
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "craft" | "styling" | "care" | "shipping">("details");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImageIndex(0);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: "2rem" }}>Saree Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          This handcrafted drape may have been archived or is temporarily unlisted.
        </p>
        <button onClick={() => onNavigate("/shop")} className="btn-wine" style={{ marginTop: "1.5rem" }}>
          Explore Saree Catalog
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

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onNavigate("/checkout");
  };

  const checkDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && !isNaN(Number(pincode))) {
      setPincodeStatus("Serviceable: Express delivery in 2–3 business days via DHL/Bluedart.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  // Related products from same category or collection
  const relatedProducts = publishedProducts
    .filter((p: Product) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 3);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem" }}>
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23,21,19,0.95)",
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
              color: "#F8F4EE",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              color: "#F8F4EE",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              color: "#F8F4EE",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <div className="container" style={{ paddingTop: "2.5rem" }}>
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
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(2rem, 5vw, 5rem)",
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
                        : "1px solid var(--border-medium)",
                    opacity: activeImageIndex === idx ? 1 : 0.65,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    backgroundColor: "#EDE7DD",
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
                backgroundColor: "#EDE7DD",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
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
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <Maximize2 size={17} />
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
                <span className="badge-tag badge-tag-wine">{product.craft}</span>
                {product.details.blousePiece && (
                  <span className="badge-tag badge-tag-gold">BLOUSE INCLUDED</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Product Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent-gold)",
                    fontWeight: 600,
                  }}
                >
                  CODE: {product.code}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#234E3E",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Check size={14} /> Ready to Ship
                </span>
              </div>

              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                  lineHeight: 1.15,
                  color: "var(--text-primary)",
                }}
              >
                {product.title}
              </h1>

              {/* Price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.85rem",
                  marginTop: "0.85rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.85rem",
                    fontWeight: 600,
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
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginLeft: "0.25rem",
                  }}
                >
                  (Inclusive of all taxes & insurance)
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
              }}
            >
              {product.description}
            </p>

            {/* Quick Specs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
                backgroundColor: "#FFFFFF",
                padding: "1rem 1.25rem",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.8rem",
              }}
            >
              <div>
                <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem", textTransform: "uppercase" }}>
                  Primary Fabric
                </span>
                <strong>{product.fabric}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem", textTransform: "uppercase" }}>
                  Origin & Cluster
                </span>
                <strong>{product.details.origin}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem", textTransform: "uppercase" }}>
                  Saree Length
                </span>
                <strong>{product.details.length} + {product.details.blouseLength} Blouse</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem", textTransform: "uppercase" }}>
                  Craft Lineage
                </span>
                <strong>{product.details.craftTime}</strong>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    style={{ padding: "0.85rem 1rem", fontSize: "1rem" }}
                  >
                    -
                  </button>
                  <span style={{ padding: "0 0.75rem", fontWeight: 600, fontSize: "0.9rem" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    style={{ padding: "0.85rem 1rem", fontSize: "1rem" }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="btn-wine"
                  style={{ flex: 1, padding: "1rem" }}
                >
                  <ShoppingBag size={17} /> Add to Shopping Bag
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle Wishlist"
                  style={{
                    width: "54px",
                    height: "54px",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isSaved ? "var(--accent-wine)" : "var(--text-primary)",
                  }}
                >
                  <Heart size={20} fill={isSaved ? "var(--accent-wine)" : "none"} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="btn-primary"
                style={{ width: "100%", padding: "1rem" }}
              >
                Instant Checkout <ArrowRight size={16} />
              </button>
            </div>

            {/* Pincode Estimator */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "1.25rem",
                border: "1px solid var(--border-subtle)",
                marginTop: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "0.5rem",
                }}
              >
                <Truck size={15} style={{ color: "var(--accent-gold)" }} /> Check Express Delivery
              </span>

              <form onSubmit={checkDelivery} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN code (e.g. 400050)..."
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.5rem 0.75rem",
                    border: "1px solid var(--border-medium)",
                    outline: "none",
                  }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: "0.5rem 1rem" }}>
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: pincodeStatus.startsWith("Serviceable") ? "#234E3E" : "var(--accent-wine)",
                    marginTop: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Assurances */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={15} style={{ color: "var(--accent-gold)" }} />
                <span>100% Certified Authentic Pure Handloom Silk Mark</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <RotateCcw size={15} style={{ color: "var(--accent-gold)" }} />
                <span>7-Day Hassle-Free Exchange & Return Window</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div style={{ marginTop: "5rem" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              borderBottom: "1px solid var(--border-medium)",
              paddingBottom: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            {[
              { id: "details", label: "Full Specifications" },
              { id: "craft", label: "Fabric & Weave Heritage" },
              { id: "styling", label: "Styling & Drape Tips" },
              { id: "care", label: "Care & Preservation" },
              { id: "shipping", label: "Delivery & Returns" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "0.6rem 0",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: activeTab === tab.id ? "var(--accent-wine)" : "var(--text-secondary)",
                  borderBottom: activeTab === tab.id ? "2px solid var(--accent-wine)" : "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "2.5rem",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            {activeTab === "details" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Saree Length</span>
                  <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.details.length}</p>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Saree Width</span>
                  <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.details.width}</p>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Blouse Piece</span>
                  <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.details.blouseDescription}</p>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Approximate Weight</span>
                  <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.details.weight}</p>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Pallu Work</span>
                  <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.details.palluDetails}</p>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Border Design</span>
                  <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.details.borderDetails}</p>
                </div>
              </div>
            )}

            {activeTab === "craft" && (
              <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h4 className="font-serif" style={{ fontSize: "1.4rem" }}>
                  Woven in {product.details.origin}
                </h4>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  This piece was created utilizing the traditional <strong>{product.details.weaveType}</strong>. Unlike modern industrial powerlooms, each motif is woven into the warp using small wooden shuttles. This intensive manual process requires approximately <strong>{product.details.craftTime}</strong> to complete.
                </p>
                {product.details.zariType && (
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    <strong>Zari Formulation:</strong> {product.details.zariType}. Electroplated with fine gold and silver alloys to resist tarnishing over decades.
                  </p>
                )}
              </div>
            )}

            {activeTab === "styling" && (
              <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h4 className="font-serif" style={{ fontSize: "1.4rem" }}>
                  Curator's Styling Guide
                </h4>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {product.stylingNotes}
                </p>
                <div
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    padding: "1rem 1.25rem",
                    borderLeft: "3px solid var(--accent-wine)",
                    marginTop: "0.5rem",
                  }}
                >
                  <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", display: "block" }}>
                    Draping Masterclass Tip:
                  </strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                    {product.drapeTip}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h4 className="font-serif" style={{ fontSize: "1.4rem" }}>
                  Care & Archival Storage
                </h4>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {product.details.care}
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h4 className="font-serif" style={{ fontSize: "1.4rem" }}>
                  Insured Delivery & Hassle-Free Returns
                </h4>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  All EVARA VASTRA orders are dispatched in tamper-evident luxury keepsake boxes, wrapped in protective archival sleeves. Shipments within India take 3–5 business days. International deliveries take 5–8 business days via DHL.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "6rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent-wine)",
                  display: "block",
                  marginBottom: "0.3rem",
                }}
              >
                CURATOR'S PAIRINGS
              </span>
              <h3 className="font-serif" style={{ fontSize: "2.4rem", color: "var(--text-primary)" }}>
                You May Also Admire
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {relatedProducts.map((p: Product, idx: number) => (
                <ProductCard key={p.id} product={p} index={idx} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .pdp-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-thumbs {
            flex-direction: row !important;
            overflow-x: auto;
          }
          .gallery-thumbs button {
            width: 60px !important;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
};
