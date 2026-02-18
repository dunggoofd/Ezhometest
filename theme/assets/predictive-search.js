/* ===================================================================
   EzHome — Predictive Search
   Search-as-you-type via Shopify's predictive search API
   =================================================================== */

class PredictiveSearch extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input[type="search"]');
    this.results = this.querySelector('[data-search-results]');
    this.debounceTimer = null;
    this.abortController = null;
  }

  connectedCallback() {
    this.input?.addEventListener('input', () => this.debounce());
    this.input?.addEventListener('focus', () => {
      if (this.input.value.length >= 2) this.search(this.input.value);
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) this.closeResults();
    });

    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeResults();
        this.input.blur();
      }
    });
  }

  debounce() {
    clearTimeout(this.debounceTimer);
    const query = this.input.value.trim();

    if (query.length < 2) {
      this.closeResults();
      return;
    }

    this.debounceTimer = setTimeout(() => this.search(query), 300);
  }

  async search(query) {
    if (this.abortController) this.abortController.abort();
    this.abortController = new AbortController();

    try {
      const url = `${window.EzHome.routes.predictive_search_url}?q=${encodeURIComponent(query)}&resources[type]=product,page,article&resources[limit]=6&section_id=predictive-search`;
      const response = await fetch(url, { signal: this.abortController.signal });

      if (!response.ok) return;
      const text = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const resultsHtml = doc.querySelector('#shopify-section-predictive-search')?.innerHTML;

      if (resultsHtml && this.results) {
        this.results.innerHTML = resultsHtml;
        this.openResults();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Predictive search failed:', err);
      }
    }
  }

  openResults() {
    this.results?.classList.add('is-active');
    this.setAttribute('open', '');
  }

  closeResults() {
    this.results?.classList.remove('is-active');
    this.removeAttribute('open');
  }
}

customElements.define('predictive-search', PredictiveSearch);
