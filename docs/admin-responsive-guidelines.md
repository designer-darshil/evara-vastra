# Admin Responsive Guidelines & Layout Principles

**Application**: EVARA VASTRA Atelier Administration Suite  
**Document Version**: 1.0.0  
**Updated**: September 2026  

---

## 1. Viewport Breakpoints & Strategy

The Evara Vastra Admin Panel is engineered for zero-overflow responsiveness across small mobile displays, tablets, and wide workstation monitors.

| Breakpoint Range | Device Class | Layout Adaptation |
|---|---|---|
| **320px – 430px** | Compact & Standard Phones (iPhone SE, Pixel, Galaxy) | Off-canvas mobile navigation, single-column forms, stacked data cards, sticky action footer |
| **768px – 1024px** | Tablets & Small Laptops (iPad, Surface) | Collapsible sidebar, 2-column forms, internal scroll data tables |
| **1024px – 1920px+** | Desktop & Ultra-wide Workstations | Persistent sidebar (64rem), 2-column Product Editor with side summary card, full data tables |

---

## 2. Zero-Overflow Rules

1. **Flexible Widths**: Avoid `100vw` inside nested flex containers; use `w-full` and `min-w-0` on flex items.
2. **Table Strategy**:
   - Small screens (`<640px`): Switch to stacked cards with primary data and direct action buttons.
   - Large screens (`>=640px`): Full table enclosed inside `<div className="overflow-x-auto min-w-0">`.
3. **Touch Targets**: Minimum 44px hit bounds for all primary actions, navigation items, and dropdown triggers.
4. **Form Controls**: All inputs, selects, and textareas use responsive percentage widths (`w-full`) and wrap predictably.

---

## 3. Product Editor Layout Rules

- **Desktop (>=1024px)**:
  - **Main Column (col-span-2)**: Identification, Media Gallery, Artisan Description, Variants Matrix, Shipping, SEO.
  - **Side Column (col-span-1)**: Publishing & Status, Pricing, Inventory & Stock, Delete Danger Zone.
- **Mobile (<1024px)**: Single-column linear flow with sticky bottom action bar (`[ Save Draft ] [ Save Product ]`).
- **Unsaved Changes**: Guard modal prompts administrator before discarding unsaved edits.
