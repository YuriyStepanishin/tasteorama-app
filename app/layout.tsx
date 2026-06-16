import localFont from 'next/font/local';
import 'modern-normalize';
import './globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";


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
        <AuthProvider>{children}</AuthProvider>
                <Toaster position="top-right" />
      </body>
    </html>
  );
}