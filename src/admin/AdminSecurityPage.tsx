import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
} from "lucide-react";
import { validatePasswordStrength } from "../lib/auth/password";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminField } from "../components/admin/ui/AdminField";
import { AdminInput } from "../components/admin/ui/AdminInputs";
import { AdminBadge } from "../components/admin/ui/AdminBadge";

export const AdminSecurityPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { adminUser, changeAdminPassword } = useData();

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
  const hasMinLength = newPassword.length >= 8;
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
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Admin Account Security"
        description="Manage your verified administrator authentication credentials, PBKDF2 encryption key, and active session status."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Settings", href: "/admin/settings" },
              { label: "Security" },
            ]}
            onNavigate={onNavigate}
          />
        }
      />

      {/* 2. Current Session & Identity Card */}
      <AdminCard title="Active Administrator Session">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-sm border border-neutral-100">
            <div className="w-10 h-10 rounded-full bg-[#734E06]/10 text-[#734E06] flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Signed In User
              </span>
              <span className="text-sm font-bold text-neutral-900 truncate block">
                {adminUser.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-sm border border-neutral-100">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Role & Access
              </span>
              <AdminBadge variant="brand" size="sm">
                {adminUser.role.toUpperCase()}
              </AdminBadge>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-sm border border-neutral-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Last Login
              </span>
              <span className="text-xs font-mono text-neutral-700 truncate block">
                {adminUser.lastLogin ? new Date(adminUser.lastLogin).toLocaleDateString() : "Active Now"}
              </span>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* 3. Password Change Form Card */}
      <AdminCard
        title="Change Administrator Password"
        subtitle="Passwords are cryptographically salted and hashed using PBKDF2 with SHA-256 (100,000 iterations)."
      >
        <form onSubmit={handleChangePassword} className="space-y-5">
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-900 rounded-sm text-xs sm:text-sm flex items-center gap-2.5 font-medium">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-sm text-xs sm:text-sm flex items-center gap-2.5 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Current Password */}
          <AdminField label="Current Password" required>
            <div className="relative">
              <AdminInput
                type={showCurrent ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </AdminField>

          {/* New Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminField label="New Password" required>
              <div className="relative">
                <AdminInput
                  type={showNew ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 chars, mixed case, number, symbol"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </AdminField>

            {/* Confirm New Password */}
            <AdminField label="Confirm New Password" required>
              <div className="relative">
                <AdminInput
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </AdminField>
          </div>

          {/* Live Password Complexity Checklist */}
          {newPassword && (
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                Password Security Checklist:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-700 font-semibold" : "text-neutral-500"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> At least 8 characters
                </div>
                <div className={`flex items-center gap-1.5 ${hasUpper ? "text-emerald-700 font-semibold" : "text-neutral-500"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> One uppercase letter (A-Z)
                </div>
                <div className={`flex items-center gap-1.5 ${hasLower ? "text-emerald-700 font-semibold" : "text-neutral-500"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> One lowercase letter (a-z)
                </div>
                <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-700 font-semibold" : "text-neutral-500"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> One number (0-9)
                </div>
                <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-emerald-700 font-semibold" : "text-neutral-500"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> One special character (!@#$%^&*)
                </div>
                <div className={`flex items-center gap-1.5 ${passwordsMatch ? "text-emerald-700 font-semibold" : "text-neutral-500"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs transition-colors min-h-[44px]"
            >
              {isSubmitting ? "Updating Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
};
