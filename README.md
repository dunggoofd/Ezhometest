# EzHome — Shopify E-commerce Store

> DTC e-commerce store selling compression sofas and beds that are lightweight and assemble in 10 minutes. Built on Shopify Online Store 2.0.

## 🛋️ About

EzHome makes premium furniture that fits in a box. Our compression sofas and beds ship directly to your door, require zero tools, and set up in under 10 minutes.

**Platform:** Shopify Online Store 2.0  
**Theme:** Custom Liquid theme (based on Dawn)  
**Brand:** Minimal & Playful — Transformer Table–inspired aesthetic

## 📚 Documentation

All planning documents are in the [`docs/`](./docs/) folder:

| # | Document | Description |
|---|----------|-------------|
| 01 | [Site Map](./docs/01-site-map.md) | Shopify URL hierarchy — products, collections, pages, blog, customer accounts |
| 02 | [User Flows](./docs/02-user-flows.md) | 3 primary journeys: Browse→Purchase, Registration→First Buy, Return→Reorder |
| 03 | [Data Models](./docs/03-data-models.md) | Shopify resources — Products, Variants, Collections, Metafields, Customers, Orders |
| 04 | [API Requirements](./docs/04-api-requirements.md) | Storefront API (GraphQL), Admin API, Ajax API, webhooks, third-party integrations |
| 05 | [Component Inventory](./docs/05-component-inventory.md) | Shopify Liquid sections, blocks, and snippets for the theme |
| 06 | [Page Templates](./docs/06-page-templates.md) | 25 JSON templates — index, product, collection, page variants, blog, customer, cart, 404 |
| 07 | [Tech Stack](./docs/07-tech-stack.md) | Shopify + Liquid + Shopify CLI, CSS/JS strategy, third-party apps, dev workflow |
| 08 | [Performance Budgets](./docs/08-performance-budgets.md) | Core Web Vitals targets, asset budgets, Liquid rendering rules, image optimization |
| 09 | [SEO Structure](./docs/09-seo-structure.md) | URL strategy, meta tags, JSON-LD structured data, sitemap, robots.txt, content SEO |
| 10 | [Component Logic](./docs/10-component-logic.md) | Vanilla JS Web Components — cart drawer, variant picker, search, tabs, accordion |
| 11 | [Figma Make Prompts](./docs/11-figma-make-prompts.md) | 5 AI-design prompts for the compression sofa product page |
| 12 | [Hero Motion Spec](./docs/12-hero-motion-spec.md) | CSS animation spec — load sequence, scroll, hover, click, gesture interactions |
| 13 | [Responsive Spec](./docs/13-responsive-spec.md) | Breakpoint strategy, content priority map for 375→768→1440px |
| 14 | [Data Integration](./docs/14-data-integration.md) | Shopify data architecture — metafields, API patterns, webhooks, Klaviyo, GA4, reviews |

## 🎨 Design System

The [`design-system/`](./design-system/) folder contains:

| File | Description |
|------|-------------|
| [tokens.json](./design-system/tokens.json) | Design tokens — colors, typography, spacing, radii, shadows |
| [variables.css](./design-system/variables.css) | CSS custom properties generated from tokens |
| [README.md](./design-system/README.md) | 30 component specifications (C01–C30) with variants, states, and accessibility |

## 📝 Copy Deck

| File | Description |
|------|-------------|
| [Copy Deck](./docs/copy-deck-compression-sofa.md) | ~123 Figma layers of copy for hero, features, product cards, CTA, footer, and more |

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Platform | Shopify Online Store 2.0 |
| Theme | Liquid + JSON templates |
| Styling | CSS custom properties + BEM |
| JavaScript | Vanilla ES modules (Web Components) |
| Build Tool | Shopify CLI 3.x |
| Email | Klaviyo |
| Analytics | GA4 + Meta Pixel |
| Reviews | Judge.me |
| Payments | Shopify Payments + Afterpay |

## 🎯 Brand

| Token | Value |
|-------|-------|
| Primary (Ink) | `#141416` |
| White | `#FFFFFF` |
| Background (Cream) | `#FBF9F5` |
| Accent (Sage) | `#3A6B3A` |
| CTA (Coral) | `#FF6B42` |
| Display Font | Instrument Sans 700 |
| Body Font | Inter 400/500/600 |

## 🚀 Getting Started

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Clone / pull theme
shopify theme pull --store=ezhome-store.myshopify.com

# Start local development
shopify theme dev --store=ezhome-store.myshopify.com

# Run theme linter
shopify theme check

# Deploy to staging
shopify theme push --unpublished
```

## 📁 Project Structure

```
Ezhometest/
├── README.md                              ← This file
├── design-system/
│   ├── tokens.json                        ← Design tokens
│   ├── variables.css                      ← CSS custom properties
│   └── README.md                          ← Component specs (C01–C30)
└── docs/
    ├── 01-site-map.md                     ← Shopify URL hierarchy
    ├── 02-user-flows.md                   ← User journeys
    ├── 03-data-models.md                  ← Shopify data resources
    ├── 04-api-requirements.md             ← API specifications
    ├── 05-component-inventory.md          ← Liquid sections/blocks/snippets
    ├── 06-page-templates.md               ← JSON template definitions
    ├── 07-tech-stack.md                   ← Technology stack
    ├── 08-performance-budgets.md          ← Performance targets
    ├── 09-seo-structure.md                ← SEO strategy
    ├── 10-component-logic.md              ← Interactive JS components
    ├── 11-figma-make-prompts.md           ← Design prompts
    ├── 12-hero-motion-spec.md             ← Animation spec
    ├── 13-responsive-spec.md              ← Responsive design
    ├── 14-data-integration.md             ← Data & integrations
    └── copy-deck-compression-sofa.md      ← Marketing copy
```
