import React, { useState } from "react";
import { useShop, CartItem } from "../context/ShopContext";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Smartphone,
  Building,
  Truck,
  Lock,
  Loader2,
  AlertCircle,
  X,
  Zap,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { paymentProvider } from "../lib/payment";

export const CheckoutPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { cart, cartSubtotal, clearCart, showToast } = useShop();
  const { addOrder, siteSettings } = useData();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  // Form State
  const [formData, setFormData] = useState({
    firstName: "Devika",
    lastName: "Srinivasan",
    email: "devika.s@example.com",
    phone: "+91 98201 44520",
    address: "Bungalow 4, Pali Hill Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    country: "India",
    shippingMethod: "standard",
    paymentMethod: "fastrr_upi",
  });

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isFastrrModalOpen, setIsFastrrModalOpen] = useState(false);
  const [activeIntent, setActiveIntent] = useState<any | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const shippingCost = formData.shippingMethod === "express" ? 450 : 0;
  const grandTotal = cartSubtotal + shippingCost;

  // 1. Initial Order & Payment Intent Creation
  const handleInitiateFastrrCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.address || !formData.pincode || !formData.phone) {
      showToast("Please fill in required contact and delivery details.", "info");
      return;
    }

    setPaymentError(null);
    setIsProcessingPayment(true);

    try {
      const orderId = `EV-${Math.floor(100000 + Math.random() * 900000)}`;

      // If user selected Cash on Delivery and COD is enabled in store settings
      if (formData.paymentMethod === "cod") {
        if (!siteSettings.codAvailable) {
          throw new Error("Cash on Delivery is currently disabled in store configuration.");
        }
        finalizeOrder({
          orderId,
          paymentId: `cod_${Date.now()}`,
          paymentStatus: "Cash on Delivery",
          paymentMethodLabel: "Cash on Delivery (Pay upon Doorstep Arrival)",
        });
        return;
      }

      // Initialize fastrr Checkout Intent
      const intent = await paymentProvider.createPaymentIntent({
        orderId,
        amount: grandTotal,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        items: cart.map((i) => ({
          id: i.product.id,
          name: i.product.title,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.images[0],
        })),
        paymentMethod: formData.paymentMethod,
      });

      setActiveIntent(intent);
      setIsFastrrModalOpen(true);
    } catch (err: any) {
      setPaymentError(err?.message || "Failed to initialize payment gateway. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // 2. Fastrr Modal Payment Execution & Verification
  const handleExecutePayment = async (selectedMethod: string) => {
    if (!activeIntent) return;
    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // Simulate fastrr payment processing
      const paymentId = `pay_fastrr_${Date.now()}`;
      const verification = await paymentProvider.verifyPayment({
        orderId: activeIntent.orderId,
        paymentId,
      });

      if (!verification.success) {
        throw new Error(verification.error || "Payment was declined by the bank or gateway timeout.");
      }

      const methodLabel =
        selectedMethod === "fastrr_upi"
          ? "Instant UPI via Fastrr (PhonePe / GPay)"
          : selectedMethod === "fastrr_card"
          ? "Credit/Debit Card via Fastrr"
          : "Net Banking via Fastrr";

      setIsFastrrModalOpen(false);
      finalizeOrder({
        orderId: activeIntent.orderId,
        paymentId: verification.paymentId || paymentId,
        paymentStatus: "Paid",
        paymentMethodLabel: methodLabel,
      });
    } catch (err: any) {
      setPaymentError(err?.message || "Payment could not be completed.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // 3. Finalize and Save Order to DataContext
  const finalizeOrder = (details: {
    orderId: string;
    paymentId: string;
    paymentStatus: "Pending" | "Paid" | "Cash on Delivery" | "Refunded";
    paymentMethodLabel: string;
  }) => {
    const orderItems = cart.map((item) => ({
      id: item.product.id,
      slug: item.product.slug,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0],
      fabric: item.product.fabric,
      size: item.selectedSize,
    }));

    const createdOrder = addOrder({
      status: "Confirmed",
      subtotal: cartSubtotal,
      shippingFee: shippingCost,
      discount: 0,
      total: grandTotal,
      paymentMethod: details.paymentMethodLabel,
      paymentStatus: details.paymentStatus,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
      trackingNumber: `FSTR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: "Blue Dart Express Insured Air",
      items: orderItems,
    });

    setConfirmedOrder(createdOrder);
    clearCart();
    showToast(`Payment verified! Order ${createdOrder.orderNumber} confirmed.`, "info");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-background min-h-[85vh] py-8 sm:py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Cart", href: "/cart" }, { label: "Checkout & Payment" }]}
          onNavigate={handleNav}
        />

        {/* Order Confirmation Screen */}
        {confirmedOrder ? (
          <div className="max-w-2xl mx-auto bg-white border border-neutral-200 p-8 sm:p-10 rounded-sm shadow-sm space-y-6 text-center mt-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#734E06] block mb-1">
                TRANSACTION VERIFIED & CONFIRMED
              </span>
              <h2 className="font-serif text-3xl font-bold text-neutral-900 m-0">
                Thank You, {confirmedOrder.customerName}!
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Your order <strong>{confirmedOrder.orderNumber}</strong> has been received by the atelier.
              </p>
            </div>

            <div className="bg-neutral-50 p-5 rounded-sm border border-neutral-200 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500 font-medium">Payment Status:</span>
                <span className="font-bold text-emerald-800 uppercase">
                  ✓ {confirmedOrder.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500 font-medium">Payment Method:</span>
                <span className="font-bold text-neutral-900">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500 font-medium">Total Paid:</span>
                <strong className="text-sm font-bold text-[#734E06]">
                  {formatINR(confirmedOrder.total)}
                </strong>
              </div>
              <div className="pt-1">
                <span className="text-neutral-500 font-medium block mb-1">Delivery Destination:</span>
                <p className="text-neutral-800 m-0 leading-relaxed font-semibold">
                  {confirmedOrder.shippingAddress}, {confirmedOrder.city}, {confirmedOrder.state} - {confirmedOrder.pincode}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={() => handleNav("/account/orders")}
                className="flex-1 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider h-11"
              >
                Track In My Orders <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleNav("/shop")}
                className="flex-1 text-xs font-bold uppercase tracking-wider h-11"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-20 bg-white border border-neutral-200 rounded-sm p-8 max-w-lg mx-auto shadow-xs">
            <h2 className="font-serif text-2xl font-bold mb-2">Your Bag is Empty</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Please select pieces from our catalog before proceeding to checkout.
            </p>
            <Button
              onClick={() => handleNav("/shop")}
              className="bg-[#734E06] hover:bg-[#5a3c04] text-white"
            >
              Explore Saree Catalog
            </Button>
          </div>
        ) : (
          /* Main Checkout Grid */
          <form onSubmit={handleInitiateFastrrCheckout} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left 2 Columns: Information & Payment Option */}
              <div className="lg:col-span-2 space-y-6">
                {/* Error Banner */}
                {paymentError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Payment Notification</strong>
                      <p className="m-0 mt-0.5">{paymentError}</p>
                    </div>
                  </div>
                )}

                {/* 1. Contact Details */}
                <Card className="bg-white border-neutral-200 rounded-sm shadow-xs">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 m-0 mb-5">
                      1. Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                          First Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                          Last Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                          Phone Number (for SMS Tracking) *
                        </label>
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Shipping Destination */}
                <Card className="bg-white border-neutral-200 rounded-sm shadow-xs">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 m-0">
                        2. Delivery Address
                      </h3>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
                        ✓ Complimentary Pan-India Delivery
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                          Street Address / House / Flat *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                            City *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                            State *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase font-bold text-neutral-600 mb-1.5">
                            PIN Code *
                          </label>
                          <Input
                            type="text"
                            maxLength={6}
                            required
                            value={formData.pincode}
                            onChange={(e) =>
                              setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })
                            }
                            className="bg-neutral-50 focus:bg-white text-neutral-900 border-neutral-300 rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Fastrr Payment Method Options */}
                <Card className="bg-white border-neutral-200 rounded-sm shadow-xs">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 m-0">
                        3. Payment Method
                      </h3>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#734E06] bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-200">
                        <Zap className="w-3 h-3 fill-current" /> fastrr 1-Click Checkout
                      </span>
                    </div>

                    <div className="space-y-3">
                      <label
                        className={cn(
                          "flex items-center gap-3.5 p-4 border rounded-sm cursor-pointer transition-all",
                          formData.paymentMethod === "fastrr_upi"
                            ? "border-[#734E06] bg-amber-50/40 shadow-xs"
                            : "border-neutral-200 bg-white hover:bg-neutral-50"
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "fastrr_upi"}
                          onChange={() => setFormData({ ...formData, paymentMethod: "fastrr_upi" })}
                          className="w-4 h-4 text-[#734E06] accent-[#734E06]"
                        />
                        <Smartphone className="w-5 h-5 text-[#734E06]" />
                        <div className="flex-1">
                          <span className="text-sm font-bold text-neutral-900 block">
                            Instant UPI via fastrr (GPay / PhonePe / Paytm / BHIM)
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Fastest payment. 100% encrypted and protected by Shiprocket.
                          </span>
                        </div>
                      </label>

                      <label
                        className={cn(
                          "flex items-center gap-3.5 p-4 border rounded-sm cursor-pointer transition-all",
                          formData.paymentMethod === "fastrr_card"
                            ? "border-[#734E06] bg-amber-50/40 shadow-xs"
                            : "border-neutral-200 bg-white hover:bg-neutral-50"
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "fastrr_card"}
                          onChange={() => setFormData({ ...formData, paymentMethod: "fastrr_card" })}
                          className="w-4 h-4 text-[#734E06] accent-[#734E06]"
                        />
                        <CreditCard className="w-5 h-5 text-[#734E06]" />
                        <div className="flex-1">
                          <span className="text-sm font-bold text-neutral-900 block">
                            Credit / Debit Cards (Visa, Mastercard, RuPay, Amex)
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Safe 3D-Secure 2.0 card checkout.
                          </span>
                        </div>
                      </label>

                      <label
                        className={cn(
                          "flex items-center gap-3.5 p-4 border rounded-sm cursor-pointer transition-all",
                          formData.paymentMethod === "fastrr_netbanking"
                            ? "border-[#734E06] bg-amber-50/40 shadow-xs"
                            : "border-neutral-200 bg-white hover:bg-neutral-50"
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "fastrr_netbanking"}
                          onChange={() =>
                            setFormData({ ...formData, paymentMethod: "fastrr_netbanking" })
                          }
                          className="w-4 h-4 text-[#734E06] accent-[#734E06]"
                        />
                        <Building className="w-5 h-5 text-[#734E06]" />
                        <div className="flex-1">
                          <span className="text-sm font-bold text-neutral-900 block">
                            Net Banking (All Major Indian Banks)
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            HDFC, ICICI, SBI, Axis, Kotak and 50+ banks.
                          </span>
                        </div>
                      </label>

                      {siteSettings.codAvailable && (
                        <label
                          className={cn(
                            "flex items-center gap-3.5 p-4 border rounded-sm cursor-pointer transition-all",
                            formData.paymentMethod === "cod"
                              ? "border-[#734E06] bg-amber-50/40 shadow-xs"
                              : "border-neutral-200 bg-white hover:bg-neutral-50"
                          )}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === "cod"}
                            onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                            className="w-4 h-4 text-[#734E06] accent-[#734E06]"
                          />
                          <Truck className="w-5 h-5 text-[#734E06]" />
                          <div className="flex-1">
                            <span className="text-sm font-bold text-neutral-900 block">
                              Cash on Delivery (COD)
                            </span>
                            <span className="text-[11px] text-neutral-500">
                              Pay in cash or UPI when your saree arrives at your doorstep.
                            </span>
                          </div>
                        </label>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Order Summary & Primary Payment Button */}
              <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm rounded-sm sticky top-24 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <h4 className="font-serif text-xl font-bold text-neutral-900 m-0">
                    Order Summary
                  </h4>
                  <span className="text-xs text-neutral-500 font-mono">
                    {cart.length} items
                  </span>
                </div>

                <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((item: CartItem) => (
                    <div key={item.product.id} className="flex gap-3 items-center text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-12 h-16 object-cover bg-neutral-100 rounded-xs border border-neutral-200"
                      />
                      <div className="flex-1 min-w-0">
                        <strong className="block text-neutral-900 truncate font-semibold">
                          {item.product.title}
                        </strong>
                        <span className="text-neutral-500 block">
                          Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ""}
                        </span>
                      </div>
                      <span className="font-bold text-neutral-900">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-200 pt-4 space-y-2 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <strong className="text-neutral-900 font-semibold">{formatINR(cartSubtotal)}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Pan-India Shipping:</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-neutral-900 border-t border-neutral-200 pt-3 mt-2">
                    <span>Grand Total:</span>
                    <span className="text-[#734E06] text-lg">{formatINR(grandTotal)}</span>
                  </div>
                </div>

                {/* Primary Authoritative Payment Action */}
                <Button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full h-13 bg-[#734E06] hover:bg-[#5a3c04] text-white text-sm font-bold uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Launching Payment...
                    </>
                  ) : formData.paymentMethod === "cod" ? (
                    `Place COD Order (${formatINR(grandTotal)})`
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" />
                      Pay with fastrr ({formatINR(grandTotal)})
                    </>
                  )}
                </Button>

                <div className="pt-2 text-center space-y-2">
                  <p className="text-[11px] text-neutral-500 m-0 flex items-center justify-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5 text-neutral-400" />
                    256-bit Encrypted Checkout • Powered by Shiprocket fastrr
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Fastrr Checkout Popup Modal */}
      {isFastrrModalOpen && activeIntent && (
        <div
          className="fixed inset-0 bg-black/75 z-[99999] flex items-center justify-center p-4"
          onClick={() => {
            if (!isProcessingPayment) setIsFastrrModalOpen(false);
          }}
        >
          <div
            className="bg-white max-w-md w-full rounded-sm shadow-2xl overflow-hidden border border-neutral-200 flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fastrr Header */}
            <div className="bg-neutral-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#734E06] flex items-center justify-center text-white font-bold text-xs">
                  ⚡
                </div>
                <div>
                  <h4 className="text-sm font-bold m-0 tracking-wide">fastrr Checkout</h4>
                  <span className="text-[10px] text-neutral-400 block -mt-0.5">
                    Powered by Shiprocket
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={() => setIsFastrrModalOpen(false)}
                className="w-7 h-7 rounded-full text-neutral-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs">
              <div className="bg-neutral-50 p-4 rounded-sm border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                    Paying Evara Vastra
                  </span>
                  <span className="text-neutral-900 font-semibold text-xs">
                    Order Ref: #{activeIntent.orderId}
                  </span>
                </div>
                <strong className="text-base font-bold text-[#734E06]">
                  {formatINR(activeIntent.amount)}
                </strong>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                  Select Fastrr Payment Method:
                </span>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleExecutePayment("fastrr_upi")}
                  className="w-full p-3.5 bg-white border border-neutral-300 hover:border-[#734E06] rounded-sm text-left flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#734E06]" />
                    <div>
                      <strong className="block text-neutral-900 text-xs group-hover:text-[#734E06]">
                        Instant UPI (GPay / PhonePe / Paytm)
                      </strong>
                      <span className="text-[10px] text-neutral-500">1-click direct app approval</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleExecutePayment("fastrr_card")}
                  className="w-full p-3.5 bg-white border border-neutral-300 hover:border-[#734E06] rounded-sm text-left flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#734E06]" />
                    <div>
                      <strong className="block text-neutral-900 text-xs group-hover:text-[#734E06]">
                        Credit or Debit Card
                      </strong>
                      <span className="text-[10px] text-neutral-500">Visa, Mastercard, RuPay, Amex</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleExecutePayment("fastrr_netbanking")}
                  className="w-full p-3.5 bg-white border border-neutral-300 hover:border-[#734E06] rounded-sm text-left flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-[#734E06]" />
                    <div>
                      <strong className="block text-neutral-900 text-xs group-hover:text-[#734E06]">
                        Net Banking
                      </strong>
                      <span className="text-[10px] text-neutral-500">HDFC, ICICI, SBI, Axis & all banks</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {isProcessingPayment && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-sm flex items-center justify-center gap-2 font-semibold">
                  <Loader2 className="w-4 h-4 animate-spin text-[#734E06]" />
                  Authorizing transaction with patron bank...
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-neutral-100 border-t border-neutral-200 text-center text-[10px] text-neutral-500 font-medium flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-neutral-400" />
              Verified Fastrr Merchant • PCI-DSS Level 1 Certified
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
