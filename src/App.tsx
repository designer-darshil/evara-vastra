import React, { useState, useEffect } from "react";
import { ShopProvider } from "./context/ShopContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SearchModal } from "./components/layout/SearchModal";
import { CartDrawer } from "./components/layout/CartDrawer";
import { QuickViewModal } from "./components/layout/QuickViewModal";
import { Toast } from "./components/layout/Toast";
import { CustomCursor } from "./components/layout/CustomCursor";
import { GrainOverlay } from "./components/layout/GrainOverlay";

// Page Views
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CollectionsListPage } from "./pages/CollectionsListPage";
import { CollectionDetailPage } from "./pages/CollectionDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { WishlistPage } from "./pages/WishlistPage";
import { AccountPage } from "./pages/AccountPage";
import { OrdersPage } from "./pages/OrdersPage";
import { AboutPage } from "./pages/AboutPage";
import { CraftsmanshipPage } from "./pages/CraftsmanshipPage";
import { LookbookPage } from "./pages/LookbookPage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname + window.location.search;
  });

  const navigate = (href: string) => {
    if (href === currentPath) return;
    window.history.pushState(null, "", href);
    setCurrentPath(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update Page Title based on route
  useEffect(() => {
    const cleanPath = currentPath.split("?")[0];
    if (cleanPath === "/") {
      document.title = "EVARA — Contemporary Indian Sarees | Modern Luxury Handlooms";
    } else if (cleanPath.startsWith("/shop")) {
      document.title = "Shop Handloom Sarees | EVARA Atelier";
    } else if (cleanPath.startsWith("/product/")) {
      const slug = cleanPath.replace("/product/", "");
      document.title = `${slug.replace(/-/g, " ").toUpperCase()} — EVARA`;
    } else if (cleanPath.startsWith("/collections")) {
      document.title = "Atelier Collections — EVARA Sarees";
    } else if (cleanPath === "/cart") {
      document.title = "Shopping Bag — EVARA";
    } else if (cleanPath === "/checkout") {
      document.title = "Express Checkout — EVARA";
    } else if (cleanPath === "/wishlist") {
      document.title = "Saved Pieces — EVARA";
    } else if (cleanPath === "/account") {
      document.title = "Client Account — EVARA";
    } else if (cleanPath === "/orders") {
      document.title = "My Orders — EVARA";
    } else if (cleanPath === "/about") {
      document.title = "Our Story & Atelier Roots — EVARA";
    } else if (cleanPath === "/craftsmanship") {
      document.title = "Artisanal Heritage & Kadwa Weaving — EVARA";
    } else if (cleanPath === "/lookbook") {
      document.title = "Editorial Campaign Lookbook — EVARA";
    } else if (cleanPath === "/contact") {
      document.title = "Atelier Concierge & Contact — EVARA";
    } else if (cleanPath === "/faq") {
      document.title = "Client Inquiries & FAQ — EVARA";
    }
  }, [currentPath]);

  // Route Dispatcher
  const renderCurrentPage = () => {
    const [pathOnly, queryString] = currentPath.split("?");
    const searchParams = new URLSearchParams(queryString || "");

    if (pathOnly === "/") {
      return <HomePage onNavigate={navigate} />;
    }

    if (pathOnly === "/shop") {
      return (
        <ShopPage
          onNavigate={navigate}
          categoryParam={searchParams.get("category") || undefined}
          searchParam={searchParams.get("q") || undefined}
          fabricParam={searchParams.get("fabric") || undefined}
          occasionParam={searchParams.get("occasion") || undefined}
          filterParam={searchParams.get("filter") || undefined}
        />
      );
    }

    if (pathOnly.startsWith("/shop/")) {
      const category = pathOnly.replace("/shop/", "");
      return <ShopPage onNavigate={navigate} categoryParam={category} />;
    }

    if (pathOnly.startsWith("/product/")) {
      const slug = pathOnly.replace("/product/", "");
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (pathOnly === "/collections") {
      return <CollectionsListPage onNavigate={navigate} />;
    }

    if (pathOnly.startsWith("/collections/")) {
      const collectionSlug = pathOnly.replace("/collections/", "");
      return <CollectionDetailPage collectionSlug={collectionSlug} onNavigate={navigate} />;
    }

    if (pathOnly === "/cart") {
      return <CartPage onNavigate={navigate} />;
    }

    if (pathOnly === "/checkout") {
      return <CheckoutPage onNavigate={navigate} />;
    }

    if (pathOnly === "/wishlist") {
      return <WishlistPage onNavigate={navigate} />;
    }

    if (pathOnly === "/account") {
      return <AccountPage onNavigate={navigate} />;
    }

    if (pathOnly === "/orders") {
      return <OrdersPage onNavigate={navigate} />;
    }

    if (pathOnly === "/about") {
      return <AboutPage onNavigate={navigate} />;
    }

    if (pathOnly === "/craftsmanship") {
      return <CraftsmanshipPage onNavigate={navigate} />;
    }

    if (pathOnly === "/lookbook") {
      return <LookbookPage onNavigate={navigate} />;
    }

    if (pathOnly === "/contact") {
      return <ContactPage onNavigate={navigate} />;
    }

    if (pathOnly === "/faq") {
      return <FaqPage onNavigate={navigate} />;
    }

    if (pathOnly === "/search") {
      return <ShopPage onNavigate={navigate} searchParam={searchParams.get("q") || ""} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <ShopProvider>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
        <CustomCursor />
        <GrainOverlay />
        <Navbar onNavigate={navigate} currentPath={currentPath} />

        <main style={{ flex: 1 }}>{renderCurrentPage()}</main>

        <Footer onNavigate={navigate} />

        {/* Global Overlays & Modals */}
        <SearchModal onNavigate={navigate} />
        <CartDrawer onNavigate={navigate} />
        <QuickViewModal onNavigate={navigate} />
        <Toast />
      </div>
    </ShopProvider>
  );
};
