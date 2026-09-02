import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Shipment, ShipmentStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Truck,
  RefreshCw,
  X,
} from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminToolbar } from "../components/admin/ui/AdminToolbar";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminEmptyState } from "../components/admin/ui/AdminEmptyState";

export const AdminShipmentsPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const {
    shipments,
    orders,
    assignCourierAndAWB,
    requestPickup,
    syncTracking,
  } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [trackingModalShipment, setTrackingModalShipment] = useState<Shipment | null>(null);
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Metrics
  const metrics = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter(
      (s) => s.status === "IN_TRANSIT" || s.status === "OUT_FOR_DELIVERY"
    ).length;
    const pendingPickup = shipments.filter(
      (s) => s.status === "CREATED" || s.status === "AWB_ASSIGNED" || s.status === "PICKUP_REQUESTED"
    ).length;
    const delivered = shipments.filter((s) => s.status === "DELIVERED").length;
    const exceptions = shipments.filter(
      (s) => s.status === "CANCELLED" || s.status === "FAILED" || s.status === "RTO"
    ).length;

    return { total, inTransit, pendingPickup, delivered, exceptions };
  }, [shipments]);

  // Filtered shipments
  const filteredShipments = useMemo(() => {
    return shipments.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const relatedOrder = orders.find((o) => o.id === s.orderId);
        const matches =
          s.orderNumber.toLowerCase().includes(q) ||
          (s.awb && s.awb.toLowerCase().includes(q)) ||
          (s.courierName && s.courierName.toLowerCase().includes(q)) ||
          (relatedOrder && relatedOrder.customerName.toLowerCase().includes(q)) ||
          (relatedOrder && relatedOrder.city.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [shipments, orders, statusFilter, searchQuery]);

  const handleAssignAWB = async (shipment: Shipment) => {
    setLoadingActionId(shipment.id);
    setActionMessage(null);
    try {
      await assignCourierAndAWB(shipment.id);
      setActionMessage(`AWB generated successfully for ${shipment.orderNumber}`);
    } catch (err: any) {
      setActionMessage(`Failed to generate AWB: ${err?.message}`);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleRequestPickup = async (shipment: Shipment) => {
    setLoadingActionId(shipment.id);
    setActionMessage(null);
    try {
      await requestPickup(shipment.id);
      setActionMessage(`Courier pickup scheduled for ${shipment.orderNumber}`);
    } catch (err: any) {
      setActionMessage(`Failed to schedule pickup: ${err?.message}`);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleSyncTracking = async (shipment: Shipment) => {
    setLoadingActionId(shipment.id);
    setActionMessage(null);
    try {
      await syncTracking(shipment.id);
      setActionMessage(`Tracking synchronized for ${shipment.orderNumber}`);
    } catch (err: any) {
      setActionMessage(`Failed to sync tracking: ${err?.message}`);
    } finally {
      setLoadingActionId(null);
    }
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case "DELIVERED":
        return <AdminBadge variant="success">Delivered</AdminBadge>;
      case "IN_TRANSIT":
      case "OUT_FOR_DELIVERY":
        return <AdminBadge variant="info">In Transit</AdminBadge>;
      case "AWB_ASSIGNED":
      case "PICKUP_REQUESTED":
      case "COURIER_ASSIGNED":
        return <AdminBadge variant="warning">Pickup Scheduled</AdminBadge>;
      case "CREATED":
        return <AdminBadge variant="neutral">Manifest Created</AdminBadge>;
      case "CANCELLED":
      case "FAILED":
      case "RTO":
        return <AdminBadge variant="danger">{status}</AdminBadge>;
      default:
        return <AdminBadge variant="neutral">{status}</AdminBadge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Shiprocket Logistics & Consignments"
        description="Real-time courier dispatch, automated AWB generation, pickup orchestration, and live carrier tracking."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Shipments (Shiprocket)" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {shipments.length} Total Shipments
          </AdminBadge>
        }
      />

      {actionMessage && (
        <div className="p-4 bg-neutral-900 text-white text-xs sm:text-sm rounded-sm shadow-md flex items-center justify-between animate-in fade-in">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-neutral-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
        <AdminCard className="p-4">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Total</span>
          <div className="text-2xl font-serif font-bold text-neutral-900 mt-1">{metrics.total}</div>
          <span className="text-xs text-neutral-400 mt-0.5 block">Manifests</span>
        </AdminCard>

        <AdminCard className="p-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">In Transit</span>
          <div className="text-2xl font-serif font-bold text-blue-700 mt-1">{metrics.inTransit}</div>
          <span className="text-xs text-neutral-400 mt-0.5 block">En-route</span>
        </AdminCard>

        <AdminCard className="p-4">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Pickup</span>
          <div className="text-2xl font-serif font-bold text-amber-700 mt-1">{metrics.pendingPickup}</div>
          <span className="text-xs text-neutral-400 mt-0.5 block">Queue</span>
        </AdminCard>

        <AdminCard className="p-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Delivered</span>
          <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">{metrics.delivered}</div>
          <span className="text-xs text-neutral-400 mt-0.5 block">Completed</span>
        </AdminCard>

        <AdminCard className="p-4 col-span-2 md:col-span-1">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Exceptions</span>
          <div className="text-2xl font-serif font-bold text-red-700 mt-1">{metrics.exceptions}</div>
          <span className="text-xs text-neutral-400 mt-0.5 block">Cancelled/RTO</span>
        </AdminCard>
      </div>

      {/* 3. Main Consignments Table */}
      <AdminCard noPadding>
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200">
          <AdminToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search by Order #, Customer, AWB, Courier..."
            filters={
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 px-3 bg-white border border-neutral-300 rounded-sm text-xs sm:text-sm font-medium text-neutral-800 outline-none focus:border-[#734E06] focus:ring-1 focus:ring-[#734E06] min-h-[40px] flex-1 sm:flex-initial"
                >
                  <option value="all">All Statuses ({shipments.length})</option>
                  <option value="CREATED">Created</option>
                  <option value="AWB_ASSIGNED">AWB Assigned</option>
                  <option value="PICKUP_REQUESTED">Pickup Scheduled</option>
                  <option value="IN_TRANSIT">In Transit</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </div>
            }
          />
        </div>

        {/* Mobile View: Shipment Cards (< 768px) */}
        <div className="md:hidden divide-y divide-neutral-100">
          {filteredShipments.map((s) => {
            const relatedOrder = orders.find((o) => o.id === s.orderId);
            const isLoading = loadingActionId === s.id;

            return (
              <div key={s.id} className="p-4 sm:p-5 space-y-3 bg-white">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-serif font-bold text-neutral-900 text-sm block">
                      {s.orderNumber}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono block mt-0.5">
                      SR ID: #{s.providerOrderId || "—"}
                    </span>
                  </div>
                  <div>{getStatusBadge(s.status)}</div>
                </div>

                <div className="flex justify-between text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-xs">
                  <div>
                    <span className="font-bold text-neutral-900 block">{relatedOrder?.customerName || "Customer"}</span>
                    <span className="text-neutral-500">{relatedOrder?.city}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-neutral-900 block">{s.courierName || "Pending Carrier"}</span>
                    {s.awb ? (
                      <span className="font-mono text-[#734E06] font-bold block">{s.awb}</span>
                    ) : (
                      <span className="text-neutral-400 italic">No AWB</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                  <AdminBadge variant={s.paymentMethod === "cod" ? "warning" : "success"} size="sm">
                    {s.paymentMethod.toUpperCase()}
                  </AdminBadge>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {s.status === "CREATED" && (
                      <button
                        disabled={isLoading}
                        onClick={() => handleAssignAWB(s)}
                        className="h-8 px-2.5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold rounded-sm"
                      >
                        Generate AWB
                      </button>
                    )}

                    {s.status === "AWB_ASSIGNED" && (
                      <button
                        disabled={isLoading}
                        onClick={() => handleRequestPickup(s)}
                        className="h-8 px-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-sm"
                      >
                        Schedule Pickup
                      </button>
                    )}

                    <button
                      onClick={() => setTrackingModalShipment(s)}
                      className="h-8 px-2.5 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-sm"
                    >
                      Track
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredShipments.length === 0 && (
            <AdminEmptyState
              icon={<Truck className="w-8 h-8 text-neutral-400" />}
              title="No Shipments Found"
              description="No consignments match your active search or status filter."
            />
          )}
        </div>

        {/* Desktop View: Full Table (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3.5 px-5">Order # / Consignment</th>
                <th className="py-3.5 px-4">Customer & City</th>
                <th className="py-3.5 px-4">Courier Partner</th>
                <th className="py-3.5 px-4">AWB Code</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Fulfillment Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredShipments.map((s) => {
                const relatedOrder = orders.find((o) => o.id === s.orderId);
                const isLoading = loadingActionId === s.id;

                return (
                  <tr key={s.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-serif font-bold text-neutral-900 block">{s.orderNumber}</span>
                      <span className="text-xs text-neutral-500 font-mono">SR ID: #{s.providerOrderId || "—"}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-neutral-900 block">{relatedOrder?.customerName || "Customer"}</span>
                      <span className="text-xs text-neutral-500">{relatedOrder?.city} ({relatedOrder?.pincode || "—"})</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-neutral-800 block">{s.courierName || "Pending Carrier"}</span>
                      <span className="text-xs text-neutral-500 uppercase font-mono">{s.paymentMethod}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {s.awb ? (
                        <span className="font-mono text-[#734E06] font-bold text-xs">{s.awb}</span>
                      ) : (
                        <span className="text-xs text-neutral-400 italic">Not Assigned</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(s.status)}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {s.status === "CREATED" && (
                          <button
                            disabled={isLoading}
                            onClick={() => handleAssignAWB(s)}
                            className="h-8 px-2.5 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold rounded-sm"
                          >
                            Assign AWB
                          </button>
                        )}

                        {s.status === "AWB_ASSIGNED" && (
                          <button
                            disabled={isLoading}
                            onClick={() => handleRequestPickup(s)}
                            className="h-8 px-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-sm"
                          >
                            Request Pickup
                          </button>
                        )}

                        <button
                          onClick={() => setTrackingModalShipment(s)}
                          className="h-8 px-2.5 bg-white border border-neutral-300 hover:border-[#734E06] hover:text-[#734E06] text-neutral-800 text-xs font-semibold rounded-sm"
                        >
                          Track
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <AdminEmptyState
                      icon={<Truck className="w-8 h-8 text-neutral-400" />}
                      title="No Shipments Found"
                      description="No consignments match your active search or status filter."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* 4. Tracking Modal */}
      {trackingModalShipment && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4 animate-in fade-in duration-150"
          style={{ zIndex: 70 }}
          onClick={() => setTrackingModalShipment(null)}
        >
          <div
            className="bg-white border border-neutral-200 rounded-sm max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
                Tracking: {trackingModalShipment.orderNumber}
              </h3>
              <button onClick={() => setTrackingModalShipment(null)} className="text-neutral-400 hover:text-neutral-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-sm space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Carrier:</span>
                <strong>{trackingModalShipment.courierName || "Unassigned"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">AWB Code:</span>
                <strong className="font-mono text-[#734E06]">{trackingModalShipment.awb || "Pending"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Current Status:</span>
                <strong>{trackingModalShipment.status}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setTrackingModalShipment(null)}
                className="h-10 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-sm hover:bg-neutral-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleSyncTracking(trackingModalShipment)}
                className="h-10 px-4 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase rounded-sm flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Sync Live Carrier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
