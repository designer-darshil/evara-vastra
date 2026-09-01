import React from "react";
import { useData } from "../../context/DataContext";
import { ProductCard } from "../common/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

export const FeaturedCollectionSection: React.FC<{
  onNavigate: (href: string) => void;
}> = ({ onNavigate }) => {
  const { collections, publishedProducts, homepageCMS } = useData();

  const activeCollection =
    collections.find((c) => c.slug === homepageCMS.featuredCollectionSlug && c.isPublished) ||
    collections.find((c) => c.isPublished) ||
    collections[0];

  const collectionProducts = publishedProducts.slice(0, 4);

  if (!activeCollection) return null;

  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        backgroundColor: "var(--bg-surface-subtle)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2.5rem",
            alignItems: "flex-end",
            marginBottom: "3.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "1.5rem",
          }}
          className="featured-header-grid"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
              <Sparkles size={14} style={{ color: "var(--accent-wine)" }} />
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent-wine)",
                }}
              >
                SIGNATURE CURATION • {activeCollection.season}
              </span>
            </div>

            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                margin: "0.2rem 0 0.5rem 0",
              }}
            >
              {activeCollection.title}
            </h2>

            <p
              className="font-serif"
              style={{
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: "var(--accent-gold)",
                margin: 0,
              }}
            >
              "{activeCollection.editorialStatement}"
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "1rem",
                textAlign: "left",
              }}
            >
              {activeCollection.story}
            </p>

            <button
              onClick={() => onNavigate(`/collections/${activeCollection.slug}`)}
              className="btn-wine"
              style={{ fontSize: "0.8rem", padding: "0.75rem 1.5rem" }}
            >
              Explore Full Collection ({collectionProducts.length} Sarees) <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Product Cards Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2.5rem 1.75rem",
          }}
        >
          {collectionProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .featured-header-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-header-grid > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
};
