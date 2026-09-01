// ==========================================================
// SHIPROCKET INTEGRATION — AUTHENTICATION & TOKEN MANAGER
// ==========================================================

import { ShiprocketAuthResponse } from "./types";
import { ShiprocketAuthError } from "./errors";

interface CachedToken {
  token: string;
  expiresAt: number; // UNIX timestamp ms
}

let inMemoryTokenCache: CachedToken | null = null;

// Shiprocket tokens are valid for 240 hours (10 days). We refresh 6 hours prior to expiry.
const TOKEN_TTL_BUFFER_MS = 6 * 60 * 60 * 1000;
const DEFAULT_EXPIRY_MS = 240 * 60 * 60 * 1000;

export const getShiprocketCredentials = () => {
  const proc = typeof globalThis !== "undefined" ? (globalThis as any).process : undefined;
  const email = proc?.env?.SHIPROCKET_EMAIL || "";
  const password = proc?.env?.SHIPROCKET_PASSWORD || "";
  const baseUrl = proc?.env?.SHIPROCKET_BASE_URL || "https://apiv2.shiprocket.in/v1/external";

  return { email, password, baseUrl, isConfigured: Boolean(email && password) };
};

/**
 * Retrieves valid Shiprocket JWT Bearer Token.
 * Uses in-memory caching to avoid unnecessary repeated logins.
 */
export async function getShiprocketToken(forceRefresh = false): Promise<string> {
  const now = Date.now();

  // Return cached token if valid
  if (!forceRefresh && inMemoryTokenCache && inMemoryTokenCache.expiresAt > now + TOKEN_TTL_BUFFER_MS) {
    return inMemoryTokenCache.token;
  }

  const { email, password, baseUrl, isConfigured } = getShiprocketCredentials();

  // Fallback to sandbox simulation token if live credentials are not set in dev
  if (!isConfigured) {
    const mockToken = "simulated_sr_bearer_token_" + Date.now();
    inMemoryTokenCache = {
      token: mockToken,
      expiresAt: now + DEFAULT_EXPIRY_MS,
    };
    return mockToken;
  }

  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new ShiprocketAuthError(`Shiprocket login failed with HTTP ${response.status}`, {
        status: response.status,
        response: errorBody,
      });
    }

    const data: ShiprocketAuthResponse = await response.json();

    if (!data.token) {
      throw new ShiprocketAuthError("Shiprocket auth response missing bearer token", data);
    }

    inMemoryTokenCache = {
      token: data.token,
      expiresAt: now + DEFAULT_EXPIRY_MS,
    };

    return data.token;
  } catch (error: any) {
    if (error instanceof ShiprocketAuthError) throw error;
    throw new ShiprocketAuthError(error?.message || "Network failure connecting to Shiprocket auth");
  }
}

export function clearShiprocketTokenCache(): void {
  inMemoryTokenCache = null;
}
