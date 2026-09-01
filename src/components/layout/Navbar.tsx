import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { useData } from "../../context/DataContext";
import { Link, useNavigate } from "react-router-dom";
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
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface NavbarProps {
  onNavigate?: (href: string) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenMobileMenu }) => {
  const { cartCount, wishlistCount, openSearch, openCartDrawer, theme, toggleTheme } = useShop();
  const { activeCategories, activeCollections, isAdminAuthenticated } = useData();
  const navigate = useNavigate();
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

  const handleNav = (href: string) => {
    setIsMegaMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md transition-all duration-300",
        isScrolled ? "bg-background/95 border-border" : "bg-background/80 border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Mobile Menu & Desktop Navigation Links */}
        <div className="flex flex-1 items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onOpenMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <nav className="hidden lg:flex items-center gap-6">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button
                onClick={() => handleNav("/shop")}
                className={cn(
                  "flex items-center gap-1 text-sm font-semibold tracking-widest uppercase transition-colors",
                  isMegaMenuOpen ? "text-accent" : "text-foreground hover:text-accent"
                )}
              >
                Shop <ChevronDown className={cn("h-4 w-4 transition-transform", isMegaMenuOpen && "rotate-180")} />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full -left-4 w-[860px] bg-background border rounded-b-md shadow-lg p-8 grid grid-cols-4 gap-8">
                  {/* Categories */}
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-accent mb-4 block">Categories</span>
                    <ul className="space-y-3">
                      {activeCategories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => handleNav(`/shop/${cat.slug}`)}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {cat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Collections */}
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-accent mb-4 block">Collections</span>
                    <ul className="space-y-3">
                      {activeCollections.map((col) => (
                        <li key={col.id}>
                          <button
                            onClick={() => handleNav(`/collections/${col.slug}`)}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {col.title}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => handleNav("/collections")}
                          className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-1 pt-2"
                        >
                          All Collections <ArrowRight className="h-3 w-3" />
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Discovery */}
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-accent mb-4 block">Discovery</span>
                    <ul className="space-y-3">
                      <li>
                        <button onClick={() => handleNav("/shop?filter=newArrival")} className="text-sm font-semibold text-accent">
                          ★ New Season Drops
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleNav("/shop?filter=bestseller")} className="text-sm text-muted-foreground hover:text-accent">
                          Bestselling Sets
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Spotlight */}
                  <div className="bg-secondary p-5 rounded-md border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-accent mb-2">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Spotlight</span>
                      </div>
                      <h4 className="font-serif text-lg text-foreground mb-1">Aurelia Fendy Satin Saree</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Heavy Resham & Zari Cutwork embroidery in vibrant festive shades.
                      </p>
                    </div>
                    <Button onClick={() => handleNav("/products/aurelia-saree")} variant="evara" className="mt-4 w-full">
                      Shop Spotlight
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleNav("/shop/sarees")} className="text-sm font-semibold tracking-widest uppercase text-foreground hover:text-accent transition-colors">Sarees</button>
            <button onClick={() => handleNav("/shop/coord-sets")} className="text-sm font-semibold tracking-widest uppercase text-foreground hover:text-accent transition-colors">Co-ord Sets</button>
            <button onClick={() => handleNav("/shop/kurta-sets")} className="text-sm font-semibold tracking-widest uppercase text-foreground hover:text-accent transition-colors">Kurta Sets</button>
            <button onClick={() => handleNav("/shop?filter=newArrival")} className="text-sm font-semibold tracking-widest uppercase text-accent hover:text-accent/80 transition-colors">New In</button>
          </nav>
        </div>

        {/* Center Brand Identity */}
        <div className="flex-shrink-0 text-center">
          <Link to="/" className="flex flex-col items-center">
            <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-[0.2em] text-foreground leading-none">
              EVARA VASTRA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-accent font-bold mt-1">
              SURAT • INDIA
            </span>
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-primary" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={openSearch} aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => handleNav("/wishlist")} aria-label="Wishlist" className="relative">
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-accent text-[9px] font-bold text-accent-foreground flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" onClick={() => handleNav("/account")} aria-label="Account" className="hidden lg:inline-flex">
            <User className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={openCartDrawer} aria-label="Cart" className="relative">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-accent text-[9px] font-bold text-accent-foreground flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            variant={isAdminAuthenticated ? "default" : "outline"}
            size="sm"
            onClick={() => handleNav("/admin")}
            className="ml-2 hidden lg:flex text-[10px] tracking-widest px-2"
          >
            <Shield className="h-3 w-3 mr-1" />
            ADMIN
          </Button>
        </div>
      </div>
    </header>
  );
};
