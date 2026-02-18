# EzHome — SEO Structure (Shopify)

> URL strategy, structured data, meta tags, and content optimization for the EzHome Shopify store.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## 1. URL Architecture

### 1.1 Shopify URL Conventions

Shopify auto-generates URLs from resource handles. All URLs are lowercase, hyphenated, and immutable once created.

| Page Type             | URL Pattern                              | Example                                   |
|----------------------|-----------------------------------------|-------------------------------------------|
| Homepage              | `/`                                     | `ezhome.com/`                             |
| Product               | `/products/{handle}`                    | `/products/luna-3-seater-sofa`            |
| Collection            | `/collections/{handle}`                 | `/collections/sofas`                      |
| Collection + product  | `/collections/{coll}/products/{prod}`   | `/collections/sofas/products/luna-3-seater-sofa` |
| Page                  | `/pages/{handle}`                       | `/pages/about`                            |
| Blog                  | `/blogs/{blog-handle}`                  | `/blogs/journal`                          |
| Article               | `/blogs/{blog}/{article-handle}`        | `/blogs/journal/10-minute-sofa-setup`     |
| Cart                  | `/cart`                                 | `/cart`                                   |
| Search                | `/search?q={query}`                     | `/search?q=3+seater+sofa`                |
| Account               | `/account`                              | `/account`                                |
| Login                 | `/account/login`                        | `/account/login`                          |
| Collections list      | `/collections`                          | `/collections`                            |

### 1.2 Handle Best Practices

| Rule                              | Example                                    |
|----------------------------------|--------------------------------------------|
| Keep handles short and descriptive | `luna-3-seater-sofa` ✅ not `luna-modern-compression-foam-3-seater-living-room-sofa-grey` ❌ |
| Include primary keyword           | `compression-sofa` in handle               |
| No stop words unless needed       | `3-seater-sofa` not `the-3-seater-sofa`    |
| Match product name closely        | Product "Luna 3-Seater" → `luna-3-seater-sofa` |
| Never change handles after publish | URL changes break links and SEO            |

### 1.3 Canonical URLs

Shopify auto-generates canonical URLs. Key rules:

```liquid
{%- comment -%} Shopify handles canonicalization automatically {%- endcomment -%}
{%- comment -%} /collections/sofas/products/luna-3-seater-sofa → canonical: /products/luna-3-seater-sofa {%- endcomment -%}

{%- comment -%} Verify in meta-tags snippet: {%- endcomment -%}
<link rel="canonical" href="{{ canonical_url }}">
```

| Scenario                                    | Canonical URL                        |
|--------------------------------------------|--------------------------------------|
| Product via collection path                 | `/products/{handle}` (not collection path) |
| Paginated collection (`?page=2`)            | Self-referencing with `?page=2`      |
| Search results                              | `/search?q={query}`                  |
| Filtered collection                         | Base collection URL (no filters)     |

---

## 2. Meta Tags

### 2.1 Meta Tag Snippet (`snippets/meta-tags.liquid`)

```liquid
{%- comment -%} Title tag {%- endcomment -%}
<title>{{ page_title }}{% unless page_title contains shop.name %} — {{ shop.name }}{% endunless %}</title>

{%- comment -%} Meta description {%- endcomment -%}
{%- if page_description != blank -%}
  <meta name="description" content="{{ page_description | escape }}">
{%- endif -%}

{%- comment -%} Canonical {%- endcomment -%}
<link rel="canonical" href="{{ canonical_url }}">

{%- comment -%} Pagination {%- endcomment -%}
{%- if paginate -%}
  {%- if paginate.previous -%}
    <link rel="prev" href="{{ paginate.previous.url }}">
  {%- endif -%}
  {%- if paginate.next -%}
    <link rel="next" href="{{ paginate.next.url }}">
  {%- endif -%}
{%- endif -%}

{%- comment -%} Robots {%- endcomment -%}
{%- if template.name == 'search' or template.name == 'cart' -%}
  <meta name="robots" content="noindex, follow">
{%- endif -%}

{%- comment -%} Open Graph {%- endcomment -%}
<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:title" content="{{ page_title | escape }}">
<meta property="og:description" content="{{ page_description | escape }}">
<meta property="og:type" content="{% if template.name == 'product' %}product{% elsif template.name == 'article' %}article{% else %}website{% endif %}">
{%- if page_image -%}
  <meta property="og:image" content="https:{{ page_image | image_url: width: 1200 }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
{%- endif -%}

{%- comment -%} Twitter Card {%- endcomment -%}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ page_title | escape }}">
<meta name="twitter:description" content="{{ page_description | escape }}">
{%- if page_image -%}
  <meta name="twitter:image" content="https:{{ page_image | image_url: width: 1200 }}">
{%- endif -%}

{%- comment -%} Product-specific OG tags {%- endcomment -%}
{%- if template.name == 'product' -%}
  <meta property="og:price:amount" content="{{ product.selected_or_first_available_variant.price | money_without_currency }}">
  <meta property="og:price:currency" content="{{ cart.currency.iso_code }}">
  <meta property="product:availability" content="{% if product.available %}in stock{% else %}out of stock{% endif %}">
{%- endif -%}
```

### 2.2 Title Tag Templates

| Page Type        | Title Format                                          | Example                                              |
|-----------------|-------------------------------------------------------|------------------------------------------------------|
| Homepage         | `{shop_name} — {tagline}`                            | `EzHome — Sofa In A Box. Built In 10 Minutes.`      |
| Product          | `{product_title} — {shop_name}`                      | `Luna 3-Seater Sofa — EzHome`                       |
| Collection       | `{collection_title} — {shop_name}`                   | `Compression Sofas — EzHome`                         |
| Page             | `{page_title} — {shop_name}`                         | `About Us — EzHome`                                  |
| Blog index       | `{blog_title} — {shop_name}`                         | `The EzHome Journal — EzHome`                        |
| Article          | `{article_title} — {blog_title} — {shop_name}`      | `10-Minute Setup Guide — Journal — EzHome`           |
| Search           | `Search results for "{query}" — {shop_name}`         | `Search results for "3 seater" — EzHome`             |
| 404              | `Page Not Found — {shop_name}`                       | `Page Not Found — EzHome`                            |

**Character limits:** Title < 60 chars; Description 120–155 chars.

### 2.3 Meta Description Templates

| Page Type   | Template                                                                            |
|------------|------------------------------------------------------------------------------------|
| Homepage    | "Compression sofas & beds delivered to your door. Tool-free assembly in 10 minutes. Free shipping. 5-year warranty." |
| Product     | "{product_title} — {short_description}. Fits in a box, assembles in 10 minutes. Free shipping. Shop now at EzHome." |
| Collection  | "Shop {collection_title} at EzHome. Premium compression furniture — lightweight, tool-free assembly, delivered in days." |
| Blog        | "Tips, guides & inspiration from EzHome. Learn about furniture assembly, home styling & more." |
| FAQ         | "Frequently asked questions about EzHome compression sofas & beds. Shipping, returns, warranty & assembly info." |

---

## 3. Structured Data (JSON-LD)

### 3.1 JSON-LD Snippet (`snippets/json-ld.liquid`)

```liquid
{%- comment -%} Organization (all pages) {%- endcomment -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{ shop.name }}",
  "url": "{{ shop.url }}",
  "logo": "{{ 'logo.svg' | asset_url | prepend: 'https:' }}",
  "sameAs": [
    "{{ settings.social_instagram_link }}",
    "{{ settings.social_facebook_link }}",
    "{{ settings.social_tiktok_link }}"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "hello@ezhome.com",
    "availableLanguage": "English"
  }
}
</script>

{%- comment -%} WebSite + SearchAction (homepage) {%- endcomment -%}
{%- if template.name == 'index' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ shop.name }}",
  "url": "{{ shop.url }}",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{{ shop.url }}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
{%- endif -%}

{%- comment -%} Product (PDP) {%- endcomment -%}
{%- if template.name == 'product' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.title | escape }}",
  "description": "{{ product.description | strip_html | truncate: 200 | escape }}",
  "url": "{{ shop.url }}{{ product.url }}",
  "image": [
    {%- for image in product.images limit: 5 -%}
      "https:{{ image | image_url: width: 1200 }}"{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ],
  "brand": {
    "@type": "Brand",
    "name": "{{ shop.name }}"
  },
  "sku": "{{ product.selected_or_first_available_variant.sku }}",
  "gtin": "{{ product.selected_or_first_available_variant.barcode }}",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "{{ product.price_min | money_without_currency }}",
    "highPrice": "{{ product.price_max | money_without_currency }}",
    "priceCurrency": "{{ cart.currency.iso_code }}",
    "availability": "https://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}",
    "offerCount": {{ product.variants.size }},
    "url": "{{ shop.url }}{{ product.url }}",
    "seller": {
      "@type": "Organization",
      "name": "{{ shop.name }}"
    }
  }
  {%- comment -%} Reviews (if using Judge.me or similar) {%- endcomment -%}
  {%- if product.metafields.reviews.rating.value != blank -%}
  ,"aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ product.metafields.reviews.rating.value.rating }}",
    "reviewCount": "{{ product.metafields.reviews.rating_count.value }}",
    "bestRating": "5",
    "worstRating": "1"
  }
  {%- endif -%}
}
</script>
{%- endif -%}

{%- comment -%} BreadcrumbList (all pages except homepage) {%- endcomment -%}
{%- unless template.name == 'index' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{ shop.url }}"
    }
    {%- if template.name == 'product' -%}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": "{{ product.collections.first.title | default: 'Products' | escape }}",
      "item": "{{ shop.url }}{{ product.collections.first.url | default: '/collections/all' }}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{ product.title | escape }}",
      "item": "{{ shop.url }}{{ product.url }}"
    }
    {%- elsif template.name == 'collection' -%}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": "{{ collection.title | escape }}",
      "item": "{{ shop.url }}{{ collection.url }}"
    }
    {%- elsif template.name == 'article' -%}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": "{{ blog.title | escape }}",
      "item": "{{ shop.url }}{{ blog.url }}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{ article.title | escape }}",
      "item": "{{ shop.url }}{{ article.url }}"
    }
    {%- elsif template.name == 'page' -%}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": "{{ page.title | escape }}",
      "item": "{{ shop.url }}{{ page.url }}"
    }
    {%- elsif template.name == 'blog' -%}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": "{{ blog.title | escape }}",
      "item": "{{ shop.url }}{{ blog.url }}"
    }
    {%- endif -%}
  ]
}
</script>
{%- endunless -%}

{%- comment -%} Article (blog post) {%- endcomment -%}
{%- if template.name == 'article' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{ article.title | escape }}",
  "description": "{{ article.excerpt_or_content | strip_html | truncate: 200 | escape }}",
  "image": "https:{{ article.image | image_url: width: 1200 }}",
  "datePublished": "{{ article.published_at | date: '%Y-%m-%dT%H:%M:%S%z' }}",
  "dateModified": "{{ article.updated_at | date: '%Y-%m-%dT%H:%M:%S%z' }}",
  "author": {
    "@type": "Person",
    "name": "{{ article.author }}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ shop.name }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ 'logo.svg' | asset_url | prepend: 'https:' }}"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ shop.url }}{{ article.url }}"
  }
}
</script>
{%- endif -%}

{%- comment -%} FAQPage (FAQ template) {%- endcomment -%}
{%- if template.suffix == 'faq' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {%- for block in section.blocks -%}
      {%- if block.type == 'question' -%}
      {
        "@type": "Question",
        "name": "{{ block.settings.question | escape }}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "{{ block.settings.answer | escape }}"
        }
      }{% unless forloop.last %},{% endunless %}
      {%- endif -%}
    {%- endfor -%}
  ]
}
</script>
{%- endif -%}

{%- comment -%} CollectionPage {%- endcomment -%}
{%- if template.name == 'collection' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{ collection.title | escape }}",
  "description": "{{ collection.description | strip_html | truncate: 200 | escape }}",
  "url": "{{ shop.url }}{{ collection.url }}"
}
</script>
{%- endif -%}
```

### 3.2 Structured Data Summary

| Schema Type         | Page                  | Rich Result                  |
|--------------------|----------------------|------------------------------|
| `Organization`      | All pages            | Knowledge panel              |
| `WebSite`           | Homepage             | Sitelinks search box         |
| `Product`           | Product pages        | Product rich snippets (price, availability, rating) |
| `BreadcrumbList`    | All (except home)    | Breadcrumb trail in SERPs    |
| `Article`           | Blog articles        | Article rich snippets        |
| `FAQPage`           | FAQ page             | FAQ rich results             |
| `CollectionPage`    | Collection pages     | (No specific rich result)    |

---

## 4. Sitemap & Robots

### 4.1 Sitemap

Shopify auto-generates `sitemap.xml` at `ezhome.com/sitemap.xml`.

**Included automatically:**
- All published products
- All collections
- All pages
- All blog articles
- Homepage

**Not included (by design):**
- Customer account pages
- Cart page
- Search results
- Checkout pages

### 4.2 Robots.txt

Shopify auto-generates `robots.txt`. Custom rules can be added via `robots.txt.liquid` (Shopify 2021+):

```liquid
{%- comment -%} templates/robots.txt.liquid {%- endcomment -%}
User-agent: *
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /account
Disallow: /*?variant=*
Disallow: /search
Allow: /search/

Sitemap: {{ shop.url }}/sitemap.xml

{%- comment -%} Additional custom rules {%- endcomment -%}
Disallow: /collections/*+*     {%- comment -%} Filtered collections {%- endcomment -%}
Disallow: /collections/*%2B*   {%- comment -%} Encoded filter URLs {%- endcomment -%}
Disallow: /collections/*?sort_by=*  {%- comment -%} Sorted collections {%- endcomment -%}
```

---

## 5. Internal Linking Strategy

### 5.1 Navigation Structure

```
Main Navigation:
├── Shop
│   ├── Sofas            → /collections/sofas
│   ├── Beds             → /collections/beds
│   ├── Best Sellers     → /collections/best-sellers
│   └── All Products     → /collections/all
├── About                → /pages/about
├── Assembly Guide       → /pages/assembly-guide
├── Blog                 → /blogs/journal
└── FAQ                  → /pages/faq

Footer Navigation:
├── Shop
│   ├── Sofas, Beds, All Products
├── Help
│   ├── FAQ, Contact, Shipping & Returns
├── Company
│   ├── About, Blog, Warranty
└── Legal
    ├── Privacy Policy, Terms of Service, Refund Policy
```

### 5.2 Breadcrumbs

Rendered on all pages except homepage:

```liquid
{%- comment -%} snippets/breadcrumbs.liquid {%- endcomment -%}
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/" itemprop="item"><span itemprop="name">Home</span></a>
      <meta itemprop="position" content="1">
    </li>

    {%- if template.name == 'product' -%}
      {%- if collection -%}
        <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="{{ collection.url }}" itemprop="item"><span itemprop="name">{{ collection.title }}</span></a>
          <meta itemprop="position" content="2">
        </li>
      {%- endif -%}
      <li class="breadcrumb__item breadcrumb__item--active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
        <span itemprop="name">{{ product.title }}</span>
        <meta itemprop="position" content="3">
      </li>
    {%- elsif template.name == 'collection' -%}
      <li class="breadcrumb__item breadcrumb__item--active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
        <span itemprop="name">{{ collection.title }}</span>
        <meta itemprop="position" content="2">
      </li>
    {%- elsif template.name == 'page' -%}
      <li class="breadcrumb__item breadcrumb__item--active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
        <span itemprop="name">{{ page.title }}</span>
        <meta itemprop="position" content="2">
      </li>
    {%- elsif template.name == 'article' -%}
      <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="{{ blog.url }}" itemprop="item"><span itemprop="name">{{ blog.title }}</span></a>
        <meta itemprop="position" content="2">
      </li>
      <li class="breadcrumb__item breadcrumb__item--active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
        <span itemprop="name">{{ article.title }}</span>
        <meta itemprop="position" content="3">
      </li>
    {%- endif -%}
  </ol>
</nav>
```

### 5.3 Cross-Linking Opportunities

| From                | To                          | Method                              |
|--------------------|-----------------------------|-------------------------------------|
| Product page        | Related products             | Shopify recommendations API         |
| Product page        | Assembly guide               | Tab or CTA section                  |
| Collection page     | Product quiz                 | CTA banner at bottom                |
| Blog article        | Related products             | Inline product cards                |
| Blog article        | Related articles             | "More from the blog" section        |
| FAQ page            | Contact page                 | "Still need help?" CTA              |
| Homepage            | Collections                  | Featured collection section         |
| Homepage            | Blog                         | Latest posts section                |
| Cart page           | Complementary products       | Cart upsell section                 |

---

## 6. Content SEO Guidelines

### 6.1 Product Page Content

| Element                  | Guideline                                              |
|-------------------------|--------------------------------------------------------|
| Product title            | Primary keyword + variant descriptor (< 60 chars)     |
| Product description      | 150–300 words, unique per product, benefit-focused     |
| Image alt text           | Descriptive, include product name + color/variant      |
| Meta title               | `{Product Name} — EzHome` (< 60 chars)                |
| Meta description         | Unique, include CTA and key selling point (120–155 chars) |
| URL handle               | Short, keyword-rich, hyphenated                        |

**Example product alt text:**
```
✅ "Luna 3-Seater Compression Sofa in Sage Green — front view"
✅ "Luna Sofa unboxing — compressed in packaging box"
❌ "IMG_4521"
❌ "sofa"
❌ "product image"
```

### 6.2 Collection Page Content

| Element                  | Guideline                                              |
|-------------------------|--------------------------------------------------------|
| Collection title         | Category keyword (e.g., "Compression Sofas")          |
| Collection description   | 100–200 words, above the product grid                 |
| SEO title                | `{Category} — Shop {Brand}` (< 60 chars)              |
| SEO description          | Unique, mention product range and benefits              |

### 6.3 Blog Content Strategy

| Content Pillar          | Topics                                            | Target Keywords                        |
|------------------------|---------------------------------------------------|----------------------------------------|
| Assembly & Setup        | Setup guides, tips, time-lapses                   | "sofa assembly", "furniture setup"     |
| Home Styling            | Room styling, color coordination, small spaces    | "small space sofa", "apartment furniture" |
| Product Deep-Dives      | Material science, foam technology, durability     | "compression foam sofa", "sofa in a box" |
| Lifestyle               | Moving tips, first apartment, dorm life           | "dorm furniture", "easy-move furniture" |
| Sustainability          | Materials sourcing, packaging, CertiPUR-US        | "sustainable furniture", "eco sofa"    |

**Publishing cadence:** 2–4 articles per month.

### 6.4 Heading Hierarchy

Every page must have a single `<h1>` and logical heading structure:

| Page Type    | H1                          | H2 (typical)                              |
|-------------|-----------------------------|--------------------------------------------|
| Homepage     | "Sofa In A Box…" (hero)    | Section headings                           |
| Product      | Product title               | "Specifications", "Reviews", "Assembly"    |
| Collection   | Collection title            | (Product cards use H3)                     |
| Blog index   | Blog title                  | Article titles (H2)                        |
| Article      | Article title               | Content subheadings                        |
| FAQ          | "Frequently Asked Questions"| Category headings                          |

---

## 7. Technical SEO Checklist

### 7.1 On-Page

- [ ] Every page has unique `<title>` tag (< 60 chars)
- [ ] Every page has unique `<meta description>` (120–155 chars)
- [ ] Single `<h1>` per page
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] All images have descriptive `alt` attributes
- [ ] All images have `width` and `height` attributes
- [ ] Canonical URL on every page
- [ ] Hreflang tags (if multi-language, future)
- [ ] No broken internal links
- [ ] Clean URL structure (no query params in canonical)

### 7.2 Structured Data

- [ ] `Organization` schema on all pages
- [ ] `WebSite` + `SearchAction` on homepage
- [ ] `Product` schema on all PDPs (price, availability, rating)
- [ ] `BreadcrumbList` on all inner pages
- [ ] `Article` schema on all blog posts
- [ ] `FAQPage` schema on FAQ page
- [ ] Validated via Google Rich Results Test

### 7.3 Technical

- [ ] SSL enabled (Shopify default)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] `robots.txt` configured correctly
- [ ] No orphan pages (every page reachable from navigation)
- [ ] 301 redirects for any URL changes (Shopify admin → Navigation → URL Redirects)
- [ ] Page load < 3s on mobile (3G)
- [ ] Mobile-friendly (responsive theme)
- [ ] Core Web Vitals passing (see 08-performance-budgets.md)

### 7.4 Shopify-Specific

- [ ] Collection filtering doesn't create indexable duplicate URLs
- [ ] Pagination uses `rel="prev"` / `rel="next"`
- [ ] Product variants don't create separate indexed pages
- [ ] `?variant=` URLs blocked in robots.txt
- [ ] Theme uses `{{ content_for_header }}` (required for Shopify analytics)
- [ ] JSON-LD not duplicated (single source of truth in `json-ld` snippet)

---

## 8. Google Search Console Setup

### 8.1 Verification

```
Method: DNS TXT record or HTML tag via Shopify admin
→ Online Store → Preferences → Google Search Console verification
```

### 8.2 Post-Launch Actions

| Action                           | Timeline        |
|---------------------------------|----------------|
| Submit sitemap                   | Day 1           |
| Verify all page types indexed    | Week 1          |
| Check for crawl errors           | Week 1          |
| Monitor Core Web Vitals          | Ongoing         |
| Submit URL removals (if needed)  | As needed       |
| Review search performance        | Weekly          |
| Check mobile usability           | Monthly         |
| Validate structured data         | After changes   |

---

## 9. Keyword Targeting (Primary Pages)

| Page                     | Primary Keyword                  | Secondary Keywords                                |
|-------------------------|----------------------------------|---------------------------------------------------|
| Homepage                 | compression sofa                 | sofa in a box, easy assembly sofa                 |
| Sofas Collection         | compression sofas                | box sofa, flat pack sofa, tool-free sofa          |
| Beds Collection          | compression bed                  | bed in a box, easy setup bed                      |
| Luna 3-Seater (product)  | 3 seater compression sofa        | luna sofa, 3 person sofa in a box                 |
| About page               | EzHome brand                     | compression furniture company                     |
| Assembly Guide           | sofa assembly instructions       | how to set up compression sofa, 10 minute setup   |
| FAQ                      | compression sofa FAQ             | sofa in a box questions, assembly FAQ             |
| Blog (hub)               | furniture tips                   | home setup, apartment furniture guide             |

---

## 10. Social Sharing Optimization

### 10.1 Open Graph Images

| Page Type        | OG Image Specs                                    |
|-----------------|---------------------------------------------------|
| Homepage         | Brand hero image (1200 × 630)                     |
| Product          | Primary product photo (1200 × 630)                |
| Collection       | Collection banner image (1200 × 630)              |
| Blog article     | Featured image (1200 × 630)                       |
| Default fallback | EzHome branded OG image with logo                 |

### 10.2 Social Snippet Preview

```
┌─────────────────────────────────────────┐
│  ┌─────────────────────────────────┐    │
│  │       [OG Image 1200×630]      │    │
│  └─────────────────────────────────┘    │
│  ezhome.com                             │
│  Luna 3-Seater Sofa — EzHome            │
│  Compression-packed sofa that fits in   │
│  a box. Tool-free assembly in 10 min... │
└─────────────────────────────────────────┘
```

---

## 11. Revision Log

| Version | Date       | Changes                |
|---------|-----------|------------------------|
| 1.0     | 2025-02-18 | Initial Shopify version |
