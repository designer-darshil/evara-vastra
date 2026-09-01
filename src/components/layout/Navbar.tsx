import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  User,
  ChevronDown,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  onNavigate?: (href: string) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenMobileMenu }) => {
  const { cartCount, wishlistCount, openSearch, openCartDrawer } = useShop();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSareeOpen, setIsSareeOpen] = useState(false);
  const sareeTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnterSaree = () => {
    if (sareeTimeoutRef.current) clearTimeout(sareeTimeoutRef.current);
    setIsSareeOpen(true);
  };

  const handleMouseLeaveSaree = () => {
    sareeTimeoutRef.current = setTimeout(() => {
      setIsSareeOpen(false);
    }, 180);
  };

  const handleNav = (href: string) => {
    setIsSareeOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white border-b border-neutral-200 transition-shadow duration-200",
        isScrolled ? "shadow-xs" : ""
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Mobile Menu Button - min 44x44px touch target */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="lg:hidden flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] -ml-1 text-neutral-900 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
        >
          <Menu className="h-6 w-6 stroke-[1.75]" />
        </button>

        {/* Brand Logo / Wordmark */}
        <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start min-w-0">
          <Link
            to="/"
            className="flex flex-col items-center lg:items-start min-w-0 px-1 py-1 group text-center lg:text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-[0.14em] sm:tracking-[0.18em] text-neutral-900 group-hover:text-brand transition-colors truncate max-w-full">
              EVARA VASTRA
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-brand font-bold -mt-0.5 hidden xs:block">
              CONTEMPORARY LUXURY
            </span>
          </Link>
        </div>

        {/* Primary Desktop Navigation: Home | Coord Set | Printed cord-set | Kurta Sets | Everyday Elegance | Saree */}
        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-7"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => handleNav("/")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              isActive("/") && location.pathname === "/"
                ? "text-brand font-semibold"
                : "text-neutral-800 hover:text-brand"
            )}
          >
            Home
          </button>

          <button
            onClick={() => handleNav("/shop?category=coord-sets")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              currentPath.includes("category=coord-sets") && !currentPath.includes("fabric=printed")
                ? "text-brand font-semibold"
                : "text-neutral-800 hover:text-brand"
            )}
          >
            Coord Set
          </button>

          <button
            onClick={() => handleNav("/shop?category=coord-sets&fabric=printed")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              currentPath.includes("fabric=printed")
                ? "text-brand font-semibold"
                : "text-neutral-800 hover:text-brand"
            )}
          >
            Printed cord-set
          </button>

          <button
            onClick={() => handleNav("/shop?category=kurta-sets")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              currentPath.includes("category=kurta-sets")
                ? "text-brand font-semibold"
                : "text-neutral-800 hover:text-brand"
            )}
          >
            Kurta Sets
          </button>

          <button
            onClick={() => handleNav("/shop?category=everyday-elegance")}
            className={cn(
              "text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
              currentPath.includes("category=everyday-elegance")
                ? "text-brand font-semibold"
                : "text-neutral-800 hover:text-brand"
            )}
          >
            Everyday Elegance
          </button>

          {/* Saree with Dropdown */}
          <div
            onMouseEnter={handleMouseEnterSaree}
            onMouseLeave={handleMouseLeaveSaree}
            className="relative"
          >
            <button
              onClick={() => handleNav("/shop/sarees")}
              className={cn(
                "flex items-center gap-1 text-xs xl:text-sm font-medium tracking-[0.1em] uppercase transition-colors py-2 focus-visible:outline-none focus-visible:text-brand",
                currentPath.includes("/sarees") || isSareeOpen
                  ? "text-brand font-semibold"
                  : "text-neutral-800 hover:text-brand"
              )}
            >
              Saree{" "}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  isSareeOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isSareeOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] bg-white border border-neutral-200 shadow-xl p-4 rounded-b-sm animate-in fade-in-50 duration-150">
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand mb-2.5 block border-b border-neutral-100 pb-1.5">
                  Saree Weaves & Fabrics
                </span>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleNav("/shop/sarees")}
                      className="text-xs font-semibold text-neutral-900 hover:text-brand transition-colors text-left block w-full"
                    >
                      All Sarees
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/shop/silk")}
                      className="text-xs text-neutral-600 hover:text-brand transition-colors text-left block w-full"
                    >
                      Pure Silk
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/shop/banarasi")}
                      className="text-xs text-neutral-600 hover:text-brand transition-colors text-left block w-full"
                    >
                      Royal Banarasi
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/shop/cotton")}
                      className="text-xs text-neutral-600 hover:text-brand transition-colors text-left block w-full"
                    >
                      Mulmul & Cotton
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/shop/organza")}
                      className="text-xs text-neutral-600 hover:text-brand transition-colors text-left block w-full"
                    >
                      Sheer Organza
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/shop/linen")}
                      className="text-xs text-neutral-600 hover:text-brand transition-colors text-left block w-full"
                    >
                      Pure Linen
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/shop/chanderi")}
                      className="text-xs text-neutral-600 hover:text-brand transition-colors text-left block w-full"
                    >
                      Chanderi
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Right Commerce Actions: Search | Account | Wishlist | Cart */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 shrink-0">
          {/* Search Button */}
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search Catalog"
            className="flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-neutral-900 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <Search className="h-5 w-5 stroke-[1.75]" />
          </button>

          {/* Account Button (Desktop) */}
          <button
            type="button"
            onClick={() => handleNav("/account")}
            aria-label="Customer Account"
            className="hidden lg:flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-neutral-900 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <User className="h-5 w-5 stroke-[1.75]" />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => handleNav("/wishlist")}
            aria-label={`Wishlist with ${wishlistCount} items`}
            className="hidden sm:flex relative items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-neutral-900 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
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
            className="relative flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] text-neutral-900 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm -mr-1"
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
