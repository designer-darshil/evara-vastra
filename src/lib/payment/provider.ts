// ==========================================================
// SINGLE PAYMENT PROVIDER: SHIPROCKET / FASTRR CHECKOUT
// ==========================================================

import {
  PaymentIntent,
  PaymentResult,
  CustomerBillingDetails,
  PaymentItem,
  PaymentVerificationRequest,
  PaymentProviderConfig,
} from "./types";
import { FastrrCheckoutClient } from "./fastrrCheckout";

export interface PaymentProvider {
  name: string;
  getConfig(): PaymentProviderConfig;
  createPaymentIntent(params: {
    orderId: string;
    amount: number;
    currency?: string;
    customer?: CustomerBillingDetails;
    items: PaymentItem[];
    paymentMethod?: string;
  }): Promise<PaymentIntent>;
  verifyPayment(request: PaymentVerificationRequest): Promise<PaymentResult>;
  testConnection(): Promise<{ success: boolean; message: string; latencyMs: number }>;
}

export class FastrrPaymentProviderAdapter implements PaymentProvider {
  public readonly name = "Shiprocket / Fastrr Checkout";

  public getConfig(): PaymentProviderConfig {
    return FastrrCheckoutClient.getConfig();
  }

  public async createPaymentIntent(params: {
    orderId: string;
    amount: number;
    currency?: string;
    customer?: CustomerBillingDetails;
    items: PaymentItem[];
    paymentMethod?: string;
  }): Promise<PaymentIntent> {
    return FastrrCheckoutClient.createPaymentIntent(params);
  }

  public async verifyPayment(request: PaymentVerificationRequest): Promise<PaymentResult> {
    return FastrrCheckoutClient.verifyPayment(request);
  }

  public async testConnection(): Promise<{ success: boolean; message: string; latencyMs: number }> {
    return FastrrCheckoutClient.testConnection();
  }
}

// Canonical singleton export — Strictly ONE checkout integration
export const paymentProvider: PaymentProvider = new FastrrPaymentProviderAdapter();

