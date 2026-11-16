'use client';
import { MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';

// A short CSS fade keyed on the route. Unlike a framer exit animation it never
// delays navigation, and because it is plain CSS it starts before hydration, so
// the page is visible as soon as the HTML arrives.
// MotionConfig makes every framer animation honour the OS "reduce motion" setting.
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <MotionConfig reducedMotion="user">
      <div key={pathname} className="page-enter">{children}</div>
    </MotionConfig>
  );
}
