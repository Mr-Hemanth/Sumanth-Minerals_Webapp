import ProductLanding from '@/components/ProductLanding';
import { pageMetadata } from '@/lib/seo';
import { CHEMISTRY as C } from '@/data/specs';
import lumpsImg from '../../../public/quartz_lumps.jpg';

export const metadata = pageMetadata({
  title: 'Quartz Lumps Supplier India, 99.27% SiO₂',
  description: 'Mine-direct quartz lumps from Andhra Pradesh: 99.27% SiO₂, 0.30% Fe₂O₃, lab tested. 15,000 MT a month for ferro-silicon, silicomanganese and refractories.',
  path: '/quartz-lumps',
});

const faqs = [
  {
    q: 'What is the silica content of your quartz lumps?',
    a: `Independent analysis by Lucid Laboratories (Report LL/25-26/009401/1, Nov 2025) shows ${C.SiO2} SiO2, ${C.Fe2O3} Fe2O3 and ${C.Al2O3} Al2O3. We can arrange batch testing for your order.`,
  },
  {
    q: 'What sizes of quartz lumps can you supply?',
    a: 'Lumps are supplied to the size your furnace or crushing plant needs. We also screen standard quartz grit in 0–12, 12–30 and 30–80 mm, and can do custom crushing and grading for bulk orders above 500 tons.',
  },
  {
    q: 'How much quartz can you supply each month?',
    a: 'Our Lakshupalli mine produces about 15,000 MT a month, and we hold around 40,000 MT of ready stock.',
  },
  {
    q: 'Where is your quartz mine?',
    a: 'Lakshupalli, Medimakula Palli, Peddavaduguru, Anantapur District, Andhra Pradesh 515405, India. Our office is in Gooty. Buyers and inspection agencies are welcome to visit.',
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
      lead={`Natural white vein quartz lumps, ${C.SiO2} SiO₂, mined and shipped by us from Lakshupalli, Andhra Pradesh.`}
      image={lumpsImg}
      imageAlt="White vein quartz lumps stockpiled at the Sumanth Minerals mine in Lakshupalli, Andhra Pradesh"
      intro={[
        `Sumanth Minerals owns and works its own quartz mine at Lakshupalli in Anantapur District, Andhra Pradesh. Because you buy from the mine and not a trader, you get the same source on every lot, a lab report you can check, and one company answerable for quality and dispatch.`,
        `Our quartz lumps test at ${C.SiO2} SiO₂ with ${C.Fe2O3} Fe₂O₃, ${C.Al2O3} Al₂O₃ and a low loss on ignition of ${C.LOI}. That makes them a dependable silica feed for ferro-silicon and silicomanganese furnaces, refractory makers, and plants that crush quartz into grit or powder.`,
        `We produce around 15,000 MT a month and keep about 40,000 MT of ready stock, so large and repeat orders can move quickly. Ask for a sample before you order; we send it with the certificate of analysis.`,
      ]}
      sizesTitle="Sizes and supply"
      sizes={[
        { title: 'Lumps to your size', text: 'Run-of-mine or sized lumps to suit your furnace charge or crusher feed. Tell us the size range you need.' },
        { title: 'Quartz grit 0–12, 12–30, 30–80 mm', text: 'Screened standard fractions from the same deposit, for glass, ceramics and metallurgy.' },
        { title: 'Custom crushing', text: 'Custom crushing and grading for bulk orders above 500 tons.' },
        { title: 'Domestic and export', text: 'Truck loads across India, and full container loads (typically 25–28 tons) for export.' },
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
