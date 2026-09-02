import React from "react";
import { cn } from "../../../lib/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  breadcrumbs,
  className,
}) => {
  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight m-0 truncate">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 sm:mt-1.5 leading-relaxed max-w-3xl m-0">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
