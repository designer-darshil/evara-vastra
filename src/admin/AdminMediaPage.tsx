import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Plus, Trash2, Copy, Check } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect } from "../components/admin/ui/AdminInputs";

export const AdminMediaPage: React.FC<{ onNavigate?: (href: string) => void }> = () => {
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
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Media & Photography Library"
        description="Centralized repository of high-resolution saree shoot photography, loom videos, and editorial graphics."
        badge={
          <AdminBadge variant="brand" size="md">
            {mediaAssets.length} Assets
          </AdminBadge>
        }
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
          >
            <Plus className="w-4 h-4" /> Add Media Asset
          </button>
        }
      />

      {/* 2. Category Filter Pills */}
      <div className="flex gap-2 flex-wrap">
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
            className={`h-9 px-3.5 text-xs font-semibold rounded-xs transition-colors ${
              selectedCategory === cat.id
                ? "bg-[#734E06] text-white font-bold"
                : "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {filteredMedia.map((asset) => (
          <AdminCard key={asset.id} noPadding className="flex flex-col justify-between overflow-hidden">
            <div>
              <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative group">
                <img
                  src={asset.url}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs">
                  {asset.category}
                </span>
              </div>

              <div className="p-3.5">
                <strong className="text-xs sm:text-sm font-bold text-neutral-900 block truncate" title={asset.title}>
                  {asset.title}
                </strong>
                <span className="text-xs text-neutral-400 font-mono block mt-0.5 truncate">
                  {asset.url}
                </span>
              </div>
            </div>

            <div className="p-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between gap-2">
              <button
                onClick={() => handleCopyUrl(asset.url, asset.id)}
                className={`h-8 px-2.5 text-xs font-semibold rounded-sm border flex items-center gap-1.5 transition-colors flex-1 justify-center ${
                  copiedId === asset.id
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy URL
                  </>
                )}
              </button>

              <button
                onClick={() => deleteMediaAsset(asset.id)}
                className="h-8 w-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors shrink-0"
                title="Delete Media"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* 4. Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100">
              Add New Media Asset
            </h3>

            <form onSubmit={handleAddMedia} className="space-y-4">
              <AdminField label="Asset Title" required>
                <AdminInput
                  required
                  value={newAsset.title}
                  onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                  placeholder="e.g. Banarasi Katan Silk Red Close-Up"
                />
              </AdminField>

              <AdminField label="Direct Image URL" required>
                <AdminInput
                  type="url"
                  required
                  value={newAsset.url}
                  onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </AdminField>

              <AdminField label="Category Tag" required>
                <AdminSelect
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value as any })}
                >
                  <option value="products">Product Drapes</option>
                  <option value="hero">Hero & Banners</option>
                  <option value="craft">Craft & Loom</option>
                  <option value="editorial">Editorial Campaign</option>
                </AdminSelect>
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
