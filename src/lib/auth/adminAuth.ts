// ==========================================================
// EVARA VASTRA — ADMIN AUTHENTICATION & RATE LIMITING
// ==========================================================

export interface LoginAttemptRecord {
  email: string;
  attempts: number;
  lastAttemptAt: number;
  lockedUntil: number | null;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

// In-memory rate limiting tracker
const attemptStore = new Map<string, LoginAttemptRecord>();

export class AdminAuthRateLimiter {
  /**
   * Checks if an email is currently locked out from login attempts.
   */
  public static checkLockout(email: string): { isLocked: boolean; remainingMinutes: number } {
    const key = email.toLowerCase().trim();
    const record = attemptStore.get(key);

    if (!record || !record.lockedUntil) {
      return { isLocked: false, remainingMinutes: 0 };
    }

    const now = Date.now();
    if (now < record.lockedUntil) {
      const remainingMs = record.lockedUntil - now;
      const remainingMinutes = Math.ceil(remainingMs / 60000);
      return { isLocked: true, remainingMinutes };
    }

    // Lockout expired, reset attempt count
    attemptStore.delete(key);
    return { isLocked: false, remainingMinutes: 0 };
  }

  /**
   * Records a failed login attempt for an email.
   */
  public static recordFailedAttempt(email: string): { isNowLocked: boolean; remainingAttempts: number } {
    const key = email.toLowerCase().trim();
    const now = Date.now();
    const existing = attemptStore.get(key) || {
      email: key,
      attempts: 0,
      lastAttemptAt: now,
      lockedUntil: null,
    };

    existing.attempts += 1;
    existing.lastAttemptAt = now;

    if (existing.attempts >= MAX_FAILED_ATTEMPTS) {
      existing.lockedUntil = now + LOCKOUT_DURATION_MS;
      attemptStore.set(key, existing);
      return { isNowLocked: true, remainingAttempts: 0 };
    }

    attemptStore.set(key, existing);
    return { isNowLocked: false, remainingAttempts: MAX_FAILED_ATTEMPTS - existing.attempts };
  }

  /**
   * Clears failed attempt tracking upon successful authentication.
   */
  public static clearAttempts(email: string): void {
    attemptStore.delete(email.toLowerCase().trim());
  }
}
