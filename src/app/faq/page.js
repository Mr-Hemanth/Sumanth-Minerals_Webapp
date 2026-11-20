'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './faq.module.css';
import { faqData } from '@/data/faq';


export default function FAQ() {
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const term = query.trim().toLowerCase();
  const groups = faqData
    .map((category, catIdx) => ({
      ...category,
      catIdx,
      items: category.questions
        .map((item, qIdx) => ({ ...item, id: `${catIdx}-${qIdx}` }))
        .filter((item) => !term || item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term)),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className={styles.faqPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className="rise">Frequently Asked Questions</h1>
          <p className="rise" style={{ "--rise-delay": "0.1s" }}>Find answers to common questions about our products and export process.</p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className={`${styles.searchBox} reveal`}>
            <Search size={20} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search for a question..."
              aria-label="Search the questions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.faqContainer}>
            {groups.map((category) => (
              <div key={category.catIdx} className={styles.categoryGroup}>
                <h2 className="reveal">{category.category}</h2>
                <div className={`${styles.list} stagger`}>
                  {category.items.map((item) => {
                    const isOpen = activeId === item.id;
                    return (
                      <div key={item.id} className={`${styles.item} ${isOpen ? styles.active : ''}`}>
                        <button
                          type="button"
                          className={styles.question}
                          onClick={() => toggleFAQ(item.id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${item.id}`}
                          id={`faq-q-${item.id}`}
                        >
                          <span>{item.q}</span>
                          <span className={styles.toggleIcon} aria-hidden="true" />
                        </button>
                        <div
                          className={styles.answer}
                          id={`faq-answer-${item.id}`}
                          role="region"
                          aria-labelledby={`faq-q-${item.id}`}
                        >
                          <div className={styles.answerInner}>
                            <p>{item.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {groups.length === 0 && (
              <p className={styles.noResults} role="status">
                No questions match &ldquo;{query}&rdquo;. Try another word, or ask us directly below.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={`${styles.ctaBox} reveal-zoom`}>
            <h3>Have a specific question?</h3>
            <p>Our technical team is ready to provide detailed answers to your unique requirements.</p>
            <a href="/contact" className="btn btn-primary">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
}
