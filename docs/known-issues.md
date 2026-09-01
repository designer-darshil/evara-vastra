# Known Issues (High Severity)

## 1. Security & Authentication
- **Customer Authentication Missing**: No way for customers to register, login, or view order history.
- **Admin Authorization Bypass**: Admin routes are protected purely on the client-side (`isAdminAuthenticated` in React State), meaning the frontend code exposes the entire admin dashboard source code to any user who inspects the JS bundle.
- **Client-Trusted Pricing**: The cart and checkout systems rely on the price stored in `localStorage` or React state, which can be easily modified by a malicious user before placing an order.

## 2. E-Commerce Core Logic
- **Missing Payment Gateway Integration**: Checkout does not interact with a payment provider (Stripe, Razorpay). Orders are created locally without capturing funds.
- **Inventory Disconnect**: Purchasing an item does not decrement the central inventory count in a race-condition-safe manner.

## 3. SEO & Performance
- **Dynamic SEO Missing**: A React SPA without SSR or dynamic meta tags (via `react-helmet-async`) will not be indexed properly for individual product pages.
- **Monolithic Bundle**: No code-splitting is configured, leading to a massive initial JavaScript payload.
