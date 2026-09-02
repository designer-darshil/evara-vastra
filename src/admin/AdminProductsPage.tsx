import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Plus, Edit2, Trash2, Copy, Warehouse } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminToolbar } from "../components/admin/ui/AdminToolbar";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminEmptyState } from "../components/admin/ui/AdminEmptyState";

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
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Product Catalog"
        description="Manage the handcrafted sarees, co-ord sets, and luxury atelier garments available across the storefront."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Product Catalog" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {products.length} Products
          </AdminBadge>
        }
        actions={
          onNavigate && (
            <>
              <button
                onClick={() => onNavigate("/admin/inventory")}
                className="flex items-center gap-2 h-10 px-3.5 sm:px-4 bg-white border border-neutral-300 text-neutral-800 hover:border-[#734E06] hover:text-[#734E06] text-xs font-semibold rounded-sm transition-colors shadow-2xs min-h-[40px]"
              >
                <Warehouse className="w-4 h-4 text-[#734E06]" /> Inventory Room
              </button>
              <button
                onClick={() => onNavigate("/admin/products/new")}
                className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </>
          )
        }
      />

      {/* 2. Main Catalog Card */}
      <AdminCard noPadding>
        {/* Toolbar: Search + Category + Status */}
        <div className="p-4 sm:p-5 border-b border-neutral-200">
          <AdminToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search products by title, SKU, or fabric..."
            filters={
              <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 px-3 bg-white border border-neutral-300 rounded-sm text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] min-h-[40px] flex-1 sm:flex-initial"
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
                  className="h-10 px-3 bg-white border border-neutral-300 rounded-sm text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] min-h-[40px] flex-1 sm:flex-initial"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            }
          />
        </div>

        {/* 3. Mobile View: Responsive Product Cards (< 768px) */}
        <div className="md:hidden divide-y divide-neutral-100">
          {filteredProducts.map((p) => {
            const qty = p.inventoryCount ?? p.inventory ?? 0;
            const isLow = qty <= 3 && qty > 0;
            const isOut = qty <= 0 || !p.inStock;

            return (
              <div key={p.id} className="p-4 sm:p-5 space-y-3.5 bg-white">
                <div className="flex items-start gap-3.5">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-16 h-20 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-neutral-900 text-sm block truncate" title={p.title}>
                      {p.title}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono block mt-0.5">
                      {p.sku || p.code} • {p.fabric}
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="font-bold text-[#734E06] text-sm">
                        {formatINR(p.price)}
                      </span>
                      {p.compareAtPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          {formatINR(p.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <AdminBadge variant={isOut ? "danger" : isLow ? "warning" : "neutral"} size="sm">
                      {qty} in stock
                    </AdminBadge>

                    <button
                      onClick={() => handleTogglePublish(p)}
                      className="cursor-pointer"
                      title="Toggle publish status"
                    >
                      <AdminBadge variant={p.status === "published" ? "success" : "neutral"} size="sm">
                        {p.status}
                      </AdminBadge>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate(`/admin/products/edit/${p.id}`)}
                        className="h-9 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 transition-colors flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDuplicate(p.id)}
                      className="h-9 w-9 flex items-center justify-center text-neutral-600 hover:text-[#734E06] hover:bg-neutral-100 border border-neutral-300 rounded-sm transition-colors"
                      title="Duplicate Product"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="h-9 w-9 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <AdminEmptyState
              title="No Products Match Filter"
              description="Try adjusting your search term or category/status filters to view products."
              action={
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                  }}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 rounded-sm"
                >
                  Clear All Filters
                </button>
              }
            />
          )}
        </div>

        {/* 4. Desktop View: Proportional Data Table (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3.5 px-5 w-5/12">Product & Craft</th>
                <th className="py-3.5 px-4 w-2/12">SKU / Code</th>
                <th className="py-3.5 px-4 w-2/12">Price</th>
                <th className="py-3.5 px-4 text-center w-1/12">Stock</th>
                <th className="py-3.5 px-4 text-center w-1/12">Status</th>
                <th className="py-3.5 px-5 text-right w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredProducts.map((p) => {
                const qty = p.inventoryCount ?? p.inventory ?? 0;
                const isLow = qty <= 3 && qty > 0;
                const isOut = qty <= 0 || !p.inStock;

                return (
                  <tr key={p.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-15 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                        />
                        <div className="min-w-0">
                          <span className="font-semibold text-neutral-900 block truncate max-w-sm" title={p.title}>
                            {p.title}
                          </span>
                          <span className="text-xs text-neutral-500 block mt-0.5">
                            {p.fabric} • {p.color}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs text-neutral-600">
                      {p.sku || p.code}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-neutral-900 block">
                        {formatINR(p.price)}
                      </span>
                      {p.compareAtPrice && (
                        <span className="text-xs text-neutral-400 line-through block font-normal">
                          {formatINR(p.compareAtPrice)}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <AdminBadge variant={isOut ? "danger" : isLow ? "warning" : "neutral"} size="sm">
                        {qty} units
                      </AdminBadge>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className="cursor-pointer"
                        title="Click to toggle publish status"
                      >
                        <AdminBadge variant={p.status === "published" ? "success" : "neutral"} size="sm">
                          {p.status}
                        </AdminBadge>
                      </button>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onNavigate && (
                          <button
                            onClick={() => onNavigate(`/admin/products/edit/${p.id}`)}
                            className="p-2 text-neutral-600 hover:text-[#734E06] hover:bg-neutral-100 rounded-sm transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDuplicate(p.id)}
                          className="p-2 text-neutral-600 hover:text-[#734E06] hover:bg-neutral-100 rounded-sm transition-colors"
                          title="Duplicate Product"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                          title="Delete Product"
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
                  <td colSpan={6}>
                    <AdminEmptyState
                      title="No Products Match Filter"
                      description="Try adjusting your search term or category/status filters to view products."
                      action={
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                            setSelectedStatus("all");
                          }}
                          className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 rounded-sm"
                        >
                          Clear All Filters
                        </button>
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* 5. Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-200"
          style={{ zIndex: 70 }}
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-neutral-900 m-0 mb-1.5">
                Delete Product?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed m-0">
                Are you sure you want to permanently remove this garment from the database? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="h-11 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors flex-1 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="h-11 px-4 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex-1 min-h-[44px]"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
