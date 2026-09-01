import React from "react";
import { Product } from "../../types";
import { useShop } from "../../context/ShopContext";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
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
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useShop();
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

  const handleCardClick = () => {
    const href = `/products/${product.slug}`;
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isLowStock = product.inventoryCount <= 3 && product.inventoryCount > 0;
  const isOutOfStock = !product.inStock || product.inventoryCount <= 0;

  return (
    <article
      className="group relative flex flex-col cursor-pointer"
      onClick={handleCardClick}
      data-cursor="VIEW"
      style={{ animationDelay: `${(index % 8) * 0.06}s` }}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-3 rounded-sm">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 ease-out"
        />

        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} detail`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {isOutOfStock ? (
            <Badge variant="destructive" className="text-[10px] py-0 px-2 rounded-sm uppercase tracking-widest font-bold">Sold Out</Badge>
          ) : isLowStock ? (
            <Badge variant="evara" className="text-[10px] py-0 px-2">Only {product.inventoryCount} Left</Badge>
          ) : product.bestseller ? (
            <Badge variant="evara" className="text-[10px] py-0 px-2">Bestseller</Badge>
          ) : product.newArrival ? (
            <Badge variant="secondary" className="text-[10px] py-0 px-2 rounded-sm uppercase tracking-widest font-bold">New Season</Badge>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isSaved ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          className={cn(
            "absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm border",
            isSaved ? "bg-white border-border text-brand" : "bg-white/90 border-border/50 text-foreground hover:bg-white hover:scale-105"
          )}
        >
          <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} strokeWidth={isSaved ? 0 : 2} />
        </button>

        {/* Hover Quick Action Drawer */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 p-2 flex gap-1 z-20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
            <Button
              onClick={handleQuickAdd}
              className="flex-1 h-9 text-xs rounded-sm bg-white text-foreground hover:bg-brand hover:text-brand-foreground transition-colors"
              variant="outline"
            >
              <ShoppingBag className="h-3 w-3 mr-1.5" /> Quick Add
            </Button>
            <Button
              onClick={handleQuickViewClick}
              size="icon"
              className="h-9 w-9 rounded-sm bg-white text-foreground hover:bg-brand hover:text-brand-foreground transition-colors"
              variant="outline"
              title="Quick Preview"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Product Metadata Details */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand">
          {product.fabric} • {product.color}
        </span>

        {/* 2-line clamped title for uniform grid alignment */}
        <h3
          className="text-sm font-medium text-foreground leading-snug m-0 line-clamp-2 min-h-[2.6rem]"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price & Discount Hierarchy */}
        <div className="flex items-center gap-2 flex-wrap mt-0.5">
          <span className="text-sm font-bold text-foreground">
            {formattedPrice}
          </span>
          {formattedComparePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formattedComparePrice}
            </span>
          )}
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <span className="text-[10px] font-bold text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 px-1.5 py-0.5 rounded-sm">
              {product.discountPercentage}% OFF
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};
