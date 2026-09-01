import React, { useState, useMemo, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { fabrics } from "../data/fabrics";
import { colors, occasions } from "../data/colors";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { X, SlidersHorizontal, Grid3X3, Grid2X2 } from "lucide-react";

interface ShopPageProps {
  onNavigate: (href: string) => void;
  categoryParam?: string;
  searchParam?: string;
  fabricParam?: string;
  occasionParam?: string;
  filterParam?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  categoryParam,
  searchParam,
  fabricParam,
  occasionParam,
  filterParam,
}) => {
  const { publishedProducts, activeCategories } = useData();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [selectedFabric, setSelectedFabric] = useState<string>(fabricParam || "all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedOccasion, setSelectedOccasion] = useState<string>(occasionParam || "all");
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState<boolean>(filterParam === "newArrival");
  const [onlyBestsellers, setOnlyBestsellers] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Sync props on change
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (fabricParam) setSelectedFabric(fabricParam);
    if (occasionParam) setSelectedOccasion(occasionParam);
    if (filterParam === "newArrival") setOnlyNewArrivals(true);
  }, [categoryParam, fabricParam, occasionParam, filterParam]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return publishedProducts.filter((p: Product) => {
      // Search param
      if (searchParam) {
        const q = searchParam.toLowerCase();
        const matchesQuery =
          p.title.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }

      // Fabric
      if (selectedFabric !== "all" && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }

      // Color
      if (selectedColor !== "all" && !p.color.toLowerCase().includes(selectedColor.toLowerCase())) {
        return false;
      }

      // Occasion
      if (selectedOccasion !== "all" && !p.occasions.includes(selectedOccasion as any)) {
        return false;
      }

      // Price
      if (p.price > maxPrice) {
        return false;
      }

      // Flags
      if (onlyNewArrivals && !p.newArrival) return false;
      if (onlyBestsellers && !p.bestseller) return false;

      return true;
    });
  }, [
    publishedProducts,
    searchParam,
    selectedCategory,
    selectedFabric,
    selectedColor,
    selectedOccasion,
    maxPrice,
    onlyNewArrivals,
    onlyBestsellers,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-high") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "newest") {
      return list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedFabric !== "all" ? 1 : 0) +
    (selectedColor !== "all" ? 1 : 0) +
    (selectedOccasion !== "all" ? 1 : 0) +
    (maxPrice < 35000 ? 1 : 0) +
    (onlyNewArrivals ? 1 : 0) +
    (onlyBestsellers ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedFabric("all");
    setSelectedColor("all");
    setSelectedOccasion("all");
    setMaxPrice(35000);
    setOnlyNewArrivals(false);
    setOnlyBestsellers(false);
  };

  const getPageTitle = () => {
    if (categoryParam) {
      const found = activeCategories.find((c) => c.slug === categoryParam);
      return found ? found.name : "All Sarees";
    }
    if (searchParam) return `Search Results: "${searchParam}"`;
    if (occasionParam) {
      const found = occasions.find((o) => o.id === occasionParam);
      return found ? `${found.name} Sarees` : "Occasion Sarees";
    }
    if (onlyNewArrivals) return "New Season Arrivals • 2026";
    return "The Contemporary Saree Catalog";
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem" }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: "var(--bg-surface-subtle)",
          padding: "3.5rem 0 2.5rem 0",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              ...(categoryParam ? [{ label: getPageTitle() }] : []),
            ]}
            onNavigate={onNavigate}
          />

          <div style={{ maxWidth: "700px" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-wine)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              HANDWOVEN IN INDIA
            </span>
            <h1
              className="font-serif"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", color: "var(--text-primary)" }}
            >
              {getPageTitle()}
            </h1>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              Explore our curated archive of pure mulberry silks, Varanasi Kadwa brocades, lightweight organic cottons, and architectural linens.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "2.5rem" }}>
        {/* Controls Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.25rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            marginBottom: "2rem",
          }}
        >
          {/* Mobile Filter Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="mobile-filter-btn"
              style={{
                display: "none",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-medium)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <SlidersHorizontal size={15} />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Showing <strong style={{ color: "var(--text-primary)" }}>{sortedProducts.length}</strong> published sarees
            </span>
          </div>

          {/* Right Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                }}
              >
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.45rem 1.5rem 0.45rem 0.75rem",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-medium)",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Season</option>
              </select>
            </div>

            <div
              className="desktop-only"
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <button
                onClick={() => setGridCols(3)}
                aria-label="3 Column Grid"
                style={{
                  padding: "0.4rem",
                  color: gridCols === 3 ? "var(--accent-wine)" : "var(--text-muted)",
                }}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                aria-label="4 Column Grid"
                style={{
                  padding: "0.4rem",
                  color: gridCols === 4 ? "var(--accent-wine)" : "var(--text-muted)",
                }}
              >
                <Grid2X2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginRight: "0.5rem",
              }}
            >
              Active Filters:
            </span>

            {selectedCategory !== "all" && (
              <span className="badge-tag" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                Category: {selectedCategory}
                <X size={12} style={{ cursor: "pointer" }} onClick={() => setSelectedCategory("all")} />
              </span>
            )}
            {selectedFabric !== "all" && (
              <span className="badge-tag" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                Fabric: {selectedFabric}
                <X size={12} style={{ cursor: "pointer" }} onClick={() => setSelectedFabric("all")} />
              </span>
            )}
            {selectedColor !== "all" && (
              <span className="badge-tag" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                Color: {selectedColor}
                <X size={12} style={{ cursor: "pointer" }} onClick={() => setSelectedColor("all")} />
              </span>
            )}

            <button
              onClick={resetAllFilters}
              style={{
                fontSize: "0.75rem",
                color: "var(--accent-wine)",
                fontWeight: 600,
                textDecoration: "underline",
                marginLeft: "0.5rem",
              }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
          className="shop-layout-grid"
        >
          {/* Desktop Filter Sidebar */}
          <aside className="desktop-filters" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Category Filter */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  marginBottom: "0.85rem",
                }}
              >
                Categories
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  onClick={() => setSelectedCategory("all")}
                  style={{
                    textAlign: "left",
                    fontSize: "0.825rem",
                    fontWeight: selectedCategory === "all" ? 600 : 400,
                    color: selectedCategory === "all" ? "var(--accent-wine)" : "var(--text-secondary)",
                  }}
                >
                  All Categories ({publishedProducts.length})
                </button>
                {activeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    style={{
                      textAlign: "left",
                      fontSize: "0.825rem",
                      fontWeight: selectedCategory === cat.slug ? 600 : 400,
                      color: selectedCategory === cat.slug ? "var(--accent-wine)" : "var(--text-secondary)",
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  marginBottom: "0.85rem",
                }}
              >
                Fabric & Yarn
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  onClick={() => setSelectedFabric("all")}
                  style={{
                    textAlign: "left",
                    fontSize: "0.825rem",
                    fontWeight: selectedFabric === "all" ? 600 : 400,
                    color: selectedFabric === "all" ? "var(--accent-wine)" : "var(--text-secondary)",
                  }}
                >
                  All Fabrics
                </button>
                {fabrics.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFabric(f.id)}
                    style={{
                      textAlign: "left",
                      fontSize: "0.825rem",
                      fontWeight: selectedFabric === f.id ? 600 : 400,
                      color: selectedFabric === f.id ? "var(--accent-wine)" : "var(--text-secondary)",
                    }}
                  >
                    {f.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  marginBottom: "0.85rem",
                }}
              >
                Occasion
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  onClick={() => setSelectedOccasion("all")}
                  style={{
                    textAlign: "left",
                    fontSize: "0.825rem",
                    fontWeight: selectedOccasion === "all" ? 600 : 400,
                    color: selectedOccasion === "all" ? "var(--accent-wine)" : "var(--text-secondary)",
                  }}
                >
                  All Occasions
                </button>
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    style={{
                      textAlign: "left",
                      fontSize: "0.825rem",
                      fontWeight: selectedOccasion === occ.id ? 600 : 400,
                      color: selectedOccasion === occ.id ? "var(--accent-wine)" : "var(--text-secondary)",
                    }}
                  >
                    {occ.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  marginBottom: "0.85rem",
                }}
              >
                Palette
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {colors.map((c) => {
                  const isSelected = selectedColor === c.name.split(" ")[0];
                  return (
                    <button
                      key={c.id}
                      onClick={() =>
                        setSelectedColor(isSelected ? "all" : c.name.split(" ")[0])
                      }
                      title={c.name}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        border: isSelected
                          ? "2px solid var(--accent-wine)"
                          : "1px solid var(--border-medium)",
                        boxShadow: isSelected ? "0 0 0 2px #FFFFFF" : "none",
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-primary)",
                  }}
                >
                  Max Price
                </h4>
                <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="35000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent-wine)" }}
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main>
            {sortedProducts.length === 0 ? (
              <div
                style={{
                  padding: "5rem 2rem",
                  textAlign: "center",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <h3 className="font-serif" style={{ fontSize: "1.85rem", color: "var(--text-primary)" }}>
                  No Sarees Match Selected Filters
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    maxWidth: "400px",
                    margin: "0.5rem auto 1.5rem auto",
                  }}
                >
                  Try clearing some of your filter selections or explore our complete silk collection.
                </p>
                <button onClick={resetAllFilters} className="btn-wine">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    gridCols === 4
                      ? "repeat(auto-fill, minmax(230px, 1fr))"
                      : "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "2.5rem 1.75rem",
                }}
              >
                {sortedProducts.map((product: Product, idx: number) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 99999,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              width: "85%",
              maxWidth: "340px",
              height: "100%",
              overflowY: "auto",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 className="font-serif" style={{ fontSize: "1.4rem", margin: 0 }}>Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} style={{ border: "none", background: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem" }}>Categories</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <button
                  onClick={() => setSelectedCategory("all")}
                  style={{ textAlign: "left", fontSize: "0.85rem", color: selectedCategory === "all" ? "#7C2430" : "#6F6257", fontWeight: selectedCategory === "all" ? 700 : 400 }}
                >
                  All Categories
                </button>
                {activeCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    style={{ textAlign: "left", fontSize: "0.85rem", color: selectedCategory === c.slug ? "#7C2430" : "#6F6257", fontWeight: selectedCategory === c.slug ? 700 : 400 }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setIsMobileFilterOpen(false)} className="btn-wine" style={{ marginTop: "auto" }}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .shop-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-filters {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};
