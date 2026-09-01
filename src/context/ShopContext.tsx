import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
  blouseOptIn?: boolean;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: "cart" | "wishlist" | "info";
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

  // Cart operations
  addToCart: (product: Product, quantity?: number, blouseOptIn?: boolean) => void;
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
  showToast: (message: string, type?: "cart" | "wishlist" | "info") => void;
  setCursorLabel: (label: string | null) => void;
  addRecentlyViewed: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  const showToast = (message: string, type: "cart" | "wishlist" | "info" = "info") => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1, blouseOptIn: boolean = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, blouseOptIn }
            : item
        );
      }
      return [...prev, { product, quantity, blouseOptIn }];
    });
    showToast(`Added "${product.title}" to your shopping bag.`, "cart");
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from your bag.", "info");
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

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const isCurrentlySaved = wishlist.includes(productId);
    if (isCurrentlySaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast("Removed from your saved pieces.", "wishlist");
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast("Added to your saved pieces.", "wishlist");
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 6);
      try {
        localStorage.setItem("evara_recently_viewed", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const wishlistCount = wishlist.length;

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
