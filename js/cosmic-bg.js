'use strict';

/* ════════════════════════════════════════════════════════════════
   COSMIC BACKGROUND v3 — Canvas Star Engine + Planet Controller
   · 300 base stars with individual sine-wave flicker
   · Periodic star burst events (bright flare + scatter)
   · 4 planets with staggered fade-in and drift animations
   · Moon parallax via rAF-throttled scroll handler
   ════════════════════════════════════════════════════════════════ */

(function () {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas  = document.getElementById('cosmic-star-canvas');
  const moon    = document.getElementById('cosmic-moon');
  const planet1 = document.getElementById('planet-1');
  const planet2 = document.getElementById('planet-2');
  const planet3 = document.getElementById('planet-3');
  const planet4 = document.getElementById('planet-4');
  if (!canvas) return;

  /* ── Mobile/performance tier: fewer stars, zero glow gradients ──
     The hero frame-sequence canvas is the priority on small screens;
     the starfield must not compete for the compositor. */
  const IS_MOBILE_TIER = window.matchMedia('(max-width: 768px)').matches
    || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;

  /* ══════════════════════════════════════════════════════════════
     STAR CONFIGURATION — 3 depth layers
  ══════════════════════════════════════════════════════════════ */
  const STAR_CONFIG = IS_MOBILE_TIER
    ? [ /* mobile tier: ~90 flat stars, no per-star gradients */
      { count: 60, rMin: 0.4, rMax: 0.9,  opMin: 0.35, opMax: 0.72,
        flickerSpeed: [0.003, 0.009], scrollFactor: 0.02,
        glowChance: 0.0, glowScale: 0,
        colors: ['200,220,255', '220,240,255', '255,255,255'] },
      { count: 30, rMin: 0.9, rMax: 1.6,  opMin: 0.45, opMax: 0.88,
        flickerSpeed: [0.005, 0.013], scrollFactor: 0.05,
        glowChance: 0.0, glowScale: 0,
        colors: ['220,235,255', '255,255,255'] },
    ]
    : [
      { count: 160, rMin: 0.4, rMax: 0.9,  opMin: 0.35, opMax: 0.72,
      flickerSpeed: [0.003, 0.009], scrollFactor: 0.02,
      glowChance: 0.06, glowScale: 2.5,
      colors: ['200,220,255', '210,230,255', '220,240,255', '255,255,255'] },
    { count: 100, rMin: 0.9, rMax: 1.6,  opMin: 0.45, opMax: 0.88,
      flickerSpeed: [0.005, 0.013], scrollFactor: 0.05,
      glowChance: 0.18, glowScale: 3.5,
      colors: ['220,235,255', '200,220,255', '240,248,255', '255,255,255'] },
      { count: 40,  rMin: 1.6, rMax: 2.6,  opMin: 0.60, opMax: 0.95,
        flickerSpeed: [0.006, 0.018], scrollFactor: 0.10,
        glowChance: 0.55, glowScale: 5.0,
        colors: ['255,255,255', '230,240,255', '210,230,255'] },
    ];

  /* ── Seeded PRNG for stable star positions across resizes ── */
  function seededRand(seed) {
    let s = seed;
    return function () {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0xffffffff;
    };
  }

  let stars = [];

  function buildStars() {
    stars = [];
    const rand = seededRand(0xC0FFEE42);
    STAR_CONFIG.forEach((cfg) => {
      for (let i = 0; i < cfg.count; i++) {
        const col     = cfg.colors[Math.floor(rand() * cfg.colors.length)];
        const hasGlow = rand() < cfg.glowChance;
        stars.push({
          nx: rand(), ny: rand(),
          r:  cfg.rMin + rand() * (cfg.rMax - cfg.rMin),
          flickerPhase: rand() * Math.PI * 2,
          flickerSpeed: cfg.flickerSpeed[0] + rand() * (cfg.flickerSpeed[1] - cfg.flickerSpeed[0]),
          opMin: cfg.opMin + rand() * 0.08,
          opMax: cfg.opMax - rand() * 0.08,
          glow:      hasGlow,
          glowScale: hasGlow ? (cfg.glowScale + rand() * 1.5) : 0,
          col,
          scrollFactor: cfg.scrollFactor,
        });
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════
     STAR BURST SYSTEM
     Periodically fires a bright flare at a random star position,
     spawning scatter sparks that drift outward and fade.
     This gives the "stars bursting" cinematic effect.
  ══════════════════════════════════════════════════════════════ */
  const bursts = [];      /* active burst events */
  const sparks = [];      /* scatter sparks from bursts */
  let nextBurstTime = 0;
  const BURST_INTERVAL_MIN = 3000;   /* ms — min time between bursts */
  const BURST_INTERVAL_MAX = 7000;   /* ms — max time between bursts */

  function scheduleBurst() {
    nextBurstTime = performance.now() + BURST_INTERVAL_MIN +
      Math.random() * (BURST_INTERVAL_MAX - BURST_INTERVAL_MIN);
  }

  function fireBurst() {
    /* Pick a random normalised position — biased toward the visible area */
    const nx = 0.05 + Math.random() * 0.90;
    const ny = 0.05 + Math.random() * 0.65; /* bias upper 65% — more visible */
    const sx = nx * W;
    const sy = ny * H;

    /* Burst flash record */
    bursts.push({
      x: sx, y: sy,
      life: 1.0,
      decay: 0.018 + Math.random() * 0.012,
      maxR: 18 + Math.random() * 22,
      col: Math.random() < 0.7 ? '200,230,255' : '255,240,200', /* blue-white or warm */
    });

    /* Scatter sparks — 8-14 per burst */
    const sparkCount = 8 + Math.floor(Math.random() * 7);
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 0.6 + Math.random() * 1.8;
      sparks.push({
        x: sx, y: sy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.8 + Math.random() * 0.2,
        decay: 0.008 + Math.random() * 0.008,
        r: 0.5 + Math.random() * 1.2,
        col: Math.random() < 0.6 ? '180,220,255' : '255,255,255',
      });
    }

    scheduleBurst();
  }

  function drawBursts() {
    /* Draw flare circles */
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.life -= b.decay;
      if (b.life <= 0) { bursts.splice(i, 1); continue; }

      const r = b.maxR * (1 - b.life) * 3; /* expand then fade */
      const alpha = b.life * 0.75;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, Math.max(r, 1));
      g.addColorStop(0,   `rgba(${b.col},${Math.min(alpha * 1.4, 0.95)})`);
      g.addColorStop(0.3, `rgba(${b.col},${alpha * 0.7})`);
      g.addColorStop(0.7, `rgba(${b.col},${alpha * 0.2})`);
      g.addColorStop(1,   `rgba(${b.col},0)`);
      ctx.globalAlpha = 1;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, Math.max(r, 1), 0, Math.PI * 2);
      ctx.fill();

      /* Cross spike at peak brightness */
      if (b.life > 0.5) {
        const spikeLen = b.maxR * 2.5 * b.life;
        ctx.save();
        ctx.globalAlpha = b.life * 0.6;
        ctx.strokeStyle = `rgba(${b.col},1)`;
        ctx.lineWidth = 0.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(b.x - spikeLen, b.y); ctx.lineTo(b.x + spikeLen, b.y); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(b.x, b.y - spikeLen); ctx.lineTo(b.x, b.y + spikeLen); ctx.stroke();
        /* Diagonal spikes at half length */
        const dLen = spikeLen * 0.55;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(b.x - dLen, b.y - dLen); ctx.lineTo(b.x + dLen, b.y + dLen); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(b.x + dLen, b.y - dLen); ctx.lineTo(b.x - dLen, b.y + dLen); ctx.stroke();
        ctx.restore();
      }
    }

    /* Draw drift sparks */
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.97; p.vy *= 0.97; /* gentle drag */
      p.life -= p.decay;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }

      ctx.globalAlpha = p.life * 0.9;
      const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      gr.addColorStop(0, `rgba(${p.col},${p.life})`);
      gr.addColorStop(1, `rgba(${p.col},0)`);
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${p.col},${Math.min(p.life * 1.2, 1)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ══════════════════════════════════════════════════════════════
     RESIZE HANDLER
  ══════════════════════════════════════════════════════════════ */
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }, 100);
  }
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  window.addEventListener('resize', onResize, { passive: true });

  /* ══════════════════════════════════════════════════════════════
     SCROLL PARALLAX
  ══════════════════════════════════════════════════════════════ */
  let scrollY = 0, moonScrollOffset = 0, scrollTick = false;

  window.addEventListener('scroll', () => {
    scrollY          = window.scrollY;
    moonScrollOffset = window.scrollY * 0.045;
    if (!scrollTick) {
      requestAnimationFrame(() => { scrollTick = false; });
      scrollTick = true;
    }
  }, { passive: true });

  /* ══════════════════════════════════════════════════════════════
     MAIN RENDER LOOP
  ══════════════════════════════════════════════════════════════ */
  let t = 0;
  let heroOverlaying = false;   /* true while the cinematic hero fills the viewport */

  /* On mobile the hero frame-sequence canvas covers the starfield entirely —
     pause star rendering while it is on screen to free the compositor. */
  if (IS_MOBILE_TIER) {
    const heroEl = document.getElementById('cinematic-hero');
    if (heroEl && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        heroOverlaying = entries[0].isIntersecting;
      }, { threshold: 0 }).observe(heroEl);
    } else {
      heroOverlaying = false;
    }
  }

  function render(ts) {
    if (heroOverlaying) {
      requestAnimationFrame(render);
      return;
    }
    t += 0.016;
    ctx.clearRect(0, 0, W, H);

    /* ── Base stars ── */
    stars.forEach(s => {
      const sy     = prefersReduced ? 0 : scrollY * s.scrollFactor;
      const sx     = s.nx * W;
      const rawY   = s.ny * H - sy;
      const screenY = ((rawY % H) + H) % H;

      const sineVal = Math.sin(t * s.flickerSpeed * 60 + s.flickerPhase);
      const norm    = (sineVal + 1) * 0.5;
      const opacity = s.opMin + norm * (s.opMax - s.opMin);

      ctx.globalAlpha = opacity;

      if (s.glow) {
        const glowR = s.r * s.glowScale;
        const grad  = ctx.createRadialGradient(sx, screenY, 0, sx, screenY, glowR);
        grad.addColorStop(0.0, `rgba(${s.col},${opacity * 0.6})`);
        grad.addColorStop(0.5, `rgba(${s.col},${opacity * 0.2})`);
        grad.addColorStop(1.0, `rgba(${s.col},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(sx, screenY, glowR, 0, Math.PI * 2); ctx.fill();
      }

      ctx.fillStyle = `rgb(${s.col})`;
      ctx.beginPath(); ctx.arc(sx, screenY, s.r, 0, Math.PI * 2); ctx.fill();
    });

    ctx.globalAlpha = 1;

    /* ── Star bursts (skip if reduced motion) ── */
    if (!prefersReduced) {
      if (ts >= nextBurstTime) fireBurst();
      drawBursts();
    }

    ctx.globalAlpha = 1;

    /* ── Moon parallax ── */
    if (moon && !prefersReduced) {
      moon.style.transform = `translateY(${moonScrollOffset}px)`;
    }

    requestAnimationFrame(render);
  }

  /* ══════════════════════════════════════════════════════════════
     PLANET FADE-IN HELPER
  ══════════════════════════════════════════════════════════════ */
  function fadePlanetIn(el, delayMs, targetOpacity, animDelay) {
    if (!el) return;
    if (prefersReduced) {
      el.style.opacity   = String(targetOpacity);
      el.style.animation = 'none';
      return;
    }
    setTimeout(() => {
      el.style.animationDelay     = animDelay;
      el.style.animationPlayState = 'running';
      el.style.transition         = 'opacity 2.2s ease';
      el.style.opacity            = String(targetOpacity);
    }, delayMs);
  }

  /* ── Planet 1: gas giant, left → right, 0.55 opacity ── */
  if (planet1) { planet1.style.animationPlayState = 'paused'; planet1.style.left  = '-80px';  fadePlanetIn(planet1, 1200, 0.55, '-15s'); }
  /* ── Planet 2: ice world, right → left, 0.42 opacity ── */
  if (planet2) { planet2.style.animationPlayState = 'paused'; planet2.style.right = '-60px';  fadePlanetIn(planet2, 2600, 0.42, '-60s'); }
  /* ── Planet 3: emerald, left → right, 0.38 opacity ── */
  if (planet3) { planet3.style.animationPlayState = 'paused'; planet3.style.left  = '-55px';  fadePlanetIn(planet3, 3800, 0.38, '-35s'); }
  /* ── Planet 4: violet, right → left, 0.30 opacity ── */
  if (planet4) { planet4.style.animationPlayState = 'paused'; planet4.style.right = '-45px';  fadePlanetIn(planet4, 5000, 0.30, '-85s'); }

  /* ══════════════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════════════ */
  buildStars();
  scheduleBurst();
  requestAnimationFrame(render);

})();
