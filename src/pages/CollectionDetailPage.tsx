import React from "react";
import { collections, Collection } from "../data/collections";
import { products, Product } from "../data/products";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight } from "lucide-react";

export const CollectionDetailPage: React.FC<{
  collectionSlug: string;
  onNavigate: (href: string) => void;
}> = ({ collectionSlug, onNavigate }) => {
  const collection =
    collections.find((c: Collection) => c.slug === collectionSlug) || collections[0];

  const collectionProducts = products.filter(
    (p: Product) => p.collection === collection.slug || p.category === (collection.slug.includes("silk") ? "silk" : "banarasi")
  );

  const relatedCollections = collections.filter((c: Collection) => c.id !== collection.id).slice(0, 2);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem" }}>
      {/* Editorial Hero Banner */}
      <div
        style={{
          position: "relative",
          minHeight: "55vh",
          backgroundColor: "var(--bg-dark)",
          color: "var(--text-inverse)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={collection.heroImage}
          alt={collection.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "4rem 0" }}>
          <div style={{ maxWidth: "680px" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              {collection.season} • SIGNATURE EDIT
            </span>

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(2.5rem, 4.5vw, 4.2rem)",
                color: "#F8F4EE",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              {collection.title}
            </h1>

            <p
              className="font-serif"
              style={{
                fontSize: "1.3rem",
                fontStyle: "italic",
                color: "var(--accent-gold)",
                marginBottom: "1rem",
              }}
            >
              "{collection.editorialStatement}"
            </p>

            <p style={{ fontSize: "0.95rem", color: "var(--text-inverse-muted)", lineHeight: 1.6 }}>
              {collection.story}
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "3rem" }}>
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/collections" },
            { label: collection.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Collection Products Grid */}
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2.5rem",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "1rem",
            }}
          >
            <h2 className="font-serif" style={{ fontSize: "2rem", color: "var(--text-primary)" }}>
              The Saree Archive ({collectionProducts.length})
            </h2>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Warp & Weft Curations
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2.5rem 1.75rem",
            }}
          >
            {collectionProducts.map((p: Product, idx: number) => (
              <ProductCard key={p.id} product={p} index={idx} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Related Collections */}
        <div style={{ marginTop: "6rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
              EXPLORE OTHER EDITS
            </span>
            <h3 className="font-serif" style={{ fontSize: "2.2rem", color: "var(--text-primary)" }}>
              More Atelier Collections
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {relatedCollections.map((col: Collection) => (
              <div
                key={col.id}
                onClick={() => onNavigate(`/collections/${col.slug}`)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  overflow: "hidden",
                }}
              >
                <div style={{ aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#EDE7DD" }}>
                  <img
                    src={col.heroImage}
                    alt={col.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--accent-gold)", fontWeight: 600, textTransform: "uppercase" }}>
                    {col.season}
                  </span>
                  <h4 className="font-serif" style={{ fontSize: "1.4rem", color: "var(--text-primary)", margin: "0.3rem 0" }}>
                    {col.title}
                  </h4>
                  <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {col.subtitle}
                  </p>
                  <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase" }}>
                    <span>Discover</span>
                    <ArrowRight size={13} style={{ color: "var(--accent-wine)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
