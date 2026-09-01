import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { FAQItem } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ChevronDown, Search, ArrowRight, HelpCircle } from "lucide-react";

export const FaqPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { activeFAQs } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>(["faq-1", "faq-3"]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = activeFAQs.filter((faq: FAQItem) => {
    if (selectedCategory !== "all" && faq.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Client Inquiries & FAQ" }]} onNavigate={onNavigate} />

        <div style={{ textAlign: "center", maxWidth: "680px", margin: "1rem auto 4rem auto" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            PATRON ASSISTANCE
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", color: "var(--text-primary)" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Everything you need to know about our handloom heritage, express delivery times, sizing, and garment care.
          </p>

          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-medium)",
              padding: "0.75rem 1.25rem",
              marginTop: "2rem",
            }}
          >
            <Search size={18} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search questions (e.g. shipping, sizing, returns, dry clean)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", border: "none", outline: "none", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            { id: "all", label: "All Questions" },
            { id: "shipping", label: "Shipping & Delivery" },
            { id: "sizing", label: "Garment Sizing & Fit" },
            { id: "craft", label: "Craft & Authenticity" },
            { id: "care", label: "Care & Storage" },
            { id: "returns", label: "Returns & Exchanges" },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  backgroundColor: isSelected ? "var(--accent-wine)" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                  border: isSelected ? "1px solid var(--accent-wine)" : "1px solid var(--border-medium)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "var(--bg-surface)" }}>
              <p style={{ color: "var(--text-secondary)" }}>No matching questions found.</p>
            </div>
          ) : (
            filteredFaqs.map((faq: FAQItem) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    overflow: "hidden",
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    style={{
                      width: "100%",
                      padding: "1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                      gap: "1rem",
                    }}
                  >
                    <span className="font-serif" style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                        color: "var(--accent-wine)",
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 1.5rem 1.5rem 1.5rem",
                        borderTop: "1px solid rgba(23,21,19,0.04)",
                        paddingTop: "1rem",
                      }}
                    >
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions */}
        <div
          style={{
            maxWidth: "600px",
            margin: "5rem auto 0 auto",
            textAlign: "center",
            backgroundColor: "var(--bg-surface-subtle)",
            padding: "2.5rem",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <HelpCircle size={28} style={{ color: "var(--accent-gold)", margin: "0 auto 0.75rem auto" }} />
          <h4 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>
            Need Additional Assistance?
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
            Our Mumbai concierge team is happy to answer bespoke inquiries, order questions, or fabric advice.
          </p>
          <button onClick={() => onNavigate("/contact")} className="btn-wine">
            Contact Atelier Concierge <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
