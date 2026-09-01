import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { NotificationBarConfig } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Save, ExternalLink, Check, Sparkles } from "lucide-react";

export const AdminNotificationBarPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { notificationBar, updateNotificationBar } = useData();

  const [form, setForm] = useState<NotificationBarConfig>(notificationBar);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotificationBar(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Notification Bar" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Storefront Announcement Bar Configuration
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Dynamically broadcast sitewide promotional banners, offers, and delivery assurances.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("/")}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:border-neutral-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Preview Storefront
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" /> Save Banner
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-sm flex items-center gap-2 text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-700" />
          Notification ribbon updated successfully and synced across all storefront pages!
        </div>
      )}

      {/* Live Preview Box */}
      <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Live Storefront Simulation
          </span>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${
            form.isEnabled ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-neutral-100 text-neutral-600"
          }`}>
            {form.isEnabled ? "Broadcasting Enabled" : "Ribbon Hidden"}
          </span>
        </div>

        <div
          className={`py-2.5 px-4 text-center text-xs flex items-center justify-center gap-2 rounded-xs transition-colors ${
            form.backgroundStyle === "wine"
              ? "bg-[#734E06] text-white"
              : form.backgroundStyle === "gold"
              ? "bg-[#B18A52] text-white"
              : "bg-[#141210] text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span className="font-medium tracking-wide">
            {form.message || "Enter your announcement text below..."}
          </span>
          {form.link && (
            <span className="underline font-bold text-amber-200 uppercase text-[11px] ml-1">
              {form.linkText || "Shop Now →"}
            </span>
          )}
        </div>
      </div>

      {/* Form Settings */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
          <input
            type="checkbox"
            id="isEnabledCheckbox"
            checked={form.isEnabled}
            onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })}
            className="w-4 h-4 text-brand rounded-xs"
          />
          <label htmlFor="isEnabledCheckbox" className="text-xs font-bold uppercase tracking-wider text-neutral-900 cursor-pointer">
            Enable Announcement Ribbon on Storefront
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            Announcement Message Text
          </label>
          <input
            type="text"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="e.g. COMPLIMENTARY EXPRESS SHIPPING ACROSS INDIA • COD AVAILABLE"
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Call-to-Action Link (Optional)
            </label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="e.g. /shop or /collections/banarasi"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              CTA Link Button Label
            </label>
            <input
              type="text"
              value={form.linkText}
              onChange={(e) => setForm({ ...form, linkText: e.target.value })}
              placeholder="e.g. EXPLORE NOW →"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Visual Theme & Background Accent
            </label>
            <select
              value={form.backgroundStyle}
              onChange={(e) => setForm({ ...form, backgroundStyle: e.target.value as any })}
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 text-xs focus:bg-white focus:border-brand outline-none cursor-pointer"
            >
              <option value="wine">Evara Brand Warm Gold (#734E06)</option>
              <option value="gold">Antique Gold Zari (#B18A52)</option>
              <option value="dark">Solid Charcoal Black (#141210)</option>
            </select>
          </div>

          <div className="flex flex-col justify-end space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isDismissible}
                onChange={(e) => setForm({ ...form, isDismissible: e.target.checked })}
                className="w-4 h-4 text-brand rounded-xs"
              />
              Allow Shoppers to Dismiss Ribbon
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
