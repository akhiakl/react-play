import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins, Quicksand, Raleway } from 'next/font/google';
import './index.css';
import Header from 'common/header/Header';
import { SearchContextProvider } from 'common/search/search-context';
import Footer from 'common/footer/Footer';
import Nhost from 'common/nhost/Nhost';

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
  title: 'ReactPlay - One app to learn, create, and share ReactJS projects.',
  metadataBase: new URL('https://reactplay.io'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website'
  },
  twitter: {
    site: '@ReactPlayIO'
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
