// SINGLE SOURCE OF TRUTH for the public pages of the site.
// Used by app/sitemap.js (sitemap.xml for search engines) and app/site-map (the
// page people see), so the two can never disagree.
//
// When you add a page: add it here. When you change a page's content: update its
// `updated` date. Google trusts lastmod only when it is accurate, so a real
// per-page date is worth more than one date bumped on every deploy.
// Admin, tracking and API routes are deliberately left out.

export const SITE_SECTIONS = [
  {
    title: 'Company',
    routes: [
      {
        path: '',
        name: 'Home',
        summary: 'Quartz lumps and grit, 99.27% SiO₂, direct from our Andhra Pradesh mine.',
        updated: '2026-11-21',
        priority: 1,
        changeFrequency: 'weekly',
        images: [
          'hero-stockpile.jpg',
          'mine-plant.jpg',
          'quartz_lumps.jpg',
        ],
      },
      {
        path: '/about',
        name: 'About Us',
        summary: 'Who we are, our Lakshupalli mine and how we work.',
        updated: '2026-11-21',
        priority: 0.7,
        images: ['mine-site-hillside-v3.jpg'],
      },
      {
        path: '/gallery',
        name: 'Gallery',
        summary: 'Photographs of the mine, our quartz grades and the lab report.',
        updated: '2026-11-21',
        priority: 0.6,
        images: [
          'mine-site-hillside-v3.jpg',
          'mine-site-bench.jpg',
          'quartz_lumps.jpg',
          'quartz_0_12.jpg',
          'quartz_12_30.jpg',
          'quartz_30_80.jpg',
          'lab-certificate.png',
        ],
      },
      { path: '/contact', name: 'Contact', summary: 'Phone, email, WhatsApp and our office and mine addresses.', updated: '2026-11-21', priority: 0.8 },
    ],
  },
  {
    title: 'Products',
    routes: [
      {
        path: '/products',
        name: 'All Quartz Grades',
        summary: 'Quartz lumps and quartz grit 0–12, 12–30 and 30–80 mm with full specifications.',
        updated: '2026-11-24',
        priority: 0.9,
        images: [
          'quartz_lumps.jpg',
          'quartz_0_12.jpg',
          'quartz_12_30.jpg',
          'quartz_30_80.jpg',
        ],
      },
      {
        path: '/quartz-lumps',
        name: 'Quartz Lumps',
        summary: 'Mine-direct quartz lumps for ferro-silicon, silicomanganese and refractories.',
        updated: '2026-11-24',
        priority: 0.9,
        images: ['quartz_lumps.jpg'],
      },
      {
        path: '/quartz-grit',
        name: 'Quartz Grit',
        summary: 'Screened quartz grit in 0–12, 12–30 and 30–80 mm for glass, ceramics and metallurgy.',
        updated: '2026-11-24',
        priority: 0.9,
        images: [
          'quartz_0_12.jpg',
          'quartz_12_30.jpg',
          'quartz_30_80.jpg',
        ],
      },
      {
        path: '/quality',
        name: 'Quality Control',
        summary: 'Independent lab analysis and how we check every lot.',
        updated: '2026-11-21',
        priority: 0.9,
        images: ['lab-certificate.png'],
      },
      { path: '/request-sample', name: 'Request a Sample', summary: 'Get a sample of any grade with its certificate of analysis.', updated: '2026-11-21', priority: 0.8 },
    ],
  },
  {
    title: 'Buyer resources',
    routes: [
      { path: '/export', name: 'Export & Logistics', summary: 'Container loads, ports, payment terms and delivery times.', updated: '2026-11-21', priority: 0.7 },
      { path: '/faq', name: 'FAQ', summary: 'Answers on quality, sizes, minimum order, payment and delivery.', updated: '2026-11-21', priority: 0.6 },
      {
        path: '/downloads',
        name: 'Technical Downloads',
        summary: 'Lab report and technical documents to download.',
        updated: '2026-11-21',
        priority: 0.6,
        images: ['lab-certificate.png'],
      },
    ],
  },
  {
    title: 'Legal',
    routes: [
      { path: '/privacy', name: 'Privacy Policy', summary: 'How we handle your enquiry data.', updated: '2026-11-20', priority: 0.2, changeFrequency: 'yearly' },
      { path: '/site-map', name: 'Sitemap', summary: 'Every page on this website.', updated: '2026-11-24', priority: 0.3, changeFrequency: 'monthly' },
      { path: '/terms', name: 'Terms of Use', summary: 'Terms for using this website.', updated: '2026-11-21', priority: 0.2, changeFrequency: 'yearly' },
    ],
  },
];

export const SITE_ROUTES = SITE_SECTIONS.flatMap((s) => s.routes);
