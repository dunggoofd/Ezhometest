import { Metadata } from 'next'
import HeroVideoSection from '@/components/HeroVideoSection'
import ProductConfigurator from '@/components/ProductConfigurator'
import VirtualShowroom from '@/components/VirtualShowroom'
import ConversionEngine from '@/components/ConversionEngine'
import TrustSignals from '@/components/TrustSignals'
import ProductBundles from '@/components/ProductBundles'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Experience the future of furniture with compression sofas that ship compact and assemble in 10 minutes.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Compression Sofa',
    url: 'https://compressionsofa.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://compressionsofa.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Premium Compression Sofa',
    description: 'Luxury sofa that ships compact and assembles in 10 minutes',
    image: 'https://compressionsofa.com/images/sofa-main.jpg',
    brand: {
      '@type': 'Brand',
      name: 'Compression Sofa',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '1299',
      highPrice: '3499',
      offerCount: '8',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '247',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section with Video */}
        <HeroVideoSection />
        
        {/* Trust Signals */}
        <TrustSignals />
        
        {/* Product Configurator */}
        <ProductConfigurator />
        
        {/* Product Bundles */}
        <ProductBundles />
        
        {/* Virtual Showroom */}
        <VirtualShowroom />
        
        {/* Conversion Engine */}
        <ConversionEngine />
      </main>
    </>
  )
}
