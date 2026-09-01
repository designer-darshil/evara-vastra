import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useShop } from "../context/ShopContext";
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageCircle, Send } from "lucide-react";

export const ContactPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { siteSettings } = useData();
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry / Size Assistance",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please fill in all required fields.", "info");
      return;
    }

    setIsSubmitted(true);
    showToast("Message received! Our team will get back to you shortly.", "info");
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Contact Us & Support" }]} onNavigate={onNavigate} />

        <div style={{ maxWidth: "720px", margin: "1rem 0 3.5rem 0" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            CUSTOMER CARE & INQUIRIES
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", color: "var(--text-primary)", lineHeight: 1.1 }}>
            We're Here to Help.
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Reach out to our customer care team for sizing recommendations, order tracking, bulk inquiries, or exchange support.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
          className="contact-layout-grid"
        >
          {/* Left Studio Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "2rem",
                border: "1px solid var(--border-subtle)",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <h3 className="font-serif" style={{ fontSize: "1.45rem", margin: 0 }}>
                Surat Atelier & Headquarters
              </h3>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <MapPin size={18} style={{ color: "var(--accent-wine)", flexShrink: 0, marginTop: "2px" }} />
                <span>{siteSettings.atelierAddress}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <Phone size={18} style={{ color: "var(--accent-wine)", flexShrink: 0 }} />
                <span>Customer Care: {siteSettings.phone}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <Mail size={18} style={{ color: "var(--accent-wine)", flexShrink: 0 }} />
                <span>Email: {siteSettings.email}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <Clock size={18} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <span>Support Hours: Mon–Sat, 10:00 AM – 7:30 PM IST</span>
              </div>
            </div>

            {/* Quick WhatsApp Card */}
            <div
              style={{
                backgroundColor: "#E8F5E9",
                padding: "1.75rem",
                border: "1px solid #C8E6C9",
                borderRadius: "4px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#1B5E20", marginBottom: "0.5rem" }}>
                <MessageCircle size={22} />
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                  Instant WhatsApp Assistance
                </h4>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#2E7D32", lineHeight: 1.5, margin: "0 0 1rem 0" }}>
                Chat live with our product specialists for instant real photos, size guides, and order updates.
              </p>
              <a
                href={`https://wa.me/919274344037?text=${encodeURIComponent("Hi Evara Vastra, I need assistance with an order/product.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#2E7D32",
                  color: "#FFFFFF",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "3px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Chat on WhatsApp (+91-92743 44037)
              </a>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "clamp(2rem, 4vw, 3rem)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-subtle)",
              borderRadius: "4px",
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#E8F5E9",
                    color: "#2E7D32",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem auto",
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif" style={{ fontSize: "1.85rem", marginBottom: "0.5rem" }}>
                  Message Transmitted
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "400px", margin: "0 auto 2rem auto" }}>
                  Thank you for writing to us. Our customer support concierge will respond to <strong>{form.email}</strong> within 12 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm({ name: "", email: "", phone: "", subject: "Order Inquiry", message: "" });
                  }}
                  className="btn btn-secondary"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h3 className="font-serif" style={{ fontSize: "1.6rem", margin: 0 }}>
                  Send an Online Inquiry
                </h3>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Pooja Sharma"
                    className="input-field"
                    style={{ width: "100%" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="pooja@gmail.com"
                      className="input-field"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98450 12345"
                      className="input-field"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    Subject of Inquiry
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input-field"
                    style={{ width: "100%" }}
                  >
                    <option value="Order Inquiry / Size Assistance">Order Inquiry / Size Assistance</option>
                    <option value="Exchange / Replacement Request">Exchange / Replacement Request</option>
                    <option value="Bulk / Festive Event Orders">Bulk / Festive Event Orders</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Please include your order ID if you have an active order..."
                    className="input-field"
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Send size={16} /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
