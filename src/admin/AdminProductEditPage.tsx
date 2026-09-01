import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Product, ProductStatus } from "../types";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  ExternalLink,
  Check,
} from "lucide-react";

interface AdminProductEditPageProps {
  productId?: string;
  onNavigate: (href: string) => void;
}

export const AdminProductEditPage: React.FC<AdminProductEditPageProps> = ({
  productId,
  onNavigate,
}) => {
  const { products, addProduct, updateProduct, categories, collections } = useData();

  const isEditing = !!productId && productId !== "new";
  const existingProduct = isEditing ? products.find((p) => p.id === productId) : null;

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    slug: "",
    code: "",
    category: "silk",
    collection: "silk-edit",
    price: 12500,
    compareAtPrice: undefined,
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
    inventoryCount: 5,
    status: "published" as ProductStatus,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
    ],
    details: {
      length: "5.5 metres",
      width: "45 inches (1.14 m)",
      blousePiece: true,
      blouseLength: "0.8 metres (Unstitched)",
      blouseDescription: "Matching silk fabric with woven zari border cuff detail",
      weaveType: "Handloom Kadwa Weave",
      zariType: "Antique Tested Gold Zari",
      weight: "540 grams",
      origin: "Varanasi, Uttar Pradesh",
      craftTime: "14 days on handloom",
      care: "Professional dry clean only. Wrap in breathable cotton muslin.",
      palluDetails: "Richly woven geometric and floral jaal in gold zari",
      borderDetails: "3-inch temple border with delicate chevron selvedge",
      boxIncludes: "Saree, Unstitched Blouse Piece, Cotton Preservation Pouch, Artisan Card",
    },
    stylingNotes: "Pair with classic raw silk or velvet corset blouse and uncut polki jewellery.",
    drapeTip: "Make 5–6 structured pleats at the waist for an upright, commanding silhouette.",
    seoTitle: "",
    seoDescription: "",
  });

  const [activeTab, setActiveTab] = useState<"general" | "pricing" | "specs" | "media" | "seo">("general");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (existingProduct) {
      setFormData(existingProduct);
    }
  }, [existingProduct]);

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEditing ? autoSlug : prev.slug,
      code: !isEditing && !prev.code ? `EV-${val.slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}` : prev.code,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Please fill in the product title and price.");
      return;
    }

    if (isEditing && existingProduct) {
      updateProduct(existingProduct.id, formData);
      setSaveMessage("Product updated successfully!");
    } else {
      const created = addProduct(formData as any);
      setSaveMessage("Product created successfully!");
      setTimeout(() => onNavigate(`/admin/products/edit/${created.id}`), 400);
    }

    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), newImageUrl.trim()],
    }));
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Controls Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          borderBottom: "1px solid var(--admin-border)",
          paddingBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            type="button"
            onClick={() => onNavigate("/admin/products")}
            style={{
              padding: "0.5rem 0.75rem",
              backgroundColor: "var(--admin-surface)",
              border: "1px solid #D9D2C7",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.8rem",
            }}
          >
            <ArrowLeft size={14} /> Back to Catalog
          </button>
          <div>
            <h1 className="font-serif" style={{ fontSize: "1.8rem", color: "var(--admin-text)", margin: 0 }}>
              {isEditing ? `Edit: ${formData.title || "Untitled"}` : "Create New Handcrafted Saree"}
            </h1>
            <span style={{ fontSize: "0.75rem", color: "#8E8276" }}>
              {isEditing ? `SKU: ${formData.code} • Status: ${formData.status?.toUpperCase()}` : "Draft new product for catalog"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {isEditing && (
            <button
              type="button"
              onClick={() => onNavigate(`/products/${formData.slug}`)}
              className="btn-secondary"
              style={{ padding: "0.65rem 1rem", fontSize: "0.78rem" }}
            >
              <ExternalLink size={14} /> Preview Storefront
            </button>
          )}
          <button
            type="submit"
            className="btn-wine"
            style={{ padding: "0.65rem 1.4rem", fontSize: "0.825rem" }}
          >
            <Save size={15} /> Save & Publish Changes
          </button>
        </div>
      </div>

      {saveMessage && (
        <div
          style={{
            backgroundColor: "rgba(35,78,62,0.1)",
            border: "1px solid #234E3E",
            color: "#234E3E",
            padding: "0.75rem 1.25rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Check size={16} /> {saveMessage}
        </div>
      )}

      {/* Tabs Selector */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--admin-border)" }}>
        {[
          { id: "general", label: "1. General Information" },
          { id: "pricing", label: "2. Pricing & Inventory" },
          { id: "specs", label: "3. Specifications & Blouse" },
          { id: "media", label: `4. Images (${formData.images?.length || 0})` },
          { id: "seo", label: "5. SEO & Metadata" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "0.75rem 1.2rem",
              fontSize: "0.825rem",
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? "#7C2430" : "#6F6257",
              backgroundColor: activeTab === tab.id ? "#FFFFFF" : "transparent",
              border: activeTab === tab.id ? "1px solid #E5DFD5" : "1px solid transparent",
              borderBottom: activeTab === tab.id ? "1px solid #FFFFFF" : "1px solid transparent",
              marginBottom: "-1px",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: General */}
      {activeTab === "general" && (
        <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
              Saree Title *
            </label>
            <input
              type="text"
              required
              value={formData.title || ""}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Raga Katan Silk Saree in Deep Wine"
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                SKU / Atelier Code *
              </label>
              <input
                type="text"
                required
                value={formData.code || ""}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Primary Category *
              </label>
              <select
                value={formData.category || "silk"}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem", backgroundColor: "var(--admin-surface)" }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Assigned Collection
              </label>
              <select
                value={formData.collection || "silk-edit"}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem", backgroundColor: "var(--admin-surface)" }}
              >
                {collections.map((col) => (
                  <option key={col.id} value={col.slug}>
                    {col.title} ({col.season})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Fabric Name *
              </label>
              <input
                type="text"
                required
                value={formData.fabric || ""}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                placeholder="e.g. Pure Katan Silk"
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Color Name & Hex *
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  value={formData.color || ""}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  style={{ flex: 1, padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
                />
                <input
                  type="color"
                  value={formData.colorHex || "#7C2430"}
                  onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                  style={{ width: "42px", height: "42px", border: "1px solid #D9D2C7", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
              Short Tagline / Teaser Description
            </label>
            <input
              type="text"
              value={formData.shortDescription || ""}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="A brief summary for product cards and quick views"
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
              Full Editorial Product Story
            </label>
            <textarea
              rows={4}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
            />
          </div>
        </div>
      )}

      {/* Tab 2: Pricing & Stock */}
      {activeTab === "pricing" && (
        <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Price (INR ₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.95rem", fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Compare-at Original Price (Optional)
              </label>
              <input
                type="number"
                value={formData.compareAtPrice || ""}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Leave blank if not on promotion"
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.95rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Inventory Count (Physical Stock) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.inventoryCount || 0}
                onChange={(e) => {
                  const count = Number(e.target.value);
                  setFormData({ ...formData, inventoryCount: count, inStock: count > 0 });
                }}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.95rem", fontWeight: 600 }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", borderTop: "1px solid #F0EBE1", paddingTop: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.5rem" }}>
                Publication Status *
              </label>
              <select
                value={formData.status || "published"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem", backgroundColor: "var(--admin-surface)" }}
              >
                <option value="published">Published (Visible on storefront)</option>
                <option value="draft">Draft (Hidden from customers)</option>
                <option value="archived">Archived (Unlisted)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.5rem" }}>
                Badges & Merchandising
              </label>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ accentColor: "#7C2430" }}
                  />
                  <span>Featured Saree</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.bestseller || false}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    style={{ accentColor: "#7C2430" }}
                  />
                  <span>Bestseller</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.newArrival || false}
                    onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                    style={{ accentColor: "#7C2430" }}
                  />
                  <span>New Arrival</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Specs & Blouse */}
      {activeTab === "specs" && (
        <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Saree Length
              </label>
              <input
                type="text"
                value={formData.details?.length || "5.5 metres"}
                onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, length: e.target.value } })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Saree Width
              </label>
              <input
                type="text"
                value={formData.details?.width || "45 inches"}
                onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, width: e.target.value } })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Blouse Piece Included?
              </label>
              <select
                value={formData.details?.blousePiece ? "yes" : "no"}
                onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, blousePiece: e.target.value === "yes" } })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", backgroundColor: "var(--admin-surface)" }}
              >
                <option value="yes">Yes (Included in pack)</option>
                <option value="no">No (Saree Only)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
              Blouse Piece Description
            </label>
            <input
              type="text"
              value={formData.details?.blouseDescription || ""}
              onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, blouseDescription: e.target.value } })}
              placeholder="e.g. Matching wine silk with woven zari border cuff detail"
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Weaving Technique
              </label>
              <input
                type="text"
                value={formData.details?.weaveType || ""}
                onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, weaveType: e.target.value } })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Zari Type
              </label>
              <input
                type="text"
                value={formData.details?.zariType || ""}
                onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, zariType: e.target.value } })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Origin & Cluster
              </label>
              <input
                type="text"
                value={formData.details?.origin || ""}
                onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, origin: e.target.value } })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Curator Styling Advice
              </label>
              <textarea
                rows={2}
                value={formData.stylingNotes || ""}
                onChange={(e) => setFormData({ ...formData, stylingNotes: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
                Draping Masterclass Tip
              </label>
              <textarea
                rows={2}
                value={formData.drapeTip || ""}
                onChange={(e) => setFormData({ ...formData, drapeTip: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Media Gallery */}
      {activeTab === "media" && (
        <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.2rem", margin: "0 0 0.5rem 0" }}>
              Product Image Gallery
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#8E8276", margin: 0 }}>
              The first image serves as the primary catalog thumbnail. Add high-resolution URLs below.
            </p>
          </div>

          {/* Add Image URL Input */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input
              type="url"
              placeholder="Paste direct image URL (https://...)..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              style={{ flex: 1, padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="btn-wine"
              style={{ padding: "0.75rem 1.25rem", fontSize: "0.8rem" }}
            >
              <Plus size={15} /> Add Image
            </button>
          </div>

          {/* Image Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.25rem", marginTop: "1rem" }}>
            {formData.images?.map((img, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  border: idx === 0 ? "2px solid #7C2430" : "1px solid #E5DFD5",
                  backgroundColor: "var(--admin-surface-subtle)",
                  overflow: "hidden",
                }}
              >
                <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                  <img src={img} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {idx === 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "0.4rem",
                      left: "0.4rem",
                      backgroundColor: "#7C2430",
                      color: "#FFFFFF",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.4rem",
                    }}
                  >
                    PRIMARY
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  style={{
                    position: "absolute",
                    top: "0.4rem",
                    right: "0.4rem",
                    backgroundColor: "rgba(23,21,19,0.8)",
                    color: "#FFFFFF",
                    border: "none",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: SEO */}
      {activeTab === "seo" && (
        <div style={{ backgroundColor: "var(--admin-surface)", padding: "2rem", border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
              Custom SEO Title Tag
            </label>
            <input
              type="text"
              value={formData.seoTitle || ""}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              placeholder={formData.title ? `${formData.title} — EVARA VASTRA` : "EVARA VASTRA — Contemporary Indian Sarees"}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--admin-text-secondary)", marginBottom: "0.35rem" }}>
              SEO Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.seoDescription || ""}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              placeholder={formData.shortDescription || "Handcrafted pure silk saree woven on generational looms."}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #D9D2C7", outline: "none", fontSize: "0.85rem" }}
            />
          </div>
        </div>
      )}
    </form>
  );
};
