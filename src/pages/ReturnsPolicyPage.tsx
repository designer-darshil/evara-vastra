import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useData } from "../context/DataContext";
import { RefreshCw } from "lucide-react";

export const ReturnsPolicyPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings } = useData();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <Breadcrumbs items={[{ label: "Replacement & Exchange Policy" }]} onNavigate={onNavigate} />

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
            PATRON ASSURANCE
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", color: "var(--text-primary)" }}>
            Replacement & Exchange Policy
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            We want you to love your purchase. If a size or piece isn't perfect, we are here to assist.
          </p>
        </div>

        {/* Highlight Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            padding: "2rem",
            boxShadow: "var(--shadow-subtle)",
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-wine-subtle)",
              color: "var(--accent-wine)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <RefreshCw size={26} />
          </div>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.35rem", margin: "0 0 0.25rem 0" }}>
              {siteSettings.returnWindowDays || 7}-Day Hassle-Free Exchange Window
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
              Initiate an exchange or replacement within 7 days of package delivery date.
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              1. Eligibility for Exchange / Replacement
            </h3>
            <p>To be eligible for an exchange, your item must be:</p>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <li>Unused, unworn, unwashed, and undamaged.</li>
              <li>In the original brand packaging with all tags and labels intact.</li>
              <li>Sarees with unstitched blouse pieces must have the blouse fabric attached and uncut.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              2. Damaged or Defective Items
            </h3>
            <p>
              Every garment undergoes a strict 3-stage quality check at our Surat atelier before dispatch. In the rare event that you receive a defective or damaged product, please notify us within <strong>48 hours</strong> of delivery along with clear photos of the defect. We will arrange a complimentary priority replacement immediately.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              3. How to Request an Exchange
            </h3>
            <p>
              Please send a WhatsApp message to <strong>{siteSettings.phone}</strong> or email <strong>{siteSettings.email}</strong> with:
            </p>
            <div style={{ backgroundColor: "var(--bg-surface-subtle)", padding: "1.25rem 1.5rem", borderLeft: "3px solid var(--accent-wine)", margin: "0.75rem 0" }}>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>
                1. Order Number (e.g. EV-84920)<br />
                2. Reason for exchange (e.g. Size exchange from M to L)<br />
                3. Photos of the product in original tags
              </p>
            </div>
            <p>Our concierge will approve the request and schedule a doorstep reverse pickup.</p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              4. Reverse Pickup & Processing
            </h3>
            <p>
              Reverse pickups are conducted within 24–48 hours of approval. Once the returned item is received and inspected at our hub, the replacement will be dispatched within 2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
