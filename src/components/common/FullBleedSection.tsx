import React from "react";
import { cn } from "../../lib/utils";

interface FullBleedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "header";
}

/**
 * FullBleedSection spans the complete viewport width from left edge to right edge (100vw),
 * breaking out of any parent container restrictions while maintaining zero horizontal overflow.
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
        "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] max-w-none overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
