export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/adminsumanth', '/api/'],
      },
    ],
    sitemap: 'https://www.sumanthminerals.com/sitemap.xml',
  }
}
