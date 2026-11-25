import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "About Us – Quartz Mine Owner, Anantapur",
  description: "Sumanth Minerals (est. 2019) owns a silica vein quartz mine at Lakshupalli, Anantapur District, Andhra Pradesh: 25,000 MT mined monthly, 70,000 MT in stock.",
  path: '/about',
});

export default function AboutLayout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("About Us", '/about')} />
      {children}
    </>
  );
}
