import './globals.css';
import { Inter, Outfit } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import MobileActionBar from '@/components/MobileActionBar';
import PageTransition from '@/components/PageTransition';
import { SITE_URL, organizationJsonLd, JsonLd } from '@/lib/seo';

const HOME_TITLE = 'Quartz Lumps & Quartz Grit Supplier India | Sumanth Minerals';
const HOME_DESC = 'B-Grade & M-Grade quartz lumps and grit (0–12, 12–30, 30–80 mm), direct from our Anantapur mine. Lab-tested, bulk supply, transport available if required.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: '%s | Sumanth Minerals' },
  description: HOME_DESC,
  applicationName: 'Sumanth Minerals',
  keywords: ['quartz supplier India', 'quartz lumps supplier', 'quartz grit supplier', 'silica quartz', 'vein quartz', 'quartz for ferro silicon', 'quartz for glass', 'quartz for ceramics', 'quartz for refractories', 'quartz mine Andhra Pradesh', 'quartz Anantapur', 'high purity quartz exporter India', '99% SiO2 quartz'],
  authors: [{ name: 'Sumanth Minerals', url: SITE_URL }],
  creator: 'Sumanth Minerals',
  publisher: 'Sumanth Minerals',
  category: 'Industrial minerals',
  formatDetection: { telephone: true, email: true, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Paste the code from Google Search Console / Bing Webmaster Tools into these env vars on Vercel.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESC,
    url: SITE_URL,
    siteName: 'Sumanth Minerals',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: HOME_TITLE, description: HOME_DESC },
};

// viewportFit 'cover' lets the layout use env(safe-area-inset-*) around iPhone notches
// and the home indicator; themeColor tints the mobile browser bar in the brand navy.
// Pinch-zoom stays enabled for accessibility.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#003366',
};

import { LanguageProvider } from '@/context/LanguageContext';
import HideOnAdmin from '@/components/HideOnAdmin';
import MotionProvider from '@/components/MotionProvider';
import Spotlight from '@/components/Spotlight';

// Self-hosted at build time: no request to Google, preloaded, and size-adjusted
// fallbacks so text does not jump when the web font arrives.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const outfit = Outfit({ subsets: ['latin'], display: 'swap', variable: '--font-display' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <LanguageProvider>
          <MotionProvider>
          <Spotlight />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <HideOnAdmin><Navbar /></HideOnAdmin>
          <PageTransition>
            <main id="main-content" tabIndex={-1}>{children}</main>
          </PageTransition>
          <HideOnAdmin>
            <Footer />
            {/* Floating buttons sit in a landmark so screen-reader users can find them (axe "region"). */}
            <aside aria-label="Quick actions">
              <WhatsAppButton />
              <BackToTop />
            </aside>
            <MobileActionBar />
          </HideOnAdmin>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
