import styles from './gallery.module.css';

export const metadata = {
  title: 'Gallery | Kanaka Minerals - Mining & Processing',
  description: 'Visual tour of Kanaka Minerals mines, processing units, and high-purity quartz stock in Andhra Pradesh.',
};

export default function Gallery() {
  const categories = ['All', 'Mines', 'Processing', 'Stock'];
  
  const images = [
    { id: 1, category: 'Mines', title: 'Primary Mining Site' },
    { id: 2, category: 'Processing', title: 'Crushing Unit' },
    { id: 3, category: 'Stock', title: '0-12mm Quartz Stock' },
    { id: 4, category: 'Mines', title: 'Quartz Vein Extraction' },
    { id: 5, category: 'Processing', title: 'Screening Plant' },
    { id: 6, category: 'Stock', title: '30-80mm Jumbo Bags' },
    { id: 7, category: 'Mines', title: 'Excavation Equipment' },
    { id: 8, category: 'Processing', title: 'Quality Control Lab' },
    { id: 9, category: 'Stock', title: 'Ready for Dispatch' },
  ];

  return (
    <div className={styles.galleryPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Visual Gallery</h1>
          <p>A glimpse into our mining operations and mineral quality.</p>
        </div>
      </section>

      <section className={styles.galleryContent}>
        <div className="container">
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button key={cat} className={cat === 'All' ? styles.activeFilter : ''}>
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.imageGrid}>
            {images.map((img) => (
              <div key={img.id} className={styles.imageCard}>
                <div className={styles.imgPlaceholder}>
                  <span>{img.title}</span>
                </div>
                <div className={styles.imageOverlay}>
                  <span className={styles.categoryTag}>{img.category}</span>
                  <h4>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>See Our Operations in Person</h2>
            <p>We welcome international buyers to visit our mines and processing units in Tadipatri.</p>
            <button className="btn btn-primary">Schedule a Visit</button>
          </div>
        </div>
      </section>
    </div>
  );
}
