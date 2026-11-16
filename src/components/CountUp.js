'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts from 0 to `to` once, when first scrolled into view.
 * Renders the final value immediately for reduced-motion users and on the server,
 * so the real number is always in the HTML for search engines and screen readers.
 */
export default function CountUp({ to, decimals = 0, suffix = '', duration = 1.6, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const format = (v) =>
    v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  const [text, setText] = useState(format(to));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return <span ref={ref} className="tabular">{text}</span>;
}
