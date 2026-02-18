# EzHome — Data Integration Guide (Shopify)

> Shopify data architecture, metafield definitions, API integration patterns, webhook handlers, and third-party service connections for the EzHome store.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## 1. Data Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        SHOPIFY PLATFORM                          │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Products    │  │  Collections │  │  Customers            │   │
│  │  Variants    │  │  Smart Rules │  │  Addresses            │   │
│  │  Images      │  │              │  │  Tags                 │   │
│  │  Metafields  │  │              │  │  Metafields           │   │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬───────────┘   │
│         │                 │                       │              │
│  ┌──────▼─────────────────▼───────────────────────▼───────────┐  │
│  │                    SHOPIFY APIs                             │  │
│  │  Storefront API (GraphQL) │ Admin API (REST + GraphQL)     │  │
│  │  Ajax API (Theme)         │ Webhooks                       │  │
│  └──────┬────────────────────┬───────────────────┬────────────┘  │
│         │                    │                   │               │
└─────────┼────────────────────┼───────────────────┼───────────────┘
          │                    │                   │
    ┌─────▼─────┐      ┌──────▼──────┐    ┌───────▼───────┐
    │  Theme    │      │  Shopify   │    │  Third-Party  │
    │  (Liquid) │      │  Apps      │    │  Services     │
    │           │      │            │    │               │
    │ • Product │      │ • Judge.me │    │ • Klaviyo     │
    │   display │      │ • Rebuy   │    │ • GA4         │
    │ • Cart    │      │ • Gorgias │    │ • Meta Pixel  │
    │ • Search  │      │            │    │ • ShipStation │
    └───────────┘      └────────────┘    └───────────────┘
```

---

## 2. Product Data Structure

### 2.1 Product Resource

Each EzHome product maps to a Shopify Product with this structure:

```json
{
  "product": {
    "title": "Luna 3-Seater Compression Sofa",
    "handle": "luna-3-seater-sofa",
    "product_type": "Sofa",
    "vendor": "EzHome",
    "status": "active",
    "tags": ["compression", "sofa", "3-seater", "living-room", "tool-free", "best-seller"],
    "body_html": "<p>Premium compression sofa that fits in a box...</p>",
    "variants": [
      {
        "title": "Sage / 3-Seater",
        "sku": "EZ-LUNA-3S-SAGE",
        "price": "899.00",
        "compare_at_price": "1099.00",
        "option1": "Sage",
        "option2": "3-Seater",
        "weight": 35.0,
        "weight_unit": "kg",
        "inventory_quantity": 50,
        "inventory_management": "shopify",
        "barcode": "0123456789012",
        "requires_shipping": true,
        "taxable": true
      }
    ],
    "options": [
      { "name": "Color", "values": ["Sage", "Cream", "Charcoal", "Coral"] },
      { "name": "Size", "values": ["2-Seater", "3-Seater", "L-Shape"] }
    ],
    "images": [
      { "src": "luna-sage-front.jpg", "alt": "Luna 3-Seater Sofa in Sage — front view" },
      { "src": "luna-sage-angle.jpg", "alt": "Luna 3-Seater Sofa in Sage — angle view" },
      { "src": "luna-sage-detail.jpg", "alt": "Luna fabric detail — Sage" },
      { "src": "luna-boxed.jpg", "alt": "Luna Sofa in compression box — packaging" },
      { "src": "luna-assembly.jpg", "alt": "Luna Sofa — assembly in progress" }
    ]
  }
}
```

### 2.2 Variant Matrix

| Product       | Colors                        | Sizes                      | Variants |
|--------------|-------------------------------|----------------------------|----------|
| Luna Sofa     | Sage, Cream, Charcoal, Coral | 2-Seater, 3-Seater, L-Shape | 12       |
| Nova Sofa     | Sage, Cream, Charcoal        | 2-Seater, 3-Seater        | 6        |
| Drift Bed     | Cream, Charcoal              | Twin, Full, Queen, King   | 8        |
| Cloud Bed     | Cream, Sage                  | Queen, King               | 4        |

**Total variants:** ~30 (well within Shopify's 100-variant limit per product)

---

## 3. Metafield Definitions

### 3.1 Product Metafields

Defined in Shopify Admin → Settings → Custom data → Products:

| Namespace.Key                         | Type            | Description                        | Example Value                        |
|--------------------------------------|----------------|------------------------------------|--------------------------------------|
| `custom.assembly_time`                | `number_integer` | Assembly time in minutes           | `10`                                 |
| `custom.assembly_instructions`        | `rich_text_field` | Detailed assembly steps           | Rich text with images                |
| `custom.assembly_video_url`           | `url`           | Assembly video URL                 | `https://youtube.com/watch?v=...`    |
| `custom.tools_required`              | `boolean`       | Whether tools are needed           | `false`                              |
| `custom.compressed_dimensions`        | `json`          | Box dimensions (L×W×H cm)         | `{"length":120,"width":45,"height":40}` |
| `custom.expanded_dimensions`          | `json`          | Full product dimensions            | `{"length":200,"width":90,"height":85}` |
| `custom.weight_kg`                   | `number_decimal`| Product weight in kg               | `35.0`                               |
| `custom.seating_capacity`            | `number_integer` | Number of seats                   | `3`                                  |
| `custom.foam_type`                   | `single_line_text_field` | Foam description          | `CertiPUR-US® High-Resilience Foam`  |
| `custom.fabric_type`                 | `single_line_text_field` | Fabric description        | `Stain-resistant polyester blend`     |
| `custom.warranty_years`              | `number_integer` | Warranty duration                  | `5`                                  |
| `custom.care_instructions`           | `rich_text_field` | Care/cleaning guide              | Rich text content                    |
| `custom.certifications`             | `list.single_line_text_field` | Product certs       | `["CertiPUR-US","OEKO-TEX"]`        |
| `custom.features`                    | `list.single_line_text_field` | Key features        | `["Tool-free","Machine-washable covers"]` |
| `custom.color_hex`                   | `color`         | Swatch color for variant display   | `#3A6B3A`                            |
| `custom.specifications`             | `rich_text_field` | Full spec sheet content          | Rich text with table                 |

### 3.2 Product Variant Metafields

| Namespace.Key                   | Type             | Description                | Example                |
|--------------------------------|------------------|----------------------------|------------------------|
| `custom.color_hex`              | `color`          | Swatch color for variant   | `#3A6B3A`              |
| `custom.color_image`            | `file_reference` | Swatch texture image       | `sage-texture.jpg`     |
| `custom.lead_time_days`         | `number_integer` | Shipping lead time         | `5`                    |
| `custom.warehouse_location`     | `single_line_text_field` | Warehouse code    | `US-EAST-1`            |

### 3.3 Collection Metafields

| Namespace.Key                    | Type              | Description                | Example                     |
|---------------------------------|-------------------|----------------------------|-----------------------------|
| `custom.featured_image_mobile`   | `file_reference`  | Mobile-specific banner     | `sofas-mobile.jpg`          |
| `custom.size_guide_page`         | `page_reference`  | Linked size guide page     | Reference to page           |
| `custom.promo_text`              | `single_line_text_field` | Promotional tagline | `"Free shipping on all sofas"` |

### 3.4 Page Metafields

| Namespace.Key                  | Type              | Description                | Example                     |
|-------------------------------|-------------------|----------------------------|-----------------------------|
| `custom.hero_image`            | `file_reference`  | Hero image for page        | `about-hero.jpg`            |
| `custom.hero_video_url`        | `url`             | Hero video URL             | YouTube/Vimeo URL           |

### 3.5 Shop Metafields

| Namespace.Key                        | Type              | Description                        |
|-------------------------------------|-------------------|------------------------------------|
| `custom.free_shipping_threshold`     | `number_integer`  | Free shipping minimum (cents)      |
| `custom.announcement_text`           | `single_line_text_field` | Global announcement       |
| `custom.social_proof_count`          | `single_line_text_field` | "10,000+ happy customers" |

### 3.6 Metafield Setup Script

Use Shopify Admin API to programmatically create metafield definitions:

```javascript
// scripts/setup-metafields.js
// Run via: node scripts/setup-metafields.js
const Shopify = require('@shopify/shopify-api');

const metafieldDefinitions = [
  {
    name: "Assembly Time",
    namespace: "custom",
    key: "assembly_time",
    type: "number_integer",
    ownerType: "PRODUCT",
    description: "Time to assemble in minutes",
    validations: [{ name: "min", value: "1" }, { name: "max", value: "60" }]
  },
  {
    name: "Assembly Video URL",
    namespace: "custom",
    key: "assembly_video_url",
    type: "url",
    ownerType: "PRODUCT",
    description: "YouTube/Vimeo video URL for assembly instructions"
  },
  {
    name: "Compressed Dimensions",
    namespace: "custom",
    key: "compressed_dimensions",
    type: "json",
    ownerType: "PRODUCT",
    description: "Box dimensions as JSON {length, width, height} in cm"
  },
  {
    name: "Expanded Dimensions",
    namespace: "custom",
    key: "expanded_dimensions",
    type: "json",
    ownerType: "PRODUCT",
    description: "Full product dimensions as JSON {length, width, height} in cm"
  },
  {
    name: "Foam Type",
    namespace: "custom",
    key: "foam_type",
    type: "single_line_text_field",
    ownerType: "PRODUCT"
  },
  {
    name: "Fabric Type",
    namespace: "custom",
    key: "fabric_type",
    type: "single_line_text_field",
    ownerType: "PRODUCT"
  },
  {
    name: "Warranty Years",
    namespace: "custom",
    key: "warranty_years",
    type: "number_integer",
    ownerType: "PRODUCT"
  },
  {
    name: "Seating Capacity",
    namespace: "custom",
    key: "seating_capacity",
    type: "number_integer",
    ownerType: "PRODUCT"
  },
  {
    name: "Color Hex",
    namespace: "custom",
    key: "color_hex",
    type: "color",
    ownerType: "PRODUCTVARIANT"
  },
  {
    name: "Specifications",
    namespace: "custom",
    key: "specifications",
    type: "rich_text_field",
    ownerType: "PRODUCT"
  },
  {
    name: "Assembly Instructions",
    namespace: "custom",
    key: "assembly_instructions",
    type: "rich_text_field",
    ownerType: "PRODUCT"
  },
  {
    name: "Care Instructions",
    namespace: "custom",
    key: "care_instructions",
    type: "rich_text_field",
    ownerType: "PRODUCT"
  },
  {
    name: "Tools Required",
    namespace: "custom",
    key: "tools_required",
    type: "boolean",
    ownerType: "PRODUCT"
  },
  {
    name: "Certifications",
    namespace: "custom",
    key: "certifications",
    type: "list.single_line_text_field",
    ownerType: "PRODUCT"
  },
  {
    name: "Features",
    namespace: "custom",
    key: "features",
    type: "list.single_line_text_field",
    ownerType: "PRODUCT"
  }
];

// GraphQL mutation to create each definition
// POST /admin/api/2024-01/graphql.json
const CREATE_METAFIELD_DEFINITION = `
  mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition { id name key namespace }
      userErrors { field message }
    }
  }
`;
```

---

## 4. Liquid Data Access Patterns

### 4.1 Product Data in Liquid

```liquid
{%- comment -%} sections/main-product.liquid {%- endcomment -%}

{%- comment -%} Basic product data (always available) {%- endcomment -%}
{{ product.title }}
{{ product.description }}
{{ product.price | money }}
{{ product.compare_at_price | money }}
{{ product.vendor }}
{{ product.type }}
{{ product.tags | join: ', ' }}

{%- comment -%} Variant data {%- endcomment -%}
{%- for variant in product.variants -%}
  {{ variant.title }}
  {{ variant.price | money }}
  {{ variant.sku }}
  {{ variant.available }}
  {{ variant.inventory_quantity }}
{%- endfor -%}

{%- comment -%} Product metafields {%- endcomment -%}
{{ product.metafields.custom.assembly_time.value }} minutes
{{ product.metafields.custom.foam_type.value }}
{{ product.metafields.custom.warranty_years.value }}-year warranty

{%- comment -%} JSON metafields (dimensions) {%- endcomment -%}
{%- assign dims = product.metafields.custom.compressed_dimensions.value -%}
{%- if dims -%}
  Box: {{ dims.length }}cm × {{ dims.width }}cm × {{ dims.height }}cm
{%- endif -%}

{%- comment -%} List metafields (features) {%- endcomment -%}
{%- assign features = product.metafields.custom.features.value -%}
{%- if features -%}
  <ul>
    {%- for feature in features -%}
      <li>{{ feature }}</li>
    {%- endfor -%}
  </ul>
{%- endif -%}

{%- comment -%} Rich text metafield {%- endcomment -%}
{{ product.metafields.custom.specifications.value }}

{%- comment -%} Variant metafields {%- endcomment -%}
{%- for variant in product.variants -%}
  {%- assign color_hex = variant.metafields.custom.color_hex.value -%}
  <span class="swatch" style="background-color: {{ color_hex }}"></span>
{%- endfor -%}
```

### 4.2 Variant JSON for JavaScript

```liquid
{%- comment -%} Output variant data as JSON for client-side variant picker {%- endcomment -%}
<script type="application/json" data-variant-json>
  {{ product.variants | json }}
</script>

{%- comment -%} Extended variant data with metafields {%- endcomment -%}
<script type="application/json" data-variant-extended-json>
[
  {%- for variant in product.variants -%}
  {
    "id": {{ variant.id }},
    "title": {{ variant.title | json }},
    "price": {{ variant.price }},
    "compare_at_price": {{ variant.compare_at_price | default: 'null' }},
    "available": {{ variant.available }},
    "sku": {{ variant.sku | json }},
    "options": {{ variant.options | json }},
    "featured_image": {%- if variant.featured_image -%}{ "id": {{ variant.featured_image.id }}, "src": "{{ variant.featured_image | image_url: width: 1200 }}" }{%- else -%}null{%- endif -%},
    "color_hex": {{ variant.metafields.custom.color_hex.value | default: 'null' | json }}
  }{% unless forloop.last %},{% endunless %}
  {%- endfor -%}
]
</script>
```

### 4.3 Collection Data

```liquid
{%- comment -%} sections/main-collection.liquid {%- endcomment -%}

{%- comment -%} Collection info {%- endcomment -%}
{{ collection.title }}
{{ collection.description }}
{{ collection.products_count }} products

{%- comment -%} Paginated products {%- endcomment -%}
{% paginate collection.products by 12 %}
  {%- for product in collection.products -%}
    {% render 'card-product', product: product %}
  {%- endfor -%}

  {%- if paginate.pages > 1 -%}
    {% render 'pagination', paginate: paginate %}
  {%- endif -%}
{% endpaginate %}

{%- comment -%} Filters (Shopify Storefront Filtering) {%- endcomment -%}
{%- for filter in collection.filters -%}
  <div class="filter" data-filter="{{ filter.param_name }}">
    <h3>{{ filter.label }}</h3>
    {%- for value in filter.values -%}
      <label>
        <input type="checkbox"
          name="{{ value.param_name }}"
          value="{{ value.value }}"
          {% if value.active %}checked{% endif %}
          {% if value.count == 0 %}disabled{% endif %}>
        {{ value.label }} ({{ value.count }})
      </label>
    {%- endfor -%}
  </div>
{%- endfor -%}
```

### 4.4 Cart Data

```liquid
{%- comment -%} Cart data available in Liquid {%- endcomment -%}
{{ cart.item_count }}
{{ cart.total_price | money }}
{{ cart.total_weight }}
{{ cart.requires_shipping }}

{%- for item in cart.items -%}
  {{ item.product.title }}
  {{ item.variant.title }}
  {{ item.quantity }}
  {{ item.final_line_price | money }}
  {{ item.url }}
  {{ item.key }}
  {{ item.image | image_url: width: 120 }}
{%- endfor -%}
```

---

## 5. Shopify Ajax API Integration

### 5.1 Cart Operations

All cart AJAX operations used by the theme JavaScript:

```javascript
// Cart API wrapper (used by CartManager in global.js)

// GET /cart.js — Fetch current cart
async function getCart() {
  const res = await fetch('/cart.js');
  return res.json();
}

// POST /cart/add.js — Add items
async function addToCart(items) {
  const res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }) // [{ id: variantId, quantity: 1, properties: {} }]
  });
  if (!res.ok) throw new CartError(await res.json());
  return res.json();
}

// POST /cart/change.js — Update single item
async function changeCartItem(key, quantity) {
  const res = await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: key, quantity })
  });
  return res.json();
}

// POST /cart/update.js — Bulk update + attributes
async function updateCart(updates) {
  const res = await fetch('/cart/update.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
    // { updates: { "key1": 2, "key2": 0 }, note: "Gift message", attributes: { "gift_wrap": "true" } }
  });
  return res.json();
}

// POST /cart/clear.js — Clear cart
async function clearCart() {
  const res = await fetch('/cart/clear.js', { method: 'POST' });
  return res.json();
}
```

### 5.2 Product Recommendations

```javascript
// GET /recommendations/products.json?product_id=<id>&limit=4
async function getRecommendations(productId, limit = 4) {
  const res = await fetch(`/recommendations/products.json?product_id=${productId}&limit=${limit}`);
  const data = await res.json();
  return data.products;
}
```

### 5.3 Predictive Search

```javascript
// GET /search/suggest.json?q=<query>&resources[type]=product,article,page&resources[limit]=6
async function predictiveSearch(query) {
  const res = await fetch(
    `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,article,page&resources[limit]=6`
  );
  const data = await res.json();
  return data.resources.results;
}
```

### 5.4 Section Rendering API

```javascript
// Fetch rendered HTML for specific sections (used for AJAX updates)
async function fetchSections(sectionIds) {
  const ids = Array.isArray(sectionIds) ? sectionIds.join(',') : sectionIds;
  const res = await fetch(`${window.location.pathname}?sections=${ids}`);
  return res.json(); // { "section-id": "<html>...</html>" }
}
```

---

## 6. Storefront API Integration (GraphQL)

For advanced features not possible with Ajax API alone:

### 6.1 Storefront API Access Token

```liquid
{%- comment -%} layout/theme.liquid — expose Storefront API token for JS {%- endcomment -%}
<script>
  window.EzHome = window.EzHome || {};
  window.EzHome.storefrontToken = '{{ settings.storefront_api_token }}';
  window.EzHome.shopDomain = '{{ shop.permanent_domain }}';
</script>
```

### 6.2 Storefront API Client

```javascript
// assets/storefront-api.js
class StorefrontAPI {
  constructor() {
    this.endpoint = `https://${window.EzHome.shopDomain}/api/2024-01/graphql.json`;
    this.token = window.EzHome.storefrontToken;
  }

  async query(graphql, variables = {}) {
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.token
      },
      body: JSON.stringify({ query: graphql, variables })
    });
    const data = await res.json();
    if (data.errors) console.error('Storefront API errors:', data.errors);
    return data.data;
  }
}

window.EzHome.storefront = new StorefrontAPI();
```

### 6.3 Example Queries

```graphql
# Fetch product with metafields (for client-side rendering)
query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    variants(first: 30) {
      edges {
        node {
          id
          title
          price { amount currencyCode }
          availableForSale
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
    assemblyTime: metafield(namespace: "custom", key: "assembly_time") {
      value
    }
    compressedDimensions: metafield(namespace: "custom", key: "compressed_dimensions") {
      value
    }
  }
}

# Fetch collection with filtering
query CollectionProducts($handle: String!, $first: Int!, $filters: [ProductFilter!]) {
  collection(handle: $handle) {
    title
    products(first: $first, filters: $filters) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          featuredImage { url altText }
          availableForSale
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
}

# Cart operations (if using Storefront API cart instead of Ajax API)
mutation CartCreate($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product { title handle }
                image { url altText }
              }
            }
          }
        }
      }
      estimatedCost {
        totalAmount { amount currencyCode }
        subtotalAmount { amount currencyCode }
      }
      checkoutUrl
    }
    userErrors { field message }
  }
}
```

---

## 7. Webhook Integration

### 7.1 Webhook Events to Monitor

Configure via Shopify Admin → Settings → Notifications → Webhooks:

| Event                        | URL Target              | Purpose                              |
|-----------------------------|------------------------|--------------------------------------|
| `orders/create`              | Klaviyo + internal     | Post-purchase flow, inventory update |
| `orders/fulfilled`           | Klaviyo                | Shipping confirmation email          |
| `orders/cancelled`           | Klaviyo + internal     | Cancellation email, restock          |
| `products/update`            | GA4 feed sync          | Keep product feed in sync            |
| `products/create`            | GA4 feed sync          | New product notifications            |
| `customers/create`           | Klaviyo                | Welcome flow trigger                 |
| `customers/update`           | Klaviyo                | Segment update                       |
| `refunds/create`             | Internal               | Returns tracking                     |
| `inventory_levels/update`    | Internal               | Low stock alerts                     |
| `app/uninstalled`            | Internal               | App dependency tracking              |

### 7.2 Webhook Payload Examples

**`orders/create`:**
```json
{
  "id": 820982911946154500,
  "email": "customer@example.com",
  "created_at": "2025-02-18T12:00:00-05:00",
  "financial_status": "paid",
  "fulfillment_status": null,
  "total_price": "899.00",
  "currency": "USD",
  "line_items": [
    {
      "product_id": 788032119674292900,
      "variant_id": 49148385000000,
      "title": "Luna 3-Seater Compression Sofa",
      "variant_title": "Sage / 3-Seater",
      "quantity": 1,
      "price": "899.00",
      "sku": "EZ-LUNA-3S-SAGE"
    }
  ],
  "shipping_address": {
    "city": "New York",
    "province": "New York",
    "country": "United States"
  }
}
```

---

## 8. Klaviyo Integration

### 8.1 Setup

1. Install Klaviyo Shopify app
2. Klaviyo auto-syncs: Products, Orders, Customers, Cart data
3. Add Klaviyo tracking snippet to theme (via app embed block)

### 8.2 Klaviyo Flows

| Flow                          | Trigger                            | Emails          |
|------------------------------|-----------------------------------|-----------------|
| Welcome Series                | Customer signs up (newsletter)     | 3 emails        |
| Abandoned Cart                | Cart abandoned > 1 hour           | 3 emails        |
| Browse Abandonment            | Product viewed, no add to cart     | 1 email         |
| Post-Purchase                 | Order placed                       | 3 emails        |
| Review Request                | Order delivered + 14 days          | 1 email         |
| Win-Back                      | No purchase in 90 days             | 2 emails        |
| Assembly Follow-Up            | Order delivered + 3 days           | 1 email         |
| Warranty Registration         | Order delivered + 7 days           | 1 email         |

### 8.3 Klaviyo Events (Custom)

```javascript
// Custom event tracking via Klaviyo JS API
// Fired from theme JavaScript

// Product viewed
window._learnq = window._learnq || [];
window._learnq.push(['track', 'Viewed Product', {
  ProductName: product.title,
  ProductID: product.id,
  SKU: variant.sku,
  Categories: product.collections.map(c => c.title),
  ImageURL: product.featuredImage,
  URL: product.url,
  Brand: 'EzHome',
  Price: variant.price / 100,
  CompareAtPrice: variant.compareAtPrice / 100
}]);

// Added to cart
window._learnq.push(['track', 'Added to Cart', {
  ProductName: product.title,
  ProductID: product.id,
  SKU: variant.sku,
  Price: variant.price / 100,
  Quantity: quantity,
  CartTotal: cart.total_price / 100,
  CartItems: cart.items.map(item => ({
    ProductID: item.product_id,
    SKU: item.sku,
    ProductName: item.title,
    Quantity: item.quantity,
    Price: item.price / 100,
    ImageURL: item.image
  }))
}]);
```

### 8.4 Klaviyo Segments

| Segment Name                  | Criteria                                      |
|------------------------------|-----------------------------------------------|
| High-Intent Browsers          | Viewed product 3+ times, no purchase          |
| Sofa Buyers                   | Purchased product_type = "Sofa"               |
| Bed Buyers                    | Purchased product_type = "Bed"                |
| Repeat Customers              | Order count ≥ 2                               |
| VIPs                          | Lifetime value > $1,500                       |
| At-Risk                       | Last purchase > 60 days, was active           |
| Newsletter Subscribers        | Subscribed via newsletter form                |
| Abandoned Cart (24h)          | Started checkout, not completed in 24h        |

---

## 9. Analytics Integration

### 9.1 Google Analytics 4 (GA4)

**Setup:** Shopify Admin → Online Store → Preferences → Google Analytics

```liquid
{%- comment -%} snippets/analytics-ga4.liquid {%- endcomment -%}
{%- if settings.ga4_id != blank -%}
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ settings.ga4_id }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ settings.ga4_id }}', {
    page_title: '{{ page_title | escape }}',
    page_location: window.location.href
  });
</script>
{%- endif -%}
```

### 9.2 E-commerce Events

| Event              | Trigger                    | Data                                    |
|-------------------|---------------------------|-----------------------------------------|
| `view_item`        | PDP loaded                 | product ID, name, price, category       |
| `view_item_list`   | Collection page loaded     | list of products, collection name       |
| `select_item`      | Product card clicked       | product ID, name, list name             |
| `add_to_cart`      | Add to cart action         | product ID, name, price, quantity       |
| `remove_from_cart` | Remove from cart           | product ID, name, quantity              |
| `view_cart`        | Cart drawer opened         | cart contents, total                    |
| `begin_checkout`   | Checkout button clicked    | cart contents, total                    |
| `purchase`         | Order completed            | order ID, revenue, items, shipping      |
| `search`           | Search submitted           | search term                             |

```javascript
// Example: view_item event on PDP
gtag('event', 'view_item', {
  currency: 'USD',
  value: {{ product.price | divided_by: 100.0 }},
  items: [{
    item_id: '{{ product.id }}',
    item_name: '{{ product.title | escape }}',
    item_brand: 'EzHome',
    item_category: '{{ product.type | escape }}',
    price: {{ product.price | divided_by: 100.0 }},
    quantity: 1
  }]
});
```

### 9.3 Meta Pixel

```liquid
{%- comment -%} snippets/analytics-meta-pixel.liquid {%- endcomment -%}
{%- if settings.meta_pixel_id != blank -%}
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '{{ settings.meta_pixel_id }}');
  fbq('track', 'PageView');
</script>
{%- endif -%}
```

**Meta Pixel Events:**

| Event               | Page/Action              |
|--------------------|--------------------------|
| `PageView`          | All pages                |
| `ViewContent`       | PDP                      |
| `AddToCart`         | Add to cart              |
| `InitiateCheckout`  | Begin checkout           |
| `Purchase`          | Order complete           |
| `Search`            | Search page              |
| `Lead`              | Newsletter signup        |

---

## 10. Reviews Integration (Judge.me)

### 10.1 Setup

1. Install Judge.me app from Shopify App Store
2. Configure review request timing (14 days post-delivery)
3. Enable photo reviews
4. Judge.me auto-creates product metafields for ratings

### 10.2 Theme Integration

```liquid
{%- comment -%} Product page — review summary {%- endcomment -%}
<div class="product-reviews__summary" data-reviews-summary data-product-id="{{ product.id }}">
  {%- if product.metafields.reviews.rating.value != blank -%}
    {%- assign rating = product.metafields.reviews.rating.value.rating -%}
    {%- assign count = product.metafields.reviews.rating_count.value -%}
    {% render 'star-rating', rating: rating %}
    <span class="reviews__count">({{ count }} reviews)</span>
  {%- endif -%}
</div>

{%- comment -%} Product page — full reviews widget {%- endcomment -%}
<div id="judgeme_product_reviews" data-id="{{ product.id }}">
  {%- comment -%} Judge.me renders reviews here via app embed {%- endcomment -%}
</div>

{%- comment -%} Product card — star rating {%- endcomment -%}
{%- if product.metafields.reviews.rating.value != blank -%}
  {% render 'star-rating', rating: product.metafields.reviews.rating.value.rating %}
{%- endif -%}
```

### 10.3 Star Rating Snippet

```liquid
{%- comment -%} snippets/star-rating.liquid {%- endcomment -%}
{%- assign full_stars = rating | floor -%}
{%- assign has_half = rating | modulo: 1 | at_least: 0.25 -%}

<div class="star-rating" role="img" aria-label="{{ rating }} out of 5 stars">
  {%- for i in (1..5) -%}
    {%- if i <= full_stars -%}
      {% render 'icon', name: 'star-full' %}
    {%- elsif has_half and i == full_stars | plus: 1 -%}
      {% render 'icon', name: 'star-half' %}
    {%- else -%}
      {% render 'icon', name: 'star-empty' %}
    {%- endif -%}
  {%- endfor -%}
</div>
```

---

## 11. Inventory Management

### 11.1 Shopify Inventory Tracking

| Setting                       | Value              |
|------------------------------|--------------------|
| Track quantity                | Enabled            |
| Continue selling when OOS     | Disabled           |
| Inventory policy              | Shopify-managed    |
| Low stock threshold           | 10 units           |
| Oversell protection           | Enabled            |

### 11.2 Inventory Alerts

Set up via Shopify Flow (Plus) or third-party app:

| Trigger                    | Action                              |
|---------------------------|--------------------------------------|
| Stock ≤ 10 units           | Email notification to ops team      |
| Stock = 0                  | Auto-hide from collections (Flow)   |
| Stock replenished           | Auto-show in collections (Flow)     |
| Popular item low stock      | Klaviyo "Back in Stock" flow setup  |

### 11.3 Back-in-Stock Notifications

```liquid
{%- comment -%} Shown on PDP when variant is sold out {%- endcomment -%}
{%- unless product.selected_or_first_available_variant.available -%}
  <div class="back-in-stock" data-product-id="{{ product.id }}">
    <p>This item is currently sold out.</p>
    <form class="back-in-stock__form" data-back-in-stock-form>
      <input type="email" placeholder="Enter your email" required aria-label="Email for back in stock notification">
      <button type="submit" class="btn btn--secondary">Notify Me</button>
    </form>
    <p data-back-in-stock-message hidden></p>
  </div>
{%- endunless -%}
```

---

## 12. Data Import / Export

### 12.1 Product Import (CSV)

Shopify Admin → Products → Import:

| CSV Column              | Maps To                       | Example                           |
|------------------------|-------------------------------|-----------------------------------|
| `Handle`                | Product handle                | `luna-3-seater-sofa`              |
| `Title`                 | Product title                 | `Luna 3-Seater Compression Sofa` |
| `Body (HTML)`           | Product description           | `<p>Premium compression...</p>`  |
| `Vendor`                | Vendor                        | `EzHome`                          |
| `Type`                  | Product type                  | `Sofa`                            |
| `Tags`                  | Tags (comma-separated)        | `compression, sofa, 3-seater`    |
| `Published`             | Published status              | `TRUE`                            |
| `Option1 Name`          | First option                  | `Color`                           |
| `Option1 Value`         | First option value            | `Sage`                            |
| `Option2 Name`          | Second option                 | `Size`                            |
| `Option2 Value`         | Second option value           | `3-Seater`                        |
| `Variant SKU`           | SKU                           | `EZ-LUNA-3S-SAGE`                |
| `Variant Price`         | Price                         | `899.00`                          |
| `Variant Compare At Price` | Compare-at price           | `1099.00`                         |
| `Variant Inventory Qty` | Stock quantity                | `50`                              |
| `Variant Weight`        | Weight                        | `35.0`                            |
| `Variant Weight Unit`   | Weight unit                   | `kg`                              |
| `Image Src`             | Image URL                     | `https://cdn.../luna-sage.jpg`   |
| `Image Alt Text`        | Image alt                     | `Luna 3-Seater in Sage`         |

### 12.2 Metafield Import

Use Shopify Metafields Guru app or Admin API for bulk metafield import:

```json
// Bulk metafield update via Admin API
// POST /admin/api/2024-01/products/{product_id}/metafields.json
{
  "metafield": {
    "namespace": "custom",
    "key": "assembly_time",
    "value": "10",
    "type": "number_integer"
  }
}
```

---

## 13. Data Flow Diagrams

### 13.1 Add to Cart Flow

```
User clicks "Add To Cart"
        │
        ▼
┌───────────────┐    POST /cart/add.js    ┌────────────────┐
│  Theme JS     │ ──────────────────────▶ │  Shopify Cart  │
│  (browser)    │                          │  API           │
└───────────────┘                          └────────┬───────┘
        │                                           │
        │ ◀─── JSON response (updated cart) ────────┘
        │
        ▼
┌───────────────┐    GET ?sections=cart-drawer  ┌────────────────┐
│  Section      │ ──────────────────────────── ▶│  Shopify       │
│  Rendering    │                                │  Server        │
└───────────────┘                                └────────┬───────┘
        │                                                  │
        │ ◀─── HTML (rendered cart drawer section) ────────┘
        │
        ▼
┌───────────────┐
│  DOM Update   │ ← Cart drawer opens with new item
│  + Animation  │ ← Cart count badge updates
└───────────────┘
        │
        ▼
┌───────────────┐
│  Analytics    │ ← GA4: add_to_cart event
│  Events       │ ← Meta: AddToCart event
│               │ ← Klaviyo: Added to Cart event
└───────────────┘
```

### 13.2 Checkout Flow

```
Cart page / Cart drawer
        │
    Click "Checkout"
        │
        ▼
┌───────────────────────┐
│  Shopify Checkout     │ ← Managed entirely by Shopify
│  (multi-step)         │
│                       │
│  1. Information       │ ← Email, shipping address
│  2. Shipping          │ ← Shipping method selection
│  3. Payment           │ ← Shopify Payments / Afterpay
│                       │
└───────────┬───────────┘
            │
      Order created
            │
            ▼
┌───────────────────────┐
│  Shopify Webhooks     │
│                       │
│  orders/create ──────────▶ Klaviyo (post-purchase flow)
│                ──────────▶ GA4 (purchase event)
│                ──────────▶ Inventory update
│                       │
│  orders/fulfilled ────────▶ Klaviyo (shipping email)
│                       │
└───────────────────────┘
```

---

## 14. Environment Configuration

### 14.1 Theme Settings (`settings_schema.json`)

```json
[
  {
    "name": "Analytics",
    "settings": [
      {
        "type": "text",
        "id": "ga4_id",
        "label": "Google Analytics 4 ID",
        "info": "e.g., G-XXXXXXXXXX"
      },
      {
        "type": "text",
        "id": "meta_pixel_id",
        "label": "Meta Pixel ID"
      },
      {
        "type": "text",
        "id": "storefront_api_token",
        "label": "Storefront API Access Token",
        "info": "For AJAX features (search, recommendations)"
      }
    ]
  },
  {
    "name": "Shipping",
    "settings": [
      {
        "type": "range",
        "id": "free_shipping_threshold",
        "label": "Free Shipping Threshold ($)",
        "min": 0,
        "max": 500,
        "step": 25,
        "default": 0,
        "info": "Set to 0 if all orders ship free"
      }
    ]
  },
  {
    "name": "Social Media",
    "settings": [
      {
        "type": "url",
        "id": "social_instagram_link",
        "label": "Instagram URL"
      },
      {
        "type": "url",
        "id": "social_facebook_link",
        "label": "Facebook URL"
      },
      {
        "type": "url",
        "id": "social_tiktok_link",
        "label": "TikTok URL"
      }
    ]
  }
]
```

---

## 15. Revision Log

| Version | Date       | Changes                                          |
|---------|-----------|--------------------------------------------------|
| 1.0     | 2025-02-18 | Complete Shopify rewrite (was Supabase/PostgreSQL) |
