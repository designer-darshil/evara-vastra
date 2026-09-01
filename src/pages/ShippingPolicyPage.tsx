import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useData } from "../context/DataContext";
import { Truck, ShieldCheck, Clock } from "lucide-react";

export const ShippingPolicyPage: React.FC<{ onNavigate: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings } = useData();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <Breadcrumbs items={[{ label: "Shipping Policy" }]} onNavigate={onNavigate} />

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
            DELIVERY INFORMATION
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", color: "var(--text-primary)" }}>
            Shipping Policy
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Fast, insured, and reliable delivery across all pin codes in India.
          </p>
        </div>

        {/* Highlight Banner */}
        <div
          style={{
            backgroundColor: "var(--accent-wine-subtle)",
            border: "1px solid rgba(124, 36, 48, 0.2)",
            padding: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Truck size={22} style={{ color: "var(--accent-wine)" }} />
            <div>
              <strong style={{ fontSize: "0.85rem", display: "block" }}>Free Shipping Pan India</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>On all prepaid & COD orders</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Clock size={22} style={{ color: "var(--accent-wine)" }} />
            <div>
              <strong style={{ fontSize: "0.85rem", display: "block" }}>2–5 Business Days</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Express courier transit</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ShieldCheck size={22} style={{ color: "var(--accent-wine)" }} />
            <div>
              <strong style={{ fontSize: "0.85rem", display: "block" }}>100% Insured Delivery</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Secure tamper-evident packaging</span>
            </div>
          </div>
        </div>

        {/* Policy Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: 1.7, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              1. Order Processing Time
            </h3>
            <p>
              All orders are processed from our central atelier in <strong>{siteSettings.atelierAddress}</strong> within <strong>24 to 48 hours</strong> (excluding Sundays and national public holidays). Once dispatched, a shipment confirmation email and WhatsApp message containing your courier tracking number (e.g. Blue Dart, Delhivery, Expressbees) will be sent automatically.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              2. Delivery Timelines
            </h3>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 4 business days.</li>
              <li><strong>Tier 2 & Tier 3 Cities:</strong> 3 to 6 business days.</li>
              <li><strong>Remote / North-East Regions:</strong> 5 to 7 business days.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              3. Cash on Delivery (COD)
            </h3>
            <p>
              Cash on Delivery is available across most serviceable pin codes in India. Please ensure the exact cash amount is available at the time of delivery as courier executives may not carry change.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              4. Tracking Your Consignment
            </h3>
            <p>
              You can track your package live using our dedicated <a href="/orders" onClick={(e) => { e.preventDefault(); onNavigate("/orders"); }} style={{ color: "var(--accent-wine)", fontWeight: 600 }}>Order Tracking Page</a> or by clicking the link in your dispatch SMS/email.
            </p>
          </div>

          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              5. Queries & Delivery Assistance
            </h3>
            <p>
              For any transit delays or address modification requests, contact our customer support team at <strong>{siteSettings.email}</strong> or WhatsApp us at <strong>{siteSettings.phone}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
