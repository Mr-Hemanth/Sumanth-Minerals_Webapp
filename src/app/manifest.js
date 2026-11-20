// Web app manifest: lets phones "Add to Home Screen" with the right name, icon and colours.
export default function manifest() {
  return {
    name: 'Sumanth Minerals – Quartz Supplier',
    short_name: 'Sumanth Minerals',
    description: 'Mine-owner supplier of 99.27% SiO₂ quartz lumps and quartz grit from Andhra Pradesh, India.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#003366',
    categories: ['business', 'shopping'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
