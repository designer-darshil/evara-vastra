// ==========================================================
// FASTRR CHECKOUT / SHIPROCKET PAYMENT TYPES & INTERFACES
// ==========================================================

export type PaymentStatus = "PENDING" | "AUTHORIZED" | "PAID" | "FAILED" | "CANCELLED";

export type PaymentMethodType = "upi" | "card" | "netbanking" | "wallet" | "cod";

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

export interface CustomerBillingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PaymentIntent {
  intentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customer: CustomerBillingDetails;
  items: PaymentItem[];
  paymentMethod?: PaymentMethodType;
  fastrrOrderId?: string;
  checkoutUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  transactionId?: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  method?: string;
  error?: string;
  timestamp: string;
}

export interface PaymentVerificationRequest {
  orderId: string;
  paymentId: string;
  signature?: string;
  status?: string;
}

export interface FastrrWebhookEvent {
  event: "payment.success" | "payment.failed" | "order.paid" | "order.cancelled";
  data: {
    order_id: string;
    payment_id: string;
    amount: number;
    currency: string;
    payment_method: string;
    transaction_time: string;
    customer_phone: string;
  };
  signature?: string;
}

export interface PaymentProviderConfig {
  appId: string;
  authToken: string;
  webhookSecret: string;
  environment: "test" | "production";
  isConfigured: boolean;
}
