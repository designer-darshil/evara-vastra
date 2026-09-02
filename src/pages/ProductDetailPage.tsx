import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ProductCard } from "../components/common/ProductCard";
import { ProductGallery } from "../components/product/ProductGallery";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
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
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

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

  const relatedProducts = publishedProducts
    .filter((p: Product) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Available distinct colors from actual product data
  const hasMultipleColors = product.colors && product.colors.length > 1;

  return (
    <div className="bg-white text-neutral-900 animate-in fade-in duration-300 pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            {
              label: product.category ? product.category.replace("-", " ") : "Shop",
              href: `/shop?category=${product.category}`,
            },
            { label: product.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Main Product Layout: Left Gallery | Right Purchasing Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mt-4 sm:mt-6">
          {/* GALLERY COLUMN (lg: 7 cols) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <ProductGallery
              images={product.images}
              title={product.title}
              discountPercent={discountPercent}
              activeImageIndex={activeImageIndex}
              onSelectImage={setActiveImageIndex}
            />
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
