import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Request a Quartz Sample",
  description: "Test our B-Grade or M-Grade quartz in your own plant. Request a sample of quartz lumps or 0–12, 12–30 or 30–80 mm grit, sent with the lab report.",
  path: '/request-sample',
});

export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Request a Sample", '/request-sample')} />
      {children}
    </>
  );
}
