import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; onNavigate?: (href: string) => void }> = ({
  items,
  onNavigate,
}) => {
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-1.5 text-xs uppercase tracking-widest text-muted-foreground mb-6"
    >
      <button
        onClick={() => handleNav("/")}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </button>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="h-3 w-3 text-border" />
            {isLast || !item.href ? (
              <span className="text-foreground font-semibold">{item.label}</span>
            ) : (
              <button
                onClick={() => item.href && handleNav(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors"
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
