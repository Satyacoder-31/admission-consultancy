import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/Preloader';
import ScrollToTop from '@/components/ScrollToTop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import CircleCursor from '@/components/CircleCursor';
import { siteConfig } from '@/data/siteConfig';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'SAHI RAAH CONSULTANCY | Premium Admission Guidance & University Assistance in Raxaul',
    template: '%s | SAHI RAAH CONSULTANCY'
  },
  description: 'Official portal of SAHI RAAH CONSULTANCY, Raxaul (Bihar). Comprehensive admission guidance for Regular, Distance & Online degrees (BA, B.Com, B.Sc, BBA, MBA, B.Tech, MCA, BNYS, Diploma) & School Boards. Helpline: 8092911956.',
  keywords: [
    'admission consultancy in Raxaul',
    'college admission guidance in Raxaul',
    'SAHI RAAH CONSULTANCY',
    'distance education Bihar',
    'online degrees India',
    'B.Tech admission guidance Raxaul',
    'BNYS naturopathy admission',
    'MBA admission guidance Bihar',
    '10th 12th open board guidance Raxaul'
  ],
  authors: [{ name: 'SAHI RAAH CONSULTANCY' }],
  metadataBase: new URL('https://sahiraahconsultancy.com'),
  openGraph: {
    title: 'SAHI RAAH CONSULTANCY — Your Future. Our Guidance.',
    description: 'Premier Admission Guidance & University Directory based in Kaurihar Chouk, Raxaul, Bihar.',
    url: 'https://sahiraahconsultancy.com',
    siteName: 'SAHI RAAH CONSULTANCY',
    images: [
      {
        url: '/images/brand/admission_poster.jpg',
        width: 1200,
        height: 630,
        alt: 'SAHI RAAH CONSULTANCY Admissions Open 2026-2027',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/images/brand/logo.jpg',
    apple: '/images/brand/logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} scroll-smooth antialiased max-w-full overflow-x-hidden`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('sahiraah_theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  var lang = localStorage.getItem('sahiraah_lang');
                  if (lang) {
                    document.documentElement.lang = lang;
                  }
                } catch (e) {}
              })();
              if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033] selection:bg-amber-400 selection:text-slate-950 max-w-full overflow-x-hidden transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={null}>
              <ScrollToTop />
            </Suspense>
            <Suspense fallback={null}>
              <Preloader />
            </Suspense>
            <CircleCursor />
            <Suspense fallback={<div className="h-20 bg-[#082B59]" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
            <WhatsAppWidget />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
