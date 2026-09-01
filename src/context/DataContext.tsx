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
  FAQItem,
  LookbookItem,
  CraftsmanshipCMS,
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
  initialFAQs,
  initialLookbookItems,
  initialCraftsmanshipCMS,
} from "../data/initialData";

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

  // Admin Auth
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

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
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() =>
    loadStored(STORAGE_KEYS.AUTH, initialAdminUser)
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

  // CONTENT / CMS
  const updateNotificationBar = (config: Partial<NotificationBarConfig>) => {
    setNotificationBar((prev) => ({ ...prev, ...config }));
  };

  const updateHomepageCMS = (config: Partial<HomepageCMS>) => {
    setHomepageCMS((prev) => ({ ...prev, ...config }));
  };

  const updateCraftsmanshipCMS = (config: Partial<CraftsmanshipCMS>) => {
    setCraftsmanshipCMS((prev) => ({ ...prev, ...config }));
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
    return asset;
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
  };

  // SETTINGS
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
  };

  // AUTH
  const loginAdmin = (email: string, pass: string): boolean => {
    if (
      (email === "admin@evaravastra.com" && pass === "evara2026") ||
      (email === "evaravastra@gmail.com" && pass === "evara2026") ||
      (email === "admin" && pass === "admin")
    ) {
      setAdminUser(initialAdminUser);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
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
    setAdminUser(initialAdminUser);
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

        adminUser,
        isAdminAuthenticated: !!adminUser,
        loginAdmin,
        logoutAdmin,

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
