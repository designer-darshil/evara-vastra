import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { NotificationBarConfig } from "../types";
import { Save, ArrowLeft, ExternalLink, Check } from "lucide-react";

export const AdminNotificationBarPage: React.FC<{ onNavigate: (href: string) => void }> = ({
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
              Website Notification Ribbon
            </h1>
            <span style={{ fontSize: "0.75rem", color: "#8E8276" }}>
              Controls the top banner across all pages on the customer storefront.
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
            <ExternalLink size={14} /> Preview Storefront
          </button>
          <button type="submit" className="btn-wine" style={{ padding: "0.65rem 1.4rem", fontSize: "0.825rem" }}>
            <Save size={15} /> Save Announcement
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: "rgba(35,78,62,0.1)", border: "1px solid #234E3E", color: "#234E3E", padding: "0.75rem 1.25rem", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Check size={16} /> Notification bar updated and live on storefront!
        </div>
      )}

      {/* Live Preview Box */}
      <div style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", border: "1px solid #E5DFD5" }}>
        <h3 className="font-serif" style={{ fontSize: "1.1rem", margin: "0 0 0.75rem 0", color: "#6F6257" }}>
          Live Preview on Storefront:
        </h3>

        <div
          style={{
            backgroundColor: form.backgroundStyle === "wine" ? "#7C2430" : form.backgroundStyle === "gold" ? "#8C6836" : "#171513",
            color: "#FFFFFF",
            padding: "0.75rem 1.5rem",
            fontSize: "0.78rem",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <span>{form.message || "Enter your announcement message..."}</span>
          {form.link && (
            <span style={{ color: "#B18A52", fontWeight: 700, textDecoration: "underline" }}>
              {form.linkText || "EXPLORE NOW →"}
            </span>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", border: "1px solid #E5DFD5", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingBottom: "1.25rem", borderBottom: "1px solid #F0EAE1" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={form.isEnabled}
              onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })}
              style={{ accentColor: "#7C2430", width: "18px", height: "18px" }}
            />
            <span>Enable Announcement Ribbon on Storefront</span>
          </label>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
            Announcement Message Text *
          </label>
          <input
            type="text"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="e.g. COMPLIMENTARY INSURED SHIPPING ON ALL ORDERS ABOVE ₹10,000"
            style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.875rem" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
              Action Link Destination
            </label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="/shop?filter=newArrival"
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.875rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
              Action Link Label
            </label>
            <input
              type="text"
              value={form.linkText}
              onChange={(e) => setForm({ ...form, linkText: e.target.value })}
              placeholder="EXPLORE NOW →"
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.875rem" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
              Visual Background Theme
            </label>
            <select
              value={form.backgroundStyle}
              onChange={(e) => setForm({ ...form, backgroundStyle: e.target.value as any })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", backgroundColor: "#FFFFFF" }}
            >
              <option value="wine">Deep Wine Accent (#7C2430)</option>
              <option value="dark">Charcoal Black (#171513)</option>
              <option value="gold">Antique Gold Ochre (#8C6836)</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", paddingTop: "1.2rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.isDismissible}
                onChange={(e) => setForm({ ...form, isDismissible: e.target.checked })}
                style={{ accentColor: "#7C2430" }}
              />
              <span>Allow Patron to Dismiss Ribbon</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
