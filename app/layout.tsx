import localFont from 'next/font/local';
import 'modern-normalize';
import './globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Tasteorama",
};

const montserrat = localFont({
  src: [
    {
      path: '../public/fonts/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserrat-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-main',
});

const dmSans = localFont({
  src: [
    {
      path: '../public/fonts/DMSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body>
<TanStackProvider>
  <Header />
  {children}
  <Footer />
  <Toaster position="top-right" />
</TanStackProvider>
      </body>
    </html>
  );
}
