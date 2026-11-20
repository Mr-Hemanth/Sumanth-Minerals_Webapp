import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Quartz Export from India – Bulk Shipping & Packaging",
  description: "Export-ready silica quartz lumps and grit from India: bulk and jumbo-bag packaging, container loading and shipment from South Indian ports. Contact our export desk for pricing by size, volume and destination.",
  path: '/export',
});

export default function ExportLayout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Export", '/export')} />
      {children}
    </>
  );
}
