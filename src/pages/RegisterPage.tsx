import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

interface RegisterPageProps {
  onNavigate?: (href: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-secondary/50 py-10 border-b border-border">
        <div className="container">
          <Breadcrumbs items={[{ label: "Register" }]} onNavigate={onNavigate} />
          <h1 className="font-serif text-3xl md:text-4xl mt-4">Create Account</h1>
        </div>
      </div>
      <div className="container mt-10 max-w-md mx-auto text-center">
        <p className="text-muted-foreground">Registration functionality will be implemented here.</p>
      </div>
    </div>
  );
};
