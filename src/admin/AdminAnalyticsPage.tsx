import React from "react";
import { useData } from "../context/DataContext";
import { AlertCircle } from "lucide-react";

export const AdminAnalyticsPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
  const { orders, products, categories, customers } = useData();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  // Group by payment method
  const paymentBreakdown = orders.reduce((acc: Record<string, number>, o) => {
    const key = o.paymentMethod.split("(")[0].trim();
    acc[key] = (acc[key] || 0) + o.total;
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
          TRANSPARENT COMMERCE METRICS
        </span>
        <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
          Store Performance & Intelligence
        </h1>
      </div>

      {/* Honest Integration Notice */}
      <div
        style={{
          backgroundColor: "#FAF8F5",
          padding: "1rem 1.25rem",
          border: "1px solid #E5DFD5",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.8rem",
          color: "#6F6257",
        }}
      >
        <AlertCircle size={18} style={{ color: "#B18A52", flexShrink: 0 }} />
        <span>
          <strong>Data Note:</strong> The figures below represent real transaction metrics computed directly from your local demo orders and catalog records. External third-party Google Analytics / Meta Pixel integrations are currently disconnected.
        </span>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", border: "1px solid #E5DFD5" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
            Total Store Revenue
          </span>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#171513", marginTop: "0.25rem" }}>
            {formatINR(totalRevenue)}
          </div>
          <span style={{ fontSize: "0.72rem", color: "#234E3E" }}>From {totalOrders} total completed orders</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", border: "1px solid #E5DFD5" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
            Average Order Value (AOV)
          </span>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#171513", marginTop: "0.25rem" }}>
            {formatINR(avgOrderValue)}
          </div>
          <span style={{ fontSize: "0.72rem", color: "#6F6257" }}>Per transaction basket</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", border: "1px solid #E5DFD5" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
            Total Sarees Sold
          </span>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#171513", marginTop: "0.25rem" }}>
            {totalItemsSold} units
          </div>
          <span style={{ fontSize: "0.72rem", color: "#6F6257" }}>Across all handloom fabrics</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", border: "1px solid #E5DFD5" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257" }}>
            Active Registered Patrons
          </span>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#171513", marginTop: "0.25rem" }}>
            {customers.length}
          </div>
          <span style={{ fontSize: "0.72rem", color: "#6F6257" }}>Client directory profiles</span>
        </div>
      </div>

      {/* Breakdown Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="admin-analytics-grid">
        {/* Payment Channels */}
        <div style={{ backgroundColor: "#FFFFFF", padding: "1.75rem", border: "1px solid #E5DFD5" }}>
          <h3 className="font-serif" style={{ fontSize: "1.3rem", margin: "0 0 1rem 0" }}>
            Revenue by Payment Method
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {Object.entries(paymentBreakdown).map(([method, amt]) => {
              const pct = totalRevenue > 0 ? Math.round((amt / totalRevenue) * 100) : 0;
              return (
                <div key={method} style={{ padding: "0.75rem", backgroundColor: "#FAF8F5", border: "1px solid #EBE5DB" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", fontSize: "0.85rem" }}>
                    <strong>{method}</strong>
                    <span>{formatINR(amt)} ({pct}%)</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", backgroundColor: "#E5DFD5" }}>
                    <div style={{ width: `${pct}%`, height: "100%", backgroundColor: "#7C2430" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Coverage */}
        <div style={{ backgroundColor: "#FFFFFF", padding: "1.75rem", border: "1px solid #E5DFD5" }}>
          <h3 className="font-serif" style={{ fontSize: "1.3rem", margin: "0 0 1rem 0" }}>
            Catalog Distribution by Fabric
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.slug).length;
              return (
                <div key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.75rem", backgroundColor: "#FAF8F5", border: "1px solid #EBE5DB", fontSize: "0.85rem" }}>
                  <span>{cat.name}</span>
                  <strong style={{ color: "#7C2430" }}>{count} saree(s)</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .admin-analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
