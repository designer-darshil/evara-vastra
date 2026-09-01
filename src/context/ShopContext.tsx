import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  blouseOptIn?: boolean;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: "cart" | "wishlist" | "info" | "error";
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastItem[];
  cursorLabel: string | null;
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;

  // Cart operations
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSizeOrBlouse?: string | boolean,
    selectedColor?: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist operations
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Search & Modals
  openSearch: () => void;
  closeSearch: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Feedback & Interactions
  showToast: (message: string, type?: "cart" | "wishlist" | "info" | "error") => void;
  dismissToast: (id: string) => void;
  setCursorLabel: (label: string | null) => void;
  addRecentlyViewed: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state persisted in localStorage
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("evara_theme");
      if (saved === "dark" || saved === "light") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "light"; // default to elegant light palette for luxury handlooms
      }
      return "light";
    } catch {
      return "light";
    }
  });

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("evara_theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  // Sync data-theme attribute on mount & change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("evara_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("evara_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("evara_recently_viewed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("evara_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("evara_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast manager
  const showToast = (message: string, type: "cart" | "wishlist" | "info" | "error" = "info") => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedSizeOrBlouse?: string | boolean,
    selectedColor?: string
  ) => {
    const size = typeof selectedSizeOrBlouse === "string" ? selectedSizeOrBlouse : undefined;
    const blouseOptIn = typeof selectedSizeOrBlouse === "boolean" ? selectedSizeOrBlouse : false;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity, blouseOptIn, selectedColor: selectedColor || item.selectedColor }
            : item
        );
      }
      return [...prev, { product, quantity, blouseOptIn, selectedSize: size, selectedColor }];
    });

    // Opening the cart drawer is the primary confirmation
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist.", "wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your personal wishlist.", "wishlist");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistCount = wishlist.length;

  // Search & Drawer Modals
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 8);
      try {
        localStorage.setItem("evara_recently_viewed", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        isSearchOpen,
        isCartDrawerOpen,
        quickViewProduct,
        toasts,
        cursorLabel,
        theme,
        toggleTheme,
        setTheme,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,

        toggleWishlist,
        isInWishlist,
        wishlistCount,

        openSearch,
        closeSearch,
        openCartDrawer,
        closeCartDrawer,
        openQuickView,
        closeQuickView,

        showToast,
        dismissToast,
        setCursorLabel,
        addRecentlyViewed,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
