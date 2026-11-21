import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

// Format stored in ADMIN_PASSWORD_HASH: "<salt-hex>:<hash-hex>"
// Generate one with:  node scripts/hash-password.mjs  (asks for the password, hidden)

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  if (!password || !stored || !stored.includes(":")) return false;
  const [salt, hashHex] = stored.split(":");
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
