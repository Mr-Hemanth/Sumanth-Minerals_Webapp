import { SITE_URL } from '@/lib/seo';

// Bump when page content changes meaningfully; a fixed date is more honest to
// search engines than "now" on every deploy.
const UPDATED = '2026-11-20';
const img = (file) => `${SITE_URL}/${file}`;

const ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly', images: ['hero-stockpile.jpg', 'quartz_lumps.jpg'] },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly', images: ['quartz_lumps.jpg', 'quartz_0_12.jpg', 'quartz_12_30.jpg', 'quartz_30_80.jpg'] },
  { path: '/quality', priority: 0.9, changeFrequency: 'monthly', images: ['lab-certificate.png'] },
  { path: '/request-sample', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly', images: ['mine-site-hillside-v3.jpg'] },
  { path: '/export', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly', images: ['mine-site-hillside-v3.jpg', 'mine-site-bench.jpg', 'quartz_lumps.jpg', 'quartz_0_12.jpg', 'quartz_12_30.jpg', 'quartz_30_80.jpg'] },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/downloads', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap() {
  return ROUTES.map(({ path, priority, changeFrequency, images }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: UPDATED,
    changeFrequency,
    priority,
    ...(images ? { images: images.map(img) } : {}),
  }));
}
