/* ===================================================================
   EzHome — Collection Filters
   AJAX filtering + sort without full page reload
   =================================================================== */

class CollectionFilters extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form[data-filter-form]');
    this.grid = document.querySelector('[data-product-grid]');
    this.resultsCount = document.querySelector('[data-results-count]');
    this.activeFilters = document.querySelector('[data-active-filters]');
    this.sortSelect = this.querySelector('[data-sort-select]');

    this.form?.addEventListener('change', () => this.applyFilters());
    this.sortSelect?.addEventListener('change', () => this.applyFilters());

    // Handle filter removal via pills
    document.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-filter-remove]');
      if (removeBtn) {
        e.preventDefault();
        window.location.href = removeBtn.href;
      }
    });
  }

  async applyFilters() {
    const formData = new FormData(this.form);
    const params = new URLSearchParams(formData);

    if (this.sortSelect) {
      params.set('sort_by', this.sortSelect.value);
    }

    const url = `${window.location.pathname}?${params.toString()}`;

    // Update URL
    window.history.pushState({}, '', url);

    // Show loading state
    if (this.grid) this.grid.classList.add('is-loading');

    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Update grid
      const newGrid = doc.querySelector('[data-product-grid]');
      if (newGrid && this.grid) {
        this.grid.innerHTML = newGrid.innerHTML;
      }

      // Update count
      const newCount = doc.querySelector('[data-results-count]');
      if (newCount && this.resultsCount) {
        this.resultsCount.innerHTML = newCount.innerHTML;
      }

      // Update active filters
      const newActive = doc.querySelector('[data-active-filters]');
      if (this.activeFilters) {
        this.activeFilters.innerHTML = newActive ? newActive.innerHTML : '';
      }
    } catch (err) {
      console.error('Filter failed:', err);
      window.location.href = url;
    } finally {
      if (this.grid) this.grid.classList.remove('is-loading');
    }
  }
}

customElements.define('collection-filters', CollectionFilters);
