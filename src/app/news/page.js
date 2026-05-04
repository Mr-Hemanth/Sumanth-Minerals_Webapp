import styles from './news.module.css';

export const metadata = {
  title: 'Company News & Press Releases | Kanaka Minerals',
  description: 'Stay updated with the latest news from Kanaka Minerals, including mine expansions and new export partnerships.',
};

const newsItems = [
  {
    date: 'May 02, 2024',
    title: 'Kanaka Minerals Expands Export Capacity to 15,000 Tons',
    desc: 'With the addition of two new processing plants, we have significantly boosted our monthly output to meet rising demand from Europe.',
    category: 'Expansion'
  },
  {
    date: 'April 15, 2024',
    title: 'New Sustainability Benchmarks Achieved at Tadipatri Mine',
    desc: 'We have successfully reached our goal of 100% backfilling for our primary mining site ahead of schedule.',
    category: 'Sustainability'
  },
  {
    date: 'March 20, 2024',
    title: 'Successful Participation in Dubai Global Mineral Expo',
    desc: 'Our 99% silica quartz received overwhelming interest from leading ceramic manufacturers in the Middle East.',
    category: 'Events'
  }
];

export default function News() {
  return (
    <div className={styles.newsPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>News & Press Releases</h1>
          <p>Recent updates and corporate announcements from our operations.</p>
        </div>
      </section>

      <section className={styles.newsList}>
        <div className="container">
          <div className={styles.grid}>
            {newsItems.map((news, idx) => (
              <div key={idx} className={styles.newsCard}>
                <div className={styles.meta}>
                  <span className={styles.date}>{news.date}</span>
                  <span className={styles.badge}>{news.category}</span>
                </div>
                <h2>{news.title}</h2>
                <p>{news.desc}</p>
                <button className={styles.readMore}>Read Press Release &rarr;</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
