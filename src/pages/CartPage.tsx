import React, { useState } from "react";
import { useShop, CartItem } from "../context/ShopContext";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Trash2, Heart, Plus, Minus, ArrowRight, Gift, Check, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

export const CartPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { cart, updateQuantity, removeFromCart, toggleWishlist, cartSubtotal } = useShop();
  const { siteSettings, validateCoupon } = useData();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const result = validateCoupon(couponCode, cartSubtotal);
    if (result.isValid) {
      setDiscountAmount(result.discountAmount);
      setCouponSuccess(result.message);
      setCouponError(null);
    } else {
      setDiscountAmount(0);
      setCouponError(result.message);
      setCouponSuccess(null);
    }
  };

  const freeThreshold = siteSettings.freeShippingThreshold || 10000;
  const shippingFee = cartSubtotal >= freeThreshold || cartSubtotal === 0 ? 0 : siteSettings.standardShippingFee || 350;
  const giftWrapFee = isGiftWrap ? 250 : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + giftWrapFee);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="animate-in fade-in duration-500 pt-10 pb-28">
      <div className="container">
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} onNavigate={onNavigate} />

        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground m-0">
            Your Shopping Bag
          </h1>
          <p className="text-[15px] text-muted-foreground mt-2">
            {cart.length > 0
              ? `You have ${cart.reduce((a: number, b: CartItem) => a + b.quantity, 0)} handcrafted saree(s) in your bag.`
              : "Your shopping bag is currently empty."}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 px-8 text-center bg-secondary/50 border border-border rounded-sm">
            <h3 className="font-serif text-3xl text-foreground m-0">
              No Sarees in Your Bag
            </h3>
            <p className="text-[15px] text-muted-foreground max-w-[420px] mx-auto mt-3 mb-8">
              Explore our latest arrivals in pure katan silks, handspun mulmuls, and heirloom Banarasi brocades.
            </p>
            <Button onClick={() => handleNav("/shop")} size="lg" className="px-8">
              Explore The Catalog <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
            {/* Left Items Table */}
            <div className="flex flex-col gap-6">
              <div className="bg-background border border-border rounded-sm overflow-hidden">
                {cart.map((item: CartItem) => (
                  <div
                    key={item.product.id}
                    className="p-6 border-b border-border flex gap-6 sm:gap-8 last:border-b-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-[100px] aspect-[3/4] object-cover bg-secondary rounded-sm shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] tracking-[0.14em] uppercase text-accent font-bold block mb-1">
                          {item.product.craft}
                        </span>
                        <h4
                          onClick={() => handleNav(`/products/${item.product.slug}`)}
                          className="text-lg font-semibold text-foreground cursor-pointer hover:text-accent transition-colors m-0 leading-tight"
                        >
                          {item.product.title}
                        </h4>
                        <p className="text-[13px] text-muted-foreground mt-1 mb-0">
                          {item.product.fabric} • {item.product.color}
                        </p>
                        {item.product.details.blousePiece && (
                          <p className="text-xs text-green-700 dark:text-green-500 font-semibold mt-1.5 mb-0">
                            ✓ Includes unstitched matching blouse fabric
                          </p>
                        )}

                        <div className="flex gap-4 mt-4">
                          <button
                            onClick={() => {
                              toggleWishlist(item.product.id);
                              removeFromCart(item.product.id);
                            }}
                            className="text-[13px] text-muted-foreground flex items-center gap-1.5 hover:text-foreground transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5" /> Save to Wishlist
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[13px] text-accent flex items-center gap-1.5 hover:text-accent/80 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-3 mt-4 sm:mt-0 self-start sm:self-auto">
                        <span className="text-lg font-bold text-foreground">
                          {formatINR(item.product.price * item.quantity)}
                        </span>

                        {/* Quantity Controller */}
                        <div className="inline-flex items-center border border-border bg-background rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 text-muted-foreground hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-sm font-semibold min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-muted-foreground hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Keepsake Packaging Option */}
              <div className="bg-background p-6 border border-border rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Gift className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <strong className="text-[15px] text-foreground font-semibold block">
                      Artisanal Keepsake Box Packaging (+₹250)
                    </strong>
                    <p className="text-[13px] text-muted-foreground m-0 mt-0.5">
                      Hardbound cloth keepsake box wrapped with festive handwoven ribbons & handwritten card.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="w-5 h-5 accent-accent cursor-pointer shrink-0"
                />
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="bg-background p-8 border border-border shadow-sm rounded-sm flex flex-col gap-6 sticky top-24">
              <h3 className="font-serif text-2xl border-b border-border pb-4 m-0">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Privilege Code (try EVARA10)..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 uppercase font-medium placeholder:normal-case placeholder:font-normal"
                />
                <Button type="submit" variant="secondary" className="px-5">
                  Apply
                </Button>
              </form>

              {couponSuccess && (
                <p className="text-xs text-green-700 dark:text-green-500 font-bold flex items-center gap-1.5 m-0 -mt-3">
                  <Check className="w-3.5 h-3.5" /> {couponSuccess}
                </p>
              )}
              {couponError && (
                <p className="text-xs text-accent font-semibold m-0 -mt-3">
                  {couponError}
                </p>
              )}

              {/* Cost Rows */}
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <strong className="text-foreground">{formatINR(cartSubtotal)}</strong>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 dark:text-green-500 font-medium">
                    <span>Privilege Discount</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Shipping Across India</span>
                  <span>{shippingFee === 0 ? "Complimentary" : formatINR(shippingFee)}</span>
                </div>

                {isGiftWrap && (
                  <div className="flex justify-between">
                    <span>Keepsake Gift Packaging</span>
                    <span>{formatINR(giftWrapFee)}</span>
                  </div>
                )}

                <div className="border-t border-border pt-4 mt-2 flex justify-between text-[19px] font-bold text-foreground">
                  <span>Grand Total</span>
                  <span>{formatINR(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="flex flex-col gap-4 mt-2">
                <Button
                  onClick={() => handleNav("/checkout")}
                  className="w-full h-14 text-[15px] tracking-wide uppercase font-bold"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
