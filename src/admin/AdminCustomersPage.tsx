import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Mail, Phone, Users } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminToolbar } from "../components/admin/ui/AdminToolbar";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminEmptyState } from "../components/admin/ui/AdminEmptyState";

export const AdminCustomersPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { customers } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Patron & Customer Directory"
        description="Client profiles, lifetime order metrics, and contact registries created through boutique storefront orders."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Customers" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {customers.length} Patrons
          </AdminBadge>
        }
      />

      {/* 2. Main Customers Table Card */}
      <AdminCard noPadding>
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200">
          <AdminToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search patrons by name, email, phone, city..."
          />
        </div>

        {/* Mobile View: Cards (< 768px) */}
        <div className="md:hidden divide-y divide-neutral-100">
          {filteredCustomers.map((cust) => (
            <div key={cust.id} className="p-4 sm:p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#734E06]/10 text-[#734E06] flex items-center justify-center font-bold text-sm shrink-0">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-neutral-900 block">{cust.name}</strong>
                    <span className="text-xs text-neutral-400 font-mono">ID: #{cust.id}</span>
                  </div>
                </div>
                <AdminBadge variant="neutral" size="sm">
                  {cust.totalOrders} {cust.totalOrders === 1 ? "order" : "orders"}
                </AdminBadge>
              </div>

              <div className="space-y-1 text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xs">
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> {cust.email}
                </span>
                <span className="flex items-center gap-2 font-mono">
                  <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> {cust.phone} • {cust.city}
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Joined: {cust.joinedDate}</span>
                <span className="font-serif font-bold text-neutral-900 text-sm">
                  {formatINR(cust.totalSpend)}
                </span>
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <AdminEmptyState
              icon={<Users className="w-8 h-8 text-neutral-400" />}
              title="No Patrons Found"
              description="No customer records match your active search query."
            />
          )}
        </div>

        {/* Desktop View: Full Table (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3.5 px-5">Patron</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">City / State</th>
                <th className="py-3.5 px-4 text-center">Orders</th>
                <th className="py-3.5 px-4 text-right">Lifetime Spend</th>
                <th className="py-3.5 px-5 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#734E06]/10 text-[#734E06] flex items-center justify-center font-bold text-xs shrink-0">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-bold block">{cust.name}</strong>
                        <span className="text-xs text-neutral-400 font-mono">#{cust.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-neutral-600">
                    <span className="block text-neutral-900 font-medium">{cust.email}</span>
                    <span className="font-mono text-neutral-500 block mt-0.5">{cust.phone}</span>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-700">
                    {cust.city}
                  </td>

                  <td className="py-3.5 px-4 text-center font-semibold text-neutral-900">
                    <AdminBadge variant="neutral" size="sm">
                      {cust.totalOrders}
                    </AdminBadge>
                  </td>

                  <td className="py-3.5 px-4 text-right font-serif font-bold text-neutral-900">
                    {formatINR(cust.totalSpend)}
                  </td>

                  <td className="py-3.5 px-5 text-right text-xs text-neutral-500 font-mono">
                    {cust.joinedDate}
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <AdminEmptyState
                      icon={<Users className="w-8 h-8 text-neutral-400" />}
                      title="No Patrons Found"
                      description="No customer records match your active search query."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
};
