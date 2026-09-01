// ==========================================================
// SHIPROCKET INTEGRATION — SERVICEABILITY & RATE CALCULATOR
// ==========================================================

import { ShiprocketClient } from "./client";
import { ShippingEstimate, CourierOption } from "./types";
import { ShiprocketServiceabilityError } from "./errors";

// Cache in-memory serviceability results for 10 minutes to reduce network strain and debounce queries
interface ServiceabilityCacheEntry {
  data: ShippingEstimate;
  expiresAt: number;
}

const serviceabilityCache = new Map<string, ServiceabilityCacheEntry>();
const CACHE_TTL_MS = 10 * 60 * 1000;

export async function checkCourierServiceability(params: {
  pickupPincode?: string;
  deliveryPincode: string;
  weightKg?: number;
  cod?: boolean;
  orderValue?: number;
}): Promise<ShippingEstimate> {
  const {
    pickupPincode = "395002", // Default Surat Atelier Warehouse Pincode
    deliveryPincode,
    weightKg = 0.5,
    cod = false,
    orderValue = 2500,
  } = params;

  const cleanDeliveryPincode = deliveryPincode.trim().replace(/\D/g, "");

  if (cleanDeliveryPincode.length !== 6) {
    return {
      serviceable: false,
      pincode: cleanDeliveryPincode,
      estimatedDays: 0,
      estimatedDeliveryDate: "",
      shippingCharge: 0,
      codAvailable: false,
      availableCouriers: [],
      message: "Please enter a valid 6-digit Indian PIN code.",
    };
  }

  const cacheKey = `${pickupPincode}_${cleanDeliveryPincode}_${weightKg}_${cod ? 1 : 0}`;
  const now = Date.now();
  const cached = serviceabilityCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  try {
    const rawResponse = await ShiprocketClient.request<{
      status: number;
      data: {
        available_courier_companies: Array<{
          courier_company_id: number;
          courier_name: string;
          estimated_delivery_days: number;
          etd: string;
          rate: number;
          cod: number;
          rating?: number;
          surface?: number;
        }>;
      };
    }>("/courier/serviceability", {
      method: "GET",
      params: {
        pickup_postcode: pickupPincode,
        delivery_postcode: cleanDeliveryPincode,
        weight: String(weightKg),
        cod: cod ? 1 : 0,
        declared_value: String(orderValue),
      },
    });

    const courierList = rawResponse?.data?.available_courier_companies || [];

    if (!courierList || courierList.length === 0) {
      const estimate: ShippingEstimate = {
        serviceable: false,
        pincode: cleanDeliveryPincode,
        estimatedDays: 0,
        estimatedDeliveryDate: "",
        shippingCharge: 0,
        codAvailable: false,
        availableCouriers: [],
        message: "This location is currently not serviceable for express courier delivery.",
      };
      serviceabilityCache.set(cacheKey, { data: estimate, expiresAt: now + CACHE_TTL_MS });
      return estimate;
    }

    const availableCouriers: CourierOption[] = courierList.map((c) => ({
      courierCompanyId: c.courier_company_id,
      courierName: c.courier_name,
      estimatedDeliveryDays: Number(c.estimated_delivery_days) || 3,
      estimatedDeliveryDate: c.etd || new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
      rate: Number(c.rate) || 0,
      codAvailable: Boolean(c.cod),
      rating: c.rating || 4.5,
      isSurface: Boolean(c.surface),
    }));

    // Choose optimal courier (fastest SLA / best rate)
    const fastestCourier = [...availableCouriers].sort(
      (a, b) => a.estimatedDeliveryDays - b.estimatedDeliveryDays
    )[0];

    const estimate: ShippingEstimate = {
      serviceable: true,
      pincode: cleanDeliveryPincode,
      estimatedDays: fastestCourier.estimatedDeliveryDays,
      estimatedDeliveryDate: fastestCourier.estimatedDeliveryDate,
      shippingCharge: 0, // Complimentary pan-India shipping for Evara Vastra patrons
      codAvailable: availableCouriers.some((c) => c.codAvailable),
      availableCouriers,
      message: `Delivery available in ${fastestCourier.estimatedDeliveryDays} business days via ${fastestCourier.courierName}.`,
    };

    serviceabilityCache.set(cacheKey, { data: estimate, expiresAt: now + CACHE_TTL_MS });
    return estimate;
  } catch (error: any) {
    if (error instanceof ShiprocketServiceabilityError) throw error;
    return {
      serviceable: false,
      pincode: cleanDeliveryPincode,
      estimatedDays: 0,
      estimatedDeliveryDate: "",
      shippingCharge: 0,
      codAvailable: false,
      availableCouriers: [],
      message: "Unable to verify delivery estimate for this PIN code at the moment.",
    };
  }
}
