# Shiprocket Shipping & Logistics Integration Guide

**Brand**: EVARA VASTRA  
**Document Version**: 1.0.0 (Production Architecture)  
**Primary Hub**: Surat Atelier Dispatch Warehouse (`395002`)  

---

## 1. Executive Summary & Architecture

The Evara Vastra e-commerce application uses **Shiprocket** as its carrier-agnostic shipping and logistics engine. The architecture adheres to strict security, fault isolation, and modularity principles:

```
┌────────────────────────────────────────────────────────┐
│                   Customer Checkout                    │
│    (Pincode check → Debounced Serviceability → Order)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              ShippingProvider Abstraction              │
│       (src/lib/shiprocket/provider.ts interface)       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│            Shiprocket API Client & Adapter             │
│        (src/lib/shiprocket/client.ts & auth.ts)        │
│  - Server-only credentials & Bearer Token caching     │
│  - 240-hour token lifecycle management                 │
│  - Transparent sandbox simulation in development       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│            Official Shiprocket REST API v2             │
│   (https://apiv2.shiprocket.in/v1/external)           │
│   - /auth/login                                        │
│   - /courier/serviceability                            │
│   - /orders/create/adhoc                               │
│   - /courier/assign/awb                                │
│   - /courier/generate/pickup                           │
│   - /courier/track/awb/:awb                            │
│   - /orders/cancel                                     │
└────────────────────────────────────────────────────────┘
```

---

## 2. Environment Variables & Security Isolation

All Shiprocket API credentials and auth tokens are **strictly server-side**. They must never be prefixed with `VITE_` or `NEXT_PUBLIC_` or bundled into client code.

```bash
# Shiprocket Server Credentials (.env)
SHIPROCKET_EMAIL=operations@evaravastra.com
SHIPROCKET_PASSWORD=your_secure_shiprocket_api_password
SHIPROCKET_BASE_URL=https://apiv2.shiprocket.in/v1/external
SHIPROCKET_WEBHOOK_TOKEN=your_secure_webhook_secret_token

# Evara Vastra Warehouse Origin
DEFAULT_PICKUP_LOCATION_NAME="Surat Atelier Primary"
DEFAULT_PICKUP_PINCODE=395002
```

> **Security Rule**: In local development or testing environments where live credentials are not present, the `ShiprocketClient` automatically activates its high-fidelity sandbox engine, enabling complete order flows, AWB generation, and tracking simulations without crashing or making unauthenticated network calls.

---

## 3. Implemented API Endpoints & Workflows

| Operation | Official Shiprocket Endpoint | Method | Responsibility in Evara Vastra |
|---|---|---|---|
| **Authentication** | `/auth/login` | `POST` | Exchanges email & password for JWT token valid for 240 hours. In-memory cached with auto-refresh. |
| **Courier Serviceability** | `/courier/serviceability` | `GET` | Verifies delivery feasibility, SLA delivery days, and carrier options (Blue Dart, Delhivery, Ecom Express). |
| **Order Creation** | `/orders/create/adhoc` | `POST` | Maps internal Evara orders to Shiprocket manifest with customer address, weight, dimensions, and items. |
| **AWB Assignment** | `/courier/assign/awb` | `POST` | Allocates carrier and generates unique AWB waybill number. |
| **Pickup Generation** | `/courier/generate/pickup` | `POST` | Schedules carrier dispatch vehicle for Surat Atelier warehouse collection. |
| **Real-time Tracking** | `/courier/track/awb/:awb` | `GET` | Fetches live carrier scanning activities and normalizes status into internal `ShipmentStatus` enum. |
| **Shipment Cancellation** | `/orders/cancel` | `POST` | Cancels courier dispatch while keeping customer order history intact. |
| **Webhooks** | `/api/webhooks/shiprocket` | `POST` | Ingests real-time carrier status webhooks with HMAC signature validation. |

---

## 4. Internal Shipment Lifecycle & State Machine

```
NOT_CREATED 
   │
   ▼
CREATED (Order Manifest Registered)
   │
   ▼
AWB_ASSIGNED (Courier Allocated, AWB Waybill Generated)
   │
   ▼
PICKUP_REQUESTED (Atelier Collection Vehicle Scheduled)
   │
   ▼
IN_TRANSIT (Carrier Linehaul / Air Sorting Hubs)
   │
   ▼
OUT_FOR_DELIVERY (Last-Mile Delivery Executive Dispatched)
   │
   ▼
DELIVERED (Successfully Handed Over to Patron)

[Exceptions]:
- CANCELLED: Admin/Patron cancellation
- RTO: Return to Origin (Customer unreachable or rejected)
- FAILED: Courier delivery exception
```

---

## 5. Admin Control Center (`/admin/shipments`)

The Atelier administration suite includes complete shipment management:
- **KPI Metrics Dashboard**: Overview of Total Shipments, Active in Transit, Pending Pickups, Delivered, and Exceptions.
- **Search & Filtering**: Instant filter by status (`CREATED`, `AWB_ASSIGNED`, `IN_TRANSIT`, `DELIVERED`), courier, or customer.
- **One-Click Actions**:
  - **Assign AWB**: Allocates optimal courier (Blue Dart Air / Delhivery) and generates AWB.
  - **Request Pickup**: Schedules vehicle collection at Surat warehouse.
  - **Sync Tracking**: Real-time status update from carrier API.
  - **Print Label**: Direct access to carrier shipping label PDF.
  - **Cancel Shipment**: Safe cancellation modal preventing accidental dispatches.
- **Warehouse & Rule Settings**: Accessible via **Admin → Settings → Section 5 (Shiprocket Logistics & Warehouse)**.

---

## 6. Checkout & Customer Experience

- **Debounced Pincode Check**: Validates Indian PIN codes with 400ms debounce to prevent API thrashing.
- **SLA Delivery Estimate**: Shows realistic express delivery windows (e.g. *2–3 business days via Blue Dart Express Air*).
- **Complimentary Shipping**: Configured with free pan-India shipping for Evara Vastra patrons.
- **Customer Tracking Hub**: `OrdersPage` provides live timeline progress cards with carrier name and AWB tracking numbers.

---

## 7. Production Deployment Checklist

Before enabling live Shiprocket production traffic:
1. **API User**: Create a dedicated API user under your Shiprocket Company Profile with appropriate permissions.
2. **Warehouse Verification**: Verify that the Surat Atelier pickup address (`395002`) is verified in the Shiprocket dashboard under **Settings → Pickup Locations**.
3. **Environment Setup**: Add `SHIPROCKET_EMAIL` and `SHIPROCKET_PASSWORD` into production environment variables (e.g. Vercel, AWS Secrets Manager).
4. **Webhook Setup**: Configure the Shiprocket Webhook URL pointing to `https://evaravastra.com/api/webhooks/shiprocket` with your secret webhook token.
5. **Initial Test**: Place a live test order, verify AWB assignment on the Admin Shipments dashboard, download the shipping label, and confirm tracking events.
