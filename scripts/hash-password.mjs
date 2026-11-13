// Usage: node scripts/hash-password.mjs "your-strong-password"
// Paste the printed line into .env.local
import { scryptSync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Usage: node scripts/hash-password.mjs "password-of-at-least-10-chars"');
  process.exit(1);
}
const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
