import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { AdminLayout } from "./AdminLayout";
import { Star, CheckCircle, Trash2, Check, X, Sparkles } from "lucide-react";

export const AdminReviewsPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { reviews, updateReview, deleteReview } = useData();
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

  const filteredReviews = reviews.filter((r) => {
    if (filter === "approved") return r.status === "approved";
    if (filter === "pending") return r.status === "pending";
    return true;
  });

  return (
    <AdminLayout currentPath="/admin/reviews" onNavigate={onNavigate} pageTitle="Customer Reviews Moderation">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>Reviews & Testimonials</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
            Moderate customer feedback, approve ratings, and pin top testimonials to the homepage carousel.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["all", "approved", "pending"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "20px",
                border: "1px solid var(--border-subtle)",
                backgroundColor: filter === tab ? "var(--accent-wine)" : "#FFFFFF",
                color: filter === tab ? "#FFFFFF" : "var(--text-primary)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {tab} ({reviews.filter((r) => tab === "all" ? true : r.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div
        style={{
          backgroundColor: "var(--admin-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "var(--shadow-subtle)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--bg-surface-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
              <th style={{ padding: "0.9rem 1rem", fontWeight: 600 }}>Customer</th>
              <th style={{ padding: "0.9rem 1rem", fontWeight: 600 }}>Rating</th>
              <th style={{ padding: "0.9rem 1rem", fontWeight: 600 }}>Review Content</th>
              <th style={{ padding: "0.9rem 1rem", fontWeight: 600 }}>Product</th>
              <th style={{ padding: "0.9rem 1rem", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "0.9rem 1rem", fontWeight: 600 }}>Home Feature</th>
              <th style={{ padding: "0.9rem 1rem", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: 600 }}>{review.customerName}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{review.date}</div>
                  {review.isVerified && (
                    <span style={{ fontSize: "0.7rem", color: "#2E7D32", display: "inline-flex", alignItems: "center", gap: "0.2rem", marginTop: "0.2rem" }}>
                      <CheckCircle size={10} /> Verified
                    </span>
                  )}
                </td>

                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", color: "#EFA81A" }}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="#EFA81A" />
                    ))}
                  </div>
                </td>

                <td style={{ padding: "1rem", maxWidth: "320px" }}>
                  <strong style={{ display: "block", marginBottom: "0.2rem" }}>{review.title}</strong>
                  <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.4 }}>
                    {review.comment}
                  </p>
                </td>

                <td style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                  {review.productTitle || "Storewide Order"}
                </td>

                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.6rem",
                      borderRadius: "12px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      backgroundColor: review.status === "approved" ? "#E8F5E9" : review.status === "pending" ? "#FFF8E1" : "#FFEBEE",
                      color: review.status === "approved" ? "#2E7D32" : review.status === "pending" ? "#F57F17" : "#C62828",
                    }}
                  >
                    {review.status.toUpperCase()}
                  </span>
                </td>

                <td style={{ padding: "1rem" }}>
                  <button
                    onClick={() => updateReview(review.id, { isFeaturedOnHome: !review.isFeaturedOnHome })}
                    style={{
                      border: "none",
                      background: review.isFeaturedOnHome ? "var(--accent-gold-subtle)" : "transparent",
                      color: review.isFeaturedOnHome ? "var(--accent-gold)" : "var(--text-tertiary)",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    <Sparkles size={13} /> {review.isFeaturedOnHome ? "Featured" : "Pin"}
                  </button>
                </td>

                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.4rem" }}>
                    {review.status !== "approved" && (
                      <button
                        title="Approve Review"
                        onClick={() => updateReview(review.id, { status: "approved" })}
                        style={{
                          backgroundColor: "#E8F5E9",
                          border: "1px solid #C8E6C9",
                          color: "#2E7D32",
                          padding: "0.35rem 0.55rem",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        <Check size={14} />
                      </button>
                    )}
                    {review.status === "approved" && (
                      <button
                        title="Hide / Reject Review"
                        onClick={() => updateReview(review.id, { status: "rejected", isFeaturedOnHome: false })}
                        style={{
                          backgroundColor: "#FFF3E0",
                          border: "1px solid #FFE0B2",
                          color: "#E65100",
                          padding: "0.35rem 0.55rem",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        <X size={14} />
                      </button>
                    )}
                    <button
                      title="Delete Review"
                      onClick={() => {
                        if (window.confirm("Permanently delete this review?")) {
                          deleteReview(review.id);
                        }
                      }}
                      style={{
                        backgroundColor: "#FFEBEE",
                        border: "1px solid #FFCDD2",
                        color: "#C62828",
                        padding: "0.35rem 0.55rem",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
