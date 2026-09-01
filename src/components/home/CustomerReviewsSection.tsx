import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { Star, CheckCircle, MessageSquarePlus, X } from "lucide-react";

export const CustomerReviewsSection: React.FC<{ onNavigate?: (href: string) => void }> = () => {
  const { featuredReviews, addReview, publishedProducts } = useData();
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formProduct, setFormProduct] = useState(publishedProducts[0]?.title || "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    addReview({
      customerName: formName,
      rating: formRating,
      title: formTitle || "Delighted with my purchase",
      comment: formComment,
      isVerified: true,
      productTitle: formProduct,
      status: "approved",
      isFeaturedOnHome: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setFormName("");
      setFormTitle("");
      setFormComment("");
    }, 1800);
  };

  return (
    <section style={{ padding: "5.5rem 0", backgroundColor: "var(--bg-surface)" }}>
      <div className="container">
        {/* Rating Header */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", color: "#EFA81A" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="#EFA81A" />
                ))}
              </div>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                4.87 / 5.0
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                (106+ Verified Patron Reviews)
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--text-primary)", margin: 0 }}>
              Loved Across India
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem" }}
          >
            <MessageSquarePlus size={16} /> Write a Review
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {featuredReviews.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: "var(--bg-surface-subtle)",
                border: "1px solid var(--border-subtle)",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <div>
                {/* Stars */}
                <div style={{ display: "flex", color: "#EFA81A", marginBottom: "0.75rem" }}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="#EFA81A" />
                  ))}
                </div>

                <h3 className="font-serif" style={{ fontSize: "1.15rem", color: "var(--text-primary)", margin: "0 0 0.5rem 0", lineHeight: 1.3 }}>
                  "{review.title}"
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem 0" }}>
                  {review.comment}
                </p>
              </div>

              <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {review.customerName}
                  </span>
                  {review.isVerified && (
                    <span style={{ fontSize: "0.7rem", color: "var(--success-text)", display: "flex", alignItems: "center", gap: "0.2rem", fontWeight: 600 }}>
                      <CheckCircle size={12} /> Verified Buyer
                    </span>
                  )}
                </div>
                {review.productTitle && (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", display: "block", marginTop: "0.2rem" }}>
                    Item: {review.productTitle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "var(--bg-surface)",
              width: "100%",
              maxWidth: "500px",
              padding: "2rem",
              borderRadius: "4px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
              }}
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <CheckCircle size={48} style={{ color: "var(--success-text)", margin: "0 auto 1rem auto" }} />
                <h3 className="font-serif" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Thank You!</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Your verified review has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-serif" style={{ fontSize: "1.6rem", margin: "0 0 0.5rem 0" }}>Write a Customer Review</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  Share your experience with fabric quality, drape, and delivery.
                </p>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Rating</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: star <= formRating ? "#EFA81A" : "#D0D0D0",
                        }}
                      >
                        <Star size={24} fill={star <= formRating ? "#EFA81A" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Pooja S."
                    className="input-field"
                    style={{ width: "100%" }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Product Purchased</label>
                  <select
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    className="input-field"
                    style={{ width: "100%" }}
                  >
                    {publishedProducts.slice(0, 15).map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Review Headline</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Loved the fabric softness and vibrant color!"
                    className="input-field"
                    style={{ width: "100%" }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>Detailed Comments *</label>
                  <textarea
                    required
                    rows={4}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Tell other patrons about the fit, zari work, packaging, and styling..."
                    className="input-field"
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Submit Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
