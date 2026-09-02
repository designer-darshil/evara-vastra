import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Order, OrderStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ShoppingBag, X, Eye } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminToolbar } from "../components/admin/ui/AdminToolbar";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminEmptyState } from "../components/admin/ui/AdminEmptyState";

export const AdminOrdersPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { orders, updateOrderStatus } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [statusModalOrder, setStatusModalOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>("Confirmed");
  const [statusNote, setStatusNote] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedStatus !== "all" && o.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [orders, searchQuery, selectedStatus]);

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const handleOpenStatusModal = (order: Order) => {
    setStatusModalOrder(order);
    setNewStatus(order.status);
    setStatusNote("");
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalOrder) return;
    updateOrderStatus(statusModalOrder.id, newStatus, statusNote);
    setStatusModalOrder(null);
  };

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
      case "Processing":
        return "info";
      case "Pending":
      case "Confirmed":
        return "warning";
      case "Cancelled":
      case "Returned":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Order Management"
        description="Fulfillment tracking, invoice history, and delivery lifecycles for patron orders."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Orders" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {orders.length} Total Orders
          </AdminBadge>
        }
      />

      {/* 2. Main Orders Card */}
      <AdminCard noPadding>
        {/* Toolbar: Search + Status */}
        <div className="p-4 sm:p-5 border-b border-neutral-200">
          <AdminToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search by order #, customer, email, or city..."
            filters={
              <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-10 px-3 bg-white border border-neutral-300 rounded-sm text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] min-h-[40px] flex-1 sm:flex-initial"
                >
                  <option value="all">All Statuses ({orders.length})</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            }
          />
        </div>

        {/* 3. Mobile View: Responsive Order Cards (< 768px) */}
        <div className="md:hidden divide-y divide-neutral-100">
          {filteredOrders.map((o) => (
            <div key={o.id} className="p-4 sm:p-5 space-y-3.5 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-serif font-bold text-neutral-900 text-sm block">
                    {o.orderNumber}
                  </span>
                  <span className="text-xs text-neutral-500 block mt-0.5">
                    {o.date} • {o.customerName}
                  </span>
                </div>
                <AdminBadge variant={getStatusBadgeVariant(o.status)} size="sm">
                  {o.status}
                </AdminBadge>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xs border border-neutral-100">
                <span>{o.items.length} {o.items.length === 1 ? "item" : "items"} ({o.city}, {o.state})</span>
                <span className="font-bold text-[#734E06] text-sm">{formatINR(o.total)}</span>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-neutral-500 uppercase">
                  {o.paymentMethod}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenStatusModal(o)}
                    className="h-9 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 transition-colors"
                  >
                    Update
                  </button>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate(`/admin/orders/${o.id}`)}
                      className="h-9 px-3 text-xs font-semibold bg-[#734E06] hover:bg-[#5a3c04] text-white rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <AdminEmptyState
              icon={<ShoppingBag className="w-8 h-8 text-neutral-400" />}
              title="No Orders Found"
              description="No orders match your search query or status filter."
            />
          )}
        </div>

        {/* 4. Desktop View: Proportional Data Table (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3.5 px-5">Order #</th>
                <th className="py-3.5 px-4">Customer & City</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-serif font-bold text-neutral-900 block">
                      {o.orderNumber}
                    </span>
                    <span className="text-xs text-neutral-500 block font-mono">
                      {o.items.length} {o.items.length === 1 ? "item" : "items"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-neutral-900 block">
                      {o.customerName}
                    </span>
                    <span className="text-xs text-neutral-500 block">
                      {o.city}, {o.state}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-neutral-600">
                    {o.date}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-neutral-900 block">
                      {formatINR(o.total)}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase">
                      {o.paymentMethod}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <AdminBadge variant={getStatusBadgeVariant(o.status)} size="sm">
                      {o.status}
                    </AdminBadge>
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenStatusModal(o)}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 transition-colors"
                      >
                        Status
                      </button>
                      {onNavigate && (
                        <button
                          onClick={() => onNavigate(`/admin/orders/${o.id}`)}
                          className="px-3 py-1.5 text-xs font-semibold bg-[#734E06] hover:bg-[#5a3c04] text-white rounded-sm transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <AdminEmptyState
                      icon={<ShoppingBag className="w-8 h-8 text-neutral-400" />}
                      title="No Orders Found"
                      description="No orders match your search query or status filter."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* 5. Update Status Modal */}
      {statusModalOrder && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-200"
          style={{ zIndex: 70 }}
          onClick={() => setStatusModalOrder(null)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
                Update Status • {statusModalOrder.orderNumber}
              </h3>
              <button
                onClick={() => setStatusModalOrder(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Fulfillment Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full h-11 px-3 bg-white border border-neutral-300 rounded-sm text-sm text-neutral-900 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06]"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Internal Timeline Note (Optional)
                </label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Package dispatched via Bluedart courier."
                  className="w-full min-h-[80px] p-3 bg-white border border-neutral-300 rounded-sm text-sm text-neutral-900 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStatusModalOrder(null)}
                  className="h-11 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
