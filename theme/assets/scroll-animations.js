/* ===================================================================
   EzHome — Scroll Animations
   IntersectionObserver-based reveal animations
   =================================================================== */

(function() {
  'use strict';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  function init() {
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-observe after Shopify section rendering updates
  if (window.Shopify?.designMode) {
    document.addEventListener('shopify:section:load', init);
  }
})();
