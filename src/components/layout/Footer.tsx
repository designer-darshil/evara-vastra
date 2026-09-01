import React, { useState } from "react";
import { siteConfig } from "../../data/site";
import { footerLinks } from "../../data/navigation";
import { useShop } from "../../context/ShopContext";
import { ArrowRight, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export const Footer: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { showToast } = useShop();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "info");
      return;
    }
    setIsSubscribed(true);
    showToast("Welcome to the Evara Salon. Your invitation is confirmed.", "info");
    setEmail("");
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-dark)",
        color: "var(--text-inverse)",
        paddingTop: "5rem",
        paddingBottom: "3rem",
        borderTop: "1px solid var(--border-dark)",
      }}
    >
      <div className="container">
        {/* Newsletter & Salon Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--border-dark)",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Sparkles size={14} /> The Evara Salon
            </span>
            <h3
              className="font-serif"
              style={{
                fontSize: "2rem",
                color: "#F8F4EE",
                lineHeight: 1.15,
                marginBottom: "0.75rem",
              }}
            >
              Private previews & artisanal archives.
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-inverse-muted)",
                maxWidth: "420px",
                lineHeight: 1.6,
              }}
            >
              Receive early access to seasonal handloom releases, master weaver stories, and curated styling notes directly from our Mumbai atelier.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {isSubscribed ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "var(--accent-gold)",
                  backgroundColor: "rgba(177, 138, 82, 0.12)",
                  padding: "1rem 1.5rem",
                  border: "1px solid rgba(177, 138, 82, 0.3)",
                }}
              >
                <CheckCircle2 size={20} />
                <span style={{ fontSize: "0.85rem" }}>
                  Thank you. You have been added to our private patron list.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0" }}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 244, 238, 0.06)",
                    border: "1px solid var(--border-dark)",
                    borderRight: "none",
                    padding: "0.95rem 1.25rem",
                    color: "#F8F4EE",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--accent-wine)",
                    color: "#ffffff",
                    padding: "0.95rem 1.75rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  Join <ArrowRight size={14} />
                </button>
              </form>
            )}
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                marginTop: "0.6rem",
              }}
            >
              We respect your privacy. No promotional noise or frequent emails.
            </span>
          </div>
        </div>

        {/* Links & Brand Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            padding: "4rem 0",
            borderBottom: "1px solid var(--border-dark)",
          }}
        >
          {/* Brand Info */}
          <div style={{ gridColumn: "span 1" }}>
            <h2
              className="font-serif"
              style={{
                fontSize: "2.4rem",
                letterSpacing: "0.08em",
                color: "#F8F4EE",
                marginBottom: "0.2rem",
              }}
            >
              {siteConfig.name}
            </h2>
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1rem",
              }}
            >
              {siteConfig.tagline}
            </p>
            <p
              style={{
                fontSize: "0.825rem",
                color: "var(--text-inverse-muted)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              {siteConfig.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.78rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "var(--text-inverse-muted)" }}>
                <MapPin size={14} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "3px" }} />
                <span>{siteConfig.contact.atelierAddress}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-inverse-muted)" }}>
                <Phone size={14} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-inverse-muted)" }}>
                <Mail size={14} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1.25rem",
              }}
            >
              Shop Curations
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    style={{
                      fontSize: "0.825rem",
                      color: "var(--text-inverse-muted)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F4EE")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-muted)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Craft & Story */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1.25rem",
              }}
            >
              Artisanal Heritage
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.craft.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    style={{
                      fontSize: "0.825rem",
                      color: "var(--text-inverse-muted)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F4EE")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-muted)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Studio */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1.25rem",
              }}
            >
              The Atelier
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    style={{
                      fontSize: "0.825rem",
                      color: "var(--text-inverse-muted)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F4EE")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-muted)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1.25rem",
              }}
            >
              Client Concierge
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.clientCare.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    style={{
                      fontSize: "0.825rem",
                      color: "var(--text-inverse-muted)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F4EE")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-muted)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Ethos */}
        <div
          style={{
            paddingTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            © 2026 {siteConfig.name} SAREES. HANDWOVEN IN INDIA. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ color: "var(--accent-gold)" }}>MADE WITH INTENTION.</span>
            <span>WARP • WEFT • HERITAGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
