/* ==========================================================================
   Cinematic Hero — SMK Web Design
   --------------------------------------------------------------------------
   Layered depth stack over the scroll-scrubbed frame sequence:
     1 distant atmospheric gradient     .ch-depth-1
     2 blue volumetric glow             .ch-depth-2
     3 portrait frames (canvas)         #ch-canvas
     4 halftone particle canvas         #ch-particles
     5 red focus-light layer             .ch-focus
     6 grain + vignette                 .ch-grain
     7 HTML copy + controls             .ch-copy
   Scroll narrative across a pinned track (progress 0 -> 1):
     0.00-0.12  dark cinematic opening
     0.12-0.45  portrait comes into focus, wordmark enters
     0.45-0.70  blue light + halftone layers separate spatially
     0.70-0.84  red focus moment (video is red-dominant from frame ~144)
     0.84-1.00  statement fully readable, release into work
   ========================================================================== */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(fine: pointer)').matches;

  var section = document.getElementById('cinematic-hero');
  if (!section) return;

  var track = document.getElementById('ch-track');
  var stageEl = document.getElementById('ch-stage');
  var canvas = document.getElementById('ch-canvas');
  var poster = document.getElementById('ch-poster');
  var statusEl = document.getElementById('ch-status');
  var particlesEl = document.getElementById('ch-particles');
  var copy = section.querySelector('.ch-copy');
  var wordmark = section.querySelector('.ch-wordmark');

  var seq = null;
  var particles = null;
  var scrollRaf = 0;
  var destroyed = false;

  /* -- Fallback: static poster, no engines --------------------------------- */
  function goStatic(reason) {
    if (statusEl) statusEl.textContent = reason || '';
    section.classList.add('is-static');
    if (track) track.style.height = '';
    if (poster) poster.classList.remove('is-hidden');
    teardown();
  }

  function teardown() {
    destroyed = true;
    if (seq) { seq.destroy(); seq = null; }
    if (particles) { particles.destroy(); particles = null; }
    if (scrollRaf) { cancelAnimationFrame(scrollRaf); scrollRaf = 0; }
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibility);
  }

  /* -- Scroll -> progress ---------------------------------------------------- */
  function computeProgress() {
    if (!track) return 0;
    var rect = track.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    if (total <= 0) return 1;
    return Math.min(1, Math.max(0, -rect.top / total));
  }

  var lastP = -1;
  var lastStage = 'in';
  function onScroll() {
    if (scrollRaf || destroyed) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = 0;
      if (destroyed) return;
      var p = computeProgress();
      if (p !== lastP) { lastP = p; render(p); }
    });
  }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function render(p) {
    if (seq) seq.setProgress(p);

    var stage = p >= 0.84 ? 'full' : p >= 0.70 ? 'focus' : p >= 0.45 ? 'depth' : p >= 0.12 ? 'reveal' : 'in';
    if (section.dataset.stage !== stage) {
      section.dataset.stage = stage;
      if (statusEl && stage !== lastStage) {
        lastStage = stage;
        var msg = { in: 'Cinematic opening', reveal: 'Portrait coming into focus', depth: 'Layers separating', focus: 'Red focus moment', full: 'Hero statement' };
        statusEl.textContent = msg[stage] || '';
      }
    }

    var dep = section.querySelector('.ch-depth-1');
    var glow = section.querySelector('.ch-depth-2');
    if (dep) dep.style.transform = 'translate3d(0,' + (p * 40).toFixed(1) + 'px,0) scale(' + (1 + p * 0.06).toFixed(3) + ')';
    if (glow) glow.style.transform = 'translate3d(0,' + (p * -30).toFixed(1) + 'px,0)';

    if (wordmark) {
      var wp = clamp01((p - 0.12) / 0.30);
      wordmark.style.opacity = (0.25 + 0.75 * wp).toFixed(3);
    }
    if (copy) copy.style.setProperty('--cp', clamp01((p - 0.55) / 0.29).toFixed(3));

    if (particles) particles.setScroll(p);
  }

  /* -- Resize / visibility ---------------------------------------------------- */
  function onResize() {
    if (destroyed) return;
    lastP = -1;
    onScroll();
    if (particles) particles.resize();
  }

  function onVisibility() {
    if (destroyed) return;
    if (document.hidden) { if (particles) particles.pause(); }
    else { if (particles) particles.resume(); }
  }

  /* -- Cursor parallax (fine pointer only) ------------------------------------ */
  var px = 0, py = 0, tx = 0, ty = 0, parallaxRaf = 0;

  function onPointerMove(e) {
    if (destroyed || !FINE) return;
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!parallaxRaf) parallaxRaf = requestAnimationFrame(applyParallax);
  }

  function applyParallax() {
    parallaxRaf = 0;
    if (destroyed) return;
    px += (tx - px) * 0.08;
    py += (ty - py) * 0.08;
    var layers = section.querySelectorAll('[data-depth]');
    for (var i = 0; i < layers.length; i++) {
      var el = layers[i];
      var d = parseFloat(el.getAttribute('data-depth')) || 0.3;
      var mx = (px * d * 12).toFixed(2);
      var my = (py * d * 12).toFixed(2);
      el.style.setProperty('--px', mx + 'px');
      el.style.setProperty('--py', my + 'px');
    }
    if (Math.abs(tx - px) > 0.001 || Math.abs(ty - py) > 0.001) {
      parallaxRaf = requestAnimationFrame(applyParallax);
    }
  }

  /* -- Halftone particle engine ------------------------------------------------ */
  function Halftone(host, isMobile) {
    this.canvas = host;
    this.ctx = this.canvas.getContext('2d');
    this.scrollP = 0;
    this.paused = false;
    this.destroyed = false;
    this.raf = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.count = isMobile ? 60 : 130;
    this.dots = [];
    this.seed();
    this.resize();
    this.raf = requestAnimationFrame(this._draw.bind(this));
  }

  Halftone.prototype.seed = function () {
    this.dots = [];
    for (var i = 0; i < this.count; i++) {
      this.dots.push({
        x: Math.random(),
        y: Math.random(),
        s: 1 + Math.random() * 2.1,
        v: 0.15 + Math.random() * 0.35,
        tw: Math.random() * Math.PI * 2
      });
    }
  };

  Halftone.prototype.resize = function () {
    if (this.destroyed) return;
    var r = this.canvas.getBoundingClientRect();
    this.W = Math.max(1, Math.round(r.width * this.dpr));
    this.H = Math.max(1, Math.round(r.height * this.dpr));
    this.canvas.width = this.W;
    this.canvas.height = this.H;
  };

  Halftone.prototype.setScroll = function (p) { this.scrollP = p; };

  Halftone.prototype.pause = function () {
    this.paused = true;
    if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
  };

  Halftone.prototype.resume = function () {
    if (this.paused && !this.destroyed) {
      this.paused = false;
      if (!this.raf) this.raf = requestAnimationFrame(this._draw.bind(this));
    }
  };

  Halftone.prototype._draw = function (t) {
    if (this.destroyed) { this.raf = 0; return; }
    if (this.paused) { this.raf = 0; return; }
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);
    var focus = clamp01((this.scrollP - 0.70) / 0.14);
    for (var i = 0; i < this.dots.length; i++) {
      var d = this.dots[i];
      d.tw += 0.02;
      var py = d.y * this.H - (t * 0.012 * d.v * this.dpr) + this.scrollP * 40 * d.v * this.dpr;
      py = ((py % this.H) + this.H) % this.H;
      var r = d.s * this.dpr * (0.85 + 0.3 * Math.sin(d.tw));
      var a = 0.06 + 0.13 * (0.5 + 0.5 * Math.sin(d.tw)) + focus * 0.09;
      ctx.beginPath();
      ctx.fillStyle = focus > 0.5 ? 'rgba(255,96,64,' + a.toFixed(3) + ')' : 'rgba(150,178,255,' + a.toFixed(3) + ')';
      ctx.arc(d.x * this.W, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
    this.raf = requestAnimationFrame(this._draw.bind(this));
  };

  Halftone.prototype.destroy = function () {
    this.destroyed = true;
    if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
    this.dots = [];
  };

  /* -- Boot ---------------------------------------------------------------------- */
  function init() {
    if (REDUCED) { goStatic(''); return; }
    if (!canvas || !poster || typeof FrameSequence === 'undefined') { goStatic(''); return; }

    var isMobile = window.matchMedia('(max-width: 768px)').matches;

    seq = new FrameSequence({
      canvas: canvas,
      poster: poster,
      dirDesktop: 'assets/hero-frames/desktop',
      dirMobile: 'assets/hero-frames/mobile',
      mobileMedia: '(max-width: 768px)',
      count: 192,
      concurrency: 3,
      initialBurst: 12
    });

    if (!seq.enabled) { goStatic(''); return; }
    seq.begin();

    if (particlesEl) particles = new Halftone(particlesEl, isMobile);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    if (FINE) window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('visibilitychange', onVisibility);

    onScroll();
    if (statusEl) statusEl.textContent = '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
