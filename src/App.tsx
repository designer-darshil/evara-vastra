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
import { CraftsmanshipPage } from "./pages/CraftsmanshipPage";
import { LookbookPage } from "./pages/LookbookPage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Admin Panel Components & Pages
import { AdminLayout } from "./admin/AdminLayout";
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
import { AdminLookbookPage } from "./admin/AdminLookbookPage";
import { AdminCraftsmanshipCMSPage } from "./admin/AdminCraftsmanshipCMSPage";
import { AdminFaqCMSPage } from "./admin/AdminFaqCMSPage";
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

    // Initial brief luxury loader
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 600);

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
      document.title = "Atelier Admin | EVARA VASTRA Management Suite";
    } else if (path === "/") {
      document.title = siteSettings.seoDefaultTitle || "EVARA VASTRA — Contemporary Indian Sarees | Modern Luxury Handlooms";
    } else if (path.startsWith("/shop")) {
      document.title = "Shop Handloom Sarees | EVARA VASTRA";
    } else if (path.startsWith("/product/")) {
      document.title = "Saree Drape | EVARA VASTRA";
    } else if (path.startsWith("/collections")) {
      document.title = "Curated Collections | EVARA VASTRA";
    } else if (path === "/cart") {
      document.title = "Shopping Bag | EVARA VASTRA";
    } else if (path === "/checkout") {
      document.title = "Express Checkout | EVARA VASTRA";
    } else if (path === "/orders") {
      document.title = "My Orders & Tracking | EVARA VASTRA";
    } else if (path === "/lookbook") {
      document.title = "Season Lookbook | EVARA VASTRA";
    } else if (path === "/craftsmanship") {
      document.title = "Artisanal Craftsmanship | EVARA VASTRA";
    } else {
      document.title = "EVARA VASTRA — Contemporary Indian Sarees";
    }
  }, [currentPath, siteSettings.seoDefaultTitle]);

  // Check if current route is an admin page
  const isAdminRoute = currentPath.startsWith("/admin");

  // Admin Router
  const renderAdminRoute = () => {
    if (currentPath === "/admin/login") {
      return <AdminLoginPage onNavigate={navigate} />;
    }

    let adminPageContent: React.ReactNode = <AdminDashboardPage onNavigate={navigate} />;

    if (currentPath === "/admin" || currentPath === "/admin/") {
      adminPageContent = <AdminDashboardPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/products") {
      adminPageContent = <AdminProductsPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/products/new") {
      adminPageContent = <AdminProductEditPage onNavigate={navigate} />;
    } else if (currentPath.startsWith("/admin/products/edit/")) {
      const prodId = currentPath.replace("/admin/products/edit/", "");
      adminPageContent = <AdminProductEditPage productId={prodId} onNavigate={navigate} />;
    } else if (currentPath === "/admin/categories") {
      adminPageContent = <AdminCategoriesPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/collections") {
      adminPageContent = <AdminCollectionsPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/orders") {
      adminPageContent = <AdminOrdersPage onNavigate={navigate} />;
    } else if (currentPath.startsWith("/admin/orders/")) {
      const ordId = currentPath.replace("/admin/orders/", "");
      adminPageContent = <AdminOrderDetailPage orderId={ordId} onNavigate={navigate} />;
    } else if (currentPath === "/admin/customers") {
      adminPageContent = <AdminCustomersPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/content") {
      adminPageContent = <AdminContentHubPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/content/homepage") {
      adminPageContent = <AdminHomepageCMSPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/content/notification-bar") {
      adminPageContent = <AdminNotificationBarPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/lookbook") {
      adminPageContent = <AdminLookbookPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/content/craftsmanship") {
      adminPageContent = <AdminCraftsmanshipCMSPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/content/faq") {
      adminPageContent = <AdminFaqCMSPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/coupons") {
      adminPageContent = <AdminCouponsPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/media") {
      adminPageContent = <AdminMediaPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/settings") {
      adminPageContent = <AdminSettingsPage onNavigate={navigate} />;
    } else if (currentPath === "/admin/analytics") {
      adminPageContent = <AdminAnalyticsPage onNavigate={navigate} />;
    }

    return (
      <AdminLayout currentPath={currentPath} onNavigate={navigate}>
        {adminPageContent}
      </AdminLayout>
    );
  };

  // Storefront Router
  const renderStorefrontRoute = () => {
    const url = new URL(window.location.href);
    const searchParam = url.searchParams.get("search") || undefined;
    const fabricParam = url.searchParams.get("fabric") || undefined;
    const occasionParam = url.searchParams.get("occasion") || undefined;
    const filterParam = url.searchParams.get("filter") || undefined;

    if (currentPath === "/") {
      return <HomePage onNavigate={navigate} />;
    }

    if (currentPath === "/shop") {
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

    if (currentPath.startsWith("/shop/")) {
      const categoryParam = currentPath.replace("/shop/", "");
      return (
        <ShopPage
          categoryParam={categoryParam}
          onNavigate={navigate}
          searchParam={searchParam}
        />
      );
    }

    if (currentPath.startsWith("/product/")) {
      const slug = currentPath.replace("/product/", "");
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === "/collections") {
      return <CollectionsListPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith("/collections/")) {
      const collectionSlug = currentPath.replace("/collections/", "");
      return (
        <CollectionDetailPage
          collectionSlug={collectionSlug}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === "/cart") {
      return <CartPage onNavigate={navigate} />;
    }

    if (currentPath === "/checkout") {
      return <CheckoutPage onNavigate={navigate} />;
    }

    if (currentPath === "/wishlist") {
      return <WishlistPage onNavigate={navigate} />;
    }

    if (currentPath === "/account") {
      return <AccountPage onNavigate={navigate} />;
    }

    if (currentPath === "/orders") {
      return <OrdersPage onNavigate={navigate} />;
    }

    if (currentPath === "/about") {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === "/craftsmanship") {
      return <CraftsmanshipPage onNavigate={navigate} />;
    }

    if (currentPath === "/lookbook") {
      return <LookbookPage onNavigate={navigate} />;
    }

    if (currentPath === "/contact") {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentPath === "/faq") {
      return <FaqPage onNavigate={navigate} />;
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
