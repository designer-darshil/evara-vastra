// ==========================================================
// FASTRR CHECKOUT / SHIPROCKET PAYMENT TYPES & INTERFACES
// ==========================================================

export type PaymentStatus = "PENDING" | "AUTHORIZED" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED" | "COD";

export type PaymentMethodType = "upi" | "card" | "netbanking" | "wallet" | "cod" | "fastrr_checkout";

export type CheckoutDiagnosticCode =
  | "CHECKOUT_INIT_FAILED"
  | "CHECKOUT_AUTH_FAILED"
  | "CHECKOUT_CALLBACK_FAILED"
  | "WEBHOOK_VERIFICATION_FAILED"
  | "ORDER_CREATION_FAILED";

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
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface PaymentIntent {
  intentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customer?: CustomerBillingDetails;
  items: PaymentItem[];
  paymentMethod?: PaymentMethodType;
  fastrrOrderId?: string;
  checkoutUrl: string;
  createdAt: string;
  expiresAt?: string;
  checkoutProvider: "Shiprocket / Fastrr Checkout";
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
  checkoutProvider: "Shiprocket / Fastrr Checkout";
  fastrrOrderId?: string;
}

export interface PaymentVerificationRequest {
  orderId: string;
  paymentId?: string;
  transactionId?: string;
  signature?: string;
  status?: string;
}

export interface FastrrWebhookEvent {
  event: "payment.success" | "payment.failed" | "order.paid" | "order.cancelled" | "order.cod_confirmed";
  data: {
    order_id: string;
    payment_id?: string;
    transaction_id?: string;
    amount: number;
    currency: string;
    payment_method?: string;
    transaction_time: string;
    customer_phone?: string;
    customer_email?: string;
    customer_name?: string;
    shipping_address?: {
      line1?: string;
      city?: string;
      state?: string;
      pincode?: string;
      country?: string;
    };
  };
  signature?: string;
}

export interface PaymentProviderConfig {
  apiKey: string;
  apiPassword?: string; // Server-side only
  sharedSecret?: string; // Server-side only
  storefrontToken: string;
  domain: string;
  environment: "test" | "production";
  isConfigured: boolean;
  isEnabled: boolean;
}

