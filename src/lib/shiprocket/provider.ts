// ==========================================================
// SHIPPING PROVIDER ABSTRACTION & SHIPROCKET ADAPTER
// ==========================================================

import {
  Shipment,
  ShippingEstimate,
} from "./types";
import { checkCourierServiceability } from "./serviceability";
import { createShiprocketOrder, OrderCreationInput } from "./orders";
import {
  generateShipmentAWB,
  requestShipmentPickup,
  cancelShipmentOrder,
} from "./shipments";
import { trackShipmentAWB, syncShipmentTracking } from "./tracking";
import { getShiprocketCredentials } from "./auth";

/**
 * Universal Shipping Provider Interface
 */
export interface ShippingProvider {
  name: string;
  isConfigured: boolean;
  checkServiceability(params: {
    pickupPincode?: string;
    deliveryPincode: string;
    weightKg?: number;
    cod?: boolean;
    orderValue?: number;
  }): Promise<ShippingEstimate>;
  createShipmentOrder(input: OrderCreationInput): Promise<Shipment>;
  assignCourierAndGenerateAWB(shipment: Shipment, preferredCourierId?: number): Promise<Shipment>;
  requestPickup(shipment: Shipment): Promise<Shipment>;
  cancelShipment(shipment: Shipment): Promise<Shipment>;
  trackShipment(awb: string): Promise<any>;
  syncTracking(shipment: Shipment): Promise<Shipment>;
}

/**
 * Shiprocket Implementation of ShippingProvider
 */
export class ShiprocketShippingProvider implements ShippingProvider {
  public name = "Shiprocket Logistics";

  public get isConfigured(): boolean {
    return getShiprocketCredentials().isConfigured;
  }

  public async checkServiceability(params: {
    pickupPincode?: string;
    deliveryPincode: string;
    weightKg?: number;
    cod?: boolean;
    orderValue?: number;
  }): Promise<ShippingEstimate> {
    return checkCourierServiceability(params);
  }

  public async createShipmentOrder(input: OrderCreationInput): Promise<Shipment> {
    return createShiprocketOrder(input);
  }

  public async assignCourierAndGenerateAWB(
    shipment: Shipment,
    preferredCourierId?: number
  ): Promise<Shipment> {
    return generateShipmentAWB(shipment, preferredCourierId);
  }

  public async requestPickup(shipment: Shipment): Promise<Shipment> {
    return requestShipmentPickup(shipment);
  }

  public async cancelShipment(shipment: Shipment): Promise<Shipment> {
    return cancelShipmentOrder(shipment);
  }

  public async trackShipment(awb: string): Promise<any> {
    return trackShipmentAWB(awb);
  }

  public async syncTracking(shipment: Shipment): Promise<Shipment> {
    return syncShipmentTracking(shipment);
  }
}

// Canonical singleton shipping provider instance
export const shippingProvider: ShippingProvider = new ShiprocketShippingProvider();
