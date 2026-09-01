import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { AdminLayout } from "./AdminLayout";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Check } from "lucide-react";
import { NavigationItem } from "../types";

export const AdminNavigationPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { navigationItems, updateNavigationItems } = useData();
  const [items, setItems] = useState<NavigationItem[]>(navigationItems);
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newHref.trim()) return;

    const newItem: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: newLabel.trim(),
      href: newHref.trim(),
      order: items.length + 1,
      isEnabled: true,
    };

    const updated = [...items, newItem];
    setItems(updated);
    updateNavigationItems(updated);
    setNewLabel("");
    setNewHref("");
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    updateNavigationItems(updated);
  };

  const handleToggle = (id: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, isEnabled: !item.isEnabled } : item));
    setItems(updated);
    updateNavigationItems(updated);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newArr = [...items];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    setItems(newArr);
    updateNavigationItems(newArr);
  };

  const handleSave = () => {
    updateNavigationItems(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout currentPath="/admin/navigation" onNavigate={onNavigate} pageTitle="Header Navigation CMS">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>Navigation Menu & Links</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
            Control header links, mega menu structure, and category routing without touching code.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn btn-primary"
          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Menu Order"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        {/* Navigation List */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            boxShadow: "var(--shadow-subtle)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-subtle)", fontWeight: 700 }}>
            Storefront Header Menu Links
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem 1.25rem",
                  borderBottom: index < items.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  backgroundColor: item.isEnabled ? "#FFFFFF" : "var(--bg-surface-subtle)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <button
                      disabled={index === 0}
                      onClick={() => moveItem(index, "up")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: index === 0 ? "not-allowed" : "pointer",
                        opacity: index === 0 ? 0.3 : 1,
                        padding: 0,
                      }}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      disabled={index === items.length - 1}
                      onClick={() => moveItem(index, "down")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: index === items.length - 1 ? "not-allowed" : "pointer",
                        opacity: index === items.length - 1 ? 0.3 : 1,
                        padding: 0,
                      }}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.95rem", display: "block" }}>{item.label}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>{item.href}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={item.isEnabled}
                      onChange={() => handleToggle(item.id)}
                    />
                    Enabled
                  </label>

                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#C62828",
                      cursor: "pointer",
                      padding: "0.2rem",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Link Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            boxShadow: "var(--shadow-subtle)",
            padding: "1.5rem",
            height: "fit-content",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 1rem 0" }}>Add Menu Item</h3>
          <form onSubmit={handleAddItem}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Label</label>
              <input
                type="text"
                required
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g. Sarees"
                className="input-field"
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Destination URL</label>
              <input
                type="text"
                required
                value={newHref}
                onChange={(e) => setNewHref(e.target.value)}
                placeholder="e.g. /shop/sarees"
                className="input-field"
                style={{ width: "100%" }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
              <Plus size={16} /> Add to Header
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
