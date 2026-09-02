import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Collection } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminTextarea } from "../components/admin/ui/AdminInputs";

export const AdminCollectionsPage: React.FC<{ onNavigate?: (href: string) => void }> = () => {
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
        subtitle: col.subtitle || "",
        editorialStatement: col.editorialStatement || "",
        story: col.story || "",
        season: col.season || "Autumn / Winter 2026",
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
    <div className="space-y-6">
      {/* 1. Header */}
      <AdminPageHeader
        title="Curated Edits & Collections"
        description="High-editorial capsules, seasonal lookbooks, and featured designer curations."
        badge={
          <AdminBadge variant="brand" size="md">
            {collections.length} Collections
          </AdminBadge>
        }
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
          >
            <Plus className="w-4 h-4" /> Create Collection
          </button>
        }
      />

      {/* 2. Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {collections.map((col) => (
          <AdminCard key={col.id} noPadding className="flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] overflow-hidden bg-neutral-100 relative">
                <img
                  src={col.heroImage}
                  alt={col.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs tracking-wider">
                  {col.season || "Capsule"}
                </div>
                <button
                  onClick={() => handleTogglePublish(col)}
                  className={`absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs border shadow-xs transition-colors cursor-pointer ${
                    col.isPublished
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : "bg-neutral-800 text-neutral-300 border-neutral-700"
                  }`}
                  title="Click to toggle collection publication"
                >
                  {col.isPublished ? "Published" : "Draft"}
                </button>
              </div>

              <div className="p-4 sm:p-5">
                <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">
                  /{col.slug}
                </span>
                <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 mb-1">
                  {col.title}
                </h3>
                {col.subtitle && (
                  <span className="text-xs font-medium text-[#734E06] block mb-2">
                    {col.subtitle}
                  </span>
                )}
                <p className="text-xs text-neutral-600 leading-relaxed m-0 line-clamp-2">
                  {col.editorialStatement || col.story || "A bespoke curation of celebratory heirlooms."}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenModal(col)}
                className="h-8 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete collection "${col.title}"?`)) {
                    deleteCollection(col.id);
                  }
                }}
                className="h-8 w-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors"
                title="Delete Collection"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* 3. Create / Edit Collection Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100">
              {editingCol ? "Edit Collection" : "Create New Collection"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <AdminField label="Collection Title" required>
                <AdminInput
                  required
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Royal Kadwa Edit"
                />
              </AdminField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField label="URL Slug" required>
                  <AdminInput
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="royal-kadwa-edit"
                  />
                </AdminField>

                <AdminField label="Season / Edition">
                  <AdminInput
                    value={form.season}
                    onChange={(e) => setForm({ ...form, season: e.target.value })}
                    placeholder="Autumn / Winter 2026"
                  />
                </AdminField>
              </div>

              <AdminField label="Subtitle / Tagline">
                <AdminInput
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="The pinnacle of Banarasi and Gujarati loomwork"
                />
              </AdminField>

              <AdminField label="Editorial Statement">
                <AdminTextarea
                  rows={3}
                  value={form.editorialStatement}
                  onChange={(e) => setForm({ ...form, editorialStatement: e.target.value })}
                  placeholder="Artisan manifesto and narrative for this capsule edit..."
                />
              </AdminField>

              <AdminField label="Cover Hero Image URL">
                <AdminInput
                  type="url"
                  value={form.heroImage}
                  onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                  placeholder="https://..."
                />
              </AdminField>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
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
