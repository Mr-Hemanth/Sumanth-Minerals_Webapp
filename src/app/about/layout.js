import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "About Us – Quartz Mine Owner in Anantapur, Andhra Pradesh",
  description: "Sumanth Minerals, incorporated in 2019, owns and operates a silica vein quartz mine at Lakshupalli, Peddavaduguru (Anantapur District, Andhra Pradesh) with 15,000 MT mined monthly and 40,000 MT ready stock.",
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
