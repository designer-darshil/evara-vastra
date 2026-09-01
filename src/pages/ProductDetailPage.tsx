import React, { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ProductCard } from "../components/common/ProductCard";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { cn } from "../lib/utils";

interface ProductDetailPageProps {
  slug: string;
  onNavigate?: (href: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
}) => {
  const { publishedProducts } = useData();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useShop();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  const product = publishedProducts.find((p) => p.slug === slug) || publishedProducts[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Initialize size and color based strictly on real product data
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImageIndex(0);
      
      // Determine sizes from product data
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else if (product.variants && product.variants.length > 0 && product.variants[0].size) {
        setSelectedSize(product.variants[0].size);
      } else {
        setSelectedSize("Free Size");
      }

      // Determine colors only if multiple colors exist
      if (product.colors && product.colors.length > 1) {
        setSelectedColor(product.colors[0]);
      } else if (product.color) {
        setSelectedColor(product.color);
      } else {
        setSelectedColor("");
      }

      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="font-serif text-3xl">Product Not Found</h2>
        <p className="text-neutral-500 mt-2">
          This handcrafted garment may have been archived or is temporarily unlisted.
        </p>
        <button
          onClick={() => handleNav("/shop")}
          className="mt-6 px-6 py-2.5 bg-brand text-brand-foreground font-semibold rounded-sm uppercase tracking-wider text-xs"
        >
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

  const savingsAmount = product.compareAtPrice && product.compareAtPrice > product.price
    ? product.compareAtPrice - product.price
    : 0;

  const discountPercent = product.discountPercentage || (
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0
  );

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor || product.color);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor || product.color);
    handleNav("/checkout");
  };

  // Mobile Gallery Scroll Handler
  const handleMobileGalleryScroll = () => {
    if (mobileScrollRef.current) {
      const { scrollLeft, offsetWidth } = mobileScrollRef.current;
      if (offsetWidth > 0) {
        const newIndex = Math.round(scrollLeft / offsetWidth);
        if (newIndex >= 0 && newIndex < product.images.length && newIndex !== activeImageIndex) {
          setActiveImageIndex(newIndex);
        }
      }
    }
  };

  // Scroll to index for mobile thumbnail clicks
  const scrollToMobileIndex = (index: number) => {
    setActiveImageIndex(index);
    if (mobileScrollRef.current) {
      const width = mobileScrollRef.current.offsetWidth;
      mobileScrollRef.current.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
    }
  };

  const relatedProducts = publishedProducts
    .filter((p: Product) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Available distinct colors from actual product data
  const hasMultipleColors = product.colors && product.colors.length > 1;

  return (
    <div className="bg-white text-neutral-900 animate-in fade-in duration-300 pb-20">
      {/* Lightbox Focused Image Viewer Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/95 z-lightbox flex items-center justify-center p-4 sm:p-8"
          style={{ zIndex: 80 }}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Lightbox Counter */}
          {product.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-xs font-mono bg-white/10 px-3 py-1 rounded-sm tracking-widest pointer-events-none z-20">
              {activeImageIndex + 1} / {product.images.length}
            </div>
          )}

          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const prev = activeImageIndex > 0 ? activeImageIndex - 1 : product.images.length - 1;
                  setActiveImageIndex(prev);
                  scrollToMobileIndex(prev);
                }}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 text-white w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = activeImageIndex < product.images.length - 1 ? activeImageIndex + 1 : 0;
                  setActiveImageIndex(next);
                  scrollToMobileIndex(next);
                }}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 text-white w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <img
            src={product.images[activeImageIndex]}
            alt={product.title}
            className="max-h-[85dvh] max-w-[90vw] object-contain transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: product.category ? product.category.replace("-", " ") : "Shop", href: `/shop?category=${product.category}` },
            { label: product.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Main Product Layout: Left Gallery | Right Purchasing Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mt-4 sm:mt-6">
          
          {/* ========================================================= */}
          {/* GALLERY COLUMN (lg: 7 cols)                               */}
          {/* Mobile: Full-width swipeable carousel with "1 / 9" counter */}
          {/* Desktop: High-definition thumbnail rail + stage view       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 w-full min-w-0">
            
            {/* 1. MOBILE-ONLY SWIPE GALLERY (< md breakpoint) */}
            <div className="md:hidden w-full relative">
              {/* Full-width swipe container with CSS scroll snap */}
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileGalleryScroll}
                className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x rounded-xs bg-neutral-100 border border-neutral-200"
                style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
              >
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 snap-center relative aspect-[3/4] flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIsLightboxOpen(true);
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = product.images[0] || "";
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Image Counter Badge (e.g., "1 / 9") */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 right-3 z-10 bg-black/65 text-white text-[11px] font-mono px-2.5 py-0.5 rounded-sm tracking-wider pointer-events-none shadow-xs">
                  {activeImageIndex + 1} / {product.images.length}
                </div>
              )}

              {/* Mobile Discount Tag on top-left */}
              {discountPercent > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-brand text-brand-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs pointer-events-none">
                  {discountPercent}% OFF
                </div>
              )}

              {/* Mobile Expand / Zoom Button on bottom-left */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Expand image"
                className="absolute bottom-3 left-3 z-10 w-8 h-8 rounded-full bg-white/90 text-neutral-800 shadow-sm flex items-center justify-center hover:bg-white"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Subtle Next/Prev Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  {activeImageIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => scrollToMobileIndex(activeImageIndex - 1)}
                      aria-label="Previous product image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/80 text-neutral-800 shadow-xs flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  {activeImageIndex < product.images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => scrollToMobileIndex(activeImageIndex + 1)}
                      aria-label="Next product image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/80 text-neutral-800 shadow-xs flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}

              {/* Mobile Horizontal Thumbnail Strip Below Main Image */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2.5 pb-1 w-full">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToMobileIndex(idx)}
                      className={cn(
                        "aspect-[3/4] w-14 shrink-0 overflow-hidden rounded-xs cursor-pointer transition-all border-2",
                        activeImageIndex === idx
                          ? "border-brand opacity-100 shadow-2xs"
                          : "border-neutral-200 opacity-60 hover:opacity-100"
                      )}
                    >
                      <img
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. DESKTOP GALLERY (>= md breakpoint) */}
            <div className="hidden md:flex flex-row gap-4 items-start w-full">
              {/* Desktop Thumbnails Column */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[640px] no-scrollbar w-20 shrink-0 pr-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xs cursor-pointer transition-all border-2",
                        activeImageIndex === idx
                          ? "border-brand opacity-100 shadow-2xs"
                          : "border-neutral-200 opacity-70 hover:opacity-100"
                      )}
                    >
                      <img
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Desktop Main Stage View */}
              <div className="relative aspect-[3/4] flex-1 bg-neutral-100 overflow-hidden rounded-sm border border-neutral-200 group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Expand Lightbox Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Expand image"
                  className="absolute bottom-3 right-3 w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-white/90 text-neutral-800 shadow-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Desktop Discount Tag */}
                {discountPercent > 0 && (
                  <div className="absolute top-3 left-3 bg-brand text-brand-foreground text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-xs">
                    {discountPercent}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Purchasing Area (lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Title & Reviews */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug font-bold m-0 mb-1.5">
                {product.title}
              </h1>

              {/* Rating / Review Summary */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-700">
                  4.9
                </span>
                <span className="text-xs text-neutral-400">
                  (48 verified reviews)
                </span>
              </div>

              {/* Price & Savings Hierarchy */}
              <div className="flex items-baseline gap-3 pt-1 border-t border-neutral-100">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif">
                  {formattedPrice}
                </span>

                {formattedComparePrice && (
                  <span className="text-base text-neutral-400 line-through">
                    {formattedComparePrice}
                  </span>
                )}

                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs">
                    Save ₹{savingsAmount > 0 ? savingsAmount.toLocaleString("en-IN") : ""} ({discountPercent}% OFF)
                  </span>
                )}
              </div>

              {/* Inclusive of Taxes Message */}
              <p className="text-xs text-neutral-500 mt-1 m-0">
                Inclusive of all taxes • Free Shipping Across India
              </p>

              {/* Inventory State */}
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock • Ready to Dispatch from Surat Atelier</span>
              </div>
            </div>

            {/* Size Selector (Dynamic from real product data) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-3 border-t border-neutral-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Size: <span className="text-brand ml-1 font-semibold">{selectedSize}</span>
                  </label>
                  <span className="text-xs text-neutral-500">Regular Indian Fit</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={cn(
                        "min-w-[44px] min-h-[44px] px-3.5 py-2 text-xs font-semibold rounded-xs border transition-colors flex items-center justify-center",
                        selectedSize === sz
                          ? "border-brand bg-brand text-brand-foreground shadow-xs"
                          : "border-neutral-300 bg-white text-neutral-800 hover:border-brand"
                      )}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector (Rendered ONLY if product has multiple colors) */}
            {hasMultipleColors && product.colors && (
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                  Color: <span className="text-brand ml-1 font-semibold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={cn(
                        "min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors",
                        selectedColor === col
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-neutral-300 bg-white text-neutral-800 hover:border-brand"
                      )}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-3 border-t border-neutral-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                Quantity
              </label>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-300 bg-white rounded-xs h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-full flex items-center justify-center text-base font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-neutral-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-10 h-full flex items-center justify-center text-base font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                  className={cn(
                    "h-11 w-11 min-h-[44px] min-w-[44px] rounded-xs border flex items-center justify-center transition-colors shrink-0",
                    isSaved ? "bg-brand/10 border-brand text-brand" : "bg-white border-neutral-300 text-neutral-700 hover:border-brand hover:text-brand"
                  )}
                  title={isSaved ? "In Wishlist" : "Save to Wishlist"}
                >
                  <Heart className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now Actions */}
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-12 min-h-[44px] bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold tracking-widest uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full h-12 min-h-[44px] bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold tracking-widest uppercase rounded-xs transition-colors shadow-xs cursor-pointer"
              >
                Buy It Now
              </button>

              {addedNotice && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xs text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" />
                  Item successfully added to your shopping bag!
                </div>
              )}
            </div>

            {/* Basic Product Summary (Fabric, Sizes, Fit, Occasion) */}
            <div className="mt-2 p-4 bg-neutral-50 rounded-xs border border-neutral-200 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px] font-bold">Fabric</span>
                  <span className="font-semibold text-neutral-900">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px] font-bold">Available Sizes</span>
                  <span className="font-semibold text-neutral-900">
                    {product.sizes && product.sizes.length > 0 ? product.sizes.join(", ") : "Free Size"}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px] font-bold">Fit Type</span>
                  <span className="font-semibold text-neutral-900">{product.details?.fit || "Comfortable & Regular Fit"}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px] font-bold">Occasion</span>
                  <span className="font-semibold text-neutral-900">
                    {product.details?.occasion || (product.occasions && product.occasions.length > 0 ? product.occasions.join(" / ") : "Festive & Daily Luxury")}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100 text-center text-[11px] text-neutral-600">
              <div className="p-2 bg-neutral-50 rounded-xs flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-brand" />
                <span>Free Shipping</span>
              </div>
              <div className="p-2 bg-neutral-50 rounded-xs flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-brand" />
                <span>COD Available</span>
              </div>
              <div className="p-2 bg-neutral-50 rounded-xs flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-brand" />
                <span>7-Day Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Details Section */}
        <div className="mt-14 sm:mt-16 border-t border-neutral-200 pt-8 sm:pt-10">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
              Product Description & Craft Details
            </h2>
            
            <div className="text-sm text-neutral-700 leading-relaxed space-y-4">
              <p>{product.description}</p>
              
              {product.shortDescription && product.shortDescription !== product.description && (
                <p className="text-neutral-600 italic">{product.shortDescription}</p>
              )}

              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                  Garment Specifications
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <li><strong>Fabric:</strong> {product.fabric}</li>
                  <li><strong>Primary Color:</strong> {product.color}</li>
                  <li><strong>Package Contains:</strong> {product.details?.packageDetails || "1 Complete Outfit / Set"}</li>
                  {product.details?.care && <li><strong>Wash Care:</strong> {product.details.care}</li>}
                  <li><strong>Craft Heritage:</strong> {product.craft || "Surat Handloom & Tailoring"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 border-t border-neutral-200 pt-10 sm:pt-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold m-0">
                You May Also Like
              </h2>
              <button
                onClick={() => handleNav(`/shop?category=${product.category}`)}
                className="text-xs font-bold text-brand hover:underline uppercase tracking-wider"
              >
                View More →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
