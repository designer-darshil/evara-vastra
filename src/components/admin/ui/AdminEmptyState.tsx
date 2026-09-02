import React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "../../../lib/utils";

interface AdminEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({
  icon = <PackageOpen className="w-8 h-8 text-neutral-400" />,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "py-12 sm:py-16 px-4 text-center bg-white border border-neutral-200 rounded-sm flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mb-3 text-neutral-500 border border-neutral-200">
        {icon}
      </div>
      <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 m-0">
        {title}
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mt-1.5 mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
