import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Search, Mail, Phone } from "lucide-react";

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Customer Directory" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Registered Customers & Patron Directory ({customers.length})
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Client profiles created through store purchases and VIP account registrations.
          </p>
        </div>
      </div>

      {/* Customers Table Container */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-neutral-200">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, email, phone, city..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4 text-center">Orders</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs shrink-0">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <strong className="font-semibold text-neutral-900 block">{cust.name}</strong>
                        <span className="text-[10px] text-neutral-400 font-mono">ID: {cust.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-0.5 text-[11px]">
                      <span className="text-neutral-900 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-neutral-400" /> {cust.email}
                      </span>
                      <span className="text-neutral-500 flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-neutral-400" /> {cust.phone}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-neutral-700 font-medium">
                    {cust.city}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 bg-neutral-100 font-bold rounded-sm text-[11px] text-neutral-800">
                      {cust.totalOrders} order{cust.totalOrders > 1 ? "s" : ""}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                    {formatINR(cust.totalSpend)}
                  </td>

                  <td className="py-3 px-4 text-neutral-500 text-[11px] font-mono">
                    {cust.joinedDate}
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    No customer profiles match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
