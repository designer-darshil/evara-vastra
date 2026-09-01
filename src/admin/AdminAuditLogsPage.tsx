import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

interface AdminAuditLogsPageProps {
  onNavigate?: (href: string) => void;
}

export const AdminAuditLogsPage: React.FC<AdminAuditLogsPageProps> = ({ onNavigate }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Audit Logs" }]} onNavigate={onNavigate} />
          <h1 className="text-2xl font-bold mt-2">System Audit Logs</h1>
        </div>
      </div>
      <div className="bg-card border border-border rounded-md p-8 text-center text-muted-foreground">
        Audit log viewer will be implemented here.
      </div>
    </div>
  );
};
