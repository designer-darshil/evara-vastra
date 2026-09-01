import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { CraftsmanshipCMS } from "../types";
import { Save, ArrowLeft, ExternalLink, Check } from "lucide-react";

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
    <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", borderBottom: "1px solid #E5DFD5", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            type="button"
            onClick={() => onNavigate("/admin/content")}
            style={{ padding: "0.5rem 0.75rem", backgroundColor: "#FFFFFF", border: "1px solid #D9D2C7", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}
          >
            <ArrowLeft size={14} /> Content Hub
          </button>
          <div>
            <h1 className="font-serif" style={{ fontSize: "1.8rem", color: "#171513", margin: 0 }}>
              Craftsmanship & Atelier Page Editor
            </h1>
            <span style={{ fontSize: "0.75rem", color: "#8E8276" }}>
              Controls the storytelling on /craftsmanship including pit loom techniques and raw silk spinning.
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={() => onNavigate("/craftsmanship")}
            className="btn-secondary"
            style={{ padding: "0.65rem 1rem", fontSize: "0.78rem" }}
          >
            <ExternalLink size={14} /> View Live Page
          </button>
          <button type="submit" className="btn-wine" style={{ padding: "0.65rem 1.4rem", fontSize: "0.825rem" }}>
            <Save size={15} /> Save Craft Story
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: "rgba(35,78,62,0.1)", border: "1px solid #234E3E", color: "#234E3E", padding: "0.75rem 1.25rem", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Check size={16} /> Craftsmanship narrative updated successfully!
        </div>
      )}

      {/* Hero Intro */}
      <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", border: "1px solid #E5DFD5", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "#171513", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          Page Header & Manifesto
        </h3>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
            Main Headline
          </label>
          <input
            type="text"
            required
            value={form.heroHeading}
            onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
            Subhead Tagline
          </label>
          <input
            type="text"
            value={form.heroSubhead}
            onChange={(e) => setForm({ ...form, heroSubhead: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
            Intro Narrative
          </label>
          <textarea
            rows={3}
            value={form.introNarrative}
            onChange={(e) => setForm({ ...form, introNarrative: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
          />
        </div>
      </div>

      {/* 4 Craft Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.4rem", color: "#171513", margin: 0 }}>
          Generational Weaving Steps ({form.steps.length})
        </h3>

        {form.steps.map((step, idx) => (
          <div key={idx} style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", border: "1px solid #E5DFD5", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7C2430" }}>STEP {step.step || step.stepNumber || idx + 1}</span>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Step Title
                </label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => handleStepChange(idx, "title", e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Description Narrative
                </label>
                <textarea
                  rows={3}
                  value={step.description}
                  onChange={(e) => handleStepChange(idx, "description", e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                Step Photography URL
              </label>
              <input
                type="url"
                value={step.image}
                onChange={(e) => handleStepChange(idx, "image", e.target.value)}
                style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", marginBottom: "0.5rem" }}
              />
              <div style={{ aspectRatio: "16/10", overflow: "hidden", backgroundColor: "#EDE7DD", border: "1px solid #E5DFD5" }}>
                <img src={step.image} alt={step.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
