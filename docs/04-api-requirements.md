# EzHome — API & Integration Requirements (Shopify)

> Shopify APIs, webhooks, and third-party integrations for the EzHome store.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## Architecture Overview

EzHome runs on **Shopify** — no custom backend needed. All data flows through Shopify's native APIs. Custom functionality is handled by Shopify apps and Liquid theme code.

```
┌─────────────────────────────────────────────────────────────┐
│                       STOREFRONT                             │
│                                                              │
│  Shopify Theme (Liquid + JS)     Shopify Mobile (Shop App)   │
│  ┌────────────────────────┐      ┌──────────────────┐        │
│  │ Online Store 2.0       │      │ Shop Pay          │        │
│  │ Sections / Blocks      │      │ 1-click checkout   │        │
│  │ Liquid templates       │      └──────────────────┘        │
│  │ Theme JS (vanilla/     │                                   │
│  │  Alpine.js)            │                                   │
│  └──────────┬─────────────┘                                   │
│             │                                                  │
├─────────────┼──────────────────────────────────────────────────┤
│             ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐      │
│  │              SHOPIFY PLATFORM                        │      │
│  │                                                      │      │
│  │  ┌──────────┐ ┌───────────┐ ┌──────────────────┐    │      │
│  │  │ AJAX API │ │ Storefront│ │ Admin API         │    │      │
│  │  │ (Cart)   │ │ API       │ │ (REST + GraphQL)  │    │      │
│  │  └────┬─────┘ │ (GraphQL) │ └────────┬─────────┘    │      │
│  │       │       └─────┬─────┘          │               │      │
│  │       │             │                │               │      │
│  │  ┌────▼─────────────▼────────────────▼──────┐        │      │
│  │  │         Shopify Core Platform             │        │      │
│  │  │  Products · Orders · Customers ·          │        │      │
│  │  │  Inventory · Discounts · Checkout         │        │      │
│  │  └──────────────────────────────────────────┘        │      │
│  │                                                      │      │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐     │      │
│  │  │ Shopify  │ │ Shopify  │ │ Shopify Files     │     │      │
│  │  │ Payments │ │ Shipping │ │ (CDN / Media)     │     │      │
│  │  │ (Stripe) │ │ Profiles │ │                   │     │      │
│  │  └──────────┘ └──────────┘ └──────────────────┘     │      │
│  └─────────────────────────────────────────────────────┘      │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                    THIRD-PARTY APPS & SERVICES                 │
│                                                                │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐     │
│  │ Klaviyo │ │ Judge.me │ │ Smile.io │ │ GA4 / Meta    │     │
│  │ (Email) │ │(Reviews) │ │(Loyalty) │ │ Pixel / GTM   │     │
│  └─────────┘ └──────────┘ └──────────┘ └───────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

---

## 1. Shopify AJAX API (Theme-Level)

Used directly in theme JavaScript for cart interactions. No authentication needed.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/cart.js` | `GET` | Get current cart (JSON) |
| `/cart/add.js` | `POST` | Add item to cart |
| `/cart/update.js` | `POST` | Update item quantities |
| `/cart/change.js` | `POST` | Change specific item |
| `/cart/clear.js` | `POST` | Empty the cart |
| `/products/:handle.js` | `GET` | Get product data (JSON) |
| `/search/suggest.json` | `GET` | Search suggestions (predictive) |
| `/recommendations/products.json` | `GET` | Product recommendations |

### Add to Cart Example

```javascript
// Theme JS — add to cart via AJAX
async function addToCart(variantId, quantity = 1) {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ id: variantId, quantity }]
    })
  });
  const data = await response.json();
  updateCartDrawer(data);
}
```

### Predictive Search

```javascript
// Theme JS — predictive search
async function searchProducts(query) {
  const response = await fetch(
    `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`
  );
  const data = await response.json();
  return data.resources.results.products;
}
```

---

## 2. Shopify Storefront API (GraphQL)

Used for headless features or custom client-side data fetching. Requires Storefront Access Token (public).

| Query | Use Case |
|-------|----------|
| `products` | Fetch product data for custom filtering UI |
| `collections` | Fetch collection with products |
| `product` by handle | PDP data (if not using Liquid) |
| `cart` mutations | Advanced cart management (Checkout API) |
| `customer` | Customer account data (with access token) |
| `productRecommendations` | Related products |

> **For EzHome:** The Storefront API is primarily needed if we build any custom JavaScript-heavy features beyond what Liquid provides (e.g., advanced filtering, dynamic product comparisons). Most functionality is handled by Liquid templates + AJAX API.

---

## 3. Shopify Admin API (Backend)

Used by Shopify apps and custom scripts. Requires authenticated access (API key + secret).

### Key Resources

| Resource | Usage |
|----------|-------|
| `Products` | Bulk import, metafield updates, variant management |
| `Orders` | Order management, fulfillment, refunds |
| `Customers` | Customer data, tagging, segmentation |
| `Inventory` | Stock level updates |
| `Discounts` | Programmatic discount creation |
| `Metafields` | Read/write custom data |
| `Metaobjects` | CRUD for FAQ, testimonials, etc. |
| `Themes` | Theme asset management |
| `Files` | Media upload and management |

> **For EzHome:** Admin API is used for initial product setup, bulk operations, and any custom app development. Day-to-day operations use the Shopify Admin UI.

---

## 4. Shopify Webhooks

Event-driven notifications from Shopify to external services.

| Webhook Topic | Subscriber | Purpose |
|---------------|-----------|---------|
| `orders/create` | Klaviyo | Trigger post-purchase email flow |
| `orders/fulfilled` | Klaviyo | Trigger delivery + assembly tips email |
| `orders/cancelled` | Klaviyo | Trigger cancellation email |
| `checkouts/create` | Klaviyo | Abandoned cart tracking |
| `customers/create` | Klaviyo, Smile.io | Add to email list, create loyalty account |
| `products/update` | Judge.me | Sync product data for review widgets |
| `inventory_levels/update` | Klaviyo | Trigger back-in-stock notifications |
| `refunds/create` | Internal | Refund notification |
| `app/uninstalled` | Internal | App cleanup |

---

## 5. Third-Party Integrations

### 5A. Payments — Shopify Payments (Stripe)

| Feature | Details |
|---------|---------|
| **Provider** | Shopify Payments (powered by Stripe) |
| **Cards** | Visa, Mastercard, Amex, Discover |
| **Express** | Apple Pay, Google Pay, Shop Pay |
| **BNPL** | Afterpay / Klarna (Shopify native) |
| **Currency** | AUD (primary), auto-convert for international |
| **PCI compliance** | Handled entirely by Shopify |
| **Fraud** | Shopify Protect (included) |

> No custom payment integration needed. All configured in Shopify Admin → Settings → Payments.

### 5B. Email & SMS — Klaviyo

| Integration | Method |
|-------------|--------|
| **Install** | Shopify app (official Klaviyo app) |
| **Sync** | Auto-syncs customers, orders, products, catalog |
| **Events tracked** | Viewed product, Added to cart, Started checkout, Placed order, Fulfilled order, Refunded |
| **Flows** | Welcome series, Abandoned cart, Post-purchase, Browse abandonment, Back in stock, Winback |
| **Forms** | Popups, flyouts, embedded signup forms |
| **Segments** | VIP, First-time buyers, Repeat, At-risk, etc. |
| **SMS** | Transactional + marketing SMS (AU numbers) |

### 5C. Reviews — Judge.me

| Feature | Details |
|---------|---------|
| **Install** | Shopify app |
| **Widget** | Product page review section, star ratings on collection cards |
| **Review request** | Auto-email after delivery (configurable delay) |
| **Photo reviews** | Customers can attach images |
| **Rich snippets** | Auto-generates `Product` schema with `aggregateRating` |
| **Import** | Bulk import reviews from CSV |
| **Moderation** | Admin approval before publish |

### 5D. Loyalty & Referrals — Smile.io

| Feature | Details |
|---------|---------|
| **Points** | Earn on purchase, review, referral, social share |
| **Referrals** | Unique link per customer, discount for both |
| **VIP tiers** | Bronze, Silver, Gold based on spend |
| **Redemption** | Points → discount code at checkout |
| **Widget** | Launcher widget in theme (bottom-right) |

### 5E. Wishlist — Wishlist King (or Growave)

| Feature | Details |
|---------|---------|
| **Install** | Shopify app |
| **Widget** | Heart icon on product cards + PDP |
| **Account** | Synced to customer account |
| **Guest** | LocalStorage for non-logged-in users |
| **Email** | "Your wishlist is waiting" emails via Klaviyo |

### 5F. Analytics & Tracking

| Service | Integration Method | Events |
|---------|--------------------|--------|
| **Google Analytics 4** | Shopify native pixel or GTM | `page_view`, `view_item`, `add_to_cart`, `begin_checkout`, `purchase` |
| **Google Tag Manager** | Custom pixel or Shopify GTM app | Container for all tags |
| **Meta Pixel** | Shopify native pixel | `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase` |
| **TikTok Pixel** | Shopify TikTok app | Same e-commerce events |
| **Google Search Console** | Verify domain | Indexing, search performance |
| **Microsoft Clarity** | Script injection via theme | Heatmaps, session recordings |
| **Shopify Analytics** | Built-in | Sales, sessions, conversion rate, AOV |

### 5G. Shipping

| Provider | Method |
|----------|--------|
| **Australia Post** | Shopify Shipping (native rates) or carrier-calculated |
| **StarTrack** | Via shipping app (e.g., Shippit) |
| **Sendle** | Shopify app (eco-friendly courier) |

> Shipping rates configured in Shopify Admin → Settings → Shipping and delivery. Weight-based or price-based rules. Free shipping over threshold via Shopify automatic discount.

---

## 6. Shopify Liquid API (Theme Data Access)

Objects available in Liquid templates — no API calls needed.

| Object | Available In | Key Properties |
|--------|-------------|----------------|
| `product` | `product.liquid` | `.title`, `.price`, `.variants`, `.images`, `.metafields`, `.description` |
| `collection` | `collection.liquid` | `.title`, `.products`, `.all_products_count`, `.sort_options` |
| `cart` | All templates | `.items`, `.total_price`, `.item_count`, `.requires_shipping` |
| `customer` | Account templates | `.name`, `.email`, `.orders`, `.addresses`, `.tags` |
| `shop` | All templates | `.name`, `.url`, `.currency`, `.money_format` |
| `page` | `page.liquid` | `.title`, `.content`, `.metafields` |
| `article` | `article.liquid` | `.title`, `.content`, `.author`, `.image`, `.tags` |
| `blog` | `blog.liquid` | `.title`, `.articles`, `.all_tags` |
| `search` | `search.liquid` | `.terms`, `.results`, `.results_count` |
| `order` | `customers/order.liquid` | `.name`, `.line_items`, `.total_price`, `.fulfillment_status` |
| `recommendations` | Section via API | `.products` (related products) |
| `predictive_search` | Search section | `.resources.products`, `.resources.collections` |

---

## 7. Theme App Extensions

Shopify apps inject UI into the theme via **theme app extensions** (no manual code editing).

| App | Extension Point | Description |
|-----|----------------|-------------|
| Judge.me | Product page block, Collection card badge | Review widget, star ratings |
| Smile.io | Floating widget (global) | Loyalty launcher |
| Wishlist King | Product card button, PDP button | Heart / wishlist toggle |
| Klaviyo | Global script, Popup overlay | Email capture forms |
| Shopify Search & Discovery | Collection page | Enhanced filtering + sort |

---

## 8. Custom App (If Needed)

For any functionality beyond Shopify + apps, a lightweight Shopify app can be built.

### Potential Custom App Use Cases

| Feature | Approach |
|---------|----------|
| Advanced product configurator | Theme app extension (React embedded) |
| Custom shipping calculator | Shopify Functions (carrier service) |
| Wholesale / B2B pricing | Shopify app with customer tags |
| Assembly AR viewer | Theme JS + model-viewer web component |

### Tech Stack for Custom App

| Layer | Technology |
|-------|-----------|
| Frontend | Shopify Polaris (admin UI) or theme extension (storefront) |
| Backend | Node.js / Express or Remix (Shopify CLI scaffold) |
| Auth | Shopify OAuth (app auth flow) |
| Database | SQLite or PostgreSQL (for app-specific data only) |
| Hosting | Shopify app hosting or Fly.io / Railway |
| CLI | Shopify CLI (`shopify app dev`) |

> **For EzHome MVP:** No custom app needed. Shopify + Liquid theme + installed apps cover all requirements.
