import React, { useState } from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { User, Package, MapPin, Scissors, Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const AccountPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { wishlistCount, showToast } = useShop();

  const [activeTab, setActiveTab] = useState<"profile" | "addresses" | "measurements">("profile");

  const [profile, setProfile] = useState({
    name: "Devika Srinivasan",
    email: "devika.s@example.com",
    phone: "+91 98201 44520",
    city: "Mumbai",
  });

  const measurements = {
    bust: "36 inches",
    waist: "30 inches",
    shoulder: "14.5 inches",
    sleeveLength: "11 inches (Elbow)",
    neckDepthFront: "7.5 inches",
    neckDepthBack: "9 inches (Deep V)",
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Client profile preferences updated (Demo).", "info");
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Client Account" }]} onNavigate={onNavigate} />

        <div style={{ marginBottom: "2.5rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-gold)",
              display: "block",
              marginBottom: "0.3rem",
            }}
          >
            EVARA CLIENT SALON (DEMO MODE)
          </span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text-primary)" }}>
            Welcome, {profile.name.split(" ")[0]}
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="account-layout-grid"
        >
          {/* Left Account Navigation */}
          <aside
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {[
              { id: "profile", label: "Client Profile", icon: User },
              { id: "orders", label: "My Orders & Tracking", icon: Package, isLink: "/orders" },
              { id: "addresses", label: "Saved Addresses", icon: MapPin },
              { id: "measurements", label: "Bespoke Blouse Sizes", icon: Scissors },
              { id: "wishlist", label: `Saved Pieces (${wishlistCount})`, icon: Heart, isLink: "/wishlist" },
            ].map((tab) => {
              const Icon = tab.icon;
              if (tab.isLink) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => onNavigate(tab.isLink!)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      fontSize: "0.825rem",
                      color: "var(--text-secondary)",
                      textAlign: "left",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              }

              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    fontSize: "0.825rem",
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? "var(--accent-wine)" : "var(--text-secondary)",
                    backgroundColor: isSelected ? "var(--accent-wine-subtle)" : "transparent",
                    textAlign: "left",
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Right Tab Content */}
          <main
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              padding: "2.5rem",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile}>
                <h3 className="font-serif" style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>
                  Client Profile
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Phone / WhatsApp Concierge
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Primary City
                    </label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border-medium)" }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-wine" style={{ marginTop: "2rem" }}>
                  Save Preferences
                </button>
              </form>
            )}

            {activeTab === "addresses" && (
              <div>
                <h3 className="font-serif" style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>
                  Saved Shipping Addresses
                </h3>

                <div
                  style={{
                    border: "1px solid var(--border-medium)",
                    padding: "1.5rem",
                    maxWidth: "480px",
                    position: "relative",
                  }}
                >
                  <span className="badge-tag badge-tag-wine" style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                    DEFAULT
                  </span>
                  <h4 style={{ fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                    Devika Srinivasan (Home)
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Bungalow 4, Pali Hill Road, Bandra West<br />
                    Mumbai, Maharashtra — 400050<br />
                    Phone: +91 98201 44520
                  </p>
                </div>
              </div>
            )}

            {activeTab === "measurements" && (
              <div>
                <h3 className="font-serif" style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                  Bespoke Blouse Measurement Profile
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  Stored for bespoke blouse stitching orders coordinated through our atelier concierge.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  {Object.entries(measurements).map(([k, v]) => (
                    <div key={k} style={{ backgroundColor: "var(--bg-primary)", padding: "1rem", border: "1px solid var(--border-subtle)" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block" }}>
                        {k.replace(/([A-Z])/g, " $1")}
                      </span>
                      <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .account-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
