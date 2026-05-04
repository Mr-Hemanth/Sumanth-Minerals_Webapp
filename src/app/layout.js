import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Kanaka Minerals | High Purity Quartz Supplier India',
  description: 'Kanaka Minerals is a leading producer and exporter of 99% silica high-purity quartz from Anantapur, Andhra Pradesh, India. Capacity of 10,000 tons/month.',
  keywords: 'Quartz supplier India, High purity quartz export, Quartz mine in Andhra Pradesh, Silica quartz 99% supplier, Industrial quartz minerals',
  openGraph: {
    title: 'Kanaka Minerals | High Purity Quartz Supplier India',
    description: 'Premier supplier of 99% pure silica quartz for glass, ceramics, and silicon industries.',
    url: 'https://kanakaminerals.com',
    siteName: 'Kanaka Minerals',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://kanakaminerals.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kanaka Minerals | High Purity Quartz Supplier India',
    description: 'Premier supplier of 99% pure silica quartz for glass, ceramics, and silicon industries.',
    creator: '@kanakaminerals',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
