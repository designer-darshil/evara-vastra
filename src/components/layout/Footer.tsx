import React from "react";
import { useData } from "../../context/DataContext";
import { ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings, activeCategories } = useData();

  return (
    <footer
      style={{
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-text)",
        paddingTop: "5.5rem",
        paddingBottom: "3rem",
        borderTop: "1px solid var(--footer-border)",
      }}
    >
      <div className="container">
        {/* Main 4-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem 2.5rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--footer-border)",
          }}
        >
          {/* Col 1: Brand & Atelier Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                CONTEMPORARY INDIAN WOMENSWEAR
              </span>
              <h3
                className="font-serif"
                style={{
                  fontSize: "1.85rem",
                  letterSpacing: "0.12em",
                  color: "var(--footer-heading)",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {siteSettings.name}
              </h3>
            </div>

            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.65,
                color: "var(--footer-text-muted)",
                margin: 0,
              }}
            >
              Surat-crafted Sarees, Designer Co-Ord Sets, Chinon Kurti Palazzo Ensembles, and Festive Anarkali Gowns designed for modern living.
            </p>

            <div style={{ fontSize: "0.82rem", color: "var(--footer-text-secondary)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={15} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <span>{siteSettings.atelierAddress}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={15} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <span>Customer Care: {siteSettings.phone}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Mail size={15} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
                <span>Email: {siteSettings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1.25rem",
              }}
            >
              Shop By Category
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {activeCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/shop/${cat.slug}`)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--footer-text-muted)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--footer-heading)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--footer-text-muted)")}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate("/shop?filter=newArrival")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent-gold)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  ★ New Season Drops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1.25rem",
              }}
            >
              Customer Care & Policies
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                { label: "Track Your Order", href: "/orders" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Replacement & Exchange", href: "/returns" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQs & Help Center", href: "/faq" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.href)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--footer-text-muted)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--footer-heading)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--footer-text-muted)")}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Assurance Badges */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "1.25rem",
              }}
            >
              The Evara Promise
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <Truck size={18} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ fontSize: "0.82rem", color: "var(--footer-heading)", display: "block" }}>Free Pan-India Delivery</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--footer-text-muted)" }}>Insured delivery to 28,000+ pin codes.</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <ShieldCheck size={18} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ fontSize: "0.82rem", color: "var(--footer-heading)", display: "block" }}>COD & 10% Prepaid Off</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--footer-text-muted)" }}>Instant savings on UPI and card orders.</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <RefreshCw size={18} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ fontSize: "0.82rem", color: "var(--footer-heading)", display: "block" }}>7-Day Easy Exchange</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--footer-text-muted)" }}>Doorstep reverse pickup assistance.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div
          style={{
            paddingTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.78rem",
            color: "var(--footer-copyright)",
          }}
        >
          <div>
            © 2026 EVARA VASTRA. ALL RIGHTS RESERVED. SURAT, GUJARAT, INDIA.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <button onClick={() => onNavigate("/privacy")} style={{ background: "none", border: "none", color: "var(--footer-copyright)", cursor: "pointer", fontSize: "0.78rem" }}>
              Privacy
            </button>
            <button onClick={() => onNavigate("/terms")} style={{ background: "none", border: "none", color: "var(--footer-copyright)", cursor: "pointer", fontSize: "0.78rem" }}>
              Terms
            </button>
            <button onClick={() => onNavigate("/admin")} style={{ background: "none", border: "none", color: "var(--accent-gold)", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
