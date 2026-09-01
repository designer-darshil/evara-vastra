export interface ProductDetails {
  length: string;
  width: string;
  blousePiece: boolean;
  blouseLength: string;
  blouseDescription: string;
  weaveType: string;
  zariType?: string;
  weight: string;
  origin: string;
  craftTime: string;
  care: string;
  palluDetails: string;
  borderDetails: string;
  boxIncludes: string;
}

export type ProductStatus = "published" | "draft" | "archived";

export interface Product {
  id: string;
  slug: string;
  title: string;
  code: string;
  category: string;
  collection: string;
  price: number;
  compareAtPrice: number | null;
  fabric: string;
  color: string;
  colorHex: string;
  occasions: string[];
  craft: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  inStock: boolean;
  inventoryCount: number;
  status: ProductStatus;
  images: string[];
  details: ProductDetails;
  stylingNotes: string;
  drapeTip: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  itemCount?: number;
  isEnabled: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  editorialStatement: string;
  heroImage: string;
  story: string;
  season: string;
  isPublished: boolean;
  featured?: boolean;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned";

export interface OrderItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  fabric: string;
  blouseOptIn?: boolean;
}

export interface OrderTimelineEvent {
  title: string;
  timestamp: string;
  note?: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Cash on Delivery";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  trackingNumber: string;
  carrier?: string;
  items: OrderItem[];
  timeline: OrderTimelineEvent[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpend: number;
  joinedDate: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt: string;
  isActive: boolean;
  usageCount: number;
}

export interface NotificationBarConfig {
  isEnabled: boolean;
  message: string;
  link: string;
  linkText: string;
  backgroundStyle: "dark" | "wine" | "gold";
  isDismissible: boolean;
}

export interface HomepageCMS {
  heroHeading: string;
  heroAccentWord: string;
  heroSubheading: string;
  heroBadge: string;
  heroImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  featuredCollectionSlug: string;
  manifestoQuote: string;
  manifestoNarrative1: string;
  manifestoNarrative2: string;
  manifestoImage: string;
  manifestoLoomImage: string;
  sectionVisibility: {
    hero: boolean;
    marquee: boolean;
    categories: boolean;
    featuredCollection: boolean;
    brandStory: boolean;
    fabricDiscovery: boolean;
    occasionGrid: boolean;
    lookbookTeaser: boolean;
    customerNotes: boolean;
    newsletter: boolean;
  };
}

export interface CraftStep {
  step: string;
  title: string;
  description: string;
  image: string;
}

export interface CraftsmanshipCMS {
  heroHeading: string;
  heroSubhead: string;
  introNarrative: string;
  steps: CraftStep[];
}

export interface LookbookItem {
  id: string;
  lookNumber: string;
  title: string;
  season: string;
  location: string;
  narrative: string;
  image: string;
  productSlug: string;
  productTitle: string;
  productPrice: number;
  productFabric: string;
  stylingDetails: string[];
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "shipping" | "craft" | "care" | "returns" | "blouse";
  isEnabled: boolean;
  order: number;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  category: "products" | "collections" | "hero" | "craft" | "editorial";
  dimensions?: string;
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  slogan: string;
  email: string;
  phone: string;
  whatsapp: string;
  atelierAddress: string;
  hours: string;
  currencySymbol: string;
  currencyCode: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  copyrightText: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "Administrator" | "Store Manager";
  avatar?: string;
}
