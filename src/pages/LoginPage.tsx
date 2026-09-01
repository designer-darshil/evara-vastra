import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

interface LoginPageProps {
  onNavigate?: (href: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-secondary/50 py-10 border-b border-border">
        <div className="container">
          <Breadcrumbs items={[{ label: "Login" }]} onNavigate={onNavigate} />
          <h1 className="font-serif text-3xl md:text-4xl mt-4">Customer Login</h1>
        </div>
      </div>
      <div className="container mt-10 max-w-md mx-auto text-center">
        <p className="text-muted-foreground">Login functionality will be implemented here.</p>
      </div>
    </div>
  );
};
