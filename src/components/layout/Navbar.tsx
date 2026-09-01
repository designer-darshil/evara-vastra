import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import { useData } from "../../context/DataContext";
import { Search, Heart, ShoppingBag, Menu, User, Shield } from "lucide-react";

interface NavbarProps {
  onNavigate: (href: string) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenMobileMenu }) => {
  const { cartCount, wishlistCount, openSearch, openCartDrawer } = useShop();
  const { siteSettings, isAdminAuthenticated } = useData();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: isScrolled ? "rgba(248, 244, 238, 0.96)" : "var(--bg-primary)",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="container">
        <div
          style={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left Actions / Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1 }}>
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open mobile menu"
              className="mobile-only"
              style={{
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className="desktop-only"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.75rem",
              }}
            >
              <button
                onClick={() => onNavigate("/shop")}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  position: "relative",
                }}
              >
                All Sarees
              </button>

              <button
                onClick={() => onNavigate("/collections")}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                }}
              >
                Collections
              </button>

              <button
                onClick={() => onNavigate("/craftsmanship")}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                }}
              >
                Craftsmanship
              </button>

              <button
                onClick={() => onNavigate("/lookbook")}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                }}
              >
                Lookbook
              </button>

              <button
                onClick={() => onNavigate("/about")}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                }}
              >
                Atelier
              </button>
            </nav>
          </div>

          {/* Center Brand Identity */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => onNavigate("/")}
              aria-label="Evara Vastra Home"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <span
                className="font-serif"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 1.95rem)",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                {siteSettings.name || "EVARA VASTRA"}
              </span>
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  marginTop: "0.25rem",
                  fontWeight: 700,
                }}
              >
                CONTEMPORARY INDIAN SAREES
              </span>
            </button>
          </div>

          {/* Right Functional Utilities */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "1.25rem",
              flex: 1,
            }}
          >
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              aria-label="Search Sarees"
              style={{
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                padding: "0.3rem",
              }}
            >
              <Search size={19} />
            </button>

            {/* Client Account */}
            <button
              onClick={() => onNavigate("/account")}
              aria-label="Client Account"
              className="desktop-only"
              style={{
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                padding: "0.3rem",
              }}
            >
              <User size={19} />
            </button>

            {/* Wishlist Indicator */}
            <button
              onClick={() => onNavigate("/wishlist")}
              aria-label="View Wishlist"
              style={{
                color: "var(--text-primary)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                padding: "0.3rem",
              }}
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-4px",
                    backgroundColor: "var(--accent-wine)",
                    color: "#FFFFFF",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              aria-label="Shopping Bag"
              style={{
                color: "var(--text-primary)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                padding: "0.3rem",
              }}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-4px",
                    backgroundColor: "var(--accent-wine)",
                    color: "#FFFFFF",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Admin Portal Link */}
            <button
              onClick={() => onNavigate(isAdminAuthenticated ? "/admin" : "/admin/login")}
              title={isAdminAuthenticated ? "Open Admin Panel" : "Admin Login"}
              className="desktop-only"
              style={{
                padding: "0.3rem 0.6rem",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                backgroundColor: isAdminAuthenticated ? "var(--accent-wine)" : "rgba(177, 138, 82, 0.15)",
                color: isAdminAuthenticated ? "#FFFFFF" : "var(--accent-gold)",
                border: "1px solid var(--border-medium)",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                cursor: "pointer",
              }}
            >
              <Shield size={12} />
              <span>{isAdminAuthenticated ? "ADMIN" : "PORTAL"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
