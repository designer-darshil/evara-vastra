import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Product,
  Category,
  Collection,
  Order,
  OrderStatus,
  Customer,
  Coupon,
  NotificationBarConfig,
  HomepageCMS,
  CraftsmanshipCMS,
  LookbookItem,
  FAQItem,
  MediaAsset,
  SiteSettings,
  AdminUser,
} from "../types";
import {
  initialSiteSettings,
  initialNotificationBar,
  initialHomepageCMS,
  initialCategories,
  initialCollections,
  initialProducts,
  initialCoupons,
  initialOrders,
  initialCustomers,
  initialLookbookItems,
  initialCraftsmanshipCMS,
  initialFAQs,
  initialMediaAssets,
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
  validateCoupon: (code: string, subtotal: number) => { isValid: boolean; discountAmount: number; message: string; coupon?: Coupon };

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

const DataContext = createContext<DataContextType | undefined>(undefined);

const loadStored = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`evara_v2_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const saveStored = <T,>(key: string, data: T) => {
  try {
    localStorage.setItem(`evara_v2_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State variables with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => loadStored("products", initialProducts));
  const [categories, setCategories] = useState<Category[]>(() => loadStored("categories", initialCategories));
  const [collections, setCollections] = useState<Collection[]>(() => loadStored("collections", initialCollections));
  const [orders, setOrders] = useState<Order[]>(() => loadStored("orders", initialOrders));
  const [customers, setCustomers] = useState<Customer[]>(() => loadStored("customers", initialCustomers));
  const [coupons, setCoupons] = useState<Coupon[]>(() => loadStored("coupons", initialCoupons));
  const [notificationBar, setNotificationBar] = useState<NotificationBarConfig>(() =>
    loadStored("notification", initialNotificationBar)
  );
  const [homepageCMS, setHomepageCMS] = useState<HomepageCMS>(() =>
    loadStored("homepage_cms", initialHomepageCMS)
  );
  const [craftsmanshipCMS, setCraftsmanshipCMS] = useState<CraftsmanshipCMS>(() =>
    loadStored("craftsmanship_cms", initialCraftsmanshipCMS)
  );
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>(() =>
    loadStored("lookbook", initialLookbookItems)
  );
  const [faqs, setFaqs] = useState<FAQItem[]>(() => loadStored("faqs", initialFAQs));
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() =>
    loadStored("media", initialMediaAssets)
  );
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() =>
    loadStored("settings", initialSiteSettings)
  );

  // Admin session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => loadStored("admin_user", null));

  // Sync to local storage
  useEffect(() => saveStored("products", products), [products]);
  useEffect(() => saveStored("categories", categories), [categories]);
  useEffect(() => saveStored("collections", collections), [collections]);
  useEffect(() => saveStored("orders", orders), [orders]);
  useEffect(() => saveStored("customers", customers), [customers]);
  useEffect(() => saveStored("coupons", coupons), [coupons]);
  useEffect(() => saveStored("notification", notificationBar), [notificationBar]);
  useEffect(() => saveStored("homepage_cms", homepageCMS), [homepageCMS]);
  useEffect(() => saveStored("craftsmanship_cms", craftsmanshipCMS), [craftsmanshipCMS]);
  useEffect(() => saveStored("lookbook", lookbookItems), [lookbookItems]);
  useEffect(() => saveStored("faqs", faqs), [faqs]);
  useEffect(() => saveStored("media", mediaAssets), [mediaAssets]);
  useEffect(() => saveStored("settings", siteSettings), [siteSettings]);
  useEffect(() => saveStored("admin_user", adminUser), [adminUser]);

  // Derived filtered views for customer storefront
  const publishedProducts = products.filter((p) => p.status === "published");
  const activeCategories = categories.filter((c) => c.isEnabled);
  const activeCollections = collections.filter((c) => c.isPublished);
  const publishedLookbookItems = lookbookItems.filter((l) => l.isPublished);
  const activeFAQs = faqs.filter((f) => f.isEnabled).sort((a, b) => a.order - b.order);

  // PRODUCT CRUD
  const addProduct = (prodData: Omit<Product, "id"> & { id?: string }): Product => {
    const newProd: Product = {
      ...prodData,
      id: prodData.id || `prod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
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
      id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: `${original.title} (Copy)`,
      code: `${original.code}-COPY`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  // CATEGORY CRUD
  const addCategory = (catData: Omit<Category, "id"> & { id?: string }): Category => {
    const newCat: Category = {
      ...catData,
      id: catData.id || `cat-${Date.now()}`,
      isEnabled: catData.isEnabled ?? true,
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // COLLECTION CRUD
  const addCollection = (colData: Omit<Collection, "id"> & { id?: string }): Collection => {
    const newCol: Collection = {
      ...colData,
      id: colData.id || `col-${Date.now()}`,
      isPublished: colData.isPublished ?? true,
    };
    setCollections((prev) => [...prev, newCol]);
    return newCol;
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  // ORDER CRUD
  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "date" | "timeline">): Order => {
    const orderNumber = `DEMO-EV-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      date: nowStr,
      timeline: [
        {
          title: "Order Placed & Payment Confirmed (Demo)",
          timestamp: `${nowStr}, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
          completed: true,
        },
        {
          title: "Craft Quality Inspection",
          timestamp: "Scheduled within 24 hours",
          completed: false,
        },
        {
          title: "Dispatch via Insured Express Courier",
          timestamp: "Estimated 2–3 business days",
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Also update/register customer
    addOrUpdateCustomer({
      name: orderData.customerName,
      email: orderData.customerEmail,
      phone: orderData.customerPhone,
      city: orderData.city,
      totalOrders: 1,
      totalSpend: orderData.total,
      joinedDate: nowStr,
    });

    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const nowStr = `${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        const updatedTimeline = [
          ...o.timeline,
          {
            title: `Status Updated to ${status}`,
            timestamp: nowStr,
            note: note || `Admin updated order status to ${status}`,
            completed: true,
          },
        ];
        return {
          ...o,
          status,
          paymentStatus: status === "Delivered" || status === "Shipped" ? "Paid" : o.paymentStatus,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // CUSTOMER MANAGEMENT
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
                name: customerData.name || c.name,
                phone: customerData.phone || c.phone,
                city: customerData.city || c.city,
              }
            : c
        );
      }
      const newCust: Customer = {
        ...customerData,
        id: customerData.id || `cust-${Date.now()}`,
      };
      return [newCust, ...prev];
    });
  };

  // COUPONS
  const addCoupon = (couponData: Omit<Coupon, "id"> & { id?: string }): Coupon => {
    const newCoupon: Coupon = {
      ...couponData,
      id: couponData.id || `coupon-${Date.now()}`,
      code: couponData.code.toUpperCase().trim(),
      usageCount: 0,
    };
    setCoupons((prev) => [...prev, newCoupon]);
    return newCoupon;
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, code: (updates.code || c.code).toUpperCase().trim() } : c
      )
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const validateCoupon = (
    code: string,
    subtotal: number
  ): { isValid: boolean; discountAmount: number; message: string; coupon?: Coupon } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.isActive);

    if (!found) {
      return { isValid: false, discountAmount: 0, message: "Invalid or inactive privilege coupon code." };
    }

    if (subtotal < found.minOrderValue) {
      return {
        isValid: false,
        discountAmount: 0,
        message: `Minimum order value of ₹${found.minOrderValue.toLocaleString("en-IN")} required.`,
      };
    }

    let discount = 0;
    if (found.discountType === "percentage") {
      discount = Math.round((subtotal * found.discountValue) / 100);
      if (found.maxDiscount && discount > found.maxDiscount) {
        discount = found.maxDiscount;
      }
    } else {
      discount = found.discountValue;
    }

    return {
      isValid: true,
      discountAmount: discount,
      message: `Coupon ${found.code} applied successfully!`,
      coupon: found,
    };
  };

  // CONTENT & CMS
  const updateNotificationBar = (config: Partial<NotificationBarConfig>) => {
    setNotificationBar((prev) => ({ ...prev, ...config }));
  };

  const updateHomepageCMS = (config: Partial<HomepageCMS>) => {
    setHomepageCMS((prev) => ({ ...prev, ...config }));
  };

  const updateCraftsmanshipCMS = (config: Partial<CraftsmanshipCMS>) => {
    setCraftsmanshipCMS((prev) => ({ ...prev, ...config }));
  };

  const addLookbookItem = (itemData: Omit<LookbookItem, "id"> & { id?: string }): LookbookItem => {
    const newItem: LookbookItem = {
      ...itemData,
      id: itemData.id || `look-${Date.now()}`,
      isPublished: itemData.isPublished ?? true,
    };
    setLookbookItems((prev) => [...prev, newItem]);
    return newItem;
  };

  const updateLookbookItem = (id: string, updates: Partial<LookbookItem>) => {
    setLookbookItems((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const deleteLookbookItem = (id: string) => {
    setLookbookItems((prev) => prev.filter((l) => l.id !== id));
  };

  const addFAQ = (faqData: Omit<FAQItem, "id"> & { id?: string }): FAQItem => {
    const newFaq: FAQItem = {
      ...faqData,
      id: faqData.id || `faq-${Date.now()}`,
      isEnabled: faqData.isEnabled ?? true,
      order: faqData.order || faqs.length + 1,
    };
    setFaqs((prev) => [...prev, newFaq]);
    return newFaq;
  };

  const updateFAQ = (id: string, updates: Partial<FAQItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // MEDIA
  const addMediaAsset = (asset: Omit<MediaAsset, "id" | "createdAt">): MediaAsset => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
    return newAsset;
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
  };

  // SETTINGS
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
  };

  // ADMIN AUTH
  const loginAdmin = (email: string, pass: string): boolean => {
    // Demo admin authentication
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === "admin@evaravastra.com" || cleanEmail === "admin" || (cleanEmail.includes("@") && pass.length >= 4)) {
      const user: AdminUser = {
        id: "admin-master",
        email: cleanEmail,
        name: "Darshil (Creative Director)",
        role: "Administrator",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      };
      setAdminUser(user);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  const resetToDefaultData = () => {
    setProducts(initialProducts);
    setCategories(initialCategories);
    setCollections(initialCollections);
    setOrders(initialOrders);
    setCustomers(initialCustomers);
    setCoupons(initialCoupons);
    setNotificationBar(initialNotificationBar);
    setHomepageCMS(initialHomepageCMS);
    setCraftsmanshipCMS(initialCraftsmanshipCMS);
    setLookbookItems(initialLookbookItems);
    setFaqs(initialFAQs);
    setMediaAssets(initialMediaAssets);
    setSiteSettings(initialSiteSettings);
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
