import Link from 'next/link';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog & Industrial Insights | Sumanth Minerals',
  description: 'Technical insights into quartz mining, processing, and industrial applications by Sumanth Minerals experts.',
};

const posts = [
  {
    id: 1,
    title: 'Industrial Applications of High-Purity Quartz',
    excerpt: 'Exploring the role of 99%+ silica quartz in glass, ceramic, and metallurgical sectors.',
    date: 'May 10, 2024',
    category: 'Industrial',
    slug: 'industrial-uses-of-quartz'
  },
  {
    id: 2,
    title: 'Maintaining Silica Purity in Processing',
    excerpt: 'How our zero-contamination screening process preserves the high purity of our Anantapur quartz.',
    date: 'April 25, 2024',
    category: 'Quality',
    slug: 'silica-purity-processing'
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
                  {/* Article pages (/blog/[slug]) don't exist yet — link to sales until they do. */}
                  <Link href="/contact" className={styles.readMore}>
                    Ask our team about this &rarr;
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
            <p>Want stock availability, pricing updates, and new lab reports? Tell us what you buy and we will keep you posted.</p>
            <Link href="/contact" className="btn btn-primary">Contact Our Sales Desk</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
