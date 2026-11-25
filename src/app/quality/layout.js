import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Quartz Quality & Lab Analysis",
  description: "How we check our B-Grade and M-Grade quartz: independent Lucid Laboratories analysis (IS 1917, ICP-OES), full composition and a free report download.",
  path: '/quality',
});

export default function QualityLayout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Quality", '/quality')} />
      {children}
    </>
  );
}
