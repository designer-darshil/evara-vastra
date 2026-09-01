import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { InventoryAdjustmentReason, Product } from "../types";
import {
  Warehouse,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  History,
  X,
} from "lucide-react";

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
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Inventory & Stock" },
            ]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Inventory & Stock Management
          </h1>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-neutral-100 p-1 rounded-sm border border-neutral-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
              activeTab === "inventory"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Stock Levels ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 ${
              activeTab === "history"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Audit History ({inventoryAdjustments.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Total Inventory Units
          </span>
          <span className="text-2xl font-bold text-neutral-900">{totalUnits}</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Across {products.length} SKUs</span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            In Stock SKUs
          </span>
          <span className="text-2xl font-bold text-emerald-700">{inStockProducts.length}</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Ready for dispatch</span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Low Stock Alerts
          </span>
          <span className="text-2xl font-bold text-amber-700">{lowStockProducts.length}</span>
          <span className="text-[11px] text-amber-600 block mt-1">≤ 3 items left</span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Out of Stock
          </span>
          <span className="text-2xl font-bold text-red-700">{outOfStockProducts.length}</span>
          <span className="text-[11px] text-red-600 block mt-1">Action required</span>
        </div>
      </div>

      {activeTab === "inventory" ? (
        /* Inventory Table View */
        <div className="bg-white border border-neutral-200 rounded-sm shadow-xs">
          {/* Filter / Search Bar */}
          <div className="p-4 border-b border-neutral-200 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product title, SKU, or category..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-neutral-500 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-sm text-neutral-700 outline-none cursor-pointer"
              >
                <option value="all">All Statuses ({products.length})</option>
                <option value="in_stock">In Stock ({inStockProducts.length})</option>
                <option value="low_stock">Low Stock Alerts ({lowStockProducts.length})</option>
                <option value="out_of_stock">Sold Out ({outOfStockProducts.length})</option>
              </select>
            </div>
          </div>

          {/* Mobile View: Stacked Inventory Cards (Visible on <640px) */}
          <div className="sm:hidden divide-y divide-neutral-200">
            {filteredProducts.map((product) => {
              const qty = product.inventoryCount ?? product.inventory ?? 0;
              const isLow = qty <= 3 && qty > 0;
              const isOut = qty <= 0 || !product.inStock;

              return (
                <div key={product.id} className="p-4 space-y-2.5 bg-white">
                  <div className="flex items-start gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-12 h-14 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-neutral-900 text-xs block truncate" title={product.title}>
                        {product.title}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono block">
                        SKU: {product.sku} • {product.category}
                      </span>
                      <span className="text-[11px] font-semibold text-[#734E06] block mt-0.5">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[11px] font-bold ${
                          isOut
                            ? "bg-red-100 text-red-800"
                            : isLow
                            ? "bg-amber-100 text-amber-900"
                            : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {qty} units
                      </span>
                      {isOut ? (
                        <span className="text-[9px] font-bold uppercase text-red-700 bg-red-50 px-1.5 py-0.5 rounded-xs border border-red-200">
                          Sold Out
                        </span>
                      ) : isLow ? (
                        <span className="text-[9px] font-bold uppercase text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-xs border border-amber-300">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs border border-emerald-200">
                          In Stock
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleOpenAdjust(product)}
                      className="px-3 py-1 bg-white border border-neutral-300 hover:border-brand hover:text-brand text-neutral-800 font-bold rounded-sm text-xs shadow-2xs"
                    >
                      Adjust Stock
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center text-neutral-500 text-xs">
                No products found matching the criteria.
              </div>
            )}
          </div>

          {/* Desktop Table View (Visible on >=640px) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                  <th className="py-3 px-4">Product Details</th>
                  <th className="py-3 px-4">SKU / Code</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Available Stock</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filteredProducts.map((product) => {
                  const qty = product.inventoryCount ?? product.inventory ?? 0;
                  const isLow = qty <= 3 && qty > 0;
                  const isOut = qty <= 0 || !product.inStock;

                  return (
                    <tr key={product.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-13 object-cover rounded-xs border border-neutral-200 shrink-0 bg-neutral-100"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-neutral-900 block truncate max-w-xs" title={product.title}>
                              {product.title}
                            </span>
                            <span className="text-[11px] text-neutral-500">
                              {product.fabric} • ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-neutral-600">
                        {product.sku}
                      </td>
                      <td className="py-3 px-4 text-neutral-600 capitalize">
                        {product.category}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-neutral-900">
                        <span className={`px-2.5 py-1 rounded-sm text-xs ${
                          isOut
                            ? "bg-red-100 text-red-800"
                            : isLow
                            ? "bg-amber-100 text-amber-900 font-bold"
                            : "bg-neutral-100 text-neutral-800"
                        }`}>
                          {qty} units
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-sm">
                            <XCircle className="w-3 h-3" /> Sold Out
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-sm">
                            <AlertTriangle className="w-3 h-3" /> Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
                            <CheckCircle2 className="w-3 h-3" /> In Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenAdjust(product)}
                          className="px-3 py-1.5 bg-white border border-neutral-300 hover:border-brand hover:text-brand text-neutral-700 font-semibold rounded-sm text-xs transition-colors shadow-2xs"
                        >
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500">
                      No products found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Inventory History View */
        <div className="bg-white border border-neutral-200 rounded-sm shadow-xs">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 m-0">
                Inventory Audit Trail & Mutation Log
              </h3>
              <p className="text-xs text-neutral-500 m-0 mt-0.5">
                Immutable records of all stock modifications with reason codes and operator identity.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Product / SKU</th>
                  <th className="py-3 px-4">Reason Code</th>
                  <th className="py-3 px-4 text-center">Change</th>
                  <th className="py-3 px-4 text-center">New Level</th>
                  <th className="py-3 px-4">Operator / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {inventoryAdjustments.map((adj) => (
                  <tr key={adj.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                      {adj.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-900 block truncate max-w-xs" title={adj.productTitle}>
                        {adj.productTitle}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {adj.productSku}
                      </span>
                    </td>
                    <td className="py-3 px-4 capitalize font-medium text-neutral-700">
                      <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-sm text-[11px]">
                        {adj.reason}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold font-mono">
                      <span className={adj.changeAmount >= 0 ? "text-emerald-700" : "text-red-700"}>
                        {adj.changeAmount >= 0 ? `+${adj.changeAmount}` : adj.changeAmount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-neutral-900">
                      {adj.newInventory} units
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-800 block text-[11px]">
                        {adj.actorName}
                      </span>
                      {adj.note && (
                        <span className="text-[11px] text-neutral-500 italic block">
                          "{adj.note}"
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {inventoryAdjustments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500">
                      No stock adjustments have been recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {isAdjustModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-neutral-900 text-base m-0">
                  Adjust Inventory Level
                </h3>
              </div>
              <button
                onClick={() => setIsAdjustModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Summary */}
            <div className="bg-neutral-50 p-3 rounded-sm border border-neutral-200 flex items-center gap-3">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-12 h-16 object-cover rounded-xs border border-neutral-200 shrink-0 bg-white"
              />
              <div className="min-w-0">
                <span className="font-bold text-neutral-900 text-xs block truncate">
                  {selectedProduct.title}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 block">
                  SKU: {selectedProduct.sku}
                </span>
                <span className="text-[11px] text-neutral-600 block mt-0.5">
                  Current Stock: <strong>{selectedProduct.inventoryCount ?? selectedProduct.inventory ?? 0} units</strong>
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveAdjustment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  New Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none font-bold"
                />
                <span className="text-[11px] text-neutral-500 block mt-1">
                  Change:{" "}
                  <strong className={newQuantity - (selectedProduct.inventoryCount ?? selectedProduct.inventory ?? 0) >= 0 ? "text-emerald-700" : "text-red-700"}>
                    {newQuantity - (selectedProduct.inventoryCount ?? selectedProduct.inventory ?? 0) >= 0 ? `+${newQuantity - (selectedProduct.inventoryCount ?? selectedProduct.inventory ?? 0)}` : newQuantity - (selectedProduct.inventoryCount ?? selectedProduct.inventory ?? 0)} units
                  </strong>
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Reason for Adjustment
                </label>
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value as InventoryAdjustmentReason)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand outline-none"
                >
                  <option value="restock">Atelier Production Restock</option>
                  <option value="correction">Inventory Physical Audit Correction</option>
                  <option value="return">Customer Return Restock</option>
                  <option value="sale">Manual Order / Offline Sale</option>
                  <option value="damaged">Defective / Damaged Removal</option>
                  <option value="manual">Manual Adjustment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Internal Note / Reference
                </label>
                <input
                  type="text"
                  value={adjustmentNote}
                  onChange={(e) => setAdjustmentNote(e.target.value)}
                  placeholder="e.g., Loom batch #KAT-904 or Return RMA #8890"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:bg-white focus:border-brand outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-brand-foreground text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-hover transition-colors"
                >
                  Confirm & Audit Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
