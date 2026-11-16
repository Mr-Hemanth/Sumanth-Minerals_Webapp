import './globals.css';
import { Inter, Outfit } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import MobileActionBar from '@/components/MobileActionBar';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  metadataBase: new URL('https://www.sumanthminerals.com'),
  title: 'Sumanth Minerals | Certified 99.27% SiO2 High Purity Quartz Supplier India',
  description: 'Sumanth Minerals is a direct mine owner supplying 99.27% SiO2 silica vein quartz (0–12, 12–30, 30–80 mm) from Lakshupalli, Peddavaduguru, Andhra Pradesh, India. Independently lab-tested by Lucid Laboratories for glass, ceramic, ferro-alloy and engineered stone use.',
  keywords: 'Sumanth Minerals, quartz lumps supplier, quartz grit, quartz for ferrosilicon, quartz lumps for silicon metal, quartz for ferroalloys, quartz for refractories, quartz for ceramic tiles, quartz for glass, foundry quartz, quartz for quartz powder plants, silica sand raw material, Quartz supplier India, High purity quartz export, Anantapur quartz mine Andhra Pradesh, Silica quartz 99% supplier, 99.27% SiO2 quartz, Industrial quartz grains, Lucid Laboratories quartz report',
  openGraph: {
    title: 'Sumanth Minerals | Certified 99.27% SiO2 High Purity Quartz Supplier India',
    description: 'Direct mine supplier of 99.27% SiO2 silica quartz for glass, ceramics and ferro-alloy industries.',
    url: 'https://www.sumanthminerals.com',
    siteName: 'Sumanth Minerals',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sumanthminerals.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumanth Minerals | Certified 99.27% SiO2 High Purity Quartz Supplier India',
    description: 'Direct mine supplier of 99.27% SiO2 silica quartz for glass, ceramics and ferro-alloy industries.',
  },
};

import { LanguageProvider } from '@/context/LanguageContext';
import HideOnAdmin from '@/components/HideOnAdmin';
import MotionProvider from '@/components/MotionProvider';

// Self-hosted at build time: no request to Google, preloaded, and size-adjusted
// fallbacks so text does not jump when the web font arrives.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const outfit = Outfit({ subsets: ['latin'], display: 'swap', variable: '--font-display' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <LanguageProvider>
          <MotionProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <HideOnAdmin><Navbar /></HideOnAdmin>
          <PageTransition>
            <main id="main-content" tabIndex={-1}>{children}</main>
          </PageTransition>
          <HideOnAdmin>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
            <MobileActionBar />
          </HideOnAdmin>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
