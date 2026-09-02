# Category & Collection Data Flow Audit

## 1. Executive Summary
This document outlines the root cause investigation, data normalization strategy, and resolution matrix for product catalog categorization across the Evara Vastra storefront. All category and collection routes now query and display live products from the migrated catalog (152 verified SKUs) without data loss or fallback mocks.

---

## 2. Root Cause Analysis
Prior to this correction phase, multiple architectural and query-level issues prevented products from appearing on category/collection pages:

1. **URL Search Parameter Extraction in Router (`App.tsx`)**:
   - Navigation links such as `/shop?category=coord-sets` or `/shop?collection=everyday-elegance` had their `category` and `collection` query parameters stripped during router extraction, forcing `ShopPage` to fall back to `"all"`.
2. **Missing Canonical Category Routes**:
   - Standard category paths like `/category/:slug` and `/categories/:slug` were unrouted in `App.tsx`, triggering a 404 / `NotFoundPage`.
3. **Plurality & Handle Normalization Mismatches**:
   - Migrated Shopify collections used singular handles (`coord-set`, `printed-cord-set`, `kurta-sets-for-women`, `anarkali-suits-for-women`, `saree`) whereas navigation and UI badges used plural keys (`coord-sets`, `kurta-sets`, `anarkali-suits`, `sarees`). Strict equality queries failed to match products.
4. **Category vs. Fabric Ambiguity**:
   - Navigation dropdowns under Sarees (`/shop/silk`, `/shop/banarasi`, `/shop/cotton`, `/shop/organza`) passed fabric descriptors as `categoryParam`. Because product records categorize all sarees under `category: "sarees"` with fabric details in `p.fabric`, category matching returned 0 results.
5. **Collection Detail Page Hardcoding**:
   - `CollectionDetailPage.tsx` only recognized 5 hardcoded collection slugs and defaulted to `collections[0]` ("Premium Collection Saree") with a hardcoded header title ("The Saree Archive") for all unlisted handles.

---

## 3. Canonical Routing & Resolution Matrix

The centralized resolver (`src/lib/categoryUtils.ts`) now handles all canonical paths, query parameters, and legacy aliases:

| Category / Collection | Supported Handles & Aliases | Canonical Route | Live Products Count |
| :--- | :--- | :--- | :--- |
| **Sarees** | `sarees`, `saree`, `all-sarees` | `/shop/sarees` | **99** |
| **Co-ord Sets** | `coord-sets`, `coord-set`, `co-ord-sets`, `coords` | `/shop/coord-sets` | **18** |
| **Printed Co-ord Sets** | `printed-cord-set`, `printed-coord-set`, `printed-co-ord-sets` | `/shop/printed-cord-set` | **9** |
| **Kurta Sets** | `kurta-sets`, `kurta-set`, `kurta-sets-for-women`, `kurtas` | `/shop/kurta-sets` | **23** |
| **Suits & Anarkalis** | `anarkali-suits`, `anarkali-suit`, `anarkali-suits-for-women`, `anarkali` | `/shop/anarkali-suits` | **12** |
| **Everyday Elegance** | `everyday-elegance` | `/collections/everyday-elegance` | **20** |
| **Premium Collection Saree** | `premium-collection-saree` | `/collections/premium-collection-saree` | **99** |
| **Aurelia Saree Edit** | `aurelia-saree` | `/collections/aurelia-saree` | **94** |
| **Arzoo Saree Collection** | `arzoo-saree` | `/collections/arzoo-saree` | **40** |
| **Rasiya Saree Collection** | `rasiya-saree` | `/collections/rasiya-saree` | **21** |
| **New Season Arrivals** | `new-arrivals`, `latest-ethnic-wear`, `?filter=newArrival` | `/shop?filter=newArrival` | **25** |
| **Bestselling Favorites** | `bestsellers`, `best-selling-ethnic-wear`, `?filter=bestseller` | `/shop?filter=bestseller` | **76** |
| **Silk Weaves** | `silk`, `pure-silk`, `tissue-silk`, `fandy-silk` | `/shop/silk` | **117** |
| **Cotton Weaves** | `cotton`, `mulmul` | `/shop/cotton` | **18** |
| **Organza Weaves** | `organza` | `/shop/organza` | **7** |

---

## 4. Product Visibility & Filter Integrity Rules

1. **Visibility Rules**:
   - Products must be published (`isPublished !== false`).
   - Zero-inventory products remain visible unless explicitly archived.
   - Products are never filtered out due to non-critical optional metadata.
2. **Filters & Price Slider**:
   - Dynamic maximum price is computed from live catalog prices (up to ₹8,749) with default slider position set to catalog max so no products are prematurely hidden.
   - Active filter badges display real-time counters and provide a 1-click "Clear All" action.
3. **Empty State Behavior**:
   - "No products found" only renders when a user's combined filter criteria yield 0 matches.
   - Includes a direct "Reset All Filters" CTA that restores the catalog without requiring a page reload.
