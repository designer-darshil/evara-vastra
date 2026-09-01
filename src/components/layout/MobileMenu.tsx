import React from "react";
import { navigationLinks } from "../../data/navigation";
import { siteConfig } from "../../data/site";
import { X, ArrowRight, Heart, User, ShoppingBag } from "lucide-react";
import { useShop } from "../../context/ShopContext";

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
  const { wishlistCount, cartCount } = useShop();

  if (!isOpen) return null;

  const handleLinkClick = (href: string) => {
    onNavigate(href);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--bg-dark)",
        color: "var(--text-inverse)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.5rem",
        overflowY: "auto",
        animation: "fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--border-dark)",
        }}
      >
        <div>
          <span
            className="font-serif"
            style={{
              fontSize: "1.75rem",
              letterSpacing: "0.08em",
              color: "#F8F4EE",
              fontWeight: 500,
            }}
          >
            {siteConfig.name}
          </span>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent-gold)",
            }}
          >
            {siteConfig.tagline}
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "rgba(248, 244, 238, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F8F4EE",
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Nav Links */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          padding: "2rem 0",
        }}
      >
        {navigationLinks.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => handleLinkClick(item.href)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
                fontFamily: "var(--font-serif)",
                fontSize: "1.85rem",
                color: "#F8F4EE",
                lineHeight: 1.2,
                transition: "color 0.2s ease",
              }}
            >
              <span>{item.label}</span>
              {item.badge ? (
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    backgroundColor: "var(--accent-wine)",
                    padding: "0.2rem 0.5rem",
                  }}
                >
                  {item.badge}
                </span>
              ) : (
                <ArrowRight size={18} style={{ opacity: 0.4 }} />
              )}
            </button>
          </div>
        ))}

        <div
          style={{
            height: "1px",
            backgroundColor: "var(--border-dark)",
            margin: "0.75rem 0",
          }}
        />

        {/* Quick Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            onClick={() => handleLinkClick("/account")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "var(--text-inverse-muted)",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <User size={16} style={{ color: "var(--accent-gold)" }} />
            <span>My Account & Orders</span>
          </button>
          <button
            onClick={() => handleLinkClick("/wishlist")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "var(--text-inverse-muted)",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <Heart size={16} style={{ color: "var(--accent-wine)" }} />
            <span>Saved Pieces ({wishlistCount})</span>
          </button>
          <button
            onClick={() => handleLinkClick("/cart")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "var(--text-inverse-muted)",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <ShoppingBag size={16} style={{ color: "var(--accent-gold)" }} />
            <span>Shopping Bag ({cartCount})</span>
          </button>
        </div>
      </nav>

      {/* Brand Statement Footer */}
      <div
        style={{
          borderTop: "1px solid var(--border-dark)",
          paddingTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <p
          className="font-serif"
          style={{
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--accent-gold)",
          }}
        >
          "{siteConfig.slogan}"
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-inverse-muted)",
          }}
        >
          Mumbai Atelier & Varanasi Weaving Guild
        </p>
      </div>
    </div>
  );
};
