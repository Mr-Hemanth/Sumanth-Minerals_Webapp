'use client';
import { useRef } from 'react';
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

// Buttons lean slightly toward the cursor. Uses motion values, so mouse moves never
// re-render React; does nothing on touch screens or with "reduce motion" on.
export default function Magnetic({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.1 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <m.div ref={ref} style={{ position: 'relative', x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.div>
  );
}
