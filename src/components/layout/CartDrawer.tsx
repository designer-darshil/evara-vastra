import React, { useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import { siteConfig } from "../../data/site";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const CartDrawer: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
  } = useShop();

  const navigate = useNavigate();
  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };

    if (isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = siteConfig.shipping.freeThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const formattedSubtotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(cartSubtotal);

  const handleCheckout = () => {
    closeCartDrawer();
    handleNav("/checkout");
  };

  const handleViewBag = () => {
    closeCartDrawer();
    handleNav("/cart");
  };

  return (
    <div
      className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-drawer flex justify-end animate-in fade-in duration-200"
      style={{ zIndex: 60 }}
      onClick={closeCartDrawer}
    >
      <div
        className="bg-background text-foreground w-full max-w-[460px] h-[100dvh] max-h-[100dvh] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-brand" />
            <h3 className="font-serif text-2xl text-foreground m-0">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>

          <button
            onClick={closeCartDrawer}
            aria-label="Close shopping bag"
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-4 bg-secondary/30 border-b border-border">
          <p className="text-xs font-semibold text-foreground mb-2">
            {remainingForFreeShipping === 0 ? (
              <span className="text-accent font-bold">
                ✓ You have unlocked Complimentary Express Shipping!
              </span>
            ) : (
              <>
                Add{" "}
                <strong className="text-foreground">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(remainingForFreeShipping)}
                </strong>{" "}
                more for complimentary express delivery.
              </>
            )}
          </p>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl m-0">Your bag is empty</h4>
              <p className="text-sm text-muted-foreground max-w-[280px]">
                Discover our handwoven silks, pure linens and Banarasi archives.
              </p>
              <Button
                onClick={() => {
                  closeCartDrawer();
                  handleNav("/shop");
                }}
                className="mt-2"
              >
                Explore Sarees
              </Button>
            </div>
          ) : (
            cart.map((item) => {
              const formattedItemPrice = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(item.product.price);

              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-[84px] h-[112px] object-cover shrink-0 bg-secondary rounded-sm"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h5
                          onClick={() => {
                            closeCartDrawer();
                            handleNav(`/products/${item.product.slug}`);
                          }}
                          className="text-sm font-semibold text-foreground cursor-pointer leading-snug hover:text-accent transition-colors m-0"
                        >
                          {item.product.title}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="Remove item"
                          className="text-muted-foreground hover:text-accent transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.product.fabric} • {item.product.color}
                      </p>
                      {item.selectedSize && (
                        <span className="inline-block text-[10px] text-neutral-600 font-semibold uppercase mt-1">
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-border rounded-sm bg-background">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-[15px] font-bold text-foreground">
                        {formattedItemPrice}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-background flex flex-col gap-5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                Subtotal
              </span>
              <span className="text-2xl font-bold text-foreground">
                {formattedSubtotal}
              </span>
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Taxes and insured shipping calculated at checkout
            </p>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleCheckout}
                className="w-full h-12 text-sm uppercase tracking-widest font-bold"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={handleViewBag}
                variant="outline"
                className="w-full h-10"
              >
                View Bag & Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
