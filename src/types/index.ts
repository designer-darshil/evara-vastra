// ==========================================
// EVARA VASTRA — Complete Data Models
// ==========================================

export type ProductStatus = "published" | "draft" | "archived";

export interface ProductVariant {
  id: string;
  title: string;
  size?: string;
  color?: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  sku?: string;
  featuredImage?: string;
}

export interface ProductDetails {
  origin?: string;
  fabric?: string;
  craft?: string;
  length?: string;
  width?: string;
  blousePiece?: boolean;
  blouseLength?: string;
  blouseDescription?: string;
  care?: string;
  packageDetails?: string;
  topFabric?: string;
  bottomFabric?: string;
  dupattaFabric?: string;
  work?: string;
  weaveType?: string;
  zariType?: string;
  craftTime?: string;
  weight?: string;
  palluDetails?: string;
  borderDetails?: string;
  boxIncludes?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  code?: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  images: string[];
  category: string;
  collection?: string;
  collections: string[];
  variants: ProductVariant[];
  sizes: string[];
  colors: string[];
  colorHex?: string;
  fabric: string;
  craft: string;
  color: string;
  occasions: string[];
  inventory: number;
  inventoryCount: number;
  inStock: boolean;
  status: ProductStatus;
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  tags: string[];
  details: ProductDetails;
  stylingNotes?: string;
  drapeTip?: string;
  seoTitle?: string;
  seoDescription?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  image: string;
  order?: number;
  isEnabled: boolean;
  productsCount?: number;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  season?: string;
  editorialStatement?: string;
  story?: string;
  heroImage: string;
  productIds?: string[];
  isPublished: boolean;
  isFeaturedOnHome?: boolean;
  order?: number;
}

export interface ShoppableVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productSlug: string;
  ctaText: string;
  isPublished: boolean;
  order: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerified: boolean;
  productId?: string;
  productTitle?: string;
  status: "approved" | "pending" | "rejected";
  isFeaturedOnHome: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isMegaMenu?: boolean;
  order: number;
  isEnabled: boolean;
}

export interface NotificationBarConfig {
  isEnabled: boolean;
  message: string;
  link: string;
  linkText: string;
  backgroundStyle: "wine" | "dark" | "gold";
  isDismissible: boolean;
  showOnMobile: boolean;
  showOnDesktop: boolean;
}

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon: string;
  isEnabled: boolean;
}

export interface CraftsmanshipStep {
  id: string;
  step?: string;
  stepNumber?: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  details?: string[];
}

export interface CraftsmanshipCMS {
  heroTitle?: string;
  heroHeading?: string;
  heroSubhead?: string;
  heroSubtitle?: string;
  introNarrative?: string;
  heroImage: string;
  steps: CraftsmanshipStep[];
  manifesto?: string;
}

export interface LookbookItem {
  id: string;
  season?: string;
  lookNumber?: string;
  title: string;
  subtitle?: string;
  narrative?: string;
  image: string;
  location?: string;
  sareeName?: string;
  sareeSlug?: string;
  productTitle?: string;
  productPrice?: number;
  productSlug?: string;
  productFabric?: string;
  stylingDetails?: string[];
  palette?: string[];
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  isPublished?: boolean;
  isEnabled?: boolean;
}

export interface HomepageCMS {
  heroHeading: string;
  heroAccentWord: string;
  heroSubheading: string;
  heroBadge: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  heroImage: string;
  featuredCategoryIds: string[];
  featuredProductIds: string[];
  newArrivalProductIds: string[];
  premiumSareeCollectionSlug: string;
  featuredCollectionSlug?: string;
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  trustSignals: TrustSignal[];
  newsletterTitle: string;
  newsletterSubtitle: string;
  manifestoImage?: string;
  manifestoLoomImage?: string;
  manifestoQuote?: string;
  manifestoNarrative1?: string;
  manifestoNarrative2?: string;
  sectionVisibility: {
    notificationBar: boolean;
    hero: boolean;
    marquee: boolean;
    categories: boolean;
    newArrivals?: boolean;
    featuredProducts?: boolean;
    premiumSarees?: boolean;
    otherCollections?: boolean;
    whyChooseUs?: boolean;
    shoppableVideos?: boolean;
    reviews?: boolean;
    trustSignals?: boolean;
    newsletter: boolean;
    featuredCollection?: boolean;
    brandStory?: boolean;
    fabricDiscovery?: boolean;
    occasionGrid?: boolean;
    lookbookTeaser?: boolean;
    customerNotes?: boolean;
  };
}

export interface SiteSettings {
  name: string;
  tagline: string;
  slogan: string;
  domain: string;
  email: string;
  phone: string;
  whatsapp: string;
  atelierAddress: string;
  freeShippingThreshold: number;
  prepaidDiscountPercentage: number;
  standardShippingFee: number;
  codAvailable: boolean;
  returnWindowDays: number;
  instagramUrl: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  copyrightText: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
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
  variantTitle?: string;
  fabric?: string;
  size?: string;
  color?: string;
  blouseOptIn?: boolean;
}

export interface OrderTimelineEvent {
  title: string;
  timestamp: string;
  completed: boolean;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Cash on Delivery" | "Refunded";
  trackingNumber?: string;
  carrier?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  prepaidDiscount?: number;
  total: number;
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
  lastOrderDate: string;
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

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  category: "products" | "hero" | "videos" | "banners";
  createdAt: string;
}

export type AdminRole = "superadmin" | "admin" | "content_manager" | "order_manager";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export type AuditLogSeverity = "info" | "warning" | "critical";

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorEmail: string;
  actorRole: AdminRole;
  action: string;
  entity: "product" | "inventory" | "order" | "coupon" | "review" | "cms" | "notification" | "user" | "settings" | "category" | "collection" | "auth";
  entityId?: string;
  entityName?: string;
  details: string;
  previousState?: any;
  newState?: any;
  timestamp: string;
  severity: AuditLogSeverity;
}

export type InventoryAdjustmentReason =
  | "restock"
  | "sale"
  | "correction"
  | "return"
  | "damaged"
  | "manual";

export interface InventoryAdjustment {
  id: string;
  productId: string;
  productTitle: string;
  productSku: string;
  variantId?: string;
  variantTitle?: string;
  previousInventory: number;
  newInventory: number;
  changeAmount: number;
  reason: InventoryAdjustmentReason;
  note?: string;
  actorName: string;
  actorEmail: string;
  timestamp: string;
}
