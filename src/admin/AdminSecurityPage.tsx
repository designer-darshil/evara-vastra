import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { validatePasswordStrength } from "../lib/auth/password";

export const AdminSecurityPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { adminUser, changeAdminPassword, logoutAdmin } = useData();

  // Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!adminUser) {
    return null;
  }

  // Live password requirements check
  const hasMinLength = newPassword.length >= 12;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!currentPassword) {
      setErrorMessage("Please enter your current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation password do not match.");
      return;
    }

    const strength = validatePasswordStrength(newPassword);
    if (!strength.isValid) {
      setErrorMessage(strength.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await changeAdminPassword(adminUser.id, currentPassword, newPassword);

      if (result.success) {
        setSuccessMessage("Your password has been changed successfully. Please sign in again.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          if (onNavigate) {
            onNavigate("/admin/login");
          }
        }, 2000);
      } else {
        setErrorMessage(result.error || "Failed to update password.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred while updating your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <Breadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Settings", href: "/admin/settings" },
            { label: "Security & Credentials" },
          ]}
          onNavigate={onNavigate}
        />
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0 flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-[#734E06]" />
          Account Security & Password Management
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Manage administrative credentials, review active session metadata, and update security parameters.
        </p>
      </div>

      {/* Account Information Card */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 m-0 pb-2 border-b border-neutral-100 flex items-center gap-2">
          <User className="w-4 h-4 text-[#734E06]" /> Active Administrator Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-neutral-50 p-3.5 rounded-sm border border-neutral-200">
            <span className="text-[10px] uppercase font-bold text-neutral-500 block">
              Admin Name & Email
            </span>
            <strong className="text-neutral-900 block mt-0.5">{adminUser.name}</strong>
            <span className="text-neutral-600 block">{adminUser.email}</span>
          </div>

          <div className="bg-neutral-50 p-3.5 rounded-sm border border-neutral-200">
            <span className="text-[10px] uppercase font-bold text-neutral-500 block">
              Assigned Role & Privilege
            </span>
            <strong className="text-neutral-900 block mt-0.5 capitalize">
              {adminUser.role.replace("_", " ")}
            </strong>
            <span className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Active & Verified
            </span>
          </div>

          <div className="bg-neutral-50 p-3.5 rounded-sm border border-neutral-200">
            <span className="text-[10px] uppercase font-bold text-neutral-500 block">
              Last Login Session
            </span>
            <strong className="text-neutral-900 block mt-0.5">
              {adminUser.lastLogin || "Active Session"}
            </strong>
            <span className="text-neutral-500 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5" /> 8-Hour Session
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white p-6 sm:p-8 border border-neutral-200 rounded-sm shadow-xs space-y-6">
        <div className="pb-3 border-b border-neutral-100">
          <h3 className="text-base font-bold text-neutral-900 m-0">Change Administrator Password</h3>
          <p className="text-xs text-neutral-500 m-0 mt-0.5">
            Passwords must be at least 12 characters and contain uppercase, lowercase, numbers, and special symbols.
          </p>
        </div>

        {/* Feedback Alerts */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-sm flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs rounded-sm flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showCurrent ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-10 pr-11 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              New Password (Min 12 Characters) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full pl-10 pr-11 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Confirm New Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-11 py-2 bg-white border border-neutral-300 rounded-sm text-xs text-neutral-900 focus:border-[#734E06] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Live Requirements Indicator */}
          {newPassword.length > 0 && (
            <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-sm text-[11px] space-y-1.5">
              <span className="font-bold text-neutral-700 block uppercase tracking-wider mb-1">
                Password Requirements:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <span className={hasMinLength ? "text-emerald-700 font-semibold" : "text-neutral-500"}>
                  {hasMinLength ? "✓" : "○"} 12+ characters
                </span>
                <span className={hasUpper ? "text-emerald-700 font-semibold" : "text-neutral-500"}>
                  {hasUpper ? "✓" : "○"} Uppercase (A-Z)
                </span>
                <span className={hasLower ? "text-emerald-700 font-semibold" : "text-neutral-500"}>
                  {hasLower ? "✓" : "○"} Lowercase (a-z)
                </span>
                <span className={hasNumber ? "text-emerald-700 font-semibold" : "text-neutral-500"}>
                  {hasNumber ? "✓" : "○"} Number (0-9)
                </span>
                <span className={hasSpecial ? "text-emerald-700 font-semibold" : "text-neutral-500"}>
                  {hasSpecial ? "✓" : "○"} Special character
                </span>
                <span className={passwordsMatch ? "text-emerald-700 font-semibold" : "text-neutral-500"}>
                  {passwordsMatch ? "✓" : "○"} Passwords match
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider px-6 h-10 shadow-xs"
            >
              {isSubmitting ? "Updating Password..." : "Change Password"}
            </Button>
          </div>
        </form>
      </div>

      {/* Session Invalidation & Logout Action */}
      <div className="bg-white p-6 border border-neutral-200 rounded-sm shadow-xs flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 m-0">Sign Out of Admin Suite</h4>
          <span className="text-xs text-neutral-500">
            Terminate the current active session and return to the secure login prompt.
          </span>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            logoutAdmin();
            if (onNavigate) onNavigate("/admin/login");
          }}
          className="text-xs font-bold text-red-700 border-red-200 hover:bg-red-50 flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
};
