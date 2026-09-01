import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Coupon } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Plus, Edit2, Trash2, Ticket, X } from "lucide-react";

export const AdminCouponsPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Coupons & Promos" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Privilege Coupons & Discounts ({coupons.length})
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time validation during checkout with minimum order threshold enforcement.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs self-start sm:self-auto min-h-[44px]"
        >
          <Plus className="w-4 h-4" /> Create Coupon Code
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center text-brand">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="font-mono text-base font-bold text-neutral-900 tracking-wider">
                      {coupon.code}
                    </strong>
                    <span className="text-[10px] text-neutral-400 block">ID: {coupon.id}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleActive(coupon)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border cursor-pointer ${
                    coupon.isActive
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-neutral-100 text-neutral-500 border-neutral-200"
                  }`}
                >
                  {coupon.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-100 space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-neutral-900">
                  <span>Discount Value:</span>
                  <span className="text-brand">
                    {coupon.discountType === "percentage" ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Min. Order Requirement:</span>
                  <span className="font-mono">₹{coupon.minOrderValue.toLocaleString("en-IN")}</span>
                </div>
                {coupon.maxDiscount && coupon.maxDiscount > 0 ? (
                  <div className="flex justify-between text-neutral-600">
                    <span>Max Cap Discount:</span>
                    <span className="font-mono">₹{coupon.maxDiscount.toLocaleString("en-IN")}</span>
                  </div>
                ) : null}
                <div className="flex justify-between text-neutral-500 pt-1 border-t border-neutral-200">
                  <span>Expiration Date:</span>
                  <span className="font-mono">{coupon.expiresAt}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-500 text-[11px]">
                Redeemed: <strong>{coupon.usageCount} times</strong>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenModal(coupon)}
                  className="p-1.5 text-neutral-600 hover:text-brand hover:bg-neutral-100 rounded-sm transition-colors"
                  title="Edit Coupon"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCoupon(coupon.id)}
                  className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-neutral-900 text-base m-0">
                  {editingCoupon ? "Edit Coupon Code" : "Create New Coupon"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Coupon Code (UPPERCASE)
                </label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase().replace(/\s+/g, "") })}
                  placeholder="e.g. FESTIVE20"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-sm font-mono font-bold focus:bg-white focus:border-brand outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed INR (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs font-bold focus:bg-white focus:border-brand outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Min. Order Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.minOrderValue}
                    onChange={(e) => setForm({ ...form, minOrderValue: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Max. Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.maxDiscount}
                    onChange={(e) => setForm({ ...form, maxDiscount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="couponActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 text-brand rounded-xs"
                />
                <label htmlFor="couponActive" className="text-neutral-700 font-medium cursor-pointer">
                  Coupon is Active and usable at Checkout
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-brand-foreground text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-hover transition-colors"
                >
                  {editingCoupon ? "Save Changes" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
