import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product, ProductStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Save,
  Trash2,
  Plus,
  ExternalLink,
  Check,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { AdminMediaInput } from "../components/admin/AdminMediaInput";
import { ManagedMediaItem } from "../lib/media/types";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect, AdminTextarea } from "../components/admin/ui/AdminInputs";
import { AdminBadge } from "../components/admin/ui/AdminBadge";

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
    price: undefined,
    compareAtPrice: undefined,
    fabric: "",
    color: "",
    colorHex: "#734E06",
    occasions: ["festive"],
    craft: "",
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
      length: "",
      width: "",
      weaveType: "",
      zariType: "",
      weight: "",
      origin: "",
      craftTime: "",
      care: "",
      palluDetails: "",
      borderDetails: "",
      boxIncludes: "",
    },
    stylingNotes: "",
    drapeTip: "",
    seoTitle: "",
    seoDescription: "",
  });

  // Media Items State (for AdminMediaInput)
  const [mediaItems, setMediaItems] = useState<ManagedMediaItem[]>([]);

  // Variants State
  const [variants, setVariants] = useState<ProductVariantState[]>([]);

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

  // Form Submission
  const handleSave = async (overrideStatus?: ProductStatus) => {
    setErrorMessage(null);
    setSaveSuccess(false);

    if (!formData.title?.trim()) {
      setErrorMessage("Product title is required.");
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setErrorMessage("A valid positive selling price is required.");
      return;
    }
    if (!formData.code?.trim()) {
      setErrorMessage("Base SKU / Product code is required.");
      return;
    }

    setIsSaving(true);

    try {
      const finalStatus = overrideStatus || formData.status || "published";
      const productPayload: Omit<Product, "id"> = {
        title: formData.title.trim(),
        slug: formData.slug?.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        code: formData.code?.trim() || "EV-001",
        category: formData.category || "silk",
        collection: formData.collection || "silk-edit",
        collections: [formData.collection || "silk-edit"],
        variants: (existingProduct?.variants && existingProduct.variants.length > 0) ? existingProduct.variants : [],
        sizes: (existingProduct?.sizes && existingProduct.sizes.length > 0) ? existingProduct.sizes : ["Free Size (5.5m + 0.8m)"],
        colors: [formData.color || "Crimson"],
        tags: (existingProduct?.tags && existingProduct.tags.length > 0) ? existingProduct.tags : [formData.category || "silk", formData.fabric || "silk"],
        price: Number(formData.price),
        compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
        fabric: formData.fabric || "Pure Mulberry Silk",
        color: formData.color || "Crimson",
        colorHex: formData.colorHex || "#734E06",
        occasions: formData.occasions && formData.occasions.length > 0 ? formData.occasions : ["festive"],
        craft: formData.craft || "Handwoven",
        shortDescription: formData.shortDescription || "",
        description: formData.description || "",
        featured: !!formData.featured,
        bestseller: !!formData.bestseller,
        newArrival: !!formData.newArrival,
        inStock: formData.inStock ?? true,
        inventoryCount: Number(formData.inventoryCount ?? 10),
        status: finalStatus,
        images: formData.images && formData.images.length > 0
          ? formData.images
          : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"],
        details: {
          length: formData.details?.length || "5.5 metres",
          width: formData.details?.width || "45 inches",
          weaveType: formData.details?.weaveType || "Kadwa Handloom",
          zariType: formData.details?.zariType || "Tested Zari",
          weight: formData.details?.weight || "550 grams",
          origin: formData.details?.origin || "Surat, Gujarat",
          craftTime: formData.details?.craftTime || "14 days",
          care: formData.details?.care || "Dry clean only.",
          palluDetails: formData.details?.palluDetails || "Intricate Zari work",
          borderDetails: formData.details?.borderDetails || "Woven border",
          boxIncludes: formData.details?.boxIncludes || "Saree + Pouch",
        },
        stylingNotes: formData.stylingNotes || "",
        drapeTip: formData.drapeTip || "",
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.shortDescription,
        sku: formData.code?.trim() || "EV-001",
        inventory: Number(formData.inventoryCount ?? 10),
        createdAt: existingProduct?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEditing && productId) {
        updateProduct(productId, productPayload);
      } else {
        addProduct(productPayload);
      }

      setIsDirty(false);
      setSaveSuccess(true);

      setTimeout(() => {
        onNavigate("/admin/products");
      }, 800);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save product.");
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
      {/* 1. Header & Actions */}
      <AdminPageHeader
        title={isEditing ? "Edit Product" : "Create New Product"}
        description="Configure luxury catalog metadata, dual-mode media gallery, inventory matrix, and SEO."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Products", href: "/admin/products" },
              { label: isEditing ? (formData.title || "Edit Product") : "New Product" },
            ]}
            onNavigate={safeNavigate}
          />
        }
        badge={
          isDirty ? (
            <AdminBadge variant="warning" size="sm">
              Unsaved Changes
            </AdminBadge>
          ) : undefined
        }
        actions={
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => safeNavigate("/admin/products")}
              className="h-10 px-4 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold rounded-sm transition-colors min-h-[40px]"
            >
              Cancel
            </button>

            {isEditing && formData.slug && (
              <button
                type="button"
                onClick={() => window.open(`/product/${formData.slug}`, "_blank")}
                className="h-10 px-3.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-sm text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[40px]"
                title="View on Storefront"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Storefront
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="h-10 px-4 border border-neutral-300 text-neutral-800 hover:border-[#734E06] hover:text-[#734E06] bg-white text-xs font-semibold rounded-sm transition-colors min-h-[40px]"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => handleSave("published")}
              disabled={isSaving}
              className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs flex items-center gap-1.5 transition-colors min-h-[40px]"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Publish Product"}
            </button>
          </div>
        }
      />

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm rounded-sm flex items-center gap-2.5 font-medium">
          <Check className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Product saved and published successfully across storefront and catalog indices.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-sm rounded-sm flex items-center gap-2.5 font-medium">
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Responsive 2-Column Grid on Desktop, Single Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ======================================================== */}
        {/* MAIN COLUMN (2 cols on Desktop, Full Width on Mobile)     */}
        {/* ======================================================== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Product Identification */}
          <AdminCard title="1. Product Identification & Categorization">
            <div className="space-y-4">
              <AdminField label="Product Title" required>
                <AdminInput
                  required
                  value={formData.title || ""}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Royal Crimson Kadwa Handloom Saree"
                />
              </AdminField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField label="Product Code / Base SKU" required>
                  <AdminInput
                    required
                    value={formData.code || ""}
                    onChange={(e) => updateField("code", e.target.value)}
                    placeholder="EV-SILK-001"
                  />
                </AdminField>

                <AdminField label="URL Slug" hint="Auto-generated">
                  <AdminInput
                    value={formData.slug || ""}
                    onChange={(e) => updateField("slug", e.target.value)}
                    placeholder="royal-crimson-kadwa-saree"
                  />
                </AdminField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField label="Primary Category" required>
                  <AdminSelect
                    value={formData.category || "silk"}
                    onChange={(e) => updateField("category", e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </AdminSelect>
                </AdminField>

                <AdminField label="Curated Collection">
                  <AdminSelect
                    value={formData.collection || ""}
                    onChange={(e) => updateField("collection", e.target.value)}
                  >
                    <option value="">None (Standard Catalog)</option>
                    {collections.map((col) => (
                      <option key={col.id} value={col.slug}>
                        {col.title}
                      </option>
                    ))}
                  </AdminSelect>
                </AdminField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AdminField label="Fabric Composition">
                  <AdminInput
                    value={formData.fabric || ""}
                    onChange={(e) => updateField("fabric", e.target.value)}
                    placeholder="Pure Katan Silk"
                  />
                </AdminField>

                <AdminField label="Color Name">
                  <AdminInput
                    value={formData.color || ""}
                    onChange={(e) => updateField("color", e.target.value)}
                    placeholder="Crimson Red"
                  />
                </AdminField>

                <AdminField label="Color Swatch Hex">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.colorHex || "#734E06"}
                      onChange={(e) => updateField("colorHex", e.target.value)}
                      className="w-10 h-10 rounded-xs border border-neutral-300 p-0.5 cursor-pointer shrink-0"
                    />
                    <AdminInput
                      value={formData.colorHex || "#734E06"}
                      onChange={(e) => updateField("colorHex", e.target.value)}
                      className="uppercase font-mono"
                    />
                  </div>
                </AdminField>
              </div>

              <AdminField label="Weaving Technique & Craft Legacy">
                <AdminInput
                  value={formData.craft || ""}
                  onChange={(e) => updateField("craft", e.target.value)}
                  placeholder="Handwoven Kadwa Weave on Pit Loom with Antique Gold Zari"
                />
              </AdminField>
            </div>
          </AdminCard>

          {/* Section 2: Media Management */}
          <AdminCard title="2. Product Imagery & Media Gallery">
            <AdminMediaInput
              type="image"
              items={mediaItems}
              onChange={handleMediaChange}
              maxItems={8}
              label="High-Resolution Photography"
              helperText="Upload images from device / mobile gallery or paste external CDN URLs. Drag or use arrows to reorder."
            />
          </AdminCard>

          {/* Section 3: Descriptions & Atelier Notes */}
          <AdminCard title="3. Descriptions & Artisan Story">
            <div className="space-y-4">
              <AdminField label="Brief Summary (Card & Quick View)">
                <AdminInput
                  value={formData.shortDescription || ""}
                  onChange={(e) => updateField("shortDescription", e.target.value)}
                  placeholder="A handwoven masterpiece in pure mulberry silk featuring tested zari jaal."
                />
              </AdminField>

              <AdminField label="Full Craft Narrative & Product Description">
                <AdminTextarea
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Elaborate craft description, artisan history, and fabric heritage..."
                />
              </AdminField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField label="Drape & Styling Advice">
                  <AdminTextarea
                    rows={2}
                    value={formData.drapeTip || ""}
                    onChange={(e) => updateField("drapeTip", e.target.value)}
                    placeholder="Structure 5–6 pleats for a regal drape..."
                  />
                </AdminField>

                <AdminField label="Garment Care Instructions">
                  <AdminTextarea
                    rows={2}
                    value={formData.details?.care || ""}
                    onChange={(e) => updateDetailsField("care", e.target.value)}
                    placeholder="Dry clean only. Wrap in breathable muslin..."
                  />
                </AdminField>
              </div>
            </div>
          </AdminCard>

          {/* Section 4: Variants Management */}
          <AdminCard
            title="4. Product Variants & SKU Matrix"
            action={
              <button
                type="button"
                onClick={handleAddVariant}
                className="flex items-center gap-1 text-xs font-bold text-[#734E06] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Variant
              </button>
            }
          >
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-600 font-bold uppercase tracking-wider text-xs">
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
                      <td className="py-2.5 px-3">
                        <AdminInput
                          value={v.size}
                          onChange={(e) => handleVariantChange(v.id, "size", e.target.value)}
                          className="h-9 text-xs"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <AdminInput
                          value={v.color}
                          onChange={(e) => handleVariantChange(v.id, "color", e.target.value)}
                          className="h-9 text-xs"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <AdminInput
                          value={v.sku}
                          onChange={(e) => handleVariantChange(v.id, "sku", e.target.value)}
                          className="h-9 text-xs font-mono"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <AdminInput
                          type="number"
                          value={v.price}
                          onChange={(e) => handleVariantChange(v.id, "price", Number(e.target.value))}
                          className="h-9 text-xs w-28"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <AdminInput
                          type="number"
                          value={v.inventory}
                          onChange={(e) => handleVariantChange(v.id, "inventory", Number(e.target.value))}
                          className="h-9 text-xs w-20"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(v.id)}
                            className="text-red-600 hover:text-red-800 p-1.5"
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

            {/* Mobile Stacked Card View */}
            <div className="sm:hidden space-y-3">
              {variants.map((v, idx) => (
                <div key={v.id} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-neutral-900">
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
                    <label className="block text-xs uppercase font-bold text-neutral-600 mb-1">Size / Cut</label>
                    <AdminInput
                      value={v.size}
                      onChange={(e) => handleVariantChange(v.id, "size", e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs uppercase font-bold text-neutral-600 mb-1">SKU</label>
                      <AdminInput
                        value={v.sku}
                        onChange={(e) => handleVariantChange(v.id, "sku", e.target.value)}
                        className="h-9 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-bold text-neutral-600 mb-1">Price (₹)</label>
                      <AdminInput
                        type="number"
                        value={v.price}
                        onChange={(e) => handleVariantChange(v.id, "price", Number(e.target.value))}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-neutral-600 mb-1">Stock Units</label>
                    <AdminInput
                      type="number"
                      value={v.inventory}
                      onChange={(e) => handleVariantChange(v.id, "inventory", Number(e.target.value))}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>

          {/* Section 5: Shipping Dimensions (Collapsible) */}
          <AdminCard
            title="5. Shipping & Logistics Dimensions"
            action={
              <button
                type="button"
                onClick={() => setShowShippingSection(!showShippingSection)}
                className="text-xs text-[#734E06] font-bold"
              >
                {showShippingSection ? "Collapse ▲" : "Expand ▼"}
              </button>
            }
          >
            {showShippingSection ? (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <AdminField label="Weight (g)">
                  <AdminInput
                    placeholder="e.g. 550 grams"
                    value={formData.details?.weight || ""}
                    onChange={(e) => updateDetailsField("weight", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Length">
                  <AdminInput
                    placeholder="e.g. 5.5 metres"
                    value={formData.details?.length || ""}
                    onChange={(e) => updateDetailsField("length", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Width">
                  <AdminInput
                    placeholder="e.g. 45 inches"
                    value={formData.details?.width || ""}
                    onChange={(e) => updateDetailsField("width", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Origin City">
                  <AdminInput
                    placeholder="e.g. Surat, Gujarat"
                    value={formData.details?.origin || ""}
                    onChange={(e) => updateDetailsField("origin", e.target.value)}
                  />
                </AdminField>
              </div>
            ) : (
              <p className="text-xs text-neutral-500 m-0">
                Dimensions: {formData.details?.length || "5.5m"}, {formData.details?.weight || "550g"}, Origin: {formData.details?.origin || "Surat"}
              </p>
            )}
          </AdminCard>

          {/* Section 6: SEO */}
          <AdminCard
            title="6. Search Engine Optimization (SEO)"
            action={
              <button
                type="button"
                onClick={() => setShowSeoSection(!showSeoSection)}
                className="text-xs text-[#734E06] font-bold"
              >
                {showSeoSection ? "Collapse ▲" : "Expand ▼"}
              </button>
            }
          >
            {showSeoSection ? (
              <div className="space-y-4">
                <AdminField label="SEO Page Title" hint={`${(formData.seoTitle || "").length} / 70 chars`}>
                  <AdminInput
                    value={formData.seoTitle || ""}
                    onChange={(e) => updateField("seoTitle", e.target.value)}
                    placeholder={formData.title || "Custom search title"}
                  />
                </AdminField>

                <AdminField label="Meta Description" hint={`${(formData.seoDescription || "").length} / 160 chars`}>
                  <AdminTextarea
                    rows={3}
                    value={formData.seoDescription || ""}
                    onChange={(e) => updateField("seoDescription", e.target.value)}
                    placeholder="Concise, keyword-rich summary for search listings..."
                  />
                </AdminField>
              </div>
            ) : (
              <p className="text-xs text-neutral-500 m-0">
                Title: {formData.seoTitle || formData.title || "Not configured"}
              </p>
            )}
          </AdminCard>
        </div>

        {/* ======================================================== */}
        {/* SIDEBAR COLUMN (Right Column on Desktop, Stacked on Mobile) */}
        {/* ======================================================== */}
        <div className="space-y-6">
          {/* Side Card 1: Status & Publishing */}
          <AdminCard title="Publishing & Visibility">
            <div className="space-y-4">
              <AdminField label="Visibility Status">
                <AdminSelect
                  value={formData.status || "published"}
                  onChange={(e) => updateField("status", e.target.value as ProductStatus)}
                >
                  <option value="published">Published (Visible in Store)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="archived">Archived (Delisted)</option>
                </AdminSelect>
              </AdminField>

              <div className="pt-3 border-t border-neutral-100 space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-neutral-800">
                  <input
                    type="checkbox"
                    checked={!!formData.featured}
                    onChange={(e) => updateField("featured", e.target.checked)}
                    className="w-4 h-4 text-[#734E06] rounded-xs"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-neutral-800">
                  <input
                    type="checkbox"
                    checked={!!formData.bestseller}
                    onChange={(e) => updateField("bestseller", e.target.checked)}
                    className="w-4 h-4 text-[#734E06] rounded-xs"
                  />
                  <span>Bestseller Ribbon</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-neutral-800">
                  <input
                    type="checkbox"
                    checked={!!formData.newArrival}
                    onChange={(e) => updateField("newArrival", e.target.checked)}
                    className="w-4 h-4 text-[#734E06] rounded-xs"
                  />
                  <span>New Arrival Badge</span>
                </label>
              </div>
            </div>
          </AdminCard>

          {/* Side Card 2: Pricing */}
          <AdminCard title="Pricing & MRP">
            <div className="space-y-4">
              <AdminField label="Active Selling Price (₹)" required>
                <AdminInput
                  type="number"
                  required
                  value={formData.price !== undefined ? formData.price : ""}
                  onChange={(e) => updateField("price", e.target.value ? Number(e.target.value) : undefined as any)}
                  placeholder="e.g. 12500"
                  className="font-bold text-base"
                />
              </AdminField>

              <AdminField label="Compare-at Price (MRP) (₹)">
                <AdminInput
                  type="number"
                  value={formData.compareAtPrice !== undefined ? formData.compareAtPrice : ""}
                  onChange={(e) => updateField("compareAtPrice", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 15500"
                />
              </AdminField>

              {discountPercentage !== null && discountPercentage > 0 && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-900 text-xs flex items-center justify-between font-bold">
                  <span>Customer Discount:</span>
                  <span>{discountPercentage}% OFF MRP</span>
                </div>
              )}
            </div>
          </AdminCard>

          {/* Side Card 3: Inventory */}
          <AdminCard title="Inventory & Stock">
            <div className="space-y-4">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-neutral-800 font-medium">
                <input
                  type="checkbox"
                  checked={formData.inStock ?? true}
                  onChange={(e) => updateField("inStock", e.target.checked)}
                  className="w-4 h-4 text-[#734E06] rounded-xs"
                />
                <span>Allow Immediate Purchase</span>
              </label>

              <AdminField label="Available Quantity in Atelier">
                <AdminInput
                  type="number"
                  value={formData.inventoryCount !== undefined ? formData.inventoryCount : ""}
                  onChange={(e) => updateField("inventoryCount", Number(e.target.value))}
                  placeholder="e.g. 10"
                />
              </AdminField>
            </div>
          </AdminCard>

          {/* Side Card 4: Danger Zone */}
          {isEditing && existingProduct && (
            <AdminCard title="Danger Zone" className="border-red-200 bg-red-50/30">
              <p className="text-xs text-red-700 m-0 mb-3">
                Permanently delist and remove this piece from the database.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to permanently delete "${formData.title}"?`)) {
                    deleteProduct(existingProduct.id);
                    onNavigate("/admin/products");
                  }
                }}
                className="w-full h-10 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                Delete Product
              </button>
            </AdminCard>
          )}
        </div>
      </div>

      {/* Mobile Sticky Action Footer (< 640px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 p-3 sm:hidden shadow-xl flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => handleSave("draft")}
          disabled={isSaving}
          className="flex-1 h-11 border border-neutral-300 text-neutral-800 bg-white text-xs font-bold rounded-sm"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={() => handleSave("published")}
          disabled={isSaving}
          className="flex-1 h-11 bg-[#734E06] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : isEditing ? "Save" : "Publish"}
        </button>
      </div>

      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedModal && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
        >
          <div className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-neutral-900 m-0">Unsaved Changes</h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 m-0 leading-relaxed">
              You have unsaved changes on this product. Navigating away now will discard your recent modifications.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUnsavedModal(false)}
                className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs rounded-sm hover:bg-neutral-50 font-medium"
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
                className="h-10 px-4 bg-red-700 text-white text-xs font-bold uppercase rounded-sm hover:bg-red-800"
              >
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
