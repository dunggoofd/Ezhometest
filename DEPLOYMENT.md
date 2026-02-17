# Deployment Guide

This guide covers deploying the Compression Sofa ecommerce website to various platforms.

## Prerequisites

Before deploying, ensure you have:
- A Shopify store (if using Shopify integration)
- Environment variables configured
- Build tested locally

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Required for Shopify Integration
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-token

# Optional Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=your-pixel-id
NEXT_PUBLIC_KLAVIYO_KEY=your-klaviyo-key
```

## Deploy to Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications:

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dunggoofd/Ezhometest)

### Manual Deploy

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your project

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from `.env.example`

## Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Configure environment variables in Netlify dashboard

## Deploy to Custom Server

### Using PM2

1. Build the project:
```bash
npm run build
```

2. Install PM2:
```bash
npm i -g pm2
```

3. Start the application:
```bash
pm2 start npm --name "compression-sofa" -- start
```

4. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Using Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t compression-sofa .
docker run -p 3000:3000 compression-sofa
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test product configurator functionality
- [ ] Check 3D viewer loads properly
- [ ] Test mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Check Core Web Vitals in Google PageSpeed Insights
- [ ] Test conversion tracking
- [ ] Verify Shopify integration (if applicable)
- [ ] Set up monitoring and error tracking

## Performance Optimization

### CDN Configuration

Configure your CDN to cache:
- Static assets (`/_next/static/*`)
- Images (`/images/*`)
- Videos (`/videos/*`)

### Image Optimization

Ensure you replace placeholder images with optimized versions:
- Use WebP format with JPEG fallback
- Provide multiple sizes for responsive images
- Use `priority` prop for above-the-fold images

### Analytics

Set up:
- Google Analytics 4
- Facebook Pixel (for retargeting)
- Klaviyo (for email marketing)
- Hotjar or Microsoft Clarity (for heatmaps)

## Monitoring

Recommended monitoring services:
- **Vercel Analytics** - Built-in for Vercel deployments
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Search Console** - SEO monitoring

## Support

For deployment issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- Project README.md
