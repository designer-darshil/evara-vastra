import React, { useState } from "react";
import { useShop, CartItem } from "../context/ShopContext";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { CheckCircle2, ArrowRight, CreditCard, Smartphone, Building, Truck, Lock } from "lucide-react";

export const CheckoutPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { cart, cartSubtotal, clearCart, showToast } = useShop();
  const { addOrder } = useData();

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
      <div className="animate-fade-in" style={{ padding: "5rem 0 8rem 0" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-medium)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-wine-subtle)",
                color: "var(--accent-wine)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              ORDER CONFIRMED & REGISTERED IN ATELIER DATABASE
            </span>

            <h1 className="font-serif" style={{ fontSize: "2.4rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Thank You for Your Order
            </h1>

            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Order Reference: <strong style={{ color: "var(--accent-wine)" }}>{confirmedOrder.orderNumber}</strong>
            </p>

            <div
              style={{
                backgroundColor: "var(--bg-primary)",
                padding: "1.25rem",
                border: "1px solid var(--border-subtle)",
                margin: "2rem 0",
                textAlign: "left",
                fontSize: "0.85rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Recipient</span>
                <strong>{confirmedOrder.customerName}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Delivery Address</span>
                <span>{confirmedOrder.shippingAddress}, {confirmedOrder.city} {confirmedOrder.pincode}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Tracking Courier</span>
                <strong>{confirmedOrder.carrier} (#{confirmedOrder.trackingNumber})</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Payment Method</span>
                <span>{confirmedOrder.paymentMethod}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={() => onNavigate("/orders")} className="btn-secondary">
                View Order History & Timeline
              </button>
              <button onClick={() => onNavigate("/shop")} className="btn-wine">
                Continue Shopping <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Cart Checkout Form
  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Shopping Bag", href: "/cart" }, { label: "Checkout" }]}
          onNavigate={onNavigate}
        />

        <div style={{ marginBottom: "2.5rem" }}>
          <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}>
            Express Checkout
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--accent-wine)", fontWeight: 500, marginTop: "0.2rem" }}>
            ✦ Instant dynamic registration in Atelier Order Records
          </p>
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h3 className="font-serif" style={{ fontSize: "1.6rem" }}>Your Bag is Empty</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: "0.5rem 0 1.5rem 0" }}>
              Please add at least one saree to your bag before proceeding to checkout.
            </p>
            <button onClick={() => onNavigate("/shop")} className="btn-wine">
              Browse Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.35fr 0.65fr",
                gap: "3.5rem",
                alignItems: "start",
              }}
              className="checkout-layout-grid"
            >
              {/* Left Form Inputs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* 1. Contact Info */}
                <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="font-serif" style={{ fontSize: "1.35rem", marginBottom: "1.25rem", color: "var(--text-primary)" }}>
                    1. Contact Information
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="font-serif" style={{ fontSize: "1.35rem", marginBottom: "1.25rem", color: "var(--text-primary)" }}>
                    2. Shipping Address
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                        Street Address & Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="font-serif" style={{ fontSize: "1.35rem", marginBottom: "1.25rem", color: "var(--text-primary)" }}>
                    3. Payment Preference
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.85rem",
                            padding: "1rem 1.25rem",
                            border: isSelected ? "1px solid var(--accent-wine)" : "1px solid var(--border-subtle)",
                            backgroundColor: isSelected ? "var(--accent-wine-subtle)" : "#FFFFFF",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={isSelected}
                            onChange={() => setFormData({ ...formData, paymentMethod: p.id })}
                            style={{ accentColor: "var(--accent-wine)" }}
                          />
                          <Icon size={18} style={{ color: isSelected ? "var(--accent-wine)" : "var(--text-secondary)" }} />
                          <span style={{ fontSize: "0.85rem", fontWeight: isSelected ? 600 : 400 }}>
                            {p.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Order Summary & Confirm */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "2rem",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-subtle)",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h4 className="font-serif" style={{ fontSize: "1.35rem", marginBottom: "1rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>
                  Cart Recap ({cart.length} items)
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
                  {cart.map((item: CartItem) => (
                    <div key={item.product.id} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        style={{ width: "48px", height: "64px", objectFit: "cover" }}
                      />
                      <div style={{ flex: 1, fontSize: "0.78rem" }}>
                        <strong style={{ display: "block", color: "var(--text-primary)" }}>{item.product.title}</strong>
                        <span style={{ color: "var(--text-secondary)" }}>Qty: {item.quantity}</span>
                      </div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Subtotal</span>
                    <span>{formatINR(cartSubtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Shipping</span>
                    <span style={{ color: "#234E3E" }}>Complimentary</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      borderTop: "1px solid var(--border-medium)",
                      paddingTop: "0.75rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <span>Total Amount</span>
                    <span style={{ color: "var(--accent-wine)" }}>{formatINR(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-wine"
                  style={{ width: "100%", marginTop: "1.5rem", padding: "1.1rem" }}
                >
                  {isSubmitting ? "Placing Order..." : `Place Order (${formatINR(grandTotal)})`}
                </button>

                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.75rem" }}>
                  <Lock size={12} style={{ display: "inline", marginRight: "4px" }} />
                  Encrypted Checkout. Order saved to Atelier DB.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
