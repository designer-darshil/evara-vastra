# Information Architecture (Recommended)

## Global Navigation
- **Home**
- **Shop by Category**
  - Co-ord Sets
  - Kurta Sets
  - Sarees
  - Everyday Elegance (Signature Collection)
- **About Us**
- **Track Order**

## Footer Navigation
- **Customer Care**
  - Contact Us
  - Shipping Policy
  - Replacement & Exchange Policy
- **Legal**
  - Privacy Policy
  - Terms of Service
- **Social Connect**
  - Instagram
  - Facebook

## Database Entities Required
- `Product` (id, slug, title, description, vendor, tags, fabric, active)
- `ProductVariant` (id, product_id, sku, price, compare_at_price, size, color, inventory_qty)
- `Category` (id, slug, title, description, parent_id)
- `Image` (id, entity_id, entity_type, url, alt, position)
- `Review` (id, product_id, author, rating, content, date)
- `Page` (id, slug, title, html_content)
- `Video` (id, shoppable_url, thumbnail, product_id)

## Admin Entities Required
- **Dashboard / Metrics**
- **Products & Variants Management**
- **Categories / Collections Management**
- **Orders & Fulfillments**
- **Customers**
- **Reviews Moderation**
- **Content Pages & Policies**
- **Hero & Video Banners Management**
