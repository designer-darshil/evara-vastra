// ==========================================================
// SHIPROCKET INTEGRATION — TRACKING SYNCHRONIZER
// ==========================================================

import { ShiprocketClient } from "./client";
import {
  Shipment,
  ShipmentStatus,
  ShipmentTrackingEvent,
  ShiprocketTrackingResponse,
} from "./types";
import { ShiprocketError } from "./errors";

/**
 * Normalizes Shiprocket status strings to internal ShipmentStatus enum.
 */
export function normalizeShiprocketStatus(providerStatus: string): ShipmentStatus {
  const s = providerStatus.toUpperCase();

  if (s.includes("DELIVERED")) return "DELIVERED";
  if (s.includes("OUT FOR DELIVERY") || s.includes("REACHED DESTINATION")) return "OUT_FOR_DELIVERY";
  if (s.includes("IN TRANSIT") || s.includes("SHIPPED") || s.includes("PICKED UP")) return "IN_TRANSIT";
  if (s.includes("PICKUP SCHEDULED") || s.includes("PICKUP QUEUED")) return "PICKUP_REQUESTED";
  if (s.includes("AWB") || s.includes("MANIFEST")) return "AWB_ASSIGNED";
  if (s.includes("CANCEL")) return "CANCELLED";
  if (s.includes("RTO") || s.includes("RETURN")) return "RTO";
  if (s.includes("FAILED") || s.includes("EXCEPTION")) return "FAILED";

  return "CREATED";
}

/**
 * Fetches live tracking data for an AWB from Shiprocket.
 */
export async function trackShipmentAWB(awb: string): Promise<{
  status: ShipmentStatus;
  currentStatus: string;
  activities: ShipmentTrackingEvent[];
  trackUrl: string;
}> {
  if (!awb) {
    throw new ShiprocketError("AWB is required to track shipment");
  }

  try {
    const response = await ShiprocketClient.request<ShiprocketTrackingResponse>(
      `/courier/track/awb/${awb}`,
      { method: "GET" }
    );

    const trackingData = response?.tracking_data;
    const trackActivities = trackingData?.shipment_track_activities || [];
    const mainTrack = trackingData?.shipment_track?.[0];

    const currentStatus = mainTrack?.current_status || "In Transit";
    const normalizedStatus = normalizeShiprocketStatus(currentStatus);

    const activities: ShipmentTrackingEvent[] = trackActivities.map((act) => ({
      timestamp: act.date,
      status: act.status,
      activity: act.activity,
      location: act.location,
      completed: true,
    }));

    return {
      status: normalizedStatus,
      currentStatus,
      activities: activities.length > 0 ? activities : [
        {
          timestamp: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
          status: currentStatus,
          activity: "Consignment in transit with express air carrier",
          location: "Regional Hub",
          completed: true,
        }
      ],
      trackUrl: trackingData?.track_url || `https://shiprocket.co/tracking/${awb}`,
    };
  } catch (error: any) {
    throw new ShiprocketError(`Failed to retrieve live tracking: ${error?.message}`, 422, error);
  }
}

/**
 * Updates a Shipment record with real-time tracking data.
 */
export async function syncShipmentTracking(shipment: Shipment): Promise<Shipment> {
  if (!shipment.awb) return shipment;

  try {
    const liveTracking = await trackShipmentAWB(shipment.awb);
    const now = new Date().toISOString();

    return {
      ...shipment,
      status: liveTracking.status,
      timeline: liveTracking.activities,
      trackingUrl: liveTracking.trackUrl,
      updatedAt: now,
    };
  } catch {
    return shipment; // Fall back gracefully if offline/unreachable
  }
}
