import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { AuditLog, AuditLogSeverity } from "../types";
import {
  History,
  FileSpreadsheet,
  Eye,
  X,
} from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminToolbar } from "../components/admin/ui/AdminToolbar";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminEmptyState } from "../components/admin/ui/AdminEmptyState";

export const AdminAuditLogsPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { auditLogs } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [entityFilter, setEntityFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Filtered Logs
  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.entityName && log.entityName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (entityFilter !== "all" && log.entity !== entityFilter) return false;
    if (severityFilter !== "all" && log.severity !== severityFilter) return false;

    return true;
  });

  const getSeverityBadgeVariant = (severity: AuditLogSeverity) => {
    switch (severity) {
      case "critical":
        return "danger";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Timestamp", "Actor", "Role", "Action", "Entity", "Details"];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.actorName,
      l.actorRole,
      l.action,
      l.entity,
      `"${l.details.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `evara_audit_logs_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const infoCount = auditLogs.filter((l) => l.severity === "info").length;
  const warningCount = auditLogs.filter((l) => l.severity === "warning").length;
  const criticalCount = auditLogs.filter((l) => l.severity === "critical").length;

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="System Mutation & Audit Logs"
        description="Immutable real-time audit trail of product edits, inventory adjustments, status mutations, and security authentications."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "System Audit Logs" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {auditLogs.length} Logged Events
          </AdminBadge>
        }
        actions={
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 h-10 px-4 bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] text-neutral-700 text-xs font-semibold rounded-sm transition-colors shadow-2xs min-h-[40px]"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" /> Export CSV Log
          </button>
        }
      />

      {/* 2. KPI Stream Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <AdminCard className="p-4 sm:p-5">
          <span className="text-xs font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Total Logged Events
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-serif">{auditLogs.length}</span>
          <span className="text-xs text-neutral-400 block mt-1">Immutable trace history</span>
        </AdminCard>

        <AdminCard className="p-4 sm:p-5">
          <span className="text-xs font-bold tracking-wider uppercase text-blue-600 block mb-1">
            Informational Ops
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-blue-700 font-serif">{infoCount}</span>
          <span className="text-xs text-neutral-400 block mt-1">Routine catalog & order events</span>
        </AdminCard>

        <AdminCard className="p-4 sm:p-5">
          <span className="text-xs font-bold tracking-wider uppercase text-amber-600 block mb-1">
            Warnings / Rate Limits
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-amber-700 font-serif">{warningCount}</span>
          <span className="text-xs text-neutral-400 block mt-1">Stock overrides & auth checks</span>
        </AdminCard>

        <AdminCard className="p-4 sm:p-5">
          <span className="text-xs font-bold tracking-wider uppercase text-red-600 block mb-1">
            Critical Mutations
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-red-700 font-serif">{criticalCount}</span>
          <span className="text-xs text-neutral-400 block mt-1">Deletions & credential resets</span>
        </AdminCard>
      </div>

      {/* 3. Main Logs Container */}
      <AdminCard noPadding>
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200">
          <AdminToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search audit trail by actor, action, details..."
            filters={
              <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className="h-10 px-3 bg-white border border-neutral-300 rounded-sm text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] min-h-[40px] flex-1 sm:flex-initial"
                >
                  <option value="all">All Modules</option>
                  <option value="product">Products</option>
                  <option value="inventory">Inventory</option>
                  <option value="order">Orders</option>
                  <option value="auth">Authentication</option>
                  <option value="settings">Settings</option>
                </select>

                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="h-10 px-3 bg-white border border-neutral-300 rounded-sm text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] min-h-[40px] flex-1 sm:flex-initial"
                >
                  <option value="all">All Severities</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            }
          />
        </div>

        {/* Mobile View: Cards (< 768px) */}
        <div className="md:hidden divide-y divide-neutral-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 sm:p-5 space-y-2.5 bg-white">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-neutral-900 block">
                    {log.action}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono block mt-0.5">
                    {log.timestamp} • By {log.actorName}
                  </span>
                </div>
                <AdminBadge variant={getSeverityBadgeVariant(log.severity)} size="sm">
                  {log.severity}
                </AdminBadge>
              </div>

              <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xs m-0 leading-relaxed font-mono">
                {log.details}
              </p>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="capitalize">Module: {log.entity}</span>
                <button
                  onClick={() => setSelectedLog(log)}
                  className="text-xs font-semibold text-[#734E06] hover:underline"
                >
                  Inspect Payload →
                </button>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <AdminEmptyState
              icon={<History className="w-8 h-8 text-neutral-400" />}
              title="No Audit Logs Found"
              description="No logs match your filter criteria."
            />
          )}
        </div>

        {/* Desktop View: Full Table (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3.5 px-5 w-2/12">Timestamp</th>
                <th className="py-3.5 px-4 w-2/12">Actor & Role</th>
                <th className="py-3.5 px-4 w-2/12">Action</th>
                <th className="py-3.5 px-4 w-4/12">Details & Scope</th>
                <th className="py-3.5 px-4 text-center w-1/12">Severity</th>
                <th className="py-3.5 px-5 text-right w-1/12">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-xs text-neutral-500">
                    {log.timestamp}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-neutral-900 block">{log.actorName}</span>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">{log.actorRole}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs text-[#734E06] font-semibold">
                    {log.action}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-neutral-700">
                    <span className="line-clamp-2 leading-relaxed">{log.details}</span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <AdminBadge variant={getSeverityBadgeVariant(log.severity)} size="sm">
                      {log.severity}
                    </AdminBadge>
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="p-1.5 text-neutral-500 hover:text-[#734E06] hover:bg-neutral-100 rounded-sm transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <AdminEmptyState
                      icon={<History className="w-8 h-8 text-neutral-400" />}
                      title="No Audit Logs Found"
                      description="No logs match your filter criteria."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* 4. Log Inspection Modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setSelectedLog(null)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
                Audit Event Inspection
              </h3>
              <button onClick={() => setSelectedLog(null)} className="text-neutral-400 hover:text-neutral-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Event ID:</span>
                <span className="font-mono text-neutral-800">{selectedLog.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Timestamp:</span>
                <span className="font-mono text-neutral-800">{selectedLog.timestamp}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Actor:</span>
                <span className="font-semibold text-neutral-900">{selectedLog.actorName} ({selectedLog.actorRole})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Action:</span>
                <span className="font-mono font-bold text-[#734E06]">{selectedLog.action}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Module:</span>
                <span className="capitalize">{selectedLog.entity}</span>
              </div>
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  Mutation Details Payload:
                </span>
                <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200 text-xs font-mono text-neutral-800 whitespace-pre-wrap leading-relaxed">
                  {selectedLog.details}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-neutral-100">
              <button
                onClick={() => setSelectedLog(null)}
                className="h-10 px-5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
