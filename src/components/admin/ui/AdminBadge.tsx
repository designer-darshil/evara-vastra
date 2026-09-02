import React from "react";
import { cn } from "../../../lib/utils";

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "neutral" | "brand" | "info";
  size?: "sm" | "md";
  className?: string;
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
}) => {
  const variantStyles = {
    default: "bg-neutral-100 text-neutral-800 border-neutral-200",
    neutral: "bg-neutral-100 text-neutral-700 border-neutral-200",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-850 border-amber-200",
    danger: "bg-red-50 text-red-800 border-red-200",
    brand: "bg-[#734E06]/10 text-[#734E06] border-[#734E06]/30 font-semibold",
    info: "bg-sky-50 text-sky-800 border-sky-200",
  }[variant];

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium border rounded-xs tracking-normal select-none leading-none",
        variantStyles,
        sizeStyles,
        className
      )}
    >
      {children}
    </span>
  );
};
