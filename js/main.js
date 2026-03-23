/* ═══════════════════════════════════════════════════
   ASPHALT SEALCOAT SERVICE — Main JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navigation scroll effect ──
  const nav = document.querySelector('.nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Mobile menu toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  // ── Scroll animations (Intersection Observer) ──
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Contact form handling ──
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.phone || !data.service) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // In production, this would POST to a service like Formspree, Netlify Forms, or a custom endpoint.
      // For GitHub Pages, use https://formspree.io or similar.
      // Replace the action URL below with your Formspree endpoint.

      const formAction = form.getAttribute('action');
      if (formAction && formAction !== '#') {
        fetch(formAction, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        })
        .then(response => {
          if (response.ok) {
            showFormMessage('Thank you! Rob will call you personally to discuss your project and schedule your free on-site estimate.', 'success');
            form.reset();
          } else {
            showFormMessage('Something went wrong. Please call (209) 223-2906 directly.', 'error');
          }
        })
        .catch(() => {
          showFormMessage('Something went wrong. Please call (209) 223-2906 directly.', 'error');
        });
      } else {
        // Demo mode — no backend configured yet
        showFormMessage('Thank you! Rob will call you personally to discuss your project and schedule your free on-site estimate.', 'success');
        form.reset();
      }
    });
  }

  function showFormMessage(msg, type) {
    let el = document.getElementById('form-message');
    if (!el) {
      el = document.createElement('div');
      el.id = 'form-message';
      form.parentNode.insertBefore(el, form.nextSibling);
    }
    el.textContent = msg;
    el.style.cssText = `
      margin-top: 16px;
      padding: 16px 20px;
      font-family: var(--font-body);
      font-size: 0.95rem;
      font-weight: 600;
      background: ${type === 'success' ? 'rgba(200,160,74,0.12)' : 'rgba(200,60,60,0.1)'};
      border-left: 4px solid ${type === 'success' ? '#C8A04A' : '#CC4444'};
      color: ${type === 'success' ? '#2C2C2C' : '#CC4444'};
    `;

    // Auto-clear after 8 seconds
    setTimeout(() => { if (el) el.remove(); }, 8000);
  }

  // ── Active nav link highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? '#C8A04A' : '';
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Current year in footer ──
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Gallery Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox) {
    // Open lightbox on gallery image click
    document.querySelectorAll('.gallery-image-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const img = wrap.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;

          // Get caption from sibling gallery-caption
          const card = wrap.closest('.gallery-item');
          const captionEl = card ? card.querySelector('.gallery-caption h3') : null;
          lightboxCaption.textContent = captionEl ? captionEl.textContent : '';

          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close lightbox
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };

    lightboxClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
    lightbox.addEventListener('click', closeLightbox);
    lightboxImg.addEventListener('click', e => e.stopPropagation());

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

});
