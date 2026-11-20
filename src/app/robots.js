import { SITE_URL } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Private areas: the admin dashboard, API endpoints and buyers' personal tracking links.
        disallow: ['/adminsumanth', '/api/', '/track/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
