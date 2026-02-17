// Shopify Storefront API configuration
export const shopifyConfig = {
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
  apiVersion: '2024-01',
}

// Product data - Replace with actual Shopify product IDs
export const PRODUCT_IDS = {
  LOVESEAT: 'gid://shopify/Product/1',
  STANDARD: 'gid://shopify/Product/2',
  LARGE: 'gid://shopify/Product/3',
}

// Analytics configuration
export const analytics = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
  klaviyoApiKey: process.env.NEXT_PUBLIC_KLAVIYO_KEY || '',
}

// Site configuration
export const siteConfig = {
  name: 'Compression Sofa',
  description: 'Premium compression sofas that ship compact and assemble in 10 minutes',
  url: 'https://compressionsofa.com',
  ogImage: 'https://compressionsofa.com/images/og-image.jpg',
  locale: 'en_US',
  supportedLocales: ['en-US', 'en-GB', 'en-CA'],
}

// Core Web Vitals targets
export const webVitalsTargets = {
  LCP: 2.5, // Largest Contentful Paint (seconds)
  FID: 100, // First Input Delay (milliseconds)
  CLS: 0.1, // Cumulative Layout Shift
  FCP: 1.8, // First Contentful Paint (seconds)
  TTFB: 600, // Time to First Byte (milliseconds)
}
