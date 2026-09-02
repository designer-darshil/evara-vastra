import React from "react";
import { useData } from "../context/DataContext";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import { resolveCategoryOrCollection, matchesCategoryOrCollection } from "../lib/categoryUtils";

export const CollectionDetailPage: React.FC<{
  collectionSlug: string;
  onNavigate: (href: string) => void;
}> = ({ collectionSlug, onNavigate }) => {
  const { collections, publishedProducts } = useData();

  const resolution = resolveCategoryOrCollection(collectionSlug);

  const matchedCollection = collections.find(
    (c) => c.slug === collectionSlug || c.slug === resolution.canonicalCollection
  );

  const collectionProducts = publishedProducts.filter((p) => {
    return matchesCategoryOrCollection(p, resolution);
  });

  const heroImage =
    matchedCollection?.heroImage ||
    "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983";

  const title = matchedCollection?.title || resolution.title;
  const subtitle = matchedCollection?.subtitle || resolution.subtitle || "Curated Atelier Edit";
  const season = matchedCollection?.season || "Autumn / Festive 2026";
  const editorialStatement =
    matchedCollection?.editorialStatement ||
    "Handcrafted with reverence to Indian heritage, designed for modern silhouettes.";
  const story =
    matchedCollection?.story ||
    resolution.description ||
    "Discover the artisanal beauty of Evara Vastra's curated collection.";

  const relatedCollections = collections
    .filter((c) => c.slug !== collectionSlug && c.isPublished)
    .slice(0, 2);

  return (
    <div className="animate-in fade-in duration-500 pb-28">
      {/* Editorial Hero Banner */}
      <div className="relative min-h-[50dvh] sm:min-h-[55dvh] bg-neutral-950 text-white flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37] block mb-2">
              {season} • SIGNATURE EDIT
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-tight mb-3">
              {title}
            </h1>

            <p className="font-serif text-base sm:text-xl italic text-[#D4AF37] mb-3">
              "{editorialStatement}"
            </p>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl m-0">
              {story}
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Collection Products Grid */}
        <div className="mt-8 sm:mt-10">
          <div className="flex flex-wrap justify-between items-end mb-8 pb-4 border-b border-border gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground m-0">
                {title} ({collectionProducts.length})
              </h2>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 block">
                {subtitle}
              </span>
            </div>

            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Warp & Weft Curations
            </span>
          </div>

          {collectionProducts.length === 0 ? (
            <div className="py-20 px-6 text-center bg-secondary/30 border border-border rounded-sm">
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground m-0">
                No Products Available in this Collection
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3 mb-6">
                This curation is currently being refreshed by our atelier. Explore our complete catalog.
              </p>
              <Button onClick={() => onNavigate("/shop")} className="bg-brand hover:bg-brand-hover text-white">
                <RotateCcw className="w-4 h-4 mr-2" /> View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {collectionProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} onNavigate={onNavigate} />
              ))}
            </div>
          )}
        </div>

        {/* Related Collections */}
        {relatedCollections.length > 0 && (
          <div className="mt-20 sm:mt-24 border-t border-border pt-12 sm:pt-16">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand block mb-1">
                EXPLORE OTHER EDITS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground">
                More Atelier Collections
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {relatedCollections.map((col) => (
                <div
                  key={col.id}
                  onClick={() => onNavigate(`/collections/${col.slug}`)}
                  className="group cursor-pointer bg-card border border-border overflow-hidden rounded-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={col.heroImage}
                      alt={col.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-1">
                      {col.season}
                    </span>
                    <h4 className="font-serif text-xl text-foreground group-hover:text-brand transition-colors mb-1">
                      {col.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {col.subtitle || col.story}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                      <span>Discover Edit</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
