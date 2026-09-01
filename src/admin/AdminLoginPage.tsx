import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export const AdminLoginPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { loginAdmin, isAdminAuthenticated } = useData();
  const [email, setEmail] = useState("admin@evaravastra.com");
  const [password, setPassword] = useState("evara2026");
  const [error, setError] = useState<string | null>(null);

  if (isAdminAuthenticated) {
    onNavigate("/admin");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (success) {
      onNavigate("/admin");
    } else {
      setError("Invalid credentials. Please enter a valid email and password.");
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@evaravastra.com");
    setPassword("evara2026");
    setError(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#171513",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#FFFFFF",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#B18A52",
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            MANAGEMENT SUITE
          </span>
          <h1
            className="font-serif"
            style={{ fontSize: "1.85rem", color: "#171513", margin: "0 0 0.4rem 0" }}
          >
            EVARA VASTRA
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#6F6257" }}>
            Sign in to manage catalog, orders, and storefront content.
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "rgba(124, 36, 48, 0.08)",
              border: "1px solid rgba(124, 36, 48, 0.3)",
              color: "#7C2430",
              padding: "0.75rem",
              fontSize: "0.78rem",
              marginBottom: "1.25rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6F6257",
                marginBottom: "0.35rem",
              }}
            >
              Admin Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9A8F83",
                }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.4rem",
                  border: "1px solid #D9D2C7",
                  fontSize: "0.875rem",
                  outline: "none",
                  backgroundColor: "#FAF8F5",
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6F6257",
                marginBottom: "0.35rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9A8F83",
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.4rem",
                  border: "1px solid #D9D2C7",
                  fontSize: "0.875rem",
                  outline: "none",
                  backgroundColor: "#FAF8F5",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-wine"
            style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}
          >
            <span>Access Dashboard</span> <ArrowRight size={15} />
          </button>
        </form>

        {/* Demo Helper */}
        <div
          style={{
            marginTop: "1.75rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid #EBE6DC",
            textAlign: "center",
          }}
        >
          <button
            onClick={handleFillDemo}
            style={{
              fontSize: "0.75rem",
              color: "#7C2430",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <ShieldCheck size={14} /> Quick Demo Login (admin@evaravastra.com)
          </button>
          <div style={{ marginTop: "0.75rem" }}>
            <button
              onClick={() => onNavigate("/")}
              style={{
                fontSize: "0.72rem",
                color: "#9A8F83",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ← Return to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
