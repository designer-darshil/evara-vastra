// ==========================================================
// SHIPROCKET INTEGRATION — ERROR CLASSES
// ==========================================================

export class ShiprocketError extends Error {
  public statusCode?: number;
  public details?: any;

  constructor(message: string, statusCode?: number, details?: any) {
    super(message);
    this.name = "ShiprocketError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ShiprocketAuthError extends ShiprocketError {
  constructor(message: string = "Failed to authenticate with Shiprocket API", details?: any) {
    super(message, 401, details);
    this.name = "ShiprocketAuthError";
  }
}

export class ShiprocketServiceabilityError extends ShiprocketError {
  constructor(message: string = "Destination pincode is not serviceable by Shiprocket", details?: any) {
    super(message, 400, details);
    this.name = "ShiprocketServiceabilityError";
  }
}

export class ShiprocketOrderError extends ShiprocketError {
  constructor(message: string = "Failed to create or update Shiprocket order", details?: any) {
    super(message, 422, details);
    this.name = "ShiprocketOrderError";
  }
}

export class ShiprocketRateLimitError extends ShiprocketError {
  constructor(message: string = "Shiprocket API rate limit exceeded", details?: any) {
    super(message, 429, details);
    this.name = "ShiprocketRateLimitError";
  }
}

export class ShiprocketWebhookError extends ShiprocketError {
  constructor(message: string = "Invalid Shiprocket webhook signature or payload", details?: any) {
    super(message, 400, details);
    this.name = "ShiprocketWebhookError";
  }
}
