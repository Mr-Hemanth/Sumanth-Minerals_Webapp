import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Sumanth Minerals | Certified 99.27% SiO2 High Purity Quartz Supplier India',
  description: 'Sumanth Minerals is a direct quarry owner and processor of certified 99.27% pure silica vein quartz from Tadipatri, Andhra Pradesh, India. NABL accredited lab verified for global solar, glass, ceramic, and engineered stone manufacturing.',
  keywords: 'Sumanth Minerals, Quartz supplier India, High purity quartz export, Tadipatri quartz mine Andhra Pradesh, Silica quartz 99% supplier, 99.27% SiO2 quartz, Industrial quartz grains, Lucid Laboratories quartz report',
  openGraph: {
    title: 'Sumanth Minerals | Certified 99.27% SiO2 High Purity Quartz Supplier India',
    description: 'Premier supplier of 99% pure silica quartz for glass, ceramics, and silicon industries.',
    url: 'https://sumanthminerals.com',
    siteName: 'Sumanth Minerals',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://sumanthminerals.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumanth Minerals | Certified 99.27% SiO2 High Purity Quartz Supplier India',
    description: 'Premier supplier of 99% pure silica quartz for glass, ceramics, and silicon industries.',
    creator: '@sumanthminerals',
  },
};

import { LanguageProvider } from '@/context/LanguageContext';
import Preloader from '@/components/Preloader';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <LanguageProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <PageTransition>
            <main id="main-content" tabIndex={-1}>{children}</main>
          </PageTransition>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
