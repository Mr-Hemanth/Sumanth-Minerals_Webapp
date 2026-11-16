'use client';
import { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import styles from './faq.module.css';

const faqData = [
  {
    category: 'Product & Quality',
    questions: [
      {
        q: 'What is the silica content of your quartz?',
        a: 'Independent analysis by Lucid Laboratories Pvt. Ltd. (Report LL/25-26/009401/1, Nov 2025) shows 99.27% SiO2, 0.30% Fe2O3 and 0.25% Al2O3. The full report is on our Downloads page, and we can arrange batch testing for your order.'
      },
      {
        q: 'Can you provide custom sizes?',
        a: 'Yes, while our standard sizes are 0-12mm, 12-30mm, and 30-80mm, we can accommodate custom crushing and grading requests for bulk orders exceeding 500 tons.'
      },
      {
        q: 'Is your quartz suitable for solar glass or semiconductor use?',
        a: 'No. Those applications need far lower iron and trace-element levels than natural vein quartz provides. Our quartz (99.27% SiO2, 0.30% Fe2O3) is suited to ferro-silicon and silicomanganese, ceramics and tiles, refractories, coloured glass, engineered stone and filtration. Send us your specification and we will tell you honestly whether it fits.'
      }
    ]
  },
  {
    category: 'Ordering & Logistics',
    questions: [
      {
        q: 'What is your Minimum Order Quantity (MOQ)?',
        a: 'For international exports, our standard MOQ is one full container load (FCL), which is typically 25 to 28 tons depending on the destination port regulations.'
      },
      {
        q: 'What are your payment terms for global buyers?',
        a: 'We typically work with 100% Irrevocable Letter of Credit (L/C) at sight or a 30% advance T/T with the balance against scanned shipping documents.'
      },
      {
        q: 'How long does it take from order to port delivery?',
        a: 'Processing and port delivery usually take 10-15 days from the date of order confirmation and payment instrument receipt.'
      }
    ]
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className={styles.faqPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products and export process.</p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.searchBox}>
            <Search size={20} />
            <input type="text" placeholder="Search for a question..." />
          </div>

          <div className={styles.faqContainer}>
            {faqData.map((category, catIdx) => (
              <div key={catIdx} className={styles.categoryGroup}>
                <h2>{category.category}</h2>
                <div className={styles.list}>
                  {category.questions.map((item, qIdx) => {
                    const id = `${catIdx}-${qIdx}`;
                    const isOpen = activeId === id;
                    return (
                      <div key={id} className={`${styles.item} ${isOpen ? styles.active : ''}`}>
                        <button className={styles.question} onClick={() => toggleFAQ(id)}>
                          <span>{item.q}</span>
                          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                        </button>
                        <div className={styles.answer}>
                          <p>{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h3>Have a specific question?</h3>
            <p>Our technical team is ready to provide detailed answers to your unique requirements.</p>
            <a href="/contact" className="btn btn-primary">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
}
