# Homepage Visual Refinement & Spacing System

**Brand**: EVARA VASTRA  
**Document Version**: 1.0.0 (Production Architecture)  

---

## 1. Executive Summary

This document establishes the standardized layout, spacing tokens, container architecture, and category media guidelines across the Evara Vastra homepage on desktop and mobile viewports.

---

## 2. Container & Section Architecture

### 2.1 Unified Page Container (`PageContainer`)
All major homepage and storefront sections use `<PageContainer />`:
- **Default Max Width**: `max-w-7xl` (`1280px`) centered on desktop.
- **Narrow Max Width**: `max-w-4xl` (`896px`) for narrative/editorial content (e.g. VIP Newsletter).
- **Responsive Horizontal Gutters**:
  - Mobile (320px – 639px): `px-4` (`16px`)
  - Tablet (640px – 1023px): `px-6` (`24px`)
  - Desktop (1024px+): `px-8` (`32px`)

### 2.2 Semantic Section Spacing (`Section`)
Arbitrary top/bottom margins (`mt-[37px]`, `py-[71px]`) have been removed in favor of semantic spacing tokens:

| Spacing Token | Padding Class | Usage in Homepage |
|---|---|---|
| `sm` | `py-6 sm:py-8 md:py-10` | Compact banners, tickers, micro-sections |
| `md` | `py-10 sm:py-12 md:py-14` | Sub-sections, secondary filters |
| `lg` (Default) | `py-12 sm:py-16 md:py-20` | Master Categories, New Arrivals, Bestsellers, Shoppable Videos, Trust Signals |
| `xl` | `py-16 sm:py-20 md:py-24` | Hero, Lookbook showcase, Major Campaign Features |

---

## 3. Master Category Consistency & Aspect Ratio

### 3.1 Controlled Display Frame
All category cards utilize the `<MasterCategoryCard />` component with a fixed **4:5 aspect ratio** (`aspect-[4/5]`):
- **Aspect Ratio**: `4:5` (Width:Height)
- **Object Fit**: `object-cover` with `overflow-hidden`
- **Hover Micro-interaction**: `group-hover:scale-105` over `700ms` ease-out.
- **Typography & Layout**: Title line clamped to 1 line, short description line clamped to 2 lines, and uniform bottom "Explore Weave" CTA with brand accent `#734E06`.
- **Responsive Grid**:
  - Mobile (<640px): `grid-cols-2` with `gap-4`
  - Tablet (640px–1023px): `grid-cols-3` with `gap-5`
  - Desktop (1024px+): `grid-cols-4` with `gap-6`

---

## 4. Homepage Section Sequence & Rhythm

```
1. Hero Section (Autumn/Winter Editorial Drape)
   ↓ (Breathing Space: lg)
2. Editorial Marquee (Silk Mark & Craft Assurance Ticker)
   ↓ (Breathing Space: lg)
3. Master Categories Grid (4:5 Ratio Normalized Cards)
   ↓ (Breathing Space: lg)
4. New Season Arrivals (Fresh Atelier Drops Grid)
   ↓ (Breathing Space: lg)
5. Shoppable Atelier Videos (Interactive Video Reels & Live Drape)
   ↓ (Breathing Space: lg)
6. Bestselling Ensembles (Patron Favorites Grid)
   ↓ (Breathing Space: lg)
7. Evara Assurance (Free Shipping, Pure Silk Mark, 7-Day Exchange)
   ↓ (Breathing Space: lg)
8. Verified Patron Reviews (4.87/5.0 Ratings Grid)
   ↓ (Breathing Space: lg)
9. VIP Circle Newsletter (Exclusive Access Invitation)
```
