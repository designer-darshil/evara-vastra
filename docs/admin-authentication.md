# Admin Authentication Architecture & Security

**Brand**: EVARA VASTRA  
**Document Version**: 1.0.0 (Production Security Architecture)  

---

## 1. Executive Summary

This document describes the administrative authentication architecture, password hashing mechanism, rate limiting, and password management systems for the Evara Vastra administrative suite.

---

## 2. Security Principles

1. **No Automatic Authentication**: The admin suite (`/admin` and all `/admin/*` sub-routes) strictly requires an explicit, manual sign-in action.
2. **Zero Plaintext Passwords**: Plaintext passwords are never stored in databases, source code, client state, or logs.
3. **Cryptographic Salting & Hashing**: All passwords use PBKDF2 with 100,000 iterations and 16-byte random salts.
4. **Empty Initial Inputs**: Login form fields (`email`, `password`) always initialize completely empty with no pre-fills or demo auto-fill buttons.
5. **Brute-Force Rate Limiting**: Consecutive failed attempts (5 max) result in an automated 15-minute lockout.
6. **Generic Error Responses**: Generic messages (`"Invalid email or password."`) prevent user enumeration.

---

## 3. Authentication Architecture & Flow

```
1. User visits /admin (or any /admin/* route)
2. Route Guard checks isAuthenticated state:
   - If authenticated → Renders requested Admin Module
   - If not authenticated → Redirects to /admin/login?redirect=/admin/...
3. Admin submits credentials on /admin/login
4. Rate Limiter verifies account is not locked out
5. Verification compares password against PBKDF2 salted hash (timing-safe)
6. On success:
   - Rate limiter attempts cleared
   - Admin session initialized
   - Audit trail logged (ADMIN_LOGIN)
   - User redirected back to original destination
```

---

## 4. Password Management (`/admin/settings/security`)

Store administrators can update their security credentials:
- **Current Password Verification**: Required before changing to a new password.
- **Strength Requirements**: Minimum 12 characters, uppercase letter, lowercase letter, number, and special character.
- **Identical Password Rejection**: Rejects new passwords identical to current.
- **Session Termination on Change**: Changing a password immediately invalidates existing sessions and requires re-authentication.

---

## 5. Initial Admin Account Setup CLI

To securely provision initial administrator accounts without hardcoding credentials in Git:

```bash
npm run admin:create
```

This interactive CLI script:
1. Prompts for Administrator Name, Email, and Password.
2. Validates password complexity.
3. Generates a secure PBKDF2 salted hash string (`pbkdf2$100000$salt$hash`).
4. Outputs the hash for deployment without storing the plaintext password.

---

## 6. Route & Module Protection

| Route | Protection Level | Access Scope |
|---|---|---|
| `/admin/login` | Public (Rate-Limited) | Unauthenticated |
| `/admin` | Authenticated | Dashboard Scope |
| `/admin/products/*` | Authenticated + RBAC | `products` module permission |
| `/admin/orders/*` | Authenticated + RBAC | `orders` module permission |
| `/admin/settings/security` | Authenticated | All active administrators |
| `/admin/users` | Authenticated + RBAC | `superadmin` only |
| `/admin/audit-logs` | Authenticated + RBAC | `superadmin` / `audit_logs` |
