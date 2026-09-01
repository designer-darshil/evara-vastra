import React from "react";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; onNavigate: (href: string) => void }> = ({
  items,
  onNavigate,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.4rem",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--text-muted)",
        marginBottom: "1.5rem",
      }}
    >
      <button
        onClick={() => onNavigate("/")}
        style={{
          color: "var(--text-secondary)",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        Home
      </button>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={12} style={{ color: "var(--border-medium)" }} />
            {isLast || !item.href ? (
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.label}</span>
            ) : (
              <button
                onClick={() => item.href && onNavigate(item.href)}
                style={{
                  color: "var(--text-secondary)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
