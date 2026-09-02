import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { LookbookItem } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect, AdminTextarea } from "../components/admin/ui/AdminInputs";

export const AdminLookbookPage: React.FC<{ onNavigate?: (href: string) => void }> = () => {
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
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Editorial Lookbook Anthology"
        description="High-fashion styled editorials, occasion aesthetics, and shoppable bridal campaigns."
        badge={
          <AdminBadge variant="brand" size="md">
            {lookbookItems.length} Looks
          </AdminBadge>
        }
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
          >
            <Plus className="w-4 h-4" /> Create Campaign Look
          </button>
        }
      />

      {/* 2. Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {lookbookItems.map((look) => (
          <AdminCard key={look.id} noPadding className="flex flex-col justify-between">
            <div>
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/75 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-xs">
                  LOOK {look.lookNumber}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 p-3 rounded-xs border border-neutral-200 text-xs shadow-md">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Featured Saree:</span>
                  <strong className="text-neutral-900 truncate block">{look.productTitle}</strong>
                  <span className="text-[#734E06] font-bold block mt-0.5">
                    ₹{look.productPrice?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <span className="text-xs text-[#734E06] font-semibold block mb-1">
                  {look.season} • {look.location}
                </span>
                <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 mb-2">
                  {look.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed m-0 line-clamp-3">
                  {look.narrative}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenModal(look)}
                className="h-8 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${look.title}"?`)) {
                    deleteLookbookItem(look.id);
                  }
                }}
                className="h-8 w-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors"
                title="Delete Look"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* 3. Modal */}
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
              {editingLook ? "Edit Campaign Look" : "Create New Campaign Look"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Look Number" required>
                  <AdminInput
                    required
                    value={form.lookNumber}
                    onChange={(e) => setForm({ ...form, lookNumber: e.target.value })}
                    placeholder="01"
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

              <AdminField label="Look Title" required>
                <AdminInput
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. The Imperial Kadwa Drape"
                />
              </AdminField>

              <AdminField label="Link Saree Product" required>
                <AdminSelect
                  value={form.productSlug}
                  onChange={(e) => handleSelectProduct(e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.title} (₹{p.price.toLocaleString("en-IN")})
                    </option>
                  ))}
                </AdminSelect>
              </AdminField>

              <AdminField label="High-Resolution Look Image URL" required>
                <AdminInput
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                />
              </AdminField>

              <AdminField label="Styling Narrative">
                <AdminTextarea
                  rows={3}
                  value={form.narrative}
                  onChange={(e) => setForm({ ...form, narrative: e.target.value })}
                  placeholder="Artisan styling guidance, pleat draping instructions..."
                />
              </AdminField>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                >
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
