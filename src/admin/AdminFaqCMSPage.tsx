import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { FAQItem } from "../types";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const AdminFaqCMSPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
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
        isEnabled: faq.isEnabled,
        order: faq.order,
      });
    } else {
      setEditingFaq(null);
      setForm({
        question: "",
        answer: "",
        category: "shipping",
        isEnabled: true,
        order: faqs.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;

    if (editingFaq) {
      updateFAQ(editingFaq.id, form);
    } else {
      addFAQ(form);
    }
    setIsModalOpen(false);
  };

  const handleToggleEnable = (faq: FAQItem) => {
    updateFAQ(faq.id, { isEnabled: !faq.isEnabled });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
            CLIENT INQUIRIES & SUPPORT
          </span>
          <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
            FAQ Knowledge Base ({faqs.length})
          </h1>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-wine" style={{ padding: "0.75rem 1.35rem", fontSize: "0.825rem" }}>
          <Plus size={16} /> Add FAQ Item
        </button>
      </div>

      {/* FAQs List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {faqs.map((faq) => (
          <div
            key={faq.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5DFD5",
              padding: "1.5rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1.5rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    backgroundColor: "rgba(124, 36, 48, 0.08)",
                    color: "#7C2430",
                    padding: "0.15rem 0.45rem",
                  }}
                >
                  {faq.category}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#8E8276" }}>Order: #{faq.order}</span>
              </div>

              <h3 className="font-serif" style={{ fontSize: "1.25rem", color: "#171513", margin: "0 0 0.5rem 0" }}>
                {faq.question}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#6F6257", lineHeight: 1.6, margin: 0 }}>
                {faq.answer}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={() => handleToggleEnable(faq)}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "0.3rem 0.6rem",
                  backgroundColor: faq.isEnabled ? "rgba(35,78,62,0.12)" : "#EFECE6",
                  color: faq.isEnabled ? "#234E3E" : "#6F6257",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {faq.isEnabled ? "ACTIVE" : "HIDDEN"}
              </button>
              <button
                onClick={() => handleOpenModal(faq)}
                style={{ padding: "0.4rem 0.6rem", fontSize: "0.75rem", border: "1px solid #D9D2C7", backgroundColor: "#FAF8F5", cursor: "pointer" }}
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => deleteFAQ(faq.id)}
                style={{ padding: "0.4rem", color: "#7C2430", border: "1px solid #E8C8C8", backgroundColor: "#FAF8F5", cursor: "pointer" }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif" style={{ fontSize: "1.5rem", margin: "0 0 1.25rem 0" }}>
              {editingFaq ? "Edit FAQ Item" : "Create New FAQ Item"}
            </h3>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", backgroundColor: "#FFFFFF" }}
                >
                  <option value="shipping">Shipping & Express Delivery</option>
                  <option value="blouse">Blouse Piece & Measurements</option>
                  <option value="craft">Authenticity & Pit Loom Craft</option>
                  <option value="care">Silk Care & Storage</option>
                  <option value="returns">Returns & Exchanges</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6F6257", marginBottom: "0.3rem" }}>
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #D9D2C7", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-wine" style={{ padding: "0.6rem 1.25rem" }}>
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
