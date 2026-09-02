import React from "react";
import { cn } from "../../lib/utils";

interface FullBleedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "header";
}

/**
 * FullBleedSection spans the complete viewport width from left edge to right edge (100%),
 * without relying on 100vw or negative margins that cause vertical scrollbar horizontal overflow.
 */
export const FullBleedSection: React.FC<FullBleedSectionProps> = ({
  children,
  className,
  as: Component = "section",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "relative w-full max-w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
