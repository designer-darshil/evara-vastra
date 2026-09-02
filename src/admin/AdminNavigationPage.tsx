import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Check } from "lucide-react";
import { NavigationItem } from "../types";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput } from "../components/admin/ui/AdminInputs";

export const AdminNavigationPage: React.FC<{ onNavigate?: (href: string) => void }> = () => {
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
    <div className="space-y-6 max-w-5xl">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Storefront Navigation Menu"
        description="Control header navigation links, category taxonomy shortcuts, and ordering sequence."
        badge={
          <AdminBadge variant="brand" size="md">
            {items.length} Menu Items
          </AdminBadge>
        }
        actions={
          <button
            onClick={handleSave}
            className="flex items-center gap-2 h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved Changes!" : "Save Menu Order"}
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation List */}
        <div className="lg:col-span-2 space-y-3">
          <AdminCard title="Storefront Header Menu Links" noPadding>
            <div className="divide-y divide-neutral-100">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-neutral-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveItem(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-neutral-400 hover:text-neutral-800 disabled:opacity-20 rounded-xs"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveItem(index, "down")}
                        disabled={index === items.length - 1}
                        className="p-1 text-neutral-400 hover:text-neutral-800 disabled:opacity-20 rounded-xs"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="min-w-0">
                      <strong className="text-sm font-bold text-neutral-900 block truncate">
                        {item.label}
                      </strong>
                      <span className="text-xs text-neutral-500 font-mono block truncate">
                        {item.href}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleToggle(item.id)}>
                      <AdminBadge variant={item.isEnabled ? "success" : "neutral"} size="sm">
                        {item.isEnabled ? "Visible" : "Hidden"}
                      </AdminBadge>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
                      title="Delete Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* Add Link Form */}
        <div>
          <AdminCard title="Add New Menu Link">
            <form onSubmit={handleAddItem} className="space-y-4">
              <AdminField label="Display Label" required>
                <AdminInput
                  required
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Bridal Lehengas"
                />
              </AdminField>

              <AdminField label="Destination Path" required>
                <AdminInput
                  required
                  value={newHref}
                  onChange={(e) => setNewHref(e.target.value)}
                  placeholder="e.g. /category/sarees"
                />
              </AdminField>

              <button
                type="submit"
                className="w-full h-10 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </form>
          </AdminCard>
        </div>
      </div>
    </div>
  );
};
