# Image Assets Guide

This directory contains all image assets for the Compression Sofa ecommerce website.

## Art-Directed Responsive Images

We use art-directed images optimized for different breakpoints:

### Hero Section
- `hero-mobile.jpg/webp` (640x800) - Mobile portrait view
- `hero-desktop.jpg/webp` (1920x1080) - Desktop landscape view

### Product Images
- `loveseat.jpg` - Loveseat (2-seater) product image
- `standard.jpg` - Standard (3-seater) product image  
- `large.jpg` - Large (4-seater) product image

### Fabric Samples
- `fabric-linen.jpg` - Premium Linen texture
- `fabric-velvet.jpg` - Luxury Velvet texture
- `fabric-leather.jpg` - Italian Leather texture

### Bundles
- `bundle-essentials.jpg` - Essentials bundle showcase
- `bundle-complete.jpg` - Complete living room bundle
- `bundle-luxury.jpg` - Luxury collection bundle

### Social Proof
- `testimonial-1.jpg` - Customer photo 1
- `testimonial-2.jpg` - Customer photo 2
- `testimonial-3.jpg` - Customer photo 3

### SEO & Social
- `og-image.jpg` (1200x630) - Open Graph image
- `twitter-image.jpg` (1200x600) - Twitter card image
- `qr-code.png` - QR code for mobile AR view

## Image Optimization Guidelines

### Formats
- Primary: WebP for modern browsers
- Fallback: JPEG for older browsers
- Use AVIF where supported (Next.js automatic)

### Sizes
- Mobile: Max 640px width
- Tablet: Max 1024px width  
- Desktop: Max 1920px width
- Retina: Provide 2x versions for crisp displays

### Compression
- JPEG quality: 80-85%
- WebP quality: 75-80%
- Use progressive JPEGs for faster perceived loading

### Lazy Loading
- Hero images: `loading="eager"` with `fetchpriority="high"`
- Below fold: `loading="lazy"`
- Use Next.js Image component for automatic optimization

## Placeholder Images

For development, you can use placeholder services:
- https://placehold.co/{width}x{height}
- https://picsum.photos/{width}/{height}
- https://via.placeholder.com/{width}x{height}

Example:
```jsx
<img src="https://placehold.co/1920x1080/e2e8f0/1e293b?text=Hero+Desktop" alt="..." />
```
