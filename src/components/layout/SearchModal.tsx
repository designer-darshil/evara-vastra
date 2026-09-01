import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../../context/ShopContext";
import { useData } from "../../context/DataContext";
import { Product } from "../../types";
import { Search, X, ArrowRight } from "lucide-react";

export const SearchModal: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { isSearchOpen, closeSearch } = useShop();
  const { publishedProducts } = useData();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? publishedProducts.filter((p: Product) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (slug: string) => {
    closeSearch();
    onNavigate(`/products/${slug}`);
  };

  const handleQuickTagClick = (tag: string) => {
    setQuery(tag);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    onNavigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <div
      className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/65 z-[99999] flex flex-col items-center justify-start pt-12 sm:pt-20 px-3 sm:px-6 animate-in fade-in duration-200"
      onClick={closeSearch}
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      <div
        className="w-full max-w-[680px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input Container */}
        <div className="bg-white text-foreground shadow-2xl p-3 sm:p-4 flex items-center gap-3 border border-border rounded-sm">
          <Search className="h-5 w-5 text-brand shrink-0" />
          <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by drape, weave, fabric, color..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-none outline-none text-sm sm:text-base text-foreground bg-transparent placeholder:text-muted-foreground"
            />
          </form>
          <button
            onClick={closeSearch}
            aria-label="Close search"
            className="p-1.5 text-muted-foreground hover:text-brand transition-colors rounded-sm flex items-center justify-center min-h-[36px] min-w-[36px]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Popular Search Suggestions */}
        {!query && (
          <div className="bg-white text-foreground p-4 sm:p-5 mt-2 rounded-sm border border-border shadow-xl">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["Sarees", "Co-ord Sets", "Kurta Sets", "Anarkali", "Fendy Satin", "Chinon Silk", "Wedding", "Wine"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-3 py-1.5 text-xs bg-secondary hover:bg-brand hover:text-brand-foreground text-foreground border border-border/80 rounded-sm transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="bg-white text-foreground p-4 sm:p-5 mt-2 max-h-[60dvh] overflow-y-auto rounded-sm border border-border shadow-xl">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-border text-xs">
              <span className="text-muted-foreground">
                Found {filteredProducts.length} matching product(s)
              </span>
              <button
                onClick={handleSearchSubmit}
                className="font-semibold uppercase tracking-wider text-brand hover:underline flex items-center gap-1 text-[11px]"
              >
                View all in Catalog <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground text-sm">
                <p>No products match "{query}".</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filteredProducts.slice(0, 8).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.slug)}
                    className="flex items-center gap-3 p-2 hover:bg-secondary/60 rounded-sm cursor-pointer transition-colors"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-12 h-16 object-cover rounded-sm bg-secondary shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] tracking-widest uppercase text-brand font-bold block">
                        {p.fabric} • {p.color}
                      </span>
                      <h4 className="text-sm font-medium text-foreground truncate my-0.5">
                        {p.title}
                      </h4>
                      <span className="text-xs font-bold text-foreground">
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

