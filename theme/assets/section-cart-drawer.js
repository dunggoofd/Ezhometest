/* ===================================================================
   EzHome — Cart Drawer Component
   =================================================================== */

class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.sectionId = this.dataset.sectionId;
  }

  connectedCallback() {
    this.overlay = this.querySelector('[data-drawer-overlay]');
    this.content = this.querySelector('[data-drawer-content]');
    this.closeBtn = this.querySelector('[data-drawer-close]');

    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    window.EzHome.events.on('cart:drawer:open', () => this.open());
    window.EzHome.events.on('cart:updated', () => this.refresh());

    document.querySelectorAll('[data-cart-trigger]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Delegated events for quantity and remove
    this.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) {
        e.preventDefault();
        const key = removeBtn.dataset.key;
        const item = removeBtn.closest('[data-cart-item]');
        if (item) this.removeItem(key, item);
      }

      const minusBtn = e.target.closest('[data-quantity-minus]');
      if (minusBtn) {
        const key = minusBtn.dataset.key;
        const input = minusBtn.parentElement.querySelector('[data-quantity-input]');
        const newQty = Math.max(0, parseInt(input.value) - 1);
        if (newQty === 0) {
          const item = minusBtn.closest('[data-cart-item]');
          this.removeItem(key, item);
        } else {
          this.updateQuantity(key, newQty);
        }
      }

      const plusBtn = e.target.closest('[data-quantity-plus]');
      if (plusBtn) {
        const key = plusBtn.dataset.key;
        const input = plusBtn.parentElement.querySelector('[data-quantity-input]');
        const newQty = parseInt(input.value) + 1;
        this.updateQuantity(key, newQty);
      }
    });

    this.addEventListener('change', (e) => {
      const input = e.target.closest('[data-quantity-input]');
      if (input) {
        const key = input.dataset.key;
        const qty = parseInt(input.value);
        if (qty >= 0) this.updateQuantity(key, qty);
      }
    });
  }

  open() {
    this.isOpen = true;
    this.setAttribute('open', '');
    document.body.classList.add('no-scroll');
    this.trapFocus();
    this.refresh();
  }

  close() {
    this.isOpen = false;
    this.removeAttribute('open');
    document.body.classList.remove('no-scroll');
    this.restoreFocus();
  }

  async refresh() {
    try {
      const data = await window.EzHome.sections.render(this.sectionId);
      const html = data[this.sectionId];
      if (html) {
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
    this.updateCartCount();
  }

  async updateQuantity(key, quantity) {
    const lineItem = this.querySelector(`[data-cart-item][data-key="${key}"]`);
    lineItem?.classList.add('cart-item--loading');

    await window.EzHome.cart.updateItem(key, quantity);
    await this.refresh();
    window.EzHome.events.emit('cart:updated');
  }

  async removeItem(key, element) {
    element?.classList.add('cart-item--removing');
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
    const focusable = this.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  restoreFocus() {
    this._previouslyFocused?.focus();
  }
}

customElements.define('cart-drawer', CartDrawer);
