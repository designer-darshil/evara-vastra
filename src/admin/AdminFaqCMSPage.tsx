import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { FAQItem } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput, AdminSelect, AdminTextarea } from "../components/admin/ui/AdminInputs";

export const AdminFaqCMSPage: React.FC<{ onNavigate?: (href: string) => void }> = () => {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "shipping" as any,
    isEnabled: true,
    order: faqs.length + 1,
  });

  const handleOpenModal = (faq?: FAQItem) => {
    if (faq) {
      setEditingFaq(faq);
      setForm({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        isEnabled: faq.isEnabled !== undefined ? faq.isEnabled : (faq.isPublished !== undefined ? faq.isPublished : true),
        order: faq.order,
      });
    } else {
      setEditingFaq(null);
      setForm({
        question: "",
        answer: "",
        category: "Shipping & Delivery",
        isEnabled: true,
        order: faqs.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;

    const payload = {
      ...form,
      isPublished: form.isEnabled,
    };

    if (editingFaq) {
      updateFAQ(editingFaq.id, payload);
    } else {
      addFAQ(payload);
    }
    setIsModalOpen(false);
  };

  const handleToggleEnable = (faq: FAQItem) => {
    const nextVal = !(faq.isEnabled !== undefined ? faq.isEnabled : faq.isPublished);
    updateFAQ(faq.id, { isEnabled: nextVal, isPublished: nextVal });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="FAQ Knowledge Base"
        description="Client inquiry knowledge base covering handloom silk care, bridal appointments, and express dispatch."
        badge={
          <AdminBadge variant="brand" size="md">
            {faqs.length} Answers
          </AdminBadge>
        }
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[40px]"
          >
            <Plus className="w-4 h-4" /> Add FAQ Item
          </button>
        }
      />

      {/* 2. FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isLive = faq.isEnabled !== undefined ? faq.isEnabled : faq.isPublished;

          return (
            <AdminCard key={faq.id} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <AdminBadge variant="neutral" size="sm">
                      {faq.category}
                    </AdminBadge>
                    <button onClick={() => handleToggleEnable(faq)}>
                      <AdminBadge variant={isLive ? "success" : "neutral"} size="sm">
                        {isLive ? "Live" : "Draft"}
                      </AdminBadge>
                    </button>
                  </div>

                  <h3 className="font-serif text-base font-bold text-neutral-900 m-0">
                    {faq.question}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => handleOpenModal(faq)}
                    className="h-8 px-3 text-xs font-semibold bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] rounded-sm text-neutral-800 flex items-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete FAQ: "${faq.question}"?`)) {
                        deleteFAQ(faq.id);
                      }
                    }}
                    className="h-8 w-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-sm transition-colors"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-3.5 rounded-xs m-0">
                {faq.answer}
              </p>
            </AdminCard>
          );
        })}
      </div>

      {/* 3. Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-lg font-bold text-neutral-900 m-0 pb-2 border-b border-neutral-100">
              {editingFaq ? "Edit FAQ Item" : "Create New FAQ"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <AdminField label="Inquiry Category" required>
                <AdminSelect
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Shipping & Delivery">Shipping & Delivery</option>
                  <option value="Pure Silk Authenticity">Pure Silk Authenticity</option>
                  <option value="Care & Preservation">Care & Preservation</option>
                  <option value="Exchanges & Returns">Exchanges & Returns</option>
                </AdminSelect>
              </AdminField>

              <AdminField label="Patron Question" required>
                <AdminInput
                  required
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="e.g. How do I verify the Silk Mark on my saree?"
                />
              </AdminField>

              <AdminField label="Comprehensive Answer" required>
                <AdminTextarea
                  rows={4}
                  required
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Provide detailed, gracious answers..."
                />
              </AdminField>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
