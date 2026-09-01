import React, { createContext, useContext, useState, useEffect } from "react";
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
  OrderStatus,
  Customer,
  Coupon,
  MediaAsset,
  AdminUser,
  AdminRole,
  AuditLog,
  AuditLogSeverity,
  InventoryAdjustment,
  InventoryAdjustmentReason,
  FAQItem,
  LookbookItem,
  CraftsmanshipCMS,
  Shipment,
  PickupLocation,
  ShippingSettings,
} from "../types";
import {
  initialSiteSettings,
  initialNotificationBar,
  initialHomepageCMS,
  initialCategories,
  initialCollections,
  initialProducts,
  initialShoppableVideos,
  initialReviews,
  initialNavigationItems,
  initialCoupons,
  initialOrders,
  initialCustomers,
  initialMediaAssets,
  initialAdminUser,
  initialAdminUsers,
  initialAuditLogs,
  initialInventoryAdjustments,
  initialFAQs,
  initialLookbookItems,
  initialCraftsmanshipCMS,
  initialShipments,
  initialPickupLocations,
  initialShippingSettings,
} from "../data/initialData";
import { shippingProvider } from "../lib/shiprocket";

interface DataContextType {
  // Products
  products: Product[];
  publishedProducts: Product[];
  addProduct: (product: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => Product | undefined;

  // Categories
  categories: Category[];
  activeCategories: Category[];
  addCategory: (cat: Omit<Category, "id"> & { id?: string }) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Collections
  collections: Collection[];
  activeCollections: Collection[];
  addCollection: (col: Omit<Collection, "id"> & { id?: string }) => Collection;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;

  // Shoppable Videos
  shoppableVideos: ShoppableVideo[];
  publishedVideos: ShoppableVideo[];
  addShoppableVideo: (video: Omit<ShoppableVideo, "id"> & { id?: string }) => ShoppableVideo;
  updateShoppableVideo: (id: string, updates: Partial<ShoppableVideo>) => void;
  deleteShoppableVideo: (id: string) => void;

  // Reviews
  reviews: Review[];
  approvedReviews: Review[];
  featuredReviews: Review[];
  addReview: (review: Omit<Review, "id" | "date"> & { id?: string }) => Review;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;

  // Navigation Items
  navigationItems: NavigationItem[];
  updateNavigationItems: (items: NavigationItem[]) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "date" | "timeline">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus, note?: string) => void;
  deleteOrder: (id: string) => void;

  // Customers
  customers: Customer[];
  addOrUpdateCustomer: (customer: Omit<Customer, "id"> & { id?: string }) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, "id"> & { id?: string }) => Coupon;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  validateCoupon: (
    code: string,
    subtotal: number
  ) => { isValid: boolean; discountAmount: number; message: string; coupon?: Coupon };

  // Content / CMS
  notificationBar: NotificationBarConfig;
  updateNotificationBar: (config: Partial<NotificationBarConfig>) => void;
  homepageCMS: HomepageCMS;
  updateHomepageCMS: (config: Partial<HomepageCMS>) => void;
  craftsmanshipCMS: CraftsmanshipCMS;
  updateCraftsmanshipCMS: (config: Partial<CraftsmanshipCMS>) => void;
  lookbookItems: LookbookItem[];
  publishedLookbookItems: LookbookItem[];
  addLookbookItem: (item: Omit<LookbookItem, "id"> & { id?: string }) => LookbookItem;
  updateLookbookItem: (id: string, updates: Partial<LookbookItem>) => void;
  deleteLookbookItem: (id: string) => void;
  faqs: FAQItem[];
  activeFAQs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, "id"> & { id?: string }) => FAQItem;
  updateFAQ: (id: string, updates: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Media
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, "id" | "createdAt">) => MediaAsset;
  deleteMediaAsset: (id: string) => void;

  // Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Inventory Adjustments
  inventoryAdjustments: InventoryAdjustment[];
  adjustInventory: (
    productId: string,
    newQuantity: number,
    reason: InventoryAdjustmentReason,
    note?: string,
    variantId?: string
  ) => void;

  // Admin Auth & RBAC
  adminUser: AdminUser | null;
  adminUsers: AdminUser[];
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  switchAdminRole: (role: AdminRole) => void;
  logoutAdmin: () => void;
  addAdminUser: (user: Omit<AdminUser, "id" | "createdAt">) => AdminUser;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
  hasPermission: (module: string) => boolean;

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (
    action: string,
    entity: AuditLog["entity"],
    details: string,
    entityId?: string,
    entityName?: string,
    severity?: AuditLogSeverity,
    previousState?: any,
    newState?: any
  ) => void;

  // Shipping & Logistics (Shiprocket)
  shipments: Shipment[];
  pickupLocations: PickupLocation[];
  shippingSettings: ShippingSettings;
  createShipmentForOrder: (order: Order) => Promise<Shipment>;
  assignCourierAndAWB: (shipmentId: string, courierId?: number) => Promise<Shipment>;
  requestPickup: (shipmentId: string) => Promise<Shipment>;
  cancelShipment: (shipmentId: string) => Promise<Shipment>;
  syncTracking: (shipmentId: string) => Promise<Shipment>;
  updateShippingSettings: (settings: Partial<ShippingSettings>) => void;
  addPickupLocation: (loc: Omit<PickupLocation, "id">) => PickupLocation;
  updatePickupLocation: (id: string, updates: Partial<PickupLocation>) => void;
  deletePickupLocation: (id: string) => void;

  // System
  resetToDefaultData: () => void;
}

const STORAGE_KEYS = {
  SITE_SETTINGS: "evara_v3_settings",
  NOTIFICATION_BAR: "evara_v3_notif",
  HOMEPAGE_CMS: "evara_v3_home_cms",
  CATEGORIES: "evara_v3_categories",
  COLLECTIONS: "evara_v3_collections",
  PRODUCTS: "evara_v3_products",
  VIDEOS: "evara_v3_videos",
  REVIEWS: "evara_v3_reviews",
  NAVIGATION: "evara_v3_nav",
  COUPONS: "evara_v3_coupons",
  ORDERS: "evara_v3_orders",
  CUSTOMERS: "evara_v3_customers",
  MEDIA: "evara_v3_media",
  FAQS: "evara_v3_faqs",
  LOOKBOOK: "evara_v3_lookbook",
  CRAFTSMANSHIP: "evara_v3_craft",
  AUTH: "evara_v3_auth",
  ADMIN_USERS: "evara_v3_admin_users",
  AUDIT_LOGS: "evara_v3_audit_logs",
  INVENTORY_ADJUSTMENTS: "evara_v3_inv_adj",
  SHIPMENTS: "evara_v3_shipments",
  PICKUP_LOCATIONS: "evara_v3_pickup_locs",
  SHIPPING_SETTINGS: "evara_v3_shipping_settings",
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStored = <T,>(key: string, data: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage quota exceeded or error:", e);
    }
  };

  // State initialization
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() =>
    loadStored(STORAGE_KEYS.SITE_SETTINGS, initialSiteSettings)
  );
  const [notificationBar, setNotificationBar] = useState<NotificationBarConfig>(() =>
    loadStored(STORAGE_KEYS.NOTIFICATION_BAR, initialNotificationBar)
  );
  const [homepageCMS, setHomepageCMS] = useState<HomepageCMS>(() =>
    loadStored(STORAGE_KEYS.HOMEPAGE_CMS, initialHomepageCMS)
  );
  const [craftsmanshipCMS, setCraftsmanshipCMS] = useState<CraftsmanshipCMS>(() =>
    loadStored(STORAGE_KEYS.CRAFTSMANSHIP, initialCraftsmanshipCMS)
  );
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>(() =>
    loadStored(STORAGE_KEYS.LOOKBOOK, initialLookbookItems)
  );
  const [faqs, setFaqs] = useState<FAQItem[]>(() =>
    loadStored(STORAGE_KEYS.FAQS, initialFAQs)
  );
  const [categories, setCategories] = useState<Category[]>(() =>
    loadStored(STORAGE_KEYS.CATEGORIES, initialCategories)
  );
  const [collections, setCollections] = useState<Collection[]>(() =>
    loadStored(STORAGE_KEYS.COLLECTIONS, initialCollections)
  );
  const [products, setProducts] = useState<Product[]>(() =>
    loadStored(STORAGE_KEYS.PRODUCTS, initialProducts)
  );
  const [shoppableVideos, setShoppableVideos] = useState<ShoppableVideo[]>(() =>
    loadStored(STORAGE_KEYS.VIDEOS, initialShoppableVideos)
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadStored(STORAGE_KEYS.REVIEWS, initialReviews)
  );
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(() =>
    loadStored(STORAGE_KEYS.NAVIGATION, initialNavigationItems)
  );
  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    loadStored(STORAGE_KEYS.COUPONS, initialCoupons)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadStored(STORAGE_KEYS.ORDERS, initialOrders)
  );
  const [customers, setCustomers] = useState<Customer[]>(() =>
    loadStored(STORAGE_KEYS.CUSTOMERS, initialCustomers)
  );
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() =>
    loadStored(STORAGE_KEYS.MEDIA, initialMediaAssets)
  );
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() =>
    loadStored(STORAGE_KEYS.ADMIN_USERS, initialAdminUsers)
  );
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() =>
    loadStored(STORAGE_KEYS.AUTH, initialAdminUser)
  );
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() =>
    loadStored(STORAGE_KEYS.AUDIT_LOGS, initialAuditLogs)
  );
  const [inventoryAdjustments, setInventoryAdjustments] = useState<InventoryAdjustment[]>(() =>
    loadStored(STORAGE_KEYS.INVENTORY_ADJUSTMENTS, initialInventoryAdjustments)
  );
  const [shipments, setShipments] = useState<Shipment[]>(() =>
    loadStored(STORAGE_KEYS.SHIPMENTS, initialShipments)
  );
  const [pickupLocations, setPickupLocations] = useState<PickupLocation[]>(() =>
    loadStored(STORAGE_KEYS.PICKUP_LOCATIONS, initialPickupLocations)
  );
  const [shippingSettings, setShippingSettings] = useState<ShippingSettings>(() =>
    loadStored(STORAGE_KEYS.SHIPPING_SETTINGS, initialShippingSettings)
  );

  // Sync to localStorage
  useEffect(() => saveStored(STORAGE_KEYS.SITE_SETTINGS, siteSettings), [siteSettings]);
  useEffect(() => saveStored(STORAGE_KEYS.NOTIFICATION_BAR, notificationBar), [notificationBar]);
  useEffect(() => saveStored(STORAGE_KEYS.HOMEPAGE_CMS, homepageCMS), [homepageCMS]);
  useEffect(() => saveStored(STORAGE_KEYS.CRAFTSMANSHIP, craftsmanshipCMS), [craftsmanshipCMS]);
  useEffect(() => saveStored(STORAGE_KEYS.LOOKBOOK, lookbookItems), [lookbookItems]);
  useEffect(() => saveStored(STORAGE_KEYS.FAQS, faqs), [faqs]);
  useEffect(() => saveStored(STORAGE_KEYS.CATEGORIES, categories), [categories]);
  useEffect(() => saveStored(STORAGE_KEYS.COLLECTIONS, collections), [collections]);
  useEffect(() => saveStored(STORAGE_KEYS.PRODUCTS, products), [products]);
  useEffect(() => saveStored(STORAGE_KEYS.VIDEOS, shoppableVideos), [shoppableVideos]);
  useEffect(() => saveStored(STORAGE_KEYS.REVIEWS, reviews), [reviews]);
  useEffect(() => saveStored(STORAGE_KEYS.NAVIGATION, navigationItems), [navigationItems]);
  useEffect(() => saveStored(STORAGE_KEYS.COUPONS, coupons), [coupons]);
  useEffect(() => saveStored(STORAGE_KEYS.ORDERS, orders), [orders]);
  useEffect(() => saveStored(STORAGE_KEYS.CUSTOMERS, customers), [customers]);
  useEffect(() => saveStored(STORAGE_KEYS.MEDIA, mediaAssets), [mediaAssets]);
  useEffect(() => saveStored(STORAGE_KEYS.AUTH, adminUser), [adminUser]);
  useEffect(() => saveStored(STORAGE_KEYS.ADMIN_USERS, adminUsers), [adminUsers]);
  useEffect(() => saveStored(STORAGE_KEYS.AUDIT_LOGS, auditLogs), [auditLogs]);
  useEffect(() => saveStored(STORAGE_KEYS.INVENTORY_ADJUSTMENTS, inventoryAdjustments), [inventoryAdjustments]);
  useEffect(() => saveStored(STORAGE_KEYS.SHIPMENTS, shipments), [shipments]);
  useEffect(() => saveStored(STORAGE_KEYS.PICKUP_LOCATIONS, pickupLocations), [pickupLocations]);
  useEffect(() => saveStored(STORAGE_KEYS.SHIPPING_SETTINGS, shippingSettings), [shippingSettings]);

  // Derived Views
  const publishedProducts = products.filter((p) => p.status === "published");
  const activeCategories = categories.filter((c) => c.isEnabled);
  const activeCollections = collections.filter((c) => c.isPublished);
  const publishedVideos = shoppableVideos.filter((v) => v.isPublished);
  const approvedReviews = reviews.filter((r) => r.status === "approved");
  const featuredReviews = approvedReviews.filter((r) => r.isFeaturedOnHome);
  const publishedLookbookItems = lookbookItems.filter((l) => l.isPublished);
  const activeFAQs = faqs.filter((f) => f.isPublished);

  // PRODUCT ACTIONS
  const addProduct = (newProduct: Omit<Product, "id"> & { id?: string }): Product => {
    const id = newProduct.id || `ev-${Date.now()}`;
    const product: Product = {
      ...newProduct,
      id,
      inventoryCount: newProduct.inventoryCount || newProduct.inventory || 15,
      inStock: newProduct.inStock !== undefined ? newProduct.inStock : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const duplicateProduct = (id: string): Product | undefined => {
    const original = products.find((p) => p.id === id);
    if (!original) return undefined;
    const duplicated: Product = {
      ...original,
      id: `ev-${Date.now()}`,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
      sku: `${original.sku}-COPY`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  // CATEGORY ACTIONS
  const addCategory = (newCat: Omit<Category, "id"> & { id?: string }): Category => {
    const id = newCat.id || `cat-${Date.now()}`;
    const cat: Category = { ...newCat, id };
    setCategories((prev) => [...prev, cat]);
    return cat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // COLLECTION ACTIONS
  const addCollection = (newCol: Omit<Collection, "id"> & { id?: string }): Collection => {
    const id = newCol.id || `col-${Date.now()}`;
    const col: Collection = { ...newCol, id };
    setCollections((prev) => [...prev, col]);
    return col;
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  // SHOPPABLE VIDEOS ACTIONS
  const addShoppableVideo = (newVid: Omit<ShoppableVideo, "id"> & { id?: string }): ShoppableVideo => {
    const id = newVid.id || `vid-${Date.now()}`;
    const vid: ShoppableVideo = { ...newVid, id };
    setShoppableVideos((prev) => [...prev, vid]);
    return vid;
  };

  const updateShoppableVideo = (id: string, updates: Partial<ShoppableVideo>) => {
    setShoppableVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const deleteShoppableVideo = (id: string) => {
    setShoppableVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // REVIEWS ACTIONS
  const addReview = (newRev: Omit<Review, "id" | "date"> & { id?: string }): Review => {
    const id = newRev.id || `rev-${Date.now()}`;
    const rev: Review = {
      ...newRev,
      id,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setReviews((prev) => [rev, ...prev]);
    return rev;
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // NAVIGATION
  const updateNavigationItems = (items: NavigationItem[]) => {
    setNavigationItems(items);
  };

  // LOOKBOOK ACTIONS
  const addLookbookItem = (itemData: Omit<LookbookItem, "id"> & { id?: string }): LookbookItem => {
    const id = itemData.id || `look-${Date.now()}`;
    const item: LookbookItem = { ...itemData, id };
    setLookbookItems((prev) => [...prev, item]);
    return item;
  };

  const updateLookbookItem = (id: string, updates: Partial<LookbookItem>) => {
    setLookbookItems((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const deleteLookbookItem = (id: string) => {
    setLookbookItems((prev) => prev.filter((l) => l.id !== id));
  };

  // FAQ ACTIONS
  const addFAQ = (faqData: Omit<FAQItem, "id"> & { id?: string }): FAQItem => {
    const id = faqData.id || `faq-${Date.now()}`;
    const faq: FAQItem = { ...faqData, id };
    setFaqs((prev) => [...prev, faq]);
    return faq;
  };

  const updateFAQ = (id: string, updates: Partial<FAQItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // ORDER ACTIONS
  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "date" | "timeline">): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `EV-${randomNum}`;
    const id = `ord-${Date.now()}`;
    const date = new Date().toISOString().split("T")[0];

    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      date,
      timeline: [
        {
          title: "Order Placed & Registered in Atelier Database",
          timestamp: "Just now",
          completed: true,
          note: `Payment: ${orderData.paymentMethod} (${orderData.paymentStatus})`,
        },
        {
          title: "Quality Check & Handloom Packing",
          timestamp: "Scheduled within 24 hours",
          completed: false,
          note: "Surat Central Atelier",
        },
        {
          title: "Dispatched via Express Courier",
          timestamp: "Pending pickup",
          completed: false,
        },
        {
          title: "Delivered to Patron",
          timestamp: "Estimated in 2–4 business days",
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update customer lifetime records
    addOrUpdateCustomer({
      name: orderData.customerName,
      email: orderData.customerEmail,
      phone: orderData.customerPhone,
      city: orderData.city,
      totalOrders: 1,
      totalSpend: orderData.total,
      lastOrderDate: date,
      joinedDate: date,
    });

    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;
        const updatedTimeline = [
          ...order.timeline,
          {
            title: `Status updated to ${status}`,
            timestamp: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            completed: true,
            note: note || `Updated by Atelier Admin`,
          },
        ];
        return { ...order, status, timeline: updatedTimeline };
      })
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // CUSTOMER ACTIONS
  const addOrUpdateCustomer = (customerData: Omit<Customer, "id"> & { id?: string }) => {
    setCustomers((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === customerData.email.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpend: c.totalSpend + customerData.totalSpend,
                lastOrderDate: customerData.lastOrderDate,
              }
            : c
        );
      }
      const id = customerData.id || `cust-${Date.now()}`;
      return [...prev, { ...customerData, id }];
    });
  };

  // COUPON ACTIONS
  const addCoupon = (couponData: Omit<Coupon, "id"> & { id?: string }): Coupon => {
    const id = couponData.id || `coup-${Date.now()}`;
    const newCoupon: Coupon = { ...couponData, id };
    setCoupons((prev) => [...prev, newCoupon]);
    return newCoupon;
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const validateCoupon = (code: string, subtotal: number) => {
    const normalized = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === normalized && c.isActive);

    if (!coupon) {
      return { isValid: false, discountAmount: 0, message: "Invalid or inactive promo code." };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        isValid: false,
        discountAmount: 0,
        message: `Minimum order value for code ${coupon.code} is ₹${coupon.minOrderValue.toLocaleString("en-IN")}.`,
      };
    }

    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = Math.min(coupon.discountValue, subtotal);
    }

    return {
      isValid: true,
      discountAmount,
      message: `Privilege code ${coupon.code} applied! Saved ₹${discountAmount.toLocaleString("en-IN")}`,
      coupon,
    };
  };

  // AUDIT LOGS
  const addAuditLog = (
    action: string,
    entity: AuditLog["entity"],
    details: string,
    entityId?: string,
    entityName?: string,
    severity: AuditLogSeverity = "info",
    previousState?: any,
    newState?: any
  ) => {
    const log: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actorId: adminUser?.id || "system",
      actorName: adminUser?.name || "System",
      actorEmail: adminUser?.email || "system@evaravastra.com",
      actorRole: adminUser?.role || "superadmin",
      action,
      entity,
      entityId,
      entityName,
      details,
      previousState,
      newState,
      timestamp: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      severity,
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  // INVENTORY ADJUSTMENT ACTIONS
  const adjustInventory = (
    productId: string,
    newQuantity: number,
    reason: InventoryAdjustmentReason,
    note?: string,
    variantId?: string
  ) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const previousInventory = product.inventoryCount || product.inventory || 0;
    const changeAmount = newQuantity - previousInventory;

    // Update product
    updateProduct(productId, {
      inventory: newQuantity,
      inventoryCount: newQuantity,
      inStock: newQuantity > 0,
    });

    const adjustment: InventoryAdjustment = {
      id: `adj-${Date.now()}`,
      productId,
      productTitle: product.title,
      productSku: product.sku,
      variantId,
      previousInventory,
      newInventory: newQuantity,
      changeAmount,
      reason,
      note,
      actorName: adminUser?.name || "Atelier Director",
      actorEmail: adminUser?.email || "admin@evaravastra.com",
      timestamp: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    setInventoryAdjustments((prev) => [adjustment, ...prev]);

    addAuditLog(
      "ADJUST_INVENTORY",
      "inventory",
      `Stock adjustment for ${product.title} (${product.sku}): ${previousInventory} -> ${newQuantity} (${changeAmount >= 0 ? `+${changeAmount}` : changeAmount}). Reason: ${reason}. ${note ? `Note: ${note}` : ""}`,
      productId,
      product.title,
      newQuantity <= 3 ? "warning" : "info",
      { inventory: previousInventory },
      { inventory: newQuantity }
    );
  };

  // ADMIN USER MANAGEMENT
  const addAdminUser = (userData: Omit<AdminUser, "id" | "createdAt">): AdminUser => {
    const id = `admin-${Date.now()}`;
    const newUser: AdminUser = {
      ...userData,
      id,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAdminUsers((prev) => [...prev, newUser]);
    addAuditLog("CREATE_ADMIN_USER", "user", `Created admin account for ${newUser.name} with role ${newUser.role}`, id, newUser.name, "warning");
    return newUser;
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
    if (adminUser?.id === id) {
      setAdminUser((prev) => (prev ? { ...prev, ...updates } : null));
    }
    addAuditLog("UPDATE_ADMIN_USER", "user", `Updated admin account details for user ID ${id}`, id, updates.name, "info");
  };

  const deleteAdminUser = (id: string) => {
    const target = adminUsers.find((u) => u.id === id);
    setAdminUsers((prev) => prev.filter((u) => u.id !== id));
    addAuditLog("DELETE_ADMIN_USER", "user", `Deleted admin account for ${target?.name || id}`, id, target?.name, "critical");
  };

  const switchAdminRole = (role: AdminRole) => {
    const targetUser = adminUsers.find((u) => u.role === role) || {
      id: `admin-demo-${role}`,
      email: `${role}@evaravastra.com`,
      name: role.replace("_", " ").toUpperCase(),
      role,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAdminUser(targetUser);
    addAuditLog("ROLE_SWITCH", "auth", `Switched active session to demo role ${role}`, targetUser.id, targetUser.name, "info");
  };

  const hasPermission = (module: string): boolean => {
    if (!adminUser) return false;
    const role = adminUser.role;

    if (role === "superadmin") return true;

    if (role === "admin") {
      // Store Admin can access everything except user management
      return module !== "users";
    }

    if (role === "order_manager") {
      return ["dashboard", "orders", "customers", "inventory"].includes(module);
    }

    if (role === "content_manager") {
      return [
        "dashboard",
        "content",
        "homepage",
        "notifications",
        "reviews",
        "lookbook",
        "craftsmanship",
        "faqs",
        "videos",
        "media",
        "navigation",
      ].includes(module);
    }

    return false;
  };

  // CONTENT / CMS
  const updateNotificationBar = (config: Partial<NotificationBarConfig>) => {
    setNotificationBar((prev) => ({ ...prev, ...config }));
    addAuditLog("UPDATE_NOTIFICATION_BAR", "notification", `Updated top announcement bar settings`, undefined, undefined, "info");
  };

  const updateHomepageCMS = (config: Partial<HomepageCMS>) => {
    setHomepageCMS((prev) => ({ ...prev, ...config }));
    addAuditLog("UPDATE_HOMEPAGE_CMS", "cms", `Updated homepage structured content and layout`, undefined, undefined, "info");
  };

  const updateCraftsmanshipCMS = (config: Partial<CraftsmanshipCMS>) => {
    setCraftsmanshipCMS((prev) => ({ ...prev, ...config }));
    addAuditLog("UPDATE_CRAFTSMANSHIP_CMS", "cms", `Updated craftsmanship narrative and steps`, undefined, undefined, "info");
  };

  // MEDIA ASSET ACTIONS
  const addMediaAsset = (assetData: Omit<MediaAsset, "id" | "createdAt">): MediaAsset => {
    const id = `med-${Date.now()}`;
    const asset: MediaAsset = {
      ...assetData,
      id,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setMediaAssets((prev) => [asset, ...prev]);
    addAuditLog("ADD_MEDIA_ASSET", "cms", `Uploaded media asset '${asset.title}'`, id, asset.title, "info");
    return asset;
  };

  const deleteMediaAsset = (id: string) => {
    const target = mediaAssets.find((m) => m.id === id);
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
    addAuditLog("DELETE_MEDIA_ASSET", "cms", `Removed media asset '${target?.title || id}'`, id, target?.title, "info");
  };

  // SETTINGS
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    addAuditLog("UPDATE_SITE_SETTINGS", "settings", `Updated store settings and commerce configuration`, undefined, undefined, "warning");
  };

  // AUTH
  const loginAdmin = (email: string, pass: string): boolean => {
    const foundUser = adminUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.isActive
    );

    if (
      foundUser &&
      (pass === "evara2026" || pass === "admin" || pass === "password")
    ) {
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };
      setAdminUser(updatedUser);
      updateAdminUser(foundUser.id, { lastLogin: updatedUser.lastLogin });
      addAuditLog("ADMIN_LOGIN", "auth", `Successful admin login for ${foundUser.name} (${foundUser.role})`, foundUser.id, foundUser.name, "info");
      return true;
    }

    if (
      (email === "admin@evaravastra.com" && pass === "evara2026") ||
      (email === "evaravastra@gmail.com" && pass === "evara2026") ||
      (email === "admin" && pass === "admin")
    ) {
      setAdminUser(initialAdminUser);
      addAuditLog("ADMIN_LOGIN", "auth", `Successful admin login for ${initialAdminUser.name}`, initialAdminUser.id, initialAdminUser.name, "info");
      return true;
    }

    addAuditLog("FAILED_LOGIN_ATTEMPT", "auth", `Failed login attempt for email '${email}'`, undefined, undefined, "warning");
    return false;
  };

  const logoutAdmin = () => {
    if (adminUser) {
      addAuditLog("ADMIN_LOGOUT", "auth", `Admin signed out: ${adminUser.name}`, adminUser.id, adminUser.name, "info");
    }
    setAdminUser(null);
  };

  // SHIPPING & LOGISTICS (SHIPROCKET) ACTIONS
  const createShipmentForOrder = async (order: Order): Promise<Shipment> => {
    try {
      const defaultPickup =
        pickupLocations.find((p) => p.id === shippingSettings.defaultPickupLocationId) ||
        pickupLocations[0];

      let initialShipment = await shippingProvider.createShipmentOrder({
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        shippingAddress: order.shippingAddress,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        country: order.country || "India",
        paymentMethod: order.paymentMethod.toLowerCase().includes("cash") || order.paymentMethod.toLowerCase().includes("cod") ? "cod" : "prepaid",
        items: order.items.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          fabric: i.fabric,
        })),
        subtotal: order.subtotal,
        total: order.total,
        packageWeightKg: shippingSettings.defaultWeightKg,
        dimensionsCm: shippingSettings.defaultDimensionsCm,
        pickupLocationName: defaultPickup?.name || "Surat Atelier Primary",
      });

      // If auto-generate AWB is enabled in settings, immediately allocate courier
      if (shippingSettings.autoGenerateAwb) {
        try {
          initialShipment = await shippingProvider.assignCourierAndGenerateAWB(initialShipment);
        } catch (awbErr) {
          console.warn("Auto AWB assignment delayed:", awbErr);
        }
      }

      setShipments((prev) => [initialShipment, ...prev.filter((s) => s.orderId !== order.id)]);

      addAuditLog(
        "CREATE_SHIPMENT",
        "order",
        `Created ${initialShipment.provider} shipment for order ${order.orderNumber} (Status: ${initialShipment.status})`,
        order.id,
        order.orderNumber,
        "info"
      );

      return initialShipment;
    } catch (error: any) {
      addAuditLog(
        "SHIPMENT_CREATION_FAILED",
        "order",
        `Failed to create shipment for order ${order.orderNumber}: ${error?.message}`,
        order.id,
        order.orderNumber,
        "warning"
      );
      throw error;
    }
  };

  const assignCourierAndAWB = async (shipmentId: string, courierId?: number): Promise<Shipment> => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) throw new Error("Shipment not found");

    const updated = await shippingProvider.assignCourierAndGenerateAWB(shipment, courierId);
    setShipments((prev) => prev.map((s) => (s.id === shipmentId ? updated : s)));

    addAuditLog(
      "ASSIGN_AWB",
      "order",
      `Assigned courier ${updated.courierName} and generated AWB ${updated.awb} for shipment ${shipment.orderNumber}`,
      shipment.orderId,
      shipment.orderNumber,
      "info"
    );

    return updated;
  };

  const requestPickup = async (shipmentId: string): Promise<Shipment> => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) throw new Error("Shipment not found");

    const updated = await shippingProvider.requestPickup(shipment);
    setShipments((prev) => prev.map((s) => (s.id === shipmentId ? updated : s)));

    addAuditLog(
      "REQUEST_PICKUP",
      "order",
      `Requested courier pickup for shipment ${shipment.orderNumber} at ${updated.pickupLocationName}`,
      shipment.orderId,
      shipment.orderNumber,
      "info"
    );

    return updated;
  };

  const cancelShipment = async (shipmentId: string): Promise<Shipment> => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) throw new Error("Shipment not found");

    const updated = await shippingProvider.cancelShipment(shipment);
    setShipments((prev) => prev.map((s) => (s.id === shipmentId ? updated : s)));

    addAuditLog(
      "CANCEL_SHIPMENT",
      "order",
      `Cancelled shipment for order ${shipment.orderNumber}`,
      shipment.orderId,
      shipment.orderNumber,
      "warning"
    );

    return updated;
  };

  const syncTracking = async (shipmentId: string): Promise<Shipment> => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) throw new Error("Shipment not found");

    const updated = await shippingProvider.syncTracking(shipment);
    setShipments((prev) => prev.map((s) => (s.id === shipmentId ? updated : s)));
    return updated;
  };

  const updateShippingSettings = (settings: Partial<ShippingSettings>) => {
    setShippingSettings((prev) => ({ ...prev, ...settings }));
    addAuditLog("UPDATE_SHIPPING_SETTINGS", "settings", "Updated Shiprocket logistics and shipping rules", undefined, undefined, "info");
  };

  const addPickupLocation = (loc: Omit<PickupLocation, "id">): PickupLocation => {
    const id = `pickup-${Date.now()}`;
    const newLoc: PickupLocation = { ...loc, id };
    setPickupLocations((prev) => [...prev, newLoc]);
    addAuditLog("ADD_PICKUP_LOCATION", "settings", `Added pickup location: ${newLoc.name} (${newLoc.pincode})`, id, newLoc.name, "info");
    return newLoc;
  };

  const updatePickupLocation = (id: string, updates: Partial<PickupLocation>) => {
    setPickupLocations((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addAuditLog("UPDATE_PICKUP_LOCATION", "settings", `Updated pickup location #${id}`, id, undefined, "info");
  };

  const deletePickupLocation = (id: string) => {
    setPickupLocations((prev) => prev.filter((p) => p.id !== id));
    addAuditLog("DELETE_PICKUP_LOCATION", "settings", `Deleted pickup location #${id}`, id, undefined, "warning");
  };

  // SYSTEM RESET
  const resetToDefaultData = () => {
    localStorage.clear();
    setSiteSettings(initialSiteSettings);
    setNotificationBar(initialNotificationBar);
    setHomepageCMS(initialHomepageCMS);
    setCraftsmanshipCMS(initialCraftsmanshipCMS);
    setLookbookItems(initialLookbookItems);
    setFaqs(initialFAQs);
    setCategories(initialCategories);
    setCollections(initialCollections);
    setProducts(initialProducts);
    setShoppableVideos(initialShoppableVideos);
    setReviews(initialReviews);
    setNavigationItems(initialNavigationItems);
    setCoupons(initialCoupons);
    setOrders(initialOrders);
    setCustomers(initialCustomers);
    setMediaAssets(initialMediaAssets);
    setAdminUsers(initialAdminUsers);
    setAdminUser(initialAdminUser);
    setAuditLogs(initialAuditLogs);
    setInventoryAdjustments(initialInventoryAdjustments);
    setShipments(initialShipments);
    setPickupLocations(initialPickupLocations);
    setShippingSettings(initialShippingSettings);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        publishedProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,

        categories,
        activeCategories,
        addCategory,
        updateCategory,
        deleteCategory,

        collections,
        activeCollections,
        addCollection,
        updateCollection,
        deleteCollection,

        shoppableVideos,
        publishedVideos,
        addShoppableVideo,
        updateShoppableVideo,
        deleteShoppableVideo,

        reviews,
        approvedReviews,
        featuredReviews,
        addReview,
        updateReview,
        deleteReview,

        navigationItems,
        updateNavigationItems,

        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,

        customers,
        addOrUpdateCustomer,

        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        validateCoupon,

        notificationBar,
        updateNotificationBar,
        homepageCMS,
        updateHomepageCMS,
        craftsmanshipCMS,
        updateCraftsmanshipCMS,
        lookbookItems,
        publishedLookbookItems,
        addLookbookItem,
        updateLookbookItem,
        deleteLookbookItem,
        faqs,
        activeFAQs,
        addFAQ,
        updateFAQ,
        deleteFAQ,

        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,

        siteSettings,
        updateSiteSettings,

        inventoryAdjustments,
        adjustInventory,

        adminUser,
        adminUsers,
        isAdminAuthenticated: !!adminUser,
        loginAdmin,
        switchAdminRole,
        logoutAdmin,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        hasPermission,

        auditLogs,
        addAuditLog,

        shipments,
        pickupLocations,
        shippingSettings,
        createShipmentForOrder,
        assignCourierAndAWB,
        requestPickup,
        cancelShipment,
        syncTracking,
        updateShippingSettings,
        addPickupLocation,
        updatePickupLocation,
        deletePickupLocation,

        resetToDefaultData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
