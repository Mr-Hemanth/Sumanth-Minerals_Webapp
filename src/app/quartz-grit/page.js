import ProductLanding from '@/components/ProductLanding';
import { pageMetadata } from '@/lib/seo';
import { GRADE_INFO, PHYSICAL as P } from '@/data/specs';
import gritImg from '../../../public/quartz_12_30.jpg';

export const metadata = pageMetadata({
  title: 'B & M Grade Quartz Grit, 0–12 to 30–80 mm',
  description: 'B-Grade and M-Grade quartz grit in 0–12, 12–30 and 30–80 mm from our Andhra Pradesh mine. For glass, tiles and ferro-silicon, with transport arranged.',
  path: '/quartz-grit',
});

const faqs = [
  {
    q: 'Which quartz grit sizes do you supply?',
    a: 'Our standard sizes are 0–12 mm, 12–30 mm and 30–80 mm. We can also crush and grade to custom sizes for bulk orders above 500 tons.',
  },
  {
    q: 'Which size should I choose?',
    a: '0–12 mm is used for coloured glass batches, fillers and foundry work; 12–30 mm is our standard size for tiles, sanitaryware and glass; 30–80 mm is for ferro-silicon, silicomanganese and refractories. Send us your specification and we will suggest the right fraction.',
  },
  {
    q: 'Which grades of quartz grit do you supply?',
    a: `Every size comes in two grades. ${GRADE_INFO.map((g) => `${g.name}: ${g.look}`).join(' ')} Our quartz is independently analysed by Lucid Laboratories, and the full report can be downloaded from this page.`,
  },
  {
    q: 'Can I get a sample of quartz grit before ordering?',
    a: 'Yes. Request a sample of the size you need and we send it with the certificate of analysis.',
  },
  {
    q: 'Do you arrange transport?',
    a: 'Yes. We arrange road transport from the mine to your plant anywhere in India, or to the port for export. Tell us your delivery location for a delivered price.',
  },
  {
    q: 'What is the minimum order for export?',
    a: 'For export the standard minimum order is one full container load, typically 25 to 28 tons depending on the destination port. Port delivery usually takes 10–15 days from order confirmation.',
  },
];

export default function QuartzGritPage() {
  return (
    <ProductLanding
      name="Quartz Grit"
      path="/quartz-grit"
      h1="Quartz Grit Supplier: 0–12, 12–30 and 30–80 mm"
      lead="B-Grade and M-Grade quartz grit, crushed and screened at our own mine in Andhra Pradesh, and delivered to your plant or port."
      image={gritImg}
      imageAlt="Sharp-edged white, grey and buff quartz grit 12–30 mm from the Sumanth Minerals mine, Andhra Pradesh"
      intro={[
        `Sumanth Minerals crushes and screens quartz grit from its own vein quartz deposit at Lakshupalli, Anantapur District, Andhra Pradesh. Every size comes from the same source, so the chemistry stays consistent from one lot to the next.`,
        `The grit is sharp and angular: a mix of white, grey and buff quartz chips, with natural warm tints on some pieces. Every size comes in B-Grade and M-Grade. Quartz has a Mohs hardness of ${P.mohs} and a specific gravity of about ${P.specificGravity}, which makes it a hard, stable raw material for glass, ceramics, foundry and metallurgical use.`,
        `We supply around 25,000 MT a month across all sizes. Tell us your size, grade and quantity and we will send a sample with the lab report, then a delivered price: we arrange the transport.`,
      ]}
      sizesTitle="Standard grit sizes"
      sizes={[
        { title: 'Quartz grit 0–12 mm', text: 'Fine, angular chips for coloured glass batches, industrial fillers and foundry use, where consistent particle size matters.' },
        { title: 'Quartz grit 12–30 mm', text: 'Sharp-edged white and grey chips; our standard size for vitrified tiles, sanitaryware and glass manufacturing.' },
        { title: 'Quartz grit 30–80 mm', text: 'Coarse grey-white pieces, many with natural iron staining, for ferro-silicon, silicomanganese and refractories.' },
        { title: 'Custom sizes', text: 'Custom crushing and grading for bulk orders above 500 tons. Lumps are also available.' },
      ]}
      uses={[
        { title: 'Glass', text: 'green and amber container glass and coloured glass batches.' },
        { title: 'Ceramics', text: 'vitrified tiles and sanitaryware.' },
        { title: 'Ferro-silicon and silicomanganese', text: 'coarse 30–80 mm grit as the silica charge.' },
        { title: 'Foundry and refractories', text: 'moulding sand and silica feed for refractory products.' },
        { title: 'Fillers and filtration', text: 'industrial fillers and water filter media.' },
      ]}
      faqs={faqs}
      related={{ text: 'Need larger pieces?', href: '/quartz-lumps', label: 'See our quartz lumps' }}
    />
  );
}
