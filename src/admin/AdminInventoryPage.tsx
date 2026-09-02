import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { InventoryAdjustmentReason, Product } from "../types";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  History,
  X,
} from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminToolbar } from "../components/admin/ui/AdminToolbar";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminEmptyState } from "../components/admin/ui/AdminEmptyState";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect, AdminTextarea } from "../components/admin/ui/AdminInputs";

export const AdminInventoryPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { products, inventoryAdjustments, adjustInventory } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock">("all");
  const [activeTab, setActiveTab] = useState<"inventory" | "history">("inventory");

  // Adjustment Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState<InventoryAdjustmentReason>("restock");
  const [adjustmentNote, setAdjustmentNote] = useState<string>("");
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  // Stats
  const totalUnits = products.reduce((acc, p) => acc + (p.inventoryCount ?? p.inventory ?? 0), 0);
  const lowStockProducts = products.filter(
    (p) => (p.inventoryCount ?? p.inventory ?? 0) <= 3 && (p.inventoryCount ?? p.inventory ?? 0) > 0
  );
  const outOfStockProducts = products.filter(
    (p) => (p.inventoryCount ?? p.inventory ?? 0) <= 0 || !p.inStock
  );
  const inStockProducts = products.filter(
    (p) => (p.inventoryCount ?? p.inventory ?? 0) > 3
  );

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const qty = product.inventoryCount ?? product.inventory ?? 0;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.sku || product.code || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "low_stock") return qty <= 3 && qty > 0;
    if (statusFilter === "out_of_stock") return qty <= 0 || !product.inStock;
    if (statusFilter === "in_stock") return qty > 3;

    return true;
  });

  const handleOpenAdjust = (product: Product) => {
    setSelectedProduct(product);
    setNewQuantity(product.inventoryCount ?? product.inventory ?? 0);
    setAdjustmentReason("restock");
    setAdjustmentNote("");
    setIsAdjustModalOpen(true);
  };

  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    adjustInventory(
      selectedProduct.id,
      Number(newQuantity),
      adjustmentReason,
      adjustmentNote
    );

    setIsAdjustModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Inventory & Stock Management"
        description="Monitor real-time atelier warehouse stock levels, low-stock warnings, and audit adjustment trails."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Inventory & Stock" },
            ]}
            onNavigate={onNavigate}
          />
        }
        actions={
          <div className="flex bg-neutral-100 p-1 rounded-sm border border-neutral-200">
            <button
              onClick={() => setActiveTab("inventory")}
              className={`h-9 px-3.5 text-xs font-semibold rounded-xs transition-colors ${
                activeTab === "inventory"
                  ? "bg-white text-neutral-900 shadow-2xs font-bold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Stock Levels ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`h-9 px-3.5 text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-white text-neutral-900 shadow-2xs font-bold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Audit Trail ({inventoryAdjustments.length})
            </button>
          </div>
        }
      />

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <AdminCard className="p-4 sm:p-5">
          <span className="text-xs font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Total Inventory Units
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif">{totalUnits}</span>
          <span className="text-xs text-neutral-400 block mt-1">Across {products.length} SKUs</span>
        </AdminCard>

        <AdminCard className="p-4 sm:p-5">
          <span className="text-xs font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            In Stock SKUs
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-700 font-serif">{inStockProducts.length}</span>
          <span className="text-xs text-emerald-600 block mt-1">Healthy replenishment level</span>
        </AdminCard>

        <AdminCard className={`p-4 sm:p-5 ${lowStockProducts.length > 0 ? "border-amber-300" : ""}`}>
          <span className="text-xs font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Low Stock Alerts
          </span>
          <span className={`text-2xl sm:text-3xl font-bold font-serif ${lowStockProducts.length > 0 ? "text-amber-700" : "text-neutral-900"}`}>
            {lowStockProducts.length}
          </span>
          <span className="text-xs text-amber-600 block mt-1">≤ 3 units available</span>
        </AdminCard>

        <AdminCard className={`p-4 sm:p-5 ${outOfStockProducts.length > 0 ? "border-red-300" : ""}`}>
          <span className="text-xs font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Sold Out SKUs
          </span>
          <span className={`text-2xl sm:text-3xl font-bold font-serif ${outOfStockProducts.length > 0 ? "text-red-700" : "text-neutral-900"}`}>
            {outOfStockProducts.length}
          </span>
          <span className="text-xs text-red-600 block mt-1">Requiring weave production</span>
        </AdminCard>
      </div>

      {/* 3. Main Content Tab Views */}
      {activeTab === "inventory" ? (
        <AdminCard noPadding>
          {/* Toolbar */}
          <div className="p-4 sm:p-5 border-b border-neutral-200">
            <AdminToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search inventory by title, SKU, or category..."
              filters={
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="h-10 px-3 bg-white border border-neutral-300 rounded-sm text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] min-h-[40px] flex-1 sm:flex-initial"
                  >
                    <option value="all">All Inventory ({products.length})</option>
                    <option value="in_stock">In Stock ({inStockProducts.length})</option>
                    <option value="low_stock">Low Stock (≤ 3)</option>
                    <option value="out_of_stock">Sold Out (0)</option>
                  </select>
                </div>
              }
            />
          </div>

          {/* Mobile View: Product Cards (< 768px) */}
          <div className="md:hidden divide-y divide-neutral-100">
            {filteredProducts.map((p) => {
              const qty = p.inventoryCount ?? p.inventory ?? 0;
              const isLow = qty <= 3 && qty > 0;
              const isOut = qty <= 0 || !p.inStock;

              return (
                <div key={p.id} className="p-4 sm:p-5 space-y-3 bg-white">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-14 h-18 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-neutral-900 text-sm block truncate" title={p.title}>
                        {p.title}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono block mt-0.5">
                        SKU: {p.sku || p.code} • {p.category}
                      </span>
                      <span className="text-xs font-semibold text-[#734E06] block mt-1">
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <AdminBadge variant={isOut ? "danger" : isLow ? "warning" : "success"} size="sm">
                      {qty} units {isOut ? "(Sold Out)" : isLow ? "(Low Stock)" : "(In Stock)"}
                    </AdminBadge>

                    <button
                      onClick={() => handleOpenAdjust(p)}
                      className="h-9 px-3.5 bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] text-neutral-800 font-semibold rounded-sm text-xs transition-colors"
                    >
                      Adjust Stock
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <AdminEmptyState
                title="No Inventory Records Match"
                description="Try changing your search keywords or stock filter."
              />
            )}
          </div>

          {/* Desktop Table View (>= 768px) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                  <th className="py-3.5 px-5">Product Details</th>
                  <th className="py-3.5 px-4">SKU / Code</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">Available Stock</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {filteredProducts.map((product) => {
                  const qty = product.inventoryCount ?? product.inventory ?? 0;
                  const isLow = qty <= 3 && qty > 0;
                  const isOut = qty <= 0 || !product.inStock;

                  return (
                    <tr key={product.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-11 h-14 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-neutral-900 block truncate max-w-xs" title={product.title}>
                              {product.title}
                            </span>
                            <span className="text-xs text-neutral-500 block mt-0.5">
                              {product.fabric} • ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs text-neutral-600">
                        {product.sku || product.code}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-600 capitalize">
                        {product.category}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <AdminBadge variant={isOut ? "danger" : isLow ? "warning" : "neutral"} size="sm">
                          {qty} units
                        </AdminBadge>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {isOut ? (
                          <AdminBadge variant="danger" size="sm">
                            <XCircle className="w-3 h-3 mr-1" /> Sold Out
                          </AdminBadge>
                        ) : isLow ? (
                          <AdminBadge variant="warning" size="sm">
                            <AlertTriangle className="w-3 h-3 mr-1" /> Low Stock
                          </AdminBadge>
                        ) : (
                          <AdminBadge variant="success" size="sm">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> In Stock
                          </AdminBadge>
                        )}
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => handleOpenAdjust(product)}
                          className="h-9 px-3.5 bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] text-neutral-800 font-semibold rounded-sm text-xs transition-colors"
                        >
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <AdminEmptyState
                        title="No Inventory Records Match"
                        description="Try changing your search keywords or stock filter."
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>
      ) : (
        /* History Tab */
        <AdminCard title="Inventory Adjustment Audit History" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                  <th className="py-3.5 px-5">Timestamp</th>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4 text-center">Change</th>
                  <th className="py-3.5 px-4">Reason</th>
                  <th className="py-3.5 px-5">Adjusted By & Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {inventoryAdjustments.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-xs text-neutral-500">
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-900">
                      {log.productTitle}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="text-neutral-500">{log.previousInventory}</span> →{" "}
                      <strong className="text-neutral-900">{log.newInventory}</strong>
                      <span className={`text-xs ml-1.5 font-bold ${
                        log.changeAmount > 0 ? "text-emerald-700" : "text-red-700"
                      }`}>
                        ({log.changeAmount > 0 ? `+${log.changeAmount}` : log.changeAmount})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 capitalize text-neutral-700">
                      <AdminBadge variant="neutral" size="sm">
                        {log.reason}
                      </AdminBadge>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-neutral-600">
                      <span className="font-semibold text-neutral-900 block">{log.actorName}</span>
                      {log.note && <span className="text-neutral-500 block mt-0.5 italic">"{log.note}"</span>}
                    </td>
                  </tr>
                ))}

                {inventoryAdjustments.length === 0 && (
                  <tr>
                    <td colSpan={5}>
                      <AdminEmptyState
                        icon={<History className="w-8 h-8 text-neutral-400" />}
                        title="No Inventory Audit Logs Yet"
                        description="Manual stock adjustments and automatic fulfillment orders will be logged here."
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}

      {/* 4. Stock Adjustment Modal */}
      {isAdjustModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setIsAdjustModalOpen(false)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
                Adjust Stock • {selectedProduct.sku}
              </h3>
              <button
                onClick={() => setIsAdjustModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdjustment} className="space-y-4">
              <div className="p-3 bg-neutral-50 rounded-sm text-xs space-y-1">
                <span className="font-bold text-neutral-900 block">{selectedProduct.title}</span>
                <span className="text-neutral-500 block">
                  Current Count: <strong>{selectedProduct.inventoryCount ?? selectedProduct.inventory ?? 0} units</strong>
                </span>
              </div>

              <AdminField label="New Physical Stock Units" required>
                <AdminInput
                  type="number"
                  required
                  min="0"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                />
              </AdminField>

              <AdminField label="Adjustment Reason" required>
                <AdminSelect
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value as any)}
                >
                  <option value="restock">Loom Restock / Fresh Production</option>
                  <option value="damage">Damaged Garment / Scrap</option>
                  <option value="correction">Physical Count Audit Correction</option>
                  <option value="return_restock">Customer Return Restock</option>
                </AdminSelect>
              </AdminField>

              <AdminField label="Internal Audit Memo">
                <AdminTextarea
                  rows={2}
                  value={adjustmentNote}
                  onChange={(e) => setAdjustmentNote(e.target.value)}
                  placeholder="e.g. Received 10 fresh pieces from Varanasi workshop batch #41."
                />
              </AdminField>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
