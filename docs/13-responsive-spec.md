# EzHome — Responsive Behavior Spec

### Compression Sofa Landing Page · Breakpoint Strategy & Decision Matrix
##### Role: Responsive Design Specialist
##### Breakpoints: Mobile 375px · Tablet 768px · Desktop 1440px
##### Grid: 4-col / 8-col / 12-col · 8px base grid · `ease-smooth` layout transitions

---

> **Responsive Philosophy**
>
> This is not "desktop shrunk down." Every breakpoint is a deliberately designed composition where content hierarchy, touch targets, and visual rhythm are optimized for that specific device. We follow three laws:
>
> 1. **Content survives the squeeze.** Nothing critical disappears — it re-prioritizes.
> 2. **Touch targets grow on touch devices.** Minimum 48×48px on mobile. No exceptions.
> 3. **Whitespace compresses proportionally.** Sections don't collapse — they breathe less.
>
> The EzHome landing page has **9 responsive zones** that transform across breakpoints: Urgency Banner, Navigation, Hero, Feature Blocks ×3, Social Proof, FAQ, Footer CTA, and Footer. Each zone is specified below with exact token values.

---

## Table of Contents

1. [Breakpoint Architecture](#1-breakpoint-architecture)
2. [Global Responsive Tokens](#2-global-responsive-tokens)
3. [Section-by-Section Responsive Spec](#3-section-by-section-responsive-spec)
4. [Master Decision Matrix](#4-master-decision-matrix)
5. [Typography Scaling Table](#5-typography-scaling-table)
6. [Image Behavior Matrix](#6-image-behavior-matrix)
7. [Spacing Scaling Table](#7-spacing-scaling-table)
8. [Content Priority Map](#8-content-priority-map)
9. [Navigation Adaptation](#9-navigation-adaptation)
10. [Figma Make Description (Copy-Paste)](#10-figma-make-description)
11. [Implementation Notes (Tailwind/CSS)](#11-implementation-notes)

---

---

## 1. Breakpoint Architecture

### Defined Breakpoints

| Token | Width | Device Target | Columns | Gutter | Margin | Container Max |
|-------|-------|--------------|---------|--------|--------|---------------|
| **mobile** | 375px (design) / <640px (range) | iPhone 14/15, Pixel 7 | 4 | 16px | 16px | 100% |
| **sm** | 640px | Large phones (landscape), small tablets | 4 | 16px | 16px | 100% |
| **tablet** | 768px (design) / md breakpoint | iPad Mini, iPad Air (portrait) | 8 | 24px | 24px | 100% |
| **lg** | 1024px | iPad Pro (landscape), small laptops | 12 | 32px | 32px | 100% |
| **desktop** | 1440px (design) / xl+ breakpoint | Laptops, external monitors | 12 | 32px | auto (centered) | 1200px content / 1440px max |
| **2xl** | 1536px+ | Ultra-wide monitors | 12 | 32px | auto | 1200px content |

### Design-to-Range Mapping

```
Mobile design (375px)  →  applies to: 0–639px
Tablet design (768px)  →  applies to: 640–1023px
Desktop design (1440px) →  applies to: 1024px+
```

### Breakpoint Behavior Model

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  0px ──── 375 ──── 640 ──── 768 ──── 1024 ──── 1440 ────→  │
│  │        ▲         │        ▲         │          ▲         │
│  │        │         │        │         │          │         │
│  └─ Mobile (fluid) ─┘  Tablet (fluid) ┘  Desktop (capped) ┘│
│     4-col stack          8-col mixed       12-col grid       │
│     Touch-first          Hybrid            Hover-enabled     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

---

## 2. Global Responsive Tokens

These values change at each breakpoint and cascade through every section:

### Container

| Token | Mobile (375) | Tablet (768) | Desktop (1440) |
|-------|-------------|-------------|----------------|
| `container-max` | 100% | 100% | 1200px |
| `container-margin` | 16px each side | 24px each side | auto (centered) |
| `content-width` | 343px effective | 720px effective | 1200px |
| `narrow-width` | 343px (= container) | 624px | 720px |
| `full-bleed` | 100vw | 100vw | 100vw |

### Section Spacing (Vertical)

| Token | Mobile | Tablet | Desktop | Token Path |
|-------|--------|--------|---------|-----------|
| `section-gap` | 64px | 80px | 96–128px | `space-16` / `space-20` / `space-24–32` |
| `section-padding-y` | 48px | 64px | 80–96px | `space-12` / `space-16` / `space-20–24` |
| `component-gap` | 32px | 40px | 48px | `space-8` / `space-10` / `space-12` |

### Grid

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Columns | 4 | 8 | 12 |
| Gutter | 16px | 24px | 32px |
| Column width | fluid | fluid | fluid within 1200px container |

---

---

## 3. Section-by-Section Responsive Spec

---

### 3.1 — Urgency Banner

> `hero/urgency-banner` · Cream bar at page top

#### Layout Transformation

| Breakpoint | Layout | Height | Behavior |
|-----------|--------|--------|----------|
| **Mobile** | Single line, centered text, close × right | 40px (auto if wraps to 2 lines) | Text wraps at ~40 chars. Padding: 8px 16px. |
| **Tablet** | Single line, centered text, close × right | 36px | Full text visible. Padding: 8px 24px. |
| **Desktop** | Single line, centered text, close × right | 36px | Full text visible. Padding: 8px 32px. |

#### Typography

| Breakpoint | Font | Size | Weight |
|-----------|------|------|--------|
| **All** | Inter | 13px (`body-sm`) | 500 (medium) |

> Banner text is 54 chars ("Free delivery on all orders this week — ends Sunday"). At 375px with 16px×2 margin, effective width is 343px. At body-sm (13px), this wraps to 2 lines on the narrowest phones. Accept the wrap — never truncate urgency copy.

#### Close Button

| Breakpoint | Size | Position |
|-----------|------|----------|
| **Mobile** | 32×32px tap target (icon 16px) | Right, vertically centered |
| **Tablet+** | 24×24px (icon 16px) | Right, vertically centered |

---

### 3.2 — Navigation / Header

> `nav/*` · Fixed header, transparent → solid on scroll

#### Layout Transformation

| Breakpoint | Layout | Height | Logo | Nav Links | Right Actions |
|-----------|--------|--------|------|-----------|---------------|
| **Mobile** | Logo left, hamburger right | 56px | 28px height | Hidden → Drawer | Hamburger icon (48×48 tap) |
| **Tablet** | Logo left, nav center, actions right | 64px | 32px height | Horizontal, `body-sm` | Search + Cart icons |
| **Desktop** | Logo left, nav center, actions right | 72px | 32px height | Horizontal, `body-md`, gap 32px | Search + Cart + Account |

#### Mobile Drawer

| Property | Value |
|----------|-------|
| **Width** | 100vw (full screen) |
| **Background** | `bg-primary` (white) |
| **Animation** | Slide in from right, `ease-smooth`, 400ms |
| **Overlay** | `bg-overlay` (48% black) |
| **Nav links** | Full-width rows, 56px height each, `body-lg`, `space-4` padding |
| **CTA** | Full-width coral pill at bottom, 52px height |
| **Close** | × icon, 48×48px, top-right |
| **Focus trap** | Yes — tab cycles within drawer |

#### Condensed State (on scroll)

| Breakpoint | Original | Condensed | Trigger |
|-----------|----------|-----------|---------|
| **Mobile** | 56px | 48px | scrollY > 60px |
| **Tablet** | 64px | 52px | scrollY > 80px |
| **Desktop** | 72px | 56px | scrollY > 100px |

---

### 3.3 — Hero Section

> `hero/*` · Full-bleed lifestyle image + centered text overlay

#### Layout Transformation

| Breakpoint | Layout | Height | Content Width | Content Alignment |
|-----------|--------|--------|--------------|-------------------|
| **Mobile** | Single column, stacked vertically, image as background | 100svh (screen height) | 343px (container) | Center-aligned, bottom-biased (content in lower 60%) |
| **Tablet** | Single column, centered, image as background | 85vh | 624px | Center-aligned, vertically centered |
| **Desktop** | Two options: (A) Centered over image, or (B) Split — text left 50%, image right 50% | 90vh, min 680px | 720px (narrow) | Center-aligned (A) or left-aligned (B) |

#### Typography Scaling

| Element | Mobile (375) | Tablet (768) | Desktop (1440) | Token |
|---------|-------------|-------------|----------------|-------|
| **H1 headline** | 44px / 48px LH / -0.035em | 56px / 62px LH / -0.035em | 72px / 76px LH / -0.035em | `display-xl` |
| **H2 subheadline** | 16px / 24px LH | 17px / 26px LH | 18px / 28px LH | `body-lg` |
| **CTA label** | 15px / `body-md` | 15px / `body-md` | 15px / `body-md` | `body-md medium` |
| **Social proof pill** | 12px / `caption` | 13px / `body-sm` | 13px / `body-sm` | `body-sm` / `caption` |

> **Key decision:** The H1 scales from 44→72px across breakpoints. This is a 1.64× scale factor. The subheadline barely scales (16→18px) — it's body text and must stay readable, not decorative.

#### CTA Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **Primary CTA** | Full-width (343px), 52px height, pill | Auto-width (min 200px), 48px, pill | Auto-width, 48px, pill |
| **Secondary CTA** | Full-width, 44px, ghost/text | Inline next to primary, 44px | Inline next to primary, 44px |
| **CTA stack** | Vertical (primary above secondary), 12px gap | Horizontal, 16px gap | Horizontal, 16px gap |
| **Social proof pill** | Below CTAs, 24px gap | Below CTAs, 24px gap | Below CTAs, 32px gap |

#### Image Behavior

| Breakpoint | Treatment | Aspect | Object-Fit | Overlay |
|-----------|-----------|--------|-----------|---------|
| **Mobile** | Full-bleed background, cropped to vertical | ~9:16 (portrait, device-shaped) | `cover`, focus-center | Dark gradient overlay bottom 40% for text readability |
| **Tablet** | Full-bleed background | ~4:3 | `cover`, focus-center | Subtle gradient center for text readability |
| **Desktop** | Full-bleed background (or split 50/50) | ~16:9 | `cover`, focus-center-right | Optional: left-side gradient if text overlays image |

> **Art direction:** On mobile, the sofa should be visible in the upper 40% of the viewport. The lower 60% is the text zone. Use `<picture>` with `srcset` to serve a portrait-cropped hero on mobile and landscape on desktop.

```html
<picture>
  <source media="(max-width: 639px)" srcset="hero-mobile-9x16.webp" />
  <source media="(max-width: 1023px)" srcset="hero-tablet-4x3.webp" />
  <img src="hero-desktop-16x9.webp" alt="EzHome sofa in a sunlit apartment" />
</picture>
```

#### Spacing

| Measurement | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Top padding (below banner + nav) | 120px (banner 40 + nav 56 + 24) | 128px (banner 36 + nav 64 + 28) | 144px (banner 36 + nav 72 + 36) |
| Gap: H1 → H2 | 16px | 20px | 24px |
| Gap: H2 → CTA group | 24px | 28px | 32px |
| Gap: CTA group → proof pill | 20px | 24px | 32px |
| Bottom padding | 48px | 64px | 80px |

#### Scroll Indicator

| Breakpoint | Visible | Position |
|-----------|---------|----------|
| **Mobile** | ✅ Yes — chevron pulsing | Bottom center, 24px from bottom |
| **Tablet** | ❌ Hidden | — |
| **Desktop** | ❌ Hidden | — |

---

### 3.4 — Feature Blocks (×3)

> `features/01–03/*` · Alternating two-column sections with image + text

#### Layout Transformation

| Breakpoint | Layout | Image Size | Text Width | Alternation |
|-----------|--------|-----------|-----------|-------------|
| **Mobile** | **Single column stack.** Image on top (100% width), text below. All 3 blocks stack image-above-text. | 100% container width, aspect 4:3 | 100% container width | No left/right alternation — always image-top, text-bottom |
| **Tablet** | **Single column stack.** Image on top, text below. Same as mobile but wider text. | 100% container width, aspect 16:10 | 100% container, max 624px | No alternation |
| **Desktop** | **Two-column split.** Image 50% / Text 50%. Block 1: image left, text right. Block 2: text left, image right. Block 3: image left, text right. | 50% (600px in 1200 container), aspect 4:3 | 50% minus gutter (568px), max 65ch for body | Alternating sides |

> **Critical decision:** Feature blocks do NOT attempt a 2-column layout on tablet (768px). The content is too dense — a 384px-wide column for 248-char body text creates orphan lines. Single stack until 1024px.

#### Typography Scaling

| Element | Mobile | Tablet | Desktop | Token |
|---------|--------|--------|---------|-------|
| **Eyebrow** | 11px, uppercase, 0.1em | 11px | 11px | `overline` (fixed) |
| **H2** | 30px / 36px LH | 36px / 42px LH | 44px / 50px LH | `display-md` |
| **Body** | 15px / 24px LH | 15px / 24px LH | 15px / 24px LH | `body-md` (fixed) |
| **Stat number** | 36px / 42px LH | 44px / 50px LH | 48px / 54px LH | Between `heading-xl` and `display-md` |
| **Stat label** | 13px | 13px | 13px | `body-sm` (fixed) |

#### Image Behavior

| Breakpoint | Aspect Ratio | Border Radius | Object-Fit | Extra |
|-----------|-------------|---------------|-----------|-------|
| **Mobile** | 4:3 | 16px (`radius-lg`) | `cover` | Full container width. No hover lift (touch device). |
| **Tablet** | 16:10 | 16px | `cover` | Full container width. Hover lift on supported devices. |
| **Desktop** | 4:3 | 20px (`radius-xl`) | `cover` | 50% width. Hover lift 4px + shadow-lg. |

#### Spacing

| Measurement | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Section padding Y | 48px top, 48px bottom | 64px / 64px | 80px / 80px |
| Eyebrow → H2 | 12px | 12px | 16px |
| H2 → Body | 16px | 16px | 20px |
| Body → Stat | 24px | 24px | 32px |
| Image → Text (when stacked) | 32px | 40px | n/a (side by side) |
| Image ↔ Text (when side-by-side) | n/a | n/a | 32px gutter |

---

### 3.5 — Social Proof Section

> `social/*` · Stats bar + testimonial carousel + press logos

#### Stats Bar

| Breakpoint | Layout | Stat Size | Behavior |
|-----------|--------|-----------|----------|
| **Mobile** | **2×2 grid** (2 columns, 2 rows), 16px gap | Number: 36px, Label: 12px | Centered in each grid cell. Dividers hidden — use card-like bg-secondary cells instead. |
| **Tablet** | **2×2 grid** (wider cells), 24px gap | Number: 44px, Label: 13px | Same 2×2 layout. Cells wider. |
| **Desktop** | **4-column row** (all stats in one line), 32px gap | Number: 48px, Label: 13px | Even spacing, vertical dividers between stats. |

#### Testimonial Carousel

| Breakpoint | Visible Cards | Behavior | Card Width | Indicators |
|-----------|--------------|----------|-----------|------------|
| **Mobile** | **1 card** (full-width) | Horizontal swipe (touch). Auto-advance 5s. | 343px (container) | Dot indicators below, 8px dots, 12px gap |
| **Tablet** | **2 cards** | Swipe or arrow buttons. Auto-advance 5s, pause on hover. | ~336px each (with gap) | Dot indicators |
| **Desktop** | **3 cards** | Arrow buttons left/right. Auto-advance 5s, pause on hover/focus. | ~373px each (in 1200px container with 32px gaps) | Dot indicators + prev/next arrows |

#### Testimonial Card

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Padding | 20px | 24px | 24px |
| Border radius | 16px | 16px | 16px |
| Quote font | 14px / `body-sm` | 15px / `body-md` | 15px / `body-md` |
| Stars | 14px icons | 16px icons | 16px icons |
| Author name | `body-sm` bold | `body-sm` bold | `body-sm` bold |
| Min-height | 200px | 200px | 220px |

#### Press Logo Bar

| Breakpoint | Layout | Logo Size | Behavior |
|-----------|--------|-----------|----------|
| **Mobile** | Horizontal scroll row, no wrapping | 80px wide each, 24px height, greyscale | Scrollable, label "As featured in" above. Show 3 logos + peek of 4th. |
| **Tablet** | Single row, all visible | 100px wide each, 28px height | All 5 logos visible. Label left-aligned or centered above. |
| **Desktop** | Single row, all visible, evenly spaced | 120px wide each, 32px height | All 5 logos. Label centered above. |

#### Section Spacing

| Measurement | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Section padding Y | 48px / 48px | 64px / 64px | 80px / 80px |
| H2 → Stats bar | 32px | 40px | 48px |
| Stats bar → Testimonials | 40px | 48px | 56px |
| Testimonials → Press bar | 32px | 40px | 48px |

---

### 3.6 — FAQ Section

> `faq/*` · Accordion items within a narrow container

#### Layout Transformation

| Breakpoint | Container Width | Accordion Width | Behavior |
|-----------|----------------|----------------|----------|
| **Mobile** | 100% (343px effective) | 100% | Full-width accordion. Single-expand. |
| **Tablet** | 100% (720px effective) | 624px centered | Centered, comfortable reading width. |
| **Desktop** | 1200px | 720px centered (`narrow-width`) | Centered in narrow container. Generous whitespace on sides. |

#### Typography

| Element | Mobile | Tablet | Desktop | Token |
|---------|--------|--------|---------|-------|
| **Section eyebrow** | 11px uppercase | 11px | 11px | `overline` |
| **Section H2** | 30px / 36px LH | 36px / 42px LH | 44px / 50px LH | `display-md` |
| **Question** | 16px / 24px LH, 600 weight | 17px / 26px LH | 18px / 28px LH | `body-lg semibold` |
| **Answer** | 15px / 24px LH, 400 weight | 15px / 24px LH | 15px / 24px LH | `body-md` |

#### Accordion Item

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Item padding Y | 16px | 20px | 20px |
| Item padding X | 0 (flush with container) | 0 | 0 |
| Chevron icon | 20px, 48×48 tap target | 20px | 20px |
| Answer padding-top (open) | 12px | 16px | 16px |
| Divider | 1px `ink-100` | 1px `ink-100` | 1px `ink-100` |
| Answer max-width | 100% | 100% | 65ch |

#### Interaction

| Breakpoint | Expand behavior |
|-----------|----------------|
| **All** | Single-expand (opening one closes others). Height animation: `ease-smooth`, 300ms. Chevron rotates 180°. |
| **Mobile** | Tap question row (full width is tap target, 48px min-height). |
| **Desktop** | Click or keyboard Enter/Space. Hover: question text shifts to `text-primary` + subtle bg `ink-50`. |

---

### 3.7 — Footer CTA Band

> `footer-cta/*` · Dark ink-900 band with H2, body, and CTA

#### Layout Transformation

| Breakpoint | Layout | Text Alignment | CTA |
|-----------|--------|---------------|-----|
| **Mobile** | Single column stack, centered | Center | Full-width coral pill, 52px height |
| **Tablet** | Single column stack, centered | Center | Auto-width pill (min 200px), 48px |
| **Desktop** | Single column stack, centered | Center | Auto-width pill, 48px |

#### Typography

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **H2** | 30px / 36px LH | 36px / 42px LH | 44px / 50px LH |
| **Body** | 15px / 24px LH | 15px / 24px LH | 18px / 28px LH |

#### Spacing

| Measurement | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Section padding Y | 56px | 72px | 96px |
| H2 → Body | 12px | 16px | 16px |
| Body → CTA | 24px | 28px | 32px |
| Content max-width | 343px | 560px | 720px |

---

### 3.8 — Footer

> `footer/*` · 4-column nav + newsletter + legal

#### Layout Transformation

| Breakpoint | Nav Columns | Newsletter | Legal Bar |
|-----------|------------|-----------|-----------|
| **Mobile** | **Accordion** — each column heading is a collapsible section. 2-column grid for links when expanded. | Full-width below nav. Input stacks above button. | Stack: links above copyright. Links wrap. |
| **Tablet** | **2×2 grid** — Shop + Support (row 1), Company + Connect (row 2) | Below nav grid, inline input + button | Single row: copyright + links separated by `·` |
| **Desktop** | **4-column row** — all columns visible side by side | Right of nav grid or below as a dedicated row. Inline input + button. | Single row, links right-aligned |

> **Mobile footer detail:** Footer nav columns become accordions to save vertical space. On mobile, a footer can be 1000+ pixels tall if all columns are expanded. Accordion pattern keeps it to ~300px collapsed. Each heading has a chevron and 48px tap target.

#### Footer Spacing

| Measurement | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Footer padding Y | 48px top, 32px bottom | 64px top, 40px bottom | 80px top, 48px bottom |
| Column gap | 24px (when 2-col) | 32px | 32px |
| Row gap (stacked) | 0 (accordion) | 40px | n/a |
| Newsletter → Legal | 32px | 40px | 48px |
| Legal bar padding Y | 16px | 20px | 24px |
| Legal bar border | Top 1px `ink-800` | Top 1px `ink-800` | Top 1px `ink-800` |

#### Payment Badges

| Breakpoint | Layout |
|-----------|--------|
| **Mobile** | Wrap to 2 rows if needed. Icons 28px height. Centered. |
| **Tablet** | Single row. Icons 32px. Centered or left. |
| **Desktop** | Single row. Icons 32px. Left-aligned under legal. |

---

### 3.9 — Sticky Add-to-Cart Bar

> `sticky-bar/*` · Appears on scroll past hero

#### Layout Transformation

| Breakpoint | Layout | Elements Visible | Height |
|-----------|--------|-----------------|--------|
| **Mobile** | **CTA-only mode.** Full-width bar with price + "Add to Cart" button side by side. Product name and reassurance hidden. | Price (left) + CTA (right) | 64px |
| **Tablet** | Product name + Price + CTA. Reassurance text hidden. | Name · Price · CTA | 64px |
| **Desktop** | Full layout: Product name + Price + CTA + Reassurance. | Name · Price · CTA · "Free delivery · 100-night trial" | 64px |

#### Sticky Bar Content Prioritization

```
Desktop (1440):  [Product Name]     [From $1,299]     [Add to Cart]     [Free delivery · 100-night trial]
Tablet  (768):   [Product Name]     [From $1,299]     [Add to Cart]
Mobile  (375):                      [From $1,299]     [Add to Cart ──────────────────]
                                                      (full-width CTA, price embedded)
```

> On mobile, the CTA incorporates the price: "Add to Cart — $1,299" as a single full-width pill.

---

---

## 4. Master Decision Matrix

The complete responsive behavior for every section at every breakpoint.

### Layout Matrix

| Section | Mobile (375) | Tablet (768) | Desktop (1440) | Transition Point |
|---------|-------------|-------------|----------------|-----------------|
| **Urgency Banner** | Single line, wraps to 2 lines OK | Single line | Single line | No layout change — fluid |
| **Navigation** | Logo + hamburger → full-screen drawer | Logo + horizontal nav + icons | Logo + full nav + search/cart/account | `1024px` (nav links appear) |
| **Hero** | Full-screen BG, stacked CTAs (vertical), bottom-aligned content | Full-screen BG, centered content, inline CTAs | Full-bleed BG or 50/50 split, inline CTAs | `640px` (CTAs go horizontal) |
| **Feature Blocks** | Stack: image top → text bottom. No alternation. | Stack: image top → text bottom. Wider. | 2-col split, alternating L/R | `1024px` (2-col activates) |
| **Stats Bar** | 2×2 grid | 2×2 grid | 4-column row | `1024px` (single row) |
| **Testimonials** | 1-card swipe | 2-card carousel | 3-card carousel | `768px` (2 cards) / `1024px` (3 cards) |
| **Press Logos** | Horizontal scroll | Single row, all visible | Single row, spaced | `768px` (all visible) |
| **FAQ** | Full-width accordion | 624px centered accordion | 720px centered accordion | Fluid — width scales |
| **Footer CTA** | Stacked, full-width CTA | Stacked, auto-width CTA | Stacked, auto-width CTA | `640px` (CTA auto-width) |
| **Footer Nav** | Accordion columns | 2×2 grid | 4-column row | `768px` (grid) / `1024px` (row) |
| **Newsletter** | Stacked: input above button | Inline: input + button | Inline: input + button | `640px` (inline) |
| **Legal Bar** | Stacked: links above ©  | Single row with `·` | Single row, links right | `768px` (row) |
| **Sticky Bar** | Price + full-width CTA | Name + Price + CTA | Full: Name + Price + CTA + Trust | `768px` / `1024px` |

### Typography Matrix

| Element | Mobile | Tablet | Desktop | Scale Factor |
|---------|--------|--------|---------|-------------|
| **H1 (hero only)** | 44px | 56px | 72px | 1.64× |
| **H2 (section heads)** | 30px | 36px | 44px | 1.47× |
| **Body** | 15px | 15px | 15px | 1.0× (fixed) |
| **Eyebrow/Overline** | 11px | 11px | 11px | 1.0× (fixed) |
| **Caption** | 11px | 11px | 11px | 1.0× (fixed) |
| **Body-lg (subheadline)** | 16px | 17px | 18px | 1.13× |
| **Stat numbers** | 36px | 44px | 48px | 1.33× |
| **CTA labels** | 15px | 15px | 15px | 1.0× (fixed) |

### Spacing Matrix

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **Section vertical padding** | 48px | 64px | 80–96px |
| **Section gap (between sections)** | 0 (bg color alternation, no gap) | 0 | 0 |
| **Component internal gap** | 32px | 40px | 48px |
| **Horizontal margin** | 16px | 24px | auto |
| **Card padding** | 16px | 20px | 24px |
| **Grid gutter** | 16px | 24px | 32px |
| **Button height (primary)** | 52px | 48px | 48px |
| **Button height (secondary)** | 44px | 44px | 44px |
| **Touch target minimum** | 48×48px | 48×48px | 44×44px (WCAG) |

---

---

## 5. Typography Scaling Table

Complete font-size lookup for every text element at every breakpoint.

| Token | Mobile Size/LH | Tablet Size/LH | Desktop Size/LH | Weight | Font | Tracking |
|-------|---------------|----------------|-----------------|--------|------|----------|
| `display-xl` | 44px / 48px | 56px / 62px | 72px / 76px | 700 | Instrument Sans | -0.035em |
| `display-lg` | 36px / 40px | 44px / 50px | 56px / 62px | 700 | Instrument Sans | -0.03em |
| `display-md` | 30px / 36px | 36px / 42px | 44px / 50px | 700 | Instrument Sans | -0.025em |
| `heading-xl` | 26px / 32px | 30px / 36px | 36px / 42px | 600 | Instrument Sans | -0.02em |
| `heading-lg` | 22px / 28px | 26px / 32px | 28px / 34px | 600 | Instrument Sans | -0.015em |
| `heading-md` | 22px / 28px | 22px / 28px | 22px / 28px | 600 | Instrument Sans | -0.01em |
| `body-lg` | 16px / 24px | 17px / 26px | 18px / 28px | 400 | Inter | -0.005em |
| `body-md` | 15px / 24px | 15px / 24px | 15px / 24px | 400 | Inter | 0em |
| `body-sm` | 13px / 20px | 13px / 20px | 13px / 20px | 400 | Inter | 0.005em |
| `caption` | 11px / 16px | 11px / 16px | 11px / 16px | 500 | Inter | 0.02em |
| `overline` | 11px / 16px | 11px / 16px | 11px / 16px | 600 | Inter | 0.1em |

> **Rule:** Sizes `display-xl` through `heading-lg` scale responsively. Sizes `heading-md` through `overline` are fixed across all breakpoints. Body text stays locked at 15px — legibility should never be sacrificed for "fitting more."

### CSS Implementation

```css
/* Fluid type scaling using clamp() */
.display-xl {
  font-size: clamp(2.75rem, 2rem + 2.5vw, 4.5rem);  /* 44px → 72px */
  line-height: clamp(3rem, 2.25rem + 2.5vw, 4.75rem); /* 48px → 76px */
}

.display-md {
  font-size: clamp(1.875rem, 1.375rem + 1.5vw, 2.75rem); /* 30px → 44px */
  line-height: clamp(2.25rem, 1.75rem + 1.5vw, 3.125rem); /* 36px → 50px */
}

/* Fixed body — never scales */
.body-md {
  font-size: 0.9375rem; /* 15px */
  line-height: 1.5rem;   /* 24px */
}
```

---

---

## 6. Image Behavior Matrix

Every image on the page with art direction, loading, and responsive strategy.

| Image | Mobile | Tablet | Desktop | Loading | Notes |
|-------|--------|--------|---------|---------|-------|
| **Hero BG** | Portrait crop (9:16), `cover`, center. Serve 750px-wide WEBP. | Landscape (4:3), `cover`. Serve 1536px. | Landscape (16:9), `cover`. Serve 2880px (retina). | Eager (`loading="eager"`, `fetchpriority="high"`). No lazy. | Art-directed via `<picture>` with 3 sources. LCP image — must load FAST. Inline `<link rel="preload">` in `<head>`. |
| **Feature 1 image** | 4:3, full-width (343px), `cover`. Serve 750px. | 16:10, full-width (720px), `cover`. Serve 1536px. | 4:3, 50% width (600px), `cover`. Serve 1200px. | Lazy (`loading="lazy"`). Skeleton placeholder. | Aspect ratio shifts across breakpoints to match layout composition. |
| **Feature 2 image** | Same as Feature 1 | Same | Same (mirrored position) | Lazy | — |
| **Feature 3 image** | Same as Feature 1 | Same | Same | Lazy | — |
| **Testimonial avatars** | Hidden (not displayed on mobile cards) | 32px circle | 40px circle | Lazy | On mobile, cards show stars + quote + name only. Avatar omitted to save vertical space. |
| **Press logos** | 80×24px, greyscale, SVG | 100×28px, greyscale, SVG | 120×32px, greyscale, SVG | Lazy | SVGs — no raster images. Single sprite or inline SVGs. |
| **Footer logo** | 100px wide | 120px wide | 140px wide | Lazy | SVG |
| **Scroll indicator** | 12px icon (chevron) | Hidden | Hidden | — | CSS only, no image asset |

### Image Format Strategy

| Format | When Used |
|--------|-----------|
| **WEBP** | All raster images (hero, features). Saves 25-35% vs JPEG. |
| **AVIF** | `<source type="image/avif">` as first option — 40-50% savings. Fallback to WEBP. |
| **SVG** | Logos, icons, brand marks. Infinite scale, tiny file size. |
| **PNG** | Only for transparency needs (badges, payment icons). |

### Responsive Image Sizes Attribute

```html
<!-- Feature image -->
<img
  srcset="feature-400.webp 400w, feature-800.webp 800w, feature-1200.webp 1200w"
  sizes="(max-width: 1023px) 100vw, 600px"
  src="feature-800.webp"
  alt="Sofa compressing through a 60cm doorway"
  loading="lazy"
  decoding="async"
/>
```

---

---

## 7. Spacing Scaling Table

Every spacing value mapped from design system tokens to breakpoint-specific usage.

### Section-Level Spacing

| Spacing Role | Mobile Token → Value | Tablet Token → Value | Desktop Token → Value |
|-------------|---------------------|---------------------|----------------------|
| Section padding-top | `space-12` → 48px | `space-16` → 64px | `space-20` → 80px |
| Section padding-bottom | `space-12` → 48px | `space-16` → 64px | `space-20` → 80px |
| Hero padding-top | `space-24` → 96px (below sticky nav) | `space-24` → 96px | `space-32` → 128px |
| Hero padding-bottom | `space-12` → 48px | `space-16` → 64px | `space-20` → 80px |
| Footer CTA padding-Y | `space-14` → 56px | `space-16+2` → 72px | `space-24` → 96px |
| Footer padding-top | `space-12` → 48px | `space-16` → 64px | `space-20` → 80px |
| Footer padding-bottom | `space-8` → 32px | `space-10` → 40px | `space-12` → 48px |

### Component-Level Spacing

| Spacing Role | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Card padding | 16px | 20px | 24px |
| Card gap (in grid) | 16px | 24px | 32px |
| Input height | 44px | 44px | 44px |
| Button horizontal padding | 20px | 20px | 20px |
| Accordion item padding-Y | 16px | 20px | 20px |
| Testimonial card padding | 20px | 24px | 24px |
| Stats bar gap | 16px | 24px | 32px |
| Logo bar gap | 24px | 32px | 48px |

### Container Padding Illustration

```
Mobile (375px):
┌──────────────────────────────────┐
│ 16px │      343px content     │ 16px │
└──────────────────────────────────┘

Tablet (768px):
┌──────────────────────────────────────────┐
│  24px │         720px content         │ 24px │
└──────────────────────────────────────────┘

Desktop (1440px):
┌──────────────────────────────────────────────────────┐
│    120px    │      1200px content      │    120px    │
└──────────────────────────────────────────────────────┘
   (auto margin to center 1200px in 1440px)
```

---

---

## 8. Content Priority Map

What gets hidden, reordered, or simplified at each breakpoint.

### Priority Levels

| Priority | Meaning | Mobile | Tablet | Desktop |
|----------|---------|--------|--------|---------|
| **P1 — Critical** | Must be visible. Drives conversion. | ✅ Always shown | ✅ | ✅ |
| **P2 — Important** | Supports conversion but not essential. | ✅ Shown, may simplify | ✅ | ✅ |
| **P3 — Supporting** | Enhances experience, not required. | ⚠️ Hidden or collapsed | ✅ | ✅ |
| **P4 — Supplementary** | Desktop-only enhancements. | ❌ Hidden | ⚠️ Maybe | ✅ |

### Content Priority by Element

| Element | Priority | Mobile Treatment | Tablet | Desktop |
|---------|----------|-----------------|--------|---------|
| **H1 headline** | P1 | ✅ Full text, scaled down | ✅ Full | ✅ Full |
| **H2 subheadline** | P1 | ✅ Full text | ✅ Full | ✅ Full |
| **Primary CTA** | P1 | ✅ Full-width, prominent | ✅ Inline | ✅ Inline |
| **Secondary CTA** | P2 | ✅ Below primary, full-width | ✅ Inline next to primary | ✅ Inline |
| **Social proof pill** | P2 | ✅ Shown, `caption` size | ✅ `body-sm` | ✅ `body-sm` |
| **Urgency banner** | P2 | ✅ Wraps to 2 lines | ✅ Single line | ✅ Single line |
| **Feature eyebrows** | P3 | ✅ Shown (thin, low visual cost) | ✅ | ✅ |
| **Feature body copy** | P1 | ✅ Full text (never truncate) | ✅ | ✅ |
| **Feature stat callouts** | P2 | ✅ Shown, number smaller (36px) | ✅ 44px | ✅ 48px |
| **Feature images** | P1 | ✅ Full-width, art-directed | ✅ | ✅ |
| **Stats bar** | P2 | ✅ 2×2 grid | ✅ 2×2 | ✅ 4-col row |
| **Testimonial quotes** | P1 | ✅ Full text shown | ✅ | ✅ |
| **Testimonial avatars** | P3 | ❌ Hidden | ✅ 32px | ✅ 40px |
| **Testimonial details** | P2 | ✅ Name only, location hidden | ✅ Name + city | ✅ Full (name, city, product) |
| **Press logos** | P3 | ⚠️ Horizontal scroll, 3 visible | ✅ All 5 | ✅ All 5 |
| **"As featured in" label** | P3 | ❌ Hidden (logos self-explain) | ✅ | ✅ |
| **FAQ questions** | P1 | ✅ All 8 shown | ✅ | ✅ |
| **FAQ answers** | P1 | ✅ Full text on expand | ✅ | ✅ |
| **Footer CTA** | P1 | ✅ Full section, full-width CTA | ✅ | ✅ |
| **Footer nav columns** | P2 | ⚠️ Accordion (collapsed by default) | ✅ 2×2 grid | ✅ 4-col row |
| **Newsletter** | P2 | ✅ Stacked input/button | ✅ Inline | ✅ Inline |
| **Legal links** | P3 | ✅ Stacked list | ✅ Row | ✅ Row |
| **Payment badges** | P3 | ✅ Wrap to 2 rows | ✅ Single row | ✅ Single row |
| **Sticky bar: product name** | P3 | ❌ Hidden | ✅ | ✅ |
| **Sticky bar: reassurance** | P4 | ❌ Hidden | ❌ Hidden | ✅ |
| **Sticky bar: price** | P1 | ✅ Inside CTA label | ✅ Separate | ✅ Separate |
| **Sticky bar: CTA** | P1 | ✅ Full-width | ✅ Auto-width | ✅ Auto-width |
| **Scroll indicator chevron** | P2 | ✅ (mobile only) | ❌ Hidden | ❌ Hidden |
| **Magnetic cursor effect** | P4 | ❌ Disabled | ❌ | ✅ |
| **Hover lift on cards** | P4 | ❌ No hover on touch | ⚠️ On hover-capable | ✅ |
| **Parallax effect** | P3 | ⚠️ Reduced (0.2× factor) | ✅ (0.4× factor) | ✅ (0.4× factor) |

---

---

## 9. Navigation Adaptation

Detailed navigation responsive behavior across all states.

### Navigation States

```
MOBILE (375px):
┌────────────────────────────────────┐
│ [EzHome logo]          [≡ Menu]    │  ← 56px bar, hamburger
└────────────────────────────────────┘
   Tap hamburger → full-screen drawer:
   ┌────────────────────────────────────┐
   │                              [✕]   │
   │                                    │
   │   All Sofas                   →    │
   │   How It Works                →    │
   │   Reviews                     →    │
   │   FAQ                         →    │
   │   Our Story                   →    │
   │                                    │
   │   ┌──────────────────────────┐     │
   │   │    Shop the Collection   │     │  ← Coral CTA
   │   └──────────────────────────┘     │
   │   Free delivery · 100-night trial  │
   └────────────────────────────────────┘

TABLET (768px):
┌─────────────────────────────────────────────────────┐
│ [Logo]   All Sofas · How It Works · Reviews   [🔍][🛒] │  ← 64px
└─────────────────────────────────────────────────────┘

DESKTOP (1440px):
┌───────────────────────────────────────────────────────────────────┐
│ [Logo]   All Sofas · How It Works · Reviews · FAQ    [🔍] [🛒] [👤]  │  ← 72px
└───────────────────────────────────────────────────────────────────┘
```

### Navigation Interaction Spec

| Behavior | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| **Open** | Hamburger tap → drawer slides in from right (400ms, ease-smooth) | n/a | n/a |
| **Close** | × tap, overlay tap, swipe right, or Escape key | n/a | n/a |
| **Scroll hide/show** | On rapid scroll down, navbar hides (translateY: -100%). On scroll up, navbar reappears. | Same | Same |
| **Hover state** | n/a | Underline animation on nav links (ease-smooth, 200ms) | Same + more spacious hit areas |
| **Active indicator** | Drawer: bold weight + coral left border (4px) | Underline 2px coral | Underline 2px coral |
| **Cart badge** | n/a (in drawer) | 16px coral circle, top-right of cart icon, white number | Same |
| **Search** | In drawer: search input at top | Icon tap → search bar slides down (300ms) | Icon tap → search modal or bar expansion |

---

---

## 10. Figma Make Description (Copy-Paste)

> Paste this block into Figma Make to generate the responsive layouts.

```
RESPONSIVE BEHAVIOR — EZHOME COMPRESSION SOFA LANDING PAGE

Generate three responsive variants of the full landing page: Mobile
(375px wide), Tablet (768px wide), and Desktop (1440px wide).

GLOBAL RULES:
— Grid: 4 columns on mobile (16px gutter, 16px margin), 8 columns
  on tablet (24px gutter, 24px margin), 12 columns on desktop (32px
  gutter, auto margin, 1200px max content width).
— Sections alternate white (#FFFFFF) and cream (#FBF9F5) backgrounds.
  No visible borders between sections — color change IS the divider.
— Body text (Inter 400) stays at 15px on all breakpoints. Only
  headlines scale.
— Every tappable element on mobile is at least 48×48px.

NAVIGATION:
— Mobile: 56px height bar. Logo left (28px), hamburger icon right
  (48×48 tap target). On tap: full-screen drawer slides in from right.
  Drawer has nav links as 56px-tall full-width rows, and a coral
  "Shop the Collection" pill CTA at the bottom.
— Tablet: 64px bar. Logo left (32px), horizontal nav links center
  (body-sm medium), search icon and cart icon right.
— Desktop: 72px bar. Logo left (32px), horizontal nav links center
  (body-md medium, 32px gap), search icon, cart icon, and account
  avatar right.
— All: On scroll, navbar background transitions from transparent to
  white (95% opacity, 12px backdrop blur). Height shrinks by ~16px.

HERO:
— Mobile: Full viewport height (100svh). Background image fills the
  entire screen (portrait crop, 9:16 ratio). Content is vertically
  centered in the lower 60% of the screen with a subtle dark gradient
  behind it for readability. Headline at 44px (Instrument Sans 700),
  subheadline at 16px (Inter 400). CTAs stack vertically — coral
  "Shop the Collection" pill is full-width (52px height), "See How
  It Works →" text link below (44px height, full-width). Social proof
  pill below: "★ 4.9 · 2,400+ Happy Homes" at 12px. Scroll chevron
  pulses at the bottom.
— Tablet: 85vh height. Landscape background (4:3). Content centered
  horizontally and vertically. Headline at 56px. Subheadline at 17px.
  CTAs sit side-by-side (primary left, secondary right, 16px gap).
  No scroll indicator.
— Desktop: 90vh height (min 680px). Full-bleed background (16:9).
  Content centered, max 720px wide. Headline at 72px. Subheadline at
  18px. CTAs side-by-side. Social proof pill at 13px.
— Urgency banner above everything: cream bar, full-width, "Free
  delivery on all orders this week — ends Sunday" centered, 13px
  Inter medium, close × button right.

FEATURE BLOCKS (x3, alternating cream/white/cream):
— Mobile: Single column. Full-width image (4:3 aspect, 16px radius)
  on top, text content below. No left-right alternation. 32px gap
  between image and text. Headline at 30px, body at 15px, stat number
  at 36px.
— Tablet: Same single column stack but wider. Image 16:10 aspect.
  40px gap between image and text. Headline at 36px, stat at 44px.
— Desktop: Two-column layout (50/50 split, 32px gutter). Block 1:
  image left, text right. Block 2: text left, image right (REVERSED).
  Block 3: image left, text right. Images have 20px radius. On hover:
  images lift 4px with deeper shadow. Headline at 44px, stat at 48px.

SOCIAL PROOF:
— Stats bar: Mobile = 2×2 grid (2 rows of 2 stats, 16px gap), stat
  numbers at 36px. Tablet = 2×2 grid (24px gap), numbers at 44px.
  Desktop = single 4-column row (32px gap), numbers at 48px, vertical
  dividers between stats.
— Testimonials: Mobile = 1 card visible, full-width, swipe to see
  others, dot indicators below. Tablet = 2 cards visible, carousel.
  Desktop = 3 cards visible, arrow buttons on sides, auto-advance.
  Cards have 16px radius, white background, subtle shadow.
  On mobile: author avatar is hidden, show name only.
  On desktop: show 40px avatar, name, location, and product info.
— Press logos: Mobile = horizontal scroll row, 3 logos visible plus
  a peek of the 4th. Label "As featured in" hidden on mobile.
  Tablet/Desktop = all 5 logos in a single row, greyscale.

FAQ:
— All breakpoints: Accordion (single-expand). Question is Instrument
  Sans 600. Answer is Inter 400, max 65ch width.
— Mobile: Full container width (343px). Question at 16px, 48px minimum
  row height for touch. Answer at 15px.
— Tablet: 624px wide, centered. Question at 17px.
— Desktop: 720px wide, centered. Question at 18px.

FOOTER CTA BAND (ink-900 background, white text):
— All: Centered text. H2 + body + coral CTA pill.
— Mobile: H2 at 30px. CTA full-width, 52px height. Padding: 56px top/bottom.
— Tablet: H2 at 36px. CTA auto-width. Padding: 72px.
— Desktop: H2 at 44px. CTA auto-width. Padding: 96px. Content max 720px.

FOOTER:
— Mobile: Nav columns become accordions — each heading (Shop, Support,
  Company, Connect) is tappable, expands to show links. Newsletter
  section below: input stacks above button (both full-width). Legal
  links stack vertically. Payment icons wrap to 2 rows.
— Tablet: Nav in 2×2 grid (Shop + Support top, Company + Connect
  bottom). Newsletter inline (input + button side-by-side). Legal
  bar in one row. Payment icons single row.
— Desktop: 4-column row for nav. Newsletter either in 5th column or
  full-width row below. Legal bar one row. All payment icons visible.

STICKY BAR (appears after scrolling past hero):
— Mobile: 64px bar. Shows only price ("From $1,299") on the left and
  a full-width coral "Add to Cart — $1,299" pill on the right.
— Tablet: 64px bar. Shows product name, price, and CTA button.
— Desktop: 64px bar. Shows product name, price, CTA, and reassurance
  text ("Free delivery · 100-night trial").
— All: Slides down from top (400ms ease-smooth) when hero scrolls out.
  White background, subtle shadow.
```

---

---

## 11. Implementation Notes (Tailwind / CSS)

### Container Setup

```css
/* Global container — used by every section */
.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 16px;
}

@media (min-width: 768px) {
  .container { padding-inline: 24px; }
}

@media (min-width: 1024px) {
  .container {
    padding-inline: 32px;
    max-width: 1200px;
  }
}

@media (min-width: 1440px) {
  .container {
    max-width: 1200px; /* capped — never wider */
  }
}
```

### Tailwind Breakpoint Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm':  '640px',
      'md':  '768px',   // Tablet
      'lg':  '1024px',  // Desktop layout triggers
      'xl':  '1280px',  // Wide desktop
      '2xl': '1536px',  // Ultra-wide
    },
  },
}
```

### Feature Block Responsive Layout

```html
<!-- Feature Block — single column mobile, 2-col desktop -->
<section class="py-12 md:py-16 lg:py-20">
  <div class="container">
    <div class="flex flex-col lg:flex-row lg:items-center lg:gap-8
                lg:even:flex-row-reverse">
      <!-- Image -->
      <div class="w-full lg:w-1/2">
        <img class="aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]
                     w-full object-cover rounded-2xl lg:rounded-[20px]
                     lg:hover:translate-y-[-4px] lg:hover:shadow-lg
                     transition-all duration-300"
             ... />
      </div>
      <!-- Text -->
      <div class="mt-8 md:mt-10 lg:mt-0 lg:w-1/2">
        <span class="text-[11px] font-semibold uppercase tracking-[0.1em]
                      text-ink-400">EYEBROW</span>
        <h2 class="mt-3 text-[30px] md:text-[36px] lg:text-[44px]
                   font-display font-bold leading-tight tracking-tight">
          Headline
        </h2>
        <p class="mt-4 lg:mt-5 text-[15px] leading-relaxed max-w-[65ch]">
          Body copy
        </p>
      </div>
    </div>
  </div>
</section>
```

### Stats Bar Grid → Row

```html
<div class="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
  <!-- stat cards -->
</div>
```

### Testimonial Carousel Responsive

```html
<!-- Container with CSS scroll-snap for mobile/tablet -->
<div class="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory
            scrollbar-hide lg:overflow-visible lg:grid lg:grid-cols-3">
  <div class="snap-center shrink-0 w-full md:w-[calc(50%-12px)]
              lg:w-auto lg:shrink">
    <!-- Testimonial card -->
  </div>
</div>
```

### Footer Column Accordion (Mobile)

```css
/* Footer columns: accordion on mobile, grid on tablet+  */
.footer-nav {
  display: flex;
  flex-direction: column;
}

.footer-column-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms cubic-bezier(0.4, 0, 0, 1);
}

.footer-column[open] .footer-column-content {
  max-height: 400px; /* generous max */
}

@media (min-width: 768px) {
  .footer-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  .footer-column-content {
    max-height: none;
    overflow: visible;
  }
}

@media (min-width: 1024px) {
  .footer-nav {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

---

## Appendix A — Breakpoint Decision Cheat Sheet

Quick reference for Figma artboard setup:

| Artboard | Width | Grid | Key Layout |
|----------|-------|------|-----------|
| **Mobile** | 375px | 4-col, 16px gutter, 16px margin | Everything stacks. Full-width CTAs. Accordions. |
| **Tablet** | 768px | 8-col, 24px gutter, 24px margin | 2×2 grids. Inline CTAs. Wider text. |
| **Desktop** | 1440px | 12-col, 32px gutter, auto margin (1200px content) | 2-col features. 4-col stats/footer. Hover effects. |

## Appendix B — Common Responsive Pitfalls (Avoid)

| Pitfall | Why It's Bad | EzHome Solution |
|---------|-------------|-----------------|
| Truncating body copy on mobile | Users lose the value proposition — kills conversion | All body copy shows in full at 15px. Line breaks happen naturally. |
| Hiding the secondary CTA on mobile | Loses the "curious but not ready" segment | Keep it — stack below primary. |
| Making testimonial cards too short on mobile | Quotes get clipped, losing trust signal | Min-height 200px, full quote shown. |
| 3-column grid at 768px | Columns too narrow for comfortable reading (192px each) | Use 1 or 2 columns until 1024px. |
| Shrinking body text below 15px | Legibility failure, especially for older users | body-md is FIXED at 15px. Headlines scale. Body doesn't. |
| Leaving desktop hover effects on touch devices | "Stuck hover" states on iOS Safari | Use `@media (hover: hover)` guard on all hover styles. |
| Full-width images without aspect-ratio | Layout shift (CLS penalty) on image load | Always set `aspect-ratio` in CSS: `aspect-ratio: 4/3`. |
| Banner wrapping to 3+ lines on narrow phones | Wastes prime viewport real estate | Cap banner text at 54 chars. Test at 320px. |

## Appendix C — Testing Checklist

| Test | Target |
|------|--------|
| ✅ iPhone SE (375×667) | Minimum supported width |
| ✅ iPhone 14 Pro (393×852) | Primary mobile target |
| ✅ iPhone 14 Pro Max (430×932) | Large phone |
| ✅ iPad Mini (768×1024) | Tablet breakpoint entry |
| ✅ iPad Air (820×1180) | Mid-tablet |
| ✅ iPad Pro 12.9" (1024×1366) | Desktop layout triggers |
| ✅ MacBook Air (1440×900) | Primary desktop target |
| ✅ External monitor (1920×1080) | Wide desktop |
| ✅ Ultra-wide (2560×1440) | Content remains centered in 1200px |
| ✅ 320px width | Stress test: nothing overflows, nothing breaks |
| ✅ Landscape mobile | Hero doesn't become too short; content still accessible |
| ✅ `prefers-reduced-motion` | All animations off, layout intact |
| ✅ `prefers-color-scheme: dark` | Dark mode tokens apply correctly |
| ✅ 200% text zoom | Nothing clips, truncates, or overflows |

---

*Responsive spec authored for the EzHome compression sofa landing page. All breakpoints, spacings, type sizes, and grid values reference `design-system/tokens.json`. Section 10 is the Figma Make–ready description.*
