import ProductLanding from '@/components/ProductLanding';
import { pageMetadata } from '@/lib/seo';
import { GRADE_INFO } from '@/data/specs';
import lumpsImg from '../../../public/quartz_lumps.jpg';

export const metadata = pageMetadata({
  title: 'B & M Grade Quartz Lumps Supplier India',
  description: 'B-Grade and M-Grade quartz lumps direct from our Andhra Pradesh mine. Lab tested, 25,000 MT a month, transport available if required.',
  path: '/quartz-lumps',
});

const faqs = [
  {
    q: 'Which grades of quartz lumps do you supply?',
    a: `Two grades. ${GRADE_INFO.map((g) => `${g.name}: ${g.look}`).join(' ')} Our quartz is independently analysed by Lucid Laboratories (Report LL/25-26/009401/1), and we can arrange batch testing for your order.`,
  },
  {
    q: 'What sizes of quartz lumps can you supply?',
    a: 'Lumps are supplied to the size your furnace or crushing plant needs. We also screen standard quartz grit in 0–12, 12–30 and 30–80 mm, and can do custom crushing and grading for bulk orders above 500 tons.',
  },
  {
    q: 'How much quartz can you supply each month?',
    a: 'Our Lakshupalli mine produces about 25,000 MT a month, and we hold around 70,000 MT of ready stock.',
  },
  {
    q: 'Where is your quartz mine?',
    a: 'Lakshupalli, Medimakula Palli, Peddavaduguru, Anantapur District, Andhra Pradesh 515405, India. Our office is in Gooty. Buyers and inspection agencies are welcome to visit.',
  },
  {
    q: 'Do you arrange transport?',
    a: 'Yes, if you need it. You can collect from the mine, or we can arrange road transport to your plant anywhere in India, or to the port for export. Tell us your delivery location for a delivered price.',
  },
  {
    q: 'Do you export quartz lumps?',
    a: 'Yes. For export the standard minimum order is one full container load, typically 25 to 28 tons. Port delivery usually takes 10–15 days from order confirmation.',
  },
];

export default function QuartzLumpsPage() {
  return (
    <ProductLanding
      name="Quartz Lumps"
      path="/quartz-lumps"
      h1="Quartz Lumps Supplier in India"
      lead="B-Grade and M-Grade natural vein quartz lumps, mined by us at Lakshupalli, Andhra Pradesh, and delivered to your plant or port."
      image={lumpsImg}
      imageAlt="Milky-white and grey vein quartz lumps with natural reddish-brown staining, at the Sumanth Minerals mine in Lakshupalli, Andhra Pradesh"
      intro={[
        `Sumanth Minerals owns and works its own quartz mine at Lakshupalli in Anantapur District, Andhra Pradesh. Because you buy from the mine and not a trader, you get the same source on every lot, a lab report you can check, and one company answerable for quality and dispatch.`,
        `The lumps are milky-white to light-grey translucent vein quartz, some with natural reddish-brown iron staining on the surface. We sort them into B-Grade and M-Grade, so you can choose the grade that suits ferro-silicon and silicomanganese furnaces, refractory making, or crushing into grit and powder.`,
        `We produce around 25,000 MT a month and keep about 70,000 MT of ready stock, so large and repeat orders can move quickly, and we can arrange transport to your plant or port if required. Ask for a sample before you order; we send it with the lab report.`,
      ]}
      sizesTitle="Sizes and supply"
      sizes={[
        { title: 'Lumps to your size', text: 'Run-of-mine or sized lumps to suit your furnace charge or crusher feed. Tell us the size range you need.' },
        { title: 'Quartz grit 0–12, 12–30, 30–80 mm', text: 'Screened standard fractions from the same deposit, for glass, ceramics and metallurgy.' },
        { title: 'Custom crushing', text: 'Custom crushing and grading for bulk orders above 500 tons.' },
        { title: 'Transport if required', text: 'Collect from the mine, or we can arrange trucks to your plant anywhere in India, or to the port for export container loads (typically 25–28 tons).' },
      ]}
      uses={[
        { title: 'Ferro-silicon', text: 'silica source for ferro-silicon smelting in submerged arc furnaces.' },
        { title: 'Silicomanganese', text: 'silica addition in silicomanganese alloy production.' },
        { title: 'Refractories', text: 'silica feed for refractory manufacture.' },
        { title: 'Crushing and quartz powder plants', text: 'feedstock for your own grit, sand or powder production.' },
      ]}
      faqs={faqs}
      related={{ text: 'Need screened sizes?', href: '/quartz-grit', label: 'See our quartz grit 0–12, 12–30 and 30–80 mm' }}
    />
  );
}
