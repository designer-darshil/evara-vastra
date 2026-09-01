import React, { useState } from "react";
import { useShop, CartItem } from "../context/ShopContext";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { CheckCircle2, ArrowRight, CreditCard, Smartphone, Building, Truck, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export const CheckoutPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { cart, cartSubtotal, clearCart, showToast } = useShop();
  const { addOrder } = useData();
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
    paymentMethod: "upi",
    upiId: "devika@okaxis",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const shippingCost = formData.shippingMethod === "express" ? 450 : 0;
  const grandTotal = cartSubtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.address || !formData.pincode) {
      showToast("Please fill in required delivery information.", "info");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Create persistent order record in DataContext
      const orderItems = cart.map((item) => ({
        id: item.product.id,
        slug: item.product.slug,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        fabric: item.product.fabric,
        blouseOptIn: item.product.details.blousePiece,
      }));

      const paymentMethodLabel =
        formData.paymentMethod === "upi"
          ? "Instant UPI (PhonePe / GPay)"
          : formData.paymentMethod === "card"
          ? "Credit/Debit Card (Visa/Mastercard)"
          : formData.paymentMethod === "netbanking"
          ? "Net Banking (HDFC/ICICI)"
          : "Cash on Delivery";

      const createdOrder = addOrder({
        status: "Confirmed",
        subtotal: cartSubtotal,
        shippingFee: shippingCost,
        discount: 0,
        total: grandTotal,
        paymentMethod: paymentMethodLabel,
        paymentStatus: formData.paymentMethod === "cod" ? "Cash on Delivery" : "Paid",
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
        trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}`,
        carrier: "Blue Dart Express Insured",
        items: orderItems,
      });

      setConfirmedOrder(createdOrder);
      clearCart();
      setIsSubmitting(false);
      showToast(`Order ${createdOrder.orderNumber} confirmed successfully!`, "info");
      window.scrollTo(0, 0);
    }, 600);
  };

  // Order Confirmed State
  if (confirmedOrder) {
    return (
      <div className="animate-in fade-in duration-500 py-20 pb-32">
        <div className="container max-w-[680px]">
          <div className="bg-background p-8 md:p-14 border border-border shadow-md text-center rounded-sm">
            <div className="w-[68px] h-[68px] rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary block mb-1">
              ORDER CONFIRMED & REGISTERED IN ATELIER DATABASE
            </span>

            <h1 className="font-serif text-4xl text-foreground mb-2 m-0">
              Thank You for Your Order
            </h1>

            <p className="text-[15px] text-muted-foreground leading-relaxed m-0">
              Order Reference: <strong className="text-accent">{confirmedOrder.orderNumber}</strong>
            </p>

            <div className="bg-secondary/50 p-5 border border-border my-8 text-left text-sm rounded-sm">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Recipient</span>
                <strong className="text-foreground">{confirmedOrder.customerName}</strong>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Delivery Address</span>
                <span className="text-foreground text-right">{confirmedOrder.shippingAddress}, {confirmedOrder.city} {confirmedOrder.pincode}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Tracking Courier</span>
                <strong className="text-foreground">{confirmedOrder.carrier} <br/> (#{confirmedOrder.trackingNumber})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="text-foreground text-right">{confirmedOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => handleNav("/account/orders")} variant="secondary" className="h-12 px-6">
                View Order History
              </Button>
              <Button onClick={() => handleNav("/shop")} className="h-12 px-6">
                Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Cart Checkout Form
  return (
    <div className="animate-in fade-in duration-500 pt-10 pb-28">
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Shopping Bag", href: "/cart" }, { label: "Checkout" }]}
          onNavigate={onNavigate}
        />

        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground m-0">
            Express Checkout
          </h1>
          <p className="text-[13px] text-accent font-semibold mt-2">
            ✦ Instant dynamic registration in Atelier Order Records
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="py-16 px-8 text-center bg-secondary/50 border border-border rounded-sm">
            <h3 className="font-serif text-3xl m-0 text-foreground">Your Bag is Empty</h3>
            <p className="text-[15px] text-muted-foreground mt-2 mb-6">
              Please add at least one saree to your bag before proceeding to checkout.
            </p>
            <Button onClick={() => handleNav("/shop")} className="px-8">
              Browse Catalog
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
              {/* Left Form Inputs */}
              <div className="flex flex-col gap-8">
                {/* 1. Contact Info */}
                <Card className="bg-background border-border rounded-sm">
                  <CardContent className="p-8">
                    <h3 className="font-serif text-[22px] mb-6 text-foreground m-0">
                      1. Contact Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                          First Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                          Last Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Delivery Address */}
                <Card className="bg-background border-border rounded-sm">
                  <CardContent className="p-8">
                    <h3 className="font-serif text-[22px] mb-6 text-foreground m-0">
                      2. Shipping Address
                    </h3>

                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                          Street Address & Landmark *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                            City *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                            State *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5">
                            PIN Code *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Payment Method */}
                <Card className="bg-background border-border rounded-sm">
                  <CardContent className="p-8">
                    <h3 className="font-serif text-[22px] mb-6 text-foreground m-0">
                      3. Payment Preference
                    </h3>

                    <div className="flex flex-col gap-3">
                      {[
                        { id: "upi", label: "Instant UPI (GPay / PhonePe / Paytm / BHIM)", icon: Smartphone },
                        { id: "card", label: "Credit or Debit Card (Visa, Mastercard, RuPay, Amex)", icon: CreditCard },
                        { id: "netbanking", label: "Net Banking (All Major Indian Banks)", icon: Building },
                        { id: "cod", label: "Cash on Delivery (Available across India)", icon: Truck },
                      ].map((p) => {
                        const Icon = p.icon;
                        const isSelected = formData.paymentMethod === p.id;
                        return (
                          <label
                            key={p.id}
                            className={cn(
                              "flex items-center gap-3.5 p-4 border rounded-sm cursor-pointer transition-colors",
                              isSelected
                                ? "border-accent bg-accent/5"
                                : "border-border bg-background hover:bg-secondary/50"
                            )}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={isSelected}
                              onChange={() => setFormData({ ...formData, paymentMethod: p.id })}
                              className="w-4 h-4 accent-accent"
                            />
                            <Icon className={cn("w-5 h-5", isSelected ? "text-accent" : "text-muted-foreground")} />
                            <span className={cn("text-sm", isSelected ? "font-bold text-foreground" : "font-medium text-foreground")}>
                              {p.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Order Summary & Confirm */}
              <div className="bg-background p-8 border border-border shadow-sm rounded-sm sticky top-24">
                <h4 className="font-serif text-[22px] mb-4 border-b border-border pb-3 m-0 text-foreground">
                  Cart Recap ({cart.length} items)
                </h4>

                <div className="flex flex-col gap-4 mb-6">
                  {cart.map((item: CartItem) => (
                    <div key={item.product.id} className="flex gap-3 items-center">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-12 h-16 object-cover bg-secondary rounded-sm"
                      />
                      <div className="flex-1 text-[13px]">
                        <strong className="block text-foreground">{item.product.title}</strong>
                        <span className="text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5 text-sm border-t border-border pt-4 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <strong className="text-foreground">{formatINR(cartSubtotal)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-700 dark:text-green-500 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-[19px] font-bold text-foreground border-t border-border pt-4 mt-2">
                    <span>Total Amount</span>
                    <span className="text-accent">{formatINR(grandTotal)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 h-14 text-[15px] font-bold tracking-wide uppercase"
                >
                  {isSubmitting ? "Placing Order..." : `Place Order (${formatINR(grandTotal)})`}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  Encrypted Checkout. Order saved to Atelier DB.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
