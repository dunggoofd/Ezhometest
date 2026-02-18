# EzHome — Hero Section Motion Design Spec

### Apple-Grade Interaction Design · Compression Sofa Landing Page
##### Role: Motion Designer · Apple Devices Motion Team (methodology)
##### Target surface: Desktop (1280px+), Tablet (768px), Mobile (390px)
##### Engine: CSS `transform` + `opacity` only · GPU-composited · `prefers-reduced-motion` aware

---

> **Motion Philosophy**
>
> Every animation in this hero exists for one reason: to guide the eye toward "Shop the Collection." Motion is invisible when it works — the user simply *feels* premium. We borrow Apple's discipline: smooth curves, deliberate stagger, and silence between movements. The hero loads like a curtain rising on a stage — background first, then the headline drops in with weight, and finally the supporting cast (subheadline, CTAs, proof pill) arrives in orchestrated sequence. Nothing moves that doesn't earn its motion.

---

## Table of Contents

1. [Page Load Sequence](#1-page-load-sequence)
2. [Scroll Behaviors](#2-scroll-behaviors)
3. [Hover States](#3-hover-states)
4. [Click & Tap Transitions](#4-click--tap-transitions)
5. [Gesture Support](#5-gesture-support)
6. [Easing & Duration Reference](#6-easing--duration-reference)
7. [Performance Engineering](#7-performance-engineering)
8. [Reduced Motion Fallback](#8-reduced-motion-fallback)
9. [Figma Make Description (Copy-Paste)](#9-figma-make-description)
10. [Implementation Notes (Framer Motion)](#10-implementation-notes)

---

---

## 1. Page Load Sequence

The hero orchestrates a **7-beat entrance** over 1,800ms total. Every element uses only `opacity` and `transform` (translateY / scale) — nothing triggers layout recalc.

### Timeline

```
TIME (ms)     ELEMENT                    ANIMATION
─────────     ───────                    ─────────
   0          Urgency banner             opacity: 0→1
   0          Hero background image      opacity: 0→1, scale: 1.02→1.0
 200          ░░░░ gap ░░░░░░░░░░░░░░░░░
 300          Headline (H1)              opacity: 0→1, translateY: 30px→0
 500          Subheadline (H2)           opacity: 0→1, translateY: 24px→0
 700          Primary CTA button         opacity: 0→1, translateY: 20px→0
 820          Secondary CTA link         opacity: 0→1, translateY: 16px→0
1000          Social proof pill          opacity: 0→1, translateY: 12px→0, scale: 0.96→1.0
1200          All elements settled       ── IDLE STATE ──
```

### Beat-by-Beat Breakdown

#### Beat 0 — Urgency Banner (t = 0ms)

| Property | Value |
|----------|-------|
| **Element** | `hero/urgency-banner` — full-width cream bar |
| **Initial state** | `opacity: 0` |
| **Final state** | `opacity: 1` |
| **Duration** | 400ms |
| **Easing** | `ease-out` · `cubic-bezier(0, 0, 0.58, 1)` |
| **Delay** | 0ms (fires immediately on DOM mount) |
| **GPU hint** | `will-change: opacity` |
| **Rationale** | The banner is structural — it defines the top boundary. It appears instantly-ish so the hero image below it doesn't "jump." No translateY — banners don't fly in, they fade up like theatre lights. |

#### Beat 1 — Hero Background Image (t = 0ms, parallel with banner)

| Property | Value |
|----------|-------|
| **Element** | `hero/background` — full-bleed lifestyle photograph |
| **Initial state** | `opacity: 0`, `scale: 1.02` |
| **Final state** | `opacity: 1`, `scale: 1.0` |
| **Duration** | 1200ms |
| **Easing** | `ease-smooth` · `cubic-bezier(0.4, 0, 0, 1)` |
| **Delay** | 0ms |
| **GPU hint** | `will-change: transform, opacity` |
| **Rationale** | The Ken Burns-in-reverse: image starts *barely* zoomed (2%) and settles to 1.0. This creates a "breathing in" sensation. 1200ms is deliberately slow — Apple's hero images on product pages take ~1s to resolve. The long smooth curve means the last 30% of the animation is almost imperceptible, creating a feeling of the image "landing." |

#### Beat 2 — Headline H1 (t = 300ms)

| Property | Value |
|----------|-------|
| **Element** | `hero/headline` — "Sofa In. Stress Out. Instantly." |
| **Initial state** | `opacity: 0`, `translateY: 30px` |
| **Final state** | `opacity: 1`, `translateY: 0` |
| **Duration** | 800ms |
| **Easing** | `ease-smooth` · `cubic-bezier(0.4, 0, 0, 1)` |
| **Delay** | 300ms after page mount |
| **GPU hint** | `will-change: transform, opacity` |
| **Rationale** | 300ms delay gives the background image enough presence before text arrives. 30px vertical travel is the largest of all text elements — the headline carries the most visual weight, so it "rises" the farthest. Apple's hero headlines on iPhone pages use a similar 20–30px rise. The smooth curve decelerates hard, so the text feels like it's *placed* rather than *thrown*. |

#### Beat 3 — Subheadline H2 (t = 500ms)

| Property | Value |
|----------|-------|
| **Element** | `hero/subheadline` — "A premium sofa that compresses to fit through any door — and looks like it never had to." |
| **Initial state** | `opacity: 0`, `translateY: 24px` |
| **Final state** | `opacity: 1`, `translateY: 0` |
| **Duration** | 700ms |
| **Easing** | `ease-smooth` · `cubic-bezier(0.4, 0, 0, 1)` |
| **Delay** | 500ms |
| **GPU hint** | `will-change: transform, opacity` |
| **Rationale** | 200ms stagger after headline (not 80ms — we want the eye to *read* the headline before this appears). Shorter travel (24px) and slightly shorter duration create a hierarchy of motion: headline is the star, subheadline is supporting. |

#### Beat 4 — Primary CTA Button (t = 700ms)

| Property | Value |
|----------|-------|
| **Element** | `hero/cta-primary` — "Shop the Collection" coral pill button |
| **Initial state** | `opacity: 0`, `translateY: 20px` |
| **Final state** | `opacity: 1`, `translateY: 0` |
| **Duration** | 600ms |
| **Easing** | `ease-smooth` · `cubic-bezier(0.4, 0, 0, 1)` |
| **Delay** | 700ms |
| **GPU hint** | `will-change: transform, opacity` |
| **Rationale** | The CTA arrives after the value proposition is fully visible — the user has read the headline and is mid-subheadline. 200ms stagger from subheadline. Shorter travel and duration: CTAs should feel *precise*, not floaty. Coral (#FF6B42) draws the eye on arrival — motion + color = double attention signal. |

#### Beat 5 — Secondary CTA Link (t = 820ms)

| Property | Value |
|----------|-------|
| **Element** | `hero/cta-secondary` — "See How It Works →" |
| **Initial state** | `opacity: 0`, `translateY: 16px` |
| **Final state** | `opacity: 1`, `translateY: 0` |
| **Duration** | 500ms |
| **Easing** | `ease-smooth` · `cubic-bezier(0.4, 0, 0, 1)` |
| **Delay** | 820ms |
| **GPU hint** | `will-change: transform, opacity` |
| **Rationale** | 120ms stagger after primary CTA (tighter, because it's a subordinate element). Smallest travel (16px). Arrives quietly — it's an escape hatch, not the main event. |

#### Beat 6 — Social Proof Pill (t = 1000ms)

| Property | Value |
|----------|-------|
| **Element** | `hero/microcopy` — "★ 4.9 · 2,400+ Happy Homes" |
| **Initial state** | `opacity: 0`, `translateY: 12px`, `scale: 0.96` |
| **Final state** | `opacity: 1`, `translateY: 0`, `scale: 1.0` |
| **Duration** | 500ms |
| **Easing** | `ease-spring` · `cubic-bezier(0.175, 0.885, 0.32, 1.275)` |
| **Delay** | 1000ms |
| **GPU hint** | `will-change: transform, opacity` |
| **Rationale** | This is the only element that uses `ease-spring` — the slight overshoot (the curve exceeds 1.0) gives the pill a subtle "pop" that says *hey, this is social proof, pay attention.* The scale 0.96→1.0 reinforces the pop. It arrives last because it's the "cherry on top" — trust confirmation after the pitch is delivered. Apple uses this pattern for badge/pill elements on product pages. |

### Stagger Visualisation

```
    0ms   200   400   600   800   1000   1200
    |     |     |     |     |      |      |
 ██ urgency banner (fade) ─────────┤
 █████████████ background (fade + scale) ──────────────┤
         ░░░░████████ headline (rise 30px) ────────┤
              ░░░░░████████ subheadline (rise 24px) ───┤
                    ░░░░████ cta-primary (rise 20px) ──┤
                       ░░░██ cta-secondary (rise 16px) ┤
                            ░░░██● proof pill (pop) ───┤
```

### Load Sequence — Design Rationale (Apple Principles)

1. **Background before content.** The stage is set before the actors arrive. This prevents the flash-of-unstyled-content feeling.
2. **Diminishing travel distance.** Headline (30px) → Sub (24px) → CTA (20px) → Link (16px) → Pill (12px). Each subsequent element moves less, creating a natural deceleration in the composition — like a pendulum coming to rest.
3. **Diminishing duration.** 800ms → 700ms → 600ms → 500ms → 500ms. Same principle: the sequence *winds down.*
4. **One playful outlier.** The proof pill's `ease-spring` breaks the smooth curve pattern once — the single "playful" moment in an otherwise minimal sequence. This is the EzHome brand ("Minimal & Playful") expressed in motion.
5. **Total sequence under 2 seconds.** Users should feel the page is "alive" within 300ms (headline visible) and "complete" by 1200ms. No waiting.

---

---

## 2. Scroll Behaviors

### 2A — Navbar Condensation (Scroll Position: 0px → 100px)

```
On scroll down: Navbar shrinks from 72px to 56px height with ease-smooth
over 300ms. Logo scales from 1.0 to 0.85. Nav links font-size remains
unchanged. Background transitions from transparent (rgba(255,255,255,0))
to solid white (rgba(255,255,255,0.95)) with backdrop-blur(12px).
Shadow fades in: 0 1px 3px rgba(10,10,11,0.06). All transitions on
the GPU — will-change: transform, background-color, box-shadow.

On scroll back to top (position < 20px): Navbar reverses to 72px, logo
to 1.0, background to transparent. Same easing, same duration.
```

| Property | Start (scrollY = 0) | End (scrollY ≥ 100) | Duration | Easing |
|----------|---------------------|---------------------|----------|--------|
| **Height** | 72px | 56px | 300ms | `ease-smooth` `cubic-bezier(0.4, 0, 0, 1)` |
| **Background** | `rgba(255,255,255,0)` | `rgba(255,255,255,0.95)` | 300ms | `ease-smooth` |
| **Backdrop filter** | none | `blur(12px)` | 300ms | `ease-smooth` |
| **Box shadow** | none | `0 1px 3px rgba(10,10,11,0.06)` | 300ms | `ease-smooth` |
| **Logo scale** | 1.0 | 0.85 | 300ms | `ease-smooth` |
| **GPU** | `will-change: transform, background-color, box-shadow` | | | |

> **Implementation note:** Use `IntersectionObserver` on a sentinel element at 100px from top, or `scroll-timeline` for progressive interpolation. Do NOT use `scroll` event listener with `requestAnimationFrame` — too much main-thread overhead.

### 2B — Hero Parallax (Scroll Position: 0px → hero bottom)

```
On scroll: Hero background image translates upward at 40% of scroll
speed (parallax factor 0.4), creating depth. Simultaneously, the image
opacity fades from 1.0 to 0.3 as the user scrolls past the hero fold.
The hero text content group translates upward at 60% of scroll speed
(faster than the image — text "leaves" before the image, like fog
lifting off a lake).

Hero text group also fades: opacity 1.0 → 0.0 mapped to scroll
position 0% → 80% of hero height.
```

| Element | Transform | Opacity Map | Scroll Range | GPU |
|---------|-----------|------------|--------------|-----|
| **Background image** | `translateY(scrollY × -0.4)` | 1.0 → 0.3 over 0–100% hero height | 0px → hero bottom | `will-change: transform, opacity` |
| **Text content group** | `translateY(scrollY × -0.6)` | 1.0 → 0.0 over 0–80% hero height | 0px → hero bottom | `will-change: transform, opacity` |
| **Urgency banner** | Fixed position (no parallax) | Remains 1.0 | — | — |

> **Figma Make description:** "On scroll: the hero background image moves up at 40% of the scroll speed — a subtle parallax. The headline and CTAs move up at 60% of the scroll speed and fade to invisible by the time you've scrolled 80% past the hero. The image also dims to 30% opacity. The urgency banner stays pinned."

### 2C — Hero → Section 1 Reveal Transition

```
As the hero scrolls out of view and the first feature section enters:
the feature section fades up from 24px below at 0 opacity, reaching
full opacity and 0px offset over 800ms with ease-smooth easing.
Children elements (eyebrow, heading, body, stat) stagger in at
80ms intervals.

The transition threshold is 15% visibility of the next section
(IntersectionObserver threshold: 0.15). Once triggered, the animation
plays once and never resets (one-shot).
```

| Property | Value |
|----------|-------|
| **Trigger** | Next section enters viewport at 15% visibility |
| **Section wrapper** | `opacity: 0→1`, `translateY: 24px→0` |
| **Duration** | 800ms |
| **Easing** | `ease-smooth` · `cubic-bezier(0.4, 0, 0, 1)` |
| **Children stagger** | 80ms between eyebrow → heading → body → stat |
| **Replay** | None — one-shot, `animation-fill-mode: forwards` |
| **GPU** | `will-change: transform, opacity` (removed after animation ends) |

### 2D — Sticky Bar Entrance (Scroll Past Hero)

```
On scroll: When the hero section scrolls fully out of viewport, a
sticky bar slides down from above the viewport edge. Height: 64px.
Translation: translateY(-100%) → translateY(0). Duration: 400ms.
Easing: ease-smooth. Background: white with subtle top shadow
(0 -1px 3px rgba(10,10,11,0.06)).

On scroll back into hero: sticky bar slides up and out — translateY(0)
→ translateY(-100%), same duration and easing.
```

| Property | Hidden State | Visible State | Duration | Easing |
|----------|-------------|---------------|----------|--------|
| **Transform** | `translateY(-100%)` | `translateY(0)` | 400ms | `ease-smooth` |
| **Opacity** | 0 | 1 | 300ms | `ease-smooth` |
| **Box shadow** | none | `0 1px 3px rgba(10,10,11,0.06)` | 300ms | `ease-smooth` (50ms delay) |
| **z-index** | `200` (sticky layer) | | | |
| **Trigger** | Hero section `IntersectionObserver` · `isIntersecting: false` | | | |

---

---

## 3. Hover States

### 3A — Primary CTA Button ("Shop the Collection")

```
On hover: Background color transitions from coral-500 (#FF6B42) to
coral-600 (#E85530) over 200ms with ease-default. Cursor changes to
pointer. A subtle inner glow appears (box-shadow inset 0 0 0 1px
rgba(255,255,255,0.15)).

On hover exit: Reverse to coral-500 over 200ms same easing.
```

| State | Background | Shadow | Scale | Duration | Easing |
|-------|-----------|--------|-------|----------|--------|
| **Default** | `#FF6B42` | none | 1.0 | — | — |
| **Hover** | `#E85530` | `inset 0 0 0 1px rgba(255,255,255,0.15)` | 1.0 | 200ms | `ease-default` `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| **Active/Pressed** | `#C4401F` | none | 0.97 | 100ms | `ease-default` |
| **Focus-visible** | `#FF6B42` | `0 0 0 3px rgba(255,107,66,0.24)` | 1.0 | 0ms (instant) | — |
| **GPU** | `will-change: background-color, transform` | | | | |

> **Figma Make description:** "On hover: the coral button darkens one shade smoothly over 200ms. On press: it scales down to 97% for 100ms — a tactile 'click' feel. On keyboard focus: a 3px coral glow ring appears instantly."

### 3B — Secondary CTA Link ("See How It Works →")

```
On hover: The arrow (→) translates 4px to the right over 200ms with
ease-spring — it has a slight overshoot (the spring curve exceeds 1.0),
giving the arrow a playful "peek" to the right. Simultaneously, a
subtle underline fades in (opacity 0→1, 150ms ease-default). Text
color stays ink-900.

On hover exit: Arrow returns to 0px (200ms ease-spring), underline
fades out (150ms).
```

| Property | Default | Hover | Duration | Easing |
|----------|---------|-------|----------|--------|
| **Arrow translateX** | 0px | 4px | 200ms | `ease-spring` `cubic-bezier(0.175, 0.885, 0.32, 1.275)` |
| **Underline opacity** | 0 | 1 | 150ms | `ease-default` |
| **Underline style** | 1px solid ink-200 (#CCCCD2), offset 2px below baseline | | | |
| **Text color** | `#141416` | `#141416` (no change) | — | — |
| **GPU** | `will-change: transform` (on arrow span only) | | | |

> **Figma Make description:** "On hover: the arrow slides 4px right with a playful spring bounce (overshoots slightly then settles). A thin underline fades in beneath the text."

### 3C — Social Proof Pill

```
On hover: The pill lifts 2px (translateY: -2px) and shadow deepens
from xs to sm over 200ms with ease-spring. Background shifts from
transparent to ink-50 (#F4F4F6). A subtle scale to 1.02.

This is a "curiosity hover" — not a CTA, but it signals interactivity
(could link to reviews section).
```

| Property | Default | Hover | Duration | Easing |
|----------|---------|-------|----------|--------|
| **translateY** | 0 | -2px | 200ms | `ease-spring` |
| **scale** | 1.0 | 1.02 | 200ms | `ease-spring` |
| **background** | transparent | `#F4F4F6` (ink-50) | 200ms | `ease-default` |
| **box-shadow** | `0 1px 2px rgba(10,10,11,0.04)` | `0 1px 3px rgba(10,10,11,0.06)` | 200ms | `ease-default` |
| **cursor** | pointer | | | |

### 3D — Urgency Banner Close Button (×)

```
On hover: The × icon rotates 90° clockwise over 200ms ease-spring.
Opacity shifts from 0.5 to 1.0. Scale 1.0 → 1.1.

On click: Banner height animates to 0px over 300ms ease-smooth.
Opacity fades to 0. The hero section below expands upward to fill
the space (margin-top transition 300ms ease-smooth).
```

| State | Rotation | Opacity | Scale | Duration | Easing |
|-------|----------|---------|-------|----------|--------|
| **Default** | 0° | 0.5 | 1.0 | — | — |
| **Hover** | 90° | 1.0 | 1.1 | 200ms | `ease-spring` |
| **Active** | 90° | 1.0 | 0.95 | 100ms | `ease-default` |

---

---

## 4. Click & Tap Transitions

### 4A — Primary CTA Click → Page Navigation

```
On click "Shop the Collection": The button shows a micro-feedback
state — scale to 0.97 over 100ms (ease-default), then the entire hero
section initiates a page exit animation:

1. Hero content group (text + CTAs): fade out + translateY -16px
   over 400ms ease-smooth
2. Hero background: opacity 1 → 0.6, scale 1.0 → 1.01
   over 500ms ease-smooth
3. Next page content begins entering from below (translateY 24px → 0,
   opacity 0 → 1) as the hero exits — 200ms overlap for crossfade

Total transition budget: 600ms (matches the "page" duration token).
```

| Phase | Element | Animation | Duration | Easing | Delay |
|-------|---------|-----------|----------|--------|-------|
| **1 — Click feedback** | CTA button | `scale: 0.97` | 100ms | `ease-default` | 0ms |
| **2 — Content exit** | Hero text group | `opacity: 1→0`, `translateY: 0→-16px` | 400ms | `ease-smooth` | 50ms |
| **3 — BG exit** | Hero background | `opacity: 1→0.6`, `scale: 1→1.01` | 500ms | `ease-smooth` | 100ms |
| **4 — Next page enter** | Incoming page | `opacity: 0→1`, `translateY: 24px→0` | 600ms | `ease-smooth` | 300ms (overlap) |

> **Implementation:** Use Next.js `<Link>` with Framer Motion `AnimatePresence` and `layoutId` for shared elements. The coral CTA color can persist across the transition as a `layoutId` anchor.

### 4B — Secondary CTA Click → Smooth Scroll to "How It Works"

```
On click "See How It Works →": Smooth scroll to the target section.
Duration: 800ms. Easing: ease-smooth. The page scrolls like it's being
pulled by gravity — fast start, gentle landing.

During scroll: the navbar condensation animation (2A) fires naturally
as scroll position passes the 100px threshold.

On arrival: the target section's scroll-reveal animation triggers
(if not already played).
```

| Property | Value |
|----------|-------|
| **Scroll behavior** | `scroll-behavior: smooth` or `window.scrollTo({ behavior: 'smooth' })` |
| **Duration** | ~800ms (browser-native smooth scroll) |
| **Custom override** | Framer Motion `useScroll` + `animate` with `ease-smooth` curve for precise control |
| **Focus** | After scroll, focus moves to the target section heading (accessibility) |

### 4C — Social Proof Pill Click → Scroll to Reviews

```
On click: identical to 4B — smooth scroll to the Social Proof /
Reviews section. The pill briefly flashes: scale 0.95→1.0 over 200ms
ease-spring (a "pulse" confirming the tap), then scroll begins.
```

### 4D — Urgency Banner Dismiss

```
On click ×: Banner collapses — height animates from 40px to 0px over
300ms ease-smooth. Overflow hidden. Opacity fades to 0 over the first
200ms. The hero section below slides up to fill the gap: margin-top
transition 300ms ease-smooth (synced with banner collapse). A cookie
is set to prevent re-showing for 24 hours.
```

| Phase | Property | From | To | Duration | Easing |
|-------|----------|------|----|----------|--------|
| **Banner fade** | `opacity` | 1 | 0 | 200ms | `ease-smooth` |
| **Banner collapse** | `max-height` | 40px | 0px | 300ms | `ease-smooth` |
| **Content shift** | `margin-top` on hero | 40px | 0px | 300ms | `ease-smooth` |

> **Note:** Animating `max-height` is a layout property. Exception granted here because the banner is removed from flow after animation. Use `requestAnimationFrame` to batch, and remove `will-change` immediately after.

---

---

## 5. Gesture Support

### 5A — Mobile: Swipe Down to Dismiss Urgency Banner

```
On swipe down (threshold: 30px, velocity: 300px/s): Urgency banner
slides up and out — translateY: 0 → -100% over 250ms ease-smooth.
Spring-back if swipe doesn't reach threshold.
```

| Property | Value |
|----------|-------|
| **Gesture** | `panDown` on urgency banner element |
| **Threshold** | 30px travel OR 300px/s velocity |
| **Dismiss animation** | `translateY: 0 → -40px`, `opacity: 1→0`, 250ms `ease-smooth` |
| **Spring-back** | `translateY: current → 0`, 200ms `ease-spring` |
| **Implementation** | Framer Motion `useDragControls` or `react-use-gesture` |

### 5B — Mobile: Swipe Up to Scroll (Natural Scroll Enhancement)

```
The hero section responds to swipe-up gesture with momentum scrolling.
No custom physics — use native iOS/Android scroll behavior. But add
a subtle "pull indicator" at the bottom of the hero:

A small chevron (12px, ink-300) pulses: translateY oscillates 0→6px→0
on a 2000ms infinite loop with ease-in-out. On first scroll, the
chevron fades out (200ms) and never returns.
```

| Property | Value |
|----------|-------|
| **Element** | Scroll indicator chevron (∨) at hero bottom |
| **Animation** | `translateY: 0→6px→0` loop, 2000ms, `ease-in-out` |
| **Color** | ink-300 `#A0A0A9` |
| **Size** | 12px icon |
| **Dismiss** | Fades out on first scroll event, 200ms `ease-smooth` |
| **Visibility** | Only on mobile (<768px) |

### 5C — Mobile: Long Press on CTA → Haptic Feedback

```
On long press (500ms hold) on primary CTA: trigger device haptic
feedback (navigator.vibrate(10) or Taptic Engine via CSS). Visual
feedback: button background pulses — coral-500 → coral-400 → coral-500
over 300ms. No navigation — long press is just tactile confirmation.
Single tap still navigates normally.
```

### 5D — Tablet/Desktop: Cursor Magnetic Pull on CTA

```
When the cursor enters a 60px proximity radius around the primary CTA
button, the button subtly translates toward the cursor — a "magnetic"
pull. Maximum displacement: 4px in any direction. The translation is
mapped to cursor position relative to button center.

Easing: ease-spring (the button "springs" toward the cursor).
Duration: continuous (60fps interpolation).

On cursor exit from radius: button springs back to center over 300ms
ease-spring.
```

| Property | Value |
|----------|-------|
| **Proximity radius** | 60px from button edge |
| **Max displacement** | 4px in X and Y |
| **Interpolation** | Linear mapping of cursor distance → displacement |
| **Return spring** | 300ms `ease-spring` to center |
| **Implementation** | `mousemove` listener scoped to radius, `requestAnimationFrame`, `transform: translate(dx, dy)` |
| **GPU** | `will-change: transform` (add on mouse enter, remove on exit) |
| **Disable** | `prefers-reduced-motion: reduce` → no magnetic pull |

> **Figma Make description:** "The primary CTA button has a magnetic feel — when your cursor gets close, the button subtly drifts toward it by a few pixels, like it wants to be clicked. It springs back when you move away."

---

---

## 6. Easing & Duration Reference

### Easing Curves (exact cubic-bezier values)

| Token | Curve | Character | Hero Usage |
|-------|-------|-----------|------------|
| `ease-smooth` | `cubic-bezier(0.4, 0, 0, 1)` | Apple's signature deceleration. Fast start, gentle landing. | Page load sequence, parallax, navbar, page transitions |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Playful overshoot. Goes past 1.0 then settles. | Social proof pill pop, arrow hover, pill hover, magnetic CTA |
| `ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Neutral. Neither dramatic nor boring. | Button hover color, underline fade |
| `ease-out` | `cubic-bezier(0, 0, 0.58, 1)` | Elements entering viewport. | Banner initial fade |
| `ease-in` | `cubic-bezier(0.42, 0, 1, 1)` | Elements exiting viewport. | Content exit on navigation |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Celebratory overshoot. | Reserved for cart-add confirmations (not used in hero) |

### Duration Tokens

| Token | Value | Hero Usage |
|-------|-------|------------|
| `instant` | 50ms | — (not used in hero) |
| `fast` | 100ms | Button active/press state |
| `normal` | 200ms | Hover color transitions, underline fade, arrow translate |
| `slow` | 300ms | Navbar condensation, banner dismiss, FAQ accordion |
| `slower` | 500ms | Social proof pill entrance, secondary CTA entrance |
| `lazy` | 800ms | Headline entrance, scroll reveals, smooth scroll |
| `page` | 600ms | Full page transition budget |

### Duration Budget Per Interaction Type

| Category | Max Duration | Rationale |
|----------|-------------|-----------|
| **Hover feedback** | 200ms | Must feel instant. >200ms feels laggy. |
| **Active/press** | 100ms | Tactile — should match finger lift speed. |
| **Element entrance** | 800ms | Slow enough to notice, fast enough to not wait. |
| **Page transition** | 600ms | Cross-fade window. >800ms feels broken. |
| **Scroll-linked** | Continuous | Tied to scroll position, no fixed duration. |
| **Micro-interaction** | 300ms | Tooltips, toggles, small state changes. |
| **Full sequence** | 1800ms | Total load orchestration. Must feel done by 1.2s. |

---

---

## 7. Performance Engineering

### GPU Acceleration Rules

```css
/* HERO — GPU-accelerated properties ONLY */
.hero-element {
  /* ✅ Composited — runs on GPU, no layout/paint */
  transform: translateY(0) scale(1);
  opacity: 1;

  /* ❌ NEVER animate these in the hero */
  /* width, height, top, left, margin, padding, border-width,
     font-size, line-height, background-position */
}
```

### `will-change` Management

| Element | `will-change` Value | When Applied | When Removed |
|---------|--------------------|--------------|--------------| 
| Hero background | `transform, opacity` | On DOM mount | 200ms after load sequence ends |
| Hero headline | `transform, opacity` | 250ms before animation starts | 200ms after animation ends |
| Hero CTAs | `transform, opacity` | 250ms before animation starts | 200ms after animation ends |
| Navbar | `transform, background-color` | On scroll past 50px | On scroll back to <20px |
| Sticky bar | `transform, opacity` | On hero exit (IntersectionObserver) | Never (persistent element) |

> **Critical:** Never set `will-change` on more than 5 elements simultaneously. Each `will-change: transform` creates a new compositor layer, consuming GPU memory. Remove aggressively after animations complete.

### Composite Layer Budget

| Layer | Purpose | Priority |
|-------|---------|----------|
| 1 | Urgency banner | Low (remove after load) |
| 2 | Hero background image | High (parallax) |
| 3 | Hero text content group | High (load sequence) |
| 4 | Navbar | Medium (scroll-linked) |
| 5 | Sticky bar | Medium (scroll-linked) |
| **MAX** | **5 simultaneous layers** | |

### Scroll Performance

```
DO:
  ✅ Use IntersectionObserver for reveal triggers (off main thread)
  ✅ Use CSS scroll-timeline for parallax where supported
  ✅ Debounce scroll handlers to 16ms (60fps frame budget)
  ✅ Use passive event listeners: { passive: true }

DON'T:
  ❌ Read layout properties (offsetTop, getBoundingClientRect) in
     scroll handlers — forces synchronous layout
  ❌ Use scroll event + RAF for parallax — use CSS or IO instead
  ❌ Animate background-position for parallax — use transform
```

### Paint Containment

```css
/* Isolate paint to hero section — changes inside don't repaint outside */
.hero-section {
  contain: layout paint;
  content-visibility: auto;
  contain-intrinsic-size: 100vw 90vh; /* estimated hero size */
}
```

### Frame Budget

```
Target: 60fps (16.67ms per frame)
Hero load sequence: 7 simultaneous opacity+transform animations
Measured compositor cost: ~2ms per frame (well within budget)
Main thread cost: ~0ms (no JS-driven animation during load — CSS only)

Parallax scroll: 2 elements × transform+opacity
Measured cost: ~1.5ms per frame via compositor
```

---

---

## 8. Reduced Motion Fallback

```css
@media (prefers-reduced-motion: reduce) {
  /* All durations collapse to near-zero */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Hero elements appear immediately, no stagger */
  .hero-headline,
  .hero-subheadline,
  .hero-cta-primary,
  .hero-cta-secondary,
  .hero-microcopy,
  .hero-urgency-banner,
  .hero-background {
    opacity: 1 !important;
    transform: none !important;
  }

  /* Parallax disabled — static positioning */
  .hero-background {
    transform: none !important;
  }

  /* Magnetic cursor disabled */
  .cta-magnetic {
    transform: none !important;
  }

  /* Scroll indicator hidden (no pulsing) */
  .scroll-indicator {
    display: none;
  }
}
```

### What Remains Active

| Element | Reduced Motion Behavior |
|---------|------------------------|
| Hover color changes | ✅ Remain (instant, no motion) |
| Focus rings | ✅ Remain (instant) |
| Cursor: pointer | ✅ Remains |
| Smooth scroll | ❌ Becomes instant jump |
| Parallax | ❌ Disabled — static image |
| Stagger sequence | ❌ All elements appear at once |
| Scroll indicator pulse | ❌ Hidden |
| Magnetic cursor | ❌ Disabled |
| Navbar condensation | ✅ Instant state change (no transition) |

---

---

## 9. Figma Make Description (Copy-Paste)

> Paste this entire block into Figma Make. It describes the hero interactions in natural language that the AI can interpret.

```
HERO SECTION — INTERACTION DESIGN

Page Load Sequence:
On page load: The hero background image fades in from 0 to full opacity
while gently scaling from 102% to 100% over 1.2 seconds with a smooth
deceleration curve (ease-smooth, cubic-bezier 0.4, 0, 0, 1) — like the
image is "breathing in" and settling.

At 300ms: The headline "Sofa In. Stress Out. Instantly." fades up from
30px below its final position over 800ms with the same smooth curve.
The text feels like it's being placed down with weight.

At 500ms: The subheadline fades up from 24px below over 700ms. Same curve.
A 200ms gap between headline and subheadline lets the eye read the headline
first.

At 700ms: The coral "Shop the Collection" button fades up from 20px below
over 600ms. Shorter travel distance creates a decelerating rhythm in the
overall sequence.

At 820ms: The "See How It Works →" text link fades up from 16px below
over 500ms. Arrives quietly as the secondary action.

At 1000ms: The "★ 4.9 · 2,400+ Happy Homes" social proof pill fades up
from 12px below and scales from 96% to 100% with a spring curve
(cubic-bezier 0.175, 0.885, 0.32, 1.275) — it has a tiny playful overshoot
pop. This is the one moment of spring physics in the otherwise smooth
sequence. Duration: 500ms.

Urgency banner at the very top ("Free delivery…") simply fades in over
400ms starting immediately.

Total sequence: ~1.2 seconds until all elements are settled and idle.

Scroll Behaviors:
On scroll down: The navigation bar smoothly shrinks from 72px to 56px
height over 300ms with ease-smooth. Its background transitions from fully
transparent to a frosted white (95% opacity white with a 12px backdrop
blur). The logo scales down to 85%. A hairline shadow fades in.

The hero background image scrolls at 40% of the user's scroll speed —
a subtle parallax that creates depth. It also fades to 30% opacity as
you scroll past. The headline and CTAs scroll at 60% speed and fade to
fully transparent by the time you've scrolled 80% through the hero.

When the hero fully exits the viewport: A 64px sticky bar slides down
from above the screen edge over 400ms with ease-smooth. It contains the
product name, price, an "Add to Cart" coral button, and a reassurance line.
Scrolling back into the hero makes the sticky bar slide back up and out.

Hover States:
On hover over the coral "Shop the Collection" button: Background darkens
from #FF6B42 to #E85530 smoothly over 200ms. A subtle inner glow appears.
On press: the button scales down to 97% for 100ms — a tactile "click"
feel. On keyboard focus: a 3px coral glow ring appears instantly.

On hover over "See How It Works →": The arrow character slides 4px to the
right with a spring bounce (overshoots slightly then settles, 200ms). A
thin underline fades in beneath the text over 150ms.

On hover over the social proof pill: It lifts 2px, gains a slightly
deeper shadow, and its background tints to a very light grey. A subtle
scale to 102% with spring easing. Feels tappable.

Close button (×) on the urgency banner: On hover, the × rotates 90
degrees with a spring curve and becomes fully opaque. On click, the
entire banner collapses to 0 height over 300ms — the hero section
smoothly slides up to fill the space.

Click Transitions:
On click "Shop the Collection": The button gives press feedback (scale
97%), then the hero content fades out and shifts up 16px over 400ms.
The background softens (opacity drops, slight zoom in). The next page's
content fades in from 24px below over 600ms. There's a 200ms overlap
between the exit and entrance creating a smooth crossfade. Total
transition: 600ms.

On click "See How It Works →": The page smooth-scrolls down to the
How It Works section over approximately 800ms with ease-smooth easing.

Mobile Gestures:
A small chevron indicator at the bottom of the hero gently pulses up
and down (6px travel, 2 second loop) inviting the user to scroll.
It fades away permanently on the first scroll.

The urgency banner can be swiped up to dismiss on mobile.

The primary CTA button has a subtle magnetic feel on desktop — when
your cursor gets within 60px, the button drifts 1-4px toward the
cursor, like it wants to be clicked. It springs back when you move away.

Responsive Animation Adjustments:
— Mobile (390px): Headline entrance translateY reduces from 30px to 20px.
  Parallax factor reduces from 0.4 to 0.2 (less dramatic on small screens).
  Magnetic cursor is disabled. Scroll indicator chevron is shown.
— Tablet (768px): Full animation set with desktop parallax values.
  Magnetic cursor active. Scroll indicator hidden.
— Desktop (1280px+): Full animation set. All hover states active.

Reduced Motion:
When the user has "reduce motion" enabled in their OS: All animations
are disabled. Every element appears immediately at full opacity in its
final position. No parallax, no stagger, no scroll indicator. Hover
color changes still work (they're color shifts, not motion). Focus
rings still appear. The page is fully functional and beautiful without
any motion.
```

---

---

## 10. Implementation Notes (Framer Motion / React)

### Load Sequence — Stagger Container

```tsx
// Hero load orchestration using Framer Motion
const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0, // we control each delay manually
    },
  },
};

const items = [
  { key: "headline",      delay: 0.3,  y: 30, duration: 0.8  },
  { key: "subheadline",   delay: 0.5,  y: 24, duration: 0.7  },
  { key: "cta-primary",   delay: 0.7,  y: 20, duration: 0.6  },
  { key: "cta-secondary", delay: 0.82, y: 16, duration: 0.5  },
  { key: "microcopy",     delay: 1.0,  y: 12, duration: 0.5,
    scale: [0.96, 1], ease: [0.175, 0.885, 0.32, 1.275] },
];
```

### CSS Custom Properties for Animations

```css
:root {
  /* Hero-specific animation tokens */
  --hero-bg-duration: 1200ms;
  --hero-bg-scale-start: 1.02;
  --hero-parallax-factor: 0.4;
  --hero-text-parallax-factor: 0.6;
  --hero-stagger-base: 300ms;

  /* Navbar */
  --nav-height-expanded: 72px;
  --nav-height-condensed: 56px;
  --nav-scroll-threshold: 100px;

  /* Sticky bar */
  --sticky-height: 64px;
  --sticky-z: 200;
}

@media (max-width: 767px) {
  :root {
    --hero-parallax-factor: 0.2;
    --hero-bg-scale-start: 1.01;
  }
}
```

### IntersectionObserver Setup

```ts
// Scroll reveal trigger for sections below hero
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // one-shot
      }
    });
  },
  { threshold: 0.15 }
);

// Sticky bar trigger
const heroObserver = new IntersectionObserver(
  ([entry]) => {
    stickyBar.dataset.visible = String(!entry.isIntersecting);
  },
  { threshold: 0 }
);
```

---

---

## Appendix A — Animation Decision Matrix

| Interaction | Easing | Duration | Why This Curve | Why This Duration |
|------------|--------|----------|----------------|-------------------|
| Headline entrance | `ease-smooth` | 800ms | Deceleration = "placed with care" | Long enough to read as deliberate |
| CTA button hover | `ease-default` | 200ms | Neutral — color shift shouldn't be dramatic | Instant feel, no lag |
| CTA button press | `ease-default` | 100ms | Matches physical button depression speed | Tactile, not sluggish |
| Proof pill pop | `ease-spring` | 500ms | Overshoot = "delightful surprise" | Spring needs time to settle |
| Arrow nudge | `ease-spring` | 200ms | Playful — matches brand "playful" trait | Short spring = snappy |
| Navbar shrink | `ease-smooth` | 300ms | Must not distract from content | Fast enough to feel responsive |
| Parallax scroll | Continuous | — | Linear interpolation of scroll position | No fixed duration — tied to input |
| Page transition | `ease-smooth` | 600ms | Cross-fade needs Apple-level smoothness | Matches `page` token exactly |
| Banner dismiss | `ease-smooth` | 300ms | Clean collapse, no bounce | Functional, not decorative |
| Sticky bar enter | `ease-smooth` | 400ms | Slide-in should feel substantial | Slightly longer than navbar = weight |

## Appendix B — Motion Token Cross-Reference

All hero animations reference these EzHome design system tokens:

| Token Path | Value | Used In |
|-----------|-------|---------|
| `animation.easing.smooth` | `cubic-bezier(0.4, 0, 0, 1)` | Load sequence, parallax, navbar, page transition |
| `animation.easing.spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Proof pill, arrow hover, magnetic CTA |
| `animation.easing.default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Button hover, underline |
| `animation.easing.out` | `cubic-bezier(0, 0, 0.58, 1)` | Banner entrance |
| `animation.easing.in` | `cubic-bezier(0.42, 0, 1, 1)` | Content exit |
| `animation.duration.fast` | `100ms` | Button press |
| `animation.duration.normal` | `200ms` | All hover states |
| `animation.duration.slow` | `300ms` | Navbar, banner dismiss |
| `animation.duration.slower` | `500ms` | Proof pill, secondary CTA |
| `animation.duration.lazy` | `800ms` | Headline entrance, scroll reveal |
| `animation.duration.page` | `600ms` | Page transition |
| `shadow.md` | `0 4px 8px -2px rgba(10,10,11,0.06)...` | Hover lift states |
| `shadow.focus-accent` | `0 0 0 3px rgba(255,107,66,0.24)` | CTA focus ring |
| `layout.headerHeight` | `72px` | Navbar expanded |
| `zIndex.sticky` | `200` | Sticky bar, condensed navbar |

---

*Authored as motion design spec for EzHome compression sofa hero section. All easing curves, durations, and color values reference `design-system/tokens.json`. Copy the Section 9 block directly into Figma Make.*
