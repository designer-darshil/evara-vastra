import React, { useState } from "react";
import { demoOrders, Order, OrderItem } from "../data/orders";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { CheckCircle2 } from "lucide-react";

export const OrdersPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Client Account", href: "/account" }, { label: "My Orders" }]} onNavigate={onNavigate} />

        <div style={{ marginBottom: "2.5rem" }}>
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
            PURCHASE ARCHIVE
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}>
            Order History & Tracking
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic", marginTop: "0.2rem" }}>
            (Sample order records for demonstration)
          </p>
        </div>

        {/* Order Cards List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {demoOrders.map((order: Order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-subtle)",
                padding: "2rem",
              }}
            >
              {/* Order Header */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid var(--border-subtle)",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block" }}>
                    Order Placed: {order.date}
                  </span>
                  <strong style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
                    {order.orderNumber}
                  </strong>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor: "rgba(35, 78, 62, 0.1)",
                      color: "#234E3E",
                      padding: "0.35rem 0.75rem",
                    }}
                  >
                    <CheckCircle2 size={14} /> {order.status}
                  </span>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn-secondary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}
                  >
                    Track Shipment & Details
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {order.items.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "64px", height: "85px", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4
                        onClick={() => onNavigate(`/product/${item.slug}`)}
                        style={{
                          fontSize: "0.95rem",
                          color: "var(--text-primary)",
                          cursor: "pointer",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                        {item.fabric} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipment Tracking Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23,21,19,0.7)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              maxWidth: "540px",
              width: "100%",
              padding: "2.5rem",
              boxShadow: "var(--shadow-elevated)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 className="font-serif" style={{ fontSize: "1.5rem" }}>
                Shipment Tracker — {selectedOrder.orderNumber}
              </h3>
              <button onClick={() => setSelectedOrder(null)} style={{ fontSize: "1.2rem" }}>
                ✕
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Carrier: <strong>Blue Dart / DHL Express Insured</strong> • Tracking #: <strong>{selectedOrder.trackingNumber}</strong>
            </p>

            {/* Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", borderLeft: "2px solid var(--accent-wine)", paddingLeft: "1.5rem", marginLeft: "0.5rem" }}>
              <div>
                <strong style={{ fontSize: "0.85rem", color: "#234E3E", display: "block" }}>Delivered to Patron</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{selectedOrder.date} • Signed at Bandra West Residence</span>
              </div>
              <div>
                <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", display: "block" }}>Out for Delivery</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Courier Hub, Mumbai Central</span>
              </div>
              <div>
                <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", display: "block" }}>Artisanal Inspection & Packaging</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Studio Evara Quality Control Atelier</span>
              </div>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedOrder(null)} className="btn-wine">
                Close Tracker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
