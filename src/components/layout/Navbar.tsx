import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { useData } from "../../context/DataContext";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  User,
  Shield,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";

interface NavbarProps {
  onNavigate: (href: string) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenMobileMenu }) => {
  const { cartCount, wishlistCount, openSearch, openCartDrawer, theme, toggleTheme } = useShop();
  const { activeCategories, activeCollections, isAdminAuthenticated } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: isScrolled ? "var(--bg-header-scrolled)" : "var(--bg-header)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-subtle)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="container">
        <div
          style={{
            height: "var(--header-height)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="header-inner"
        >
          {/* Left: Mobile Menu & Primary Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.5rem, 2vw, 1.25rem)", flex: 1 }}>
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open mobile navigation menu"
              className="mobile-only btn-icon"
              style={{
                color: "var(--text-primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
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
                gap: "1.5rem",
              }}
            >
              {/* Mega Menu Trigger */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: "relative" }}
              >
                <button
                  onClick={() => onNavigate("/shop")}
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isMegaMenuOpen ? "var(--accent-wine)" : "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.5rem 0",
                    transition: "color 0.2s ease",
                  }}
                >
                  Shop <ChevronDown size={14} style={{ transform: isMegaMenuOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease" }} />
                </button>

                {/* MEGA MENU DROPDOWN */}
                {isMegaMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "-2rem",
                      width: "860px",
                      backgroundColor: "var(--bg-surface)",
                      boxShadow: "var(--shadow-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "0 0 6px 6px",
                      padding: "2rem",
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1.2fr 1fr 1.4fr",
                      gap: "2rem",
                      zIndex: 1000,
                    }}
                  >
                    {/* Col 1: Shop By Category */}
                    <div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--accent-wine)",
                          display: "block",
                          marginBottom: "0.85rem",
                        }}
                      >
                        CATEGORIES
                      </span>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {activeCategories.map((cat) => (
                          <li key={cat.id}>
                            <button
                              onClick={() => {
                                setIsMegaMenuOpen(false);
                                onNavigate(`/shop/${cat.slug}`);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--text-secondary)",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                padding: 0,
                                textAlign: "left",
                                transition: "color 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                            >
                              {cat.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 2: Curated Collections */}
                    <div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--accent-wine)",
                          display: "block",
                          marginBottom: "0.85rem",
                        }}
                      >
                        COLLECTIONS
                      </span>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {activeCollections.map((col) => (
                          <li key={col.id}>
                            <button
                              onClick={() => {
                                setIsMegaMenuOpen(false);
                                onNavigate(`/collections/${col.slug}`);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--text-secondary)",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                padding: 0,
                                textAlign: "left",
                                transition: "color 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                            >
                              {col.title}
                            </button>
                          </li>
                        ))}
                        <li>
                          <button
                            onClick={() => {
                              setIsMegaMenuOpen(false);
                              onNavigate("/collections");
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--accent-gold)",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              padding: "0.2rem 0 0 0",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            All Collections <ArrowRight size={13} />
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Occasions & Edits */}
                    <div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--accent-wine)",
                          display: "block",
                          marginBottom: "0.85rem",
                        }}
                      >
                        DISCOVERY
                      </span>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        <li>
                          <button
                            onClick={() => {
                              setIsMegaMenuOpen(false);
                              onNavigate("/shop?filter=newArrival");
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--accent-wine)",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              padding: 0,
                              textAlign: "left",
                            }}
                          >
                            ★ New Season Drops
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setIsMegaMenuOpen(false);
                              onNavigate("/shop?filter=bestseller");
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--text-secondary)",
                              fontSize: "0.85rem",
                              cursor: "pointer",
                              padding: 0,
                              textAlign: "left",
                            }}
                          >
                            Bestselling Sets
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setIsMegaMenuOpen(false);
                              onNavigate("/about");
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--text-secondary)",
                              fontSize: "0.85rem",
                              cursor: "pointer",
                              padding: 0,
                              textAlign: "left",
                            }}
                          >
                            Our Heritage Story
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 4: Visual Spotlight Card */}
                    <div
                      style={{
                        backgroundColor: "var(--bg-surface-subtle)",
                        padding: "1.25rem",
                        borderRadius: "4px",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-wine)", marginBottom: "0.4rem" }}>
                          <Sparkles size={14} />
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                            ATELIER SPOTLIGHT
                          </span>
                        </div>
                        <h4 className="font-serif" style={{ fontSize: "1.15rem", margin: "0 0 0.4rem 0", color: "var(--text-primary)" }}>
                          Aurelia Fendy Satin Saree
                        </h4>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.4, margin: "0 0 1rem 0" }}>
                          Heavy Resham & Zari Cutwork embroidery in vibrant festive shades.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsMegaMenuOpen(false);
                          onNavigate("/product/aurelia-saree-floral-embroidery-fendy-satin-saree-collection");
                        }}
                        className="btn btn-primary"
                        style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", width: "100%" }}
                      >
                        Shop Spotlight Drape
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => onNavigate("/shop/sarees")}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Sarees
              </button>

              <button
                onClick={() => onNavigate("/shop/coord-sets")}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Co-ord Sets
              </button>

              <button
                onClick={() => onNavigate("/shop/kurta-sets")}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Kurta Sets
              </button>

              <button
                onClick={() => onNavigate("/shop?filter=newArrival")}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-wine)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                New In
              </button>
            </nav>
          </div>

          {/* Center Brand Identity */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <button
              onClick={() => onNavigate("/")}
              aria-label="Evara Vastra Home"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem 0",
              }}
            >
              <span
                className="font-serif"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 1.85rem)",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "var(--text-primary)",
                  display: "block",
                  lineHeight: 1.1,
                }}
              >
                EVARA VASTRA
              </span>
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--accent-wine)",
                  display: "block",
                  marginTop: "0.15rem",
                  fontWeight: 700,
                }}
              >
                SURAT • INDIA
              </span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.6rem",
              flex: 1,
            }}
          >
            {/* Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              className="btn-icon"
              style={{
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} style={{ color: "var(--accent-gold)" }} />}
            </button>

            {/* Search */}
            <button
              onClick={openSearch}
              aria-label="Search catalog"
              title="Search"
              className="btn-icon"
              style={{
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate("/wishlist")}
              aria-label={`View wishlist (${wishlistCount} saved)`}
              title="Wishlist"
              className="btn-icon"
              style={{
                position: "relative",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    backgroundColor: "var(--accent-wine)",
                    color: "var(--text-inverse)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    width: "17px",
                    height: "17px",
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

            {/* Account / Track Order (Desktop) */}
            <button
              onClick={() => onNavigate("/account")}
              aria-label="Client Account"
              title="Account & Orders"
              className="desktop-only btn-icon"
              style={{
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              <User size={18} />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              aria-label={`View shopping bag (${cartCount} items)`}
              title="Shopping Bag"
              className="btn-icon"
              style={{
                position: "relative",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    backgroundColor: "var(--accent-wine)",
                    color: "var(--text-inverse)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    width: "17px",
                    height: "17px",
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

            {/* Admin Dashboard Entry */}
            <button
              onClick={() => onNavigate("/admin")}
              title="Atelier Admin Portal"
              aria-label="Atelier Admin Suite"
              style={{
                backgroundColor: isAdminAuthenticated ? "var(--accent-wine)" : "var(--bg-surface-subtle)",
                color: isAdminAuthenticated ? "var(--text-inverse)" : "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "3px",
                padding: "0.35rem 0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                cursor: "pointer",
                height: "36px",
              }}
            >
              <Shield size={13} />
              <span className="desktop-only">ADMIN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
