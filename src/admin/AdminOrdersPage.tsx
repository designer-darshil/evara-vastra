import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Order, OrderStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Search,
  ShoppingBag,
  Edit2,
  X,
} from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Order Management" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Order Fulfillment & Transactions ({orders.length})
          </h1>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-neutral-200 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order #, customer, email, city..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-neutral-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-sm text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3 px-4">Order # & Date</th>
                <th className="py-3 px-4">Customer & City</th>
                <th className="py-3 px-4">Items / Qty</th>
                <th className="py-3 px-4">Total & Payment</th>
                <th className="py-3 px-4 text-center">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredOrders.map((order) => {
                const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);

                return (
                  <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-neutral-900 block">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {order.date}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-900 block">{order.customerName}</span>
                      <span className="text-[11px] text-neutral-500">{order.city}, {order.state}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-800 block">
                        {totalQty} item{totalQty > 1 ? "s" : ""}
                      </span>
                      <span className="text-[11px] text-neutral-500 truncate block max-w-xs" title={order.items.map(i => i.title).join(", ")}>
                        {order.items[0]?.title} {order.items.length > 1 ? `+${order.items.length - 1} more` : ""}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-neutral-900 block">
                        {formatINR(order.total)}
                      </span>
                      <span className="text-[10px] text-neutral-500 block">
                        {order.paymentMethod} • {order.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenStatusModal(order)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border cursor-pointer ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            : order.status === "Shipped"
                            ? "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
                            : order.status === "Cancelled" || order.status === "Returned"
                            ? "bg-red-50 text-red-800 border-red-200 hover:bg-red-100"
                            : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Click to shift order status"
                      >
                        {order.status}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onNavigate && (
                          <button
                            onClick={() => onNavigate(`/admin/orders/${order.id}`)}
                            className="px-2.5 py-1 text-xs font-semibold border border-neutral-300 hover:border-brand hover:text-brand bg-white rounded-sm transition-colors"
                          >
                            Details
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenStatusModal(order)}
                          className="p-1.5 text-neutral-600 hover:text-brand hover:bg-neutral-100 rounded-sm transition-colors"
                          title="Update Status"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    No orders match the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Shift Modal */}
      {statusModalOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-neutral-900 text-base m-0">
                  Update Order Status: {statusModalOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setStatusModalOrder(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Target Status Transition
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand outline-none font-semibold cursor-pointer"
                >
                  <option value="Pending">Pending (Awaiting Confirmation)</option>
                  <option value="Confirmed">Confirmed (Prepaid / COD Verified)</option>
                  <option value="Processing">Processing (Atelier Packing)</option>
                  <option value="Shipped">Shipped (Handed to Courier)</option>
                  <option value="Delivered">Delivered (Customer Handover Complete)</option>
                  <option value="Cancelled">Cancelled (Order Voided)</option>
                  <option value="Returned">Returned (Reverse Logistic Received)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Timeline Event Note / Waybill #
                </label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Dispatched via BlueDart AWB #99882201"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setStatusModalOrder(null)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-brand-foreground text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-hover transition-colors"
                >
                  Confirm Status Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
