import {
  Product,
  Category,
  Collection,
  ShoppableVideo,
  Review,
  NavigationItem,
  NotificationBarConfig,
  HomepageCMS,
  SiteSettings,
  Order,
  Customer,
  Coupon,
  MediaAsset,
  AdminUser,
  FAQItem,
  LookbookItem,
  CraftsmanshipCMS,
  AuditLog,
  InventoryAdjustment,
  Shipment,
  PickupLocation,
  ShippingSettings,
} from "../types";

export const initialSiteSettings: SiteSettings = {
  name: "EVARA VASTRA",
  tagline: "Contemporary Indian Womenswear / Festive Elegance / Everyday Luxury",
  slogan: "Rooted in craft. Designed for modern living.",
  domain: "evaravastra.com",
  email: "evaravastra@gmail.com",
  phone: "+91-92743 44037",
  whatsapp: "+91 92743 44037",
  atelierAddress: "Surat, Gujarat 395002, India",
  freeShippingThreshold: 0,
  prepaidDiscountPercentage: 10,
  standardShippingFee: 0,
  codAvailable: true,
  returnWindowDays: 7,
  instagramUrl: "https://instagram.com/evaravastra",
  facebookUrl: "https://facebook.com/evaravastra",
  copyrightText: "© 2026 EVARA VASTRA. ALL RIGHTS RESERVED. HANDCRAFTED IN INDIA.",
  seoDefaultTitle: "EVARA VASTRA — Contemporary Indian Womenswear | Sarees, Co-Ords & Kurta Sets",
  seoDefaultDescription: "Shop authentic Indian womenswear from Evara Vastra. Premium Sarees, Designer Co-Ord Sets, Chinon Kurti Palazzo Sets, and Anarkali Gowns with Free Pan-India Delivery.",
};

export const initialCategories: Category[] = [
  {
    id: "cat-sarees",
    name: "Sarees",
    slug: "sarees",
    description: "Signature Fendy Satin, Silver Tissue Silk, and Resham Embroidered Sarees.",
    image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
    order: 1,
    isEnabled: true,
  },
  {
    id: "cat-coord-sets",
    name: "Co-ord Sets",
    slug: "coord-sets",
    description: "Everyday elegance and printed luxury cotton & rayon two-piece sets.",
    image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081",
    order: 2,
    isEnabled: true,
  },
  {
    id: "cat-kurta-sets",
    name: "Kurta Sets",
    slug: "kurta-sets",
    description: "Premium Chinon, Fandy Silk, and Chikankari Kurti Palazzo Sets with Dupatta.",
    image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232474.jpg?v=1788178083",
    order: 3,
    isEnabled: true,
  },
  {
    id: "cat-anarkali-suits",
    name: "Suits / Anarkali",
    slug: "anarkali-suits",
    description: "Royal heavy embroidered Anarkali gowns and festive party wear suit sets.",
    image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292676_1.jpg?v=1788175657",
    order: 4,
    isEnabled: true,
  },
  {
    id: "cat-dresses",
    name: "Dresses",
    slug: "dresses",
    description: "Contemporary fusion gowns and relaxed ethnic dresses for day and evening wear.",
    image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292726.jpg?v=1788175380",
    order: 5,
    isEnabled: true,
  },
  {
    id: "cat-everyday-elegance",
    name: "Everyday Elegance",
    slug: "everyday-elegance",
    description: "Breathable cottons, subtle prints, and versatile silhouettes for daily luxury.",
    image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/82c860e5-4272-4ae8-a831-e35a077d1b29.jpg?v=1787126081",
    order: 6,
    isEnabled: true,
  },
];

export const initialCollections: Collection[] = [
  {
    id: "col-premium-sarees",
    title: "Premium Collection Saree",
    slug: "premium-collection-saree",
    subtitle: "Lumiere, Ruhani, Rasiya, Arzoo & Aurelia",
    season: "Festive & Wedding 2026",
    editorialStatement: "Heavy Zari Embroidery, Cutwork Borders & Luxe Satin Drapes",
    story: "Our flagship saree anthology features hand-embellished Fendy satin, tissue silks, and cutwork borders designed for grand celebrations.",
    heroImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
    productIds: [],
    isPublished: true,
    isFeaturedOnHome: true,
    order: 1,
  },
  {
    id: "col-aurelia",
    title: "Aurelia Saree Edit",
    slug: "aurelia-saree",
    subtitle: "Floral Embroidery & Fendy Satin",
    season: "Autumn / Winter 2026",
    editorialStatement: "Rich Jewel Tones in Royal Purple, Wine & Emerald",
    story: "Aurelia embodies festive glamour with intricate floral motifs and fluid silk drapes.",
    heroImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
    productIds: [],
    isPublished: true,
    isFeaturedOnHome: true,
    order: 2,
  },
  {
    id: "col-everyday",
    title: "Everyday Elegance",
    slug: "everyday-elegance",
    subtitle: "Breathable Rayon & Pure Cotton Sets",
    season: "Year-Round Comfort",
    editorialStatement: "Effortless Two-Piece Silhouettes for Work & Travel",
    story: "Crafted for comfort without compromising style. Breathable sets that take you seamlessly from desk to dinner.",
    heroImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081",
    productIds: [],
    isPublished: true,
    isFeaturedOnHome: true,
    order: 3,
  },
  {
    id: "col-new-arrivals",
    title: "New Season Arrivals",
    slug: "new-arrivals",
    subtitle: "Fresh Drops in Festive & Contemporary Wear",
    season: "Latest 2026 Drop",
    editorialStatement: "The Newest Embroidered Ensembles & Co-Ords",
    story: "Discover the latest styles fresh from our Surat ateliers.",
    heroImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232474.jpg?v=1788178083",
    productIds: [],
    isPublished: true,
    isFeaturedOnHome: false,
    order: 4,
  },
  {
    id: "col-bestsellers",
    title: "Bestselling Favorites",
    slug: "bestsellers",
    subtitle: "Loved by Over 50,000+ Patrons Across India",
    season: "All-Time Curations",
    editorialStatement: "Proven Customer Favorites with 4.87 Star Satisfaction",
    story: "Our most requested sarees and kurta sets, praised for fabric softness and embroidery finesse.",
    heroImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292676_1.jpg?v=1788175657",
    productIds: [],
    isPublished: true,
    isFeaturedOnHome: false,
    order: 5,
  },
];

export const initialShoppableVideos: ShoppableVideo[] = [
  {
    id: "vid-1",
    title: "Fandy Silk Heavy Embroidery Kurti Set in Mehndi Green",
    description: "Detailed drape of the Fandy silk co-ord kurti featuring intricate sequence and codding zari work.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    mobileVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232474.jpg?v=1788178083",
    posterUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232474.jpg?v=1788178083",
    productId: "ev-8117987737690",
    productTitle: "FANDY Silk With Heavy Embroidery Codding & Sequence Work",
    productPrice: 2999,
    productSlug: "fandy-silk-with-heavy-embroidery-codding-sequence-work-and-full-sleeve",
    ctaText: "Shop This Look →",
    ctaUrl: "/products/fandy-silk-with-heavy-embroidery-codding-sequence-work-and-full-sleeve",
    isPublished: true,
    order: 1,
    autoplay: true,
    muted: true,
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-02-15T10:00:00.000Z",
  },
  {
    id: "vid-2",
    title: "Silver Tissue Silk Designer Embroidery Saree in Ruby Red",
    description: "Experience the metallic sheen and featherlight drape of our signature ruby red tissue silk saree.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    mobileVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
    posterUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
    productId: "ev-8117975711834",
    productTitle: "Silver Tissue Silk Designer Embroidery Saree Collection",
    productPrice: 2199,
    productSlug: "silver-tissue-silk-designer-embroidery-saree-collection",
    ctaText: "Shop Saree Drape →",
    ctaUrl: "/products/silver-tissue-silk-designer-embroidery-saree-collection",
    isPublished: true,
    order: 2,
    autoplay: true,
    muted: true,
    createdAt: "2026-02-16T11:30:00.000Z",
    updatedAt: "2026-02-16T11:30:00.000Z",
  },
  {
    id: "vid-3",
    title: "Gold Crunchy Saree with Sequins Embroidery & Cutwork",
    description: "Showcasing the scalloped cutwork border and shimmer finish in festive lighting.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    mobileVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
    posterUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
    productId: "ev-8117970141274",
    productTitle: "Gold Crunchy Saree With Sequins Embroidery And Cut Work",
    productPrice: 2799,
    productSlug: "gold-crunchy-saree-with-sequins-embroidery-and-cut-work",
    ctaText: "Shop Cutwork Saree →",
    ctaUrl: "/products/gold-crunchy-saree-with-sequins-embroidery-and-cut-work",
    isPublished: true,
    order: 3,
    autoplay: true,
    muted: true,
    createdAt: "2026-02-17T14:15:00.000Z",
    updatedAt: "2026-02-17T14:15:00.000Z",
  },
  {
    id: "vid-4",
    title: "Black Printed Rayon Co-Ord Set for Everyday Elegance",
    description: "Breathable luxury rayon ensemble styled for contemporary evening and daytime occasions.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    mobileVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    thumbnailUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081",
    posterUrl: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081",
    productId: "ev-8070754992218",
    productTitle: "Black Printed Rayon Co-Ord Set – Luxury Cotton",
    productPrice: 1250,
    productSlug: "espresso-limca-co-ord-set-luxury-cotton-everyday-elegance-copy",
    ctaText: "Shop Co-Ord Set →",
    ctaUrl: "/products/espresso-limca-co-ord-set-luxury-cotton-everyday-elegance-copy",
    isPublished: true,
    order: 4,
    autoplay: true,
    muted: true,
    createdAt: "2026-02-18T16:45:00.000Z",
    updatedAt: "2026-02-18T16:45:00.000Z",
  },
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    customerName: "Pooja Sharma",
    rating: 5,
    title: "Stunning Fandy Satin Saree",
    comment: "The zari border work and the quality of the satin is beyond expectation for the price. Wore it to my cousin wedding and received countless compliments!",
    date: "August 28, 2026",
    isVerified: true,
    productTitle: "Aurelia Fendy Satin Saree",
    status: "approved",
    isFeaturedOnHome: true,
  },
  {
    id: "rev-2",
    customerName: "Ananya Patel",
    rating: 5,
    title: "Comfortable and stylish co-ord set",
    comment: "The rayon cotton fabric is so soft on the skin. Perfect for office wear and casual dinners. The stitching is clean and fits true to size.",
    date: "August 22, 2026",
    isVerified: true,
    productTitle: "Black Printed Rayon Co-Ord Set",
    status: "approved",
    isFeaturedOnHome: true,
  },
  {
    id: "rev-3",
    customerName: "Meera Krishnan",
    rating: 5,
    title: "Fast delivery & gorgeous Chinon suit",
    comment: "Ordered via prepaid and got the 10% discount immediately. The package arrived in 3 days in Surat to Bangalore express. Very happy with Evara Vastra!",
    date: "August 15, 2026",
    isVerified: true,
    productTitle: "Premium Chinon Embroidered Kurti Palazzo Dupatta Set",
    status: "approved",
    isFeaturedOnHome: true,
  },
  {
    id: "rev-4",
    customerName: "Sneha Deshmukh",
    rating: 5,
    title: "Silver Tissue Silk drape is mesmerizing",
    comment: "The real mirror work and moti lace border look even better in real life than in the photos. Exceptional craft and prompt customer care on WhatsApp.",
    date: "August 09, 2026",
    isVerified: true,
    productTitle: "Silver Tissue Silk Designer Saree",
    status: "approved",
    isFeaturedOnHome: true,
  },
];

export const initialNavigationItems: NavigationItem[] = [
  { id: "nav-shop", label: "Shop", href: "/shop", isMegaMenu: true, order: 1, isEnabled: true },
  { id: "nav-sarees", label: "Sarees", href: "/shop/sarees", order: 2, isEnabled: true },
  { id: "nav-coords", label: "Co-ord Sets", href: "/shop/coord-sets", order: 3, isEnabled: true },
  { id: "nav-kurtas", label: "Kurta Sets", href: "/shop/kurta-sets", order: 4, isEnabled: true },
  { id: "nav-dresses", label: "Dresses", href: "/shop/dresses", order: 5, isEnabled: true },
  { id: "nav-new", label: "New Arrivals", href: "/shop?filter=newArrival", order: 6, isEnabled: true },
];

export const initialNotificationBar: NotificationBarConfig = {
  isEnabled: true,
  message: "FREE SHIPPING PAN INDIA ★ GET 10% OFF ON PREPAID ORDERS",
  link: "/shop?filter=newArrival",
  linkText: "SHOP NEW ARRIVALS →",
  backgroundStyle: "wine",
  isDismissible: true,
  showOnMobile: true,
  showOnDesktop: true,
};

export const initialHomepageCMS: HomepageCMS = {
  heroHeading: "Contemporary Indian",
  heroAccentWord: "Womenswear",
  heroSubheading: "Discover handcrafted sarees, designer co-ord sets, and festive kurta ensembles curated for effortless elegance.",
  heroBadge: "NEW SEASON DROP • 2026",
  heroCtaText: "Shop New Arrivals",
  heroCtaLink: "/shop?filter=newArrival",
  heroSecondaryCtaText: "Explore Sarees",
  heroSecondaryCtaLink: "/shop/sarees",
  primaryCtaText: "Shop New Arrivals",
  primaryCtaLink: "/shop?filter=newArrival",
  secondaryCtaText: "Explore Sarees",
  secondaryCtaLink: "/shop/sarees",
  heroImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
  featuredCategoryIds: ["cat-sarees", "cat-coord-sets", "cat-kurta-sets", "cat-anarkali-suits"],
  featuredProductIds: ["ev-8117987737690", "ev-8117975711834", "ev-8117970141274", "ev-8070754992218"],
  newArrivalProductIds: ["ev-8117987737690", "ev-8117975711834", "ev-8117962178650", "ev-8117957918810"],
  premiumSareeCollectionSlug: "premium-collection-saree",
  featuredCollectionSlug: "premium-collection-saree",
  whyChooseUsTitle: "Why Choose Evara Vastra",
  whyChooseUsSubtitle: "Thoughtful design, pure materials, and transparent customer service.",
  manifestoImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
  manifestoLoomImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292676_1.jpg?v=1788175657",
  manifestoQuote: "Crafted with reverence to Indian heritage, designed for the modern woman.",
  manifestoNarrative1: "At Evara Vastra, every thread is an homage to traditional artisan craftsmanship and contemporary silhouette aesthetics.",
  manifestoNarrative2: "From Surat to wardrobes across India, our collections bring pure fabrics and intricate zari embroidery into everyday celebrations.",
  trustSignals: [
    {
      id: "trust-1",
      title: "Free Shipping Pan India",
      description: "Complimentary insured delivery on all prepaid and COD orders across India.",
      icon: "truck",
      isEnabled: true,
    },
    {
      id: "trust-2",
      title: "Premium Fabric & Comfort",
      description: "Tested pure silks, soft breathable cottons, and high-grade rayon weaves.",
      icon: "sparkles",
      isEnabled: true,
    },
    {
      id: "trust-3",
      title: "COD & 10% Prepaid Discount",
      description: "Cash on Delivery available, plus extra 10% instant discount on prepaid orders.",
      icon: "shield",
      isEnabled: true,
    },
    {
      id: "trust-4",
      title: "7-Day Easy Exchange",
      description: "Hassle-free replacement and return policy for size or styling peace of mind.",
      icon: "refresh",
      isEnabled: true,
    },
  ],
  newsletterTitle: "Join the Evara Vastra Circle",
  newsletterSubtitle: "Be the first to access new collection drops, limited festival edits, and exclusive VIP offers.",
  sectionVisibility: {
    notificationBar: true,
    hero: true,
    marquee: true,
    categories: true,
    newArrivals: true,
    featuredProducts: true,
    premiumSarees: true,
    otherCollections: true,
    whyChooseUs: true,
    shoppableVideos: true,
    reviews: true,
    trustSignals: true,
    newsletter: true,
    featuredCollection: true,
    brandStory: true,
    fabricDiscovery: true,
    occasionGrid: true,
    lookbookTeaser: true,
    customerNotes: true,
  },
};

export const initialOrders: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "EV-84920",
    date: "2026-08-30",
    status: "Processing",
    customerName: "Kavita Rao",
    customerEmail: "kavita.rao@gmail.com",
    customerPhone: "+91 98450 12345",
    shippingAddress: "Flat 402, Green Glen Layout, Bellandur",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    country: "India",
    paymentMethod: "Instant UPI (GPay)",
    paymentStatus: "Paid",
    trackingNumber: "BD-88492011",
    carrier: "Blue Dart Express",
    items: [
      {
        id: "ev-8117975711834",
        slug: "silver-tissue-silk-designer-embroidery-saree-collection",
        title: "Silver Tissue Silk Designer Embroidery Saree in Ruby Red",
        price: 2199,
        quantity: 1,
        image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
        fabric: "Silver Tissue Silk",
        color: "Red"
      }
    ],
    subtotal: 2199,
    discount: 220,
    prepaidDiscount: 220,
    shippingFee: 0,
    total: 1979,
    timeline: [
      { title: "Order Placed & Prepaid Confirmed", timestamp: "Aug 30, 2026 • 11:30 AM", completed: true, note: "Prepaid 10% discount applied" },
      { title: "Quality Check & Packing at Surat Atelier", timestamp: "Aug 30, 2026 • 03:45 PM", completed: true, note: "Inspected by Master Q.C." },
      { title: "Handed over to Blue Dart Express", timestamp: "Aug 31, 2026 • 10:00 AM", completed: true, note: "AWB: BD-88492011" },
      { title: "Out for Delivery", timestamp: "Expected Sep 02, 2026", completed: false }
    ]
  },
  {
    id: "ord-1002",
    orderNumber: "EV-84919",
    date: "2026-08-28",
    status: "Delivered",
    customerName: "Ritu Sharma",
    customerEmail: "ritu.sharma@yahoo.com",
    customerPhone: "+91 99201 54321",
    shippingAddress: "12A Silver Arch Apartments, Malabar Hill",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400006",
    country: "India",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    trackingNumber: "BD-88491900",
    carrier: "Blue Dart Express",
    items: [
      {
        id: "ev-8117987737690",
        slug: "fandy-silk-with-heavy-embroidery-codding-sequence-work-and-full-sleeve",
        title: "FANDY Silk Heavy Embroidery Kurti Set with Dupatta",
        price: 2999,
        quantity: 1,
        image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232474.jpg?v=1788178083",
        fabric: "Fandy Silk",
        size: "L",
        color: "Green"
      }
    ],
    subtotal: 2999,
    discount: 0,
    shippingFee: 0,
    total: 2999,
    timeline: [
      { title: "Order Placed (COD)", timestamp: "Aug 28, 2026 • 02:15 PM", completed: true },
      { title: "Order Dispatched from Surat", timestamp: "Aug 29, 2026 • 11:00 AM", completed: true },
      { title: "Delivered to Patron", timestamp: "Aug 31, 2026 • 01:20 PM", completed: true, note: "Cash received & verified" }
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Kavita Rao",
    email: "kavita.rao@gmail.com",
    phone: "+91 98450 12345",
    city: "Bengaluru",
    totalOrders: 2,
    totalSpend: 4728,
    lastOrderDate: "2026-08-30",
    joinedDate: "2026-07-14",
  },
  {
    id: "cust-2",
    name: "Ritu Sharma",
    email: "ritu.sharma@yahoo.com",
    phone: "+91 99201 54321",
    city: "Mumbai",
    totalOrders: 1,
    totalSpend: 2999,
    lastOrderDate: "2026-08-28",
    joinedDate: "2026-08-28",
  },
  {
    id: "cust-3",
    name: "Ananya Patel",
    email: "ananya.p@outlook.com",
    phone: "+91 98251 77889",
    city: "Ahmedabad",
    totalOrders: 3,
    totalSpend: 7548,
    lastOrderDate: "2026-08-22",
    joinedDate: "2026-05-10",
  },
];

export const initialCoupons: Coupon[] = [
  {
    id: "coup-1",
    code: "PREPAID10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 1000,
    expiresAt: "2026-12-31",
    isActive: true,
    usageCount: 42,
  },
  {
    id: "coup-2",
    code: "EVARA15",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 3000,
    maxDiscount: 1000,
    expiresAt: "2026-12-31",
    isActive: true,
    usageCount: 18,
  },
  {
    id: "coup-3",
    code: "FESTIVE500",
    discountType: "fixed",
    discountValue: 500,
    minOrderValue: 4000,
    expiresAt: "2026-12-31",
    isActive: true,
    usageCount: 9,
  },
];

export const initialMediaAssets: MediaAsset[] = [
  {
    id: "med-1",
    title: "Fandy Silk Kurti Set in Mehndi Green",
    url: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232474.jpg?v=1788178083",
    category: "products",
    createdAt: "2026-08-31",
  },
  {
    id: "med-2",
    title: "Silver Tissue Silk Saree in Ruby Red",
    url: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
    category: "products",
    createdAt: "2026-08-31",
  },
  {
    id: "med-3",
    title: "Aurelia Gold Crunchy Saree with Cutwork",
    url: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
    category: "products",
    createdAt: "2026-08-31",
  },
  {
    id: "med-4",
    title: "Black Printed Rayon Co-Ord Set",
    url: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081",
    category: "products",
    createdAt: "2026-08-19",
  },
];

export const initialAdminUsers: AdminUser[] = [
  {
    id: "admin-1",
    email: "admin@evaravastra.com",
    passwordHash: "pbkdf2$100000$a8f3b9c2d1e0456789abcdef01234567$c8424aaf93f263a71f7edc528683cc431501ede454eec3cfd8838a888d566fd9",
    name: "Aarav Mehta (Director)",
    role: "superadmin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    phone: "+91 92743 44037",
    isActive: true,
    lastLogin: "2026-09-01 10:45 AM",
    lastLoginAt: "2026-09-01T10:45:00Z",
    createdAt: "2026-01-10",
  },
  {
    id: "admin-2",
    email: "store@evaravastra.com",
    passwordHash: "pbkdf2$100000$a8f3b9c2d1e0456789abcdef01234567$c8424aaf93f263a71f7edc528683cc431501ede454eec3cfd8838a888d566fd9",
    name: "Pooja Shah (Store Admin)",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    phone: "+91 98251 22340",
    isActive: true,
    lastLogin: "2026-09-01 09:12 AM",
    lastLoginAt: "2026-09-01T09:12:00Z",
    createdAt: "2026-02-15",
  },
  {
    id: "admin-3",
    email: "fulfillment@evaravastra.com",
    passwordHash: "pbkdf2$100000$a8f3b9c2d1e0456789abcdef01234567$c8424aaf93f263a71f7edc528683cc431501ede454eec3cfd8838a888d566fd9",
    name: "Rohan Patel (Order Manager)",
    role: "order_manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    phone: "+91 97129 88310",
    isActive: true,
    lastLogin: "2026-08-31 06:30 PM",
    lastLoginAt: "2026-08-31T18:30:00Z",
    createdAt: "2026-03-01",
  },
  {
    id: "admin-4",
    email: "editor@evaravastra.com",
    passwordHash: "pbkdf2$100000$a8f3b9c2d1e0456789abcdef01234567$c8424aaf93f263a71f7edc528683cc431501ede454eec3cfd8838a888d566fd9",
    name: "Ananya Desai (Content Lead)",
    role: "content_manager",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    phone: "+91 98980 11456",
    isActive: true,
    lastLogin: "2026-08-30 04:15 PM",
    lastLoginAt: "2026-08-30T16:15:00Z",
    createdAt: "2026-04-12",
  },
];

export const initialAdminUser: AdminUser = initialAdminUsers[0];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    actorId: "admin-1",
    actorName: "Aarav Mehta (Director)",
    actorEmail: "admin@evaravastra.com",
    actorRole: "superadmin",
    action: "UPDATE_NOTIFICATION_BAR",
    entity: "notification",
    details: "Activated festive banner: 'FREE EXPRESS SHIPPING ACROSS INDIA • COD AVAILABLE'",
    timestamp: "2026-09-01 10:45 AM",
    severity: "info",
  },
  {
    id: "log-2",
    actorId: "admin-1",
    actorName: "Aarav Mehta (Director)",
    actorEmail: "admin@evaravastra.com",
    actorRole: "superadmin",
    action: "ADJUST_INVENTORY",
    entity: "inventory",
    entityId: "prod-1",
    entityName: "Aethelgard Crimson Pure Katan Silk Banarasi Saree",
    details: "Restocked 5 units for Aethelgard Crimson Banarasi Saree. Previous: 1, New: 6.",
    timestamp: "2026-09-01 09:30 AM",
    severity: "info",
  },
  {
    id: "log-3",
    actorId: "admin-3",
    actorName: "Rohan Patel (Order Manager)",
    actorEmail: "fulfillment@evaravastra.com",
    actorRole: "order_manager",
    action: "UPDATE_ORDER_STATUS",
    entity: "order",
    entityId: "ord-1",
    entityName: "EVR-2026-8890",
    details: "Changed order status to 'Shipped'. Added BlueDart Waybill #BLUEDART-8891029.",
    timestamp: "2026-08-31 06:15 PM",
    severity: "info",
  },
  {
    id: "log-4",
    actorId: "admin-2",
    actorName: "Pooja Shah (Store Admin)",
    actorEmail: "store@evaravastra.com",
    actorRole: "admin",
    action: "CREATE_COUPON",
    entity: "coupon",
    entityId: "FESTIVE15",
    entityName: "FESTIVE15",
    details: "Created coupon FESTIVE15 with 15% discount for min order ₹2,999.",
    timestamp: "2026-08-30 02:40 PM",
    severity: "info",
  },
  {
    id: "log-5",
    actorId: "admin-4",
    actorName: "Ananya Desai (Content Lead)",
    actorEmail: "editor@evaravastra.com",
    actorRole: "content_manager",
    action: "MODERATE_REVIEW",
    entity: "review",
    entityId: "rev-1",
    details: "Approved verified buyer review from Sunita Verma: 'Breathtaking pure zari work...'",
    timestamp: "2026-08-29 11:20 AM",
    severity: "info",
  },
];

export const initialInventoryAdjustments: InventoryAdjustment[] = [
  {
    id: "adj-1",
    productId: "prod-1",
    productTitle: "Aethelgard Crimson Pure Katan Silk Banarasi Saree",
    productSku: "EVR-KATAN-001",
    previousInventory: 1,
    newInventory: 6,
    changeAmount: 5,
    reason: "restock",
    note: "Surat Atelier batch release #KAT-902",
    actorName: "Aarav Mehta (Director)",
    actorEmail: "admin@evaravastra.com",
    timestamp: "2026-09-01 09:30 AM",
  },
  {
    id: "adj-2",
    productId: "prod-3",
    productTitle: "Aurelia Gold Crunchy Saree with Cutwork",
    productSku: "EVR-AURELIA-003",
    previousInventory: 5,
    newInventory: 4,
    changeAmount: -1,
    reason: "sale",
    note: "Fulfillment for Order #EVR-2026-8890",
    actorName: "System",
    actorEmail: "system@evaravastra.com",
    timestamp: "2026-08-31 05:10 PM",
  },
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    category: "Shipping & Delivery",
    question: "Do you offer Free Shipping across India?",
    answer: "Yes! We provide 100% complimentary express shipping on all prepaid and Cash on Delivery (COD) orders across India.",
    order: 1,
    isPublished: true,
  },
  {
    id: "faq-2",
    category: "Payments & Offers",
    question: "How do I claim the 10% Prepaid Discount?",
    answer: "Pay via UPI (GPay, PhonePe, Paytm) or Net Banking / Cards at checkout, and the 10% instant discount applies automatically to your cart total.",
    order: 2,
    isPublished: true,
  },
  {
    id: "faq-3",
    category: "Garment Sizing",
    question: "How do I choose the correct size for co-ord and kurta sets?",
    answer: "Our ready-to-wear kurta and co-ord sets follow standard Indian sizing (S to 3XL) with comfortable ease. Refer to the size options on each product page.",
    order: 3,
    isPublished: true,
  },
  {
    id: "faq-4",
    category: "Returns & Exchanges",
    question: "What is your replacement and return window?",
    answer: "We offer a 7-day hassle-free exchange window. If you need a size replacement or styling adjustment, simply WhatsApp us at +91-92743 44037.",
    order: 4,
    isPublished: true,
  },
];

export const initialLookbookItems: LookbookItem[] = [
  {
    id: "look-1",
    season: "Autumn / Winter 2026",
    title: "Aurelia Royal Fendy Satin",
    subtitle: "Heavy Zari Borders in Jewel Tones",
    image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
    location: "Surat Atelier",
    sareeName: "Gold Crunchy Saree",
    sareeSlug: "gold-crunchy-saree-with-sequins-embroidery-and-cut-work",
    palette: ["#7C2430", "#C59B27", "#171513"],
    isPublished: true,
  },
];

export const initialCraftsmanshipCMS: CraftsmanshipCMS = {
  heroTitle: "Artisanal Craftsmanship from Surat",
  heroSubtitle: "Handloom weaving, Zardosi needlework, and precision tailoring.",
  heroImage: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
  steps: [
    {
      id: "step-1",
      stepNumber: "01",
      title: "Yarn Selection & Dyeing",
      subtitle: "Pure Silk & Lustrous Rayon Fibers",
      description: "Every fabric starts with high-grade natural and tested yarn spun for soft tactile drape.",
      image: "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
      details: ["Tested color fastness", "High thread count", "Supple drape memory"],
    },
  ],
  manifesto: "Rooted in authentic Indian textile lineage. Designed for today.",
};

export const initialPickupLocations: PickupLocation[] = [
  {
    id: "pickup-surat-01",
    name: "Surat Atelier Primary",
    contactPerson: "Darshil Patel",
    phone: "+91-92743 44037",
    email: "operations@evaravastra.com",
    address: "Plot 42, Millenium Textile Market, Ring Road",
    city: "Surat",
    state: "Gujarat",
    pincode: "395002",
    country: "India",
    isDefault: true,
    isActive: true,
  },
  {
    id: "pickup-mumbai-02",
    name: "Mumbai Concierge Hub",
    contactPerson: "Aditi Shah",
    phone: "+91-98201 44520",
    email: "concierge@evaravastra.com",
    address: "12A Silver Arch, Malabar Hill",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400006",
    country: "India",
    isDefault: false,
    isActive: true,
  },
];

export const initialShippingSettings: ShippingSettings = {
  provider: "shiprocket",
  isLive: false,
  defaultPickupLocationId: "pickup-surat-01",
  defaultWeightKg: 0.5,
  defaultDimensionsCm: {
    length: 30,
    width: 22,
    height: 5,
  },
  codEnabled: true,
  freeShippingThreshold: 0,
  standardShippingFee: 0,
  autoAssignCourier: true,
  autoGenerateAwb: true,
};

export const initialShipments: Shipment[] = [
  {
    id: "ship-2001",
    orderId: "ord-1001",
    orderNumber: "EV-84920",
    provider: "shiprocket",
    providerOrderId: 9482011,
    providerShipmentId: 8849201,
    awb: "BD-88492011",
    courierName: "Blue Dart Express Air",
    courierId: 1,
    pickupLocationId: "pickup-surat-01",
    pickupLocationName: "Surat Atelier Primary",
    status: "IN_TRANSIT",
    paymentMethod: "prepaid",
    packageWeightKg: 0.55,
    dimensionsCm: { length: 32, width: 24, height: 6 },
    shippingCharge: 0,
    estimatedDeliveryDate: "2026-09-02",
    trackingUrl: "https://shiprocket.co/tracking/BD-88492011",
    labelUrl: "https://shiprocket.co/label/BD-88492011.pdf",
    timeline: [
      {
        timestamp: "Aug 30, 2026 • 11:30 AM",
        status: "Order Confirmed & Shipment Created",
        location: "Surat Atelier Primary",
        activity: "Shipment manifest generated (Shiprocket Order #9482011)",
        completed: true,
      },
      {
        timestamp: "Aug 30, 2026 • 03:45 PM",
        status: "AWB Assigned",
        location: "Surat Atelier Primary",
        activity: "Assigned to Blue Dart Express Air (AWB: BD-88492011)",
        completed: true,
      },
      {
        timestamp: "Aug 31, 2026 • 10:00 AM",
        status: "Picked Up",
        location: "Surat Logistics Hub",
        activity: "Package scanned and handed over to carrier vehicle",
        completed: true,
      },
      {
        timestamp: "Aug 31, 2026 • 08:30 PM",
        status: "In Transit",
        location: "Bengaluru Central Sort Center",
        activity: "Arrived at destination transit facility",
        completed: true,
      },
    ],
    createdAt: "2026-08-30T11:30:00Z",
    updatedAt: "2026-08-31T20:30:00Z",
  },
  {
    id: "ship-2002",
    orderId: "ord-1002",
    orderNumber: "EV-84919",
    provider: "shiprocket",
    providerOrderId: 9481900,
    providerShipmentId: 8849190,
    awb: "BD-88491900",
    courierName: "Blue Dart Express Air",
    courierId: 1,
    pickupLocationId: "pickup-surat-01",
    pickupLocationName: "Surat Atelier Primary",
    status: "DELIVERED",
    paymentMethod: "cod",
    packageWeightKg: 0.6,
    dimensionsCm: { length: 30, width: 22, height: 5 },
    shippingCharge: 0,
    estimatedDeliveryDate: "2026-08-31",
    trackingUrl: "https://shiprocket.co/tracking/BD-88491900",
    timeline: [
      {
        timestamp: "Aug 28, 2026 • 02:15 PM",
        status: "Order Confirmed",
        location: "Surat Atelier Primary",
        activity: "COD Shipment initiated",
        completed: true,
      },
      {
        timestamp: "Aug 29, 2026 • 11:00 AM",
        status: "Picked Up & In Transit",
        location: "Surat Hub",
        activity: "Handed over to Blue Dart Express",
        completed: true,
      },
      {
        timestamp: "Aug 31, 2026 • 01:20 PM",
        status: "Delivered",
        location: "Malabar Hill, Mumbai",
        activity: "Delivered to patron Ritu Sharma. Cash on Delivery collected.",
        completed: true,
      },
    ],
    createdAt: "2026-08-28T14:15:00Z",
    updatedAt: "2026-08-31T13:20:00Z",
  },
];

export const initialProducts: Product[] = [
  {
    "id": "ev-8117987737690",
    "title": "FANDY Silk With Heavy Embroidery Codding & Sequence Work And Full Sleeve",
    "slug": "fandy-silk-with-heavy-embroidery-codding-sequence-work-and-full-sleeve",
    "sku": "EV-8117987737690",
    "code": "EV-8117987737690",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. Top Inner; Heavy Micro Cotton Top Length; 48-50 Inch Top Size - M (38), L(40), XL (42), XXL (44) DOUBLE FLAIR - ; 3-MTR, 4- MTR (FULLY STITCHED READY TO WEAR) 💃👚 Bottom👚💃 *Bottom Fabrics; Heavy micro Free Size With Elastic Fully Stitched Pent Length; 39-40'' Inch Fully Stitched 💃👚 Dupatta 👚💃 Dupatta Fabric; Fandy silk With Embroidery Codding & Sequence Work With Lace Border 📌 Colour-2 ( Mehndi green , Orange ) 👉🏻 PACKAGE CONTAIN: - 1-Gown,1-Bottom,1-Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2999,
    "compareAtPrice": 4299,
    "discountPercentage": 30,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232474.jpg?v=1788178083",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232478.jpg?v=1788178082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232483.jpg?v=1788178082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232482.jpg?v=1788178082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232484.jpg?v=1788178082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232472.jpg?v=1788178082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232475.jpg?v=1788178082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232476.jpg?v=1788178082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232477.jpg?v=1788178083"
    ],
    "category": "kurta-sets",
    "collection": "new-arrivals",
    "collections": [
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43969651605594",
        "title": "M / Green",
        "size": "M",
        "color": "Green",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232483.jpg?v=1788178082"
      },
      {
        "id": "var-43969658814554",
        "title": "M / Orange",
        "size": "M",
        "color": "Orange",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232476.jpg?v=1788178082"
      },
      {
        "id": "var-43969658847322",
        "title": "L / Green",
        "size": "L",
        "color": "Green",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232483.jpg?v=1788178082"
      },
      {
        "id": "var-43969658880090",
        "title": "L / Orange",
        "size": "L",
        "color": "Orange",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232476.jpg?v=1788178082"
      },
      {
        "id": "var-43969658912858",
        "title": "XL / Green",
        "size": "XL",
        "color": "Green",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232483.jpg?v=1788178082"
      },
      {
        "id": "var-43969658945626",
        "title": "XL / Orange",
        "size": "XL",
        "color": "Orange",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232476.jpg?v=1788178082"
      },
      {
        "id": "var-43969658978394",
        "title": "2XL / Green",
        "size": "2XL",
        "color": "Green",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232483.jpg?v=1788178082"
      },
      {
        "id": "var-43969659011162",
        "title": "2XL / Orange",
        "size": "2XL",
        "color": "Orange",
        "price": 2999,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8117987737690-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6300551388278232476.jpg?v=1788178082"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Green",
      "Orange"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Green",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": true,
    "tags": [
      "Kurta Set",
      "Kurti Pant Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-08-31T17:36:54+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8117975711834",
    "title": "Silver Tissue Silk Designer Embroidery Saree Collection",
    "slug": "silver-tissue-silk-designer-embroidery-saree-collection",
    "sku": "EV-8117975711834",
    "code": "EV-8117975711834",
    "description": "• 🥻Saree info* *Fabric* : Silver Tissue Silk *Work* : Designer Embroidery Work of Sequence with Zari dori work with Real Mirror work & also attached Fancy Lace Border of Moti. *Craft* : Embroidery *Purity* : Pure *• Blouse info* *Fabric* : Silver Tissue Silk *Work* : Designer Embroidery Work of Sequence with Zari dori work with Real Mirror work. *Pattern* : Unstitch.(0.90) 2-Colours Available.",
    "shortDescription": "• 🥻Saree info* *Fabric* : Silver Tissue Silk *Work* : Designer Embroidery Work of Sequence with Zari dori work with Real Mirror work & also attached Fancy Lace...",
    "price": 2199,
    "compareAtPrice": 3599,
    "discountPercentage": 39,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753312.jpg?v=1788176982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753314.jpg?v=1788176982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753303.jpg?v=1788176983",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753304.jpg?v=1788176982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753307.jpg?v=1788176982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753308.jpg?v=1788176982"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43969627193434",
        "title": "Red",
        "size": "Red",
        "color": "Red",
        "price": 2199,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-8117975711834-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983"
      },
      {
        "id": "var-43969627226202",
        "title": "Purple",
        "size": "Purple",
        "color": "Purple",
        "price": 2199,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-8117975711834-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753307.jpg?v=1788176982"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Red",
      "Purple"
    ],
    "fabric": "Silver Tissue Silk",
    "craft": "Sequins & Codding Work",
    "color": "Red",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "COOL COLLECTION",
      "purple",
      "RED"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Silver Tissue Silk",
      "craft": "Sequins & Codding Work",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-08-31T17:18:52+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8117970141274",
    "title": "Gold Crunchy Saree With Sequins Embroidery And Cut Work",
    "slug": "gold-crunchy-saree-with-sequins-embroidery-and-cut-work",
    "sku": "5084",
    "code": "EV-8117970141274",
    "description": "• Product Id : 4501214 • Package Details : 1 Saree/1 Blouse • Type : Fancy Sarees • Work : Embroidered • Type : Resham Embroidery • Look : Fashion • Pallu Style : Designer Pallu • Width : 44 Inches • Length : 5.5 Metres • Fabric Of : Art Silk • Color : Yellow / Green • Color : Yellow / Green",
    "shortDescription": "• Product Id : 4501214 • Package Details : 1 Saree/1 Blouse • Type : Fancy Sarees • Work : Embroidered • Type : Resham Embroidery • Look : Fashion • Pallu Style...",
    "price": 2799,
    "compareAtPrice": 3599,
    "discountPercentage": 22,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753377.jpg?v=1788176378",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753378.jpg?v=1788176378",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753375.jpg?v=1788176378",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753374.jpg?v=1788176378",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753376.jpg?v=1788176378",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753373.jpg?v=1788176378"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43969611956314",
        "title": "Green",
        "size": "Green",
        "color": "Green",
        "price": 2799,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "5084",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378"
      },
      {
        "id": "var-43969611989082",
        "title": "Yellow",
        "size": "Yellow",
        "color": "Yellow",
        "price": 2799,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "5084",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753375.jpg?v=1788176378"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Green",
      "Yellow"
    ],
    "fabric": "Art Silk",
    "craft": "Sequins & Codding Work",
    "color": "Green",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "COOL COLLECTION",
      "purple",
      "RED"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Art Silk",
      "craft": "Sequins & Codding Work",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-08-31T17:09:17+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8117962178650",
    "title": "Butterfly Net Graceful Embroidery Work Partywear Saree",
    "slug": "butterfly-net-graceful-embroidery-work-partywear-saree",
    "sku": "5091",
    "code": "EV-8117962178650",
    "description": "1 saree::1 blouse Color and Texture may have slight variation. This happens because of photography. Dry Clean only. Cold water recommended. Embroidery Embroidery, Patch work and thread work may have slight irregularities. Turn the garment inside out before washing to avoid abraison. Handloom Yarns and Slubs may have some uneven and missing contrasts.They are inherent chararcteristic of the fabric that make its style peculiar. Block Print Color, Design, Overlapping and Placement may have slight variation. These is because they are hand printed. Woven Motifs Design may have slight variation. • Saree : Color- Lavender / Fabric- Silk Blend • Blouse : Color- Lavender / Fabric- Silk Blend",
    "shortDescription": "1 saree::1 blouse Color and Texture may have slight variation. This happens because of photography. Dry Clean only. Cold water recommended. Embroidery Embroider...",
    "price": 2199,
    "compareAtPrice": 2999,
    "discountPercentage": 27,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292676_1.jpg?v=1788175657",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292681_1.jpg?v=1788175657",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292682_1.jpg?v=1788175657",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292675_1.jpg?v=1788175657",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292674.jpg?v=1788175657",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292686.jpg?v=1788175657",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292687.jpg?v=1788175657",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292690.jpg?v=1788175657"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43969595637850",
        "title": "Green",
        "size": "Green",
        "color": "Green",
        "price": 2199,
        "compareAtPrice": 2999,
        "inStock": true,
        "sku": "5091",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292676_1.jpg?v=1788175657"
      },
      {
        "id": "var-43969596948570",
        "title": "Yellow",
        "size": "Yellow",
        "color": "Yellow",
        "price": 2199,
        "compareAtPrice": 2999,
        "inStock": true,
        "sku": "5091",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292690.jpg?v=1788175657"
      },
      {
        "id": "var-43969596981338",
        "title": "Bronze",
        "size": "Bronze",
        "color": "Bronze",
        "price": 2199,
        "compareAtPrice": 2999,
        "inStock": true,
        "sku": "5091",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292682_1.jpg?v=1788175657"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Green",
      "Yellow",
      "Bronze"
    ],
    "fabric": "Designer Satin Silk",
    "craft": "Ethnic Handblock Print",
    "color": "Green",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "COOL COLLECTION",
      "purple",
      "RED"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Designer Satin Silk",
      "craft": "Ethnic Handblock Print",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-08-31T16:56:30+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8117959098458",
    "title": "Embroidered Silk Blend Designer Saree",
    "slug": "embroidered-silk-blend-designer-saree",
    "sku": "5092",
    "code": "EV-8117959098458",
    "description": "this lavender silk saree features 3mm sequins with cross stitch embroidery work and a cutwork border. crafted from silk blend fabric, the saree offers a smooth texture and fluid drape. the designer border and pallu add definition to the overall look. it comes with a matching unstitched blouse in moni diamond silk featuring sequins and cross stitch embroidery work. suitable for party wear occasions, this saree reflects a detailed and coordinated design. Color and Texture may have slight variation. This happens because of photography. Dry Clean only. Cold water recommended. Embroidery Embroidery, Patch work and thread work may have slight irregularities. Turn the garment inside out before washing to avoid abraison. Handloom Yarns and Slubs may have some uneven and missing contrasts.They are inherent chararcteristic of the fabric that make its style peculiar. Block Print Color, Design, Overlapping and Placement may have slight variation. These is because they are hand printed. Woven Motifs Design may have slight variation. • Saree : Color- Lavender / Fabric- Silk Blend • Blouse : Color- Lavender / Fabric- Silk Blend",
    "shortDescription": "this lavender silk saree features 3mm sequins with cross stitch embroidery work and a cutwork border. crafted from silk blend fabric, the saree offers a smooth ...",
    "price": 2499,
    "compareAtPrice": 3999,
    "discountPercentage": 38,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292726.jpg?v=1788175380",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292727.jpg?v=1788175381",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292722.jpg?v=1788175381",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292724.jpg?v=1788175381",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292728.jpg?v=1788175381"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43969587347546",
        "title": "Purple",
        "size": "Purple",
        "color": "Purple",
        "price": 2499,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "5092",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292726.jpg?v=1788175380"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Purple"
    ],
    "fabric": "Designer Satin Silk",
    "craft": "Sequins & Codding Work",
    "color": "Purple",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": true,
    "tags": [
      "COOL COLLECTION",
      "purple",
      "RED"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Designer Satin Silk",
      "craft": "Sequins & Codding Work",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-08-31T16:51:02+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8117957918810",
    "title": "Lavender Silk Saree With Sequins Embroidery Work",
    "slug": "lavender-silk-saree-with-sequins-embroidery-work",
    "sku": "5093",
    "code": "EV-8117957918810",
    "description": "this lavender silk saree features 3mm sequins with cross stitch embroidery work and a cutwork border. crafted from silk blend fabric, the saree offers a smooth texture and fluid drape. the designer border and pallu add definition to the overall look. it comes with a matching unstitched blouse in moni diamond silk featuring sequins and cross stitch embroidery work. suitable for party wear occasions, this saree reflects a detailed and coordinated design. Color and Texture may have slight variation. This happens because of photography. Dry Clean only. Cold water recommended. Embroidery Embroidery, Patch work and thread work may have slight irregularities. Turn the garment inside out before washing to avoid abraison. Handloom Yarns and Slubs may have some uneven and missing contrasts.They are inherent chararcteristic of the fabric that make its style peculiar. Block Print Color, Design, Overlapping and Placement may have slight variation. These is because they are hand printed. Woven Motifs Design may have slight variation. • Saree : Color- Lavender / Fabric- Silk Blend • Blouse : Color- Lavender / Fabric- Silk Blend",
    "shortDescription": "this lavender silk saree features 3mm sequins with cross stitch embroidery work and a cutwork border. crafted from silk blend fabric, the saree offers a smooth ...",
    "price": 2499,
    "compareAtPrice": 3999,
    "discountPercentage": 38,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292772.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292773.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292755.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292766.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292748.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292758.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292762.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292763.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292754.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292757.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292745.jpg?v=1788174843",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292749.jpg?v=1788174843"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43969585053786",
        "title": "Purple",
        "size": "Purple",
        "color": "Purple",
        "price": 2499,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "5093",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292755.jpg?v=1788174843"
      },
      {
        "id": "var-43969585086554",
        "title": "WINE",
        "size": "WINE",
        "color": "WINE",
        "price": 2499,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "5094",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292766.jpg?v=1788174843"
      },
      {
        "id": "var-43969585119322",
        "title": "Red",
        "size": "Red",
        "color": "Red",
        "price": 2499,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "5095",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292773.jpg?v=1788174843"
      },
      {
        "id": "var-43969585152090",
        "title": "Green",
        "size": "Green",
        "color": "Green",
        "price": 2499,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "5096",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292748.jpg?v=1788174843"
      },
      {
        "id": "var-43969585184858",
        "title": "Blue",
        "size": "Blue",
        "color": "Blue",
        "price": 2499,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "5097",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6080025480716292758.jpg?v=1788174843"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Purple",
      "WINE",
      "Red",
      "Green",
      "Blue"
    ],
    "fabric": "Designer Satin Silk",
    "craft": "Sequins & Codding Work",
    "color": "Purple",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "COOL COLLECTION",
      "purple",
      "RED"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Designer Satin Silk",
      "craft": "Sequins & Codding Work",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-08-31T16:48:06+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8074989142106",
    "title": "Women's Premium Orange Ethnic Printed Kurta Pant Set",
    "slug": "womens-premium-orange-ethnic-printed-kurta-pant-set",
    "sku": "orange vastra-1",
    "code": "EV-8074989142106",
    "description": "Fabric: Soft Premium Cotton – breathable and skin-friendly Colors: Espresso Brown | Mid Black Sizes: S, M, L, XL, 2XL, 3XL Fit: Relaxed and flattering for all body types Occasions: Casual outings, office wear, parties, and festive events",
    "shortDescription": "Fabric: Soft Premium Cotton – breathable and skin-friendly Colors: Espresso Brown | Mid Black Sizes: S, M, L, XL, 2XL, 3XL Fit: Relaxed and flattering for all b...",
    "price": 1599,
    "compareAtPrice": 3999,
    "discountPercentage": 60,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192825.webp?v=1787135222",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192724.webp?v=1787135222",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192443.webp?v=1787135222",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192851.webp?v=1787135222"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43868995649626",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1599,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "orange vastra-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192825.webp?v=1787135222"
      },
      {
        "id": "var-43868995682394",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1599,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "orange vastra-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192825.webp?v=1787135222"
      },
      {
        "id": "var-43868995715162",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1599,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "orange vastra-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192825.webp?v=1787135222"
      },
      {
        "id": "var-43868995747930",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1599,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "orange vastra-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192825.webp?v=1787135222"
      },
      {
        "id": "var-43868995780698",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1599,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "orange vastra-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192825.webp?v=1787135222"
      },
      {
        "id": "var-43868995813466",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1599,
        "compareAtPrice": 3999,
        "inStock": true,
        "sku": "orange vastra-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Screenshot2026-07-11192825.webp?v=1787135222"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Soft Premium Cotton",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "Co-Ord Set",
      "COOL COLLECTION",
      "YELLOW"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Soft Premium Cotton",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-08-19T15:58:45+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8070756073562",
    "title": "Black Printed Rayon Co-Ord Set",
    "slug": "premium-black-printed-rayon-co-ord-set-1",
    "sku": "BAGIRA",
    "code": "EV-8070756073562",
    "description": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who love looking put-together without any effort. Product Details Fabric: Soft Premium Cotton – breathable and skin-friendly Colors: Espresso Brown | Mid Black Sizes: S, M, L, XL, 2XL, 3XL Fit: Relaxed and flattering for all body types Occasions: Casual outings, office wear, parties, and festive events Care: Easy to wash, color stays vibrant after multiple washes Why You'll Love It Lightweight and comfortable – feels great all day Suits all body types with its relaxed fit Works for both day and night looks Easy to style – pair with heels, flats, or sneakers All-season wear – cool in summer, easy to layer in winter Perfect For Brunch dates • Office days • Travel • Evening outings • Festive gathering",
    "shortDescription": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who...",
    "price": 1399,
    "compareAtPrice": 4299,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7c9def7e-6a68-4a53-9323-e06bd4c43935.jpg?v=1787126157",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/c11c3fa8-ec7b-47a3-8695-3f3c18651483.jpg?v=1787126157",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/21abbadd-4562-4d11-a371-4042c57235e5.jpg?v=1787126157",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/a6b9df83-3f64-43b0-baca-4ef4b3c81f21.jpg?v=1787126157"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43856231792730",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1399,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BAGIRA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7c9def7e-6a68-4a53-9323-e06bd4c43935.jpg?v=1787126157"
      },
      {
        "id": "var-43856231825498",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1399,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BAGIRA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7c9def7e-6a68-4a53-9323-e06bd4c43935.jpg?v=1787126157"
      },
      {
        "id": "var-43856231858266",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1399,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BAGIRA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7c9def7e-6a68-4a53-9323-e06bd4c43935.jpg?v=1787126157"
      },
      {
        "id": "var-43856231891034",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1399,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BAGIRA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7c9def7e-6a68-4a53-9323-e06bd4c43935.jpg?v=1787126157"
      },
      {
        "id": "var-43856231923802",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1399,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BAGIRA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7c9def7e-6a68-4a53-9323-e06bd4c43935.jpg?v=1787126157"
      },
      {
        "id": "var-43856231956570",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1399,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BAGIRA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7c9def7e-6a68-4a53-9323-e06bd4c43935.jpg?v=1787126157"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-08-17T13:14:54+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8070754992218",
    "title": "Rayon Printed  Co-Ord Set for Women S",
    "slug": "rayon-printed-co-ord-set-for-women",
    "sku": "KAMINI",
    "code": "EV-8070754992218",
    "description": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who love looking put-together without any effort. Product Details Fabric: Soft Premium Cotton – breathable and skin-friendly Colors: Espresso Brown | Mid Black Sizes: S, M, L, XL, 2XL, 3XL Fit: Relaxed and flattering for all body types Occasions: Casual outings, office wear, parties, and festive events Care: Easy to wash, color stays vibrant after multiple washes Why You'll Love It Lightweight and comfortable – feels great all day Suits all body types with its relaxed fit Works for both day and night looks Easy to style – pair with heels, flats, or sneakers All-season wear – cool in summer, easy to layer in winter Perfect For Brunch dates • Office days • Travel • Evening outings • Festive gathering",
    "shortDescription": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who...",
    "price": 1250,
    "compareAtPrice": 4299,
    "discountPercentage": 71,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/82c860e5-4272-4ae8-a831-e35a077d1b29.jpg?v=1787126081",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7e0fa7f9-ed48-461d-8eaa-4b2e8915f5e0.jpg?v=1787126082",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/f92a7067-626f-4518-914b-395fb4745629.jpg?v=1787126081"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43856229105754",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1250,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "KAMINI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081"
      },
      {
        "id": "var-43856229138522",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1250,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "KAMINI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081"
      },
      {
        "id": "var-43856229171290",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1250,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "KAMINI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081"
      },
      {
        "id": "var-43856229204058",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1250,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "KAMINI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081"
      },
      {
        "id": "var-43856229236826",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1250,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "KAMINI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081"
      },
      {
        "id": "var-43856229269594",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1250,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "KAMINI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9bbd513a-60b0-4b64-a704-ab47ef38dca4.jpg?v=1787126081"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": true,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-08-17T13:11:28+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8070754566234",
    "title": "Printed  Co-Ord Set – Luxury Cotton S",
    "slug": "espresso-limca-co-ord-set-luxury-cotton-everyday-elegance-copy",
    "sku": "BASHANTI",
    "code": "EV-8070754566234",
    "description": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who love looking put-together without any effort. Product Details Fabric: Soft Premium Cotton – breathable and skin-friendly Colors: Espresso Brown | Mid Black Sizes: S, M, L, XL, 2XL, 3XL Fit: Relaxed and flattering for all body types Occasions: Casual outings, office wear, parties, and festive events Care: Easy to wash, color stays vibrant after multiple washes Why You'll Love It Lightweight and comfortable – feels great all day Suits all body types with its relaxed fit Works for both day and night looks Easy to style – pair with heels, flats, or sneakers All-season wear – cool in summer, easy to layer in winter Perfect For Brunch dates • Office days • Travel • Evening outings • Festive gathering",
    "shortDescription": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who...",
    "price": 1350,
    "compareAtPrice": 4299,
    "discountPercentage": 69,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1caea838-5887-4f4b-8990-9133e977d52b.jpg?v=1787125952",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/d477800a-a23b-4883-9858-570212e0e427.jpg?v=1787125953",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2e98859d-d0ec-4d53-8edf-d2d325ad71a0.jpg?v=1787125953",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ee8cb39f-fc4e-4002-9fcd-540606a33fc1.jpg?v=1787125953"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43856224419930",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1350,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BASHANTI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1caea838-5887-4f4b-8990-9133e977d52b.jpg?v=1787125952"
      },
      {
        "id": "var-43856224485466",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1350,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BASHANTI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1caea838-5887-4f4b-8990-9133e977d52b.jpg?v=1787125952"
      },
      {
        "id": "var-43856224551002",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1350,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BASHANTI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1caea838-5887-4f4b-8990-9133e977d52b.jpg?v=1787125952"
      },
      {
        "id": "var-43856224616538",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1350,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BASHANTI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1caea838-5887-4f4b-8990-9133e977d52b.jpg?v=1787125952"
      },
      {
        "id": "var-43856224682074",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1350,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BASHANTI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1caea838-5887-4f4b-8990-9133e977d52b.jpg?v=1787125952"
      },
      {
        "id": "var-43856224747610",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1350,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "BASHANTI",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1caea838-5887-4f4b-8990-9133e977d52b.jpg?v=1787125952"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Soft Premium Cotton",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Soft Premium Cotton",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-08-17T13:07:54+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8050219974746",
    "title": "Espresso Limca Co-Ord Set – Luxury Cotton | Everyday Elegance",
    "slug": "espresso-limca-co-ord-set-luxury-cotton-everyday-elegance",
    "sku": "EV-8050219974746",
    "code": "EV-8050219974746",
    "description": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who love looking put-together without any effort. Product Details Fabric: Soft Premium Cotton – breathable and skin-friendly Colors: Espresso Brown | Mid Black Sizes: S, M, L, XL, 2XL, 3XL Fit: Relaxed and flattering for all body types Occasions: Casual outings, office wear, parties, and festive events Care: Easy to wash, color stays vibrant after multiple washes Why You'll Love It Lightweight and comfortable – feels great all day Suits all body types with its relaxed fit Works for both day and night looks Easy to style – pair with heels, flats, or sneakers All-season wear – cool in summer, easy to layer in winter Perfect For Brunch dates • Office days • Travel • Evening outings • Festive gathering",
    "shortDescription": "About This Co-Ord Set A stylish and comfortable co-ord set made for everyday wear. Available in Espresso Brown and Mid Black , this set is perfect for women who...",
    "price": 1699,
    "compareAtPrice": 4299,
    "discountPercentage": 60,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_0b69ba2f-ad62-43df-b7c3-b17c2fb74d6e.webp?v=1785585892",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_a3d35663-250e-431c-b2eb-75dcfb86d7a0.webp?v=1785585812",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/3_a44df2e4-9d9d-4a72-9fd6-a513c197b627.webp?v=1785585813",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/24.webp?v=1785563255",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/26.webp?v=1785563256"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43771402059866",
        "title": "S / Brown",
        "size": "S",
        "color": "Brown",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_0b69ba2f-ad62-43df-b7c3-b17c2fb74d6e.webp?v=1785585892"
      },
      {
        "id": "var-43771402092634",
        "title": "S / Black",
        "size": "S",
        "color": "Black",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/24.webp?v=1785563255"
      },
      {
        "id": "var-43771402125402",
        "title": "M / Brown",
        "size": "M",
        "color": "Brown",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_0b69ba2f-ad62-43df-b7c3-b17c2fb74d6e.webp?v=1785585892"
      },
      {
        "id": "var-43771402158170",
        "title": "M / Black",
        "size": "M",
        "color": "Black",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/24.webp?v=1785563255"
      },
      {
        "id": "var-43771402190938",
        "title": "L / Brown",
        "size": "L",
        "color": "Brown",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_0b69ba2f-ad62-43df-b7c3-b17c2fb74d6e.webp?v=1785585892"
      },
      {
        "id": "var-43771402223706",
        "title": "L / Black",
        "size": "L",
        "color": "Black",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/24.webp?v=1785563255"
      },
      {
        "id": "var-43771402256474",
        "title": "XL / Brown",
        "size": "XL",
        "color": "Brown",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_0b69ba2f-ad62-43df-b7c3-b17c2fb74d6e.webp?v=1785585892"
      },
      {
        "id": "var-43771402289242",
        "title": "XL / Black",
        "size": "XL",
        "color": "Black",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/24.webp?v=1785563255"
      },
      {
        "id": "var-43771402322010",
        "title": "2XL / Brown",
        "size": "2XL",
        "color": "Brown",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-9",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_0b69ba2f-ad62-43df-b7c3-b17c2fb74d6e.webp?v=1785585892"
      },
      {
        "id": "var-43771402354778",
        "title": "2XL / Black",
        "size": "2XL",
        "color": "Black",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-10",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/24.webp?v=1785563255"
      },
      {
        "id": "var-43771402387546",
        "title": "3XL / Brown",
        "size": "3XL",
        "color": "Brown",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-11",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_0b69ba2f-ad62-43df-b7c3-b17c2fb74d6e.webp?v=1785585892"
      },
      {
        "id": "var-43771402420314",
        "title": "3XL / Black",
        "size": "3XL",
        "color": "Black",
        "price": 1699,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8050219974746-12",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/24.webp?v=1785563255"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Brown",
      "Black"
    ],
    "fabric": "Soft Premium Cotton",
    "craft": "Zari & Thread Embroidery",
    "color": "Brown",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Soft Premium Cotton",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-08-01T11:19:40+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8045988511834",
    "title": "Women's Premium Rayon Printed Dress | Soft & Comfortable Casual Wear",
    "slug": "womens-premium-rayon-printed-dress-soft-comfortable-casual-wear",
    "sku": "COLA PINK S",
    "code": "EV-8045988511834",
    "description": "Product Details Fabric: Premium Rayon Color: WINE Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Friendly & Breathable Fabric Easy Wash & Durable Quality Why You’ll Love It Elegant all-black timeless design Soft and comfortable for all-day wear Perfect fit for every body type Trendy yet classy look Ideal for every season",
    "shortDescription": "Product Details Fabric: Premium Rayon Color: WINE Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Frien...",
    "price": 1699,
    "compareAtPrice": 4899,
    "discountPercentage": 65,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_9af6d48b-b2e6-4ed5-b8c7-84583e8e71e5.png?v=1785317794",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_26b9c65e-cf66-42dd-a4ce-a9641e794e32.png?v=1785317794",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/11_7a7405a2-3694-48d0-94dc-cffe707aec53.png?v=1785317794",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_af49a8c6-ed42-4624-bcd8-4bc359fb1534.png?v=1785317794"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43757498695770",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_9af6d48b-b2e6-4ed5-b8c7-84583e8e71e5.png?v=1785317794"
      },
      {
        "id": "var-43757498728538",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_9af6d48b-b2e6-4ed5-b8c7-84583e8e71e5.png?v=1785317794"
      },
      {
        "id": "var-43757498761306",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_9af6d48b-b2e6-4ed5-b8c7-84583e8e71e5.png?v=1785317794"
      },
      {
        "id": "var-43757498794074",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_9af6d48b-b2e6-4ed5-b8c7-84583e8e71e5.png?v=1785317794"
      },
      {
        "id": "var-43757498826842",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_9af6d48b-b2e6-4ed5-b8c7-84583e8e71e5.png?v=1785317794"
      },
      {
        "id": "var-43757498859610",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_9af6d48b-b2e6-4ed5-b8c7-84583e8e71e5.png?v=1785317794"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-29T15:06:10+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8045975699546",
    "title": "Women’s Soft Rayon Dress",
    "slug": "women-s-soft-rayon-dress",
    "sku": "COLA PINK S",
    "code": "EV-8045975699546",
    "description": "Product Details Fabric: Premium Rayon Color: PINK Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Friendly & Breathable Fabric Easy Wash & Durable Quality Why You’ll Love It Elegant all-black timeless design Soft and comfortable for all-day wear Perfect fit for every body type Trendy yet classy look Ideal for every season",
    "shortDescription": "Product Details Fabric: Premium Rayon Color: PINK Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Frien...",
    "price": 1699,
    "compareAtPrice": 4899,
    "discountPercentage": 65,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_50AM_2.webp?v=1785317689",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_11_04AM.webp?v=1785317689",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_49AM_1_ddb2eb6f-5f08-4ddc-8f14-bb8796378b1b.webp?v=1785317689"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43757480181850",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_50AM_2.webp?v=1785317689"
      },
      {
        "id": "var-43757480214618",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_50AM_2.webp?v=1785317689"
      },
      {
        "id": "var-43757480247386",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_50AM_2.webp?v=1785317689"
      },
      {
        "id": "var-43757480280154",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_50AM_2.webp?v=1785317689"
      },
      {
        "id": "var-43757480312922",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_50AM_2.webp?v=1785317689"
      },
      {
        "id": "var-43757480345690",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageMay29_2026_11_09_50AM_2.webp?v=1785317689"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": true,
    "bestseller": true,
    "tags": [
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-29T15:03:47+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8045975502938",
    "title": "Premium Rayon Dress for Women",
    "slug": "premium-rayon-dress-for-women",
    "sku": "COLA PINK S",
    "code": "EV-8045975502938",
    "description": "Product Details Fabric: Premium Rayon Gender: Women Fit: Regular Fit Pattern: Printed / Solid (Update as applicable) Sizes: S, M, L, XL, XXL, 3XL Occasion: Casual, Daily Wear, Office Wear, Travel Material: Soft & Breathable Rayon Features Premium Quality Rayon Fabric Lightweight & Comfortable Skin-Friendly Material Easy to Wash Perfect for All-Day Wear Stylish & Trendy Design",
    "shortDescription": "Product Details Fabric: Premium Rayon Gender: Women Fit: Regular Fit Pattern: Printed / Solid (Update as applicable) Sizes: S, M, L, XL, XXL, 3XL Occasion: Casu...",
    "price": 1399,
    "compareAtPrice": 4899,
    "discountPercentage": 71,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_1.png?v=1785317474",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1_14918617-0fb3-4b48-8a37-3cf9f191b5fa.png?v=1785317474",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/11_1.png?v=1785317474",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12_1_0c695415-83ed-409b-ab07-9011fe97153e.png?v=1785317474"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43757479526490",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1399,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_1.png?v=1785317474"
      },
      {
        "id": "var-43757479559258",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1399,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_1.png?v=1785317474"
      },
      {
        "id": "var-43757479592026",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1399,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_1.png?v=1785317474"
      },
      {
        "id": "var-43757479624794",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1399,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_1.png?v=1785317474"
      },
      {
        "id": "var-43757479657562",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1399,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_1.png?v=1785317474"
      },
      {
        "id": "var-43757479690330",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1399,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "COLA PINK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10_1.png?v=1785317474"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-29T15:02:51+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8045974913114",
    "title": "Women's Soft Rayon A-Line Maxi Dress",
    "slug": "womens-soft-rayon-a-line-maxi-dress",
    "sku": "COLA GREEN S",
    "code": "EV-8045974913114",
    "description": "Product Details Fabric: Premium Rayon Color: PISTA Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Friendly & Breathable Fabric Easy Wash & Durable Quality Why You’ll Love It Elegant all-black timeless design Soft and comfortable for all-day wear Perfect fit for every body type Trendy yet classy look Ideal for every season",
    "shortDescription": "Product Details Fabric: Premium Rayon Color: PISTA Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Frie...",
    "price": 1399,
    "compareAtPrice": 2799,
    "discountPercentage": 50,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_1.png?v=1785317259",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7_25063515-3f41-49d4-8625-a5ee51e9a3eb.png?v=1785317259",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_1.png?v=1785317259",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6_198b6166-d4fc-46c2-8746-a3297cbff7d7.png?v=1785317259"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43757477986394",
        "title": "Green / S",
        "size": "Green",
        "color": "S",
        "price": 1399,
        "compareAtPrice": 2799,
        "inStock": true,
        "sku": "COLA GREEN S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_1.png?v=1785317259"
      },
      {
        "id": "var-43757478019162",
        "title": "Green / M",
        "size": "Green",
        "color": "M",
        "price": 1399,
        "compareAtPrice": 2799,
        "inStock": true,
        "sku": "COLA GREEN M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_1.png?v=1785317259"
      },
      {
        "id": "var-43757478051930",
        "title": "Green / L",
        "size": "Green",
        "color": "L",
        "price": 1399,
        "compareAtPrice": 2799,
        "inStock": true,
        "sku": "COLA GREEN L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_1.png?v=1785317259"
      },
      {
        "id": "var-43757478084698",
        "title": "Green / XL",
        "size": "Green",
        "color": "XL",
        "price": 1399,
        "compareAtPrice": 2799,
        "inStock": true,
        "sku": "COLA GREEN XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_1.png?v=1785317259"
      },
      {
        "id": "var-43757478117466",
        "title": "Green / 2XL",
        "size": "Green",
        "color": "2XL",
        "price": 1399,
        "compareAtPrice": 2799,
        "inStock": true,
        "sku": "COLA GREEN 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_1.png?v=1785317259"
      },
      {
        "id": "var-43757478150234",
        "title": "Green / 3XL",
        "size": "Green",
        "color": "3XL",
        "price": 1399,
        "compareAtPrice": 2799,
        "inStock": true,
        "sku": "COLA GREEN 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_1.png?v=1785317259"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Green"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Zari & Thread Embroidery",
    "color": "Green",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-29T14:59:31+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8045973766234",
    "title": "Latest Design Dresses-Soft, Stylish & Comfortable",
    "slug": "latest-design-dresses-soft-stylish-comfortable",
    "sku": "SOSIYO PINK S",
    "code": "EV-8045973766234",
    "description": "Product Highlights 🌸 Premium quality rayon fabric 🌸 Soft, lightweight & breathable 🌸 Comfortable fit for all-day wear 🌸 Elegant design suitable for every occasion 🌸 Easy to style with heels, flats, or sneakers Product Details Fabric: Premium Rayon Available Sizes: S, M, L, XL, XXL, 3XL Fit: Regular Fit Sleeves: As shown in the image Neckline: As shown in the image Occasion: Casual Wear | Office Wear | Daily Wear | Outings",
    "shortDescription": "Product Highlights 🌸 Premium quality rayon fabric 🌸 Soft, lightweight & breathable 🌸 Comfortable fit for all-day wear 🌸 Elegant design suitable for every oc...",
    "price": 1699,
    "compareAtPrice": 4899,
    "discountPercentage": 65,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_50_59PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_a73656e6-57ba-4c18-a425-1dc3353b661c.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_01_03PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_53_18PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_49_40PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_45_49PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_55_36PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_56_54PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_03_08PM.webp?v=1785316864",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_58beb64b-f8ba-40ef-ab28-83c5889b2909.webp?v=1785316864"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43757472841818",
        "title": "Pink / S",
        "size": "Pink",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO PINK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_50_59PM.webp?v=1785316864"
      },
      {
        "id": "var-43757472874586",
        "title": "Pink / M",
        "size": "Pink",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO PINK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_50_59PM.webp?v=1785316864"
      },
      {
        "id": "var-43757472907354",
        "title": "Pink / L",
        "size": "Pink",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO PINK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_50_59PM.webp?v=1785316864"
      },
      {
        "id": "var-43757472940122",
        "title": "Pink / XL",
        "size": "Pink",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO PINK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_50_59PM.webp?v=1785316864"
      },
      {
        "id": "var-43757472972890",
        "title": "Pink / 2XL",
        "size": "Pink",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO PINK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_50_59PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473005658",
        "title": "Pink / 3XL",
        "size": "Pink",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO PINK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_50_59PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473038426",
        "title": "Black / S",
        "size": "Black",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO BLACK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_a73656e6-57ba-4c18-a425-1dc3353b661c.webp?v=1785316864"
      },
      {
        "id": "var-43757473071194",
        "title": "Black / M",
        "size": "Black",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO BLACK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_a73656e6-57ba-4c18-a425-1dc3353b661c.webp?v=1785316864"
      },
      {
        "id": "var-43757473103962",
        "title": "Black / L",
        "size": "Black",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO BLACK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_a73656e6-57ba-4c18-a425-1dc3353b661c.webp?v=1785316864"
      },
      {
        "id": "var-43757473136730",
        "title": "Black / XL",
        "size": "Black",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO BLACK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_a73656e6-57ba-4c18-a425-1dc3353b661c.webp?v=1785316864"
      },
      {
        "id": "var-43757473169498",
        "title": "Black / 2XL",
        "size": "Black",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO BLACK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_a73656e6-57ba-4c18-a425-1dc3353b661c.webp?v=1785316864"
      },
      {
        "id": "var-43757473202266",
        "title": "Black / 3XL",
        "size": "Black",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO BLACK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8_a73656e6-57ba-4c18-a425-1dc3353b661c.webp?v=1785316864"
      },
      {
        "id": "var-43757473235034",
        "title": "Orange / S",
        "size": "Orange",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO ORANGE S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_01_03PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473267802",
        "title": "Orange / M",
        "size": "Orange",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO ORANGE M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_01_03PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473300570",
        "title": "Orange / L",
        "size": "Orange",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO ORANGE L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_01_03PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473333338",
        "title": "Orange / XL",
        "size": "Orange",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO ORANGE XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_01_03PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473366106",
        "title": "Orange / 2XL",
        "size": "Orange",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO ORANGE 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_01_03PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473398874",
        "title": "Orange / 3XL",
        "size": "Orange",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO ORANGE 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_03_01_03PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473431642",
        "title": "Green / S",
        "size": "Green",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO GREEN S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_53_18PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473464410",
        "title": "Green / M",
        "size": "Green",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO GREEN M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_53_18PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473497178",
        "title": "Green / L",
        "size": "Green",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO GREEN L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_53_18PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473529946",
        "title": "Green / XL",
        "size": "Green",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO GREEN XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_53_18PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473562714",
        "title": "Green / 2XL",
        "size": "Green",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO GREEN 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_53_18PM.webp?v=1785316864"
      },
      {
        "id": "var-43757473595482",
        "title": "Green / 3XL",
        "size": "Green",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 4899,
        "inStock": true,
        "sku": "SOSIYO GREEN 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ChatGPTImageJun18_2026_02_53_18PM.webp?v=1785316864"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Pink",
      "Black",
      "Orange",
      "Green"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Zari & Thread Embroidery",
    "color": "Pink",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-29T14:55:25+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8045969670234",
    "title": "Designer Rayon Dress",
    "slug": "designer-rayon-dress-1",
    "sku": "SOSIYO PINK S",
    "code": "EV-8045969670234",
    "description": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flattering fit for every body type. Perfect for casual outings, office wear, or daily use. Fabric: Rayon Sizes Available: S to 3XL Fit: Comfortable & breathable Occasion: Casual | Daily Wear | Office",
    "shortDescription": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flatter...",
    "price": 1699,
    "compareAtPrice": 5699,
    "discountPercentage": 70,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_d0748059-5ef4-4ef6-9948-797980939804.webp?v=1785316471",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Chic_elegance_in_a_boutique_setting.webp?v=1785316471",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/03_jpg.webp?v=1785316495",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/04_jpg.webp?v=1785316495",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_916c9c93-d216-41e6-ae87-558eed834c2f.webp?v=1785316495",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/02_JPG.webp?v=1785316471",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_jpg.webp?v=1785316471"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43757457440858",
        "title": "Pink / S",
        "size": "Pink",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO PINK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_d0748059-5ef4-4ef6-9948-797980939804.webp?v=1785316471"
      },
      {
        "id": "var-43757457473626",
        "title": "Pink / M",
        "size": "Pink",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO PINK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_d0748059-5ef4-4ef6-9948-797980939804.webp?v=1785316471"
      },
      {
        "id": "var-43757457506394",
        "title": "Pink / L",
        "size": "Pink",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO PINK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_d0748059-5ef4-4ef6-9948-797980939804.webp?v=1785316471"
      },
      {
        "id": "var-43757457539162",
        "title": "Pink / XL",
        "size": "Pink",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO PINK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_d0748059-5ef4-4ef6-9948-797980939804.webp?v=1785316471"
      },
      {
        "id": "var-43757457571930",
        "title": "Pink / 2XL",
        "size": "Pink",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO PINK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_d0748059-5ef4-4ef6-9948-797980939804.webp?v=1785316471"
      },
      {
        "id": "var-43757457604698",
        "title": "Pink / 3XL",
        "size": "Pink",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO PINK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_d0748059-5ef4-4ef6-9948-797980939804.webp?v=1785316471"
      },
      {
        "id": "var-43757457637466",
        "title": "Black / S",
        "size": "Black",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BLACK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Chic_elegance_in_a_boutique_setting.webp?v=1785316471"
      },
      {
        "id": "var-43757457670234",
        "title": "Black / M",
        "size": "Black",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BLACK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Chic_elegance_in_a_boutique_setting.webp?v=1785316471"
      },
      {
        "id": "var-43757457703002",
        "title": "Black / L",
        "size": "Black",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BLACK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Chic_elegance_in_a_boutique_setting.webp?v=1785316471"
      },
      {
        "id": "var-43757457735770",
        "title": "Black / XL",
        "size": "Black",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BLACK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Chic_elegance_in_a_boutique_setting.webp?v=1785316471"
      },
      {
        "id": "var-43757457768538",
        "title": "Black / 2XL",
        "size": "Black",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BLACK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Chic_elegance_in_a_boutique_setting.webp?v=1785316471"
      },
      {
        "id": "var-43757457801306",
        "title": "Black / 3XL",
        "size": "Black",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BLACK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/Chic_elegance_in_a_boutique_setting.webp?v=1785316471"
      },
      {
        "id": "var-43757457834074",
        "title": "Green / S",
        "size": "Green",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO GREEN S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/03_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757457866842",
        "title": "Green / M",
        "size": "Green",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO GREEN M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/03_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757457899610",
        "title": "Green / L",
        "size": "Green",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO GREEN L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/03_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757457932378",
        "title": "Green / XL",
        "size": "Green",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO GREEN XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/03_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757457965146",
        "title": "Green / 2XL",
        "size": "Green",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO GREEN 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/03_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757457997914",
        "title": "Green / 3XL",
        "size": "Green",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO GREEN 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/03_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757458030682",
        "title": "Brown / S",
        "size": "Brown",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BROWN S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/04_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757458063450",
        "title": "Brown / M",
        "size": "Brown",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BROWN M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/04_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757458096218",
        "title": "Brown / L",
        "size": "Brown",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BROWN L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/04_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757458128986",
        "title": "Brown / XL",
        "size": "Brown",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BROWN XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/04_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757458161754",
        "title": "Brown / 2XL",
        "size": "Brown",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BROWN 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/04_jpg.webp?v=1785316495"
      },
      {
        "id": "var-43757458194522",
        "title": "Brown / 3XL",
        "size": "Brown",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 5699,
        "inStock": true,
        "sku": "SOSIYO BROWN 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/04_jpg.webp?v=1785316495"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Pink",
      "Black",
      "Green",
      "Brown"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Zari & Thread Embroidery",
    "color": "Pink",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": true,
    "bestseller": true,
    "tags": [
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-29T14:48:53+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8043805376602",
    "title": "Premium Rayon Dress for Women | Casual Daily Wear | S-3XL",
    "slug": "womens-rayon-dress-stylish-comfortable-copy",
    "sku": "EV-8043805376602",
    "code": "EV-8043805376602",
    "description": "efresh your wardrobe with this stylish rayon dress, crafted from premium-quality rayon fabric for superior comfort and elegance. Its soft, breathable material makes it perfect for daily wear, office wear, casual outings, travel, and weekend occasions. Designed with a flattering fit and modern style, this dress offers comfort without compromising on fashion. Product Details Fabric: Premium Rayon Gender: Women Fit: Regular Fit Pattern: Printed / Solid (Update as applicable) Sizes: S, M, L, XL, XXL, 3XL Occasion: Casual, Daily Wear, Office Wear, Travel Material: Soft & Breathable Rayon Features Premium Quality Rayon Fabric Lightweight & Comfortable Skin-Friendly Material Easy to Wash Perfect for All-Day Wear Stylish & Trendy Design",
    "shortDescription": "efresh your wardrobe with this stylish rayon dress, crafted from premium-quality rayon fabric for superior comfort and elegance. Its soft, breathable material m...",
    "price": 1399,
    "compareAtPrice": 2299,
    "discountPercentage": 39,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1.png?v=1785221819",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1.png?v=1785221819",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.png?v=1785221819",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/3_1.png?v=1785221819",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12_1.png?v=1785221819",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7.png?v=1785221819"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43747376693338",
        "title": "White / S",
        "size": "White",
        "color": "S",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1.png?v=1785221819"
      },
      {
        "id": "var-43747376726106",
        "title": "White / M",
        "size": "White",
        "color": "M",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1.png?v=1785221819"
      },
      {
        "id": "var-43747376758874",
        "title": "White / L",
        "size": "White",
        "color": "L",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1.png?v=1785221819"
      },
      {
        "id": "var-43747376791642",
        "title": "White / XL",
        "size": "White",
        "color": "XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1.png?v=1785221819"
      },
      {
        "id": "var-43747376824410",
        "title": "White / 2XL",
        "size": "White",
        "color": "2XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1.png?v=1785221819"
      },
      {
        "id": "var-43747376857178",
        "title": "White / 3XL",
        "size": "White",
        "color": "3XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1.png?v=1785221819"
      },
      {
        "id": "var-43757429555290",
        "title": "Pink / S",
        "size": "Pink",
        "color": "S",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1.png?v=1785221819"
      },
      {
        "id": "var-43757429620826",
        "title": "Pink / M",
        "size": "Pink",
        "color": "M",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1.png?v=1785221819"
      },
      {
        "id": "var-43757429686362",
        "title": "Pink / L",
        "size": "Pink",
        "color": "L",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-9",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1.png?v=1785221819"
      },
      {
        "id": "var-43757429751898",
        "title": "Pink / XL",
        "size": "Pink",
        "color": "XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-10",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1.png?v=1785221819"
      },
      {
        "id": "var-43757429817434",
        "title": "Pink / 2XL",
        "size": "Pink",
        "color": "2XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-11",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1.png?v=1785221819"
      },
      {
        "id": "var-43757429882970",
        "title": "Pink / 3XL",
        "size": "Pink",
        "color": "3XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-12",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9_1.png?v=1785221819"
      },
      {
        "id": "var-43757429588058",
        "title": "Beige / S",
        "size": "Beige",
        "color": "S",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-13",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.png?v=1785221819"
      },
      {
        "id": "var-43757429653594",
        "title": "Beige / M",
        "size": "Beige",
        "color": "M",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-14",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.png?v=1785221819"
      },
      {
        "id": "var-43757429719130",
        "title": "Beige / L",
        "size": "Beige",
        "color": "L",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-15",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.png?v=1785221819"
      },
      {
        "id": "var-43757429784666",
        "title": "Beige / XL",
        "size": "Beige",
        "color": "XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-16",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.png?v=1785221819"
      },
      {
        "id": "var-43757429850202",
        "title": "Beige / 2XL",
        "size": "Beige",
        "color": "2XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-17",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.png?v=1785221819"
      },
      {
        "id": "var-43757429915738",
        "title": "Beige / 3XL",
        "size": "Beige",
        "color": "3XL",
        "price": 1399,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "EV-8043805376602-18",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.png?v=1785221819"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "White",
      "Pink",
      "Beige"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Ethnic Handblock Print",
    "color": "White",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-28T12:25:17+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8043804426330",
    "title": "Women's Rayon Dress – Stylish & Comfortable",
    "slug": "womens-rayon-dress-stylish-comfortable",
    "sku": "Kinely BLACK S",
    "code": "EV-8043804426330",
    "description": "Product Details Fabric: Premium Rayon Color: Black Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Friendly & Breathable Fabric Easy Wash & Durable Quality Why You’ll Love It Elegant all-black timeless design Soft and comfortable for all-day wear Perfect fit for every body type Trendy yet classy look Ideal for every season",
    "shortDescription": "Product Details Fabric: Premium Rayon Color: Black Sizes Available: S to 3XL Fit: Comfortable & Stylish Occasion: Casual, Office, Party & Festive Wear Skin-Frie...",
    "price": 1699,
    "compareAtPrice": 2299,
    "discountPercentage": 26,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1d9f2832-394b-4340-8e60-e862ea3f7f11.webp?v=1785221452",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_06154ead-cc24-4649-b22a-231b58b4ff8b.webp?v=1785221452",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/13.png?v=1785221453",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.png?v=1785221452",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/15.png?v=1785221453",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/14.png?v=1785221453",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12.png?v=1785221453",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/11.png?v=1785221453",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9.png?v=1785221453",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/10.png?v=1785221453"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43747374661722",
        "title": "Black / S",
        "size": "Black",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLACK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1d9f2832-394b-4340-8e60-e862ea3f7f11.webp?v=1785221452"
      },
      {
        "id": "var-43757448527962",
        "title": "Black / M",
        "size": "Black",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLACK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1d9f2832-394b-4340-8e60-e862ea3f7f11.webp?v=1785221452"
      },
      {
        "id": "var-43757448560730",
        "title": "Black / L",
        "size": "Black",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLACK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1d9f2832-394b-4340-8e60-e862ea3f7f11.webp?v=1785221452"
      },
      {
        "id": "var-43757448593498",
        "title": "Black / XL",
        "size": "Black",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLACK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1d9f2832-394b-4340-8e60-e862ea3f7f11.webp?v=1785221452"
      },
      {
        "id": "var-43757448626266",
        "title": "Black / 2XL",
        "size": "Black",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLACK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1d9f2832-394b-4340-8e60-e862ea3f7f11.webp?v=1785221452"
      },
      {
        "id": "var-43757448659034",
        "title": "Black / 3XL",
        "size": "Black",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLACK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_1d9f2832-394b-4340-8e60-e862ea3f7f11.webp?v=1785221452"
      },
      {
        "id": "var-43757448691802",
        "title": "Pink / S",
        "size": "Pink",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely PINK S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_06154ead-cc24-4649-b22a-231b58b4ff8b.webp?v=1785221452"
      },
      {
        "id": "var-43757448724570",
        "title": "Pink / M",
        "size": "Pink",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely PINK M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_06154ead-cc24-4649-b22a-231b58b4ff8b.webp?v=1785221452"
      },
      {
        "id": "var-43757448757338",
        "title": "Pink / L",
        "size": "Pink",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely PINK L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_06154ead-cc24-4649-b22a-231b58b4ff8b.webp?v=1785221452"
      },
      {
        "id": "var-43757448790106",
        "title": "Pink / XL",
        "size": "Pink",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely PINK XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_06154ead-cc24-4649-b22a-231b58b4ff8b.webp?v=1785221452"
      },
      {
        "id": "var-43757448822874",
        "title": "Pink / 2XL",
        "size": "Pink",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely PINK 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_06154ead-cc24-4649-b22a-231b58b4ff8b.webp?v=1785221452"
      },
      {
        "id": "var-43757448855642",
        "title": "Pink / 3XL",
        "size": "Pink",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely PINK 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_06154ead-cc24-4649-b22a-231b58b4ff8b.webp?v=1785221452"
      },
      {
        "id": "var-43757448888410",
        "title": "Blue / S",
        "size": "Blue",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLUE S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12.png?v=1785221453"
      },
      {
        "id": "var-43757448921178",
        "title": "Blue / M",
        "size": "Blue",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLUE M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12.png?v=1785221453"
      },
      {
        "id": "var-43757448953946",
        "title": "Blue / L",
        "size": "Blue",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLUE L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12.png?v=1785221453"
      },
      {
        "id": "var-43757448986714",
        "title": "Blue / XL",
        "size": "Blue",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLUE XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12.png?v=1785221453"
      },
      {
        "id": "var-43757449019482",
        "title": "Blue / 2XL",
        "size": "Blue",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLUE 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12.png?v=1785221453"
      },
      {
        "id": "var-43757449052250",
        "title": "Blue / 3XL",
        "size": "Blue",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely BLUE 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/12.png?v=1785221453"
      },
      {
        "id": "var-43757449085018",
        "title": "WINE / S",
        "size": "WINE",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely WINE S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.png?v=1785221452"
      },
      {
        "id": "var-43757449117786",
        "title": "WINE / M",
        "size": "WINE",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely WINE M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.png?v=1785221452"
      },
      {
        "id": "var-43757449150554",
        "title": "WINE / L",
        "size": "WINE",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely WINE L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.png?v=1785221452"
      },
      {
        "id": "var-43757449183322",
        "title": "WINE / XL",
        "size": "WINE",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely WINE XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.png?v=1785221452"
      },
      {
        "id": "var-43757449216090",
        "title": "WINE / 2XL",
        "size": "WINE",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely WINE 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.png?v=1785221452"
      },
      {
        "id": "var-43757449248858",
        "title": "WINE / 3XL",
        "size": "WINE",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "Kinely WINE 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.png?v=1785221452"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Black",
      "Pink",
      "Blue",
      "WINE"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Zari & Thread Embroidery",
    "color": "Black",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": true,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-28T12:19:36+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8027391033434",
    "title": "Rayon Co-Ord Set for Women",
    "slug": "premium-cotton-co-ord-set-for-women-with-embroidered-jacket-casual-office-wear",
    "sku": "KAMINI S",
    "code": "EV-8027391033434",
    "description": "Upgrade your everyday style with this elegant Rayon Co-Ord Set designed for comfort and effortless fashion. Perfect for daily wear, outings, or casual occasions, this outfit gives you a complete ready-to-wear look in seconds. Crafted from soft and breathable rayon fabric, it keeps you cool and comfortable all day long while maintaining a stylish appearance. ✨ Why You'll Love It: Premium quality rayon fabric – soft, lightweight & breathable Trendy co-ord design – no styling stress Perfect for daily wear, travel & casual outings Comfortable fit with a modern look Suitable for all seasons 📏 Available Sizes: S to 3XL 🎨 Available Colors: Multiple trendy shades",
    "shortDescription": "Upgrade your everyday style with this elegant Rayon Co-Ord Set designed for comfort and effortless fashion. Perfect for daily wear, outings, or casual occasions...",
    "price": 1699,
    "compareAtPrice": 7899,
    "discountPercentage": 78,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087.webp?v=1785221621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_43_6181414166627815086.webp?v=1785221621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-04-06at4.04.09PM.webp?v=1785221621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-04-06at4.04.39PM.webp?v=1785221621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-04-06at4.06.05PM.webp?v=1785221621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087_1.webp?v=1785221621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_43_6181414166627815086_1.webp?v=1785221621"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43747376431194",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 7899,
        "inStock": true,
        "sku": "KAMINI S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087.webp?v=1785221621"
      },
      {
        "id": "var-43681736949850",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 7899,
        "inStock": true,
        "sku": "KAMINI M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087.webp?v=1785221621"
      },
      {
        "id": "var-43681736982618",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 7899,
        "inStock": true,
        "sku": "KAMINI L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087.webp?v=1785221621"
      },
      {
        "id": "var-43681737015386",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 7899,
        "inStock": true,
        "sku": "KAMINI XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087.webp?v=1785221621"
      },
      {
        "id": "var-43681737048154",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 7899,
        "inStock": true,
        "sku": "KAMINI 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087.webp?v=1785221621"
      },
      {
        "id": "var-43747376463962",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 7899,
        "inStock": true,
        "sku": "KAMINI 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/imgi_86_6181414166627815087.webp?v=1785221621"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": true,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-20T16:27:26+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8027343257690",
    "title": "Premium Floral Printed Indo-Western Cape Set with Palazzo for Women",
    "slug": "fusion-ensemble-with-shrug",
    "sku": "EV-8027343257690",
    "code": "EV-8027343257690",
    "description": "Product Description Premium Designer Indo-Western Luxury Collection Step into elegance with this beautifully crafted Premium Floral Printed Indo-Western Cape Set from Evara Vastra . Designed using luxurious French Crepe fabric with elegant floral digital prints and delicate handwork, this outfit gives a modern designer look while ensuring all-day comfort. The stylish crop top is paired with a graceful flared palazzo and a lightweight organza cape, making it an ideal outfit for festive celebrations, weddings, mehendi, sangeet, haldi, receptions, family functions and party wear. Its soft fabric, flattering silhouette and premium finish make it a perfect choice for women who love luxury ethnic fashion. Product Details Feature Details Brand Evara Vastra Style Code D.NO.-059 Top Fabric Premium French Crepe Work Digital Print with Handwork Inner Soft Full Inner Attached Bottom Premium French Crepe Palazzo Palazzo Style Fully Stitched Flared Palazzo Cape Fabric Premium Soft Organza Sleeve Style Cape Style Fit Comfortable Regular Fit Weight Approx. 650 gm Stitching Fully Stitched Available Sizes M (38) L (40) XL (42) XXL (44) Shipping Information 🚚 Free Shipping Across India 💳 10% Extra Discount on Prepaid Orders 📦 COD Available",
    "shortDescription": "Product Description Premium Designer Indo-Western Luxury Collection Step into elegance with this beautifully crafted Premium Floral Printed Indo-Western Cape Se...",
    "price": 2199,
    "compareAtPrice": 3299,
    "discountPercentage": 33,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM_1.jpg?v=1784535070",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/image.png?v=1784537638",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/image_1.png?v=1784537638"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "everyday-elegance",
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43681527103578",
        "title": "M / Green",
        "size": "M",
        "color": "Green",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      },
      {
        "id": "var-43681527136346",
        "title": "L / Green",
        "size": "L",
        "color": "Green",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      },
      {
        "id": "var-43681527169114",
        "title": "XL / Green",
        "size": "XL",
        "color": "Green",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      },
      {
        "id": "var-43681527201882",
        "title": "2XL / Green",
        "size": "2XL",
        "color": "Green",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      },
      {
        "id": "var-43682377695322",
        "title": "M / Pink",
        "size": "M",
        "color": "Pink",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      },
      {
        "id": "var-43682377728090",
        "title": "L / Pink",
        "size": "L",
        "color": "Pink",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      },
      {
        "id": "var-43682377760858",
        "title": "XL / Pink",
        "size": "XL",
        "color": "Pink",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      },
      {
        "id": "var-43682377793626",
        "title": "2XL / Pink",
        "size": "2XL",
        "color": "Pink",
        "price": 2199,
        "compareAtPrice": 3299,
        "inStock": true,
        "sku": "EV-8027343257690-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-07-20at12.53.56PM.jpg?v=1784535070"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Green",
      "Pink"
    ],
    "fabric": "Pure Organza",
    "craft": "Ethnic Handblock Print",
    "color": "Green",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": true,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Organza",
      "craft": "Ethnic Handblock Print",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-07-20T13:53:44+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8023430692954",
    "title": "Chic Daily-Wear Graphic Co-ord Set",
    "slug": "chic-daily-wear-graphic-co-ord-set",
    "sku": "BASHANTI S",
    "code": "EV-8023430692954",
    "description": "Product Description Upgrade your ethnic wardrobe with this elegant embroidered co-ord set from Eva Vastra. Crafted from premium-quality cotton fabric, this outfit features a beautifully embroidered yoke, a comfortable straight-fit kurti, and matching wide-leg palazzo pants. Perfect for office wear, casual outings, festive gatherings, family functions, and everyday elegance. 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders roduct Details Fabric: Premium Cotton Kurti Style: Straight Fit Bottom Style: Palazzo Pant Neck: Round Neck Sleeve Length: 3/4 Sleeves Pattern: Embroidered Yoke Occasion: Casual | Office | Daily Wear | Festive Fit: Regular Fit Wash Care: Machine Wash / Gentle Hand Wash Available Sizes S | M | L | XL | XXL| 3XL",
    "shortDescription": "Product Description Upgrade your ethnic wardrobe with this elegant embroidered co-ord set from Eva Vastra. Crafted from premium-quality cotton fabric, this outf...",
    "price": 1699,
    "compareAtPrice": 2299,
    "discountPercentage": 26,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_1.png?v=1784263779",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_3.png?v=1784263779",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_2.png?v=1784263779",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-04-08at10.58.21AM.webp?v=1784263779"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43668160118874",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "BASHANTI S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_1.png?v=1784263779"
      },
      {
        "id": "var-43668157661274",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "BASHANTI M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_1.png?v=1784263779"
      },
      {
        "id": "var-43668157694042",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "BASHANTI L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_1.png?v=1784263779"
      },
      {
        "id": "var-43668157726810",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "BASHANTI XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_1.png?v=1784263779"
      },
      {
        "id": "var-43668157759578",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "BASHANTI 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_1.png?v=1784263779"
      },
      {
        "id": "var-43668160151642",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1699,
        "compareAtPrice": 2299,
        "inStock": true,
        "sku": "BASHANTI 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6206261080716152987_1.png?v=1784263779"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Soft Premium Cotton",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Soft Premium Cotton",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-17T10:08:22+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-8023429939290",
    "title": "Embroidered Kurti Pant Dupatta Collection",
    "slug": "embroidered-kurti-pant-dupatta-collection",
    "sku": "EV-8023429939290",
    "code": "EV-8023429939290",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. 💖 Soft, stylish & comfortable fabric for all-day wear. ✔ Premium Chinon Fabric ✔ Heavy Embroidery & Zardosi Work ✔ Fully Stitched & Ready To Wear ✔ Elegant Festive Look ✔ Comfortable Fit & Premium Finish 📦 Package Contains: 1 Kurti 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2799,
    "compareAtPrice": 4299,
    "discountPercentage": 35,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122092_fc26c5ae-7fca-416f-9584-1bc127e44525.jpg?v=1784262824",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122093_5d0ebe15-55bf-48b3-8799-cac8ef36dab6.jpg?v=1784262825",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122094_4cb71320-3590-4e5b-8a8f-d65d47e6e247.jpg?v=1784262825",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122096_09ea6c19-1e24-4072-bc59-72c022550c9f.jpg?v=1784262825",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122097_8bf0f5dd-52e0-4a99-ad8a-4336260919a1.jpg?v=1784262825",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122109_77067ce5-d567-43c0-b8d7-be38d0eee3eb.jpg?v=1784262839",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122085_e53bb4a4-ca4a-493e-bd87-4e2cb191e8ba.jpg?v=1784262825",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122095_c98afc12-1ecf-4e41-852e-5f7c9e02eaf3.jpg?v=1784262825",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122110_1ce64648-84da-4be8-9328-81f9f87289c6.jpg?v=1784262839",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122111_177d5b62-ab74-44c8-82d6-ca910553a6e4.jpg?v=1784262839"
    ],
    "category": "kurta-sets",
    "collection": "new-arrivals",
    "collections": [
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43668152778842",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2799,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8023429939290-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122092_fc26c5ae-7fca-416f-9584-1bc127e44525.jpg?v=1784262824"
      },
      {
        "id": "var-43668152811610",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2799,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8023429939290-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122092_fc26c5ae-7fca-416f-9584-1bc127e44525.jpg?v=1784262824"
      },
      {
        "id": "var-43668152844378",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2799,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8023429939290-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122092_fc26c5ae-7fca-416f-9584-1bc127e44525.jpg?v=1784262824"
      },
      {
        "id": "var-43668152877146",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2799,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-8023429939290-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104762014145122092_fc26c5ae-7fca-416f-9584-1bc127e44525.jpg?v=1784262824"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Kurta Set",
      "Kurti Pant Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-07-17T10:02:39+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7985958256730",
    "title": "Aafreen Embroidered Kurta Set",
    "slug": "women-embroidered-kurti-plazzo-set-with-dupatta-copy-1",
    "sku": "EV-7985958256730",
    "code": "EV-7985958256730",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. Kurti:- FABRICS :- Chinon Work :-Havy Embridery With 5mm sequnce Work LENGTH :- 34 INCH LINING :- Cotton (Full Inner ) SLEEVES :- 3/4 Sleeves NECK TYPE :-Round Neck STITCHING TYPE:- Fully Stitched (Ready to Wear) DUPATTA:- FABRIC :- Chinon WORK :- Havy Embridery With 5mm sequnce Work LENGTH :- 2.25 MTR Sarara:- FABRIC :- Chinon Work :-Havy Embridery With 5mm sequnce Work LENGTH :- 39 INCH WAIST:- Elastic waist This elegant sharara set comes in a soothing pastel sage green shade, beautifully crafted from a lightweight and flowy fabric that offers both comfort and grace. The kurta features intricate embroidery with delicate thread and sequin work across the neckline, front, and hemline, adding a subtle yet rich shimmer to the overall look, while the wide sleeves enhance its stylish and airy silhouette. It is paired with a matching flared sharara adorned with detailed embroidered borders that give a festive and luxurious touch, and completed with a soft, sheer dupatta decorated with fine motifs and a heavily embellished border that drapes effortlessly. Perfect for weddings, festive occasions, and traditional gatherings, this outfit reflects a perfect blend of modern elegance and timeless ethnic charm. 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2499,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485559_5af992e2-2178-42b7-b28d-b48a7db613f3.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485558_9fd44675-d3fd-4d0f-8ba8-97c0566c23ec.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485557_17b20f3f-d24d-4f0c-b9a8-f8ec099b3fd3.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485556_e44755a2-0aa9-4910-aff0-05744afc6495.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485554_fcbef212-be25-4806-ae62-34fbb8b99995.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485553_750b9bbf-5fad-4382-8bb0-d632c7ec9733.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485552_a85f3099-d4c7-4515-923f-7bf47671e790.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485551_6433e073-f2d8-44cc-bb78-a80cf40a3605.jpg?v=1782806508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485550_b199068c-9255-40a9-8a13-0a44bde676e6.jpg?v=1782806508"
    ],
    "category": "kurta-sets",
    "collection": "new-arrivals",
    "collections": [
      "new-arrivals"
    ],
    "variants": [
      {
        "id": "var-43572772667482",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2499,
        "inStock": true,
        "sku": "EV-7985958256730-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485559_5af992e2-2178-42b7-b28d-b48a7db613f3.jpg?v=1782806508"
      },
      {
        "id": "var-43572772700250",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2499,
        "inStock": true,
        "sku": "EV-7985958256730-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485559_5af992e2-2178-42b7-b28d-b48a7db613f3.jpg?v=1782806508"
      },
      {
        "id": "var-43572772733018",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2499,
        "inStock": true,
        "sku": "EV-7985958256730-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485559_5af992e2-2178-42b7-b28d-b48a7db613f3.jpg?v=1782806508"
      },
      {
        "id": "var-43572772765786",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2499,
        "inStock": true,
        "sku": "EV-7985958256730-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271766380021485559_5af992e2-2178-42b7-b28d-b48a7db613f3.jpg?v=1782806508"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "blue",
      "Dhoti Salwar",
      "Kurta Set",
      "Printed Saree"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-30T13:30:40+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7984918003802",
    "title": "Designer Fancy Kurti and Pant Set",
    "slug": "designer-fancy-kurti-and-pant-set-blue",
    "sku": "EV-7984918003802",
    "code": "EV-7984918003802",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. Kurti FABRICS :- Cosmos Simmer Work :-Havy Bids & jardosi Work LENGTH :- 37 INCH LINING :- Cotton (Full Inner ) SLEEVES :- 3/4 Sleeves NECK TYPE :-Round Neck STITCHING TYPE:- Fully Stitched (Ready to Wear) Bottom:- FABRIC :- Cosmos Simmer LENGTH :- 39-40 INCH WAIST:- Elastic waist This elegant teal blue ethnic co-ord set features a beautifully designed kurti paired with matching straight-fit pants, crafted from soft and flowy fabric for all-day comfort and graceful movement. The kurti comes with a stylish asymmetrical hemline, a classic round neckline, and three-quarter sleeves, giving it a modern yet traditional appeal. The highlight of the outfit is the intricate multicolor embroidery with floral and traditional motifs at the front hem, enhanced with subtle sequin detailing that adds a rich and festive touch. Paired with solid matching pants, this outfit creates a perfectly balanced and polished look, making it ideal for festive occasions, casual gatherings, and daytime events. 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2800,
    "compareAtPrice": 4999,
    "discountPercentage": 44,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990859.jpg?v=1782734040",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990850.jpg?v=1782734040",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990851.jpg?v=1782734040",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990853.jpg?v=1782734040",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990854.jpg?v=1782734040",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990855.jpg?v=1782734040"
    ],
    "category": "kurta-sets",
    "collection": "new-arrivals",
    "collections": [
      "new-arrivals",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43570206900314",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2800,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7984918003802-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990859.jpg?v=1782734040"
      },
      {
        "id": "var-43570206933082",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2800,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7984918003802-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990859.jpg?v=1782734040"
      },
      {
        "id": "var-43570206965850",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2800,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7984918003802-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990859.jpg?v=1782734040"
      },
      {
        "id": "var-43570206998618",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2800,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7984918003802-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6183620856399990859.jpg?v=1782734040"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "blue",
      "Dhoti Salwar",
      "Kurta Set",
      "Printed Saree"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-29T15:27:32+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7973339201626",
    "title": "💫 PREMIUM anarkali SALWAR SUIT digital print sets with dupatta👗",
    "slug": "💫-premium-anarkali-salwar-suit-digital-print-sets-with-dupatta👗",
    "sku": "EV-7973339201626",
    "code": "EV-7973339201626",
    "description": "💫 PREMIUM PRINTED TOP with plazo and dupatta👗 🧵 FABRIC: French crepe 🎨 WORK: PRINT with embroidery 📏 SIZES: M (38), L (40), XL (42), XXL (44) 3xl(46) 📐 LENGTH: 34 Plazo length: 40 Dupatta fabric: orgenza with work NECK TYPE: stylish embroid NECK 🚚 READY STOCK | ✨ PREMIUM FINISHING",
    "shortDescription": "💫 PREMIUM PRINTED TOP with plazo and dupatta👗 🧵 FABRIC: French crepe 🎨 WORK: PRINT with embroidery 📏 SIZES: M (38), L (40), XL (42), XXL (44) 3xl(46) 📐 LE...",
    "price": 1999,
    "compareAtPrice": 3599,
    "discountPercentage": 44,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038701.jpg?v=1782202770",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038705.jpg?v=1782202770",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038704.jpg?v=1782202770",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038702.jpg?v=1782202770",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038703.jpg?v=1782202770",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038706.jpg?v=1782202770",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038707.jpg?v=1782202770"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43537648353370",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1999,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7973339201626-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038701.jpg?v=1782202770"
      },
      {
        "id": "var-43537648386138",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1999,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7973339201626-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038701.jpg?v=1782202770"
      },
      {
        "id": "var-43537648418906",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1999,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7973339201626-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038701.jpg?v=1782202770"
      },
      {
        "id": "var-43537648451674",
        "title": "XXL",
        "size": "XXL",
        "color": "XXL",
        "price": 1999,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7973339201626-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038701.jpg?v=1782202770"
      },
      {
        "id": "var-43537648484442",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1999,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7973339201626-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038701.jpg?v=1782202770"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-23T13:48:34+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969316208730",
    "title": "Women's Heavy Embroidered Kurta Palazzo Set for Festival & Party Wear",
    "slug": "womens-heavy-embroidered-kurta-palazzo-set-for-festival-party-wear",
    "sku": "EV-7969316208730",
    "code": "EV-7969316208730",
    "description": "✨ Premium Embroidered Outfit Details ✨ 👗 Fabric: Heavy Tebby Organza 💎 Rich look with premium quality finish ✨ 🧵 Work: Beautiful Embroidery Work 🌸 Fine detailing with elegant craftsmanship 🪡 📏 Available Sizes: M38| L40 | XL42 | XXL44 | 3XL46 ✔️ 🌟 Highlights: ✔️ Heavy & premium fabric ✔️ Party & festive wear 🎉 📦 Ready to Dispatch 🚚✨",
    "shortDescription": "✨ Premium Embroidered Outfit Details ✨ 👗 Fabric: Heavy Tebby Organza 💎 Rich look with premium quality finish ✨ 🧵 Work: Beautiful Embroidery Work 🌸 Fine deta...",
    "price": 1999,
    "compareAtPrice": 3275,
    "discountPercentage": 39,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555050.jpg?v=1782203092",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555048.jpg?v=1782203092",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.22AM.jpg?v=1781868327",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555049.jpg?v=1782203092"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43523319169114",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1999,
        "compareAtPrice": 3275,
        "inStock": true,
        "sku": "EV-7969316208730-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555050.jpg?v=1782203092"
      },
      {
        "id": "var-43523319201882",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1999,
        "compareAtPrice": 3275,
        "inStock": true,
        "sku": "EV-7969316208730-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555050.jpg?v=1782203092"
      },
      {
        "id": "var-43523319234650",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1999,
        "compareAtPrice": 3275,
        "inStock": true,
        "sku": "EV-7969316208730-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555050.jpg?v=1782203092"
      },
      {
        "id": "var-43523319267418",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1999,
        "compareAtPrice": 3275,
        "inStock": true,
        "sku": "EV-7969316208730-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555050.jpg?v=1782203092"
      },
      {
        "id": "var-43523319300186",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1999,
        "compareAtPrice": 3275,
        "inStock": true,
        "sku": "EV-7969316208730-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6104674886438555050.jpg?v=1782203092"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Organza",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Organza",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:57:41+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969315815514",
    "title": "Luxury Ethnic Wear Light Pink Kurta Palazzo Set with Designer Dupatta",
    "slug": "luxury-ethnic-wear-light-pink-kurta-palazzo-set-with-designer-dupatta",
    "sku": "EV-7969315815514",
    "code": "EV-7969315815514",
    "description": "✨ Product Details ✨ 👗 Type: Heavy Gown 🧵 Fabric: Tebby Silk Digital Print 🎨 Design: Heavy Print 🧣 Dupatta: Included 🌟 Highlights: Luxurious tebbY silk for a smooth and rich feel 💎 Stunning digital print for a modern yet elegant look 🎨 Heavy gown perfect for parties & special occasions 🎉 📏 Available Sizes: ✔️ M (38) ✔️ L (40) ✔️ XL (42) ✔️ XXL (44) ✔️ 3XL (46) *Weight:-500* Comes with a matching dupatta for a complete ensemble 👑 💖 Perfect for: Weddings, Festivals, and Celebrations ✨",
    "shortDescription": "✨ Product Details ✨ 👗 Type: Heavy Gown 🧵 Fabric: Tebby Silk Digital Print 🎨 Design: Heavy Print 🧣 Dupatta: Included 🌟 Highlights: Luxurious tebbY silk for ...",
    "price": 2149,
    "compareAtPrice": 4850,
    "discountPercentage": 56,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_1.jpg?v=1781868054",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.48AM_1.jpg?v=1781868055",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_2.jpg?v=1781868055",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_3.jpg?v=1781868055",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM.jpg?v=1781868055",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.48AM_2.jpg?v=1781868055",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.48AM.jpg?v=1781868055",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.49AM.jpg?v=1781868055"
    ],
    "category": "kurta-sets",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43523315597402",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2149,
        "compareAtPrice": 4850,
        "inStock": true,
        "sku": "EV-7969315815514-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_1.jpg?v=1781868054"
      },
      {
        "id": "var-43523315630170",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2149,
        "compareAtPrice": 4850,
        "inStock": true,
        "sku": "EV-7969315815514-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_1.jpg?v=1781868054"
      },
      {
        "id": "var-43523315662938",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2149,
        "compareAtPrice": 4850,
        "inStock": true,
        "sku": "EV-7969315815514-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_1.jpg?v=1781868054"
      },
      {
        "id": "var-43523315695706",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2149,
        "compareAtPrice": 4850,
        "inStock": true,
        "sku": "EV-7969315815514-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_1.jpg?v=1781868054"
      },
      {
        "id": "var-43523315728474",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 2149,
        "compareAtPrice": 4850,
        "inStock": true,
        "sku": "EV-7969315815514-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.05.47AM_1.jpg?v=1781868054"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:53:37+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969315127386",
    "title": "Yellow Wedding Wear Kurta Palazzo Suit Set for Women with Embroidery Work",
    "slug": "yellow-wedding-wear-kurta-palazzo-suit-set-for-women-with-embroidery-work",
    "sku": "EV-7969315127386",
    "code": "EV-7969315127386",
    "description": "*💥New Luxurious 3 pis set 2026💥* *New lonching* Most welcome Resellers Yellow 🍋 🥰Now chasing your dreams in the cutest Dresses 👗 you own 😍😍 This time collection is of super classic Febric 👩❤️💋👩👩❤️💋👩 😍😍😍😍😍😍 *Febric details:-*modal shatin👩❤️💋👩* Pant fabric:- French crepe🤓 Dupatta fabric orgenza with work *Weight:-550* Size :- M. (38) L. (40) Xl. (42) Xxl. (44) 3xl (46) *top Length:- 48* *pent length:- 39* *🤷♀Grap if fast before it get sold🤷♀* Ready to ship 💃💃 Maltipal pics available",
    "shortDescription": "*💥New Luxurious 3 pis set 2026💥* *New lonching* Most welcome Resellers Yellow 🍋 🥰Now chasing your dreams in the cutest Dresses 👗 you own 😍😍 This time col...",
    "price": 2099,
    "compareAtPrice": 4999,
    "discountPercentage": 58,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981670.jpg?v=1782202859",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981671.jpg?v=1782202858",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.30.38AM.jpg?v=1781867837",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981672.jpg?v=1782202858",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981669.jpg?v=1782202859",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.30.37AM_3.jpg?v=1781867837"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43523314188378",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2099,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969315127386-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981670.jpg?v=1782202859"
      },
      {
        "id": "var-43523314221146",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2099,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969315127386-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981670.jpg?v=1782202859"
      },
      {
        "id": "var-43523314253914",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2099,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969315127386-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981670.jpg?v=1782202859"
      },
      {
        "id": "var-43523314286682",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2099,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969315127386-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981670.jpg?v=1782202859"
      },
      {
        "id": "var-43523314319450",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 2099,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969315127386-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981670.jpg?v=1782202859"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:48:42+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969313194074",
    "title": "Women's Traditional Embroidered Kurta Set with Palazzo and Dupatta",
    "slug": "womens-traditional-embroidered-kurta-set-with-palazzo-and-dupatta",
    "sku": "EV-7969313194074",
    "code": "EV-7969313194074",
    "description": "✨ *Elegant EmbroideredSet* ✨ *Step into elegance with our latest collection,. Crafted from premium modal sat in fabric, this kurti set offers a luxurious feel and graceful fall*. 🌸 *Highlights*: * *Fabric: modal satin* * *Work: Embroidered detailing on the neckline and borders* * *Bottom: Comes with a French crepe, classy look* * *Fit: Straight cut for timeless elegance* * *dupatta orgenza with work* Top length:- 31 Pant :- 39 *weight :- 480* *Perfect for festive wear, casual outings, or office ethnic days. Make heads turn with this effortlessly chic ensemble!* 📏 *Sizes Available* L (40) Xl (42) Xxl (44) 3xl (46) *100%PREMIUM QUALITY FABRIC FINISHING* 🌕💜🌕💜🌕💜🌕💜🌕💜",
    "shortDescription": "✨ *Elegant EmbroideredSet* ✨ *Step into elegance with our latest collection,. Crafted from premium modal sat in fabric, this kurti set offers a luxurious feel a...",
    "price": 1899,
    "compareAtPrice": 3599,
    "discountPercentage": 47,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981692.jpg?v=1782203044",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981691.jpg?v=1782203044",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.43AM.jpg?v=1781867596",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981693.jpg?v=1782203044"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43523309305946",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1899,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7969313194074-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981692.jpg?v=1782203044"
      },
      {
        "id": "var-43523309338714",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1899,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7969313194074-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981692.jpg?v=1782203044"
      },
      {
        "id": "var-43523309371482",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1899,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7969313194074-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981692.jpg?v=1782203044"
      },
      {
        "id": "var-43523309404250",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1899,
        "compareAtPrice": 3599,
        "inStock": true,
        "sku": "EV-7969313194074-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6330241380503981692.jpg?v=1782203044"
      }
    ],
    "sizes": [
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:44:24+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969310834778",
    "title": "Designer Party Wear Kurta Palazzo Set with Sequence Work Dupatta",
    "slug": "designer-party-wear-kurta-palazzo-set-with-sequence-work-dupatta",
    "sku": "EV-7969310834778",
    "code": "EV-7969310834778",
    "description": "💫 PREMIUM anarkali SALWAR SUIT digital print sets with dupatta👗 🧵 Top Fabric: modal sartin 🧵 Bottom Fabric: modal sartin 🧵 Dupatta Fabric: net 🎨 Dupatta Work: net with 4 side lace 📏 Sizes: M (38), L (40), XL (42), XXL (44), 3xl(46) 📐 Length: 47 Bottom length: 40 *weight:-650* 👔 Neck Type: V Neck 🌈 Available Colors: 2 🚚 Ready Stock | ✨ Premium Finishing",
    "shortDescription": "💫 PREMIUM anarkali SALWAR SUIT digital print sets with dupatta👗 🧵 Top Fabric: modal sartin 🧵 Bottom Fabric: modal sartin 🧵 Dupatta Fabric: net 🎨 Dupatta W...",
    "price": 1999,
    "compareAtPrice": 4599,
    "discountPercentage": 57,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.32.07AM.jpg?v=1781867120",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.32.11AM.jpg?v=1781867121",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038708.jpg?v=1782202956",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038710.jpg?v=1782202957",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038711.jpg?v=1782202957",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6113854816393038712.jpg?v=1782202957"
    ],
    "category": "anarkali-suits",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43523287613530",
        "title": "M / Red",
        "size": "M",
        "color": "Red",
        "price": 1999,
        "compareAtPrice": 4599,
        "inStock": true,
        "sku": "EV-7969310834778-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.32.07AM.jpg?v=1781867120"
      },
      {
        "id": "var-43523287679066",
        "title": "L / Red",
        "size": "L",
        "color": "Red",
        "price": 1999,
        "compareAtPrice": 4599,
        "inStock": true,
        "sku": "EV-7969310834778-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.32.07AM.jpg?v=1781867120"
      },
      {
        "id": "var-43523287744602",
        "title": "XL / Red",
        "size": "XL",
        "color": "Red",
        "price": 1999,
        "compareAtPrice": 4599,
        "inStock": true,
        "sku": "EV-7969310834778-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.32.07AM.jpg?v=1781867120"
      },
      {
        "id": "var-43523287810138",
        "title": "2XL / Red",
        "size": "2XL",
        "color": "Red",
        "price": 1999,
        "compareAtPrice": 4599,
        "inStock": true,
        "sku": "EV-7969310834778-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.32.07AM.jpg?v=1781867120"
      },
      {
        "id": "var-43523287875674",
        "title": "3XL / Red",
        "size": "3XL",
        "color": "Red",
        "price": 1999,
        "compareAtPrice": 4599,
        "inStock": true,
        "sku": "EV-7969310834778-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.32.07AM.jpg?v=1781867120"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Red"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Red",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:39:50+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969304150106",
    "title": "Premium Ethnic Suit Set for Women with Embroidered Palazzo & Dupatta",
    "slug": "premium-ethnic-suit-set-for-women-with-embroidered-palazzo-dupatta",
    "sku": "EV-7969304150106",
    "code": "EV-7969304150106",
    "description": "🌸 DESIGNER WEAR FESTIVAL SPECIAL COLLECTION 🌸 🔖 Code: R-014 🧮 2 COLOR AVAILABLE 📌 Fabric Details: 👗 Top Fabric: COSMOS embroidered with SEQUENCE WORK ✨ 🧵 Inner: - 📏 Top Length: 38Inches 📐 Sizes Available: M (38), L (40), XL (42), XXL (44) 👖 Palazzo Details: ✨ Fabric: COSMOS 📏 Length: 40 Inches 📐 Size: Free Size (Fully Stitched) 🧣 Dupatta Details: NAZMEEN WITH SEQUENCE BUTTY ✨ 💫 Beautiful Lace Work 📏 Length: 2.2 Mtr ⚖️ Weight: 650 GM ✅ Ready To Dispatch ✅ Premium Quality Product ✅ Perfect For Festival & Party Wear",
    "shortDescription": "🌸 DESIGNER WEAR FESTIVAL SPECIAL COLLECTION 🌸 🔖 Code: R-014 🧮 2 COLOR AVAILABLE 📌 Fabric Details: 👗 Top Fabric: COSMOS embroidered with SEQUENCE WORK ✨ 🧵...",
    "price": 3549,
    "compareAtPrice": 6599,
    "discountPercentage": 46,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.23AM.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.22AM_1.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.23AM_1.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.22AM_2.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.22AM.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.23AM_2.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.24AM.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.33AM_1.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.33AM_2.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.33AM.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.34AM_1.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.34AM_2.jpg?v=1781866676",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.34AM.jpg?v=1781866676"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43523259793498",
        "title": "Yellow / M",
        "size": "Yellow",
        "color": "M",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      },
      {
        "id": "var-43523259826266",
        "title": "Yellow / L",
        "size": "Yellow",
        "color": "L",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      },
      {
        "id": "var-43523259859034",
        "title": "Yellow / XL",
        "size": "Yellow",
        "color": "XL",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      },
      {
        "id": "var-43523259891802",
        "title": "Yellow / 2XL",
        "size": "Yellow",
        "color": "2XL",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      },
      {
        "id": "var-43523259924570",
        "title": "Brown / M",
        "size": "Brown",
        "color": "M",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      },
      {
        "id": "var-43523259957338",
        "title": "Brown / L",
        "size": "Brown",
        "color": "L",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      },
      {
        "id": "var-43523259990106",
        "title": "Brown / XL",
        "size": "Brown",
        "color": "XL",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      },
      {
        "id": "var-43523260022874",
        "title": "Brown / 2XL",
        "size": "Brown",
        "color": "2XL",
        "price": 3549,
        "compareAtPrice": 6599,
        "inStock": true,
        "sku": "EV-7969304150106-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.21.21AM.jpg?v=1781866676"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Yellow",
      "Brown"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Yellow",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:29:25+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969303625818",
    "title": "Women's Festive Wear Embroidered Kurta Sharara Set with Dupatta",
    "slug": "womens-festive-wear-embroidered-kurta-sharara-set-with-dupatta",
    "sku": "EV-7969303625818",
    "code": "EV-7969303625818",
    "description": "🌸 DESIGNER WEAR FESTIVAL SPECIAL COLLECTION 🌸 🔖 Code: R-015 🎨 Colours Available: 2 Colours ╔═══════❖═══════╗ 📌 PRODUCT DETAILS ╚═══════❖═══════╝ 👗 Top Fabric: Premium VICHITRA SILK with Heavy Embroidery & Sequence Work ✨ 🧵 Inner: — 📏 Top Length: 37 Inches 📐 Available Sizes: M (38), L (40), XL (42), XXL (44) ━━━━━━━━━━━━━━━ 👖 Palazzo Details: ✨ Fabric: VICHITRA SILK 📏 Length: 40 Inches 📐 Size: Free Size (Fully Stitched) ━━━━━━━━━━━━━━━ 🧣 Dupatta: EMBROIDERY WITH SEQUENCE WORK ✨ 📏 Length: 2.2 MTR ━━━━━━━━━━━━━━━ ⚖️ Weight: 700 GM ✅ Ready To Dispatch ✅ Premium Quality Assured ✅ Perfect For Festival, Party & Special Occasions ✨ 🌟 Exclusive Designer Collection 🌟 Limited Premium Stock",
    "shortDescription": "🌸 DESIGNER WEAR FESTIVAL SPECIAL COLLECTION 🌸 🔖 Code: R-015 🎨 Colours Available: 2 Colours ╔═══════❖═══════╗ 📌 PRODUCT DETAILS ╚═══════❖═══════╝ 👗 Top Fab...",
    "price": 3149,
    "compareAtPrice": 4250,
    "discountPercentage": 26,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.53AM_1.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.53AM_2.jpg?v=1781866461",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.53AM.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.54AM_1.jpg?v=1781866461",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.54AM_2.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.55AM_2.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.55AM_3.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.55AM.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.56AM_1.jpg?v=1781866462",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.56AM.jpg?v=1781866462"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43523241508954",
        "title": "M / Blue",
        "size": "M",
        "color": "Blue",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      },
      {
        "id": "var-43523241541722",
        "title": "M / Pink",
        "size": "M",
        "color": "Pink",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      },
      {
        "id": "var-43523241574490",
        "title": "L / Blue",
        "size": "L",
        "color": "Blue",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      },
      {
        "id": "var-43523241607258",
        "title": "L / Pink",
        "size": "L",
        "color": "Pink",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      },
      {
        "id": "var-43523241640026",
        "title": "XL / Blue",
        "size": "XL",
        "color": "Blue",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      },
      {
        "id": "var-43523241672794",
        "title": "XL / Pink",
        "size": "XL",
        "color": "Pink",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      },
      {
        "id": "var-43523241705562",
        "title": "2XL / Blue",
        "size": "2XL",
        "color": "Blue",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      },
      {
        "id": "var-43523241738330",
        "title": "2XL / Pink",
        "size": "2XL",
        "color": "Pink",
        "price": 3149,
        "compareAtPrice": 4250,
        "inStock": true,
        "sku": "EV-7969303625818-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM.jpg?v=1781866462"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Blue",
      "Pink"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Blue",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:25:31+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969303134298",
    "title": "Designer Kurta Palazzo Set for Women with Heavy Embroidery Dupatta",
    "slug": "designer-kurta-palazzo-set-for-women-with-heavy-embroidery-dupatta",
    "sku": "EV-7969303134298",
    "code": "EV-7969303134298",
    "description": "🌸 DESIGNER WEAR FESTIVAL SPECIAL COLLECTION 🌸 🔖 Code: R-013 🎨 Colors Available: 2 ━━━━━━━━━━━━━━━ 📌 Fabric Details: 👗 Top Fabric: Rangoli Crush With Embroidery Sequence Work 🧵 Inner: - 📏 Top Length: 33 Inches 📐 Sizes Available: M (38), L (40), XL (42), XXL (44) ━━━━━━━━━━━━━━━ 👖 Palazzo Details: ✨ Fabric: Rangoli Crush 📏 Length: 40 Inches 📐 Size: Free Size (Fully Stitched) ━━━━━━━━━━━━━━━ 🧣 Dupatta Details: Rangoli Crush Dupatta With Beautiful Sequence Embroidery Lace 📏 Length: 2.2 Meter ━━━━━━━━━━━━━━━ ⚖️ Weight: 750 GM ✅ Ready To Dispatch ✅ Premium Quality Product ✅ Perfect For Festive & Party Wear",
    "shortDescription": "🌸 DESIGNER WEAR FESTIVAL SPECIAL COLLECTION 🌸 🔖 Code: R-013 🎨 Colors Available: 2 ━━━━━━━━━━━━━━━ 📌 Fabric Details: 👗 Top Fabric: Rangoli Crush With Embro...",
    "price": 2850,
    "compareAtPrice": 8549,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.28AM_2.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.27AM.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.28AM_1.jpg?v=1781866175",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.27AM_1.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.28AM.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.32AM_1.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.33AM_2.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.33AM.jpg?v=1781866174",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.34AM.jpg?v=1781866174"
    ],
    "category": "kurta-sets",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43523222044762",
        "title": "M / Brown",
        "size": "M",
        "color": "Brown",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      },
      {
        "id": "var-43523222077530",
        "title": "M / Green",
        "size": "M",
        "color": "Green",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      },
      {
        "id": "var-43523222110298",
        "title": "L / Brown",
        "size": "L",
        "color": "Brown",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      },
      {
        "id": "var-43523222143066",
        "title": "L / Green",
        "size": "L",
        "color": "Green",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      },
      {
        "id": "var-43523222175834",
        "title": "XL / Brown",
        "size": "XL",
        "color": "Brown",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      },
      {
        "id": "var-43523222208602",
        "title": "XL / Green",
        "size": "XL",
        "color": "Green",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      },
      {
        "id": "var-43523222241370",
        "title": "2XL / Brown",
        "size": "2XL",
        "color": "Brown",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      },
      {
        "id": "var-43523222274138",
        "title": "2XL / Green",
        "size": "2XL",
        "color": "Green",
        "price": 2850,
        "compareAtPrice": 8549,
        "inStock": true,
        "sku": "EV-7969303134298-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.28.26AM.jpg?v=1781866174"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Brown",
      "Green"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Brown",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:20:41+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969267253338",
    "title": "Women's Purple Embroidered Kurta Palazzo Set with Dupatta | Party Wear Ethnic Suit",
    "slug": "womens-purple-embroidered-kurta-palazzo-set-with-dupatta-party-wear-ethnic-suit",
    "sku": "EV-7969267253338",
    "code": "EV-7969267253338",
    "description": "*✨ DESIGNER WEAR FESTIVAL SPECIAL COLLECTION ✨* 🔖 Code: R- 010 🧮 2 COLOR AVAILABLE ____________________ 📌 Fabric Details: 👗 *Top Fabric: PREMIUM RANGOLI CRUSH WITH EMBROIDERY SEQUENCE* 🧵 Inner: - 📏 Top Length: 35 inches 📐 Available Sizes: M (38), L (40), XL (42), XXL (44) ____________________ 👖 *Palazzo Details y:* *Fabric: RANGOLI CRUSH Size: Free Size (Fully Stitched) Length: 40 inches _______________________ 🧣 Dupatta: *RANGOLI CRUSH with beautiful EMBROIDERY SEQUENCE lACE( 2.2 mtr) ⚖️ Weight: 700gm ____________________ ✅ Ready to Dispatch ✅ Best Quality Product ✅ Perfect for Festive & Party Wear",
    "shortDescription": "*✨ DESIGNER WEAR FESTIVAL SPECIAL COLLECTION ✨* 🔖 Code: R- 010 🧮 2 COLOR AVAILABLE ____________________ 📌 Fabric Details: 👗 *Top Fabric: PREMIUM RANGOLI CRU...",
    "price": 3170,
    "compareAtPrice": 7999,
    "discountPercentage": 60,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.45AM_1.jpg?v=1781865713",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.46AM_1.jpg?v=1781865714",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.45AM_2.jpg?v=1781865713",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.46AM.jpg?v=1781865714",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.51AM_1.jpg?v=1781865713",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.51AM.jpg?v=1781865714",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.52AM_2.jpg?v=1781865713",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.52AM.jpg?v=1781865713"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43523153330266",
        "title": "M / Purple",
        "size": "M",
        "color": "Purple",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      },
      {
        "id": "var-43523153363034",
        "title": "M / Orange",
        "size": "M",
        "color": "Orange",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      },
      {
        "id": "var-43523153395802",
        "title": "L / Purple",
        "size": "L",
        "color": "Purple",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      },
      {
        "id": "var-43523153428570",
        "title": "L / Orange",
        "size": "L",
        "color": "Orange",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      },
      {
        "id": "var-43523153461338",
        "title": "XL / Purple",
        "size": "XL",
        "color": "Purple",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      },
      {
        "id": "var-43523153494106",
        "title": "XL / Orange",
        "size": "XL",
        "color": "Orange",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      },
      {
        "id": "var-43523153526874",
        "title": "2XL / Purple",
        "size": "2XL",
        "color": "Purple",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      },
      {
        "id": "var-43523153559642",
        "title": "2XL / Orange",
        "size": "2XL",
        "color": "Orange",
        "price": 3170,
        "compareAtPrice": 7999,
        "inStock": true,
        "sku": "EV-7969267253338-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.20.44AM_1.jpg?v=1781865713"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Purple",
      "Orange"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Purple",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Kurta Set",
      "Red Kurta Set with dupatta"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:15:24+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969264140378",
    "title": "Royale Festive Embroidered Roman Two Tone Suit Set",
    "slug": "evara-royale-festive-embroidered-roman-two-tone-suit-set-copy",
    "sku": "EV-7969264140378",
    "code": "EV-7969264140378",
    "description": "Product Description ✨ DESIGNER INDO-WESTERN SPECIAL COLLECTION ✨ 🔖 Code: D.NO.-110 🧮 Single Color Available 📌 Fabric Details: 👗 Top Fabric: Rangoli Crush With Embroidery Sequence Work 🧵 Inner: — creap 📏 Top Length: 40 Inches 📐 Sizes Available: M (38), L (40), XL (42), XXL (44) 👖 Palazzo Details: ✨ Fabric: Rangoli Crush 📏 Length: 40 Inches 📐 Size: Free Size (Fully Stitched) ⚖️ Weight: 600 GM ✅ Ready To Dispatch ✅ Premium Quality Product ✅ Perfect For Festive & Party Wear ✨",
    "shortDescription": "Product Description ✨ DESIGNER INDO-WESTERN SPECIAL COLLECTION ✨ 🔖 Code: D.NO.-110 🧮 Single Color Available 📌 Fabric Details: 👗 Top Fabric: Rangoli Crush Wi...",
    "price": 2700,
    "compareAtPrice": 6899,
    "discountPercentage": 61,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.45AM_1.jpg?v=1781865448",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.45AM.jpg?v=1781865448",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.45AM_2.jpg?v=1781865448",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.46AM_1.jpg?v=1781865448",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.46AM_2.jpg?v=1781865448",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.46AM.jpg?v=1781865448",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.47AM.jpg?v=1781865448"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43523132883034",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2700,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969264140378-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.45AM_1.jpg?v=1781865448"
      },
      {
        "id": "var-43523132948570",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2700,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969264140378-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.45AM_1.jpg?v=1781865448"
      },
      {
        "id": "var-43523133014106",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2700,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969264140378-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.45AM_1.jpg?v=1781865448"
      },
      {
        "id": "var-43523133079642",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2700,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969264140378-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.24.45AM_1.jpg?v=1781865448"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:06:25+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969264042074",
    "title": "Premium Embroidered Kurta Palazzo Set with Net Dupatta for Women | Festive & Party Wear Ethnic Suit Set | Beige",
    "slug": "premium-embroidered-kurta-palazzo-set-with-net-dupatta-for-women-festive-party-wear-ethnic-suit-set-beige",
    "sku": "EV-7969264042074",
    "code": "EV-7969264042074",
    "description": "🔖 Code: D.no:- 010 🎨 Colour: Single Colour 📌 Fabric Details: 👗 Top: Cosmos with Sequence Work 🧵 Inner: — 📏 Length: 36 inches 📐 Sizes: M (38), L (40), XL (42), XXL (44) 👖 Palazzo: ✨ Fabric: Cosmos 📏 Length: 40 inches 📐 Size: Free Size (Fully Stitched) 🧣 Dupatta: Organza with Beautiful Lace Work (2.2 mtr) ⚖️ Weight: 680 gm ⸻ ✨ Style Highlights: ✔️ Premium Fusion Silhouette ✔️ Lightweight Yet Rich Look ✔️ Perfect for Festive, Occasion & Party Wear ⸻ 🚀 Why Customers Love This Piece: 💎 Elegant Finish with Luxury Feel 💎 Trendy Yet Timeless Design 💎 Ready-to-Wear Convenience 🔥 High Demand Design",
    "shortDescription": "🔖 Code: D.no:- 010 🎨 Colour: Single Colour 📌 Fabric Details: 👗 Top: Cosmos with Sequence Work 🧵 Inner: — 📏 Length: 36 inches 📐 Sizes: M (38), L (40), XL ...",
    "price": 3199,
    "compareAtPrice": 8999,
    "discountPercentage": 64,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM_1.jpg?v=1781865285",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM_2.jpg?v=1781865285",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM_3.jpg?v=1781865284",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM.jpg?v=1781865285",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.57AM.jpg?v=1781865285",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.58AM_1.jpg?v=1781865285",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.58AM.jpg?v=1781865284"
    ],
    "category": "anarkali-suits",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43523129802842",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 3199,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7969264042074-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM_1.jpg?v=1781865285"
      },
      {
        "id": "var-43523129835610",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 3199,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7969264042074-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM_1.jpg?v=1781865285"
      },
      {
        "id": "var-43523129868378",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 3199,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7969264042074-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM_1.jpg?v=1781865285"
      },
      {
        "id": "var-43523129901146",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 3199,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7969264042074-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.38.31AM_1.jpg?v=1781865285"
      }
    ],
    "sizes": [
      "M",
      "XL",
      "L",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Organza",
    "craft": "Sequins & Codding Work",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Organza",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:05:27+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969263878234",
    "title": "Evara Elite Designer Rangoli Crush Embroidered Kurta Palazzo Set with Heavy Embroidered Dupatta for Women (Wine & Purple)",
    "slug": "evara-elite-designer-rangoli-crush-embroidered-kurta-palazzo-set-with-heavy-embroidered-dupatta-for-women-wine-purple",
    "sku": "EV-7969263878234",
    "code": "EV-7969263878234",
    "description": "Product Description Step into elegance with this stunning designer kurta palazzo set from Crafted from premium Rangoli Crush fabric, this luxurious ethnic ensemble features exquisite embroidery and sequence work that enhances its festive appeal. The stylish fusion silhouette combines traditional craftsmanship with modern elegance, making it an ideal choice for weddings, festive celebrations, parties, and special occasions. The beautifully embroidered sleeveless kurta is paired with a comfortable palazzo and a heavily embellished dupatta finished with an elegant lace border, creating a graceful and sophisticated look. Lightweight yet rich in appearance, this ready-to-wear outfit ensures comfort without compromising on style. Available in two timeless shades – Wine and Purple . Key Features ✔ Premium Rangoli Crush Fabric ✔ Rich Embroidery & Sequence Work ✔ Comfortable Soft Crepe Inner ✔ Stylish Sleeveless Designer Kurta ✔ Fully Stitched Palazzo for Easy Wear ✔ Heavy Embroidered Dupatta with Lace Border ✔ Perfect for Festive, Wedding & Party Wear ✔ Lightweight & Comfortable Design Product Specifications Kurta Fabric: Premium Rangoli Crush Work: Embroidery & Sequence Work Inner Fabric: Soft Crepe Length: 36 Inches Neck Type: Round Neck Sleeve Type: Sleeveless Fit: Regular Fit Palazzo Fabric: Rangoli Crush Length: 40 Inches Style: Fully Stitched Fit: Comfortable Free Fit Dupatta Fabric: Rangoli Crush Work: Heavy Embroidery Sequence Work Border: Elegant Lace Border Length: 2.2 Meters Available Sizes M (38) L (40) XL (42) XXL (44) Colors Available Royal Purple Wine Red Package Contents 1 Kurta 1 Palazzo 1 Dupatta Weight Approx. 640 gm",
    "shortDescription": "Product Description Step into elegance with this stunning designer kurta palazzo set from Crafted from premium Rangoli Crush fabric, this luxurious ethnic ensem...",
    "price": 2999,
    "compareAtPrice": 7800,
    "discountPercentage": 62,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.54AM_1.jpg?v=1781864981",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.54AM_2.jpg?v=1781864981",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.54AM.jpg?v=1781864982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_2.jpg?v=1781864981",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_3.jpg?v=1781864982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM.jpg?v=1781864982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.56AM_1.jpg?v=1781864982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.56AM.jpg?v=1781864984",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.57AM_1.jpg?v=1781864982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.57AM_2.jpg?v=1781864982",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.57AM.jpg?v=1781864982"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43523128885338",
        "title": "XL / Purple",
        "size": "XL",
        "color": "Purple",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      },
      {
        "id": "var-43523129573466",
        "title": "XL / Red",
        "size": "XL",
        "color": "Red",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      },
      {
        "id": "var-43523128918106",
        "title": "M / Purple",
        "size": "M",
        "color": "Purple",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      },
      {
        "id": "var-43523129606234",
        "title": "M / Red",
        "size": "M",
        "color": "Red",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      },
      {
        "id": "var-43523128950874",
        "title": "L / Purple",
        "size": "L",
        "color": "Purple",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      },
      {
        "id": "var-43523129639002",
        "title": "L / Red",
        "size": "L",
        "color": "Red",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      },
      {
        "id": "var-43523128983642",
        "title": "2XL / Purple",
        "size": "2XL",
        "color": "Purple",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      },
      {
        "id": "var-43523129671770",
        "title": "2XL / Red",
        "size": "2XL",
        "color": "Red",
        "price": 2999,
        "compareAtPrice": 7800,
        "inStock": true,
        "sku": "EV-7969263878234-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.30.55AM_1.jpg?v=1781864981"
      }
    ],
    "sizes": [
      "XL",
      "M",
      "L",
      "2XL"
    ],
    "colors": [
      "Purple",
      "Red"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Purple",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T16:01:31+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969262338138",
    "title": "Evara Royale Festive Embroidered Roman Two Tone Suit Set",
    "slug": "evara-royale-festive-embroidered-roman-two-tone-suit-set",
    "sku": "EV-7969262338138",
    "code": "EV-7969262338138",
    "description": "Product Description Celebrate every special occasion with the Evara Royale Festive Collection . This elegant designer suit set features premium Roman Two Tone fabric enhanced with beautiful sequence embroidery work, giving you a rich and graceful festive look. Designed for modern women who love effortless elegance, this outfit combines comfort, luxury detailing, and a timeless ethnic style. Perfect for festivals, family gatherings, parties, and special celebrations. Fabric & Work Details 👗 Kurta / Top Fabric: Premium Roman Two Tone Work: Designer Sequence Embroidery Work ✨ Length: 37 Inches Sizes Available: M (38) L (40) XL (42) XXL (44) 👖 Palazzo Fabric: Roman Two Tone Length: 40 Inches Type: Fully Stitched Palazzo Size: Free Size 🧣 Dupatta Fabric: Nazmeen Work: Sequence Butti Work with Beautiful Lace Border ✨ Length: 2.2 Meter Product Highlights ✨ Premium Festive Designer Look ✨ Rich Sequence Detailing ✨ Soft & Comfortable Fabric ✨ Ready To Wear Set ✨ Elegant Party & Occasion Wear Perfect For 🌸 Festival Celebrations 💍 Wedding Functions 🎉 Party Wear ✨ Family Events 🌙 Evening Gatherings Why Choose Evara? 💎 Premium Quality Finish 💎 Trendy Yet Traditional Design 💎 Comfortable Fit & Royal Appearance 💎 Designed For The Modern Woman",
    "shortDescription": "Product Description Celebrate every special occasion with the Evara Royale Festive Collection . This elegant designer suit set features premium Roman Two Tone f...",
    "price": 2599,
    "compareAtPrice": 6899,
    "discountPercentage": 62,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.03AM_1.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.03AM_2.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.03AM_3.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.03AM.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.08AM.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.09AM_1.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.09AM_2.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.09AM_3.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.09AM.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.10AM_1.jpg?v=1781864635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.10AM.jpg?v=1781864635"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43523129311322",
        "title": "M / Orange",
        "size": "M",
        "color": "Orange",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      },
      {
        "id": "var-43523129344090",
        "title": "M / Red",
        "size": "M",
        "color": "Red",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      },
      {
        "id": "var-43523129376858",
        "title": "L / Orange",
        "size": "L",
        "color": "Orange",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      },
      {
        "id": "var-43523129409626",
        "title": "L / Red",
        "size": "L",
        "color": "Red",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      },
      {
        "id": "var-43523129442394",
        "title": "XL / Orange",
        "size": "XL",
        "color": "Orange",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      },
      {
        "id": "var-43523129475162",
        "title": "XL / Red",
        "size": "XL",
        "color": "Red",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      },
      {
        "id": "var-43523129507930",
        "title": "2XL / Orange",
        "size": "2XL",
        "color": "Orange",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      },
      {
        "id": "var-43523129540698",
        "title": "2XL / Red",
        "size": "2XL",
        "color": "Red",
        "price": 2599,
        "compareAtPrice": 6899,
        "inStock": true,
        "sku": "EV-7969262338138-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.32.02AM.jpg?v=1781864635"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Orange",
      "Red"
    ],
    "fabric": "Premium Handcrafted Fabric",
    "craft": "Sequins & Codding Work",
    "color": "Orange",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Handcrafted Fabric",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T15:55:11+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7969255293018",
    "title": "Evara Signature Royale Embroidered Roman Silk Palazzo Set",
    "slug": "women-embroidered-kurti-plazzo-set-with-dupatta-copy",
    "sku": "EV-7969255293018",
    "code": "EV-7969255293018",
    "description": "Product Description Step into elegance with the Evara Signature Royale Collection . This designer fusion palazzo set is crafted for women who love a luxurious yet comfortable festive look. Featuring rich Roman Silk fabric with intricate embroidery, sequence detailing, and an elegant Nazmeen dupatta, this outfit brings a perfect blend of traditional charm and modern sophistication. Perfect for festive celebrations, wedding functions, parties, and special occasions. Fabric & Work Details 👗 Kurta / Top Fabric: Premium Roman Silk Work: Designer Embroidery with Sequence Detailing Length: 36 Inches Sizes Available: M (38) L (40) XL (42) XXL (44) 👖 Palazzo Fabric: Roman Silk Length: 40 Inches Type: Fully Stitched Palazzo Size: Free Size 🧣 Dupatta Fabric: Nazmeen Work: Sequence Butti Work with Premium Lace Border Length: 2.2 Meter Product Highlights ✨ Premium Designer Fusion Look ✨ Rich Embroidery & Sequence Work ✨ Lightweight Yet Royal Appearance ✨ Ready To Wear Outfit ✨ Elegant Party & Festive Wear Perfect For 💍 Wedding Functions 🌙 Festive Celebrations 🎉 Party Wear ✨ Premium Ethnic Events Why Choose Evara? 💎 Luxury Finish & Premium Fabric Feel 💎 Trendy Designer Silhouette 💎 Comfortable Fit with Royal Appearance 💎 A Statement Piece for Your Wardrobe",
    "shortDescription": "Product Description Step into elegance with the Evara Signature Royale Collection . This designer fusion palazzo set is crafted for women who love a luxurious y...",
    "price": 3299,
    "compareAtPrice": 4999,
    "discountPercentage": 34,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.40AM_1.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.40AM.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.40AM_2.jpg?v=1781864114",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.41AM.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.40AM_3.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.41AM_1.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.42AM.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.43AM_1.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.43AM.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.44AM_1.jpg?v=1781864115",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.44AM.jpg?v=1781864115"
    ],
    "category": "kurta-sets",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43523120103514",
        "title": "M / Blue",
        "size": "M",
        "color": "Blue",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      },
      {
        "id": "var-43523120136282",
        "title": "M / Purple",
        "size": "M",
        "color": "Purple",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      },
      {
        "id": "var-43523120169050",
        "title": "L / Blue",
        "size": "L",
        "color": "Blue",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      },
      {
        "id": "var-43523120201818",
        "title": "L / Purple",
        "size": "L",
        "color": "Purple",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      },
      {
        "id": "var-43523120234586",
        "title": "XL / Blue",
        "size": "XL",
        "color": "Blue",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      },
      {
        "id": "var-43523120267354",
        "title": "XL / Purple",
        "size": "XL",
        "color": "Purple",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      },
      {
        "id": "var-43523120300122",
        "title": "2XL / Blue",
        "size": "2XL",
        "color": "Blue",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      },
      {
        "id": "var-43523120332890",
        "title": "2XL / Purple",
        "size": "2XL",
        "color": "Purple",
        "price": 3299,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7969255293018-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.39AM_1.jpg?v=1781864115"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Blue",
      "Purple"
    ],
    "fabric": "Roman Silk",
    "craft": "Sequins & Codding Work",
    "color": "Blue",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "blue",
      "Dhoti Salwar",
      "Kurta Set",
      "Printed Saree"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Roman Silk",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-19T15:41:25+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934763466842",
    "title": "Black Printed Rayon Co-Ord Set",
    "slug": "black-printed-rayon-co-ord-set",
    "sku": "CHITTA S",
    "code": "EV-7934763466842",
    "description": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flattering fit for every body type. Perfect for casual outings, office wear, or daily use. Fabric: Rayon Sizes Available: S to 3XL Fit: Comfortable & breathable Occasion: Casual | Daily Wear | Office",
    "shortDescription": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flatter...",
    "price": 1549,
    "compareAtPrice": 5400,
    "discountPercentage": 71,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881834.jpg?v=1780402152",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881833.jpg?v=1780402152",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881835.jpg?v=1780402152",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881838.jpg?v=1780402152",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881839.jpg?v=1780402152",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881840.jpg?v=1780402152",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881836.jpg?v=1780402152",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881837.jpg?v=1780402152"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance"
    ],
    "variants": [
      {
        "id": "var-43443313311834",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "CHITTA S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881834.jpg?v=1780402152"
      },
      {
        "id": "var-43443313344602",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "CHITTA M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881834.jpg?v=1780402152"
      },
      {
        "id": "var-43443313377370",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "CHITTA L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881834.jpg?v=1780402152"
      },
      {
        "id": "var-43443313410138",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "CHITTA XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881834.jpg?v=1780402152"
      },
      {
        "id": "var-43443313442906",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "CHITTA 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881834.jpg?v=1780402152"
      },
      {
        "id": "var-43443313475674",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "CHITTA 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881834.jpg?v=1780402152"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "black",
      "Co-Ord Set",
      "Reyon Co Ord Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-02T17:38:35+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934762188890",
    "title": "Premium Black Printed Rayon Co-Ord Set",
    "slug": "premium-black-printed-rayon-co-ord-set",
    "sku": "BAGIRA S",
    "code": "EV-7934762188890",
    "description": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flattering fit for every body type. Perfect for casual outings, office wear, or daily use. Fabric: Rayon Sizes Available: S to 3XL Fit: Comfortable & breathable Occasion: Casual | Daily Wear | Office",
    "shortDescription": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flatter...",
    "price": 1549,
    "compareAtPrice": 5400,
    "discountPercentage": 71,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881809.jpg?v=1780402002",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881808.jpg?v=1780402002",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881805.jpg?v=1780402002",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881807.jpg?v=1780402002",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881810.jpg?v=1780402002",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881806.jpg?v=1780402002"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance"
    ],
    "variants": [
      {
        "id": "var-43443285065818",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "BAGIRA S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881809.jpg?v=1780402002"
      },
      {
        "id": "var-43443285098586",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "BAGIRA M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881809.jpg?v=1780402002"
      },
      {
        "id": "var-43443285131354",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "BAGIRA L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881809.jpg?v=1780402002"
      },
      {
        "id": "var-43443285164122",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "BAGIRA XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881809.jpg?v=1780402002"
      },
      {
        "id": "var-43443285196890",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "BAGIRA 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881809.jpg?v=1780402002"
      },
      {
        "id": "var-43443285229658",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1549,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "BAGIRA 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6100155567230881809.jpg?v=1780402002"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "Reyon Co Ord Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-02T17:36:08+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934761435226",
    "title": "Designer Lycra Co Ord Set",
    "slug": "designer-lycra-co-ord-set",
    "sku": "RAINBOV S",
    "code": "EV-7934761435226",
    "description": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flattering fit for every body type. Perfect for casual outings, office wear, or daily use. Fabric: Rayon Sizes Available: S to 3XL Fit: Comfortable & breathable Occasion: Casual | Daily Wear | Office",
    "shortDescription": "Upgrade your wardrobe with this stylish and comfortable dress made from premium rayon fabric . Designed for all-day comfort, it offers a soft feel and a flatter...",
    "price": 1799,
    "compareAtPrice": 5400,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_3bfc6cf8-fa1c-4373-9df7-9c138e25b7e4.webp?v=1780401878",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_14af8edb-3f93-44a5-9a7b-01d26ba606bc.webp?v=1780401878",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/4_59f00c65-c2e3-4f16-beff-499c99421a13.webp?v=1780401879",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5_049c9794-10df-4c10-ac6b-da0cb3a82f5f.webp?v=1780401878",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/3_d14c5f7d-f0bb-402b-a710-5d560979d1eb.webp?v=1780401878"
    ],
    "category": "coord-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43443271565402",
        "title": "S",
        "size": "S",
        "color": "S",
        "price": 1799,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "RAINBOV S",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_3bfc6cf8-fa1c-4373-9df7-9c138e25b7e4.webp?v=1780401878"
      },
      {
        "id": "var-43443271598170",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1799,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "RAINBOV M",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_3bfc6cf8-fa1c-4373-9df7-9c138e25b7e4.webp?v=1780401878"
      },
      {
        "id": "var-43443271630938",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1799,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "RAINBOV L",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_3bfc6cf8-fa1c-4373-9df7-9c138e25b7e4.webp?v=1780401878"
      },
      {
        "id": "var-43443271663706",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1799,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "RAINBOV XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_3bfc6cf8-fa1c-4373-9df7-9c138e25b7e4.webp?v=1780401878"
      },
      {
        "id": "var-43443271696474",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1799,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "RAINBOV 2XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_3bfc6cf8-fa1c-4373-9df7-9c138e25b7e4.webp?v=1780401878"
      },
      {
        "id": "var-43443271729242",
        "title": "3XL",
        "size": "3XL",
        "color": "3XL",
        "price": 1799,
        "compareAtPrice": 5400,
        "inStock": true,
        "sku": "RAINBOV 3XL",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2_3bfc6cf8-fa1c-4373-9df7-9c138e25b7e4.webp?v=1780401878"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Premium Soft Rayon",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "black",
      "Co-Ord Set",
      "Reyon Co Ord Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Premium Soft Rayon",
      "craft": "Zari & Thread Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-06-02T17:33:12+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934485594202",
    "title": "Golden Tissue Silk Embroidered Saree with Rich Zari Motifs & Designer Border | Heavy Embroidered Blouse with Tassels | Wedding & Festive Wear Saree",
    "slug": "golden-tissue-silk-embroidered-saree-with-rich-zari-motifs-designer-border-heavy-embroidered-blouse-with-tassels-wedding-festive-wear-saree",
    "sku": "AT 001 Antique Gold",
    "code": "EV-7934485594202",
    "description": "Step into timeless elegance with this luxurious golden embroidered saree , crafted to reflect royal charm and festive grandeur. Designed in a rich golden hue , this saree exudes sophistication with its subtle sheen and intricate detailing, making it a perfect statement piece for special occasions. The saree features delicate zari-woven motifs spread gracefully across the body , complemented by a heavily embroidered designer border adorned with fine craftsmanship. The pallu showcases intricate embroidery work , adding depth and richness to the overall look. Finished with elegant tassels on the edges , this saree brings a graceful flow to every drape. Paired with a heavy embroidered blouse piece , this ensemble is designed to give you a complete festive-ready look with minimal effort. Key Details: Saree Color: Rich Golden Blouse Color: Matching Golden (Heavy Embroidered) Fabric: Premium Tissue Silk Blend Work: Zari Weaving with Heavy Embroidery Border & Pallu Saree Length: 5.5 meters Blouse Length: 0.8 meter (Unstitched) Finish: Tassels on Edges Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, traditional functions, and special occasions where you want to stand out with a regal and elegant look. Style Tips: Pair with kundan or polki jewellery for a royal wedding look Opt for a sleek bun or soft curls to enhance the neckline Complete the outfit with golden heels or embellished juttis Add a statement clutch for a polished festive finish",
    "shortDescription": "Step into timeless elegance with this luxurious golden embroidered saree , crafted to reflect royal charm and festive grandeur. Designed in a rich golden hue , ...",
    "price": 7249,
    "compareAtPrice": 12999,
    "discountPercentage": 44,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_12.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_17.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_20.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_16.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_18.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_13.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_19.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_14.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_21.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_15.jpg?v=1780393829",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_22.jpg?v=1780393829"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441971495002",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 7249,
        "compareAtPrice": 12999,
        "inStock": true,
        "sku": "AT 001 Antique Gold",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/01_12.jpg?v=1780393829"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Silver Tissue Silk",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT001",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Silver Tissue Silk",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:20:24+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481727578",
    "title": "Mustard Yellow Fendy Satin Embroidered Saree with Paisley Motifs & Zari Border | Festive Designer Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "mustard-yellow-fendy-satin-embroidered-saree-with-paisley-motifs-zari-border-festive-designer-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 021 Yellow",
    "code": "EV-7934481727578",
    "description": "Radiate elegance and festive charm with this stunning mustard yellow saree , beautifully crafted in premium Fendy satin fabric known for its smooth texture, graceful fall, and subtle sheen. The saree is adorned with intricate all-over embroidery featuring traditional paisley (kairi) motifs , symbolizing timeless heritage artistry. The fabric is further enhanced with fine dotted embellishments , adding a delicate shimmer that elevates its luxurious appeal. A rich zari embroidered border frames the saree, showcasing detailed craftsmanship and adding a regal finish. The pallu is heavily embroidered , making it a perfect statement piece for grand occasions. To complete its premium look, the saree is finished with elegant tassels on the edges , adding movement and sophistication to every drape. It comes with a heavy embroidered blouse piece , designed to perfectly complement the saree and enhance the overall ensemble. The Fendy satin fabric ensures effortless draping , offering both comfort and a rich, flowy silhouette. Key Details: Saree Color: Mustard Yellow Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Embroidered Paisley Motifs with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Heavy Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, haldi functions, festive celebrations, traditional ceremonies, and special occasions , where you want a bright yet elegant ethnic look. Style Tips: Pair with gold jewellery, kundan sets, or antique accessories for a royal touch Opt for warm-toned makeup with golden highlighter and bold eyes Style your hair in soft curls, a braided bun, or a classic bun adorned with flowers Complete the look with heels and a festive clutch or potli bag This saree blends traditional embroidery with modern satin elegance , making it an ideal choice for your premium festive and wedding wear collection .",
    "shortDescription": "Radiate elegance and festive charm with this stunning mustard yellow saree , beautifully crafted in premium Fendy satin fabric known for its smooth texture, gra...",
    "price": 8049,
    "compareAtPrice": 24147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0296.jpg?v=1780393655",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0315.jpg?v=1780393654",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0292.jpg?v=1780393654",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0307.jpg?v=1780393655",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0298.jpg?v=1780393655",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0305.jpg?v=1780393654",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0300.jpg?v=1780393654",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0317.jpg?v=1780393654",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0290.jpg?v=1780393654"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965629530",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8049,
        "compareAtPrice": 24147,
        "inStock": true,
        "sku": "AT 021 Yellow",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0296.jpg?v=1780393655"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT021",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:31+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481694810",
    "title": "Olive Green Fendy Satin Designer Embroidered Saree with Floral & Paisley Motifs | Premium Festive Saree with Zari Border, Tassels & Heavy Embroidered Blouse",
    "slug": "olive-green-fendy-satin-designer-embroidered-saree-with-floral-paisley-motifs-premium-festive-saree-with-zari-border-tassels-heavy-embroidered-blouse",
    "sku": "AT 022 Mehandi Green",
    "code": "EV-7934481694810",
    "description": "Step into refined elegance with this rich olive green designer saree , crafted from luxurious Fendy satin fabric that offers a smooth texture, graceful fall, and a subtle glossy finish. This saree is beautifully adorned with intricate embroidery featuring a blend of floral and paisley (kairi) motifs , creating a perfect harmony of traditional artistry and modern design. The body is enhanced with fine dotted embellishments , adding a soft shimmer that elevates its festive charm. The saree is framed with a detailed zari embroidered border , showcasing intricate craftsmanship and giving it a grand, regal appeal. The pallu is heavily embroidered with statement motifs , making it ideal for standout festive and wedding looks. Finished with elegant tassels on the edges , this saree adds movement and a touch of sophistication to every step. It comes with a heavy embroidered blouse piece , designed to complement the saree’s richness and complete the ensemble with a premium finish. The Fendy satin fabric ensures effortless draping , making it comfortable to wear while maintaining a luxurious silhouette. Key Details: Saree Color: Olive Green Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Floral & Paisley Embroidery with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Heavy Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive occasions, sangeet functions, and traditional celebrations , where you want a sophisticated and rich ethnic look. Style Tips: Pair with emerald or kundan jewellery to enhance the green tones Go for dewy makeup with highlighted skin and bold eyes Style your hair in soft waves, a side-swept look, or a low bun Complete the look with heels and a statement clutch or potli bag This saree beautifully blends classic embroidery with luxurious satin texture , making it a must-have addition to your premium festive and occasion wear collection .",
    "shortDescription": "Step into refined elegance with this rich olive green designer saree , crafted from luxurious Fendy satin fabric that offers a smooth texture, graceful fall, an...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0332.jpg?v=1780393653",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0345.jpg?v=1780393653",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0349.jpg?v=1780393653",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0341.jpg?v=1780393653",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0330.jpg?v=1780393653",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0338.jpg?v=1780393653",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0337.jpg?v=1780393654",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0323.jpg?v=1780393653",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0352.jpg?v=1780393653"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441965596762",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 022 Mehandi Green",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0332.jpg?v=1780393653"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT022",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:30+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481662042",
    "title": "Teal Green Fendy Satin Designer Embroidered Saree with Paisley Motifs & Zari Border | Premium Festive Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "teal-green-fendy-satin-designer-embroidered-saree-with-paisley-motifs-zari-border-premium-festive-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 022 Rama",
    "code": "EV-7934481662042",
    "description": "Experience timeless sophistication with this elegant teal green saree , crafted in luxurious Fendy satin fabric that offers a smooth texture, fluid drape, and a subtle glossy finish. This saree features intricate all-over embroidery with traditional paisley (kairi) motifs , beautifully placed across the body to create a rich and artistic appeal. The saree is enhanced with fine dotted embellishments , adding a delicate shimmer that elevates its festive charm. The highlight of the saree is its ornate zari embroidered border , designed with intricate detailing that enhances the overall grandeur. The pallu is richly embroidered with statement motifs , making it perfect for occasions where you want to stand out with elegance. Finished with stylish tassels on the edges , this saree adds a touch of grace and movement to your look. It comes paired with a heavy embroidered blouse piece , perfectly complementing the saree and completing the luxurious ensemble. The Fendy satin fabric ensures effortless draping , making it comfortable while maintaining a premium, flowy silhouette. Key Details: Saree Color: Teal Green Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Embroidered Paisley Motifs with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Heavy Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, sangeet nights, and traditional occasions , where you want a rich and graceful ethnic look. Style Tips: Pair with emerald, kundan, or antique gold jewellery to enhance the rich tone Opt for glowing makeup with bold eyes and nude lips Style your hair in soft curls, a side-parted look, or a classic bun Complete the look with heels and a statement clutch or potli bag This saree beautifully combines heritage embroidery with modern satin elegance , making it a must-have addition to your premium festive and occasion wear wardrobe .",
    "shortDescription": "Experience timeless sophistication with this elegant teal green saree , crafted in luxurious Fendy satin fabric that offers a smooth texture, fluid drape, and a...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0365.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0364.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0382.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0381.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0370.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0361.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0372.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0354.jpg?v=1780393652",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0384.jpg?v=1780393652"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965563994",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 022 Rama",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0365.jpg?v=1780393652"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT022",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:28+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481629274",
    "title": "Dual Tone Mustard Yellow & Rust Fendy Satin Embroidered Saree with Paisley Motifs & Zari Border | Designer Festive Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "dual-tone-mustard-yellow-rust-fendy-satin-embroidered-saree-with-paisley-motifs-zari-border-designer-festive-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 022 Yellow",
    "code": "EV-7934481629274",
    "description": "Add a touch of regal elegance to your wardrobe with this stunning dual-tone saree in mustard yellow and rust hues , crafted from luxurious Fendy satin fabric that offers a soft texture, fluid drape, and a subtle rich sheen. This saree features intricate all-over embroidery with traditional paisley (kairi) motifs , beautifully spread across the body to create a rich and artistic appeal. The saree is further enhanced with fine dotted embellishments , giving it a delicate shimmer perfect for festive wear. The highlight of this saree is its ornate zari embroidered border , designed with detailed craftsmanship that enhances its grandeur. The pallu is heavily embroidered with statement motifs , making it a perfect choice for occasions where you want to stand out. The saree is finished with elegant tassels on the edges , adding a graceful and stylish touch to every drape. It comes paired with a heavy embroidered blouse piece , perfectly complementing the saree and completing the luxurious look. The Fendy satin fabric ensures effortless draping , providing both comfort and a premium fall that enhances your silhouette. Key Details: Saree Color: Dual Tone Mustard Yellow & Rust Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Embroidered Paisley Motifs with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Heavy Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, haldi ceremonies, receptions, and traditional gatherings , where you want a vibrant yet elegant ethnic look. Style Tips: Pair with kundan, antique gold, or temple jewellery for a rich festive vibe Go for warm-toned makeup with golden highlights and bold eyes Style your hair in soft curls, a side-parted look, or a bun with gajra Complete the look with heels and a designer clutch or potli bag This saree is a perfect blend of traditional embroidery and modern satin elegance , making it a must-have for your premium festive and occasion wear collection .",
    "shortDescription": "Add a touch of regal elegance to your wardrobe with this stunning dual-tone saree in mustard yellow and rust hues , crafted from luxurious Fendy satin fabric th...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0397.jpg?v=1780393651",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0416.jpg?v=1780393650",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0394.jpg?v=1780393650",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0409.jpg?v=1780393650",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0400.jpg?v=1780393650",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0407.jpg?v=1780393650",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0404.jpg?v=1780393650",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0386.jpg?v=1780393650",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0391.jpg?v=1780393650"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965498458",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 022 Yellow",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0397.jpg?v=1780393651"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT022",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:27+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481563738",
    "title": "Dual Tone Wine Pink Fendy Satin Embroidered Saree with Paisley Motifs & Rich Zari Border | Designer Festive Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "dual-tone-wine-pink-fendy-satin-embroidered-saree-with-paisley-motifs-rich-zari-border-designer-festive-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 022 Peach",
    "code": "EV-7934481563738",
    "description": "Elevate your festive wardrobe with this luxurious dual-tone saree in rich wine and blush pink hues , beautifully crafted from premium Fendy satin fabric that offers a smooth finish, graceful drape, and subtle sheen. This elegant saree showcases intricate embroidery with traditional paisley (kairi) motifs , thoughtfully placed across the body to create a timeless and sophisticated look. The saree is further enhanced with fine dotted embellishments , adding a delicate shimmer that catches the light beautifully. The highlight of this piece is its heavily detailed zari embroidered border , featuring ornate craftsmanship that adds richness and depth. The pallu is adorned with statement embroidery , making it perfect for grand occasions and celebrations. Finished with stylish tassels on the edges , this saree offers a refined and graceful appeal with every movement. It comes paired with a heavy embroidered blouse piece , designed to complement the saree and complete the luxurious ensemble. The Fendy satin fabric ensures a fluid fall and comfortable wear , making it ideal for long festive hours while maintaining a premium look. Key Details: Saree Color: Dual Tone Wine & Pink Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Embroidered Paisley Motifs with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Heavy Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, engagement functions, cocktail evenings, and traditional gatherings , where you want a graceful yet statement ethnic look. Style Tips: Pair with kundan, polki, or ruby-toned jewellery for a regal finish Opt for soft glam makeup with rosy tones and highlighted cheeks Style your hair in soft waves, side curls, or an elegant bun Complete the look with heels and a chic clutch or potli bag This saree beautifully blends rich traditional embroidery with modern satin elegance , making it a standout piece for your premium festive and occasion wear collection .",
    "shortDescription": "Elevate your festive wardrobe with this luxurious dual-tone saree in rich wine and blush pink hues , beautifully crafted from premium Fendy satin fabric that of...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0422.jpg?v=1780393649",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0442.jpg?v=1780393648",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0443.jpg?v=1780393649",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0441.jpg?v=1780393649",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0424.jpg?v=1780393648",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0431.jpg?v=1780393649",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0427.jpg?v=1780393649",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0435.jpg?v=1780393649",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0450.jpg?v=1780393648",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0447.jpg?v=1780393649"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441965432922",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 022 Peach",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0422.jpg?v=1780393649"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT022",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:25+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481530970",
    "title": "Royal Lavender Purple Fendy Satin Embroidered Saree with Paisley Motifs & Zari Border | Designer Festive Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "royal-lavender-purple-fendy-satin-embroidered-saree-with-paisley-motifs-zari-border-designer-festive-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 022 Voilet",
    "code": "EV-7934481530970",
    "description": "Step into elegance with this royal lavender purple saree , exquisitely crafted in luxurious Fendy satin fabric that offers a rich sheen and fluid drape, perfect for premium festive occasions. This saree is adorned with intricate embroidered paisley (kairi) motifs , beautifully scattered across the body to create a refined and graceful look. The subtle dotted shimmer detailing enhances the overall texture, adding a soft sparkle that elevates its festive appeal. The highlight of this saree lies in its heavily embroidered zari border , featuring detailed craftsmanship that frames the drape with richness and sophistication. The pallu carries elegant embroidery work , making it a statement piece when styled. Finished with delicate tassels on the edges , this saree flows beautifully and adds a touch of charm to every step. It comes with a heavy embroidered blouse piece , designed to complement the saree perfectly and complete your occasion-ready ensemble. The premium Fendy satin fabric ensures a smooth, lightweight feel with a graceful fall , making it both comfortable and luxurious for long wear. Key Details: Saree Color: Lavender Purple Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Embroidered Paisley Motifs with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for weddings, receptions, festive functions, sangeet nights, engagement ceremonies, and special celebrations , where you want to carry a regal yet contemporary ethnic look. Style Tips: Pair with diamond, kundan, or amethyst-toned jewellery for a royal finish Go for dewy makeup with mauve or plum tones to complement the saree Style your hair in soft curls or a sleek low bun for an elegant appearance Complete the look with heels and a statement clutch or potli bag This saree is a perfect blend of modern elegance and traditional embroidery , making it a must-have piece for your premium festive and occasion wear wardrobe .",
    "shortDescription": "Step into elegance with this royal lavender purple saree , exquisitely crafted in luxurious Fendy satin fabric that offers a rich sheen and fluid drape, perfect...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0468.jpg?v=1780393647",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0484.jpg?v=1780393647",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0459.jpg?v=1780393648",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0481.jpg?v=1780393649",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0471.jpg?v=1780393647",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0477.jpg?v=1780393647",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_04731.jpg?v=1780393648",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0463.jpg?v=1780393647",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0456.jpg?v=1780393647"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965400154",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 022 Voilet",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0468.jpg?v=1780393647"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT022",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:24+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481498202",
    "title": "Olive Green Fendy Satin Embroidered Saree with Floral & Paisley Motifs | Designer Zari Border Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "olive-green-fendy-satin-embroidered-saree-with-floral-paisley-motifs-designer-zari-border-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 023 Mehandi Green",
    "code": "EV-7934481498202",
    "description": "Step into timeless elegance with this rich olive green embroidered saree , crafted from premium Fendy satin fabric that offers a luxurious sheen and smooth, graceful drape. This saree is beautifully designed with a blend of intricate floral and traditional paisley (kairi) embroidery motifs , delicately spread across the body to create a refined and sophisticated look. The addition of fine dotted shimmer detailing enhances the overall texture, giving it a subtle festive glow. The saree is framed with a heavily embroidered zari border , showcasing detailed craftsmanship that adds depth and richness to the entire ensemble. The pallu features elegant embroidery work , making it a statement piece perfect for grand occasions. Finished with graceful tassels on the edges , the saree flows beautifully, adding movement and charm to your look. It is paired with a heavy embroidered blouse piece , designed to complement the saree perfectly and elevate your overall styling. The Fendy satin fabric ensures a lightweight yet luxurious feel , making it comfortable for long festive wear while maintaining a premium finish. Key Details: Saree Color: Olive Green Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Floral & Paisley Embroidery with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, sangeet nights, receptions, traditional functions, and evening celebrations , where you want a rich and elegant ethnic appearance. Style Tips: Pair with antique gold, kundan, or emerald jewellery for a royal look Opt for warm-toned makeup with bronzed highlights and nude lips Style your hair in soft curls, side-swept waves, or a classic bun Complete the look with heels and a statement clutch or potli bag This saree is a perfect fusion of traditional embroidery artistry and modern satin elegance , making it a must-have addition to your premium festive and occasion wear collection .",
    "shortDescription": "Step into timeless elegance with this rich olive green embroidered saree , crafted from premium Fendy satin fabric that offers a luxurious sheen and smooth, gra...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0596.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0610.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0585.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0606.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0598.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0605.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0601.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0588.jpg?v=1780393646",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0583.jpg?v=1780393646"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965367386",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 023 Mehandi Green",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0596.jpg?v=1780393646"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT023",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:23+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481465434",
    "title": "Dual Tone Rose Pink & Wine Fendy Satin Embroidered Saree with Floral Motifs & Zari Border | Designer Festive Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "dual-tone-rose-pink-wine-fendy-satin-embroidered-saree-with-floral-motifs-zari-border-designer-festive-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 023 Peach",
    "code": "EV-7934481465434",
    "description": "Grace your festive moments with this stunning dual-tone saree in elegant rose pink and deep wine hues , crafted from luxurious Fendy satin fabric that offers a rich sheen and beautifully fluid drape. This saree is adorned with intricate floral embroidery motifs , delicately scattered across the body to create a soft yet regal aesthetic. The fine dotted shimmer detailing enhances the fabric with a subtle sparkle, making it ideal for both day and evening celebrations. The saree is highlighted by a heavily embroidered zari border , featuring detailed craftsmanship that adds richness and defines the drape beautifully. The pallu showcases elegant embroidery work , making it a statement element when styled. Finished with delicate tassels on the edges , this saree brings graceful movement and a refined finish to your overall look. It is paired with a heavy embroidered blouse piece , designed to perfectly complement the saree and elevate your festive ensemble. The premium Fendy satin fabric ensures a smooth, lightweight feel with a luxurious fall , offering both comfort and elegance throughout the day. Key Details: Saree Color: Dual Tone Rose Pink & Wine Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Floral Embroidery with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive gatherings, engagement ceremonies, and traditional celebrations , where you want to make a graceful yet luxurious statement. Style Tips: Pair with kundan, polki, or ruby-toned jewellery for a rich festive look Go for soft glam makeup with pink or wine tones to enhance the outfit Style your hair in loose curls, side-swept waves, or a classic bun Complete your look with heels and a stylish clutch or potli bag This saree beautifully blends soft feminine tones with intricate embroidery and luxurious satin texture , making it a perfect addition to your premium festive and occasion wear collection .",
    "shortDescription": "Grace your festive moments with this stunning dual-tone saree in elegant rose pink and deep wine hues , crafted from luxurious Fendy satin fabric that offers a ...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0530.jpg?v=1780393644",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0547.jpg?v=1780393644",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0523.jpg?v=1780393645",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0537.jpg?v=1780393645",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0528.jpg?v=1780393644",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0543.jpg?v=1780393645",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0531.jpg?v=1780393645",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0516.jpg?v=1780393645",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0522.jpg?v=1780393645"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441965334618",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 023 Peach",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0530.jpg?v=1780393644"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT023",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:21+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481432666",
    "title": "Deep Teal Green Fendy Satin Embroidered Saree with Floral Motifs & Rich Zari Border | Designer Party Wear Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "deep-teal-green-fendy-satin-embroidered-saree-with-floral-motifs-rich-zari-border-designer-party-wear-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 023 Rama",
    "code": "EV-7934481432666",
    "description": "Make a bold yet graceful statement with this deep teal green embroidered saree , crafted from luxurious Fendy satin fabric known for its smooth texture, soft shine, and elegant drape. This saree features intricate floral embroidery motifs delicately placed across the body, creating a perfect blend of tradition and modern sophistication. The subtle dotted shimmer detailing enhances the richness of the fabric, giving it a refined festive glow. The saree is beautifully framed with a heavily detailed zari embroidered border , showcasing fine craftsmanship that adds depth and a premium finish. The pallu carries elegant floral embroidery , making it a standout highlight of the ensemble. Accentuated with tassels on the edges , the saree flows effortlessly and adds a touch of charm and movement to your look. It comes paired with a heavy embroidered blouse piece , perfectly designed to complement the saree and elevate your festive styling. The premium Fendy satin fabric ensures a lightweight feel with a luxurious fall , making it ideal for long hours of wear without compromising on elegance. Key Details: Saree Color: Deep Teal Green Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Floral Embroidery with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, cocktail events, and evening functions , where you want a rich and sophisticated ethnic look. Style Tips: Pair with kundan, antique gold, or emerald jewellery for a regal appearance Choose smokey eye makeup with nude or berry lips to enhance the deep tone Style your hair in soft curls, a sleek ponytail, or an elegant bun Complete the look with heels and a statement clutch or potli bag This saree beautifully combines rich color depth, intricate embroidery, and luxurious satin finish , making it a must-have for your premium festive and occasion wear collection .",
    "shortDescription": "Make a bold yet graceful statement with this deep teal green embroidered saree , crafted from luxurious Fendy satin fabric known for its smooth texture, soft sh...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0549.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0570.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0573.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0569.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0552.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0563.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0559.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0577.jpg?v=1780393643",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0578.jpg?v=1780393643"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965301850",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 023 Rama",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0549.jpg?v=1780393643"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT023",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:20+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481399898",
    "title": "Royal Purple Fendy Satin Embroidered Saree with Floral Motifs & Zari Border | Designer Party Wear Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "royal-purple-fendy-satin-embroidered-saree-with-floral-motifs-zari-border-designer-party-wear-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 023 Violet",
    "code": "EV-7934481399898",
    "description": "Add a touch of regal charm to your wardrobe with this royal purple embroidered saree , beautifully crafted in premium Fendy satin fabric that offers a luxurious shine and a graceful, fluid drape. This saree is adorned with intricate floral embroidery motifs , elegantly placed across the body to create a sophisticated and timeless look. The delicate dotted shimmer detailing enhances the richness of the fabric, adding a soft sparkle perfect for festive and evening occasions. The saree features a heavily detailed zari embroidered border , showcasing fine craftsmanship that elevates the overall design. The pallu is richly embroidered , making it a standout feature when draped. Finished with elegant tassels on the edges , this saree adds movement and a refined finish to your ensemble. It comes with a heavy embroidered blouse piece , designed to perfectly complement the saree and complete your premium festive look. The Fendy satin fabric ensures a lightweight yet rich feel , making it comfortable for extended wear while maintaining an elegant silhouette. Key Details: Saree Color: Royal Purple Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Floral Embroidery with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, cocktail events, and evening parties , where you want a luxurious and graceful ethnic appearance. Style Tips: Pair with kundan, polki, or statement gold jewellery for a royal look Opt for smokey eyes with mauve or plum-toned makeup Style your hair in soft curls, side-swept waves, or a classic bun Complete the look with heels and an elegant clutch or potli bag This saree is a perfect blend of rich color, intricate embroidery, and luxurious satin finish , making it an essential piece for your premium festive and occasion wear collection .",
    "shortDescription": "Add a touch of regal charm to your wardrobe with this royal purple embroidered saree , beautifully crafted in premium Fendy satin fabric that offers a luxurious...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0657.jpg?v=1780393642",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0675.jpg?v=1780393642",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0650.jpg?v=1780393642",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0677.jpg?v=1780393642",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0662.jpg?v=1780393642",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0669.jpg?v=1780393642",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0664.jpg?v=1780393642",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0651.jpg?v=1780393641",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0645.jpg?v=1780393642"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965269082",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 023 Violet",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0657.jpg?v=1780393642"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT023",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:18+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481367130",
    "title": "Dual Tone Mustard Yellow & Rust Fendy Satin Embroidered Saree with Floral Motifs & Zari Border | Designer Festive Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "dual-tone-mustard-yellow-rust-fendy-satin-embroidered-saree-with-floral-motifs-zari-border-designer-festive-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 023 Yellow",
    "code": "EV-7934481367130",
    "description": "Radiate festive elegance with this stunning dual-tone saree in warm mustard yellow and rich rust hues , crafted from luxurious Fendy satin fabric that offers a smooth texture, graceful fall, and subtle sheen. This saree features intricate floral embroidery motifs , delicately placed across the body to create a perfect balance of traditional charm and modern sophistication. The subtle dotted shimmer detailing enhances the richness of the fabric, giving it a refined festive glow. The saree is beautifully highlighted with a heavily embroidered zari border , showcasing fine craftsmanship and adding depth and definition to the drape. The pallu is adorned with elegant embroidery , making it a standout feature for any occasion. Finished with graceful tassels on the edges , this saree adds movement and a premium finish to your look. It comes with a heavy embroidered blouse piece , designed to perfectly complement the saree and complete your festive ensemble. The premium Fendy satin fabric ensures a lightweight yet luxurious feel , making it comfortable for long hours while maintaining a rich appearance. Key Details: Saree Color: Dual Tone Mustard Yellow & Rust Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Floral Embroidery with Fine Dotted Detailing Border: Rich Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, haldi functions, festive celebrations, traditional gatherings, and day-to-evening events , where you want a vibrant yet elegant ethnic look. Style Tips: Pair with kundan, antique gold, or temple jewellery for a rich traditional vibe Go for warm-toned makeup with golden highlights and nude lips Style your hair in soft curls, side-swept waves, or a classic bun Complete the look with heels and a stylish clutch or potli bag This saree beautifully blends vibrant festive tones with intricate embroidery and luxurious satin finish , making it a must-have for your premium festive and occasion wear collection .",
    "shortDescription": "Radiate festive elegance with this stunning dual-tone saree in warm mustard yellow and rich rust hues , crafted from luxurious Fendy satin fabric that offers a ...",
    "price": 8749,
    "compareAtPrice": 26247,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0619.jpg?v=1780393640",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0636.jpg?v=1780393641",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0641.jpg?v=1780393640",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0634.jpg?v=1780393640",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0623.jpg?v=1780393641",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0629.jpg?v=1780393640",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0626.jpg?v=1780393640",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0640.jpg?v=1780393640",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0643.jpg?v=1780393640"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441965236314",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8749,
        "compareAtPrice": 26247,
        "inStock": true,
        "sku": "AT 023 Yellow",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0619.jpg?v=1780393640"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT023",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:17+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481334362",
    "title": "Olive Green Fendy Satin Embroidered Saree with Geometric & Floral Motifs | Designer Zari Border Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "olive-green-fendy-satin-embroidered-saree-with-geometric-floral-motifs-designer-zari-border-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 024 Mehandi Green",
    "code": "EV-7934481334362",
    "description": "Elevate your ethnic wardrobe with this rich olive green embroidered saree , crafted from premium Fendy satin fabric that offers a smooth, glossy finish and graceful drape. This saree showcases a unique blend of geometric and floral embroidery motifs , intricately designed across the body and pallu, adding a contemporary touch to traditional elegance. The subtle shimmer detailing enhances the overall look, making it perfect for refined festive styling. The highlight of this saree is its heavily embroidered zari border , featuring detailed craftsmanship that adds richness and structure to the drape. The pallu is beautifully adorned with detailed embroidery patterns , creating a statement look from every angle. Finished with elegant tassels on the edges , this saree ensures a premium, festive-ready appearance. It comes with a heavy embroidered blouse piece , perfectly complementing the saree and completing your ensemble with a luxurious finish. The Fendy satin fabric ensures lightweight comfort with a rich fall , making it ideal for long occasions without compromising on style. Key Details: Saree Color: Olive Green Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Geometric & Floral Embroidery with Fine Detailing Border: Rich Zari Embroidered Border Pallu: Designer Heavy Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, festive celebrations, traditional events, evening gatherings, and cultural occasions , where you want a classy and sophisticated ethnic look. Style Tips: Pair with antique gold, kundan, or emerald jewellery for a royal finish Opt for soft glam makeup with earthy tones and highlighted cheeks Style your hair in loose curls, side braid, or sleek bun Complete the look with heels and a statement clutch or potli bag This saree beautifully combines modern embroidery patterns with timeless elegance , making it a perfect choice for premium festive and occasion wear collections .",
    "shortDescription": "Elevate your ethnic wardrobe with this rich olive green embroidered saree , crafted from premium Fendy satin fabric that offers a smooth, glossy finish and grac...",
    "price": 8049,
    "compareAtPrice": 24147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0752.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0771.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0751.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0755.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0768.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0760.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0759.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0745.jpg?v=1780393639",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0748.jpg?v=1780393639"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965203546",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8049,
        "compareAtPrice": 24147,
        "inStock": true,
        "sku": "AT 024 Mehandi Green",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0752.jpg?v=1780393639"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT024",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:16+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481301594",
    "title": "Wine Pink Fendy Satin Embroidered Saree with Ethnic Motifs & Zari Border | Designer Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "wine-pink-fendy-satin-embroidered-saree-with-ethnic-motifs-zari-border-designer-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 024 Peach",
    "code": "EV-7934481301594",
    "description": "Indulge in timeless elegance with this rich wine pink embroidered saree , crafted in luxurious Fendy satin fabric that offers a smooth texture and graceful, fluid drape. The saree features a stunning blend of traditional ethnic motifs and geometric embroidery , delicately spread across the body and pallu, giving it a refined and regal appeal. The subtle shimmer effect enhances its festive charm, making it a perfect statement piece. A beautifully detailed heavy embroidered zari border runs along the edges, adding richness and structure to the saree. The pallu is adorned with intricate embroidery patterns , creating a striking visual that elevates the overall look. The saree is finished with elegant tassels on the edges , adding a touch of sophistication and movement to the drape. Paired with a heavy embroidered blouse piece , this ensemble completes your festive and wedding-ready look effortlessly. Crafted from premium Fendy satin , the fabric ensures lightweight comfort with a glossy finish , allowing you to carry this saree with ease and confidence throughout the day or night. Key Details: Saree Color: Wine Pink / Deep Rose Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Ethnic & Geometric Embroidery with Fine Detailing Border: Rich Zari Embroidered Border Pallu: Designer Heavy Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for wedding ceremonies, festive celebrations, receptions, family functions, and special occasions , where you want to stand out with elegance and grace. Style Tips: Pair with kundan, polki, or gold jewellery for a royal ethnic look Opt for bold lips with soft eye makeup to enhance the rich tone Style your hair in soft curls, low bun, or side-swept waves Complete the look with heels and a matching clutch or potli bag This saree beautifully blends traditional craftsmanship with modern sophistication , making it a must-have for premium festive and wedding wear collections .",
    "shortDescription": "Indulge in timeless elegance with this rich wine pink embroidered saree , crafted in luxurious Fendy satin fabric that offers a smooth texture and graceful, flu...",
    "price": 8049,
    "compareAtPrice": 24147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0811.jpg?v=1780393638",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0825.jpg?v=1780393638",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0807.jpg?v=1780393637",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0813.jpg?v=1780393637",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0821.jpg?v=1780393638",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0815.jpg?v=1780393637",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0818.jpg?v=1780393638",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0801.jpg?v=1780393637",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0804.jpg?v=1780393637"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965170778",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8049,
        "compareAtPrice": 24147,
        "inStock": true,
        "sku": "AT 024 Peach",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0811.jpg?v=1780393638"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT024",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:14+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481268826",
    "title": "Teal Blue Fendy Satin Embroidered Saree with Ethnic Elephant Motifs & Zari Border | Designer Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "teal-blue-fendy-satin-embroidered-saree-with-ethnic-elephant-motifs-zari-border-designer-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 024 Rama",
    "code": "EV-7934481268826",
    "description": "Step into effortless elegance with this stunning teal blue embroidered saree , beautifully crafted from premium Fendy satin fabric that offers a luxurious sheen and fluid drape. This saree features intricate ethnic elephant motifs blended with geometric and floral embroidery , symbolizing grace and heritage. The delicate detailing across the body adds a refined charm, while the soft shimmer enhances its festive appeal. The saree is highlighted by a rich, heavily embroidered zari border , showcasing fine craftsmanship and adding depth to the overall design. The pallu is adorned with detailed ethnic embroidery patterns , creating a statement look that stands out effortlessly. Finished with graceful tassels on the edges , this saree adds movement and sophistication to your drape. It comes with a heavy embroidered blouse piece , designed to perfectly complement the saree and complete your premium ethnic look. The Fendy satin fabric ensures a lightweight feel with a rich glossy finish , making it ideal for long hours of wear without compromising comfort. Key Details: Saree Color: Teal Blue / Peacock Blue Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Ethnic Elephant Motifs with Fine Embroidery Detailing Border: Rich Zari Embroidered Border Pallu: Designer Heavy Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, cultural events, receptions, and evening occasions , where you want to carry a graceful yet statement ethnic look. Style Tips: Pair with kundan, temple jewellery, or antique gold accessories for a traditional vibe Go for smokey eyes with nude or deep-toned lips for a balanced look Style your hair in soft curls, a low bun, or a side-swept hairstyle Complete the look with heels and a stylish clutch or potli bag This saree blends heritage-inspired motifs with modern elegance , making it a perfect addition to your premium festive and occasion wear collection .",
    "shortDescription": "Step into effortless elegance with this stunning teal blue embroidered saree , beautifully crafted from premium Fendy satin fabric that offers a luxurious sheen...",
    "price": 8049,
    "compareAtPrice": 24147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0780.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0798.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0778.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0796.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0783.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0792.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0787.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0772.jpg?v=1780393636",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0776.jpg?v=1780393636"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441965138010",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8049,
        "compareAtPrice": 24147,
        "inStock": true,
        "sku": "AT 024 Rama",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0780.jpg?v=1780393636"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT024",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:13+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481236058",
    "title": "Lavender Purple Fendy Satin Embroidered Saree with Ethnic Elephant Motifs & Designer Zari Border | Festive Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "lavender-purple-fendy-satin-embroidered-saree-with-ethnic-elephant-motifs-designer-zari-border-festive-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 024 Violet",
    "code": "EV-7934481236058",
    "description": "Bring a touch of regal charm to your wardrobe with this elegant lavender purple embroidered saree , crafted from luxurious Fendy satin fabric that offers a soft sheen and graceful drape. This saree is beautifully adorned with intricate ethnic elephant motifs combined with fine geometric and floral embroidery , creating a rich and artistic appeal. The delicate shimmer detailing across the fabric enhances its festive elegance, making it perfect for special occasions. The saree is framed with a heavily embroidered zari border , showcasing detailed craftsmanship that adds depth and richness to the overall design. The pallu features statement embroidery work , making it a standout element of the ensemble. Finished with stylish tassels on the edges , the saree adds movement and a premium finish to your drape. It comes paired with a heavy embroidered blouse piece , designed to complement the saree perfectly and elevate your overall look. The premium Fendy satin fabric ensures lightweight comfort with a glossy, flowy finish , making it ideal for long hours of wear with effortless grace. Key Details: Saree Color: Lavender Purple / Dusty Purple Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Ethnic Elephant Motifs with Fine Embroidery Detailing Border: Rich Zari Embroidered Border Pallu: Designer Heavy Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, festive celebrations, receptions, traditional gatherings, and evening occasions , where you want a sophisticated and graceful ethnic look. Style Tips: Pair with kundan, polki, or diamond jewellery for a refined royal look Go for soft glam makeup with highlighted skin and mauve or nude lips Style your hair in loose curls, a sleek bun, or side-parted waves Complete the look with heels and a chic clutch or potli bag This saree beautifully blends traditional artistry with modern elegance , making it a perfect addition to your premium festive and occasion wear collection .",
    "shortDescription": "Bring a touch of regal charm to your wardrobe with this elegant lavender purple embroidered saree , crafted from luxurious Fendy satin fabric that offers a soft...",
    "price": 8049,
    "compareAtPrice": 24147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0716.jpg?v=1780393635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0734.jpg?v=1780393635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0742.jpg?v=1780393635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0730.jpg?v=1780393635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0720.jpg?v=1780393634",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0724.jpg?v=1780393635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0721.jpg?v=1780393634",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0727.jpg?v=1780393635",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0737.jpg?v=1780393634",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0739.jpg?v=1780393634"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965105242",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8049,
        "compareAtPrice": 24147,
        "inStock": true,
        "sku": "AT 024 Violet",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0716.jpg?v=1780393635"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT024",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:11+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481203290",
    "title": "Mustard Yellow Fendy Satin Embroidered Saree with Ethnic Elephant Motifs & Contrast Zari Border | Designer Saree with Tassels & Heavy Embroidered Blouse",
    "slug": "mustard-yellow-fendy-satin-embroidered-saree-with-ethnic-elephant-motifs-contrast-zari-border-designer-saree-with-tassels-heavy-embroidered-blouse",
    "sku": "AT 024 Yellow",
    "code": "EV-7934481203290",
    "description": "Radiate festive charm with this rich mustard yellow embroidered saree , beautifully crafted from premium Fendy satin fabric known for its soft sheen and elegant drape. This saree features a captivating blend of traditional ethnic elephant motifs and intricate geometric embroidery , artistically placed across the body and pallu. The subtle shimmer detailing enhances the luxurious appeal, making it a perfect choice for standout festive styling. The saree is accentuated with a contrast heavy embroidered zari border in deep maroon tones , adding depth, richness, and a regal finish. The pallu is adorned with detailed embroidery patterns , creating a bold and elegant statement look. Finished with graceful tassels on the edges , the saree offers a premium, designer touch that elevates the overall drape. It comes paired with a heavy embroidered blouse piece , perfectly complementing the saree and completing your sophisticated ethnic ensemble. Crafted in Fendy satin , the fabric ensures a lightweight feel with a glossy, flowy texture , making it comfortable for long festive occasions while maintaining a luxurious appearance. Key Details: Saree Color: Mustard Yellow with Maroon Contrast Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Ethnic Elephant Motifs with Fine Embroidery Detailing Border: Contrast Heavy Zari Embroidered Border Pallu: Designer Heavy Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for wedding ceremonies, festive occasions, haldi functions, receptions, and cultural events , where you want to carry a vibrant yet elegant ethnic look. Style Tips: Pair with kundan, temple jewellery, or antique gold accessories for a traditional royal vibe Opt for warm-toned makeup with golden highlights and bold lips Style your hair in a low bun, braid, or soft curls for a graceful finish Complete the look with heels and a matching clutch or potli bag This saree beautifully blends heritage-inspired motifs with vibrant modern tones , making it a perfect addition to your premium festive and wedding wear collection .",
    "shortDescription": "Radiate festive charm with this rich mustard yellow embroidered saree , beautifully crafted from premium Fendy satin fabric known for its soft sheen and elegant...",
    "price": 8049,
    "compareAtPrice": 24147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0692.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0702.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0710.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0684.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0694.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0701.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0698.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0705.jpg?v=1780393633",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0687.jpg?v=1780393633"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965072474",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 8049,
        "compareAtPrice": 24147,
        "inStock": true,
        "sku": "AT 024 Yellow",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0692.jpg?v=1780393633"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT024",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:09+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481170522",
    "title": "Olive Green Fendy Satin Embroidered Saree with Circular Motifs & Heavy Zari Border | Designer Saree with Tassels & Embroidered Blouse",
    "slug": "olive-green-fendy-satin-embroidered-saree-with-circular-motifs-heavy-zari-border-designer-saree-with-tassels-embroidered-blouse",
    "sku": "AT 025 Mehandi Green",
    "code": "EV-7934481170522",
    "description": "Embrace understated luxury with this elegant olive green embroidered saree , crafted from premium Fendy satin fabric that offers a smooth texture with a subtle glossy finish and graceful fall. This saree features beautifully placed intricate circular floral-inspired embroidery motifs , creating a harmonious and balanced design across the body and pallu. The fine shimmer detailing enhances the richness of the saree while maintaining a sophisticated, minimal look. The standout element is its heavily embroidered zari border , adorned with detailed craftsmanship that adds depth and a luxurious edge to the saree. The pallu is enriched with matching embroidery work , making it a perfect blend of tradition and modern elegance. Finished with elegant tassels on the edges , this saree offers a refined and festive-ready appeal. It comes with a heavy embroidered blouse piece , designed to complement the saree and complete your premium ethnic ensemble. The Fendy satin fabric ensures lightweight comfort with a rich drape , making it ideal for long festive occasions while maintaining effortless elegance. Key Details: Saree Color: Olive Green Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Circular Floral Embroidery with Fine Detailing Border: Heavy Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, festive gatherings, traditional ceremonies, receptions, and evening occasions , where you want a graceful and elegant ethnic look. Style Tips: Pair with emerald, kundan, or antique gold jewellery to enhance the olive tone Opt for soft glam makeup with earthy shades and highlighted skin Style your hair in loose curls, a sleek bun, or a side-swept hairstyle Complete the look with heels and a chic clutch or potli bag This saree beautifully combines minimal elegance with rich embroidery detailing , making it a must-have for premium festive and occasion wear collections .",
    "shortDescription": "Embrace understated luxury with this elegant olive green embroidered saree , crafted from premium Fendy satin fabric that offers a smooth texture with a subtle ...",
    "price": 7349,
    "compareAtPrice": 22047,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0828.jpg?v=1780393632",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0845.jpg?v=1780393631",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0847.jpg?v=1780393631",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0841.jpg?v=1780393631",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0830.jpg?v=1780393632",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0837.jpg?v=1780393632",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0835.jpg?v=1780393631",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0849.jpg?v=1780393632",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0850.jpg?v=1780393632"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441965039706",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 7349,
        "compareAtPrice": 22047,
        "inStock": true,
        "sku": "AT 025 Mehandi Green",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0828.jpg?v=1780393632"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT025",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:05+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481137754",
    "title": "Rust Red Fendy Satin Embroidered Saree with Circular Motifs & Heavy Zari Border | Designer Saree with Tassels & Embroidered Blouse",
    "slug": "rust-red-fendy-satin-embroidered-saree-with-circular-motifs-heavy-zari-border-designer-saree-with-tassels-embroidered-blouse",
    "sku": "AT 025 Peach",
    "code": "EV-7934481137754",
    "description": "Make a bold yet graceful statement with this rich rust red embroidered saree , crafted from luxurious Fendy satin fabric that offers a soft sheen and elegant, fluid drape. This saree is adorned with intricate circular floral embroidery motifs , beautifully scattered across the body to create a balanced and sophisticated look. The subtle shimmer detailing enhances its festive charm while maintaining a refined elegance. The highlight of this saree is its heavily embroidered zari border , featuring detailed craftsmanship that adds richness and structure to the overall design. The pallu is accentuated with matching embroidery , giving it a complete and premium designer appeal. Finished with stylish tassels on the edges , this saree adds a touch of movement and luxury to your drape. It comes paired with a heavy embroidered blouse piece , designed to perfectly complement the saree and elevate your festive ensemble. The premium Fendy satin fabric ensures lightweight comfort with a glossy finish , making it ideal for long occasions while keeping you effortlessly stylish. Key Details: Saree Color: Rust Red / Deep Terracotta Blouse: Heavy Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Circular Floral Embroidery with Fine Detailing Border: Heavy Zari Embroidered Border Pallu: Designer Embroidered Pallu Tassels: Yes, on edges Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, festive celebrations, receptions, traditional ceremonies, and evening events , where you want to carry a rich and elegant ethnic look. Style Tips: Pair with kundan, antique gold, or polki jewellery for a royal finish Opt for warm-toned makeup with bold lips and soft shimmer eyes Style your hair in soft curls, a sleek bun, or side-swept waves Complete the look with heels and a matching clutch or potli bag This saree beautifully blends classic embroidery with rich earthy tones , making it a perfect addition to your premium festive and occasion wear collection .",
    "shortDescription": "Make a bold yet graceful statement with this rich rust red embroidered saree , crafted from luxurious Fendy satin fabric that offers a soft sheen and elegant, f...",
    "price": 7349,
    "compareAtPrice": 22047,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0927.jpg?v=1780393625",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0941.jpg?v=1780393626",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0917.jpg?v=1780393625",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0934.jpg?v=1780393625",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0931.jpg?v=1780393625",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0938.jpg?v=1780393625",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0932.jpg?v=1780393625",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0922.jpg?v=1780393625",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0920.jpg?v=1780393625"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441965006938",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 7349,
        "compareAtPrice": 22047,
        "inStock": true,
        "sku": "AT 025 Peach",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0927.jpg?v=1780393625"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT025",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:01+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481104986",
    "title": "Emerald Green Fendy Satin Designer Saree with Circular Embroidery & Heavy Zari Border | Festive Party Wear Saree with Blouse",
    "slug": "emerald-green-fendy-satin-designer-saree-with-circular-embroidery-heavy-zari-border-festive-party-wear-saree-with-blouse",
    "sku": "AT 025 Rama",
    "code": "EV-7934481104986",
    "description": "Step into timeless elegance with this emerald green designer saree , crafted in premium Fendy satin fabric that offers a luxurious sheen and a smooth, graceful drape. This saree features intricately embroidered circular motifs placed beautifully across the body, creating a rich and balanced design. The subtle shimmer detailing enhances its festive appeal while maintaining a sophisticated look. The highlight of this saree is its ornate zari embroidered border , designed with fine craftsmanship and detailed patterns that add depth and grandeur. The pallu carries matching embroidery , giving the saree a cohesive and designer finish. The deep emerald tone exudes royalty and elegance, making it a perfect choice for occasions where you want to stand out with refined style. It comes paired with a matching blouse piece , designed to complement the saree’s rich embroidery and overall aesthetic. The lightweight yet glossy fabric ensures comfort with a premium feel , allowing you to carry it effortlessly for long events. Key Details: Saree Color: Emerald Green Blouse: Matching Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: Circular Embroidery Motifs with Fine Detailing Border: Heavy Zari Embroidered Border Pallu: Designer Embroidered Pallu Finish: Soft Shine with Elegant Fall Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for weddings, festive celebrations, receptions, traditional events, and evening parties , where elegance and richness are essential. Style Tips: Pair with emerald, kundan, or antique gold jewellery for a royal look Opt for soft glam makeup with highlighted eyes and nude or bold lips Style with loose curls, side-swept waves, or a sleek bun Complete the look with heels and a statement clutch This saree is a perfect blend of classic embroidery, rich color, and modern elegance , making it a must-have for your premium ethnic wardrobe .",
    "shortDescription": "Step into timeless elegance with this emerald green designer saree , crafted in premium Fendy satin fabric that offers a luxurious sheen and a smooth, graceful ...",
    "price": 7349,
    "compareAtPrice": 22047,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0859.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0879.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0887.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0878.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0862.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0867.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0865.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0881.jpg?v=1780393623",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0884.jpg?v=1780393623"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964941402",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 7349,
        "compareAtPrice": 22047,
        "inStock": true,
        "sku": "AT 025 Rama",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0859.jpg?v=1780393623"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT025",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:17:00+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481072218",
    "title": "Dusty Mauve Fendy Satin Designer Saree with Zari Circular Motifs & Rich Embroidered Border | Elegant Party Wear Saree with Blouse",
    "slug": "dusty-mauve-fendy-satin-designer-saree-with-zari-circular-motifs-rich-embroidered-border-elegant-party-wear-saree-with-blouse",
    "sku": "AT 025 Violet",
    "code": "EV-7934481072218",
    "description": "Elevate your ethnic wardrobe with this graceful dusty mauve designer saree , crafted in luxurious Fendy satin fabric known for its smooth texture and subtle glossy finish. The saree is adorned with finely detailed circular zari motifs spread evenly across the body, adding a delicate yet rich design element. The soft shimmer throughout enhances its elegance, making it perfect for refined festive styling. A standout feature is its heavily embroidered zari border , showcasing intricate craftsmanship with a structured pattern that frames the saree beautifully. The matching embroidered pallu adds continuity and enhances the designer appeal. The dusty mauve shade offers a modern, sophisticated twist to traditional wear—perfect for those who prefer subtle luxury over loud colors. Paired with a coordinated blouse piece , this saree allows you to style it traditionally or with a contemporary touch. Lightweight and fluid, this saree ensures all-day comfort with a premium drape , making it ideal for long occasions. Key Details: Saree Color: Dusty Mauve / Soft Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Zari Circular Motifs with Fine Detailing Border: Rich Heavy Embroidered Zari Border Pallu: Designer Embroidered Pallu Finish: Smooth Glossy Texture with Elegant Fall Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, receptions, festive gatherings, evening events, and elegant celebrations . Style Tips: Pair with diamond, kundan, or antique gold jewellery for a refined look Opt for soft glam makeup with mauve or nude tones Style hair in loose waves or a sleek low bun Complete the look with heels and a minimal clutch This saree blends modern pastel elegance with traditional embroidery , making it a perfect choice for women who love subtle luxury and timeless style .",
    "shortDescription": "Elevate your ethnic wardrobe with this graceful dusty mauve designer saree , crafted in luxurious Fendy satin fabric known for its smooth texture and subtle glo...",
    "price": 7349,
    "compareAtPrice": 22047,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0954.jpg?v=1780393621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0968.jpg?v=1780393621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0950.jpg?v=1780393622",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0963.jpg?v=1780393621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0956.jpg?v=1780393622",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0961.jpg?v=1780393621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0957.jpg?v=1780393622",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0969.jpg?v=1780393621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0942.jpg?v=1780393621",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0948.jpg?v=1780393621"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964908634",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 7349,
        "compareAtPrice": 22047,
        "inStock": true,
        "sku": "AT 025 Violet",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0954.jpg?v=1780393621"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT025",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:58+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481039450",
    "title": "Antique Mustard Gold Fendy Satin Designer Saree with Zari Circular Motifs & Heavy Embroidered Border | Festive Wedding Wear Saree with Blouse",
    "slug": "antique-mustard-gold-fendy-satin-designer-saree-with-zari-circular-motifs-heavy-embroidered-border-festive-wedding-wear-saree-with-blouse",
    "sku": "AT 025 Yellow",
    "code": "EV-7934481039450",
    "description": "Embrace regal elegance with this antique mustard gold designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen and a smooth, graceful drape. The saree is adorned with intricate circular zari motifs spread elegantly across the body, creating a balanced and sophisticated visual appeal. The subtle shimmer enhances its festive charm without overpowering the look. A defining highlight is the heavily embroidered zari border , featuring detailed craftsmanship and a structured pattern that adds depth and richness. The coordinated embroidered pallu completes the saree with a seamless designer finish. The mustard gold tone reflects warmth, royalty, and timeless tradition—making it a perfect pick for grand occasions and celebrations. It comes paired with a matching blouse piece , allowing versatile styling from traditional to contemporary looks. The fabric is lightweight, glossy, and fluid , ensuring comfort while maintaining a premium appearance throughout the day. Key Details: Saree Color: Antique Mustard Gold Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Zari Circular Motifs with Fine Detailing Border: Heavy Embroidered Zari Border Pallu: Designer Embroidered Pallu Finish: Smooth Glossy Texture with Rich Fall Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive functions, haldi ceremonies, receptions, and traditional gatherings . Style Tips: Pair with kundan, polki, or antique gold jewellery for a royal look Opt for warm-toned makeup with golden highlights and bold lips Style hair in soft curls or a classic bun Complete with heels and a statement clutch This saree is a perfect blend of traditional richness and modern elegance , making it an ideal choice for those who want to make a graceful yet powerful style statement .",
    "shortDescription": "Embrace regal elegance with this antique mustard gold designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen and a smooth...",
    "price": 7349,
    "compareAtPrice": 22047,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0898.jpg?v=1780393620",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0916.jpg?v=1780393620",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0895.jpg?v=1780393620",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0914.jpg?v=1780393619",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0904.jpg?v=1780393620",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0909.jpg?v=1780393620",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0906.jpg?v=1780393620",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0889.jpg?v=1780393620",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0892.jpg?v=1780393619"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "rasiya-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964875866",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 7349,
        "compareAtPrice": 22047,
        "inStock": true,
        "sku": "AT 025 Yellow",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0898.jpg?v=1780393620"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT025",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:56+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934481006682",
    "title": "Bottle Green Fendy Satin Saree with White Floral Embroidery Border | Designer Party Wear Saree with Embroidered Blouse",
    "slug": "bottle-green-fendy-satin-saree-with-white-floral-embroidery-border-designer-party-wear-saree-with-embroidered-blouse",
    "sku": "AT 26 GREEN",
    "code": "EV-7934481006682",
    "description": "Add timeless elegance to your festive wardrobe with this bottle green designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a graceful drape with a rich glossy finish. This saree is adorned with delicate white floral embroidery motifs spread elegantly across the body, creating a sophisticated contrast against the deep green base. The embroidery gives the saree a refined and graceful aesthetic, perfect for women who love subtle luxury. The highlight of this saree is its intricately embroidered floral border , featuring detailed white thread embroidery that beautifully frames the saree and enhances its regal appeal. The matching embroidered pallu further elevates the overall designer look. The deep bottle green shade adds richness and royal charm, making it ideal for festive occasions, evening functions, and elegant celebrations. Paired with a matching embroidered blouse piece , this saree creates a coordinated and polished ethnic ensemble. Its lightweight and smooth fabric ensures comfort with premium styling , allowing effortless draping throughout the day or evening. Key Details: Saree Color: Bottle Green Blouse: Matching Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Border Pallu: Designer Embroidered Pallu Finish: Soft Glossy Texture with Elegant Fall Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for festive gatherings, wedding events, receptions, cocktail parties, family celebrations, and evening occasions . Style Tips: Pair with emerald, diamond, or kundan jewellery for an elegant festive look Opt for soft glam makeup with bold eyes or nude lips Style your hair in soft curls or a sleek bun Complete the look with heels and a statement clutch This saree beautifully blends minimal embroidery elegance with luxurious satin texture , making it a perfect choice for women who appreciate classic sophistication with modern festive charm .",
    "shortDescription": "Add timeless elegance to your festive wardrobe with this bottle green designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a gracefu...",
    "price": 6049,
    "compareAtPrice": 18147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0245.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0257.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0258.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0256.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0247.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0251.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0254.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0241.jpg?v=1780393618",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0260.jpg?v=1780393618"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964843098",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 6049,
        "compareAtPrice": 18147,
        "inStock": true,
        "sku": "AT 26 GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0245.jpg?v=1780393618"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT026",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:55+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480973914",
    "title": "Wine Red Fendy Satin Saree with White Floral Embroidery Border | Designer Festive Wear Saree with Embroidered Blouse",
    "slug": "wine-red-fendy-satin-saree-with-white-floral-embroidery-border-designer-festive-wear-saree-with-embroidered-blouse",
    "sku": "AT 26 MAROON",
    "code": "EV-7934480973914",
    "description": "Radiate elegance and sophistication with this wine red designer saree , crafted in luxurious Fendy satin fabric that offers a graceful drape, rich shine, and smooth texture. This saree features delicate white floral embroidery motifs elegantly placed across the body, creating a beautiful contrast against the deep wine red base. The intricate embroidery gives the saree a refined and timeless festive appeal. The highlight of the saree is its heavily embroidered floral border , designed with detailed white thread embroidery that enhances the richness of the overall look. The matching embroidered pallu further elevates the saree with a regal and premium finish. The deep wine red shade symbolizes luxury and celebration, making it a perfect choice for weddings, festive occasions, receptions, and evening gatherings. Paired with a matching blouse piece , this saree allows effortless styling for both traditional and modern ethnic looks. The lightweight satin fabric ensures comfortable wear with a flowing and elegant silhouette , making it ideal for long celebrations. Key Details: Saree Color: Wine Red / Deep Maroon Blouse: Matching Embroidered Blouse Piece (Unstitched) Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Border Pallu: Designer Embroidered Pallu Finish: Smooth Glossy Texture with Elegant Fall Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, festive celebrations, receptions, engagement ceremonies, cocktail evenings, and traditional occasions . Style Tips: Pair with kundan, diamond, or pearl jewellery for a luxurious festive look Opt for bold lips with soft shimmer makeup Style with soft curls, side-swept hair, or a sleek bun Complete the look with heels and a statement clutch or potli bag This saree beautifully combines rich festive color tones with intricate embroidery detailing , making it a timeless addition to your premium ethnic wear collection .",
    "shortDescription": "Radiate elegance and sophistication with this wine red designer saree , crafted in luxurious Fendy satin fabric that offers a graceful drape, rich shine, and sm...",
    "price": 6049,
    "compareAtPrice": 18147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30427.jpg?v=1780393617",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30445.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30448.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30433.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30429.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30437.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30439.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30440.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30443.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30446.jpg?v=1780393616",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30450.jpg?v=1780393616"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964810330",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 6049,
        "compareAtPrice": 18147,
        "inStock": true,
        "sku": "AT 26 MAROON",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30427.jpg?v=1780393617"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT026",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:53+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480941146",
    "title": "Royal Blue Fendy Satin Saree with White Floral Embroidery Border | Designer Party Wear Saree with Embroidered Blouse",
    "slug": "royal-blue-fendy-satin-saree-with-white-floral-embroidery-border-designer-party-wear-saree-with-embroidered-blouse",
    "sku": "AT 26 RAMA",
    "code": "EV-7934480941146",
    "description": "Elevate your festive wardrobe with this stunning royal blue designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen, fluid drape, and graceful elegance. Designed for women who love timeless sophistication, this saree features intricate white floral embroidery motifs delicately spread across the saree body, adding a refined and artistic touch to the deep royal blue base. The saree is enhanced with a heavily embroidered floral lace border , showcasing elegant white thread embroidery work that creates a beautiful contrast and gives the saree a premium festive appearance. The embroidered detailing on the pallu further enhances the overall luxurious appeal. Its rich royal blue tone symbolizes elegance and grandeur, making this saree an ideal choice for weddings, festive celebrations, receptions, parties, and special traditional occasions. Paired with a matching unstitched blouse piece , this saree allows you to create a sophisticated ethnic look with ease. The lightweight and soft satin texture ensures all-day comfort while maintaining a graceful silhouette and flow. Key Details: Saree Color: Royal Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, festive events, cocktail parties, receptions, engagement functions, traditional gatherings, and evening celebrations . Style Tips: Pair with diamond, kundan, or pearl jewellery for a royal festive look Style with soft curls or sleek straight hair Add silver or embellished heels for a glamorous finish Carry a designer clutch or embroidered potli bag to complete the outfit This saree beautifully blends modern elegance with traditional embroidery artistry , making it a timeless addition to your premium ethnic and festive wear collection .",
    "shortDescription": "Elevate your festive wardrobe with this stunning royal blue designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen, fluid...",
    "price": 6049,
    "compareAtPrice": 18147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30288.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30300.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30301.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30292.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30293.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30296.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30298.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30299.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30284.jpg?v=1780393615",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30303.jpg?v=1780393615"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964777562",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 6049,
        "compareAtPrice": 18147,
        "inStock": true,
        "sku": "AT 26 RAMA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30288.jpg?v=1780393615"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT026",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:51+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480908378",
    "title": "Bright Red Fendy Satin Saree with White Floral Embroidery Border | Designer Festive Party Wear Saree with Blouse",
    "slug": "bright-red-fendy-satin-saree-with-white-floral-embroidery-border-designer-festive-party-wear-saree-with-blouse",
    "sku": "AT 26 RED",
    "code": "EV-7934480908378",
    "description": "Make a bold and graceful statement with this stunning bright red designer saree , crafted in luxurious Fendy satin fabric that offers a smooth texture, elegant shine, and beautifully flowing drape. This saree is adorned with delicate white floral embroidery motifs spread across the saree, creating a sophisticated handcrafted look against the vibrant red base. The contrast white embroidery adds timeless charm and gives the saree a refined festive appeal. The highlight of this saree is its intricately embroidered floral lace border , beautifully detailed with elegant white thread embroidery work that enhances the richness of the overall design. The embroidered pallu adds extra elegance and creates a luxurious ethnic silhouette. Its rich bright red color symbolizes celebration, beauty, and traditional elegance, making it a perfect choice for weddings, festive occasions, receptions, engagement ceremonies, poojas, and party wear styling. Paired with a matching unstitched blouse piece , this saree allows customized styling for both traditional and modern ethnic looks. The lightweight satin fabric ensures comfort while maintaining a royal and graceful appearance throughout the day. Key Details: Saree Color: Bright Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Border Pallu: Rich Embroidered Designer Pallu Texture: Soft, Lightweight & Shiny Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for weddings, festive celebrations, traditional functions, engagement parties, receptions, family gatherings, Karwa Chauth, Diwali, Navratri, and ethnic party wear occasions . Style Tips: Pair with kundan, pearl, or diamond jewellery for a regal festive look Style with soft curls, classic bun, or open waves Add embroidered heels or ethnic juttis for a complete ethnic outfit Carry a potli bag or embellished clutch to elevate the styling This saree beautifully blends traditional embroidery craftsmanship with modern satin elegance , making it a timeless addition to your festive and designer saree collection.",
    "shortDescription": "Make a bold and graceful statement with this stunning bright red designer saree , crafted in luxurious Fendy satin fabric that offers a smooth texture, elegant ...",
    "price": 6049,
    "compareAtPrice": 18147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30328.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30344.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30347.jpg?v=1780393614",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30346.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30335.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30336.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30340.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30342.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30326.jpg?v=1780393613",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30349.jpg?v=1780393613"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964744794",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 6049,
        "compareAtPrice": 18147,
        "inStock": true,
        "sku": "AT 26 RED",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30328.jpg?v=1780393613"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT026",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:50+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480875610",
    "title": "Royal Purple Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "royal-purple-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 26 WINE",
    "code": "EV-7934480875610",
    "description": "Step into timeless elegance with this luxurious royal purple designer saree , crafted in premium Fendy satin fabric known for its graceful shine, soft texture, and rich flowing drape. This beautiful saree features delicate white floral embroidery motifs artistically placed across the saree, creating a sophisticated contrast against the deep royal purple shade. The intricate detailing adds a refined handcrafted charm that enhances the overall festive and designer appeal. The saree is highlighted with a stunning heavily embroidered floral lace border , beautifully crafted in elegant white thread embroidery. The richly embroidered border and pallu elevate the saree with a graceful traditional touch while maintaining a modern luxury aesthetic. Its rich royal purple color symbolizes sophistication, royalty, and elegance, making this saree an excellent choice for weddings, festive celebrations, receptions, engagement ceremonies, evening parties, and traditional occasions. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for both classic and contemporary ethnic looks. The lightweight satin fabric ensures comfort, fluid movement, and a flattering drape that enhances your festive appearance effortlessly. Key Details: Saree Color: Royal Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Lightweight & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, cocktail parties, engagement functions, traditional gatherings, family events, and evening festive wear styling . Style Tips: Pair with diamond, kundan, or pearl jewellery for a regal festive look Style with soft curls, sleek waves, or a classic bun Add silver heels or embellished ethnic footwear for an elegant finish Carry a designer clutch or embroidered potli bag to complete the look This saree beautifully combines luxurious satin elegance with timeless embroidery craftsmanship , making it a perfect addition to your premium festive and ethnic wear collection.",
    "shortDescription": "Step into timeless elegance with this luxurious royal purple designer saree , crafted in premium Fendy satin fabric known for its graceful shine, soft texture, ...",
    "price": 6049,
    "compareAtPrice": 18147,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30379.jpg?v=1780393612",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30391.jpg?v=1780393612",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30393.jpg?v=1780393611",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30381.jpg?v=1780393611",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30384.jpg?v=1780393612",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30392.jpg?v=1780393612",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30387.jpg?v=1780393611",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30389.jpg?v=1780393611",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30375.jpg?v=1780393611",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30395.jpg?v=1780393612"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964712026",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 6049,
        "compareAtPrice": 18147,
        "inStock": true,
        "sku": "AT 26 WINE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI30379.jpg?v=1780393612"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT026",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:48+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480842842",
    "title": "Sky Blue Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "sky-blue-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 27 AQUA BLUE",
    "code": "EV-7934480842842",
    "description": "Grace your festive moments with this breathtaking sky blue designer saree , beautifully crafted in premium Fendy satin fabric that offers a soft texture, elegant sheen, and luxurious drape. This saree is adorned with exquisite white floral embroidery detailing , creating a delicate and sophisticated contrast against the soothing sky blue base. The subtle embroidery motifs spread gracefully across the saree add a refined handcrafted charm and timeless elegance. The highlight of this saree is its stunning heavy floral embroidered lace border , intricately designed with elegant white thread embroidery that beautifully enhances the overall richness of the drape. The embroidered pallu gives the saree a graceful and premium festive appeal. Its refreshing sky blue shade symbolizes serenity, elegance, and modern femininity, making it a perfect choice for weddings, receptions, festive celebrations, engagement ceremonies, cocktail parties, and special traditional occasions. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both traditional and contemporary ethnic looks. The lightweight satin fabric ensures comfortable wear while maintaining a rich and graceful silhouette throughout the occasion. Key Details: Saree Color: Sky Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Rich Embroidered Designer Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, engagement ceremonies, festive gatherings, receptions, cocktail parties, traditional functions, family celebrations, and elegant evening events . Style Tips: Pair with diamond, pearl, or silver-toned jewellery for a sophisticated look Style with soft curls or sleek open hair for graceful elegance Add silver heels or embellished sandals to complete the outfit Carry a designer clutch or embroidered potli bag for a luxurious festive finish This saree beautifully blends minimal elegance with luxurious embroidery craftsmanship , making it a timeless addition to your premium festive and ethnic wear collection.",
    "shortDescription": "Grace your festive moments with this breathtaking sky blue designer saree , beautifully crafted in premium Fendy satin fabric that offers a soft texture, elegan...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0029.jpg?v=1780393610",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0041.jpg?v=1780393610",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0028.jpg?v=1780393611",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0039.jpg?v=1780393610",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0033.jpg?v=1780393610",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0035.jpg?v=1780393610",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0037.jpg?v=1780393610",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0027.jpg?v=1780393610",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0026.jpg?v=1780393610"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964679258",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 27 AQUA BLUE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0029.jpg?v=1780393610"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT027",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:47+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480810074",
    "title": "Lavender Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "lavender-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 27 MAUVE",
    "code": "EV-7934480810074",
    "description": "Add a touch of dreamy elegance to your festive wardrobe with this stunning lavender designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a graceful shine, silky-soft texture, and fluid drape. This saree is adorned with delicate white floral embroidery detailing , creating a sophisticated contrast against the soothing lavender base. The finely embroidered floral motifs enhance the saree with a graceful handcrafted appearance and timeless feminine charm. The highlight of this saree is its beautifully designed heavy floral embroidered lace border , intricately crafted with elegant white thread embroidery work that gives the saree a luxurious festive finish. The richly embroidered pallu further enhances the overall designer appeal. Its soft and refreshing lavender color symbolizes elegance, grace, and modern sophistication, making this saree a perfect choice for weddings, engagement ceremonies, festive occasions, receptions, cocktail parties, and elegant traditional gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both classic ethnic and contemporary festive looks. The lightweight satin texture ensures comfort while maintaining a rich, graceful silhouette throughout the day. Key Details: Saree Color: Lavender Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Lightweight & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for weddings, festive celebrations, receptions, engagement functions, cocktail parties, family gatherings, bridal events, and elegant evening occasions . Style Tips: Pair with diamond, pearl, or pastel stone jewellery for a graceful festive look Style with soft curls, sleek waves, or an elegant bun hairstyle Add silver heels or embellished sandals for a refined appearance Carry a designer clutch or embroidered potli bag to complete the festive styling This saree beautifully combines minimal luxury with timeless embroidery artistry , making it a perfect addition to your premium festive and ethnic wear collection.",
    "shortDescription": "Add a touch of dreamy elegance to your festive wardrobe with this stunning lavender designer saree , beautifully crafted in luxurious Fendy satin fabric that of...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50074.jpg?v=1780393609",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50088.jpg?v=1780393608",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50089.jpg?v=1780393608",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50081.jpg?v=1780393609",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50080.jpg?v=1780393608",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50086.jpg?v=1780393608",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50087.jpg?v=1780393608",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50072.jpg?v=1780393609",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50091.jpg?v=1780393609"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964646490",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 27 MAUVE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50074.jpg?v=1780393609"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT027",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:45+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480777306",
    "title": "Pista Green Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Festive Wear Saree with Blouse",
    "slug": "pista-green-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-festive-wear-saree-with-blouse",
    "sku": "AT 27 OLIVE GREEN",
    "code": "EV-7934480777306",
    "description": "Embrace graceful elegance with this stunning pista green designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen, soft texture, and elegant fluid drape. This saree is adorned with delicate white floral embroidery detailing , creating a beautiful contrast against the soothing pista green base. The subtle embroidered motifs spread across the saree add a refined handcrafted touch and elevate the overall festive appeal. The saree features a breathtaking heavy floral embroidered lace border , intricately designed with elegant white thread embroidery that enhances the richness and premium look of the drape. The beautifully embroidered pallu further adds sophistication and timeless ethnic charm. Its refreshing pista green color symbolizes grace, freshness, and understated luxury, making this saree a perfect choice for weddings, festive occasions, receptions, engagement ceremonies, traditional gatherings, and elegant evening celebrations. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both modern and traditional ethnic looks. The lightweight satin texture ensures all-day comfort while maintaining a royal and flattering silhouette. Key Details: Saree Color: Pista Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Lightweight & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, engagement ceremonies, receptions, poojas, family gatherings, cocktail events, and elegant traditional occasions . Style Tips: Pair with diamond, pearl, or pastel stone jewellery for a sophisticated festive look Style with soft curls, sleek waves, or a low bun hairstyle Add silver heels or embellished sandals for a graceful finish Carry a designer clutch or embroidered potli bag to complete the ethnic styling This saree beautifully blends luxurious satin elegance with timeless embroidery artistry , making it a perfect addition to your premium festive and designer saree collection.",
    "shortDescription": "Embrace graceful elegance with this stunning pista green designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen, soft tex...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50517.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50529.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50530.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50525.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50521.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50522.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50526.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50527.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50516.jpg?v=1780393607",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50532.jpg?v=1780393607"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964613722",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 27 OLIVE GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50517.jpg?v=1780393607"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT027",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:43+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480744538",
    "title": "Peach Orange Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Festive Wear Saree with Blouse",
    "slug": "peach-orange-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-festive-wear-saree-with-blouse",
    "sku": "AT 27 ORANGE",
    "code": "EV-7934480744538",
    "description": "Radiate effortless elegance with this beautiful peach orange designer saree , crafted in luxurious Fendy satin fabric that offers a graceful shine, smooth texture, and rich flowing drape. This saree is adorned with delicate white floral embroidery detailing , beautifully contrasting against the soft peach orange base to create a sophisticated and feminine festive look. The subtle embroidered motifs spread across the saree enhance its handcrafted elegance and premium appeal. The highlight of this saree is its stunning heavy floral embroidered lace border , intricately designed with elegant white thread embroidery that adds richness and timeless charm to the drape. The embroidered pallu further elevates the saree with a refined designer finish. Its refreshing peach orange shade reflects warmth, grace, and modern festive elegance, making it a perfect choice for weddings, engagement ceremonies, festive celebrations, receptions, daytime functions, and elegant traditional occasions. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both contemporary and classic ethnic looks. The lightweight satin fabric ensures comfortable wear while maintaining a luxurious and flattering silhouette throughout the day. Key Details: Saree Color: Peach Orange Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Lightweight & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, engagement ceremonies, haldi functions, receptions, family gatherings, poojas, and elegant daytime celebrations . Style Tips: Pair with pearl, kundan, or pastel stone jewellery for a graceful festive look Style with soft curls, loose waves, or a sleek bun hairstyle Add silver or nude heels for a refined ethnic finish Carry a designer clutch or embroidered potli bag to complete the festive styling This saree beautifully combines minimal luxury with timeless floral embroidery artistry , making it a perfect addition to your premium festive and designer saree collection.",
    "shortDescription": "Radiate effortless elegance with this beautiful peach orange designer saree , crafted in luxurious Fendy satin fabric that offers a graceful shine, smooth textu...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50559.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50574.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50554.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50565.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50561.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50569.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50571.jpg?v=1780393606",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50573.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50555.jpg?v=1780393605",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50553.jpg?v=1780393605"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964580954",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 27 ORANGE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI50559.jpg?v=1780393605"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT027",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:42+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480711770",
    "title": "Blush Pink Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "blush-pink-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 27 PEACH PINK",
    "code": "EV-7934480711770",
    "description": "Step into timeless elegance with this graceful blush pink designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a soft sheen, fluid drape, and premium festive appeal. This saree is enhanced with delicate white floral embroidery work , artistically placed across the saree to create a refined and feminine aesthetic. The intricate floral embroidery adds subtle richness while maintaining a sophisticated designer look. The highlight of this saree is its stunning heavy floral embroidered lace border , featuring beautifully detailed white thread floral patterns that frame the saree with luxurious craftsmanship and elegance. The richly designed embroidered pallu further enhances its premium festive charm. Its soft blush pink shade reflects grace, romance, and modern ethnic beauty, making it an ideal choice for weddings, engagement functions, receptions, festive celebrations, cocktail parties, and elegant traditional occasions. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both classic and contemporary ethnic looks. The lightweight satin texture ensures all-day comfort while giving the saree a rich, flowy silhouette perfect for effortless festive styling. Key Details: Saree Color: Blush Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Smooth & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, engagement ceremonies, cocktail events, pooja functions, family gatherings, and elegant party wear styling . Style Tips: Pair with diamond, pearl, or kundan jewellery for a luxurious festive appearance Style with soft curls, glam makeup, and embellished heels for a graceful ethnic look Carry a designer clutch or potli bag to complete the ensemble Ideal for both daytime elegance and evening festive glamour This saree beautifully blends modern sophistication with traditional embroidery artistry , making it a must-have statement piece for your festive and designer saree collection.",
    "shortDescription": "Step into timeless elegance with this graceful blush pink designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a soft sheen, fluid d...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0476.jpg?v=1780393604",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0488.jpg?v=1780393604",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0489.jpg?v=1780393604",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0483.jpg?v=1780393603",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0478.jpg?v=1780393604",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0484_548b2b55-6504-4a74-a5fb-f66f5114e15d.jpg?v=1780393604",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0486.jpg?v=1780393606",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0487.jpg?v=1780393603",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0472.jpg?v=1780393604",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0491.jpg?v=1780393603"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964548186",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 27 PEACH PINK",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0476.jpg?v=1780393604"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT027",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:40+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480679002",
    "title": "Sky Blue Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "sky-blue-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse-1",
    "sku": "AT 28 AQUA BLUE",
    "code": "EV-7934480679002",
    "description": "Embrace graceful elegance with this stunning sky blue designer saree , crafted in luxurious Fendy satin fabric that offers a rich sheen, soft texture, and beautifully flowy drape for a sophisticated festive look. This saree is adorned with delicate white floral embroidery work spread gracefully across the saree, adding subtle detailing and timeless charm. The intricate floral embroidery enhances the saree’s refined aesthetic while maintaining a lightweight and elegant appeal. The highlight of this saree is its beautifully crafted heavy floral embroidered lace border , designed with detailed white floral thread embroidery that adds richness and designer elegance to the overall silhouette. The embroidered pallu creates a graceful flowing finish perfect for festive and occasion wear styling. Its soothing sky blue color reflects calm sophistication and modern femininity, making it an ideal choice for weddings, festive celebrations, receptions, engagement ceremonies, cocktail events, and elegant traditional gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both traditional and contemporary looks. The smooth satin texture and graceful fall make this saree effortlessly stylish and comfortable for long festive occasions. Key Details: Saree Color: Sky Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Smooth & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, engagement ceremonies, cocktail parties, pooja functions, family gatherings, and elegant occasion wear styling . Style Tips: Pair with diamond, pearl, oxidised silver, or kundan jewellery for a graceful festive appearance Style with soft curls, dewy makeup, and embellished heels for a modern ethnic look Carry a designer clutch or embroidered potli bag to complete the ensemble Ideal for both daytime festivities and evening celebrations This saree beautifully combines luxurious satin elegance with delicate floral embroidery artistry , making it a timeless addition to your festive and designer saree collection.",
    "shortDescription": "Embrace graceful elegance with this stunning sky blue designer saree , crafted in luxurious Fendy satin fabric that offers a rich sheen, soft texture, and beaut...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71142.jpg?v=1780393601",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71156.jpg?v=1780393602",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71157.jpg?v=1780393602",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71151.jpg?v=1780393602",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71147.jpg?v=1780393602",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71152.jpg?v=1780393602",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71155.jpg?v=1780393602",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71138.jpg?v=1780393601",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71159.jpg?v=1780393602"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964515418",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 28 AQUA BLUE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71142.jpg?v=1780393601"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT028",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:38+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480646234",
    "title": "Lavender Purple Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "lavender-purple-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 28 MAUVE",
    "code": "EV-7934480646234",
    "description": "Add a touch of dreamy elegance to your festive wardrobe with this beautiful lavender purple designer saree , crafted in luxurious Fendy satin fabric known for its rich shine, silky texture, and graceful drape. This saree is beautifully detailed with delicate white floral embroidery work spread elegantly across the saree, adding subtle sophistication and timeless feminine charm. The embroidery enhances the saree’s luxurious appeal while maintaining a lightweight and flowy silhouette. The main highlight is the stunning heavy floral embroidered lace border , intricately crafted with white floral thread embroidery that beautifully frames the saree with designer elegance. The richly embroidered pallu further enhances its graceful festive appearance, making it perfect for statement occasion wear styling. Its soothing lavender purple shade reflects modern sophistication, softness, and regal beauty, making this saree an ideal choice for weddings, receptions, engagement functions, festive celebrations, cocktail parties, pooja events, and elegant traditional gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for both contemporary and classic ethnic looks. The smooth satin texture and fluid drape provide all-day comfort while creating a luxurious and effortlessly elegant silhouette. Key Details: Saree Color: Lavender Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Smooth & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive occasions, engagement ceremonies, cocktail parties, family gatherings, pooja functions, and elegant party wear styling . Style Tips: Pair with diamond, pearl, silver-toned, or kundan jewellery for a graceful festive appearance Style with soft glam makeup, loose curls, and embellished heels for a sophisticated ethnic look Carry a designer clutch or embellished potli bag to complete the ensemble Ideal for both daytime elegance and evening celebrations This saree beautifully blends luxurious satin shine with delicate floral embroidery artistry , making it a timeless addition to your festive and designer saree collection.",
    "shortDescription": "Add a touch of dreamy elegance to your festive wardrobe with this beautiful lavender purple designer saree , crafted in luxurious Fendy satin fabric known for i...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71233.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1246.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71247.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71238.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1237.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71244.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71245.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71229.jpg?v=1780393600",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71249.jpg?v=1780393600"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964482650",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 28 MAUVE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71233.jpg?v=1780393600"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT028",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:37+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480613466",
    "title": "Pista Green Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "pista-green-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 28 OLIVE GREEN",
    "code": "EV-7934480613466",
    "description": "Refresh your festive wardrobe with this elegant pista green designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen, silky smooth texture, and graceful flowy drape. This saree is delicately enhanced with intricate white floral embroidery work spread elegantly across the saree, creating a refined and timeless ethnic look. The subtle floral embroidery adds sophistication while maintaining a lightweight and effortlessly graceful appearance. The highlight of this saree is its beautifully detailed heavy floral embroidered lace border , crafted with elegant white floral thread embroidery that gives the saree a premium designer finish. The embroidered pallu further enhances its festive and luxurious charm, making it perfect for statement occasion wear styling. Its soothing pista green shade reflects freshness, elegance, and modern femininity, making this saree an ideal choice for weddings, festive celebrations, engagement ceremonies, receptions, cocktail events, pooja functions, and family gatherings. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both traditional and contemporary ethnic looks. The smooth satin finish and fluid drape ensure all-day comfort while creating a rich and elegant silhouette perfect for festive occasions. Key Details: Saree Color: Pista Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Smooth & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, cocktail parties, pooja functions, family occasions, and elegant party wear styling . Style Tips: Pair with diamond, pearl, kundan, or silver-toned jewellery for a graceful festive look Style with soft curls, glowing makeup, and embellished heels for a sophisticated ethnic appearance Carry a designer clutch or embroidered potli bag to complete the ensemble Ideal for both daytime festivities and evening celebrations This saree beautifully combines luxurious satin elegance with delicate floral embroidery craftsmanship , making it a timeless addition to your festive and designer saree collection.",
    "shortDescription": "Refresh your festive wardrobe with this elegant pista green designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich sheen, silky...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71188.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71201.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71202.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71196.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71190.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71198.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71199.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71200.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71184.jpg?v=1780393598",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71204.jpg?v=1780393598"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964449882",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 28 OLIVE GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71188.jpg?v=1780393598"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT028",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:35+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480580698",
    "title": "Peach Orange Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "peach-orange-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 28 ORANGE",
    "code": "EV-7934480580698",
    "description": "Radiate graceful festive charm with this stunning peach orange designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich glossy finish, silky texture, and elegant fluid drape. This saree is delicately adorned with intricate white floral embroidery work spread artistically across the saree, creating a refined and sophisticated ethnic appeal. The subtle floral detailing enhances the saree’s elegance while maintaining a lightweight and graceful silhouette. The highlight of this saree is its beautifully crafted heavy floral embroidered lace border , featuring intricate white floral thread embroidery that frames the saree with luxurious designer craftsmanship. The richly embroidered pallu adds extra festive richness and flowing elegance to the overall look. Its refreshing peach orange shade reflects warmth, femininity, and festive vibrance, making it an ideal choice for weddings, festive celebrations, engagement ceremonies, receptions, cocktail parties, pooja functions, and elegant family gatherings. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both traditional and contemporary ethnic looks. The smooth satin texture and soft drape ensure all-day comfort while giving a rich and effortlessly elegant appearance perfect for special occasions. Key Details: Saree Color: Peach Orange Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Smooth & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, cocktail parties, pooja functions, family gatherings, and elegant celebration wear styling . Style Tips: Pair with kundan, pearl, diamond, or pastel stone jewellery for a graceful festive appearance Style with soft curls, glowing makeup, and embellished heels for a modern ethnic look Carry a designer clutch or embroidered potli bag to complete the festive ensemble Ideal for both daytime celebrations and elegant evening occasions This saree beautifully blends luxurious satin elegance with delicate floral embroidery artistry , making it a timeless and sophisticated addition to your festive and designer saree collection.",
    "shortDescription": "Radiate graceful festive charm with this stunning peach orange designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich glossy fi...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71278.jpg?v=1780393597",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71290.jpg?v=1780393596",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71291.jpg?v=1780393596",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71283.jpg?v=1780393596",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71281.jpg?v=1780393596",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71288.jpg?v=1780393597",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71289.jpg?v=1780393596",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71274.jpg?v=1780393596",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71293.jpg?v=1780393596"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964417114",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 28 ORANGE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71278.jpg?v=1780393597"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT028",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:33+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480547930",
    "title": "Baby Pink Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "baby-pink-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 28 PEACH PINK",
    "code": "EV-7934480547930",
    "description": "Step into graceful elegance with this stunning baby pink designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich glossy finish, silky smooth texture, and an effortlessly flowy drape. This saree is delicately enhanced with elegant white floral embroidery work spread artistically across the saree, creating a soft and sophisticated ethnic appeal. The subtle floral detailing adds timeless feminine charm while maintaining a lightweight and graceful silhouette. The highlight of this saree is its beautifully detailed heavy floral embroidered lace border , crafted with intricate white floral thread embroidery that adds luxurious designer elegance to the saree. The richly embroidered pallu further enhances its festive beauty and graceful drape. Its soothing baby pink shade reflects softness, elegance, and modern femininity, making this saree an ideal choice for weddings, festive celebrations, engagement ceremonies, receptions, cocktail parties, pooja functions, and elegant family gatherings. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both contemporary and traditional ethnic looks. The smooth satin finish and soft drape ensure all-day comfort while creating a refined and luxurious festive appearance. Key Details: Saree Color: Baby Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Smooth & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, cocktail parties, pooja functions, family occasions, and elegant party wear styling . Style Tips: Pair with diamond, pearl, pastel stone, or kundan jewellery for a graceful festive look Style with soft curls, rosy makeup, and embellished heels for a sophisticated ethnic appearance Carry a designer clutch or embroidered potli bag to complete the festive ensemble Ideal for both daytime elegance and evening celebrations This saree beautifully combines luxurious satin elegance with delicate floral embroidery craftsmanship , making it a timeless and sophisticated addition to your festive and designer saree collection.",
    "shortDescription": "Step into graceful elegance with this stunning baby pink designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich glossy finish, ...",
    "price": 4399,
    "compareAtPrice": 13197,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71320.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71332.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71333.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI330.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71324.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71325.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71328.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71331.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71316.jpg?v=1780393595",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1335.jpg?v=1780393595"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964384346",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4399,
        "compareAtPrice": 13197,
        "inStock": true,
        "sku": "AT 28 PEACH PINK",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI71320.jpg?v=1780393595"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT028",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:31+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480515162",
    "title": "Powder Blue Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "powder-blue-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 29 AQUA BLUE",
    "code": "EV-7934480515162",
    "description": "Elevate your festive wardrobe with this graceful powder blue designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich glossy finish, silky smooth texture, and an effortlessly elegant drape. This saree is delicately adorned with intricate white floral embroidery work spread artistically across the saree, adding subtle sophistication and timeless ethnic charm. The elegant floral detailing enhances the saree’s luxurious appeal while maintaining a lightweight and flowy silhouette. The highlight of this saree is its beautifully crafted heavy floral embroidered lace border , featuring detailed white floral thread embroidery that adds premium designer elegance to the saree. The richly embroidered pallu further enhances its festive beauty and graceful flowing appearance. Its soothing powder blue shade reflects calm elegance, femininity, and modern sophistication, making it an ideal choice for weddings, receptions, festive celebrations, engagement ceremonies, cocktail parties, pooja functions, and elegant family gatherings. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both contemporary and traditional ethnic looks. The soft satin finish and fluid drape ensure all-day comfort while creating a rich and effortlessly elegant festive appearance. Key Details: Saree Color: Powder Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Embroidered Floral Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Smooth & Glossy Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, cocktail parties, pooja functions, family gatherings, and elegant party wear styling . Style Tips: Pair with diamond, pearl, silver-toned, or pastel stone jewellery for a graceful festive appearance Style with soft curls, dewy makeup, and embellished heels for a sophisticated ethnic look Carry a designer clutch or embroidered potli bag to complete the ensemble Ideal for both daytime festivities and evening celebrations This saree beautifully blends luxurious satin elegance with delicate floral embroidery artistry , making it a timeless and sophisticated addition to your festive and designer saree collection.",
    "shortDescription": "Elevate your festive wardrobe with this graceful powder blue designer saree , beautifully crafted in luxurious Fendy satin fabric that offers a rich glossy fini...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91474.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91487.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91490.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91481.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91478.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91483.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91485.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91471.jpg?v=1780393593",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91492.jpg?v=1780393593"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964351578",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 29 AQUA BLUE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91474.jpg?v=1780393593"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT029",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:30+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480482394",
    "title": "Lavender Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "lavender-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse-1",
    "sku": "AT 29 MAUVE",
    "code": "EV-7934480482394",
    "description": "Step into timeless elegance with this enchanting lavender designer saree , beautifully crafted in premium Fendy satin fabric that offers a luxurious sheen, silky-soft texture, and graceful fluid drape. This stunning saree is delicately embellished with elegant white floral embroidery motifs scattered artistically throughout the saree, creating a refined and sophisticated festive appearance. The intricate embroidery enhances the richness of the saree while maintaining its lightweight and graceful charm. The highlight of this saree is its beautifully designed heavy floral embroidered lace border , featuring detailed white thread floral embroidery that adds royal elegance and luxurious designer appeal. The richly embroidered pallu flows gracefully, making the saree look effortlessly glamorous and festive. Its soothing lavender shade symbolizes femininity, grace, and modern sophistication, making it a perfect choice for weddings, receptions, engagement functions, festive celebrations, cocktail parties, sangeet nights, pooja ceremonies, and elegant evening gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both traditional and contemporary ethnic looks. The smooth satin finish and lightweight drape provide exceptional comfort while delivering a rich and premium festive appearance. Key Details: Saree Color: Lavender Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, cocktail parties, sangeet functions, family gatherings, and elegant ethnic occasions . Style Tips: Pair with diamond, silver, pearl, or pastel stone jewellery for a sophisticated festive look Style with soft curls, glowing makeup, and embellished heels for a graceful ethnic appearance Carry a designer clutch or embroidered potli bag to complete the ensemble Ideal for both daytime festivities and evening celebrations This saree beautifully blends luxurious satin elegance with intricate floral embroidery artistry , making it a graceful and timeless addition to your festive and designer saree wardrobe.",
    "shortDescription": "Step into timeless elegance with this enchanting lavender designer saree , beautifully crafted in premium Fendy satin fabric that offers a luxurious sheen, silk...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91383.jpg?v=1780393591",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91399.jpg?v=1780393591",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91400.jpg?v=1780393591",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91380.jpg?v=1780393591",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91389.jpg?v=1780393591",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91392.jpg?v=1780393592",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91393.jpg?v=1780393591",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91397.jpg?v=1780393591",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91398.jpg?v=1780393592",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91403.jpg?v=1780393591"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964318810",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 29 MAUVE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91383.jpg?v=1780393591"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT029",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:28+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480449626",
    "title": "Pista Green Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "pista-green-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse-1",
    "sku": "AT 29 OLIVE GREEN",
    "code": "EV-7934480449626",
    "description": "Elevate your festive elegance with this breathtaking pista green designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy texture, silky softness, and graceful drape. This exquisite saree features delicate white floral embroidery motifs spread elegantly across the saree, adding subtle sophistication and timeless charm. The intricate embroidery beautifully complements the lustrous satin finish, creating a regal yet modern festive look. The saree is highlighted with a stunning heavy floral embroidered lace border , intricately designed with detailed white thread floral embroidery that enhances the saree’s luxurious appearance. The richly embroidered pallu adds graceful movement and designer elegance to every step. Its soothing and refreshing pista green shade symbolizes freshness, grace, and refined beauty, making this saree a perfect choice for weddings, festive celebrations, receptions, engagement ceremonies, pooja functions, cocktail evenings, and elegant ethnic gatherings. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both classic traditional looks and contemporary designer drapes. The lightweight satin texture ensures comfortable wear while maintaining a rich festive appearance throughout the occasion. Key Details: Saree Color: Pista Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive functions, receptions, engagement ceremonies, haldi events, pooja celebrations, family gatherings, cocktail parties, and elegant ethnic occasions . Style Tips: Pair with kundan, pearl, silver, or emerald jewellery for a sophisticated festive look Style with soft curls, glowing makeup, and embellished heels for graceful ethnic styling Carry a designer clutch or embroidered potli bag to complete the outfit Ideal for both daytime festivities and evening celebrations This elegant saree beautifully blends luxurious satin shine with intricate floral embroidery artistry , making it a timeless and graceful addition to your festive and designer saree collection.",
    "shortDescription": "Elevate your festive elegance with this breathtaking pista green designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91431.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91443.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91444.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91437.jpg?v=1780393592",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91435.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91439.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91441.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91442.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91428.jpg?v=1780393590",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91447.jpg?v=1780393591"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964286042",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 29 OLIVE GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91431.jpg?v=1780393590"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT029",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:27+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480416858",
    "title": "Peach Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "peach-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 29 ORANGE",
    "code": "EV-7934480416858",
    "description": "Radiate graceful elegance with this mesmerizing peach designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy finish, silky-soft feel, and fluid drape. This stunning saree is adorned with delicate white floral embroidery motifs spread elegantly throughout the saree, creating a sophisticated and timeless festive appeal. The subtle embroidery work perfectly complements the luminous satin texture, adding a touch of refined luxury to the ensemble. The highlight of this saree is its intricately designed heavy floral embroidered lace border , featuring detailed white thread embroidery inspired by blooming floral artistry. The beautifully embroidered border and designer pallu add regal elegance and graceful movement to every drape. Its soothing and feminine peach shade reflects charm, freshness, and contemporary sophistication, making this saree a perfect choice for weddings, festive celebrations, receptions, engagement ceremonies, haldi functions, cocktail evenings, pooja gatherings, and elegant ethnic occasions. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both traditional and modern festive looks. The lightweight satin texture ensures all-day comfort while maintaining a luxurious and rich festive appearance. Key Details: Saree Color: Peach Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, engagement ceremonies, haldi events, receptions, family gatherings, pooja celebrations, cocktail parties, and elegant ethnic functions . Style Tips: Pair with diamond, pearl, kundan, or pastel stone jewellery for an elegant festive appearance Style with soft curls, dewy makeup, and embellished heels for graceful ethnic styling Carry a designer clutch or embroidered potli bag to complete the festive look Perfect for both daytime celebrations and evening festive gatherings This elegant saree beautifully combines luxurious satin shine with intricate floral embroidery craftsmanship , making it a timeless and sophisticated addition to your festive and designer saree collection.",
    "shortDescription": "Radiate graceful elegance with this mesmerizing peach designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy fin...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91518.jpg?v=1780393588",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91530.jpg?v=1780393589",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91532.jpg?v=1780393588",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91525.jpg?v=1780393589",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91522.jpg?v=1780393588",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91528.jpg?v=1780393589",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91529.jpg?v=1780393589",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91515.jpg?v=1780393588",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91534.jpg?v=1780393589"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964253274",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 29 ORANGE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91518.jpg?v=1780393588"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT029",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:25+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480384090",
    "title": "Baby Pink Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "baby-pink-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse-1",
    "sku": "AT 29 PEACH PINK",
    "code": "EV-7934480384090",
    "description": "Embrace graceful femininity with this stunning baby pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy shine, silky-soft texture, and elegant fluid drape. This exquisite saree is adorned with delicate white floral embroidery motifs scattered beautifully across the saree, adding subtle sophistication and timeless festive charm. The elegant embroidery perfectly complements the luminous satin finish, creating a refined and luxurious ethnic look. The highlight of this saree is its intricately crafted heavy floral embroidered lace border , featuring detailed white thread floral embroidery inspired by blooming floral artistry. The richly embroidered border and flowing designer pallu enhance the saree’s regal elegance and graceful movement. Its soft and romantic baby pink shade symbolizes elegance, charm, and modern sophistication, making this saree a perfect choice for weddings, receptions, engagement ceremonies, festive celebrations, cocktail parties, pooja functions, and elegant ethnic occasions. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for both traditional and contemporary festive looks. The lightweight satin texture ensures all-day comfort while maintaining a premium and glamorous appearance throughout the occasion. Key Details: Saree Color: Baby Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive functions, receptions, engagement ceremonies, cocktail parties, pooja celebrations, family gatherings, and elegant ethnic occasions . Style Tips: Pair with diamond, pearl, silver, or pastel stone jewellery for a graceful festive appearance Style with soft curls, glossy makeup, and embellished heels for elegant ethnic styling Carry a designer clutch or embroidered potli bag to complete the festive ensemble Ideal for both daytime celebrations and evening events This elegant saree beautifully combines luxurious satin shine with intricate floral embroidery craftsmanship , making it a timeless and sophisticated addition to your festive and designer saree collection.",
    "shortDescription": "Embrace graceful femininity with this stunning baby pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy ...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91540.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91553.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91554.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91547.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91541.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91548.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91551.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91552.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91535.jpg?v=1780393587",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91557.jpg?v=1780393587"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964220506",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 29 PEACH PINK",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91540.jpg?v=1780393587"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT029",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:23+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480351322",
    "title": "Bottle Green Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "bottle-green-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 30 GREEN",
    "code": "EV-7934480351322",
    "description": "Drape yourself in timeless sophistication with this stunning bottle green designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy texture, silky softness, and graceful fluid drape. This elegant saree is adorned with delicate white floral embroidery motifs scattered artistically across the saree, adding refined charm and subtle festive elegance. The intricate embroidery perfectly complements the lustrous satin finish, creating a regal and premium ethnic look. The highlight of this saree is its beautifully crafted heavy floral embroidered lace border , featuring intricate white floral thread embroidery inspired by blooming roses. The richly detailed embroidered border enhances the saree’s luxurious appearance and gives the flowing pallu a graceful designer finish. Its deep and rich bottle green shade symbolizes royalty, elegance, and festive sophistication, making this saree a perfect choice for weddings, receptions, festive celebrations, engagement ceremonies, cocktail evenings, pooja functions, and grand ethnic occasions. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both traditional and contemporary festive looks. The lightweight satin texture ensures exceptional comfort while maintaining a glamorous and premium appearance throughout the celebration. Key Details: Saree Color: Bottle Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive functions, receptions, engagement ceremonies, cocktail parties, pooja celebrations, family gatherings, and elegant ethnic occasions . Style Tips: Pair with diamond, emerald, kundan, or pearl jewellery for a regal festive appearance Style with soft curls, smokey eye makeup, and embellished heels for glamorous ethnic styling Carry a designer clutch or embroidered potli bag to complete the look Perfect for both daytime celebrations and evening festive gatherings This elegant saree beautifully blends luxurious satin shine with intricate floral embroidery craftsmanship , making it a timeless and sophisticated addition to your festive and designer saree wardrobe.",
    "shortDescription": "Drape yourself in timeless sophistication with this stunning bottle green designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offe...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110180.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10192.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10194.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0190.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10184.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10185.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10191.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110176.jpg?v=1780393585",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10196.jpg?v=1780393585"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964187738",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 30 GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110180.jpg?v=1780393585"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT030",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:22+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480318554",
    "title": "Wine Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "wine-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 30 MAROON",
    "code": "EV-7934480318554",
    "description": "Make a grand festive statement with this luxurious wine designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, silky-soft texture, and graceful fluid drape. This elegant saree is adorned with delicate white floral embroidery motifs spread artistically throughout the saree, adding refined sophistication and timeless festive charm. The intricate embroidery beautifully contrasts against the deep wine shade, creating a rich and regal designer look. The highlight of this saree is its stunning heavy floral embroidered lace border , featuring intricately designed white floral thread embroidery inspired by blooming rose patterns. The richly embroidered border and flowing pallu elevate the saree’s luxurious appearance and create graceful movement with every drape. Its rich and elegant wine color symbolizes royalty, glamour, and timeless beauty, making this saree a perfect choice for weddings, receptions, festive celebrations, engagement ceremonies, cocktail parties, sangeet nights, pooja functions, and grand ethnic occasions. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for both traditional and contemporary festive looks. The lightweight satin texture ensures exceptional comfort while maintaining a premium and glamorous appearance throughout the celebration. Key Details: Saree Color: Wine Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Lace Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive functions, receptions, engagement ceremonies, cocktail parties, sangeet nights, pooja celebrations, family gatherings, and elegant ethnic occasions . Style Tips: Pair with diamond, kundan, ruby stone, or pearl jewellery for a regal festive appearance Style with soft curls, bold eye makeup, and embellished heels for glamorous ethnic styling Carry a designer clutch or embroidered potli bag to complete the festive ensemble Ideal for both daytime festivities and evening celebrations This elegant saree beautifully combines luxurious satin shine with intricate floral embroidery craftsmanship , making it a timeless and sophisticated addition to your festive and designer saree collection.",
    "shortDescription": "Make a grand festive statement with this luxurious wine designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, sil...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10267.jpg?v=1780393583",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10279.jpg?v=1780393584",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10281.jpg?v=1780393584",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10274.jpg?v=1780393583",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10271.jpg?v=1780393584",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10275.jpg?v=1780393583",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10276.jpg?v=1780393583",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110277.jpg?v=1780393584",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110263.jpg?v=1780393583",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110282.jpg?v=1780393583"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964154970",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 30 MAROON",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10267.jpg?v=1780393583"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT030",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:20+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480285786",
    "title": "Royal Blue Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "royal-blue-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 30 RAMA",
    "code": "EV-7934480285786",
    "description": "Elevate your festive wardrobe with this stunning royal blue designer saree , crafted in luxurious premium Fendy satin fabric that offers a rich glossy texture, graceful drape, and elegant fluid finish. This exquisite saree is beautifully enhanced with intricate white floral embroidery motifs delicately spread across the saree, creating a sophisticated and timeless designer appeal. The detailed floral thread embroidery contrasts beautifully against the deep royal blue shade, adding richness and elegance to the entire look. The major highlight of this saree is its breathtaking heavy floral embroidered border , designed with beautifully crafted blooming rose-inspired embroidery patterns running across the border and pallu. The intricate detailing gives the saree a luxurious festive appearance while maintaining graceful elegance. The rich and vibrant royal blue color symbolizes confidence, sophistication, and grandeur, making this saree a perfect choice for weddings, festive occasions, receptions, engagement functions, cocktail parties, sangeet ceremonies, family celebrations, and evening events. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both modern and traditional ethnic looks. Its lightweight satin texture ensures all-day comfort while offering a glamorous designer silhouette with every drape. Key Details: Saree Color: Royal Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Floral Embroidered Lace Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive functions, engagement ceremonies, cocktail parties, pooja celebrations, anniversary dinners, evening events, and grand ethnic gatherings . Style Tips: Pair with diamond jewellery, kundan sets, silver oxidized jewellery, or pearl accessories for a regal festive look Style with soft curls, shimmer makeup, and embellished heels for elegant party styling Carry a designer clutch or potli bag to complete the luxurious ethnic appearance Ideal for both day and evening festive occasions This elegant saree beautifully blends luxurious satin shine with intricate floral embroidery artistry , making it a timeless statement piece for women who love sophisticated festive fashion.",
    "shortDescription": "Elevate your festive wardrobe with this stunning royal blue designer saree , crafted in luxurious premium Fendy satin fabric that offers a rich glossy texture, ...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0136.jpg?v=1780393582",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0148.jpg?v=1780393582",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0149.jpg?v=1780393582",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0141.jpg?v=1780393582",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0140.jpg?v=1780393582",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0146.jpg?v=1780393582",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0147.jpg?v=1780393582",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0131.jpg?v=1780393581",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0151.jpg?v=1780393582"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964122202",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 30 RAMA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0136.jpg?v=1780393582"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT030",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:18+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480253018",
    "title": "Ruby Red Fendy Satin Saree with White Floral Embroidery Border | Designer Party Wear Saree with Matching Blouse",
    "slug": "ruby-red-fendy-satin-saree-with-white-floral-embroidery-border-designer-party-wear-saree-with-matching-blouse",
    "sku": "AT 30 RED",
    "code": "EV-7934480253018",
    "description": "Step into timeless elegance with this breathtaking ruby red designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful drape, glossy sheen, and ultra-soft lightweight texture. This exquisite saree is adorned with intricate white floral embroidery work , delicately placed across the saree to create a rich and sophisticated festive appeal. The elegant floral thread embroidery beautifully contrasts with the vibrant ruby red base, giving the saree a regal and eye-catching look. The highlight of this saree is its stunning heavy floral embroidered border , featuring large blooming rose-inspired embroidery motifs running elegantly throughout the border and pallu. The detailed craftsmanship enhances the saree with a luxurious designer finish, making it a true statement piece for grand celebrations. The rich ruby red shade symbolizes love, celebration, elegance, and festive grandeur, making this saree an ideal choice for weddings, receptions, festive occasions, engagement ceremonies, cocktail events, anniversary celebrations, and traditional gatherings. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both modern and traditional ethnic looks. Its flowing satin texture combined with detailed floral embroidery creates a perfect blend of glamour, elegance, and sophistication. Key Details: Saree Color: Ruby Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Rose Floral Embroidered Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement parties, cocktail functions, sangeet nights, pooja ceremonies, anniversary events, and elegant evening gatherings . Style Tips: Pair with kundan jewellery, diamond accessories, pearl chokers, or silver oxidized sets for a regal festive look Style with soft curls, bold lips, shimmer makeup, and embellished heels for glamorous occasion wear Carry a designer clutch or embroidered potli bag to complete the luxurious ethnic ensemble Perfect for both traditional celebrations and modern festive styling This elegant saree beautifully combines the richness of luxurious satin shine with intricate floral embroidery artistry , creating a sophisticated festive masterpiece designed for women who love graceful designer ethnic wear.",
    "shortDescription": "Step into timeless elegance with this breathtaking ruby red designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful ...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110310.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10324.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10326.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10320.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110313.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10321.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110317.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110323.jpg?v=1780393580",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110306.jpg?v=1780393579",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110327.jpg?v=1780393580"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964089434",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 30 RED",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110310.jpg?v=1780393580"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT030",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:16+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480220250",
    "title": "Royal Purple Fendy Satin Saree with White Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "royal-purple-fendy-satin-saree-with-white-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse-1",
    "sku": "AT 30 WINE",
    "code": "EV-7934480220250",
    "description": "Add regal charm to your festive wardrobe with this stunning royal purple designer saree , crafted in luxurious premium Fendy satin fabric that offers a rich glossy finish, soft lightweight feel, and graceful flowing drape. This elegant saree is beautifully detailed with intricate white floral embroidery work spread delicately across the saree, creating a sophisticated and luxurious ethnic look. The fine floral embroidery contrasts beautifully against the deep royal purple shade, giving the saree a rich designer appeal. The major highlight of this saree is its magnificent heavy floral embroidered border , featuring beautifully crafted blooming rose-inspired embroidery motifs running throughout the border and pallu. The intricate craftsmanship adds grandeur and timeless elegance, making this saree a perfect statement outfit for special occasions. The rich royal purple color symbolizes luxury, elegance, grace, and sophistication, making this saree an ideal choice for weddings, receptions, festive functions, cocktail parties, engagement ceremonies, anniversary celebrations, and grand ethnic gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for both traditional and contemporary festive looks. Its premium satin texture combined with elegant floral embroidery creates a perfect fusion of glamour and timeless ethnic beauty. Key Details: Saree Color: Royal Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: White Floral Thread Embroidery Border: Heavy Rose Floral Embroidered Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, engagement ceremonies, receptions, cocktail parties, pooja functions, family gatherings, anniversary events, and elegant evening occasions . Style Tips: Pair with diamond jewellery, kundan chokers, pearl accessories, or oxidized silver jewellery for a regal festive look Style with soft curls, shimmer makeup, bold eyes, and embellished heels for glamorous occasion wear Carry a designer clutch or embroidered potli bag to complete the sophisticated ethnic ensemble Ideal for both traditional festive styling and modern party looks This elegant saree beautifully combines the richness of luxurious satin shine with intricate floral embroidery artistry , making it a timeless designer piece for women who love graceful and sophisticated ethnic fashion.",
    "shortDescription": "Add regal charm to your festive wardrobe with this stunning royal purple designer saree , crafted in luxurious premium Fendy satin fabric that offers a rich glo...",
    "price": 4899,
    "compareAtPrice": 14697,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110223.jpg?v=1780393578",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10236.jpg?v=1780393579",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110238.jpg?v=1780393578",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10230.jpg?v=1780393578",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110227.jpg?v=1780393578",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10231.jpg?v=1780393578",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10234.jpg?v=1780393578",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110233.jpg?v=1780393579",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10219.jpg?v=1780393578",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI10240.jpg?v=1780393578"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441964056666",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 4899,
        "compareAtPrice": 14697,
        "inStock": true,
        "sku": "AT 30 WINE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI110223.jpg?v=1780393578"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT030",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:14+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480187482",
    "title": "Sage Green Fendy Satin Saree with Multicolor Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "sage-green-fendy-satin-saree-with-multicolor-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 31 DUSTY GREEN",
    "code": "EV-7934480187482",
    "description": "Bring timeless sophistication to your festive collection with this stunning sage green designer saree , beautifully crafted in luxurious premium Fendy satin fabric known for its rich shine, smooth texture, and graceful flowing drape. This elegant saree is adorned with delicate multicolor floral embroidery work intricately designed across the borders and motifs throughout the saree, creating a refined and luxurious ethnic appearance. The soft pastel floral embroidery beautifully complements the elegant sage green base, giving the saree a fresh, graceful, and premium designer appeal. The major highlight of this saree is its breathtaking heavy floral embroidered border , featuring detailed blooming floral vine patterns enhanced with subtle multicolor threadwork and intricate embroidery craftsmanship. The beautifully embroidered pallu adds richness and grandeur, making the saree ideal for special festive and celebratory occasions. The soothing sage green shade reflects elegance, freshness, and royal sophistication, making this saree a perfect choice for weddings, receptions, engagement ceremonies, festive celebrations, cocktail functions, pooja events, and elegant family gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both modern and traditional ethnic looks. Its lightweight satin texture ensures all-day comfort while delivering a glamorous and luxurious festive silhouette. Key Details: Saree Color: Sage Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Floral Embroidered Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, cocktail parties, anniversary celebrations, pooja functions, family events, and elegant evening gatherings . Style Tips: Pair with kundan jewellery, pastel stone accessories, pearls, or diamond jewellery for a regal festive look Style with soft curls, dewy makeup, shimmer eyes, and embellished heels for graceful occasion wear Carry a designer clutch or embroidered potli bag to complete the luxurious ethnic ensemble Ideal for both daytime festive elegance and evening celebration styling This elegant saree beautifully combines the richness of luxurious satin shine with intricate floral embroidery artistry , making it a timeless designer piece for women who love graceful, sophisticated, and premium ethnic fashion.",
    "shortDescription": "Bring timeless sophistication to your festive collection with this stunning sage green designer saree , beautifully crafted in luxurious premium Fendy satin fab...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91629.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91641.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91643.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91634.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91631.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91639.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91640.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91625.jpg?v=1780393576",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91645.jpg?v=1780393576"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441964023898",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 31 DUSTY GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91629.jpg?v=1780393576"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT031",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:13+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480154714",
    "title": "Lavender Gold Fendy Satin Saree with Multicolor Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "lavender-gold-fendy-satin-saree-with-multicolor-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 31 MAUVE",
    "code": "EV-7934480154714",
    "description": "Experience timeless elegance with this luxurious lavender gold designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, fluid drape, and lightweight graceful texture. This exquisite saree is adorned with delicate multicolor floral embroidery work intricately detailed across the border and scattered motifs throughout the saree, creating a sophisticated and regal ethnic appearance. The beautiful combination of soft lavender tones blended with subtle golden sheen gives this saree a rich contemporary designer appeal. The major highlight of this saree is its breathtaking heavy floral embroidered border , beautifully enhanced with intricate floral vine embroidery and pastel multicolor thread detailing. The elegant embroidered pallu further adds grandeur and festive charm, making this saree a statement piece for special occasions. The graceful lavender gold shade reflects femininity, sophistication, luxury, and festive elegance, making this saree an ideal choice for weddings, receptions, engagement ceremonies, cocktail parties, festive celebrations, anniversary dinners, and elegant family gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling options suitable for both modern and traditional festive looks. Its luxurious satin shine combined with detailed floral embroidery craftsmanship creates a perfect balance of glamour and timeless ethnic beauty. Key Details: Saree Color: Lavender Gold Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Floral Embroidered Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, cocktail functions, anniversary celebrations, pooja events, family gatherings, and grand evening parties . Style Tips: Pair with diamond jewellery, pastel stone accessories, pearls, or kundan sets for an elegant festive look Style with soft curls, glowing makeup, shimmer eyes, and embellished heels for graceful occasion wear Carry a designer clutch or embroidered potli bag to complete the luxurious ethnic ensemble Ideal for both daytime elegance and glamorous evening celebrations This elegant saree beautifully blends the richness of luxurious satin shine with intricate floral embroidery artistry , making it a timeless designer masterpiece for women who love graceful and sophisticated ethnic fashion.",
    "shortDescription": "Experience timeless elegance with this luxurious lavender gold designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy fini...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0046.jpg?v=1780393574",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90060.jpg?v=1780393577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90059.jpg?v=1780393575",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90062.jpg?v=1780393575",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90055.jpg?v=1780393575",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90051.jpg?v=1780393574",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90058.jpg?v=1780393574",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90043.jpg?v=1780393575",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90063.jpg?v=1780393575"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963991130",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 31 MAUVE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0046.jpg?v=1780393574"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT031",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:11+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480121946",
    "title": "Olive Green Fendy Satin Saree with Multicolor Floral Embroidery Border | Designer Festive Party Wear Saree with Blouse",
    "slug": "olive-green-fendy-satin-saree-with-multicolor-floral-embroidery-border-designer-festive-party-wear-saree-with-blouse",
    "sku": "AT 31 OLIVE GREEN",
    "code": "EV-7934480121946",
    "description": "Elevate your ethnic wardrobe with this luxurious olive green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, graceful drape, and elegant lightweight finish. This stunning saree is adorned with delicate multicolor floral embroidery work intricately detailed across the border and subtle embroidered motifs spread throughout the saree, creating a sophisticated and graceful festive appeal. The beautiful pastel floral embroidery perfectly complements the rich olive green shade, giving the saree a premium designer look. The major highlight of this saree is its breathtaking heavy floral embroidered border , beautifully enhanced with intricate floral vine patterns and elegant multicolor threadwork. The richly embroidered pallu further adds grandeur and luxurious charm, making this saree an ideal statement piece for weddings and festive occasions. The elegant olive green shade symbolizes grace, prosperity, sophistication, and timeless beauty, making this saree a perfect choice for weddings, receptions, festive celebrations, engagement functions, cocktail parties, anniversary events, pooja ceremonies, and grand family gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling options suitable for both traditional and contemporary ethnic looks. Its smooth satin texture combined with detailed floral embroidery craftsmanship creates a perfect balance of glamour and elegance. Key Details: Saree Color: Olive Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Floral Embroidered Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, cocktail parties, pooja celebrations, anniversary events, family gatherings, and elegant evening functions . Style Tips: Pair with kundan jewellery, emerald stone accessories, pearls, or diamond jewellery for a regal festive look Style with soft curls, glowing makeup, shimmer eyes, and embellished heels for graceful occasion styling Carry a designer clutch or embroidered potli bag to complete the luxurious ethnic ensemble Ideal for both daytime festivities and glamorous evening celebrations This elegant saree beautifully blends the richness of luxurious satin shine with intricate floral embroidery artistry , making it a timeless designer masterpiece for women who love graceful and sophisticated ethnic fashion.",
    "shortDescription": "Elevate your ethnic wardrobe with this luxurious olive green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy textur...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91583.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91597.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI601.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91590.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91586.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91592.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91594.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91596.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91599.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91579.jpg?v=1780393573",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91603.jpg?v=1780393573"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963958362",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 31 OLIVE GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI91583.jpg?v=1780393573"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT031",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:09+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480089178",
    "title": "Peach Pink Fendy Satin Saree with Multicolor Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "peach-pink-fendy-satin-saree-with-multicolor-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 31 PEACH PINK",
    "code": "EV-7934480089178",
    "description": "Embrace timeless elegance with this beautifully crafted peach pink designer saree , designed in luxurious premium Fendy satin fabric that offers a rich glossy finish, graceful drape, and lightweight comfort for all-day wear. This exquisite saree is adorned with delicate multicolor floral embroidery work intricately designed across the border and scattered embroidered motifs throughout the saree, creating a sophisticated and luxurious festive appearance. The elegant floral thread embroidery beautifully complements the soft peach pink shade, giving the saree a graceful and premium designer look. The major highlight of this saree is its stunning heavy floral embroidered border , beautifully enhanced with intricate floral vine patterns and subtle pastel multicolor detailing. The richly embroidered pallu adds grandeur and elegance, making this saree a perfect choice for festive and celebratory occasions. The elegant peach pink shade reflects femininity, charm, sophistication, and festive grace, making this saree ideal for weddings, receptions, engagement ceremonies, festive celebrations, cocktail parties, anniversary events, pooja functions, and elegant family gatherings. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both traditional and modern ethnic looks. Its luxurious satin texture combined with delicate floral embroidery craftsmanship creates a perfect blend of glamour and timeless ethnic beauty. Key Details: Saree Color: Peach Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Floral Embroidered Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, cocktail parties, anniversary celebrations, pooja events, family gatherings, and elegant evening functions . Style Tips: Pair with diamond jewellery, pearl accessories, pastel stone jewellery, or kundan sets for a graceful festive look Style with soft curls, glowing makeup, shimmer eyes, and embellished heels for glamorous occasion wear Carry a designer clutch or embroidered potli bag to complete the luxurious ethnic ensemble Ideal for both daytime festive styling and elegant evening celebrations This elegant saree beautifully combines the richness of luxurious satin shine with intricate floral embroidery artistry , making it a timeless designer masterpiece for women who love graceful and sophisticated ethnic fashion.",
    "shortDescription": "Embrace timeless elegance with this beautifully crafted peach pink designer saree , designed in luxurious premium Fendy satin fabric that offers a rich glossy f...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90090.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90104.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0106.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0098.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90095.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0102.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90100.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90103.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90087.jpg?v=1780393571",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90107.jpg?v=1780393571"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963925594",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 31 PEACH PINK",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90090.jpg?v=1780393571"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT031",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:07+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934480056410",
    "title": "Mustard Yellow Fendy Satin Saree with Multicolor Floral Embroidery Border | Elegant Designer Party Wear Saree with Blouse",
    "slug": "mustard-yellow-fendy-satin-saree-with-multicolor-floral-embroidery-border-elegant-designer-party-wear-saree-with-blouse",
    "sku": "AT 31 YELLOW",
    "code": "EV-7934480056410",
    "description": "Radiate festive elegance with this stunning mustard yellow designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich sheen, fluid drape, and graceful silhouette perfect for special occasions. This exquisite saree is enhanced with intricate multicolor floral embroidery work delicately designed across the border and scattered embroidered motifs throughout the saree, creating a sophisticated and luxurious ethnic appeal. The beautifully embroidered floral detailing adds richness and artistic charm to the overall design. The highlight of this saree lies in its gorgeous heavy embroidered floral border , adorned with elegant floral vine patterns and pastel multicolor embroidery accents that elevate the saree’s festive grandeur. The intricately embellished pallu adds an extra layer of sophistication, making it an ideal choice for women who love refined and graceful ethnic fashion. The vibrant mustard yellow shade symbolizes joy, celebration, and traditional elegance, making this saree a perfect pick for weddings, haldi ceremonies, festive gatherings, receptions, pooja functions, engagement celebrations, and family occasions. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both traditional and contemporary looks. Its luxurious satin finish combined with delicate floral embroidery craftsmanship creates a perfect fusion of glamour, sophistication, and timeless ethnic beauty. Key Details: Saree Color: Mustard Yellow Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Designer Embroidered Border Pallu: Rich Embroidered Designer Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for haldi ceremonies, festive celebrations, weddings, receptions, engagement functions, pooja occasions, cocktail parties, anniversary events, and traditional family gatherings . Style Tips: Pair with kundan jewellery, pearl sets, temple jewellery, or pastel stone accessories for an elegant festive appearance Style with soft curls, glowing makeup, golden shimmer eyes, and embellished heels for a luxurious ethnic look Carry a designer clutch or embroidered potli bag to complete the festive ensemble Ideal for both daytime festive occasions and elegant evening celebrations This luxurious saree beautifully blends the richness of premium satin shine with delicate floral embroidery artistry , creating a timeless designer statement for women who appreciate graceful and sophisticated ethnic wear.",
    "shortDescription": "Radiate festive elegance with this stunning mustard yellow designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich sheen...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0004.jpg?v=1780393569",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90015.jpg?v=1780393570",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0016.jpg?v=1780393569",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0013.jpg?v=1780393569",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90007.jpg?v=1780393569",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90008.jpg?v=1780393569",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90011.jpg?v=1780393569",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0019.jpg?v=1780393569",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI90018.jpg?v=1780393569"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963892826",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 31 YELLOW",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0004.jpg?v=1780393569"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT031",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:06+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479990874",
    "title": "Sage Green Fendy Satin Saree with Floral Embroidery Border | Designer Party Wear Embroidered Saree with Blouse",
    "slug": "lavender-purple-fendy-satin-saree-with-floral-embroidery-border-designer-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 32 DUSTY GREEN",
    "code": "EV-7934479990874",
    "description": "Gracefully elegant and artistically crafted, this stunning sage green designer saree is designed for women who appreciate timeless sophistication blended with delicate festive charm. Made from luxurious premium Fendy satin fabric , the saree showcases a soft glossy texture with a fluid drape that enhances every movement beautifully. The saree is adorned with intricate multicolor floral embroidery work featuring delicate pastel thread detailing and elegant handcrafted motifs spread across the saree. The beautifully embroidered floral border elevates the saree with a rich designer appeal while maintaining a refined and graceful aesthetic. The highlight of this saree is its luxurious heavily embroidered floral lace border , enriched with delicate pastel floral vines and intricate thread craftsmanship that add depth, richness, and premium ethnic elegance. The detailed embroidered pallu creates a regal festive statement perfect for grand occasions. Its soothing sage green color tone exudes freshness, sophistication, and understated luxury, making it an ideal choice for women seeking elegant ethnic fashion for celebrations and festive gatherings. Paired with a matching unstitched blouse piece , the saree allows versatile styling options ranging from classic traditional looks to modern festive draping styles. The combination of luxurious satin sheen, lightweight comfort, and intricate floral embroidery creates a saree that is both glamorous and effortlessly graceful. Key Details: Saree Color: Sage Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Embroidered Floral Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for festive celebrations, wedding functions, engagement ceremonies, receptions, pooja occasions, family gatherings, anniversary parties, cocktail events, and traditional celebrations . Style Tips: Pair with kundan jewellery, pearl accessories, pastel stone necklaces, or floral-inspired earrings for a graceful festive appearance Style with soft curls, dewy makeup, nude lips, and shimmer eyes for an elegant ethnic glow Complete the look with embroidered heels or embellished juttis and a designer clutch Ideal for both daytime festive events and sophisticated evening celebrations This luxurious saree beautifully combines the richness of premium satin elegance with delicate floral embroidery artistry , making it a timeless designer piece for women who love sophisticated and graceful ethnic wear.",
    "shortDescription": "Gracefully elegant and artistically crafted, this stunning sage green designer saree is designed for women who appreciate timeless sophistication blended with d...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140399.jpg?v=1780393568",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40410.jpg?v=1780393568",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140412.jpg?v=1780393567",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMAR140405.jpg?v=1780393567",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140401.jpg?v=1780393567",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40409.jpg?v=1780393568",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140408.jpg?v=1780393567",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140394.jpg?v=1780393568",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40414.jpg?v=1780393568"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963663450",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 32 DUSTY GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140399.jpg?v=1780393568"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT032",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:04+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479958106",
    "title": "Lavender Purple Fendy Satin Saree with Floral Embroidery Border | Designer Party Wear Embroidered Saree with Blouse",
    "slug": "lavender-purple-fendy-satin-saree-with-floral-embroidery-border-designer-party-wear-embroidered-saree-with-blouse-1",
    "sku": "AT 32 MAUVE",
    "code": "EV-7934479958106",
    "description": "Elevate your festive wardrobe with this breathtaking lavender purple designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy finish, elegant fall, and graceful drape for a timeless ethnic look. This sophisticated saree is adorned with intricate multicolor floral embroidery work featuring delicate pastel thread detailing and finely handcrafted floral motifs spread gracefully across the saree. The luxurious embroidered border adds depth, richness, and refined elegance, making it a standout choice for festive and wedding occasions. The highlight of this saree is its beautifully crafted heavy floral embroidered lace border , enriched with pastel floral vine embroidery and delicate handcrafted detailing that create a premium designer appeal. The richly embroidered pallu further enhances the saree’s graceful and regal appearance. Its soothing and elegant lavender purple tone symbolizes femininity, sophistication, and luxury, making it a perfect choice for women who love subtle glamour with timeless ethnic charm. Paired with a matching unstitched blouse piece , the saree offers versatile styling possibilities for both traditional and contemporary festive looks. The luxurious satin sheen combined with intricate floral embroidery craftsmanship creates a designer ensemble that is glamorous, graceful, and effortlessly elegant. Key Details: Saree Color: Lavender Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Designer Floral Embroidered Border Pallu: Rich Embroidered Designer Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding celebrations, festive occasions, receptions, engagement ceremonies, cocktail parties, pooja functions, family gatherings, anniversary celebrations, and elegant traditional events . Style Tips: Pair with diamond jewellery, kundan sets, pearl accessories, or pastel stone necklaces for a luxurious festive appearance Style with soft curls, glowing makeup, nude lips, and shimmer eyeshadow for an elegant ethnic look Complete the outfit with embellished heels or embroidered juttis and a designer clutch Perfect for both daytime festive celebrations and sophisticated evening functions This luxurious saree beautifully blends the richness of premium satin shine with delicate floral embroidery artistry , creating a timeless designer statement for women who appreciate graceful and sophisticated ethnic fashion.",
    "shortDescription": "Elevate your festive wardrobe with this breathtaking lavender purple designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a ...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140440.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40449.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40456.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140446.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40445.jpg?v=1780393565",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140450.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140452.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140453.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140454.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40437.jpg?v=1780393566",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140458.jpg?v=1780393566"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963630682",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 32 MAUVE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140440.jpg?v=1780393566"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT032",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:02+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479925338",
    "title": "Olive Green Fendy Satin Saree with Floral Embroidery Border | Designer Embroidered Party Wear Saree with Blouse",
    "slug": "olive-green-fendy-satin-saree-with-floral-embroidery-border-designer-embroidered-party-wear-saree-with-blouse",
    "sku": "AT 32 OLIVE GREEN",
    "code": "EV-7934479925338",
    "description": "Step into timeless elegance with this luxurious olive green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, graceful drape, and sophisticated festive appeal. Designed for modern women who admire refined ethnic fashion, this saree features exquisite multicolor floral embroidery work delicately handcrafted across the border and scattered motifs throughout the saree. The intricate floral detailing enhances the saree with a rich designer aesthetic while maintaining an elegant and graceful charm. The saree is highlighted with a stunning heavily embroidered floral lace border , enriched with delicate pastel floral vines, intricate thread embroidery, and fine craftsmanship that elevate the overall look beautifully. The richly embroidered pallu creates a regal statement, making this saree a perfect choice for grand festive occasions and celebrations. Its elegant olive green shade reflects sophistication, freshness, and understated luxury, making it suitable for women who prefer graceful yet statement ethnic wear. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both traditional and contemporary festive looks. The luxurious satin sheen combined with intricate floral embroidery creates a perfect blend of glamour, elegance, and timeless ethnic beauty. Key Details: Saree Color: Olive Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Designer Floral Embroidered Border Pallu: Rich Embroidered Designer Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, festive celebrations, receptions, engagement ceremonies, cocktail parties, pooja occasions, family gatherings, anniversary celebrations, and traditional events . Style Tips: Pair with kundan jewellery, emerald accessories, pearl sets, or floral-inspired jewellery for a luxurious festive appearance Style with soft curls, glowing makeup, nude lips, and shimmer eye makeup for an elegant ethnic look Complete the outfit with embellished heels or embroidered juttis and a designer clutch Ideal for both daytime festive celebrations and elegant evening occasions This luxurious saree beautifully combines the richness of premium satin elegance with delicate floral embroidery artistry , making it a timeless designer ensemble for women who appreciate sophisticated and graceful ethnic fashion.",
    "shortDescription": "Step into timeless elegance with this luxurious olive green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0356.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0368.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0370_a0fee5b6-91e3-41b6-8ce6-82e720914ee8.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0363.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0360.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0366.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0367.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0352_9aefa0e4-f62a-40b7-910b-a959839ad2f8.jpg?v=1780393564",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0372_2ae9ae2f-b03f-4709-97c8-9fb0e7d5b8fe.jpg?v=1780393564"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963597914",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 32 OLIVE GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0356.jpg?v=1780393564"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT032",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:16:00+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479892570",
    "title": "Peach Pink Fendy Satin Saree with Floral Embroidery Border | Designer Embroidered Party Wear Saree with Blouse",
    "slug": "peach-pink-fendy-satin-saree-with-floral-embroidery-border-designer-embroidered-party-wear-saree-with-blouse",
    "sku": "AT 32 PEACH PINK",
    "code": "EV-7934479892570",
    "description": "Add timeless elegance to your festive wardrobe with this stunning peach pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy finish, graceful drape, and lightweight comfort for a sophisticated ethnic look. This elegant saree is adorned with intricate multicolor floral embroidery work delicately handcrafted across the border and enhanced with fine embroidered motifs throughout the saree. The refined floral detailing adds richness and designer charm while maintaining a soft and graceful aesthetic. The highlight of this saree lies in its beautifully crafted heavy floral embroidered lace border , enriched with delicate pastel floral vines and intricate thread embroidery that elevate the saree with luxurious festive elegance. The richly embroidered pallu enhances the overall grandeur, making it an ideal choice for celebrations and special occasions. Its soft and graceful peach pink shade exudes femininity, freshness, and understated glamour, making this saree perfect for women who love elegant and sophisticated ethnic fashion. Paired with a matching unstitched blouse piece , the saree allows versatile styling options for both traditional and modern festive looks. The luxurious satin sheen combined with delicate floral embroidery craftsmanship creates a designer ensemble that is glamorous, graceful, and effortlessly elegant. Key Details: Saree Color: Peach Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Designer Floral Embroidered Border Pallu: Rich Embroidered Designer Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, festive celebrations, receptions, engagement ceremonies, haldi events, pooja occasions, anniversary parties, family gatherings, and elegant traditional events . Style Tips: Pair with kundan jewellery, pearl accessories, pastel stone necklaces, or floral-inspired earrings for a luxurious festive appearance Style with soft curls, glowing makeup, peach-toned lips, and shimmer eyeshadow for an elegant ethnic look Complete the outfit with embellished heels or embroidered juttis and a designer clutch Ideal for both daytime festive celebrations and graceful evening occasions This luxurious saree beautifully combines the richness of premium satin elegance with delicate floral embroidery artistry , creating a timeless designer statement for women who appreciate graceful and sophisticated ethnic fashion.",
    "shortDescription": "Add timeless elegance to your festive wardrobe with this stunning peach pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that o...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40419.jpg?v=1780393562",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40432.jpg?v=1780393562",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40434.jpg?v=1780393562",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40427.jpg?v=1780393562",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40421.jpg?v=1780393565",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40429.jpg?v=1780393562",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40430.jpg?v=1780393562",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40415.jpg?v=1780393562",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140436.jpg?v=1780393562"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963565146",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 32 PEACH PINK",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40419.jpg?v=1780393562"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT032",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:59+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479859802",
    "title": "Mustard Yellow Fendy Satin Saree with Floral Embroidery Border | Designer Embroidered Party Wear Saree with Blouse",
    "slug": "mustard-yellow-fendy-satin-saree-with-floral-embroidery-border-designer-embroidered-party-wear-saree-with-blouse",
    "sku": "AT 32 YELLOW",
    "code": "EV-7934479859802",
    "description": "Bring radiant festive elegance to your wardrobe with this luxurious mustard yellow designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, graceful drape, and sophisticated ethnic charm. This stunning saree is adorned with intricate multicolor floral embroidery work delicately handcrafted across the border and enhanced with fine embroidered motifs throughout the saree. The elegant floral detailing adds richness and designer appeal while maintaining a refined and graceful look. The highlight of this saree lies in its beautifully designed heavy floral embroidered lace border , enriched with delicate pastel floral vines and intricate thread embroidery that elevate the saree with luxurious festive grandeur. The richly embroidered pallu further enhances the overall elegance, making it an ideal choice for weddings and festive celebrations. Its vibrant and graceful mustard yellow shade symbolizes positivity, celebration, and timeless ethnic beauty, making it perfect for women who love bold yet elegant traditional fashion. Paired with a matching unstitched blouse piece , the saree allows versatile styling options for both classic and contemporary festive looks. The luxurious satin sheen combined with delicate floral embroidery craftsmanship creates a designer ensemble that is glamorous, elegant, and effortlessly graceful. Key Details: Saree Color: Mustard Yellow Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Multicolor Floral Thread Embroidery Border: Heavy Designer Floral Embroidered Border Pallu: Rich Embroidered Designer Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for haldi ceremonies, festive celebrations, wedding functions, receptions, engagement parties, pooja occasions, family gatherings, anniversary celebrations, and elegant traditional events . Style Tips: Pair with kundan jewellery, temple jewellery, pearl accessories, or pastel stone necklaces for a luxurious festive appearance Style with soft curls, glowing makeup, golden shimmer eyes, and nude lips for an elegant ethnic look Complete the outfit with embroidered juttis or embellished heels and a designer clutch Ideal for both daytime festive celebrations and sophisticated evening occasions This luxurious saree beautifully blends the richness of premium satin elegance with delicate floral embroidery artistry , creating a timeless designer statement for women who appreciate graceful and sophisticated ethnic fashion.",
    "shortDescription": "Bring radiant festive elegance to your wardrobe with this luxurious mustard yellow designer saree , beautifully crafted in premium Fendy satin fabric that offer...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140463.jpg?v=1780393560",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140475.jpg?v=1780393561",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40477.jpg?v=1780393560",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40471.jpg?v=1780393561",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140466.jpg?v=1780393565",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40473.jpg?v=1780393560",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140469.jpg?v=1780393560",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140474.jpg?v=1780393560",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140460.jpg?v=1780393561",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40479.jpg?v=1780393560"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963532378",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 32 YELLOW",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI140463.jpg?v=1780393560"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT032",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:57+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479827034",
    "title": "Sea Green Fendy Satin Saree with Heavy Embroidered Border | Designer Party Wear Embroidered Saree with Blouse",
    "slug": "sea-green-fendy-satin-saree-with-heavy-embroidered-border-designer-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 33 DUSTY GREEN",
    "code": "EV-7934479827034",
    "description": "Embrace timeless elegance with this luxurious sea green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, graceful drape, and sophisticated festive appeal. This exquisite saree is adorned with delicate all-over embroidery motifs and enhanced with an intricately crafted heavy embroidered lace border that adds richness and regal charm to the overall look. The detailed embroidery work across the border and pallu creates a graceful designer aesthetic perfect for grand festive occasions and elegant celebrations. The luxurious sea green shade reflects sophistication, freshness, and refined beauty, making this saree an ideal choice for women who love graceful ethnic fashion with subtle glamour. Its beautifully embroidered pallu and elegant scalloped border detailing elevate the saree with a premium handcrafted appearance, while the soft satin texture ensures comfort and effortless draping throughout the day. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both traditional and contemporary festive looks. The combination of rich satin shine, elegant embroidery work, and timeless color creates a saree that is luxurious, feminine, and effortlessly graceful. Key Details: Saree Color: Sea Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Thread Embroidery & Designer Lace Work Border: Rich Embroidered Scalloped Border Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Lightweight Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding celebrations, receptions, festive occasions, engagement ceremonies, cocktail events, pooja functions, anniversary celebrations, family gatherings, and traditional functions . Style Tips: Pair with kundan jewellery, emerald accessories, pearl chokers, or statement earrings for a regal festive look Style with soft curls, glowing makeup, nude lips, and shimmer eye makeup for elegant ethnic styling Complete the outfit with embroidered heels or embellished juttis and a designer clutch Ideal for both daytime festive celebrations and elegant evening occasions This luxurious saree beautifully combines the richness of premium satin elegance with intricate embroidery craftsmanship , creating a timeless designer ensemble for women who appreciate graceful and sophisticated ethnic fashion.",
    "shortDescription": "Embrace timeless elegance with this luxurious sea green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, gra...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0551.jpg?v=1780393558",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0566.jpg?v=1780393559",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0559_535599a5-a592-4da8-8ded-85f4404918f5.jpg?v=1780393559",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0568.jpg?v=1780393560",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0558.jpg?v=1780393559",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0563_bef8a324-ebb1-44c3-a526-017d2ef322e9.jpg?v=1780393559",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0565.jpg?v=1780393559",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0549_6ab9b48c-d780-4121-a17a-0429d4f2fa03.jpg?v=1780393559",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0570_e1f64daf-6c43-4ede-bffc-04a5b0e67458.jpg?v=1780393559"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963499610",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 33 DUSTY GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0551.jpg?v=1780393558"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT033",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:55+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479794266",
    "title": "Lavender Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Party Wear Embroidered Saree with Blouse",
    "slug": "lavender-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 33 MAUVE",
    "code": "EV-7934479794266",
    "description": "Step into effortless elegance with this luxurious lavender designer saree , crafted in rich premium Fendy satin fabric that offers a graceful shine, fluid drape, and sophisticated festive appeal. This stunning saree is beautifully enhanced with intricate all-over embroidery detailing and a heavily crafted designer embroidered border that adds richness and timeless charm to the ensemble. The detailed floral embroidery along the border and pallu creates a regal handcrafted look perfect for festive and wedding celebrations. The soft and elegant lavender shade gives the saree a dreamy pastel appearance while maintaining a premium royal aesthetic. The subtle sheen of the satin fabric combined with delicate embroidery work makes this saree ideal for women who love graceful yet statement ethnic fashion. Its beautifully embroidered pallu, luxurious texture, and elegant border work create a refined festive look suitable for both daytime and evening occasions. The saree comes paired with a matching unstitched blouse piece , allowing versatile styling options for contemporary and traditional looks. With its rich satin finish, delicate embroidery craftsmanship, and timeless pastel elegance, this saree becomes a perfect addition to every festive wardrobe. Key Details: Saree Color: Lavender Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Embroidery Work & Designer Lace Border Border: Intricate Embroidered Border Work Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, receptions, festive celebrations, engagement ceremonies, cocktail parties, family gatherings, traditional events, pooja occasions, and elegant evening wear . Style Tips: Pair with diamond jewellery, kundan sets, pearl chokers, or pastel stone accessories for an elegant festive look Style with soft curls, glowing makeup, nude lips, and shimmer eyes for graceful ethnic styling Complete the outfit with embellished heels, potli bags, or designer clutches Ideal for both minimal luxury styling and grand festive fashion looks This luxurious embroidered saree beautifully blends the richness of premium satin elegance with timeless embroidery craftsmanship , creating a sophisticated ethnic ensemble for women who appreciate graceful festive fashion.",
    "shortDescription": "Step into effortless elegance with this luxurious lavender designer saree , crafted in rich premium Fendy satin fabric that offers a graceful shine, fluid drape...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0487_5173a713-9bee-4cd2-b7f4-882c3c638aa0.jpg?v=1780393556",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0498.jpg?v=1780393557",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0499.jpg?v=1780393556",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0491_7f719e65-aaaa-4e86-8cb1-3b7b38c507cd.jpg?v=1780393556",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0490.jpg?v=1780393557",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0494.jpg?v=1780393557",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0497.jpg?v=1780393557",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0480.jpg?v=1780393557",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0501.jpg?v=1780393557"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963466842",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 33 MAUVE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0487_5173a713-9bee-4cd2-b7f4-882c3c638aa0.jpg?v=1780393556"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT033",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:53+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479761498",
    "title": "Olive Green Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Blouse",
    "slug": "olive-green-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-blouse",
    "sku": "AT 33 OLIVE GREEN",
    "code": "EV-7934479761498",
    "description": "Add timeless sophistication to your ethnic wardrobe with this exquisite olive green designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich sheen, smooth texture, and elegant drape. This stunning saree is adorned with intricate heavy embroidery work , delicate sequin detailing, and a richly crafted embroidered border that enhances the overall regal appeal of the outfit. The finely detailed border and pallu embroidery create a graceful handcrafted look that reflects festive elegance and premium craftsmanship. The sophisticated olive green shade gives this saree a refined royal charm, making it perfect for festive celebrations, wedding functions, receptions, and elegant evening occasions. The subtle shine of the satin fabric paired with intricate embroidery creates a luxurious ethnic statement that feels both graceful and contemporary. Its beautifully embellished pallu, embroidered floral detailing, and flowing satin texture make this saree a standout ensemble for women who love elegant festive styling with a premium touch. The saree comes paired with a matching unstitched blouse piece , allowing versatile styling options for both traditional and modern looks. Designed for women who appreciate refined ethnic fashion, this saree beautifully blends rich satin elegance with intricate embroidery artistry. Key Details: Saree Color: Olive Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Embroidery & Sequin Work Border: Rich Designer Embroidered Border Pallu: Elegant Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, festive celebrations, engagement parties, cocktail functions, traditional gatherings, reception looks, pooja wear, festive evenings, and designer ethnic occasions . Style Tips: Pair with kundan jewellery, emerald stone accessories, antique gold jewellery, or statement chokers for a royal festive look Style with soft curls, glowing makeup, shimmer eyes, and nude lips for elegant ethnic styling Complete the look with embellished heels, metallic clutch bags, or traditional potli bags Ideal for both grand festive dressing and sophisticated minimal luxury styling This luxurious embroidered saree captures the beauty of modern festive elegance with timeless ethnic craftsmanship , making it a perfect statement piece for special occasions and celebrations.",
    "shortDescription": "Add timeless sophistication to your ethnic wardrobe with this exquisite olive green designer saree , beautifully crafted in luxurious premium Fendy satin fabric...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0533.jpg?v=1780393555",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0544.jpg?v=1780393555",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0545.jpg?v=1780393555",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0538.jpg?v=1780393556",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0534.jpg?v=1780393556",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0540.jpg?v=1780393555",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0541.jpg?v=1780393555",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0543_afe0087d-ac66-4cdd-aa13-8aff5a77113d.jpg?v=1780393555",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0529.jpg?v=1780393555",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0547_7d41413f-1af3-404f-a64c-8b6741de4e55.jpg?v=1780393555"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963434074",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 33 OLIVE GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0533.jpg?v=1780393555"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT033",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:51+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479728730",
    "title": "Peach Pink Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Embroidered Saree with Blouse",
    "slug": "peach-pink-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 33 PEACH PINK",
    "code": "EV-7934479728730",
    "description": "Elevate your festive wardrobe with this breathtaking peach pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful shine, silky texture, and elegant fluid drape. This exquisite saree is enhanced with intricate heavy embroidery work , delicate sequin detailing, and a richly embroidered designer border that adds timeless sophistication to the entire ensemble. The beautifully crafted floral embroidery along the border and pallu creates a regal handcrafted finish that radiates festive elegance. The soft and feminine peach pink shade gives the saree a graceful pastel charm, making it perfect for modern ethnic styling while maintaining a luxurious traditional appeal. The glossy satin texture combined with intricate embroidery detailing creates a refined designer look ideal for celebrations and special occasions. The saree features an elegantly embellished pallu, embroidered border work, and subtle scattered detailing throughout the fabric, adding richness and depth to the overall appearance. Its flowing silhouette and premium finish make it a standout outfit for women who love sophisticated festive fashion. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both contemporary and traditional ethnic looks. Designed with luxurious craftsmanship and festive elegance, this saree beautifully blends modern glamour with timeless ethnic artistry. Key Details: Saree Color: Peach Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Embroidery & Sequin Work Border: Rich Designer Embroidered Border Pallu: Elegant Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, receptions, festive celebrations, engagement ceremonies, sangeet nights, cocktail parties, traditional events, pooja functions, and elegant evening occasions . Style Tips: Pair with diamond jewellery, kundan sets, pearl accessories, or pastel stone jewellery for a graceful festive look Style with soft curls, dewy makeup, shimmer eyes, and glossy nude lips for elegant ethnic styling Complete the outfit with embellished heels, designer clutch bags, or traditional potli bags Ideal for both minimal luxury styling and grand festive fashion looks This luxurious embroidered saree beautifully reflects the charm of modern festive elegance with premium handcrafted detailing , making it a timeless addition to every elegant ethnic wardrobe.",
    "shortDescription": "Elevate your festive wardrobe with this breathtaking peach pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a grace...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0505.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0521.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0523_b26580e8-9095-4fa6-99e8-710154160731.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0513.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0511.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0517.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0518.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0520.jpg?v=1780393554",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0503.jpg?v=1780393553",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0525.jpg?v=1780393553"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963401306",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 33 PEACH PINK",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0505.jpg?v=1780393553"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT033",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:50+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479695962",
    "title": "Mustard Yellow Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Blouse",
    "slug": "mustard-yellow-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-blouse",
    "sku": "AT 33 YELLOW",
    "code": "EV-7934479695962",
    "description": "Bring radiant festive elegance to your ethnic wardrobe with this luxurious mustard yellow designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, soft texture, and graceful flowing drape. This elegant saree is adorned with intricate heavy embroidery work , delicate embellishments, and a beautifully detailed embroidered border that enhances its royal festive appeal. The finely crafted embroidery along the border and pallu adds timeless sophistication and premium handcrafted charm to the ensemble. The rich and vibrant mustard yellow shade gives this saree a bright festive look while maintaining an elegant and refined aesthetic. The luxurious satin texture paired with subtle embroidery detailing creates a graceful statement outfit perfect for special occasions and celebrations. The saree features scattered embroidered motifs throughout the fabric, adding delicate richness without overpowering the overall elegant appearance. Its heavily embroidered border and beautifully finished pallu make it ideal for women who prefer sophisticated festive fashion with a touch of glamour. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both traditional and modern ethnic looks. Designed with luxurious detailing and graceful craftsmanship, this saree beautifully combines festive richness with timeless ethnic elegance. Key Details: Saree Color: Mustard Yellow Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Embroidery & Sequin Work Border: Rich Designer Embroidered Border Pallu: Elegant Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, festive celebrations, haldi functions, receptions, engagement parties, traditional gatherings, pooja occasions, festive evenings, and designer ethnic events . Style Tips: Pair with kundan jewellery, antique gold accessories, emerald stone chokers, or pearl jewellery for a regal festive look Style with soft curls, radiant makeup, shimmer eyes, and warm-toned lips for elegant ethnic styling Complete the look with embellished heels, metallic clutches, or traditional potli bags Ideal for both minimal luxury styling and grand festive dressing This luxurious embroidered saree beautifully captures the charm of rich festive glamour with timeless ethnic craftsmanship , making it a perfect statement outfit for elegant celebrations and special occasions.",
    "shortDescription": "Bring radiant festive elegance to your ethnic wardrobe with this luxurious mustard yellow designer saree , beautifully crafted in premium Fendy satin fabric tha...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0573_d6d17607-6832-4fe7-a45e-7861cff7b34e.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0589.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0591.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0580.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0579.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0582.jpg?v=1780393552",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0584.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0586.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0587.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0571.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0592.jpg?v=1780393551"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "arzoo-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963368538",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 33 YELLOW",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0573_d6d17607-6832-4fe7-a45e-7861cff7b34e.jpg?v=1780393551"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT033",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:48+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479663194",
    "title": "Emerald Green Designer Fendy Satin Saree with Floral Embroidery Work | Premium Party Wear Embroidered Saree with Blouse",
    "slug": "emerald-green-designer-fendy-satin-saree-with-floral-embroidery-work-premium-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 34 GREEN",
    "code": "EV-7934479663194",
    "description": "Make a graceful festive statement with this luxurious emerald green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, elegant drape, and sophisticated ethnic charm. This stunning saree is adorned with intricate multicolor floral embroidery work combined with a beautifully detailed embroidered border that adds timeless elegance and royal appeal to the entire ensemble. The delicate floral motifs spread across the saree create a rich handcrafted aesthetic that perfectly balances festive glamour with refined sophistication. The deep and luxurious emerald green shade gives the saree a regal festive appearance, while the intricate floral embroidery in contrasting tones enhances its designer appeal. The satin fabric’s subtle sheen beautifully highlights the embroidery detailing, creating an elegant look suitable for both grand celebrations and intimate festive occasions. The saree features an intricately embroidered border, elegant floral motif work throughout the drape, and a richly detailed pallu that adds graceful movement and premium styling to the outfit. Its flowing silhouette and luxurious finish make it an ideal choice for women who love statement ethnic fashion with timeless craftsmanship. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both classic and contemporary festive looks. Designed with luxurious embroidery artistry and premium satin elegance, this saree beautifully captures the essence of sophisticated ethnic fashion. Key Details: Saree Color: Emerald Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery & Designer Border Work Border: Heavy Embroidered Border Pallu: Rich Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, receptions, festive celebrations, engagement parties, traditional ceremonies, cocktail evenings, pooja functions, festive gatherings, and elegant ethnic occasions . Style Tips: Pair with kundan jewellery, emerald stone chokers, antique silver jewellery, or statement earrings for a royal festive look Style with soft curls, glowing makeup, shimmer eyes, and bold lips for elegant ethnic styling Complete the look with embroidered heels, metallic clutches, or designer potli bags Ideal for both grand festive styling and sophisticated luxury ethnic wear This luxurious embroidered saree beautifully combines the richness of premium satin elegance with intricate floral craftsmanship , making it a timeless festive outfit for women who appreciate graceful and refined ethnic fashion.",
    "shortDescription": "Make a graceful festive statement with this luxurious emerald green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0264.jpg?v=1780393550",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0279.jpg?v=1780393550",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0280.jpg?v=1780393550",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0271.jpg?v=1780393550",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0269.jpg?v=1780393552",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0274.jpg?v=1780393549",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0277.jpg?v=1780393551",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0262.jpg?v=1780393550",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0282.jpg?v=1780393550"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963335770",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 34 GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0264.jpg?v=1780393550"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT034",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:46+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479630426",
    "title": "Wine Red Designer Fendy Satin Saree with Floral Embroidery Work | Premium Party Wear Embroidered Saree with Blouse",
    "slug": "wine-red-designer-fendy-satin-saree-with-floral-embroidery-work-premium-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 34 MAROON",
    "code": "EV-7934479630426",
    "description": "Turn every celebration into a grand style statement with this luxurious wine red designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a glossy finish, smooth texture, and elegant flowing drape. This exquisite saree is adorned with intricate multicolor floral embroidery work combined with a heavily detailed embroidered border that adds timeless festive charm and royal sophistication to the ensemble. The beautifully scattered floral motifs throughout the saree create a graceful handcrafted aesthetic that perfectly blends traditional artistry with modern designer elegance. The rich and regal wine red shade gives the saree a bold festive appeal, making it an ideal choice for wedding celebrations, receptions, festive evenings, and special occasions. The satin fabric’s luxurious sheen enhances the embroidery detailing beautifully, creating a premium ethnic look with graceful glamour. The saree features an intricately embroidered border, elegant floral motif detailing across the drape and pallu, and a richly finished lower border that adds depth and richness to the overall appearance. Its fluid silhouette and luxurious satin texture make it a perfect outfit for women who love statement festive fashion with refined craftsmanship. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both traditional and contemporary ethnic looks. Designed with premium embroidery artistry and rich festive elegance, this saree beautifully captures timeless ethnic luxury. Key Details: Saree Color: Wine Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery & Designer Border Work Border: Heavy Embroidered Border Pallu: Rich Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, receptions, festive celebrations, cocktail parties, engagement ceremonies, traditional gatherings, pooja occasions, sangeet nights, and designer ethnic events . Style Tips: Pair with kundan jewellery, ruby stone sets, antique gold accessories, or statement chokers for a royal festive look Style with soft curls, bold eyes, radiant makeup, and deep-toned lips for glamorous ethnic styling Complete the look with embroidered heels, metallic clutch bags, or traditional potli bags Ideal for both grand festive dressing and elegant luxury ethnic styling This luxurious embroidered saree beautifully combines the richness of premium satin elegance with intricate floral craftsmanship , making it a timeless festive ensemble for women who appreciate sophisticated ethnic fashion.",
    "shortDescription": "Turn every celebration into a grand style statement with this luxurious wine red designer saree , beautifully crafted in rich premium Fendy satin fabric that of...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0102_eb61a4ab-a689-4765-98f9-1cbbdff0a25e.jpg?v=1780393548",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0119.jpg?v=1780393548",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0121.jpg?v=1780393549",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0111.jpg?v=1780393549",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0107.jpg?v=1780393549",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0113.jpg?v=1780393549",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0116.jpg?v=1780393548",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0118.jpg?v=1780393548",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0101.jpg?v=1780393548",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0099.jpg?v=1780393548",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0122.jpg?v=1780393548"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963303002",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 34 MAROON",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0102_eb61a4ab-a689-4765-98f9-1cbbdff0a25e.jpg?v=1780393548"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT034",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:45+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479597658",
    "title": "Royal Purple Designer Fendy Satin Saree with Floral Embroidery Work | Premium Party Wear Embroidered Saree with Blouse",
    "slug": "royal-purple-designer-fendy-satin-saree-with-floral-embroidery-work-premium-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 34 PURPLE",
    "code": "EV-7934479597658",
    "description": "Elevate your festive wardrobe with this stunning royal purple designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful sheen, fluid drape, and rich festive appeal. This elegant saree showcases intricate multicolor floral embroidery motifs spread artistically across the saree, enhanced with a heavily embroidered designer border that reflects timeless craftsmanship and sophisticated ethnic charm. The combination of delicate floral detailing and rich satin texture creates a luxurious statement look perfect for grand occasions. The deep and regal royal purple shade adds richness and royal elegance to the ensemble, making it an ideal choice for weddings, festive gatherings, receptions, traditional celebrations, and evening functions. The soft satin texture flows beautifully while maintaining a structured festive silhouette that enhances the overall grace of the saree. Featuring embroidered floral buttas throughout the saree, detailed scalloped border work, and richly embroidered pallu styling, this saree perfectly blends modern luxury with classic Indian ethnic artistry. The glossy satin finish further highlights the embroidery work, creating a premium designer appearance. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both contemporary and traditional festive looks. Crafted for women who appreciate elegance, richness, and intricate detailing, this saree is a timeless addition to any festive ethnic collection. Key Details: Saree Color: Royal Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery & Designer Border Work Border: Heavy Embroidered Scalloped Border Pallu: Rich Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, festive celebrations, receptions, engagement functions, cocktail parties, pooja occasions, sangeet nights, traditional gatherings, and designer ethnic events . Style Tips: Pair with kundan jewellery, pearl chokers, antique silver accessories, or statement festive earrings for a royal ethnic look Style with soft curls, radiant makeup, and deep-toned lips for elegant festive glamour Complete the look with embroidered heels, metallic clutches, or traditional potli bags Ideal for both daytime festive functions and glamorous evening celebrations This luxurious embroidered saree beautifully combines the richness of premium satin elegance with intricate floral craftsmanship , making it a perfect choice for women who love timeless festive fashion with modern designer sophistication.",
    "shortDescription": "Elevate your festive wardrobe with this stunning royal purple designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a gracefu...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0225.jpg?v=1780393547",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0236.jpg?v=1780393547",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0237.jpg?v=1780393547",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0233.jpg?v=1780393547",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0231.jpg?v=1780393547",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0235.jpg?v=1780393546",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0229.jpg?v=1780393547",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0222.jpg?v=1780393546",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0239.jpg?v=1780393547"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963270234",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 34 PURPLE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0225.jpg?v=1780393547"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT034",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:43+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479564890",
    "title": "Teal Blue Designer Fendy Satin Saree with Floral Embroidery Work | Premium Party Wear Embroidered Saree with Blouse",
    "slug": "teal-blue-designer-fendy-satin-saree-with-floral-embroidery-work-premium-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 34 RAMA",
    "code": "EV-7934479564890",
    "description": "Drape yourself in timeless elegance with this luxurious teal blue designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish and graceful flowing drape perfect for festive and special occasions. This exquisite saree features intricate multicolor floral embroidery motifs delicately spread across the saree, enhanced with a beautifully detailed embroidered border that adds richness and refined ethnic charm. The artistic floral embroidery combined with elegant vine patterns creates a sophisticated designer appeal that makes this saree stand out effortlessly. The deep and vibrant teal blue shade reflects royal elegance and modern festive glamour, making it an ideal choice for weddings, receptions, festive gatherings, cocktail functions, engagement ceremonies, and traditional celebrations. The lustrous satin texture gives the saree a luxurious shine while maintaining a soft and lightweight drape. Designed with heavily embroidered floral borders, elegant scattered floral buttas, and richly crafted pallu detailing, this saree beautifully blends classic Indian craftsmanship with contemporary festive styling. The detailed embroidery work enhances the overall richness of the ensemble and creates a premium designer finish. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both modern and traditional ethnic looks. Perfect for women who appreciate sophisticated embroidery, luxurious fabric, and graceful festive styling, this saree is a statement addition to every ethnic wardrobe. Key Details: Saree Color: Teal Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery & Designer Border Work Design: Embroidered Floral Motifs with Vine Pattern Border: Heavy Embroidered Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for wedding functions, festive celebrations, receptions, engagement ceremonies, sangeet nights, traditional events, cocktail parties, pooja occasions, and designer ethnic gatherings . Style Tips: Pair with kundan jewellery, emerald accessories, statement chandbalis, or antique silver jewellery for a regal festive look Style with soft curls, glowing makeup, and bold eyes for elegant evening glamour Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Perfect for both daytime festive styling and evening wedding occasions This stunning embroidered saree beautifully captures the richness of luxurious satin fabric with intricate floral artistry , making it a graceful and timeless choice for festive elegance and modern ethnic fashion.",
    "shortDescription": "Drape yourself in timeless elegance with this luxurious teal blue designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy f...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0178.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0194.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0196.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0186.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0182.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0190_9e436d22-601d-45bb-b72a-cd7948eeafc1.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0193.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0176.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0174.jpg?v=1780393545",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0199.jpg?v=1780393545"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963237466",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 34 RAMA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0178.jpg?v=1780393545"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT034",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:41+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479532122",
    "title": "Ruby Red Designer Fendy Satin Saree with Floral Embroidery Work | Premium Wedding & Party Wear Embroidered Saree with Blouse",
    "slug": "ruby-red-designer-fendy-satin-saree-with-floral-embroidery-work-premium-wedding-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 34 RED",
    "code": "EV-7934479532122",
    "description": "Step into timeless festive elegance with this breathtaking ruby red designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy texture, graceful flow, and regal ethnic appeal. This exquisite saree is adorned with intricate multicolor floral embroidery motifs artistically spread across the saree, paired with an elegant heavily embroidered designer border that enhances its luxurious festive charm. The delicate floral embroidery combined with detailed vine patterns creates a sophisticated and graceful ethnic statement perfect for grand occasions. The vibrant and rich ruby red shade symbolizes celebration, tradition, and royal elegance, making this saree an ideal choice for weddings, receptions, festive gatherings, engagement ceremonies, traditional functions, and special evening occasions. The lustrous satin finish gives the saree a premium designer appearance while maintaining a soft and lightweight drape. Featuring detailed embroidered floral buttas, elegant scalloped border work, and richly designed pallu embroidery, this saree beautifully blends traditional craftsmanship with modern festive styling. The intricate embroidery work adds depth, richness, and a luxurious handcrafted touch to the overall look. Paired with a matching unstitched blouse piece , this saree allows versatile styling options to create both classic and contemporary ethnic looks. Designed for women who appreciate elegance, festive glamour, and refined embroidery artistry, this saree is a timeless addition to every premium ethnic wardrobe. Key Details: Saree Color: Ruby Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery & Designer Border Work Design: Embroidered Floral Motifs with Vine Pattern Border: Heavy Embroidered Scalloped Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, bridal functions, festive celebrations, receptions, sangeet nights, engagement parties, traditional occasions, cocktail events, and designer ethnic gatherings . Style Tips: Pair with kundan jewellery, ruby-toned accessories, traditional chandbalis, or statement festive necklaces for a royal look Style with soft curls, glowing makeup, bold lips, and shimmering eyes for glamorous festive elegance Complete the look with embroidered heels, metallic clutch bags, or traditional potli bags Ideal for both grand daytime functions and luxurious evening celebrations This luxurious embroidered saree beautifully captures the richness of premium satin elegance with intricate floral craftsmanship , making it a stunning statement piece for women who love timeless festive fashion with a modern designer touch.",
    "shortDescription": "Step into timeless festive elegance with this breathtaking ruby red designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a r...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0055.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0069.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0071.jpg?v=1780393544",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0060.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0062.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0064.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0067.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0053.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0051.jpg?v=1780393543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0072.jpg?v=1780393543"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963204698",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 34 RED",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0055.jpg?v=1780393543"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT034",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:40+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479499354",
    "title": "Wine Maroon Designer Fendy Satin Saree with Floral Embroidery Work | Premium Festive & Wedding Wear Embroidered Saree with Blouse",
    "slug": "wine-maroon-designer-fendy-satin-saree-with-floral-embroidery-work-premium-festive-wedding-wear-embroidered-saree-with-blouse-1",
    "sku": "AT 34 WINE",
    "code": "EV-7934479499354",
    "description": "Experience royal elegance with this stunning wine maroon designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful sheen, smooth texture, and rich festive appeal. This elegant saree is adorned with intricate multicolor floral embroidery motifs delicately arranged across the saree in artistic vine patterns, enhanced with a heavily embroidered designer border that adds timeless ethnic sophistication. The detailed floral embroidery work beautifully complements the rich satin texture, creating a luxurious designer look perfect for grand celebrations. The deep and rich wine maroon shade reflects classic royalty and festive glamour, making this saree a perfect choice for weddings, receptions, engagement ceremonies, festive occasions, traditional functions, and evening celebrations. The glossy satin finish enhances the richness of the color while offering a soft, lightweight, and beautifully flowing drape. Featuring intricate floral butta embroidery, elegant embroidered border detailing, and richly crafted pallu work, this saree effortlessly blends traditional craftsmanship with modern festive styling. The embroidery highlights the luxurious character of the saree while adding graceful depth and premium elegance. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both traditional and contemporary festive looks. Designed for women who appreciate timeless elegance, luxurious fabrics, and refined embroidery artistry, this saree is a statement addition to every premium ethnic wardrobe. Key Details: Saree Color: Wine Maroon Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery & Designer Border Work Design: Embroidered Floral Motifs with Vine Pattern Border: Heavy Embroidered Scalloped Border Pallu: Rich Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, festive celebrations, receptions, cocktail parties, engagement functions, traditional gatherings, pooja occasions, and luxurious ethnic events . Style Tips: Pair with kundan jewellery, ruby-toned accessories, antique silver pieces, or statement chandbalis for a regal festive look Style with soft curls, radiant makeup, bold lips, and shimmering eyes for glamorous evening elegance Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both daytime traditional functions and luxurious evening celebrations This luxurious embroidered saree beautifully combines the richness of premium satin elegance with intricate floral craftsmanship , making it a timeless statement piece for women who love graceful festive fashion with a modern designer touch.",
    "shortDescription": "Experience royal elegance with this stunning wine maroon designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful she...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0009.jpg?v=1780393542",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0021.jpg?v=1780393541",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0023.jpg?v=1780393541",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0011.jpg?v=1780393542",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0015.jpg?v=1780393542",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0020.jpg?v=1780393542",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0026.jpg?v=1780393542",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0029.jpg?v=1780393542",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0030.jpg?v=1780393541",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0025.jpg?v=1780393541"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963171930",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 34 WINE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/GC_0009.jpg?v=1780393542"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT034",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:38+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479466586",
    "title": "Emerald Green Designer Fendy Satin Saree with Heavy Floral Embroidery Work | Premium Wedding & Party Wear Embroidered Saree with Blouse",
    "slug": "emerald-green-designer-fendy-satin-saree-with-heavy-floral-embroidery-work-premium-wedding-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 35 GREEN",
    "code": "EV-7934479466586",
    "description": "Grace every festive occasion with unmatched elegance in this luxurious emerald green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, soft drape, and timeless festive charm. This exquisite saree is adorned with intricate heavy floral embroidery work spread gracefully across the saree, enhanced with a richly embroidered designer border that adds regal sophistication and handcrafted beauty. The elegant floral motifs and detailed thread embroidery create a luxurious ethnic statement perfect for weddings and grand celebrations. The rich and royal emerald green shade reflects classic Indian elegance and modern festive glamour, making this saree a perfect choice for weddings, receptions, festive gatherings, engagement ceremonies, sangeet nights, cocktail parties, and traditional occasions. The satin texture adds a luminous sheen that beautifully enhances the embroidery detailing and overall richness of the saree. Featuring detailed floral embroidered buttas, heavily embroidered scalloped border work, and an elegantly crafted pallu, this saree beautifully blends traditional artistry with contemporary designer styling. The intricate embroidery gives the saree a premium handcrafted finish while maintaining graceful fluidity and lightweight comfort. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both traditional and modern ethnic looks. Designed for women who appreciate luxurious craftsmanship, festive elegance, and timeless ethnic fashion, this saree is a statement addition to every premium wardrobe. Key Details: Saree Color: Emerald Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Floral Embroidery Work Design: Embroidered Floral Buttas & Designer Border Border: Rich Embroidered Scalloped Border Pallu: Heavy Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, festive functions, receptions, engagement celebrations, traditional occasions, sangeet nights, cocktail parties, pooja gatherings, and designer ethnic events . Style Tips: Pair with kundan jewellery, emerald accessories, traditional chandbalis, or statement festive necklaces for a regal ethnic look Style with soft curls, glowing makeup, and bold festive eyes for elegant glamour Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both daytime wedding functions and luxurious evening celebrations This luxurious embroidered saree beautifully captures the richness of premium satin elegance with intricate floral craftsmanship , making it a timeless festive masterpiece for women who love graceful designer ethnic fashion.",
    "shortDescription": "Grace every festive occasion with unmatched elegance in this luxurious emerald green designer saree , beautifully crafted in premium Fendy satin fabric that off...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_3cf5a39f-5146-4fb1-a6cf-2bd5e849bb01.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/7.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/4.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/3.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/2.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/5.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/9.jpg?v=1780393539",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/8.jpg?v=1780393540"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963139162",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 35 GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/1_3cf5a39f-5146-4fb1-a6cf-2bd5e849bb01.jpg?v=1780393540"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT035",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:36+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479433818",
    "title": "Wine Red Designer Fendy Satin Saree with Heavy Floral Embroidery Work | Premium Wedding & Festive Wear Embroidered Saree with Blouse",
    "slug": "wine-red-designer-fendy-satin-saree-with-heavy-floral-embroidery-work-premium-wedding-festive-wear-embroidered-saree-with-blouse",
    "sku": "AT 35 MAROON",
    "code": "EV-7934479433818",
    "description": "Add timeless luxury to your ethnic wardrobe with this breathtaking wine red designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, graceful drape, and elegant festive appeal. This exquisite saree is adorned with intricate heavy floral embroidery motifs spread artistically across the saree, enhanced with a richly embroidered designer border that reflects sophistication and premium craftsmanship. The detailed floral embroidery combined with elegant traditional patterns creates a luxurious statement look perfect for grand celebrations. The rich and regal wine red shade beautifully captures festive glamour and royal elegance, making this saree an ideal choice for weddings, receptions, engagement ceremonies, festive gatherings, traditional occasions, cocktail parties, and evening functions. The luxurious satin finish enhances the depth of the color while giving the saree a smooth and fluid drape. Designed with detailed embroidered floral buttas, heavily embroidered scalloped border work, and an elegant designer pallu, this saree perfectly blends traditional artistry with modern ethnic styling. The embroidery work adds richness and handcrafted elegance to every fold of the saree, creating a graceful designer appearance. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both classic and contemporary festive looks. Perfect for women who appreciate rich embroidery, luxurious fabrics, and timeless festive elegance, this saree is a must-have statement piece for premium ethnic occasions. Key Details: Saree Color: Wine Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Floral Embroidery Work Design: Embroidered Floral Buttas & Designer Border Border: Rich Embroidered Scalloped Border Pallu: Heavy Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for wedding ceremonies, festive celebrations, receptions, engagement parties, traditional gatherings, cocktail functions, sangeet nights, pooja occasions, and luxurious ethnic events . Style Tips: Pair with kundan jewellery, ruby-toned accessories, statement chandbalis, or antique festive necklaces for a regal look Style with soft curls, bold lips, glowing makeup, and shimmering eyes for glamorous festive elegance Complete the look with embroidered heels, metallic clutch bags, or traditional potli bags Perfect for both grand daytime functions and luxurious evening celebrations This luxurious embroidered saree beautifully combines the richness of premium satin elegance with intricate floral craftsmanship , making it a timeless masterpiece for women who love graceful festive fashion with a modern designer touch.",
    "shortDescription": "Add timeless luxury to your ethnic wardrobe with this breathtaking wine red designer saree , beautifully crafted in premium Fendy satin fabric that offers a ric...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40399.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40413.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40421_f11e3acf-a6fa-49bb-b840-fbf84e995c8c.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40407.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40403.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40409_d87f7c2c-586f-4fa3-8895-1fceaea12134.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40411.jpg?v=1780393540",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40416.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40418.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40397.jpg?v=1780393538",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40423.jpg?v=1780393538"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963106394",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 35 MAROON",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40399.jpg?v=1780393538"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT035",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:34+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479401050",
    "title": "Royal Purple Designer Fendy Satin Saree with Heavy Floral Embroidery Work | Premium Wedding & Party Wear Embroidered Saree with Blouse",
    "slug": "royal-purple-designer-fendy-satin-saree-with-heavy-floral-embroidery-work-premium-wedding-party-wear-embroidered-saree-with-blouse",
    "sku": "AT 35 PURPLE",
    "code": "EV-7934479401050",
    "description": "Radiate timeless elegance with this luxurious royal purple designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, graceful drape, and regal festive appeal. This exquisite saree is adorned with intricate heavy floral embroidery motifs spread artistically across the saree, complemented by a richly embroidered designer border that reflects refined craftsmanship and sophisticated ethnic beauty. The elegant floral embroidery detailing enhances the luxurious satin base, creating a graceful designer look perfect for grand festive occasions. The deep and rich royal purple shade symbolizes royalty, sophistication, and festive glamour, making this saree an ideal choice for weddings, receptions, engagement ceremonies, festive gatherings, traditional celebrations, cocktail parties, and luxurious evening events. The lustrous satin finish beautifully highlights the embroidery work while maintaining a soft and flowing silhouette. Designed with detailed embroidered floral buttas, heavily embroidered scalloped border work, and an elegant richly designed pallu, this saree perfectly blends traditional Indian artistry with modern festive styling. The handcrafted embroidery enhances the richness of the ensemble and gives the saree a premium designer finish. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for both classic and contemporary ethnic looks. Perfect for women who appreciate luxurious fabrics, detailed craftsmanship, and graceful festive fashion, this saree is a timeless statement piece for every premium ethnic wardrobe. Key Details: Saree Color: Royal Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Floral Embroidery Work Design: Embroidered Floral Buttas & Designer Border Border: Rich Embroidered Scalloped Border Pallu: Heavy Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for wedding ceremonies, festive celebrations, receptions, engagement parties, cocktail functions, sangeet nights, traditional occasions, pooja gatherings, and luxurious ethnic events . Style Tips: Pair with kundan jewellery, pearl accessories, statement chandbalis, or antique silver necklaces for a regal festive look Style with soft curls, radiant makeup, bold eyes, and glossy lips for glamorous elegance Complete the look with embroidered heels, metallic clutch bags, or traditional potli bags Perfect for both grand daytime functions and elegant evening celebrations This luxurious embroidered saree beautifully combines the richness of premium satin elegance with intricate floral craftsmanship , making it a timeless masterpiece for women who love graceful festive fashion with a modern designer touch.",
    "shortDescription": "Radiate timeless elegance with this luxurious royal purple designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture,...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40498.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40510.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40511.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40503.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40501.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0507.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40508.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40493.jpg?v=1780393536",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40513.jpg?v=1780393536"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963073626",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 35 PURPLE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40498.jpg?v=1780393536"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT035",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:32+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479368282",
    "title": "Royal Blue Designer Fendy Satin Saree with Heavy Floral Embroidery Work | Premium Party Wear Wedding Saree with Embroidered Border & Blouse",
    "slug": "royal-blue-designer-fendy-satin-saree-with-heavy-floral-embroidery-work-premium-party-wear-wedding-saree-with-embroidered-border-blouse",
    "sku": "AT 35 RAMA",
    "code": "EV-7934479368282",
    "description": "Step into timeless elegance with this luxurious royal blue designer saree , beautifully crafted in premium Fendy satin fabric that showcases a rich glossy finish, graceful drape, and sophisticated festive charm. This stunning saree is adorned with intricate heavy floral embroidery motifs intricately placed all over the saree, enhanced with a richly embroidered designer border that adds a regal and luxurious appeal. The elegant embroidery detailing beautifully complements the deep royal blue satin base, creating a refined ethnic ensemble perfect for grand celebrations. The rich and vibrant royal blue shade symbolizes sophistication, confidence, and royal elegance, making this saree an ideal choice for weddings, receptions, festive occasions, engagement ceremonies, cocktail functions, traditional gatherings, and luxurious evening events. The lustrous satin texture enhances the richness of the embroidery while offering a smooth and flattering silhouette. Featuring delicately embroidered floral buttas, detailed zari-inspired embroidery patterns, and a heavily embellished border and pallu, this saree reflects the perfect blend of traditional Indian craftsmanship and contemporary designer fashion. The embroidery work gives the saree a premium handcrafted finish, making it a standout festive statement piece. Paired with a matching unstitched blouse piece , this saree allows versatile styling for both classic traditional looks and modern ethnic fashion. Designed for women who appreciate rich fabrics, intricate craftsmanship, and graceful elegance, this saree is a luxurious addition to every festive and wedding wardrobe. Key Details: Saree Color: Royal Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Floral Embroidery Work Design: Embroidered Floral Buttas & Designer Border Border: Rich Embroidered Border Work Pallu: Heavy Designer Embroidered Pallu Texture: Soft, Glossy & Flowing Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding ceremonies, festive celebrations, receptions, engagement functions, cocktail parties, traditional gatherings, sangeet nights, pooja functions, and grand ethnic occasions . Style Tips: Pair with kundan jewellery, diamond-style accessories, pearl chokers, or antique silver jewellery for a regal festive look Style with soft curls, shimmer makeup, smokey eyes, and glossy lips for glamorous elegance Complete the outfit with embroidered heels, metallic clutch bags, or traditional potli bags Ideal for both daytime festivities and luxurious evening celebrations This luxurious embroidered saree beautifully captures the richness of premium satin elegance combined with timeless floral craftsmanship , making it a graceful designer masterpiece for every modern woman who loves festive ethnic fashion.",
    "shortDescription": "Step into timeless elegance with this luxurious royal blue designer saree , beautifully crafted in premium Fendy satin fabric that showcases a rich glossy finis...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40536.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMAR40550.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40551.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMAR40546.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40540.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40544.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40548.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40534.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40553.jpg?v=1780393533"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441963040858",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 35 RAMA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40536.jpg?v=1780393533"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT035",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:29+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479335514",
    "title": "Rani Pink Designer Fendy Satin Saree with Heavy Embroidery Work | Premium Wedding Party Wear Saree with Embroidered Border & Blouse",
    "slug": "rani-pink-designer-fendy-satin-saree-with-heavy-embroidery-work-premium-wedding-party-wear-saree-with-embroidered-border-blouse",
    "sku": "AT 35 RED",
    "code": "EV-7934479335514",
    "description": "Bring timeless glamour to your festive wardrobe with this stunning rani pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich sheen, elegant drape, and graceful festive appeal. This exquisite saree features intricate heavy embroidery work spread elegantly across the saree, highlighted with finely detailed embroidered floral motifs and a richly embellished designer border. The luxurious embroidery adds depth, texture, and royal elegance to the vibrant satin base, making this saree a true statement piece for grand celebrations. The bold and vibrant rani pink shade symbolizes celebration, femininity, and traditional Indian elegance, making it perfect for weddings, receptions, festive occasions, engagement ceremonies, sangeet nights, cocktail events, and cultural functions. The glossy satin texture enhances the richness of the embroidery while creating a sophisticated and flattering silhouette. Designed with elegant embroidered floral buttas, detailed zari-inspired patterns, and a heavily worked border and pallu, this saree beautifully combines modern luxury with timeless ethnic craftsmanship. The intricate detailing throughout the saree adds a premium handcrafted appeal that instantly elevates your festive look. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both classic traditional draping and contemporary festive fashion. Soft, flowy, lightweight, and luxurious, this saree is ideal for women who love rich festive styling with elegant handcrafted detailing. Key Details: Saree Color: Rani Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Embroidery Work Design: Floral Embroidered Buttas & Designer Border Border: Rich Embroidered Border Work Pallu: Heavy Designer Embroidered Pallu Texture: Soft, Glossy & Graceful Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, haldi functions, sangeet nights, pooja occasions, family gatherings, cocktail parties, and traditional events . Style Tips: Pair with kundan jewellery, statement chokers, pearl accessories, or traditional temple jewellery for a regal festive look Style with soft curls, dewy makeup, shimmer eyes, and glossy lips for elegant glamour Complete the outfit with embroidered heels, metallic clutch bags, or ethnic potli bags Ideal for both daytime celebrations and luxurious evening occasions This luxurious embroidered saree beautifully captures the richness of traditional Indian artistry blended with modern satin elegance , making it a must-have festive masterpiece for every ethnic wardrobe.",
    "shortDescription": "Bring timeless glamour to your festive wardrobe with this stunning rani pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that o...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40356.jpg?v=1780393531",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40368.jpg?v=1780393531",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40369.jpg?v=1780393531",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0360.jpg?v=1780393533",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40357.jpg?v=1780393531",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40365.jpg?v=1780393531",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40366.jpg?v=1780393530",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40351.jpg?v=1780393531",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40371.jpg?v=1780393530"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441963008090",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 35 RED",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI40356.jpg?v=1780393531"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT035",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:26+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479302746",
    "title": "Wine Designer Fendy Satin Saree with Heavy Zari Embroidery Work | Premium Party Wear Wedding Saree with Embroidered Border & Blouse",
    "slug": "wine-designer-fendy-satin-saree-with-heavy-zari-embroidery-work-premium-party-wear-wedding-saree-with-embroidered-border-blouse",
    "sku": "AT 35 WINE",
    "code": "EV-7934479302746",
    "description": "Elevate your festive elegance with this luxurious wine designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shine, smooth drape, and royal festive appeal. This exquisite saree is adorned with intricate heavy zari embroidery work featuring detailed floral motifs spread elegantly throughout the saree. The richly embroidered border and beautifully designed pallu create a regal handcrafted finish that perfectly complements the deep wine satin base, making this saree a statement masterpiece for grand celebrations. The rich and sophisticated wine shade symbolizes luxury, grace, and timeless femininity, making it an ideal outfit for weddings, receptions, festive gatherings, engagement ceremonies, cocktail parties, sangeet nights, and traditional functions. The glossy satin texture enhances the richness of the embroidery while offering a flattering and flowy silhouette. Designed with elegant embroidered buttas, heavy zari-inspired detailing, and luxurious floral embroidery patterns, this saree perfectly blends traditional Indian craftsmanship with contemporary festive fashion. The heavy embroidered border adds grandeur and richness to the overall look, creating a truly premium ethnic ensemble. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both classic traditional looks and modern designer draping styles. Soft, lightweight, and luxurious in appearance, this saree is ideal for women who love sophisticated festive fashion with timeless embroidery detailing. Key Details: Saree Color: Wine Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Zari Embroidery Work Design: Floral Embroidered Buttas & Designer Border Border: Rich Heavy Embroidered Border Work Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Elegant Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement functions, cocktail parties, family gatherings, pooja ceremonies, traditional events, and luxurious evening occasions . Style Tips: Pair with kundan jewellery, antique gold accessories, pearl chokers, or statement earrings for a royal ethnic look Style with soft curls, smokey eye makeup, highlighted cheeks, and nude glossy lips for elegant festive glamour Complete the look with embroidered heels, metallic clutches, or traditional potli bags Ideal for both daytime festive functions and grand evening celebrations This luxurious embroidered saree beautifully captures the richness of traditional artistry blended with premium satin elegance , making it a timeless festive statement piece for every modern ethnic wardrobe.",
    "shortDescription": "Elevate your festive elegance with this luxurious wine designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shine, smo...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0307_5a559a2e-b479-4b2c-9c29-c8eef0396cf1.jpg?v=1780393528",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0321.jpg?v=1780393529",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0322.jpg?v=1780393528",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0315_683ee26c-aea4-4bcb-a308-3c1e5d080820.jpg?v=1780393529",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0311.jpg?v=1780393528",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0317_c21cad7b-0484-4eb6-adb3-8224bf317ed1.jpg?v=1780393528",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0319.jpg?v=1780393528",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0305_be8330c4-9906-4dac-9ab9-05f555f116cb.jpg?v=1780393528",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0324.jpg?v=1780393528"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962975322",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 35 WINE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0307_5a559a2e-b479-4b2c-9c29-c8eef0396cf1.jpg?v=1780393528"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT035",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:24+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479269978",
    "title": "Emerald Green Designer Fendy Satin Saree with Heavy Floral Embroidery Work | Premium Wedding Party Wear Saree with Embroidered Border & Blouse",
    "slug": "emerald-green-designer-fendy-satin-saree-with-heavy-floral-embroidery-work-premium-wedding-party-wear-saree-with-embroidered-border-blouse",
    "sku": "AT 36 GREEN",
    "code": "EV-7934479269978",
    "description": "Make a graceful festive statement with this luxurious emerald green designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a glossy finish, elegant drape, and regal festive appeal. This exquisite saree is adorned with intricate heavy floral embroidery work featuring delicately embroidered floral motifs spread beautifully across the saree. The richly detailed embroidered border with traditional zig-zag and floral pattern artistry adds grandeur and sophistication to the overall look, making this saree a perfect choice for weddings and festive celebrations. The deep and elegant emerald green shade symbolizes royalty, prosperity, and timeless Indian tradition, making it ideal for receptions, weddings, engagement ceremonies, festive functions, cocktail events, pooja celebrations, and traditional gatherings. The luxurious satin texture enhances the richness of the embroidery while creating a soft, flowing, and flattering silhouette. Designed with detailed embroidered floral buttas, elegant thread and zari-inspired embroidery work, and a heavily embellished border and pallu, this saree beautifully blends modern luxury with classic ethnic craftsmanship. The intricate embroidery detailing creates a premium handcrafted finish that instantly elevates your festive look. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for both traditional draping and contemporary ethnic fashion. Soft, lightweight, and luxurious in appearance, this saree is designed for women who love graceful festive styling with rich handcrafted detailing. Key Details: Saree Color: Emerald Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Heavy Floral Embroidery Work Design: Embroidered Floral Buttas & Designer Border Border: Rich Heavy Embroidered Border Work Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Elegant Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, family gatherings, traditional celebrations, pooja functions, cocktail parties, and grand evening events . Style Tips: Pair with kundan jewellery, emerald stone accessories, antique gold jewellery, or pearl chokers for a royal ethnic look Style with soft curls, bold eyes, highlighted makeup, and nude glossy lips for festive glamour Complete the look with embroidered heels, metallic clutches, or traditional potli bags Ideal for both daytime traditional events and luxurious evening celebrations This luxurious embroidered saree beautifully captures the richness of traditional craftsmanship blended with premium satin elegance , making it a timeless festive masterpiece for every elegant ethnic wardrobe.",
    "shortDescription": "Make a graceful festive statement with this luxurious emerald green designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a glossy...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61211.jpg?v=1780393526",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61224.jpg?v=1780393526",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61225.jpg?v=1780393526",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61217.jpg?v=1780393526",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61214.jpg?v=1780393526",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61222.jpg?v=1780393526",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61223.jpg?v=1780393526",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61207.jpg?v=1780393525",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61227.jpg?v=1780393527"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441962942554",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 36 GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61211.jpg?v=1780393526"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT036",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:22+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479237210",
    "title": "Ruby Red Designer Fendy Satin Saree with Floral Embroidery Work | Premium Wedding Party Wear Saree with Heavy Embroidered Border & Blouse",
    "slug": "ruby-red-designer-fendy-satin-saree-with-floral-embroidery-work-premium-wedding-party-wear-saree-with-heavy-embroidered-border-blouse",
    "sku": "AT 36 MAROON",
    "code": "EV-7934479237210",
    "description": "Add regal elegance to your festive wardrobe with this luxurious ruby red designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a glossy texture, graceful drape, and sophisticated festive charm. This stunning saree features intricate floral embroidery work delicately spread across the saree, enhanced with a heavily embroidered designer border showcasing detailed traditional patterns and elegant craftsmanship. The beautifully embroidered floral motifs create a rich handcrafted appeal that perfectly complements the vibrant satin base. The bold and graceful ruby red shade symbolizes celebration, confidence, and timeless Indian beauty, making this saree an ideal choice for weddings, receptions, festive occasions, engagement ceremonies, cocktail parties, pooja functions, and traditional gatherings. The luxurious satin finish enhances the richness of the embroidery while creating a smooth and flattering silhouette. Designed with elegant embroidered floral buttas, intricate zari-inspired detailing, and a richly embellished border and pallu, this saree beautifully blends modern festive luxury with traditional ethnic craftsmanship. The detailed embroidery throughout the saree adds a premium designer finish, making it a standout festive statement piece. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both classic ethnic looks and modern festive fashion. Soft, lightweight, flowy, and luxurious in appearance, this saree is designed for women who appreciate elegant festive styling with rich handcrafted embroidery detailing. Key Details: Saree Color: Ruby Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery Work Design: Embroidered Floral Motifs & Designer Border Border: Heavy Embroidered Border Work Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Elegant Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, family functions, traditional gatherings, cocktail parties, pooja events, and luxurious evening occasions . Style Tips: Pair with kundan jewellery, ruby stone accessories, antique gold jewellery, or statement chokers for a royal ethnic look Style with soft curls, bold eyeliner, highlighted makeup, and glossy lips for festive glamour Complete the outfit with embroidered heels, metallic clutches, or ethnic potli bags Ideal for both daytime celebrations and grand evening festivities This luxurious embroidered saree beautifully captures the richness of traditional craftsmanship blended with premium satin elegance , making it a timeless festive masterpiece for every elegant ethnic wardrobe.",
    "shortDescription": "Add regal elegance to your festive wardrobe with this luxurious ruby red designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a g...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61166.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61178.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61179.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61172.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61168.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61175.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61176.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61177.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61162.jpg?v=1780393523",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61181.jpg?v=1780393523"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962909786",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 36 MAROON",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61166.jpg?v=1780393523"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT036",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:20+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479204442",
    "title": "Royal Purple Designer Fendy Satin Saree with Floral Embroidery Work | Premium Wedding Party Wear Saree with Heavy Embroidered Border & Blouse",
    "slug": "royal-purple-designer-fendy-satin-saree-with-floral-embroidery-work-premium-wedding-party-wear-saree-with-heavy-embroidered-border-blouse",
    "sku": "AT 36 PURPLE",
    "code": "EV-7934479204442",
    "description": "Add a touch of regal sophistication to your festive wardrobe with this luxurious royal purple designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a glossy sheen, graceful drape, and elegant festive appeal. This exquisite saree is adorned with intricate floral embroidery work featuring delicately embroidered floral motifs beautifully placed throughout the saree. The richly detailed embroidered border showcases elegant traditional patterns and fine craftsmanship, adding grandeur and premium elegance to the overall look. The rich and graceful royal purple shade symbolizes luxury, royalty, and timeless femininity, making this saree an ideal choice for weddings, receptions, festive celebrations, engagement ceremonies, cocktail events, sangeet nights, and traditional gatherings. The luxurious satin texture enhances the richness of the embroidery while creating a smooth and flattering silhouette. Designed with elegant embroidered floral buttas, intricate zari-inspired detailing, and a beautifully embellished border and pallu, this saree perfectly blends modern festive fashion with traditional Indian artistry. The embroidery detailing throughout the saree gives it a premium handcrafted finish that instantly elevates your ethnic look. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both classic traditional draping and contemporary designer styling. Soft, lightweight, and luxurious in appearance, this saree is designed for women who appreciate graceful festive fashion with elegant handcrafted embroidery detailing. Key Details: Saree Color: Royal Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery Work Design: Embroidered Floral Motifs & Designer Border Border: Heavy Embroidered Border Work Pallu: Designer Embroidered Pallu Texture: Soft, Glossy & Elegant Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, cocktail parties, traditional gatherings, family functions, pooja occasions, and luxurious evening events . Style Tips: Pair with kundan jewellery, diamond-style accessories, pearl chokers, or antique silver jewellery for a royal festive look Style with soft curls, shimmer eye makeup, highlighted cheeks, and glossy lips for elegant glamour Complete the outfit with embroidered heels, metallic clutch bags, or ethnic potli bags Ideal for both daytime festive celebrations and grand evening occasions This luxurious embroidered saree beautifully captures the richness of traditional craftsmanship blended with premium satin elegance , making it a timeless festive masterpiece for every modern ethnic wardrobe.",
    "shortDescription": "Add a touch of regal sophistication to your festive wardrobe with this luxurious royal purple designer saree , beautifully crafted in rich premium Fendy satin f...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61118.jpg?v=1780393522",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61130.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61131.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61129.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61120.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61123.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61126.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61127.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61136.jpg?v=1780393521",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61133.jpg?v=1780393521"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962877018",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 36 PURPLE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61118.jpg?v=1780393522"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT036",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:18+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479171674",
    "title": "Royal Blue Designer Fendy Satin Saree with Floral Embroidery Work | Premium Party Wear Saree with Heavy Embroidered Border & Blouse",
    "slug": "royal-blue-designer-fendy-satin-saree-with-floral-embroidery-work-premium-party-wear-saree-with-heavy-embroidered-border-blouse",
    "sku": "AT 36 RAMA",
    "code": "EV-7934479171674",
    "description": "Elevate your festive elegance with this stunning royal blue designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich sheen, graceful flow, and sophisticated drape. This exquisite saree features intricately detailed floral embroidery motifs beautifully spread across the saree, complemented by an elegant heavy embroidered border showcasing traditional craftsmanship and fine festive detailing. The luxurious embroidery work enhances the richness of the saree while adding a timeless ethnic charm. The deep and vibrant royal blue shade gives this saree a regal and premium appeal, making it a perfect choice for weddings, festive occasions, engagement ceremonies, receptions, cocktail parties, sangeet functions, and traditional celebrations. The saree is enhanced with beautifully embroidered floral buttas and a richly designed embroidered pallu that creates a grand and sophisticated festive look. The elegant zari-inspired embroidery patterns along the borders and motifs bring a graceful traditional touch blended perfectly with modern festive styling. Crafted from soft and lightweight Fendy satin fabric, this saree drapes beautifully and provides exceptional comfort while maintaining a luxurious festive appearance. The glossy satin texture adds depth and richness to the embroidery work, making the saree look effortlessly elegant. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for creating both traditional and contemporary ethnic looks. Perfectly designed for women who love timeless festive fashion with intricate handcrafted detailing, this saree becomes an instant statement piece for any grand celebration. Key Details: Saree Color: Royal Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery Work Design: Embroidered Floral Motifs & Traditional Border Border: Heavy Designer Embroidered Border Pallu: Rich Embroidered Pallu Texture: Soft, Smooth & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Ideal for weddings, receptions, festive functions, engagement ceremonies, traditional occasions, pooja events, evening parties, family celebrations, and ethnic festive gatherings . Style Tips: Pair with diamond jewellery, kundan sets, silver oxidised jewellery, or pearl accessories for a royal festive look Style with soft curls, smokey eyes, highlighted makeup, and glossy lips for elegant glamour Complete the outfit with embroidered heels, metallic clutch bags, or ethnic potli bags Perfect for both daytime festivities and glamorous evening occasions This luxurious embroidered saree beautifully combines rich satin elegance, traditional embroidery artistry, and modern festive sophistication , making it a timeless addition to every ethnic wardrobe.",
    "shortDescription": "Elevate your festive elegance with this stunning royal blue designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich shee...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61255.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61269.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61270.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61260.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61257.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61263.jpg?v=1780393519",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61266.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61268.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61251.jpg?v=1780393520",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61272.jpg?v=1780393520"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441962844250",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 36 RAMA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI61255.jpg?v=1780393520"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT036",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:16+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479138906",
    "title": "Rani Pink Designer Fendy Satin Saree with Heavy Embroidered Border | Festive Party Wear Saree with Floral Embroidery & Matching Blouse",
    "slug": "rani-pink-designer-fendy-satin-saree-with-heavy-embroidered-border-festive-party-wear-saree-with-floral-embroidery-matching-blouse",
    "sku": "AT 36 RED",
    "code": "EV-7934479138906",
    "description": "Add a touch of royal elegance to your festive wardrobe with this breathtaking rani pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich glossy finish, fluid drape, and graceful silhouette. This stunning saree is adorned with delicately crafted floral embroidery motifs spread elegantly across the saree, highlighted with a beautifully detailed heavy embroidered border inspired by traditional festive craftsmanship. The intricate embroidery work enhances the richness of the vibrant pink tone, creating a sophisticated and premium ethnic look. The vibrant rani pink shade adds bold festive charm and feminine elegance, making this saree a perfect choice for weddings, festive celebrations, engagement ceremonies, receptions, sangeet nights, family gatherings, cocktail parties, and grand traditional occasions. Designed with elegant floral embroidered buttas and an intricately detailed embroidered pallu, this saree beautifully blends timeless ethnic aesthetics with modern festive glamour. The luxurious satin texture reflects light beautifully, adding depth, richness, and a graceful festive shine to the overall look. Made from soft and lightweight Fendy satin fabric, this saree provides exceptional comfort while maintaining a grand festive appearance. The smooth texture and elegant fall make it easy to drape and style for long celebrations and special occasions. Paired with a matching unstitched blouse piece , this saree allows versatile styling options to create both classic traditional and contemporary designer ethnic looks. This saree is specially crafted for women who appreciate luxurious festive fashion with elegant embroidery detailing and timeless sophistication. Key Details: Saree Color: Rani Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery Work Design: Designer Embroidered Floral Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, pooja functions, traditional gatherings, engagement ceremonies, sangeet nights, cocktail parties, festive events, and special occasions . Style Tips: Pair with kundan jewellery, diamond accessories, chandbalis, or statement necklaces for a regal festive appearance Style with soft curls, glowing makeup, winged eyeliner, and nude or glossy lips for an elegant look Complete the outfit with embroidered heels, metallic clutches, or traditional potli bags Perfect for both daytime festive styling and glamorous evening celebrations This luxurious embroidered saree beautifully combines traditional embroidery artistry, rich satin elegance, and modern festive glamour , making it a timeless statement piece for every ethnic wardrobe.",
    "shortDescription": "Add a touch of royal elegance to your festive wardrobe with this breathtaking rani pink designer saree , beautifully crafted in luxurious premium Fendy satin fa...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60054.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60065.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60068.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60060.jpg?v=1780393519",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60057.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60062.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60063.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60067.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60049.jpg?v=1780393518",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI0070.jpg?v=1780393519"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962811482",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 36 RED",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI60054.jpg?v=1780393518"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT036",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:15+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479106138",
    "title": "Wine Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Floral Embroidery & Matching Blouse",
    "slug": "wine-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-floral-embroidery-matching-blouse",
    "sku": "AT 36 WINE",
    "code": "EV-7934479106138",
    "description": "Grace your festive wardrobe with timeless elegance in this luxurious wine designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, fluid drape, and sophisticated festive appeal. This stunning saree is adorned with delicately crafted embroidered floral motifs spread elegantly across the saree, paired with a beautifully detailed heavy embroidered border inspired by traditional ethnic artistry. The intricate embroidery work enhances the richness of the deep wine shade, creating a regal and premium festive look. The elegant wine color tone adds royal charm and sophisticated glamour, making this saree a perfect choice for weddings, festive celebrations, engagement ceremonies, receptions, cocktail parties, sangeet nights, pooja functions, and grand traditional occasions. The saree features graceful floral embroidery buttas combined with a richly embroidered designer pallu that beautifully blends traditional craftsmanship with modern festive styling. The luxurious satin sheen reflects light beautifully, adding depth and richness to the overall appearance. Crafted from soft and lightweight Fendy satin fabric, this saree ensures all-day comfort while maintaining a grand festive silhouette. The smooth satin texture enhances the embroidery detailing and allows elegant draping for every special occasion. Paired with a matching unstitched blouse piece , this saree offers versatile styling options for creating both contemporary and traditional ethnic looks. Designed for women who appreciate luxurious festive fashion with intricate embroidery and timeless elegance, this saree becomes an eye-catching statement piece for every celebration. Key Details: Saree Color: Wine Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Floral Embroidery Work Design: Designer Embroidered Floral Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive functions, pooja ceremonies, engagement celebrations, family gatherings, cocktail parties, traditional events, and festive occasions . Style Tips: Pair with kundan jewellery, antique gold accessories, statement chokers, or diamond sets for a regal festive appearance Style with soft curls, smokey eye makeup, highlighted cheeks, and bold lips for glamorous elegance Complete the outfit with embroidered heels, metallic clutches, or ethnic potli bags Ideal for both daytime festive styling and elegant evening celebrations This luxurious embroidered saree beautifully combines rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a must-have addition to every premium festive wardrobe.",
    "shortDescription": "Grace your festive wardrobe with timeless elegance in this luxurious wine designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich ...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0007.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0021.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0022.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0014.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0012.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0018.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0020.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0005.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0026_8bf5e532-1eff-456c-b0f2-327f1d624c57.jpg?v=1780393517"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962778714",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 36 WINE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_0007.jpg?v=1780393517"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT036",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:13+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479073370",
    "title": "Emerald Green Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Intricate Embroidery & Matching Blouse",
    "slug": "emerald-green-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-intricate-embroidery-matching-blouse",
    "sku": "AT 37 GREEN",
    "code": "EV-7934479073370",
    "description": "Step into timeless elegance with this luxurious emerald green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, graceful drape, and regal festive charm. This exquisite saree features delicately crafted intricate embroidery motifs spread elegantly across the saree, enhanced with a beautifully detailed heavy embroidered border inspired by traditional ethnic craftsmanship. The artistic embroidery work adds richness and sophistication to the deep emerald green shade, creating a graceful and premium festive look. The stunning emerald green color symbolizes elegance, royalty, and festive beauty, making this saree a perfect choice for weddings, festive celebrations, receptions, engagement functions, cocktail parties, pooja ceremonies, sangeet nights, and traditional family occasions. Designed with elegant embroidered motifs and a richly crafted embroidered pallu, this saree beautifully combines traditional artistry with contemporary festive fashion. The luxurious satin sheen enhances the embroidery detailing and gives the saree a grand and eye-catching appearance. Crafted from soft and lightweight Fendy satin fabric, this saree ensures exceptional comfort while maintaining a sophisticated festive silhouette. The smooth texture and fluid drape make it ideal for long celebrations and elegant occasion wear styling. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for both modern designer looks and classic ethnic elegance. Perfectly designed for women who appreciate luxurious festive fashion with timeless embroidery artistry and graceful sophistication. Key Details: Saree Color: Emerald Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, traditional functions, pooja ceremonies, engagement events, family gatherings, festive parties, and special ethnic occasions . Style Tips: Pair with emerald jewellery, kundan sets, antique gold accessories, or statement chokers for a royal festive appearance Style with soft curls, glowing makeup, smokey eyes, and nude glossy lips for elegant glamour Complete the look with embroidered heels, metallic clutch bags, or traditional potli bags Ideal for both daytime festive styling and glamorous evening occasions This luxurious embroidered saree beautifully blends rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a statement addition to every premium festive wardrobe.",
    "shortDescription": "Step into timeless elegance with this luxurious emerald green designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy textu...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1300.jpg?v=1780393515",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1311.jpg?v=1780393515",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1312.jpg?v=1780393516",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1304.jpg?v=1780393517",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1303.jpg?v=1780393515",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1308.jpg?v=1780393516",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1310.jpg?v=1780393515",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1315.jpg?v=1780393515",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1314.jpg?v=1780393515"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441962745946",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 37 GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/J_1300.jpg?v=1780393515"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT037",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:12+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479040602",
    "title": "Maroon Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Wedding Party Wear Saree with Intricate Embroidery & Matching Blouse",
    "slug": "maroon-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-wedding-party-wear-saree-with-intricate-embroidery-matching-blouse",
    "sku": "AT 37 MAROON",
    "code": "EV-7934479040602",
    "description": "Enhance your festive elegance with this luxurious maroon designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, graceful drape, and sophisticated ethnic appeal. This exquisite saree is adorned with beautifully detailed intricate embroidery motifs elegantly spread across the saree, highlighted with a richly crafted heavy embroidered border inspired by timeless traditional artistry. The delicate embroidery work enhances the depth and richness of the maroon shade, creating a royal and premium festive look. The deep and elegant maroon color symbolizes timeless beauty and festive sophistication, making this saree an ideal choice for weddings, receptions, festive celebrations, engagement ceremonies, cocktail parties, sangeet nights, pooja functions, and traditional family occasions. Designed with elegant embroidered motifs and a richly detailed embroidered pallu, this saree perfectly blends classic ethnic craftsmanship with modern designer styling. The luxurious satin sheen beautifully reflects light, enhancing the embroidery details and giving the saree a grand festive appearance. Crafted from soft and lightweight Fendy satin fabric, this saree ensures exceptional comfort while maintaining a rich and elegant silhouette. The smooth texture and fluid drape make it ideal for long festive celebrations and glamorous occasion wear styling. Paired with a matching unstitched blouse piece , this saree offers versatile styling possibilities for creating both traditional and contemporary ethnic looks. Perfectly designed for women who appreciate luxurious festive fashion with intricate craftsmanship and timeless sophistication. Key Details: Saree Color: Maroon Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive functions, engagement ceremonies, traditional celebrations, pooja occasions, family gatherings, cocktail parties, and grand festive events . Style Tips: Pair with kundan jewellery, emerald accessories, antique gold sets, or statement chokers for a regal festive look Style with soft curls, bold eye makeup, highlighted cheeks, and glossy lips for elegant glamour Complete the look with embroidered heels, metallic clutch bags, or traditional potli bags Ideal for both daytime festive elegance and glamorous evening celebrations This luxurious embroidered saree beautifully combines rich satin elegance, detailed festive embroidery, and timeless ethnic sophistication , making it a perfect statement piece for every premium festive wardrobe.",
    "shortDescription": "Enhance your festive elegance with this luxurious maroon designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, gr...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81362.jpg?v=1780393513",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81374.jpg?v=1780393514",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81375.jpg?v=1780393515",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81373.jpg?v=1780393514",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81366.jpg?v=1780393514",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81367.jpg?v=1780393514",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81371.jpg?v=1780393514",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1358.jpg?v=1780393514",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81377.jpg?v=1780393514"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962713178",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 37 MAROON",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81362.jpg?v=1780393513"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT037",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:10+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934479007834",
    "title": "Royal Purple Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Intricate Embroidery & Matching Blouse",
    "slug": "royal-purple-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-intricate-embroidery-matching-blouse",
    "sku": "AT 37 PURPLE",
    "code": "EV-7934479007834",
    "description": "Drape yourself in timeless elegance with this luxurious royal purple designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, graceful flow, and sophisticated festive appeal. This exquisite saree features delicately detailed intricate embroidery motifs elegantly spread across the saree, complemented by a richly crafted heavy embroidered border inspired by traditional ethnic artistry. The fine embroidery work beautifully enhances the richness of the royal purple shade, creating a regal and premium festive look. The elegant royal purple color symbolizes luxury, grace, and timeless beauty, making this saree a perfect choice for weddings, receptions, festive celebrations, engagement ceremonies, cocktail parties, sangeet nights, pooja functions, and grand traditional occasions. Designed with graceful embroidered motifs and a richly detailed embroidered pallu, this saree beautifully blends traditional craftsmanship with modern festive fashion. The luxurious satin sheen adds depth and richness to the embroidery work, giving the saree a glamorous and elegant appearance. Crafted from soft and lightweight Fendy satin fabric, this saree ensures exceptional comfort while maintaining a rich festive silhouette. The smooth satin texture and fluid drape make it ideal for long celebrations and sophisticated occasion wear styling. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for both contemporary designer looks and timeless ethnic elegance. Perfectly designed for women who appreciate luxurious festive fashion with intricate craftsmanship and royal sophistication. Key Details: Saree Color: Royal Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, receptions, festive celebrations, pooja ceremonies, engagement functions, traditional gatherings, cocktail parties, family occasions, and festive events . Style Tips: Pair with kundan jewellery, pearl chokers, diamond accessories, or antique gold sets for a royal festive appearance Style with soft curls, glowing makeup, smokey eyes, and glossy lips for elegant glamour Complete the look with embroidered heels, metallic clutches, or traditional potli bags Ideal for both daytime festive elegance and glamorous evening celebrations This luxurious embroidered saree beautifully combines rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a statement addition to every premium festive wardrobe.",
    "shortDescription": "Drape yourself in timeless elegance with this luxurious royal purple designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich gloss...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81406.jpg?v=1780393513",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81422.jpg?v=1780393513",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81423.jpg?v=1780393512",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81414.jpg?v=1780393512",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81411.jpg?v=1780393512",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81415.jpg?v=1780393513",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81417.jpg?v=1780393512",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81419.jpg?v=1780393512",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81404.jpg?v=1780393512",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81425.jpg?v=1780393512"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962680410",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 37 PURPLE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81406.jpg?v=1780393513"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT037",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:09+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478975066",
    "title": "Royal Blue Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Intricate Embroidery & Matching Blouse",
    "slug": "royal-blue-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-intricate-embroidery-matching-blouse",
    "sku": "AT 37 RAMA",
    "code": "EV-7934478975066",
    "description": "Make a graceful festive statement with this luxurious royal blue designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy texture, elegant drape, and timeless festive sophistication. This stunning saree is adorned with delicately crafted intricate embroidery motifs elegantly spread across the saree, highlighted with a richly detailed heavy embroidered border inspired by traditional ethnic artistry. The fine embroidery work beautifully enhances the richness of the royal blue shade, creating a regal and premium festive appearance. The elegant royal blue color symbolizes royalty, confidence, and timeless beauty, making this saree a perfect choice for weddings, festive celebrations, receptions, engagement ceremonies, cocktail parties, sangeet functions, pooja occasions, and traditional family gatherings. Designed with graceful embroidered motifs and a beautifully detailed embroidered pallu, this saree perfectly blends classic craftsmanship with modern festive styling. The luxurious satin sheen adds depth and richness to the embroidery details, giving the saree a glamorous and eye-catching look. Crafted from soft and lightweight Fendy satin fabric, this saree ensures exceptional comfort while maintaining a grand festive silhouette. The smooth satin texture and elegant fall make it ideal for long celebrations and sophisticated occasion wear styling. Paired with a matching unstitched blouse piece , this saree allows versatile styling options for creating both contemporary designer looks and timeless traditional elegance. Perfectly designed for women who appreciate luxurious festive fashion with intricate craftsmanship and refined ethnic glamour. Key Details: Saree Color: Royal Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, pooja ceremonies, engagement functions, traditional gatherings, cocktail parties, festive evenings, and special occasions . Style Tips: Pair with diamond jewellery, emerald accessories, kundan sets, or statement chokers for a regal festive look Style with soft curls, smokey eye makeup, highlighted cheeks, and glossy lips for elegant glamour Complete the look with embroidered heels, metallic clutch bags, or traditional potli bags Ideal for both daytime festive elegance and glamorous evening celebrations This luxurious embroidered saree beautifully combines rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a statement addition to every premium festive wardrobe.",
    "shortDescription": "Make a graceful festive statement with this luxurious royal blue designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy te...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81342.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81353.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1354.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81347.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81343.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81348.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81349.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81352.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81337.jpg?v=1780393511",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1356.jpg?v=1780393511"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441962647642",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 37 RAMA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81342.jpg?v=1780393511"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT037",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:07+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478942298",
    "title": "Bright Red Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Intricate Embroidery & Matching Blouse",
    "slug": "bright-red-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-intricate-embroidery-matching-blouse",
    "sku": "AT 37 RED",
    "code": "EV-7934478942298",
    "description": "Elevate your festive wardrobe with this breathtaking bright red designer saree , crafted in luxurious premium Fendy satin fabric that beautifully combines rich shine, graceful drape, and timeless ethnic elegance. This exquisite saree features finely detailed intricate embroidery motifs elegantly placed throughout the saree, enhanced with a stunning heavy embroidered border inspired by traditional festive craftsmanship. The detailed embroidery work paired with the vibrant bright red shade creates a regal and glamorous festive appearance perfect for grand occasions. The bold bright red color symbolizes celebration, beauty, love, and traditional elegance, making this saree an ideal choice for weddings, festive celebrations, receptions, engagement ceremonies, sangeet nights, cocktail parties, and cultural gatherings. The saree showcases a beautifully embroidered pallu with delicate artistic detailing that adds richness and sophistication to the overall look. The luxurious satin texture gives the saree a graceful fluid drape and enhances the intricate embroidery work with a subtle glossy finish. Made from soft and lightweight Fendy satin fabric, this saree offers excellent comfort while maintaining a premium festive silhouette. Its elegant fall and rich texture make it perfect for long celebrations and statement ethnic styling. Paired with a matching unstitched blouse piece , this saree allows versatile designer customization to create both traditional and modern festive looks. Perfect for women who appreciate luxurious ethnic fashion with timeless festive glamour and elegant craftsmanship. Key Details: Saree Color: Bright Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, bridal functions, pooja celebrations, traditional gatherings, cocktail parties, and festive evening events . Style Tips: Pair with kundan jewellery, temple jewellery, diamond accessories, or statement chokers for a royal festive appearance Style with soft curls, bold eye makeup, highlighted cheeks, and classic red lips for glamorous elegance Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both traditional day celebrations and glamorous night occasions This luxurious embroidered saree beautifully blends rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a must-have addition to every premium festive wardrobe.",
    "shortDescription": "Elevate your festive wardrobe with this breathtaking bright red designer saree , crafted in luxurious premium Fendy satin fabric that beautifully combines rich ...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81498.jpg?v=1780393509",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81509.jpg?v=1780393509",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81510.jpg?v=1780393509",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81503.jpg?v=1780393509",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81501.jpg?v=1780393509",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81507.jpg?v=1780393510",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81508.jpg?v=1780393509",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARi81493.jpg?v=1780393509",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81512.jpg?v=1780393509"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962614874",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 37 RED",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81498.jpg?v=1780393509"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT037",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:06+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478909530",
    "title": "Wine Maroon Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Elegant Embroidery & Matching Blouse",
    "slug": "wine-maroon-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-elegant-embroidery-matching-blouse",
    "sku": "AT 37 WINE",
    "code": "EV-7934478909530",
    "description": "Add timeless festive elegance to your wardrobe with this luxurious wine maroon designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shine, fluid drape, and regal ethnic charm. This exquisite saree features finely detailed intricate embroidered motifs elegantly spread across the saree, highlighted with a richly designed heavy embroidered border inspired by classic festive artistry. The sophisticated embroidery detailing paired with the deep wine maroon shade creates a glamorous and royal festive look. The stunning wine maroon color symbolizes richness, sophistication, and timeless beauty, making this saree a perfect choice for weddings, festive celebrations, receptions, engagement ceremonies, cocktail parties, traditional functions, and grand evening occasions. The saree showcases a beautifully crafted embroidered pallu with delicate artistic patterns that enhance the luxurious appearance of the outfit. The soft glossy texture of the satin fabric beautifully reflects light and elevates the intricate embroidery work. Crafted from lightweight and smooth Fendy satin fabric, this saree ensures all-day comfort while maintaining a rich designer silhouette. The elegant flow and premium finish make it ideal for women who love graceful festive styling with a luxurious touch. Comes paired with a matching unstitched blouse piece , allowing versatile customization for both modern and traditional festive looks. Perfect for women who appreciate premium ethnic fashion with elegant craftsmanship and luxurious festive aesthetics. Key Details: Saree Color: Wine Maroon Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, engagement ceremonies, receptions, cocktail parties, family functions, pooja celebrations, traditional gatherings, and festive evening events . Style Tips: Pair with kundan jewellery, antique gold jewellery, temple jewellery, or statement chokers for a regal festive appearance Style with soft curls, smoky eye makeup, highlighted cheeks, and deep nude or wine lips for glamorous elegance Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Perfect for both traditional daytime functions and elegant evening celebrations This luxurious embroidered saree beautifully blends rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a perfect statement piece for every festive and wedding wardrobe.",
    "shortDescription": "Add timeless festive elegance to your wardrobe with this luxurious wine maroon designer saree , beautifully crafted in rich premium Fendy satin fabric that offe...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81450.jpg?v=1780393507",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1465.jpg?v=1780393508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81466.jpg?v=1780393507",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMAR81460.jpg?v=1780393507",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81455.jpg?v=1780393507",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI1461.jpg?v=1780393507",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81464.jpg?v=1780393508",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81448.jpg?v=1780393507",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81468.jpg?v=1780393508"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962582106",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 37 WINE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI81450.jpg?v=1780393507"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT037",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:04+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478876762",
    "title": "Emerald Green Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Elegant Floral Embroidery & Matching Blouse",
    "slug": "emerald-green-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-elegant-floral-embroidery-matching-blouse",
    "sku": "AT 38 GREEN",
    "code": "EV-7934478876762",
    "description": "Step into timeless elegance with this luxurious emerald green designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shine, smooth drape, and sophisticated festive appeal. This stunning saree is adorned with delicately crafted embroidered floral motifs spread elegantly across the saree, enhanced with a richly detailed heavy embroidered border that adds grandeur and regal charm to the overall design. The intricate craftsmanship paired with the deep emerald green tone creates a graceful and luxurious ethnic statement. The rich emerald green color symbolizes royalty, freshness, prosperity, and festive elegance, making this saree a perfect choice for weddings, festive celebrations, engagement ceremonies, receptions, cocktail parties, pooja functions, and traditional gatherings. The saree features a beautifully embroidered pallu with elegant detailing that enhances its luxurious festive appearance. The glossy satin texture gives the saree a rich sheen and flowing silhouette, creating a sophisticated designer look. Crafted from lightweight and soft Fendy satin fabric, this saree ensures all-day comfort while maintaining a premium festive drape. The luxurious texture and refined embroidery make it ideal for women who appreciate timeless ethnic glamour with modern elegance. Comes paired with a matching unstitched blouse piece , allowing versatile customization for both classic and contemporary festive styling. Perfect for women who love premium ethnic fashion with rich embroidery and elegant festive sophistication. Key Details: Saree Color: Emerald Green Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Floral Embroidery Work Design: Designer Embroidered Floral Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, receptions, engagement ceremonies, sangeet nights, pooja celebrations, family gatherings, traditional functions, and festive evening parties . Style Tips: Pair with kundan jewellery, emerald stone jewellery, temple jewellery, or statement chokers for a royal festive look Style with soft curls, glowing makeup, defined eyes, and nude or deep maroon lips for elegant festive glamour Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both daytime traditional events and glamorous evening celebrations This luxurious embroidered saree beautifully combines rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a must-have statement piece for every festive and wedding wardrobe.",
    "shortDescription": "Step into timeless elegance with this luxurious emerald green designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shi...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100023.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI00037.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100039.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100030.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100027.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100033.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100035.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100020.jpg?v=1780393506",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100041.jpg?v=1780393506"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441962549338",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 38 GREEN",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100023.jpg?v=1780393506"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT038",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:03+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478843994",
    "title": "Ruby Red Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Elegant Floral Embroidery & Matching Blouse",
    "slug": "ruby-red-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-elegant-floral-embroidery-matching-blouse",
    "sku": "AT 38 MAROON",
    "code": "EV-7934478843994",
    "description": "Make a grand festive statement with this luxurious ruby red designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shine, smooth texture, and elegant drape. This exquisite saree is adorned with finely detailed embroidered floral motifs spread artistically across the saree, highlighted with a richly crafted heavy embroidered border that enhances its regal festive appeal. The intricate embroidery work paired with the vibrant ruby red tone creates a timeless and sophisticated ethnic look. The rich ruby red color symbolizes celebration, love, grace, and traditional elegance, making this saree a perfect choice for weddings, festive occasions, engagement ceremonies, receptions, cocktail parties, pooja celebrations, and traditional gatherings. The saree features a beautifully embroidered pallu with elegant detailing that enhances the luxurious appearance of the outfit. The glossy satin finish gives the saree a rich festive sheen while maintaining a soft and flowing silhouette. Crafted from lightweight and comfortable Fendy satin fabric, this saree ensures effortless draping and all-day elegance. The luxurious texture and graceful fall make it ideal for women who appreciate refined festive fashion with timeless embroidery craftsmanship. Comes paired with a matching unstitched blouse piece , allowing versatile customization for both traditional and modern festive styling. Perfect for women who love premium ethnic wear with luxurious embroidery and sophisticated festive elegance. Key Details: Saree Color: Ruby Red Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Floral Embroidery Work Design: Designer Embroidered Floral Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, family functions, pooja occasions, cultural gatherings, cocktail parties, and festive evening events . Style Tips: Pair with kundan jewellery, temple jewellery, diamond accessories, or statement chokers for a royal festive appearance Style with soft curls, glowing makeup, highlighted eyes, and bold red or nude lips for glamorous elegance Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both traditional daytime events and glamorous evening celebrations This luxurious embroidered saree beautifully combines rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a must-have statement piece for every festive and wedding wardrobe.",
    "shortDescription": "Make a grand festive statement with this luxurious ruby red designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shine...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101561.jpg?v=1780393505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01573.jpg?v=1780393505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01575.jpg?v=1780393505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01567.jpg?v=1780393504",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101565.jpg?v=1780393505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01570.jpg?v=1780393505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01572.jpg?v=1780393505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101560.jpg?v=1780393504",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01577.jpg?v=1780393505"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962516570",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 38 MAROON",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101561.jpg?v=1780393505"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT038",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:01+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478811226",
    "title": "Royal Purple Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Elegant Floral Embroidery & Matching Blouse",
    "slug": "royal-purple-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-elegant-floral-embroidery-matching-blouse",
    "sku": "AT 38 PURPLE",
    "code": "EV-7934478811226",
    "description": "This stunning saree is adorned with intricately crafted embroidered floral motifs elegantly spread across the saree, enhanced with a richly detailed heavy embroidered border that adds regal charm and festive sophistication. The delicate embroidery work paired with the rich royal purple shade creates a timeless ethnic statement perfect for grand celebrations. The elegant royal purple color symbolizes luxury, grace, royalty, and festive elegance, making this saree a perfect choice for weddings, festive functions, receptions, engagement ceremonies, cocktail parties, pooja celebrations, and traditional gatherings. The saree features a beautifully embroidered pallu with refined detailing that enhances the luxurious appearance of the outfit. The glossy satin finish beautifully reflects light and gives the saree a graceful flowing silhouette. Crafted from lightweight and soft Fendy satin fabric, this saree ensures all-day comfort while maintaining a rich designer look. The premium texture and elegant embroidery make it ideal for women who appreciate timeless ethnic fashion with luxurious festive appeal. Comes paired with a matching unstitched blouse piece , allowing versatile customization for both traditional and contemporary festive styling. Perfect for women who love premium ethnic wear with sophisticated embroidery and graceful festive glamour. Key Details: Saree Color: Royal Purple Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Floral Embroidery Work Design: Designer Embroidered Floral Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive occasions, engagement ceremonies, receptions, family functions, pooja celebrations, traditional gatherings, cocktail parties, and festive evening events . Style Tips: Pair with kundan jewellery, temple jewellery, emerald accessories, or statement chokers for a royal festive appearance Style with soft curls, glowing makeup, bold eyes, and mauve or nude lips for elegant festive glamour Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both traditional daytime functions and glamorous evening celebrations This luxurious embroidered saree beautifully combines rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a must-have statement piece for every festive and wedding wardrobe.",
    "shortDescription": "This stunning saree is adorned with intricately crafted embroidered floral motifs elegantly spread across the saree, enhanced with a richly detailed heavy embro...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100113.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI00126.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100128.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI00120.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI00117.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI00121.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100122.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100124.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI00109.jpg?v=1780393503",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100130.jpg?v=1780393503"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962483802",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 38 PURPLE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100113.jpg?v=1780393503"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT038",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:15:00+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478778458",
    "title": "Royal Blue Designer Fendy Satin Saree with Heavy Embroidered Border | Premium Festive Party Wear Saree with Elegant Floral Embroidery & Matching Blouse",
    "slug": "royal-blue-designer-fendy-satin-saree-with-heavy-embroidered-border-premium-festive-party-wear-saree-with-elegant-floral-embroidery-matching-blouse",
    "sku": "AT 38 RAMA",
    "code": "EV-7934478778458",
    "description": "Bring timeless festive glamour to your wardrobe with this luxurious royal blue designer saree , beautifully crafted in rich premium Fendy satin fabric that offers a graceful shine, smooth texture, and elegant drape. This exquisite saree features delicately crafted embroidered floral motifs elegantly spread across the saree, enhanced with a richly detailed heavy embroidered border that adds regal sophistication and festive charm. The intricate embroidery work combined with the deep royal blue tone creates a refined and luxurious ethnic statement. The stunning royal blue color symbolizes grace, confidence, elegance, and modern royalty, making this saree a perfect choice for weddings, festive occasions, receptions, engagement ceremonies, cocktail parties, traditional functions, and grand celebrations. The saree showcases a beautifully embroidered pallu with elegant detailing that enhances its premium festive appearance. The glossy satin finish gives the saree a luxurious sheen while maintaining a soft and graceful flowing silhouette. Crafted from lightweight and soft Fendy satin fabric, this saree ensures comfortable wear throughout long festive occasions while maintaining a rich designer look. The premium finish and elegant embroidery make it ideal for women who appreciate timeless ethnic fashion with luxurious festive elegance. Comes paired with a matching unstitched blouse piece , allowing versatile customization for both modern and traditional festive styling. Perfect for women who love premium ethnic wear with elegant embroidery and sophisticated festive glamour. Key Details: Saree Color: Royal Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Floral Embroidery Work Design: Designer Embroidered Floral Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, sangeet nights, pooja functions, family gatherings, traditional occasions, cocktail parties, and festive evening events . Style Tips: Pair with diamond jewellery, kundan jewellery, emerald accessories, or statement chokers for a regal festive look Style with soft curls, glowing makeup, highlighted eyes, and nude or bold lips for glamorous elegance Complete the look with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both traditional daytime events and elegant evening celebrations This luxurious embroidered saree beautifully blends rich satin elegance, intricate festive embroidery, and timeless ethnic sophistication , making it a must-have statement piece for every festive and wedding wardrobe.",
    "shortDescription": "Bring timeless festive glamour to your wardrobe with this luxurious royal blue designer saree , beautifully crafted in rich premium Fendy satin fabric that offe...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100070.jpg?v=1780393502",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100081.jpg?v=1780393502",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100083.jpg?v=1780393502",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI00075.jpg?v=1780393502",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100073.jpg?v=1780393501",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100078.jpg?v=1780393502",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100080.jpg?v=1780393502",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100065.jpg?v=1780393502",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100084.jpg?v=1780393501"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441962451034",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 38 RAMA",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI100070.jpg?v=1780393502"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "_mcaf_AT038",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:14:58+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478745690",
    "title": "Rani Pink Designer Fendy Satin Saree with Heavy Embroidered Border | Elegant Festive Party Wear Saree with Floral Embroidery & Matching Blouse",
    "slug": "rani-pink-designer-fendy-satin-saree-with-heavy-embroidered-border-elegant-festive-party-wear-saree-with-floral-embroidery-matching-blouse",
    "sku": "AT 38 RED",
    "code": "EV-7934478745690",
    "description": "Elevate your festive wardrobe with this stunning rani pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful shine, soft texture, and elegant fluid drape. Designed to capture timeless festive elegance, this saree features intricate silver floral embroidery motifs delicately placed all over the saree, paired with a richly detailed heavy embroidered border that enhances its regal and sophisticated appearance. The luxurious embroidery work beautifully complements the vibrant rani pink shade, creating a statement ethnic ensemble perfect for grand celebrations. The rich rani pink color symbolizes femininity, celebration, glamour, and festive charm, making this saree an ideal choice for weddings, receptions, festive occasions, engagement ceremonies, traditional events, cocktail parties, and cultural celebrations. The saree comes with a beautifully embroidered pallu that adds graceful movement and premium festive appeal. The lightweight satin texture ensures comfortable wear while maintaining a rich designer look throughout the day and evening. Crafted with premium-quality Fendy satin fabric, this saree offers a smooth finish, elegant fall, and luxurious sheen that instantly enhances your ethnic style. The intricate embroidery detailing makes it perfect for women who love timeless festive fashion with modern elegance. Comes paired with a matching unstitched blouse piece , allowing you to customize your blouse design according to your personal style preference. Perfect for festive celebrations, wedding functions, family gatherings, and elegant traditional occasions. Key Details: Saree Color: Rani Pink Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Floral Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive celebrations, receptions, engagement ceremonies, sangeet nights, pooja functions, family gatherings, festive parties, cultural events, and traditional occasions . Style Tips: Pair with kundan jewellery, diamond sets, pearl accessories, or statement chandbalis for a luxurious festive look Style with soft curls, bold eye makeup, highlighted cheeks, and glossy lips for glamorous elegance Complete the outfit with embroidered heels, metallic clutch bags, or festive potli bags Ideal for both daytime festive celebrations and elegant evening events This luxurious embroidered saree beautifully blends vibrant festive charm, premium satin elegance, and timeless ethnic sophistication , making it a must-have addition to every festive and wedding collection.",
    "shortDescription": "Elevate your festive wardrobe with this stunning rani pink designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a graceful s...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101648.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101663.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101666.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101656.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101652.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101658.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101660.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101661.jpg?v=1780393501",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101664.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101646.jpg?v=1780393500",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101669.jpg?v=1780393500"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962418266",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 38 RED",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101648.jpg?v=1780393500"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT038",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:14:57+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478712922",
    "title": "Wine Maroon Designer Fendy Satin Saree with Heavy Embroidered Border | Elegant Party Wear Festive Saree with Floral Embroidery & Matching Blouse",
    "slug": "wine-maroon-designer-fendy-satin-saree-with-heavy-embroidered-border-elegant-party-wear-festive-saree-with-floral-embroidery-matching-blouse",
    "sku": "AT 38 WINE",
    "code": "EV-7934478712922",
    "description": "Make a graceful festive statement with this luxurious wine maroon designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy finish, soft texture, and elegant drape. This stunning saree is adorned with intricate silver floral embroidery motifs delicately spread across the saree, adding a timeless regal charm to the entire look. The beautifully crafted heavy embroidered border enhances the richness of the saree and gives it a sophisticated festive appeal perfect for grand occasions. The deep wine maroon shade reflects elegance, luxury, and traditional beauty, making this saree a perfect choice for weddings, festive celebrations, engagement ceremonies, receptions, cultural gatherings, cocktail parties, and special traditional occasions. The saree features a richly embroidered pallu with detailed craftsmanship that adds graceful movement and a premium designer finish. The lightweight satin fabric ensures comfortable wear while maintaining a luxurious ethnic look throughout the event. Crafted for modern women who appreciate traditional artistry with contemporary elegance, this saree blends classic embroidery with rich festive color tones to create a truly eye-catching ensemble. Comes paired with a matching unstitched blouse piece , allowing you to style it according to your desired neckline and sleeve pattern. Key Details: Saree Color: Wine Maroon Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Floral Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Smooth & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for wedding functions, receptions, festive parties, engagement ceremonies, pooja functions, family celebrations, traditional events, cocktail nights, and festive gatherings . Style Tips: Pair with kundan jewellery, diamond accessories, pearl chokers, or statement earrings for a royal festive look Style with soft curls, smokey eyes, highlighted makeup, and nude or wine-toned lips for elegant glamour Complete the look with embroidered heels, metallic clutch bags, or ethnic potli bags Ideal for both daytime traditional functions and elegant evening celebrations This luxurious embroidered saree beautifully combines rich festive elegance, premium satin drape, and timeless traditional craftsmanship , making it a must-have addition to every festive and wedding wardrobe.",
    "shortDescription": "Make a graceful festive statement with this luxurious wine maroon designer saree , beautifully crafted in premium Fendy satin fabric that offers a rich glossy f...",
    "price": 5249,
    "compareAtPrice": 15747,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101607.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01620.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101622.jpg?v=1780393498",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101615.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01611.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01619.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101613.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101616.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101604.jpg?v=1780393499",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI01624.jpg?v=1780393499"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree"
    ],
    "variants": [
      {
        "id": "var-43441962385498",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5249,
        "compareAtPrice": 15747,
        "inStock": true,
        "sku": "AT 38 WINE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI101607.jpg?v=1780393499"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT038",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:14:55+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7934478680154",
    "title": "Sky Blue Designer Fendy Satin Saree with Heavy Embroidered Border | Elegant Festive Party Wear Saree with Intricate Embroidery & Matching Blouse",
    "slug": "sky-blue-designer-fendy-satin-saree-with-heavy-embroidered-border-elegant-festive-party-wear-saree-with-intricate-embroidery-matching-blouse",
    "sku": "AT 39 AQUA BLUE",
    "code": "EV-7934478680154",
    "description": "Bring timeless grace to your festive wardrobe with this stunning sky blue designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offers a rich sheen, soft texture, and graceful drape. This elegant saree features delicate all-over intricate embroidered motifs that add subtle festive charm and refined sophistication to the entire ensemble. The saree is further enhanced with a beautifully crafted heavy embroidered border , showcasing detailed traditional artistry that gives the saree a luxurious designer finish. The soothing sky blue shade reflects elegance, freshness, and royal femininity, making this saree a perfect choice for weddings, festive celebrations, engagement ceremonies, receptions, cocktail parties, pooja functions, and grand traditional occasions. The saree comes with a richly embroidered pallu that creates a graceful flowing silhouette while adding premium festive appeal. The lightweight satin texture ensures comfort throughout long events while maintaining a rich and polished ethnic look. Crafted for women who appreciate understated luxury and timeless ethnic fashion, this saree beautifully combines traditional embroidery craftsmanship with contemporary elegance. Comes paired with a matching unstitched blouse piece , allowing you to customize your blouse style according to your fashion preference. Key Details: Saree Color: Sky Blue Blouse: Matching Unstitched Blouse Piece Fabric: Premium Fendy Satin Work: Intricate Embroidery Work Design: Designer Embroidered Motifs Border: Heavy Embroidered Designer Border Pallu: Rich Embroidered Pallu Texture: Soft, Lightweight & Glossy Satin Finish Saree Length: 5.5 meters Blouse Length: 0.8 meter Care Instructions: Dry Clean Only Where to Wear: Perfect for weddings, festive functions, receptions, engagement ceremonies, traditional gatherings, pooja celebrations, cocktail parties, family events, and festive occasions . Style Tips: Pair with diamond jewellery, kundan sets, pearl chokers, or pastel stone accessories for an elegant festive look Style with soft curls, dewy makeup, highlighted cheeks, and glossy lips for graceful sophistication Complete the look with silver heels, embellished clutches, or ethnic potli bags Perfect for both daytime celebrations and elegant evening occasions This luxurious embroidered saree beautifully blends soft festive elegance, premium satin drape, and timeless traditional artistry , making it a perfect addition to every modern ethnic wardrobe.",
    "shortDescription": "Bring timeless grace to your festive wardrobe with this stunning sky blue designer saree , beautifully crafted in luxurious premium Fendy satin fabric that offe...",
    "price": 5949,
    "compareAtPrice": 17847,
    "discountPercentage": 67,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120202.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120214.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120215.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120208.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120206.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120211.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120213.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120198.jpg?v=1780393497",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI20217.jpg?v=1780393497"
    ],
    "category": "sarees",
    "collection": "premium-collection-saree",
    "collections": [
      "premium-collection-saree",
      "aurelia-saree",
      "aurelia-saree",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43441962352730",
        "title": "Default Title",
        "size": "Default Title",
        "color": "Default Title",
        "price": 5949,
        "compareAtPrice": 17847,
        "inStock": true,
        "sku": "AT 39 AQUA BLUE",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/ALMARI120202.jpg?v=1780393497"
      }
    ],
    "sizes": [
      "Free Size (5.5m + 0.8m Blouse)"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Fendy Silk / Satin",
    "craft": "Zari & Thread Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "_mcaf_AT039",
      "COOL COLLECTION"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Fendy Silk / Satin",
      "craft": "Zari & Thread Embroidery",
      "length": "5.5 Metres",
      "blousePiece": true,
      "blouseLength": "0.8 Metres",
      "blouseDescription": "Includes unstitched matching/contrasting 0.8m–0.9m blouse fabric with embroidery",
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Saree, 1 Unstitched Blouse Piece"
    },
    "createdAt": "2026-06-02T15:14:54+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7931682062426",
    "title": "Presenting New Ready-Made Gown Pant Dupatta Collection",
    "slug": "presenting-new-ready-made-gown-pant-dupatta-collection",
    "sku": "EV-7931682062426",
    "code": "EV-7931682062426",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. 💖 Soft, stylish & comfortable fabric for all-day wear. ✔ Premium Chinon Fabric ✔ Heavy Embroidery & Zardosi Work ✔ Fully Stitched & Ready To Wear ✔ Elegant Festive Look ✔ Comfortable Fit & Premium Finish 📦 Package Contains: 1 Kurti 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 3199,
    "compareAtPrice": 4999,
    "discountPercentage": 36,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.25AM_2.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.25AM_1.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.25AM.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.26AM_1.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.26AM.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM_1.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.28AM.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.37AM_1.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.37AM.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.38AM_1.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.38AM_2.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.38AM_3.jpg?v=1781957099",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.38AM.jpg?v=1781957099"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43431930953818",
        "title": "M / Pink",
        "size": "M",
        "color": "Pink",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      },
      {
        "id": "var-43431934132314",
        "title": "M / Blue",
        "size": "M",
        "color": "Blue",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      },
      {
        "id": "var-43431934165082",
        "title": "L / Pink",
        "size": "L",
        "color": "Pink",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      },
      {
        "id": "var-43431934197850",
        "title": "L / Blue",
        "size": "L",
        "color": "Blue",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      },
      {
        "id": "var-43431934230618",
        "title": "XL / Pink",
        "size": "XL",
        "color": "Pink",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      },
      {
        "id": "var-43431934263386",
        "title": "XL / Blue",
        "size": "XL",
        "color": "Blue",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      },
      {
        "id": "var-43431934296154",
        "title": "2XL / Pink",
        "size": "2XL",
        "color": "Pink",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      },
      {
        "id": "var-43431934328922",
        "title": "2XL / Blue",
        "size": "2XL",
        "color": "Blue",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7931682062426-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.26.27AM.jpg?v=1781957099"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Pink",
      "Blue"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Pink",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "Kurta Set",
      "pink",
      "purple"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-05-29T14:02:43+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7910076252250",
    "title": "Women Embroidered Kurti Plazzo Set With Dupatta",
    "slug": "ready-made-kurti-with-sarara-and-dupatta",
    "sku": "EV-7910076252250",
    "code": "EV-7910076252250",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. Kurti:- FABRICS :- Chinon Work :-Havy Embridery With 5mm sequnce Work LENGTH :- 34 INCH LINING :- Cotton (Full Inner ) SLEEVES :- 3/4 Sleeves NECK TYPE :-Round Neck STITCHING TYPE:- Fully Stitched (Ready to Wear) DUPATTA:- FABRIC :- Chinon WORK :- Havy Embridery With 5mm sequnce Work LENGTH :- 2.25 MTR Sarara:- FABRIC :- Chinon Work :-Havy Embridery With 5mm sequnce Work LENGTH :- 39 INCH WAIST:- Elastic waist This elegant sharara set comes in a soothing pastel sage green shade, beautifully crafted from a lightweight and flowy fabric that offers both comfort and grace. The kurta features intricate embroidery with delicate thread and sequin work across the neckline, front, and hemline, adding a subtle yet rich shimmer to the overall look, while the wide sleeves enhance its stylish and airy silhouette. It is paired with a matching flared sharara adorned with detailed embroidered borders that give a festive and luxurious touch, and completed with a soft, sheer dupatta decorated with fine motifs and a heavily embellished border that drapes effortlessly. Perfect for weddings, festive occasions, and traditional gatherings, this outfit reflects a perfect blend of modern elegance and timeless ethnic charm. 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2499,
    "compareAtPrice": 4999,
    "discountPercentage": 50,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373863.jpg?v=1778590811",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373868.jpg?v=1778590811",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373872.jpg?v=1778590810",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373871.jpg?v=1778590811",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373864.jpg?v=1778590811",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373870.jpg?v=1778590810",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373865.jpg?v=1778590810",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373866.jpg?v=1778590811",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373867.jpg?v=1778590811",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373869.jpg?v=1778590811"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43356303523930",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2499,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076252250-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373863.jpg?v=1778590811"
      },
      {
        "id": "var-43356303556698",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2499,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076252250-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373863.jpg?v=1778590811"
      },
      {
        "id": "var-43356303589466",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2499,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076252250-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373863.jpg?v=1778590811"
      },
      {
        "id": "var-43356303622234",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2499,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076252250-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6271325656247373863.jpg?v=1778590811"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "blue",
      "Dhoti Salwar",
      "Kurta Set",
      "Printed Saree"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-05-12T18:29:19+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7910076022874",
    "title": "Designer Fancy Kurti and Pant Set",
    "slug": "designer-fancy-kurti-and-pant-set",
    "sku": "EV-7910076022874",
    "code": "EV-7910076022874",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. Kurti FABRICS :- Cosmos Simmer Work :-Havy Bids & jardosi Work LENGTH :- 37 INCH LINING :- Cotton (Full Inner ) SLEEVES :- 3/4 Sleeves NECK TYPE :-Round Neck STITCHING TYPE:- Fully Stitched (Ready to Wear) Bottom:- FABRIC :- Cosmos Simmer LENGTH :- 39-40 INCH WAIST:- Elastic waist This elegant teal blue ethnic co-ord set features a beautifully designed kurti paired with matching straight-fit pants, crafted from soft and flowy fabric for all-day comfort and graceful movement. The kurti comes with a stylish asymmetrical hemline, a classic round neckline, and three-quarter sleeves, giving it a modern yet traditional appeal. The highlight of the outfit is the intricate multicolor embroidery with floral and traditional motifs at the front hem, enhanced with subtle sequin detailing that adds a rich and festive touch. Paired with solid matching pants, this outfit creates a perfectly balanced and polished look, making it ideal for festive occasions, casual gatherings, and daytime events. 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2950,
    "compareAtPrice": 4999,
    "discountPercentage": 41,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.47AM_2.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.47AM_1.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.48AM.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.47AM.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.48AM_1.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.48AM_2.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.49AM_1.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.49AM_2.jpg?v=1782732715",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.50AM.jpg?v=1782732715"
    ],
    "category": "kurta-sets",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43356301590618",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2950,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076022874-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.47AM_2.jpg?v=1782732715"
      },
      {
        "id": "var-43356301623386",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2950,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076022874-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.47AM_2.jpg?v=1782732715"
      },
      {
        "id": "var-43356301656154",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2950,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076022874-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.47AM_2.jpg?v=1782732715"
      },
      {
        "id": "var-43356301688922",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2950,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910076022874-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.02.47AM_2.jpg?v=1782732715"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "blue",
      "Dhoti Salwar",
      "Kurta Set",
      "Printed Saree"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-05-12T18:26:29+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7910075662426",
    "title": "Designer Fancy Onion Color Kurti and Pant Set",
    "slug": "designer-fancy-onion-color-kurti-and-pant-set",
    "sku": "EV-7910075662426",
    "code": "EV-7910075662426",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. Kurti FABRICS :- Cosmos Simmer Work :-Havy Bids & jardosi Work LENGTH :- 37 INCH LINING :- Cotton (Full Inner ) SLEEVES :- 3/4 Sleeves NECK TYPE :-Round Neck STITCHING TYPE:- Fully Stitched (Ready to Wear) Bottom:- FABRIC :- Cosmos Simmer LENGTH :- 39-40 INCH WAIST:- Elastic waist This elegant teal blue ethnic co-ord set features a beautifully designed kurti paired with matching straight-fit pants, crafted from soft and flowy fabric for all-day comfort and graceful movement. The kurti comes with a stylish asymmetrical hemline, a classic round neckline, and three-quarter sleeves, giving it a modern yet traditional appeal. The highlight of the outfit is the intricate multicolor embroidery with floral and traditional motifs at the front hem, enhanced with subtle sequin detailing that adds a rich and festive touch. Paired with solid matching pants, this outfit creates a perfectly balanced and polished look, making it ideal for festive occasions, casual gatherings, and daytime events. 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2899,
    "compareAtPrice": 4999,
    "discountPercentage": 42,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412685.jpg?v=1778590486",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412689.jpg?v=1778590486",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412688.jpg?v=1778590486",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412691.jpg?v=1778590486",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412690.jpg?v=1778590486",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412687.jpg?v=1778590488",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412686.jpg?v=1778590486",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412684.jpg?v=1778590486",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412683.jpg?v=1778590486"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43356300607578",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2899,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910075662426-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412685.jpg?v=1778590486"
      },
      {
        "id": "var-43356300640346",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2899,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910075662426-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412685.jpg?v=1778590486"
      },
      {
        "id": "var-43356300673114",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2899,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910075662426-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412685.jpg?v=1778590486"
      },
      {
        "id": "var-43356300705882",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2899,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910075662426-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6233279521679412685.jpg?v=1778590486"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Dhoti Salwar",
      "Kurta Set",
      "pink",
      "Printed Saree"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-05-12T18:23:05+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7910071009370",
    "title": "Stylish Kurti With Sarara And Dupatta Set",
    "slug": "stylish-kurti-with-sarara-and-dupatta-set",
    "sku": "EV-7910071009370",
    "code": "EV-7910071009370",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. Kurti:- FABRICS :- Chinon Work :-Havy Embridery With 5mm sequnce Work LENGTH :- 34 INCH LINING :- Cotton (Full Inner ) SLEEVES :- 3/4 Sleeves NECK TYPE :-Round Neck STITCHING TYPE:- Fully Stitched (Ready to Wear) DUPATTA:- FABRIC :- Chinon WORK :- Havy Embridery With 5mm sequnce Work LENGTH :- 2.25 MTR Sarara:- FABRIC :- Chinon Work :-Havy Embridery With 5mm sequnce Work LENGTH :- 39 INCH WAIST:- Elastic waist This elegant sharara set comes in a soothing pastel sage green shade, beautifully crafted from a lightweight and flowy fabric that offers both comfort and grace. The kurta features intricate embroidery with delicate thread and sequin work across the neckline, front, and hemline, adding a subtle yet rich shimmer to the overall look, while the wide sleeves enhance its stylish and airy silhouette. It is paired with a matching flared sharara adorned with detailed embroidered borders that give a festive and luxurious touch, and completed with a soft, sheer dupatta decorated with fine motifs and a heavily embellished border that drapes effortlessly. Perfect for weddings, festive occasions, and traditional gatherings, this outfit reflects a perfect blend of modern elegance and timeless ethnic charm. 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 3199,
    "compareAtPrice": 4999,
    "discountPercentage": 36,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM_77bf77a1-e2a4-45e1-a9a0-a5da37fcac8a.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.53AM_1_ec0a466b-6e28-4b47-98ab-52a9fb195fe8.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.53AM_2_5ef63436-1a25-4c96-8866-4ff9ded73f6e.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.53AM_cded4970-b4eb-42fd-b257-d39f191c6219.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.54AM_1_82b3f594-1f05-450e-b712-ffe57240bfe5.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.54AM_2_6d69a29b-6c04-402c-a6b4-d5ff173c8ed3.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.54AM.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.55AM_1.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.55AM_2_e7aecbe2-cc9d-4538-9cc5-7f0ab766bc9f.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.55AM_3_7134fb7f-cde9-4949-a8e6-a790a0ef88de.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.55AM_9dbf1cab-4e64-48e9-8819-30236da78e57.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.56AM_1_35cbca50-ca63-4139-baa9-10d2644b62d8.jpg?v=1781956112",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.56AM_dad56619-faa9-4b52-bf29-2d9b157cb66f.jpg?v=1781956112"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43356295397466",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910071009370-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM_77bf77a1-e2a4-45e1-a9a0-a5da37fcac8a.jpg?v=1781956112"
      },
      {
        "id": "var-43356295430234",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910071009370-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM_77bf77a1-e2a4-45e1-a9a0-a5da37fcac8a.jpg?v=1781956112"
      },
      {
        "id": "var-43356295463002",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910071009370-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM_77bf77a1-e2a4-45e1-a9a0-a5da37fcac8a.jpg?v=1781956112"
      },
      {
        "id": "var-43356295495770",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 3199,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7910071009370-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at11.03.52AM_77bf77a1-e2a4-45e1-a9a0-a5da37fcac8a.jpg?v=1781956112"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "Anarkali Set",
      "green",
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-05-12T18:19:47+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7826102878298",
    "title": "Premium Chinon Embroidered Kurti Palazzo Dupatta Set",
    "slug": "white-maslin-embroidered-kurti-palazzo-set-dupatta",
    "sku": "EV-7826102878298",
    "code": "EV-7826102878298",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. 💖 Soft, stylish & comfortable fabric for all-day wear. ✔ Premium Chinon Fabric ✔ Heavy Embroidery & Zardosi Work ✔ Fully Stitched & Ready To Wear ✔ Elegant Festive Look ✔ Comfortable Fit & Premium Finish 📦 Package Contains: 1 Kurti 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2749,
    "compareAtPrice": 4299,
    "discountPercentage": 36,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673498_e13b171b-a1c7-4c3a-a17a-33d48c380b28.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673499_2523519f-8787-4b26-aeef-5b3f9c26eb53.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673500.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673489_44fbf7a8-6745-43a8-a383-c1e2984666e5.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673490.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673491.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673492.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673495_3cd7f621-7687-4f80-a0e0-886c23757585.jpg?v=1782732505",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673496_45458636-0fc0-4a2b-8e9c-321b0970880c.jpg?v=1782732505"
    ],
    "category": "kurta-sets",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43065071763546",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2749,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-7826102878298-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673498_e13b171b-a1c7-4c3a-a17a-33d48c380b28.jpg?v=1782732505"
      },
      {
        "id": "var-43065071796314",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2749,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-7826102878298-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673498_e13b171b-a1c7-4c3a-a17a-33d48c380b28.jpg?v=1782732505"
      },
      {
        "id": "var-43065071829082",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2749,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-7826102878298-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673498_e13b171b-a1c7-4c3a-a17a-33d48c380b28.jpg?v=1782732505"
      },
      {
        "id": "var-43065071861850",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2749,
        "compareAtPrice": 4299,
        "inStock": true,
        "sku": "EV-7826102878298-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6203939255755673498_e13b171b-a1c7-4c3a-a17a-33d48c380b28.jpg?v=1782732505"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Kurta Set",
      "Kurti Pant Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-18T11:13:59+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7823588196442",
    "title": "Designer Zardosi Work Kurti Plazzo Set for Women",
    "slug": "designer-zardosi-work-kurti-plazzo-set-for-women",
    "sku": "EV-7823588196442",
    "code": "EV-7823588196442",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. 💖 Soft, stylish & comfortable fabric for all-day wear. ✔ Premium Chinon Fabric ✔ Heavy Embroidery & Zardosi Work ✔ Fully Stitched & Ready To Wear ✔ Elegant Festive Look ✔ Comfortable Fit & Premium Finish 📦 Package Contains: 1 Kurti 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2699,
    "compareAtPrice": 5300,
    "discountPercentage": 49,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397985.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397986.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397987.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397988.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397989.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397990.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397991.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397992.jpg?v=1778566430",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397993.jpg?v=1778566430"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43058470912090",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2699,
        "compareAtPrice": 5300,
        "inStock": true,
        "sku": "EV-7823588196442-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397985.jpg?v=1778566430"
      },
      {
        "id": "var-43058470944858",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2699,
        "compareAtPrice": 5300,
        "inStock": true,
        "sku": "EV-7823588196442-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397985.jpg?v=1778566430"
      },
      {
        "id": "var-43058470977626",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2699,
        "compareAtPrice": 5300,
        "inStock": true,
        "sku": "EV-7823588196442-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397985.jpg?v=1778566430"
      },
      {
        "id": "var-43058471010394",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2699,
        "compareAtPrice": 5300,
        "inStock": true,
        "sku": "EV-7823588196442-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397985.jpg?v=1778566430"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "Kurta Set",
      "Maroon"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-16T17:28:58+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7823587541082",
    "title": "Festive Wear Embroidered Kurti Set with Dupatta",
    "slug": "designer-embroidered-top-palazzo-set-with-organza-dupatta-festive-wedding-wear-evara-033",
    "sku": "EV-7823587541082",
    "code": "EV-7823587541082",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. 💖 Soft, stylish & comfortable fabric for all-day wear. ✔ Premium Chinon Fabric ✔ Heavy Embroidery & Zardosi Work ✔ Fully Stitched & Ready To Wear ✔ Elegant Festive Look ✔ Comfortable Fit & Premium Finish 📦 Package Contains: 1 Kurti 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2450,
    "compareAtPrice": 8499,
    "discountPercentage": 71,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397980.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397984.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397977.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397978.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397979.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397982.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397974.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397975.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397976.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397981.jpg?v=1778566577",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397983.jpg?v=1778566577"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43058469044314",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2450,
        "compareAtPrice": 8499,
        "inStock": true,
        "sku": "EV-7823587541082-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397980.jpg?v=1778566577"
      },
      {
        "id": "var-43058469077082",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2450,
        "compareAtPrice": 8499,
        "inStock": true,
        "sku": "EV-7823587541082-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397980.jpg?v=1778566577"
      },
      {
        "id": "var-43058469109850",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2450,
        "compareAtPrice": 8499,
        "inStock": true,
        "sku": "EV-7823587541082-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397980.jpg?v=1778566577"
      },
      {
        "id": "var-43058469142618",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2450,
        "compareAtPrice": 8499,
        "inStock": true,
        "sku": "EV-7823587541082-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397980.jpg?v=1778566577"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "blue",
      "Dhoti Salwar",
      "Kurta Set",
      "RED"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-16T17:24:01+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7823587016794",
    "title": "Premium Organza Printed Gown Palazzo Set",
    "slug": "designer-crepe-silk-embroidered-kurti-pant-set-evara-029",
    "sku": "EV-7823587016794",
    "code": "EV-7823587016794",
    "description": "Product Description ✨ Add elegance to your festive wardrobe with this beautifully designed Floral Printed Organza Gown Palazzo Set with Dupatta. Crafted from premium TB Organza fabric with delicate handwork and soft floral digital print, this outfit gives a classy and graceful look perfect for festivals, parties, weddings, and special occasions. 💖 Lightweight, stylish & comfortable for all-day wear. ✔ Premium TB Organza Fabric ✔ Elegant Floral Digital Print ✔ Beautiful Hand Work Detailing ✔ Fully Stitched Ready-To-Wear Outfit ✔ Heavy 4 Meter Flair for Royal Look 📦 Package Includes: 1 Gown 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Add elegance to your festive wardrobe with this beautifully designed Floral Printed Organza Gown Palazzo Set with Dupatta. Crafted from pr...",
    "price": 2699,
    "compareAtPrice": 6000,
    "discountPercentage": 55,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423233.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423237.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423230.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423231.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423232.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423234.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423235.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423236.jpg?v=1778566840",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423238.jpg?v=1778566840"
    ],
    "category": "kurta-sets",
    "collection": "everyday-elegance",
    "collections": [
      "everyday-elegance",
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43058468323418",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2699,
        "compareAtPrice": 6000,
        "inStock": true,
        "sku": "EV-7823587016794-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423233.jpg?v=1778566840"
      },
      {
        "id": "var-43058468356186",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2699,
        "compareAtPrice": 6000,
        "inStock": true,
        "sku": "EV-7823587016794-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423233.jpg?v=1778566840"
      },
      {
        "id": "var-43058468388954",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2699,
        "compareAtPrice": 6000,
        "inStock": true,
        "sku": "EV-7823587016794-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423233.jpg?v=1778566840"
      },
      {
        "id": "var-43058468421722",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2699,
        "compareAtPrice": 6000,
        "inStock": true,
        "sku": "EV-7823587016794-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6187972238091423233.jpg?v=1778566840"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Organza",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "black",
      "Kurti Pant Set",
      "pink"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Organza",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-16T17:18:18+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7823583936602",
    "title": "Women’s Designer Rangoli Crush Embroidered Gown with Dupatta | Party Wear Anarkali Gown Set",
    "slug": "women-s-designer-rangoli-crush-embroidered-gown-with-dupatta-party-wear-anarkali-gown-set",
    "sku": "EV-7823583936602",
    "code": "EV-7823583936602",
    "description": "Product Description Step into timeless elegance with this beautifully crafted ready-to-wear gown and dupatta set designed for women who love graceful ethnic fashion. The rich Rangoli Crush fabric creates a soft flowy silhouette, while the heavy embroidery and sequence detailing add a premium festive shine. The gown features full inner lining for all-day comfort, elegant long sleeves, and a flattering round neckline that gives a classy royal look. Its stunning 7-meter flair creates gorgeous movement while walking, making it perfect for wedding functions and festive occasions. Paired with a matching embroidered dupatta, this outfit is designed to make you stand out effortlessly. Whether you're attending a wedding, engagement, festive gathering, mehendi function, Eid celebration, or party night — this gown set delivers a luxurious ethnic vibe with modern sophistication. Product Details Gown Details Fabric: Premium Rangoli Crush Work: Heavy Embroidery & Sequence Work Length: 53-54 Inches Sleeves: Full Sleeves Neck Type: Round Neck Flair: 7 Meter Grand Flair Inner: Full Micro Cotton Inner (Top to Bottom) Stitching: Fully Stitched Ready to Wear Dupatta Details Fabric: Rangoli Crush Work: Heavy Embroidery & Sequence Work Length: 2.25 Meter Available Sizes M (38), L (40), XL (42), XXL (44) Package Includes 1 Embroidered Gown 1 Matching Dupatta Weight Approx. 800 GM Why Customers Love It ❤️ ✔ Premium festive look ✔ Heavy embroidery detailing ✔ Elegant royal flair ✔ Comfortable full lining ✔ Ready-to-wear outfit ✔ Perfect for weddings & parties ✔ Trending ethnic fashion collection",
    "shortDescription": "Product Description Step into timeless elegance with this beautifully crafted ready-to-wear gown and dupatta set designed for women who love graceful ethnic fas...",
    "price": 2799,
    "compareAtPrice": 4499,
    "discountPercentage": 38,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048210.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048208.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048209.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048211.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048212.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048213.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048214.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048216.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048217.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048219.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048220.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048221.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048222.jpg?v=1778567185",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048218.jpg?v=1778567185"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43058406654042",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2799,
        "compareAtPrice": 4499,
        "inStock": true,
        "sku": "EV-7823583936602-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048210.jpg?v=1778567185"
      },
      {
        "id": "var-43058406686810",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2799,
        "compareAtPrice": 4499,
        "inStock": true,
        "sku": "EV-7823583936602-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048210.jpg?v=1778567185"
      },
      {
        "id": "var-43058406719578",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2799,
        "compareAtPrice": 4499,
        "inStock": true,
        "sku": "EV-7823583936602-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048210.jpg?v=1778567185"
      },
      {
        "id": "var-43058406752346",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2799,
        "compareAtPrice": 4499,
        "inStock": true,
        "sku": "EV-7823583936602-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048210.jpg?v=1778567185"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Soft Premium Cotton",
    "craft": "Sequins & Codding Work",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Soft Premium Cotton",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-16T17:13:09+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7823575056474",
    "title": "Designer Rangoli Crush Embroidered Gown with Dupatta",
    "slug": "red-embroidered-faux-georgette-anarkali-gown-set-evara-027",
    "sku": "EV-7823575056474",
    "code": "EV-7823575056474",
    "description": "Product Description Step into timeless elegance with this beautifully crafted ready-to-wear gown and dupatta set designed for women who love graceful ethnic fashion. The rich Rangoli Crush fabric creates a soft flowy silhouette, while the heavy embroidery and sequence detailing add a premium festive shine. The gown features full inner lining for all-day comfort, elegant long sleeves, and a flattering round neckline that gives a classy royal look. Its stunning 7-meter flair creates gorgeous movement while walking, making it perfect for wedding functions and festive occasions. Paired with a matching embroidered dupatta, this outfit is designed to make you stand out effortlessly. Whether you're attending a wedding, engagement, festive gathering, mehendi function, Eid celebration, or party night — this gown set delivers a luxurious ethnic vibe with modern sophistication. Product Details Gown Details Fabric: Premium Rangoli Crush Work: Heavy Embroidery & Sequence Work Length: 53-54 Inches Sleeves: Full Sleeves Neck Type: Round Neck Flair: 7 Meter Grand Flair Inner: Full Micro Cotton Inner (Top to Bottom) Stitching: Fully Stitched Ready to Wear Dupatta Details Fabric: Rangoli Crush Work: Heavy Embroidery & Sequence Work Length: 2.25 Meter Available Sizes M (38), L (40), XL (42), XXL (44) Package Includes 1 Embroidered Gown 1 Matching Dupatta Weight Approx. 800 GM Why Customers Love It ❤️ ✔ Premium festive look ✔ Heavy embroidery detailing ✔ Elegant royal flair ✔ Comfortable full lining ✔ Ready-to-wear outfit ✔ Perfect for weddings & parties ✔ Trending ethnic fashion collection",
    "shortDescription": "Product Description Step into timeless elegance with this beautifully crafted ready-to-wear gown and dupatta set designed for women who love graceful ethnic fas...",
    "price": 2799,
    "compareAtPrice": 5999,
    "discountPercentage": 53,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048235.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048228.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048234.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048233.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048232.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048229.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048230.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048231.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048224.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048226.jpg?v=1778567543",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048227.jpg?v=1778567543"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43058395906138",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2799,
        "compareAtPrice": 5999,
        "inStock": true,
        "sku": "EV-7823575056474-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048235.jpg?v=1778567543"
      },
      {
        "id": "var-43058395938906",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2799,
        "compareAtPrice": 5999,
        "inStock": true,
        "sku": "EV-7823575056474-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048235.jpg?v=1778567543"
      },
      {
        "id": "var-43058395971674",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2799,
        "compareAtPrice": 5999,
        "inStock": true,
        "sku": "EV-7823575056474-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048235.jpg?v=1778567543"
      },
      {
        "id": "var-43058396004442",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2799,
        "compareAtPrice": 5999,
        "inStock": true,
        "sku": "EV-7823575056474-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6172657939492048235.jpg?v=1778567543"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Soft Premium Cotton",
    "craft": "Sequins & Codding Work",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "Kurta Set",
      "Red Kurta Set with dupatta"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Soft Premium Cotton",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-16T17:08:44+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7823568371802",
    "title": "Women’s Cream Embroidered Kurti Palazzo Set with Organza Dupatta | Festive Ethnic",
    "slug": "teal-fendy-silk-mirror-work-sharara-set-evaraj-026",
    "sku": "EV-7823568371802",
    "code": "EV-7823568371802",
    "description": "Product Description Step into timeless elegance with this beautifully designed ready-made kurti palazzo set from Evara Vastra. Crafted with premium Cosmos Simmer fabric, the outfit showcases delicate Zardosi bead embroidery that gives a luxurious handcrafted finish. The soothing cream shade paired with floral detailing creates a graceful and sophisticated ethnic look. The soft cotton inner ensures all-day comfort, while the flowy palazzo and lightweight organza dupatta complete the outfit with effortless elegance. The dupatta is enhanced with pearl work and fancy lace borders, adding a premium festive touch to the overall ensemble. Whether you’re dressing for festive celebrations, family gatherings, Eid, Rakhi, wedding functions, or party occasions — this outfit delivers comfort, class, and elegance together. A perfect blend of traditional charm and modern sophistication for today’s fashion-forward women. Product Details Kurti Details 👗 Fabric: Premium Cosmos Simmer Work: Heavy Zardosi Beads Work Inner: Full Cotton Inner (Top to Bottom) Sleeves: Full Sleeves Neck Type: Round Neck Length: 40 Inches Stitching: Fully Stitched Ready to Wear Palazzo Details 👖 Fabric: Cosmos Simmer Length: 39 Inches Waist: Elastic Waistband for Comfort Dupatta Details 🧣 Fabric: Premium Organza Work: Pearl (Moti) Work with Fancy Lace Border Length: 2.20 Meter Available Sizes M (38), L (40), XL (42), XXL (44) Package Includes 📦 ✔ 1 Kurti ✔ 1 Palazzo ✔ 1 Organza Dupatta Why Customers Love It ❤️ ✔ Elegant premium ethnic look ✔ Comfortable all-day wear ✔ Rich embroidery detailing ✔ Soft breathable inner lining ✔ Perfect festive & party outfit ✔ Lightweight and graceful dupatta ✔ Ready-to-wear stitched set Perfect For ✨ Festive Wear Wedding Functions Family Gatherings Eid Collection Party Wear Traditional Events Casual Elegant Styling",
    "shortDescription": "Product Description Step into timeless elegance with this beautifully designed ready-made kurti palazzo set from Evara Vastra. Crafted with premium Cosmos Simme...",
    "price": 2999,
    "compareAtPrice": 4500,
    "discountPercentage": 33,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625355.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625356.jpg?v=1778567945",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625345.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625346.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625347.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625348.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625349.jpg?v=1778567945",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625350.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625351.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625353.jpg?v=1778567946",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625352.jpg?v=1778567945",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625354.jpg?v=1778567946"
    ],
    "category": "kurta-sets",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43058384863322",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2999,
        "compareAtPrice": 4500,
        "inStock": true,
        "sku": "EV-7823568371802-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625355.jpg?v=1778567946"
      },
      {
        "id": "var-43058384896090",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2999,
        "compareAtPrice": 4500,
        "inStock": true,
        "sku": "EV-7823568371802-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625355.jpg?v=1778567946"
      },
      {
        "id": "var-43058384928858",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2999,
        "compareAtPrice": 4500,
        "inStock": true,
        "sku": "EV-7823568371802-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625355.jpg?v=1778567946"
      },
      {
        "id": "var-43058384961626",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2999,
        "compareAtPrice": 4500,
        "inStock": true,
        "sku": "EV-7823568371802-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6082573341215625355.jpg?v=1778567946"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Organza",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "Kurta Set",
      "Sharara Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Organza",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-16T17:01:06+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7823567749210",
    "title": "Women Embroidered Chinon Kurta Palazzo Dupatta Set with Ethnic Wear",
    "slug": "crunchy-silk-embroidered-gown-lehenga-dupatta-set",
    "sku": "EV-7823567749210",
    "code": "EV-7823567749210",
    "description": "Product Description ✨ Add elegance to your festive wardrobe with this beautifully designed Floral Printed Organza Gown Palazzo Set with Dupatta. Crafted from premium TB Organza fabric with delicate handwork and soft floral digital print, this outfit gives a classy and graceful look perfect for festivals, parties, weddings, and special occasions. 💖 Lightweight, stylish & comfortable for all-day wear. ✔ Premium TB Organza Fabric ✔ Elegant Floral Digital Print ✔ Beautiful Hand Work Detailing ✔ Fully Stitched Ready-To-Wear Outfit ✔ Heavy 4 Meter Flair for Royal Look 📦 Package Includes: 1 Gown 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Add elegance to your festive wardrobe with this beautifully designed Floral Printed Organza Gown Palazzo Set with Dupatta. Crafted from pr...",
    "price": 2499,
    "compareAtPrice": 7199,
    "discountPercentage": 65,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.46AM_1.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.46AM.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.47AM_1.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.47AM_2.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.47AM_3.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.47AM.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.48AM_1.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.48AM_2.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.48AM.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.02AM_1.jpg?v=1781956302",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.02AM_2.jpg?v=1781956302",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.02AM_3.jpg?v=1781956302",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.02AM.jpg?v=1781956302",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.03AM_1.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.03AM_2.jpg?v=1781956301",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.03AM_3.jpg?v=1781956301"
    ],
    "category": "anarkali-suits",
    "collections": [],
    "variants": [
      {
        "id": "var-43058381717594",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2499,
        "compareAtPrice": 7199,
        "inStock": true,
        "sku": "EV-7823567749210-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.46AM_1.jpg?v=1781956301"
      },
      {
        "id": "var-43058381750362",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2499,
        "compareAtPrice": 7199,
        "inStock": true,
        "sku": "EV-7823567749210-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.46AM_1.jpg?v=1781956301"
      },
      {
        "id": "var-43058381783130",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2499,
        "compareAtPrice": 7199,
        "inStock": true,
        "sku": "EV-7823567749210-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.46AM_1.jpg?v=1781956301"
      },
      {
        "id": "var-43058381815898",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2499,
        "compareAtPrice": 7199,
        "inStock": true,
        "sku": "EV-7823567749210-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.27.46AM_1.jpg?v=1781956301"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Ethnic Handblock Print",
    "color": "Multicolor",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": true,
    "tags": [
      "Anarkali Set",
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Ethnic Handblock Print",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-16T16:56:09+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7819638898778",
    "title": "Women’s Wine Roman Silk Chikankari Kurti Pant Set with Kota Dupatta",
    "slug": "maroon-roman-silk-chanderi-anarkali-gown-dupatta-evara-025",
    "sku": "EV-7819638898778",
    "code": "EV-7819638898778",
    "description": "Product Description Experience timeless elegance with this beautifully crafted kurti pant set from Evara Vastra. Designed in luxurious Roman Silk fabric, this outfit features intricate Chikankari-inspired embroidery work that gives a rich and graceful ethnic appeal. The elegant wine shade adds sophistication, while the V-neck design and straight-fit silhouette create a modern yet traditional look. Paired with comfortable matching pants and a lightweight Kota dupatta enhanced with digital print and elegant samosa lace borders, this set blends style and comfort effortlessly. The soft cotton santoon inner lining ensures comfortable wear throughout the day, making it perfect for festive occasions, office events, casual gatherings, dinners, and traditional celebrations. A classy outfit designed for women who love premium ethnic fashion with subtle luxury. Product Details Kurti Details 👗 Fabric: Premium Roman Silk Work: Elegant Chikankari Work Inner: Full Cotton Santoon Inner Sleeves: 3/4 Sleeves Neck Type: Stylish V Neck Length: 44 Inches Stitching: Fully Stitched Ready to Wear Pant Details 👖 Fabric: Roman Silk Length: 39-40 Inches Waist: Half Belt & Half Elastic Waistband Dupatta Details 🧣 Fabric: Kota Work: Digital Print with 4 Side Samosa Lace Border Length: 2.25 Meter Available Sizes M (38), L (40), XL (42), XXL (44) Package Includes 📦 ✔ 1 Kurti ✔ 1 Pant ✔ 1 Dupatta Why Customers Love It ❤️ ✔ Elegant premium look ✔ Soft & comfortable fabric ✔ Beautiful Chikankari detailing ✔ Perfect festive & office wear outfit ✔ Lightweight stylish dupatta ✔ Ready-to-wear convenience ✔ Rich and classy wine color Perfect For ✨ Festive Wear Office Ethnic Wear Family Functions Casual Traditional Styling Dinner Outfits Small Gatherings Daily Elegant Wear",
    "shortDescription": "Product Description Experience timeless elegance with this beautifully crafted kurti pant set from Evara Vastra. Designed in luxurious Roman Silk fabric, this o...",
    "price": 1949,
    "compareAtPrice": 5250,
    "discountPercentage": 63,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964845.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964843.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964844.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964846.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964847.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964848.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964849.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964850.jpg?v=1778568311",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964851.jpg?v=1778568311"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43045007917146",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 1949,
        "compareAtPrice": 5250,
        "inStock": true,
        "sku": "EV-7819638898778-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964845.jpg?v=1778568311"
      },
      {
        "id": "var-43045007949914",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 1949,
        "compareAtPrice": 5250,
        "inStock": true,
        "sku": "EV-7819638898778-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964845.jpg?v=1778568311"
      },
      {
        "id": "var-43045007982682",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 1949,
        "compareAtPrice": 5250,
        "inStock": true,
        "sku": "EV-7819638898778-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964845.jpg?v=1778568311"
      },
      {
        "id": "var-43045008015450",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 1949,
        "compareAtPrice": 5250,
        "inStock": true,
        "sku": "EV-7819638898778-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6325350052703964845.jpg?v=1778568311"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Soft Premium Cotton",
    "craft": "Chikankari Embroidery",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "Kurta Set",
      "Maroon"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Soft Premium Cotton",
      "craft": "Chikankari Embroidery",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-13T12:34:36+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7819636867162",
    "title": "Royal Heavy Embroidered Anarkali Suit with Organza Dupatta",
    "slug": "royal-purple-heavy-embroidered-anarkali-suit-with-organza-dupatta-evara-022",
    "sku": "EV-7819636867162",
    "code": "EV-7819636867162",
    "description": "📝 Product Description (SEO Optimized) ✨ Royal Elegance in a Designer Anarkali Silhouette ✨ Introducing the EVARA-Designer Anarkali Suit , a luxurious ethnic outfit crafted to deliver a regal and graceful look for weddings and festive celebrations. Designed with premium heavy crunchy silk fabric , this outfit features intricate 5mm sequence work combined with rich embroidery , creating a stunning traditional masterpiece. The full-sleeve Anarkali gown showcases beautiful all-over floral embroidery and a grand 4-meter flare , giving it a majestic flow that enhances movement and elegance. The rich craftsmanship and dramatic silhouette make this outfit ideal for women who love statement ethnic fashion. To ensure all-day comfort, the Anarkali is lined with soft micro cotton inner fabric , offering breathability while maintaining the luxurious structure of the outfit. The ensemble is paired with a beautiful heavy organza dupatta , embellished with delicate sequence and embroidery work , adding a light and graceful finishing touch to the look. Completing the set is a matching crunchy silk pant with sequence embroidery , perfectly balancing traditional elegance with modern styling. Whether you are attending a wedding function, festive celebration, engagement, reception, or family event , the EVARA-022 Anarkali Suit is designed to make you look effortlessly royal. ✨ Product Highlights 👗 Designer Anarkali Gown ✔ Fabric: Heavy Crunchy Silk ✔ Work: 5mm Sequence with Rich Embroidery ✔ Sleeves: Full Sleeves ✔ Flair: Grand 4 Meter Flair ✔ Inner: Soft Micro Cotton ✔ Length: Approx. 48–49 Inches ✔ With Cups for Better Fit 🧣 Designer Dupatta ✔ Fabric: Heavy Organza ✔ Work: 5mm Sequence with Embroidery ✔ Length: Approx. 2.30 Meter 👖 Matching Pant ✔ Fabric: Heavy Crunchy Silk ✔ Work: 5mm Sequence Embroidery ✔ Length: Approx. 40–41 Inches ✔ Fully Stitched 📏 Available Sizes M (38) L (40) XL (42) XXL (44) + Margin ✔ Fully Stitched – Ready to Wear 📦 Package Includes • Embroidered Anarkali Gown • Matching Pant • Designer Organza Dupatta ⚖️ Product Details • Weight: Approx. 1.25 KG • Fit: Ready to Wear • Style: Designer Anarkali Suit • Occasion: Wedding | Festive | Party | Engagement | Reception 💎 Why You'll Love It ✔ Luxurious crunchy silk fabric ✔ Rich embroidery with sequence detailing ✔ Grand 4-meter royal Anarkali flair ✔ Elegant organza designer dupatta ✔ Perfect outfit for weddings and festive celebrations",
    "shortDescription": "📝 Product Description (SEO Optimized) ✨ Royal Elegance in a Designer Anarkali Silhouette ✨ Introducing the EVARA-Designer Anarkali Suit , a luxurious ethnic ou...",
    "price": 3399,
    "compareAtPrice": 8999,
    "discountPercentage": 62,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.28.59AM.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_1.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_3.jpg?v=1781956401",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.01AM_1.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.01AM_2.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.01AM_3.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.01AM.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.02AM_1.jpg?v=1781956402",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.02AM.jpg?v=1781956402"
    ],
    "category": "anarkali-suits",
    "collection": "bestsellers",
    "collections": [
      "bestsellers"
    ],
    "variants": [
      {
        "id": "var-43045004705882",
        "title": "M / Red",
        "size": "M",
        "color": "Red",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      },
      {
        "id": "var-43525638914138",
        "title": "M / Navy",
        "size": "M",
        "color": "Navy",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      },
      {
        "id": "var-43525638946906",
        "title": "L / Red",
        "size": "L",
        "color": "Red",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      },
      {
        "id": "var-43525638979674",
        "title": "L / Navy",
        "size": "L",
        "color": "Navy",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      },
      {
        "id": "var-43525639012442",
        "title": "XL / Red",
        "size": "XL",
        "color": "Red",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-5",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      },
      {
        "id": "var-43525639045210",
        "title": "XL / Navy",
        "size": "XL",
        "color": "Navy",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-6",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      },
      {
        "id": "var-43525639077978",
        "title": "2XL / Red",
        "size": "2XL",
        "color": "Red",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-7",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      },
      {
        "id": "var-43525639110746",
        "title": "2XL / Navy",
        "size": "2XL",
        "color": "Navy",
        "price": 3399,
        "compareAtPrice": 8999,
        "inStock": true,
        "sku": "EV-7819636867162-8",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/WhatsAppImage2026-06-19at10.29.00AM_2.jpg?v=1781956402"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Red",
      "Navy"
    ],
    "fabric": "Pure Organza",
    "craft": "Sequins & Codding Work",
    "color": "Red",
    "occasions": [
      "Festive Wear",
      "Wedding Party"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": true,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "Kurta Set",
      "RED"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Organza",
      "craft": "Sequins & Codding Work",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-03-13T12:28:37+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  },
  {
    "id": "ev-7896400068698",
    "title": "Ready-Made Kurti With Sarara And Dupatta",
    "slug": "olive-green-georgette-flared-gown-with-dupatta-elegant-party-wear-anarkali-dress-for-women",
    "sku": "EV-7896400068698",
    "code": "EV-7896400068698",
    "description": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroidery work with detailed Zardosi handwork, this outfit gives a rich and classy festive look. Perfect for parties, weddings, festive occasions, family functions, and traditional wear. 💖 Soft, stylish & comfortable fabric for all-day wear. ✔ Premium Chinon Fabric ✔ Heavy Embroidery & Zardosi Work ✔ Fully Stitched & Ready To Wear ✔ Elegant Festive Look ✔ Comfortable Fit & Premium Finish 📦 Package Contains: 1 Kurti 1 Palazzo 1 Dupatta 🚚 Free Delivery All Over India 💳 COD Available 🔥 Extra 10% OFF on Prepaid Orders",
    "shortDescription": "Product Description ✨ Elevate your ethnic wardrobe with this beautifully designed Premium Chinon Kurti Palazzo Set with Dupatta. Featuring elegant heavy embroid...",
    "price": 2549,
    "compareAtPrice": 4999,
    "discountPercentage": 49,
    "images": [
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397994.jpg?v=1778566263",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397995.jpg?v=1778566264",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397996.jpg?v=1778566264",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397997.jpg?v=1778566263",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198398000.jpg?v=1778566264",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198398001.jpg?v=1778566264",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397998.jpg?v=1778566264",
      "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397999.jpg?v=1778566264"
    ],
    "category": "kurta-sets",
    "collections": [],
    "variants": [
      {
        "id": "var-43310180368474",
        "title": "M",
        "size": "M",
        "color": "M",
        "price": 2549,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7896400068698-1",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397994.jpg?v=1778566263"
      },
      {
        "id": "var-43310180401242",
        "title": "L",
        "size": "L",
        "color": "L",
        "price": 2549,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7896400068698-2",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397994.jpg?v=1778566263"
      },
      {
        "id": "var-43310180434010",
        "title": "XL",
        "size": "XL",
        "color": "XL",
        "price": 2549,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7896400068698-3",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397994.jpg?v=1778566263"
      },
      {
        "id": "var-43310180466778",
        "title": "2XL",
        "size": "2XL",
        "color": "2XL",
        "price": 2549,
        "compareAtPrice": 4999,
        "inStock": true,
        "sku": "EV-7896400068698-4",
        "featuredImage": "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6296587872198397994.jpg?v=1778566263"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Multicolor"
    ],
    "fabric": "Pure Chinon Silk",
    "craft": "Zardosi Handwork",
    "color": "Multicolor",
    "occasions": [
      "Everyday Luxury",
      "Casual Elegance"
    ],
    "inventory": 15,
    "inventoryCount": 15,
    "inStock": true,
    "status": "published",
    "featured": false,
    "newArrival": false,
    "bestseller": false,
    "tags": [
      "Anarkali Set",
      "green",
      "Kurta Set"
    ],
    "details": {
      "origin": "Surat, Gujarat",
      "fabric": "Pure Chinon Silk",
      "craft": "Zardosi Handwork",
      "blousePiece": false,
      "care": "Dry clean recommended for first wash. Gentle hand wash in cold water.",
      "packageDetails": "1 Kurta/Top, 1 Bottom, 1 Dupatta (where applicable)"
    },
    "createdAt": "2026-05-04T13:30:48+05:30",
    "updatedAt": "2026-09-01T10:01:48+05:30"
  }
];
