# EVARA VASTRA Admin Security & RBAC Policy

## 1. Authentication & Route Guarding
- **Authentication Check**: `/admin/*` routes are protected behind `AdminLayout` and `DataContext`.
- **Logged-out Redirection**: Any unauthenticated visitor accessing `/admin/*` is immediately redirected to the secure login interface at `/admin/login`.
- **Zero Hardcoded Secrets**: No secret API keys or private service tokens are exposed in public client bundles.

---

## 2. Role-Based Access Control (RBAC) Matrix

| Role | Scope Description | Accessible Modules | Restricted Modules |
| :--- | :--- | :--- | :--- |
| **Super Admin** (`superadmin`) | Full platform authority | All modules (Dashboard, Catalog, Inventory, Orders, Customers, Marketing, Content, Settings, Users, Audit Logs) | None |
| **Store Admin** (`admin`) | Full store operations manager | Dashboard, Products, Collections, Categories, Inventory, Orders, Customers, Coupons, Reviews, Content | Admin User Management (`/admin/users`) |
| **Order Manager** (`order_manager`) | Fulfillment and customer operations | Dashboard, Orders, Customers, Inventory Stock Levels | Catalog Creation, Coupons, CMS, Settings, Users, Audit Logs |
| **Content Lead** (`content_manager`) | Creative and editorial content lead | Dashboard, Homepage CMS, Notification Bar, Customer Reviews, Shoppable Videos, Craftsmanship, FAQs, Media | Orders, Financials, Inventory Mutating, Settings, Users |

---

## 3. Permission Enforcement & 403 Fallback
- When an operator navigates to a module outside their designated role, `AdminLayout` intercepts the route through `hasPermission(moduleKey)` and renders an explicit **403 Access Denied** panel without executing or fetching sensitive module mutations.
- The sidebar dynamically grays out and locks unauthorized module links with visual tooltips.

---

## 4. Immutable Audit Trail
- All mutations (stock level adjustments, order status progression, coupon creation, review moderation, user role modifications, and announcement updates) generate an immutable audit log entry in `auditLogs` containing:
  - `id`: Unique event identifier
  - `timestamp`: Date & time of the mutation
  - `actorName`, `actorEmail`, `actorRole`: Operator identity
  - `action`: Standardized event code (e.g. `ADJUST_INVENTORY`, `UPDATE_ORDER_STATUS`)
  - `entity`, `entityId`, `entityName`: Target affected record
  - `details`: Human-readable summary
  - `previousState` & `newState`: JSON payload diff
  - `severity`: Event classification (`info`, `warning`, `critical`)
- Logs are strictly read-only and exportable to CSV for compliance audits.
