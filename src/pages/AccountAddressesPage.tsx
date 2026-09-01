import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

interface AccountAddressesPageProps {
  onNavigate?: (href: string) => void;
}

export const AccountAddressesPage: React.FC<AccountAddressesPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-secondary/50 py-10 border-b border-border">
        <div className="container">
          <Breadcrumbs items={[{ label: "Account", href: "/account" }, { label: "Addresses" }]} onNavigate={onNavigate} />
          <h1 className="font-serif text-3xl md:text-4xl mt-4">Saved Addresses</h1>
        </div>
      </div>
      <div className="container mt-10">
        <p className="text-muted-foreground">Address management will be implemented here.</p>
      </div>
    </div>
  );
};
