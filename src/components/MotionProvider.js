'use client';
import { LazyMotion, MotionConfig } from 'framer-motion';

const loadFeatures = () => import('@/lib/motion-features').then((mod) => mod.default);

// Every animated element on the site uses the slim `m` component. The animation
// features download in the background after first paint, and MotionConfig makes
// all of it respect the visitor's "reduce motion" setting.
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
