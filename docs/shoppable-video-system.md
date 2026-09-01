# Shoppable Video Architecture & CMS Management

**Brand**: EVARA VASTRA  
**Document Version**: 1.0.0 (Production Architecture)  

---

## 1. Executive Summary

Evara Vastra integrates interactive shoppable video reels across the storefront. Patrons can observe fabric flow, zari luster, and garment silhouette in authentic motion, with one-tap navigation to the corresponding product page.

---

## 2. Playback Architecture & Root Cause Fixes

### 2.1 Previous Root Causes
1. **Missing HTML5 Video Player**: The modal player rendered a static `<img>` tag and had no `<video>` element.
2. **Unreachable Dummy URLs**: Video URLs referenced 404 placeholder files (`https://cdn.shopify.com/videos/c/o/v/sample1.mp4`).
3. **Missing Mobile Autoplay Attributes**: Autoplay failed on mobile browsers due to missing `playsInline` and `muted` attributes.
4. **Lack of Performance Lazy Loading**: All video nodes attempted eager network connection simultaneously.

### 2.2 Implemented Fixes
- **HTML5 `<video>` Player**: Implemented native `<video>` elements with `playsInline`, `muted={isMuted}`, `loop`, and `preload="metadata"`.
- **IntersectionObserver Lazy Loading**: Videos only load and play when scrolled into the active viewport.
- **Reliable Fallbacks**: If a video stream fails to load or the patron has low bandwidth, the card smoothly displays the high-resolution poster image without breaking the card layout.
- **Touch & Desktop Controls**: Play/pause overlay, sound toggle button, and interactive scrub bar in the modal view.

---

## 3. Data Model (`ShoppableVideo`)

```typescript
export interface ShoppableVideo {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  mobileVideoUrl?: string;
  thumbnailUrl: string; // Poster frame
  posterUrl?: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productSlug: string;
  ctaText: string;
  ctaUrl?: string;
  isPublished: boolean;
  order: number;
  autoplay?: boolean;
  muted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

---

## 4. Admin Management Capabilities (`/admin/shoppable-videos`)

Store managers have full control over the shoppable video reels:
- **Create**: Add new video reels with title, description, video stream URL, poster frame, and catalog product linkage.
- **Edit**: Replace video streams, update captions, modify sort orders, and switch linked products.
- **Product Search & Picker**: Search by product name or category with automatic extraction of title, price in INR, and URL slug.
- **Reorder**: Quick Move Up / Move Down controls to customize the display sequence on the homepage.
- **Visibility Toggle**: One-click Publish / Hide toggle directly from the list or edit modal.
- **Stream Format Validator**: Real-time URL format tester to prevent broken URLs from entering production.
- **Live Preview Player**: Built-in video preview player directly inside the admin console.
