import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { OrderStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Check,
  CheckCircle2,
  Save,
  Truck,
  RefreshCw,
  Printer,
} from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";

interface AdminOrderDetailPageProps {
  orderId: string;
  onNavigate?: (href: string) => void;
}

export const AdminOrderDetailPage: React.FC<AdminOrderDetailPageProps> = ({
  orderId,
  onNavigate,
}) => {
  const {
    orders,
    updateOrderStatus,
    shipments,
    assignCourierAndAWB,
    requestPickup,
    syncTracking,
    createShipmentForOrder,
  } = useData();

  const order = orders.find((o) => o.id === orderId) || orders[0];
  const relatedShipment = shipments.find((s) => s.orderId === order?.id);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order?.status || "Confirmed");
  const [timelineNote, setTimelineNote] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isShipmentBusy, setIsShipmentBusy] = useState(false);

  if (!order) {
    return (
      <div className="p-12 text-center bg-white border border-neutral-200 rounded-sm">
        <h3 className="text-base font-bold text-neutral-900 mb-2">Order Not Found</h3>
        {onNavigate && (
          <button
            onClick={() => onNavigate("/admin/orders")}
            className="px-4 py-2 bg-[#734E06] text-white text-xs font-bold rounded-sm"
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Page Header */}
      <AdminPageHeader
        title={`Order ${order.orderNumber}`}
        description={`Placed on ${order.date} • Reference ID: ${order.id}`}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Orders", href: "/admin/orders" },
              { label: order.orderNumber },
            ]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant={getStatusBadgeVariant(order.status)} size="md">
            Status: {order.status}
          </AdminBadge>
        }
      />

      {isSavedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-sm text-sm font-semibold flex items-center gap-2.5">
          <Check className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Order status updated successfully and recorded in audit log.</span>
        </div>
      )}

      {/* 2. Main Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Purchased Items & Fulfillment History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchased Items Card */}
          <AdminCard
            title={`Purchased Pieces (${order.items.length})`}
            subtitle={`Total: ${formatINR(order.total)}`}
            noPadding
          >
            <div className="divide-y divide-neutral-100 text-sm">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 object-cover rounded-xs border border-neutral-200 bg-neutral-100 shrink-0"
                    />
                    <div>
                      <strong className="text-neutral-900 text-sm block font-bold">
                        {item.title}
                      </strong>
                      <span className="text-neutral-500 block text-xs mt-0.5">
                        Fabric: {item.fabric} {item.size ? `• Size: ${item.size}` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-neutral-900 font-bold block text-sm sm:text-base">
                      {formatINR(item.price * item.quantity)}
                    </span>
                    <span className="text-xs text-neutral-400 block mt-0.5">
                      {formatINR(item.price)} × {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-100 text-xs sm:text-sm space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Discount:</span>
                  <span>- {formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping Fee:</span>
                <span className="text-emerald-700 font-semibold">Complimentary Express</span>
              </div>
              <div className="flex justify-between text-base font-bold text-neutral-900 pt-2.5 border-t border-neutral-200">
                <span>Total Amount:</span>
                <span className="text-[#734E06]">{formatINR(order.total)}</span>
              </div>
            </div>
          </AdminCard>

          {/* Fulfillment Timeline */}
          <AdminCard title="Fulfillment Journey & Milestone Audit">
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {order.timeline && order.timeline.length > 0 ? (
                order.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border absolute -left-[30px] top-0 ${
                      event.completed
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-neutral-100 border-neutral-300 text-neutral-400"
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <strong className="text-neutral-900 block font-semibold text-sm">
                        {event.title}
                      </strong>
                      <span className="text-xs font-mono text-neutral-400 block mt-0.5">
                        {event.timestamp}
                      </span>
                      {event.note && (
                        <p className="text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-xs border border-neutral-200 mt-1.5 m-0 leading-relaxed">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-neutral-400 text-sm italic">
                  Order confirmed on {order.date}
                </div>
              )}
            </div>
          </AdminCard>
        </div>

        {/* Right 1 Col: Status Update, Shiprocket, Customer Info */}
        <div className="space-y-6">
          {/* Status Update Form */}
          <AdminCard title="Internal Order Status">
            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Order State
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                  className="w-full h-11 px-3 bg-white border border-neutral-300 text-neutral-900 text-sm rounded-sm focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] outline-none font-semibold cursor-pointer"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Status Note / Memo
                </label>
                <input
                  type="text"
                  value={timelineNote}
                  onChange={(e) => setTimelineNote(e.target.value)}
                  placeholder="e.g. Quality inspection completed"
                  className="w-full h-11 px-3 bg-white border border-neutral-300 text-neutral-900 text-sm rounded-sm focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Update Status
              </button>
            </form>
          </AdminCard>

          {/* Shiprocket Logistics Card */}
          <AdminCard
            title="Shiprocket Logistics"
            subtitle={relatedShipment ? `ID: #${relatedShipment.providerOrderId || "—"}` : undefined}
          >
            {relatedShipment ? (
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Carrier:</span>
                  <strong className="text-neutral-900">{relatedShipment.courierName || "Pending Allocation"}</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">AWB Number:</span>
                  {relatedShipment.awb ? (
                    <span className="font-mono text-[#734E06] font-bold">{relatedShipment.awb}</span>
                  ) : (
                    <span className="text-neutral-400 italic">Not Assigned</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Shipment Status:</span>
                  <AdminBadge variant="neutral" size="sm">
                    {relatedShipment.status}
                  </AdminBadge>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
                  {relatedShipment.status === "CREATED" && (
                    <button
                      disabled={isShipmentBusy}
                      onClick={async () => {
                        setIsShipmentBusy(true);
                        try {
                          await assignCourierAndAWB(relatedShipment.id);
                        } finally {
                          setIsShipmentBusy(false);
                        }
                      }}
                      className="w-full h-10 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                    >
                      Assign Courier & Generate AWB
                    </button>
                  )}

                  {relatedShipment.status === "AWB_ASSIGNED" && (
                    <button
                      disabled={isShipmentBusy}
                      onClick={async () => {
                        setIsShipmentBusy(true);
                        try {
                          await requestPickup(relatedShipment.id);
                        } finally {
                          setIsShipmentBusy(false);
                        }
                      }}
                      className="w-full h-10 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                    >
                      Request Courier Pickup
                    </button>
                  )}

                  {relatedShipment.awb && (
                    <div className="flex gap-2.5">
                      <button
                        disabled={isShipmentBusy}
                        onClick={async () => {
                          setIsShipmentBusy(true);
                          try {
                            await syncTracking(relatedShipment.id);
                          } finally {
                            setIsShipmentBusy(false);
                          }
                        }}
                        className="flex-1 h-10 border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 rounded-sm text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isShipmentBusy ? "animate-spin" : ""}`} />
                        Sync Tracking
                      </button>

                      {relatedShipment.labelUrl && (
                        <a
                          href={relatedShipment.labelUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 h-10 inline-flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 rounded-sm text-xs font-semibold gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          Label
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center py-2 text-xs">
                <p className="text-neutral-500 m-0">
                  No Shiprocket manifest currently active for this order.
                </p>
                <button
                  disabled={isShipmentBusy}
                  onClick={async () => {
                    setIsShipmentBusy(true);
                    try {
                      await createShipmentForOrder(order);
                    } finally {
                      setIsShipmentBusy(false);
                    }
                  }}
                  className="w-full h-10 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Create Shiprocket Shipment
                </button>
              </div>
            )}
          </AdminCard>

          {/* Customer Profile Card */}
          <AdminCard title="Customer & Destination Profile">
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <strong className="text-neutral-900 text-sm sm:text-base block font-bold">
                  {order.customerName}
                </strong>
                <span className="text-neutral-600 block mt-0.5">{order.customerEmail}</span>
                <span className="text-neutral-600 block">{order.customerPhone}</span>
              </div>

              <div className="pt-2.5 border-t border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
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

              <div className="pt-2.5 border-t border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Payment Method
                </span>
                <p className="text-neutral-800 font-semibold m-0">
                  {order.paymentMethod} ({order.paymentStatus})
                </p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
};
