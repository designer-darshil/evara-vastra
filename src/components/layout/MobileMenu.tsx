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
  const { siteSettings } = useData();
  const [isSareesOpen, setIsSareesOpen] = useState(false);

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
        className="relative w-[85%] max-w-[340px] h-full bg-white text-neutral-900 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <div className="min-w-0 pr-2">
              <span className="font-serif text-lg font-bold tracking-[0.14em] text-neutral-900 block truncate">
                {siteSettings.name || "EVARA VASTRA"}
              </span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-brand font-bold block mt-0.5">
                CONTEMPORARY LUXURY
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] rounded-sm text-neutral-900 hover:text-brand hover:bg-neutral-100 transition-colors"
            >
              <X className="h-6 w-6 stroke-[1.75]" />
            </button>
          </div>

          {/* Quick Commerce Action Bar */}
          <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 text-center">
            <button
              onClick={() => handleLink("/account")}
              className="flex flex-col items-center justify-center py-3 min-h-[48px] hover:text-brand transition-colors text-xs font-medium border-r border-neutral-200"
            >
              <User className="h-4 w-4 mb-1" />
              <span>Account</span>
            </button>
            <button
              onClick={() => handleLink("/wishlist")}
              className="flex flex-col items-center justify-center py-3 min-h-[48px] hover:text-brand transition-colors text-xs font-medium border-r border-neutral-200"
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

          {/* Primary Navigation List matching Live Evara Vastra IA */}
          <div className="p-3 flex flex-col gap-1">
            {/* Home */}
            <button
              onClick={() => handleLink("/")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-semibold tracking-wider uppercase text-neutral-900 hover:text-brand hover:bg-neutral-50 rounded-sm transition-colors"
            >
              Home
            </button>

            {/* Coord Set */}
            <button
              onClick={() => handleLink("/shop?category=coord-sets")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-semibold tracking-wider uppercase text-neutral-900 hover:text-brand hover:bg-neutral-50 rounded-sm transition-colors border-t border-neutral-100"
            >
              Coord Set
            </button>

            {/* Printed cord-set */}
            <button
              onClick={() => handleLink("/shop?category=coord-sets&fabric=printed")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-semibold tracking-wider uppercase text-neutral-900 hover:text-brand hover:bg-neutral-50 rounded-sm transition-colors border-t border-neutral-100"
            >
              Printed cord-set
            </button>

            {/* Kurta Sets */}
            <button
              onClick={() => handleLink("/shop?category=kurta-sets")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-semibold tracking-wider uppercase text-neutral-900 hover:text-brand hover:bg-neutral-50 rounded-sm transition-colors border-t border-neutral-100"
            >
              Kurta Sets
            </button>

            {/* Everyday Elegance */}
            <button
              onClick={() => handleLink("/shop?category=everyday-elegance")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-semibold tracking-wider uppercase text-neutral-900 hover:text-brand hover:bg-neutral-50 rounded-sm transition-colors border-t border-neutral-100"
            >
              Everyday Elegance
            </button>

            {/* Saree Accordion */}
            <div className="border-t border-neutral-100 pt-1">
              <button
                type="button"
                onClick={() => setIsSareesOpen(!isSareesOpen)}
                className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center justify-between text-sm font-semibold tracking-wider uppercase text-neutral-900 hover:text-brand rounded-sm transition-colors"
              >
                <span>Saree</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 text-neutral-500",
                    isSareesOpen && "rotate-180"
                  )}
                />
              </button>

              {isSareesOpen && (
                <div className="pl-4 pr-2 py-1 flex flex-col gap-0.5 border-l-2 border-brand/30 ml-3 mb-2">
                  <button
                    onClick={() => handleLink("/shop/sarees")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-semibold text-brand hover:underline transition-colors"
                  >
                    All Sarees
                  </button>
                  <button
                    onClick={() => handleLink("/shop/silk")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-neutral-600 hover:text-brand transition-colors"
                  >
                    Pure Silk
                  </button>
                  <button
                    onClick={() => handleLink("/shop/banarasi")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-neutral-600 hover:text-brand transition-colors"
                  >
                    Royal Banarasi
                  </button>
                  <button
                    onClick={() => handleLink("/shop/cotton")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-neutral-600 hover:text-brand transition-colors"
                  >
                    Mulmul & Cotton
                  </button>
                  <button
                    onClick={() => handleLink("/shop/organza")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-neutral-600 hover:text-brand transition-colors"
                  >
                    Sheer Organza
                  </button>
                  <button
                    onClick={() => handleLink("/shop/linen")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-neutral-600 hover:text-brand transition-colors"
                  >
                    Pure Linen
                  </button>
                  <button
                    onClick={() => handleLink("/shop/chanderi")}
                    className="w-full text-left px-2 py-2 min-h-[40px] flex items-center text-xs font-medium text-neutral-600 hover:text-brand transition-colors"
                  >
                    Chanderi
                  </button>
                </div>
              )}
            </div>

            {/* Utility Links */}
            <button
              onClick={() => handleLink("/account/orders")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium text-neutral-800 hover:text-brand hover:bg-neutral-50 rounded-sm transition-colors border-t border-neutral-100"
            >
              Track Your Order
            </button>

            <button
              onClick={() => handleLink("/contact")}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium text-neutral-800 hover:text-brand hover:bg-neutral-50 rounded-sm transition-colors"
            >
              Concierge & Contact
            </button>
          </div>
        </div>

        {/* Bottom Support Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Phone className="h-3.5 w-3.5 text-brand shrink-0" />
            <span>Care: +91-92743 44037</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <MapPin className="h-3.5 w-3.5 text-brand shrink-0" />
            <span>Surat, Gujarat, India</span>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-neutral-500 pt-1 border-t border-neutral-200">
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
