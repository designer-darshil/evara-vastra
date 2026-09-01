import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { LookbookItem } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const AdminLookbookPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
  const { lookbookItems, addLookbookItem, updateLookbookItem, deleteLookbookItem, products } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLook, setEditingLook] = useState<LookbookItem | null>(null);

  const [form, setForm] = useState<Partial<LookbookItem>>({
    lookNumber: "04",
    title: "",
    season: "Autumn / Winter 2026",
    location: "Studio Evara Vastra",
    narrative: "",
    image: "",
    productSlug: "raga-silk-saree",
    productTitle: "Raga Katan Silk Saree in Deep Wine",
    productPrice: 14800,
    productFabric: "Pure Katan Silk",
    stylingDetails: ["Kadwa silk drape with wide pleats", "Hand-carved brass jewellery"],
    isPublished: true,
  });

  const handleOpenModal = (look?: LookbookItem) => {
    if (look) {
      setEditingLook(look);
      setForm(look);
    } else {
      setEditingLook(null);
      setForm({
        lookNumber: `0${lookbookItems.length + 1}`,
        title: "",
        season: "Autumn / Winter 2026",
        location: "Mumbai Atelier",
        narrative: "",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
        productSlug: products[0]?.slug || "raga-silk-saree",
        productTitle: products[0]?.title || "Raga Katan Silk Saree",
        productPrice: products[0]?.price || 14800,
        productFabric: products[0]?.fabric || "Pure Katan Silk",
        stylingDetails: ["Traditional Nivi drape", "Polki choker"],
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSelectProduct = (slug: string) => {
    const p = products.find((prod) => prod.slug === slug);
    if (p) {
      setForm((prev) => ({
        ...prev,
        productSlug: p.slug,
        productTitle: p.title,
        productPrice: p.price,
        productFabric: p.fabric,
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image) return;

    if (editingLook) {
      updateLookbookItem(editingLook.id, form as any);
    } else {
      addLookbookItem(form as any);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
            CAMPAIGN LOOKS
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
            Lookbook Anthology ({lookbookItems.length})
          </h1>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-wine" style={{ padding: "0.75rem 1.35rem", fontSize: "0.825rem" }}>
          <Plus size={16} /> Create Campaign Look
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {lookbookItems.map((look) => (
          <div
            key={look.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5DFD5",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#EDE7DD", position: "relative" }}>
              <img src={look.image} alt={look.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  left: "0.5rem",
                  backgroundColor: "#7C2430",
                  color: "#FFFFFF",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.5rem",
                }}
              >
                LOOK {look.lookNumber}
              </span>
            </div>

            <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.68rem", color: "#B18A52", fontWeight: 700, textTransform: "uppercase" }}>
                  {look.location} • {look.season}
                </span>
                <h3 className="font-serif" style={{ fontSize: "1.35rem", color: "#171513", margin: "0.2rem 0 0.4rem 0" }}>
                  {look.title}
                </h3>
                <p style={{ fontSize: "0.825rem", color: "#6F6257", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                  {look.narrative}
                </p>
                <div style={{ backgroundColor: "#FAF8F5", padding: "0.6rem 0.75rem", border: "1px solid #EBE5DB", fontSize: "0.75rem" }}>
                  <span style={{ color: "#8E8276", display: "block" }}>Linked Saree:</span>
                  <strong>{look.productTitle}</strong> (₹{look.productPrice.toLocaleString("en-IN")})
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #F0EAE1" }}>
                <button
                  onClick={() => handleOpenModal(look)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    fontSize: "0.75rem",
                    border: "1px solid #D9D2C7",
                    backgroundColor: "#FAF8F5",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => deleteLookbookItem(look.id)}
                  style={{
                    padding: "0.4rem",
                    color: "#7C2430",
                    border: "1px solid #E8C8C8",
                    backgroundColor: "#FAF8F5",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif" style={{ fontSize: "1.5rem", margin: "0 0 1.25rem 0" }}>
              {editingLook ? "Edit Campaign Look" : "Create Campaign Look"}
            </h3>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Look #
                  </label>
                  <input
                    type="text"
                    value={form.lookNumber}
                    onChange={(e) => setForm({ ...form, lookNumber: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Look Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Season
                  </label>
                  <input
                    type="text"
                    value={form.season}
                    onChange={(e) => setForm({ ...form, season: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Assign Saree for "Shop This Drape"
                </label>
                <select
                  value={form.productSlug}
                  onChange={(e) => handleSelectProduct(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", backgroundColor: "#FFFFFF" }}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.title} (₹{p.price.toLocaleString("en-IN")})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Editorial Narrative
                </label>
                <textarea
                  rows={3}
                  value={form.narrative}
                  onChange={(e) => setForm({ ...form, narrative: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-wine" style={{ padding: "0.6rem 1.25rem" }}>
                  Save Look
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
