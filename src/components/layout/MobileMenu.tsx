import React, { useEffect } from "react";
import { useData } from "../../context/DataContext";
import { X, Shield, Phone, MapPin } from "lucide-react";

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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
        backgroundColor: "rgba(23, 21, 19, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 99999,
        display: "flex",
        justifyContent: "flex-start",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          width: "88%",
          maxWidth: "380px",
          height: "100%",
          overflowY: "auto",
          padding: "1.75rem 1.25rem",
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
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <span className="font-serif" style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-primary)" }}>
                {siteSettings.name || "EVARA VASTRA"}
              </span>
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-gold)", display: "block", marginTop: "0.1rem" }}>
                CONTEMPORARY INDIAN WOMENSWEAR
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              style={{
                color: "var(--text-primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "44px",
                minHeight: "44px",
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Quick Category Navigation */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <button
              onClick={() => handleLink("/shop")}
              style={{
                textAlign: "left",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                padding: "0.6rem 0.5rem",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Shop All Products
            </button>

            {/* Individual Categories */}
            <div style={{ paddingLeft: "0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem", borderLeft: "2px solid var(--accent-wine-subtle)", marginLeft: "0.5rem", marginBottom: "0.75rem" }}>
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleLink(`/shop/${cat.slug}`)}
                  style={{
                    textAlign: "left",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    padding: "0.45rem 0.5rem",
                    minHeight: "40px",
                    display: "flex",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {cat.name}
                </button>
              ))}
              <button
                onClick={() => handleLink("/shop?filter=newArrival")}
                style={{
                  textAlign: "left",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--accent-wine)",
                  padding: "0.45rem 0.5rem",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ★ New Season Drops
              </button>
            </div>

            <button
              onClick={() => handleLink("/collections")}
              style={{
                textAlign: "left",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                padding: "0.6rem 0.5rem",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Curated Collections
            </button>

            <button
              onClick={() => handleLink("/orders")}
              style={{
                textAlign: "left",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                padding: "0.6rem 0.5rem",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Track Your Order
            </button>

            <button
              onClick={() => handleLink("/about")}
              style={{
                textAlign: "left",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                padding: "0.6rem 0.5rem",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Our Story & Heritage
            </button>

            <button
              onClick={() => handleLink("/contact")}
              style={{
                textAlign: "left",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                padding: "0.6rem 0.5rem",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Customer Care & Contact
            </button>
          </div>
        </div>

        {/* Bottom Support & Admin Link */}
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem", marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            <Phone size={14} style={{ color: "var(--accent-wine)" }} />
            <span>Care: +91-92743 44037</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            <MapPin size={14} style={{ color: "var(--accent-wine)" }} />
            <span>Surat, Gujarat, India</span>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <button onClick={() => handleLink("/shipping")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}>
              Shipping
            </button>
            <span>•</span>
            <button onClick={() => handleLink("/returns")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}>
              Exchange
            </button>
            <span>•</span>
            <button onClick={() => handleLink("/privacy")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}>
              Privacy
            </button>
          </div>

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
              padding: "0.6rem 0",
              minHeight: "44px",
              borderTop: "1px dashed var(--border-subtle)",
              background: "none",
              cursor: "pointer",
            }}
          >
            <Shield size={14} />
            <span>{isAdminAuthenticated ? "Atelier Admin Dashboard" : "Atelier Admin Portal"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
