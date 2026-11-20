import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';
import { faqData } from '@/data/faq';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.flatMap((c) => c.questions).map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export const metadata = pageMetadata({
  title: "Quartz Supply FAQ – Grades, MOQ, Payment & Shipping",
  description: "Answers on quartz grades and chemistry (SiO₂, Fe₂O₃), custom sizes, minimum order quantity, payment terms, lead times and export shipping from Sumanth Minerals, India.",
  path: '/faq',
});

export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("FAQ", '/faq')} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  );
}
