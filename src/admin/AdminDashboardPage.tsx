import React from "react";
import { useData } from "../context/DataContext";
import {
  Package,
  ShoppingBag,
  AlertTriangle,
  TrendingUp,
  Plus,
  Bell,
  ArrowRight,
} from "lucide-react";

export const AdminDashboardPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { products, orders, notificationBar } = useData();

  // Metrics calculations
  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.status === "published").length;
  const draftProducts = products.filter((p) => p.status === "draft").length;
  const lowStockProducts = products.filter((p) => p.inventoryCount <= 3 && p.status === "published");
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Confirmed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Banner */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7C2430",
              display: "block",
              marginBottom: "0.2rem",
            }}
          >
            ATELIER OVERVIEW
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: 0 }}>
            Executive Dashboard
          </h1>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => onNavigate("/admin/products/new")}
            className="btn-wine"
            style={{ padding: "0.65rem 1.25rem", fontSize: "0.8rem" }}
          >
            <Plus size={15} /> Add New Saree
          </button>
          <button
            onClick={() => onNavigate("/admin/content/homepage")}
            className="btn-secondary"
            style={{ padding: "0.65rem 1.25rem", fontSize: "0.8rem" }}
          >
            Homepage CMS
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {/* Total Revenue */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.5rem",
            border: "1px solid #E5DFD5",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
              Total Demo Revenue
            </span>
            <TrendingUp size={16} style={{ color: "#234E3E" }} />
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#171513" }}>
            {formatINR(totalRevenue)}
          </div>
          <span style={{ fontSize: "0.72rem", color: "#234E3E", fontWeight: 600, display: "block", marginTop: "0.25rem" }}>
            Calculated from {totalOrders} order records
          </span>
        </div>

        {/* Orders */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.5rem",
            border: "1px solid #E5DFD5",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
              Total Orders
            </span>
            <ShoppingBag size={16} style={{ color: "#7C2430" }} />
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#171513" }}>
            {totalOrders}
          </div>
          <span style={{ fontSize: "0.72rem", color: pendingOrders > 0 ? "#7C2430" : "#6F6257", fontWeight: 600, display: "block", marginTop: "0.25rem" }}>
            {pendingOrders} awaiting fulfillment
          </span>
        </div>

        {/* Published Products */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.5rem",
            border: "1px solid #E5DFD5",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
              Catalog Sarees
            </span>
            <Package size={16} style={{ color: "#B18A52" }} />
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#171513" }}>
            {publishedProducts}
          </div>
          <span style={{ fontSize: "0.72rem", color: "#6F6257", display: "block", marginTop: "0.25rem" }}>
            {draftProducts} draft / {totalProducts} total
          </span>
        </div>

        {/* Low Stock Alerts */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.5rem",
            border: lowStockProducts.length > 0 ? "1px solid #E8C8C8" : "1px solid #E5DFD5",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
              Low Stock Alert
            </span>
            <AlertTriangle size={16} style={{ color: lowStockProducts.length > 0 ? "#7C2430" : "#234E3E" }} />
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: lowStockProducts.length > 0 ? "#7C2430" : "#171513" }}>
            {lowStockProducts.length}
          </div>
          <span style={{ fontSize: "0.72rem", color: "#6F6257", display: "block", marginTop: "0.25rem" }}>
            Sarees with ≤ 3 units remaining
          </span>
        </div>
      </div>

      {/* Live Storefront Status Banner */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "1.25rem 1.5rem",
          border: "1px solid #E5DFD5",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: notificationBar.isEnabled ? "rgba(124, 36, 48, 0.1)" : "#EFECE6",
              color: notificationBar.isEnabled ? "#7C2430" : "#8E8276",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={18} />
          </div>
          <div>
            <strong style={{ fontSize: "0.85rem", color: "#171513", display: "block" }}>
              Website Announcement Bar: {notificationBar.isEnabled ? "ACTIVE ON STOREFRONT" : "DISABLED"}
            </strong>
            <p style={{ fontSize: "0.75rem", color: "#6F6257", margin: 0 }}>
              "{notificationBar.message}"
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate("/admin/content/notification-bar")}
          className="btn-secondary"
          style={{ fontSize: "0.75rem", padding: "0.45rem 0.9rem" }}
        >
          Edit Announcement
        </button>
      </div>

      {/* Main 2-Column Section: Recent Orders & Quick Management */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr",
          gap: "2rem",
        }}
        className="admin-dashboard-grid"
      >
        {/* Left: Recent Orders Table */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5DFD5",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
              borderBottom: "1px solid #F0EAE1",
              paddingBottom: "0.75rem",
            }}
          >
            <h3 className="font-serif" style={{ fontSize: "1.3rem", margin: 0 }}>
              Recent Orders
            </h3>
            <button
              onClick={() => onNavigate("/admin/orders")}
              style={{ fontSize: "0.75rem", color: "#7C2430", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
            >
              View All Orders →
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", textAlign: "left" }}>
              <thead>
                <tr style={{ color: "#8E8276", borderBottom: "1px solid #E5DFD5" }}>
                  <th style={{ padding: "0.6rem 0.5rem" }}>ORDER</th>
                  <th style={{ padding: "0.6rem 0.5rem" }}>CUSTOMER</th>
                  <th style={{ padding: "0.6rem 0.5rem" }}>TOTAL</th>
                  <th style={{ padding: "0.6rem 0.5rem" }}>STATUS</th>
                  <th style={{ padding: "0.6rem 0.5rem", textAlign: "right" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #F4F0E8" }}>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>
                      {order.orderNumber}
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span style={{ display: "block", color: "#171513" }}>{order.customerName}</span>
                      <span style={{ fontSize: "0.7rem", color: "#8E8276" }}>{order.city}</span>
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>
                      {formatINR(order.total)}
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "0.2rem 0.5rem",
                          backgroundColor:
                            order.status === "Delivered"
                              ? "rgba(35,78,62,0.1)"
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
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>
                      <button
                        onClick={() => onNavigate(`/admin/orders/${order.id}`)}
                        style={{
                          padding: "0.3rem 0.6rem",
                          fontSize: "0.72rem",
                          border: "1px solid #D9D2C7",
                          backgroundColor: "#FAF8F5",
                          cursor: "pointer",
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Low Stock & Featured Collection Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Low Stock Watch */}
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DFD5", padding: "1.5rem" }}>
            <h3 className="font-serif" style={{ fontSize: "1.2rem", margin: "0 0 1rem 0" }}>
              Low Inventory Watch
            </h3>

            {lowStockProducts.length === 0 ? (
              <p style={{ fontSize: "0.8rem", color: "#234E3E" }}>
                ✓ All published catalog items have healthy stock levels.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.6rem 0.75rem",
                      backgroundColor: "#FAF8F5",
                      border: "1px solid #EBE5DB",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "0.8rem", color: "#171513", display: "block" }}>
                        {p.title}
                      </strong>
                      <span style={{ fontSize: "0.7rem", color: "#8E8276" }}>{p.code}</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#7C2430" }}>
                      {p.inventoryCount} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DFD5", padding: "1.5rem" }}>
            <h3 className="font-serif" style={{ fontSize: "1.2rem", margin: "0 0 1rem 0" }}>
              Quick Management
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button
                onClick={() => onNavigate("/admin/products")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.7rem 0.85rem",
                  backgroundColor: "#FAF8F5",
                  border: "1px solid #EBE5DB",
                  fontSize: "0.8rem",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span>Product Catalog & Pricing</span>
                <ArrowRight size={14} style={{ color: "#7C2430" }} />
              </button>

              <button
                onClick={() => onNavigate("/admin/content/homepage")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.7rem 0.85rem",
                  backgroundColor: "#FAF8F5",
                  border: "1px solid #EBE5DB",
                  fontSize: "0.8rem",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span>Homepage Hero & Featured Sections</span>
                <ArrowRight size={14} style={{ color: "#7C2430" }} />
              </button>

              <button
                onClick={() => onNavigate("/admin/coupons")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.7rem 0.85rem",
                  backgroundColor: "#FAF8F5",
                  border: "1px solid #EBE5DB",
                  fontSize: "0.8rem",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span>Privilege Coupons & Discounts</span>
                <ArrowRight size={14} style={{ color: "#7C2430" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
