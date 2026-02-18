# EzHome — Page Templates (Shopify Online Store 2.0)

> JSON templates, Liquid layouts, and section assignments for the EzHome Shopify theme.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## 1. Theme Architecture Overview

```
theme/
├── layout/
│   ├── theme.liquid            ← Master layout (header + footer + cart drawer)
│   └── password.liquid         ← Password / coming-soon layout
├── templates/
│   ├── index.json              ← Homepage
│   ├── product.json            ← Product detail page (PDP)
│   ├── product.assembly.json   ← Alternate PDP with assembly focus
│   ├── collection.json         ← Collection / category page
│   ├── collection.all.json     ← "All Products" collection
│   ├── page.json               ← Default static page
│   ├── page.about.json         ← About Us
│   ├── page.contact.json       ← Contact / support page
│   ├── page.faq.json           ← FAQ page
│   ├── page.assembly.json      ← Assembly guide landing page
│   ├── blog.json               ← Blog index
│   ├── article.json            ← Single blog article
│   ├── cart.json                ← Cart page (fallback)
│   ├── search.json             ← Search results
│   ├── list-collections.json   ← Collections index
│   ├── customers/
│   │   ├── account.json        ← Customer dashboard
│   │   ├── order.json          ← Order detail
│   │   ├── login.json          ← Login
│   │   ├── register.json       ← Registration
│   │   ├── addresses.json      ← Address management
│   │   ├── reset_password.json ← Password reset
│   │   └── activate_account.json ← Account activation
│   ├── 404.json                ← Not found
│   └── gift_card.liquid        ← Gift card (required Liquid)
└── sections/
    └── (see 05-component-inventory.md)
```

**Template Count: 25** (18 JSON + 6 customer JSON + 1 Liquid gift_card)

---

## 2. Layout: `theme.liquid`

The master layout wraps all page content.

### Structure

```liquid
<!DOCTYPE html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page_title }}{% unless page_title contains shop.name %} — {{ shop.name }}{% endunless %}</title>
  <meta name="description" content="{{ page_description | escape }}">

  {%- comment -%} Preloads & Critical CSS {%- endcomment -%}
  {{ 'base.css' | asset_url | stylesheet_tag: preload: true }}
  {{ 'component-*.css' | asset_url | stylesheet_tag }}

  {%- comment -%} SEO & Social Meta {%- endcomment -%}
  {% render 'meta-tags' %}
  {% render 'json-ld' %}

  {%- comment -%} Shopify Required {%- endcomment -%}
  {{ content_for_header }}
</head>
<body class="template-{{ template.name }}{% if template.suffix %} template-{{ template.name }}-{{ template.suffix }}{% endif %}">
  <a href="#main-content" class="skip-to-content">Skip to content</a>

  {%- section 'announcement-bar' -%}
  {%- section 'header' -%}
  {%- section 'cart-drawer' -%}

  <main id="main-content" role="main">
    {{ content_for_layout }}
  </main>

  {%- section 'footer' -%}

  {%- comment -%} Deferred JS {%- endcomment -%}
  <script src="{{ 'global.js' | asset_url }}" defer></script>
</body>
</html>
```

### Key Layout Sections (always rendered)

| Section              | Purpose                         | Type      |
|---------------------|---------------------------------|-----------|
| `announcement-bar`  | Promo ribbon (free shipping)    | Static    |
| `header`            | Logo + nav + cart icon          | Static    |
| `cart-drawer`       | Slide-out cart                  | Static    |
| `footer`            | Links, newsletter, social       | Static    |

---

## 3. Template Definitions

### 3.1 Homepage — `index.json`

```json
{
  "sections": {
    "hero": {
      "type": "hero-banner",
      "settings": {
        "heading": "Sofa In A Box. Built In 10 Minutes.",
        "subheading": "Compression-packed, tool-free assembly.",
        "cta_text": "Shop Now",
        "cta_url": "/collections/all",
        "background_video": "",
        "background_image": ""
      }
    },
    "value-props": {
      "type": "value-propositions",
      "settings": {
        "heading": "Why EzHome?"
      },
      "blocks": {
        "block-1": { "type": "value_prop", "settings": { "icon": "box", "title": "Fits In Your Car", "text": "Compressed to 1/5th the size" }},
        "block-2": { "type": "value_prop", "settings": { "icon": "clock", "title": "10-Min Setup", "text": "No tools. No stress." }},
        "block-3": { "type": "value_prop", "settings": { "icon": "truck", "title": "Free Shipping", "text": "Delivered to your door" }},
        "block-4": { "type": "value_prop", "settings": { "icon": "shield", "title": "5-Year Warranty", "text": "Built to last" }}
      },
      "block_order": ["block-1", "block-2", "block-3", "block-4"]
    },
    "featured-collection": {
      "type": "featured-collection",
      "settings": {
        "heading": "Best Sellers",
        "collection": "best-sellers",
        "products_to_show": 4,
        "show_view_all": true
      }
    },
    "before-after": {
      "type": "before-after-slider",
      "settings": {
        "heading": "See The Transformation",
        "before_label": "In the box",
        "after_label": "Fully assembled"
      }
    },
    "testimonials": {
      "type": "testimonials-carousel",
      "settings": {
        "heading": "What Customers Say"
      },
      "blocks": {
        "review-1": { "type": "testimonial", "settings": { "quote": "", "author": "", "rating": 5 }},
        "review-2": { "type": "testimonial", "settings": { "quote": "", "author": "", "rating": 5 }},
        "review-3": { "type": "testimonial", "settings": { "quote": "", "author": "", "rating": 5 }}
      },
      "block_order": ["review-1", "review-2", "review-3"]
    },
    "assembly-cta": {
      "type": "image-with-text",
      "settings": {
        "heading": "10 Minutes. Zero Tools.",
        "text": "Watch how easy it is to set up your EzHome sofa.",
        "cta_text": "Watch Video",
        "cta_url": "/pages/assembly-guide",
        "image_position": "left"
      }
    },
    "instagram-feed": {
      "type": "instagram-feed",
      "settings": {
        "heading": "#MyEzHome",
        "posts_to_show": 6
      }
    },
    "newsletter": {
      "type": "newsletter-signup",
      "settings": {
        "heading": "Join The EzHome Family",
        "subtext": "Get early access, assembly tips & exclusive deals.",
        "button_text": "Subscribe"
      }
    }
  },
  "order": [
    "hero",
    "value-props",
    "featured-collection",
    "before-after",
    "testimonials",
    "assembly-cta",
    "instagram-feed",
    "newsletter"
  ]
}
```

**Section count:** 8

---

### 3.2 Product Detail Page — `product.json`

```json
{
  "sections": {
    "main-product": {
      "type": "main-product",
      "settings": {
        "enable_sticky_info": true,
        "show_vendor": false,
        "show_sku": false,
        "show_share": true,
        "media_layout": "gallery",
        "enable_video_autoplay": false
      },
      "blocks": {
        "title": { "type": "@app" },
        "price": { "type": "price", "settings": {} },
        "variant-picker": { "type": "variant_picker", "settings": { "picker_type": "button" }},
        "quantity": { "type": "quantity_selector", "settings": {} },
        "buy-buttons": { "type": "buy_buttons", "settings": { "show_dynamic_checkout": true }},
        "description": { "type": "description", "settings": { "collapsed": false }},
        "assembly-badge": { "type": "custom_badge", "settings": { "icon": "clock", "text": "10-Minute Assembly" }},
        "shipping-badge": { "type": "custom_badge", "settings": { "icon": "truck", "text": "Free Shipping" }},
        "warranty-badge": { "type": "custom_badge", "settings": { "icon": "shield", "text": "5-Year Warranty" }}
      },
      "block_order": ["title", "price", "variant-picker", "quantity", "buy-buttons", "description", "assembly-badge", "shipping-badge", "warranty-badge"]
    },
    "product-tabs": {
      "type": "product-tabs",
      "settings": {},
      "blocks": {
        "tab-specs": { "type": "tab", "settings": { "title": "Specifications", "content_source": "metafield", "metafield_key": "custom.specifications" }},
        "tab-assembly": { "type": "tab", "settings": { "title": "Assembly", "content_source": "metafield", "metafield_key": "custom.assembly_instructions" }},
        "tab-shipping": { "type": "tab", "settings": { "title": "Shipping & Returns", "content_source": "page", "page_handle": "shipping-returns" }}
      },
      "block_order": ["tab-specs", "tab-assembly", "tab-shipping"]
    },
    "size-guide": {
      "type": "size-comparison",
      "settings": {
        "heading": "Find Your Perfect Fit",
        "show_room_visualizer": true
      }
    },
    "reviews": {
      "type": "product-reviews",
      "settings": {
        "heading": "Customer Reviews",
        "reviews_per_page": 5,
        "enable_photos": true,
        "sort_default": "most_recent"
      }
    },
    "recommendations": {
      "type": "product-recommendations",
      "settings": {
        "heading": "You May Also Like",
        "products_to_show": 4
      }
    },
    "recently-viewed": {
      "type": "recently-viewed",
      "settings": {
        "heading": "Recently Viewed",
        "products_to_show": 4
      }
    }
  },
  "order": [
    "main-product",
    "product-tabs",
    "size-guide",
    "reviews",
    "recommendations",
    "recently-viewed"
  ]
}
```

**Section count:** 6

---

### 3.3 Alternate PDP — `product.assembly.json`

Same as `product.json` but with an extra assembly-focused hero section at the top:

```json
{
  "sections": {
    "assembly-hero": {
      "type": "video-hero",
      "settings": {
        "heading": "Watch It Come To Life",
        "video_url": "",
        "autoplay": true,
        "overlay_opacity": 30
      }
    },
    "main-product": { "type": "main-product", "settings": { "...": "same as product.json" }},
    "assembly-steps": {
      "type": "assembly-steps",
      "settings": {
        "heading": "3 Simple Steps"
      },
      "blocks": {
        "step-1": { "type": "step", "settings": { "number": "1", "title": "Unbox", "description": "Remove from packaging", "image": "" }},
        "step-2": { "type": "step", "settings": { "number": "2", "title": "Unfold", "description": "Let it expand", "image": "" }},
        "step-3": { "type": "step", "settings": { "number": "3", "title": "Enjoy", "description": "Ready in 10 minutes", "image": "" }}
      },
      "block_order": ["step-1", "step-2", "step-3"]
    },
    "product-tabs": { "type": "product-tabs", "settings": {} },
    "reviews": { "type": "product-reviews", "settings": {} },
    "recommendations": { "type": "product-recommendations", "settings": {} }
  },
  "order": ["assembly-hero", "main-product", "assembly-steps", "product-tabs", "reviews", "recommendations"]
}
```

**Use case:** Assign to products that have video assembly content.

---

### 3.4 Collection Page — `collection.json`

```json
{
  "sections": {
    "collection-banner": {
      "type": "collection-banner",
      "settings": {
        "show_image": true,
        "show_description": true,
        "overlay_opacity": 20
      }
    },
    "main-collection": {
      "type": "main-collection",
      "settings": {
        "products_per_page": 12,
        "columns_desktop": 3,
        "columns_mobile": 2,
        "enable_filtering": true,
        "enable_sorting": true,
        "filter_type": "drawer",
        "show_product_count": true,
        "default_sort": "best-selling"
      }
    },
    "collection-cta": {
      "type": "image-with-text",
      "settings": {
        "heading": "Not Sure Which To Choose?",
        "text": "Take our 60-second quiz and find your perfect sofa.",
        "cta_text": "Take The Quiz",
        "cta_url": "/pages/quiz",
        "image_position": "right"
      }
    }
  },
  "order": ["collection-banner", "main-collection", "collection-cta"]
}
```

**Filtering:** Shopify native `storefront_filtering` — filters by color, size, price, material, seating capacity (via metafields).

---

### 3.5 All Products — `collection.all.json`

Identical to `collection.json` but with a hardcoded heading:

```json
{
  "sections": {
    "collection-banner": {
      "type": "collection-banner",
      "settings": {
        "show_image": false,
        "custom_heading": "All Products"
      }
    },
    "main-collection": {
      "type": "main-collection",
      "settings": {
        "products_per_page": 16,
        "columns_desktop": 4,
        "columns_mobile": 2,
        "enable_filtering": true,
        "enable_sorting": true
      }
    }
  },
  "order": ["collection-banner", "main-collection"]
}
```

---

### 3.6 Default Page — `page.json`

```json
{
  "sections": {
    "page-banner": {
      "type": "page-banner",
      "settings": {
        "show_title": true
      }
    },
    "main-page": {
      "type": "main-page",
      "settings": {
        "content_width": "narrow"
      }
    }
  },
  "order": ["page-banner", "main-page"]
}
```

---

### 3.7 About Us — `page.about.json`

```json
{
  "sections": {
    "about-hero": {
      "type": "image-with-text-overlay",
      "settings": {
        "heading": "Furniture Shouldn't Be Complicated",
        "subtext": "We started EzHome to prove that premium comfort can come in a box.",
        "image": ""
      }
    },
    "our-story": {
      "type": "rich-text",
      "settings": {
        "heading": "Our Story",
        "text": "{{ page.content }}"
      }
    },
    "values": {
      "type": "value-propositions",
      "settings": {
        "heading": "What We Stand For"
      },
      "blocks": {
        "val-1": { "type": "value_prop", "settings": { "icon": "leaf", "title": "Sustainable Materials", "text": "CertiPUR-US® certified foam" }},
        "val-2": { "type": "value_prop", "settings": { "icon": "heart", "title": "Customer First", "text": "100-night sleep trial" }},
        "val-3": { "type": "value_prop", "settings": { "icon": "recycle", "title": "Eco Packaging", "text": "Recyclable compression boxes" }}
      },
      "block_order": ["val-1", "val-2", "val-3"]
    },
    "team-gallery": {
      "type": "image-gallery",
      "settings": {
        "heading": "Meet The Team",
        "columns": 4
      }
    },
    "newsletter": {
      "type": "newsletter-signup",
      "settings": {
        "heading": "Join Us",
        "subtext": "Be part of the EzHome movement."
      }
    }
  },
  "order": ["about-hero", "our-story", "values", "team-gallery", "newsletter"]
}
```

---

### 3.8 Contact — `page.contact.json`

```json
{
  "sections": {
    "page-banner": {
      "type": "page-banner",
      "settings": {
        "show_title": true,
        "heading_override": "Get In Touch"
      }
    },
    "contact-form": {
      "type": "contact-form",
      "settings": {
        "heading": "Send Us A Message",
        "show_phone": true,
        "show_order_number": true,
        "success_message": "Thanks! We'll get back to you within 24 hours."
      }
    },
    "contact-info": {
      "type": "multi-column",
      "settings": {
        "heading": "Other Ways To Reach Us"
      },
      "blocks": {
        "email": { "type": "column", "settings": { "icon": "email", "title": "Email", "text": "hello@ezhome.com" }},
        "chat": { "type": "column", "settings": { "icon": "chat", "title": "Live Chat", "text": "Mon–Fri, 9am–5pm EST" }},
        "social": { "type": "column", "settings": { "icon": "instagram", "title": "Social", "text": "@ezhome" }}
      },
      "block_order": ["email", "chat", "social"]
    }
  },
  "order": ["page-banner", "contact-form", "contact-info"]
}
```

---

### 3.9 FAQ — `page.faq.json`

```json
{
  "sections": {
    "page-banner": {
      "type": "page-banner",
      "settings": {
        "heading_override": "Frequently Asked Questions"
      }
    },
    "faq-categories": {
      "type": "faq-accordion",
      "settings": {
        "heading": ""
      },
      "blocks": {
        "q1": { "type": "question", "settings": { "category": "Product", "question": "How long does assembly take?", "answer": "Most customers complete assembly in under 10 minutes, with no tools required." }},
        "q2": { "type": "question", "settings": { "category": "Product", "question": "What's inside the box?", "answer": "Your compressed sofa, assembly guide, and care instructions." }},
        "q3": { "type": "question", "settings": { "category": "Shipping", "question": "How long does delivery take?", "answer": "3–7 business days. Free shipping on all orders." }},
        "q4": { "type": "question", "settings": { "category": "Shipping", "question": "Do you ship internationally?", "answer": "Currently we ship within the US and Canada." }},
        "q5": { "type": "question", "settings": { "category": "Returns", "question": "What's your return policy?", "answer": "100-night trial. Full refund if you're not satisfied." }},
        "q6": { "type": "question", "settings": { "category": "Returns", "question": "How do I start a return?", "answer": "Contact us at hello@ezhome.com or use our returns portal." }},
        "q7": { "type": "question", "settings": { "category": "Warranty", "question": "What does the warranty cover?", "answer": "5-year warranty covering frame, foam, and fabric defects." }},
        "q8": { "type": "question", "settings": { "category": "Care", "question": "How do I clean my sofa?", "answer": "Removable covers are machine washable. Spot clean the frame with a damp cloth." }}
      },
      "block_order": ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"]
    },
    "still-need-help": {
      "type": "image-with-text",
      "settings": {
        "heading": "Still Have Questions?",
        "text": "Our team is here to help.",
        "cta_text": "Contact Us",
        "cta_url": "/pages/contact",
        "image_position": "left"
      }
    }
  },
  "order": ["page-banner", "faq-categories", "still-need-help"]
}
```

---

### 3.10 Assembly Guide — `page.assembly.json`

```json
{
  "sections": {
    "assembly-hero": {
      "type": "video-hero",
      "settings": {
        "heading": "Setup In 10 Minutes",
        "subtext": "No tools. No stress. Just unbox and enjoy.",
        "video_url": ""
      }
    },
    "assembly-steps": {
      "type": "assembly-steps",
      "settings": {
        "heading": "3 Simple Steps"
      },
      "blocks": {
        "step-1": { "type": "step", "settings": { "number": "1", "title": "Unbox", "description": "Open the box and remove your compressed sofa.", "image": "" }},
        "step-2": { "type": "step", "settings": { "number": "2", "title": "Unfold & Expand", "description": "Lay it flat and let it expand for 5 minutes.", "image": "" }},
        "step-3": { "type": "step", "settings": { "number": "3", "title": "Enjoy", "description": "Fluff, arrange, and you're done!", "image": "" }}
      },
      "block_order": ["step-1", "step-2", "step-3"]
    },
    "tips": {
      "type": "rich-text",
      "settings": {
        "heading": "Pro Tips",
        "text": "<ul><li>Allow 24 hours for full foam expansion</li><li>Assemble in the room where it will live</li><li>Save the box for easy moving later</li></ul>"
      }
    },
    "product-cta": {
      "type": "featured-collection",
      "settings": {
        "heading": "Ready To Get Started?",
        "collection": "all",
        "products_to_show": 3
      }
    }
  },
  "order": ["assembly-hero", "assembly-steps", "tips", "product-cta"]
}
```

---

### 3.11 Blog Index — `blog.json`

```json
{
  "sections": {
    "blog-banner": {
      "type": "page-banner",
      "settings": {
        "heading_override": "The EzHome Blog",
        "subtext": "Assembly tips, design inspiration & product updates."
      }
    },
    "main-blog": {
      "type": "main-blog",
      "settings": {
        "articles_per_page": 9,
        "columns": 3,
        "show_image": true,
        "show_date": true,
        "show_author": false,
        "show_tags": true
      }
    }
  },
  "order": ["blog-banner", "main-blog"]
}
```

---

### 3.12 Article — `article.json`

```json
{
  "sections": {
    "main-article": {
      "type": "main-article",
      "settings": {
        "show_featured_image": true,
        "show_date": true,
        "show_author": true,
        "show_share_buttons": true,
        "content_width": "narrow"
      }
    },
    "article-cta": {
      "type": "newsletter-signup",
      "settings": {
        "heading": "Enjoyed This?",
        "subtext": "Subscribe for more tips and updates.",
        "button_text": "Subscribe"
      }
    },
    "related-articles": {
      "type": "blog-posts",
      "settings": {
        "heading": "More From The Blog",
        "blog": "",
        "posts_to_show": 3
      }
    }
  },
  "order": ["main-article", "article-cta", "related-articles"]
}
```

---

### 3.13 Cart Page — `cart.json`

Fallback for when JavaScript is disabled (primary cart is the `cart-drawer` section in `theme.liquid`).

```json
{
  "sections": {
    "main-cart": {
      "type": "main-cart",
      "settings": {
        "show_vendor": false,
        "enable_cart_note": true,
        "show_line_item_properties": true,
        "enable_discount_code": true
      }
    },
    "cart-upsell": {
      "type": "cart-upsells",
      "settings": {
        "heading": "Complete Your Space",
        "recommendation_type": "complementary",
        "products_to_show": 3
      }
    },
    "free-shipping-bar": {
      "type": "free-shipping-bar",
      "settings": {
        "threshold": 0,
        "message_below": "You qualify for free shipping!",
        "message_reached": "🎉 You've got free shipping!"
      }
    }
  },
  "order": ["main-cart", "cart-upsell", "free-shipping-bar"]
}
```

---

### 3.14 Search Results — `search.json`

```json
{
  "sections": {
    "main-search": {
      "type": "main-search",
      "settings": {
        "enable_filtering": true,
        "enable_sorting": true,
        "show_articles": true,
        "show_pages": true,
        "columns_desktop": 3,
        "columns_mobile": 2,
        "results_per_page": 12
      }
    }
  },
  "order": ["main-search"]
}
```

---

### 3.15 Collections Index — `list-collections.json`

```json
{
  "sections": {
    "page-banner": {
      "type": "page-banner",
      "settings": {
        "heading_override": "Shop By Category"
      }
    },
    "main-list-collections": {
      "type": "main-list-collections",
      "settings": {
        "image_ratio": "square",
        "columns_desktop": 3,
        "show_product_count": true,
        "sort": "alphabetical"
      }
    }
  },
  "order": ["page-banner", "main-list-collections"]
}
```

---

### 3.16 Customer Templates

All customer templates use Shopify's built-in customer functionality.

#### `customers/account.json`

```json
{
  "sections": {
    "main-account": {
      "type": "main-account",
      "settings": {
        "show_order_history": true,
        "orders_per_page": 10,
        "show_addresses_link": true
      }
    }
  },
  "order": ["main-account"]
}
```

#### `customers/order.json`

```json
{
  "sections": {
    "main-order": {
      "type": "main-order",
      "settings": {
        "show_tracking_info": true,
        "show_reorder_button": true
      }
    }
  },
  "order": ["main-order"]
}
```

#### `customers/login.json`

```json
{
  "sections": {
    "main-login": {
      "type": "main-login",
      "settings": {
        "show_guest_checkout_link": true
      }
    }
  },
  "order": ["main-login"]
}
```

#### `customers/register.json`

```json
{
  "sections": {
    "main-register": {
      "type": "main-register",
      "settings": {
        "show_marketing_opt_in": true,
        "opt_in_default": false
      }
    }
  },
  "order": ["main-register"]
}
```

#### `customers/addresses.json`

```json
{
  "sections": {
    "main-addresses": {
      "type": "main-addresses",
      "settings": {}
    }
  },
  "order": ["main-addresses"]
}
```

#### `customers/reset_password.json` & `customers/activate_account.json`

Minimal templates using default `main-reset-password` and `main-activate-account` sections.

---

### 3.17 404 — `404.json`

```json
{
  "sections": {
    "main-404": {
      "type": "main-404",
      "settings": {
        "heading": "Page Not Found",
        "text": "The page you're looking for has moved or doesn't exist.",
        "show_search": true,
        "cta_text": "Back To Home",
        "cta_url": "/"
      }
    },
    "featured-collection": {
      "type": "featured-collection",
      "settings": {
        "heading": "You Might Like These",
        "collection": "best-sellers",
        "products_to_show": 4
      }
    }
  },
  "order": ["main-404", "featured-collection"]
}
```

---

## 4. Template ↔ Section Matrix

| Template                       | # Sections | Key Sections                                               |
|-------------------------------|-----------|-------------------------------------------------------------|
| `index.json`                   | 8         | hero-banner, value-props, featured-collection, before-after |
| `product.json`                 | 6         | main-product, product-tabs, size-comparison, reviews        |
| `product.assembly.json`        | 6         | video-hero, main-product, assembly-steps                    |
| `collection.json`              | 3         | collection-banner, main-collection, image-with-text         |
| `collection.all.json`          | 2         | collection-banner, main-collection                          |
| `page.json`                    | 2         | page-banner, main-page                                      |
| `page.about.json`              | 5         | image-with-text-overlay, rich-text, value-props, gallery    |
| `page.contact.json`            | 3         | page-banner, contact-form, multi-column                     |
| `page.faq.json`                | 3         | page-banner, faq-accordion, image-with-text                 |
| `page.assembly.json`           | 4         | video-hero, assembly-steps, rich-text, featured-collection  |
| `blog.json`                    | 2         | page-banner, main-blog                                      |
| `article.json`                 | 3         | main-article, newsletter-signup, blog-posts                 |
| `cart.json`                    | 3         | main-cart, cart-upsells, free-shipping-bar                   |
| `search.json`                  | 1         | main-search                                                 |
| `list-collections.json`        | 2         | page-banner, main-list-collections                          |
| `customers/account.json`       | 1         | main-account                                                |
| `customers/order.json`         | 1         | main-order                                                  |
| `customers/login.json`         | 1         | main-login                                                  |
| `customers/register.json`      | 1         | main-register                                               |
| `customers/addresses.json`     | 1         | main-addresses                                              |
| `customers/reset_password.json`| 1         | main-reset-password                                         |
| `customers/activate_account.json`| 1       | main-activate-account                                       |
| `404.json`                     | 2         | main-404, featured-collection                               |
| `gift_card.liquid`             | 1         | (inline Liquid template)                                    |

**Total unique sections referenced:** ~35

---

## 5. Section Schema Conventions

All sections follow Shopify Online Store 2.0 schema patterns:

```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section-{{ section.id }}",
  "limit": 1,                          // optional — max instances per template
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default Heading"
    }
  ],
  "blocks": [
    {
      "type": "block_type",
      "name": "Block Name",
      "limit": 6,
      "settings": [...]
    }
  ],
  "presets": [
    {
      "name": "Section Name",
      "category": "EzHome Custom"
    }
  ]
}
{% endschema %}
```

### Naming Rules

| Element          | Convention                | Example                   |
|-----------------|---------------------------|---------------------------|
| Section file     | `kebab-case.liquid`       | `hero-banner.liquid`      |
| Section class    | `section--kebab-case`     | `section--hero-banner`    |
| Block type       | `snake_case`              | `value_prop`              |
| Setting ID       | `snake_case`              | `cta_text`                |
| CSS class        | `BEM (block__element--mod)` | `hero__heading--large`  |

---

## 6. Template Assignment Rules

| Condition                            | Template                     |
|-------------------------------------|------------------------------|
| Homepage                             | `index.json`                 |
| Any product (default)                | `product.json`               |
| Product with assembly video content  | `product.assembly.json`      |
| Any collection (default)             | `collection.json`            |
| `/collections/all`                   | `collection.all.json`        |
| Static page (default)                | `page.json`                  |
| Page with handle "about"             | `page.about.json`            |
| Page with handle "contact"           | `page.contact.json`          |
| Page with handle "faq"               | `page.faq.json`              |
| Page with handle "assembly-guide"    | `page.assembly.json`         |
| Blog index                           | `blog.json`                  |
| Article                              | `article.json`               |
| Cart fallback                        | `cart.json`                  |
| Search results                       | `search.json`                |
| Collections list                     | `list-collections.json`      |
| Customer account                     | `customers/account.json`     |
| 404                                  | `404.json`                   |

---

## 7. Checkout & Post-Purchase

Shopify checkout is **not** a theme template — it's managed via:

- **Shopify Checkout Settings** → Branding (logo, colors, fonts matching EzHome design tokens)
- **Checkout UI Extensions** (optional) → For trust badges, assembly messaging
- **Order Status Page** → Customizable via Shopify admin Additional Scripts
- **Post-Purchase Upsell** → Via Shopify app or Checkout Extension

### Checkout Branding Settings

| Setting          | Value                      |
|-----------------|----------------------------|
| Primary color    | `#3A6B3A` (Sage)           |
| Background       | `#FBF9F5` (Cream)          |
| Text color       | `#141416` (Ink)            |
| Font             | Inter (matches body font)  |
| Logo             | EzHome wordmark            |
| Accent           | `#FF6B42` (Coral)          |

---

## 8. Revision Log

| Version | Date       | Changes                |
|---------|-----------|------------------------|
| 1.0     | 2025-02-18 | Initial Shopify version |
