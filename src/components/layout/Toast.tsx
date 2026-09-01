import React from "react";
import { useShop } from "../../context/ShopContext";
import { Check, Heart, ShoppingBag } from "lucide-react";

export const Toast: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: "380px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in"
          style={{
            pointerEvents: "auto",
            backgroundColor: "#171513",
            color: "#F8F4EE",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            borderLeft: `3px solid ${
              toast.type === "wishlist" ? "#7C2430" : "#B18A52"
            }`,
            fontSize: "0.85rem",
            lineHeight: 1.4,
          }}
        >
          {toast.type === "cart" && (
            <ShoppingBag size={18} style={{ color: "#B18A52", flexShrink: 0 }} />
          )}
          {toast.type === "wishlist" && (
            <Heart size={18} style={{ color: "#7C2430", flexShrink: 0, fill: "#7C2430" }} />
          )}
          {toast.type === "info" && (
            <Check size={18} style={{ color: "#B18A52", flexShrink: 0 }} />
          )}
          <span style={{ fontWeight: 500 }}>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
