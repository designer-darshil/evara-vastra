import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Search } from "lucide-react";

export const AdminCustomersPage: React.FC<{ onNavigate: (href: string) => void }> = () => {
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C2430", display: "block" }}>
          PATRON DIRECTORY
        </span>
        <h1 className="font-serif" style={{ fontSize: "2.2rem", color: "#171513", margin: "0.2rem 0 0 0" }}>
          Client Accounts ({customers.length})
        </h1>
        <p style={{ fontSize: "0.8rem", color: "#8E8276", margin: "0.25rem 0 0 0" }}>
          Patron records created through storefront purchases and client account registrations.
        </p>
      </div>

      {/* Search Bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "1rem 1.25rem",
          border: "1px solid #E5DFD5",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <Search size={16} style={{ color: "#9A8F83" }} />
        <input
          type="text"
          placeholder="Search by patron name, email, phone number, city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", border: "none", outline: "none", fontSize: "0.85rem" }}
        />
      </div>

      {/* Customers Table */}
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DFD5", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#FAF8F5", color: "#6F6257", borderBottom: "1px solid #E5DFD5" }}>
              <th style={{ padding: "0.85rem 1rem" }}>PATRON NAME</th>
              <th style={{ padding: "0.85rem 1rem" }}>EMAIL</th>
              <th style={{ padding: "0.85rem 1rem" }}>PHONE / WHATSAPP</th>
              <th style={{ padding: "0.85rem 1rem" }}>CITY</th>
              <th style={{ padding: "0.85rem 1rem" }}>ORDERS</th>
              <th style={{ padding: "0.85rem 1rem" }}>LIFETIME SPEND</th>
              <th style={{ padding: "0.85rem 1rem" }}>JOINED</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "#8E8276" }}>
                  No customer records found matching your search.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust) => (
                <tr key={cust.id} style={{ borderBottom: "1px solid #F2EEE6" }}>
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#171513" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "#FAF2EE",
                          color: "#7C2430",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        {cust.name[0]}
                      </div>
                      <span>{cust.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "#6F6257" }}>{cust.email}</td>
                  <td style={{ padding: "0.85rem 1rem", color: "#6F6257" }}>{cust.phone}</td>
                  <td style={{ padding: "0.85rem 1rem", color: "#6F6257" }}>{cust.city}</td>
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 600, color: "#171513" }}>
                    {cust.totalOrders} order(s)
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#7C2430" }}>
                    {formatINR(cust.totalSpend)}
                  </td>
                  <td style={{ padding: "0.85rem 1rem", color: "#8E8276" }}>{cust.joinedDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
