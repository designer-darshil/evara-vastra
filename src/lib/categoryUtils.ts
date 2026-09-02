import { Product } from "../types";

export interface CategoryResolution {
  type: "category" | "collection" | "fabric" | "occasion" | "all";
  canonicalCategory?: string;
  canonicalCollection?: string;
  canonicalFabric?: string;
  title: string;
  subtitle?: string;
  description?: string;
}

/**
 * Normalizes any category, collection, or fabric slug into a canonical resolution.
 * Handles plurality differences, Shopify handle aliases, and legacy route names.
 */
export function resolveCategoryOrCollection(rawSlug?: string): CategoryResolution {
  if (!rawSlug || rawSlug === "all") {
    return {
      type: "all",
      title: "All Products",
      description: "Explore the complete contemporary Indian womenswear catalog.",
    };
  }

  const slug = rawSlug.toLowerCase().trim();

  // 1. Co-ord Sets
  if (
    slug === "coord-sets" ||
    slug === "coord-set" ||
    slug === "coord" ||
    slug === "co-ord-sets" ||
    slug === "co-ords" ||
    slug === "coords"
  ) {
    return {
      type: "category",
      canonicalCategory: "coord-sets",
      title: "Co-ord Sets",
      subtitle: "Everyday Elegance & Two-Piece Silhouettes",
      description: "Contemporary two-piece cotton and rayon co-ord sets tailored for everyday luxury, workwear, and casual outings.",
    };
  }

  // 2. Printed Co-ord Sets
  if (
    slug === "printed-cord-set" ||
    slug === "printed-coord-set" ||
    slug === "printed-co-ord-sets" ||
    slug === "printed-coord-sets"
  ) {
    return {
      type: "category",
      canonicalCategory: "coord-sets",
      canonicalFabric: "printed",
      title: "Printed Co-ord Sets",
      subtitle: "Artisanal Motifs & Breathable Rayon",
      description: "Vibrant and elegant printed luxury co-ord sets designed for effortless daytime and evening grace.",
    };
  }

  // 3. Kurta Sets
  if (
    slug === "kurta-sets" ||
    slug === "kurta-set" ||
    slug === "kurta-sets-for-women" ||
    slug === "kurtas" ||
    slug === "kurta"
  ) {
    return {
      type: "category",
      canonicalCategory: "kurta-sets",
      title: "Kurta Sets",
      subtitle: "Festive Drapes & Zari Ensembles",
      description: "Premium Chinon, Fandy Silk, and Chikankari Kurti Palazzo Sets with Dupatta for festive occasions and celebrations.",
    };
  }

  // 4. Sarees & Saree Master Category
  if (
    slug === "sarees" ||
    slug === "saree" ||
    slug === "all-sarees"
  ) {
    return {
      type: "category",
      canonicalCategory: "sarees",
      title: "Sarees",
      subtitle: "Handcrafted Drapes & Zari Weaves",
      description: "Signature Fendy Satin, Silver Tissue Silk, and Resham Embroidered Sarees hand-finished in Surat.",
    };
  }

  // 5. Suits / Anarkali
  if (
    slug === "anarkali-suits" ||
    slug === "anarkali-suit" ||
    slug === "anarkali-suits-for-women" ||
    slug === "anarkali" ||
    slug === "suits" ||
    slug === "suit"
  ) {
    return {
      type: "category",
      canonicalCategory: "anarkali-suits",
      title: "Suits & Anarkalis",
      subtitle: "Royal Heavy Embroidered Ensembles",
      description: "Regal floor-length Anarkali suits, sharara sets, and festive party wear suit sets crafted with opulent embroidery.",
    };
  }

  // 6. Dresses
  if (slug === "dresses" || slug === "dress") {
    return {
      type: "category",
      canonicalCategory: "dresses",
      title: "Dresses & Gowns",
      subtitle: "Fusion Silhouettes & Relaxed Luxury",
      description: "Contemporary ethnic dresses and fusion silhouettes designed for effortless modern elegance.",
    };
  }

  // 7. Collections
  if (slug === "premium-collection-saree") {
    return {
      type: "collection",
      canonicalCollection: "premium-collection-saree",
      canonicalCategory: "sarees",
      title: "Premium Collection Saree",
      subtitle: "Lumiere, Ruhani, Rasiya, Arzoo & Aurelia",
      description: "Heavy Zari embroidery, scalloped cutwork borders, and fluid satin drapes crafted for wedding festivities.",
    };
  }

  if (slug === "aurelia-saree") {
    return {
      type: "collection",
      canonicalCollection: "aurelia-saree",
      title: "Aurelia Saree Edit",
      subtitle: "Floral Embroidery & Fendy Satin",
      description: "Intricate floral motifs and rich jewel tones in royal purple, wine, and emerald.",
    };
  }

  if (slug === "arzoo-saree") {
    return {
      type: "collection",
      canonicalCollection: "arzoo-saree",
      title: "Arzoo Saree Collection",
      subtitle: "Resham Embroidery & Sheer Glamour",
      description: "Artisanal resham threadwork and delicate foil accents on fine drape fabrics.",
    };
  }

  if (slug === "rasiya-saree") {
    return {
      type: "collection",
      canonicalCollection: "rasiya-saree",
      title: "Rasiya Saree Collection",
      subtitle: "Opulent Borders & Festive Drapes",
      description: "Timeless festive sarees featuring rich border ornamentation and luminous finishes.",
    };
  }

  if (slug === "ruhani-saree") {
    return {
      type: "collection",
      canonicalCollection: "ruhani-saree",
      title: "Ruhani Saree Collection",
      subtitle: "Subtle Radiance & Fine Craftsmanship",
      description: "Sophisticated tone-on-tone embroidery on luxurious silk-blend textures.",
    };
  }

  if (slug === "lumiere-saree") {
    return {
      type: "collection",
      canonicalCollection: "lumiere-saree",
      title: "Lumiere Saree Collection",
      subtitle: "Shimmer & Scalloped Accents",
      description: "High-sheen party wear sarees illuminated with dainty sequins and cutwork.",
    };
  }

  if (slug === "adora-saree") {
    return {
      type: "collection",
      canonicalCollection: "adora-saree",
      title: "Adora Saree Collection",
      subtitle: "Special Edition Handcrafted Drape",
      description: "Exclusive artisan creation highlighting handcrafted zardosi detailing.",
    };
  }

  if (slug === "everyday-elegance") {
    return {
      type: "collection",
      canonicalCollection: "everyday-elegance",
      title: "Everyday Elegance",
      subtitle: "Breathable Rayon & Pure Cotton Sets",
      description: "Effortless two-piece silhouettes, breathable cottons, and versatile everyday luxury.",
    };
  }

  if (slug === "signature-collection") {
    return {
      type: "collection",
      canonicalCollection: "signature-collection",
      title: "Signature Collection",
      subtitle: "Atelier Masterpieces",
      description: "Curated flagship silhouettes showcasing the pinnacle of Evara Vastra craft.",
    };
  }

  if (slug === "best-selling-ethnic-wear" || slug === "bestsellers") {
    return {
      type: "collection",
      canonicalCollection: "bestsellers",
      title: "Bestselling Favorites",
      subtitle: "Loved by 50,000+ Patrons Across India",
      description: "Our most coveted sarees, kurta sets, and co-ords praised for softness and finishing.",
    };
  }

  if (slug === "latest-ethnic-wear" || slug === "new-arrivals") {
    return {
      type: "collection",
      canonicalCollection: "new-arrivals",
      title: "New Season Arrivals",
      subtitle: "Fresh Drops • Autumn / Festive 2026",
      description: "The newest embroidered ensembles, trending co-ords, and statement drapes fresh from our Surat ateliers.",
    };
  }

  // 8. Fabric Filters from Dropdowns & URLs
  if (
    slug === "silk" ||
    slug === "pure-silk" ||
    slug === "katan-silk" ||
    slug === "tissue-silk" ||
    slug === "fandy-silk" ||
    slug === "chinon" ||
    slug === "cotton" ||
    slug === "mulmul" ||
    slug === "banarasi" ||
    slug === "organza" ||
    slug === "linen" ||
    slug === "chanderi" ||
    slug === "handloom" ||
    slug === "rayon" ||
    slug === "satin" ||
    slug === "georgette"
  ) {
    const formatted = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return {
      type: "fabric",
      canonicalFabric: slug,
      title: `${formatted} Weaves & Ensembles`,
      subtitle: `Curated ${formatted} Silhouettes`,
      description: `Explore handcrafted designs in authentic ${formatted} fabrics with rich texture and superior comfort.`,
    };
  }

  // Fallback: Default human-readable title
  const cleanTitle = slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    type: "category",
    canonicalCategory: slug,
    title: cleanTitle,
    description: `Curated ${cleanTitle} collection from Evara Vastra.`,
  };
}

/**
 * Determines whether a product matches a given category or collection filter.
 */
export function matchesCategoryOrCollection(
  product: Product,
  resolution: CategoryResolution,
  specificFabric?: string
): boolean {
  if (resolution.type === "all") return true;

  // 1. Fabric-based resolution (e.g. /shop/silk, /shop/organza)
  if (resolution.type === "fabric" && resolution.canonicalFabric) {
    const fab = resolution.canonicalFabric.toLowerCase();
    const prodFab = (product.fabric || "").toLowerCase();
    const prodTitle = (product.title || "").toLowerCase();
    const prodDesc = (product.description || "").toLowerCase();
    return prodFab.includes(fab) || prodTitle.includes(fab) || prodDesc.includes(fab);
  }

  // 2. Collection-based resolution
  if (resolution.type === "collection" && resolution.canonicalCollection) {
    const colSlug = resolution.canonicalCollection;

    if (colSlug === "new-arrivals") {
      return Boolean(product.newArrival || product.collections?.includes("new-arrivals") || product.collection === "new-arrivals");
    }
    if (colSlug === "bestsellers") {
      return Boolean(product.bestseller || product.collections?.includes("bestsellers") || product.collection === "bestsellers");
    }
    if (colSlug === "premium-collection-saree") {
      return Boolean(product.category === "sarees" || product.collections?.includes("premium-collection-saree") || product.collection === "premium-collection-saree");
    }
    if (colSlug === "everyday-elegance") {
      return Boolean(
        product.collections?.includes("everyday-elegance") ||
        product.collection === "everyday-elegance" ||
        product.category === "everyday-elegance"
      );
    }
    if (product.collections && Array.isArray(product.collections) && product.collections.includes(colSlug)) {
      return true;
    }
    if (product.collection === colSlug) {
      return true;
    }
    return false;
  }

  // 3. Category-based resolution
  if (resolution.canonicalCategory) {
    const matchesCategory =
      product.category === resolution.canonicalCategory ||
      (resolution.canonicalCategory === "coord-sets" && (product.category === "coord-sets" || product.category === "coord-set")) ||
      (resolution.canonicalCategory === "kurta-sets" && (product.category === "kurta-sets" || product.category === "kurta-set")) ||
      (resolution.canonicalCategory === "sarees" && (product.category === "sarees" || product.category === "saree")) ||
      (resolution.canonicalCategory === "anarkali-suits" && (product.category === "anarkali-suits" || product.category === "anarkali"));

    if (!matchesCategory) return false;

    // Check optional fabric constraint (e.g. printed cord-set)
    const requiredFabric = specificFabric || resolution.canonicalFabric;
    if (requiredFabric) {
      const fab = requiredFabric.toLowerCase();
      const prodFab = (product.fabric || "").toLowerCase();
      const prodTitle = (product.title || "").toLowerCase();
      const prodDesc = (product.description || "").toLowerCase();
      return prodFab.includes(fab) || prodTitle.includes(fab) || prodDesc.includes(fab);
    }

    return true;
  }

  return true;
}
