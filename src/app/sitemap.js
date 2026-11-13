export default function sitemap() {
  const baseUrl = 'https://sumanthminerals.com';
  
  const routes = [
    '',
    '/about',
    '/products',
    '/quality',
    '/export',
    '/gallery',
    '/blog',
    '/contact',
    '/sustainability',
    '/faq',
    '/case-studies',
    '/downloads',
    '/news',
    '/careers',
    '/privacy',
    '/terms',
    '/request-sample',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
