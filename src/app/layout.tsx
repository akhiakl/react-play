import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins, Quicksand, Raleway } from 'next/font/google';
import './index.css';
import Header from '@/shared/header/Header';
import { SearchContextProvider } from '@/shared/search/search-context';
import Footer from '@/shared/footer/Footer';
import Nhost from '@/shared/nhost/Nhost';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--ff-quicksand',
  weight: '500',
  display: 'swap',
  fallback: ['sans-serif']
});
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--ff-accent',
  weight: '900',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['-apple-system', 'Roboto', 'Helvetica Neue', 'sans-serif']
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--ff-default',
  weight: ['300', '400', '500', '600'],
  adjustFontFallback: false,
  fallback: ['-apple-system', 'Roboto', 'Helvetica Neue', 'sans-serif']
});

export const viewport: Viewport = {
  themeColor: '#000000'
};

export const metadata: Metadata = {
  title: 'ReactPlay - One app to learn, create, and share ReactJS projects',
  metadataBase: new URL('https://reactplay.io'),
  description:
    'ReactPlay is an open-source application to learn, create, and share ReactJS projects with the developer community.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    siteName: 'ReactPlay',
    images: [
      {
        url: 'https://reactplay.io/og-image.png',
        width: 1200,
        height: 628,
        alt: 'Start React Code Arena with ReactPlay',
        type: 'image/png'
      }
    ],
    description:
      'ReactPlay is an open-source application to learn, create and share ReactJS projects with the developer community.',
    title: 'ReactPlay - One app to learn, create, and share ReactJS projects',
    url: 'https://reactplay.io'
  },
  twitter: {
    site: '@ReactPlayIO',
    card: 'summary_large_image',
    title: 'ReactPlay - One app to learn, create, and share ReactJS projects',
    description:
      'ReactPlay is an open-source application to learn, create and share ReactJS projects with the developer community.',
    images: ['https://reactplay.io/og-image.png']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${quicksand.variable} ${poppins.variable} ${raleway.variable}`} lang="en">
      <body>
        <div className="app-container" id="root">
          <Nhost>
            <SearchContextProvider>
              <Header />
              {children}
              <Footer />
            </SearchContextProvider>
          </Nhost>
        </div>
      </body>
    </html>
  );
}
