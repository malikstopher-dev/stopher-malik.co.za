/* ==========================================================================
   SMK Web Design — Darko-Inspired Application
   ========================================================================== */

(function() {
  'use strict';

  /* --------------------------------------------------------------------------
     NAVIGATION
     -------------------------------------------------------------------------- */

  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Mobile menu
  if (menuBtn && mobileMenu) {
    let lastFocused = null;

    function closeMenu() {
      menuBtn.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
      if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    }

    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        lastFocused = document.activeElement;
        const firstLink = mobileMenu.querySelector('.mobile-menu__link');
        if (firstLink) firstLink.focus();
      } else if (lastFocused && document.contains(lastFocused)) {
        lastFocused.focus();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuBtn.classList.contains('is-open')) {
        closeMenu();
      }
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* --------------------------------------------------------------------------
     SCROLL REVEAL
     -------------------------------------------------------------------------- */

  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     TESTIMONIALS CAROUSEL
     -------------------------------------------------------------------------- */

  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('testimonialsPrev');
  const nextBtn = document.getElementById('testimonialsNext');

  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = track.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;

    function getVisibleSlides() {
      return window.innerWidth >= 768 ? 2 : 1;
    }

    function updateCarousel() {
      const visibleSlides = getVisibleSlides();
      const maxSlide = Math.max(0, totalSlides - visibleSlides);
      currentSlide = Math.min(currentSlide, maxSlide);

      const slideWidth = 100 / visibleSlides;
      track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    }

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      const visibleSlides = getVisibleSlides();
      const maxSlide = Math.max(0, totalSlides - visibleSlides);
      if (currentSlide < maxSlide) {
        currentSlide++;
        updateCarousel();
      }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  /* --------------------------------------------------------------------------
     3D TILT CARDS — mouse-tracked perspective + light sheen
     -------------------------------------------------------------------------- */

  const tiltCards = document.querySelectorAll('[data-tilt]');

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isReducedMotion && tiltCards.length) {
    const MAX_TILT = 10;

    tiltCards.forEach(card => {
      let rafId = null;

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rx = (-dy * MAX_TILT).toFixed(2);
          const ry = (dx * MAX_TILT).toFixed(2);
          card.style.transform =
            `perspective(var(--perspective-md)) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0) scale(var(--tilt-scale, 1.025))`;
          card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
          card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
        });
      };

      const onLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* --------------------------------------------------------------------------
     BUTTON LIGHT FOLLOW
     -------------------------------------------------------------------------- */

  const litButtons = document.querySelectorAll('.btn');
  if (!isReducedMotion) {
    litButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--btn-mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
        btn.style.setProperty('--btn-my', ((e.clientY - rect.top) / rect.height * 100) + '%');
      });
    });
  }

  /* --------------------------------------------------------------------------
     HERO CARD SPOTLIGHT + GLOBE TILT
     -------------------------------------------------------------------------- */

  const heroCard = document.querySelector('.hero__card');
  if (heroCard && !isReducedMotion) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      heroCard.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      heroCard.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  }

  const globe = document.querySelector('.hero__globe');
  if (globe && !isReducedMotion) {
    const globeParent = globe.closest('.hero__location-card') || globe.parentElement;
    globeParent.addEventListener('mousemove', (e) => {
      const rect = globeParent.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      globe.style.transform =
        `perspective(var(--perspective-md)) rotateY(${dx * 20}deg) rotateX(${-dy * 14 + 6}deg)`;
    });
    globeParent.addEventListener('mouseleave', () => {
      globe.style.transform = `perspective(var(--perspective-md)) rotateY(-8deg) rotateX(5deg)`;
    });

    /* -- Darko-style dotted globe on canvas -- */
    const canvas = globe.querySelector('.hero__globe-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const isSmall = window.innerWidth < 480;
      const scale = isSmall ? 0.75 : 1;
      const W = canvas.width * scale, H = canvas.height * scale;
      canvas.style.width = (canvas.width * scale / dpr) + 'px';
      canvas.style.height = (canvas.height * scale / dpr) + 'px';
      canvas.width = canvas.width * scale;
      canvas.height = canvas.height * scale;
      const cx = W / 2, cy = H / 2;
      const R = 155 * scale;
      const dotSpacing = isSmall ? 8 : 7;
      let rotY = 0;
      let running = true;

      // Stop drawing when offscreen (battery save on mobile)
      const io = new IntersectionObserver(([entry]) => {
        running = entry.isIntersecting;
        if (running) drawGlobe();
      }, { threshold: 0 });
      io.observe(canvas);

      function drawGlobe() {
        if (!running) return;
        ctx.clearRect(0, 0, W, H);

        const glowOuter = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.3);
        glowOuter.addColorStop(0, 'rgba(100, 60, 220, 0.12)');
        glowOuter.addColorStop(0.4, 'rgba(80, 50, 200, 0.06)');
        glowOuter.addColorStop(0.7, 'rgba(60, 40, 180, 0.03)');
        glowOuter.addColorStop(1, 'transparent');
        ctx.fillStyle = glowOuter;
        ctx.fillRect(0, 0, W, H);

        const sphereGrad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, 0, cx, cy, R);
        sphereGrad.addColorStop(0, 'rgba(60, 40, 140, 0.08)');
        sphereGrad.addColorStop(1, 'rgba(20, 10, 60, 0.02)');
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.fill();

        for (let lat = -85; lat <= 85; lat += dotSpacing) {
          const latRad = lat * Math.PI / 180;
          const y = cy + R * Math.sin(latRad);
          const ringR = R * Math.cos(latRad);
          const circumference = 2 * Math.PI * ringR;
          const dots = Math.max(1, Math.round(circumference / dotSpacing));

          for (let i = 0; i < dots; i++) {
            const angle = (i / dots) * 2 * Math.PI + rotY;
            const x = cx + ringR * Math.cos(angle);
            const z = Math.sin(angle);

            if (z < -0.1) continue;

            const alpha = 0.2 + z * 0.45;
            const size = (1.0 + z * 0.9) * scale;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
          }
        }

        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(120, 90, 255, 0.15)';
        ctx.lineWidth = 1.5 * scale;
        ctx.stroke();

        rotY += 0.004;
        requestAnimationFrame(drawGlobe);
      }

      drawGlobe();
    }
  }

  /* --------------------------------------------------------------------------
     SMOOTH SCROLL
     -------------------------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------------------------
     ACTIVE NAV LINK
     -------------------------------------------------------------------------- */

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));

  /* --------------------------------------------------------------------------
     FLOATING NAV — AUTO-HIGHLIGHT CURRENT PAGE
     -------------------------------------------------------------------------- */

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.floating-nav__item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      document.querySelectorAll('.floating-nav__item--active').forEach(active => {
        active.classList.remove('floating-nav__item--active');
      });
      link.classList.add('floating-nav__item--active');
    }
  });

  /* --------------------------------------------------------------------------
     CONTACT FORM
     -------------------------------------------------------------------------- */

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.className = 'toast is-visible' + (type ? ` toast--${type}` : '');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     GODLY PREMIUM — Magnetic Card Attraction
     -------------------------------------------------------------------------- */

  if (!isReducedMotion) {
    document.querySelectorAll('.card[data-magnetic]').forEach(card => {
      let raf = null;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = ((e.clientX - cx) / (rect.width / 2)) * 10;
        const dy = ((e.clientY - cy) / (rect.height / 2)) * 10;

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
          card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
          card.style.transform = `perspective(var(--perspective-md)) translate(${dx}px, ${dy}px) rotateY(${dx * 0.4}deg) rotateX(${-dy * 0.4}deg)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     GODLY PREMIUM — Holo Sheen Tracking (data-holo)
     -------------------------------------------------------------------------- */

  if (!isReducedMotion) {
    document.querySelectorAll('.card[data-holo]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
      });
    });
  }

  /* --------------------------------------------------------------------------
     GODLY PREMIUM — Particle Burst on hover (data-particles)
     -------------------------------------------------------------------------- */

  if (!isReducedMotion) {
    document.querySelectorAll('[data-particles]').forEach(card => {
      card.addEventListener('mouseenter', function burstParticles() {
        const existing = this.querySelector('.card__particles');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'card__particles';
        container.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit;z-index:3;';

        const colors = ['#22c55e', '#06b6d4', '#8b5cf6', '#fbbf24', '#fafafa'];
        const size = 3 + Math.random() * 4;

        for (let i = 0; i < 10; i++) {
          const p = document.createElement('span');
          const angle = Math.random() * Math.PI * 2;
          const dist = 40 + Math.random() * 60;
          const tx = Math.cos(angle) * dist;
          const ty = Math.sin(angle) * dist;

          p.style.cssText = `
            position:absolute;width:${size}px;height:${size}px;
            background:${colors[i % colors.length]};
            border-radius:50%;
            left:50%;top:50%;
            transform:translate(-50%,-50%);
            opacity:0;
            animation:particle-burst 0.8s ease-out forwards;
            animation-delay:${i * 0.025}s;
            --tx:${tx}px;--ty:${ty}px;
          `;
          container.appendChild(p);
        }

        this.appendChild(container);
        setTimeout(() => container.remove(), 1000);
      }, { once: false });
    });
  }

  /* --------------------------------------------------------------------------
     GODLY PREMIUM — Book Grid staggered entrance
     -------------------------------------------------------------------------- */

  const bookGrids = document.querySelectorAll('[data-book]');
  bookGrids.forEach(grid => {
    if ('requestAnimationFrame' in window) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          grid.classList.add('is-loaded');
        });
      });
    } else {
      grid.classList.add('is-loaded');
    }
  });

  /* --------------------------------------------------------------------------
     PARTICLE BURST KEYFRAME (injected once)
     -------------------------------------------------------------------------- */

  if (!document.getElementById('particle-keyframe-style')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframe-style';
    style.textContent = `
      @keyframes particle-burst {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); }
      }
    `;
    document.head.appendChild(style);
  }

})();
