import React, { useState, useEffect } from "react";
import { DataProvider, useData } from "./context/DataContext";
import { ShopProvider } from "./context/ShopContext";

// Storefront Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { MobileMenu } from "./components/layout/MobileMenu";
import { SearchModal } from "./components/layout/SearchModal";
import { CartDrawer } from "./components/layout/CartDrawer";
import { QuickViewModal } from "./components/layout/QuickViewModal";
import { Toast } from "./components/layout/Toast";
import { CustomCursor } from "./components/layout/CustomCursor";
import { GrainOverlay } from "./components/layout/GrainOverlay";
import { NotificationBar } from "./components/common/NotificationBar";
import { AppLoader } from "./components/common/AppLoader";

// Storefront Pages
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
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { ShippingPolicyPage } from "./pages/ShippingPolicyPage";
import { ReturnsPolicyPage } from "./pages/ReturnsPolicyPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Admin Panel Pages
import { AdminLoginPage } from "./admin/AdminLoginPage";
import { AdminDashboardPage } from "./admin/AdminDashboardPage";
import { AdminProductsPage } from "./admin/AdminProductsPage";
import { AdminProductEditPage } from "./admin/AdminProductEditPage";
import { AdminCategoriesPage } from "./admin/AdminCategoriesPage";
import { AdminCollectionsPage } from "./admin/AdminCollectionsPage";
import { AdminOrdersPage } from "./admin/AdminOrdersPage";
import { AdminOrderDetailPage } from "./admin/AdminOrderDetailPage";
import { AdminCustomersPage } from "./admin/AdminCustomersPage";
import { AdminContentHubPage } from "./admin/AdminContentHubPage";
import { AdminHomepageCMSPage } from "./admin/AdminHomepageCMSPage";
import { AdminNotificationBarPage } from "./admin/AdminNotificationBarPage";
import { AdminShoppableVideosPage } from "./admin/AdminShoppableVideosPage";
import { AdminReviewsPage } from "./admin/AdminReviewsPage";
import { AdminNavigationPage } from "./admin/AdminNavigationPage";
import { AdminCouponsPage } from "./admin/AdminCouponsPage";
import { AdminMediaPage } from "./admin/AdminMediaPage";
import { AdminSettingsPage } from "./admin/AdminSettingsPage";
import { AdminAnalyticsPage } from "./admin/AdminAnalyticsPage";

const AppContent: React.FC = () => {
  const { siteSettings } = useData();
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Sync route and popstate
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleLocationChange);

    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 450);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      clearTimeout(timer);
    };
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    setCurrentPath(href);
    window.scrollTo(0, 0);
  };

  // Dynamic Browser Title
  useEffect(() => {
    const path = currentPath;
    if (path.startsWith("/admin")) {
      document.title = "Atelier Admin Suite | EVARA VASTRA";
    } else if (path === "/") {
      document.title = siteSettings.seoDefaultTitle || "EVARA VASTRA — Contemporary Indian Womenswear | Sarees, Co-Ords & Kurta Sets";
    } else if (path.startsWith("/shop")) {
      document.title = "Shop Catalog | EVARA VASTRA";
    } else if (path.startsWith("/colors/") || path.startsWith("/color/")) {
      const colorName = path.replace(/^\/(colors|color)\//, "").replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      document.title = `${colorName} Edit | EVARA VASTRA`;
    } else if (path.startsWith("/fabrics/") || path.startsWith("/fabric/")) {
      const fabricName = path.replace(/^\/(fabrics|fabric)\//, "").replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      document.title = `${fabricName} Silk | EVARA VASTRA`;
    } else if (path.startsWith("/occasions/") || path.startsWith("/occasion/")) {
      const occName = path.replace(/^\/(occasions|occasion)\//, "").replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      document.title = `${occName} Collection | EVARA VASTRA`;
    } else if (path.startsWith("/product/")) {
      document.title = "Product Details | EVARA VASTRA";
    } else if (path.startsWith("/collections")) {
      document.title = "Curated Collections | EVARA VASTRA";
    } else if (path === "/cart") {
      document.title = "Shopping Bag | EVARA VASTRA";
    } else if (path === "/checkout") {
      document.title = "Express Checkout | EVARA VASTRA";
    } else if (path === "/orders") {
      document.title = "Track Orders | EVARA VASTRA";
    } else if (path === "/shipping") {
      document.title = "Shipping Policy | EVARA VASTRA";
    } else if (path === "/returns") {
      document.title = "Replacement & Exchange Policy | EVARA VASTRA";
    } else if (path === "/privacy") {
      document.title = "Privacy Policy | EVARA VASTRA";
    } else if (path === "/terms") {
      document.title = "Terms of Service | EVARA VASTRA";
    } else {
      document.title = "EVARA VASTRA — Contemporary Indian Womenswear";
    }
  }, [currentPath, siteSettings.seoDefaultTitle]);

  // Check if current route is an admin page
  const isAdminRoute = currentPath.startsWith("/admin");

  // Admin Router
  const renderAdminRoute = () => {
    if (currentPath === "/admin/login") {
      return <AdminLoginPage onNavigate={navigate} />;
    }

    if (currentPath === "/admin" || currentPath === "/admin/") {
      return <AdminDashboardPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/products") {
      return <AdminProductsPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/products/new") {
      return <AdminProductEditPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/admin/products/edit/")) {
      const prodId = currentPath.replace("/admin/products/edit/", "");
      return <AdminProductEditPage productId={prodId} onNavigate={navigate} />;
    }
    if (currentPath === "/admin/categories") {
      return <AdminCategoriesPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/collections") {
      return <AdminCollectionsPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/shoppable-videos") {
      return <AdminShoppableVideosPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/reviews") {
      return <AdminReviewsPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/navigation") {
      return <AdminNavigationPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/orders") {
      return <AdminOrdersPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith("/admin/orders/")) {
      const ordId = currentPath.replace("/admin/orders/", "");
      return <AdminOrderDetailPage orderId={ordId} onNavigate={navigate} />;
    }
    if (currentPath === "/admin/customers") {
      return <AdminCustomersPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/content") {
      return <AdminContentHubPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/content/homepage") {
      return <AdminHomepageCMSPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/content/notification-bar" || currentPath === "/admin/notification-bar") {
      return <AdminNotificationBarPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/coupons") {
      return <AdminCouponsPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/media") {
      return <AdminMediaPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/settings") {
      return <AdminSettingsPage onNavigate={navigate} />;
    }
    if (currentPath === "/admin/analytics") {
      return <AdminAnalyticsPage onNavigate={navigate} />;
    }

    return <AdminDashboardPage onNavigate={navigate} />;
  };

  // Storefront Router
  const renderStorefrontRoute = () => {
    const url = new URL(window.location.href);
    const searchParam = url.searchParams.get("search") || undefined;
    const fabricParam = url.searchParams.get("fabric") || undefined;
    const occasionParam = url.searchParams.get("occasion") || undefined;
    const filterParam = url.searchParams.get("filter") || undefined;

    // Normalize path by stripping trailing slashes (e.g. '/colors/celestial-cobalt/' -> '/colors/celestial-cobalt')
    const cleanPath = currentPath.length > 1 && currentPath.endsWith("/")
      ? currentPath.slice(0, -1)
      : currentPath;

    if (cleanPath === "") {
      return <HomePage onNavigate={navigate} />;
    }

    if (cleanPath === "/" || cleanPath === "") {
      return <HomePage onNavigate={navigate} />;
    }

    if (cleanPath === "/shop") {
      return (
        <ShopPage
          onNavigate={navigate}
          searchParam={searchParam}
          fabricParam={fabricParam}
          occasionParam={occasionParam}
          filterParam={filterParam}
        />
      );
    }

    if (cleanPath.startsWith("/shop/")) {
      const categoryParam = cleanPath.replace("/shop/", "");
      return (
        <ShopPage
          categoryParam={categoryParam}
          onNavigate={navigate}
          searchParam={searchParam}
        />
      );
    }

    // Color routes (e.g. /colors/celestial-cobalt or /color/wine)
    if (cleanPath.startsWith("/colors/") || cleanPath.startsWith("/color/")) {
      const colorSlug = cleanPath.replace(/^\/(colors|color)\//, "");
      return (
        <ShopPage
          colorParam={colorSlug}
          onNavigate={navigate}
          searchParam={searchParam}
        />
      );
    }

    // Fabric routes (e.g. /fabrics/katan-silk or /fabric/fendy-satin)
    if (cleanPath.startsWith("/fabrics/") || cleanPath.startsWith("/fabric/")) {
      const fabricSlug = cleanPath.replace(/^\/(fabrics|fabric)\//, "");
      return (
        <ShopPage
          fabricParam={fabricSlug}
          onNavigate={navigate}
          searchParam={searchParam}
        />
      );
    }

    // Occasion routes (e.g. /occasions/wedding or /occasion/festive)
    if (cleanPath.startsWith("/occasions/") || cleanPath.startsWith("/occasion/")) {
      const occasionSlug = cleanPath.replace(/^\/(occasions|occasion)\//, "");
      return (
        <ShopPage
          occasionParam={occasionSlug}
          onNavigate={navigate}
          searchParam={searchParam}
        />
      );
    }

    if (cleanPath.startsWith("/product/")) {
      const slug = cleanPath.replace("/product/", "");
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (cleanPath === "/collections") {
      return <CollectionsListPage onNavigate={navigate} />;
    }

    if (cleanPath.startsWith("/collections/")) {
      const collectionSlug = cleanPath.replace("/collections/", "");
      return (
        <CollectionDetailPage
          collectionSlug={collectionSlug}
          onNavigate={navigate}
        />
      );
    }

    if (cleanPath === "/cart") {
      return <CartPage onNavigate={navigate} />;
    }

    if (cleanPath === "/checkout") {
      return <CheckoutPage onNavigate={navigate} />;
    }

    if (cleanPath === "/wishlist") {
      return <WishlistPage onNavigate={navigate} />;
    }

    if (cleanPath === "/account") {
      return <AccountPage onNavigate={navigate} />;
    }

    if (cleanPath === "/orders") {
      return <OrdersPage onNavigate={navigate} />;
    }

    if (cleanPath === "/about") {
      return <AboutPage onNavigate={navigate} />;
    }

    if (cleanPath === "/contact") {
      return <ContactPage onNavigate={navigate} />;
    }

    if (cleanPath === "/faq") {
      return <FaqPage onNavigate={navigate} />;
    }

    if (cleanPath === "/shipping") {
      return <ShippingPolicyPage onNavigate={navigate} />;
    }

    if (cleanPath === "/returns") {
      return <ReturnsPolicyPage onNavigate={navigate} />;
    }

    if (cleanPath === "/privacy") {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }

    if (cleanPath === "/terms") {
      return <TermsPage onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <>
      <AppLoader isLoading={isAppLoading} />

      {isAdminRoute ? (
        renderAdminRoute()
      ) : (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <CustomCursor />
          <GrainOverlay />
          <NotificationBar onNavigate={navigate} />
          <Navbar
            onNavigate={navigate}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          <main style={{ flex: 1 }}>{renderStorefrontRoute()}</main>

          <Footer onNavigate={navigate} />

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onNavigate={navigate}
          />
          <SearchModal onNavigate={navigate} />
          <CartDrawer onNavigate={navigate} />
          <QuickViewModal onNavigate={navigate} />
          <Toast />
        </div>
      )}
    </>
  );
};

export function App() {
  return (
    <DataProvider>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </DataProvider>
  );
}

export default App;
