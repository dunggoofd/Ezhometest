/* ===================================================================
   EzHome — Product Form Component
   Variant picker, price update, image swap, add-to-cart
   =================================================================== */

class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.variantData = JSON.parse(this.querySelector('[data-variant-json]')?.textContent || '[]');
    this.selectedOptions = {};
    this.currentVariant = null;

    this.bindEvents();
    this.initFromUrl();
  }

  bindEvents() {
    /* Option buttons (swatch / pill) */
    this.querySelectorAll('[data-option-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const el = e.currentTarget;
        const option = el.dataset.optionName;
        const value = el.dataset.optionValue;
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
          if (optionName) this.selectOption(optionName, value, false);
        });
      }
    } else {
      const first = this.variantData.find(v => v.available) || this.variantData[0];
      if (first) {
        first.options.forEach((value, index) => {
          const optionName = this.dataset[`option${index + 1}Name`];
          if (optionName) this.selectOption(optionName, value, false);
        });
      }
    }
    this.updateVariant();
  }

  selectOption(option, value, update = true) {
    this.selectedOptions[option] = value;

    /* Update button active states */
    this.querySelectorAll(`[data-option-name="${option}"]`).forEach(btn => {
      const isMatch = btn.dataset.optionValue === value;
      btn.classList.toggle('option-btn--active', isMatch);
      btn.setAttribute('aria-pressed', isMatch);
    });

    /* Update the legend "— selected value" text */
    const fieldset = this.querySelector(`[data-option-name="${option}"]`)?.closest('fieldset');
    const legendSpan = fieldset?.querySelector('.color-secondary');
    if (legendSpan) legendSpan.textContent = `— ${value}`;

    if (update) this.updateVariant();
  }

  updateVariant() {
    const selectedValues = Object.values(this.selectedOptions);
    this.currentVariant = this.variantData.find(v =>
      v.options.every((opt, i) => opt === selectedValues[i])
    );

    if (!this.currentVariant) return;

    this.updatePrice();
    this.updateAvailability();
    this.updateMedia();
    this.updateUrl();
    this.updateHiddenInputs();

    window.EzHome?.events?.emit('variant:changed', {
      variant: this.currentVariant,
      product: this.dataset.productId
    });
  }

  updateHiddenInputs() {
    /* Update the hidden <select> and the hidden <input name="id"> inside add-to-cart */
    const select = this.querySelector('[data-variant-select]');
    if (select) select.value = this.currentVariant.id;

    const section = this.closest('.main-product');
    const idInput = section?.querySelector('add-to-cart input[name="id"]');
    if (idInput) idInput.value = this.currentVariant.id;
  }

  updatePrice() {
    const section = this.closest('.main-product');
    if (!section) return;

    const priceEl = section.querySelector('[data-price-current]');
    const compareEl = section.querySelector('[data-price-compare]');
    const badgeEl = section.querySelector('[data-price-badge]');
    const { price, compare_at_price } = this.currentVariant;

    if (priceEl) priceEl.textContent = window.EzHome.formatMoney(price);

    if (compare_at_price && compare_at_price > price) {
      if (compareEl) {
        compareEl.textContent = window.EzHome.formatMoney(compare_at_price);
        compareEl.hidden = false;
      }
      if (badgeEl) {
        const savings = Math.round((1 - price / compare_at_price) * 100);
        badgeEl.textContent = `Save ${savings}%`;
        badgeEl.hidden = false;
      }
    } else {
      if (compareEl) compareEl.hidden = true;
      if (badgeEl) badgeEl.hidden = true;
    }

    /* Also update the button price text */
    const btnText = section.querySelector('[data-add-to-cart-text]');
    const addBtn = section.querySelector('[data-add-to-cart]');
    if (btnText && addBtn && !addBtn.disabled) {
      btnText.textContent = `Add to Cart — ${window.EzHome.formatMoney(price)}`;
    }
  }

  updateAvailability() {
    const section = this.closest('.main-product');
    if (!section) return;

    const addBtn = section.querySelector('[data-add-to-cart]');
    const btnText = section.querySelector('[data-add-to-cart-text]');

    if (this.currentVariant.available) {
      if (addBtn) addBtn.disabled = false;
      if (btnText) btnText.textContent = `Add to Cart — ${window.EzHome.formatMoney(this.currentVariant.price)}`;
    } else {
      if (addBtn) addBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sold Out';
    }
  }

  updateMedia() {
    const featuredImage = this.currentVariant.featured_image;
    if (featuredImage) {
      window.EzHome?.events?.emit('media:select', {
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
}

customElements.define('product-form', ProductForm);

/* ─────────────────────────────────────────────
   Add to Cart Component
   ───────────────────────────────────────────── */
class AddToCart extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.button = this.querySelector('[data-add-to-cart]');
    this.buttonText = this.querySelector('[data-add-to-cart-text]');

    this.form?.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.button || this.button.disabled) return;

    this.button.disabled = true;
    this.button.classList.add('btn--loading');
    const originalText = this.buttonText?.textContent;
    if (this.buttonText) this.buttonText.textContent = 'Adding...';

    const formData = new FormData(this.form);
    const variantId = parseInt(formData.get('id'));
    const quantity = parseInt(formData.get('quantity') || 1);

    const success = await window.EzHome.cart.addItem(variantId, quantity);

    if (success) {
      if (this.buttonText) this.buttonText.textContent = '✓ Added';
      this.button.classList.remove('btn--loading');
      this.button.classList.add('btn--success');

      window.EzHome.events.emit('cart:drawer:open');
      window.EzHome.events.emit('cart:updated');

      setTimeout(() => {
        if (this.buttonText) this.buttonText.textContent = originalText;
        this.button.classList.remove('btn--success');
        this.button.disabled = false;
      }, 2000);
    } else {
      if (this.buttonText) this.buttonText.textContent = 'Error — Try Again';
      this.button.classList.remove('btn--loading');
      this.button.classList.add('btn--error');

      setTimeout(() => {
        if (this.buttonText) this.buttonText.textContent = originalText;
        this.button.classList.remove('btn--error');
        this.button.disabled = false;
      }, 3000);
    }
  }
}

customElements.define('add-to-cart', AddToCart);

/* ─────────────────────────────────────────────
   Media Gallery Component
   ───────────────────────────────────────────── */
class MediaGallery extends HTMLElement {
  constructor() {
    super();
    this.mainImage = this.querySelector('[data-main-image]');
    this.thumbnails = this.querySelectorAll('[data-thumbnail]');
    this.currentIndex = 0;
    this.bindEvents();
  }

  bindEvents() {
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => this.selectImage(index));
    });

    /* Swipe on main image */
    const mainArea = this.querySelector('.main-product__media-main');
    let startX = 0;
    mainArea?.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    mainArea?.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }, { passive: true });

    this.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    /* Listen for variant image changes */
    window.EzHome?.events?.on('media:select', ({ mediaId, src }) => {
      const index = [...this.thumbnails].findIndex(t => t.dataset.mediaId === String(mediaId));
      if (index >= 0) {
        this.selectImage(index);
      } else if (src && this.mainImage) {
        /* Fallback: directly set the src from variant data */
        this.mainImage.src = src;
      }
    });
  }

  selectImage(index) {
    if (index < 0 || index >= this.thumbnails.length) return;

    this.currentIndex = index;
    const thumb = this.thumbnails[index];
    const src = thumb.dataset.fullSrc;
    const srcset = thumb.dataset.fullSrcset;

    if (this.mainImage) {
      if (src) this.mainImage.src = src;
      if (srcset) this.mainImage.srcset = srcset;
    }

    this.thumbnails.forEach(t => {
      t.classList.toggle('thumbnail--active', t === thumb);
      t.setAttribute('aria-current', t === thumb ? 'true' : 'false');
    });
  }

  next() {
    if (this.thumbnails.length === 0) return;
    const nextIndex = (this.currentIndex + 1) % this.thumbnails.length;
    this.selectImage(nextIndex);
  }

  prev() {
    if (this.thumbnails.length === 0) return;
    const prevIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
    this.selectImage(prevIndex);
  }
}

customElements.define('media-gallery', MediaGallery);

/* ─────────────────────────────────────────────
   Quantity Selector Component
   ───────────────────────────────────────────── */
class QuantitySelector extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input[type="number"]');
    this.decrementBtn = this.querySelector('[data-decrement], [data-quantity-minus]');
    this.incrementBtn = this.querySelector('[data-increment], [data-quantity-plus]');
    this.min = parseInt(this.input?.min) || 1;
    this.max = parseInt(this.input?.max) || 99;

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
    if (this.decrementBtn) this.decrementBtn.disabled = value <= this.min;
    if (this.incrementBtn) this.incrementBtn.disabled = value >= this.max;
  }
}

customElements.define('quantity-selector', QuantitySelector);
