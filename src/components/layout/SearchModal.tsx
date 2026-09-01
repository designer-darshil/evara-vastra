import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { products } from "../../data/products";
import { Search, X, ArrowRight } from "lucide-react";
import { ProductCard } from "../common/ProductCard";

export const SearchModal: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { isSearchOpen, closeSearch } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const quickTags = [
    "Katan Silk",
    "Banarasi Kadwa",
    "Mulmul Cotton",
    "Sheer Organza",
    "Pure Linen",
    "Deep Wine",
    "Terracotta",
    "Wedding",
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const normalized = query.trim().toLowerCase();
  const filteredProducts = normalized
    ? products.filter((p) => {
        return (
          p.title.toLowerCase().includes(normalized) ||
          p.fabric.toLowerCase().includes(normalized) ||
          p.craft.toLowerCase().includes(normalized) ||
          p.color.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized) ||
          p.occasions.some((occ) => occ.toLowerCase().includes(normalized))
        );
      })
    : [];

  const handleProductSelect = (href: string) => {
    closeSearch();
    onNavigate(href);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 21, 19, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.2s ease-out forwards",
      }}
      onClick={closeSearch}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-elevated)",
          borderBottom: "1px solid var(--border-medium)",
          padding: "2rem 0 3rem 0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container">
          {/* Header Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              Search Evara Atelier
            </span>
            <button
              onClick={closeSearch}
              aria-label="Close search overlay"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input Box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              borderBottom: "2px solid var(--text-primary)",
              paddingBottom: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <Search size={24} style={{ color: "var(--text-secondary)" }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by weave, fabric, color or occasion (e.g. Katan Silk, Banarasi, Wine)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                fontFamily: "var(--font-serif)",
                color: "var(--text-primary)",
                backgroundColor: "transparent",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Suggestions */}
          {!query && (
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Popular Inquiries
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.4rem 0.85rem",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-subtle)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Showing{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {filteredProducts.length}
                  </strong>{" "}
                  pieces matching "{query}"
                </p>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={() => handleProductSelect(`/shop?q=${encodeURIComponent(query)}`)}
                    className="btn-link"
                  >
                    View All in Shop <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div
                  style={{
                    padding: "3rem 0",
                    textAlign: "center",
                    backgroundColor: "var(--bg-primary)",
                  }}
                >
                  <p
                    className="font-serif"
                    style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}
                  >
                    No matching sarees found
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      marginTop: "0.5rem",
                    }}
                  >
                    Try searching for "Silk", "Linen", "Banarasi", or "Wedding".
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {filteredProducts.slice(0, 4).map((p, idx) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      index={idx}
                      onNavigate={handleProductSelect}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
