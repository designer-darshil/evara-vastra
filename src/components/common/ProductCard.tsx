import React from "react";
import { Product } from "../../types";
import { useShop } from "../../context/ShopContext";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  onNavigate?: (href: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onNavigate,
}) => {
  const { toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();

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

  const discountPercent = product.discountPercentage || (
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0
  );

  const handleCardClick = () => {
    const href = `/products/${product.slug}`;
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isLowStock = (product.inventoryCount ?? product.inventory ?? 10) <= 3 && (product.inventoryCount ?? product.inventory ?? 10) > 0;
  const isOutOfStock = !product.inStock || (product.inventoryCount ?? product.inventory ?? 10) <= 0;

  return (
    <article
      className="group relative flex flex-col cursor-pointer"
      onClick={handleCardClick}
      data-cursor="VIEW"
      style={{ animationDelay: `${(index % 8) * 0.06}s` }}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-2.5 rounded-xs border border-neutral-200">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500 ease-out"
        />

        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} detail`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {isOutOfStock ? (
            <span className="text-[9px] py-0.5 px-1.5 rounded-xs uppercase tracking-wider font-bold bg-neutral-900 text-white">
              Sold Out
            </span>
          ) : discountPercent > 0 ? (
            <span className="text-[9px] py-0.5 px-1.5 rounded-xs uppercase tracking-wider font-bold bg-brand text-brand-foreground shadow-2xs">
              {discountPercent}% OFF
            </span>
          ) : isLowStock ? (
            <span className="text-[9px] py-0.5 px-1.5 rounded-xs uppercase tracking-wider font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Low Stock
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isSaved ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          className={cn(
            "absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xs border",
            isSaved
              ? "bg-white border-neutral-300 text-brand"
              : "bg-white/90 border-neutral-200 text-neutral-700 hover:bg-white hover:text-brand hover:scale-105"
          )}
        >
          <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} strokeWidth={isSaved ? 0 : 2} />
        </button>

        {/*
          ============================================================
          COMMENTED OUT: Quick view / complex overlay actions
          Kept available architecturally without cluttering customer UI.
          ============================================================
          <div className="quick-action-drawer">
            <button onClick={handleQuickViewClick}>Quick View</button>
          </div>
        */}
      </div>

      {/* Product Metadata Details */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand">
          {product.fabric} {product.color ? `• ${product.color}` : ""}
        </span>

        {/* 2-line clamped title for uniform grid alignment */}
        <h3
          className="text-xs sm:text-sm font-medium text-neutral-900 leading-snug m-0 line-clamp-2 min-h-[2.4rem] group-hover:text-brand transition-colors"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price & Discount Hierarchy */}
        <div className="flex items-center gap-2 flex-wrap mt-0.5">
          <span className="text-xs sm:text-sm font-bold text-neutral-900">
            {formattedPrice}
          </span>
          {formattedComparePrice && (
            <span className="text-[11px] text-neutral-400 line-through">
              {formattedComparePrice}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded-xs border border-emerald-200">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
