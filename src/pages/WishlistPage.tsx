import React from "react";
import { useShop } from "../context/ShopContext";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

export const WishlistPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { wishlist, addToCart } = useShop();
  const { publishedProducts } = useData();

  const savedProducts = publishedProducts.filter((p: Product) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    savedProducts.forEach((p: Product) => addToCart(p, 1));
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Saved Pieces (Wishlist)" }]} onNavigate={onNavigate} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "3rem",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-wine)",
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              YOUR PRIVATE CURATION
            </span>
            <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}>
              Saved Pieces ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <button onClick={handleMoveAllToBag} className="btn-wine">
              <ShoppingBag size={16} /> Move All to Bag
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div
            style={{
              padding: "5rem 2rem",
              textAlign: "center",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-primary)",
                color: "var(--accent-wine)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem auto",
              }}
            >
              <Heart size={26} />
            </div>
            <h3 className="font-serif" style={{ fontSize: "1.85rem", color: "var(--text-primary)" }}>
              Your Saved Pieces
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                maxWidth: "400px",
                margin: "0.5rem auto 2rem auto",
              }}
            >
              Items you save while exploring our collection will appear here for easy reference.
            </p>
            <button onClick={() => onNavigate("/shop")} className="btn-primary">
              Continue Shopping <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2.5rem 1.75rem",
            }}
          >
            {savedProducts.map((p: Product, idx: number) => (
              <ProductCard key={p.id} product={p} index={idx} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
