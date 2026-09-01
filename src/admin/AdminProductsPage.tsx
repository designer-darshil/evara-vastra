import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Product } from "../types";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

export const AdminProductsPage: React.FC<{ onNavigate: (href: string) => void }> = ({
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
          p.code.toLowerCase().includes(q) ||
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
    if (dup) {
      onNavigate(`/admin/products/edit/${dup.id}`);
    }
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7C2430",
              display: "block",
              marginBottom: "0.2rem",
            }}
          >
            INVENTORY & CATALOG
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: 0 }}>
            Saree Catalog ({products.length})
          </h1>
        </div>

        <button
          onClick={() => onNavigate("/admin/products/new")}
          className="btn-wine"
          style={{ padding: "0.75rem 1.35rem", fontSize: "0.825rem" }}
        >
          <Plus size={16} /> Create New Saree
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "1rem 1.25rem",
          border: "1px solid #E5DFD5",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: "240px" }}>
          <Search size={16} style={{ color: "#9A8F83" }} />
          <input
            type="text"
            placeholder="Search by title, SKU, fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "0.85rem",
              backgroundColor: "transparent",
            }}
          />
        </div>

        {/* Selectors */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "0.45rem 0.75rem",
              border: "1px solid #D9D2C7",
              backgroundColor: "#FAF8F5",
              fontSize: "0.8rem",
              outline: "none",
            }}
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
            style={{
              padding: "0.45rem 0.75rem",
              border: "1px solid #D9D2C7",
              backgroundColor: "#FAF8F5",
              fontSize: "0.8rem",
              outline: "none",
            }}
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Draft Only</option>
            <option value="archived">Archived Only</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5DFD5",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#FAF8F5", color: "#6F6257", borderBottom: "1px solid #E5DFD5" }}>
              <th style={{ padding: "0.85rem 1rem" }}>PRODUCT</th>
              <th style={{ padding: "0.85rem 1rem" }}>SKU</th>
              <th style={{ padding: "0.85rem 1rem" }}>CATEGORY</th>
              <th style={{ padding: "0.85rem 1rem" }}>PRICE</th>
              <th style={{ padding: "0.85rem 1rem" }}>INVENTORY</th>
              <th style={{ padding: "0.85rem 1rem" }}>STATUS</th>
              <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "#8E8276" }}>
                  No sarees match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: "1px solid #F2EEE6",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  {/* Thumbnail & Title */}
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        style={{
                          width: "44px",
                          height: "58px",
                          objectFit: "cover",
                          backgroundColor: "#EDE7DD",
                          border: "1px solid #E5DFD5",
                        }}
                      />
                      <div>
                        <strong
                          onClick={() => onNavigate(`/admin/products/edit/${p.id}`)}
                          style={{
                            color: "#171513",
                            display: "block",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                          }}
                        >
                          {p.title}
                        </strong>
                        <span style={{ fontSize: "0.72rem", color: "#8E8276" }}>{p.fabric}</span>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td style={{ padding: "0.85rem 1rem", color: "#6F6257", fontFamily: "monospace" }}>
                    {p.code}
                  </td>

                  {/* Category */}
                  <td style={{ padding: "0.85rem 1rem", textTransform: "capitalize", color: "#6F6257" }}>
                    {p.category}
                  </td>

                  {/* Price */}
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 600 }}>
                    {formatINR(p.price)}
                    {p.compareAtPrice && (
                      <span style={{ fontSize: "0.7rem", color: "#9A8F83", textDecoration: "line-through", display: "block" }}>
                        {formatINR(p.compareAtPrice)}
                      </span>
                    )}
                  </td>

                  {/* Inventory Stock */}
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: p.inventoryCount > 3 ? "#234E3E" : p.inventoryCount > 0 ? "#B18A52" : "#7C2430",
                        }}
                      />
                      <span style={{ fontWeight: 600, color: p.inventoryCount <= 3 ? "#7C2430" : "#171513" }}>
                        {p.inventoryCount} units
                      </span>
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <button
                      onClick={() => handleTogglePublish(p)}
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.25rem 0.55rem",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: p.status === "published" ? "rgba(35,78,62,0.12)" : "#EFECE6",
                        color: p.status === "published" ? "#234E3E" : "#6F6257",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      {p.status === "published" ? (
                        <>
                          <CheckCircle size={12} /> PUBLISHED
                        </>
                      ) : (
                        <>
                          <Clock size={12} /> DRAFT
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <button
                        onClick={() => onNavigate(`/product/${p.slug}`)}
                        title="Preview on Storefront"
                        style={{
                          padding: "0.4rem",
                          color: "#6F6257",
                          background: "none",
                          border: "1px solid #D9D2C7",
                          cursor: "pointer",
                        }}
                      >
                        <ExternalLink size={13} />
                      </button>
                      <button
                        onClick={() => onNavigate(`/admin/products/edit/${p.id}`)}
                        title="Edit Product"
                        style={{
                          padding: "0.4rem",
                          color: "#171513",
                          background: "none",
                          border: "1px solid #D9D2C7",
                          cursor: "pointer",
                        }}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDuplicate(p.id)}
                        title="Duplicate Saree"
                        style={{
                          padding: "0.4rem",
                          color: "#6F6257",
                          background: "none",
                          border: "1px solid #D9D2C7",
                          cursor: "pointer",
                        }}
                      >
                        <Copy size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        title="Delete Saree"
                        style={{
                          padding: "0.4rem",
                          color: "#7C2430",
                          background: "none",
                          border: "1px solid #E8C8C8",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif" style={{ fontSize: "1.4rem", margin: "0 0 0.5rem 0", color: "#7C2430" }}>
              Delete Saree from Catalog?
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#6F6257", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              This will permanently remove this piece from the database and the customer storefront.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn-wine" style={{ padding: "0.6rem 1rem" }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
