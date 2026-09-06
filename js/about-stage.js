/* ==========================================================================
   About Cinematic Stage — SMK Web Design
   Scroll-scrubbed blue-light portrait sequence (desktop only).
   Mobile and reduced-motion users see the static poster — no sequence download.
   ========================================================================== */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = document.getElementById('about-stage');
  if (!stage) return;

  var canvas = stage.querySelector('.about-stage__canvas');
  var poster = stage.querySelector('.about-stage__poster');
  var count = parseInt(stage.getAttribute('data-count'), 10) || 96;
  var seq = null;
  var raf = 0;
  var visible = false;
  var lastP = -1;

  function isDesktop() { return !window.matchMedia('(max-width: 768px)').matches; }

  function computeProgress() {
    var rect = stage.getBoundingClientRect();
    var vh = window.innerHeight;
    // 0 when the stage top hits viewport bottom, 1 when stage bottom hits viewport top.
    var total = rect.height + vh;
    var p = (vh - rect.top) / total;
    return Math.min(1, Math.max(0, p));
  }

  function onScroll() {
    if (raf || !seq) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      if (!seq) return;
      var p = computeProgress();
      if (p !== lastP) { lastP = p; seq.setProgress(p); }
    });
  }

  function boot() {
    if (REDUCED || !isDesktop() || !canvas || typeof FrameSequence === 'undefined') return; // poster stays

    seq = new FrameSequence({
      canvas: canvas,
      poster: poster,
      dirDesktop: 'assets/about-frames/desktop',
      dirMobile: 'assets/about-frames/desktop',   // no mobile sequence exists; desktop never matches mobile media query below
      mobileMedia: '(max-width: 1px)',             // permanently false -> always uses dirDesktop
      count: count,
      concurrency: 2,
      windowBack: 2,
      windowFwd: 6,
      initialBurst: 6
    });

    if (!seq.enabled) { seq = null; return; }
    seq.begin();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  function destroy() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    if (seq) { seq.destroy(); seq = null; }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
