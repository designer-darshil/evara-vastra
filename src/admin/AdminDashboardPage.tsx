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
  ShieldCheck,
} from "lucide-react";

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

  // Sales Trend Mock Points (Mon-Sun)
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
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand block mb-1">
            ATELIER OVERVIEW
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 m-0">
            Executive Commerce Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Welcome back, <strong>{adminUser?.name}</strong>. Here is the operational summary for Surat Atelier.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => onNavigate("/admin/products/new")}
            className="flex items-center gap-2 px-3.5 py-2 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
          <button
            onClick={() => onNavigate("/admin/inventory")}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-neutral-300 text-neutral-700 hover:border-brand hover:text-brand text-xs font-semibold rounded-sm transition-colors shadow-2xs"
          >
            <Warehouse className="w-4 h-4 text-brand" /> Stock Audit
          </button>
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-sm flex items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Atelier Demo Mode:</strong> Database seeded with authentic Surat sarees, live order records, and real-time state persistence.
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded-xs font-bold shrink-0">
          Sandboxed
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-4 sm:p-5 border border-neutral-200 rounded-sm shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Total Sales Volume
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif">
            {formatINR(totalRevenue)}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            +18.4% vs last period
          </span>
        </div>

        {/* Orders */}
        <div className="bg-white p-4 sm:p-5 border border-neutral-200 rounded-sm shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Total Orders
            </span>
            <ShoppingBag className="w-4 h-4 text-brand" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif">
            {totalOrders}
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">
            <strong className="text-brand">{pendingOrders}</strong> awaiting dispatch
          </span>
        </div>

        {/* Catalog Products */}
        <div className="bg-white p-4 sm:p-5 border border-neutral-200 rounded-sm shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Catalog Items
            </span>
            <Package className="w-4 h-4 text-neutral-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif">
            {publishedProducts}
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">
            {draftProducts} drafts • {totalProducts} total SKUs
          </span>
        </div>

        {/* Low Stock Alerts */}
        <div className={`p-4 sm:p-5 border rounded-sm shadow-xs bg-white ${
          lowStockProducts.length > 0 ? "border-amber-300" : "border-neutral-200"
        }`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Low Stock Alert
            </span>
            <AlertTriangle className={`w-4 h-4 ${lowStockProducts.length > 0 ? "text-amber-700" : "text-neutral-400"}`} />
          </div>
          <div className={`text-xl sm:text-2xl font-bold font-serif ${
            lowStockProducts.length > 0 ? "text-amber-700" : "text-neutral-900"
          }`}>
            {lowStockProducts.length}
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">
            SKUs with ≤ 3 units remaining
          </span>
        </div>
      </div>

      {/* Sales Trend Visual & Announcement Bar Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Revenue Visualizer (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 border border-neutral-200 rounded-sm shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 m-0">
                Weekly Revenue Velocity
              </h3>
              <p className="text-xs text-neutral-500 m-0 mt-0.5">
                Daily GMV sales trend across online prepaid & COD orders.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
              ₹6,78,500 7-Day Total
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-40 pt-6 border-b border-neutral-100">
            {weeklyTrends.map((item, i) => {
              const heightPercent = Math.round((item.sales / maxSales) * 100);
              return (
                <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.sales / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full max-w-[32px] bg-brand/85 hover:bg-brand rounded-t-xs transition-all"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[10px] font-bold text-neutral-600">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Announcement Bar Status (1 Col) */}
        <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                STOREFRONT NOTIFICATION
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase ${
                notificationBar.isEnabled
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-neutral-100 text-neutral-600"
              }`}>
                {notificationBar.isEnabled ? "Broadcasting" : "Disabled"}
              </span>
            </div>
            <p className="text-xs font-semibold text-neutral-900 leading-relaxed bg-neutral-50 p-3 rounded-sm border border-neutral-200">
              "{notificationBar.message}"
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500">
              Link: {notificationBar.link || "None"}
            </span>
            <button
              onClick={() => onNavigate("/admin/notifications")}
              className="text-xs text-brand hover:underline font-bold"
            >
              Configure →
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Recent Orders & Low Stock Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-sm shadow-xs">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
            <h3 className="text-sm font-bold text-neutral-900 m-0">
              Recent Orders Awaiting Action
            </h3>
            <button
              onClick={() => onNavigate("/admin/orders")}
              className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
            >
              View All Orders <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                  <th className="py-2.5 px-4">Order #</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Total</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-neutral-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-900 block">{order.customerName}</span>
                      <span className="text-[11px] text-neutral-500">{order.city}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-neutral-900 font-mono">
                      {formatINR(order.total)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : order.status === "Shipped"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onNavigate(`/admin/orders/${order.id}`)}
                        className="px-2.5 py-1 text-[11px] font-semibold border border-neutral-300 hover:border-brand hover:text-brand bg-white rounded-sm transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1-Col: Low Stock Alert & Quick Shortcuts */}
        <div className="space-y-4">
          {/* Low Stock Watch Panel */}
          <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider m-0">
                Low Inventory Watch
              </h3>
              <button
                onClick={() => onNavigate("/admin/inventory")}
                className="text-[11px] font-bold text-brand hover:underline"
              >
                Stock Room →
              </button>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-emerald-700 m-0 py-2">
                ✓ All published catalog sarees have healthy stock levels.
              </p>
            ) : (
              <div className="space-y-2">
                {lowStockProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 bg-neutral-50 border border-neutral-200 rounded-xs text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-semibold text-neutral-900 block truncate" title={p.title}>
                        {p.title}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">{p.sku}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-sm shrink-0">
                      {p.inventoryCount ?? p.inventory} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Hub Navigation */}
          <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 border-b border-neutral-100 pb-2">
              Management Modules
            </h3>
            <div className="flex flex-col gap-1 text-xs">
              <button
                onClick={() => onNavigate("/admin/products")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-brand rounded-xs transition-colors text-left"
              >
                <span>Product Catalog & Variants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate("/admin/coupons")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-brand rounded-xs transition-colors text-left"
              >
                <span>Privilege Coupons & Discounts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate("/admin/reviews")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-brand rounded-xs transition-colors text-left"
              >
                <span>Buyer Reviews Moderation ({pendingReviews} pending)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate("/admin/users")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-brand rounded-xs transition-colors text-left"
              >
                <span>Admin Users & Role Permissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate("/admin/audit-logs")}
                className="flex items-center justify-between p-2 text-neutral-700 hover:bg-neutral-50 hover:text-brand rounded-xs transition-colors text-left"
              >
                <span>System Mutation Audit Trail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
