import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { CraftsmanshipCMS } from "../types";
import { Save, ExternalLink, Check } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminTextarea } from "../components/admin/ui/AdminInputs";

export const AdminCraftsmanshipCMSPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { craftsmanshipCMS, updateCraftsmanshipCMS } = useData();
  const [form, setForm] = useState<CraftsmanshipCMS>(craftsmanshipCMS);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCraftsmanshipCMS(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleStepChange = (index: number, field: string, value: string) => {
    const updated = [...form.steps];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, steps: updated });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Craftsmanship & Atelier Page Editor"
        description="Controls storytelling on /craftsmanship including pit loom techniques, pure zari sourcing, and workshop photography."
        actions={
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate("/craftsmanship")}
              className="h-10 px-3.5 border border-neutral-300 hover:bg-neutral-50 rounded-sm text-xs font-semibold text-neutral-800 flex items-center gap-1.5 transition-colors min-h-[40px]"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live Page
            </button>
            <button
              type="submit"
              className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center gap-1.5 min-h-[40px]"
            >
              <Save className="w-4 h-4" /> Save Craft Story
            </button>
          </div>
        }
      />

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-sm text-sm font-semibold flex items-center gap-2.5">
          <Check className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Craftsmanship narrative updated successfully and published live!</span>
        </div>
      )}

      {/* 1. Page Header & Manifesto */}
      <AdminCard title="1. Page Header & Editorial Manifesto">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminField label="Main Headline" required>
              <AdminInput
                required
                value={form.heroHeading}
                onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
              />
            </AdminField>

            <AdminField label="Subhead Tagline">
              <AdminInput
                value={form.heroSubhead}
                onChange={(e) => setForm({ ...form, heroSubhead: e.target.value })}
              />
            </AdminField>
          </div>

          <AdminField label="Manifesto Paragraph">
            <AdminTextarea
              rows={3}
              value={form.manifesto}
              onChange={(e) => setForm({ ...form, manifesto: e.target.value })}
            />
          </AdminField>
        </div>
      </AdminCard>

      {/* 2. Process Steps */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
          2. Weaving Process Steps & Stages
        </h3>

        <div className="space-y-4">
          {form.steps.map((step, idx) => (
            <AdminCard key={idx} title={`Stage ${idx + 1}: ${step.title}`}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AdminField label="Step Title" required>
                    <AdminInput
                      required
                      value={step.title}
                      onChange={(e) => handleStepChange(idx, "title", e.target.value)}
                    />
                  </AdminField>

                  <AdminField label="Visual Image URL" required>
                    <AdminInput
                      type="url"
                      required
                      value={step.image}
                      onChange={(e) => handleStepChange(idx, "image", e.target.value)}
                    />
                  </AdminField>
                </div>

                <AdminField label="Craft Description">
                  <AdminTextarea
                    rows={3}
                    value={step.description}
                    onChange={(e) => handleStepChange(idx, "description", e.target.value)}
                  />
                </AdminField>
              </div>
            </AdminCard>
          ))}
        </div>
      </div>
    </form>
  );
};
