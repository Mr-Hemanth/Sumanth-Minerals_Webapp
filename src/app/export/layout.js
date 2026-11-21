import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Quartz Export from India – Bulk Shipping",
  description: "Export-ready silica quartz lumps and grit from India: bulk and jumbo-bag packing, container loading and shipping from South Indian ports. Ask for a quote.",
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
