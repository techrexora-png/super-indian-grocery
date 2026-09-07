/* ==========================================================================
   Super Indian Grocery — Site scripts
   Handles: sticky header, mobile nav + policies accordion, active nav state,
   scroll reveal animations, back-to-top button, contact form UX.
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileNav();
    initActiveNav();
    initScrollReveal();
    initBackToTop();
    initContactForm();
    initYear();
  });

  /* ---------------- Sticky header shadow on scroll ---------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- Mobile navigation + policies accordion ---------------- */
  function initMobileNav() {
    var toggle = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when a plain link is tapped
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Policies accordion inside mobile nav
    var accordionTrigger = document.querySelector('.mobile-accordion-trigger');
    var accordionPanel = document.querySelector('.mobile-accordion-panel');
    if (accordionTrigger && accordionPanel) {
      accordionTrigger.addEventListener('click', function () {
        var isOpen = accordionPanel.classList.toggle('is-open');
        accordionTrigger.classList.toggle('is-open', isOpen);
        accordionTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  }

  /* ---------------- Highlight active nav link ---------------- */
  function initActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list a[data-page], .mobile-nav a[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === path) {
        link.classList.add('active');
      }
    });
    // Highlight active policy link in sidebar
    document.querySelectorAll('.policy-nav a[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === path) {
        link.classList.add('active');
      }
    });
  }

  /* ---------------- Scroll reveal animations ---------------- */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- Back to top button ---------------- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 480) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Contact form (static site — ready for a form backend) ----------------
     This form does not submit to a live backend yet. To connect it, set the <form>'s
     action/method to your provider (e.g. Formspree, Netlify Forms) and remove/adapt
     the preventDefault demo handler below. */
  function initContactForm() {
    var form = document.querySelector('#enquiry-form');
    if (!form) return;
    var successMsg = document.querySelector('.form-success');

    form.addEventListener('submit', function (e) {
      // Demo-only handler: prevents an actual network request since no backend
      // is connected yet. Remove this once the form action points to a real
      // form service (Formspree / Netlify Forms / similar).
      if (form.getAttribute('data-demo') === 'true') {
        e.preventDefault();
        if (successMsg) {
          successMsg.classList.add('is-visible');
          successMsg.setAttribute('tabindex', '-1');
          successMsg.focus();
        }
        form.reset();
      }
    });
  }

  /* ---------------- Footer year ---------------- */
  function initYear() {
    var el = document.querySelector('#current-year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();
