import React from "react";
import { cn } from "../../lib/utils";

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  as?: React.ElementType;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = "lg",
  as: Component = "section",
  ...props
}) => {
  const spacingClasses: Record<SectionSpacing, string> = {
    none: "py-0",
    sm: "py-6 sm:py-8 md:py-10",
    md: "py-10 sm:py-12 md:py-14",
    lg: "py-12 sm:py-16 md:py-20",
    xl: "py-16 sm:py-20 md:py-24",
  };

  return (
    <Component
      className={cn("w-full relative", spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
