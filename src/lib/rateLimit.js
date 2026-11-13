// Simple in-memory sliding-window limiter. Good enough for a single server;
// on serverless (Vercel) each instance has its own memory, so treat this as
// a speed bump — add Cloudflare Turnstile or Upstash for stronger protection.
const hits = new Map();

export function rateLimit(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // prevent unbounded growth
  return true;
}

export function clientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
