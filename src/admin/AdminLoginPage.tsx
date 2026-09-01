import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";

export const AdminLoginPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { loginAdmin, isAdminAuthenticated } = useData();
  const [email, setEmail] = useState("admin@evaravastra.com");
  const [password, setPassword] = useState("evara2026");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdminAuthenticated) {
    onNavigate("/admin");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const success = loginAdmin(email, password);
      setIsSubmitting(false);
      if (success) {
        onNavigate("/admin");
      } else {
        setError("Authentication failed. Please verify your email and password.");
      }
    }, 200);
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("evara2026");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#141210] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-neutral-200 shadow-2xl p-6 sm:p-10 rounded-sm">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand block mb-1">
            ATELIER COMMERCE CONTROL
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 m-0 font-bold">
            EVARA VASTRA
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5">
            Sign in to manage catalog, fulfillment, and storefront content.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-xs mb-6 rounded-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@evaravastra.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-brand text-brand-foreground hover:bg-brand-hover text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2 shadow-sm min-h-[44px]"
          >
            <span>{isSubmitting ? "Authenticating..." : "Access Control Suite"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Role Helpers */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 block mb-2 text-center">
            Demo Credentials & Role Pre-fills
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleFillDemo("admin@evaravastra.com")}
              className="px-2.5 py-2 border border-neutral-200 hover:border-brand hover:text-brand text-neutral-700 rounded-sm text-left transition-colors"
            >
              <strong className="block text-[11px]">Super Admin</strong>
              <span className="text-[10px] text-neutral-400 truncate block">admin@evaravastra.com</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("store@evaravastra.com")}
              className="px-2.5 py-2 border border-neutral-200 hover:border-brand hover:text-brand text-neutral-700 rounded-sm text-left transition-colors"
            >
              <strong className="block text-[11px]">Store Admin</strong>
              <span className="text-[10px] text-neutral-400 truncate block">store@evaravastra.com</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("fulfillment@evaravastra.com")}
              className="px-2.5 py-2 border border-neutral-200 hover:border-brand hover:text-brand text-neutral-700 rounded-sm text-left transition-colors"
            >
              <strong className="block text-[11px]">Order Manager</strong>
              <span className="text-[10px] text-neutral-400 truncate block">fulfillment@evaravastra.com</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("editor@evaravastra.com")}
              className="px-2.5 py-2 border border-neutral-200 hover:border-brand hover:text-brand text-neutral-700 rounded-sm text-left transition-colors"
            >
              <strong className="block text-[11px]">Content Lead</strong>
              <span className="text-[10px] text-neutral-400 truncate block">editor@evaravastra.com</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate("/")}
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors p-2"
            >
              ← Return to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
