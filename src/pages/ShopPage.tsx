import React, { useState, useMemo, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { fabrics } from "../data/fabrics";
import { colors, occasions } from "../data/colors";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { X, SlidersHorizontal, Grid3X3, Grid2X2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

interface ShopPageProps {
  onNavigate?: (href: string) => void;
  categoryParam?: string;
  searchParam?: string;
  fabricParam?: string;
  occasionParam?: string;
  filterParam?: string;
  colorParam?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  categoryParam,
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

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [selectedFabric, setSelectedFabric] = useState<string>(fabricParam || "all");
  const [selectedColor, setSelectedColor] = useState<string>(colorParam ? normalizeColorSlug(colorParam) : "all");
  const [selectedOccasion, setSelectedOccasion] = useState<string>(occasionParam || "all");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
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
    if (colorParam) setSelectedColor(normalizeColorSlug(colorParam));
    if (filterParam === "newArrival") setOnlyNewArrivals(true);
  }, [categoryParam, fabricParam, occasionParam, colorParam, filterParam]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return publishedProducts.filter((p: Product) => {
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
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (selectedFabric !== "all" && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) return false;
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
      if (selectedOccasion !== "all" && !p.occasions.includes(selectedOccasion as any)) return false;
      if (p.price > maxPrice) return false;
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
    if (sortBy === "price-low") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
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
      return found ? found.name : "All Products";
    }
    if (colorParam) {
      const formattedColor = colorParam.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      return `${formattedColor} Collection`;
    }
    if (searchParam) return `Search Results: "${searchParam}"`;
    if (occasionParam) {
      const found = occasions.find((o) => o.id === occasionParam);
      return found ? `${found.name} Collection` : "Occasion Collection";
    }
    if (onlyNewArrivals) return "New Season Arrivals • 2026";
    return "The Contemporary Collection";
  };

  return (
    <div className="animate-in fade-in duration-500 pb-28">
      {/* Header Banner */}
      <div className="bg-secondary/50 py-14 border-b border-border">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              ...(categoryParam || colorParam ? [{ label: getPageTitle() }] : []),
            ]}
            onNavigate={onNavigate}
          />

          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1.5">
              HANDWOVEN IN INDIA
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] text-foreground m-0 leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-base text-muted-foreground mt-3 leading-relaxed">
              Explore our curated archive of pure mulberry silks, Varanasi Kadwa brocades, lightweight organic cottons, and architectural linens.
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-10">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-5 pb-6 border-b border-border mb-8">
          {/* Mobile Filter Button & Meta */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-semibold tracking-widest uppercase h-9"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </Button>

            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              Showing <strong className="text-foreground">{sortedProducts.length}</strong> published sarees
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden sm:inline-block">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 bg-background border border-input rounded-sm text-sm font-medium text-foreground outline-none focus:ring-1 focus:ring-accent"
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
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGridCols(4)}
                className={cn("h-8 w-8", gridCols === 4 ? "text-accent" : "text-muted-foreground")}
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
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                Category: {selectedCategory}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setSelectedCategory("all")} />
              </Badge>
            )}
            {selectedFabric !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                Fabric: {selectedFabric}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setSelectedFabric("all")} />
              </Badge>
            )}
            {selectedColor !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                Color: {selectedColor}
                <X className="h-3 w-3 cursor-pointer hover:text-accent" onClick={() => setSelectedColor("all")} />
              </Badge>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs text-accent font-bold underline ml-2 hover:text-accent/80 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
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
                  className={cn("text-left text-sm transition-colors", selectedCategory === "all" ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground")}
                >
                  All Categories ({publishedProducts.length})
                </button>
                {activeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn("text-left text-sm transition-colors", selectedCategory === cat.slug ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground")}
                  >
                    {cat.name}
                  </button>
                ))}
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
                  className={cn("text-left text-sm transition-colors", selectedFabric === "all" ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground")}
                >
                  All Fabrics
                </button>
                {fabrics.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFabric(f.id)}
                    className={cn("text-left text-sm transition-colors", selectedFabric === f.id ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground")}
                  >
                    {f.name.split(" ")[0]}
                  </button>
                ))}
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
                  className={cn("text-left text-sm transition-colors", selectedOccasion === "all" ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground")}
                >
                  All Occasions
                </button>
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={cn("text-left text-sm transition-colors", selectedOccasion === occ.id ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground")}
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
                  const isSelected = selectedColor === c.name.split(" ")[0];
                  return (
                    <button
                      key={c.id}
                      onClick={() =>
                        setSelectedColor(isSelected ? "all" : c.name.split(" ")[0])
                      }
                      title={c.name}
                      className={cn(
                        "w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-110",
                        isSelected ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : "border border-border shadow-sm"
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
                <span className="text-sm font-semibold">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="py-20 px-8 text-center bg-secondary/30 border border-border rounded-md">
                <h3 className="font-serif text-3xl text-foreground m-0">
                  No Products Match Selected Filters
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3 mb-6">
                  Try clearing some of your filter criteria or explore our complete contemporary collection.
                </p>
                <Button onClick={resetAllFilters} variant="default">
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-x-6 gap-y-10",
                  gridCols === 4
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-2 lg:grid-cols-3"
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
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-[99999] flex justify-end"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="bg-background w-[85%] max-w-[340px] h-[100dvh] max-h-[100dvh] overflow-y-auto p-8 flex flex-col gap-8 shadow-xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <h3 className="font-serif text-2xl m-0 text-foreground">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">Categories</h4>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn("text-left text-sm", selectedCategory === "all" ? "text-accent font-bold" : "text-muted-foreground")}
                >
                  All Categories
                </button>
                {activeCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={cn("text-left text-sm", selectedCategory === c.slug ? "text-accent font-bold" : "text-muted-foreground")}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={() => setIsMobileFilterOpen(false)} className="mt-auto w-full h-12">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
