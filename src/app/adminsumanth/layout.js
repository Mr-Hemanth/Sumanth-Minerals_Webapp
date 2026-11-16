import { Archivo } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-desk',
  display: 'swap',
});

export const metadata = {
  title: 'Sales desk | Sumanth Minerals',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className={archivo.variable}>{children}</div>;
}
