import React, { useState } from "react";
import { useData } from "../context/DataContext";
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderTree,
  ShoppingBag,
  Users,
  Bell,
  Ticket,
  Image,
  Settings,
  BarChart3,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  Video,
  Star,
  Navigation,
} from "lucide-react";

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (href: string) => void;
  pageTitle?: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  pageTitle,
  children,
}) => {
  const { adminUser, logoutAdmin, isAdminAuthenticated, notificationBar, products, reviews } = useData();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FAF7F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "3rem",
            maxWidth: "440px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
            border: "1px solid #E5DFD5",
            borderRadius: "6px",
          }}
        >
          <ShieldAlert size={44} style={{ color: "#7C2430", margin: "0 auto 1.5rem auto" }} />
          <h2 style={{ fontSize: "1.5rem", color: "#171513", marginBottom: "0.5rem" }}>
            Admin Access Required
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#6F6257", marginBottom: "2rem", lineHeight: 1.5 }}>
            You must be authenticated to access the EVARA VASTRA administration suite.
          </p>
          <button
            onClick={() => onNavigate("/admin/login")}
            className="btn btn-primary"
            style={{ width: "100%", padding: "0.9rem" }}
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const lowStockCount = products.filter((p) => p.inventory <= 3 && p.status === "published").length;
  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Collections", href: "/admin/collections", icon: Layers },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { section: "STOREFRONT & CMS" },
    { label: "Shoppable Videos", href: "/admin/shoppable-videos", icon: Video },
    { label: "Customer Reviews", href: "/admin/reviews", icon: Star, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} new` : undefined },
    { label: "Navigation Menu", href: "/admin/navigation", icon: Navigation },
    { label: "Homepage CMS", href: "/admin/content/homepage", icon: LayoutDashboard },
    { label: "Notification Bar", href: "/admin/content/notification-bar", icon: Bell, badge: notificationBar.isEnabled ? "Active" : "Off" },
    { section: "COMMERCE & SETTINGS" },
    { label: "Coupons & Promos", href: "/admin/coupons", icon: Ticket },
    { label: "Media Assets", href: "/admin/media", icon: Image },
    { label: "Store Settings", href: "/admin/settings", icon: Settings },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  const handleNav = (href: string) => {
    setIsMobileNavOpen(false);
    onNavigate(href);
  };

  const handleLogout = () => {
    logoutAdmin();
    onNavigate("/admin/login");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F7F5F0",
        color: "#171513",
      }}
    >
      {/* Sidebar Desktop */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#171513",
          color: "#EBE6DF",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 100,
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
        className="desktop-only"
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              className="font-serif"
              style={{
                fontSize: "1.15rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "#FFFFFF",
              }}
            >
              EVARA VASTRA
            </span>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                backgroundColor: "var(--accent-wine)",
                color: "#FFFFFF",
                padding: "0.2rem 0.4rem",
                borderRadius: "2px",
                fontWeight: 700,
              }}
            >
              ADMIN
            </span>
          </div>
          <span style={{ fontSize: "0.72rem", color: "#8E877F", display: "block", marginTop: "0.2rem" }}>
            Surat Atelier Management
          </span>
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0.75rem" }}>
          {navItems.map((item, idx) => {
            if (item.section) {
              return (
                <div
                  key={idx}
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#7E756B",
                    padding: "1.25rem 0.75rem 0.4rem 0.75rem",
                  }}
                >
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = currentPath === item.href;

            return (
              <button
                key={idx}
                onClick={() => handleNav(item.href!)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0.65rem 0.75rem",
                  borderRadius: "4px",
                  backgroundColor: isActive ? "rgba(124, 36, 48, 0.35)" : "transparent",
                  color: isActive ? "#FFFFFF" : "#C5BEB5",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 400,
                  marginBottom: "2px",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Icon size={17} style={{ color: isActive ? "#EFA81A" : "#9E968D" }} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      backgroundColor: isActive ? "var(--accent-wine)" : "rgba(255,255,255,0.1)",
                      color: "#FFFFFF",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={() => onNavigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "#C5BEB5",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
            }}
          >
            <ExternalLink size={14} /> View Storefront
          </button>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "#E57373",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
            }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header
          style={{
            height: "64px",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5DFD5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            position: "sticky",
            top: 0,
            zIndex: 90,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="mobile-only"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}
            >
              <Menu size={22} />
            </button>
            <h1 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "#171513" }}>
              {pageTitle || "Atelier Admin Control Suite"}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => onNavigate("/")}
              style={{
                backgroundColor: "#FAF7F5",
                border: "1px solid #E5DFD5",
                borderRadius: "4px",
                padding: "0.35rem 0.75rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--accent-wine)",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                cursor: "pointer",
              }}
            >
              <ExternalLink size={13} /> Live Store
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-wine)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                {adminUser?.name?.charAt(0) || "A"}
              </div>
              <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{adminUser?.name || "Admin"}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "2rem", flex: 1, minWidth: 0 }}>
          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 9999,
          }}
          onClick={() => setIsMobileNavOpen(false)}
        >
          <div
            style={{
              width: "280px",
              height: "100%",
              backgroundColor: "#171513",
              color: "#FFFFFF",
              padding: "1.5rem 1rem",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <span className="font-serif" style={{ fontSize: "1.2rem", fontWeight: 700 }}>EVARA VASTRA</span>
              <button onClick={() => setIsMobileNavOpen(false)} style={{ background: "none", border: "none", color: "#fff" }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {navItems.map((item, idx) => {
                if (item.section) {
                  return (
                    <div key={idx} style={{ fontSize: "0.65rem", color: "#8E877F", padding: "1rem 0.5rem 0.25rem 0.5rem", fontWeight: 700 }}>
                      {item.section}
                    </div>
                  );
                }
                const Icon = item.icon!;
                return (
                  <button
                    key={idx}
                    onClick={() => handleNav(item.href!)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      width: "100%",
                      padding: "0.6rem 0.5rem",
                      color: currentPath === item.href ? "#EFA81A" : "#C5BEB5",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
