'use client';
import { useEffect } from 'react';

// Soft light that follows the mouse across any element with class="spotlight"
// (see .spotlight in globals.css). One listener for the whole page; only runs on
// devices with a real mouse, and not for people who prefer reduced motion.
export default function Spotlight() {
  useEffect(() => {
    const ok = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!ok.matches) return undefined;
    let frame = 0;
    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest('.spotlight') : null;
      if (!el || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
