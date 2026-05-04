import Link from 'next/link';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog & Industrial Insights | Kanaka Minerals',
  description: 'Industrial insights into quartz mining, uses of 99% silica, and the global quartz export market from India.',
};

const posts = [
  {
    id: 1,
    title: 'Top 5 Industrial Uses of High-Purity Quartz',
    excerpt: 'From semiconductor manufacturing to high-end glassware, discover why 99% silica quartz is the backbone of modern industry.',
    date: 'May 10, 2024',
    category: 'Industrial',
    slug: 'industrial-uses-of-quartz'
  },
  {
    id: 2,
    title: 'Why 99% Silica Matters in Ceramic Production',
    excerpt: 'Understanding the chemical significance of silica purity and its impact on the structural integrity of ceramic products.',
    date: 'April 25, 2024',
    category: 'Quality',
    slug: 'silica-purity-in-ceramics'
  },
  {
    id: 3,
    title: 'The Future of Quartz Export from India',
    excerpt: 'An analysis of India’s growing role in the global mineral supply chain and the strategic importance of the Andhra region.',
    date: 'April 12, 2024',
    category: 'Export',
    slug: 'quartz-export-from-india'
  }
];

export default function Blog() {
  return (
    <div className={styles.blogPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Industry Insights</h1>
          <p>Expert articles on minerals, mining, and global industrial trends.</p>
        </div>
      </section>

      <section className={styles.blogList}>
        <div className="container">
          <div className={styles.grid}>
            {posts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postImage}>
                  <span>{post.category}</span>
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span>{post.date}</span>
                    <span className={styles.dot}></span>
                    <span>{post.category}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read Full Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterBox}>
            <h2>Stay Updated</h2>
            <p>Subscribe to our quarterly mineral market report and industry updates.</p>
            <form className={styles.nForm}>
              <input type="email" placeholder="Your work email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
