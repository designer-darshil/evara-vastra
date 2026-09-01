import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { useData } from "../../context/DataContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  User,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface NavbarProps {
  onNavigate?: (href: string) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenMobileMenu }) => {
  const { cartCount, wishlistCount, openSearch, openCartDrawer } = useShop();
  const { activeCategories, activeCollections } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const collectionsTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnterCollections = () => {
    if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
    setIsCollectionsOpen(true);
  };

  const handleMouseLeaveCollections = () => {
    collectionsTimeoutRef.current = setTimeout(() => {
      setIsCollectionsOpen(false);
    }, 180);
  };

  const handleNav = (href: string) => {
    setIsCollectionsOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  const isActive = (path: string) => {
    if (path === "/shop" && currentPath === "/shop") return true;
    if (path !== "/shop" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white border-b border-border transition-shadow duration-200",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Mobile Menu Button - min 44x44px touch target */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="lg:hidden flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] -ml-1 text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
        >
          <Menu className="h-6 w-6 stroke-[1.75]" />
        </button>

        {/* Brand Logo / Wordmark */}
        <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start min-w-0">
          <Link
            to="/"
            className="flex flex-col items-center lg:items-start min-w-0 px-1 py-1 group text-center lg:text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-[0.14em] sm:tracking-[0.18em] text-foreground group-hover:text-brand transition-colors truncate max-w-full">
              EVARA VASTRA
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-brand font-bold -mt-0.5 hidden xs:block">
              CONTEMPORARY LUXURY
            </span>
          </Link>
        </div>

        {/* Primary Desktop Navigation: Logo | Sarees | Co-ord Sets | Kurta Sets | Collections | New Arrivals | Sale */}
        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-7"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => handleNav("/shop/sarees")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              isActive("/shop/sarees")
                ? "text-brand font-semibold"
                : "text-foreground hover:text-brand"
            )}
          >
            Sarees
          </button>

          <button
            onClick={() => handleNav("/shop/coord-sets")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              isActive("/shop/coord-sets")
                ? "text-brand font-semibold"
                : "text-foreground hover:text-brand"
            )}
          >
            Co-ord Sets
          </button>

          <button
            onClick={() => handleNav("/shop/kurta-sets")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              isActive("/shop/kurta-sets")
                ? "text-brand font-semibold"
                : "text-foreground hover:text-brand"
            )}
          >
            Kurta Sets
          </button>

          {/* Collections with Dropdown */}
          <div
            onMouseEnter={handleMouseEnterCollections}
            onMouseLeave={handleMouseLeaveCollections}
            className="relative"
          >
            <button
              onClick={() => handleNav("/collections")}
              className={cn(
                "flex items-center gap-1 text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
                isActive("/collections") || isCollectionsOpen
                  ? "text-brand font-semibold"
                  : "text-foreground hover:text-brand"
              )}
            >
              Collections{" "}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  isCollectionsOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isCollectionsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white border border-border shadow-xl p-6 grid grid-cols-3 gap-6 rounded-b-sm animate-in fade-in-50 duration-150">
                {/* Categories Column */}
                <div>
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand mb-3 block border-b border-border pb-1.5">
                    By Silhouette
                  </span>
                  <ul className="space-y-2.5">
                    {activeCategories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => handleNav(`/shop/${cat.slug}`)}
                          className="text-xs text-muted-foreground hover:text-brand hover:translate-x-0.5 transition-all text-left block w-full"
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Collections Column */}
                <div>
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand mb-3 block border-b border-border pb-1.5">
                    Curated Edits
                  </span>
                  <ul className="space-y-2.5">
                    {activeCollections.slice(0, 5).map((col) => (
                      <li key={col.id}>
                        <button
                          onClick={() => handleNav(`/collections/${col.slug}`)}
                          className="text-xs text-muted-foreground hover:text-brand hover:translate-x-0.5 transition-all text-left block w-full truncate"
                        >
                          {col.title}
                        </button>
                      </li>
                    ))}
                    <li className="pt-1 border-t border-border/60">
                      <button
                        onClick={() => handleNav("/collections")}
                        className="text-xs font-bold text-foreground hover:text-brand inline-flex items-center gap-1"
                      >
                        All Collections <ArrowRight className="h-3 w-3" />
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Spotlight Feature */}
                <div className="bg-secondary/40 p-4 rounded-sm border border-border flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-brand mb-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Featured Drape
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-foreground mb-1 leading-snug">
                      Aurelia Satin Edit
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                      Pure handloom tissue silk and Fendy satin drapes crafted with Resham embroidery.
                    </p>
                  </div>
                  <Button
                    onClick={() => handleNav("/products/aurelia-saree")}
                    size="sm"
                    className="mt-3 w-full bg-brand text-brand-foreground hover:bg-brand-hover text-[10px] tracking-widest uppercase h-8"
                  >
                    View Spotlight
                  </Button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav("/shop?filter=newArrival")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              isActive("/shop?filter=newArrival")
                ? "text-brand font-semibold"
                : "text-foreground hover:text-brand"
            )}
          >
            New Arrivals
          </button>

          <button
            onClick={() => handleNav("/shop?filter=sale")}
            className="text-xs xl:text-sm font-semibold tracking-[0.1em] uppercase text-evara-orange hover:text-evara-orange/80 transition-colors py-2 focus-visible:outline-none"
          >
            Sale
          </button>
        </nav>

        {/* Right Commerce Actions: Search | Account | Wishlist | Cart */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 shrink-0">
          {/* Search Button */}
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search Catalog"
            className="flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <Search className="h-5 w-5 stroke-[1.75]" />
          </button>

          {/* Account Button (Desktop) */}
          <button
            type="button"
            onClick={() => handleNav("/account")}
            aria-label="Customer Account"
            className="hidden lg:flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <User className="h-5 w-5 stroke-[1.75]" />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => handleNav("/wishlist")}
            aria-label={`Wishlist with ${wishlistCount} items`}
            className="hidden sm:flex relative items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <Heart className="h-5 w-5 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 min-w-[16px] px-1 rounded-full bg-brand text-[9px] font-bold text-brand-foreground flex items-center justify-center leading-none pointer-events-none">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={openCartDrawer}
            aria-label={`Shopping Bag with ${cartCount} items`}
            className="relative flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm -mr-1"
          >
            <ShoppingBag className="h-5 w-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 min-w-[16px] px-1 rounded-full bg-brand text-[9px] font-bold text-brand-foreground flex items-center justify-center leading-none pointer-events-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

