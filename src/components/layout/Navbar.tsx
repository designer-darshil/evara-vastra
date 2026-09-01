import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { useData } from "../../context/DataContext";
import { Search, Heart, ShoppingBag, Menu, User, Shield, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

interface NavbarProps {
  onNavigate: (href: string) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenMobileMenu }) => {
  const { cartCount, wishlistCount, openSearch, openCartDrawer } = useShop();
  const { activeCategories, activeCollections, isAdminAuthenticated } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.98)" : "var(--bg-primary)",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid var(--border-subtle)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="container">
        <div
          style={{
            height: "74px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Mobile Menu & Primary Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1 }}>
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open mobile menu"
              className="mobile-only"
              style={{
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
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
                    fontSize: "0.78rem",
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
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
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
                                fontSize: "0.88rem",
                                color: "var(--text-primary)",
                                textAlign: "left",
                                cursor: "pointer",
                                padding: 0,
                                fontWeight: 500,
                                transition: "color 0.2s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                            >
                              {cat.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 2: Shop By Collection */}
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
                        {activeCollections.slice(0, 5).map((col) => (
                          <li key={col.id}>
                            <button
                              onClick={() => {
                                setIsMegaMenuOpen(false);
                                onNavigate(`/collections/${col.slug}`);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                fontSize: "0.88rem",
                                color: "var(--text-primary)",
                                textAlign: "left",
                                cursor: "pointer",
                                padding: 0,
                                fontWeight: 500,
                                transition: "color 0.2s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                            >
                              {col.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 3: Shop By Occasion */}
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
                        OCCASIONS
                      </span>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {[
                          { label: "Festive Wear", query: "Festive Wear" },
                          { label: "Wedding Party", query: "Wedding Party" },
                          { label: "Everyday Luxury", query: "Everyday Luxury" },
                          { label: "Casual Elegance", query: "Casual Elegance" },
                        ].map((occ) => (
                          <li key={occ.label}>
                            <button
                              onClick={() => {
                                setIsMegaMenuOpen(false);
                                onNavigate(`/shop?occasion=${encodeURIComponent(occ.query)}`);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                fontSize: "0.88rem",
                                color: "var(--text-primary)",
                                textAlign: "left",
                                cursor: "pointer",
                                padding: 0,
                                fontWeight: 500,
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                            >
                              {occ.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 4: Featured Showcase Card */}
                    <div
                      style={{
                        backgroundColor: "var(--bg-surface-subtle)",
                        padding: "1rem",
                        borderRadius: "4px",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent-wine)", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Sparkles size={12} /> PREMIUM EDIT
                        </span>
                        <h4 className="font-serif" style={{ fontSize: "1.1rem", margin: "0.3rem 0 0.5rem 0" }}>
                          Aurelia Fendy Satin Sarees
                        </h4>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378"
                          alt="Aurelia Saree"
                          style={{ width: "100%", height: "130px", objectFit: "cover", borderRadius: "3px", marginBottom: "0.75rem" }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          setIsMegaMenuOpen(false);
                          onNavigate("/collections/premium-collection-saree");
                        }}
                        style={{
                          background: "var(--accent-wine)",
                          color: "#FFFFFF",
                          border: "none",
                          padding: "0.45rem 0.8rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          borderRadius: "2px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem",
                        }}
                      >
                        Explore Edit <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Category Links */}
              <button
                onClick={() => onNavigate("/shop/sarees")}
                style={{
                  fontSize: "0.78rem",
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
                  fontSize: "0.78rem",
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
                  fontSize: "0.78rem",
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
                  fontSize: "0.78rem",
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
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => onNavigate("/")}
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
                  fontSize: "clamp(1.4rem, 2.8vw, 1.85rem)",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: "var(--text-primary)",
                  display: "block",
                  lineHeight: 1.1,
                }}
              >
                EVARA VASTRA
              </span>
              <span
                style={{
                  fontSize: "0.58rem",
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
              gap: "1.25rem",
              flex: 1,
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
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate("/wishlist")}
              aria-label="View wishlist"
              style={{
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
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

            {/* Account / Track Order */}
            <button
              onClick={() => onNavigate("/account")}
              aria-label="Account and orders"
              className="desktop-only"
              style={{
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <User size={19} />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              aria-label="View shopping bag"
              style={{
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
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

            {/* Admin Dashboard Entry */}
            <button
              onClick={() => onNavigate("/admin")}
              title="Atelier Admin Portal"
              style={{
                backgroundColor: isAdminAuthenticated ? "var(--accent-wine)" : "var(--bg-surface-subtle)",
                color: isAdminAuthenticated ? "#FFFFFF" : "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "3px",
                padding: "0.3rem 0.55rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                cursor: "pointer",
              }}
            >
              <Shield size={12} />
              <span className="desktop-only">ADMIN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
