import React from "react";
import { cn } from "../../../lib/utils";

interface AdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  children,
  className,
  title,
  subtitle,
  action,
  noPadding = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-neutral-200 rounded-sm shadow-2xs overflow-hidden",
        className
      )}
      {...props}
    >
      {(title || action) && (
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-100 flex items-center justify-between gap-3 flex-wrap bg-neutral-50/50">
          <div>
            {title && (
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 m-0">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-500 mt-0.5 m-0 leading-normal">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={cn(noPadding ? "" : "p-4 sm:p-6")}>{children}</div>
    </div>
  );
};
