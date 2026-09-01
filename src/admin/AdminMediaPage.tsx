import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Plus, Trash2, Copy, Check } from "lucide-react";

export const AdminMediaPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    title: "",
    url: "",
    category: "products" as any,
  });

  const filteredMedia = mediaAssets.filter((m) => {
    if (selectedCategory !== "all" && m.category !== selectedCategory) return false;
    return true;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.title || !newAsset.url) return;
    addMediaAsset(newAsset);
    setNewAsset({ title: "", url: "", category: "products" });
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
            DIGITAL ASSET MANAGEMENT
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "var(--admin-text)", margin: "0.2rem 0 0 0" }}>
            Media Library ({mediaAssets.length})
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#8E8276", margin: "0.25rem 0 0 0" }}>
            Centralized repository of high-resolution saree shoots, loom photography, and editorial graphics.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-wine" style={{ padding: "0.75rem 1.35rem", fontSize: "0.825rem" }}>
          <Plus size={16} /> Add Media Asset
        </button>
      </div>

      {/* Category Pills */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {[
          { id: "all", label: "All Media" },
          { id: "products", label: "Product Drapes" },
          { id: "hero", label: "Hero & Banners" },
          { id: "craft", label: "Craft & Loom" },
          { id: "editorial", label: "Editorial Campaign" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: "0.45rem 0.9rem",
              fontSize: "0.78rem",
              fontWeight: selectedCategory === cat.id ? 700 : 500,
              backgroundColor: selectedCategory === cat.id ? "#7C2430" : "#FFFFFF",
              color: selectedCategory === cat.id ? "#FFFFFF" : "#6F6257",
              border: selectedCategory === cat.id ? "1px solid #7C2430" : "1px solid #D9D2C7",
              cursor: "pointer",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
        {filteredMedia.map((asset) => (
          <div
            key={asset.id}
            style={{
              backgroundColor: "var(--admin-surface)",
              border: "1px solid var(--admin-border)",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#EDE7DD", position: "relative" }}>
              <img src={asset.url} alt={asset.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span
                style={{
                  position: "absolute",
                  bottom: "0.4rem",
                  left: "0.4rem",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  backgroundColor: "rgba(23,21,19,0.75)",
                  color: "#FFFFFF",
                  padding: "0.15rem 0.4rem",
                }}
              >
                {asset.category}
              </span>
            </div>

            <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <strong style={{ fontSize: "0.825rem", color: "var(--admin-text)", display: "block", marginBottom: "0.5rem" }}>
                {asset.title}
              </strong>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid #F0EAE1" }}>
                <button
                  onClick={() => handleCopyUrl(asset.url, asset.id)}
                  style={{
                    fontSize: "0.72rem",
                    color: copiedId === asset.id ? "#234E3E" : "#7C2430",
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  {copiedId === asset.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === asset.id ? "Copied!" : "Copy Link"}</span>
                </button>

                <button
                  onClick={() => deleteMediaAsset(asset.id)}
                  style={{ background: "none", border: "none", color: "#7C2430", cursor: "pointer", padding: "0.2rem" }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
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
              backgroundColor: "var(--admin-surface)",
              padding: "2rem",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif" style={{ fontSize: "1.4rem", margin: "0 0 1.25rem 0" }}>
              Add Media Asset URL
            </h3>

            <form onSubmit={handleAddMedia} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={newAsset.title}
                  onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
                  Category
                </label>
                <select
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value as any })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", backgroundColor: "var(--admin-surface)" }}
                >
                  <option value="products">Product Drapes</option>
                  <option value="hero">Hero & Banners</option>
                  <option value="craft">Craft & Looms</option>
                  <option value="editorial">Editorial Campaign</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.3rem" }}>
                  Image URL (https://...) *
                </label>
                <input
                  type="url"
                  required
                  value={newAsset.url}
                  onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-wine" style={{ padding: "0.6rem 1.25rem" }}>
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
