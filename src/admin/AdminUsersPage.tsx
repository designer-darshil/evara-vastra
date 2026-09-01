import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Button } from "../components/ui/button";

interface AdminUsersPageProps {
  onNavigate?: (href: string) => void;
}

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ onNavigate }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Users" }]} onNavigate={onNavigate} />
          <h1 className="text-2xl font-bold mt-2">Admin Users</h1>
        </div>
        <Button>Add User</Button>
      </div>
      <div className="bg-card border border-border rounded-md p-8 text-center text-muted-foreground">
        Admin user management interface will be implemented here.
      </div>
    </div>
  );
};
