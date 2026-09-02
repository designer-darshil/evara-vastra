import React from "react";
import { cn } from "../../../lib/utils";

export interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-10 sm:h-11 px-3.5 bg-white border text-sm text-neutral-900 rounded-sm outline-none transition-all placeholder:text-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-500",
          error
            ? "border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600"
            : "border-neutral-300 focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06]",
          className
        )}
        {...props}
      />
    );
  }
);
AdminInput.displayName = "AdminInput";

export interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const AdminSelect = React.forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full h-10 sm:h-11 px-3.5 bg-white border text-sm text-neutral-900 rounded-sm outline-none transition-all disabled:bg-neutral-100 disabled:text-neutral-500",
          error
            ? "border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600"
            : "border-neutral-300 focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06]",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
AdminSelect.displayName = "AdminSelect";

export interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[90px] p-3 bg-white border text-sm text-neutral-900 rounded-sm outline-none transition-all placeholder:text-neutral-400 resize-y disabled:bg-neutral-100 disabled:text-neutral-500",
          error
            ? "border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600"
            : "border-neutral-300 focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06]",
          className
        )}
        {...props}
      />
    );
  }
);
AdminTextarea.displayName = "AdminTextarea";
