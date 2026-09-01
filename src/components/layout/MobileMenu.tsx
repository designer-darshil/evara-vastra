import React from "react";
import { useData } from "../../context/DataContext";
import { X, Shield } from "lucide-react";

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
  const { activeCategories, siteSettings, isAdminAuthenticated } = useData();

  if (!isOpen) return null;

  const handleLink = (href: string) => {
    onClose();
    onNavigate(href);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 21, 19, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 99999,
        display: "flex",
        justifyContent: "flex-start",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          width: "85%",
          maxWidth: "380px",
          height: "100%",
          overflowY: "auto",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "var(--shadow-elevated)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <span className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {siteSettings.name || "EVARA VASTRA"}
              </span>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-gold)", display: "block" }}>
                CONTEMPORARY INDIAN SAREES
              </span>
            </div>

            <button onClick={onClose} aria-label="Close menu" style={{ color: "var(--text-primary)" }}>
              <X size={22} />
            </button>
          </div>

          {/* Nav List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <button
              onClick={() => handleLink("/shop")}
              style={{
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              All Sarees
            </button>

            {/* Categories */}
            <div style={{ paddingLeft: "0.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--accent-gold)" }}>
                Master Categories
              </span>
              {activeCategories.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleLink(`/shop/${cat.slug}`)}
                  style={{ textAlign: "left", fontSize: "0.875rem", color: "var(--text-secondary)" }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleLink("/collections")}
              style={{
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Collections
            </button>

            <button
              onClick={() => handleLink("/craftsmanship")}
              style={{
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Artisanal Craftsmanship
            </button>

            <button
              onClick={() => handleLink("/lookbook")}
              style={{
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Campaign Lookbook
            </button>

            <button
              onClick={() => handleLink("/about")}
              style={{
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Our Story & Atelier
            </button>

            <button
              onClick={() => handleLink("/contact")}
              style={{
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Atelier Appointments
            </button>
          </div>
        </div>

        {/* Bottom Client Actions & Admin Link */}
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            onClick={() => handleLink("/account")}
            style={{ textAlign: "left", fontSize: "0.85rem", color: "var(--text-secondary)" }}
          >
            My Client Account
          </button>
          <button
            onClick={() => handleLink("/orders")}
            style={{ textAlign: "left", fontSize: "0.85rem", color: "var(--text-secondary)" }}
          >
            Order Tracking
          </button>
          <button
            onClick={() => handleLink("/wishlist")}
            style={{ textAlign: "left", fontSize: "0.85rem", color: "var(--text-secondary)" }}
          >
            Saved Pieces
          </button>
          <button
            onClick={() => handleLink(isAdminAuthenticated ? "/admin" : "/admin/login")}
            style={{
              textAlign: "left",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--accent-wine)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "0.5rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <Shield size={13} />
            <span>{isAdminAuthenticated ? "Atelier Admin Dashboard" : "Atelier Admin Portal"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
