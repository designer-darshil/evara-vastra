import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product, ProductStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  ExternalLink,
  Check,
  AlertCircle,
  Layers,
  Sparkles,
  DollarSign,
  Package,
  Truck,
  Globe,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { AdminMediaInput } from "../components/admin/AdminMediaInput";
import { ManagedMediaItem } from "../lib/media/types";

interface AdminProductEditPageProps {
  productId?: string;
  onNavigate: (href: string) => void;
}

interface ProductVariantState {
  id: string;
  size: string;
  color: string;
  sku: string;
  price: number;
  inventory: number;
}

export const AdminProductEditPage: React.FC<AdminProductEditPageProps> = ({
  productId,
  onNavigate,
}) => {
  const { products, addProduct, updateProduct, deleteProduct, categories, collections } = useData();

  const isEditing = !!productId && productId !== "new";
  const existingProduct = isEditing ? products.find((p) => p.id === productId) : null;

  // Unsaved changes tracking
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigationHref, setPendingNavigationHref] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    slug: "",
    code: "",
    category: "silk",
    collection: "silk-edit",
    price: 12500,
    compareAtPrice: 15500,
    fabric: "Pure Mulberry Silk",
    color: "Wine",
    colorHex: "#7C2430",
    occasions: ["wedding", "festive"],
    craft: "Handwoven Kadwa Pit Loom",
    shortDescription: "",
    description: "",
    featured: false,
    bestseller: false,
    newArrival: true,
    inStock: true,
    inventoryCount: 10,
    status: "published" as ProductStatus,
    images: [],
    details: {
      length: "5.5 metres",
      width: "45 inches (1.14 m)",
      weaveType: "Handloom Kadwa Weave",
      zariType: "Antique Tested Gold Zari",
      weight: "540 grams",
      origin: "Varanasi, Uttar Pradesh",
      craftTime: "14 days on handloom",
      care: "Professional dry clean only. Wrap in breathable cotton muslin.",
      palluDetails: "Richly woven geometric and floral jaal in gold zari",
      borderDetails: "3-inch temple border with delicate chevron selvedge",
      boxIncludes: "Garment / Saree, Cotton Preservation Pouch, Artisan Card",
    },
    stylingNotes: "Pair with handcrafted gold jewellery and statement footwear.",
    drapeTip: "Make 5–6 structured pleats at the waist for an upright, commanding silhouette.",
    seoTitle: "",
    seoDescription: "",
  });

  // Media Items State (for AdminMediaInput)
  const [mediaItems, setMediaItems] = useState<ManagedMediaItem[]>([]);

  // Variants State
  const [variants, setVariants] = useState<ProductVariantState[]>([
    { id: "var-1", size: "Free Size (5.5m + 0.8m Blouse)", color: "Wine", sku: "EV-SILK-WINE-FS", price: 12500, inventory: 10 },
  ]);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSeoSection, setShowSeoSection] = useState(false);
  const [showShippingSection, setShowShippingSection] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize from existing product
  useEffect(() => {
    if (existingProduct) {
      setFormData(existingProduct);
      if (existingProduct.images && existingProduct.images.length > 0) {
        setMediaItems(
          existingProduct.images.map((url, idx) => ({
            id: `img-${idx}-${Date.now()}`,
            url,
            source: url.startsWith("data:") ? "UPLOAD" : "URL",
            type: "image",
            alt: `${existingProduct.title} - View ${idx + 1}`,
            sortOrder: idx,
            createdAt: new Date().toISOString(),
          }))
        );
      }
      setIsDirty(false);
    }
  }, [existingProduct]);

  // Form field modifier with dirty tracking
  const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const updateDetailsField = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [key]: value,
      },
    }));
    setIsDirty(true);
  };

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEditing ? autoSlug : prev.slug,
      code: !isEditing && !prev.code ? `EV-${val.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 899)}` : prev.code,
    }));
    setIsDirty(true);
  };

  // Media state change
  const handleMediaChange = (newMedia: ManagedMediaItem[]) => {
    setMediaItems(newMedia);
    setFormData((prev) => ({
      ...prev,
      images: newMedia.map((m) => m.url),
    }));
    setIsDirty(true);
  };

  // Variant Actions
  const handleAddVariant = () => {
    const newVar: ProductVariantState = {
      id: `var-${Date.now()}`,
      size: "Custom / Made to Measure",
      color: formData.color || "Standard",
      sku: `${formData.code || "EV"}-${variants.length + 1}`,
      price: formData.price || 0,
      inventory: 5,
    };
    setVariants([...variants, newVar]);
    setIsDirty(true);
  };

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
    setIsDirty(true);
  };

  const handleVariantChange = (id: string, field: keyof ProductVariantState, value: any) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
    setIsDirty(true);
  };

  // Safe Navigation Handler
  const safeNavigate = (href: string) => {
    if (isDirty) {
      setPendingNavigationHref(href);
      setShowUnsavedModal(true);
    } else {
      onNavigate(href);
    }
  };

  // Save / Publish
  const handleSave = (targetStatus?: ProductStatus) => {
    setErrorMessage(null);

    if (!formData.title?.trim()) {
      setErrorMessage("Product title is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!formData.price || formData.price <= 0) {
      setErrorMessage("Please enter a valid product selling price.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSaving(true);

    const now = new Date().toISOString();
    const productPayload: Product = {
      ...(existingProduct || {}),
      id: isEditing && existingProduct ? existingProduct.id : `prod-${Date.now()}`,
      title: formData.title.trim(),
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: formData.code || formData.sku || `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      code: formData.code || formData.sku || `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      category: formData.category || "silk",
      collection: formData.collection || "silk-edit",
      collections: formData.collection ? [formData.collection] : (existingProduct?.collections || ["silk-edit"]),
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
      discountPercentage: discountPercentage || undefined,
      fabric: formData.fabric || "Pure Silk",
      color: formData.color || "Crimson",
      colorHex: formData.colorHex || "#734E06",
      colors: [formData.color || "Crimson"],
      sizes: variants.map((v) => v.size),
      variants: variants.map((v) => ({
        id: v.id,
        title: v.size,
        size: v.size,
        color: v.color,
        sku: v.sku,
        price: v.price,
        inStock: v.inventory > 0,
      })),
      occasions: formData.occasions || ["festive"],
      craft: formData.craft || "Handloom",
      shortDescription: formData.shortDescription || "",
      description: formData.description || "",
      featured: !!formData.featured,
      bestseller: !!formData.bestseller,
      newArrival: !!formData.newArrival,
      inStock: formData.inStock ?? true,
      inventory: Number(formData.inventoryCount || 0),
      inventoryCount: Number(formData.inventoryCount || 0),
      status: targetStatus || formData.status || "published",
      images: mediaItems.map((m) => m.url),
      tags: existingProduct?.tags || ["saree", "luxury", "handloom"],
      details: formData.details || {},
      stylingNotes: formData.stylingNotes || "",
      drapeTip: formData.drapeTip || "",
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.shortDescription,
      createdAt: existingProduct?.createdAt || now,
      updatedAt: now,
    };

    try {
      if (isEditing && existingProduct) {
        updateProduct(existingProduct.id, productPayload);
      } else {
        addProduct(productPayload);
      }

      setIsDirty(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch {
      setErrorMessage("Failed to save product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const discountPercentage =
    formData.compareAtPrice && formData.price && formData.compareAtPrice > formData.price
      ? Math.round(((formData.compareAtPrice - formData.price) / formData.compareAtPrice) * 100)
      : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 lg:pb-12">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <Breadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Products", href: "/admin/products" },
              { label: isEditing ? (formData.title || "Edit Product") : "New Product" },
            ]}
            onNavigate={safeNavigate}
          />
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={() => safeNavigate("/admin/products")}
              className="p-1 text-neutral-500 hover:text-neutral-900 rounded-sm"
              title="Back to Products"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 m-0">
              {isEditing ? "Edit Product" : "Create New Product"}
            </h1>
            {isDirty && (
              <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-sm border border-amber-300">
                Unsaved Changes
              </span>
            )}
          </div>
        </div>

        {/* Desktop Top Save Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => safeNavigate("/admin/products")}
            className="text-xs font-semibold"
          >
            Cancel
          </Button>

          {isEditing && formData.slug && (
            <button
              type="button"
              onClick={() => window.open(`/product/${formData.slug}`, "_blank")}
              className="p-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-sm text-xs flex items-center gap-1.5"
              title="View on Storefront"
            >
              <ExternalLink className="w-4 h-4" /> Storefront
            </button>
          )}

          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="text-xs font-semibold"
          >
            Save Draft
          </Button>

          <Button
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider px-5 shadow-xs"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {isSaving ? "Saving..." : isEditing ? "Save & Update" : "Publish Product"}
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-sm flex items-center gap-2 font-medium">
          <Check className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Product saved and published successfully across storefront and catalog indices.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs rounded-sm flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Responsive Layout Grid: Main Column + Side Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ======================================================== */}
        {/* MAIN COLUMN (2 cols on Desktop, Full Width on Mobile)     */}
        {/* ======================================================== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Product Information */}
          <div className="bg-white p-5 sm:p-6 border border-neutral-200 rounded-sm shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#734E06]" /> 1. Product Identification
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Royal Crimson Kadwa Handloom Saree"
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-sm text-sm text-neutral-900 focus:border-[#734E06] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Product Code / Base SKU *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code || ""}
                    onChange={(e) => updateField("code", e.target.value)}
                    placeholder="EV-SILK-001"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ""}
                    onChange={(e) => updateField("slug", e.target.value)}
                    placeholder="royal-crimson-kadwa-saree"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Primary Category *
                  </label>
                  <select
                    value={formData.category || "silk"}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none font-medium cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Curated Collection
                  </label>
                  <select
                    value={formData.collection || ""}
                    onChange={(e) => updateField("collection", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none font-medium cursor-pointer"
                  >
                    <option value="">None (Standard Catalog)</option>
                    {collections.map((col) => (
                      <option key={col.id} value={col.slug}>
                        {col.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    value={formData.fabric || ""}
                    onChange={(e) => updateField("fabric", e.target.value)}
                    placeholder="Pure Katan Silk"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={formData.color || ""}
                    onChange={(e) => updateField("color", e.target.value)}
                    placeholder="Crimson Red"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Color Swatch Hex
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.colorHex || "#734E06"}
                      onChange={(e) => updateField("colorHex", e.target.value)}
                      className="w-8 h-8 rounded-xs border border-neutral-300 p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.colorHex || "#734E06"}
                      onChange={(e) => updateField("colorHex", e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-neutral-300 rounded-sm text-xs uppercase"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Weaving Technique & Craft Legacy
                </label>
                <input
                  type="text"
                  value={formData.craft || ""}
                  onChange={(e) => updateField("craft", e.target.value)}
                  placeholder="Handloom Kadwa Weave on Pit Loom with Antique Gold Zari"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Media Management */}
          <div className="bg-white p-5 sm:p-6 border border-neutral-200 rounded-sm shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#734E06]" /> 2. Product Imagery & Media
            </h2>

            <AdminMediaInput
              type="image"
              items={mediaItems}
              onChange={handleMediaChange}
              maxItems={8}
              label="High-Resolution Gallery"
              helperText="Upload images from device / mobile gallery or paste external CDN URLs. Drag or use arrows to reorder."
            />
          </div>

          {/* Section 3: Description & Atelier Notes */}
          <div className="bg-white p-5 sm:p-6 border border-neutral-200 rounded-sm shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#734E06]" /> 3. Descriptions & Artisan Story
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Brief Summary (Card & Quick View)
                </label>
                <input
                  type="text"
                  value={formData.shortDescription || ""}
                  onChange={(e) => updateField("shortDescription", e.target.value)}
                  placeholder="A handwoven masterpiece in pure mulberry silk featuring tested zari jaal."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Craft Narrative & Product Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Elaborate craft description, artisan history, and fabric heritage..."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Drape & Styling Advice
                  </label>
                  <textarea
                    rows={2}
                    value={formData.drapeTip || ""}
                    onChange={(e) => updateField("drapeTip", e.target.value)}
                    placeholder="Structure 5–6 pleats for a regal drape..."
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Garment Care Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.details?.care || ""}
                    onChange={(e) => updateDetailsField("care", e.target.value)}
                    placeholder="Dry clean only. Wrap in breathable muslin..."
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Variants Management */}
          <div className="bg-white p-5 sm:p-6 border border-neutral-200 rounded-sm shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#734E06]" /> 4. Product Variants & SKU Matrix
              </h2>
              <button
                type="button"
                onClick={handleAddVariant}
                className="flex items-center gap-1 text-xs font-bold text-[#734E06] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Variant
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Size / Cut</th>
                    <th className="py-2.5 px-3">Color</th>
                    <th className="py-2.5 px-3">Variant SKU</th>
                    <th className="py-2.5 px-3">Price (₹)</th>
                    <th className="py-2.5 px-3">Stock</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {variants.map((v) => (
                    <tr key={v.id}>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={v.size}
                          onChange={(e) => handleVariantChange(v.id, "size", e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-neutral-300 rounded-xs text-xs"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={v.color}
                          onChange={(e) => handleVariantChange(v.id, "color", e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-neutral-300 rounded-xs text-xs"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={v.sku}
                          onChange={(e) => handleVariantChange(v.id, "sku", e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-neutral-300 rounded-xs text-xs font-mono"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => handleVariantChange(v.id, "price", Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-white border border-neutral-300 rounded-xs text-xs"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={v.inventory}
                          onChange={(e) => handleVariantChange(v.id, "inventory", Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white border border-neutral-300 rounded-xs text-xs"
                        />
                      </td>
                      <td className="py-2 px-3 text-right">
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(v.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Variant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View (320px - 640px) */}
            <div className="sm:hidden space-y-3">
              {variants.map((v, idx) => (
                <div key={v.id} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-neutral-800">
                    <span>Variant #{idx + 1}</span>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(v.id)}
                        className="text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-0.5">Size / Cut</label>
                    <input
                      type="text"
                      value={v.size}
                      onChange={(e) => handleVariantChange(v.id, "size", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-0.5">SKU</label>
                      <input
                        type="text"
                        value={v.sku}
                        onChange={(e) => handleVariantChange(v.id, "sku", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-0.5">Price (₹)</label>
                      <input
                        type="number"
                        value={v.price}
                        onChange={(e) => handleVariantChange(v.id, "price", Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-0.5">Stock Units</label>
                    <input
                      type="number"
                      value={v.inventory}
                      onChange={(e) => handleVariantChange(v.id, "inventory", Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Shipping Dimensions (Collapsible) */}
          <div className="bg-white border border-neutral-200 rounded-sm shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowShippingSection(!showShippingSection)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#734E06]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0">
                  5. Shipping & Logistics Dimensions
                </h2>
              </div>
              <span className="text-xs text-[#734E06] font-bold">
                {showShippingSection ? "Collapse ▲" : "Expand ▼"}
              </span>
            </button>

            {showShippingSection && (
              <div className="p-5 sm:p-6 border-t border-neutral-200 space-y-4 text-xs bg-neutral-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">Weight (g)</label>
                    <input
                      type="text"
                      value={formData.details?.weight || "550 grams"}
                      onChange={(e) => updateDetailsField("weight", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">Length</label>
                    <input
                      type="text"
                      value={formData.details?.length || "5.5 metres"}
                      onChange={(e) => updateDetailsField("length", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">Width</label>
                    <input
                      type="text"
                      value={formData.details?.width || "45 inches"}
                      onChange={(e) => updateDetailsField("width", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">Origin City</label>
                    <input
                      type="text"
                      value={formData.details?.origin || "Surat, Gujarat"}
                      onChange={(e) => updateDetailsField("origin", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Search Engine Optimization (SEO) (Collapsible) */}
          <div className="bg-white border border-neutral-200 rounded-sm shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSeoSection(!showSeoSection)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#734E06]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0">
                  6. Search Engine Optimization (SEO)
                </h2>
              </div>
              <span className="text-xs text-[#734E06] font-bold">
                {showSeoSection ? "Collapse ▲" : "Expand ▼"}
              </span>
            </button>

            {showSeoSection && (
              <div className="p-5 sm:p-6 border-t border-neutral-200 space-y-4 text-xs bg-neutral-50/50">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-bold uppercase text-neutral-700">SEO Page Title</label>
                    <span className="text-[10px] text-neutral-400">
                      {(formData.seoTitle || "").length} / 70 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.seoTitle || ""}
                    onChange={(e) => updateField("seoTitle", e.target.value)}
                    placeholder={formData.title || "Custom search title"}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs focus:border-[#734E06] outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-bold uppercase text-neutral-700">Meta Description</label>
                    <span className="text-[10px] text-neutral-400">
                      {(formData.seoDescription || "").length} / 160 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.seoDescription || ""}
                    onChange={(e) => updateField("seoDescription", e.target.value)}
                    placeholder="Concise, keyword-rich summary for search listings..."
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs focus:border-[#734E06] outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SIDEBAR COLUMN (Right Column on Desktop, Stacked on Mobile) */}
        {/* ======================================================== */}
        <div className="space-y-6">
          {/* Side Card 1: Publishing & Status */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center justify-between">
              <span>Publishing Status</span>
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  formData.status === "published"
                    ? "bg-emerald-100 text-emerald-900"
                    : formData.status === "draft"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-neutral-200 text-neutral-800"
                }`}
              >
                {formData.status}
              </span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Visibility Status</label>
                <select
                  value={formData.status || "published"}
                  onChange={(e) => updateField("status", e.target.value as ProductStatus)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs font-semibold cursor-pointer"
                >
                  <option value="published">Published (Visible in Store)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="archived">Archived (Delisted)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-neutral-100 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.featured}
                    onChange={(e) => updateField("featured", e.target.checked)}
                    className="w-4 h-4 text-[#734E06] rounded-xs"
                  />
                  <span className="text-neutral-700 font-medium">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.bestseller}
                    onChange={(e) => updateField("bestseller", e.target.checked)}
                    className="w-4 h-4 text-[#734E06] rounded-xs"
                  />
                  <span className="text-neutral-700 font-medium">Bestseller Ribbon</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.newArrival}
                    onChange={(e) => updateField("newArrival", e.target.checked)}
                    className="w-4 h-4 text-[#734E06] rounded-xs"
                  />
                  <span className="text-neutral-700 font-medium">New Arrival Badge</span>
                </label>
              </div>
            </div>
          </div>

          {/* Side Card 2: Pricing & Value */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#734E06]" /> Pricing & Offers
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-neutral-700 mb-1">
                  Active Selling Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price || ""}
                  onChange={(e) => updateField("price", Number(e.target.value))}
                  placeholder="12500"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-sm font-bold text-neutral-900 focus:border-[#734E06] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-neutral-700 mb-1">
                  Compare-at (Original MRP) (₹)
                </label>
                <input
                  type="number"
                  value={formData.compareAtPrice || ""}
                  onChange={(e) => updateField("compareAtPrice", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="15500"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-600 focus:border-[#734E06] outline-none"
                />
              </div>

              {discountPercentage !== null && discountPercentage > 0 && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-900 text-[11px] flex items-center justify-between font-bold">
                  <span>Customer Discount:</span>
                  <span>{discountPercentage}% OFF MRP</span>
                </div>
              )}
            </div>
          </div>

          {/* Side Card 3: Inventory Stock Controls */}
          <div className="bg-white p-5 border border-neutral-200 rounded-sm shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#734E06]" /> Inventory & Stock
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock ?? true}
                  onChange={(e) => updateField("inStock", e.target.checked)}
                  className="w-4 h-4 text-[#734E06] rounded-xs"
                />
                <span className="text-neutral-900 font-bold">Allow Immediate Purchase</span>
              </label>

              <div>
                <label className="block font-bold uppercase text-neutral-700 mb-1">
                  Available Quantity in Atelier
                </label>
                <input
                  type="number"
                  value={formData.inventoryCount || 0}
                  onChange={(e) => updateField("inventoryCount", Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Side Card 4: Delete Product (Editing mode only) */}
          {isEditing && existingProduct && (
            <div className="bg-red-50/50 p-4 border border-red-200 rounded-sm space-y-2">
              <span className="text-xs font-bold text-red-900 block">Danger Zone</span>
              <p className="text-[11px] text-red-700 m-0">
                Permanently delist and remove this piece from the catalog.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to permanently delete "${formData.title}"?`)) {
                    deleteProduct(existingProduct.id);
                    onNavigate("/admin/products");
                  }
                }}
                className="w-full py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors mt-2"
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE STICKY ACTION FOOTER (Visible on Mobile only)       */}
      {/* ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 p-3 sm:hidden shadow-lg flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => handleSave("draft")}
          disabled={isSaving}
          className="flex-1 text-xs font-bold"
        >
          Save Draft
        </Button>
        <Button
          onClick={() => handleSave("published")}
          disabled={isSaving}
          className="flex-1 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider"
        >
          <Save className="w-4 h-4 mr-1" />
          {isSaving ? "Saving..." : isEditing ? "Save & Update" : "Publish"}
        </Button>
      </div>

      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedModal && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
        >
          <div className="bg-white border border-neutral-200 rounded-sm max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-sm font-bold text-neutral-900 m-0">Unsaved Changes</h3>
            </div>
            <p className="text-xs text-neutral-600 m-0 leading-relaxed">
              You have unsaved changes on this product. Navigating away now will discard your recent updates.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUnsavedModal(false)}
                className="px-3 py-1.5 border border-neutral-300 text-neutral-700 text-xs rounded-sm hover:bg-neutral-50 font-medium"
              >
                Continue Editing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUnsavedModal(false);
                  setIsDirty(false);
                  if (pendingNavigationHref) onNavigate(pendingNavigationHref);
                }}
                className="px-3 py-1.5 bg-red-700 text-white text-xs font-bold uppercase rounded-sm hover:bg-red-800"
              >
                Leave Without Saving
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
