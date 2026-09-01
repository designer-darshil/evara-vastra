# Shiprocket fastrr Checkout & Payment Integration

**Brand**: EVARA VASTRA  
**Document Version**: 1.0.0 (Production Architecture)  

---

## 1. Executive Summary

Evara Vastra uses **fastrr Checkout** (Shiprocket's official headless/standard checkout and payment engine) as the customer-facing payment layer.

---

## 2. Architecture & Provider Abstraction

All payment processing logic is decoupled into a universal provider abstraction:

```
src/
  lib/
    payment/
      types.ts           # PaymentIntent, PaymentResult, CustomerBillingDetails
      fastrrCheckout.ts  # FastrrCheckoutClient (API requests, test sandbox simulation)
      provider.ts        # PaymentProvider interface & FastrrPaymentProviderAdapter
      webhook.ts         # Fastrr payment webhook verification & event processing
      index.ts           # Barrel export
```

---

## 3. Customer Checkout Flow

```
1. Customer reviews Cart & clicks "Proceed to Checkout"
2. CheckoutPage validates Contact Information & Shipping Address (with complimentary delivery)
3. Customer clicks primary action: "Pay with fastrr (₹...)"
4. FastrrCheckoutClient initiates a Payment Intent with cart items & customer details
5. fastrr Checkout modal displays instant payment options:
   - Instant UPI (GPay, PhonePe, Paytm, BHIM)
   - Credit & Debit Cards (3D Secure 2.0)
   - Net Banking (50+ Indian Banks)
   - Cash on Delivery (if enabled in Admin Settings)
6. Transaction is authorized & verified server-side
7. Verified Order is stored in DataContext and customer is presented with order receipt & tracking reference
```

---

## 4. Environment & Credentials Configuration

The following server-only environment variables are defined in `.env.example`:

| Variable | Description | Environment |
|---|---|---|
| `FASTRR_APP_ID` | Fastrr Merchant Application ID | Server-side only |
| `FASTRR_AUTH_TOKEN` | Fastrr Secret Authentication Token | Server-side only |
| `FASTRR_WEBHOOK_SECRET` | HMAC Webhook verification secret | Server-side only |
| `PAYMENT_ENV` | `test` for sandbox simulation, `production` for live gateway | Server-side only |

---

## 5. Webhook Handling

Fastrr webhook events supported:
- `order.paid` / `payment.success`: Marks order as verified and paid.
- `payment.failed`: Records payment failure and permits patron retry.
- `order.cancelled`: Cleans up pending payment intent without creating duplicate orders.
