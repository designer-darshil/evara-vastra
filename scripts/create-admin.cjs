#!/usr/bin/env node

/**
 * ==========================================================
 * EVARA VASTRA — SECURE INITIAL ADMIN ACCOUNT CREATION CLI
 * ==========================================================
 * Usage: npm run admin:create
 * Generates a PBKDF2 salted password hash for production deployment.
 */

const readline = require("readline");
const crypto = require("crypto");

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

console.log("\n==================================================");
console.log("EVARA VASTRA — SECURE ADMIN CREATION SUITE");
console.log("==================================================\n");

rl.question("Enter Admin Full Name: ", (name) => {
  if (!name.trim()) {
    console.error("Error: Admin name cannot be empty.");
    rl.close();
    process.exit(1);
  }

  rl.question("Enter Admin Email Address: ", (email) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      console.error("Error: Please provide a valid email address.");
      rl.close();
      process.exit(1);
    }

    rl.question("Enter Admin Secure Password (min 12 characters): ", (password) => {
      if (!password || password.length < 12) {
        console.error("Error: Password must be at least 12 characters long.");
        rl.close();
        process.exit(1);
      }

      const salt = generateSalt();
      const passwordHash = hashPassword(password, salt);

      console.log("\n✓ Administrator Account Hash Generated Successfully!");
      console.log("--------------------------------------------------");
      console.log(`Name:          ${name.trim()}`);
      console.log(`Email:         ${cleanEmail}`);
      console.log(`Role:          superadmin`);
      console.log(`Password Hash: ${passwordHash}`);
      console.log("--------------------------------------------------");
      console.log("NOTE: Plaintext password is NEVER stored in the repository or database.\n");

      rl.close();
    });
  });
});
