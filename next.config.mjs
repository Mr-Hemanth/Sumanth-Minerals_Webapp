import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.0.104"],

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