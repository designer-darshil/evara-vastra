import React, { useState } from "react";
import { useData } from "../context/DataContext";
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderTree,
  ShoppingBag,
  Users,
  FileText,
  Bell,
  Sparkles,
  Scissors,
  Ticket,
  Image,
  Settings,
  BarChart3,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (href: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const { adminUser, logoutAdmin, isAdminAuthenticated, notificationBar, products } = useData();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F4F1EA",
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
            className="btn-wine"
            style={{ width: "100%", padding: "0.9rem" }}
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const lowStockCount = products.filter((p) => p.inventoryCount <= 3 && p.status === "published").length;

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Collections", href: "/admin/collections", icon: Layers },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { section: "CONTENT & CMS" },
    { label: "Content Hub", href: "/admin/content", icon: FileText },
    { label: "Homepage CMS", href: "/admin/content/homepage", icon: LayoutDashboard },
    { label: "Notification Bar", href: "/admin/content/notification-bar", icon: Bell, badge: notificationBar.isEnabled ? "Active" : "Off" },
    { label: "Lookbook", href: "/admin/lookbook", icon: Sparkles },
    { label: "Craftsmanship", href: "/admin/content/craftsmanship", icon: Scissors },
    { label: "FAQ Manager", href: "/admin/content/faq", icon: FileText },
    { section: "COMMERCE & ASSETS" },
    { label: "Coupons & Promos", href: "/admin/coupons", icon: Ticket },
    { label: "Media Library", href: "/admin/media", icon: Image },
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
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Mobile Top Header */}
      <div
        className="admin-mobile-header"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          backgroundColor: "#171513",
          color: "#FFFFFF",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          zIndex: 99999,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            style={{ color: "#FFFFFF", background: "none", border: "none", padding: "0.25rem" }}
          >
            {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <strong style={{ letterSpacing: "0.1em", fontSize: "0.9rem" }}>EVARA VASTRA ADMIN</strong>
        </div>

        <button
          onClick={() => onNavigate("/")}
          style={{
            fontSize: "0.75rem",
            color: "#B18A52",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <span>Store</span> <ExternalLink size={12} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#171513",
          color: "#E2DDD5",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          zIndex: 9999,
          flexShrink: 0,
        }}
        className={`admin-sidebar ${isMobileNavOpen ? "open" : ""}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "1.5rem 1.25rem 1.25rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#B18A52",
              display: "block",
              fontWeight: 700,
            }}
          >
            MANAGEMENT SUITE
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: "1.35rem",
              color: "#F8F4EE",
              letterSpacing: "0.04em",
              margin: "0.2rem 0 0.5rem 0",
            }}
          >
            EVARA VASTRA
          </h2>
          <button
            onClick={() => onNavigate("/")}
            style={{
              fontSize: "0.72rem",
              color: "#A4998E",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.3rem 0.6rem",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            <span>View Storefront</span>
            <ExternalLink size={11} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.2rem", flex: 1 }}>
          {navItems.map((item, idx) => {
            if ("section" in item) {
              return (
                <span
                  key={idx}
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "#83776C",
                    padding: "0.85rem 0.75rem 0.35rem 0.75rem",
                  }}
                >
                  {item.section}
                </span>
              );
            }

            const Icon = item.icon!;
            const isActive = currentPath === item.href || (item.href !== "/admin" && currentPath.startsWith(item.href!));

            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href!)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.825rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#FFFFFF" : "#B8ADA2",
                  backgroundColor: isActive ? "#7C2430" : "transparent",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Icon size={16} style={{ color: isActive ? "#FFFFFF" : "#9A8F83" }} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.45rem",
                      backgroundColor: item.badge === "Active" ? "rgba(35,78,62,0.6)" : "rgba(255,255,255,0.15)",
                      color: item.badge === "Active" ? "#A5D6A7" : "#FFFFFF",
                      borderRadius: "2px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#7C2430",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {adminUser?.name ? adminUser.name[0] : "A"}
            </div>
            <div>
              <strong style={{ fontSize: "0.78rem", color: "#F8F4EE", display: "block", lineHeight: 1.2 }}>
                {adminUser?.name || "Admin"}
              </strong>
              <span style={{ fontSize: "0.65rem", color: "#8E8276" }}>
                {adminUser?.role || "Administrator"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: "none",
              border: "none",
              color: "#9A8F83",
              cursor: "pointer",
              padding: "0.4rem",
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          padding: "2rem",
        }}
        className="admin-main-content"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .admin-mobile-header {
            display: flex !important;
          }
          .admin-sidebar {
            position: fixed !important;
            top: 60px !important;
            bottom: 0 !important;
            left: -280px !important;
            height: calc(100vh - 60px) !important;
            transition: left 0.3s ease !important;
          }
          .admin-sidebar.open {
            left: 0 !important;
          }
          .admin-main-content {
            padding: 5rem 1rem 2rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
