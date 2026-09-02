import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Coupon } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Plus, Edit2, Trash2, Ticket, X } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect } from "../components/admin/ui/AdminInputs";

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
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Privilege Coupons & Discounts"
        description="Configure promotional vouchers, seasonal percentage discounts, and minimum order threshold rules."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Coupons & Promos" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {coupons.length} Vouchers
          </AdminBadge>
        }
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
          >
            <Plus className="w-4 h-4" /> Create Coupon Code
          </button>
        }
      />

      {/* 2. Responsive Grid of Coupon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {coupons.map((coupon) => (
          <AdminCard key={coupon.id} noPadding className="flex flex-col justify-between">
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#734E06]/10 text-[#734E06] flex items-center justify-center font-bold text-xs shrink-0">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="font-mono text-base font-bold text-neutral-900 block tracking-wider">
                      {coupon.code}
                    </strong>
                    <span className="text-xs text-neutral-500 block">
                      {coupon.discountType === "percentage" ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT OFF`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleActive(coupon)}
                  className="cursor-pointer"
                  title="Click to toggle voucher activation"
                >
                  <AdminBadge variant={coupon.isActive ? "success" : "neutral"} size="sm">
                    {coupon.isActive ? "Active" : "Disabled"}
                  </AdminBadge>
                </button>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xs space-y-1.5 text-xs text-neutral-700">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Min. Order Value:</span>
                  <strong className="text-neutral-900">₹{coupon.minOrderValue.toLocaleString("en-IN")}</strong>
                </div>
                {coupon.maxDiscount ? (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Max. Discount Cap:</span>
                    <strong className="text-neutral-900">₹{coupon.maxDiscount.toLocaleString("en-IN")}</strong>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span className="text-neutral-500">Expires On:</span>
                  <span className="font-mono text-neutral-800">{coupon.expiresAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Total Redeemed:</span>
                  <span className="font-bold text-[#734E06]">{coupon.usageCount || 0} times</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenModal(coupon)}
                className="h-8 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) {
                    deleteCoupon(coupon.id);
                  }
                }}
                className="h-8 w-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors"
                title="Delete Coupon"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* 3. Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
                {editingCoupon ? "Edit Coupon" : "Create Privilege Coupon"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <AdminField label="Coupon Code" required>
                <AdminInput
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. EVARA10"
                  className="uppercase font-mono font-bold"
                />
              </AdminField>

              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Discount Type" required>
                  <AdminSelect
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value as any })}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </AdminSelect>
                </AdminField>

                <AdminField label="Discount Value" required>
                  <AdminInput
                    type="number"
                    required
                    min="1"
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
                  />
                </AdminField>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Min. Order Value (₹)">
                  <AdminInput
                    type="number"
                    min="0"
                    value={form.minOrderValue}
                    onChange={(e) => setForm({ ...form, minOrderValue: Number(e.target.value) })}
                  />
                </AdminField>

                <AdminField label="Max. Discount Cap (₹)">
                  <AdminInput
                    type="number"
                    min="0"
                    value={form.maxDiscount}
                    onChange={(e) => setForm({ ...form, maxDiscount: Number(e.target.value) })}
                  />
                </AdminField>
              </div>

              <AdminField label="Expiry Date" required>
                <AdminInput
                  type="date"
                  required
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                />
              </AdminField>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                >
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
