import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { HomepageCMS } from "../types";
import { Save, ExternalLink, Check } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect, AdminTextarea } from "../components/admin/ui/AdminInputs";

export const AdminHomepageCMSPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { homepageCMS, updateHomepageCMS, collections } = useData();

  const [form, setForm] = useState<HomepageCMS>(homepageCMS);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageCMS(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleToggleSection = (sectionKey: keyof typeof form.sectionVisibility) => {
    setForm((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionKey]: !prev.sectionVisibility[sectionKey],
      },
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Homepage Visual CMS & Layout"
        description="Controls hero banner imagery, seasonal headline words, featured collection spotlight, and section toggles."
        actions={
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate("/")}
              className="h-10 px-3.5 border border-neutral-300 hover:bg-neutral-50 rounded-sm text-xs font-semibold text-neutral-800 flex items-center gap-1.5 transition-colors min-h-[40px]"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Storefront
            </button>
            <button
              type="submit"
              className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center gap-1.5 min-h-[40px]"
            >
              <Save className="w-4 h-4" /> Save Homepage CMS
            </button>
          </div>
        }
      />

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-sm text-sm font-semibold flex items-center gap-2.5">
          <Check className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Homepage content updated successfully and reflected live across the storefront!</span>
        </div>
      )}

      {/* 1. Hero Section Content */}
      <AdminCard title="1. Hero Banner & Headline Typography">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminField label="Hero Heading Lead" required>
              <AdminInput
                required
                value={form.heroHeading}
                onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
                placeholder="Royal Banarasi & Surat Heritage"
              />
            </AdminField>

            <AdminField label="Hero Accent Word" required>
              <AdminInput
                required
                value={form.heroAccentWord}
                onChange={(e) => setForm({ ...form, heroAccentWord: e.target.value })}
                placeholder="Heirlooms"
                className="text-[#734E06] font-bold"
              />
            </AdminField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminField label="Hero Season Badge Tag">
              <AdminInput
                value={form.heroBadge}
                onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
                placeholder="Festive Edit 2026"
              />
            </AdminField>

            <AdminField label="Hero Cover Image URL" required>
              <AdminInput
                type="url"
                required
                value={form.heroImage}
                onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                placeholder="https://..."
              />
            </AdminField>
          </div>

          <AdminField label="Hero Subheading Narrative">
            <AdminTextarea
              rows={2}
              value={form.heroSubheading}
              onChange={(e) => setForm({ ...form, heroSubheading: e.target.value })}
              placeholder="Handcrafted pure silk sarees woven by master artisans..."
            />
          </AdminField>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminField label="Primary CTA Text">
              <AdminInput
                value={form.primaryCtaText}
                onChange={(e) => setForm({ ...form, primaryCtaText: e.target.value })}
              />
            </AdminField>
            <AdminField label="Primary CTA Link">
              <AdminInput
                value={form.primaryCtaLink}
                onChange={(e) => setForm({ ...form, primaryCtaLink: e.target.value })}
              />
            </AdminField>
            <AdminField label="Secondary CTA Text">
              <AdminInput
                value={form.secondaryCtaText}
                onChange={(e) => setForm({ ...form, secondaryCtaText: e.target.value })}
              />
            </AdminField>
            <AdminField label="Secondary CTA Link">
              <AdminInput
                value={form.secondaryCtaLink}
                onChange={(e) => setForm({ ...form, secondaryCtaLink: e.target.value })}
              />
            </AdminField>
          </div>
        </div>
      </AdminCard>

      {/* 2. Featured Collection Section */}
      <AdminCard title="2. Featured Collection Spotlight">
        <AdminField label="Select Spotlight Collection">
          <AdminSelect
            value={form.featuredCollectionSlug}
            onChange={(e) => setForm({ ...form, featuredCollectionSlug: e.target.value })}
          >
            {collections.map((col) => (
              <option key={col.id} value={col.slug}>
                {col.title} ({col.season})
              </option>
            ))}
          </AdminSelect>
        </AdminField>
      </AdminCard>

      {/* 3. Brand Story Manifesto */}
      <AdminCard title="3. Brand Story Manifesto Section">
        <div className="space-y-4">
          <AdminField label="Manifesto Quote Headline">
            <AdminInput
              value={form.manifestoQuote}
              onChange={(e) => setForm({ ...form, manifestoQuote: e.target.value })}
            />
          </AdminField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminField label="Paragraph 1">
              <AdminTextarea
                rows={3}
                value={form.manifestoNarrative1}
                onChange={(e) => setForm({ ...form, manifestoNarrative1: e.target.value })}
              />
            </AdminField>
            <AdminField label="Paragraph 2">
              <AdminTextarea
                rows={3}
                value={form.manifestoNarrative2}
                onChange={(e) => setForm({ ...form, manifestoNarrative2: e.target.value })}
              />
            </AdminField>
          </div>
        </div>
      </AdminCard>

      {/* 4. Section Visibility Toggles */}
      <AdminCard title="4. Homepage Section Visibility Controls">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(form.sectionVisibility).map(([secKey, isVisible]) => (
            <label
              key={secKey}
              className={`flex items-center justify-between p-3.5 border rounded-xs cursor-pointer transition-colors ${
                isVisible ? "bg-amber-50/50 border-[#734E06]/30 text-neutral-900" : "bg-neutral-50 border-neutral-200 text-neutral-600"
              }`}
            >
              <span className="text-xs font-semibold capitalize">
                {secKey.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => handleToggleSection(secKey as any)}
                className="w-4 h-4 text-[#734E06] rounded-xs"
              />
            </label>
          ))}
        </div>
      </AdminCard>
    </form>
  );
};
