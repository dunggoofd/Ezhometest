# EzHome — User Flows (Shopify)

> 3 primary user journeys for the EzHome Shopify store.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## Flow 1: Browse → Product Detail → Purchase

```
┌─────────────────────────┐
│  Entry Point             │
│  • Homepage              │
│  • Instagram / TikTok ad │
│  • Google search         │
│  • Direct collection URL │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Collection Page          │
│  /collections/sofas       │
│  • Browse product grid    │
│  • Filter by type/colour  │
│    (Shopify native or     │
│     Search & Discovery)   │
│  • Sort (price, best-     │
│    selling, newest)       │
└──────┬───────────────────┘
       │  Click product card
       ▼
┌──────────────────────────┐
│  Product Detail Page      │
│  /products/:handle        │
│  • View image gallery     │
│  • Watch assembly video   │
│  • Select colour (variant)│
│  • Select size (variant)  │
│  • Read reviews (Judge.me │
│    or Shopify Reviews)    │
│  • Check FAQ accordion    │
│  • See specs table        │
└──────┬───────────────────┘
       │
       ├──── [Wishlist] ──► Wishlist app (Wishlist King / Growave)
       │
       ▼
┌──────────────────────────┐
│  Add to Cart              │
│  • Select variant         │
│  • Choose quantity        │
│  • Click "Add to Cart"    │
│  • AJAX cart drawer opens │
│    (Shopify Cart API)     │
│  • Cross-sell shown       │
│    (Shopify Recs or app)  │
└──────┬───────────────────┘
       │  "Checkout"
       ▼
┌──────────────────────────┐
│  Shopify Checkout         │
│  /checkouts/:token        │
│  • Contact info           │
│  • Shipping address       │
│    (Google autocomplete)  │
│  • Shipping method        │
│    (rates from Shopify    │
│     Shipping settings)    │
│  • Payment                │
│    (Shopify Payments =    │
│     Stripe: card, Apple   │
│     Pay, Google Pay,      │
│     Afterpay / Klarna)    │
│  • Discount code field    │
│  • Place Order            │
└──────┬───────────────────┘
       │  Submit
       ▼
┌──────────────────────────┐
│  Thank You Page           │
│  /checkouts/:token/       │
│    thank_you              │
│  • Order summary          │
│  • Tracking info          │
│  • "Create account" prompt│
│  • Assembly guide link    │
│  • Share / referral CTA   │
│  • Conversion tracking    │
│    (GA4, Meta Pixel,      │
│     TikTok Pixel)         │
└──────────────────────────┘
```

### Key Decision Points

| Step | Decision | Path A | Path B |
|------|----------|--------|--------|
| Collection | Category? | Sofas | Beds / Accessories |
| PDP | Which variant? | Select colour + size | Default variant |
| Cart drawer | Continue shopping? | Back to shop | Proceed to checkout |
| Checkout | Guest or account? | Guest checkout | Log in (Shopify accounts) |
| Checkout | Payment method? | Credit card | Afterpay / Apple Pay / Google Pay |
| Thank you | Create account? | Register (order linked) | Continue as guest |

### Metrics to Track (GA4 + Shopify Analytics)

- Collection-to-PDP click rate
- PDP-to-AddToCart conversion (`add_to_cart` event)
- Cart abandonment rate (Shopify abandoned checkout emails)
- Checkout step drop-off (Shopify Plus: checkout analytics)
- Average order value (AOV) — Shopify Analytics
- Payment method distribution — Shopify Payments dashboard

---

## Flow 2: New Customer → Email Capture → First Purchase

```
┌─────────────────────────┐
│  Entry Point             │
│  • Exit-intent popup     │
│    (Klaviyo / Privy)     │
│  • Newsletter form       │
│    (footer or flyout)    │
│  • "Get 10% off" banner  │
│  • Social ad landing     │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Email Capture            │
│  • Enter email address    │
│  • Klaviyo form submit    │
│  • Auto-tagged in Klaviyo │
│    as "Welcome Flow"      │
└──────┬───────────────────┘
       │  Confirmation
       ▼
┌──────────────────────────┐
│  Welcome Email Flow       │
│  (Klaviyo automation)     │
│  • Email 1 (instant):     │
│    Welcome + 10% code     │
│  • Email 2 (Day 2):       │
│    "How It Works" video   │
│  • Email 3 (Day 4):       │
│    Social proof / reviews │
│  • Email 4 (Day 7):       │
│    Last chance for code   │
└──────┬───────────────────┘
       │  Clicks "Shop Now"
       ▼
┌──────────────────────────┐
│  Landing → PDP → Cart     │
│  • Browses collection     │
│  • Selects product        │
│  • Discount auto-applied  │
│    at checkout (Shopify   │
│     automatic discount    │
│     or manual code)       │
└──────┬───────────────────┘
       │  Checkout
       ▼
┌──────────────────────────┐
│  Post-Purchase Flow       │
│  (Klaviyo automation)     │
│  • Order confirmation     │
│  • Shipping notification  │
│    (Shopify transactional)│
│  • Delivery + assembly    │
│    tips email             │
│  • Review request (Day 7  │
│    post-delivery, Judge.me│
│    or Klaviyo)            │
│  • Referral invite (Day   │
│    14, Smile.io / manual) │
└──────────────────────────┘
```

### Key Decision Points

| Step | Decision | Path A | Path B |
|------|----------|--------|--------|
| Popup | Engages? | Submits email | Dismisses (retarget later) |
| Email flow | Opens/clicks? | Converts to site visit | Re-engagement email |
| Checkout | Uses code? | 10% off applied | Forgets — abandoned cart email |
| Post-purchase | Leaves review? | Review → loyalty program | Review request reminder |

### Metrics to Track

- Popup conversion rate (Klaviyo analytics)
- Welcome flow open rate / click rate
- Welcome discount redemption rate
- Time to first purchase
- Review submission rate (Judge.me dashboard)
- Abandoned cart recovery rate (Shopify + Klaviyo)

---

## Flow 3: Returning Customer → Reorder / Cross-sell

```
┌─────────────────────────┐
│  Entry Point             │
│  • "Back in stock" email │
│    (Klaviyo)             │
│  • New drop email        │
│  • Retargeting ad        │
│    (Meta / Google)       │
│  • Direct visit          │
│  • SMS campaign          │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Homepage / Collection    │
│  • New arrivals banner    │
│  • "Back in stock" badges │
│  • Shopify product recs   │
│    (Related Products API) │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Product Detail Page      │
│  • Cross-sell section     │
│    ("Complete the set"    │
│     covers, accessories)  │
│  • Upsell in cart drawer  │
│    ("You might also like")│
└──────┬───────────────────┘
       │  Add to Cart
       ▼
┌──────────────────────────┐
│  Shopify Checkout         │
│  • Saved info (if logged  │
│    in via Shop Pay)       │
│  • Express checkout       │
│    (Shop Pay 1-click,     │
│     Apple Pay, Google Pay)│
└──────┬───────────────────┘
       │  Purchase
       ▼
┌──────────────────────────┐
│  Post-Purchase            │
│  • Confirmation           │
│  • Assembly reminder      │
│  • Cross-sell follow-up   │
│    (Klaviyo: "Your sofa   │
│     deserves new covers") │
│  • Loyalty program nudge  │
│    (Smile.io)             │
└──────────────────────────┘
```

### Key Decision Points

| Step | Decision | Path A | Path B |
|------|----------|--------|--------|
| Entry | New product or accessory? | Browses new drops | Reorders covers |
| PDP | Cross-sell accepted? | Adds complementary item | Single product |
| Checkout | Express or full? | Shop Pay 1-click | Updates info |

### Metrics to Track

- Returning customer rate (Shopify Analytics)
- Email/SMS-to-purchase conversion (Klaviyo)
- Cross-sell acceptance rate
- AOV (returning vs new) — Shopify Analytics
- Customer lifetime value (LTV) — Shopify + Klaviyo
- Repeat purchase interval

---

## Flow Summary Matrix

| Flow | Primary User | Entry | Exit (Success) | Key Shopify Tools |
|------|-------------|-------|----------------|-------------------|
| Browse → Purchase | New visitor | Homepage / Ad | Order confirmed | Cart API, Shopify Checkout, Shopify Payments |
| Email → First Buy | New subscriber | Popup / Form | First order + email captured | Klaviyo, Shopify Discounts |
| Return → Reorder | Existing customer | Email / Direct | Repeat order | Shop Pay, Klaviyo, Product Recs |

---

## Shopify App Dependencies (Flows)

| App | Purpose | Flow |
|-----|---------|------|
| **Klaviyo** | Email/SMS marketing, automations, popups | Flow 2 & 3 |
| **Judge.me** | Product reviews, review request emails | Flow 1 & 2 |
| **Smile.io** | Loyalty & referral program | Flow 2 & 3 |
| **Wishlist King** | Wishlist functionality | Flow 1 |
| **Shopify Search & Discovery** | Collection filtering, product recs | Flow 1 & 3 |
