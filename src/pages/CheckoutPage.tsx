import React, { useState, useEffect, useCallback } from "react";
import { useShop } from "../context/ShopContext";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Lock,
  Loader2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { paymentProvider, PaymentIntent } from "../lib/payment";

export const CheckoutPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { cart, cartSubtotal, clearCart, showToast } = useShop();
  const { syncOrderPaymentResult } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = useCallback(
    (href: string) => {
      if (onNavigate) onNavigate(href);
      else navigate(href);
    },
    [onNavigate, navigate]
  );

  const [isInitializing, setIsInitializing] = useState(false);
  const [activeIntent, setActiveIntent] = useState<PaymentIntent | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessingCallback, setIsProcessingCallback] = useState(false);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const grandTotal = cartSubtotal;

  // Handle Authoritative Return Callback (e.g. from Shiprocket / Fastrr redirect)
  const handleCheckoutCallback = useCallback(
    async (orderId: string, paymentId: string, statusParam: string) => {
      setIsProcessingCallback(true);
      setErrorMessage(null);

      try {
        const verification = await paymentProvider.verifyPayment({
          orderId,
          paymentId,
          status: statusParam,
        });

        if (!verification.success) {
          throw new Error(
            verification.error || "Payment could not be completed. Please try again."
          );
        }

        // Synchronize order idempotently in atelier database
        const finalStatus = verification.status === "COD" ? "Cash on Delivery" : "Paid";
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

        syncOrderPaymentResult({
          orderId,
          paymentId: verification.paymentId,
          transactionId: verification.transactionId,
          status: finalStatus,
          methodLabel: verification.method || "Shiprocket / Fastrr Checkout",
          fastrrOrderId: verification.fastrrOrderId,
          items: orderItems,
          subtotal: cartSubtotal,
          shippingFee: 0,
          discount: 0,
          total: grandTotal,
        });

        // Clear cart ONLY after authoritative success
        clearCart();
        showToast("Payment verified via Shiprocket Fastrr Checkout!", "info");
        handleNav(`/order-confirmation/${orderId}`);
      } catch (err: any) {
        setErrorMessage(err?.message || "Payment could not be completed. Please try again.");
      } finally {
        setIsProcessingCallback(false);
      }
    },
    [cart, cartSubtotal, clearCart, grandTotal, handleNav, showToast, syncOrderPaymentResult]
  );

  // Check URL parameters for returning customer callbacks
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderIdParam = params.get("order_id");
    const paymentIdParam = params.get("payment_id");
    const statusParam = params.get("status");

    if (orderIdParam && (statusParam === "success" || statusParam === "paid" || statusParam === "cod")) {
      handleCheckoutCallback(orderIdParam, paymentIdParam || `pay_${Date.now()}`, statusParam);
    } else if (statusParam === "failed" || statusParam === "cancelled") {
      setErrorMessage("Payment could not be completed. Please try again.");
    }
  }, [location.search, handleCheckoutCallback]);

  // Initiate Shiprocket / Fastrr Checkout Session
  const handleLaunchFastrrCheckout = async () => {
    if (cart.length === 0) {
      showToast("Your shopping bag is empty.", "info");
      handleNav("/cart");
      return;
    }

    setIsInitializing(true);
    setErrorMessage(null);

    try {
      const generatedOrderId = `EV-${Math.floor(10000 + Math.random() * 90000)}`;

      const intent = await paymentProvider.createPaymentIntent({
        orderId: generatedOrderId,
        amount: grandTotal,
        items: cart.map((i) => ({
          id: i.product.id,
          name: i.product.title,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.images[0],
        })),
      });

      setActiveIntent(intent);
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Failed to initialize Shiprocket Fastrr Checkout. Please try again."
      );
    } finally {
      setIsInitializing(false);
    }
  };

  // Auto-initiate checkout intent on page load if cart has items and no return callback
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get("status") && cart.length > 0 && !activeIntent && !isInitializing) {
      handleLaunchFastrrCheckout();
    }
  }, [cart.length]);

  // Simulation handlers for test/demo mode
  const handleSimulatePatronSuccess = () => {
    if (!activeIntent) return;
    handleCheckoutCallback(activeIntent.orderId, `pay_fstr_${Date.now()}`, "paid");
  };

  const handleSimulateCODSuccess = () => {
    if (!activeIntent) return;
    handleCheckoutCallback(activeIntent.orderId, `cod_${Date.now()}`, "cod");
  };

  const handleSimulatePatronDecline = () => {
    setErrorMessage("Payment could not be completed. Please try again.");
  };

  if (cart.length === 0 && !isProcessingCallback) {
    return (
      <div className="bg-background min-h-[80dvh] py-12">
        <div className="container max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-amber-50 text-[#734E06] rounded-full flex items-center justify-center mx-auto border border-amber-200">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-neutral-900 m-0">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-sm text-neutral-600">
            Please add handcrafted silk sarees to your bag before proceeding to checkout.
          </p>
          <Button
            onClick={() => handleNav("/shop")}
            className="h-12 px-8 bg-[#734E06] hover:bg-[#5a3c04] text-white uppercase tracking-wider text-xs font-bold rounded-sm"
          >
            Explore Sarees
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-[85dvh] py-8 sm:py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Cart", href: "/cart" }, { label: "Shiprocket Fastrr Checkout" }]}
          onNavigate={handleNav}
        />

        {/* Processing Callback View */}
        {isProcessingCallback ? (
          <div className="bg-white border border-neutral-200 p-10 rounded-sm shadow-sm text-center space-y-5 mt-6">
            <Loader2 className="w-10 h-10 text-[#734E06] animate-spin mx-auto" />
            <div>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 m-0">
                Authorizing Payment Result...
              </h3>
              <p className="text-xs text-neutral-500 mt-1.5">
                Receiving authoritative confirmation from Shiprocket / Fastrr Checkout.
              </p>
            </div>
          </div>
        ) : errorMessage ? (
          /* Checkout Failure / Cancelled State */
          <div className="bg-white border border-red-200 p-8 sm:p-10 rounded-sm shadow-sm space-y-6 mt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center shrink-0 border border-red-200">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block mb-1">
                  Transaction Notice
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 m-0">
                  {errorMessage}
                </h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  Your payment authorization could not be completed by the bank or was cancelled.
                  Your items remain securely saved in your bag, and your account has not been charged.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-sm border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
              <span>Saved Items in Bag: <strong>{cart.length} pieces</strong></span>
              <span>Subtotal: <strong className="text-neutral-900 font-bold">{formatINR(grandTotal)}</strong></span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={() => {
                  setErrorMessage(null);
                  handleLaunchFastrrCheckout();
                }}
                className="flex-1 h-12 bg-[#734E06] hover:bg-[#5a3c04] text-white uppercase tracking-wider text-xs font-bold rounded-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retry Checkout
              </Button>
              <Button
                variant="outline"
                onClick={() => handleNav("/cart")}
                className="flex-1 h-12 border-neutral-300 text-neutral-800 text-xs uppercase tracking-wider font-bold rounded-sm"
              >
                Return to Cart
              </Button>
            </div>
          </div>
        ) : (
          /* Active Checkout Gateway Screen */
          <div className="bg-white border border-neutral-200 rounded-sm shadow-sm p-6 sm:p-10 mt-6 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#734E06] block">
                EVARA VASTRA ATELIER CHECKOUT
              </span>
              <h2 className="font-serif text-3xl font-bold text-neutral-900 m-0">
                Shiprocket / Fastrr Checkout
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                You are checking out with Evara Vastra’s official single checkout engine. All payment options
                (UPI, Cards, Net Banking, and COD) and delivery addresses are securely managed directly inside
                Shiprocket Fastrr Checkout.
              </p>
            </div>

            {/* Cart Summary Header */}
            <div className="bg-neutral-50 p-5 rounded-sm border border-neutral-200 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                <span className="text-neutral-500 font-medium">Selected Pieces:</span>
                <span className="font-bold text-neutral-900">{cart.length} Handcrafted Sarees</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                <span className="text-neutral-500 font-medium">Pan-India Express Shipping:</span>
                <span className="font-bold text-emerald-800 uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-sm font-bold">
                <span className="text-neutral-900">Total Payable:</span>
                <span className="text-[#734E06] text-base">{formatINR(grandTotal)}</span>
              </div>
            </div>

            {/* Launch Status / Primary Launch Button */}
            <div className="space-y-4">
              {isInitializing ? (
                <div className="py-8 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-[#734E06] animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-neutral-600">
                    Connecting to Shiprocket Fastrr Secure Checkout session...
                  </p>
                </div>
              ) : activeIntent ? (
                <div className="space-y-4 text-center">
                  <a
                    href={activeIntent.checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-14 bg-[#734E06] hover:bg-[#5a3c04] text-white text-sm font-bold uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center justify-center gap-2.5"
                  >
                    Proceed to Fastrr Checkout ({formatINR(grandTotal)})
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Sandbox / Interactive Testing Console */}
                  <div className="pt-6 border-t border-neutral-200 text-left bg-neutral-50/70 p-5 rounded-sm border">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-500 block mb-2">
                      Test Simulation Console (Shiprocket Fastrr Sandbox)
                    </span>
                    <p className="text-xs text-neutral-600 mb-4">
                      Simulate official Fastrr customer response to test end-to-end payment status and order synchronization:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      <Button
                        size="sm"
                        onClick={handleSimulatePatronSuccess}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs"
                      >
                        ✓ Simulate Paid (UPI/Card)
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSimulateCODSuccess}
                        className="bg-amber-800 hover:bg-amber-900 text-white text-xs"
                      >
                        ✓ Simulate COD Selection
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSimulatePatronDecline}
                        className="border-red-300 text-red-700 hover:bg-red-50 text-xs"
                      >
                        ✕ Simulate Payment Declined
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleLaunchFastrrCheckout}
                  className="w-full h-14 bg-[#734E06] hover:bg-[#5a3c04] text-white text-sm font-bold uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>

            {/* Trust and Single Provider Assurance */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>256-Bit TLS Encryption • PCI-DSS Level 1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#734E06]" />
                <span className="font-semibold text-neutral-700">Official Shiprocket / Fastrr Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
