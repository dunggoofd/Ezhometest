# EzHome — Component Inventory (Shopify Liquid)

> Theme sections, blocks, and snippets for the EzHome Shopify Online Store 2.0 theme.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## Shopify Theme Architecture

```
Online Store 2.0 — JSON Templates + Sections + Blocks

templates/           ← JSON templates (assign sections to pages)
sections/            ← Reusable sections (each = a page module)
  └── blocks         ← Configurable sub-units within sections
snippets/            ← Reusable Liquid partials (called with {% render %})
assets/              ← CSS, JS, images, fonts
layout/              ← theme.liquid (main wrapper)
config/              ← settings_schema.json (global theme settings)
locales/             ← Translation files (en.default.json)
```

### Key Concept: Sections Everywhere

In Online Store 2.0, **every page** is a JSON template that assembles sections. Sections are the building blocks — each one is a self-contained module with its own Liquid, CSS, JS, and schema (settings).

---

## 1. GLOBAL SECTIONS (Layout-Level)

These appear on every page via `layout/theme.liquid`.

### S-G01 — Announcement Bar

| Property | Value |
|----------|-------|
| **File** | `sections/announcement-bar.liquid` |
| **Type** | Global (layout) |
| **Blocks** | `announcement_message` (repeatable) |
| **Settings** | Background colour, text colour, auto-rotate speed, dismissible toggle |
| **Behaviour** | Rotates through messages. Dismissible via × button. Cookie stores dismissed state (24h). |
| **Mobile** | Full-width, text wraps to 2 lines max |

### S-G02 — Header / Navigation

| Property | Value |
|----------|-------|
| **File** | `sections/header.liquid` |
| **Type** | Global (layout) |
| **Blocks** | `nav_link`, `mega_menu`, `icon_link` (cart, search, account) |
| **Settings** | Logo image, logo width, sticky on/off, transparent on homepage, menu handle |
| **Desktop** | Logo left, nav links center, icons right (search, cart badge, account) |
| **Mobile** | Logo left, hamburger right → drawer with nav + CTA |
| **Snippets used** | `snippet-cart-icon.liquid`, `snippet-search-icon.liquid`, `snippet-mobile-drawer.liquid` |
| **JS** | Sticky scroll behaviour, mobile drawer toggle, AJAX cart count update |

### S-G03 — Footer

| Property | Value |
|----------|-------|
| **File** | `sections/footer.liquid` |
| **Type** | Global (layout) |
| **Blocks** | `link_column` (×4), `newsletter`, `social_links`, `payment_icons` |
| **Settings** | Background colour, text colour, show payment icons toggle, copyright text |
| **Desktop** | 4-column links + newsletter |
| **Mobile** | Accordion columns, stacked newsletter |
| **Snippets used** | `snippet-newsletter-form.liquid`, `snippet-social-icons.liquid` |

### S-G04 — Cart Drawer

| Property | Value |
|----------|-------|
| **File** | `sections/cart-drawer.liquid` |
| **Type** | Global (layout, hidden until triggered) |
| **Settings** | Free shipping threshold, show cross-sell toggle, empty cart message |
| **Behaviour** | Slides in from right on add-to-cart. AJAX-powered (Cart API). |
| **Content** | Cart items with quantity controls, subtotal, free delivery progress bar, cross-sell row, checkout CTA |
| **Snippets used** | `snippet-cart-item.liquid`, `snippet-free-shipping-bar.liquid` |
| **JS** | `cart-drawer.js` — fetch `/cart.js`, add/remove/update via AJAX API |

### S-G05 — Cookie Consent Banner

| Property | Value |
|----------|-------|
| **File** | `sections/cookie-banner.liquid` |
| **Type** | Global (layout) |
| **Settings** | Message text, button text, privacy page link |
| **Behaviour** | Bottom bar, accept/dismiss, stores consent in cookie |

---

## 2. HOMEPAGE SECTIONS

Assembled in `templates/index.json`.

### S-H01 — Hero Banner

| Property | Value |
|----------|-------|
| **File** | `sections/hero-banner.liquid` |
| **Blocks** | `slide` (up to 5 — carousel or single hero) |
| **Block settings** | Heading, subheading, CTA text, CTA link, background image (desktop + mobile), overlay opacity, text alignment |
| **Settings** | Auto-play speed, show dots, full-height toggle, minimum height |
| **Desktop** | Full-bleed image, centred or left-aligned text, dual CTAs |
| **Mobile** | Full viewport height (`100svh`), portrait-cropped image, stacked CTAs |

### S-H02 — Featured Collection

| Property | Value |
|----------|-------|
| **File** | `sections/featured-collection.liquid` |
| **Settings** | Collection handle, heading, product count (4/6/8), show "View All" link |
| **Content** | Product card grid from selected collection |
| **Desktop** | 4-column grid |
| **Mobile** | Horizontal scroll carousel or 2-column grid |
| **Snippets used** | `snippet-product-card.liquid` |

### S-H03 — Feature Blocks (Image + Text)

| Property | Value |
|----------|-------|
| **File** | `sections/feature-blocks.liquid` |
| **Blocks** | `feature_block` (repeatable, 1-4) |
| **Block settings** | Eyebrow, heading, body text, image, stat number, stat label, image position (left/right) |
| **Settings** | Background colour (white/cream), section heading |
| **Desktop** | Alternating 2-column (image left / image right) |
| **Mobile** | Single column, image on top |

### S-H04 — How It Works (Steps)

| Property | Value |
|----------|-------|
| **File** | `sections/how-it-works.liquid` |
| **Blocks** | `step` (repeatable, typically 3) |
| **Block settings** | Step number, icon/image, heading, body text |
| **Settings** | Section heading, subheading, background colour |
| **Desktop** | 3-column grid with numbered steps |
| **Mobile** | Single column stack |

### S-H05 — Social Proof Bar (Stats)

| Property | Value |
|----------|-------|
| **File** | `sections/social-proof-bar.liquid` |
| **Blocks** | `stat` (repeatable, 3-4) |
| **Block settings** | Number, label, icon (optional) |
| **Settings** | Background colour, text alignment |
| **Desktop** | Horizontal row with dividers |
| **Mobile** | 2×2 grid |

### S-H06 — Testimonial Carousel

| Property | Value |
|----------|-------|
| **File** | `sections/testimonials.liquid` |
| **Blocks** | `testimonial` (repeatable) or metaobject source |
| **Block settings** | Quote text, author name, author detail, rating (1-5), verified badge |
| **Settings** | Section heading, auto-advance, cards per view (desktop: 3, mobile: 1) |
| **Desktop** | 3-card carousel with arrow buttons |
| **Mobile** | Single card swipeable, dot indicators |

### S-H07 — Press / As Featured In

| Property | Value |
|----------|-------|
| **File** | `sections/press-logos.liquid` |
| **Blocks** | `logo` (repeatable) or metaobject source |
| **Block settings** | Logo image, publication name, link URL |
| **Settings** | Label text ("As featured in"), greyscale toggle |
| **Desktop** | Horizontal logo row |
| **Mobile** | Horizontal scroll (3 visible + peek) |

### S-H08 — Newsletter CTA Band

| Property | Value |
|----------|-------|
| **File** | `sections/newsletter-cta.liquid` |
| **Settings** | Heading, body text, background colour, incentive text ("Get 10% off") |
| **Content** | Email input + subscribe button (Klaviyo form or Shopify customer form) |

### S-H09 — Pre-Footer CTA Band

| Property | Value |
|----------|-------|
| **File** | `sections/cta-band.liquid` |
| **Settings** | Heading, subheading, CTA text, CTA link, background colour (ink-900 default) |
| **Content** | Dark band with headline, value props, and "Shop Now" button |

### S-H10 — Image Comparison Slider

| Property | Value |
|----------|-------|
| **File** | `sections/image-comparison.liquid` |
| **Settings** | Before image, after image, before label, after label, heading |
| **Behaviour** | Drag handle reveals before/after. Touch-friendly. |
| **JS** | `image-comparison.js` — pointer event handling |

### S-H11 — Video Embed

| Property | Value |
|----------|-------|
| **File** | `sections/video-embed.liquid` |
| **Settings** | Video URL (YouTube/Vimeo), cover image, heading, autoplay toggle |
| **Behaviour** | Click-to-play with poster image overlay. Lazy-loads iframe. |

---

## 3. COLLECTION PAGE SECTIONS

Assembled in `templates/collection.json`.

### S-C01 — Collection Hero

| Property | Value |
|----------|-------|
| **File** | `sections/collection-hero.liquid` |
| **Settings** | Show collection image, show description, text alignment |
| **Content** | Collection title, description, product count. Uses collection object. |

### S-C02 — Product Grid (Main)

| Property | Value |
|----------|-------|
| **File** | `sections/product-grid.liquid` |
| **Settings** | Products per row (2/3/4), enable filtering, enable sorting, products per page (12/24/36) |
| **Content** | Paginated product grid using `collection.products`. Filters via Shopify Storefront Filtering API. |
| **Snippets used** | `snippet-product-card.liquid`, `snippet-active-filters.liquid`, `snippet-pagination.liquid` |
| **JS** | `collection-filters.js` — AJAX filtering without full page reload |

### S-C03 — Collection FAQ

| Property | Value |
|----------|-------|
| **File** | `sections/collection-faq.liquid` |
| **Settings** | Heading, FAQ source (metaobject or manual blocks) |
| **Blocks** | `faq_item` — question + answer |

---

## 4. PRODUCT PAGE (PDP) SECTIONS

Assembled in `templates/product.json`.

### S-P01 — Product Hero (Gallery + Info)

| Property | Value |
|----------|-------|
| **File** | `sections/product-hero.liquid` |
| **Settings** | Gallery style (thumbnails below / side), enable zoom, enable video |
| **Content** | Image gallery (thumbnails, lightbox, video) + product info (title, price, variant selectors, add-to-cart, trust badges) |
| **Blocks** | `variant_picker` (colour swatches, size pills), `buy_buttons`, `trust_badges`, `description`, `delivery_estimate`, `afterpay_message` |
| **Snippets used** | `snippet-product-gallery.liquid`, `snippet-variant-picker.liquid`, `snippet-buy-buttons.liquid`, `snippet-price.liquid` |
| **JS** | `product-form.js` — variant selection, price update, image swap, AJAX add-to-cart |

### S-P02 — Product Tabs / Accordion (Specs)

| Property | Value |
|----------|-------|
| **File** | `sections/product-tabs.liquid` |
| **Blocks** | `tab` — each with title + content (rich text, metafield, or HTML) |
| **Default tabs** | Description, Specifications (from metafield `specs_table`), Dimensions, Care Instructions |
| **Desktop** | Horizontal tabs |
| **Mobile** | Accordion |

### S-P03 — How It Works (PDP)

| Property | Value |
|----------|-------|
| **File** | Reuses `sections/how-it-works.liquid` |
| **Context** | Assembly process specific to this product (pulls from metafields or theme settings) |

### S-P04 — Product Reviews

| Property | Value |
|----------|-------|
| **File** | `sections/product-reviews.liquid` |
| **Content** | Judge.me widget embed or Shopify Product Reviews app |
| **Settings** | Show rating summary, show photo reviews, reviews per page |

### S-P05 — Product FAQ

| Property | Value |
|----------|-------|
| **File** | `sections/product-faq.liquid` |
| **Settings** | Heading, source (product metafield `faq_entries` or manual blocks) |
| **Blocks** | `faq_item` — question + answer |

### S-P06 — Related Products

| Property | Value |
|----------|-------|
| **File** | `sections/related-products.liquid` |
| **Settings** | Heading, product count (4/8), source (Shopify recommendations API) |
| **Snippets used** | `snippet-product-card.liquid` |
| **JS** | Fetches `/recommendations/products.json?product_id=X&limit=4` |

### S-P07 — Sticky Add-to-Cart Bar

| Property | Value |
|----------|-------|
| **File** | `sections/sticky-add-to-cart.liquid` |
| **Settings** | Enable/disable, show product name, show price |
| **Behaviour** | Fixed bar appears when main buy button scrolls out of view. IntersectionObserver trigger. |
| **Desktop** | Product name + price + "Add to Cart" + trust text |
| **Mobile** | Price + full-width "Add to Cart" only |
| **JS** | `sticky-bar.js` — scroll visibility toggle |

### S-P08 — Cross-Sell / Upsell Band

| Property | Value |
|----------|-------|
| **File** | `sections/cross-sell-band.liquid` |
| **Settings** | Heading ("Complete the look"), collection handle (accessories), product count |
| **Snippets used** | `snippet-product-card.liquid` (compact variant) |

---

## 5. CONTENT PAGE SECTIONS

Used in `templates/page.*.json` alternate templates.

### S-X01 — Rich Text

| Property | Value |
|----------|-------|
| **File** | `sections/rich-text.liquid` |
| **Settings** | Heading, body (rich text), text width (narrow/medium/wide), alignment |

### S-X02 — FAQ Page

| Property | Value |
|----------|-------|
| **File** | `sections/faq-page.liquid` |
| **Blocks** | `category` (with nested `faq_item` blocks) or metaobject-sourced |
| **Settings** | Heading, subheading, contact CTA link |
| **Behaviour** | Single-expand accordion per category |

### S-X03 — Assembly Guide

| Property | Value |
|----------|-------|
| **File** | `sections/assembly-guide.liquid` |
| **Source** | Metaobject `assembly_step` entries or manual blocks |
| **Content** | Numbered steps with image/video + text |
| **Settings** | Heading, video embed (master assembly video) |

### S-X04 — Contact Form

| Property | Value |
|----------|-------|
| **File** | `sections/contact-form.liquid` |
| **Content** | Shopify native `{% form 'contact' %}` with name, email, phone, message, subject dropdown |
| **Settings** | Heading, body text, show phone field toggle |

### S-X05 — About / Story

| Property | Value |
|----------|-------|
| **File** | `sections/about-story.liquid` |
| **Blocks** | `content_block` (image + text, alternating layout) |
| **Settings** | Section heading |

### S-X06 — Shipping & Returns

| Property | Value |
|----------|-------|
| **File** | `sections/policy-content.liquid` |
| **Settings** | Uses Shopify `shop.policies` object or rich text blocks |

---

## 6. ACCOUNT PAGE SECTIONS

Used in `templates/customers/*.liquid` templates.

### S-A01 — Login Form

| Property | Value |
|----------|-------|
| **File** | `sections/customer-login.liquid` |
| **Content** | Email + password form, "Forgot password" link, "Create account" link |

### S-A02 — Registration Form

| Property | Value |
|----------|-------|
| **File** | `sections/customer-register.liquid` |
| **Content** | First name, last name, email, password, marketing opt-in checkbox |

### S-A03 — Account Dashboard

| Property | Value |
|----------|-------|
| **File** | `sections/customer-account.liquid` |
| **Content** | Order history table, account details, default address, "Log out" button |

### S-A04 — Order Detail

| Property | Value |
|----------|-------|
| **File** | `sections/customer-order.liquid` |
| **Content** | Order summary, line items, shipping address, fulfillment status |

### S-A05 — Address Book

| Property | Value |
|----------|-------|
| **File** | `sections/customer-addresses.liquid` |
| **Content** | List of saved addresses, add/edit/delete, set default |

---

## 7. UTILITY SECTIONS

### S-U01 — Search Results

| Property | Value |
|----------|-------|
| **File** | `sections/search-results.liquid` |
| **Content** | Search input + results grid (products, pages, articles) |
| **Settings** | Products per page, show articles toggle |
| **Snippets used** | `snippet-product-card.liquid` |

### S-U02 — 404 Page

| Property | Value |
|----------|-------|
| **File** | `sections/404.liquid` |
| **Settings** | Heading, body text, CTA link, show featured collection |

### S-U03 — Password Page

| Property | Value |
|----------|-------|
| **File** | `sections/password.liquid` |
| **Settings** | Heading, message, background image, newsletter signup |

---

## 8. SNIPPETS (Reusable Partials)

Called via `{% render 'snippet-name' %}` — no schema, pure Liquid.

| Snippet | Description | Used In |
|---------|-------------|---------|
| `snippet-product-card.liquid` | Product card: image, title, price, badge, swatches, quick-add | Featured collection, product grid, related products, search |
| `snippet-price.liquid` | Price display: current price, compare-at, currency format | Product card, PDP, cart, sticky bar |
| `snippet-variant-picker.liquid` | Colour swatches + size pills, connected to JS variant logic | PDP hero |
| `snippet-buy-buttons.liquid` | Add to cart button + dynamic checkout buttons (Shop Pay, Apple Pay) | PDP hero, sticky bar |
| `snippet-product-gallery.liquid` | Image gallery with thumbnails, lightbox, video support | PDP hero |
| `snippet-cart-item.liquid` | Cart line item: image, title, variant, quantity, price, remove | Cart drawer, cart page |
| `snippet-free-shipping-bar.liquid` | Progress bar toward free shipping threshold | Cart drawer |
| `snippet-breadcrumbs.liquid` | Breadcrumb navigation from page hierarchy | PDP, collection, blog, pages |
| `snippet-pagination.liquid` | Page numbers, prev/next for collections and search | Product grid, search results |
| `snippet-active-filters.liquid` | Active filter pills with "Clear all" for collection filtering | Product grid |
| `snippet-social-icons.liquid` | Social media icon links | Footer |
| `snippet-newsletter-form.liquid` | Email signup form (Shopify or Klaviyo) | Footer, newsletter section |
| `snippet-trust-badges.liquid` | Row of trust icons (free delivery, trial, assembly time) | PDP, cart drawer |
| `snippet-star-rating.liquid` | Star icons from rating number (1-5) | Product card, review card, testimonial |
| `snippet-announcement-message.liquid` | Single announcement message with optional link | Announcement bar |
| `snippet-seo-jsonld.liquid` | JSON-LD structured data output | Product, collection, article, homepage |
| `snippet-responsive-image.liquid` | `<img>` with srcset, sizes, lazy loading, aspect ratio | Everywhere |

---

## 9. JAVASCRIPT MODULES

Theme JS — vanilla JavaScript (no framework) or Alpine.js for reactivity.

| Module | File | Description |
|--------|------|-------------|
| `cart-drawer.js` | `assets/cart-drawer.js` | AJAX cart: add, update, remove, render drawer |
| `product-form.js` | `assets/product-form.js` | Variant selection, price update, image swap, add-to-cart |
| `collection-filters.js` | `assets/collection-filters.js` | AJAX filtering + sort without page reload |
| `sticky-bar.js` | `assets/sticky-bar.js` | IntersectionObserver for sticky add-to-cart visibility |
| `image-comparison.js` | `assets/image-comparison.js` | Before/after slider with pointer events |
| `predictive-search.js` | `assets/predictive-search.js` | Search-as-you-type via `/search/suggest.json` |
| `announcement-bar.js` | `assets/announcement-bar.js` | Message rotation, dismiss with cookie |
| `mobile-drawer.js` | `assets/mobile-drawer.js` | Hamburger menu drawer, focus trap, body scroll lock |
| `gallery.js` | `assets/gallery.js` | Thumbnail navigation, lightbox, swipe, zoom, video play |
| `accordion.js` | `assets/accordion.js` | Generic accordion (FAQ, footer, product tabs on mobile) |
| `quantity-selector.js` | `assets/quantity-selector.js` | Plus/minus buttons, input validation |
| `scroll-animations.js` | `assets/scroll-animations.js` | IntersectionObserver-based reveal animations |

---

## 10. CSS ARCHITECTURE

| File | Purpose |
|------|---------|
| `assets/base.css` | CSS reset, custom properties (from design tokens), typography, global utilities |
| `assets/component-*.css` | Per-section styles (loaded only when section is used via `{% stylesheet %}`) |
| `assets/critical.css` | Inlined in `<head>` — above-fold styles (header, hero, product card) |

### CSS Custom Properties (from Design System)

```css
:root {
  /* Colours */
  --color-ink-900: #141416;
  --color-white: #FFFFFF;
  --color-cream-100: #FBF9F5;
  --color-sage-600: #3A6B3A;
  --color-coral-500: #FF6B42;

  /* Typography */
  --font-display: 'Instrument Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing (8px grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radius */
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* Animation */
  --ease-smooth: cubic-bezier(0.4, 0, 0, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
}
```

---

## Component Count Summary

| Category | Count |
|----------|-------|
| Global sections | 5 |
| Homepage sections | 11 |
| Collection sections | 3 |
| PDP sections | 8 |
| Content page sections | 6 |
| Account sections | 5 |
| Utility sections | 3 |
| Snippets | 17 |
| JS modules | 12 |
| **Total theme components** | **70** |
