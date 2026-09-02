import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { resolveCategoryOrCollection, matchesCategoryOrCollection } from "../lib/categoryUtils";
import { ShopFilterDrawer, FilterState } from "../components/shop/ShopFilterDrawer";

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
  const location = useLocation();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  // Determine initial resolution from route or query parameters
  const currentSlug = categoryParam || collectionParam;
  const resolution = useMemo(() => {
    return resolveCategoryOrCollection(currentSlug);
  }, [currentSlug]);

  // Calculate dynamic max catalog price
  const maxCatalogPrice = useMemo(() => {
    if (!publishedProducts.length) return 10000;
    const maxVal = Math.max(...publishedProducts.map((p) => p.price || 0));
    return Math.ceil(maxVal / 500) * 500;
  }, [publishedProducts]);

  // Extract URL query params on mount/update
  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  // Filter State (Applied)
  const [filters, setFilters] = useState<FilterState>(() => {
    const qSize = queryParams.get("size") || "all";
    const qColor = colorParam || queryParams.get("color") || "all";
    const qFabric = fabricParam || resolution.canonicalFabric || queryParams.get("fabric") || "all";
    const qOccasion = occasionParam || queryParams.get("occasion") || "all";
    const qMaxPrice = queryParams.get("maxPrice") ? Number(queryParams.get("maxPrice")) : maxCatalogPrice;
    const qInStock = queryParams.get("inStock") === "true";
    const qNew = filterParam === "newArrival" || queryParams.get("filter") === "newArrival";
    const qBest = filterParam === "bestseller" || queryParams.get("filter") === "bestseller";

    return {
      category: categoryParam || "all",
      size: qSize,
      color: qColor,
      fabric: qFabric,
      occasion: qOccasion,
      maxPrice: qMaxPrice,
      inStockOnly: qInStock,
      onlyNewArrivals: qNew,
      onlyBestsellers: qBest,
    };
  });

  const [sortBy, setSortBy] = useState<string>(() => queryParams.get("sort") || "featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Synchronize incoming props with filter state
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryParam || prev.category,
      fabric: fabricParam || resolution.canonicalFabric || prev.fabric,
      occasion: occasionParam || prev.occasion,
      color: colorParam || prev.color,
      onlyNewArrivals: filterParam === "newArrival" ? true : prev.onlyNewArrivals,
      onlyBestsellers: filterParam === "bestseller" ? true : prev.onlyBestsellers,
    }));
  }, [categoryParam, fabricParam, occasionParam, colorParam, filterParam, resolution]);

  // Synchronize state with URL search parameters cleanly
  const syncUrlParams = useCallback((newFilters: FilterState, newSort: string) => {
    const params = new URLSearchParams();
    if (newFilters.category !== "all" && !categoryParam) params.set("category", newFilters.category);
    if (newFilters.size !== "all") params.set("size", newFilters.size);
    if (newFilters.color !== "all" && !colorParam) params.set("color", newFilters.color);
    if (newFilters.fabric !== "all" && !fabricParam && newFilters.fabric !== resolution.canonicalFabric) {
      params.set("fabric", newFilters.fabric);
    }
    if (newFilters.occasion !== "all" && !occasionParam) params.set("occasion", newFilters.occasion);
    if (newFilters.maxPrice < maxCatalogPrice) params.set("maxPrice", String(newFilters.maxPrice));
    if (newFilters.inStockOnly) params.set("inStock", "true");
    if (newFilters.onlyNewArrivals && filterParam !== "newArrival") params.set("filter", "newArrival");
    if (newFilters.onlyBestsellers && filterParam !== "bestseller") params.set("filter", "bestseller");
    if (newSort !== "featured") params.set("sort", newSort);

    const queryString = params.toString();
    const targetUrl = `${location.pathname}${queryString ? `?${queryString}` : ""}`;
    window.history.replaceState(null, "", targetUrl);
  }, [categoryParam, colorParam, fabricParam, occasionParam, filterParam, resolution, maxCatalogPrice, location.pathname]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    syncUrlParams(newFilters, sortBy);
  };

  const handleClearFilters = () => {
    const resetState: FilterState = {
      category: categoryParam || "all",
      size: "all",
      color: "all",
      fabric: "all",
      occasion: "all",
      maxPrice: maxCatalogPrice,
      inStockOnly: false,
      onlyNewArrivals: false,
      onlyBestsellers: false,
    };
    setFilters(resetState);
    syncUrlParams(resetState, sortBy);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    syncUrlParams(filters, newSort);
  };

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
      if (filters.category !== "all") {
        const catRes = resolveCategoryOrCollection(filters.category);
        if (!matchesCategoryOrCollection(p, catRes, filters.fabric !== "all" ? filters.fabric : undefined)) {
          return false;
        }
      } else if (currentSlug) {
        if (!matchesCategoryOrCollection(p, resolution, filters.fabric !== "all" ? filters.fabric : undefined)) {
          return false;
        }
      }

      // 3. Size Filter
      if (filters.size !== "all") {
        const pSizes = (p.sizes || []).map((s) => s.toUpperCase());
        const variantSizes = (p.variants || []).map((v) => (v.size || "").toUpperCase());
        const target = filters.size.toUpperCase();
        const matches =
          pSizes.includes(target) ||
          variantSizes.includes(target) ||
          (target === "FREE SIZE" && p.title.toLowerCase().includes("saree"));
        if (!matches) return false;
      }

      // 4. Fabric Filter
      if (filters.fabric !== "all") {
        const fab = filters.fabric.toLowerCase();
        const prodFab = (p.fabric || "").toLowerCase();
        const prodTitle = (p.title || "").toLowerCase();
        const prodDesc = (p.description || "").toLowerCase();
        if (!prodFab.includes(fab) && !prodTitle.includes(fab) && !prodDesc.includes(fab)) {
          return false;
        }
      }

      // 5. Color Filter
      if (filters.color !== "all") {
        const normColor = filters.color.toLowerCase();
        const prodColor = (p.color || "").toLowerCase();
        const prodDesc = (p.description || "").toLowerCase();
        const prodTitle = (p.title || "").toLowerCase();
        const matches =
          prodColor.includes(normColor) ||
          prodDesc.includes(normColor) ||
          prodTitle.includes(normColor) ||
          (normColor === "indigo" && (prodColor.includes("blue") || prodColor.includes("teal") || prodColor.includes("indigo") || prodColor.includes("peacock") || prodDesc.includes("blue") || prodDesc.includes("cobalt"))) ||
          (normColor === "emerald" && (prodColor.includes("green") || prodColor.includes("teal") || prodColor.includes("emerald") || prodColor.includes("pista") || prodColor.includes("olive"))) ||
          (normColor === "wine" && (prodColor.includes("wine") || prodColor.includes("maroon") || prodColor.includes("red") || prodDesc.includes("wine") || prodDesc.includes("maroon"))) ||
          (normColor === "rose" && (prodColor.includes("pink") || prodColor.includes("rose") || prodColor.includes("blush") || prodColor.includes("mauve") || prodColor.includes("purple") || prodColor.includes("lavender"))) ||
          (normColor === "gold" && (prodColor.includes("gold") || prodColor.includes("mustard") || prodColor.includes("yellow"))) ||
          (normColor === "rust" && (prodColor.includes("rust") || prodColor.includes("terracotta") || prodColor.includes("orange")));
        if (!matches) return false;
      }

      // 6. Occasion Filter
      if (filters.occasion !== "all" && Array.isArray(p.occasions)) {
        if (!p.occasions.includes(filters.occasion as any)) return false;
      }

      // 7. Price Constraint
      if (p.price > filters.maxPrice) return false;

      // 8. In Stock Constraint
      if (filters.inStockOnly && !p.inStock) return false;

      // 9. Curation Flags
      if (filters.onlyNewArrivals && !p.newArrival) return false;
      if (filters.onlyBestsellers && !p.bestseller) return false;

      return true;
    });
  }, [
    publishedProducts,
    searchParam,
    filters,
    currentSlug,
    resolution,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    return list;
  }, [filteredProducts, sortBy]);

  // Calculate active filter count (excluding default parameters)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all" && !categoryParam) count++;
    if (filters.size !== "all") count++;
    if (filters.color !== "all" && !colorParam) count++;
    if (filters.fabric !== "all" && filters.fabric !== resolution.canonicalFabric && !fabricParam) count++;
    if (filters.occasion !== "all" && !occasionParam) count++;
    if (filters.maxPrice < maxCatalogPrice) count++;
    if (filters.inStockOnly) count++;
    if (filters.onlyNewArrivals && filterParam !== "newArrival") count++;
    if (filters.onlyBestsellers && filterParam !== "bestseller") count++;
    return count;
  }, [filters, categoryParam, colorParam, fabricParam, occasionParam, filterParam, resolution, maxCatalogPrice]);

  const getPageTitle = () => {
    if (searchParam) return `Search Results: "${searchParam}"`;
    if (currentSlug) return resolution.title;
    if (colorParam) {
      const formattedColor = colorParam.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      return `${formattedColor} Collection`;
    }
    if (occasionParam) {
      return "Occasion Collection";
    }
    if (filterParam === "newArrival") return "New Season Arrivals • 2026";
    if (filterParam === "bestseller") return "Bestselling Favorites";
    return "All Products";
  };

  const getPageSubtitle = () => {
    if (resolution.description) return resolution.description;
    return "Explore our complete curated archive of handcrafted sarees, designer co-ord sets, and festive kurta ensembles.";
  };

  return (
    <div className="animate-in fade-in duration-500 pb-28">
      {/* ========================================================================= */}
      {/* 1. HEADER BANNER                                                          */}
      {/* ========================================================================= */}
      <div className="bg-secondary/50 py-10 sm:py-14 border-b border-border">
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

          <div className="max-w-3xl mt-3">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1.5">
              {resolution.subtitle || "HANDCRAFTED IN INDIA"}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-foreground m-0 leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 leading-relaxed max-w-2xl">
              {getPageSubtitle()}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. REFINED FILTER & SORT TOOLBAR                                          */}
      {/* ========================================================================= */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-border">
          
          {/* Left: Filter Trigger Button */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 h-10 px-4 sm:px-5 text-xs font-bold tracking-wider uppercase bg-white border-neutral-300 text-neutral-900 hover:border-brand hover:text-brand transition-colors rounded-xs shadow-2xs min-h-[44px]"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#734E06]" />
              <span>Filter{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}</span>
            </Button>

            {/* Results counter */}
            <span className="text-xs sm:text-sm text-neutral-600 font-medium">
              <strong className="text-neutral-900 font-bold">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {/* Right: Sort & Grid Layout Toggle */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 hidden sm:inline-block">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-10 px-3 bg-white border border-neutral-300 rounded-xs text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-brand focus:ring-1 focus:ring-brand min-h-[44px]"
                aria-label="Sort catalog"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Season</option>
              </select>
            </div>

            {/* Desktop Grid Toggles */}
            <div className="hidden lg:flex items-center gap-1 border-l border-neutral-200 pl-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGridCols(3)}
                className={cn("h-8 w-8 rounded-xs", gridCols === 3 ? "text-brand bg-neutral-100" : "text-neutral-400 hover:text-neutral-700")}
                aria-label="3 columns layout"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGridCols(4)}
                className={cn("h-8 w-8 rounded-xs", gridCols === 4 ? "text-brand bg-neutral-100" : "text-neutral-400 hover:text-neutral-700")}
                aria-label="4 columns layout"
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. ACTIVE FILTER CHIPS                                                    */}
        {/* ========================================================================= */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mr-1">
              Active:
            </span>

            {filters.category !== "all" && !categoryParam && (
              <Badge variant="secondary" className="bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs">
                Category: {filters.category}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-brand"
                  onClick={() => handleApplyFilters({ ...filters, category: "all" })}
                />
              </Badge>
            )}

            {filters.size !== "all" && (
              <Badge variant="secondary" className="bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs">
                Size: {filters.size}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-brand"
                  onClick={() => handleApplyFilters({ ...filters, size: "all" })}
                />
              </Badge>
            )}

            {filters.color !== "all" && !colorParam && (
              <Badge variant="secondary" className="bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs">
                Color: {filters.color}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-brand"
                  onClick={() => handleApplyFilters({ ...filters, color: "all" })}
                />
              </Badge>
            )}

            {filters.fabric !== "all" && filters.fabric !== resolution.canonicalFabric && !fabricParam && (
              <Badge variant="secondary" className="bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs">
                Fabric: {filters.fabric}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-brand"
                  onClick={() => handleApplyFilters({ ...filters, fabric: "all" })}
                />
              </Badge>
            )}

            {filters.occasion !== "all" && !occasionParam && (
              <Badge variant="secondary" className="bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs">
                Occasion: {filters.occasion}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-brand"
                  onClick={() => handleApplyFilters({ ...filters, occasion: "all" })}
                />
              </Badge>
            )}

            {filters.maxPrice < maxCatalogPrice && (
              <Badge variant="secondary" className="bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs">
                Under ₹{filters.maxPrice.toLocaleString("en-IN")}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-brand"
                  onClick={() => handleApplyFilters({ ...filters, maxPrice: maxCatalogPrice })}
                />
              </Badge>
            )}

            {filters.inStockOnly && (
              <Badge variant="secondary" className="bg-neutral-100 border border-neutral-200 text-neutral-800 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs">
                In Stock Only
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-brand"
                  onClick={() => handleApplyFilters({ ...filters, inStockOnly: false })}
                />
              </Badge>
            )}

            <button
              onClick={handleClearFilters}
              className="text-xs text-brand font-bold underline ml-1 hover:text-brand-hover transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. MAIN PRODUCT GRID AREA                                                 */}
        {/* ========================================================================= */}
        <div className="mt-6 sm:mt-8">
          {sortedProducts.length === 0 ? (
            <div className="py-20 px-6 text-center bg-neutral-50 border border-neutral-200 rounded-xs">
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 m-0">
                No products match these filters.
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto mt-3 mb-6 leading-relaxed">
                Try loosening your filter combination or reset all criteria to view the full atelier collection.
              </p>
              <Button
                onClick={handleClearFilters}
                className="bg-[#734E06] hover:bg-[#5C3E05] text-white font-semibold uppercase tracking-wider text-xs px-6 h-11"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Reset All Filters
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-4 sm:gap-5 md:gap-6",
                gridCols === 4
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
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
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. SLIDE-OUT FILTER DRAWER                                                */}
      {/* ========================================================================= */}
      <ShopFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        activeCategories={activeCategories}
        publishedProducts={publishedProducts}
        appliedFilters={filters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        maxCatalogPrice={maxCatalogPrice}
      />
    </div>
  );
};
