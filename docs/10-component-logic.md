# EzHome — Component Logic Architecture (Shopify)

> Interactive behavior specifications for the EzHome Shopify theme: state machines, data flow, progressive enhancement, and vanilla JS patterns.
> Products: Compression sofas & beds — lightweight, 10-minute assembly.

---

## Tech Context (from `07-tech-stack.md`)

| Layer          | Choice                                  |
|---------------|-----------------------------------------|
| Platform       | Shopify Online Store 2.0                |
| Templating     | Liquid (server-rendered)                |
| JavaScript     | Vanilla ES modules (`defer`)            |
| CSS            | BEM + CSS custom properties             |
| Cart API       | Shopify Ajax API (`/cart/*.js`)          |
| Section API    | Shopify Section Rendering API           |
| Custom Elements| Web Components for complex widgets      |
| Animation      | CSS transitions + `@keyframes`          |

---

## Shared Patterns

### 1. Progressive Enhancement

All interactive components follow this principle:

```
Server-rendered HTML (Liquid) → Works without JS
        ↓
JavaScript enhances with AJAX, animations, drawer behavior
        ↓
Fallback: Full page reload to /cart, standard form submits
```

### 2. Cart State Manager (`global.js`)

The central state manager for cart operations used across all components.

```javascript
// assets/global.js — CartManager
class CartManager {
  constructor() {
    this.cart = null;
    this.listeners = new Set();
    this.loading = false;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.cart));
  }

  async getCart() {
    const res = await fetch('/cart.js');
    this.cart = await res.json();
    this.notify();
    return this.cart;
  }

  async addItem(variantId, quantity = 1, properties = {}) {
    this.loading = true;
    this.notify();
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: variantId, quantity, properties }] })
      });
      if (!res.ok) throw new Error(await res.text());
      await this.getCart();
      return true;
    } catch (err) {
      console.error('Add to cart failed:', err);
      return false;
    } finally {
      this.loading = false;
      this.notify();
    }
  }

  async updateItem(key, quantity) {
    this.loading = true;
    this.notify();
    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      await this.getCart();
    } finally {
      this.loading = false;
      this.notify();
    }
  }

  async removeItem(key) {
    return this.updateItem(key, 0);
  }

  get itemCount() {
    return this.cart?.item_count ?? 0;
  }

  get total() {
    return this.cart?.total_price ?? 0;
  }
}

// Singleton
window.EzHome = window.EzHome || {};
window.EzHome.cart = new CartManager();
```

### 3. Section Rendering Helper

```javascript
// assets/global.js — SectionRenderer
class SectionRenderer {
  static async render(sectionIds) {
    const ids = Array.isArray(sectionIds) ? sectionIds.join(',') : sectionIds;
    const url = `${window.location.pathname}?sections=${ids}`;
    const res = await fetch(url);
    return res.json();
  }

  static async replaceSection(sectionId, containerSelector) {
    const data = await this.render(sectionId);
    const html = data[sectionId];
    if (!html) return;
    const container = document.querySelector(containerSelector || `[data-section-id="${sectionId}"]`);
    if (container) {
      container.outerHTML = html;
    }
  }
}

window.EzHome.sections = SectionRenderer;
```

### 4. Event Bus

```javascript
// assets/global.js — EventBus
class EventBus {
  constructor() { this.events = {}; }
  on(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn);
    return () => this.off(event, fn);
  }
  off(event, fn) {
    this.events[event] = (this.events[event] || []).filter(f => f !== fn);
  }
  emit(event, data) {
    (this.events[event] || []).forEach(fn => fn(data));
  }
}

window.EzHome.events = new EventBus();

// Events emitted across the theme:
// 'cart:updated'      — Cart contents changed
// 'cart:drawer:open'  — Cart drawer should open
// 'cart:drawer:close' — Cart drawer should close
// 'variant:changed'   — Product variant selection changed
// 'quickview:open'    — Quick view modal requested
// 'modal:open'        — Generic modal open
// 'modal:close'       — Generic modal close
```

---

## System 1: Product Detail Page (PDP)

### 1.1 State Machine

```
┌─────────┐    select variant     ┌──────────────┐
│  IDLE   │ ─────────────────────▶│ VARIANT_SELECTED │
│ (first  │                       │  (new variant)   │
│ variant)│ ◀─────────────────────│                  │
└─────────┘    reset               └───────┬──────────┘
                                           │
                                    click add to cart
                                           │
                                           ▼
                                   ┌──────────────┐
                               ┌───│   ADDING      │
                               │   │  (loading)    │
                               │   └──────────────┘
                               │          │
                         error │          │ success
                               │          ▼
                               │   ┌──────────────┐
                               │   │    ADDED      │──── open cart drawer
                               │   │  (success)   │     + animate button
                               │   └──────┬───────┘
                               │          │ 2s timeout
                               │          ▼
                               │   ┌──────────────┐
                               └──▶│    IDLE       │
                                   └──────────────┘
```

### 1.2 Variant Picker

**Section:** `sections/main-product.liquid`  
**JS:** `assets/section-product.js`

```javascript
// assets/section-product.js
class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form[data-product-form]');
    this.variantData = JSON.parse(this.querySelector('[data-variant-json]').textContent);
    this.selectedOptions = {};
    this.currentVariant = null;

    this.bindEvents();
    this.initFromUrl();
  }

  bindEvents() {
    // Option buttons (color, size)
    this.querySelectorAll('[data-option-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const option = e.target.dataset.optionName;   // "Color", "Size"
        const value = e.target.dataset.optionValue;    // "Sage", "3-Seater"
        this.selectOption(option, value);
      });
    });
  }

  initFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const variantId = params.get('variant');
    if (variantId) {
      const variant = this.variantData.find(v => v.id === parseInt(variantId));
      if (variant) {
        variant.options.forEach((value, index) => {
          const optionName = this.dataset[`option${index + 1}Name`];
          this.selectOption(optionName, value, false);
        });
      }
    } else {
      // Select first available variant
      const first = this.variantData.find(v => v.available);
      if (first) {
        first.options.forEach((value, index) => {
          const optionName = this.dataset[`option${index + 1}Name`];
          this.selectOption(optionName, value, false);
        });
      }
    }
    this.updateVariant();
  }

  selectOption(option, value, update = true) {
    this.selectedOptions[option] = value;

    // Update button active states
    this.querySelectorAll(`[data-option-name="${option}"]`).forEach(btn => {
      btn.classList.toggle('option-btn--active', btn.dataset.optionValue === value);
      btn.setAttribute('aria-pressed', btn.dataset.optionValue === value);
    });

    if (update) this.updateVariant();
  }

  updateVariant() {
    const selectedValues = Object.values(this.selectedOptions);
    this.currentVariant = this.variantData.find(v =>
      v.options.every((opt, i) => opt === selectedValues[i])
    );

    if (!this.currentVariant) return;

    // Update price
    this.updatePrice();
    // Update availability
    this.updateAvailability();
    // Update media/gallery
    this.updateMedia();
    // Update URL (no page reload)
    this.updateUrl();
    // Update hidden input
    this.querySelector('input[name="id"]').value = this.currentVariant.id;
    // Emit event
    window.EzHome.events.emit('variant:changed', {
      variant: this.currentVariant,
      product: this.dataset.productId
    });
  }

  updatePrice() {
    const priceEl = this.querySelector('[data-price]');
    const compareEl = this.querySelector('[data-compare-price]');
    const { price, compare_at_price } = this.currentVariant;

    priceEl.textContent = this.formatMoney(price);

    if (compare_at_price && compare_at_price > price) {
      compareEl.textContent = this.formatMoney(compare_at_price);
      compareEl.hidden = false;
      priceEl.classList.add('price--sale');
    } else {
      compareEl.hidden = true;
      priceEl.classList.remove('price--sale');
    }
  }

  updateAvailability() {
    const addBtn = this.querySelector('[data-add-to-cart]');
    const btnText = this.querySelector('[data-add-to-cart-text]');

    if (this.currentVariant.available) {
      addBtn.disabled = false;
      btnText.textContent = 'Add To Cart';
    } else {
      addBtn.disabled = true;
      btnText.textContent = 'Sold Out';
    }
  }

  updateMedia() {
    const featuredImage = this.currentVariant.featured_image;
    if (featuredImage) {
      window.EzHome.events.emit('media:select', {
        mediaId: featuredImage.id,
        src: featuredImage.src
      });
    }
  }

  updateUrl() {
    const url = new URL(window.location);
    url.searchParams.set('variant', this.currentVariant.id);
    window.history.replaceState({}, '', url);
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD'
    }).format(cents / 100);
  }
}

customElements.define('product-form', ProductForm);
```

### 1.3 Add to Cart

```javascript
// assets/section-product.js (continued)
class AddToCart extends HTMLElement {
  constructor() {
    super();
    this.form = this.closest('product-form')?.querySelector('form') || this.querySelector('form');
    this.button = this.querySelector('[data-add-to-cart]');
    this.buttonText = this.querySelector('[data-add-to-cart-text]');

    this.form?.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    // State: ADDING
    this.button.disabled = true;
    this.button.classList.add('btn--loading');
    this.buttonText.textContent = 'Adding...';

    const formData = new FormData(this.form);
    const variantId = parseInt(formData.get('id'));
    const quantity = parseInt(formData.get('quantity') || 1);

    const success = await window.EzHome.cart.addItem(variantId, quantity);

    if (success) {
      // State: ADDED
      this.buttonText.textContent = '✓ Added';
      this.button.classList.remove('btn--loading');
      this.button.classList.add('btn--success');

      // Open cart drawer
      window.EzHome.events.emit('cart:drawer:open');
      window.EzHome.events.emit('cart:updated');

      // Reset after 2s → State: IDLE
      setTimeout(() => {
        this.buttonText.textContent = 'Add To Cart';
        this.button.classList.remove('btn--success');
        this.button.disabled = false;
      }, 2000);
    } else {
      // State: ERROR
      this.buttonText.textContent = 'Error — Try Again';
      this.button.classList.remove('btn--loading');
      this.button.classList.add('btn--error');

      setTimeout(() => {
        this.buttonText.textContent = 'Add To Cart';
        this.button.classList.remove('btn--error');
        this.button.disabled = false;
      }, 3000);
    }
  }
}

customElements.define('add-to-cart', AddToCart);
```

### 1.4 Media Gallery

```javascript
// assets/component-media-gallery.js
class MediaGallery extends HTMLElement {
  constructor() {
    super();
    this.mainImage = this.querySelector('[data-main-image]');
    this.thumbnails = this.querySelectorAll('[data-thumbnail]');
    this.currentIndex = 0;

    this.bindEvents();
  }

  bindEvents() {
    // Thumbnail click
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => this.selectImage(index));
    });

    // Swipe on mobile
    let startX = 0;
    this.mainImage?.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    this.mainImage?.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }, { passive: true });

    // Keyboard
    this.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Listen for variant change
    window.EzHome.events.on('media:select', ({ mediaId }) => {
      const index = [...this.thumbnails].findIndex(t => t.dataset.mediaId === String(mediaId));
      if (index >= 0) this.selectImage(index);
    });
  }

  selectImage(index) {
    this.currentIndex = index;
    const thumb = this.thumbnails[index];
    const src = thumb.dataset.fullSrc;
    const srcset = thumb.dataset.fullSrcset;

    this.mainImage.src = src;
    if (srcset) this.mainImage.srcset = srcset;

    // Update active thumbnail
    this.thumbnails.forEach(t => {
      t.classList.toggle('thumbnail--active', t === thumb);
      t.setAttribute('aria-current', t === thumb ? 'true' : 'false');
    });
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.thumbnails.length;
    this.selectImage(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
    this.selectImage(prevIndex);
  }
}

customElements.define('media-gallery', MediaGallery);
```

### 1.5 Quantity Selector

```javascript
// assets/component-quantity.js
class QuantitySelector extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input[type="number"]');
    this.decrementBtn = this.querySelector('[data-decrement]');
    this.incrementBtn = this.querySelector('[data-increment]');
    this.min = parseInt(this.input.min) || 1;
    this.max = parseInt(this.input.max) || 99;

    this.decrementBtn?.addEventListener('click', () => this.change(-1));
    this.incrementBtn?.addEventListener('click', () => this.change(1));
    this.input?.addEventListener('change', () => this.validate());
  }

  change(delta) {
    const newValue = parseInt(this.input.value) + delta;
    this.input.value = Math.max(this.min, Math.min(this.max, newValue));
    this.updateButtons();
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  validate() {
    let value = parseInt(this.input.value);
    if (isNaN(value) || value < this.min) value = this.min;
    if (value > this.max) value = this.max;
    this.input.value = value;
    this.updateButtons();
  }

  updateButtons() {
    const value = parseInt(this.input.value);
    this.decrementBtn.disabled = value <= this.min;
    this.incrementBtn.disabled = value >= this.max;
  }
}

customElements.define('quantity-selector', QuantitySelector);
```

---

## System 2: Cart Drawer

### 2.1 State Machine

```
┌──────────┐   click cart icon    ┌─────────────┐
│  CLOSED  │ ────────────────────▶│   OPENING    │
└──────────┘   add to cart event  │  (animating) │
      ▲                           └──────┬───────┘
      │                                  │ animation end
      │                                  ▼
      │                           ┌─────────────┐
      │    click overlay/close    │    OPEN      │
      │    press Escape           │  (browsable) │
      │◀──────────────────────────│              │
      │                           └──────┬───────┘
      │                                  │
      │                          update quantity / remove
      │                                  │
      │                                  ▼
      │                           ┌─────────────┐
      │                           │  UPDATING    │
      │                           │  (loading)   │
      │                           └──────┬───────┘
      │                                  │ section re-render
      │                                  ▼
      │                           ┌─────────────┐
      │                           │    OPEN      │
      └───────────────────────────│  (refreshed) │
                                  └─────────────┘
```

### 2.2 Cart Drawer Component

**Section:** `sections/cart-drawer.liquid`  
**JS:** `assets/section-cart-drawer.js`

```javascript
// assets/section-cart-drawer.js
class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.overlay = this.querySelector('[data-drawer-overlay]');
    this.content = this.querySelector('[data-drawer-content]');
    this.closeBtn = this.querySelector('[data-drawer-close]');
    this.isOpen = false;
    this.sectionId = this.dataset.sectionId;

    this.bindEvents();
  }

  bindEvents() {
    // Close triggers
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Open triggers
    window.EzHome.events.on('cart:drawer:open', () => this.open());
    window.EzHome.events.on('cart:updated', () => this.refresh());

    // Cart icon click
    document.querySelectorAll('[data-cart-trigger]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Quantity changes inside drawer
    this.addEventListener('change', (e) => {
      if (e.target.closest('quantity-selector')) {
        const lineItem = e.target.closest('[data-line-key]');
        if (lineItem) {
          this.updateQuantity(lineItem.dataset.lineKey, parseInt(e.target.value));
        }
      }
    });

    // Remove buttons inside drawer
    this.addEventListener('click', (e) => {
      if (e.target.closest('[data-remove-item]')) {
        e.preventDefault();
        const lineItem = e.target.closest('[data-line-key]');
        if (lineItem) {
          this.removeItem(lineItem.dataset.lineKey, lineItem);
        }
      }
    });
  }

  open() {
    this.isOpen = true;
    this.setAttribute('open', '');
    document.body.classList.add('cart-drawer-open');
    document.body.style.overflow = 'hidden';

    // Trap focus
    this.trapFocus();

    // Fetch latest cart
    this.refresh();
  }

  close() {
    this.isOpen = false;
    this.removeAttribute('open');
    document.body.classList.remove('cart-drawer-open');
    document.body.style.overflow = '';

    // Restore focus
    this.restoreFocus();
  }

  async refresh() {
    try {
      const data = await window.EzHome.sections.render(this.sectionId);
      const html = data[this.sectionId];
      if (html) {
        // Parse and replace only the inner content (preserve drawer shell)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('[data-drawer-content]');
        if (newContent && this.content) {
          this.content.innerHTML = newContent.innerHTML;
        }
      }
    } catch (err) {
      console.error('Cart drawer refresh failed:', err);
    }

    // Update cart count badges
    this.updateCartCount();
  }

  async updateQuantity(key, quantity) {
    const lineItem = this.querySelector(`[data-line-key="${key}"]`);
    lineItem?.classList.add('line-item--loading');

    await window.EzHome.cart.updateItem(key, quantity);
    await this.refresh();

    window.EzHome.events.emit('cart:updated');
  }

  async removeItem(key, element) {
    // Animate out
    element.classList.add('line-item--removing');

    await new Promise(resolve => setTimeout(resolve, 300));
    await window.EzHome.cart.removeItem(key);
    await this.refresh();

    window.EzHome.events.emit('cart:updated');
  }

  updateCartCount() {
    const count = window.EzHome.cart.itemCount;
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  trapFocus() {
    this._previouslyFocused = document.activeElement;
    const focusable = this.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  restoreFocus() {
    this._previouslyFocused?.focus();
  }
}

customElements.define('cart-drawer', CartDrawer);
```

### 2.3 Cart Drawer Liquid (structure)

```liquid
{%- comment -%} sections/cart-drawer.liquid {%- endcomment -%}
<cart-drawer data-section-id="{{ section.id }}" aria-label="Shopping cart">
  <div data-drawer-overlay class="cart-drawer__overlay"></div>
  <div data-drawer-content class="cart-drawer__content" role="dialog" aria-modal="true">
    <header class="cart-drawer__header">
      <h2 class="cart-drawer__title">Your Cart ({{ cart.item_count }})</h2>
      <button data-drawer-close class="cart-drawer__close" aria-label="Close cart">
        {% render 'icon', name: 'close' %}
      </button>
    </header>

    {%- if cart.item_count > 0 -%}
      <div class="cart-drawer__items">
        {%- for item in cart.items -%}
          <div class="cart-drawer__line-item line-item" data-line-key="{{ item.key }}">
            <img
              src="{{ item.image | image_url: width: 120 }}"
              alt="{{ item.title | escape }}"
              width="60" height="60"
              loading="lazy"
              class="line-item__image">
            <div class="line-item__info">
              <a href="{{ item.url }}" class="line-item__title">{{ item.product.title }}</a>
              {%- unless item.product.has_only_default_variant -%}
                <p class="line-item__variant">{{ item.variant.title }}</p>
              {%- endunless -%}
              <p class="line-item__price">{{ item.final_line_price | money }}</p>
            </div>
            <quantity-selector class="line-item__quantity">
              <button data-decrement aria-label="Decrease quantity">−</button>
              <input type="number" value="{{ item.quantity }}" min="1" max="10" aria-label="Quantity">
              <button data-increment aria-label="Increase quantity">+</button>
            </quantity-selector>
            <button data-remove-item class="line-item__remove" aria-label="Remove {{ item.title | escape }}">
              {% render 'icon', name: 'trash' %}
            </button>
          </div>
        {%- endfor -%}
      </div>

      {%- comment -%} Free shipping bar {%- endcomment -%}
      {% render 'free-shipping-bar', cart: cart %}

      <footer class="cart-drawer__footer">
        <div class="cart-drawer__subtotal">
          <span>Subtotal</span>
          <span data-cart-subtotal>{{ cart.total_price | money }}</span>
        </div>
        <p class="cart-drawer__note">Shipping & taxes calculated at checkout</p>
        <a href="/checkout" class="btn btn--primary btn--full-width">Checkout</a>
        <a href="/cart" class="cart-drawer__view-cart">View Cart</a>
      </footer>

    {%- else -%}
      <div class="cart-drawer__empty">
        <p>Your cart is empty</p>
        <a href="/collections/all" class="btn btn--primary">Start Shopping</a>
      </div>
    {%- endif -%}
  </div>
</cart-drawer>
```

### 2.4 Cart Drawer CSS

```css
/* assets/section-cart-drawer.css */
cart-drawer {
  display: contents;
}

cart-drawer:not([open]) .cart-drawer__overlay,
cart-drawer:not([open]) .cart-drawer__content {
  visibility: hidden;
  pointer-events: none;
}

.cart-drawer__overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 22, 0.5);
  z-index: 100;
  opacity: 0;
  transition: opacity var(--duration-base) var(--easing-default);
}

cart-drawer[open] .cart-drawer__overlay {
  opacity: 1;
  visibility: visible;
}

.cart-drawer__content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 90vw);
  background: var(--color-white);
  z-index: 101;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform var(--duration-base) var(--easing-default);
}

cart-drawer[open] .cart-drawer__content {
  transform: translateX(0);
  visibility: visible;
}

.line-item--removing {
  opacity: 0;
  transform: translateX(20px);
  transition: all var(--duration-base) var(--easing-default);
}

.line-item--loading {
  opacity: 0.5;
  pointer-events: none;
}

body.cart-drawer-open {
  overflow: hidden;
}
```

---

## System 3: Product Card (Collection Grid)

### 3.1 Behavior

| Interaction              | Behavior                                          |
|-------------------------|---------------------------------------------------|
| Hover (desktop)          | Image swaps to second product image               |
| Click card               | Navigate to PDP                                   |
| Click "Quick Add"        | Add first available variant to cart via AJAX       |
| Color swatches (if shown)| Swap card image to variant image                  |
| Sold out variant         | "Sold Out" badge, button disabled                 |
| On sale                  | Compare-at-price + "Sale" badge                   |

### 3.2 Product Card Component

```javascript
// assets/component-card-product.js
class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.primaryImage = this.querySelector('[data-primary-image]');
    this.secondaryImage = this.querySelector('[data-secondary-image]');
    this.quickAddBtn = this.querySelector('[data-quick-add]');
    this.swatches = this.querySelectorAll('[data-swatch]');

    this.bindEvents();
  }

  bindEvents() {
    // Image swap on hover (desktop only)
    if (this.secondaryImage && window.matchMedia('(hover: hover)').matches) {
      this.addEventListener('mouseenter', () => {
        this.primaryImage.style.opacity = '0';
        this.secondaryImage.style.opacity = '1';
      });
      this.addEventListener('mouseleave', () => {
        this.primaryImage.style.opacity = '1';
        this.secondaryImage.style.opacity = '0';
      });
    }

    // Quick add
    this.quickAddBtn?.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const variantId = parseInt(this.quickAddBtn.dataset.variantId);
      this.quickAddBtn.disabled = true;
      this.quickAddBtn.textContent = 'Adding...';

      const success = await window.EzHome.cart.addItem(variantId, 1);

      if (success) {
        this.quickAddBtn.textContent = '✓ Added';
        window.EzHome.events.emit('cart:drawer:open');
        window.EzHome.events.emit('cart:updated');
        setTimeout(() => {
          this.quickAddBtn.textContent = 'Quick Add';
          this.quickAddBtn.disabled = false;
        }, 2000);
      } else {
        this.quickAddBtn.textContent = 'Error';
        setTimeout(() => {
          this.quickAddBtn.textContent = 'Quick Add';
          this.quickAddBtn.disabled = false;
        }, 2000);
      }
    });

    // Color swatches
    this.swatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const imageSrc = swatch.dataset.imageSrc;
        const variantId = swatch.dataset.variantId;
        const url = swatch.dataset.url;

        if (imageSrc) this.primaryImage.src = imageSrc;
        if (variantId) this.quickAddBtn.dataset.variantId = variantId;
        if (url) this.querySelector('a').href = url;

        this.swatches.forEach(s => s.classList.remove('swatch--active'));
        swatch.classList.add('swatch--active');
      });
    });
  }
}

customElements.define('product-card', ProductCard);
```

---

## System 4: Header & Navigation

### 4.1 State Machine

```
┌──────────────────┐
│  STATIC HEADER   │ ← scroll position < threshold
│  (transparent or │
│   solid)         │
└────────┬─────────┘
         │ scroll down > threshold
         ▼
┌──────────────────┐
│  HIDDEN          │ ← scrolling down (header slides up)
│  (translateY:-100%)│
└────────┬─────────┘
         │ scroll up (any amount)
         ▼
┌──────────────────┐
│  STICKY          │ ← scrolling up (header slides back)
│  (compact, shadow)│
└──────────────────┘
```

### 4.2 Header Component

```javascript
// assets/section-header.js
class StickyHeader extends HTMLElement {
  constructor() {
    super();
    this.lastScrollY = 0;
    this.threshold = 100;
    this.isHidden = false;

    // Debounced scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  onScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= this.threshold) {
      // At top — show full header
      this.classList.remove('header--hidden', 'header--sticky');
    } else if (currentScrollY > this.lastScrollY) {
      // Scrolling down — hide header
      if (!this.isHidden) {
        this.classList.add('header--hidden');
        this.classList.remove('header--sticky');
        this.isHidden = true;
      }
    } else {
      // Scrolling up — show sticky compact header
      this.classList.remove('header--hidden');
      this.classList.add('header--sticky');
      this.isHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }
}

customElements.define('sticky-header', StickyHeader);
```

### 4.3 Mobile Menu

```javascript
// assets/section-header.js (continued)
class MobileMenu extends HTMLElement {
  constructor() {
    super();
    this.toggleBtn = document.querySelector('[data-mobile-menu-toggle]');
    this.closeBtn = this.querySelector('[data-mobile-menu-close]');
    this.overlay = this.querySelector('[data-mobile-menu-overlay]');
    this.isOpen = false;

    this.toggleBtn?.addEventListener('click', () => this.toggle());
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    // Focus first link
    this.querySelector('a')?.focus();
  }

  close() {
    this.isOpen = false;
    this.removeAttribute('open');
    document.body.style.overflow = '';
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.toggleBtn.focus();
  }
}

customElements.define('mobile-menu', MobileMenu);
```

---

## System 5: Predictive Search

### 5.1 State Machine

```
┌─────────┐    focus/type     ┌──────────────┐
│  IDLE   │ ────────────────▶│  DEBOUNCING   │
│         │                   │  (300ms wait) │
└─────────┘                   └──────┬────────┘
      ▲                              │ timer fires
      │                              ▼
      │                       ┌──────────────┐
      │    empty query        │   LOADING    │
      │◀──────────────────────│  (fetching)  │
      │                       └──────┬───────┘
      │                              │
      │                    ┌─────────┴──────────┐
      │                    │                    │
      │                    ▼                    ▼
      │             ┌──────────┐        ┌──────────────┐
      │             │ RESULTS  │        │  NO RESULTS  │
      │             │ (showing │        │  (message)   │
      │             │  list)   │        └──────────────┘
      │             └──────────┘
      │                    │
      │    blur / Escape   │
      │◀───────────────────┘
```

### 5.2 Predictive Search Component

```javascript
// assets/component-predictive-search.js
class PredictiveSearch extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input[type="search"]');
    this.results = this.querySelector('[data-search-results]');
    this.status = this.querySelector('[data-search-status]');
    this.debounceTimer = null;
    this.abortController = null;
    this.minChars = 3;

    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      const query = this.input.value.trim();

      if (query.length < this.minChars) {
        this.clearResults();
        return;
      }

      this.debounceTimer = setTimeout(() => this.search(query), 300);
    });

    this.input.addEventListener('focus', () => {
      if (this.results.innerHTML.trim()) {
        this.showResults();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) this.hideResults();
    });

    // Close on Escape
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideResults();
        this.input.blur();
      }
      // Arrow key navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.focusNextResult();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.focusPrevResult();
      }
    });
  }

  async search(query) {
    // Cancel previous request
    this.abortController?.abort();
    this.abortController = new AbortController();

    this.setStatus('Searching...');
    this.results.classList.add('search-results--loading');

    try {
      const res = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,article,page&resources[limit]=6`,
        { signal: this.abortController.signal }
      );
      const data = await res.json();
      this.renderResults(data.resources.results, query);
    } catch (err) {
      if (err.name !== 'AbortError') {
        this.setStatus('Search failed. Please try again.');
      }
    }
  }

  renderResults(results, query) {
    const { products = [], articles = [], pages = [] } = results;
    const total = products.length + articles.length + pages.length;

    if (total === 0) {
      this.results.innerHTML = `
        <div class="search-results__empty">
          <p>No results for "${this.escapeHtml(query)}"</p>
          <p>Try a different search term</p>
        </div>`;
      this.setStatus(`No results found for ${query}`);
      this.showResults();
      return;
    }

    let html = '';

    if (products.length) {
      html += '<div class="search-results__group"><h3>Products</h3>';
      products.forEach(product => {
        const image = product.image ? `<img src="${product.image}" width="60" height="60" alt="" loading="lazy">` : '';
        html += `
          <a href="${product.url}" class="search-result search-result--product">
            ${image}
            <div>
              <span class="search-result__title">${product.title}</span>
              <span class="search-result__price">${this.formatMoney(product.price_min)}</span>
            </div>
          </a>`;
      });
      html += '</div>';
    }

    if (articles.length) {
      html += '<div class="search-results__group"><h3>Articles</h3>';
      articles.forEach(article => {
        html += `
          <a href="${article.url}" class="search-result">
            <span class="search-result__title">${article.title}</span>
          </a>`;
      });
      html += '</div>';
    }

    html += `<a href="/search?q=${encodeURIComponent(query)}" class="search-results__view-all">View all results</a>`;

    this.results.innerHTML = html;
    this.setStatus(`${total} results found for ${query}`);
    this.showResults();
  }

  showResults() { this.results.hidden = false; }
  hideResults() { this.results.hidden = true; }
  clearResults() { this.results.innerHTML = ''; this.hideResults(); }

  setStatus(text) {
    if (this.status) this.status.textContent = text;
  }

  focusNextResult() {
    const items = this.results.querySelectorAll('a');
    const current = this.results.querySelector('a:focus');
    const index = current ? [...items].indexOf(current) : -1;
    items[index + 1]?.focus();
  }

  focusPrevResult() {
    const items = this.results.querySelectorAll('a');
    const current = this.results.querySelector('a:focus');
    const index = current ? [...items].indexOf(current) : items.length;
    if (index > 0) items[index - 1]?.focus();
    else this.input.focus();
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD'
    }).format(cents / 100);
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

customElements.define('predictive-search', PredictiveSearch);
```

---

## System 6: Product Tabs

### 6.1 Component

```javascript
// assets/component-tabs.js
class ProductTabs extends HTMLElement {
  constructor() {
    super();
    this.tabs = this.querySelectorAll('[role="tab"]');
    this.panels = this.querySelectorAll('[role="tabpanel"]');

    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.selectTab(tab));
      tab.addEventListener('keydown', (e) => this.handleKeydown(e));
    });
  }

  selectTab(selectedTab) {
    const targetId = selectedTab.getAttribute('aria-controls');

    this.tabs.forEach(tab => {
      const isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', isSelected);
      tab.tabIndex = isSelected ? 0 : -1;
    });

    this.panels.forEach(panel => {
      panel.hidden = panel.id !== targetId;
    });
  }

  handleKeydown(e) {
    const tabArray = [...this.tabs];
    const currentIndex = tabArray.indexOf(e.target);
    let newIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % tabArray.length;
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabArray.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    tabArray[newIndex].focus();
    this.selectTab(tabArray[newIndex]);
  }
}

customElements.define('product-tabs', ProductTabs);
```

---

## System 7: FAQ Accordion

### 7.1 Component

```javascript
// assets/component-accordion.js
class AccordionGroup extends HTMLElement {
  constructor() {
    super();
    this.allowMultiple = this.hasAttribute('data-allow-multiple');
    this.items = this.querySelectorAll('details');

    if (!this.allowMultiple) {
      this.items.forEach(item => {
        item.addEventListener('toggle', () => {
          if (item.open) {
            this.items.forEach(other => {
              if (other !== item) other.removeAttribute('open');
            });
          }
        });
      });
    }
  }
}

customElements.define('accordion-group', AccordionGroup);
```

**Liquid structure:**

```liquid
{%- comment -%} Uses native <details>/<summary> for no-JS support {%- endcomment -%}
<accordion-group class="faq-accordion">
  {%- for block in section.blocks -%}
    <details class="accordion__item" {{ block.shopify_attributes }}>
      <summary class="accordion__trigger">
        <span>{{ block.settings.question }}</span>
        {% render 'icon', name: 'chevron-down' %}
      </summary>
      <div class="accordion__content">
        {{ block.settings.answer }}
      </div>
    </details>
  {%- endfor -%}
</accordion-group>
```

---

## System 8: Newsletter Signup

### 8.1 State Machine

```
IDLE → SUBMITTING → SUCCESS | ERROR
                         │
                    ERROR → IDLE (user corrects)
```

### 8.2 Component

```javascript
// assets/component-newsletter.js
class NewsletterForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.input = this.querySelector('input[type="email"]');
    this.button = this.querySelector('button[type="submit"]');
    this.message = this.querySelector('[data-form-message]');

    this.form?.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const email = this.input.value.trim();
    if (!email || !email.includes('@')) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // State: SUBMITTING
    this.button.disabled = true;
    this.button.textContent = 'Subscribing...';

    try {
      // Shopify customer form submission
      const formData = new FormData(this.form);
      const res = await fetch('/contact#newsletter', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok || res.redirected) {
        // State: SUCCESS
        this.showMessage('Thank you! Check your inbox for a welcome email.', 'success');
        this.input.value = '';
        this.form.classList.add('form--success');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (err) {
      // State: ERROR
      this.showMessage('Something went wrong. Please try again.', 'error');
    } finally {
      this.button.disabled = false;
      this.button.textContent = 'Subscribe';
    }
  }

  showMessage(text, type) {
    this.message.textContent = text;
    this.message.className = `form-message form-message--${type}`;
    this.message.hidden = false;
    this.message.setAttribute('role', 'alert');
  }
}

customElements.define('newsletter-form', NewsletterForm);
```

---

## System 9: Before/After Slider

### 9.1 Component

```javascript
// assets/component-before-after.js
class BeforeAfterSlider extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[data-slider]');
    this.beforeImage = this.querySelector('[data-before]');
    this.handle = this.querySelector('[data-handle]');
    this.isDragging = false;

    this.bindEvents();
  }

  bindEvents() {
    // Mouse
    this.handle.addEventListener('mousedown', () => this.startDrag());
    document.addEventListener('mousemove', (e) => this.onDrag(e));
    document.addEventListener('mouseup', () => this.stopDrag());

    // Touch
    this.handle.addEventListener('touchstart', () => this.startDrag(), { passive: true });
    document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: false });
    document.addEventListener('touchend', () => this.stopDrag());

    // Keyboard
    this.handle.addEventListener('keydown', (e) => {
      const step = 2; // percent
      if (e.key === 'ArrowLeft') this.setPosition(this.position - step);
      if (e.key === 'ArrowRight') this.setPosition(this.position + step);
    });

    this.position = 50;
    this.setPosition(50);
  }

  startDrag() {
    this.isDragging = true;
    this.classList.add('slider--dragging');
  }

  stopDrag() {
    this.isDragging = false;
    this.classList.remove('slider--dragging');
  }

  onDrag(e) {
    if (!this.isDragging) return;
    e.preventDefault();

    const rect = this.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.setPosition(percent);
  }

  setPosition(percent) {
    this.position = Math.max(0, Math.min(100, percent));
    this.beforeImage.style.clipPath = `inset(0 ${100 - this.position}% 0 0)`;
    this.handle.style.left = `${this.position}%`;
    this.handle.setAttribute('aria-valuenow', Math.round(this.position));
  }
}

customElements.define('before-after-slider', BeforeAfterSlider);
```

---

## System 10: Announcement Bar

### 10.1 Component

```javascript
// assets/component-announcement.js
class AnnouncementBar extends HTMLElement {
  constructor() {
    super();
    this.dismissBtn = this.querySelector('[data-dismiss]');
    this.storageKey = 'ezhome-announcement-dismissed';
    this.messageId = this.dataset.messageId || 'default';

    // Check if already dismissed
    if (sessionStorage.getItem(this.storageKey) === this.messageId) {
      this.remove();
      return;
    }

    this.dismissBtn?.addEventListener('click', () => {
      sessionStorage.setItem(this.storageKey, this.messageId);
      this.classList.add('announcement--dismissing');
      this.addEventListener('transitionend', () => this.remove());
    });
  }
}

customElements.define('announcement-bar', AnnouncementBar);
```

---

## Accessibility Patterns

### Focus Management

| Component         | Focus Behavior                                              |
|------------------|-------------------------------------------------------------|
| Cart drawer       | Trap focus when open; restore on close                      |
| Mobile menu       | Trap focus when open; restore on close                      |
| Modal / lightbox  | Trap focus when open; restore on close                      |
| Predictive search | Arrow keys navigate results; Escape closes                  |
| Product tabs      | Arrow keys switch tabs; Tab moves to panel content          |
| Accordion         | `<details>/<summary>` native keyboard support               |
| Variant picker    | `aria-pressed` on active option                             |
| Quantity selector  | Min/max announced via `aria-valuemin`/`aria-valuemax`      |

### ARIA Patterns

| Component         | ARIA Pattern          |
|------------------|-----------------------|
| Cart drawer       | `role="dialog"` + `aria-modal="true"` |
| Tabs              | `role="tablist/tab/tabpanel"` |
| Accordion         | Native `<details>/<summary>` |
| Search results    | `role="listbox"` + `role="option"` |
| Loading states    | `aria-busy="true"` on containers |
| Cart count        | `aria-live="polite"` for count updates |
| Form messages     | `role="alert"` for success/error |

---

## Error Handling

| Error Scenario                | User Feedback                              | Recovery                              |
|------------------------------|-------------------------------------------|---------------------------------------|
| Add to cart fails (network)   | "Error — Try Again" on button             | Button re-enables after 3s            |
| Add to cart fails (sold out)  | "Sold Out" on button                      | Variant picker marks unavailable      |
| Cart update fails             | Line item shows error state               | Retry on next interaction             |
| Search API fails              | "Search failed. Please try again."        | User retypes to retry                 |
| Section rendering fails       | Silent fallback — full page reload        | `window.location.reload()`            |
| Newsletter signup fails       | "Something went wrong. Please try again." | Form remains editable                 |
| Image load fails              | Placeholder shown via CSS `background`    | —                                     |

---

## Loading States

| Component          | Loading Indicator                                    |
|-------------------|------------------------------------------------------|
| Add to cart button | Text changes to "Adding..." + spinner class          |
| Cart drawer        | Line items get `opacity: 0.5`                        |
| Product card       | Quick add button shows "Adding..."                   |
| Search results     | "Searching..." status text + skeleton pulse          |
| Newsletter         | Button shows "Subscribing..."                        |
| Collection filter  | Product grid gets `opacity: 0.5` overlay             |
| Page navigation    | NProgress-style top bar (optional)                   |

---

## Revision Log

| Version | Date       | Changes                                     |
|---------|-----------|---------------------------------------------|
| 1.0     | 2025-02-18 | Complete Shopify rewrite (was Next.js/React) |
