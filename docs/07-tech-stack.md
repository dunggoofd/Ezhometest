# EzHome — Tech Stack (Shopify)

> Complete technology stack, tooling, and infrastructure for the EzHome Shopify store.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## 1. Platform Summary

| Layer               | Technology                        | Purpose                           |
|--------------------|-----------------------------------|-----------------------------------|
| **E-commerce**      | Shopify (Online Store 2.0)        | Product catalog, checkout, orders |
| **Theme Engine**    | Liquid + JSON templates           | Server-side rendering             |
| **Styling**         | CSS custom properties + BEM       | Design tokens → CSS               |
| **JavaScript**      | Vanilla JS (ES modules)          | Interactivity, cart drawer, AJAX  |
| **Build Tool**      | Shopify CLI 3.x                   | Theme dev, preview, deploy        |
| **Email Marketing** | Klaviyo                           | Flows, campaigns, segmentation    |
| **Analytics**       | GA4 + Meta Pixel                  | Traffic, conversion tracking      |
| **Reviews**         | Judge.me or Stamped.io            | Product reviews + UGC             |
| **Payments**        | Shopify Payments + Afterpay       | Checkout processing               |
| **CDN / Hosting**   | Shopify CDN (Fastly)              | Global edge delivery              |

---

## 2. Shopify Plan & Features

### Recommended Plan: **Shopify** (or **Shopify Plus** at scale)

| Feature                      | Shopify Plan | Shopify Plus |
|-----------------------------|-------------|-------------|
| Online Store 2.0 themes      | ✅           | ✅           |
| Shopify Payments (0% extra)  | ✅           | ✅           |
| Discount codes               | ✅           | ✅           |
| Abandoned cart recovery       | ✅           | ✅           |
| Gift cards                   | ✅           | ✅           |
| Professional reports          | ✅           | ✅           |
| Checkout extensibility        | ❌           | ✅           |
| Shopify Flow (automation)     | ❌           | ✅           |
| Custom checkout branding      | Limited     | Full         |
| Dedicated support             | ❌           | ✅           |
| API rate limits               | Standard    | 4× higher   |

**Recommendation:** Start on Shopify plan. Upgrade to Plus when revenue exceeds ~$500K/year or when checkout customization is critical.

---

## 3. Theme Architecture

### 3.1 Online Store 2.0 Structure

```
ezhome-theme/
├── assets/                     ← CSS, JS, images, fonts
│   ├── base.css                ← Global styles + design tokens
│   ├── section-hero.css        ← Section-specific CSS (loaded per-section)
│   ├── section-product.css
│   ├── component-card.css
│   ├── component-button.css
│   ├── global.js               ← Core JS (cart, navigation, utilities)
│   ├── section-product.js      ← Section-specific JS
│   └── component-media-gallery.js
├── config/
│   ├── settings_schema.json    ← Theme settings definition
│   └── settings_data.json      ← Theme settings values (auto-generated)
├── layout/
│   ├── theme.liquid            ← Master layout
│   └── password.liquid         ← Password page layout
├── locales/
│   ├── en.default.json         ← English translations
│   └── en.default.schema.json  ← Theme editor translations
├── sections/                   ← Modular Liquid sections (see 05-component-inventory.md)
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero-banner.liquid
│   ├── main-product.liquid
│   └── ... (35+ sections)
├── snippets/                   ← Reusable Liquid partials
│   ├── card-product.liquid
│   ├── icon.liquid
│   ├── meta-tags.liquid
│   ├── json-ld.liquid
│   ├── price.liquid
│   └── ... (20+ snippets)
├── templates/                  ← JSON templates (see 06-page-templates.md)
│   ├── index.json
│   ├── product.json
│   └── ...
└── README.md
```

### 3.2 Design Tokens Integration

Design tokens from `design-system/tokens.json` are compiled into CSS custom properties:

```css
/* assets/base.css — sourced from design-system/variables.css */
:root {
  /* Colors */
  --color-ink: #141416;
  --color-white: #FFFFFF;
  --color-cream: #FBF9F5;
  --color-sage: #3A6B3A;
  --color-coral: #FF6B42;
  --color-ink-50: #8A8A8D;
  --color-ink-10: #E8E8E9;

  /* Typography */
  --font-display: 'Instrument Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing (8px grid) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */

  /* Borders & Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(20, 20, 22, 0.06);
  --shadow-md: 0 4px 12px rgba(20, 20, 22, 0.08);
  --shadow-lg: 0 8px 24px rgba(20, 20, 22, 0.12);

  /* Transitions */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 3.3 CSS Strategy

| Approach         | Details                                                    |
|-----------------|-------------------------------------------------------------|
| Methodology      | BEM (Block__Element--Modifier)                             |
| Custom Properties | CSS variables from design tokens                           |
| Loading          | Per-section CSS loaded via `{% stylesheet %}` or asset tags |
| Reset            | Minimal reset (no large framework)                         |
| Responsive       | Mobile-first with `min-width` breakpoints                  |
| Animations       | CSS `@keyframes` + `transition` (no JS animation libraries)|
| No Tailwind      | Shopify themes use vanilla CSS for compatibility           |

**Breakpoints:**

```css
/* Mobile first */
/* xs: 0–479px   (default) */
/* sm: 480px+    */
/* md: 768px+    */
/* lg: 1024px+   */
/* xl: 1280px+   */
/* 2xl: 1440px+  */

@media (min-width: 480px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 3.4 JavaScript Strategy

| Principle                 | Details                                                  |
|--------------------------|-----------------------------------------------------------|
| No build step             | Vanilla ES modules, no webpack/Vite                      |
| Progressive enhancement   | Core functionality works without JS                      |
| Deferred loading          | All JS loaded with `defer` attribute                     |
| Event delegation          | Delegated listeners on `document` where possible         |
| Web Components            | Custom elements for interactive widgets (optional)       |
| AJAX Cart                 | Fetch API → Shopify Cart API (`/cart/*.js` endpoints)    |
| Section Rendering API     | Fetch sections dynamically for partial page updates      |

**Key JS modules:**

```
global.js           ← Cart drawer, header scroll, announcement dismiss
section-product.js  ← Variant picker, media gallery, quantity selector
section-cart.js     ← Cart page AJAX updates, upsells
component-slider.js ← Generic carousel/slider (testimonials, gallery)
component-tabs.js   ← Tab switching for product info
component-accordion.js ← FAQ, filter drawers
component-modal.js  ← Size guide, video lightbox
```

---

## 4. Shopify APIs Used

### 4.1 Storefront API (GraphQL)

Used for **headless** features only if needed (e.g., predictive search, product recommendations). Primary rendering is server-side via Liquid.

| Query/Mutation        | Use Case                                |
|----------------------|------------------------------------------|
| `products`           | Predictive search typeahead              |
| `productRecommendations` | "You may also like" section         |
| `cart`               | AJAX cart operations (alternative to REST)|

### 4.2 Ajax API (Theme REST Endpoints)

Used by theme JavaScript for real-time interactions:

| Endpoint                    | Method | Purpose                     |
|----------------------------|--------|-----------------------------|
| `/cart.js`                  | GET    | Get current cart             |
| `/cart/add.js`              | POST   | Add to cart                  |
| `/cart/change.js`           | POST   | Update quantity              |
| `/cart/update.js`           | POST   | Bulk update cart             |
| `/cart/clear.js`            | POST   | Clear cart                   |
| `/search/suggest.json`      | GET    | Predictive search            |
| `/recommendations/products` | GET    | Product recommendations      |

### 4.3 Admin API

Used by apps and integrations (not theme code):

| Resource        | Use Case                                    |
|----------------|----------------------------------------------|
| Products        | Sync from ERP / bulk import                  |
| Orders          | Fulfillment, returns processing              |
| Customers       | CRM sync, marketing segmentation             |
| Inventory       | Stock level management                       |
| Metafields      | Custom data (specs, assembly info, dimensions)|

### 4.4 Section Rendering API

Used for dynamic partial page updates without full reload:

```javascript
// Example: Update cart drawer after add-to-cart
fetch(`${window.location.pathname}?sections=cart-drawer`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#cart-drawer').innerHTML = data['cart-drawer'];
  });
```

---

## 5. Third-Party Integrations

### 5.1 Essential Apps

| App / Service         | Category        | Purpose                                   | Integration Type    |
|----------------------|-----------------|-------------------------------------------|---------------------|
| **Klaviyo**           | Email/SMS       | Marketing automation, flows, newsletters   | Shopify App + API   |
| **Judge.me**          | Reviews         | Product reviews, photo reviews, SEO        | Shopify App         |
| **Afterpay/Clearpay** | BNPL            | Buy now, pay later messaging               | Shopify Payments    |
| **GA4**               | Analytics       | Traffic analytics, conversion tracking     | Theme snippet       |
| **Meta Pixel**        | Advertising     | Facebook/Instagram ad tracking             | Theme snippet       |
| **Google Shopping**   | Sales channel   | Product feed for Google Merchant Center    | Shopify Sales Channel |
| **Shopify Email**     | Email            | Basic transactional emails                | Built-in            |
| **Shopify Inbox**     | Chat            | Live chat + AI chat                        | Built-in            |

### 5.2 Optional / Growth Apps

| App / Service         | Category        | Purpose                                   |
|----------------------|-----------------|-------------------------------------------|
| ReCharge / Loop       | Subscriptions   | Subscription boxes (future)               |
| Gorgias               | Support         | Helpdesk + chat (replaces Inbox at scale) |
| Rebuy                 | Personalization | AI product recommendations                |
| Stamped.io             | Loyalty         | Loyalty program + referrals               |
| ShipStation            | Shipping        | Multi-carrier shipping management         |
| Return Logic / Loop    | Returns         | Self-serve returns portal                 |
| Octane AI              | Quizzes         | Product recommendation quiz               |

### 5.3 Analytics Stack

```
┌─────────────────────────────────────────────┐
│              Shopify Store                   │
│                                             │
│  ┌─────────┐  ┌────────┐  ┌──────────────┐ │
│  │ GA4 Tag │  │ Meta   │  │  Klaviyo     │ │
│  │ (gtag)  │  │ Pixel  │  │  Tracking   │ │
│  └────┬────┘  └───┬────┘  └──────┬───────┘ │
│       │           │              │          │
│  ┌────▼───────────▼──────────────▼───────┐  │
│  │        Shopify Customer Events        │  │
│  │    (Web Pixels / Custom Pixels)       │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
         │              │              │
    ┌────▼────┐   ┌─────▼─────┐  ┌────▼─────┐
    │  GA4    │   │ Meta Ads  │  │ Klaviyo  │
    │ Console │   │ Manager   │  │ Dashboard│
    └─────────┘   └───────────┘  └──────────┘
```

**Events tracked:**
- `page_view` — All pages
- `view_item` — PDP viewed
- `add_to_cart` — Item added
- `begin_checkout` — Checkout started
- `purchase` — Order completed
- `search` — Search performed
- `view_item_list` — Collection viewed
- `select_item` — Product card clicked

---

## 6. Development Workflow

### 6.1 Local Development

```bash
# Prerequisites
brew install node                 # Node.js 18+
npm install -g @shopify/cli       # Shopify CLI 3.x
npm install -g @shopify/theme     # Theme CLI

# Clone theme
shopify theme pull --store=ezhome-store.myshopify.com

# Local development server
shopify theme dev --store=ezhome-store.myshopify.com
# → Opens localhost:9292 with hot reload + theme editor proxy

# Check theme for issues
shopify theme check
```

### 6.2 Version Control

```
main              ← Production (auto-deploy to published theme)
├── staging       ← Pre-production testing
└── feature/*     ← Feature branches
```

**Git workflow:**
1. Create feature branch from `staging`
2. Develop locally with `shopify theme dev`
3. Push → preview via `shopify theme push --unpublished`
4. QA on unpublished theme via Shopify admin
5. Merge to `staging` → test on staging theme
6. Merge to `main` → deploy to published theme

### 6.3 Theme Deployment

```bash
# Push to unpublished theme for preview
shopify theme push --unpublished --store=ezhome-store.myshopify.com

# Push to specific theme (staging)
shopify theme push --theme=<staging-theme-id>

# Push to live theme (production)
shopify theme push --live

# Alternative: GitHub integration
# Shopify admin → Online Store → Themes → Add theme → Connect from GitHub
```

### 6.4 CI/CD Pipeline

```yaml
# .github/workflows/theme-check.yml
name: Theme Check
on:
  pull_request:
    paths: ['**/*.liquid', '**/*.json', 'assets/**']

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Shopify CLI
        run: npm install -g @shopify/cli @shopify/theme
      - name: Run Theme Check
        run: shopify theme check --fail-level error
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            ${{ secrets.PREVIEW_URL }}
          budgetPath: .lighthouserc.json
```

### 6.5 Linting & Quality

| Tool                  | Purpose                           | Config File          |
|----------------------|-----------------------------------|----------------------|
| `shopify theme check` | Liquid linting + best practices   | `.theme-check.yml`   |
| Prettier              | CSS/JS formatting                 | `.prettierrc`        |
| ESLint                | JavaScript linting                | `.eslintrc.json`     |
| Lighthouse CI         | Performance regression testing    | `.lighthouserc.json` |

```yaml
# .theme-check.yml
extends: :theme-app-extension
TemplateLength:
  enabled: true
  max_length: 600
LiquidTag:
  enabled: true
UnusedAssign:
  enabled: true
ImgWidthAndHeight:
  enabled: true
RemoteAsset:
  enabled: true
```

---

## 7. Environment Setup

### 7.1 Required Accounts & Access

| Service              | Access Level         | Purpose                    |
|---------------------|---------------------|----------------------------|
| Shopify Partner      | Owner/Staff          | Theme development          |
| Shopify Store        | Theme + App access   | Development store          |
| GitHub               | Collaborator         | Version control            |
| Klaviyo              | Admin                | Email marketing setup      |
| GA4                  | Editor               | Analytics configuration    |
| Meta Business        | Admin                | Pixel setup                |

### 7.2 Development Store Setup

```bash
# 1. Create Shopify Partner account
# 2. Create development store (free, unlimited trial)
# 3. Enable development store preview
# 4. Install Shopify CLI and authenticate

shopify auth login --store=ezhome-dev.myshopify.com

# 5. Scaffold custom theme (or start from Dawn)
shopify theme init ezhome-theme --clone-url=https://github.com/Shopify/dawn.git

# 6. Customize Dawn to EzHome specs
# → Replace sections, snippets, assets per docs 05-06
```

### 7.3 Seed Data

Create the following in the development store:

| Resource        | Count | Notes                                     |
|----------------|------|-------------------------------------------|
| Products        | 6-10  | Sofas + beds with all variant options     |
| Collections     | 5     | Sofas, Beds, Best Sellers, New, Sale      |
| Pages           | 5     | About, Contact, FAQ, Assembly, Warranty   |
| Blog posts      | 3-5   | Assembly tips, style guides               |
| Navigation      | 2     | Main menu, footer menu                    |
| Metafield defs  | 10+   | As defined in 03-data-models.md           |

---

## 8. Performance Tooling

| Tool                    | Purpose                            |
|------------------------|-------------------------------------|
| Shopify Theme Inspector | Chrome DevTool for Liquid profiling |
| Lighthouse              | Core Web Vitals auditing           |
| WebPageTest              | Detailed waterfall analysis        |
| Shopify Analytics        | Built-in speed report              |
| `shopify theme check`   | Performance-related Liquid issues  |

---

## 9. Security Considerations

| Area                   | Approach                                          |
|-----------------------|---------------------------------------------------|
| SSL                    | Automatic via Shopify (included)                  |
| PCI Compliance         | Handled by Shopify (checkout never touches theme) |
| XSS Prevention         | Liquid auto-escapes output; use `| escape` filter |
| CSRF                   | Shopify handles for all forms                     |
| CSP                    | Configure via `content_for_header`                |
| Admin Access           | 2FA required for all staff accounts               |
| API Keys               | Stored in Shopify app settings, never in theme    |
| Customer Data          | GDPR compliance via Shopify privacy settings      |

---

## 10. Cost Estimation

### Monthly Costs

| Item                          | Cost/Month  | Notes                        |
|------------------------------|------------|------------------------------|
| Shopify plan                  | $79–105    | Shopify plan                 |
| Custom domain                 | ~$1        | Annual, amortized            |
| Klaviyo                       | $0–45      | Free up to 250 contacts      |
| Judge.me                      | $0–15      | Free plan available           |
| GA4                           | Free       |                              |
| Meta Pixel                    | Free       |                              |
| Shopify Email                 | $0–1       | 10K emails free/month        |
| Additional apps (optional)    | $0–100     | Varies by app                |

**Estimated launch cost:** $79–150/month  
**At scale (Plus):** $2,300+/month

---

## 11. Migration Path (Future)

If EzHome outgrows Shopify's theme capabilities:

| Phase   | Trigger                        | Action                           |
|--------|-------------------------------|----------------------------------|
| Phase 1 | Launch                        | Shopify + Liquid theme (current) |
| Phase 2 | Need custom checkout          | Upgrade to Shopify Plus          |
| Phase 3 | Need headless storefront      | Hydrogen (Shopify's React framework) or Next.js + Storefront API |
| Phase 4 | Multi-brand / marketplace     | Shopify Plus + custom app ecosystem |

---

## 12. Revision Log

| Version | Date       | Changes                |
|---------|-----------|------------------------|
| 1.0     | 2025-02-18 | Initial Shopify version |
