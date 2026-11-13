'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per session
    const hasVisited = sessionStorage.getItem('km_visited');
    if (hasVisited) {
      setLoading(false);
      return;
    }

    // Animate progress bar
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('km_visited', '1');
        }, 500);
      }
      setProgress(Math.min(p, 100));
    }, 120);

    // Safety net: force close after 5 seconds no matter what
    const forceTimer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('km_visited', '1');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(forceTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          className={styles.preloader}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className={styles.bg} />
          <div className={styles.content}>
            <motion.div
              className={styles.logoWrap}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.logoMark}>S</div>
              <div className={styles.logoText}>
                <span className={styles.logoMain}>SUMANTH</span>
                <span className={styles.logoSub}>MINERALS</span>
              </div>
            </motion.div>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Purity in Every Particle
            </motion.p>

            <motion.div
              className={styles.progressWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressNum}>{Math.round(progress)}%</span>
            </motion.div>

            <motion.div
              className={styles.particles}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.particle}
                  animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
