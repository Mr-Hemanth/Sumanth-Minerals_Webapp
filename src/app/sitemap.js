import { SITE_URL } from '@/lib/seo';
import { SITE_ROUTES } from '@/data/siteRoutes';

// sitemap.xml for search engines. The page list, dates and photos live in
// src/data/siteRoutes.js; edit them there, not here.
export default function sitemap() {
  return SITE_ROUTES.map(({ path, updated, priority, changeFrequency = 'monthly', images }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated,
    changeFrequency,
    priority,
    ...(images ? { images: images.map((file) => `${SITE_URL}/${file}`) } : {}),
  }));
}
