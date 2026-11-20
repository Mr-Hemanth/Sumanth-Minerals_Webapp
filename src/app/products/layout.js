import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Quartz Lumps & Quartz Grit 0–12, 12–30, 30–80 mm",
  description: "Buy 99.27% SiO₂ quartz lumps and screened quartz grit (0–12, 12–30, 30–80 mm) direct from our Andhra Pradesh mine. Specifications, applications and TDS for ferro-silicon, glass, ceramics and refractories.",
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
