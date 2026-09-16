/* ==========================================================================
   main.js — interactions & animations for Abdulhaq's portfolio
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Utilities
     --------------------------------------------------------------------- */

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  /* ---------------------------------------------------------------------
     Navbar: scroll shadow + active link + mobile toggle
     --------------------------------------------------------------------- */

  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');
  const backToTop = document.querySelector('.back-to-top');

  function onScroll() {
    const scrolled = window.scrollY > 12;
    navbar.classList.toggle('is-scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 600);

    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('is-active');
      navbar.classList.toggle('mobile-open');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('is-active');
      navbar.classList.remove('mobile-open');
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------------------
     Typing animation for hero role text
     --------------------------------------------------------------------- */

  const roleEl = document.querySelector('.hero-role');

  function getRoleList() {
    const lang = window.CURRENT_LANG || 'en';
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return [dict['hero.role1'], dict['hero.role2'], dict['hero.role3'], dict['hero.role4']].filter(Boolean);
  }

  let typingTimer = null;

  function runTyping() {
    if (!roleEl) return;
    clearTimeout(typingTimer);

    const roles = getRoleList();
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const word = roles[roleIndex] || '';

      if (!deleting) {
        charIndex++;
        roleEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          typingTimer = setTimeout(tick, 1800);
          return;
        }
        typingTimer = setTimeout(tick, 55);
      } else {
        charIndex--;
        roleEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          typingTimer = setTimeout(tick, 400);
          return;
        }
        typingTimer = setTimeout(tick, 28);
      }
    }

    tick();
  }

  document.addEventListener('DOMContentLoaded', runTyping);
  document.addEventListener('langchange', runTyping);

  /* ---------------------------------------------------------------------
     Scroll reveal (IntersectionObserver)
     --------------------------------------------------------------------- */

  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     Animated skill bars
     --------------------------------------------------------------------- */

  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-level');
        el.style.width = `${target}%`;
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach((el) => skillObserver.observe(el));

  /* ---------------------------------------------------------------------
     Animated counters
     --------------------------------------------------------------------- */

  const counters = document.querySelectorAll('[data-counter]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => counterObserver.observe(el));

  /* ---------------------------------------------------------------------
     Project filtering
     --------------------------------------------------------------------- */

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cats = (card.getAttribute('data-category') || '').split(' ');
        const match = filter === 'all' || cats.includes(filter);
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------------------------------------------------------------------
     Contact form — AJAX submit to Django, no page reload
     --------------------------------------------------------------------- */

  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    const statusEl = contactForm.querySelector('.form-status');
    const submitBtn = contactForm.querySelector('.btn-submit');

    function clearFieldErrors() {
      contactForm.querySelectorAll('.field').forEach((field) => {
        field.classList.remove('has-error');
        const errorEl = field.querySelector('.field-error');
        if (errorEl) errorEl.textContent = '';
      });
    }

    function showStatus(type, message) {
      statusEl.textContent = message;
      statusEl.className = `form-status is-visible ${type}`;
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFieldErrors();
      statusEl.className = 'form-status';

      const lang = window.CURRENT_LANG || 'en';
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      contactForm.classList.add('is-sending');
      submitBtn.setAttribute('disabled', 'true');

      try {
        const response = await fetch(contactForm.getAttribute('action'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showStatus('success', data.message || dict['contact.formSuccess']);
          contactForm.reset();
        } else if (data.errors) {
          Object.entries(data.errors).forEach(([fieldName, messages]) => {
            const field = contactForm.querySelector(`[data-field="${fieldName}"]`);
            if (field) {
              field.classList.add('has-error');
              const errorEl = field.querySelector('.field-error');
              if (errorEl) errorEl.textContent = Array.isArray(messages) ? (messages[0].message || messages[0]) : messages;
            }
          });
          showStatus('error', dict['contact.formError']);
        } else {
          showStatus('error', dict['contact.formError']);
        }
      } catch (err) {
        showStatus('error', dict['contact.formError']);
      } finally {
        contactForm.classList.remove('is-sending');
        submitBtn.removeAttribute('disabled');
      }
    });
  }

  /* ---------------------------------------------------------------------
     Subtle parallax for hero floating chips (mouse move)
     --------------------------------------------------------------------- */

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.matchMedia('(hover: hover)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroVisual.querySelectorAll('.float-chip').forEach((chip, i) => {
        const depth = (i + 1) * 6;
        chip.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.querySelectorAll('.float-chip').forEach((chip) => {
        chip.style.transform = '';
      });
    });
  }
})();
