# EzHome — Data Models (Shopify)

> Shopify resource structures and metafield definitions for the EzHome store.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## Shopify Data Architecture

Shopify manages all core data (products, orders, customers, etc.) through its platform. We extend Shopify's native objects using **metafields** and **metaobjects** for custom data that the theme needs.

```
Shopify Managed (Admin + APIs)          Custom (Metafields / Metaobjects)
┌──────────────────────────┐            ┌──────────────────────────┐
│ Products & Variants      │            │ Product metafields       │
│ Collections              │            │ (assembly time, specs,   │
│ Orders & Line Items      │            │  dimensions, video URLs) │
│ Customers                │            │                          │
│ Discounts & Gift Cards   │            │ Metaobjects:             │
│ Pages & Blog Posts       │            │ • FAQ entries            │
│ Shipping Profiles        │            │ • Trust badges           │
│ Inventory                │            │ • Press logos            │
│ Files (images, video)    │            │ • Assembly steps         │
└──────────────────────────┘            └──────────────────────────┘
```

---

## 1. Product

Shopify's native `product` object handles core e-commerce fields. We add custom data via metafields.

### Native Shopify Fields (Admin)

| Field | Type | Example |
|-------|------|---------|
| `title` | string | "EzHome Compression Sofa — 2 Seater" |
| `handle` | string (slug) | `compression-sofa-2-seater` |
| `body_html` | HTML | Product description (rich text) |
| `vendor` | string | "EzHome" |
| `product_type` | string | "Sofa" or "Bed" or "Accessory" |
| `tags` | string[] | `["best-seller", "new-arrival", "compression", "sofa"]` |
| `status` | enum | `active`, `draft`, `archived` |
| `published_at` | datetime | Auto-set on publish |
| `images` | Image[] | Product gallery images |
| `variants` | Variant[] | Colour/size combinations |
| `options` | Option[] | e.g. `[{name: "Colour"}, {name: "Size"}]` |
| `template_suffix` | string | Alternate template (e.g. `"sofa"`) |

### Product Variant (Shopify Native)

| Field | Type | Example |
|-------|------|---------|
| `title` | string | "Sage Green / 2-Seater" |
| `sku` | string | "EZ-CS-2S-SAGE" |
| `price` | money | "1299.00" |
| `compare_at_price` | money | "1599.00" (strikethrough) |
| `inventory_quantity` | integer | 42 |
| `inventory_policy` | enum | `deny` (don't sell when 0) |
| `weight` | float | 35.0 (kg, for shipping calc) |
| `requires_shipping` | boolean | true |
| `option1` | string | "Sage Green" (Colour) |
| `option2` | string | "2-Seater" (Size) |
| `option3` | string | null (unused) |
| `image_id` | integer | Variant-specific image |
| `barcode` | string | UPC/EAN for inventory |

### Product Metafields (Custom)

Defined in `config/settings_schema.json` or via Admin → Settings → Custom data.

| Namespace | Key | Type | Description | Example |
|-----------|-----|------|-------------|---------|
| `custom` | `assembly_time_minutes` | `number_integer` | Assembly time | `10` |
| `custom` | `assembly_video_url` | `url` | Assembly video (YouTube/Vimeo) | `"https://youtube.com/..."` |
| `custom` | `compressed_dimensions` | `json` | Box dimensions (cm) | `{"length": 90, "width": 60, "height": 45}` |
| `custom` | `assembled_dimensions` | `json` | Full dimensions (cm) | `{"length": 180, "width": 85, "height": 75}` |
| `custom` | `material` | `single_line_text_field` | Primary material | `"High-density foam + linen"` |
| `custom` | `foam_type` | `single_line_text_field` | Foam specification | `"40kg/m³ HR foam"` |
| `custom` | `cover_type` | `single_line_text_field` | Cover material | `"Machine-washable linen blend"` |
| `custom` | `weight_capacity_kg` | `number_integer` | Max weight | `300` |
| `custom` | `warranty_years` | `number_integer` | Warranty period | `5` |
| `custom` | `specs_table` | `json` | Full specs for display | `[{"label": "Weight", "value": "35 kg"}]` |
| `custom` | `colour_swatch_url` | `file_reference` | Swatch image per variant | — |
| `custom` | `short_description` | `multi_line_text_field` | Tagline / subtitle | `"The sofa that ships in a box"` |
| `custom` | `feature_highlights` | `json` | Feature cards | `[{"icon": "box", "title": "Ships compressed", "body": "..."}]` |
| `custom` | `faq_entries` | `list.metaobject_reference` | Product FAQ | References FAQ metaobject |
| `custom` | `usp_badges` | `list.single_line_text_field` | Trust badges | `["Free Delivery", "100-Night Trial"]` |

---

## 2. Collection

Shopify native — no custom schema needed. Uses native sorting, filtering, and automated rules.

### Native Fields

| Field | Type | Example |
|-------|------|---------|
| `title` | string | "Compression Sofas" |
| `handle` | string | `sofas` |
| `body_html` | HTML | Collection description |
| `image` | Image | Collection hero image |
| `sort_order` | enum | `best-selling`, `price-ascending`, etc. |
| `published` | boolean | Visibility |

### Collection Types

| Collection | Type | Rule / Manual |
|------------|------|--------------|
| Sofas | Automated | `product_type = Sofa` |
| Beds | Automated | `product_type = Bed` |
| Accessories | Automated | `product_type = Accessory` |
| New Arrivals | Automated | `tag = new-arrival` |
| Best Sellers | Automated | Sort by best-selling |
| Limited Edition | Manual | Hand-curated products |
| All Products | Automated | All products (Shopify default) |

### Collection Metafields

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `custom` | `hero_subtitle` | `single_line_text_field` | Subheadline for hero |
| `custom` | `banner_image_mobile` | `file_reference` | Mobile-specific hero |
| `custom` | `featured_badge_text` | `single_line_text_field` | Badge text e.g. "Popular" |

---

## 3. Customer (Shopify Native)

Managed entirely by Shopify. No custom database needed.

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Shopify customer ID |
| `email` | string | Unique, required |
| `first_name` | string | — |
| `last_name` | string | — |
| `phone` | string | Optional |
| `addresses` | Address[] | Multiple saved addresses |
| `default_address` | Address | Primary address |
| `orders_count` | integer | Total orders |
| `total_spent` | money | Lifetime spend |
| `tags` | string[] | e.g. `["vip", "wholesale"]` |
| `email_marketing_consent` | object | Opted-in to marketing |
| `sms_marketing_consent` | object | Opted-in to SMS |
| `state` | enum | `enabled`, `disabled`, `invited` |
| `created_at` | datetime | — |
| `note` | text | Internal notes |
| `accepts_marketing` | boolean | Marketing consent |

### Customer Metafields

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `custom` | `referral_code` | `single_line_text_field` | Unique referral code |
| `custom` | `referred_by` | `single_line_text_field` | Who referred them |
| `custom` | `loyalty_points` | `number_integer` | Points balance (Smile.io) |

---

## 4. Order (Shopify Native)

Fully managed by Shopify. Theme reads order data in `customers/order.liquid`.

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Shopify order ID |
| `name` | string | Order number: `#EZ-1042` |
| `email` | string | Customer email |
| `financial_status` | enum | `paid`, `pending`, `refunded`, etc. |
| `fulfillment_status` | enum | `fulfilled`, `partial`, `unfulfilled` |
| `line_items` | LineItem[] | Products ordered |
| `subtotal_price` | money | Before discounts |
| `total_discounts` | money | Discount amount |
| `total_shipping_price_set` | money | Shipping cost |
| `total_tax` | money | Tax amount |
| `total_price` | money | Final total |
| `discount_codes` | DiscountCode[] | Applied codes |
| `shipping_address` | Address | Delivery address |
| `shipping_lines` | ShippingLine[] | Shipping method + rate |
| `created_at` | datetime | Order date |
| `cancelled_at` | datetime | If cancelled |
| `note` | text | Customer order notes |
| `tags` | string[] | Internal tagging |

---

## 5. Metaobjects (Custom Content Types)

Shopify metaobjects replace the need for a CMS database. Defined in Admin → Settings → Custom data → Metaobject definitions.

### 5A. FAQ Entry

| Field | Type | Description |
|-------|------|-------------|
| `question` | `single_line_text_field` | FAQ question |
| `answer` | `rich_text_field` | FAQ answer (supports formatting) |
| `category` | `single_line_text_field` | e.g. "Delivery", "Product", "Returns" |
| `sort_order` | `number_integer` | Display order |

> Used on: PDP FAQ section, `/pages/faq`, collection pages.

### 5B. Trust Badge

| Field | Type | Description |
|-------|------|-------------|
| `icon` | `single_line_text_field` | Icon name (Lucide) |
| `title` | `single_line_text_field` | e.g. "Free Delivery" |
| `description` | `single_line_text_field` | e.g. "On all orders over $100" |
| `sort_order` | `number_integer` | Display order |

### 5C. Assembly Step

| Field | Type | Description |
|-------|------|-------------|
| `step_number` | `number_integer` | Step 1, 2, 3... |
| `title` | `single_line_text_field` | e.g. "Unbox" |
| `description` | `multi_line_text_field` | Step details |
| `image` | `file_reference` | Step image / illustration |
| `video_url` | `url` | Optional step video |

### 5D. Press Logo

| Field | Type | Description |
|-------|------|-------------|
| `name` | `single_line_text_field` | e.g. "Broadsheet" |
| `logo` | `file_reference` | SVG/PNG logo |
| `url` | `url` | Link to article |
| `sort_order` | `number_integer` | Display order |

### 5E. Testimonial

| Field | Type | Description |
|-------|------|-------------|
| `quote` | `multi_line_text_field` | Testimonial text |
| `author_name` | `single_line_text_field` | "Sam & Jess T." |
| `author_detail` | `single_line_text_field` | "Melbourne · 2-seater in Charcoal" |
| `rating` | `number_integer` | 1-5 stars |
| `is_verified` | `boolean` | Verified buyer badge |
| `sort_order` | `number_integer` | Display order |

---

## 6. Discount (Shopify Native)

| Type | Example | Notes |
|------|---------|-------|
| Percentage discount code | `WELCOME10` → 10% off | Welcome flow |
| Fixed amount code | `SAVE50` → $50 off | Campaigns |
| Free shipping code | `FREESHIP` | Promotions |
| Automatic: Buy X Get Y | Buy sofa → free cover | Cross-sell |
| Automatic: Amount off | 15% off orders > $2000 | Tiered discount |

> Managed entirely in Shopify Admin → Discounts. No custom API needed.

---

## 7. Blog (Shopify Native)

| Object | Fields | Notes |
|--------|--------|-------|
| **Blog** | `title`, `handle`, `articles` | One blog: "Journal" |
| **Article** | `title`, `handle`, `body_html`, `author`, `image`, `tags`, `published_at`, `excerpt` | Blog posts |

### Article Metafields

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `custom` | `reading_time` | `number_integer` | Minutes to read |
| `custom` | `category` | `single_line_text_field` | "Style Tips", "Assembly Guides" |

---

## 8. Files & Media (Shopify Native)

All images, videos, and documents are stored in **Shopify Files** (CDN-hosted).

| Media Type | Format | Usage |
|------------|--------|-------|
| Product images | WEBP/PNG/JPG | Gallery, variant images |
| Product videos | MP4 / YouTube embed | Assembly videos, lifestyle |
| 3D models | GLB | Future: AR viewer |
| Collection images | WEBP/PNG | Collection hero banners |
| Page images | WEBP/PNG | About, How It Works, etc. |
| SVGs | SVG | Logos, icons (inline or file) |

> Shopify CDN auto-generates responsive image URLs with `_100x`, `_300x`, `_600x`, etc. suffixes. Use `image_url` filter with `width` param in Liquid.

---

## Data Relationships Summary

```
Product ──< Variant (colour × size)
Product ──< Image
Product ──< Metafield (specs, assembly, FAQ refs)
Product ──── Collection (M2M via automated/manual rules)

Customer ──< Order
Customer ──< Address
Customer ──< Metafield (referral, loyalty)

Order ──< LineItem
Order ──── Discount
Order ──── ShippingLine

Blog ──< Article
Article ──< Metafield

Metaobject: FAQ ──── Product (via metafield reference)
Metaobject: Trust Badge ──── Theme sections
Metaobject: Assembly Step ──── Theme sections
Metaobject: Press Logo ──── Theme sections
Metaobject: Testimonial ──── Theme sections
```
