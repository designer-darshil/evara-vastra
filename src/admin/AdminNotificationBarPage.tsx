import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { NotificationBarConfig } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Save, ExternalLink, Check, Sparkles } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect } from "../components/admin/ui/AdminInputs";
import { AdminBadge } from "../components/admin/ui/AdminBadge";

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
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Storefront Announcement Bar"
        description="Dynamically broadcast sitewide promotional banners, seasonal offers, and shipping assurances."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Notification Bar" }]}
            onNavigate={onNavigate}
          />
        }
        actions={
          <div className="flex items-center gap-2.5 flex-wrap">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("/")}
                className="h-10 px-3.5 border border-neutral-300 hover:bg-neutral-50 rounded-sm text-xs font-semibold text-neutral-800 flex items-center gap-1.5 transition-colors min-h-[40px]"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Preview Storefront
              </button>
            )}
            <button
              type="submit"
              className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center gap-1.5 min-h-[40px]"
            >
              <Save className="w-4 h-4" /> Save Banner
            </button>
          </div>
        }
      />

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-sm text-sm font-semibold flex items-center gap-2.5">
          <Check className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Notification ribbon updated successfully and synced across all storefront pages!</span>
        </div>
      )}

      {/* 2. Live Simulation Preview */}
      <AdminCard
        title="Live Storefront Simulation"
        action={
          <AdminBadge variant={form.isEnabled ? "success" : "neutral"} size="sm">
            {form.isEnabled ? "Broadcasting Live" : "Ribbon Hidden"}
          </AdminBadge>
        }
      >
        <div
          className={`py-3 px-4 text-center text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xs transition-colors shadow-2xs ${
            form.backgroundStyle === "wine"
              ? "bg-[#734E06] text-white"
              : form.backgroundStyle === "gold"
              ? "bg-[#B18A52] text-white"
              : "bg-[#141210] text-white"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
          <span className="font-medium tracking-wide">
            {form.message || "Enter your announcement text below..."}
          </span>
          {form.link && (
            <span className="underline font-bold text-amber-200 uppercase text-xs ml-1.5 cursor-pointer">
              {form.linkText || "Shop Now →"}
            </span>
          )}
        </div>
      </AdminCard>

      {/* 3. Form Configuration */}
      <AdminCard title="Broadcast Settings">
        <div className="space-y-4">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-neutral-900 font-bold select-none">
            <input
              type="checkbox"
              checked={form.isEnabled}
              onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })}
              className="w-4 h-4 text-[#734E06] rounded-xs"
            />
            <span>Enable Announcement Bar across all Storefront Pages</span>
          </label>

          <AdminField label="Announcement Message" required>
            <AdminInput
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="e.g. COMPLIMENTARY ALL-INDIA EXPRESS SHIPPING ON ALL HANDLOOM ORDERS"
            />
          </AdminField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminField label="Target Destination URL">
              <AdminInput
                value={form.link || ""}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="/shop or /collection/silk-edit"
              />
            </AdminField>

            <AdminField label="CTA Link Text">
              <AdminInput
                value={form.linkText || ""}
                onChange={(e) => setForm({ ...form, linkText: e.target.value })}
                placeholder="Explore Sarees →"
              />
            </AdminField>
          </div>

          <AdminField label="Visual Background Accent">
            <AdminSelect
              value={form.backgroundStyle}
              onChange={(e) => setForm({ ...form, backgroundStyle: e.target.value as any })}
            >
              <option value="dark">Atelier Noir (#141210)</option>
              <option value="wine">Brand Rich Ochre / Antique Gold (#734E06)</option>
              <option value="gold">Zari Gold (#B18A52)</option>
            </AdminSelect>
          </AdminField>
        </div>
      </AdminCard>
    </form>
  );
};
