import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Order, OrderStatus } from "../types";
import { Search, Trash2 } from "lucide-react";

export const AdminOrdersPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { orders, updateOrderStatus, deleteOrder } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [statusModalOrder, setStatusModalOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>("Confirmed");
  const [statusNote, setStatusNote] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedStatus !== "all" && o.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [orders, searchQuery, selectedStatus]);

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const handleOpenStatusModal = (order: Order) => {
    setStatusModalOrder(order);
    setNewStatus(order.status);
    setStatusNote("");
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalOrder) return;
    updateOrderStatus(statusModalOrder.id, newStatus, statusNote);
    setStatusModalOrder(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
          FULFILLMENT & TRANSACTIONS
        </span>
        <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "var(--admin-text)", margin: "0.2rem 0 0 0" }}>
          Order Management ({orders.length})
        </h1>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: "var(--admin-surface)",
          padding: "1rem 1.25rem",
          border: "1px solid var(--admin-border)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: "240px" }}>
          <Search size={16} style={{ color: "#9A8F83" }} />
          <input
            type="text"
            placeholder="Search by order #, customer, email, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", border: "none", outline: "none", fontSize: "0.85rem", backgroundColor: "transparent" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--admin-text-secondary)", textTransform: "uppercase" }}>
            Status:
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: "0.45rem 0.75rem", border: "1px solid #D9D2C7", backgroundColor: "var(--admin-surface-subtle)", fontSize: "0.8rem", outline: "none" }}
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--admin-surface-subtle)", color: "var(--admin-text-secondary)", borderBottom: "1px solid var(--admin-border)" }}>
              <th style={{ padding: "0.85rem 1rem" }}>ORDER #</th>
              <th style={{ padding: "0.85rem 1rem" }}>DATE</th>
              <th style={{ padding: "0.85rem 1rem" }}>CUSTOMER</th>
              <th style={{ padding: "0.85rem 1rem" }}>ITEMS</th>
              <th style={{ padding: "0.85rem 1rem" }}>TOTAL</th>
              <th style={{ padding: "0.85rem 1rem" }}>PAYMENT</th>
              <th style={{ padding: "0.85rem 1rem" }}>STATUS</th>
              <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "3rem", textAlign: "center", color: "#8E8276" }}>
                  No order records match the selected filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #F2EEE6" }}>
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "var(--admin-text)" }}>
                    {order.orderNumber}
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "var(--admin-text-secondary)" }}>
                    {order.date}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <strong style={{ display: "block", color: "var(--admin-text)" }}>{order.customerName}</strong>
                    <span style={{ fontSize: "0.72rem", color: "#8E8276" }}>{order.city}</span>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "var(--admin-text-secondary)" }}>
                    {order.items.reduce((s, i) => s + i.quantity, 0)} saree(s)
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "var(--admin-text)" }}>
                    {formatINR(order.total)}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: order.paymentStatus === "Paid" ? "#234E3E" : "#7C2430",
                      }}
                    >
                      ● {order.paymentStatus}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#8E8276", display: "block" }}>
                      {order.paymentMethod.split("(")[0]}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <button
                      onClick={() => handleOpenStatusModal(order)}
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.25rem 0.55rem",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor:
                          order.status === "Delivered"
                            ? "rgba(35,78,62,0.12)"
                            : order.status === "Shipped"
                            ? "rgba(177,138,82,0.15)"
                            : "rgba(124,36,48,0.1)",
                        color:
                          order.status === "Delivered"
                            ? "#234E3E"
                            : order.status === "Shipped"
                            ? "#8C6836"
                            : "#7C2430",
                      }}
                    >
                      {order.status} ▾
                    </button>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <button
                        onClick={() => onNavigate(`/admin/orders/${order.id}`)}
                        title="View Full Order Detail"
                        style={{
                          padding: "0.4rem 0.65rem",
                          fontSize: "0.75rem",
                          border: "1px solid #D9D2C7",
                          backgroundColor: "var(--admin-surface-subtle)",
                          cursor: "pointer",
                        }}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        title="Delete Order Record"
                        style={{
                          padding: "0.4rem",
                          color: "#7C2430",
                          border: "1px solid #E8C8C8",
                          backgroundColor: "var(--admin-surface-subtle)",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Status Update Modal */}
      {statusModalOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setStatusModalOrder(null)}
        >
          <div
            style={{
              backgroundColor: "var(--admin-surface)",
              padding: "2rem",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif" style={{ fontSize: "1.4rem", margin: "0 0 0.5rem 0" }}>
              Update Status: {statusModalOrder.orderNumber}
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--admin-text-secondary)", marginBottom: "1.25rem" }}>
              Customer: <strong>{statusModalOrder.customerName}</strong> ({statusModalOrder.customerEmail})
            </p>

            <form onSubmit={handleUpdateStatus} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
                  New Order Status *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", backgroundColor: "var(--admin-surface)" }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing / Craft Inspection</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
                  Status Timeline Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dispatched with Blue Dart express airway bill 88291..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setStatusModalOrder(null)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-wine" style={{ padding: "0.6rem 1.25rem" }}>
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
