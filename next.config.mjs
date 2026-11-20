import path from "node:path";
import { fileURLToPath } from "node:url";

// Security headers for every response. The CSP only allows this site's own scripts,
// styles, fonts and images, plus the Google Maps embed on the contact page.
// 'unsafe-inline' is needed for Next's inline bootstrap scripts on statically
// generated pages (nonces would force every page to render per request).
const isProd = process.env.NODE_ENV === "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isProd ? "" : " ws: wss:"}`,
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.0.104"],
  poweredByHeader: false, // don't advertise the framework/version

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Admin and buyer-tracking pages must never appear in search results.
      {
        source: "/(adminsumanth|track)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  images: {
    // AVIF is ~30-50% smaller than WebP for photos; browsers without AVIF get WebP.
    formats: ['image/avif', 'image/webp'],
    // 50 for the hero (sits under an ~85% dark overlay), 75 default for everything else.
    qualities: [50, 60, 75],
    // Product/mine photos rarely change: keep optimised copies for 31 days.
    minimumCacheTTL: 2678400,
  },

  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },

  // Pages hidden for launch until they have real content. Temporary (307)
  // redirects so search engines don't cache them; delete a line to bring a page back.
  async redirects() {
    return ["/case-studies", "/news", "/careers", "/sustainability", "/blog"].map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;