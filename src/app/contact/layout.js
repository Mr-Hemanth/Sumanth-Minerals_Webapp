import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Contact Us – Bulk Quartz Enquiries & Quotes",
  description: "Contact Sumanth Minerals for bulk quartz lumps and quartz grit. Call or WhatsApp +91 91691 66667, email sales@sumanthminerals.com, or send an enquiry and our sales team will reply with pricing.",
  path: '/contact',
});

export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Contact", '/contact')} />
      {children}
    </>
  );
}
