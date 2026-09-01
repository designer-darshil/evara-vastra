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
    wine: "bg-accent text-accent-foreground",
    gold: "bg-primary text-primary-foreground",
    dark: "bg-foreground text-background",
  }[notificationBar.backgroundStyle || "dark"] || "bg-foreground text-background";

  return (
    <div
      role="region"
      aria-label="Website announcement"
      className={cn(
        "relative z-50 flex items-center justify-center px-4 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-300",
        themeClasses
      )}
    >
      <div className={cn("container flex flex-wrap items-center justify-center gap-3 text-center", notificationBar.isDismissible && "pr-10")}>
        <span>{notificationBar.message}</span>

        {notificationBar.link && (
          <button
            onClick={() => onNavigate(notificationBar.link)}
            className="group inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            <span>{notificationBar.linkText || "EXPLORE NOW"}</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      {notificationBar.isDismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 opacity-80 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
