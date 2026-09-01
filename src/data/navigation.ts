export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string; description?: string }[];
}

export const navigationLinks: NavItem[] = [
  {
    label: "SHOP",
    href: "/shop",
    children: [
      { label: "All Sarees", href: "/shop", description: "View the entire contemporary catalog" },
      { label: "Pure Silk", href: "/shop/silk", description: "Mulberry and Katan silks" },
      { label: "Royal Banarasi", href: "/shop/banarasi", description: "Heirloom Kadwa brocades" },
      { label: "Mulmul & Cotton", href: "/shop/cotton", description: "Lightweight breathable weaves" },
      { label: "Sheer Organza", href: "/shop/organza", description: "Translucent festive elegance" },
      { label: "Pure Linen", href: "/shop/linen", description: "Architectural organic flax" },
      { label: "Chanderi", href: "/shop/chanderi", description: "Gossamer silk-cotton drapes" },
    ],
  },
  {
    label: "COLLECTIONS",
    href: "/collections",
    children: [
      { label: "The Silk Edit", href: "/collections/silk-edit", description: "Fluid mulberry silhouettes" },
      { label: "Varanasi Kadwa Archive", href: "/collections/royal-banarasi", description: "Heirloom master weaves" },
      { label: "Monsoon Cottons", href: "/collections/monsoon-cottons", description: "Airy summer staples" },
      { label: "Noor Organza", href: "/collections/noor-organza", description: "Ethereal evening sheer" },
      { label: "Minimalist Handlooms", href: "/collections/minimal-handlooms", description: "Natural unbleached fibers" },
    ],
  },
  { label: "NEW ARRIVALS", href: "/shop?filter=newArrival", badge: "NEW" },
  { label: "CRAFT", href: "/craftsmanship" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "ABOUT", href: "/about" },
];

export const footerLinks = {
  shop: [
    { label: "All Sarees", href: "/shop" },
    { label: "The Silk Edit", href: "/collections/silk-edit" },
    { label: "Varanasi Brocades", href: "/collections/royal-banarasi" },
    { label: "Organza Drapes", href: "/collections/noor-organza" },
    { label: "Everyday Handlooms", href: "/shop/handloom" },
    { label: "New Arrivals", href: "/shop?filter=newArrival" },
  ],
  craft: [
    { label: "Artisanal Weaves", href: "/craftsmanship" },
    { label: "The Banarasi Kadwa Loom", href: "/craftsmanship" },
    { label: "Natural Dye Palette", href: "/craftsmanship" },
    { label: "Saree Care Manual", href: "/faq#care" },
    { label: "Campaign Lookbook", href: "/lookbook" },
  ],
  about: [
    { label: "Our Story & Atelier", href: "/about" },
    { label: "Ethical Craft Manifesto", href: "/about" },
    { label: "Concierge & Appointments", href: "/contact" },
    { label: "Client Inquiries & FAQ", href: "/faq" },
  ],
  clientCare: [
    { label: "Track Your Order", href: "/orders" },
    { label: "My Account", href: "/account" },
    { label: "Saved Pieces (Wishlist)", href: "/wishlist" },
    { label: "Shipping & Worldwide Delivery", href: "/faq" },
    { label: "Returns & Exchanges", href: "/faq" },
  ],
};
