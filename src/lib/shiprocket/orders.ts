// ==========================================================
// SHIPROCKET INTEGRATION — ORDER CREATION & MAPPING
// ==========================================================

import { ShiprocketClient } from "./client";
import {
  ShiprocketCreateOrderRequest,
  ShiprocketCreateOrderResponse,
  Shipment,
} from "./types";
import { ShiprocketOrderError } from "./errors";

export interface OrderCreationInput {
  orderId: string;
  orderNumber: string;
  orderDate?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  paymentMethod: "prepaid" | "cod";
  items: Array<{
    id: string;
    title: string;
    sku?: string;
    price: number;
    quantity: number;
    fabric?: string;
  }>;
  subtotal: number;
  total: number;
  packageWeightKg?: number;
  dimensionsCm?: {
    length: number;
    width: number;
    height: number;
  };
  pickupLocationName?: string;
}

/**
 * Creates a Shiprocket order and returns an initialized Shipment entity.
 */
export async function createShiprocketOrder(
  input: OrderCreationInput
): Promise<Shipment> {
  const {
    orderId,
    orderNumber,
    orderDate = new Date().toISOString().split("T")[0],
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    city,
    state,
    pincode,
    country = "India",
    paymentMethod,
    items,
    subtotal,
    total,
    packageWeightKg = 0.5,
    dimensionsCm = { length: 30, width: 22, height: 5 },
    pickupLocationName = "Surat Atelier Primary",
  } = input;

  // Split name into first and last
  const nameParts = customerName.trim().split(" ");
  const firstName = nameParts[0] || "Customer";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Prepare Shiprocket order payload
  const payload: ShiprocketCreateOrderRequest = {
    order_id: orderNumber || orderId,
    order_date: orderDate,
    pickup_location: pickupLocationName,
    billing_customer_name: firstName,
    billing_last_name: lastName,
    billing_address: shippingAddress,
    billing_city: city,
    billing_pincode: pincode,
    billing_state: state,
    billing_country: country,
    billing_email: customerEmail,
    billing_phone: customerPhone,
    shipping_is_billing: true,
    payment_method: paymentMethod === "cod" ? "COD" : "Prepaid",
    sub_total: subtotal || total,
    length: dimensionsCm.length,
    breadth: dimensionsCm.width,
    height: dimensionsCm.height,
    weight: Math.max(0.5, packageWeightKg),
    order_items: items.map((item) => ({
      name: item.title,
      sku: item.sku || `EV-${item.id.slice(0, 10)}`,
      units: item.quantity,
      selling_price: item.price,
      discount: 0,
      tax: 0,
    })),
  };

  try {
    const response = await ShiprocketClient.request<ShiprocketCreateOrderResponse>(
      "/orders/create/adhoc",
      {
        method: "POST",
        body: payload,
      }
    );

    if (!response || !response.shipment_id) {
      throw new ShiprocketOrderError("Shiprocket order creation returned invalid shipment response", response);
    }

    const now = new Date().toISOString();
    const shipmentRecord: Shipment = {
      id: `ship-${Date.now()}`,
      orderId,
      orderNumber,
      provider: "shiprocket",
      providerOrderId: response.order_id,
      providerShipmentId: response.shipment_id,
      pickupLocationId: "pickup-surat-01",
      pickupLocationName,
      status: "CREATED",
      paymentMethod,
      packageWeightKg,
      dimensionsCm,
      shippingCharge: 0,
      estimatedDeliveryDate: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
      timeline: [
        {
          timestamp: new Date().toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "Order Confirmed & Shipment Created",
          location: "Surat Atelier Hub",
          activity: `Shiprocket Order #${response.order_id} initiated`,
          completed: true,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    return shipmentRecord;
  } catch (error: any) {
    if (error instanceof ShiprocketOrderError) throw error;
    throw new ShiprocketOrderError(error?.message || "Failed to create Shiprocket order", error);
  }
}
