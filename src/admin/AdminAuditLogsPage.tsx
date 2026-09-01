import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { AuditLog, AuditLogSeverity } from "../types";
import {
  History,
  Search,
  FileSpreadsheet,
  Eye,
  X,
} from "lucide-react";

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

  const severityBadgeColors: Record<AuditLogSeverity, string> = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    critical: "bg-red-50 text-red-800 border-red-200",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "System Audit Logs" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            System Mutation & Audit Logs
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 hover:border-brand hover:text-brand text-neutral-700 text-xs font-semibold rounded-sm transition-colors shadow-2xs self-start sm:self-auto min-h-[44px]"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-700" /> Export CSV Log
        </button>
      </div>

      {/* KPI Stream Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Total Logged Events
          </span>
          <span className="text-2xl font-bold text-neutral-900">{auditLogs.length}</span>
          <span className="text-[11px] text-neutral-400 block mt-1">Immutable trace history</span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Inventory Changes
          </span>
          <span className="text-2xl font-bold text-brand">
            {auditLogs.filter((l) => l.entity === "inventory").length}
          </span>
          <span className="text-[11px] text-neutral-400 block mt-1">Stock adjustments</span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Orders & Commerce
          </span>
          <span className="text-2xl font-bold text-emerald-700">
            {auditLogs.filter((l) => l.entity === "order" || l.entity === "coupon").length}
          </span>
          <span className="text-[11px] text-neutral-400 block mt-1">Order transitions & codes</span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
            Security & Users
          </span>
          <span className="text-2xl font-bold text-neutral-800">
            {auditLogs.filter((l) => l.entity === "user" || l.entity === "auth" || l.entity === "settings").length}
          </span>
          <span className="text-[11px] text-neutral-400 block mt-1">Access & config changes</span>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-xs">
        {/* Filters */}
        <div className="p-4 border-b border-neutral-200 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail by operator, action, details..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-sm focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-sm text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Entities</option>
              <option value="inventory">Inventory</option>
              <option value="product">Products</option>
              <option value="order">Orders</option>
              <option value="coupon">Coupons</option>
              <option value="review">Reviews</option>
              <option value="cms">CMS & Content</option>
              <option value="notification">Notification Bar</option>
              <option value="user">Admin Users</option>
              <option value="settings">Store Settings</option>
              <option value="auth">Authentication</option>
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-sm text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Details Summary</th>
                <th className="py-3 px-4 text-center">Severity</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3 px-4 text-neutral-500 font-mono text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-900 text-xs">
                        {log.actorName}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {log.actorEmail}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[11px] text-neutral-800">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 uppercase text-[10px] font-semibold text-neutral-600">
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-sm">
                      {log.entity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-700 max-w-sm truncate" title={log.details}>
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${severityBadgeColors[log.severity]}`}
                    >
                      {log.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="p-1.5 text-neutral-500 hover:text-brand hover:bg-neutral-100 rounded-sm transition-colors"
                      title="Inspect Event Payload"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No audit records match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Event Modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-neutral-900 text-base m-0">
                  Audit Log Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-neutral-50 p-3 rounded-sm border border-neutral-200">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Event ID</span>
                  <span className="font-mono text-neutral-800">{selectedLog.id}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Timestamp</span>
                  <span className="text-neutral-800">{selectedLog.timestamp}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Operator</span>
                  <span className="font-semibold text-neutral-900">{selectedLog.actorName} ({selectedLog.actorRole})</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Action Code</span>
                  <span className="font-mono font-bold text-brand">{selectedLog.action}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold mb-1">Details Summary</span>
                <p className="p-3 bg-neutral-50 rounded-sm border border-neutral-200 text-neutral-800 leading-relaxed m-0">
                  {selectedLog.details}
                </p>
              </div>

              {(selectedLog.previousState || selectedLog.newState) && (
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold mb-1">State Mutation Diff</span>
                  <div className="bg-neutral-900 text-neutral-200 p-3 rounded-sm font-mono text-[11px] overflow-x-auto max-h-48">
                    {selectedLog.previousState && (
                      <div className="mb-2">
                        <span className="text-red-400 block">// Previous State:</span>
                        <pre className="m-0">{JSON.stringify(selectedLog.previousState, null, 2)}</pre>
                      </div>
                    )}
                    {selectedLog.newState && (
                      <div>
                        <span className="text-emerald-400 block">// New State:</span>
                        <pre className="m-0">{JSON.stringify(selectedLog.newState, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
