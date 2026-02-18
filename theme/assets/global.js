/* ===================================================================
   EzHome — Global JavaScript
   CartManager, SectionRenderer, EventBus, and global UI behaviors
   =================================================================== */

/* ─────────────────────────────────────────────
   Namespace
   ───────────────────────────────────────────── */
window.EzHome = window.EzHome || {};

/* ─────────────────────────────────────────────
   Event Bus
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Cart Manager
   ───────────────────────────────────────────── */
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

window.EzHome.cart = new CartManager();

/* ─────────────────────────────────────────────
   Section Rendering Helper
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Money Formatter
   ───────────────────────────────────────────── */
window.EzHome.formatMoney = function(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: window.Shopify?.currency?.active || 'USD'
  }).format(cents / 100);
};

/* ─────────────────────────────────────────────
   Sticky Header
   ───────────────────────────────────────────── */
class StickyHeader extends HTMLElement {
  constructor() {
    super();
    this.header = this;
    this.lastScrollY = 0;
    this.ticking = false;
  }

  connectedCallback() {
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  update() {
    const scrollY = window.scrollY;
    const threshold = parseInt(this.dataset.stickyThreshold) || 100;

    if (scrollY > threshold) {
      this.classList.add('header--sticky');

      if (scrollY > this.lastScrollY) {
        this.classList.add('header--hidden');
      } else {
        this.classList.remove('header--hidden');
      }
    } else {
      this.classList.remove('header--sticky', 'header--hidden');
    }

    this.lastScrollY = scrollY;
  }
}

customElements.define('sticky-header', StickyHeader);

/* ─────────────────────────────────────────────
   Mobile Drawer
   ───────────────────────────────────────────── */
class MobileDrawer extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    this.overlay = this.querySelector('[data-drawer-overlay]');
    this.closeBtn = this.querySelector('[data-drawer-close]');
    this.content = this.querySelector('[data-drawer-content]');

    document.querySelectorAll('[data-mobile-menu-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });

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
    document.body.classList.add('no-scroll');
    this.trapFocus();
  }

  close() {
    this.isOpen = false;
    this.removeAttribute('open');
    document.body.classList.remove('no-scroll');
    this.restoreFocus();
  }

  trapFocus() {
    this._previouslyFocused = document.activeElement;
    const focusable = this.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  restoreFocus() {
    this._previouslyFocused?.focus();
  }
}

customElements.define('mobile-drawer', MobileDrawer);

/* ─────────────────────────────────────────────
   Announcement Bar
   ───────────────────────────────────────────── */
class AnnouncementBar extends HTMLElement {
  connectedCallback() {
    this.messages = this.querySelectorAll('[data-announcement-message]');
    this.dismissBtn = this.querySelector('[data-announcement-dismiss]');
    this.autoRotate = this.dataset.autoRotate === 'true';
    this.speed = parseInt(this.dataset.rotateSpeed) || 5000;
    this.currentIndex = 0;
    this.timer = null;

    // Check if dismissed
    if (this.isDismissed()) {
      this.remove();
      return;
    }

    // Dismiss button
    this.dismissBtn?.addEventListener('click', () => this.dismiss());

    // Auto-rotate
    if (this.autoRotate && this.messages.length > 1) {
      this.startRotation();
    }
  }

  disconnectedCallback() {
    this.stopRotation();
  }

  startRotation() {
    this.timer = setInterval(() => this.next(), this.speed);
  }

  stopRotation() {
    if (this.timer) clearInterval(this.timer);
  }

  next() {
    this.messages[this.currentIndex].classList.remove('is-active');
    this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    this.messages[this.currentIndex].classList.add('is-active');
  }

  dismiss() {
    document.cookie = 'ezhome_announcement_dismissed=1; path=/; max-age=86400';
    this.style.height = this.offsetHeight + 'px';
    requestAnimationFrame(() => {
      this.style.height = '0';
      this.style.overflow = 'hidden';
      this.style.transition = 'height 300ms ease';
    });
    setTimeout(() => this.remove(), 300);
  }

  isDismissed() {
    return document.cookie.includes('ezhome_announcement_dismissed=1');
  }
}

customElements.define('announcement-bar', AnnouncementBar);

/* ─────────────────────────────────────────────
   Accordion
   ───────────────────────────────────────────── */
class AccordionGroup extends HTMLElement {
  connectedCallback() {
    this.items = this.querySelectorAll('[data-accordion-item]');
    this.allowMultiple = this.dataset.allowMultiple === 'true';

    this.items.forEach(item => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      trigger?.addEventListener('click', () => this.toggle(item));
    });
  }

  toggle(item) {
    const isOpen = item.hasAttribute('open');

    if (!this.allowMultiple) {
      this.items.forEach(i => {
        if (i !== item) this.closeItem(i);
      });
    }

    isOpen ? this.closeItem(item) : this.openItem(item);
  }

  openItem(item) {
    const content = item.querySelector('[data-accordion-content]');
    item.setAttribute('open', '');
    content.style.maxHeight = content.scrollHeight + 'px';
    const trigger = item.querySelector('[data-accordion-trigger]');
    trigger?.setAttribute('aria-expanded', 'true');
  }

  closeItem(item) {
    const content = item.querySelector('[data-accordion-content]');
    item.removeAttribute('open');
    content.style.maxHeight = '0';
    const trigger = item.querySelector('[data-accordion-trigger]');
    trigger?.setAttribute('aria-expanded', 'false');
  }
}

customElements.define('accordion-group', AccordionGroup);

/* ─────────────────────────────────────────────
   Product Card Quick Add
   ───────────────────────────────────────────── */
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-quick-add]');
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();

  const variantId = parseInt(btn.dataset.variantId);
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Adding...';

  const success = await window.EzHome.cart.addItem(variantId, 1);

  if (success) {
    btn.textContent = '✓ Added';
    window.EzHome.events.emit('cart:drawer:open');
    window.EzHome.events.emit('cart:updated');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 2000);
  } else {
    btn.textContent = 'Error';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 2000);
  }
});

/* ─────────────────────────────────────────────
   Initialize cart on page load
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  window.EzHome.cart.getCart();
});
