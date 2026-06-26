import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arthcalc.in'),
  title: {
    default: 'ArthCalc — India\'s Most Comprehensive Investment Calculator',
    template: '%s | ArthCalc',
  },
  description: 'Calculate, compare, and understand every major Indian investment — FD, SIP, PPF, NPS, EPF, Gold, NSC, T-Bills, and 40+ more. Free educational calculators. Official rates from RBI, EPFO, SEBI.',
  keywords: [
    'FD calculator', 'SIP calculator', 'PPF calculator', 'NPS calculator', 'EPF calculator',
    'investment calculator India', 'compare investments India', 'FD vs SIP', 'PPF vs NPS',
    'gold calculator', 'NSC calculator', 'SSY calculator', 'T-bill calculator',
    'investment comparison', 'retirement calculator India', 'mutual fund calculator',
    'ArthCalc', 'arth calculator', 'India investment calculator',
  ],
  authors: [{ name: 'ArthCalc' }],
  creator: 'ArthCalc',
  publisher: 'ArthCalc',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'ArthCalc',
    title: 'ArthCalc — India\'s Most Comprehensive Investment Calculator',
    description: 'Free investment calculators for FD, SIP, PPF, NPS, EPF, Gold, and 40+ Indian investment options. Compare investments. Official rates. Educational purpose only.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArthCalc — Investment Calculator India',
    description: 'Free calculators for FD, SIP, PPF, NPS, EPF, Gold & 40+ investments. Compare. Learn. Educational only.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a8a' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
