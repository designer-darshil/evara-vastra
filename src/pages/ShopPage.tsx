import React, { useState, useMemo, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { fabrics } from "../data/fabrics";
import { colors, occasions } from "../data/colors";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { X, SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { resolveCategoryOrCollection, matchesCategoryOrCollection } from "../lib/categoryUtils";

interface ShopPageProps {
  onNavigate?: (href: string) => void;
  categoryParam?: string;
  collectionParam?: string;
  searchParam?: string;
  fabricParam?: string;
  occasionParam?: string;
  filterParam?: string;
  colorParam?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  categoryParam,
  collectionParam,
  searchParam,
  fabricParam,
  occasionParam,
  filterParam,
  colorParam,
}) => {
  const { publishedProducts, activeCategories } = useData();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  // Determine initial resolution from route or query parameters
  const currentSlug = categoryParam || collectionParam;
  const resolution = useMemo(() => {
    return resolveCategoryOrCollection(currentSlug);
  }, [currentSlug]);

  const normalizeColorSlug = (slug?: string): string => {
    if (!slug) return "all";
    const clean = slug.toLowerCase().replace(/[-_]/g, " ").trim();
    const matched = colors.find(
      (c) =>
        c.id.toLowerCase() === clean ||
        c.name.toLowerCase().includes(clean) ||
        clean.includes(c.id.toLowerCase())
    );
    if (matched) return matched.id;
    if (clean.includes("cobalt") || clean.includes("blue") || clean.includes("indigo") || clean.includes("celestial") || clean.includes("peacock")) return "indigo";
    if (clean.includes("maroon") || clean.includes("wine") || clean.includes("burgundy")) return "wine";
    if (clean.includes("mustard") || clean.includes("gold") || clean.includes("yellow")) return "gold";
    if (clean.includes("green") || clean.includes("emerald") || clean.includes("olive") || clean.includes("teal") || clean.includes("pista")) return "emerald";
    if (clean.includes("blush") || clean.includes("rose") || clean.includes("pink") || clean.includes("mauve") || clean.includes("lavender") || clean.includes("purple")) return "rose";
    if (clean.includes("rust") || clean.includes("terracotta") || clean.includes("orange")) return "rust";
    if (clean.includes("ivory") || clean.includes("cream") || clean.includes("white")) return "ivory";
    if (clean.includes("black") || clean.includes("charcoal") || clean.includes("obsidian")) return "charcoal";
    return clean;
  };

  // Calculate dynamic max price from products
  const maxCatalogPrice = useMemo(() => {
    if (!publishedProducts.length) return 10000;
    const maxVal = Math.max(...publishedProducts.map((p) => p.price || 0));
    return Math.ceil(maxVal / 500) * 500;
  }, [publishedProducts]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [selectedFabric, setSelectedFabric] = useState<string>(fabricParam || resolution.canonicalFabric || "all");
  const [selectedColor, setSelectedColor] = useState<string>(colorParam ? normalizeColorSlug(colorParam) : "all");
  const [selectedOccasion, setSelectedOccasion] = useState<string>(occasionParam || "all");
  const [maxPrice, setMaxPrice] = useState<number>(maxCatalogPrice);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState<boolean>(filterParam === "newArrival");
  const [onlyBestsellers, setOnlyBestsellers] = useState<boolean>(filterParam === "bestseller");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Sync props on change
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (fabricParam) setSelectedFabric(fabricParam);
    else if (resolution.canonicalFabric) setSelectedFabric(resolution.canonicalFabric);
    if (occasionParam) setSelectedOccasion(occasionParam);
    if (colorParam) setSelectedColor(normalizeColorSlug(colorParam));
    if (filterParam === "newArrival") setOnlyNewArrivals(true);
    if (filterParam === "bestseller") setOnlyBestsellers(true);
    setMaxPrice(maxCatalogPrice);
  }, [categoryParam, fabricParam, occasionParam, colorParam, filterParam, resolution, maxCatalogPrice]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return publishedProducts.filter((p: Product) => {
      // 1. Search Query Filter
      if (searchParam) {
        const q = searchParam.toLowerCase().trim();
        const matchesQuery =
          p.title.toLowerCase().includes(q) ||
          (p.fabric && p.fabric.toLowerCase().includes(q)) ||
          (p.craft && p.craft.toLowerCase().includes(q)) ||
          (p.color && p.color.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. Canonical Category / Collection Filter
      if (selectedCategory !== "all") {
        const catRes = resolveCategoryOrCollection(selectedCategory);
        if (!matchesCategoryOrCollection(p, catRes, selectedFabric !== "all" ? selectedFabric : undefined)) {
          return false;
        }
      } else if (currentSlug) {
        if (!matchesCategoryOrCollection(p, resolution, selectedFabric !== "all" ? selectedFabric : undefined)) {
          return false;
        }
      }

      // 3. Explicit Fabric Filter
      if (selectedFabric !== "all") {
        const fab = selectedFabric.toLowerCase();
        const prodFab = (p.fabric || "").toLowerCase();
        const prodTitle = (p.title || "").toLowerCase();
        const prodDesc = (p.description || "").toLowerCase();
        if (!prodFab.includes(fab) && !prodTitle.includes(fab) && !prodDesc.includes(fab)) {
          return false;
        }
      }

      // 4. Color Filter
      if (selectedColor !== "all") {
        const normColor = selectedColor.toLowerCase();
        const prodColor = (p.color || "").toLowerCase();
        const prodDesc = (p.description || "").toLowerCase();
        const prodTitle = (p.title || "").toLowerCase();

        const matchesColor =
          prodColor.includes(normColor) ||
          prodDesc.includes(normColor) ||
          prodTitle.includes(normColor) ||
          (normColor === "indigo" && (prodColor.includes("blue") || prodColor.includes("teal") || prodColor.includes("indigo") || prodColor.includes("peacock") || prodDesc.includes("blue") || prodDesc.includes("cobalt"))) ||
          (normColor === "emerald" && (prodColor.includes("green") || prodColor.includes("teal") || prodColor.includes("emerald") || prodColor.includes("pista") || prodColor.includes("olive"))) ||
          (normColor === "wine" && (prodColor.includes("wine") || prodColor.includes("maroon") || prodColor.includes("red") || prodDesc.includes("wine") || prodDesc.includes("maroon"))) ||
          (normColor === "rose" && (prodColor.includes("pink") || prodColor.includes("rose") || prodColor.includes("blush") || prodColor.includes("mauve") || prodColor.includes("purple") || prodColor.includes("lavender"))) ||
          (normColor === "gold" && (prodColor.includes("gold") || prodColor.includes("mustard") || prodColor.includes("yellow"))) ||
          (normColor === "rust" && (prodColor.includes("rust") || prodColor.includes("terracotta") || prodColor.includes("orange")));
        if (!matchesColor) return false;
      }

      // 5. Occasion Filter
      if (selectedOccasion !== "all" && Array.isArray(p.occasions)) {
        if (!p.occasions.includes(selectedOccasion as any)) return false;
      }

      // 6. Price Constraint
      if (p.price > maxPrice) return false;

      // 7. Flags
      if (onlyNewArrivals && !p.newArrival) return false;
      if (onlyBestsellers && !p.bestseller) return false;

      return true;
    });
  }, [
    publishedProducts,
    searchParam,
    selectedCategory,
    currentSlug,
    resolution,
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
    if (sortBy === "price-low") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    return list;
  }, [filteredProducts, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedFabric !== "all" && selectedFabric !== resolution.canonicalFabric ? 1 : 0) +
    (selectedColor !== "all" ? 1 : 0) +
    (selectedOccasion !== "all" ? 1 : 0) +
    (maxPrice < maxCatalogPrice ? 1 : 0) +
    (onlyNewArrivals ? 1 : 0) +
    (onlyBestsellers ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedFabric("all");
    setSelectedColor("all");
    setSelectedOccasion("all");
    setMaxPrice(maxCatalogPrice);
    setOnlyNewArrivals(false);
    setOnlyBestsellers(false);
    handleNav("/shop");
  };

  const getPageTitle = () => {
    if (searchParam) return `Search Results: "${searchParam}"`;
    if (currentSlug) return resolution.title;
    if (colorParam) {
      const formattedColor = colorParam.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      return `${formattedColor} Collection`;
    }
    if (occasionParam) {
      const found = occasions.find((o) => o.id === occasionParam);
      return found ? `${found.name} Collection` : "Occasion Collection";
    }
    if (onlyNewArrivals) return "New Season Arrivals • 2026";
    if (onlyBestsellers) return "Bestselling Favorites";
    return "All Products";
  };

  const getPageSubtitle = () => {
    if (resolution.description) return resolution.description;
    return "Explore our complete curated archive of handcrafted sarees, designer co-ord sets, and festive kurta ensembles.";
  };

  return (
    <div className="animate-in fade-in duration-500 pb-28">
      {/* Header Banner */}
      <div className="bg-secondary/50 py-12 sm:py-16 border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              ...(currentSlug || colorParam || searchParam || occasionParam
                ? [{ label: getPageTitle() }]
                : []),
            ]}
            onNavigate={handleNav}
          />

          <div className="max-w-3xl mt-2">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1.5">
              {resolution.subtitle || "HANDCRAFTED IN INDIA"}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-foreground m-0 leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl">
              {getPageSubtitle()}
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border mb-8">
          {/* Mobile Filter Button & Product Count */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-semibold tracking-widest uppercase h-10 min-h-[44px] px-4"
            >
              <SlidersHorizontal className="h-4 w-4 text-brand" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </Button>

            <span className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground font-semibold">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {/* Right Sorting & Grid Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden sm:inline-block">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 bg-background border border-input rounded-sm text-xs sm:text-sm font-medium text-foreground outline-none focus:ring-1 focus:ring-accent min-h-[44px]"
                aria-label="Sort products"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Season</option>
              </select>
            </div>

            <div className="hidden lg:flex items-center gap-1 border-l border-border pl-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGridCols(3)}
                className={cn("h-8 w-8", gridCols === 3 ? "text-accent" : "text-muted-foreground")}
                aria-label="3 columns grid"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGridCols(4)}
                className={cn("h-8 w-8", gridCols === 4 ? "text-accent" : "text-muted-foreground")}
                aria-label="4 columns grid"
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mr-2">
              Active Filters:
            </span>

            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
                Category: {selectedCategory}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setSelectedCategory("all")} />
              </Badge>
            )}
            {selectedFabric !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
                Fabric: {selectedFabric}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setSelectedFabric("all")} />
              </Badge>
            )}
            {selectedColor !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
                Color: {selectedColor}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setSelectedColor("all")} />
              </Badge>
            )}
            {selectedOccasion !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
                Occasion: {selectedOccasion}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setSelectedOccasion("all")} />
              </Badge>
            )}
            {maxPrice < maxCatalogPrice && (
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
                Under ₹{maxPrice.toLocaleString("en-IN")}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setMaxPrice(maxCatalogPrice)} />
              </Badge>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs text-brand font-bold underline ml-2 hover:text-brand-hover transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:flex flex-col gap-8 w-[240px] shrink-0">
            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
                Categories
              </h4>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "text-left text-sm transition-colors",
                    selectedCategory === "all" ? "text-brand font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  All Products ({publishedProducts.length})
                </button>
                {activeCategories.map((cat) => {
                  const catRes = resolveCategoryOrCollection(cat.slug);
                  const count = publishedProducts.filter((p) => matchesCategoryOrCollection(p, catRes)).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={cn(
                        "text-left text-sm transition-colors flex items-center justify-between",
                        selectedCategory === cat.slug ? "text-brand font-semibold" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-muted-foreground">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fabric Filter */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
                Fabric & Yarn
              </h4>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedFabric("all")}
                  className={cn(
                    "text-left text-sm transition-colors",
                    selectedFabric === "all" ? "text-brand font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  All Fabrics
                </button>
                {fabrics.map((f) => {
                  const count = publishedProducts.filter((p) => {
                    const fab = f.id.toLowerCase();
                    const prodFab = (p.fabric || "").toLowerCase();
                    const prodTitle = (p.title || "").toLowerCase();
                    return prodFab.includes(fab) || prodTitle.includes(fab);
                  }).length;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFabric(f.id)}
                      className={cn(
                        "text-left text-sm transition-colors flex items-center justify-between",
                        selectedFabric === f.id ? "text-brand font-semibold" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span>{f.name.split(" ")[0]}</span>
                      {count > 0 && <span className="text-xs text-muted-foreground">({count})</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
                Occasion
              </h4>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedOccasion("all")}
                  className={cn(
                    "text-left text-sm transition-colors",
                    selectedOccasion === "all" ? "text-brand font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  All Occasions
                </button>
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={cn(
                      "text-left text-sm transition-colors",
                      selectedOccasion === occ.id ? "text-brand font-semibold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {occ.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
                Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const isSelected = selectedColor === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(isSelected ? "all" : c.id)}
                      title={c.name}
                      className={cn(
                        "w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-110",
                        isSelected
                          ? "ring-2 ring-brand ring-offset-2 ring-offset-background"
                          : "border border-border shadow-sm"
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold tracking-widest uppercase text-foreground">
                  Max Price
                </h4>
                <span className="text-sm font-semibold text-brand">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max={maxCatalogPrice}
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="py-20 px-6 text-center bg-secondary/30 border border-border rounded-sm">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground m-0">
                  No Products Match Selected Filters
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3 mb-6 leading-relaxed">
                  We could not find any active products matching this combination. Try resetting your filters to explore our full collection.
                </p>
                <Button onClick={resetAllFilters} className="bg-brand hover:bg-brand-hover text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset All Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-4 sm:gap-5 md:gap-6",
                  gridCols === 4
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                )}
              >
                {sortedProducts.map((product: Product, idx: number) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onNavigate={handleNav}
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
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-drawer flex justify-end"
          style={{ zIndex: 60 }}
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="bg-background w-[85%] max-w-[340px] h-[100dvh] max-h-[100dvh] overflow-y-auto p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <h3 className="font-serif text-2xl m-0 text-foreground">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Category Filter Mobile */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-3">
                Categories
              </h4>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "text-left text-sm py-1.5",
                    selectedCategory === "all" ? "text-brand font-bold" : "text-muted-foreground"
                  )}
                >
                  All Products ({publishedProducts.length})
                </button>
                {activeCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={cn(
                      "text-left text-sm py-1.5",
                      selectedCategory === c.slug ? "text-brand font-bold" : "text-muted-foreground"
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider Mobile */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold tracking-widest uppercase text-foreground">
                  Max Price
                </h4>
                <span className="text-xs font-semibold text-brand">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max={maxCatalogPrice}
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full h-12 bg-brand hover:bg-brand-hover text-white font-semibold uppercase tracking-wider text-xs"
              >
                Apply Filters ({filteredProducts.length})
              </Button>
              <Button
                variant="outline"
                onClick={resetAllFilters}
                className="w-full h-11 text-xs uppercase tracking-wider"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
