import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Quartz Mine & Product Photos",
  description: "Real photos of the Sumanth Minerals quartz mine in Andhra Pradesh, our quartz lumps, 0–12, 12–30 and 30–80 mm quartz grit, and the lab certificate.",
  path: '/gallery',
});

export default function GalleryLayout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Gallery", '/gallery')} />
      {children}
    </>
  );
}
