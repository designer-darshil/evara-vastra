import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Category } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput } from "../components/admin/ui/AdminInputs";

export const AdminCategoriesPage: React.FC<{ onNavigate?: (href: string) => void }> = () => {
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
    <div className="space-y-6">
      {/* 1. Header */}
      <AdminPageHeader
        title="Category Taxonomy"
        description="Manage product category classifications, navigation URLs, and curated category cover photography."
        badge={
          <AdminBadge variant="brand" size="md">
            {categories.length} Categories
          </AdminBadge>
        }
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
          >
            <Plus className="w-4 h-4" /> Create Category
          </button>
        }
      />

      {/* 2. Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {categories.map((cat) => (
          <AdminCard key={cat.id} noPadding className="flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] overflow-hidden bg-neutral-100 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleToggleEnable(cat)}
                  className={`absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs border shadow-xs transition-colors cursor-pointer ${
                    cat.isEnabled
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : "bg-neutral-800 text-neutral-300 border-neutral-700"
                  }`}
                  title="Click to toggle category availability"
                >
                  {cat.isEnabled ? "Active" : "Disabled"}
                </button>
              </div>

              <div className="p-4 sm:p-5">
                <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">
                  /{cat.slug}
                </span>
                <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed m-0 line-clamp-2">
                  {cat.shortDescription || "Curated collection of authentic atelier sarees and festive garments."}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenModal(cat)}
                className="h-8 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                    deleteCategory(cat.id);
                  }
                }}
                className="h-8 w-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* 3. Create / Edit Category Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100">
              {editingCategory ? "Edit Category" : "Create New Category"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <AdminField label="Category Name" required>
                <AdminInput
                  required
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Silk Sarees"
                />
              </AdminField>

              <AdminField label="URL Slug" required>
                <AdminInput
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="silk-sarees"
                />
              </AdminField>

              <AdminField label="Short Description">
                <AdminInput
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Handwoven pure silk creations from Surat & Varanasi."
                />
              </AdminField>

              <AdminField label="Cover Image URL">
                <AdminInput
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                />
              </AdminField>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
                >
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
