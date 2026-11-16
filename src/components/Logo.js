import styles from './Logo.module.css';

/**
 * Sumanth Minerals logo: a faceted quartz crystal (the product) with the full
 * name beside it. `tone="light"` is for dark backgrounds such as the footer.
 */
export function LogoMark({ size = 40 }) {
  return (
    <svg
      className={styles.mark}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      {/* A quartz cluster: three pointed hexagonal crystals, each lit from the left
          (light facet + dark facet), rising from a laterite (red earth) base. */}
      {/* left crystal, leaning */}
      <path d="M6.5 13.5 3 19.5l4 13h5.5l-1-14z" fill="#5aa0ee" />
      <path d="M6.5 13.5l5 5 1 14-1 0z" fill="#1f6ac2" />
      {/* right crystal, leaning */}
      <path d="M33.5 10.5 37 17l-4 15.5h-5.5l1.5-16z" fill="#0d4a8a" />
      <path d="M33.5 10.5l-4.5 6-1.5 16H29z" fill="#1f6ac2" />
      {/* centre crystal, tallest */}
      <path d="M20 2.5 13.5 10v22.5H20z" fill="#5aa0ee" />
      <path d="M20 2.5 26.5 10v22.5H20z" fill="#003366" />
      <path d="M20 2.5 13.5 10H20z" fill="#9cc6f5" />
      <path d="M20 2.5 26.5 10H20z" fill="#1f6ac2" />
      <path d="M16 12.5v16l1.8 1V13.5z" fill="#ffffff" opacity="0.4" />
      {/* laterite base — the red earth the quartz comes out of */}
      <path d="M2 32.5h36l-2.5 5h-31z" fill="#b5401c" />
    </svg>
  );
}

export default function Logo({ tone = 'dark', size = 40 }) {
  return (
    <span className={`${styles.logo} ${tone === 'light' ? styles.light : ''}`}>
      <LogoMark size={size} />
      <span className={styles.words}>
        <span className={styles.name}>Sumanth</span>
        <span className={styles.sub}>Minerals</span>
      </span>
    </span>
  );
}
