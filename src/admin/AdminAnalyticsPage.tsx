import React from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { AlertCircle } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";

export const AdminAnalyticsPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { orders, products, categories, customers } = useData();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  // Group by payment method
  const paymentBreakdown = orders.reduce((acc: Record<string, number>, o) => {
    const key = o.paymentMethod.split("(")[0].trim();
    acc[key] = (acc[key] || 0) + o.total;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Store Performance & Intelligence"
        description="Transparent real-time commerce metrics computed directly from active database orders, items sold, and customer lifetime value."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Analytics & Intelligence" }]}
            onNavigate={onNavigate}
          />
        }
      />

      {/* Notice */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-sm flex items-center gap-3 text-xs sm:text-sm text-neutral-800">
        <AlertCircle className="w-5 h-5 text-[#734E06] shrink-0" />
        <span>
          <strong>Data Note:</strong> The figures below represent real transaction metrics computed directly from your active orders and catalog records.
        </span>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <AdminCard className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
            Total Store Revenue
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
            {formatINR(totalRevenue)}
          </div>
          <span className="text-xs text-emerald-700 font-semibold block mt-1">From {totalOrders} total completed orders</span>
        </AdminCard>

        <AdminCard className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
            Average Order Value (AOV)
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
            {formatINR(avgOrderValue)}
          </div>
          <span className="text-xs text-neutral-500 block mt-1">Per transaction basket</span>
        </AdminCard>

        <AdminCard className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
            Total Pieces Sold
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
            {totalItemsSold} units
          </div>
          <span className="text-xs text-neutral-500 block mt-1">Across all handloom fabrics</span>
        </AdminCard>

        <AdminCard className="p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
            Active Patrons
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
            {customers.length}
          </div>
          <span className="text-xs text-neutral-500 block mt-1">Client directory profiles</span>
        </AdminCard>
      </div>

      {/* 3. Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <AdminCard title="Payment Channel Distribution">
          <div className="space-y-3">
            {Object.entries(paymentBreakdown).map(([method, amount]) => {
              const percentage = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
              return (
                <div key={method} className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-neutral-900">{method}</span>
                    <span className="font-bold text-[#734E06]">{formatINR(amount)} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#734E06]" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title="Catalog Readiness Metrics">
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">Total Catalog Items:</span>
              <strong className="text-neutral-900">{products.length} SKUs</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">Active Taxonomies:</span>
              <strong className="text-neutral-900">{categories.length} Categories</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">Average Price Per Saree:</span>
              <strong className="text-neutral-900">
                {formatINR(products.length > 0 ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length) : 0)}
              </strong>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Total Stock Value:</span>
              <strong className="text-[#734E06]">
                {formatINR(products.reduce((s, p) => s + p.price * (p.inventoryCount ?? p.inventory ?? 0), 0))}
              </strong>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
};
