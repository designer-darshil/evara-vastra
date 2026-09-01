# EVARA VASTRA Administration Control Suite Documentation

## Overview
The **Evara Vastra Administration Suite** is a dedicated, production-grade commerce, catalog, fulfillment, and content management dashboard for the Surat Atelier. It operates strictly under a secluded admin workspace (`/admin/*`) completely separated from public discovery on the customer storefront.

---

## 1. Information Architecture & Navigation Hierarchy

The sidebar is organized into clean, functional operational domains:

### **Dashboard**
- **Route**: `/admin`
- **Capabilities**: High-level KPIs (Total Sales Volume, Order Volume, Catalog Count, Low Stock Watch), 7-day revenue velocity visualizer, real-time storefront announcement broadcast monitor, recent orders requiring action, quick links.

### **Catalog & Inventory**
- **Products** (`/admin/products`): Saree catalog directory, category filters, publish/draft toggling, SKU search, duplicate and deletion operations.
- **Product Editor** (`/admin/products/new`, `/admin/products/edit/:id`): Tabbed editor covering Basic Info, Pricing & Compare-at, Inventory Thresholds, Variants, Media Alt Text & Reordering, Saree Specifications, SEO Meta.
- **Inventory & Stock** (`/admin/inventory`): SKU-level inventory controls, stock adjustments with mandatory audit reason codes (`restock`, `sale`, `correction`, `return`, `damaged`, `manual`), stock level alerts.
- **Collections** (`/admin/collections`): Curated seasonal collections and weave groupings.
- **Categories** (`/admin/categories`): Primary silhouette categories (Sarees, Co-ord Sets, Kurta Sets, Lehengas).

### **Commerce & Fulfillment**
- **Orders** (`/admin/orders`): Order registry, filtering by status (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`, `Returned`), instant status modal.
- **Order Details** (`/admin/orders/:id`): Customer contact & shipping address, line items breakdown, pricing & discounts, financial summary, and fulfillment journey timeline with courier tracking.
- **Customers** (`/admin/customers`): Client account directory, lifetime spend totals, orders count, contact credentials.
- **Coupons & Discounts** (`/admin/coupons`): Promo code creator, percentage/flat discounts, min. order threshold, max. discount cap, validity windows, active toggles.

### **Content & Marketing**
- **Customer Reviews** (`/admin/reviews`): Verified buyer review moderation queue (Approve, Reject, Delete, Pin to Homepage Carousel).
- **Homepage CMS** (`/admin/content/homepage`): Visual hero heading/subhead, CTA links, section visibility toggles, trust badges, manifesto text.
- **Notification Bar** (`/admin/notifications`): Top announcement banner message, optional CTA link, background theme (`#734E06`, gold, dark), and dismissal controls.
- **Shoppable Videos** (`/admin/shoppable-videos`): Reel/video drape previews linked to specific sarees.
- **Craftsmanship Story** (`/admin/craftsmanship`): Weave steps, pit loom heritage, silk mark credentials.
- **FAQs & Help** (`/admin/faqs`): FAQ accordion questions and answers categorized by topic.
- **Media Library** (`/admin/media`): Centralized CDN imagery and video assets.

### **System & Settings**
- **Store Settings** (`/admin/settings`): Official brand identity, support hotlines, prepaid discounts, COD availability, SEO title defaults, database reset.
- **Admin Users & RBAC** (`/admin/users`): Multi-user account manager with Role-Based Access Control (Super Admin, Store Admin, Order Manager, Content Lead).
- **System Audit Logs** (`/admin/audit-logs`): Read-only event stream recording all operator mutations with JSON payload diffs, search, severity badges, and CSV export.
- **Analytics & Reports** (`/admin/analytics`): Performance charts and category breakdowns.

---

## 2. Customer-Facing Seclusion
- **Zero Public Links**: All links to `/admin` or "Admin Portal" have been completely eradicated from the public storefront (Navbar, Mobile Menu, Footer, Account pages).
- **Access Method**: Admin access is exclusively accessible by direct navigation to `/admin` or `/admin/login`.
