# EzHome — Performance Budgets (Shopify)

> Core Web Vitals targets, asset budgets, and Liquid rendering guidelines for the EzHome Shopify theme.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## 1. Core Web Vitals Targets

### 1.1 Primary Metrics

| Metric | Target    | Good       | Needs Improvement | Poor       |
|--------|----------|------------|-------------------|------------|
| **LCP**  | ≤ 1.8s   | ≤ 2.5s    | 2.5–4.0s          | > 4.0s     |
| **INP**  | ≤ 150ms  | ≤ 200ms   | 200–500ms         | > 500ms    |
| **CLS**  | ≤ 0.05   | ≤ 0.1     | 0.1–0.25          | > 0.25     |
| **FCP**  | ≤ 1.2s   | ≤ 1.8s    | 1.8–3.0s          | > 3.0s     |
| **TTFB** | ≤ 600ms  | ≤ 800ms   | 800ms–1.8s        | > 1.8s     |
| **TBT**  | ≤ 150ms  | ≤ 200ms   | 200–600ms         | > 600ms    |

### 1.2 Lighthouse Score Targets

| Category        | Target | Minimum |
|----------------|--------|---------|
| Performance     | ≥ 90   | ≥ 80    |
| Accessibility   | ≥ 95   | ≥ 90    |
| Best Practices  | ≥ 95   | ≥ 90    |
| SEO             | ≥ 95   | ≥ 90    |

### 1.3 Per-Page Targets

| Page Type       | LCP Target | FCP Target | JS Budget | CSS Budget |
|----------------|-----------|-----------|-----------|-----------|
| Homepage        | ≤ 1.8s    | ≤ 1.2s    | < 80 KB   | < 40 KB   |
| Product (PDP)   | ≤ 2.0s    | ≤ 1.4s    | < 90 KB   | < 45 KB   |
| Collection      | ≤ 1.8s    | ≤ 1.2s    | < 70 KB   | < 35 KB   |
| Cart            | ≤ 1.5s    | ≤ 1.0s    | < 60 KB   | < 30 KB   |
| Blog article    | ≤ 1.5s    | ≤ 1.0s    | < 50 KB   | < 25 KB   |
| Static page     | ≤ 1.2s    | ≤ 0.8s    | < 40 KB   | < 20 KB   |

---

## 2. Asset Budgets

### 2.1 Total Page Weight

| Metric                     | Budget      | Hard Limit  |
|---------------------------|------------|------------|
| **Total page weight**      | < 800 KB   | < 1.2 MB   |
| **HTML document**          | < 100 KB   | < 150 KB   |
| **Total CSS**              | < 60 KB    | < 80 KB    |
| **Total JavaScript**       | < 100 KB   | < 150 KB   |
| **Total images (above fold)** | < 300 KB | < 500 KB  |
| **Fonts**                  | < 80 KB    | < 120 KB   |
| **Third-party scripts**    | < 100 KB   | < 150 KB   |

*All sizes are **transferred** (compressed/gzipped).*

### 2.2 CSS Budget Breakdown

| File                        | Budget (gzip) | Purpose                     |
|----------------------------|-------------|-----------------------------|
| `base.css`                  | < 12 KB     | Reset, tokens, typography   |
| `component-*.css` (shared)  | < 8 KB      | Buttons, cards, badges      |
| Section-specific CSS (each) | < 3 KB      | Per-section styles          |
| **Total CSS per page**       | < 40 KB     | Sum of loaded CSS           |

### 2.3 JavaScript Budget Breakdown

| File                          | Budget (gzip) | Purpose                      |
|------------------------------|-------------|-------------------------------|
| `global.js`                   | < 15 KB     | Cart, navigation, utilities   |
| Section-specific JS (each)    | < 5 KB      | Per-section interactivity     |
| Third-party (Klaviyo)         | < 30 KB     | Email capture                 |
| Third-party (GA4)             | < 25 KB     | Analytics                     |
| Third-party (Meta Pixel)      | < 20 KB     | Ad tracking                   |
| Third-party (Judge.me)        | < 15 KB     | Reviews widget                |
| **Total JS per page**         | < 100 KB    | Sum of loaded JS              |

### 2.4 Font Budget

| Font                  | Weights      | Format   | Size (gzip) |
|----------------------|-------------|----------|-------------|
| Instrument Sans       | 700          | WOFF2    | ~18 KB      |
| Inter                 | 400, 500, 600 | WOFF2  | ~45 KB      |
| **Total**             |              |          | ~63 KB      |

**Font loading strategy:**
```html
<!-- Preload critical fonts -->
<link rel="preload" href="{{ 'inter-400.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ 'instrument-sans-700.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
```

```css
/* Font display swap to prevent FOIT */
@font-face {
  font-family: 'Inter';
  src: url('inter-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 2.5 Image Budget

| Image Type              | Format    | Max Size     | Max Dimensions  |
|------------------------|-----------|-------------|-----------------|
| Hero banner             | WebP/AVIF | < 150 KB    | 1920 × 1080    |
| Product main (gallery)  | WebP      | < 100 KB    | 1200 × 1200    |
| Product thumbnail       | WebP      | < 15 KB     | 400 × 400      |
| Collection card         | WebP      | < 40 KB     | 600 × 600      |
| Blog featured image     | WebP      | < 80 KB     | 1200 × 675     |
| Logo                    | SVG       | < 5 KB      | Vector          |
| Icons                   | SVG       | < 2 KB each | Vector          |

**Shopify image optimization:**
```liquid
{%- comment -%} Responsive image with srcset {%- endcomment -%}
{{ image | image_url: width: 800 | image_tag:
    srcset: image | image_url: width: 400 | append: ' 400w,' |
            append: image | image_url: width: 600 | append: ' 600w,' |
            append: image | image_url: width: 800 | append: ' 800w,' |
            append: image | image_url: width: 1200 | append: ' 1200w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    loading: 'lazy',
    width: image.width,
    height: image.height
}}
```

---

## 3. Shopify-Specific Performance Rules

### 3.1 Liquid Rendering

| Rule                                        | Target         |
|--------------------------------------------|----------------|
| Liquid render time (server-side)            | < 200ms        |
| Max Liquid loops per section                | < 50 iterations |
| Avoid nested `for` loops                    | Max 2 levels   |
| Use `{% render %}` not `{% include %}`      | Always         |
| Paginate collection products                | 12–16 per page |
| Limit metafield queries per page            | < 20           |

**Anti-patterns to avoid:**

```liquid
{%- comment -%} ❌ BAD: Nested loops with product lookups {%- endcomment -%}
{% for collection in collections %}
  {% for product in collection.products %}
    {{ product.title }}
  {% endfor %}
{% endfor %}

{%- comment -%} ✅ GOOD: Single paginated loop {%- endcomment -%}
{% paginate collection.products by 12 %}
  {% for product in collection.products %}
    {% render 'card-product', product: product %}
  {% endfor %}
{% endpaginate %}
```

### 3.2 Shopify CDN & Caching

| Asset Type       | Cache Duration | CDN Edge |
|-----------------|---------------|----------|
| CSS/JS files     | 1 year        | ✅        |
| Images           | 1 year        | ✅        |
| Fonts            | 1 year        | ✅        |
| HTML pages       | No cache      | ✅        |
| JSON API         | No cache      | ✅        |

**Shopify CDN features:**
- Automatic WebP conversion for images
- Responsive image URL generation (`| image_url: width: X`)
- Brotli/Gzip compression for text assets
- Global edge network (Fastly)

### 3.3 Script Loading Strategy

```
┌──────────────────────────────────────────────────────┐
│                   Page Load Timeline                  │
├──────┬────────┬──────────┬──────────┬────────────────┤
│ TTFB │  FCP   │   LCP    │  INP     │   Full Load    │
│      │        │          │  Ready   │                │
│ HTML │ Crit.  │ Hero     │ JS       │ Lazy images    │
│ parse│ CSS    │ image    │ hydrated │ 3rd party      │
├──────┴────────┴──────────┴──────────┴────────────────┤
│                                                      │
│  ■ Critical CSS    → <head> inline or preload        │
│  ■ Fonts           → preload (display: swap)         │
│  ■ Hero image      → preload (fetchpriority: high)   │
│  ■ global.js       → defer                           │
│  ■ Section JS      → defer + lazy load on visibility │
│  ■ Third-party     → async or load after interaction │
│  ■ Below-fold imgs → loading="lazy"                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 3.4 Third-Party Script Management

| Script           | Loading Strategy                    | Priority |
|-----------------|-------------------------------------|----------|
| Shopify analytics | `content_for_header` (required)    | Critical |
| Google Fonts      | Self-host (avoid external request) | High     |
| GA4 (`gtag.js`)   | `async` after LCP                  | Medium   |
| Meta Pixel        | Load on user interaction           | Low      |
| Klaviyo           | Load after page idle               | Low      |
| Judge.me          | Load on scroll to reviews section  | Low      |
| Live chat         | Load on user interaction (click)   | Low      |

**Defer third-party loading:**
```liquid
{%- comment -%} Load non-critical scripts after user interaction {%- endcomment -%}
<script>
  const loadThirdParty = () => {
    // GA4
    const ga = document.createElement('script');
    ga.src = 'https://www.googletagmanager.com/gtag/js?id={{ settings.ga4_id }}';
    ga.async = true;
    document.head.appendChild(ga);

    // Remove listener after first interaction
    ['mouseover', 'touchstart', 'scroll', 'keydown'].forEach(event =>
      document.removeEventListener(event, loadThirdParty)
    );
  };
  ['mouseover', 'touchstart', 'scroll', 'keydown'].forEach(event =>
    document.addEventListener(event, loadThirdParty, { once: true, passive: true })
  );
</script>
```

---

## 4. Image Optimization Rules

### 4.1 Shopify Image Best Practices

| Rule                                          | Implementation                          |
|----------------------------------------------|-----------------------------------------|
| Always use `image_url` filter                 | Never hardcode image URLs               |
| Always set `width` and `height`               | Prevents CLS                            |
| Use `loading="lazy"` for below-fold           | Native lazy loading                     |
| Use `fetchpriority="high"` for LCP image      | Prioritize hero/product image           |
| Use `srcset` with multiple widths             | Serve right size per viewport           |
| Prefer WebP (auto via Shopify CDN)            | ~30% smaller than JPEG                  |

### 4.2 LCP Image Optimization

```liquid
{%- comment -%} Hero banner — LCP candidate {%- endcomment -%}
{%- assign hero_image = section.settings.background_image -%}
{%- if hero_image != blank -%}
  <link rel="preload" as="image"
    href="{{ hero_image | image_url: width: 1200 }}"
    imagesrcset="
      {{ hero_image | image_url: width: 600 }} 600w,
      {{ hero_image | image_url: width: 900 }} 900w,
      {{ hero_image | image_url: width: 1200 }} 1200w,
      {{ hero_image | image_url: width: 1800 }} 1800w"
    imagesizes="100vw">

  <img
    src="{{ hero_image | image_url: width: 1200 }}"
    srcset="
      {{ hero_image | image_url: width: 600 }} 600w,
      {{ hero_image | image_url: width: 900 }} 900w,
      {{ hero_image | image_url: width: 1200 }} 1200w,
      {{ hero_image | image_url: width: 1800 }} 1800w"
    sizes="100vw"
    width="{{ hero_image.width }}"
    height="{{ hero_image.height }}"
    alt="{{ hero_image.alt | escape }}"
    fetchpriority="high"
    loading="eager">
{%- endif -%}
```

---

## 5. Performance Monitoring

### 5.1 Tools & Cadence

| Tool                         | Frequency       | Owner       |
|-----------------------------|----------------|-------------|
| Shopify Speed Report          | Weekly (auto)  | Dev team    |
| Lighthouse CI (GitHub Action) | Every PR       | Automated   |
| Google PageSpeed Insights     | Bi-weekly      | Dev team    |
| Chrome UX Report (CrUX)      | Monthly        | Dev team    |
| Shopify Theme Inspector       | Per feature    | Developer   |
| WebPageTest                   | Monthly        | Dev team    |
| Real User Monitoring (GA4)    | Continuous     | Automated   |

### 5.2 Lighthouse CI Configuration

```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.80 }],
        "categories:accessibility": ["error", { "minScore": 0.90 }],
        "categories:best-practices": ["error", { "minScore": 0.90 }],
        "categories:seo": ["error", { "minScore": 0.90 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 200 }],
        "interactive": ["warn", { "maxNumericValue": 3500 }]
      }
    }
  }
}
```

### 5.3 Performance Regression Alerts

| Trigger                              | Action                           |
|-------------------------------------|----------------------------------|
| LCP increases > 500ms               | Block PR merge                   |
| Lighthouse Performance drops < 80    | Block PR merge                   |
| CLS > 0.15                          | Block PR merge                   |
| New third-party script > 30 KB      | Require team review              |
| Total page weight > 1 MB            | Require optimization plan        |
| JS bundle > 150 KB (compressed)     | Code review + tree shaking audit |

---

## 6. CLS Prevention Checklist

| Element              | Prevention Strategy                                    |
|---------------------|-------------------------------------------------------|
| Images               | Always set `width` + `height` attributes              |
| Fonts                | `font-display: swap` + `size-adjust` fallback         |
| Embeds/iframes       | Set explicit dimensions via `aspect-ratio`             |
| Dynamic content      | Reserve space with `min-height` on containers         |
| Announcement bar     | Fixed height, no dynamic resizing                     |
| Cart drawer          | Overlay pattern (doesn't shift content)               |
| Sticky header        | `position: sticky` with defined height                |
| Product images       | `aspect-ratio: 1/1` container                         |

---

## 7. Shopify-Specific Optimizations

### 7.1 Reduce `content_for_header` Impact

Shopify injects ~20 KB of scripts via `content_for_header`. Mitigation:
- Minimize additional scripts in `<head>`
- Use Shopify Web Pixels (sandboxed) instead of theme-injected scripts
- Move custom analytics to Web Pixel extensions

### 7.2 Section Rendering API for SPA-like UX

Use Shopify's Section Rendering API to avoid full page reloads:

```javascript
// Partial page update (e.g., after add to cart)
async function refreshSection(sectionId) {
  const url = `${window.location.pathname}?sections=${sectionId}`;
  const response = await fetch(url);
  const data = await response.json();
  const container = document.querySelector(`[data-section-id="${sectionId}"]`);
  if (container && data[sectionId]) {
    container.outerHTML = data[sectionId];
  }
}
```

### 7.3 Preloading Strategy

```liquid
{%- comment -%} Preload priorities {%- endcomment -%}

{%- comment -%} 1. Critical CSS (inline or preload) {%- endcomment -%}
<link rel="preload" href="{{ 'base.css' | asset_url }}" as="style">

{%- comment -%} 2. Fonts {%- endcomment -%}
<link rel="preload" href="{{ 'inter-400.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>

{%- comment -%} 3. LCP image (template-specific) {%- endcomment -%}
{%- if template.name == 'index' -%}
  {%- assign lcp_image = sections['hero'].settings.background_image -%}
  {%- if lcp_image -%}
    <link rel="preload" as="image" href="{{ lcp_image | image_url: width: 1200 }}">
  {%- endif -%}
{%- endif -%}

{%- comment -%} 4. DNS prefetch for third parties {%- endcomment -%}
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://connect.facebook.net">
<link rel="dns-prefetch" href="https://static.klaviyo.com">
```

---

## 8. Performance Budget Enforcement

### 8.1 Pre-Commit Checks

```bash
# Check Liquid file sizes (theme check)
shopify theme check --fail-level error

# Check asset sizes
find assets/ -name '*.css' -exec sh -c 'gzip -c "$1" | wc -c' _ {} \; | \
  awk '{total+=$1} END {print "Total CSS (gzip): " total " bytes"}'

find assets/ -name '*.js' -exec sh -c 'gzip -c "$1" | wc -c' _ {} \; | \
  awk '{total+=$1} END {print "Total JS (gzip): " total " bytes"}'
```

### 8.2 Dashboard Thresholds

| Metric                    | 🟢 Green    | 🟡 Yellow     | 🔴 Red       |
|--------------------------|------------|--------------|-------------|
| Lighthouse Performance    | ≥ 90       | 80–89        | < 80        |
| LCP (75th percentile)    | ≤ 2.0s     | 2.0–2.5s     | > 2.5s      |
| INP (75th percentile)    | ≤ 200ms    | 200–300ms    | > 300ms     |
| CLS (75th percentile)    | ≤ 0.1      | 0.1–0.15     | > 0.15      |
| Total page weight        | < 800 KB   | 800 KB–1 MB  | > 1 MB      |
| Third-party JS           | < 100 KB   | 100–150 KB   | > 150 KB    |
| Liquid render time       | < 200ms    | 200–400ms    | > 400ms     |

---

## 9. Revision Log

| Version | Date       | Changes                |
|---------|-----------|------------------------|
| 1.0     | 2025-02-18 | Initial Shopify version |
