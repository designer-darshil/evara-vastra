import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { SiteSettings } from "../types";
import { Save, Check, RefreshCw } from "lucide-react";

export const AdminSettingsPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
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
    <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", borderBottom: "1px solid var(--admin-border)", paddingBottom: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
            STOREFRONT CONFIGURATION
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "var(--admin-text)", margin: "0.2rem 0 0 0" }}>
            Atelier Settings
          </h1>
        </div>

        <button type="submit" className="btn-wine" style={{ padding: "0.65rem 1.4rem", fontSize: "0.825rem" }}>
          <Save size={15} /> Save All Settings
        </button>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: "rgba(35,78,62,0.1)", border: "1px solid #234E3E", color: "#234E3E", padding: "0.75rem 1.25rem", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Check size={16} /> Store settings updated and synced across all storefront pages!
        </div>
      )}

      {/* Brand & Identity */}
      <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "var(--admin-text)", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          1. Brand Identity & Positioning
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Official Brand Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", fontWeight: 700 }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Brand Tagline
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
            Brand Slogan
          </label>
          <input
            type="text"
            value={form.slogan}
            onChange={(e) => setForm({ ...form, slogan: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
          />
        </div>
      </div>

      {/* Atelier Contact Details */}
      <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "var(--admin-text)", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          2. Atelier Concierge & Physical Address
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Concierge Email *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Phone Number *
            </label>
            <input
              type="text"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              WhatsApp Concierge
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
            Studio Physical Address *
          </label>
          <input
            type="text"
            required
            value={form.atelierAddress}
            onChange={(e) => setForm({ ...form, atelierAddress: e.target.value })}
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
          />
        </div>
      </div>

      {/* Shipping & Commerce Thresholds */}
      <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.5rem 0", color: "var(--admin-text)", borderBottom: "1px solid #F0EAE1", paddingBottom: "0.5rem" }}>
          3. Shipping & Commerce Thresholds
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Free Shipping Order Threshold (INR ₹)
            </label>
            <input
              type="number"
              value={form.freeShippingThreshold}
              onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
              Standard Shipping Fee (INR ₹)
            </label>
            <input
              type="number"
              value={form.standardShippingFee}
              onChange={(e) => setForm({ ...form, standardShippingFee: Number(e.target.value) })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>
        </div>
      </div>

      {/* System Reset Section */}
      <div style={{ backgroundColor: "var(--admin-surface-subtle)", padding: "1.5rem 2rem", border: "1px solid var(--admin-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <strong style={{ fontSize: "0.85rem", color: "#7C2430", display: "block" }}>
            Database Reset to Factory Demo Data
          </strong>
          <span style={{ fontSize: "0.75rem", color: "#8E8276" }}>
            Resets all products, categories, collections, and orders back to pristine initial state.
          </span>
        </div>

        {resetConfirm ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" onClick={() => setResetConfirm(false)} className="btn-secondary" style={{ padding: "0.5rem 0.8rem", fontSize: "0.75rem" }}>
              Cancel
            </button>
            <button type="button" onClick={handleResetData} className="btn-wine" style={{ padding: "0.5rem 0.8rem", fontSize: "0.75rem" }}>
              Confirm Reset
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.75rem",
              border: "1px solid #E8C8C8",
              backgroundColor: "var(--admin-surface)",
              color: "#7C2430",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={13} style={{ display: "inline", marginRight: "4px" }} /> Reset Demo Data
          </button>
        )}
      </div>
    </form>
  );
};
