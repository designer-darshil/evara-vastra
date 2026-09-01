import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { Shipment, ShipmentStatus } from "../types";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Truck,
  Search,
  RefreshCw,
  PackageCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Ban,
  Printer,
  ChevronRight,
  X,
  MapPin,
} from "lucide-react";
import { Button } from "../components/ui/button";

export const AdminShipmentsPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const {
    shipments,
    orders,
    assignCourierAndAWB,
    requestPickup,
    cancelShipment,
    syncTracking,
  } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [trackingModalShipment, setTrackingModalShipment] = useState<Shipment | null>(null);
  const [cancelModalShipment, setCancelModalShipment] = useState<Shipment | null>(null);
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
      const updated = await syncTracking(shipment.id);
      setActionMessage(`Tracking updated to "${updated.status}" for AWB ${updated.awb}`);
      if (trackingModalShipment && trackingModalShipment.id === shipment.id) {
        setTrackingModalShipment(updated);
      }
    } catch (err: any) {
      setActionMessage(`Failed to sync tracking: ${err?.message}`);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelModalShipment) return;
    setLoadingActionId(cancelModalShipment.id);
    try {
      await cancelShipment(cancelModalShipment.id);
      setCancelModalShipment(null);
      setActionMessage(`Shipment for ${cancelModalShipment.orderNumber} has been cancelled.`);
    } catch (err: any) {
      setActionMessage(`Cancellation failed: ${err?.message}`);
    } finally {
      setLoadingActionId(null);
    }
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case "DELIVERED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Delivered
          </span>
        );
      case "IN_TRANSIT":
      case "OUT_FOR_DELIVERY":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            {status === "OUT_FOR_DELIVERY" ? "Out for Delivery" : "In Transit"}
          </span>
        );
      case "PICKUP_REQUESTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pickup Scheduled
          </span>
        );
      case "AWB_ASSIGNED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <PackageCheck className="w-3.5 h-3.5 text-purple-600" />
            AWB Assigned
          </span>
        );
      case "CREATED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-300">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            Manifest Created
          </span>
        );
      case "CANCELLED":
      case "FAILED":
      case "RTO":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            {status === "CANCELLED" ? "Cancelled" : status === "RTO" ? "RTO Initiated" : "Failed"}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Shipments & Logistics" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0 flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-[#734E06]" />
            Shiprocket Logistics & Consignments ({shipments.length})
          </h1>
          <p className="text-xs text-neutral-500 mt-1 m-0">
            Real-time courier dispatch, automated AWB generation, pickup orchestration, and live carrier tracking.
          </p>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 bg-neutral-900 text-white text-xs rounded-sm shadow-md flex items-center justify-between animate-in fade-in">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-sm border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">Total Shipments</span>
          <div className="text-2xl font-serif font-bold text-neutral-900 mt-1">{metrics.total}</div>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">All provider manifests</span>
        </div>

        <div className="bg-white p-4 rounded-sm border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">In Transit</span>
          <div className="text-2xl font-serif font-bold text-blue-700 mt-1">{metrics.inTransit}</div>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">Air & Surface en-route</span>
        </div>

        <div className="bg-white p-4 rounded-sm border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Pending Pickup</span>
          <div className="text-2xl font-serif font-bold text-amber-700 mt-1">{metrics.pendingPickup}</div>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">Atelier queue</span>
        </div>

        <div className="bg-white p-4 rounded-sm border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Delivered</span>
          <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">{metrics.delivered}</div>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">Completed handovers</span>
        </div>

        <div className="bg-white p-4 rounded-sm border border-neutral-200 shadow-xs col-span-2 md:col-span-1">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">Exceptions</span>
          <div className="text-2xl font-serif font-bold text-rose-600 mt-1">{metrics.exceptions}</div>
          <span className="text-[11px] text-neutral-400 mt-0.5 block">Cancelled / RTO</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
        {/* Search & Filter Header */}
        <div className="p-4 border-b border-neutral-200 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center bg-neutral-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order #, Customer, AWB, Courier, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-sm focus:outline-none focus:border-[#734E06] bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-neutral-500 whitespace-nowrap">Filter Status:</span>
            {[
              { id: "all", label: "All" },
              { id: "CREATED", label: "Created" },
              { id: "AWB_ASSIGNED", label: "AWB Assigned" },
              { id: "PICKUP_REQUESTED", label: "Pickup Scheduled" },
              { id: "IN_TRANSIT", label: "In Transit" },
              { id: "DELIVERED", label: "Delivered" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
                  statusFilter === tab.id
                    ? "bg-[#734E06] text-white font-semibold"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile View: Stacked Shipment Cards (Visible on <640px) */}
        <div className="sm:hidden divide-y divide-neutral-200">
          {filteredShipments.map((shipment) => {
            const relatedOrder = orders.find((o) => o.id === shipment.orderId);
            const isLoading = loadingActionId === shipment.id;

            return (
              <div key={shipment.id} className="p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-neutral-900 text-xs block">
                      {shipment.orderNumber}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      SR ID: #{shipment.providerOrderId || "—"}
                    </span>
                  </div>
                  <div>{getStatusBadge(shipment.status)}</div>
                </div>

                <div className="flex justify-between text-xs">
                  <div>
                    <span className="font-medium text-neutral-900 block">
                      {relatedOrder?.customerName || "Customer"}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {relatedOrder?.city} ({relatedOrder?.pincode || "—"})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-neutral-800 block">
                      {shipment.courierName || "Pending Carrier"}
                    </span>
                    {shipment.awb ? (
                      <span className="font-mono text-[#734E06] font-bold text-[10px]">
                        AWB: {shipment.awb}
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400 italic">No AWB yet</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      shipment.paymentMethod === "cod"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {shipment.paymentMethod.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-1">
                    {shipment.status === "CREATED" && (
                      <Button
                        size="sm"
                        disabled={isLoading}
                        onClick={() => handleAssignAWB(shipment)}
                        className="h-7 px-2 text-[10px] bg-[#734E06] text-white"
                      >
                        Assign AWB
                      </Button>
                    )}
                    {shipment.status === "AWB_ASSIGNED" && (
                      <Button
                        size="sm"
                        disabled={isLoading}
                        onClick={() => handleRequestPickup(shipment)}
                        className="h-7 px-2 text-[10px] bg-neutral-900 text-white"
                      >
                        Pickup
                      </Button>
                    )}
                    {shipment.awb && (
                      <button
                        onClick={() => setTrackingModalShipment(shipment)}
                        className="p-1 text-neutral-700 border border-neutral-200 rounded-sm"
                        title="Track"
                      >
                        <Truck className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {shipment.labelUrl && (
                      <a
                        href={shipment.labelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-neutral-700 border border-neutral-200 rounded-sm"
                        title="Label"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredShipments.length === 0 && (
            <div className="p-8 text-center text-neutral-400 text-xs">
              No shipments found matching your criteria.
            </div>
          )}
        </div>

        {/* Desktop View: Full Table (Visible on >=640px) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-100 text-neutral-600 font-semibold border-b border-neutral-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order / Manifest</th>
                <th className="py-3 px-4">Customer & Destination</th>
                <th className="py-3 px-4">Courier & AWB</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <Truck className="w-10 h-10 mx-auto text-neutral-300 mb-2 opacity-50" />
                    No shipments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredShipments.map((shipment) => {
                  const relatedOrder = orders.find((o) => o.id === shipment.orderId);
                  const isLoading = loadingActionId === shipment.id;

                  return (
                    <tr key={shipment.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <button
                          onClick={() => onNavigate?.(`/admin/orders`)}
                          className="font-bold text-neutral-900 hover:text-[#734E06] flex items-center gap-1 group text-xs"
                        >
                          {shipment.orderNumber}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <span className="text-[11px] text-neutral-400 block font-mono mt-0.5">
                          SR ID: #{shipment.providerOrderId || "—"}
                        </span>
                        <span className="text-[10px] text-neutral-400 block">
                          Weight: {shipment.packageWeightKg} kg
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-neutral-900">
                          {relatedOrder?.customerName || "Customer"}
                        </div>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          {relatedOrder?.city || "Destination"} ({relatedOrder?.pincode || "—"})
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-neutral-900">
                          {shipment.courierName || "Pending Allocation"}
                        </div>
                        {shipment.awb ? (
                          <span className="font-mono text-accent font-bold text-[11px] block mt-0.5">
                            {shipment.awb}
                          </span>
                        ) : (
                          <span className="text-neutral-400 text-[10px] italic">AWB not generated</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            shipment.paymentMethod === "cod"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {shipment.paymentMethod.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3 px-4">{getStatusBadge(shipment.status)}</td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 1. If status is CREATED: Generate AWB button */}
                          {shipment.status === "CREATED" && (
                            <Button
                              size="sm"
                              disabled={isLoading}
                              onClick={() => handleAssignAWB(shipment)}
                              className="h-7 px-2.5 text-[11px] bg-[#734E06] hover:bg-[#5a3c04] text-white"
                            >
                              Assign AWB
                            </Button>
                          )}

                          {/* 2. If status is AWB_ASSIGNED: Request Pickup button */}
                          {shipment.status === "AWB_ASSIGNED" && (
                            <Button
                              size="sm"
                              disabled={isLoading}
                              onClick={() => handleRequestPickup(shipment)}
                              className="h-7 px-2.5 text-[11px] bg-neutral-900 hover:bg-neutral-800 text-white"
                            >
                              Request Pickup
                            </Button>
                          )}

                          {/* 3. Track button */}
                          {shipment.awb && (
                            <button
                              onClick={() => setTrackingModalShipment(shipment)}
                              title="View Real-Time Tracking"
                              className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-sm"
                            >
                              <Truck className="w-4 h-4" />
                            </button>
                          )}

                          {/* 4. Sync Tracking */}
                          {shipment.awb && (
                            <button
                              onClick={() => handleSyncTracking(shipment)}
                              title="Sync Carrier Status"
                              disabled={isLoading}
                              className={`p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-sm ${
                                isLoading ? "animate-spin text-accent" : ""
                              }`}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}

                          {/* 5. Print Label */}
                          {shipment.labelUrl && (
                            <a
                              href={shipment.labelUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Print Shipping Label"
                              className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-sm"
                            >
                              <Printer className="w-4 h-4" />
                            </a>
                          )}

                          {/* 6. Cancel */}
                          {shipment.status !== "CANCELLED" &&
                            shipment.status !== "DELIVERED" && (
                              <button
                                onClick={() => setCancelModalShipment(shipment)}
                                title="Cancel Shipment"
                                className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-sm"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRACKING TIMELINE MODAL */}
      {trackingModalShipment && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
        >
          <div className="bg-white max-w-lg w-full rounded-sm border border-neutral-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div>
                <h3 className="font-serif font-bold text-neutral-900 m-0 text-base flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent" />
                  Carrier Tracking — {trackingModalShipment.orderNumber}
                </h3>
                <span className="text-[11px] text-neutral-500 font-mono">
                  AWB: {trackingModalShipment.awb} ({trackingModalShipment.courierName})
                </span>
              </div>
              <button
                onClick={() => setTrackingModalShipment(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60dvh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Current Status</span>
                  <div className="mt-0.5">{getStatusBadge(trackingModalShipment.status)}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Estimated Delivery</span>
                  <strong className="text-xs text-neutral-800">
                    {trackingModalShipment.estimatedDeliveryDate || "In Transit"}
                  </strong>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {trackingModalShipment.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                        idx === trackingModalShipment.timeline.length - 1
                          ? "border-accent bg-accent/20"
                          : "border-emerald-600 bg-emerald-100"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          idx === trackingModalShipment.timeline.length - 1 ? "bg-accent" : "bg-emerald-600"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-xs text-neutral-900">{event.status}</strong>
                        <span className="text-[10px] text-neutral-400">{event.timestamp}</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-0.5 m-0">{event.activity}</p>
                      {event.location && (
                        <span className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSyncTracking(trackingModalShipment)}
                className="text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Refresh Tracking
              </Button>
              <Button
                size="sm"
                onClick={() => setTrackingModalShipment(null)}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL SHIPMENT MODAL */}
      {cancelModalShipment && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
        >
          <div className="bg-white max-w-md w-full rounded-sm border border-neutral-200 shadow-xl overflow-hidden p-6 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-center text-neutral-900 text-lg m-0">
              Cancel Shipment for {cancelModalShipment.orderNumber}?
            </h3>
            <p className="text-xs text-neutral-500 text-center mt-2 leading-relaxed">
              This will notify Shiprocket and cancel the courier dispatch manifest. The underlying customer order
              will remain in the database with status &quot;Confirmed&quot;.
            </p>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setCancelModalShipment(null)}
                className="flex-1 text-xs"
              >
                Go Back
              </Button>
              <Button
                onClick={handleConfirmCancel}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
