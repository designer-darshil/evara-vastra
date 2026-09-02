import React, { useState, useEffect, useMemo } from "react";
import { X, Check, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Category, Product } from "../../types";
import { fabrics } from "../../data/fabrics";
import { colors, occasions } from "../../data/colors";
import { resolveCategoryOrCollection, matchesCategoryOrCollection } from "../../lib/categoryUtils";

export interface FilterState {
  category: string;
  size: string;
  color: string;
  fabric: string;
  occasion: string;
  maxPrice: number;
  inStockOnly: boolean;
  onlyNewArrivals: boolean;
  onlyBestsellers: boolean;
}

interface ShopFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategories: Category[];
  publishedProducts: Product[];
  appliedFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
  maxCatalogPrice: number;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "Free Size"];

export const ShopFilterDrawer: React.FC<ShopFilterDrawerProps> = ({
  isOpen,
  onClose,
  activeCategories,
  publishedProducts,
  appliedFilters,
  onApplyFilters,
  onClearFilters,
  maxCatalogPrice,
}) => {
  // Local draft state that only commits on "Apply"
  const [draft, setDraft] = useState<FilterState>(appliedFilters);

  // Collapsible section toggles
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: true,
    size: true,
    price: true,
    color: true,
    fabric: false,
    occasion: false,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Synchronize draft state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setDraft(appliedFilters);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, appliedFilters]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Preview match count with current draft filters
  const previewCount = useMemo(() => {
    return publishedProducts.filter((p: Product) => {
      if (draft.category !== "all") {
        const catRes = resolveCategoryOrCollection(draft.category);
        if (!matchesCategoryOrCollection(p, catRes, draft.fabric !== "all" ? draft.fabric : undefined)) {
          return false;
        }
      }
      if (draft.size !== "all") {
        const pSizes = (p.sizes || []).map((s) => s.toUpperCase());
        const variantSizes = (p.variants || []).map((v) => (v.size || "").toUpperCase());
        const target = draft.size.toUpperCase();
        const matches = pSizes.includes(target) || variantSizes.includes(target) || (target === "FREE SIZE" && p.title.toLowerCase().includes("saree"));
        if (!matches) return false;
      }
      if (draft.fabric !== "all") {
        const fab = draft.fabric.toLowerCase();
        const prodFab = (p.fabric || "").toLowerCase();
        const prodTitle = (p.title || "").toLowerCase();
        if (!prodFab.includes(fab) && !prodTitle.includes(fab)) return false;
      }
      if (draft.color !== "all") {
        const normColor = draft.color.toLowerCase();
        const prodColor = (p.color || "").toLowerCase();
        const prodDesc = (p.description || "").toLowerCase();
        const prodTitle = (p.title || "").toLowerCase();
        const matches = prodColor.includes(normColor) || prodDesc.includes(normColor) || prodTitle.includes(normColor);
        if (!matches) return false;
      }
      if (draft.occasion !== "all" && Array.isArray(p.occasions)) {
        if (!p.occasions.includes(draft.occasion as any)) return false;
      }
      if (p.price > draft.maxPrice) return false;
      if (draft.inStockOnly && !p.inStock) return false;
      if (draft.onlyNewArrivals && !p.newArrival) return false;
      if (draft.onlyBestsellers && !p.bestseller) return false;
      return true;
    }).length;
  }, [publishedProducts, draft]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(draft);
    onClose();
  };

  const handleReset = () => {
    const defaultState: FilterState = {
      category: "all",
      size: "all",
      color: "all",
      fabric: "all",
      occasion: "all",
      maxPrice: maxCatalogPrice,
      inStockOnly: false,
      onlyNewArrivals: false,
      onlyBestsellers: false,
    };
    setDraft(defaultState);
    onClearFilters();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-drawer flex justify-end bg-black/60 transition-opacity duration-300"
      style={{ zIndex: 60 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Product Filters"
    >
      <div
        className="relative w-full max-w-[420px] h-[100dvh] max-h-[100dvh] bg-white text-neutral-900 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 border-l border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* 1. DRAWER HEADER                                                          */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 m-0">
              Filter Catalog
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-neutral-100 text-neutral-700">
              {previewCount} {previewCount === 1 ? "match" : "matches"}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close filters"
            className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 rounded-xs text-neutral-800 hover:text-brand hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. DRAWER BODY (Scrollable filter accordion sections)                     */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          
          {/* Section: Category & Silhouette */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("category")}
              className="w-full flex items-center justify-between text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-3"
            >
              <span>Category ({activeCategories.length})</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", openSections.category && "rotate-180")} />
            </button>

            {openSections.category && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, category: "all" }))}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xs border transition-colors min-h-[38px]",
                    draft.category === "all"
                      ? "border-[#734E06] bg-[#734E06]/10 text-[#734E06] font-bold"
                      : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-neutral-700"
                  )}
                >
                  <span>All Products</span>
                  <span className="text-[11px] opacity-75">{publishedProducts.length}</span>
                </button>

                {activeCategories.map((cat) => {
                  const catRes = resolveCategoryOrCollection(cat.slug);
                  const count = publishedProducts.filter((p) => matchesCategoryOrCollection(p, catRes)).length;
                  const isSelected = draft.category === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, category: isSelected ? "all" : cat.slug }))}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xs border transition-colors min-h-[38px]",
                        isSelected
                          ? "border-[#734E06] bg-[#734E06]/10 text-[#734E06] font-bold"
                          : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-neutral-700"
                      )}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] opacity-75 ml-1">{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Size */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("size")}
              className="w-full flex items-center justify-between text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-3"
            >
              <span>Size</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", openSections.size && "rotate-180")} />
            </button>

            {openSections.size && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, size: "all" }))}
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-xs border transition-colors min-w-[42px] min-h-[38px]",
                    draft.size === "all"
                      ? "border-[#734E06] bg-[#734E06] text-white font-bold"
                      : "border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800"
                  )}
                >
                  All
                </button>

                {AVAILABLE_SIZES.map((sz) => {
                  const isSelected = draft.size === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, size: isSelected ? "all" : sz }))}
                      className={cn(
                        "px-3.5 py-2 text-xs font-medium rounded-xs border transition-colors min-w-[44px] min-h-[38px]",
                        isSelected
                          ? "border-[#734E06] bg-[#734E06] text-white font-bold"
                          : "border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800"
                      )}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Price Range */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("price")}
              className="w-full flex items-center justify-between text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-3"
            >
              <span>Price Range</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", openSections.price && "rotate-180")} />
            </button>

            {openSections.price && (
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-xs text-neutral-500 uppercase">Max Budget</span>
                  <span className="text-sm font-bold text-[#734E06]">
                    ₹{draft.maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  type="range"
                  min="1000"
                  max={maxCatalogPrice}
                  step="250"
                  value={draft.maxPrice}
                  onChange={(e) => setDraft((d) => ({ ...d, maxPrice: Number(e.target.value) }))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#734E06]"
                  aria-label="Maximum price filter"
                />

                {/* Quick Price Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: "Under ₹2.5k", val: 2500 },
                    { label: "Under ₹4k", val: 4000 },
                    { label: "Under ₹6k", val: 6000 },
                    { label: "All Prices", val: maxCatalogPrice },
                  ].map((tier) => (
                    <button
                      key={tier.val}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, maxPrice: tier.val }))}
                      className={cn(
                        "text-[11px] px-2.5 py-1 rounded-xs border transition-colors",
                        draft.maxPrice === tier.val
                          ? "border-[#734E06] bg-[#734E06]/10 text-[#734E06] font-bold"
                          : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300"
                      )}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Color Palette */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("color")}
              className="w-full flex items-center justify-between text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-3"
            >
              <span>Color Family</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", openSections.color && "rotate-180")} />
            </button>

            {openSections.color && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {colors.map((c) => {
                  const isSelected = draft.color === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, color: isSelected ? "all" : c.id }))}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xs border transition-colors min-h-[38px]",
                        isSelected
                          ? "border-[#734E06] bg-[#734E06]/10 text-[#734E06] font-bold"
                          : "border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800"
                      )}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white drop-shadow-xs" />}
                      </span>
                      <span className="truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Fabric & Texture */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("fabric")}
              className="w-full flex items-center justify-between text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-3"
            >
              <span>Fabric & Weave</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", openSections.fabric && "rotate-180")} />
            </button>

            {openSections.fabric && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {fabrics.map((f) => {
                  const isSelected = draft.fabric === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, fabric: isSelected ? "all" : f.id }))}
                      className={cn(
                        "text-left px-3 py-2 text-xs font-medium rounded-xs border transition-colors truncate min-h-[38px]",
                        isSelected
                          ? "border-[#734E06] bg-[#734E06]/10 text-[#734E06] font-bold"
                          : "border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700"
                      )}
                    >
                      {f.name.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Occasion */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("occasion")}
              className="w-full flex items-center justify-between text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-3"
            >
              <span>Occasion</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", openSections.occasion && "rotate-180")} />
            </button>

            {openSections.occasion && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {occasions.map((occ) => {
                  const isSelected = draft.occasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, occasion: isSelected ? "all" : occ.id }))}
                      className={cn(
                        "text-left px-3 py-2 text-xs font-medium rounded-xs border transition-colors truncate min-h-[38px]",
                        isSelected
                          ? "border-[#734E06] bg-[#734E06]/10 text-[#734E06] font-bold"
                          : "border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700"
                      )}
                    >
                      {occ.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Availability & Fast Filters */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("availability")}
              className="w-full flex items-center justify-between text-xs font-bold tracking-[0.14em] uppercase text-neutral-900 mb-3"
            >
              <span>Availability & Curation</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform", openSections.availability && "rotate-180")} />
            </button>

            {openSections.availability && (
              <div className="space-y-2.5 pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                  <input
                    type="checkbox"
                    checked={draft.inStockOnly}
                    onChange={(e) => setDraft((d) => ({ ...d, inStockOnly: e.target.checked }))}
                    className="w-4 h-4 rounded-xs border-neutral-300 text-[#734E06] focus:ring-[#734E06]"
                  />
                  <span className="text-xs font-medium text-neutral-800">In Stock Pieces Only</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                  <input
                    type="checkbox"
                    checked={draft.onlyNewArrivals}
                    onChange={(e) => setDraft((d) => ({ ...d, onlyNewArrivals: e.target.checked }))}
                    className="w-4 h-4 rounded-xs border-neutral-300 text-[#734E06] focus:ring-[#734E06]"
                  />
                  <span className="text-xs font-medium text-neutral-800">New Season Arrivals Only</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                  <input
                    type="checkbox"
                    checked={draft.onlyBestsellers}
                    onChange={(e) => setDraft((d) => ({ ...d, onlyBestsellers: e.target.checked }))}
                    className="w-4 h-4 rounded-xs border-neutral-300 text-[#734E06] focus:ring-[#734E06]"
                  />
                  <span className="text-xs font-medium text-neutral-800">Bestselling Favorites Only</span>
                </label>
              </div>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. STICKY FOOTER ACTIONS                                                  */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white grid grid-cols-2 gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="h-11 sm:h-12 text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 border-neutral-300 rounded-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Clear All
          </Button>

          <Button
            type="button"
            onClick={handleApply}
            className="h-11 sm:h-12 text-xs font-bold uppercase tracking-wider bg-[#734E06] hover:bg-[#5C3E05] text-white shadow-sm rounded-sm"
          >
            Apply ({previewCount})
          </Button>
        </div>

      </div>
    </div>
  );
};
