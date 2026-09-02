# Homepage Hero Architecture & Guidelines

## 1. Overview
The Evara Vastra Homepage Hero has been redesigned into a full-width, image-led fashion hero that showcases high-definition atelier drapes and photography across the entire viewport width (`100vw`), while preserving standard container alignment for headline copy, typography, and call-to-actions.

---

## 2. Layout Architecture

```text
[-------------------------- FULL-WIDTH HERO (100vw) --------------------------]
[  [HeroMedia Layer: High-priority full-bleed image + subtle contrast veil]  ]
[  [PageContainer: Max-w-7xl content grid]                                    ]
[     ├── Eyebrow Badge ("NEW SEASON DROP • 2026")                           ]
[     ├── Editorial Headline ("Contemporary Indian Womenswear")              ]
[     ├── Supporting Narrative ("Discover handcrafted sarees...")            ]
[     ├── Primary CTA Button (#734E06) + Secondary Outline Button            ]
[     └── Atelier Trust Assurances                                           ]
[-----------------------------------------------------------------------------]
[  [PageContainer: Master Categories / Fresh Drops / Curations]              ]
```

### Component Structure
- `<FullBleedSection>`: Reusable edge-to-edge component ensuring true 100vw visual breakout with zero horizontal scrolling (`-ml-[50vw] -mr-[50vw] left-1/2 right-1/2 w-screen`).
- `HeroMedia`: High-priority `<picture>` element with `<source media="(max-width: 640px)">` for mobile optimization, `fetchPriority="high"`, `loading="eager"`, and `object-[center_20%]` positioning to preserve model and embroidery details.
- `HeroContent`: Nested inside `<PageContainer>` to align seamlessly with the rest of the storefront's content grid.

---

## 3. Responsive Height System & Guidelines

- **Viewport Height**: Implements `min-h-[78dvh] sm:min-h-[85dvh] lg:min-h-[92dvh] max-h-[100dvh]`.
- **Dynamic Viewport Unit**: Exclusively uses `100dvh` (Dynamic Viewport Height) for mobile browser address-bar transitions.
- **Rule**: `100vh` is strictly forbidden across the codebase to prevent mobile viewport shifting.

---

## 4. Visual Contrast & Accessibility

- **No Blur / No Glassmorphism**: Avoids `backdrop-filter`, `backdrop-blur`, and frosted glass cards to maintain an authentic, high-end editorial feel.
- **Controlled Overlay**: A subtle multi-stop linear gradient (`bg-gradient-to-t from-black/85 via-black/45 to-black/25 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/45 sm:to-transparent`) ensures AAA contrast for white serif typography on any photography background.
- **Brand CTA Styling**:
  - Primary CTA: Background `#734E06`, Foreground `#FFFFFF`, Hover `#5C3E05`.
  - Secondary CTA: Semi-transparent white outline with smooth background transition on hover.
  - Minimum touch target: `44px` height on all devices.
- **Motion Accessibility**: Includes `motion-reduce:animate-none` and `motion-reduce:transform-none` to respect `prefers-reduced-motion`.

---

## 5. Responsive Testing Matrix
Verified without horizontal overflow across:
- **320px** (iPhone SE 1st gen)
- **360px** (Galaxy S8 / small Android)
- **375px** (iPhone SE / iPhone Mini)
- **390px** (iPhone 13/14/15)
- **412px** (Google Pixel 7)
- **430px** (iPhone Pro Max)
- **768px** (iPad / Tablet portrait)
- **1024px** (iPad Pro / Small Laptop)
- **1280px / 1440px / 1920px** (Desktop & Ultra-wide displays)
