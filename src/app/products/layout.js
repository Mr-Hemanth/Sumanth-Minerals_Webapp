import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Quartz Lumps & Grit 0–12, 12–30, 30–80 mm",
  description: "B-Grade and M-Grade quartz lumps and screened grit (0–12, 12–30, 30–80 mm) from our Andhra Pradesh mine. Transport available if required.",
  path: '/products',
});

export default function ProductsLayout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Products", '/products')} />
      {children}
    </>
  );
}
