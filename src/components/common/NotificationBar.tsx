import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { X, ArrowRight } from "lucide-react";

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

  const getThemeStyles = () => {
    switch (notificationBar.backgroundStyle) {
      case "wine":
        return {
          backgroundColor: "var(--accent-wine)",
          color: "#FFFFFF",
          linkColor: "var(--accent-gold)",
        };
      case "gold":
        return {
          backgroundColor: "#8C6836",
          color: "#FFFFFF",
          linkColor: "#FFFFFF",
        };
      case "dark":
      default:
        return {
          backgroundColor: "var(--bg-dark)",
          color: "var(--text-inverse)",
          linkColor: "var(--accent-gold)",
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div
      role="region"
      aria-label="Website announcement"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.06em",
        padding: "0.55rem 1rem",
        position: "relative",
        zIndex: 9999,
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          textAlign: "center",
          flexWrap: "wrap",
          paddingRight: notificationBar.isDismissible ? "2.5rem" : "0",
        }}
      >
        <span>{notificationBar.message}</span>

        {notificationBar.link && (
          <button
            onClick={() => onNavigate(notificationBar.link)}
            style={{
              color: theme.linkColor,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.75rem",
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            <span>{notificationBar.linkText || "EXPLORE NOW →"}</span>
            <ArrowRight size={12} />
          </button>
        )}
      </div>

      {notificationBar.isDismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: theme.color,
            opacity: 0.8,
            backgroundColor: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.25rem",
            cursor: "pointer",
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
