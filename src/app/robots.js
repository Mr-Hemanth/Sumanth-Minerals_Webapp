export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/adminsumanth', '/api/'],
      },
    ],
    sitemap: 'https://sumanthminerals.com/sitemap.xml',
  }
}
