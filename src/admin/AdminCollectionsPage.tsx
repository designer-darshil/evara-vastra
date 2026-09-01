import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Collection } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const AdminCollectionsPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
  const { collections, addCollection, updateCollection, deleteCollection } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<Collection | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    editorialStatement: "",
    story: "",
    season: "",
    heroImage: "",
    isPublished: true,
  });

  const handleOpenModal = (col?: Collection) => {
    if (col) {
      setEditingCol(col);
      setForm({
        title: col.title,
        slug: col.slug,
        subtitle: col.subtitle,
        editorialStatement: col.editorialStatement,
        story: col.story,
        season: col.season,
        heroImage: col.heroImage,
        isPublished: col.isPublished,
      });
    } else {
      setEditingCol(null);
      setForm({
        title: "",
        slug: "",
        subtitle: "",
        editorialStatement: "",
        story: "",
        season: "Autumn / Winter 2026",
        heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: !editingCol ? autoSlug : prev.slug,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return;

    if (editingCol) {
      updateCollection(editingCol.id, form);
    } else {
      addCollection(form);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = (col: Collection) => {
    updateCollection(col.id, { isPublished: !col.isPublished });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
            CURATED EDITS
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
            Collections ({collections.length})
          </h1>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-wine" style={{ padding: "0.75rem 1.35rem", fontSize: "0.825rem" }}>
          <Plus size={16} /> Create Collection
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {collections.map((col) => (
          <div
            key={col.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5DFD5",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#EDE7DD", position: "relative" }}>
              <img src={col.heroImage} alt={col.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                onClick={() => handleTogglePublish(col)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.5rem",
                  backgroundColor: col.isPublished ? "rgba(35,78,62,0.9)" : "rgba(23,21,19,0.8)",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {col.isPublished ? "PUBLISHED" : "DRAFT"}
              </button>
            </div>

            <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.68rem", color: "#B18A52", fontWeight: 700, textTransform: "uppercase" }}>
                  {col.season}
                </span>
                <h3 className="font-serif" style={{ fontSize: "1.4rem", color: "#171513", margin: "0.2rem 0 0.4rem 0" }}>
                  {col.title}
                </h3>
                <p style={{ fontSize: "0.825rem", color: "#6F6257", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                  {col.subtitle}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #F0EAE1" }}>
                <button
                  onClick={() => handleOpenModal(col)}
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
                  onClick={() => deleteCollection(col.id)}
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
              {editingCol ? "Edit Collection" : "Create New Collection"}
            </h3>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Collection Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                    Season Tag
                  </label>
                  <input
                    type="text"
                    value={form.season}
                    onChange={(e) => setForm({ ...form, season: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Subtitle
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Editorial Quote
                </label>
                <input
                  type="text"
                  value={form.editorialStatement}
                  onChange={(e) => setForm({ ...form, editorialStatement: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Hero Image URL
                </label>
                <input
                  type="url"
                  value={form.heroImage}
                  onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Collection Story Narrative
                </label>
                <textarea
                  rows={3}
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-wine" style={{ padding: "0.6rem 1.25rem" }}>
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
