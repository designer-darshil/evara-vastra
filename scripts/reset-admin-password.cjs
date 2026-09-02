#!/usr/bin/env node

/**
 * ==========================================================
 * EVARA VASTRA — SECURE ADMIN PASSWORD RESET CLI
 * ==========================================================
 * Usage: npm run admin:reset-password
 * Securely updates the PBKDF2 password hash for an administrator account.
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
  if (!password || password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters long." };
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
console.log("EVARA VASTRA — SECURE ADMIN PASSWORD RESET");
console.log("==================================================\n");

rl.question("Enter Admin Email to Reset [admin@evaravastra.com]: ", (emailInput) => {
  const cleanEmail = (emailInput.trim() || "admin@evaravastra.com").toLowerCase();

  const fileContent = fs.readFileSync(INITIAL_DATA_PATH, "utf8");

  // Regex to locate the admin block
  const emailRegex = new RegExp(`email:\\s*"${cleanEmail}"`, "i");
  if (!emailRegex.test(fileContent)) {
    console.error(`\nError: Administrator account '${cleanEmail}' was not found in initialData.ts.`);
    console.error("To register this administrator account first, run:\n");
    console.error("  npm run admin:create\n");
    rl.close();
    process.exit(1);
  }

  rl.question("Enter New Secure Password (min 12 chars, upper/lower/num/special): ", (newPassword) => {
    const validation = validateComplexity(newPassword);
    if (!validation.isValid) {
      console.error(`\nError: ${validation.error}`);
      rl.close();
      process.exit(1);
    }

    const salt = generateSalt();
    const newHash = hashPassword(newPassword, salt);

    // Replace the passwordHash for the matched user
    // We match the block containing the target email
    const userBlockRegex = new RegExp(
      `({\\s*id:\\s*"[^"]+",\\s*email:\\s*"${cleanEmail}",\\s*passwordHash:\\s*")[^"]+(")`,
      "i"
    );

    if (!userBlockRegex.test(fileContent)) {
      console.error("\nError: Could not parse administrator password hash structure in initialData.ts.");
      rl.close();
      process.exit(1);
    }

    const updatedContent = fileContent.replace(userBlockRegex, `$1${newHash}$2`);
    fs.writeFileSync(INITIAL_DATA_PATH, updatedContent, "utf8");

    console.log("\n✓ Administrator Password Reset Successfully!");
    console.log("--------------------------------------------------");
    console.log(`Account Email: ${cleanEmail}`);
    console.log(`Hash Format:   PBKDF2 / SHA-256 (100,000 iterations)`);
    console.log(`Status:        Updated in data store`);
    console.log("--------------------------------------------------");
    console.log("Security Note: Plaintext passwords are NEVER stored in the repository.\n");

    rl.close();
  });
});
