import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { SiteSettings } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Save, Check } from "lucide-react";

export const AdminSettingsPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { siteSettings, updateSiteSettings, resetToDefaultData } = useData();

  const [form, setForm] = useState<SiteSettings>(siteSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetData = () => {
    resetToDefaultData();
    setResetConfirm(false);
    setSaveSuccess(true);
    setForm(siteSettings);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Store Settings" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Global Atelier & Commerce Settings
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Configure brand metadata, commerce policies, and contact information.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs self-start sm:self-auto min-h-[44px]"
        >
          <Save className="w-4 h-4" /> Save All Settings
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-sm flex items-center gap-2 text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-700" />
          Settings updated successfully and synced across storefront and checkout engines!
        </div>
      )}

      {/* Brand Identity Section */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100">
          1. Brand Identity & Positioning
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Official Storefront Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm font-bold text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Brand Tagline
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Brand Slogan / Statement
            </label>
            <input
              type="text"
              value={form.slogan}
              onChange={(e) => setForm({ ...form, slogan: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>
        </div>
      </div>

      {/* Atelier Contact Details */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100">
          2. Atelier Contact & Customer Support
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Customer Support Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Support Phone Hotline
            </label>
            <input
              type="text"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              WhatsApp Concierge
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Surat Atelier Physical Address
            </label>
            <input
              type="text"
              value={form.atelierAddress}
              onChange={(e) => setForm({ ...form, atelierAddress: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>
        </div>
      </div>

      {/* Commerce & Checkout Rules */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100">
          3. Commerce & Checkout Rules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Prepaid Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={form.prepaidDiscountPercentage}
              onChange={(e) => setForm({ ...form, prepaidDiscountPercentage: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Exchange Window (Days)
            </label>
            <input
              type="number"
              min="0"
              value={form.returnWindowDays}
              onChange={(e) => setForm({ ...form, returnWindowDays: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="codActive"
              checked={form.codAvailable}
              onChange={(e) => setForm({ ...form, codAvailable: e.target.checked })}
              className="w-4 h-4 text-brand rounded-xs"
            />
            <label htmlFor="codActive" className="text-neutral-900 font-bold uppercase tracking-wider text-[11px] cursor-pointer">
              Cash on Delivery (COD) Enabled
            </label>
          </div>
        </div>
      </div>

      {/* SEO Defaults */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100">
          4. SEO Defaults & Metadata
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Default Browser Title Tag
            </label>
            <input
              type="text"
              value={form.seoDefaultTitle}
              onChange={(e) => setForm({ ...form, seoDefaultTitle: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              value={form.seoDefaultDescription}
              onChange={(e) => setForm({ ...form, seoDefaultDescription: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-brand outline-none"
            />
          </div>
        </div>
      </div>

      {/* Dangerous Reset Box */}
      <div className="bg-red-50/70 p-5 border border-red-200 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <strong className="text-xs font-bold text-red-900 block">
            Reset Demo Database to Initial State
          </strong>
          <span className="text-[11px] text-red-700 block mt-0.5">
            Clears all locally stored mutations, restores default sarees, orders, and configuration.
          </span>
        </div>

        {!resetConfirm ? (
          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            className="px-3.5 py-2 bg-white border border-red-300 text-red-700 text-xs font-semibold rounded-sm hover:bg-red-50 transition-colors shrink-0"
          >
            Reset Store Database
          </button>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setResetConfirm(false)}
              className="px-3 py-1.5 border border-neutral-300 text-neutral-700 text-xs rounded-sm bg-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleResetData}
              className="px-3 py-1.5 bg-red-700 text-white text-xs font-bold rounded-sm uppercase tracking-wider hover:bg-red-800"
            >
              Confirm Reset
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
