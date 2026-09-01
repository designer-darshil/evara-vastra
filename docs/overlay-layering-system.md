# Evara Vastra — Global Overlay & Layering System Architecture

## 1. Executive Summary

This specification defines the authoritative global layering, z-index hierarchy, stacking contexts, pointer-event policies, and viewport-height guidelines for the Evara Vastra web application. It eliminates visual obstruction, interactive deadzones, and competing UI notifications during shopping and checkout workflows.

---

## 2. Semantic Z-Index Hierarchy

Arbitrary z-index declarations (e.g. `9999`, `99999`) are strictly forbidden. All overlays, surfaces, and interactive layers adhere to the semantic scale defined in `src/styles/index.css` and `tailwind.config.js`:

| Layer Name | Variable / Token | Z-Index | Component Examples | Interaction Scope |
|---|---|---|---|---|
| **Base Content** | `--z-base` | `0` | Default body flow, sections, grids | Natural page flow |
| **Badges & Overlays** | `--z-badge` | `10` | Product card tags, wishlist buttons | Relative to component |
| **Sticky UI** | `--z-sticky` | `20` | Sticky table headers, admin sidebar | Sticky in scroll container |
| **Header Region** | `--z-header` | `30` | Top announcement bar, primary Navbar | Sticky top of viewport |
| **Dropdowns & Menus** | `--z-dropdown` | `40` | Currency pickers, filter dropdowns | Floating popovers |
| **Transient Toasts** | `--z-toast` | `50` | Wishlist alerts, error messages | Informational / dismissible |
| **Off-Canvas Drawers** | `--z-drawer` | `60` | Shopping Bag Cart Drawer, Mobile Navigation, Filter Drawer | Modal slide-over drawer |
| **Modals & Dialogs** | `--z-modal` | `70` | Search Modal, Quick View, Checkout UPI Modal, Admin Confirmations | Center modal with backdrop |
| **Image Lightboxes** | `--z-lightbox` | `80` | High-res full-screen zoom image viewer | Full-screen focused view |
| **System Loader** | `--z-loader` | `90` | Initial brand boot screen | Top-level system curtain |

---

## 3. Cart Drawer & Toast Interaction Priority

### Primary Feedback Principle
When a customer adds a product to their shopping bag:
1. The Cart Drawer immediately updates its internal state.
2. The Cart Drawer smoothly slides in from the right edge.
3. The newly added item, current subtotal, complimentary express shipping threshold bar, and checkout CTA are immediately presented.
4. **The Cart Drawer is the primary, authoritative confirmation.** Duplicate "Added to shopping bag" toasts are suppressed when the cart drawer opens.

### Zero Interaction Obstruction
- **Layer Isolation**: The Cart Drawer operates at `z-drawer: 60`, which is strictly above transient toasts at `z-toast: 50`.
- **Positioning**: Informational toasts are anchored at `top-16 sm:top-20 right-6` (or `top-16 left-4 right-4` on mobile), completely separated from the Cart Drawer footer at `bottom-right`.
- **Unblocked Actions**: The following actions are guaranteed 100% unobstructed, clickable, and accessible at all times:
  - Proceed to Checkout CTA
  - View Bag & Details CTA
  - Quantity Increment (`+`) & Decrement (`-`)
  - Item Removal (`Trash2`)
  - Cart Close (`X` and backdrop click)

---

## 4. Pointer Events & Focus Trapping

1. **Toast Overlay Container**:
   - The global toast container uses `pointer-events: none` and zero fixed width/height bloat so clicks pass through naturally to any underlying page elements.
   - Individual toast notification cards use `pointer-events: auto` scoped exclusively to their visible bounding box (enabling click on the `X` dismiss button).

2. **Drawer & Modal Backdrops**:
   - Fixed backdrops use `pointer-events: auto` to catch outside clicks and trigger clean dismissal.
   - Backdrop click handlers stop event propagation (`e.stopPropagation()`) on the inner panel to prevent accidental closures when interacting with internal drawer content.
   - Keydown listener catches `Escape` to close drawers/modals immediately.

---

## 5. Viewport Height (`100dvh`) Compliance

In accordance with the Evara Vastra Viewport Height Rule:
- All overlays, mobile navigation drawers, lightboxes, and modals utilize dynamic viewport height units:
  ```css
  min-height: 100dvh;
  height: 100dvh;
  max-height: 100dvh;
  ```
- No component may use legacy `100vh`, ensuring flawless rendering across iOS Safari and Android Chrome dynamic URL bars and bottom navigation shelves.

---

## 6. Visual Aesthetics & Color Rules

- **Surfaces**: Solid surfaces only. Zero `backdrop-filter`, `backdrop-blur`, or frosted glass effects.
- **Brand Accent**: `#734E06` (warm brown-gold).
- **Theme**: Pure light mode. Dark mode remains disabled.
