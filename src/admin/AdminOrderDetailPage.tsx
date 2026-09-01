import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { OrderStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Check,
  CheckCircle2,
  Save,
  User,
} from "lucide-react";

interface AdminOrderDetailPageProps {
  orderId: string;
  onNavigate?: (href: string) => void;
}

export const AdminOrderDetailPage: React.FC<AdminOrderDetailPageProps> = ({
  orderId,
  onNavigate,
}) => {
  const { orders, updateOrderStatus } = useData();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order?.status || "Confirmed");
  const [timelineNote, setTimelineNote] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  if (!order) {
    return (
      <div className="p-12 text-center bg-white border border-neutral-200 rounded-sm">
        <h3 className="text-base font-bold text-neutral-900 mb-2">Order Not Found</h3>
        {onNavigate && (
          <button
            onClick={() => onNavigate("/admin/orders")}
            className="px-4 py-2 bg-brand text-brand-foreground text-xs font-bold rounded-sm"
          >
            Return to Orders
          </button>
        )}
      </div>
    );
  }

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderStatus(order.id, selectedStatus, timelineNote);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Orders", href: "/admin/orders" },
              { label: order.orderNumber },
            ]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Order {order.orderNumber}
          </h1>
          <span className="text-xs text-neutral-500 block mt-0.5">
            Placed on {order.date} • Reference ID: {order.id}
          </span>
        </div>

        <span
          className={`text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider border self-start sm:self-auto ${
            order.status === "Delivered"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : order.status === "Shipped"
              ? "bg-blue-50 text-blue-800 border-blue-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          Status: {order.status}
        </span>
      </div>

      {isSavedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-sm text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          Order status updated successfully and recorded in audit log.
        </div>
      )}

      {/* Main 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Order Items & Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchased Line Items */}
          <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-900 m-0">
                Purchased Sarees & Ensembles ({order.items.length})
              </h3>
            </div>

            <div className="divide-y divide-neutral-100 p-4 space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 pt-3 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-18 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-neutral-900 text-xs truncate m-0" title={item.title}>
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      {item.fabric ? `${item.fabric} • ` : ""}Qty: {item.quantity}
                    </span>
                    {item.blouseOptIn && (
                      <span className="text-[10px] text-brand font-bold uppercase block mt-0.5">
                        ✓ Unstitched Blouse Piece Included
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-neutral-900 text-xs block">
                      {formatINR(item.price * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-neutral-400 font-mono block">
                        {formatINR(item.price)} each
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Totals */}
            <div className="bg-neutral-50/80 p-4 border-t border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal ({order.items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Coupon Discount</span>
                  <span className="font-mono">- {formatINR(order.discount)}</span>
                </div>
              )}
              {order.prepaidDiscount && order.prepaidDiscount > 0 ? (
                <div className="flex justify-between text-emerald-700">
                  <span>Prepaid Express Discount (10%)</span>
                  <span className="font-mono">- {formatINR(order.prepaidDiscount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-neutral-600">
                <span>Pan-India Insured Delivery</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Grand Total</span>
                <span className="font-mono text-brand">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline Audit Events */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs">
            <h3 className="text-sm font-bold text-neutral-900 mb-4 m-0">
              Fulfillment Journey & Event Timeline
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {order.timeline && order.timeline.length > 0 ? (
                order.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative z-10 text-xs">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                      event.completed
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-neutral-100 border-neutral-300 text-neutral-400"
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <strong className="text-neutral-900 block font-semibold">
                        {event.title}
                      </strong>
                      <span className="text-[11px] font-mono text-neutral-400 block">
                        {event.timestamp}
                      </span>
                      {event.note && (
                        <p className="text-[11px] text-neutral-600 bg-neutral-50 p-2 rounded-xs border border-neutral-200 mt-1 m-0">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-neutral-400 text-xs italic pl-8">
                  Order confirmed on {order.date}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Customer Details & Status Control */}
        <div className="space-y-6">
          {/* Status Update Form */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100">
              Fulfillment Action
            </h3>

            <form onSubmit={handleSaveStatus} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Order Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand outline-none font-semibold cursor-pointer"
                >
                  <option value="Pending">Pending (Awaiting Confirmation)</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing (Atelier Packing)</option>
                  <option value="Shipped">Shipped (In Transit)</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Waybill / Tracking Note
                </label>
                <input
                  type="text"
                  value={timelineNote}
                  onChange={(e) => setTimelineNote(e.target.value)}
                  placeholder="e.g. BlueDart AWB #98801920"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Update Order Status
              </button>
            </form>
          </div>

          {/* Customer Profile Card */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center gap-2">
              <User className="w-4 h-4 text-brand" /> Customer Information
            </h3>

            <div className="space-y-1">
              <strong className="text-neutral-900 text-sm block font-bold">
                {order.customerName}
              </strong>
              <span className="text-neutral-600 block">{order.customerEmail}</span>
              <span className="text-neutral-600 block">{order.customerPhone}</span>
            </div>

            <div className="pt-2 border-t border-neutral-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Shipping Destination
              </span>
              <p className="text-neutral-800 leading-relaxed m-0">
                {order.shippingAddress}
                <br />
                {order.city}, {order.state} - {order.pincode}
                <br />
                {order.country}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Payment Method
              </span>
              <p className="text-neutral-800 font-semibold m-0">
                {order.paymentMethod} ({order.paymentStatus})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
