import React, { useState } from "react";
import { siteConfig } from "../data/site";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useShop } from "../context/ShopContext";
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export const ContactPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bridal Commission / Custom Weave Inquiry",
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
    showToast("Message received. Our concierge will be in touch shortly.", "info");
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Contact & Atelier Concierge" }]} onNavigate={onNavigate} />

        <div style={{ maxWidth: "720px", margin: "1rem 0 4rem 0" }}>
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
            ATELIER APPOINTMENTS & CLIENT CARE
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", color: "var(--text-primary)", lineHeight: 1.1 }}>
            Let's Talk About Your Next Drape.
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Whether you seek bridal consultation, bespoke weave commissions, or styling guidance, our creative concierge is here to assist you.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
          className="contact-layout-grid"
        >
          {/* Left Studio Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "2rem",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <h3 className="font-serif" style={{ fontSize: "1.45rem" }}>
                Mumbai Atelier & Studio
              </h3>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <MapPin size={18} style={{ color: "var(--accent-wine)", flexShrink: 0, marginTop: "2px" }} />
                <span>{siteConfig.contact.atelierAddress}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <Phone size={18} style={{ color: "var(--accent-wine)", flexShrink: 0 }} />
                <span>{siteConfig.contact.phone}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <Mail size={18} style={{ color: "var(--accent-wine)", flexShrink: 0 }} />
                <span>{siteConfig.contact.email}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <Clock size={18} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <span>{siteConfig.contact.hours}</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-surface-subtle)",
                padding: "1.5rem 2rem",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h4 className="font-serif" style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>
                Private Bridal Draping Sessions
              </h4>
              <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Experience one-on-one appointments at our Mumbai studio with our master drape stylist. Appointments should be requested 48 hours in advance.
              </p>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "clamp(2rem, 4vw, 3rem)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(35,78,62,0.1)",
                    color: "#234E3E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem auto",
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif" style={{ fontSize: "1.85rem", color: "var(--text-primary)" }}>
                  Message Received.
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "380px", margin: "0.5rem auto 1.5rem auto" }}>
                  Thank you for reaching out to EVARA VASTRA. Our atelier concierge will review your inquiry and connect with you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm({ name: "", email: "", phone: "", subject: "Bridal Commission / Custom Weave Inquiry", message: "" });
                  }}
                  className="btn-secondary"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3 className="font-serif" style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                  Send an Inquiry
                </h3>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Mehta"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="radhika@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98200 XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                    Inquiry Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="Bridal Commission / Custom Weave Inquiry">Bridal Commission / Custom Weave Inquiry</option>
                    <option value="Studio Appointment Booking (Mumbai)">Studio Appointment Booking (Mumbai)</option>
                    <option value="Order Tracking & Delivery Inquiry">Order Tracking & Delivery Inquiry</option>
                    <option value="International Shipping Assistance">International Shipping Assistance</option>
                    <option value="General Styling & Fabric Advice">General Styling & Fabric Advice</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your upcoming occasion, preferred drape color, or specific weaving question..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)", outline: "none" }}
                  />
                </div>

                <button type="submit" className="btn-wine" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
                  Send Message <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
