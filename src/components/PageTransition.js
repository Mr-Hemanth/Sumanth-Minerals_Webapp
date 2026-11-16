'use client';
import { usePathname } from 'next/navigation';

// A short CSS fade keyed on the route. Unlike a framer exit animation it never
// delays navigation, and because it is plain CSS it starts before hydration, so
// the page is visible as soon as the HTML arrives.
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return <div key={pathname} className="page-enter">{children}</div>;
}
