import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { AdminLayout } from "./AdminLayout";
import { Plus, Trash2, Edit2, Play, Eye, EyeOff, Save, X } from "lucide-react";
import { ShoppableVideo } from "../types";

export const AdminShoppableVideosPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { shoppableVideos, addShoppableVideo, updateShoppableVideo, deleteShoppableVideo, publishedProducts } = useData();
  const [editingVideo, setEditingVideo] = useState<Partial<ShoppableVideo> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title || !editingVideo.thumbnailUrl) return;

    const selectedProduct = publishedProducts.find((p) => p.id === editingVideo.productId) || publishedProducts[0];

    const payload = {
      title: editingVideo.title,
      videoUrl: editingVideo.videoUrl || "https://cdn.shopify.com/videos/sample.mp4",
      thumbnailUrl: editingVideo.thumbnailUrl,
      productId: selectedProduct ? selectedProduct.id : "ev-1",
      productTitle: selectedProduct ? selectedProduct.title : "Featured Garment",
      productPrice: selectedProduct ? selectedProduct.price : 2999,
      productSlug: selectedProduct ? selectedProduct.slug : "sample-product",
      ctaText: editingVideo.ctaText || "Shop This Look →",
      isPublished: editingVideo.isPublished !== undefined ? editingVideo.isPublished : true,
      order: editingVideo.order || shoppableVideos.length + 1,
    };

    if (isNew) {
      addShoppableVideo(payload);
    } else if (editingVideo.id) {
      updateShoppableVideo(editingVideo.id, payload);
    }

    setEditingVideo(null);
    setIsNew(false);
  };

  return (
    <AdminLayout currentPath="/admin/shoppable-videos" onNavigate={onNavigate} pageTitle="Shoppable Videos CMS">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>Shoppable Video Management</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
            Configure vertical video cards, thumbnails, linked products, and CTAs displayed on the storefront.
          </p>
        </div>
        <button
          onClick={() => {
            setIsNew(true);
            setEditingVideo({
              title: "",
              thumbnailUrl: publishedProducts[0]?.images[0] || "",
              videoUrl: "",
              productId: publishedProducts[0]?.id || "",
              ctaText: "Shop Look →",
              isPublished: true,
              order: shoppableVideos.length + 1,
            });
          }}
          className="btn btn-primary"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Plus size={16} /> Add New Video Card
        </button>
      </div>

      {/* Video Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {shoppableVideos.map((video) => (
          <div
            key={video.id}
            style={{
              backgroundColor: "var(--admin-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "var(--shadow-subtle)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Thumbnail Preview */}
            <div style={{ position: "relative", aspectRatio: "9/16", backgroundColor: "#000" }}>
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  backgroundColor: video.isPublished ? "rgba(46, 125, 50, 0.9)" : "rgba(100, 100, 100, 0.9)",
                  color: "#fff",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "2px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                {video.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                {video.isPublished ? "Live" : "Hidden"}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "var(--accent-wine)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Play size={18} fill="var(--accent-wine)" />
              </div>
            </div>

            {/* Content Details */}
            <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 0.4rem 0", lineHeight: 1.3 }}>
                  {video.title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "0 0 0.5rem 0" }}>
                  Linked: <strong>{video.productTitle}</strong>
                </p>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-wine)" }}>
                  ₹{video.productPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                <button
                  onClick={() => updateShoppableVideo(video.id, { isPublished: !video.isPublished })}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  {video.isPublished ? "Hide" : "Publish"}
                </button>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingVideo(video);
                    }}
                    style={{
                      background: "var(--bg-surface-subtle)",
                      border: "1px solid var(--border-subtle)",
                      padding: "0.35rem 0.6rem",
                      borderRadius: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    <Edit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this video card?")) {
                        deleteShoppableVideo(video.id);
                      }
                    }}
                    style={{
                      background: "#FDEAEA",
                      border: "1px solid #F5C6CB",
                      color: "#721C24",
                      padding: "0.35rem 0.6rem",
                      borderRadius: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setEditingVideo(null)}
        >
          <div
            style={{
              backgroundColor: "var(--admin-surface)",
              width: "100%",
              maxWidth: "520px",
              padding: "2rem",
              borderRadius: "6px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingVideo(null)}
              style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", cursor: "pointer" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 1.25rem 0" }}>
              {isNew ? "Add New Shoppable Video" : "Edit Shoppable Video"}
            </h3>

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Video Title *</label>
                <input
                  type="text"
                  required
                  value={editingVideo.title || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="input-field"
                  style={{ width: "100%" }}
                  placeholder="e.g. Fandy Silk Heavy Embroidery Drape in Action"
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Thumbnail Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingVideo.thumbnailUrl || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })}
                  className="input-field"
                  style={{ width: "100%" }}
                  placeholder="https://cdn.shopify.com/..."
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Linked Product *</label>
                <select
                  value={editingVideo.productId || publishedProducts[0]?.id}
                  onChange={(e) => setEditingVideo({ ...editingVideo, productId: e.target.value })}
                  className="input-field"
                  style={{ width: "100%" }}
                >
                  {publishedProducts.map((p) => (
                    <option key={p.id} value={p.id}>{p.title} (₹{p.price})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>CTA Button Text</label>
                  <input
                    type="text"
                    value={editingVideo.ctaText || "Shop This Look →"}
                    onChange={(e) => setEditingVideo({ ...editingVideo, ctaText: e.target.value })}
                    className="input-field"
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Display Status</label>
                  <select
                    value={editingVideo.isPublished ? "true" : "false"}
                    onChange={(e) => setEditingVideo({ ...editingVideo, isPublished: e.target.value === "true" })}
                    className="input-field"
                    style={{ width: "100%" }}
                  >
                    <option value="true">Published & Live</option>
                    <option value="false">Hidden / Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setEditingVideo(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
