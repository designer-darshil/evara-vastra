import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { useData } from "../../context/DataContext";
import { Product } from "../../types";
import { Search, X, ArrowRight } from "lucide-react";

export const SearchModal: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { isSearchOpen, closeSearch } = useShop();
  const { publishedProducts } = useData();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
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

  const filteredProducts = query.trim()
    ? publishedProducts.filter((p: Product) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (slug: string) => {
    closeSearch();
    onNavigate(`/product/${slug}`);
  };

  const handleQuickTagClick = (tag: string) => {
    setQuery(tag);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    onNavigate(`/shop?search=${encodeURIComponent(query)}`);
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
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "clamp(2rem, 8vh, 5rem)",
        animation: "fadeIn 0.2s ease-out forwards",
      }}
      onClick={closeSearch}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          padding: "0 1.5rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input Container */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "var(--shadow-elevated)",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            border: "1px solid var(--border-medium)",
          }}
        >
          <Search size={22} style={{ color: "var(--accent-wine)" }} />
          <form onSubmit={handleSearchSubmit} style={{ flex: 1 }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by weave, fabric, color, or occasion (e.g. Katan Silk, Banarasi, Wine, Wedding)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "1.05rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                backgroundColor: "transparent",
              }}
            />
          </form>
          <button
            onClick={closeSearch}
            aria-label="Close search"
            style={{
              padding: "0.4rem",
              color: "var(--text-muted)",
              transition: "color 0.2s ease",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Popular Search Suggestions */}
        {!query && (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              padding: "1.5rem",
              marginTop: "0.5rem",
              boxShadow: "var(--shadow-medium)",
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Curator Suggestions
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Katan Silk", "Banarasi Kadwa", "Mulmul Cotton", "Wine", "Wedding", "Organza", "Linen"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickTagClick(tag)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      fontSize: "0.8rem",
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-medium)",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              padding: "1.5rem",
              marginTop: "0.5rem",
              maxHeight: "60vh",
              overflowY: "auto",
              boxShadow: "var(--shadow-medium)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Found {filteredProducts.length} matching saree(s)
              </span>
              <button
                onClick={handleSearchSubmit}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--accent-wine)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                View all in Catalog <ArrowRight size={13} />
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ padding: "2rem 0", textAlign: "center", color: "var(--text-secondary)" }}>
                <p>No sarees match "{query}".</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.slug)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.6rem",
                      cursor: "pointer",
                      transition: "background-color 0.15s ease",
                    }}
                    className="search-result-item"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      style={{
                        width: "48px",
                        height: "64px",
                        objectFit: "cover",
                        backgroundColor: "#EDE7DD",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--accent-gold)",
                          fontWeight: 600,
                        }}
                      >
                        {p.fabric}
                      </span>
                      <h4
                        style={{
                          fontSize: "0.95rem",
                          color: "var(--text-primary)",
                          margin: "0.1rem 0",
                        }}
                      >
                        {p.title}
                      </h4>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
