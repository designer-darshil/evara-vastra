// ==========================================================
// SHIPROCKET INTEGRATION — TYPINGS & DATA MODELS
// ==========================================================

export type ShipmentStatus =
  | "NOT_CREATED"
  | "CREATED"
  | "COURIER_ASSIGNED"
  | "AWB_ASSIGNED"
  | "PICKUP_REQUESTED"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "RTO"
  | "FAILED";

export interface PackageDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
}

export interface PickupLocation {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface CourierOption {
  courierCompanyId: number;
  courierName: string;
  estimatedDeliveryDays: number;
  estimatedDeliveryDate: string;
  rate: number;
  codAvailable: boolean;
  rating?: number;
  isSurface?: boolean;
}

export interface ShippingEstimate {
  serviceable: boolean;
  pincode: string;
  city?: string;
  state?: string;
  estimatedDays: number;
  estimatedDeliveryDate: string;
  shippingCharge: number;
  codAvailable: boolean;
  availableCouriers: CourierOption[];
  message?: string;
}

export interface ShipmentTrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  activity: string;
  completed: boolean;
}

export interface Shipment {
  id: string;
  orderId: string;
  orderNumber: string;
  provider: "shiprocket" | "custom";
  providerOrderId?: number | string;
  providerShipmentId?: number | string;
  awb?: string;
  courierName?: string;
  courierId?: number;
  pickupLocationId: string;
  pickupLocationName?: string;
  status: ShipmentStatus;
  paymentMethod: "prepaid" | "cod";
  packageWeightKg: number;
  dimensionsCm: {
    length: number;
    width: number;
    height: number;
  };
  shippingCharge: number;
  estimatedDeliveryDate?: string;
  trackingUrl?: string;
  labelUrl?: string;
  manifestUrl?: string;
  invoiceUrl?: string;
  timeline: ShipmentTrackingEvent[];
  errorDetails?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingSettings {
  provider: "shiprocket" | "manual";
  isLive: boolean;
  defaultPickupLocationId: string;
  defaultWeightKg: number;
  defaultDimensionsCm: {
    length: number;
    width: number;
    height: number;
  };
  codEnabled: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  autoAssignCourier: boolean;
  autoGenerateAwb: boolean;
}

// ----------------------------------------------------------
// Raw Shiprocket API Request / Response Types (Normalized)
// ----------------------------------------------------------

export interface ShiprocketAuthResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company_id: number;
  created_at: string;
  token: string;
}

export interface ShiprocketOrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
  hsn?: string | number;
}

export interface ShiprocketCreateOrderRequest {
  order_id: string;
  order_date: string;
  pickup_location: string;
  channel_id?: string;
  comment?: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_address_2?: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: ShiprocketOrderItem[];
  payment_method: "Prepaid" | "COD";
  shipping_charges?: number;
  giftwrap_charges?: number;
  transaction_charges?: number;
  total_discount?: number;
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

export interface ShiprocketCreateOrderResponse {
  order_id: number;
  shipment_id: number;
  status: string;
  status_code: number;
  onboarding_completed_now: number;
  awb_code?: string;
  courier_company_id?: number;
  courier_name?: string;
}

export interface ShiprocketAssignAWBRequest {
  shipment_id: number;
  courier_id?: number;
  status?: string;
}

export interface ShiprocketAssignAWBResponse {
  awb_assign_status: number;
  response: {
    data: {
      awb_code: string;
      courier_company_id: number;
      courier_name: string;
      shipment_id: number;
    };
  };
}

export interface ShiprocketTrackingResponse {
  tracking_data: {
    track_status: number;
    shipment_status: number;
    shipment_track: Array<{
      id: number;
      awb_code: string;
      courier_name: string;
      current_status: string;
      origin: string;
      destination: string;
      consignee_name: string;
      pickup_date: string;
      delivered_date?: string;
    }>;
    shipment_track_activities: Array<{
      date: string;
      status: string;
      activity: string;
      location: string;
    }>;
    track_url: string;
  };
}
