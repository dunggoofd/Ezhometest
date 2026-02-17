import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://compressionsofa.com'),
  title: {
    default: 'Premium Compression Sofas | Ships Compact, Assembles Fast',
    template: '%s | Compression Sofa'
  },
  description: 'Experience luxury meets convenience with our premium compression sofas. Ships compact, assembles in 10 minutes. Perfect for modern living.',
  keywords: ['compression sofa', 'compact furniture', 'modern sofa', 'easy assembly', 'premium furniture', 'space-saving sofa'],
  authors: [{ name: 'Compression Sofa' }],
  creator: 'Compression Sofa',
  publisher: 'Compression Sofa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://compressionsofa.com',
    siteName: 'Compression Sofa',
    title: 'Premium Compression Sofas | Ships Compact, Assembles Fast',
    description: 'Experience luxury meets convenience with our premium compression sofas. Ships compact, assembles in 10 minutes.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Compression Sofa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Compression Sofas | Ships Compact, Assembles Fast',
    description: 'Experience luxury meets convenience with our premium compression sofas.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://compressionsofa.com',
    languages: {
      'en-US': 'https://compressionsofa.com',
      'en-GB': 'https://compressionsofa.com/en-gb',
      'en-CA': 'https://compressionsofa.com/en-ca',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
