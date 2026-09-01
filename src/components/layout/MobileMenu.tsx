import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import {
  X,
  ChevronDown,
  Phone,
  MapPin,
  Heart,
  ShoppingBag,
  User,
  Sparkles,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { activeCategories, activeCollections, siteSettings } = useData();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  // Close on Escape key & manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLink = (href: string) => {
    onClose();
    onNavigate(href);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex justify-start bg-black/60 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div
        className="relative w-[85%] max-w-[340px] h-full bg-white text-foreground shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="min-w-0 pr-2">
              <span className="font-serif text-lg font-bold tracking-[0.14em] text-foreground block truncate">
                {siteSettings.name || "EVARA VASTRA"}
              </span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-brand font-bold block mt-0.5">
                CONTEMPORARY LUXURY
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] rounded-sm text-foreground hover:text-brand hover:bg-secondary transition-colors"
            >
              <X className="h-6 w-6 stroke-[1.75]" />
            </button>
          </div>

          {/* Quick Commerce Action Bar */}
          <div className="grid grid-cols-3 border-b border-border bg-secondary/30 text-center">
            <button
              onClick={() => handleLink("/account")}
              className="flex flex-col items-center justify-center py-3 min-h-[48px] hover:text-brand transition-colors text-xs font-medium border-r border-border"
            >
              <User className="h-4 w-4 mb-1" />
              <span>Account</span>
            </button>
            <button
              onClick={() => handleLink("/wishlist")}
              className="flex flex-col items-center justify-center py-3 min-h-[48px] hover:text-brand transition-colors text-xs font-medium border-r border-border"
            >
              <Heart className="h-4 w-4 mb-1" />
              <span>Wishlist</span>
            </button>
            <button
              onClick={() => handleLink("/cart")}
              className="flex flex-col items-center justify-center py-3 min-h-[48px] hover:text-brand transition-colors text-xs font-medium"
            >
              <ShoppingBag className="h-4 w-4 mb-1" />
              <span>Bag</span>
            </button>
          </div>

          {/* Primary Navigation List */}
          <div className="p-3 flex flex-col gap-1">
            {/* Shop All */}
            <button
              onClick={() => handleLink("/shop")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-semibold tracking-wider uppercase text-foreground hover:text-brand hover:bg-secondary/50 rounded-sm transition-colors"
            >
              Shop All Catalog
            </button>

            {/* Categories Accordion */}
            <div className="border-t border-border/60 pt-1">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center justify-between text-sm font-semibold tracking-wider uppercase text-foreground hover:text-brand rounded-sm transition-colors"
              >
                <span>Silhouettes & Weaves</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 text-muted-foreground",
                    isCategoriesOpen && "rotate-180"
                  )}
                />
              </button>

              {isCategoriesOpen && (
                <div className="pl-4 pr-2 py-1 flex flex-col gap-0.5 border-l-2 border-brand/30 ml-3 mb-2">
                  <button
                    onClick={() => handleLink("/shop/sarees")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-muted-foreground hover:text-brand transition-colors"
                  >
                    Sarees
                  </button>
                  <button
                    onClick={() => handleLink("/shop/coord-sets")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-muted-foreground hover:text-brand transition-colors"
                  >
                    Co-ord Sets
                  </button>
                  <button
                    onClick={() => handleLink("/shop/kurta-sets")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-muted-foreground hover:text-brand transition-colors"
                  >
                    Kurta Sets
                  </button>
                  {activeCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleLink(`/shop/${cat.slug}`)}
                      className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-muted-foreground hover:text-brand transition-colors truncate"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Collections Accordion */}
            <div className="border-t border-border/60 pt-1">
              <button
                type="button"
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center justify-between text-sm font-semibold tracking-wider uppercase text-foreground hover:text-brand rounded-sm transition-colors"
              >
                <span>Curated Collections</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 text-muted-foreground",
                    isCollectionsOpen && "rotate-180"
                  )}
                />
              </button>

              {isCollectionsOpen && (
                <div className="pl-4 pr-2 py-1 flex flex-col gap-0.5 border-l-2 border-brand/30 ml-3 mb-2">
                  <button
                    onClick={() => handleLink("/collections")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-semibold text-brand hover:underline transition-colors"
                  >
                    All Collections →
                  </button>
                  {activeCollections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => handleLink(`/collections/${col.slug}`)}
                      className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-muted-foreground hover:text-brand transition-colors truncate"
                    >
                      {col.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Highlights */}
            <button
              onClick={() => handleLink("/shop?filter=newArrival")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-brand hover:bg-secondary/50 rounded-sm transition-colors border-t border-border/60"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>New Season Drops</span>
            </button>

            <button
              onClick={() => handleLink("/shop?filter=sale")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-semibold tracking-wider uppercase text-evara-orange hover:bg-secondary/50 rounded-sm transition-colors"
            >
              Sale & Offers
            </button>

            <button
              onClick={() => handleLink("/account/orders")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium text-foreground hover:text-brand hover:bg-secondary/50 rounded-sm transition-colors border-t border-border/60"
            >
              Track Your Order
            </button>

            <button
              onClick={() => handleLink("/craftsmanship")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium text-foreground hover:text-brand hover:bg-secondary/50 rounded-sm transition-colors"
            >
              Atelier Craftsmanship
            </button>

            <button
              onClick={() => handleLink("/contact")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium text-foreground hover:text-brand hover:bg-secondary/50 rounded-sm transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom Support Footer */}
        <div className="p-4 border-t border-border bg-secondary/20 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5 text-brand shrink-0" />
            <span>Care: +91-92743 44037</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-brand shrink-0" />
            <span>Surat, Gujarat, India</span>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground pt-1 border-t border-border/60">
            <button
              onClick={() => handleLink("/shipping-policy")}
              className="hover:text-brand transition-colors"
            >
              Shipping Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleLink("/replacement-exchange-policy")}
              className="hover:text-brand transition-colors"
            >
              Exchange Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleLink("/privacy-policy")}
              className="hover:text-brand transition-colors"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

