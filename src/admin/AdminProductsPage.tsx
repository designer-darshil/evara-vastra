import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Warehouse,
} from "lucide-react";

export const AdminProductsPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { products, deleteProduct, duplicateProduct, updateProduct, categories } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter & Search logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          (p.code || p.sku || "").toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== "all" && p.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const handleTogglePublish = (p: Product) => {
    const nextStatus = p.status === "published" ? "draft" : "published";
    updateProduct(p.id, { status: nextStatus });
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicateProduct(id);
    if (dup && onNavigate) {
      onNavigate(`/admin/products/edit/${dup.id}`);
    }
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Product Catalog" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Catalog Management ({products.length} Items)
          </h1>
        </div>

        {onNavigate && (
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => onNavigate("/admin/inventory")}
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-neutral-300 text-neutral-700 hover:border-brand hover:text-brand text-xs font-semibold rounded-sm transition-colors shadow-2xs"
            >
              <Warehouse className="w-4 h-4 text-brand" /> Inventory Room
            </button>
            <button
              onClick={() => onNavigate("/admin/products/new")}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add New Saree
            </button>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-neutral-200 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, SKU, or fabric..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-sm text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-sm text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Mobile View: Stacked Cards (Visible on <640px) */}
        <div className="sm:hidden divide-y divide-neutral-200">
          {filteredProducts.map((p) => {
            const qty = p.inventoryCount ?? p.inventory ?? 0;
            const isLow = qty <= 3 && qty > 0;
            const isOut = qty <= 0 || !p.inStock;

            return (
              <div key={p.id} className="p-4 space-y-3 bg-white">
                <div className="flex items-start gap-3">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-14 h-16 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-neutral-900 text-xs block truncate" title={p.title}>
                      {p.title}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono block">
                      {p.sku || p.code} • {p.category}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-[#734E06] text-xs">
                        {formatINR(p.price)}
                      </span>
                      {p.compareAtPrice && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          {formatINR(p.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${
                      isOut
                        ? "bg-red-100 text-red-800"
                        : isLow
                        ? "bg-amber-100 text-amber-900"
                        : "bg-neutral-100 text-neutral-800"
                    }`}>
                      {qty} units
                    </span>
                    <button
                      onClick={() => handleTogglePublish(p)}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                        p.status === "published"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-neutral-100 text-neutral-600 border-neutral-200"
                      }`}
                    >
                      {p.status}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate(`/admin/products/edit/${p.id}`)}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-neutral-300 rounded-sm text-neutral-800"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDuplicate(p.id)}
                      className="p-1 text-neutral-600 border border-neutral-200 rounded-sm"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-1 text-red-600 border border-red-200 rounded-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-neutral-500 text-xs">
              No products match the filter criteria.
            </div>
          )}
        </div>

        {/* Desktop View: Full Data Table (Visible on >=640px) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3 px-4">Saree & Craft</th>
                <th className="py-3 px-4">SKU / Code</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredProducts.map((p) => {
                const qty = p.inventoryCount ?? p.inventory ?? 0;
                const isLow = qty <= 3 && qty > 0;
                const isOut = qty <= 0 || !p.inStock;

                return (
                  <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-10 h-13 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                        />
                        <div className="min-w-0">
                          <span className="font-semibold text-neutral-900 block truncate max-w-xs" title={p.title}>
                            {p.title}
                          </span>
                          <span className="text-[11px] text-neutral-500 block">
                            {p.fabric} • {p.color}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-neutral-600">
                      {p.sku || p.code}
                    </td>

                    <td className="py-3 px-4 font-semibold text-neutral-900">
                      {formatINR(p.price)}
                      {p.compareAtPrice && (
                        <span className="text-[10px] text-neutral-400 line-through block font-normal">
                          {formatINR(p.compareAtPrice)}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-sm font-bold text-[11px] ${
                        isOut
                          ? "bg-red-100 text-red-800"
                          : isLow
                          ? "bg-amber-100 text-amber-900"
                          : "bg-neutral-100 text-neutral-800"
                      }`}>
                        {qty} units
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border cursor-pointer ${
                          p.status === "published"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            : "bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200"
                        }`}
                        title="Click to toggle publish status"
                      >
                        {p.status}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onNavigate && (
                          <button
                            onClick={() => onNavigate(`/admin/products/edit/${p.id}`)}
                            className="p-1.5 text-neutral-600 hover:text-brand hover:bg-neutral-100 rounded-sm transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDuplicate(p.id)}
                          className="p-1.5 text-neutral-600 hover:text-brand hover:bg-neutral-100 rounded-sm transition-colors"
                          title="Duplicate Saree"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                          title="Delete Saree"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    No products match the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
        >
          <div
            className="bg-white border border-red-200 rounded-sm max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-neutral-900 mb-1">
                Delete Product?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Are you sure you want to permanently remove this saree from the database? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-800 transition-colors flex-1"
              >
                Delete Saree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
