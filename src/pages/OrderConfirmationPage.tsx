import React from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { CheckCircle2, ShoppingBag, Truck, Lock, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

interface OrderConfirmationPageProps {
  orderId?: string;
  onNavigate?: (href: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderId,
  onNavigate,
}) => {
  const { orders } = useData();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  const order = orders.find(
    (o) =>
      o.id === orderId ||
      o.orderNumber === orderId ||
      o.shiprocketOrderId === orderId ||
      (orderId && o.paymentId === orderId)
  );

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div className="bg-background min-h-[85dvh] py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Order Confirmation" }]} onNavigate={handleNav} />

        <div className="bg-white border border-neutral-200 p-8 sm:p-10 rounded-sm shadow-sm space-y-8 text-center mt-6">
          {/* Header Banner */}
          <div className="space-y-3">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#734E06] block mb-1">
                TRANSACTION AUTHORIZED & CONFIRMED
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 m-0">
                Thank You for Your Order
              </h1>
              <p className="text-sm text-neutral-600 mt-2">
                Order <strong className="font-mono text-neutral-900">{order ? order.orderNumber : orderId}</strong> has
                been accepted by the atelier.
              </p>
            </div>
          </div>

          {order ? (
            <div className="space-y-6 text-left text-xs">
              {/* Status and Verification Box */}
              <div className="bg-neutral-50 p-5 rounded-sm border border-neutral-200 space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-200 pb-2.5">
                  <span className="text-neutral-500 font-medium">Payment Status:</span>
                  <span className="font-bold text-emerald-800 uppercase flex items-center gap-1">
                    ✓ {order.paymentStatus}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-neutral-200 pb-2.5">
                  <span className="text-neutral-500 font-medium">Checkout Engine:</span>
                  <span className="font-semibold text-neutral-900">
                    {order.checkoutProvider || "Shiprocket / Fastrr Checkout"}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-neutral-200 pb-2.5">
                  <span className="text-neutral-500 font-medium">Payment Method:</span>
                  <span className="font-bold text-neutral-900">{order.paymentMethod}</span>
                </div>

                {order.shiprocketOrderId && (
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-2.5">
                    <span className="text-neutral-500 font-medium">Shiprocket Reference:</span>
                    <span className="font-mono text-neutral-900 font-bold">{order.shiprocketOrderId}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-medium">Order Date:</span>
                  <span className="text-neutral-900 font-semibold">{order.date}</span>
                </div>
              </div>

              {/* Items Purchased */}
              <div className="border border-neutral-200 rounded-sm p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Purchased Pieces ({order.items.length})
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">Surat Atelier Dispatch</span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-16 object-cover rounded-xs border border-neutral-200 bg-neutral-100 shrink-0"
                        />
                        <div>
                          <strong className="text-neutral-900 block font-semibold text-xs truncate max-w-[240px] sm:max-w-md">
                            {item.title}
                          </strong>
                          <span className="text-neutral-500 text-[11px] block mt-0.5">
                            Qty: {item.quantity} {item.fabric ? `• ${item.fabric}` : ""} {item.size ? `• ${item.size}` : ""}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-900 shrink-0">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Destination & Courier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-neutral-200 rounded-sm p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#734E06]" /> Delivery Destination
                  </div>
                  <p className="text-neutral-700 leading-relaxed m-0 text-xs">
                    <strong>{order.customerName}</strong>
                    <br />
                    {order.shippingAddress}
                    <br />
                    {order.city}, {order.state} - {order.pincode}
                    <br />
                    {order.country}
                  </p>
                </div>

                <div className="border border-neutral-200 rounded-sm p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                    <Truck className="w-3.5 h-3.5 text-[#734E06]" /> Courier & Shipping
                  </div>
                  <p className="text-neutral-700 leading-relaxed m-0 text-xs">
                    <strong>Carrier:</strong> {order.carrier || "Blue Dart Express Air"}
                    <br />
                    <strong>Logistics:</strong> Shiprocket Dispatch Network
                    <br />
                    <strong>Tracking Ref:</strong>{" "}
                    <span className="font-mono text-[#734E06] font-bold">
                      {order.trackingNumber || "Assigned upon dispatch"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="border-t border-neutral-200 pt-4 space-y-2 text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-neutral-900 font-semibold">{formatINR(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Insured Express Shipping:</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 border-t border-neutral-200 pt-3 mt-2">
                  <span>Grand Total Paid:</span>
                  <span className="text-[#734E06] text-lg">{formatINR(order.total)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-neutral-50 rounded-sm border border-neutral-200 text-xs text-neutral-600 space-y-2">
              <p className="m-0">
                Your order reference is <strong className="font-mono text-neutral-900">{orderId}</strong>.
              </p>
              <p className="m-0 text-neutral-500">
                Confirmation email and tracking updates have been dispatched to your patron profile.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={() => handleNav("/account/orders")}
              className="flex-1 h-12 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5"
            >
              Track in My Orders <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleNav("/shop")}
              className="flex-1 h-12 border-neutral-300 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-sm"
            >
              Continue Browsing
            </Button>
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              Insured & Protected by Evara Vastra Atelier • Surat, Gujarat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

