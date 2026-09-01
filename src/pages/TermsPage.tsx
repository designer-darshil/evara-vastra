import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useData } from "../context/DataContext";

export const TermsPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings } = useData();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <Breadcrumbs items={[{ label: "Terms of Service" }]} onNavigate={onNavigate} />

        <div style={{ margin: "1.5rem 0 3.5rem 0" }}>
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
            TERMS & CONDITIONS
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", color: "var(--text-primary)" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Welcome to {siteSettings.name}. Please review our terms of use before shopping with us.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              1. Overview & Acceptance
            </h3>
            <p>
              This website ({siteSettings.domain}) is operated by <strong>{siteSettings.name}</strong>, Surat, Gujarat. By browsing, accessing, or purchasing from our storefront, you agree to be bound by the following terms, conditions, and policies.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              2. Product Accuracy & Color Representation
            </h3>
            <p>
              We strive to display the colors, fabrics, and embroidery work of our products as accurately as possible. Due to differences in digital screens, studio lighting, and the handmade nature of traditional textiles, minor variations in texture or hue may occur.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              3. Pricing & Promotions
            </h3>
            <p>
              All prices listed on the storefront are in Indian Rupees (INR) and inclusive of all applicable taxes. We reserve the right to modify prices, discounts, and promotional coupons without prior notice.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              4. Governing Law
            </h3>
            <p>
              These terms are governed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
