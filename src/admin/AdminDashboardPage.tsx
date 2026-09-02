import React from "react";
import { useData } from "../context/DataContext";
import {
  Package,
  ShoppingBag,
  AlertTriangle,
  TrendingUp,
  Plus,
  ArrowRight,
  Warehouse,
} from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";

export const AdminDashboardPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { products, orders, reviews, notificationBar, adminUser } = useData();

  // Metrics calculations
  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.status === "published").length;
  const draftProducts = products.filter((p) => p.status === "draft").length;
  const lowStockProducts = products.filter(
    (p) => (p.inventoryCount ?? p.inventory ?? 0) <= 3 && p.status === "published"
  );
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Confirmed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  // Sales Trend Data
  const weeklyTrends = [
    { day: "Mon", sales: 48500, orders: 4 },
    { day: "Tue", sales: 62000, orders: 6 },
    { day: "Wed", sales: 89000, orders: 8 },
    { day: "Thu", sales: 54000, orders: 5 },
    { day: "Fri", sales: 112000, orders: 11 },
    { day: "Sat", sales: 145000, orders: 14 },
    { day: "Sun", sales: 168000, orders: 16 },
  ];
  const maxSales = Math.max(...weeklyTrends.map((t) => t.sales));

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Commerce Overview"
        description={`Welcome back, ${adminUser?.name || "Administrator"}. Here is the real-time operational summary for EVARA VASTRA Surat Atelier.`}
        actions={
          <>
            <button
              onClick={() => onNavigate("/admin/inventory")}
              className="flex items-center gap-2 h-10 px-3.5 sm:px-4 bg-white border border-neutral-300 text-neutral-800 hover:border-[#734E06] hover:text-[#734E06] text-xs font-semibold rounded-sm transition-colors shadow-2xs min-h-[40px]"
            >
              <Warehouse className="w-4 h-4 text-[#734E06]" /> Stock Audit
            </button>
            <button
              onClick={() => onNavigate("/admin/products/new")}
              className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </>
        }
      />

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {/* Total Sales */}
        <AdminCard className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Total Sales Volume
            </span>
            <div className="p-2 rounded-full bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif tracking-tight">
            {formatINR(totalRevenue)}
          </div>
          <span className="text-xs text-emerald-700 font-semibold block mt-1.5">
            +18.4% vs previous 30 days
          </span>
        </AdminCard>

        {/* Total Orders */}
        <AdminCard className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Total Patron Orders
            </span>
            <div className="p-2 rounded-full bg-[#734E06]/10 text-[#734E06]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif tracking-tight">
            {totalOrders}
          </div>
          <span className="text-xs text-neutral-500 block mt-1.5">
            <strong className="text-[#734E06] font-bold">{pendingOrders}</strong> awaiting dispatch
          </span>
        </AdminCard>

        {/* Catalog Items */}
        <AdminCard className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Published Catalog
            </span>
            <div className="p-2 rounded-full bg-neutral-100 text-neutral-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif tracking-tight">
            {publishedProducts}
          </div>
          <span className="text-xs text-neutral-500 block mt-1.5">
            {draftProducts} drafts • {totalProducts} total SKUs
          </span>
        </AdminCard>

        {/* Low Stock Alerts */}
        <AdminCard className={`p-5 ${lowStockProducts.length > 0 ? "border-amber-300" : ""}`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Low Stock Watch
            </span>
            <div className={`p-2 rounded-full ${lowStockProducts.length > 0 ? "bg-amber-100 text-amber-800" : "bg-neutral-100 text-neutral-400"}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl sm:text-3xl font-bold font-serif tracking-tight ${lowStockProducts.length > 0 ? "text-amber-800" : "text-neutral-900"}`}>
            {lowStockProducts.length}
          </div>
          <span className="text-xs text-neutral-500 block mt-1.5">
            SKUs with ≤ 3 units remaining
          </span>
        </AdminCard>
      </div>

      {/* 3. Sales Trend Visualizer & Announcement Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Weekly Revenue Visualizer (2 Cols) */}
        <AdminCard
          title="Weekly Revenue Velocity"
          subtitle="Daily gross sales across prepaid UPI, Cards, and COD transactions."
          action={
            <AdminBadge variant="success" size="sm">
              ₹6,78,500 7-Day Total
            </AdminBadge>
          }
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pt-6 border-b border-neutral-100">
            {weeklyTrends.map((item, i) => {
              const heightPercent = Math.round((item.sales / maxSales) * 100);
              return (
                <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-xs font-mono text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.sales / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full max-w-[36px] bg-[#734E06]/85 hover:bg-[#734E06] rounded-t-xs transition-all"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs font-bold text-neutral-700">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </AdminCard>

        {/* Live Announcement Bar Status (1 Col) */}
        <AdminCard
          title="Storefront Broadcast"
          subtitle="Top banner announcement displayed to all visitors."
          action={
            <AdminBadge variant={notificationBar.isEnabled ? "success" : "neutral"} size="sm">
              {notificationBar.isEnabled ? "Live Broadcast" : "Disabled"}
            </AdminBadge>
          }
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-medium text-neutral-900 leading-relaxed bg-neutral-50 p-3.5 rounded-xs border border-neutral-200 m-0">
              "{notificationBar.message}"
            </p>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
              <span>Link: {notificationBar.link || "None"}</span>
              <button
                onClick={() => onNavigate("/admin/notifications")}
                className="text-xs text-[#734E06] hover:underline font-bold"
              >
                Configure Broadcast →
              </button>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* 4. Recent Orders Table & Quick Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Left 2-Cols: Recent Orders */}
        <AdminCard
          title="Recent Orders Awaiting Action"
          action={
            <button
              onClick={() => onNavigate("/admin/orders")}
              className="text-xs font-bold text-[#734E06] hover:underline flex items-center gap-1"
            >
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          noPadding
          className="lg:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                  <th className="py-3 px-5">Order #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3 px-5 font-serif font-bold text-neutral-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-900 block">{order.customerName}</span>
                      <span className="text-xs text-neutral-500">{order.city}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-neutral-900">
                      {formatINR(order.total)}
                    </td>
                    <td className="py-3 px-4">
                      <AdminBadge
                        variant={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "info" : "warning"}
                        size="sm"
                      >
                        {order.status}
                      </AdminBadge>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        onClick={() => onNavigate(`/admin/orders/${order.id}`)}
                        className="px-3 py-1 text-xs font-semibold border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] bg-white rounded-sm transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>

        {/* Right 1-Col: Management Modules & Shortcuts */}
        <div className="space-y-5">
          {/* Low Stock Watch Panel */}
          <AdminCard
            title="Low Inventory Items"
            action={
              <button
                onClick={() => onNavigate("/admin/inventory")}
                className="text-xs font-bold text-[#734E06] hover:underline"
              >
                Stock Room →
              </button>
            }
          >
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-emerald-700 m-0">
                ✓ All published catalog items have healthy inventory stock.
              </p>
            ) : (
              <div className="space-y-2.5">
                {lowStockProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 bg-neutral-50 border border-neutral-200 rounded-xs text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-semibold text-neutral-900 block truncate" title={p.title}>
                        {p.title}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono">{p.sku}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-xs shrink-0">
                      {p.inventoryCount ?? p.inventory} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>

          {/* Quick Hub Navigation */}
          <AdminCard title="Executive Quick Links">
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <button
                onClick={() => onNavigate("/admin/products")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-[#734E06] rounded-xs transition-colors text-left font-medium"
              >
                <span>Product Catalog & Variants</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("/admin/coupons")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-[#734E06] rounded-xs transition-colors text-left font-medium"
              >
                <span>Privilege Coupons & Discounts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("/admin/reviews")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-[#734E06] rounded-xs transition-colors text-left font-medium"
              >
                <span>Buyer Reviews ({pendingReviews} pending)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("/admin/users")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-[#734E06] rounded-xs transition-colors text-left font-medium"
              >
                <span>Admin Users & Role Permissions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("/admin/audit-logs")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-[#734E06] rounded-xs transition-colors text-left font-medium"
              >
                <span>Mutation Audit Trail</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
};
