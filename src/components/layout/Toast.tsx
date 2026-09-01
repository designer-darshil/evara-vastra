import React from "react";
import { useShop } from "../../context/ShopContext";
import { Check, Heart, ShoppingBag, AlertCircle, X } from "lucide-react";

export const Toast: React.FC = () => {
  const { toasts, dismissToast, isCartDrawerOpen } = useShop();

  if (toasts.length === 0) return null;

  // When cart drawer is open, suppress any cart-type notifications
  const visibleToasts = isCartDrawerOpen
    ? toasts.filter((t) => t.type !== "cart")
    : toasts;

  if (visibleToasts.length === 0) return null;

  return (
    <div
      className="fixed z-toast pointer-events-none transition-all duration-300 flex flex-col gap-2.5
        top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-[360px]"
      role="region"
      aria-label="Notifications"
      style={{ zIndex: 50 }}
    >
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#171513] text-[#F8F4EE] px-4 py-3 rounded-xs shadow-2xl flex items-center justify-between gap-3 text-xs leading-snug border-l-4 border-[#734E06] animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            borderLeftColor:
              toast.type === "wishlist"
                ? "#7C2430"
                : toast.type === "error"
                ? "#DC2626"
                : "#734E06",
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === "cart" && (
              <ShoppingBag className="w-4 h-4 text-[#734E06] shrink-0" />
            )}
            {toast.type === "wishlist" && (
              <Heart className="w-4 h-4 text-[#7C2430] shrink-0 fill-[#7C2430]" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            )}
            {(!toast.type || toast.type === "info") && (
              <Check className="w-4 h-4 text-[#734E06] shrink-0" />
            )}
            <span className="font-medium truncate">{toast.message}</span>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-neutral-400 hover:text-white p-0.5 shrink-0 transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
