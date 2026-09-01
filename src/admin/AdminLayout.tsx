import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { AdminRole } from "../types";
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
  Warehouse,
  History,
  UserCheck,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lock,
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
  const {
    adminUser,
    logoutAdmin,
    switchAdminRole,
    isAdminAuthenticated,
    notificationBar,
    products,
    reviews,
    orders,
    hasPermission,
  } = useData();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Authentication guard
  if (!isAdminAuthenticated || !adminUser) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-10 max-w-md w-full text-center shadow-2xl border border-neutral-200 rounded-sm">
          <div className="w-14 h-14 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2 font-serif">
            Authentication Required
          </h2>
          <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
            You must sign in with verified credentials to access the EVARA VASTRA Atelier administration suite.
          </p>
          <button
            onClick={() => onNavigate("/admin/login")}
            className="w-full py-3 bg-brand text-brand-foreground hover:bg-brand-hover text-sm font-semibold rounded-sm tracking-wider uppercase transition-colors"
          >
            Proceed to Secure Login
          </button>
        </div>
      </div>
    );
  }

  // Derive module permission key from path
  const getModuleKey = (path: string): string => {
    if (path === "/admin" || path === "/admin/") return "dashboard";
    if (path.startsWith("/admin/products")) return "products";
    if (path.startsWith("/admin/categories")) return "products";
    if (path.startsWith("/admin/collections")) return "products";
    if (path.startsWith("/admin/inventory")) return "inventory";
    if (path.startsWith("/admin/orders")) return "orders";
    if (path.startsWith("/admin/customers")) return "customers";
    if (path.startsWith("/admin/coupons")) return "coupons";
    if (path.startsWith("/admin/reviews")) return "reviews";
    if (path.startsWith("/admin/users")) return "users";
    if (path.startsWith("/admin/audit-logs")) return "audit_logs";
    if (path.startsWith("/admin/settings")) return "settings";
    if (path.startsWith("/admin/analytics")) return "analytics";
    return "content";
  };

  const currentModule = getModuleKey(currentPath);
  const isAuthorized = hasPermission(currentModule);

  const lowStockCount = products.filter(
    (p) => (p.inventoryCount ?? p.inventory ?? 0) <= 3 && p.status === "published"
  ).length;
  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;
  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;

  interface NavItem {
    label?: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeVariant?: "brand" | "amber" | "neutral";
    module?: string;
    section?: string;
  }

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, module: "dashboard" },
    
    { section: "CATALOG & INVENTORY" },
    { label: "Products", href: "/admin/products", icon: Package, module: "products" },
    { label: "Inventory & Stock", href: "/admin/inventory", icon: Warehouse, badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined, badgeVariant: "amber", module: "inventory" },
    { label: "Collections", href: "/admin/collections", icon: Layers, module: "products" },
    { label: "Categories", href: "/admin/categories", icon: FolderTree, module: "products" },
    
    { section: "COMMERCE & FULFILLMENT" },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : undefined, badgeVariant: "brand", module: "orders" },
    { label: "Customers", href: "/admin/customers", icon: Users, module: "customers" },
    { label: "Coupons & Discounts", href: "/admin/coupons", icon: Ticket, module: "coupons" },
    
    { section: "CONTENT & MARKETING" },
    { label: "Customer Reviews", href: "/admin/reviews", icon: Star, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined, badgeVariant: "amber", module: "reviews" },
    { label: "Homepage CMS", href: "/admin/content/homepage", icon: Sparkles, module: "content" },
    { label: "Notification Bar", href: "/admin/notifications", icon: Bell, badge: notificationBar.isEnabled ? "Active" : "Off", badgeVariant: notificationBar.isEnabled ? "brand" : "neutral", module: "content" },
    { label: "Shoppable Videos", href: "/admin/shoppable-videos", icon: Video, module: "content" },
    { label: "Craftsmanship Story", href: "/admin/craftsmanship", icon: BookOpen, module: "content" },
    { label: "FAQs & Help Center", href: "/admin/faqs", icon: HelpCircle, module: "content" },
    { label: "Media Library", href: "/admin/media", icon: Image, module: "content" },
    
    { section: "SYSTEM & SETTINGS" },
    { label: "Store Settings", href: "/admin/settings", icon: Settings, module: "settings" },
    { label: "Admin Users & RBAC", href: "/admin/users", icon: UserCheck, module: "users" },
    { label: "System Audit Logs", href: "/admin/audit-logs", icon: History, module: "audit_logs" },
    { label: "Analytics & Reports", href: "/admin/analytics", icon: BarChart3, module: "analytics" },
  ];

  const handleNav = (href: string) => {
    setIsMobileNavOpen(false);
    onNavigate(href);
  };

  const handleLogout = () => {
    logoutAdmin();
    onNavigate("/admin/login");
  };

  const roleLabelMap: Record<AdminRole, string> = {
    superadmin: "Super Admin",
    admin: "Store Admin",
    order_manager: "Order Manager",
    content_manager: "Content Lead",
  };

  const roleBadgeColors: Record<AdminRole, string> = {
    superadmin: "bg-amber-100 text-amber-900 border-amber-300",
    admin: "bg-blue-100 text-blue-900 border-blue-300",
    order_manager: "bg-emerald-100 text-emerald-900 border-emerald-300",
    content_manager: "bg-purple-100 text-purple-900 border-purple-300",
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFA] text-neutral-900 font-sans antialiased">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#141210] text-neutral-200 flex-col sticky top-0 h-screen z-30 border-r border-neutral-800 shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg font-bold tracking-widest text-white">
              EVARA VASTRA
            </span>
            <span className="text-[10px] tracking-wider uppercase bg-brand text-brand-foreground px-2 py-0.5 rounded-sm font-bold">
              ADMIN
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 block mt-1">
            Surat Atelier Commerce Suite
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {navItems.map((item, idx) => {
            if (item.section) {
              return (
                <div
                  key={idx}
                  className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 pt-4 pb-1.5 px-3"
                >
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = currentPath === item.href || (item.href !== "/admin" && currentPath.startsWith(item.href!));
            const isAllowed = item.module ? hasPermission(item.module) : true;

            return (
              <button
                key={idx}
                onClick={() => handleNav(item.href!)}
                disabled={!isAllowed}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-sm text-xs font-medium transition-colors text-left ${
                  !isAllowed
                    ? "opacity-30 cursor-not-allowed text-neutral-500"
                    : isActive
                    ? "bg-brand text-brand-foreground font-semibold shadow-sm"
                    : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-neutral-400"}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && isAllowed && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : item.badgeVariant === "amber"
                        ? "bg-amber-900/60 text-amber-300 border border-amber-700/50"
                        : item.badgeVariant === "brand"
                        ? "bg-brand/40 text-amber-200 border border-brand/60"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#0F0E0C] flex flex-col gap-2">
          <button
            onClick={() => onNavigate("/")}
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors p-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Public Storefront
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors p-1.5 text-left"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-neutral-200 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          {/* Left Title & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation"
              className="lg:hidden p-2 rounded-sm text-neutral-700 hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-neutral-900 m-0">
                {pageTitle || "Atelier Admin Control Suite"}
              </h1>
            </div>
          </div>

          {/* Right User & Live Store controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Role Switcher for Demo / Testing */}
            <div className="hidden md:flex items-center gap-2 text-xs bg-neutral-50 px-2.5 py-1.5 border border-neutral-200 rounded-sm">
              <span className="text-neutral-500">Role:</span>
              <select
                value={adminUser.role}
                onChange={(e) => switchAdminRole(e.target.value as AdminRole)}
                className="bg-transparent font-semibold text-neutral-900 border-none outline-none cursor-pointer text-xs"
                title="Switch active role for testing permissions"
              >
                <option value="superadmin">Super Admin</option>
                <option value="admin">Store Admin</option>
                <option value="order_manager">Order Manager</option>
                <option value="content_manager">Content Lead</option>
              </select>
            </div>

            {/* Live Store Button */}
            <button
              onClick={() => onNavigate("/")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-neutral-300 rounded-sm hover:border-neutral-400 text-neutral-700 bg-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Store
            </button>

            {/* Current User Badge */}
            <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-bold text-xs">
                {adminUser.name.charAt(0)}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-neutral-900 leading-tight">
                  {adminUser.name}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-sm border inline-block w-fit mt-0.5 ${roleBadgeColors[adminUser.role]}`}>
                  {roleLabelMap[adminUser.role]}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 min-w-0">
          {!isAuthorized ? (
            <div className="bg-white border border-red-200 p-8 text-center rounded-sm max-w-lg mx-auto my-12 shadow-sm">
              <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">
                Access Restricted
              </h3>
              <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                Your current role (<strong className="text-neutral-900">{roleLabelMap[adminUser.role]}</strong>) does not have permission to view or modify this module ({currentModule}).
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => onNavigate("/admin")}
                  className="px-4 py-2 bg-brand text-brand-foreground text-xs font-semibold rounded-sm hover:bg-brand-hover transition-colors"
                >
                  Return to Dashboard
                </button>
                <button
                  onClick={() => switchAdminRole("superadmin")}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Switch to Super Admin (Demo)
                </button>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 lg:hidden flex"
          onClick={() => setIsMobileNavOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-[#141210] text-neutral-200 flex flex-col p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-neutral-800">
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-white tracking-widest">
                  EVARA VASTRA
                </span>
                <span className="text-[10px] text-neutral-400">Atelier Suite</span>
              </div>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                aria-label="Close mobile navigation"
                className="p-2 text-neutral-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin">
              {navItems.map((item, idx) => {
                if (item.section) {
                  return (
                    <div
                      key={idx}
                      className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 pt-3 pb-1 px-3"
                    >
                      {item.section}
                    </div>
                  );
                }
                const Icon = item.icon!;
                const isActive = currentPath === item.href;
                const isAllowed = item.module ? hasPermission(item.module) : true;

                return (
                  <button
                    key={idx}
                    onClick={() => handleNav(item.href!)}
                    disabled={!isAllowed}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-sm text-xs transition-colors text-left min-h-[44px] ${
                      !isAllowed
                        ? "opacity-30 cursor-not-allowed text-neutral-500"
                        : isActive
                        ? "bg-brand text-brand-foreground font-semibold"
                        : "text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && isAllowed && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-neutral-800 rounded-full font-bold uppercase">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  onNavigate("/");
                }}
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white p-2 min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4" /> View Storefront
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 p-2 min-h-[44px]"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
