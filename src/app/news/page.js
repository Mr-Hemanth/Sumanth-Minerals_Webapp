import styles from './news.module.css';

export const metadata = {
  title: 'Company News & Press Releases | Sumanth Minerals',
  description: 'Stay updated with the latest news from Sumanth Minerals, including mine expansions and new export partnerships.',
};

const newsItems = [
  {
    id: 1,
    date: 'March 15, 2024',
    title: 'Mine Operations Optimized at Lakshyampalli',
    desc: 'Implementation of new screening technologies has improved our output consistency for the 0-12mm fine grade quartz.',
    category: 'Operations'
  },
  {
    date: 'April 05, 2024',
    title: 'Quality Report: 99.27% SiO2 Purity Confirmed',
    desc: 'Latest batch analysis from Lucid Laboratories reaffirms our position as a provider of high-purity silica quartz in the Anantapur region.',
    category: 'Quality'
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
