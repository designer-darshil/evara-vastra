import React from "react";
import { LayoutDashboard, Bell, Sparkles, Scissors, FileText, ArrowRight } from "lucide-react";

export const AdminContentHubPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const contentModules = [
    {
      title: "Homepage CMS",
      description: "Control hero banners, headline typography, featured collection spotlight, and section ordering.",
      href: "/admin/content/homepage",
      icon: LayoutDashboard,
      badge: "Core Storefront",
    },
    {
      title: "Website Notification Bar",
      description: "Manage the top announcement bar message, destination link, background theme, and priority.",
      href: "/admin/content/notification-bar",
      icon: Bell,
      badge: "Header Bar",
    },
    {
      title: "Lookbook Editor",
      description: "Create and publish high-fashion campaign looks, connect featured sarees, and edit styling notes.",
      href: "/admin/lookbook",
      icon: Sparkles,
      badge: "Editorial",
    },
    {
      title: "Craftsmanship & Atelier Story",
      description: "Edit generational handloom stories, Kadwa technique explanations, and workshop photography.",
      href: "/admin/content/craftsmanship",
      icon: Scissors,
      badge: "Heritage Page",
    },
    {
      title: "FAQ & Patron Knowledge Base",
      description: "Manage client questions regarding unstitched blouse pieces, pure silk care, and express delivery.",
      href: "/admin/content/faq",
      icon: FileText,
      badge: "Support",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
          EDITORIAL & DIGITAL BRANDING
        </span>
        <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
          Content Management Hub
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#8E8276", margin: "0.25rem 0 0 0" }}>
          Centrally manage all customer-facing narratives, announcement ribbons, and visual assets without editing code.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {contentModules.map((mod, idx) => {
          const Icon = mod.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(mod.href)}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5DFD5",
                padding: "1.75rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "2px",
                      backgroundColor: "rgba(124, 36, 48, 0.08)",
                      color: "#7C2430",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#B18A52", textTransform: "uppercase" }}>
                    {mod.badge}
                  </span>
                </div>

                <h3 className="font-serif" style={{ fontSize: "1.35rem", color: "#171513", margin: "0 0 0.4rem 0" }}>
                  {mod.title}
                </h3>
                <p style={{ fontSize: "0.825rem", color: "#6F6257", lineHeight: 1.5, margin: 0 }}>
                  {mod.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #F0EAE1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#7C2430",
                }}
              >
                <span>Open Editor</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
