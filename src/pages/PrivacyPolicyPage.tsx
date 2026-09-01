import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useData } from "../context/DataContext";

export const PrivacyPolicyPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings } = useData();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} onNavigate={onNavigate} />

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
            DATA INTEGRITY
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", color: "var(--text-primary)" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Last updated: August 2026. How Evara Vastra respects and safeguards your personal data.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              1. Information We Collect
            </h3>
            <p>
              When you purchase or create an account at <strong>{siteSettings.name}</strong> ({siteSettings.domain}), we collect personal details including your full name, shipping and billing address, email address, phone number, and payment preferences.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              2. How We Use Your Information
            </h3>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <li>Processing and delivering your orders via insured courier partners.</li>
              <li>Sending live WhatsApp/SMS shipping notifications and delivery tracking links.</li>
              <li>Providing customer care assistance regarding sizing, orders, and styling advice.</li>
              <li>Preventing fraudulent transactions and ensuring payment security.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              3. Payment Security & Encryption
            </h3>
            <p>
              All online payments (UPI, Credit/Debit Cards, Net Banking) are securely processed through RBI-authorized payment gateways utilizing 256-bit SSL encryption. We do not store or process complete credit card numbers or banking passwords on our servers.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              4. Contacting Our Data Officer
            </h3>
            <p>
              If you have any questions regarding our privacy practices or wish to request data deletion, contact us at <strong>{siteSettings.email}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
