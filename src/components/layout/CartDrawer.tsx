import React, { useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import { siteConfig } from "../../data/site";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export const CartDrawer: React.FC<{ onNavigate: (href: string) => void }> = ({
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
    onNavigate("/checkout");
  };

  const handleViewBag = () => {
    closeCartDrawer();
    onNavigate("/cart");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 21, 19, 0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 99999,
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 0.2s ease-out forwards",
      }}
      onClick={closeCartDrawer}
    >
      <div
        style={{
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-elevated)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} style={{ color: "var(--accent-wine)" }} />
            <h3
              className="font-serif"
              style={{ fontSize: "1.4rem", color: "var(--text-primary)" }}
            >
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>

          <button
            onClick={closeCartDrawer}
            aria-label="Close shopping bag"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-primary)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div
          style={{
            padding: "0.85rem 1.5rem",
            backgroundColor: "var(--bg-surface-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "0.4rem",
            }}
          >
            {remainingForFreeShipping === 0 ? (
              <span style={{ color: "var(--accent-wine)", fontWeight: 600 }}>
                ✓ You have unlocked Complimentary Express Shipping!
              </span>
            ) : (
              <>
                Add{" "}
                <strong>
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
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "var(--border-subtle)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "var(--accent-wine)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 className="font-serif" style={{ fontSize: "1.5rem" }}>
                Your bag is empty
              </h4>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  maxWidth: "280px",
                }}
              >
                Discover our handwoven silks, pure linens and Banarasi archives.
              </p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  onNavigate("/shop");
                }}
                className="btn-primary"
                style={{ marginTop: "0.5rem" }}
              >
                Explore Sarees
              </button>
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
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    style={{
                      width: "84px",
                      height: "112px",
                      objectFit: "cover",
                      flexShrink: 0,
                      backgroundColor: "var(--bg-primary)",
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <h5
                          onClick={() => {
                            closeCartDrawer();
                            onNavigate(`/product/${item.product.slug}`);
                          }}
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            cursor: "pointer",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.product.title}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="Remove item"
                          style={{
                            color: "var(--text-muted)",
                            padding: "2px",
                            transition: "color 0.2s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-wine)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                          marginTop: "0.2rem",
                        }}
                      >
                        {item.product.fabric} • {item.product.color}
                      </p>
                      {item.product.details.blousePiece && (
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: "0.65rem",
                            color: "var(--accent-gold)",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            marginTop: "0.2rem",
                          }}
                        >
                          + Unstitched Blouse Piece
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                      }}
                    >
                      {/* Quantity Controller */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid var(--border-medium)",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            padding: "0.25rem 0.5rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            padding: "0 0.4rem",
                            minWidth: "20px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            padding: "0.25rem 0.5rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
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
          <div
            style={{
              padding: "1.5rem",
              borderTop: "1px solid var(--border-subtle)",
              backgroundColor: "var(--bg-primary)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {formattedSubtotal}
              </span>
            </div>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <ShieldCheck size={14} style={{ color: "var(--accent-gold)" }} />
              Taxes and insured shipping calculated at checkout
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <button
                onClick={handleCheckout}
                className="btn-wine"
                style={{ width: "100%", padding: "1rem" }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button
                onClick={handleViewBag}
                className="btn-secondary"
                style={{ width: "100%", padding: "0.75rem" }}
              >
                View Bag & Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
