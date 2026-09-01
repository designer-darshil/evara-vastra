import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Category } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const AdminCategoriesPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    image: "",
    isEnabled: true,
  });

  const handleOpenModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setForm({
        name: cat.name,
        slug: cat.slug,
        shortDescription: cat.shortDescription || cat.description || "",
        image: cat.image,
        isEnabled: cat.isEnabled,
      });
    } else {
      setEditingCategory(null);
      setForm({
        name: "",
        slug: "",
        shortDescription: "",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
        isEnabled: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setForm((prev) => ({
      ...prev,
      name: val,
      slug: !editingCategory ? autoSlug : prev.slug,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, form);
    } else {
      addCategory(form);
    }
    setIsModalOpen(false);
  };

  const handleToggleEnable = (cat: Category) => {
    updateCategory(cat.id, { isEnabled: !cat.isEnabled });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
            ORGANIZATION & TAXONOMY
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
            Categories ({categories.length})
          </h1>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-wine" style={{ padding: "0.75rem 1.35rem", fontSize: "0.825rem" }}>
          <Plus size={16} /> Create Category
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
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
              <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                onClick={() => handleToggleEnable(cat)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.5rem",
                  backgroundColor: cat.isEnabled ? "rgba(35,78,62,0.9)" : "rgba(23,21,19,0.8)",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {cat.isEnabled ? "ENABLED" : "DISABLED"}
              </button>
            </div>

            <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "#8E8276", textTransform: "uppercase" }}>
                  SLUG: /{cat.slug}
                </span>
                <h3 className="font-serif" style={{ fontSize: "1.3rem", color: "#171513", margin: "0.2rem 0 0.4rem 0" }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#6F6257", lineHeight: 1.4 }}>
                  {cat.shortDescription}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #F0EAE1" }}>
                <button
                  onClick={() => handleOpenModal(cat)}
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
                  onClick={() => deleteCategory(cat.id)}
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
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif" style={{ fontSize: "1.5rem", margin: "0 0 1.25rem 0" }}>
              {editingCategory ? "Edit Category" : "Create New Category"}
            </h3>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

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
                  Short Description
                </label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-wine" style={{ padding: "0.6rem 1.25rem" }}>
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
