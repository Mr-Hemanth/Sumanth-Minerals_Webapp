import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Quartz Lab Report – 99.27% SiO₂, 0.30% Fe₂O₃",
  description: "Independent Lucid Laboratories analysis of our silica quartz: 99.27% SiO₂, 0.30% Fe₂O₃, 0.25% Al₂O₃ (IS 1917, ICP-OES). See the full chemical composition and download the report.",
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
