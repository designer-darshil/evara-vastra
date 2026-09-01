// ==========================================================
// SHIPROCKET INTEGRATION — WEBHOOK HANDLER & SIGNATURE VERIFIER
// ==========================================================

import { Shipment, ShipmentStatus } from "./types";
import { normalizeShiprocketStatus } from "./tracking";
import { ShiprocketWebhookError } from "./errors";

export interface ShiprocketWebhookPayload {
  awb: string;
  order_id?: string | number;
  shipment_id?: string | number;
  current_status: string;
  courier_name?: string;
  location?: string;
  activity?: string;
  date?: string;
  scans?: Array<{
    date: string;
    activity: string;
    location: string;
    status: string;
  }>;
}

/**
 * Validates the authenticity of an incoming Shiprocket webhook.
 */
export function verifyShiprocketWebhook(headers: Record<string, string | undefined>, rawBody: string): boolean {
  const proc = typeof globalThis !== "undefined" ? (globalThis as any).process : undefined;
  const secretToken = proc?.env?.SHIPROCKET_WEBHOOK_TOKEN || "";
  
  // If webhook token is configured, check x-api-key or Authorization header
  if (secretToken) {
    const incomingKey = headers["x-api-key"] || headers["authorization"] || "";
    if (incomingKey !== secretToken && !incomingKey.endsWith(secretToken)) {
      return false;
    }
  }

  return Boolean(rawBody);
}

/**
 * Processes an incoming webhook event and updates the internal Shipment entity.
 */
export function processShiprocketWebhookEvent(
  payload: ShiprocketWebhookPayload,
  existingShipment: Shipment
): Shipment {
  if (!payload || !payload.awb) {
    throw new ShiprocketWebhookError("Invalid Shiprocket webhook payload: Missing AWB");
  }

  const newStatus: ShipmentStatus = normalizeShiprocketStatus(payload.current_status || "");
  const now = new Date().toISOString();

  const newEvent = {
    timestamp: payload.date || new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    status: payload.current_status || newStatus,
    location: payload.location || "Transit Hub",
    activity: payload.activity || `Status updated to ${payload.current_status}`,
    completed: true,
  };

  return {
    ...existingShipment,
    status: newStatus,
    awb: payload.awb || existingShipment.awb,
    courierName: payload.courier_name || existingShipment.courierName,
    timeline: [...existingShipment.timeline, newEvent],
    updatedAt: now,
  };
}
