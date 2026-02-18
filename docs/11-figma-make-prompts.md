# EzHome — Figma Make Prompts (Compression Sofa)

> 5 production-ready Figma Make prompts, graduated from simple to complex.
> All prompts are grounded in the exact design tokens, copy, and component specs from this repository.

---

## How to Use

1. Open **Figma Make** (AI Generate)
2. Paste one prompt below — start with Prompt 1 if you're generating from scratch, or jump to 3–5 if you already have a frame structure
3. After generation, populate text layers using the `hero/*`, `features/*`, `social/*`, `faq/*`, `footer/*` layer names from [`copy-deck-compression-sofa.md`](./copy-deck-compression-sofa.md)
4. Replace placeholder imagery with product photography

---

## Brand Context Block (shared across all prompts)

> Copy-paste this as a prefix if Figma Make accepts system-level context, or weave it into each prompt as written below.

```
Brand: EzHome — premium DTC compression sofa for apartment dwellers.
Mood: Minimal, bold, warm. Think Transformer Table meets Apple product pages.
Voice: Professional yet casual. Confident, never shouty.
Primary: #141416 (Ink) on #FFFFFF (White) and #FBF9F5 (Cream).
Accent: #FF6B42 (Coral) — used sparingly for CTAs only (≤10% of screen).
Secondary: #3A6B3A (Sage) — for trust badges and secondary tags.
Display font: Instrument Sans 700. Body font: Inter 400/500.
Border radius: Pill-shaped (999px) for buttons; 16px for cards; 12px for inputs.
Spacing: 8px grid. Generous whitespace between sections (96–128px vertical).
Animation feel: Smooth scroll-reveal (ease-smooth 800ms), spring micro-interactions.
```

---
---

## PROMPT 1 — SIMPLE (Hero Section Only)

**Use when:** You need a single hero section to test layout, typography, and tone.

```
Build a full-width hero section for a premium e-commerce sofa brand called EzHome.

Visual style: Ultra-clean, Transformer Table / Apple product page aesthetic. Dominant white background (#FFFFFF), charcoal-black text (#141416). One bold coral accent (#FF6B42) on the primary CTA button only. Warm and minimal — no clutter.

Typography: Headline in Instrument Sans Bold at 72px desktop / 44px mobile. Subheadline in Inter Regular at 18px. Button labels in Instrument Sans SemiBold 15px.

Layout:
— Full-bleed background (lifestyle sofa photo, slightly desaturated warm tones)
— Content centered, max-width 720px
— Headline: "Sofa In. Stress Out. Instantly." (H1, 32 chars)
— Subheadline: "A premium sofa that compresses to fit through any door — and looks like it never had to." (90 chars)
— Primary CTA: Pill-shaped coral (#FF6B42) button, white text, "Shop the Collection"
— Secondary CTA: Ghost/text link in ink, "See How It Works →"
— Social proof pill below CTAs: "★ 4.9 · 2,400+ Happy Homes" — small, Inter 500, 13px, muted ink
— Top urgency banner: Full-width cream (#FBF9F5) bar, "Free delivery on all orders this week — ends Sunday"

Spacing: 96px vertical padding. 24px gap between headline and subheadline. 16px gap between CTAs. 32px between CTAs and social proof pill.

Responsive:
— Desktop (1280px+): Headline 72px, two-column optional (text left, product right)
— Tablet (768px): Headline 48px, single column centered
— Mobile (390px): Headline 44px, full-width stacked, CTAs stack vertically, urgency banner text wraps to 2 lines

Layer names: hero/headline, hero/subheadline, hero/cta-primary, hero/cta-secondary, hero/microcopy, hero/urgency-banner.
```

---
---

## PROMPT 2 — MODERATE (Hero + 3 Feature Blocks)

**Use when:** You need the core above-the-fold story: hook + proof of value.

```
Build a single-page product landing section for EzHome, a premium compression sofa brand. Style: Apple product page meets Transformer Table — stark white/cream alternating sections, bold black headlines, one coral (#FF6B42) accent for CTAs only. Fonts: Instrument Sans 700 for headlines, Inter 400 for body. Max line-width 65ch for body text.

SECTION 1 — HERO (white background #FFFFFF):
Full-width lifestyle image background. Centered content (max 720px). H1 headline "Sofa In. Stress Out. Instantly." at 72px desktop / 44px mobile, tracking -0.035em. Subheadline below at 18px Inter: "A premium sofa that compresses to fit through any door — and looks like it never had to." Pill CTA button in coral (#FF6B42): "Shop the Collection." Ghost link: "See How It Works →." Social proof pill: "★ 4.9 · 2,400+ Happy Homes" in 13px muted text. Top urgency banner on cream (#FBF9F5) background: "Free delivery on all orders this week — ends Sunday."

SECTION 2 — FEATURE 1 (cream background #FBF9F5):
Two-column layout: left = product image/animation of sofa compressing; right = text block.
Eyebrow: "ENGINEERED TO MOVE" (11px, uppercase, Inter 600, letter-spacing 0.1em, ink-400 color).
H2: "Fits through doorways other sofas can't." (Instrument Sans 700, 44px desktop / 30px mobile).
Body: "Our proven compression system reduces your sofa to half its assembled width — small enough for a 60 cm doorway, a narrow stairwell, or the world's most annoying apartment lift. No tools. No removalists. No drama. Unbox, expand, and sink in." (Inter 400, 15px, max 65ch).
Stat callout: "60 cm" in 48px bold + "compressed width" label below.

SECTION 3 — FEATURE 2 (white background #FFFFFF):
Reverse layout: text left, image right.
Eyebrow: "SIT-TESTED. NAPS APPROVED."
H2: "Comfort that doesn't apologize for being portable."
Body: "High-density foam core wrapped in a down-alternative fiber layer. The kind of sink-in-but-still-supportive feel you'd expect from a sofa twice the price. Removable, machine-washable covers in 8 exclusive colourways — because life happens, and your sofa should handle it."
Stat: "8 colours" bold + "machine-washable, swappable covers."

SECTION 4 — FEATURE 3 (cream background #FBF9F5):
Normal layout: image left, text right.
Eyebrow: "YOUR LAYOUT. YOUR RULES."
H2: "One sofa. Twelve configurations. Zero commitment."
Body: "Modular sections click together in seconds — L-shape for movie night, straight for the dinner party, split across rooms when your housemate needs a couch too. Moving to a new place? Each module compresses individually and fits in a standard car boot. This sofa moves when you do."
Stat: "12 layouts" bold + "modular, expandable, always ready to rearrange."

Interactions:
— Hover on feature images: lift 4px with increased shadow (ease-spring, 300ms)
— Scroll reveal on each section: fade-up 24px, ease-smooth 800ms, stagger children by 80ms
— Button hover: background darkens one shade, cursor pointer

Responsive:
— Desktop: two-column features, 32px gutter, 1200px container
— Tablet (768px): single column, image above text, 24px gutter
— Mobile (390px): single column, full-width images, 16px horizontal margin

Layer names: hero/*, features/01/*, features/02/*, features/03/*.
```

---
---

## PROMPT 3 — DETAILED (Full Landing Page — All 5 Sections)

**Use when:** You need a complete, scrollable product page ready for content population.

```
Build a complete single-page e-commerce landing page for EzHome, a premium compression sofa brand targeting metro apartment dwellers aged 24–45. The design should feel like a Transformer Table or Apple product page: ultra-clean, generous whitespace, bold typography, warm neutrals, one bold accent color. Conversion-focused with urgency, social proof, and objection-handling built into the scroll.

DESIGN SYSTEM:
— Colors: Ink #141416 (text/primary buttons), White #FFFFFF (bg), Cream #FBF9F5 (alt sections), Coral #FF6B42 (CTAs only — max one per viewport), Sage #3A6B3A (trust badges)
— Fonts: Instrument Sans 700 (headlines, Display), Inter 400/500/600 (body/UI)
— Radius: 999px (pill buttons), 16px (cards), 12px (inputs)
— Spacing: 8px grid, 96–128px between sections, 64px padding inside sections
— Shadows: 0 2px 8px rgba(20,20,22,0.06) resting, 0 12px 32px rgba(20,20,22,0.12) hover-lifted
— Sections alternate white and cream backgrounds for visual rhythm (no hard borders)

SECTION 1 — URGENCY BANNER + HERO:
Cream bar at very top: "Free delivery on all orders this week — ends Sunday" (Inter 500, 13px).
Full-width hero below: lifestyle sofa photo background. Centered text block (max 720px):
  H1: "Sofa In. Stress Out. Instantly." — 72px/76px, -0.035em tracking
  H2 sub: "A premium sofa that compresses to fit through any door — and looks like it never had to." — 18px/28px Inter 400
  Coral pill CTA: "Shop the Collection" — 44px height, 20px padding-x, white text
  Ghost link: "See How It Works →" — Inter 500, ink text, underline on hover
  Proof pill: "★ 4.9 · 2,400+ Happy Homes" — 13px, ink-400 muted

SECTION 2 — THREE FEATURE BLOCKS (alternating white/cream/white):
Each block: two-column (image | text), alternate sides each block.

Block 1 (cream bg): Image left, text right.
  Eyebrow: "ENGINEERED TO MOVE" (11px uppercase, 0.1em tracking, ink-400)
  H2: "Fits through doorways other sofas can't." (44px/50px desktop, 30px mobile)
  Body: [248 chars — compression tech description, max 65ch line-width]
  Stat: "60 cm" at 48px bold + supporting label

Block 2 (white bg): Text left, image right.
  Eyebrow: "SIT-TESTED. NAPS APPROVED."
  H2: "Comfort that doesn't apologize for being portable."
  Body: [273 chars — materials & comfort description]
  Stat: "8 colours" + label

Block 3 (cream bg): Image left, text right.
  Eyebrow: "YOUR LAYOUT. YOUR RULES."
  H2: "One sofa. Twelve configurations. Zero commitment."
  Body: [284 chars — modular configurations]
  Stat: "12 layouts" + label

SECTION 3 — SOCIAL PROOF (white bg):
  Eyebrow: "DON'T TAKE OUR WORD FOR IT"
  H2: "2,400+ apartments. Zero sofas stuck in lobbies."
  
  Stats bar: 4 columns evenly spaced —
    "2,400+" / sofas delivered | "4.9 ★" / average review | "<5 min" / setup time | "96%" / easier than any move
    (Numbers in Instrument Sans 700 at 48px, labels in Inter 400 13px)
  
  Testimonial carousel: 3 cards visible on desktop (auto-scroll, pause on hover):
    Each card: white bg, 16px radius, shadow resting, 24px padding.
    ★★★★★ stars at top, italic quote (15px Inter), author name bold, detail line muted, "Verified Buyer" sage pill badge.
    Card 1: "We live on the 4th floor, no lift..." — Sam & Jess T., Melbourne
    Card 2: "Third apartment in two years..." — David K., Sydney
    Card 3: "Honestly looks more expensive than it is..." — Michelle L., Brisbane
  
  Press bar below: "As featured in" label + 5 greyscale logos (Broadsheet, Design Files, Domain, Apartment Therapy, Dezeen)

SECTION 4 — FAQ ACCORDION (cream bg):
  Eyebrow: "QUESTIONS? GOOD."
  H2: "Everything you need to know before you click 'buy.'"
  
  8 accordion items (single-expand, smooth height animation 300ms ease-smooth):
  Container: max-width 720px centered.
  Question: Instrument Sans 600, 18px. Chevron icon rotates 180° on open.
  Answer: Inter 400, 15px, ink-500 color, max 65ch. Padding-top 16px when open.
  Divider: 1px ink-100 between items.
  
  Q1: How does the compression technology actually work?
  Q2: Will the sofa feel the same after expanding?
  Q3: What's included in the box?
  Q4: Can I really carry it myself?
  Q5: Can I re-compress it if I move again?
  Q6: Are the covers really machine-washable?
  Q7: What's the return policy?
  Q8: How does delivery work?

SECTION 5 — FOOTER:
  Pre-footer CTA band (ink-900 bg, white text):
    H2: "Your next place deserves a sofa that actually fits." — centered
    Body: "100-night trial. Free delivery. Instant setup."
    Coral pill CTA: "Shop Now"
  
  Main footer (white bg, ink-300 text):
    4 columns: Shop | Support | Company | Connect (with social icons)
    Newsletter block: "Get 10% off your first sofa" headline, email input + "Subscribe" pill button
    Legal bar: © 2026 EzHome. All rights reserved. | Terms | Privacy | Cookies | Accessibility
    Payment icons row: Visa, Mastercard, Amex, Apple Pay, Google Pay, Afterpay, PayPal

  Sticky bar (appears on scroll past hero, 64px height, white bg, subtle top shadow):
    "EzHome Compression Sofa — 2 Seater" | "From $1,299" | coral "Add to Cart" pill | "Free delivery · 100-night trial" muted

INTERACTIONS:
— All sections: scroll-triggered fade-up (24px, 800ms, ease-smooth). Stagger children 80ms.
— Feature images: hover lift 4px + shadow deepen (ease-spring 300ms)
— Testimonial carousel: auto-scroll every 5s, pause on hover, swipeable on touch
— FAQ accordion: smooth height animation (ease-smooth 300ms), chevron rotation
— Buttons: hover darkens background one shade. Active: scale 0.97 (ease-default 100ms). Focus-visible: 3px ink ring.
— Sticky bar: slides down from top (ease-smooth 300ms) when hero scrolls out of viewport
— CTA hover: coral-500 → coral-600

RESPONSIVE:
— Desktop (1280px): 1200px container, two-column features, 4-stat row, 3-card testimonials
— Tablet (768px): single-column features (image above text), 2×2 stats grid, 2 testimonial cards
— Mobile (390px): full-width everything, stats stack 2×2, single testimonial swipe, sticky bar simplifies to CTA only, FAQ full-width, footer stacks to 2×2 grid then single column

LAYER NAMING: Use prefixes hero/*, features/01/*, features/02/*, features/03/*, social/*, social/testimonial/01–04/*, faq/*, faq/item/01–08/*, footer-cta/*, footer/*, sticky-bar/*, badge/*.
```

---
---

## PROMPT 4 — COMPLEX (Full Page + Dark Mode + All Micro-Interactions)

**Use when:** You need a presentation-ready deliverable with light/dark variants and complete interaction design.

```
Build a complete, dual-theme (light + dark) e-commerce product landing page for EzHome compression sofas. This should be portfolio-quality — Apple.com level polish. The page must convert: every scroll-stop is designed to handle an objection and move toward "Add to Cart."

TARGET: Metro renters & first-home buyers, 24–45, who dread moving large furniture. They want premium aesthetics without the logistics nightmare.

═══ THEME — LIGHT (default) ═══
Background: #FFFFFF (primary sections), #FBF9F5 cream (alternating sections)
Text: #141416 ink (primary), #57575F ink-500 (secondary), #A0A0A9 ink-300 (muted)
Accent: #FF6B42 coral (CTAs, hearts, highlights — ≤10% of viewport)
Secondary: #3A6B3A sage (trust badges, secondary tags)
Borders: #E6E6EA ink-100
Cards: #FFFFFF white, shadow 0 2px 8px rgba(20,20,22,0.06), radius 16px
Buttons: Pill-shaped (radius 999px). Primary = ink-900 bg / white text. Accent = coral-500 bg / white text. Secondary = white bg / ink-900 text / ink-100 border.

═══ THEME — DARK ═══
Background: #0A0A0B ink-950 (primary), #141416 ink-900 (alternating)
Text: #F4F4F6 ink-50 (primary), #A0A0A9 ink-300 (secondary)
Accent: #FF8A6A coral-400 (lighter for dark bg contrast)
Borders: #1E1E22 ink-800
Cards: #141416 ink-900, shadow 0 2px 12px rgba(0,0,0,0.3)
Buttons: Primary = white bg / ink-900 text. Accent = coral-400 bg / ink-950 text.

═══ TYPOGRAPHY ═══
Display: Instrument Sans 700. Scale: 72→44px (display-xl), 44→30px (display-md), 28→22px (heading-lg).
Body: Inter 400. 15px/24px default. Max 65ch line-width.
Eyebrow: Inter 600, 11px, uppercase, 0.1em letter-spacing, ink-400 color.
Stat numbers: Instrument Sans 700, 48px. Stat labels: Inter 400, 13px.

═══ PAGE STRUCTURE ═══
Build all 5 sections from Prompt 3 (Hero, Features×3, Social Proof, FAQ, Footer) with the same copy AND add these additional elements:

ADDITION 1 — "How It Works" mini-section (between Features and Social Proof):
White bg. H2 centered: "From doorstep to dream sofa in under 5 minutes."
3 step cards in a row:
  Step 1: 📦 icon, "Unbox" headline, "Your sofa arrives in a compact box via standard courier. No bulky delivery window." body
  Step 2: 🔓 icon, "Expand" headline, "Cut the wrap, and watch the foam expand to full size. It's genuinely satisfying." body
  Step 3: 🛋️ icon, "Sink In" headline, "Arrange your modules, toss on the covers, and you're done. Movie night starts now." body
Each card: 200px wide, centered icon (48px), heading-lg below, body-sm muted text. Cards stagger-animate in on scroll (80ms offset each).

ADDITION 2 — Exit-intent popup:
Modal overlay (ink-900 at 60% opacity). Centered card (max 420px, 32px padding, 16px radius):
  H2: "Wait — your sofa is still out there."
  Body: "Get 10% off your first order. We'll save your cart for 48 hours."
  Email input (44px height, 12px radius, ink-100 border) + coral CTA "Get My 10% Off"
  Dismiss link: "No thanks, I enjoy moving furniture the hard way" (Inter 400, 13px, muted, underline on hover)
  Animation: backdrop fades in 300ms, card slides up 16px + fades in 500ms ease-smooth.

ADDITION 3 — Colour swatch selector (floating element or below hero):
8 circular swatches (32px diameter, 4px gap): Charcoal, Oat, Sage, Ink, Cloud, Sand, Slate, Blush.
Active swatch: 2px coral border + checkmark overlay. Hover: scale 1.1 (ease-spring 200ms).
Label below swatches updates on selection: "{Colour Name}" in body-sm.

═══ INTERACTIONS (specify all) ═══
Scroll reveals: Every section fades up 24px, 800ms ease-smooth. Children stagger 80ms.
Feature images: Hover lift 4px + shadow 0 12px 32px rgba(20,20,22,0.12). Ease-spring 300ms.
Testimonials: 3-card carousel, auto-advance 5s, pause hover/focus, swipeable touch, dot indicators.
FAQ: Single-expand accordion, height animates ease-smooth 300ms, chevron rotates 180°.
Buttons: Hover = bg one shade darker. Active = scale 0.97 (100ms). Focus-visible = 3px ink ring.
Sticky bar: Slides down from top ease-smooth 300ms when hero exits viewport. Scrolling down = visible, scrolling up fast = hides.
Favourite heart: ease-bounce scale 1→1.3→1 on click, fill coral.
Colour swatches: ease-spring scale on hover, hero image crossfades to match colour.
CTA interactions: Coral-500 → coral-600 on hover, → coral-700 on active.
Dark mode toggle: Sun/moon icon in header; entire page crossfades 300ms ease-smooth.
Reduced motion: All durations → 0ms, opacity-only transitions remain.

═══ RESPONSIVE ═══
Desktop (1280px+): 1200px container, 12-col grid (32px gutter), 2-col features, 4-stat row, 3-card testimonials, 4-col footer.
Tablet (768px): 8-col grid (24px gutter), 1-col features (image above text), 2×2 stats, 2-card testimonials, 2-col footer.
Mobile (390px): 4-col grid (16px margin), 1-col everything, stats 2×2, swipe testimonials, sticky bar CTA-only, accordion full-width, 1-col footer stacked, hamburger nav.

═══ LAYER NAMING ═══
Strict prefix convention: hero/*, features/01–03/*, how-it-works/*, social/*, social/testimonial/01–04/*, faq/*, faq/item/01–08/*, footer-cta/*, footer/*, sticky-bar/*, popup/*, swatch/*.
Generate both [Light] and [Dark] variants as top-level frames.
```

---
---

## PROMPT 5 — MAXIMUM (Full Page + PDP + Cart + All States + Design System Frame)

**Use when:** You need a full Figma file structure — not just one page, but multiple frames covering the complete user journey, plus a design system reference frame.

```
Build a complete Figma design file for EzHome, a premium compression sofa e-commerce brand. The file should contain 5 top-level frames covering the full purchase journey plus a design system reference. Style: Apple product page × Transformer Table — ultra-clean, warm, bold, conversion-focused. Dual theme (light + dark).

═══ DESIGN SYSTEM (reference frame, 2nd in file order) ═══

COLOR GRID: Display all tokens with hex values in labeled swatches.
Primitives: ink (950→50), cream (50→400), sage (50→900), coral (50→900), sky, amber, red, green.
Semantic: bg-primary, bg-secondary, bg-subtle, text-primary, text-secondary, text-tertiary, text-inverse, border-primary, border-secondary, interactive-primary, interactive-accent + hover/active states for each.
Dark mode variants side-by-side.

TYPE SCALE: Show all 11 levels (display-xl through caption) with specimen text, size, line-height, tracking, weight, font family. Include Vietnamese diacritics sample "Căn hộ đẹp tại Quận 1" at each level.

SPACING SCALE: Visual ruler showing space-1 (4px) through space-32 (128px) with usage labels.

COMPONENT LIBRARY (auto-layout, variants):
— Button: 6 variants (primary/secondary/accent/ghost/danger/link) × 4 sizes (xs/sm/md/lg) × 5 states (default/hover/active/focus/disabled/loading). Pill radius. Include icon-left and icon-right slots.
— Input: 3 sizes × 6 states (default/hover/focus/error/disabled/read-only). With label, placeholder, error message, helper text layers.
— Card: Product card with image slot (16:10 ratio), price badge, title, subtitle, CTA. Hover-lifted variant.
— Testimonial Card: Star row, italic quote, author name, detail, verified badge. Light + dark.
— Stat Card: Large number (48px), label, optional icon. Light + dark.
— Badge: Bestseller, New, Limited Edition, Low Stock, Free Delivery. Pill shape, sage bg.
— Accordion Item: Question + chevron, expandable answer. Open/closed variants.
— Swatch Selector: 8 circles, active state with border + check.
— Sticky Bar: Product name, price, CTA, reassurance text. Visible/hidden variants.
— Newsletter Signup: Headline, body, input + button inline, disclaimer.
— Urgency Banner: Full-width, cream bg, centered text, close icon.

═══ FRAME 1 — LANDING PAGE (light) ═══
Complete landing page as described in Prompt 4 (all 5 sections + How It Works + colour swatches). Use the component library instances. Full scroll height.

═══ FRAME 2 — LANDING PAGE (dark) ═══
Identical structure, dark theme applied. All semantic tokens swap per the dark mode mapping. Coral becomes coral-400 (#FF8A6A).

═══ FRAME 3 — PRODUCT DETAIL PAGE (PDP) ═══
Header: Logo left, nav links center (All Sofas, How It Works, Reviews, FAQ), cart icon + count badge right. Sticky on scroll, transparent → white on scroll.

Gallery section (top):
— Large hero image (16:10, full-width on mobile, 60% width on desktop)
— Thumbnail strip below (6 thumbnails, click to swap, active = 2px coral border)
— "View in Room" AR badge (top-right of image, sage bg)

Product info (right column on desktop):
— Breadcrumb: Home / Sofas / 2-Seater
— H1: "The 2-Seater" (heading-xl, 36px)
— Reviews summary: "★★★★★ 4.9 (1,200 reviews)" — clickable, scrolls to reviews
— Price: "$1,299" (heading-lg, ink-900) + "$1,499" strikethrough (body-md, ink-300)
— "or 4 interest-free payments of $324.75 with Afterpay" (body-sm, muted)
— Colour selector: 8 swatches (same as landing page), selected name displayed
— Size selector: "2-Seater" / "3-Seater" / "L-Shape Modular" — pill toggle group, selected = ink-900 fill
— Quantity: minus/plus stepper, default 1
— Primary CTA: "Add to Cart — $1,299" — full-width coral pill, 52px height
— Secondary: "Buy with Apple Pay" — full-width ink-900 pill with Apple Pay logo
— Trust badges row: "🔒 Secure checkout" · "📦 Free delivery" · "↩ 100-night trial" · "🧼 Washable covers"
— Accordion below: "Description" (open by default), "Dimensions", "Materials", "Shipping", "Reviews (1,200)"

Reviews section (below fold):
— H2: "What 1,200+ apartment dwellers are saying"
— Filter bar: "All" / "5 star" / "4 star" / "With photos" pills
— Review cards: 3 visible, "Load more" button
— Each card: stars, title bold, body, author + date, verified badge, helpful vote button

Related products: "You might also like" — 4 product cards, horizontal scroll on mobile.

═══ FRAME 4 — CART DRAWER (overlay) ═══
Slide-in from right, 420px wide, full-height, white bg, shadow -12px 0 32px rgba(0,0,0,0.1).
— Header: "Your Cart (2)" + close X icon
— Cart item row: thumbnail (80×80, 8px radius), product name, colour, size, quantity stepper, price, remove icon
— Divider
— Subtotal row: label left, price right
— Delivery row: "Free" in sage text
— Discount code: expandable "Have a code?" with input + Apply button
— Reassurance stack: 🔒 Secure checkout · ↩ 100-night free returns · 📦 Ships in 1–3 business days
— CTA: "Checkout — $2,598" full-width coral pill
— "or pay with" row: Apple Pay, Google Pay, Afterpay logos
— Backdrop: ink-900 at 40% opacity, click to close
— Empty state variant: Illustration + "Your cart is empty" + "Start Shopping" CTA

═══ FRAME 5 — EXIT-INTENT POPUP (overlay) ═══
As described in Prompt 4. Include 3 variants:
  A) First-time visitor: 10% off offer
  B) Returning visitor with items in cart: "Still thinking about the {Product Name}?"
  C) High-value cart ($2,000+): Free expedited shipping offer

═══ INTERACTIONS (all frames) ═══
Scroll reveals: fade-up 24px, ease-smooth 800ms, stagger 80ms.
Button states: hover (darken), active (scale 0.97), focus-visible (3px ring), loading (spinner).
Image gallery: click thumbnail → hero crossfade 300ms. Swipe on mobile.
Colour swatches: hover scale 1.1, click = border + check + hero image swap.
FAQ/PDP accordion: height ease-smooth 300ms, chevron rotate.
Cart drawer: slide-in ease-smooth 500ms, backdrop fade 300ms.
Popup: backdrop fade 300ms, card slide-up + fade 500ms.
Sticky bar: slide-down/up ease-smooth 300ms on scroll direction change.
Testimonial carousel: auto-advance 5s, pause hover/focus, dot indicators, swipe.
Add to Cart: button shows checkmark + "Added!" for 2s before reverting. Cart icon badge bounces (ease-bounce).
Reduced motion: all transform/opacity durations → 0ms. Opacity transitions remain.
Focus management: tab order follows visual flow. Modals trap focus. Return focus on close.

═══ RESPONSIVE ═══
Each of the 5 frames should have 3 sub-frames:
— Desktop: 1440px wide, 1200px content container, 12-col grid (32px gutter)
— Tablet: 768px wide, 8-col grid (24px gutter)
— Mobile: 390px wide, 4-col grid (16px margin)

PDP responsive: Gallery stacks above info on tablet/mobile. Thumbnails become horizontal scroll. Trust badges wrap to 2×2. Related products: horizontal scroll.
Cart drawer: Full-screen takeover on mobile (no slide-in, full overlay). Bottom-sticky CTA.
Footer: 4→2→1 column collapse.

═══ LAYER NAMING (strict) ═══
Landing: hero/*, features/01–03/*, how-it-works/step-01–03/*, social/*, social/testimonial/01–04/*, faq/*, faq/item/01–08/*, footer-cta/*, footer/*
PDP: pdp/gallery/*, pdp/info/*, pdp/reviews/*, pdp/related/*
Cart: cart/header/*, cart/item/*, cart/summary/*, cart/cta/*
Popup: popup/variant-a/*, popup/variant-b/*, popup/variant-c/*
Design system: ds/color/*, ds/type/*, ds/spacing/*, ds/component/*
Sticky: sticky-bar/*
```

---
---

## Quick Reference: Prompt Complexity

| # | Name | Sections | Frames | Themes | Interactions | Est. Layers |
|---|------|----------|--------|--------|-------------|-------------|
| 1 | Simple | Hero only | 1 | Light | Scroll, hover | ~10 |
| 2 | Moderate | Hero + 3 features | 1 | Light | Scroll reveal, hover lift | ~30 |
| 3 | Detailed | Full landing (5 sections) | 1 | Light | Full micro-interactions | ~120 |
| 4 | Complex | Full + dark + extras | 2 | Light + Dark | All + exit popup + swatches | ~200 |
| 5 | Maximum | Landing + PDP + Cart + Popup + DS | 6 | Light + Dark | Complete interaction design | ~400+ |

---

*Prompts engineered from: `design-system/tokens.json`, `design-system/variables.css`, `design-system/README.md`, `docs/copy-deck-compression-sofa.md`, `docs/10-component-logic.md`.*
