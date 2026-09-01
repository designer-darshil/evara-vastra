import React, { useState } from "react";
import { useShop, CartItem } from "../context/ShopContext";
import { siteConfig } from "../data/site";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Trash2, Heart, Plus, Minus, ArrowRight, ShieldCheck, Gift, Check } from "lucide-react";

export const CartPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    cartSubtotal,
  } = useShop();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "EVARA10" || code === "ATELIER10" || code === "FIRSTDRAPE") {
      setDiscountPercent(0.1);
      setCouponSuccess(`Code ${code} applied: 10% privilege discount.`);
      setCouponError(null);
    } else {
      setCouponError("Invalid promotion code. Try 'EVARA10'.");
      setCouponSuccess(null);
    }
  };

  const freeThreshold = siteConfig.shipping.freeThreshold;
  const shippingFee = cartSubtotal >= freeThreshold || cartSubtotal === 0 ? 0 : 350;
  const giftWrapFee = isGiftWrap ? 250 : 0;
  const discountAmount = Math.round(cartSubtotal * discountPercent);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + giftWrapFee);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} onNavigate={onNavigate} />

        <div style={{ marginBottom: "2.5rem" }}>
          <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}>
            Your Shopping Bag
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
            {cart.length > 0
              ? `You have ${cart.reduce((a: number, b: CartItem) => a + b.quantity, 0)} handcrafted saree(s) in your bag.`
              : "Your shopping bag is currently empty."}
          </p>
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              padding: "5rem 2rem",
              textAlign: "center",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h3 className="font-serif" style={{ fontSize: "1.85rem", color: "var(--text-primary)" }}>
              No Sarees in Your Bag
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "420px", margin: "0.75rem auto 2rem auto" }}>
              Explore our latest arrivals in pure katan silks, handspun mulmuls, and heirloom Banarasi brocades.
            </p>
            <button onClick={() => onNavigate("/shop")} className="btn-wine">
              Explore The Catalog <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.25fr 0.75fr",
              gap: "3rem",
              alignItems: "start",
            }}
            className="cart-layout-grid"
          >
            {/* Left Items Table */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  overflow: "hidden",
                }}
              >
                {cart.map((item: CartItem) => (
                  <div
                    key={item.product.id}
                    style={{
                      padding: "1.75rem",
                      borderBottom: "1px solid var(--border-subtle)",
                      display: "grid",
                      gridTemplateColumns: "100px 1fr auto",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                    className="cart-item-row"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      style={{
                        width: "100px",
                        aspectRatio: "3/4",
                        objectFit: "cover",
                        backgroundColor: "var(--bg-primary)",
                      }}
                    />

                    <div>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--accent-gold)",
                          fontWeight: 600,
                        }}
                      >
                        {item.product.craft}
                      </span>
                      <h4
                        onClick={() => onNavigate(`/product/${item.product.slug}`)}
                        style={{
                          fontSize: "1.05rem",
                          color: "var(--text-primary)",
                          cursor: "pointer",
                          margin: "0.2rem 0",
                        }}
                      >
                        {item.product.title}
                      </h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        {item.product.fabric} • {item.product.color}
                      </p>
                      {item.product.details.blousePiece && (
                        <p style={{ fontSize: "0.75rem", color: "#234E3E", fontWeight: 500, marginTop: "0.2rem" }}>
                          ✓ Includes 0.8m unstitched matching blouse fabric
                        </p>
                      )}

                      <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
                        <button
                          onClick={() => {
                            toggleWishlist(item.product.id);
                            removeFromCart(item.product.id);
                          }}
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          <Heart size={13} /> Save to Wishlist
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--accent-wine)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {formatINR(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Controller */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid var(--border-medium)",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: "0.4rem 0.65rem", color: "var(--text-secondary)" }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ padding: "0 0.5rem", fontSize: "0.85rem", fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: "0.4rem 0.65rem", color: "var(--text-secondary)" }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Wrapping Accordion Box */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "1.25rem 1.5rem",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <Gift size={20} style={{ color: "var(--accent-gold)" }} />
                  <div>
                    <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                      Artisanal Keepsake Box Packaging (+₹250)
                    </strong>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      Hardbound cloth keepsake box wrapped with festive handwoven ribbons & handwritten card.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "var(--accent-wine)", cursor: "pointer" }}
                />
              </div>
            </div>

            {/* Right Summary Box */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "2rem",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-subtle)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <h3 className="font-serif" style={{ fontSize: "1.45rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.75rem" }}>
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Privilege Code (try EVARA10)..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.65rem 0.85rem",
                    border: "1px solid var(--border-medium)",
                    outline: "none",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                  }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: "0.65rem 1rem", fontSize: "0.75rem" }}>
                  Apply
                </button>
              </form>

              {couponSuccess && (
                <p style={{ fontSize: "0.75rem", color: "#234E3E", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Check size={14} /> {couponSuccess}
                </p>
              )}
              {couponError && (
                <p style={{ fontSize: "0.75rem", color: "var(--accent-wine)", fontWeight: 500 }}>
                  {couponError}
                </p>
              )}

              {/* Cost Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Bag Subtotal</span>
                  <strong style={{ color: "var(--text-primary)" }}>{formatINR(cartSubtotal)}</strong>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#234E3E" }}>
                    <span>Privilege Discount (10%)</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Insured Shipping Across India</span>
                  <span>{shippingFee === 0 ? "Complimentary" : formatINR(shippingFee)}</span>
                </div>

                {isGiftWrap && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Keepsake Gift Packaging</span>
                    <span>{formatINR(giftWrapFee)}</span>
                  </div>
                )}

                <div
                  style={{
                    borderTop: "1px solid var(--border-medium)",
                    paddingTop: "1rem",
                    marginTop: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  <span>Grand Total</span>
                  <span>{formatINR(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onNavigate("/checkout")}
                className="btn-wine"
                style={{ width: "100%", padding: "1.1rem", fontSize: "0.85rem" }}
              >
                Proceed to Secure Checkout <ArrowRight size={16} />
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <ShieldCheck size={14} style={{ color: "var(--accent-gold)" }} />
                <span>256-Bit Encrypted Secure Checkout Demo</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .cart-item-row {
            grid-template-columns: 80px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
