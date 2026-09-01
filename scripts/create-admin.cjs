#!/usr/bin/env node

/**
 * ==========================================================
 * EVARA VASTRA — SECURE INITIAL ADMIN ACCOUNT CREATION CLI
 * ==========================================================
 * Usage: npm run admin:create
 * Generates a PBKDF2 salted password hash and registers the account.
 */

const readline = require("readline");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const INITIAL_DATA_PATH = path.join(__dirname, "../src/data/initialData.ts");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  const iterations = 100000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");
  return `pbkdf2$${iterations}$${salt}$${hash.toString("hex")}`;
}

function validateComplexity(password) {
  if (!password || password.length < 12) {
    return { isValid: false, error: "Password must be at least 12 characters long." };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one uppercase letter (A-Z)." };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one lowercase letter (a-z)." };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one number (0-9)." };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one special symbol." };
  }
  return { isValid: true };
}

console.log("\n==================================================");
console.log("EVARA VASTRA — SECURE ADMIN ACCOUNT CREATION");
console.log("==================================================\n");

rl.question("Enter Admin Email Address: ", (email) => {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    console.error("Error: Please provide a valid email address.");
    rl.close();
    process.exit(1);
  }

  // Check if account already exists in initialData.ts
  const initialDataContent = fs.readFileSync(INITIAL_DATA_PATH, "utf8");
  if (initialDataContent.includes(`"${cleanEmail}"`)) {
    console.error(`\nAccount with email '${cleanEmail}' already exists in the system.`);
    console.error("To reset the password for this account, run:\n");
    console.error("  npm run admin:reset-password\n");
    rl.close();
    process.exit(1);
  }

  rl.question("Enter Admin Full Name: ", (name) => {
    const cleanName = name.trim();
    if (!cleanName) {
      console.error("Error: Admin name cannot be empty.");
      rl.close();
      process.exit(1);
    }

    rl.question("Enter Admin Role (superadmin / admin / order_manager / content_manager) [superadmin]: ", (roleInput) => {
      const role = roleInput.trim().toLowerCase() || "superadmin";

      rl.question("Enter Admin Secure Password (min 12 chars, upper/lower/num/special): ", (password) => {
        const validation = validateComplexity(password);
        if (!validation.isValid) {
          console.error(`\nError: ${validation.error}`);
          rl.close();
          process.exit(1);
        }

        const salt = generateSalt();
        const passwordHash = hashPassword(password, salt);
        const now = new Date().toISOString().split("T")[0];
        const nowIso = new Date().toISOString();

        const newUserBlock = `  {
    id: "admin-${Date.now()}",
    email: "${cleanEmail}",
    passwordHash: "${passwordHash}",
    name: "${cleanName}",
    role: "${role}",
    phone: "+91 98000 00000",
    isActive: true,
    lastLogin: "Never",
    lastLoginAt: "${nowIso}",
    createdAt: "${now}",
  },`;

        // Insert before initialAdminUsers closing bracket
        const updatedContent = initialDataContent.replace(
          /export const initialAdminUsers: AdminUser\[\] = \[/,
          `export const initialAdminUsers: AdminUser[] = [\n${newUserBlock}`
        );

        fs.writeFileSync(INITIAL_DATA_PATH, updatedContent, "utf8");

        console.log("\n✓ Administrator Account Created and Registered Successfully!");
        console.log("--------------------------------------------------");
        console.log(`Name:        ${cleanName}`);
        console.log(`Email:       ${cleanEmail}`);
        console.log(`Role:        ${role}`);
        console.log(`Status:      Active`);
        console.log("--------------------------------------------------");
        console.log("Security Note: Plaintext passwords are NEVER logged or stored.\n");

        rl.close();
      });
    });
  });
});
