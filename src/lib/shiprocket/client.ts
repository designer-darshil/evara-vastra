// ==========================================================
// SHIPROCKET INTEGRATION — HTTP CLIENT & SANDBOX ENGINE
// ==========================================================

import { getShiprocketToken, getShiprocketCredentials } from "./auth";
import { ShiprocketError, ShiprocketRateLimitError } from "./errors";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  params?: Record<string, string | number | boolean | undefined>;
  timeoutMs?: number;
  skipAuth?: boolean;
}

export class ShiprocketClient {
  private static defaultTimeoutMs = 12000;

  public static async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { baseUrl, isConfigured } = getShiprocketCredentials();

    // If live credentials are not configured, run through sandbox simulation engine
    if (!isConfigured) {
      return this.simulateSandboxResponse<T>(endpoint, options);
    }

    const { method = "GET", body, params, timeoutMs = this.defaultTimeoutMs, skipAuth = false } = options;

    let token = "";
    if (!skipAuth) {
      token = await getShiprocketToken();
    }

    const url = new URL(`${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (response.status === 429) {
        throw new ShiprocketRateLimitError("Shiprocket API rate limit reached. Please wait before retrying.");
      }

      if (!response.ok) {
        const text = await response.text();
        let parsed: any;
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }
        throw new ShiprocketError(
          `Shiprocket API error HTTP ${response.status}: ${typeof parsed === "string" ? parsed : parsed?.message || "Unknown error"}`,
          response.status,
          parsed
        );
      }

      return (await response.json()) as T;
    } catch (err: any) {
      clearTimeout(timer);
      if (err?.name === "AbortError") {
        throw new ShiprocketError(`Shiprocket request timed out after ${timeoutMs}ms`, 408);
      }
      throw err;
    }
  }

  /**
   * High-fidelity sandbox simulation engine for development and offline testing.
   * Generates realistic, compliant Shiprocket responses based on input parameters.
   */
  private static async simulateSandboxResponse<T>(endpoint: string, options: RequestOptions): Promise<T> {
    // Artificial small latency to simulate realistic network behavior
    await new Promise((res) => setTimeout(res, 80));

    // 1. Serviceability Check Endpoint
    if (endpoint.includes("/courier/serviceability")) {
      const deliveryPostcode = String(options.params?.delivery_postcode || "395002");
      const isServiceable = deliveryPostcode.length === 6 && !deliveryPostcode.startsWith("000");

      if (!isServiceable) {
        return {
          status: 404,
          message: "Pincode not serviceable",
          data: {
            available_courier_companies: [],
            is_valid: false,
          },
        } as any;
      }

      return {
        status: 200,
        data: {
          available_courier_companies: [
            {
              courier_company_id: 1,
              courier_name: "Blue Dart Express Air",
              estimated_delivery_days: 2,
              etd: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
              rate: 120,
              cod: 1,
              rating: 4.8,
              surface: 0,
            },
            {
              courier_company_id: 2,
              courier_name: "Delhivery Surface",
              estimated_delivery_days: 3,
              etd: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
              rate: 80,
              cod: 1,
              rating: 4.5,
              surface: 1,
            },
            {
              courier_company_id: 3,
              courier_name: "Ecom Express Priority",
              estimated_delivery_days: 3,
              etd: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
              rate: 90,
              cod: 1,
              rating: 4.4,
              surface: 1,
            },
            {
              courier_company_id: 4,
              courier_name: "Shadowfax Express",
              estimated_delivery_days: 4,
              etd: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],
              rate: 75,
              cod: 1,
              rating: 4.2,
              surface: 1,
            },
          ],
        },
      } as any;
    }

    // 2. Order Creation Endpoint
    if (endpoint.includes("/orders/create/adhoc") || endpoint.includes("/orders/create")) {
      const shipmentId = Math.floor(1000000 + Math.random() * 9000000);
      const orderId = Math.floor(1000000 + Math.random() * 9000000);

      return {
        order_id: orderId,
        shipment_id: shipmentId,
        status: "NEW",
        status_code: 1,
        onboarding_completed_now: 0,
        awb_code: "",
        courier_company_id: 1,
        courier_name: "Blue Dart Express Air",
      } as any;
    }

    // 3. AWB Assignment Endpoint
    if (endpoint.includes("/courier/assign/awb")) {
      const shipmentId = options.body?.shipment_id || 1002341;
      const awbCode = `SR${Math.floor(100000000 + Math.random() * 900000000)}`;

      return {
        awb_assign_status: 1,
        response: {
          data: {
            awb_code: awbCode,
            courier_company_id: 1,
            courier_name: "Blue Dart Express Air",
            shipment_id: Number(shipmentId),
          },
        },
      } as any;
    }

    // 4. Request Pickup Endpoint
    if (endpoint.includes("/courier/generate/pickup")) {
      return {
        pickup_status: 1,
        response: {
          pickup_scheduled_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          pickup_token_number: `PKP-${Math.floor(100000 + Math.random() * 900000)}`,
        },
      } as any;
    }

    // 5. Tracking Endpoint
    if (endpoint.includes("/courier/track/awb")) {
      const awb = endpoint.split("/").pop() || "SR984512341";
      return {
        tracking_data: {
          track_status: 1,
          shipment_status: 6, // In Transit
          shipment_track: [
            {
              id: 1,
              awb_code: awb,
              courier_name: "Blue Dart Express Air",
              current_status: "In Transit",
              origin: "Surat Atelier Hub",
              destination: "Destination Hub",
              consignee_name: "Customer",
              pickup_date: "2026-08-30 11:00:00",
            },
          ],
          shipment_track_activities: [
            {
              date: "2026-08-30 11:30:00",
              status: "PICKED UP",
              activity: "Shipment picked up from Surat Atelier",
              location: "Surat Hub",
            },
            {
              date: "2026-08-30 18:45:00",
              status: "IN TRANSIT",
              activity: "Departed from sorting facility",
              location: "Surat Logistics Park",
            },
            {
              date: "2026-08-31 09:15:00",
              status: "IN TRANSIT",
              activity: "Arrived at destination transit terminal",
              location: "Destination Sorting Center",
            },
          ],
          track_url: `https://shiprocket.co/tracking/${awb}`,
        },
      } as any;
    }

    // 6. Label / Invoice Generation
    if (endpoint.includes("/courier/generate/label")) {
      return {
        label_created: 1,
        label_url: "https://shiprocket.co/sample_shipping_label.pdf",
      } as any;
    }

    if (endpoint.includes("/orders/print/invoice")) {
      return {
        is_invoice_created: true,
        invoice_url: "https://shiprocket.co/sample_tax_invoice.pdf",
      } as any;
    }

    // Default simulation fallback
    return { status: 200, message: "Simulated sandbox success response" } as any;
  }
}
