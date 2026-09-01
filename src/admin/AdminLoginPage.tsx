import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Lock, Mail, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { AdminAuthRateLimiter } from "../lib/auth/adminAuth";

export const AdminLoginPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { loginAdmin, isAdminAuthenticated } = useData();

  // Explicitly start both fields EMPTY
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingLockoutMin, setRemainingLockoutMin] = useState<number | null>(null);

  // Extract redirect target if present
  const getRedirectTarget = (): string => {
    try {
      const url = new URL(window.location.href);
      const redirect = url.searchParams.get("redirect");
      if (redirect && redirect.startsWith("/admin") && redirect !== "/admin/login") {
        return redirect;
      }
    } catch {
      // ignore
    }
    return "/admin";
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      onNavigate(getRedirectTarget());
    }
  }, [isAdminAuthenticated]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setError(null);

    // Check if entered email is currently locked out
    if (val.includes("@")) {
      const lockout = AdminAuthRateLimiter.checkLockout(val);
      if (lockout.isLocked) {
        setRemainingLockoutMin(lockout.remainingMinutes);
      } else {
        setRemainingLockoutMin(null);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await loginAdmin(email, password);
      if (result.success) {
        onNavigate(getRedirectTarget());
      } else {
        setError(result.error || "Invalid email or password.");
        const lockout = AdminAuthRateLimiter.checkLockout(email);
        if (lockout.isLocked) {
          setRemainingLockoutMin(lockout.remainingMinutes);
        }
      }
    } catch {
      setError("An error occurred during authentication. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-neutral-200 shadow-xl p-6 sm:p-10 rounded-sm">
        {/* Brand Wordmark & Security Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#734E06] block mb-1">
            ATELIER COMMERCE SUITE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 m-0 font-bold tracking-wider">
            EVARA VASTRA
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
            Authorized personnel login for catalog, logistics, and storefront operations.
          </p>
        </div>

        {/* Lockout or Error Notice */}
        {remainingLockoutMin !== null && (
          <div className="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-3 text-xs mb-5 rounded-sm flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Temporary Account Lockout</strong>
              <span className="leading-relaxed">
                Too many failed sign-in attempts. For security, please wait {remainingLockoutMin} minutes before trying again.
              </span>
            </div>
          </div>
        )}

        {error && remainingLockoutMin === null && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-xs mb-5 rounded-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email-input"
              className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-1.5"
            >
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-email-input"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your administrative email"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 text-sm rounded-sm focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password-input"
              className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-1.5"
            >
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-password-input"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Enter your password"
                className="w-full pl-10 pr-11 py-2.5 bg-white border border-neutral-300 text-neutral-900 text-sm rounded-sm focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || remainingLockoutMin !== null}
            className="w-full py-3 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-3 shadow-xs min-h-[44px]"
          >
            <span>{isSubmitting ? "Verifying Credentials..." : "Sign In to Admin Suite"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Assurance & Storefront Navigation */}
        <div className="mt-8 pt-6 border-t border-neutral-200 text-center space-y-3">
          <p className="text-[11px] text-neutral-500 m-0">
            Encrypted Session Management • PBKDF2 Password Hashing
          </p>

          <div>
            <button
              onClick={() => onNavigate("/")}
              className="text-xs text-neutral-600 hover:text-[#734E06] transition-colors p-2 font-medium"
            >
              ← Return to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
