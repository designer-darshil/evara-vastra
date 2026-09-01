import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { OrderStatus } from "../types";
import { ArrowLeft } from "lucide-react";

interface AdminOrderDetailPageProps {
  orderId: string;
  onNavigate: (href: string) => void;
}

export const AdminOrderDetailPage: React.FC<AdminOrderDetailPageProps> = ({
  orderId,
  onNavigate,
}) => {
  const { orders, updateOrderStatus } = useData();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order?.status || "Confirmed");
  const [timelineNote, setTimelineNote] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  if (!order) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", backgroundColor: "var(--admin-surface)" }}>
        <h3>Order Not Found</h3>
        <button onClick={() => onNavigate("/admin/orders")} className="btn-secondary" style={{ marginTop: "1rem" }}>
          Back to Orders
        </button>
      </div>
    );
  }

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderStatus(order.id, selectedStatus, timelineNote);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => onNavigate("/admin/orders")}
            style={{
              padding: "0.5rem 0.75rem",
              backgroundColor: "var(--admin-surface)",
              border: "1px solid #D9D2C7",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.8rem",
            }}
          >
            <ArrowLeft size={14} /> Back to Orders
          </button>

          <div>
            <h1 className="font-serif" style={{ fontSize: "1.8rem", color: "var(--admin-text)", margin: 0 }}>
              Order {order.orderNumber}
            </h1>
            <span style={{ fontSize: "0.75rem", color: "#8E8276" }}>
              Placed on {order.date} • Reference ID: {order.id}
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.4rem 0.9rem",
            backgroundColor:
              order.status === "Delivered"
                ? "rgba(35,78,62,0.15)"
                : order.status === "Shipped"
                ? "rgba(177,138,82,0.2)"
                : "rgba(124,36,48,0.12)",
            color:
              order.status === "Delivered"
                ? "#234E3E"
                : order.status === "Shipped"
                ? "#8C6836"
                : "#7C2430",
          }}
        >
          STATUS: {order.status.toUpperCase()}
        </span>
      </div>

      {isSavedNotice && (
        <div style={{ backgroundColor: "rgba(35,78,62,0.1)", border: "1px solid #234E3E", color: "#234E3E", padding: "0.75rem 1.25rem", fontSize: "0.85rem", fontWeight: 600 }}>
          ✓ Order status updated successfully and synced to customer view!
        </div>
      )}

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "2rem" }} className="admin-order-detail-grid">
        {/* Left Column: Items & Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Order Items Table */}
          <div style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)", padding: "1.5rem" }}>
            <h3 className="font-serif" style={{ fontSize: "1.3rem", margin: "0 0 1rem 0" }}>
              Ordered Sarees ({order.items.length})
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #F0EAE1",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "56px", height: "74px", objectFit: "cover", backgroundColor: "#EDE7DD" }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: "0.9rem", color: "var(--admin-text)", display: "block" }}>{item.title}</strong>
                    <span style={{ fontSize: "0.75rem", color: "#8E8276" }}>{item.fabric}</span>
                    {item.blouseOptIn && (
                      <span style={{ display: "block", fontSize: "0.7rem", color: "#234E3E" }}>
                        ✓ Unstitched Blouse Included
                      </span>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--admin-text-secondary)", display: "block" }}>
                      Qty: {item.quantity} × {formatINR(item.price)}
                    </span>
                    <strong style={{ fontSize: "0.95rem", color: "var(--admin-text)" }}>
                      {formatINR(item.price * item.quantity)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div style={{ marginTop: "1rem", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", color: "var(--admin-text-secondary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Insured Express Shipping</span>
                <span style={{ color: "#234E3E" }}>{order.shippingFee === 0 ? "Complimentary" : formatINR(order.shippingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#234E3E" }}>
                  <span>Privilege Discount</span>
                  <span>- {formatINR(order.discount)}</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--admin-text)",
                  borderTop: "1px solid #E5DFD5",
                  paddingTop: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                <span>Grand Total</span>
                <span style={{ color: "#7C2430" }}>{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline Audit History */}
          <div style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)", padding: "1.5rem" }}>
            <h3 className="font-serif" style={{ fontSize: "1.3rem", margin: "0 0 1rem 0" }}>
              Fulfillment Timeline & Audit Log
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderLeft: "2px solid #7C2430", paddingLeft: "1.25rem", marginLeft: "0.5rem" }}>
              {order.timeline.map((event, idx) => (
                <div key={idx}>
                  <strong style={{ fontSize: "0.85rem", color: "var(--admin-text)", display: "block" }}>
                    {event.title}
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "#8E8276" }}>{event.timestamp}</span>
                  {event.note && (
                    <p style={{ fontSize: "0.78rem", color: "var(--admin-text-secondary)", margin: "0.2rem 0 0 0" }}>
                      "{event.note}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customer Info & Status Manager */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Status Updater Form */}
          <div style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)", padding: "1.5rem" }}>
            <h3 className="font-serif" style={{ fontSize: "1.2rem", margin: "0 0 1rem 0" }}>
              Update Order Status
            </h3>

            <form onSubmit={handleSaveStatus} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", backgroundColor: "var(--admin-surface)", fontSize: "0.85rem" }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing / Quality Check</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
                  Audit / Tracking Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Courier tracking assigned: BD-99482"
                  value={timelineNote}
                  onChange={(e) => setTimelineNote(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", fontSize: "0.8rem", outline: "none" }}
                />
              </div>

              <button type="submit" className="btn-wine" style={{ width: "100%", padding: "0.75rem", fontSize: "0.8rem" }}>
                Update Order Status
              </button>
            </form>
          </div>

          {/* Customer Info Card */}
          <div style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)", padding: "1.5rem" }}>
            <h3 className="font-serif" style={{ fontSize: "1.2rem", margin: "0 0 1rem 0" }}>
              Customer Information
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.825rem" }}>
              <div>
                <span style={{ color: "#8E8276", fontSize: "0.7rem", textTransform: "uppercase" }}>Name</span>
                <strong style={{ display: "block", color: "var(--admin-text)" }}>{order.customerName}</strong>
              </div>
              <div>
                <span style={{ color: "#8E8276", fontSize: "0.7rem", textTransform: "uppercase" }}>Email</span>
                <p style={{ color: "var(--admin-text)", margin: 0 }}>{order.customerEmail}</p>
              </div>
              <div>
                <span style={{ color: "#8E8276", fontSize: "0.7rem", textTransform: "uppercase" }}>Phone / WhatsApp</span>
                <p style={{ color: "var(--admin-text)", margin: 0 }}>{order.customerPhone}</p>
              </div>
              <div>
                <span style={{ color: "#8E8276", fontSize: "0.7rem", textTransform: "uppercase" }}>Delivery Address</span>
                <p style={{ color: "var(--admin-text)", margin: 0, lineHeight: 1.4 }}>
                  {order.shippingAddress},<br />
                  {order.city}, {order.state} — {order.pincode}, {order.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-order-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
