'use client';
import { usePathname } from 'next/navigation';

// Public-site chrome (navbar, footer, floating buttons, preloader) is hidden on
// the admin dashboard so it can use the full screen.
export default function HideOnAdmin({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/adminsumanth')) return null;
  return children;
}
