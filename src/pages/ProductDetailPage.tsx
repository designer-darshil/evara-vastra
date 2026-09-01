import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ProductCard } from "../components/common/ProductCard";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
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
  const [activeTab, setActiveTab] = useState<"details" | "craft" | "shipping">("details");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Initialize size and color
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImageIndex(0);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Free Size");
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : "Multicolor");
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="font-serif text-3xl">Product Not Found</h2>
        <p className="text-muted-foreground mt-2">
          This handcrafted garment may have been archived or is temporarily unlisted.
        </p>
        <Button onClick={() => handleNav("/shop")} className="mt-6">
          Explore Full Catalog
        </Button>
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

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    handleNav("/checkout");
  };

  const checkDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && !isNaN(Number(pincode))) {
      setPincodeStatus("Serviceable: Express courier delivery in 2–4 business days via Blue Dart Express with Free Shipping.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const relatedProducts = publishedProducts
    .filter((p: Product) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hi Evara Vastra! I am interested in "${product.title}" (₹${product.price}). Is this currently available in size ${selectedSize}?`
  );

  return (
    <div className="animate-in fade-in duration-500 pb-28">
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[999999] flex items-center justify-center p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 text-white w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
            }}
            aria-label="Previous image"
            className="absolute left-6 text-white w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={product.images[activeImageIndex]}
            alt={product.title}
            className="max-h-[90vh] max-w-[85vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
            }}
            aria-label="Next image"
            className="absolute right-6 text-white w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className="container pt-8">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/shop/${product.category}` },
            { label: product.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-start mt-6">
          {/* Gallery Column */}
          <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 max-h-[680px] overflow-y-auto no-scrollbar pb-2 pr-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={cn(
                    "aspect-[3/4] w-full overflow-hidden rounded-sm cursor-pointer transition-all duration-200 border-2",
                    activeImageIndex === idx ? "border-accent opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage View */}
            <div className="relative aspect-[3/4] bg-secondary overflow-hidden shadow-md rounded-md">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              <button
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Expand image"
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center text-foreground shadow-sm hover:scale-105 transition-transform"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discountPercentage ? (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground font-bold tracking-widest text-[10px] px-2.5 py-1 rounded-sm">
                    {product.discountPercentage}% OFF
                  </Badge>
                ) : null}
                {product.details?.blousePiece && (
                  <Badge className="bg-background text-foreground font-bold tracking-widest text-[10px] px-2.5 py-1 rounded-sm shadow-md">
                    BLOUSE INCLUDED
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right Product Details Column */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] tracking-[0.14em] uppercase text-accent font-bold">
                  SKU: {product.sku || "EV-VAS-100"}
                </span>
                <span className="text-[11px] text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock • Ready to Dispatch
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl leading-tight text-foreground m-0 mb-2">
                {product.title}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-3xl font-bold text-foreground">
                  {formattedPrice}
                </span>
                {formattedComparePrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formattedComparePrice}
                  </span>
                )}
                {product.discountPercentage ? (
                  <span className="text-sm font-bold text-accent">
                    ({product.discountPercentage}% OFF)
                  </span>
                ) : null}
              </div>

              <div className="bg-accent/5 border border-accent/15 px-3.5 py-2 rounded-sm mt-3 text-xs text-accent flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get 10% Instant Discount on Prepaid UPI & Card Orders!</span>
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wide">
                    Select Size: <span className="text-accent ml-1">{selectedSize}</span>
                  </label>
                  <span className="text-xs text-muted-foreground">Standard Indian Fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={cn(
                        "px-4 py-2 text-[13px] font-semibold rounded-sm border transition-colors",
                        selectedSize === sz
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border bg-background text-foreground hover:border-accent/50"
                      )}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-2">
                  Color Shade: <span className="text-accent ml-1">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={cn(
                        "px-3.5 py-1.5 text-xs rounded-sm border transition-colors font-semibold",
                        selectedColor === col
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border bg-background text-foreground hover:border-accent/50"
                      )}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex gap-4 h-12">
                {/* Quantity */}
                <div className="flex items-center border border-border bg-background rounded-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 text-lg text-foreground hover:bg-secondary/50 h-full transition-colors"
                  >
                    -
                  </button>
                  <span className="px-2 font-semibold text-[15px] w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 text-lg text-foreground hover:bg-secondary/50 h-full transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  variant="secondary"
                  className="flex-1 h-full font-semibold rounded-sm gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </Button>

                {/* Wishlist Button */}
                <Button
                  onClick={() => toggleWishlist(product.id)}
                  variant="outline"
                  size="icon"
                  className={cn("w-12 h-12 rounded-sm shrink-0 border-border", isSaved ? "text-accent" : "text-foreground")}
                >
                  <Heart className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
                </Button>
              </div>

              {/* Buy Now Primary Button */}
              <Button
                onClick={handleBuyNow}
                className="w-full h-12 text-[15px] font-bold tracking-widest uppercase rounded-sm"
              >
                Buy Now (Free Express Shipping)
              </Button>

              {/* WhatsApp Concierge Inquiry */}
              <a
                href={`https://wa.me/919274344037?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400 border border-green-100 dark:border-green-900 rounded-sm text-[13px] font-semibold transition-colors hover:bg-green-100 dark:hover:bg-green-900/60"
              >
                <MessageCircle className="w-4 h-4" /> Ask Questions on WhatsApp (+91-92743 44037)
              </a>
            </div>

            {/* Pincode Estimator */}
            <div className="p-5 bg-secondary/50 rounded-sm border border-border mt-2">
              <div className="flex items-center gap-1.5 mb-2 text-sm font-bold">
                <Truck className="w-4 h-4 text-accent" /> Check Pincode Delivery
              </div>
              <form onSubmit={checkDelivery} className="flex gap-2">
                <Input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN code..."
                  className="flex-1 h-10 rounded-sm"
                />
                <Button type="submit" className="px-5 h-10 rounded-sm">
                  Check
                </Button>
              </form>
              {pincodeStatus && (
                <p className={cn("mt-2 text-xs font-semibold", pincodeStatus.startsWith("Serviceable") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-accent shrink-0" />
                <span>Free Shipping Pan India</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Cash on Delivery Available</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <RotateCcw className="w-4 h-4 text-accent shrink-0" />
                <span>7-Day Easy Exchange</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-4 h-4 text-accent shrink-0" />
                <span>Surat Craft Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Description Tabs */}
        <div className="mt-20 border-t pt-10">
          <div className="flex gap-8 border-b mb-8">
            <button
              onClick={() => setActiveTab("details")}
              className={cn(
                "pb-3 text-[15px] font-bold transition-colors border-b-2",
                activeTab === "details" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab("craft")}
              className={cn(
                "pb-3 text-[15px] font-bold transition-colors border-b-2",
                activeTab === "craft" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Fabric & Care
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={cn(
                "pb-3 text-[15px] font-bold transition-colors border-b-2",
                activeTab === "shipping" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Delivery & Returns
            </button>
          </div>

          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground">
              <div>
                <h4 className="text-foreground font-semibold mb-3">Design & Weave Details</h4>
                <p className="leading-relaxed mb-4">{product.description}</p>
                <ul className="flex flex-col gap-2">
                  <li><strong className="font-semibold text-foreground">Category:</strong> {product.category.toUpperCase()}</li>
                  <li><strong className="font-semibold text-foreground">Fabric:</strong> {product.fabric}</li>
                  <li><strong className="font-semibold text-foreground">Craft Work:</strong> {product.craft}</li>
                  <li><strong className="font-semibold text-foreground">Primary Color:</strong> {product.color}</li>
                </ul>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-3">Package & Sizing</h4>
                <ul className="flex flex-col gap-2">
                  <li><strong className="font-semibold text-foreground">Package Contains:</strong> {product.details?.packageDetails || "1 Complete Garment Set"}</li>
                  {product.details?.length && <li><strong className="font-semibold text-foreground">Garment Length:</strong> {product.details.length}</li>}
                  {product.details?.blouseDescription && <li><strong className="font-semibold text-foreground">Blouse Fabric:</strong> {product.details.blouseDescription}</li>}
                  <li><strong className="font-semibold text-foreground">Origin:</strong> {product.details?.origin || "Surat, Gujarat"}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "craft" && (
            <div className="max-w-[700px] text-sm text-muted-foreground leading-relaxed">
              <h4 className="text-foreground font-semibold mb-2">Wash & Garment Care</h4>
              <p>{product.details?.care || "Dry clean recommended for first wash. Gentle hand wash in cold water with mild detergent. Do not bleach or tumble dry. Iron inside out on moderate heat."}</p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="max-w-[700px] text-sm text-muted-foreground leading-relaxed">
              <h4 className="text-foreground font-semibold mb-2">Shipping & Exchange Guidelines</h4>
              <p>Free Pan-India delivery via insured Blue Dart Express. Orders are dispatched from Surat within 24–48 hours. 7-day hassle-free size exchange window available.</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t pt-12">
            <h2 className="font-serif text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
