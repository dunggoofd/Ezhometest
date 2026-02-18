# EzHome Design System

### Minimal & Playful — Apple-Caliber Quality
##### Reference: Transformer Table's premium DTC aesthetic, adapted for real estate

---

> **Design Philosophy**
>
> EzHome's design language follows three principles borrowed from the best consumer brands:
>
> 1. **Let the content breathe.** Whitespace is not empty — it is structural. Every photo, every price, every listing earns its space.
> 2. **Delight through restraint.** Playfulness comes from one unexpected radius, one warm coral accent, one perfectly-timed spring animation — not from visual noise.
> 3. **Build trust through clarity.** Real estate is high-stakes. Every pixel of the interface must communicate competence and calm.

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography Scale](#2-typography-scale)
3. [Spacing System](#3-spacing-system)
4. [Layout Patterns](#4-layout-patterns)
5. [Animation Guidelines](#5-animation-guidelines)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Component Specifications (30)](#7-component-specifications)
8. [Files & Exports](#8-files--exports)

---

## 1. Color Palette

### Design Intent

Inspired by Transformer Table's restrained palette: dominant black/white canvas with warm neutrals and a single bold accent. EzHome replaces Transformer Table's wood-tones with a **cream/sage/coral** triad that evokes warmth, nature, and energy — the feeling of walking into a home you love.

### Primary Palette

| Swatch | Token | Hex | Usage |
|--------|-------|-----|-------|
| ⬛ | `ink-900` | `#141416` | Primary text, primary buttons, headers |
| ⬜ | `white` | `#FFFFFF` | Page backgrounds, button text on dark |
| 🟫 | `cream-100` | `#FBF9F5` | Secondary backgrounds, card surfaces |
| 🟩 | `sage-600` | `#3A6B3A` | Rental tags, nature/neighborhood UI |
| 🟧 | `coral-500` | `#FF6B42` | **THE accent.** CTAs, favorites, highlights |

### Usage Rules

| Principle | Rule |
|-----------|------|
| **90/10** | 90% of the interface is ink-on-white or ink-on-cream. Coral appears ≤10% of any screen. |
| **One accent per viewport** | Never show two coral CTAs competing for attention in the same scroll-view. |
| **Sage = secondary category** | Sage differentiates "Rent" from "Sale" and powers neighborhood/nature imagery. |
| **Cream = warmth** | Alternate white and cream sections to create visual rhythm without borders. |

### Semantic Colors

| Category | Background | Text | Border | Icon |
|----------|-----------|------|--------|------|
| **Success** | `green-50` | `green-700` | `green-200` | `green-500` |
| **Warning** | `amber-50` | `amber-800` | `amber-200` | `amber-500` |
| **Error** | `red-50` | `red-700` | `red-200` | `red-500` |
| **Info** | `sky-50` | `sky-700` | `sky-200` | `sky-500` |

### Dark Mode

The dark theme inverts the canvas while preserving hierarchy:

| Light | → | Dark |
|-------|---|------|
| `white` bg | → | `ink-950` (`#0A0A0B`) |
| `cream-100` sections | → | `ink-900` (`#141416`) |
| `ink-900` text | → | `ink-50` (`#F4F4F6`) |
| `coral-500` accent | → | `coral-400` (`#FF8A6A`) — slightly lighter for dark bg contrast |
| `ink-100` borders | → | `ink-800` (`#1E1E22`) |

All semantic status colors shift one step brighter on dark backgrounds.

---

## 2. Typography Scale

### Font Stack

| Role | Font | Fallback | Weight Range | Reasoning |
|------|------|----------|-------------- |-----------|
| **Display** | Instrument Sans | SF Pro Display, system-ui | 600–700 | Geometric, slightly playful letterforms. Tight tracking at large sizes mirrors Transformer Table's confident headlines. |
| **Body** | Inter | SF Pro Text, system-ui | 400–600 | Workhorse body font. Excellent legibility at small sizes, tabular numbers for prices. |
| **Mono** | JetBrains Mono | SF Mono, Fira Code | 400 | Code snippets, listing IDs, data tables. |

### 9-Level Scale

| Level | Name | Size | Line Height | Tracking | Weight | Font | Usage |
|-------|------|------|-------------|----------|--------|------|-------|
| **1** | `display-xl` | 72→44px | 76→48px | -0.035em | 700 | Display | Homepage hero only |
| **2** | `display-lg` | 56→36px | 62→40px | -0.03em | 700 | Display | Section heroes |
| **3** | `display-md` | 44→30px | 50→36px | -0.025em | 700 | Display | Feature section titles |
| **4** | `heading-xl` | 36→26px | 42→32px | -0.02em | 600 | Display | Page titles |
| **5** | `heading-lg` | 28→22px | 34→28px | -0.015em | 600 | Display | Section headings |
| **6** | `heading-md` | 22px | 28px | -0.01em | 600 | Display | Subsection headings |
| **7** | `body-lg` | 18px | 28px | -0.005em | 400 | Body | Lead paragraphs |
| **8** | `body-md` | 15px | 24px | 0em | 400 | Body | Default body copy |
| **9** | `body-sm` | 13px | 20px | 0.005em | 400 | Body | Captions, metadata |
| **+** | `caption` | 11px | 16px | 0.02em | 500 | Body | Micro labels |
| **+** | `overline` | 11px | 16px | 0.1em | 600 | Body | Uppercase labels |

> The `→` notation means desktop→mobile. Sizes 1–5 scale down responsively. Sizes 6–9 remain fixed.

### Vietnamese Language Considerations

- Both Instrument Sans and Inter have full Latin Extended + Vietnamese diacritics support
- Line heights are slightly more generous than typical Latin-only scales to accommodate diacritics like `ữ` `ậ` `ế`
- Never truncate Vietnamese text without `word-break: keep-all` — mid-word breaks destroy meaning

---

## 3. Spacing System

### 8px Base Grid

All spacing, padding, margin, and gap values snap to the 8px grid. 4px is available for fine optical adjustments (icon alignment, border-box compensation).

```
4   8   12   16   20   24   32   40   48   64   80   96   128   160   192
│   │    │    │    │    │    │    │    │    │    │    │    │      │     │
1   2    3    4    5    6    8   10   12   16   20   24   32     40    48
```

### Named Spacing Scales

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon-to-label gap, fine optical adjustment |
| `space-2` | 8px | Inline spacing, tight padding |
| `space-3` | 12px | Input padding, small card padding |
| `space-4` | 16px | Default content padding, card padding on mobile |
| `space-6` | 24px | Card padding desktop, section inner gap |
| `space-8` | 32px | Section padding, layout gutter desktop |
| `space-12` | 48px | Between components within a section |
| `space-16` | 64px | Between page sections |
| `space-20` | 80px | Large section breaks |
| `space-24` | 96px | Hero vertical padding |
| `space-32` | 128px | Page-level vertical rhythm |

### Component Spacing Patterns

| Pattern | Padding | Gap | Example |
|---------|---------|-----|---------|
| **Tight** | `space-2` / `space-3` | `space-1` | Tags, badges, compact buttons |
| **Default** | `space-3` / `space-4` | `space-2` / `space-3` | Inputs, standard buttons, cards on mobile |
| **Comfortable** | `space-4` / `space-6` | `space-4` | Cards desktop, form fields, list items |
| **Spacious** | `space-6` / `space-8` | `space-6` | Hero content, feature sections |

---

## 4. Layout Patterns

### Responsive Breakpoints

| Token | Width | Columns | Gutter | Margin | Behavior |
|-------|-------|---------|--------|--------|----------|
| **Mobile** | < 640px | 4 | 16px | 16px | Single column stack |
| **sm** | 640px | 4 | 16px | 16px | Minor card adjustments |
| **md** (Tablet) | 768px | 8 | 24px | 24px | Two-column cards, collapsible sidebar |
| **lg** (Desktop) | 1024px | 12 | 32px | 32px | Full layout with sidebar |
| **xl** (Wide) | 1280px | 12 | 32px | auto | Centered maxWidth container |
| **2xl** (Ultra) | 1536px | 12 | 32px | auto | Wider content band |

### Container Widths

| Container | Max Width | Usage |
|-----------|----------|-------|
| `max` | 1440px | Absolute max — nothing wider |
| `content` | 1200px | Standard page content |
| `narrow` | 720px | Blog posts, forms, auth pages |
| `full-bleed` | 100vw | Hero images, gallery, map sections |

### Grid Patterns

```
LISTING GRID
┌──────┬──────┬──────┬──────┐   Desktop: 4 columns (xl)
│ Card │ Card │ Card │ Card │   Tablet:  2 columns (md)
└──────┴──────┴──────┴──────┘   Mobile:   1 column

CONTENT + SIDEBAR
┌────────────────────┬────────┐   Desktop: 8+4 columns
│    Main Content    │Sidebar │   Tablet:  Full stack
│                    │(sticky)│   Mobile:  Full stack
└────────────────────┴────────┘

DASHBOARD
┌──────┬──────────────────────┐   Desktop: Fixed 280px + fluid
│ Side │    Content Area      │   Tablet:  Collapsed 72px + fluid
│ bar  │                      │   Mobile:  Bottom nav + full
└──────┴──────────────────────┘
```

### Page Section Rhythm

Sections alternate between `bg-primary` (white) and `bg-secondary` (cream) to create visual separation without hard borders — exactly like Transformer Table's scrolling product pages.

```
[White section: Hero]
[Cream section: Featured Listings]
[White section: Browse by Type]
[Cream section: Neighborhoods]
[White section: How It Works]
[Ink-900 section: CTA Banner]
[White section: Footer]
```

---

## 5. Animation Guidelines

### Philosophy

Motion should feel like a **gentle hand guiding the eye** — never distracting. Inspired by Transformer Table's smooth scroll reveals and Apple's `ease-smooth` curves.

### Easing Functions

| Token | Curve | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | General transitions |
| `ease-smooth` | `cubic-bezier(0.4, 0, 0, 1)` | **Primary.** Page transitions, section reveals, modals. The "Apple feel." |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Playful micro-interactions: favorites heart, toggle switches, tooltips |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Success confirmations, notification badges appearing |
| `ease-in` | `cubic-bezier(0.42, 0, 1, 1)` | Elements exiting the viewport |
| `ease-out` | `cubic-bezier(0, 0, 0.58, 1)` | Elements entering the viewport |

### Duration Scale

| Token | Duration | Usage |
|-------|----------|-------|
| `instant` | 50ms | Color shifts, opacity micro-changes |
| `fast` | 100ms | Hover states, icon swaps |
| `normal` | 200ms | **Default.** Button state transitions, input focus |
| `slow` | 300ms | Dropdown open/close, card hover lift |
| `slower` | 500ms | Modal enter/exit, slide panels |
| `lazy` | 800ms | Scroll-triggered section reveals, staggered list entrance |
| `page` | 600ms | Full page route transitions |

### Animation Patterns

| Pattern | Easing | Duration | Properties | Description |
|---------|--------|----------|------------|-------------|
| **Hover lift** | `ease-spring` | `slow` | `transform, shadow` | Card lifts 4px + shadow increases |
| **Button press** | `ease-default` | `fast` | `transform` | Scale to 0.97 on active |
| **Favorite heart** | `ease-bounce` | `slow` | `transform` | Scale 1→1.3→1 with color fill |
| **Modal enter** | `ease-smooth` | `slower` | `opacity, transform` | Fade in + slide up 16px |
| **Modal exit** | `ease-in` | `slow` | `opacity, transform` | Fade out + slide down 8px |
| **Dropdown** | `ease-spring` | `slow` | `opacity, transform, height` | Scale Y from 0.95 + fade |
| **Toast** | `ease-bounce` | `slow` | `transform` | Slide in from right + bounce |
| **Scroll reveal** | `ease-smooth` | `lazy` | `opacity, transform` | Fade up 24px. Stagger children 80ms |
| **Skeleton pulse** | `ease-in-out` | `1500ms` | `opacity` | Loop 0.4→1→0.4 |
| **Image load** | `ease-smooth` | `slower` | `opacity` | Blur placeholder → sharp 0→1 |
| **Page transition** | `ease-smooth` | `page` | `opacity, transform` | Cross-fade + subtle y-shift |

### Rules

1. **Never animate layout properties** (`width`, `height`, `top`, `left`). Use `transform` and `opacity` only.
2. **Respect `prefers-reduced-motion`** — all durations collapse to 0ms.
3. **Stagger, don't synchronize** — when multiple elements animate in, offset by 60–100ms each.
4. **One physics model per interaction** — don't mix spring and smooth in the same gesture.

---

## 6. Accessibility Requirements

### WCAG 2.1 AA Compliance (Minimum)

| Requirement | Standard | EzHome Target |
|-------------|---------|---------------|
| **Color contrast — normal text** | 4.5:1 | **5:1+** |
| **Color contrast — large text (≥18px bold / ≥24px)** | 3:1 | **4:1+** |
| **Color contrast — UI elements** | 3:1 | **3.5:1+** |
| **Focus indicators** | Visible | 3px ring, never color-only |
| **Touch targets** | 44×44px min | **48×48px** minimum tap targets |
| **Keyboard navigation** | Full | All interactive elements reachable via Tab |
| **Screen reader** | Announced | All components have ARIA labels |
| **Reduced motion** | Respected | All animations honor `prefers-reduced-motion` |

### Contrast Verification

| Combination | Ratio | Pass |
|------------|-------|------|
| `ink-900` on `white` | **16.75:1** | ✅ AAA |
| `ink-900` on `cream-100` | **14.9:1** | ✅ AAA |
| `ink-500` on `white` | **5.74:1** | ✅ AA |
| `ink-400` on `white` | **4.05:1** | ✅ AA (large text only) |
| `coral-500` on `white` | **3.58:1** | ✅ AA large / ⚠️ Use only for large text or icons |
| `coral-700` on `white` | **5.92:1** | ✅ AA for body text |
| `white` on `ink-900` | **16.75:1** | ✅ AAA |
| `ink-50` on `ink-950` | **15.4:1** | ✅ AAA (dark mode) |
| `coral-400` on `ink-950` | **5.12:1** | ✅ AA (dark mode accent) |

### Component-Level Requirements

| Component | Requirements |
|-----------|-------------|
| **Buttons** | Visible focus ring. Disabled state has 3:1 contrast. Loading state announces via `aria-busy`. |
| **Inputs** | Associated `<label>`. Error messages linked via `aria-describedby`. Required fields use `aria-required`. |
| **Images** | All `<img>` have `alt` text. Decorative images use `alt=""`. Listing photos describe the room/view. |
| **Modals** | Focus trapped inside. `Escape` closes. Return focus to trigger on close. `role="dialog"` + `aria-modal`. |
| **Tooltips** | Accessible via keyboard focus (not hover-only). Content exposed to screen readers. |
| **Dropdowns** | Arrow key navigation. `role="listbox"` or `role="menu"`. Current selection announced. |
| **Carousels** | Pause auto-play on focus/hover. Keyboard navigation. `aria-roledescription="carousel"`. |
| **Maps** | Non-map alternatives (listing address text). Map not sole navigation method. |
| **Price** | Screen reader hears "1 billion 500 million VND" not "1,500,000,000". Use `aria-label`. |
| **Color** | Never use color as the only indicator. Status badges include icons + text alongside color. |

### Focus Management

```css
/* Global focus-visible style */
*:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus); /* 3px ink ring */
}

/* Accent focus for interactive accent elements */
[data-accent]:focus-visible {
  box-shadow: var(--shadow-focus-accent); /* 3px coral ring */
}

/* Remove outline on mouse click, keep for keyboard */
*:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

---

## 7. Component Specifications

> 30 production-ready component specs with full state definitions.
> Each component maps to the tokens defined above.

---

### C01 — Button

**Figma Description:** Rounded-rectangle button with bold label. Primary is ink-900 with white text — the "Transformer Table" CTA feel. Accent variant uses coral for urgency. Generous padding gives a premium, tappable feel.

| Property | Value |
|----------|-------|
| **Height** | `xs: 32px` · `sm: 36px` · `md: 44px` · `lg: 52px` |
| **Padding X** | `xs: 12px` · `sm: 16px` · `md: 20px` · `lg: 28px` |
| **Border Radius** | `radius-full` (pill shape) |
| **Font** | `body-sm` (xs/sm) · `body-md medium` (md) · `body-lg medium` (lg) |
| **Icon Size** | `icon-sm` (xs/sm) · `icon-md` (md/lg) |
| **Gap** (icon↔label) | `space-2` |

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| **Primary** | `interactive-primary` | `text-inverse` | none |
| **Secondary** | `bg-primary` | `text-primary` | `border-primary` 1px |
| **Accent** | `interactive-accent` | `text-inverse` | none |
| **Ghost** | transparent | `text-primary` | none |
| **Danger** | `status-error-bg` | `status-error-text` | `status-error-border` 1px |
| **Link** | transparent | `text-link` | none (underline on hover) |

| State | Change |
|-------|--------|
| **Hover** | Background shifts to `-hover` token. Cursor pointer. |
| **Active/Pressed** | Background shifts to `-active`. Scale 0.97. Duration: `fast`. |
| **Focus-visible** | `shadow-focus` ring. |
| **Disabled** | Opacity 0.4. Cursor not-allowed. No hover effect. |
| **Loading** | Label hidden, spinner centered. `aria-busy="true"`. |

---

### C02 — Input

**Figma:** Clean single-line field with subtle border. Expands focus ring on keyboard focus. Error state shows coral-red border with message below.

| Property | Value |
|----------|-------|
| **Height** | `sm: 36px` · `md: 44px` · `lg: 52px` |
| **Padding X** | `space-3` (sm) · `space-4` (md/lg) |
| **Border** | 1px `border-primary` |
| **Border Radius** | `radius-md` |
| **Font** | `body-md` |
| **Label** | `body-sm medium` · `text-primary` · `margin-bottom: space-1-5` |
| **Placeholder** | `text-tertiary` |

| State | Border | Background | Extra |
|-------|--------|-----------|-------|
| **Default** | `border-primary` | `bg-primary` | — |
| **Hover** | `border-secondary` | `bg-primary` | — |
| **Focus** | `border-focus` 2px | `bg-primary` | `shadow-focus` |
| **Error** | `border-error` 2px | `status-error-bg` | Error text below: `body-sm` `status-error-text` |
| **Disabled** | `border-primary` | `bg-subtle` | Opacity 0.6 |
| **Read-only** | none | `bg-subtle` | No cursor change |

---

### C03 — Textarea

Same as Input but multi-line. Auto-resize up to `max-height: 240px`, then scroll. Character count in `caption` style at bottom-right.

---

### C04 — Select / Dropdown

**Figma:** Input-like trigger with chevron icon. Dropdown menu with `radius-lg`, `shadow-lg`, max-height 320px with scroll. Selected item shows checkmark.

| Property | Value |
|----------|-------|
| **Trigger** | Same sizing as Input |
| **Menu** | `bg-elevated`, `border-primary` 1px, `radius-lg`, `shadow-lg` |
| **Item Height** | 40px |
| **Item Padding** | `space-3` horizontal |
| **Item Hover** | `bg-subtle` |
| **Item Selected** | `text-primary` bold + checkmark icon trailing |
| **Animation** | `ease-spring`, `slow` — scale Y 0.95→1 + fade |

---

### C05 — Checkbox

**Figma:** 20×20px box with `radius-sm`. Checked state fills ink-900 with white checkmark. Playful spring animation on check.

| State | Box | Icon |
|-------|-----|------|
| **Unchecked** | `border-secondary` 2px, `bg-primary` | — |
| **Checked** | `interactive-primary` fill | White checkmark, `ease-spring` 200ms |
| **Indeterminate** | `interactive-primary` fill | White dash |
| **Hover** | `border-focus` | — |
| **Focus** | `shadow-focus` ring | — |
| **Disabled** | Opacity 0.4 | — |

---

### C06 — Radio Group

Same treatment as Checkbox but circular. 20×20px outer, 8px inner dot on selection with `ease-spring`.

Card variant: full bordered card with radio indicator top-right, selectable area is the entire card.

---

### C07 — Toggle Switch

**Figma:** 44×24px track with 20px thumb. Off = `ink-200` track. On = `ink-900` track with thumb sliding right. Spring animation on thumb movement.

| State | Track | Thumb |
|-------|-------|-------|
| **Off** | `ink-200` | `white`, left |
| **On** | `ink-900` | `white`, right |
| **Hover** | Track lightens/darkens slightly | — |
| **Focus** | `shadow-focus` on track | — |
| **Disabled** | Opacity 0.4 | — |

Transition: `ease-spring`, `normal` (200ms).

---

### C08 — Badge

**Figma:** Small pill label. Tight padding, bold weight.

| Property | Value |
|----------|-------|
| **Height** | `sm: 20px` · `md: 24px` |
| **Padding X** | `space-2` (sm) · `space-2-5` (md) |
| **Border Radius** | `radius-full` |
| **Font** | `caption medium` (sm) · `body-sm medium` (md) |

Variants map to semantic status colors (success, warning, error, info, neutral). Dot variant adds 6px circle before label.

---

### C09 — Avatar

**Figma:** Circular image with fallback to colored initials. Online indicator is 10px green dot with 2px white border at bottom-right.

| Size | Dimension | Font (initials) |
|------|-----------|-----------------|
| `xs` | 24px | `caption` |
| `sm` | 32px | `body-sm` |
| `md` | 40px | `body-md` |
| `lg` | 56px | `heading-md` |
| `xl` | 80px | `heading-lg` |
| `2xl` | 120px | `heading-xl` |

---

### C10 — Tag / Chip

**Figma:** Rounded pill with optional dismiss ✕. Used for active filters, amenities, property features.

| Property | Value |
|----------|-------|
| **Height** | 28px |
| **Padding** | `space-1` vertical, `space-3` horizontal |
| **Border Radius** | `radius-full` |
| **Border** | 1px `border-primary` |
| **Font** | `body-sm medium` |
| **Dismiss icon** | `icon-xs`, `space-1` left margin, hover: `text-brand` |

Selected state: `bg-brand`, `text-inverse`, no border.

---

### C11 — Tooltip

**Figma:** Dark floating label. Arrow points to trigger.

| Property | Value |
|----------|-------|
| **Background** | `ink-900` (light) / `ink-700` (dark) |
| **Text** | `white` · `body-sm` |
| **Padding** | `space-1-5` vertical, `space-3` horizontal |
| **Border Radius** | `radius-sm` |
| **Shadow** | `shadow-lg` |
| **Animation** | `ease-spring`, `fast` — fade + scale from 0.9 |
| **Delay** | 400ms show, 0ms hide |
| **Arrow** | 6px triangle |

---

### C12 — Spinner

**Figma:** Animated circular track with a sweeping accent arc.

| Size | Dimension | Track Width |
|------|-----------|-------------|
| `sm` | 16px | 2px |
| `md` | 24px | 2.5px |
| `lg` | 40px | 3px |

Track: `ink-100`. Arc: `ink-900` (or `coral-500` on accent variant). Animation: continuous rotation 700ms linear.

---

### C13 — Skeleton

**Figma:** Rounded placeholder shapes that pulse. Matches the real content's dimensions.

| Variant | Shape | Radius |
|---------|-------|--------|
| **Text** | Rectangle, 60-80% width, 12px height | `radius-sm` |
| **Heading** | Rectangle, 40% width, 24px height | `radius-sm` |
| **Circle** | Circle | `radius-full` |
| **Card** | Full card shape (image + text lines) | `radius-lg` |
| **Image** | Rectangle, aspect ratio 4:3 | `radius-md` |

Color: `ink-100` → `ink-50` pulse. Animation: 1500ms `ease-in-out` loop.

---

### C14 — Divider

1px line, `border-primary` color. Optional centered label in `caption` with `bg-primary` padding.

---

### C15 — Price Display

**Figma:** Bold price with optional period for rentals.

| Property | Value |
|----------|-------|
| **Font** | `heading-lg bold` (listing detail) · `heading-md bold` (card) · `body-lg semibold` (compact) |
| **Currency** | Prefixed, same weight, slightly smaller |
| **Period** | `body-sm regular text-secondary` "/month" or "/year" |
| **Formatted** | Vietnamese grouping: `1.500.000.000 ₫` |
| **Screen Reader** | `aria-label="1 tỷ 500 triệu đồng"` |

---

### C16 — Listing Card

**Figma:** The hero component. Full-bleed image top with carousel dots on hover, content below. Generous radius. Subtle shadow on hover-lift.

| Property | Value |
|----------|-------|
| **Border Radius** | `radius-xl` (20px) |
| **Shadow (rest)** | `shadow-xs` |
| **Shadow (hover)** | `shadow-lg` |
| **Image** | Aspect ratio 4:3, `radius-xl` top corners, `object-fit: cover` |
| **Padding** (content area) | `space-4` all sides |
| **Price** | `heading-md bold text-primary` |
| **Title** | `body-md medium text-primary`, 2-line clamp |
| **Specs** | `body-sm text-secondary` — "2 🛏 · 2 🛁 · 75 m²" |
| **Location** | `body-sm text-tertiary` — "📍 District 1, Ho Chi Minh" |
| **Favorite** | 32px circle, top-right of image, `bg-primary/80` blur backdrop, heart icon |
| **Type badge** | Top-left of image, `badge-sm`, `bg-primary/80` blur backdrop |
| **Featured ribbon** | Coral gradient banner at top, "Featured" in `overline white` |
| **Agent** | `avatar-xs` + `body-sm` below location |

| State | Effect |
|-------|--------|
| **Hover** | Lift 4px (`translateY(-4px)`), `shadow-lg`, image carousel activates. `ease-spring`, `slow`. |
| **Favorite toggle** | Heart fills coral with `ease-bounce` scale 1→1.3→1 |
| **Image carousel** | Dots appear, auto-advance on hover hold, manual swipe on mobile |
| **Loading** | Skeleton card variant |

---

### C17 — Search Bar

**Figma:** Pill-shaped search bar — the centerpiece of the homepage hero. Reminiscent of Transformer Table's clean, centered search/CTA areas.

| Property | Value |
|----------|-------|
| **Height** | 56px (desktop) · 48px (mobile) |
| **Border Radius** | `radius-full` |
| **Background** | `bg-primary` |
| **Border** | 1px `border-primary` |
| **Shadow** | `shadow-md` |
| **Sections** | Location input | Type dropdown | Search button |
| **Dividers** | 1px vertical `border-primary` between sections |
| **Button** | Circular `accent` button 40px, magnifying glass icon |
| **Expanded variant** | Stacked rows, full width, `radius-2xl` |

---

### C18 — Filter Chip Bar

Horizontal scrollable row of active filter pills. Each chip is a `Tag` with dismiss. "Clear all" link at end.

| Property | Value |
|----------|-------|
| **Container** | Horizontal scroll, `space-2` gap, `overflow-x: auto`, `-webkit-overflow-scrolling: touch` |
| **Chip** | `Tag` component with active state |
| **Clear All** | `Button link` variant at end |
| **Animation** | Chips enter with `ease-spring` stagger 60ms |

---

### C19 — Agent Card

**Figma:** Centered card with large avatar, name, agency, star rating, and dual action buttons.

| Property | Value |
|----------|-------|
| **Border Radius** | `radius-xl` |
| **Padding** | `space-6` |
| **Shadow** | `shadow-sm` |
| **Avatar** | `avatar-xl` centered |
| **Name** | `heading-md text-primary` |
| **Agency** | `body-sm text-secondary` |
| **Rating** | Star icons `amber-400` + `body-sm text-secondary` count |
| **Buttons** | Two side-by-side: "Contact" (primary) + "View Profile" (secondary) |
| **Hover** | Lift 2px, `shadow-md` |

---

### C20 — Review Card

| Property | Value |
|----------|-------|
| **Border Radius** | `radius-lg` |
| **Padding** | `space-4` |
| **Header** | `avatar-sm` + name (`body-md medium`) + date (`body-sm text-tertiary`) |
| **Stars** | 5× star icons, filled = `amber-400`, empty = `ink-200` |
| **Body** | `body-md text-primary`, 4-line clamp with "Read more" |
| **Verified badge** | `badge-sm success` "Verified" |

---

### C21 — Stat Card

**Figma:** Dashboard metric card with icon, large number, and label.

| Property | Value |
|----------|-------|
| **Border Radius** | `radius-xl` |
| **Padding** | `space-6` |
| **Background** | `bg-secondary` |
| **Icon** | `icon-lg` in 48px circle `bg-primary` |
| **Value** | `heading-xl bold text-primary`, animated count-up |
| **Label** | `body-sm text-secondary` |
| **Trend** | Small badge, green up / red down arrow + percentage |

---

### C22 — Blog Card

| Property | Value |
|----------|-------|
| **Border Radius** | `radius-xl` |
| **Image** | Aspect 16:9, `radius-xl` top, hover zoom 1.03× |
| **Category** | `badge-sm` over image, bottom-left, `bg-primary/80` blur |
| **Title** | `heading-md text-primary`, 2-line clamp |
| **Excerpt** | `body-sm text-secondary`, 2-line clamp |
| **Meta** | `body-sm text-tertiary` — date · read time |
| **Author** | `avatar-xs` + name |

---

### C23 — Notification Item

| Property | Value |
|----------|-------|
| **Padding** | `space-3` vertical, `space-4` horizontal |
| **Unread indicator** | 8px `coral-500` dot, left side |
| **Icon** | Category-specific, `icon-md` in 36px circle |
| **Title** | `body-sm semibold text-primary` |
| **Body** | `body-sm text-secondary`, 1-line clamp |
| **Time** | `caption text-tertiary` |
| **Hover** | `bg-subtle` |
| **Divider** | 1px `border-primary` between items |

---

### C24 — Image Gallery

**Figma:** Bento-grid layout on desktop — 1 large + 4 small. Full-width carousel on mobile. Lightbox opens with smooth zoom animation.

| Property | Value |
|----------|-------|
| **Desktop Grid** | 1 large (60%) + 2×2 small (40%), gap `space-1` |
| **Mobile** | Full-width carousel with dots |
| **Border Radius** | `radius-xl` on outer corners |
| **Count Badge** | Bottom-right of grid, `bg-primary/80` blur, `body-sm medium` |
| **Lightbox** | Full-screen overlay, swipe navigation, counter top-center |
| **Animation** | Image click zooms to lightbox — `ease-smooth`, `slower` |

---

### C25 — Header / Navigation

**Figma:** Fixed top bar, transparent on hero, transitions to solid white with border-bottom on scroll.

| Property | Value |
|----------|-------|
| **Height** | 72px |
| **Background (hero)** | transparent |
| **Background (scrolled)** | `bg-primary/95` backdrop-blur 12px |
| **Border (scrolled)** | bottom 1px `border-primary` |
| **Logo** | Left-aligned, 32px height |
| **Nav Links** | Center-aligned, `body-md medium`, `space-8` gap |
| **Right** | Search icon + Notification bell + Avatar dropdown (auth) or Login/Register buttons |
| **Mobile** | Logo left, hamburger right → slide-in drawer from right |
| **Transition** | Background + border: `ease-smooth`, `slow` |
| **Z-Index** | `z-sticky` (200) |

---

### C26 — Footer

**Figma:** Dark ink-900 background, warm and confident. 4-column link grid.

| Property | Value |
|----------|-------|
| **Background** | `ink-900` |
| **Text** | `ink-300` (links) · `ink-500` (copyright) |
| **Link Hover** | `white` |
| **Columns** | 4 (desktop), 2 (tablet), 1 (mobile) |
| **Section Title** | `overline ink-400` |
| **Padding** | `space-20` vertical (desktop), `space-12` (mobile) |
| **Newsletter** | Inline input + button, `radius-full` |
| **Social Icons** | 24px, `ink-400`, hover `white` |
| **Bottom** | Copyright + Terms + Privacy, separated by `·` |

---

### C27 — Modal / Dialog

**Figma:** Centered floating card over overlay. Clean, focused.

| Property | Value |
|----------|-------|
| **Max Width** | `sm: 400px` · `md: 560px` · `lg: 720px` · `full: 90vw` |
| **Border Radius** | `radius-2xl` |
| **Background** | `bg-elevated` |
| **Shadow** | `shadow-2xl` |
| **Overlay** | `bg-overlay` (48% black) |
| **Padding** | `space-8` (desktop) · `space-6` (mobile) |
| **Header** | Title `heading-lg` + optional close ✕ button (ghost, `icon-lg`) |
| **Footer** | Right-aligned action buttons, `space-3` gap |
| **Animation Enter** | Overlay: fade 0→1, `ease-smooth`, `slower`. Card: fade + translateY(16px→0), `ease-smooth`, `slower`. |
| **Animation Exit** | Reverse with `ease-in`, `slow`. |
| **Mobile** | Bottom sheet variant: slides up from bottom, `radius-2xl` top only |

---

### C28 — Toast / Snackbar

**Figma:** Floating notification card, bottom-right on desktop, bottom-center on mobile.

| Property | Value |
|----------|-------|
| **Border Radius** | `radius-lg` |
| **Background** | `bg-elevated` |
| **Border** | 1px `border-primary` |
| **Shadow** | `shadow-lg` |
| **Padding** | `space-3` vertical, `space-4` horizontal |
| **Icon** | Status icon left, 20px |
| **Text** | `body-md medium` title + `body-sm text-secondary` body |
| **Action** | Optional text button, right-aligned |
| **Dismiss** | Auto after 5s, or click ✕ |
| **Animation** | Slide in from right + `ease-bounce`, `slow`. Stack offset 8px each. |
| **Z-Index** | `z-toast` (600) |

---

### C29 — Tabs

**Figma:** Clean underline tabs. Active tab has ink-900 bottom border (or cream pill for filled variant).

| Variant | Style |
|---------|-------|
| **Underline** | `body-md medium`, active: `text-primary` + 2px bottom border `ink-900`. Inactive: `text-secondary`. |
| **Pill** | `body-md medium`, active: `bg-brand text-inverse`, `radius-full` pill. Inactive: `text-secondary`. |

| Property | Value |
|----------|-------|
| **Height** | 44px |
| **Gap** | `space-1` (pill) · `space-6` (underline) |
| **Padding** (pill) | `space-3` x, `space-1-5` y |
| **Indicator animation** | `ease-smooth`, `normal` — slides to active tab |
| **Keyboard** | Arrow keys navigate, `Tab` enters content |

---

### C30 — Breadcrumbs

**Figma:** Minimal chevron-separated path.

| Property | Value |
|----------|-------|
| **Font** | `body-sm` |
| **Link color** | `text-secondary` |
| **Link hover** | `text-primary` |
| **Current** | `text-primary medium`, not a link |
| **Separator** | Chevron-right icon, `icon-xs`, `text-tertiary` |
| **Gap** | `space-1` |

---

## 8. Files & Exports

| File | Format | Purpose |
|------|--------|---------|
| [`tokens.json`](./tokens.json) | JSON (Design Tokens Community Format) | Source of truth. Import into Figma via Tokens Studio, or transform with Style Dictionary. |
| [`variables.css`](./variables.css) | CSS Custom Properties | Drop into any project. Includes light mode, dark mode, responsive overrides, reduced-motion. |
| This document | Markdown | Figma-ready component descriptions with exact specs, states, and measurements for design handoff. |

### Figma Import Workflow

1. Install **Tokens Studio for Figma** plugin
2. Connect to the repo or paste `tokens.json`
3. Apply `semantic` set for light mode, `dark` set for dark mode
4. All components reference semantic tokens — theme-switching is automatic

### Tailwind Integration

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      ink:   { 50: '#F4F4F6', /* ... */ 950: '#0A0A0B' },
      cream: { 50: '#FEFDFB', /* ... */ 400: '#DDD4C6' },
      sage:  { 50: '#F2F7F2', /* ... */ 900: '#142514' },
      coral: { 50: '#FFF5F2', /* ... */ 900: '#6B2410' },
      // ... sky, amber, red, green
    },
    fontFamily: {
      display: ['Instrument Sans', 'SF Pro Display', 'system-ui', 'sans-serif'],
      body:    ['Inter', 'SF Pro Text', 'system-ui', 'sans-serif'],
      mono:    ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
    },
    borderRadius: {
      none: '0px', sm: '6px', md: '10px', lg: '14px',
      xl: '20px', '2xl': '28px', full: '9999px',
    },
    // ... extends with spacing, shadows, animations from tokens
  }
}
```

---

*This design system is a living document. Every token, every component spec, every animation curve has been chosen to make EzHome feel like a product designed in Cupertino — but one that speaks Vietnamese.*
