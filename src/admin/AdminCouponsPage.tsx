import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Coupon } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const AdminCouponsPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    minOrderValue: 5000,
    maxDiscount: 3000,
    expiresAt: "2026-12-31",
    isActive: true,
  });

  const handleOpenModal = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setForm({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderValue: coupon.minOrderValue,
        maxDiscount: coupon.maxDiscount || 0,
        expiresAt: coupon.expiresAt,
        isActive: coupon.isActive,
      });
    } else {
      setEditingCoupon(null);
      setForm({
        code: "",
        discountType: "percentage",
        discountValue: 10,
        minOrderValue: 5000,
        maxDiscount: 3000,
        expiresAt: "2026-12-31",
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code) return;

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, form);
    } else {
      addCoupon({ ...form, usageCount: 0 });
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (coupon: Coupon) => {
    updateCoupon(coupon.id, { isActive: !coupon.isActive });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
            MERCHANDISING & PROMOTIONS
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
            Privilege Coupons & Discounts ({coupons.length})
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#8E8276", margin: "0.25rem 0 0 0" }}>
            Validated in real-time during customer checkout.
          </p>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-wine" style={{ padding: "0.75rem 1.35rem", fontSize: "0.825rem" }}>
          <Plus size={16} /> Create Coupon Code
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5DFD5",
              padding: "1.5rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#171513",
                    backgroundColor: "rgba(124, 36, 48, 0.08)",
                    padding: "0.3rem 0.6rem",
                    border: "1px dashed #7C2430",
                  }}
                >
                  {coupon.code}
                </span>

                <button
                  onClick={() => handleToggleActive(coupon)}
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.5rem",
                    backgroundColor: coupon.isActive ? "rgba(35,78,62,0.12)" : "#EFECE6",
                    color: coupon.isActive ? "#234E3E" : "#6F6257",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {coupon.isActive ? "ACTIVE" : "PAUSED"}
                </button>
              </div>

              <div style={{ fontSize: "0.85rem", color: "#6F6257", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                <div>
                  <strong>Discount:</strong>{" "}
                  {coupon.discountType === "percentage" ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                </div>
                <div>
                  <strong>Min Order:</strong> ₹{coupon.minOrderValue.toLocaleString("en-IN")}
                </div>
                {coupon.maxDiscount ? (
                  <div>
                    <strong>Max Discount Cap:</strong> ₹{coupon.maxDiscount.toLocaleString("en-IN")}
                  </div>
                ) : null}
                <div>
                  <strong>Expires:</strong> {coupon.expiresAt}
                </div>
                <div style={{ color: "#8E8276", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                  Used {coupon.usageCount} time(s) in demo
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid #F0EAE1" }}>
              <button
                onClick={() => handleOpenModal(coupon)}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", border: "1px solid #D9D2C7", backgroundColor: "#FAF8F5", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                <Edit2 size={12} /> Edit
              </button>
              <button
                onClick={() => deleteCoupon(coupon.id)}
                style={{ padding: "0.4rem", color: "#7C2430", border: "1px solid #E8C8C8", backgroundColor: "#FAF8F5", cursor: "pointer" }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif" style={{ fontSize: "1.5rem", margin: "0 0 1.25rem 0" }}>
              {editingCoupon ? "Edit Coupon Code" : "Create New Coupon Code"}
            </h3>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Coupon Promo Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EVARA15"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", textTransform: "uppercase", fontWeight: 700 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Discount Type
                  </label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value as any })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    value={form.minOrderValue}
                    onChange={(e) => setForm({ ...form, minOrderValue: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-wine" style={{ padding: "0.6rem 1.25rem" }}>
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
