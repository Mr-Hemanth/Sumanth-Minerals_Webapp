import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.0.104"],

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