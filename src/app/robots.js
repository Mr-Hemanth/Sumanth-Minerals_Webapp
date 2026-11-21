import { SITE_URL } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // API endpoints and buyers' personal tracking links. The admin area is deliberately
        // NOT listed: robots.txt is public, so listing it would advertise the path. It is kept
        // out of search by login + noindex meta + X-Robots-Tag header (next.config.mjs).
        disallow: ['/api/', '/track/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
