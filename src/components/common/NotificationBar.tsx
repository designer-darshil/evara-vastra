import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { X, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export const NotificationBar: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { notificationBar } = useData();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check session dismissal
    const dismissedKey = `evara_notif_dismissed_${notificationBar.message}`;
    if (sessionStorage.getItem(dismissedKey)) {
      setIsDismissed(true);
    } else {
      setIsDismissed(false);
    }
  }, [notificationBar.message]);

  if (!notificationBar.isEnabled || isDismissed || !notificationBar.message.trim()) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem(`evara_notif_dismissed_${notificationBar.message}`, "true");
  };

  const themeClasses = {
    wine: "bg-brand text-brand-foreground",
    gold: "bg-brand text-brand-foreground",
    brand: "bg-brand text-brand-foreground",
    dark: "bg-foreground text-background",
  }[notificationBar.backgroundStyle || "dark"] || "bg-foreground text-background";

  return (
    <div
      role="region"
      aria-label="Website announcement"
      className={cn(
        "relative z-50 flex items-center justify-center px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-colors duration-200",
        themeClasses
      )}
    >
      <div className={cn(
        "flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-center max-w-4xl mx-auto",
        notificationBar.isDismissible ? "pr-8 sm:pr-10" : ""
      )}>
        <span className="break-words leading-tight">{notificationBar.message}</span>

        {notificationBar.link && (
          <button
            onClick={() => onNavigate(notificationBar.link)}
            className="group inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap ml-1"
          >
            <span>{notificationBar.linkText || "SHOP NOW"}</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {notificationBar.isDismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 min-h-[32px] min-w-[32px] rounded-full opacity-80 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

