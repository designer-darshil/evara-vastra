import React, { useState, useEffect } from "react";
import { siteConfig } from "../../data/site";
import { navigationLinks } from "../../data/navigation";
import { useShop } from "../../context/ShopContext";
import { Search, Heart, ShoppingBag, Menu, User, ChevronDown } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export const Navbar: React.FC<{ onNavigate: (href: string) => void; currentPath: string }> = ({
  onNavigate,
  currentPath,
}) => {
  const { wishlistCount, cartCount, openSearch, openCartDrawer } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`navbar-root ${isScrolled ? "header-glass" : ""}`}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background-color 0.3s ease, border-color 0.3s ease, padding 0.3s ease",
          padding: isScrolled ? "0.85rem 0" : "1.25rem 0",
          backgroundColor: isScrolled ? "rgba(248, 244, 238, 0.96)" : "var(--bg-primary)",
          borderBottom: isScrolled
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
        }}
      >
        {/* Top Mini Banner */}
        {!isScrolled && (
          <div
            style={{
              backgroundColor: "var(--bg-dark)",
              color: "var(--text-inverse)",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "0.4rem 1rem",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span>Complimentary Insured Shipping Across India</span>
            <span style={{ color: "var(--accent-gold)" }}>•</span>
            <span>Master Artisan Handloom Certified</span>
          </div>
        )}

        <div className="container" style={{ marginTop: !isScrolled ? "0.6rem" : "0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {/* Mobile Menu Button */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="mobile-toggle-wrap">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                style={{
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  color: "var(--text-primary)",
                }}
                className="mobile-menu-btn"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Desktop Navigation Links (Left side) */}
            <nav
              className="desktop-nav"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.75rem",
              }}
            >
              {navigationLinks.map((item) => (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => onNavigate(item.href)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color:
                        currentPath === item.href ||
                        (item.href !== "/" && currentPath.startsWith(item.href))
                          ? "var(--accent-wine)"
                          : "var(--text-primary)",
                      padding: "0.4rem 0",
                      position: "relative",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children && <ChevronDown size={12} />}
                    {item.badge && (
                      <span
                        style={{
                          fontSize: "0.55rem",
                          backgroundColor: "var(--accent-wine)",
                          color: "#ffffff",
                          padding: "0.15rem 0.35rem",
                          borderRadius: "2px",
                          marginLeft: "0.2rem",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Mega / Dropdown Menu */}
                  {item.children && activeDropdown === item.label && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "-1rem",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid var(--border-medium)",
                        boxShadow: "var(--shadow-medium)",
                        padding: "1.25rem 1.5rem",
                        minWidth: "260px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.85rem",
                        zIndex: 100,
                        animation: "fadeIn 0.2s ease-out forwards",
                      }}
                    >
                      {item.children.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => {
                            onNavigate(sub.href);
                            setActiveDropdown(null);
                          }}
                          style={{
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.2rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.825rem",
                              fontWeight: 600,
                              color: "var(--text-primary)",
                            }}
                          >
                            {sub.label}
                          </span>
                          {sub.description && (
                            <span
                              style={{
                                fontSize: "0.7rem",
                                color: "var(--text-secondary)",
                              }}
                            >
                              {sub.description}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Brand Logo (Center) */}
            <div
              onClick={() => onNavigate("/")}
              style={{
                cursor: "pointer",
                textAlign: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <h1
                className="font-serif"
                style={{
                  fontSize: isScrolled ? "1.85rem" : "2.25rem",
                  letterSpacing: "0.08em",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  transition: "font-size 0.3s ease",
                }}
              >
                {siteConfig.name}
              </h1>
              <span
                style={{
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  display: "block",
                  marginTop: "0.15rem",
                }}
              >
                {siteConfig.tagline}
              </span>
            </div>

            {/* Right Action Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              {/* Search */}
              <button
                onClick={openSearch}
                aria-label="Search catalog"
                style={{
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0.4rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              >
                <Search size={19} strokeWidth={1.75} />
              </button>

              {/* Account (Desktop) */}
              <button
                onClick={() => onNavigate("/account")}
                aria-label="Customer Account"
                className="desktop-only"
                style={{
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0.4rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              >
                <User size={19} strokeWidth={1.75} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => onNavigate("/wishlist")}
                aria-label="View Wishlist"
                style={{
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  padding: "0.4rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              >
                <Heart size={19} strokeWidth={1.75} />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-4px",
                      backgroundColor: "var(--accent-wine)",
                      color: "#ffffff",
                      fontSize: "0.6rem",
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

              {/* Cart Bag */}
              <button
                onClick={openCartDrawer}
                aria-label="View Shopping Bag"
                style={{
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  padding: "0.4rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              >
                <ShoppingBag size={19} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-4px",
                      backgroundColor: "var(--text-primary)",
                      color: "#F8F4EE",
                      fontSize: "0.6rem",
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
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={onNavigate}
      />

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-only {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
