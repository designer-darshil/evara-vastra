// ==========================================================
// UNIVERSAL PAYMENT PROVIDER ABSTRACTION
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
    customer: CustomerBillingDetails;
    items: PaymentItem[];
    paymentMethod?: string;
  }): Promise<PaymentIntent>;
  verifyPayment(request: PaymentVerificationRequest): Promise<PaymentResult>;
}

export class FastrrPaymentProviderAdapter implements PaymentProvider {
  public readonly name = "Shiprocket fastrr Checkout";

  public getConfig(): PaymentProviderConfig {
    return FastrrCheckoutClient.getConfig();
  }

  public async createPaymentIntent(params: {
    orderId: string;
    amount: number;
    currency?: string;
    customer: CustomerBillingDetails;
    items: PaymentItem[];
    paymentMethod?: string;
  }): Promise<PaymentIntent> {
    return FastrrCheckoutClient.createPaymentIntent(params);
  }

  public async verifyPayment(request: PaymentVerificationRequest): Promise<PaymentResult> {
    return FastrrCheckoutClient.verifyPayment(request);
  }
}

// Canonical singleton export
export const paymentProvider: PaymentProvider = new FastrrPaymentProviderAdapter();
