import React from "react";
import { cn } from "../../../lib/utils";

interface AdminFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const AdminField: React.FC<AdminFieldProps> = ({
  label,
  required = false,
  hint,
  error,
  children,
  className,
  id,
}) => {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-wider text-neutral-700 select-none"
        >
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
        {hint && <span className="text-[11px] text-neutral-500">{hint}</span>}
      </div>
      <div>{children}</div>
      {error && <p className="text-xs text-red-600 font-medium m-0 mt-1">{error}</p>}
    </div>
  );
};
