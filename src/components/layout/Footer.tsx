import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

export const Footer: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings, activeCategories } = useData();

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-dark)",
        color: "var(--text-inverse)",
        paddingTop: "5.5rem",
        paddingBottom: "3rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="container">
        {/* Main 4-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem 2rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Col 1: Brand & Atelier Manifesto */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                ATELIER HANDLOOMS
              </span>
              <h3
                className="font-serif"
                style={{
                  fontSize: "1.85rem",
                  letterSpacing: "0.08em",
                  color: "#F8F4EE",
                  lineHeight: 1.1,
                }}
              >
                {siteSettings.name || "EVARA VASTRA"}
              </h3>
            </div>

            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.65,
                color: "var(--text-inverse-muted)",
              }}
            >
              Rooted in the living heritage of Indian handlooms. Pure katan silks, organic handspun cottons, and architectural linens designed for modern drapes.
            </p>

            <div style={{ fontSize: "0.78rem", color: "var(--text-inverse-muted)" }}>
              <p style={{ margin: "0 0 0.3rem 0" }}>{siteSettings.atelierAddress}</p>
              <p style={{ margin: 0 }}>Phone: {siteSettings.phone}</p>
            </div>
          </div>

          {/* Col 2: The Saree Catalog */}
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
              Saree Weaves
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {activeCategories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/shop/${cat.slug}`)}
                    style={{
                      color: "var(--text-inverse-muted)",
                      fontSize: "0.85rem",
                      transition: "color 0.2s ease",
                      textAlign: "left",
                    }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate("/shop")}
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  View All Sarees <ArrowRight size={13} />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atelier & Craft */}
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
              Atelier & Heritage
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <li>
                <button
                  onClick={() => onNavigate("/craftsmanship")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  Artisanal Craftsmanship
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/lookbook")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  Campaign Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/about")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  Our Story & Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/contact")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  Book Mumbai Studio Drape
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/faq")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  Client Inquiries & Care
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Patron Services & Admin Portal */}
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
              Patron Concierge
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <li>
                <button
                  onClick={() => onNavigate("/account")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  My Client Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/orders")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  Track Recent Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/wishlist")}
                  style={{ color: "var(--text-inverse-muted)", fontSize: "0.85rem" }}
                >
                  Saved Pieces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/admin/login")}
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: "0.85rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontWeight: 600,
                  }}
                >
                  <Lock size={12} /> Atelier Admin Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            fontSize: "0.75rem",
            color: "var(--text-inverse-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={16} style={{ color: "var(--accent-gold)" }} />
            <span>100% Certified Pure Handloom Silk Mark • Insured Worldwide Dispatch</span>
          </div>

          <div>
            <span>{siteSettings.copyrightText || "© 2026 EVARA VASTRA SAREES. HANDWOVEN IN INDIA."}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
