import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { OrderStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Check,
  CheckCircle2,
  Save,
  User,
  Truck,
  RefreshCw,
  Printer,
} from "lucide-react";
import { Button } from "../components/ui/button";

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Items & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items Table Card */}
          <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900 m-0">
                Purchased Pieces ({order.items.length})
              </h3>
              <span className="text-xs text-neutral-500 font-mono">
                Total: {formatINR(order.total)}
              </span>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-xs border border-neutral-200"
                    />
                    <div>
                      <strong className="text-neutral-900 text-xs block font-bold">
                        {item.title}
                      </strong>
                      <span className="text-neutral-500 block text-[11px]">
                        Fabric: {item.fabric} {item.size ? `• Size: ${item.size}` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-neutral-900 font-bold block text-sm">
                      {formatINR(item.price * item.quantity)}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {formatINR(item.price)} × {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount:</span>
                  <span>- {formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping Fee:</span>
                <span className="text-emerald-700 font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Amount:</span>
                <span className="text-[#734E06]">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline / Progress */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100">
              Fulfillment Journey
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {order.timeline && order.timeline.length > 0 ? (
                order.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
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

        {/* Right 1 Col: Logistics & Customer Information */}
        <div className="space-y-6">
          {/* Status Update Form */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100">
              Internal Order Status
            </h3>

            <form onSubmit={handleSaveStatus} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Order State
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
                  Status Note / Memo
                </label>
                <input
                  type="text"
                  value={timelineNote}
                  onChange={(e) => setTimelineNote(e.target.value)}
                  placeholder="e.g. Quality inspection completed"
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

          {/* Shiprocket Logistics Card */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-900 m-0 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#734E06]" />
                Shiprocket Logistics
              </h3>
              {relatedShipment && (
                <span className="text-[10px] font-mono text-neutral-400">
                  ID: #{relatedShipment.providerOrderId || "—"}
                </span>
              )}
            </div>

            {relatedShipment ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Carrier:</span>
                  <strong className="text-neutral-900">{relatedShipment.courierName || "Pending Allocation"}</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">AWB Number:</span>
                  {relatedShipment.awb ? (
                    <span className="font-mono text-accent font-bold">{relatedShipment.awb}</span>
                  ) : (
                    <span className="text-neutral-400 italic">Not Assigned</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Shipment Status:</span>
                  <span className="font-bold px-2 py-0.5 rounded text-[10px] uppercase bg-neutral-100 text-neutral-800">
                    {relatedShipment.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
                  {relatedShipment.status === "CREATED" && (
                    <Button
                      size="sm"
                      disabled={isShipmentBusy}
                      onClick={async () => {
                        setIsShipmentBusy(true);
                        try {
                          await assignCourierAndAWB(relatedShipment.id);
                        } finally {
                          setIsShipmentBusy(false);
                        }
                      }}
                      className="w-full bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs h-8"
                    >
                      Assign Courier & Generate AWB
                    </Button>
                  )}

                  {relatedShipment.status === "AWB_ASSIGNED" && (
                    <Button
                      size="sm"
                      disabled={isShipmentBusy}
                      onClick={async () => {
                        setIsShipmentBusy(true);
                        try {
                          await requestPickup(relatedShipment.id);
                        } finally {
                          setIsShipmentBusy(false);
                        }
                      }}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs h-8"
                    >
                      Request Courier Pickup
                    </Button>
                  )}

                  {relatedShipment.awb && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isShipmentBusy}
                        onClick={async () => {
                          setIsShipmentBusy(true);
                          try {
                            await syncTracking(relatedShipment.id);
                          } finally {
                            setIsShipmentBusy(false);
                          }
                        }}
                        className="flex-1 text-xs h-8"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isShipmentBusy ? "animate-spin" : ""}`} />
                        Sync Tracking
                      </Button>

                      {relatedShipment.labelUrl && (
                        <a
                          href={relatedShipment.labelUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 rounded-sm text-xs font-semibold h-8"
                        >
                          <Printer className="w-3.5 h-3.5 mr-1" />
                          Label
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center py-2">
                <p className="text-neutral-500 m-0 text-xs">
                  No Shiprocket manifest currently active for this order.
                </p>
                <Button
                  size="sm"
                  disabled={isShipmentBusy}
                  onClick={async () => {
                    setIsShipmentBusy(true);
                    try {
                      await createShipmentForOrder(order);
                    } finally {
                      setIsShipmentBusy(false);
                    }
                  }}
                  className="w-full bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs h-8"
                >
                  <Truck className="w-3.5 h-3.5 mr-1.5" /> Create Shiprocket Shipment
                </Button>
              </div>
            )}
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
