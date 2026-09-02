# EVARA VASTRA — Luxury Heritage Saree Atelier & Commerce Suite

> **Where Elegance Meets Heritage.** A production-grade, bespoke Indian ethnic wear e-commerce web platform and luxury administrative suite crafted for artisanal Banarasi, Katan Silk, Organza, and Chiniya Silk sarees.

---

## 🏛️ Project Overview

**Evara Vastra** is a modern e-commerce storefront and enterprise-level admin portal designed for luxury handloom fashion. Built with React 18, TypeScript, Tailwind CSS, and Vite, it delivers an editorial, high-performance shopping experience with verified catalog data, real-time inventory tracking, Shiprocket carrier integration, and a role-based administrative control suite.

---

## ✨ Key Features

### 🛍️ Storefront Experience
- **Image-Led Fashion Hero**: Full-viewport visual hero with editorial headlines, dynamic accent typography, and direct collection triggers.
- **Categorized Curations**: Verified category and collection routing for Sarees, Co-ord Sets, Kurta Sets, Printed Co-ord Sets, and Silk Edits.
- **Multi-Dimensional Filters**: Desktop sidebar and mobile sheet filtering by Fabric (Katan, Organza, Georgette, Chiniya), Occasion (Bridal, Festive, Evening), Color Palette, Price Range, and Availability.
- **Mobile Product Gallery**: Gesture-friendly mobile carousel with interactive thumbnail strips, pinch-zoom, and vertical page scroll integrity.
- **Shoppable Video Reels**: Vertical reels displaying artisanal saree draping with instant one-click product purchase modals.
- **Editorial Lookbook**: Curated seasonal styling stories with connected product quick-links.
- **Bag & Express Checkout**: Integrated cart drawer, order summary, promotional coupon engine, prepaid discount calculations, and address manager.

### 🛡️ Administrative Control Suite (`/admin`)
- **Executive KPI Dashboard**: Real-time gross revenue, average order value (AOV), weekly sales trends, low stock alerts, and live notification monitors.
- **Product Management & CRUD**: Dual media uploads (direct high-res image URL input + drag-and-drop local file storage), variant matrix, dimensions, and SEO meta tags.
- **Inventory & Warehouse Tracking**: Real-time SKU stock levels, low-stock alerts ($\le 3$ units), stock adjustments dialog with audit logging.
- **Orders & Fulfillment**: Complete order journey timeline, status mutation modal, item breakdowns, and financial summaries.
- **Shiprocket Logistics**: Automated AWB generation, courier allocation (Delhivery, Blue Dart, Xpressbees), live carrier sync, and dispatch labels.
- **Patron & Customer Directory**: Customer lifetime spend metrics, contact directory, and order history tracking.
- **Voucher & Coupon Engine**: Customizable percentage and fixed-value discount promo codes with minimum basket thresholds and expiration rules.
- **Review Moderation**: Star rating approvals, verified buyer flags, and storefront testimonial pinning.
- **Visual CMS Hub**: Direct controls for homepage banners, announcement ribbons, FAQ knowledge base, craftsmanship narratives, and header menu links.
- **Account Security & RBAC**: PBKDF2 with SHA-256 (100,000 iterations) salted password hashing, live password strength validator, and role-based permissions (Super Admin, Store Admin, Order Manager, Content Lead).

---

## 🔐 Administrative Access & Security

The administrative suite is accessible at `/admin`. Authentication is secured with cryptographic PBKDF2 / SHA-256 password hashing and role-based access control (RBAC).

- **Admin Login Route**: `/admin/login`
- **Security Management**: Change password and manage session credentials via `/admin/settings/security`.
- **Role Hierarchy**: Super Admin, Store Admin, Order Manager, and Content Lead.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with curated luxury HSL palettes (`#734E06`, `#141210`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Storage**: React Context + IndexedDB / LocalStorage Data Layer with self-healing cryptographic verification
- **Deployment Target**: Vercel / Netlify / Node.js Static Server

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/designer-darshil/evara-vastra.git
cd evara-vastra

# Install dependencies
npm install
```

### 3. Development Server
```bash
# Start local Vite development server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Production Build & Validation
```bash
# Type check and build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### 5. Validate Admin Cryptographic Suite
```bash
# Run standalone authentication verification diagnostic
node scripts/validate-admin.cjs
```

---

## 📂 Project Architecture

```
evara-vastra/
├── src/
│   ├── admin/                     # Admin control suite pages
│   │   ├── AdminDashboardPage.tsx
│   │   ├── AdminProductsPage.tsx
│   │   ├── AdminProductEditPage.tsx
│   │   ├── AdminOrdersPage.tsx
│   │   ├── AdminOrderDetailPage.tsx
│   │   ├── AdminInventoryPage.tsx
│   │   ├── AdminShipmentsPage.tsx
│   │   ├── AdminCustomersPage.tsx
│   │   ├── AdminCouponsPage.tsx
│   │   ├── AdminReviewsPage.tsx
│   │   ├── AdminSecurityPage.tsx
│   │   ├── AdminSettingsPage.tsx
│   │   ├── AdminAuditLogsPage.tsx
│   │   ├── AdminAnalyticsPage.tsx
│   │   ├── AdminHomepageCMSPage.tsx
│   │   ├── AdminNotificationBarPage.tsx
│   │   ├── AdminLookbookPage.tsx
│   │   ├── AdminMediaPage.tsx
│   │   └── AdminNavigationPage.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   └── ui/                # Reusable Admin UI primitives (PageHeader, Card, Field, Inputs, Badge, Toolbar)
│   │   ├── common/                # Shared layout components (Header, Footer, Breadcrumbs, etc.)
│   │   ├── home/                  # Storefront sections (Hero, Features, LookbookTeaser, Marquee)
│   │   ├── product/               # Product gallery, card, and detail components
│   │   └── shop/                  # Store catalog, filter sheets, and sorting
│   ├── context/
│   │   └── DataContext.tsx        # Centralized data store, product catalog, orders, and authentication
│   ├── data/
│   │   └── initialData.ts         # Master seed product records, categories, collections, and admin users
│   ├── lib/
│   │   ├── auth/                  # PBKDF2 cryptographic utilities & session management
│   │   ├── media/                 # Storage abstraction & image upload handlers
│   │   └── shiprocket/            # Logistics API, AWB generator & tracking mock/live client
│   ├── types/
│   │   └── index.ts               # Complete TypeScript domain models
│   ├── App.tsx                    # Root routing engine & page router
│   ├── index.css                  # Global design tokens, typography, and responsive utilities
│   └── main.tsx                   # React root entry point
├── scripts/
│   └── validate-admin.cjs         # CLI diagnostic tool for admin authentication verification
├── public/                        # Static public assets & brand icons
├── package.json                   # Project scripts and dependencies
├── tailwind.config.js             # Tailwind design tokens & breakpoints
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler configuration
```

---

## 📐 Design System & Guidelines

- **Primary Brand Color**: Rich Antique Gold / Ochre (`#734E06`)
- **Accent & Dark Surface**: Atelier Noir (`#141210`)
- **Typography**: Playfair Display (Headings) + Plus Jakarta Sans / Inter (Body)
- **Viewport Constraints**: Strict `100dvh` usage across modals and sheets (strictly no `100vh`)
- **Aesthetics**: Light mode only, zero backdrop blur, clean solid cards with subtle borders (`border-neutral-200`)
- **Responsive Standard**: Tested and verified across 320px, 375px, 414px, 768px, 1024px, 1440px, and 1920px.

---

## 📜 License

Private & Proprietary. Copyright © 2026 Evara Vastra Atelier. All rights reserved.
