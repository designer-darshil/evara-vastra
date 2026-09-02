import React from "react";
import { Search } from "lucide-react";
import { cn } from "../../../lib/utils";

interface AdminToolbarProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0">
        {onSearchChange !== undefined && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-10 pl-9 pr-3.5 bg-white border border-neutral-300 text-sm text-neutral-900 rounded-sm outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] transition-all placeholder:text-neutral-400"
            />
          </div>
        )}
        {filters && <div className="flex items-center gap-2 flex-wrap">{filters}</div>}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
