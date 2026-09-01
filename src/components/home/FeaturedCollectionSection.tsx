import React from "react";
import { products } from "../../data/products";
import { collections } from "../../data/collections";
import { ProductCard } from "../common/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

export const FeaturedCollectionSection: React.FC<{
  onNavigate: (href: string) => void;
}> = ({ onNavigate }) => {
  const featuredCollection = collections[0]; // The Silk Edit
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-gold)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.5rem",
            }}
          >
            <Sparkles size={13} /> SIGNATURE SELECTION • 2026
          </span>

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            {featuredCollection.title}
          </h2>

          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              maxWidth: "540px",
              lineHeight: 1.6,
            }}
          >
            {featuredCollection.editorialStatement}
          </p>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2.5rem 1.75rem",
          }}
        >
          {featuredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Bottom Collection Link */}
        <div
          style={{
            marginTop: "4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => onNavigate(`/collections/${featuredCollection.slug}`)}
            className="btn-wine"
          >
            Explore The Silk Edit Archive <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
