import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { HomepageCMS } from "../types";
import { Save, ArrowLeft, ExternalLink, Check } from "lucide-react";

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
    <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", borderBottom: "1px solid var(--admin-border)", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            type="button"
            onClick={() => onNavigate("/admin/content")}
            style={{ padding: "0.5rem 0.75rem", backgroundColor: "var(--admin-surface)", border: "1px solid #D9D2C7", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}
          >
            <ArrowLeft size={14} /> Content Hub
          </button>
          <div>
            <h1 className="font-serif" style={{ fontSize: "1.8rem", color: "var(--admin-text)", margin: 0 }}>
              Homepage CMS & Visual Layout
            </h1>
            <span style={{ fontSize: "0.75rem", color: "#8E8276" }}>
              Controls hero imagery, editorial quotes, featured curations, and section visibility.
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="btn-secondary"
            style={{ padding: "0.65rem 1rem", fontSize: "0.78rem" }}
          >
            <ExternalLink size={14} /> View Live Storefront
          </button>
          <button type="submit" className="btn-wine" style={{ padding: "0.65rem 1.4rem", fontSize: "0.825rem" }}>
            <Save size={15} /> Save Homepage CMS
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: "rgba(35,78,62,0.1)", border: "1px solid #234E3E", color: "#234E3E", padding: "0.75rem 1.25rem", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Check size={16} /> Homepage content updated successfully and reflected on the live storefront!
        </div>
      )}

      {/* 1. Hero Section Content */}
      <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "var(--admin-text)", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          1. Hero Banner & Typography
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Hero Heading Lead *
            </label>
            <input
              type="text"
              required
              value={form.heroHeading}
              onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Hero Accent Highlight Word *
            </label>
            <input
              type="text"
              required
              value={form.heroAccentWord}
              onChange={(e) => setForm({ ...form, heroAccentWord: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", color: "#7C2430", fontWeight: 700 }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Hero Season Badge Tag
            </label>
            <input
              type="text"
              value={form.heroBadge}
              onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Hero Image URL *
            </label>
            <input
              type="url"
              required
              value={form.heroImage}
              onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
            Hero Subheading Narrative
          </label>
          <textarea
            rows={2}
            value={form.heroSubheading}
            onChange={(e) => setForm({ ...form, heroSubheading: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Primary CTA Text
            </label>
            <input
              type="text"
              value={form.primaryCtaText}
              onChange={(e) => setForm({ ...form, primaryCtaText: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Primary CTA Link
            </label>
            <input
              type="text"
              value={form.primaryCtaLink}
              onChange={(e) => setForm({ ...form, primaryCtaLink: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Secondary CTA Text
            </label>
            <input
              type="text"
              value={form.secondaryCtaText}
              onChange={(e) => setForm({ ...form, secondaryCtaText: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Secondary CTA Link
            </label>
            <input
              type="text"
              value={form.secondaryCtaLink}
              onChange={(e) => setForm({ ...form, secondaryCtaLink: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
        </div>
      </div>

      {/* 2. Featured Collection Section */}
      <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "var(--admin-text)", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          2. Featured Collection Spotlight
        </h3>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
            Select Spotlight Collection
          </label>
          <select
            value={form.featuredCollectionSlug}
            onChange={(e) => setForm({ ...form, featuredCollectionSlug: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", backgroundColor: "var(--admin-surface)" }}
          >
            {collections.map((col) => (
              <option key={col.id} value={col.slug}>
                {col.title} ({col.season})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Brand Story Manifesto */}
      <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "var(--admin-text)", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          3. Brand Story Manifesto Section
        </h3>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
            Manifesto Quote Headline
          </label>
          <input
            type="text"
            value={form.manifestoQuote}
            onChange={(e) => setForm({ ...form, manifestoQuote: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Paragraph 1
            </label>
            <textarea
              rows={3}
              value={form.manifestoNarrative1}
              onChange={(e) => setForm({ ...form, manifestoNarrative1: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Paragraph 2
            </label>
            <textarea
              rows={3}
              value={form.manifestoNarrative2}
              onChange={(e) => setForm({ ...form, manifestoNarrative2: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
        </div>
      </div>

      {/* 4. Section Visibility Toggles */}
      <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "var(--admin-text)", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          4. Homepage Section Visibility Controls
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {Object.entries(form.sectionVisibility).map(([secKey, isVisible]) => (
            <label
              key={secKey}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1rem",
                backgroundColor: isVisible ? "#FAF8F5" : "#F4F1EA",
                border: isVisible ? "1px solid #D9D2C7" : "1px solid #E0DBD0",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "0.825rem", textTransform: "capitalize", fontWeight: isVisible ? 600 : 400 }}>
                {secKey.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => handleToggleSection(secKey as any)}
                style={{ accentColor: "#7C2430", width: "16px", height: "16px" }}
              />
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};
