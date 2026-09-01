// ==========================================================
// EVARA VASTRA — SECURE PASSWORD HASHING & VALIDATION
// ==========================================================

/**
 * Modern salted cryptographic hash using PBKDF2 / SHA-256 via Web Crypto API.
 * Produces format: pbkdf2$100000$hexSalt$hexHash
 */
export async function hashPassword(password: string, customSalt?: string): Promise<string> {
  const salt = customSalt || generateSalt();
  const iterations = 100000;

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  const hexHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return `pbkdf2$${iterations}$${salt}$${hexHash}`;
}

/**
 * Verifies a plaintext password against a stored PBKDF2 salted hash.
 * Timing-safe string comparison to mitigate timing attacks.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash || !password) return false;

  const parts = storedHash.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") {
    // Fallback comparison for legacy test hash
    return false;
  }

  const salt = parts[2];
  const expectedHexHash = parts[3];

  const computedFullHash = await hashPassword(password, salt);
  const computedHexHash = computedFullHash.split("$")[3];

  return timingSafeEqual(computedHexHash, expectedHexHash);
}

/**
 * Generates a cryptographically secure 16-byte random salt.
 */
function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Constant-time comparison between two strings.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Authoritative password complexity validation:
 * - Minimum 12 characters
 * - Uppercase letter
 * - Lowercase letter
 * - Number
 * - Special character
 */
export function validatePasswordStrength(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (!password || password.length < 12) {
    errors.push("Password must be at least 12 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter (A-Z).");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter (a-z).");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number (0-9).");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must include at least one special character (e.g. !@#$%^&*).");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
