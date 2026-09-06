/* ==========================================================================
   FrameSequence — scroll-scrubbed canvas frame renderer (Canvas 2D)
   SMK Web Design — cinematic upgrade
   --------------------------------------------------------------------------
   - Maps a scroll progress value (0..1) to a frame index in a WebP sequence
   - Poster-first: a static <img> stays visible until the first frame is drawn
   - Progressive, windowed, priority loading around the current scroll position
   - Nearest-loaded fallback draw prevents blank frames during fast scrolls
   - Desktop XOR mobile sequence — never downloads both
   - Pauses when offscreen, tab hidden, or reduced motion is preferred
   - Cleans up every observer, listener and rAF handle on destroy()
   ========================================================================== */
(function (global) {
  'use strict';

  var REDUCED = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function pad4(n) { return ('0000' + n).slice(-4); }

  function FrameSequence(opts) {
    if (!(this instanceof FrameSequence)) return new FrameSequence(opts);
    var o = opts || {};

    this.canvas = o.canvas || null;
    this.poster = o.poster || null;               // <img> element under the canvas
    this.dirDesktop = o.dirDesktop || null;       // e.g. 'assets/hero-frames/desktop'
    this.dirMobile = o.dirMobile || null;          // e.g. 'assets/hero-frames/mobile'
    this.mobileMedia = o.mobileMedia || '(max-width: 768px)';
    this.count = o.count || 0;
    this.concurrency = Math.max(1, o.concurrency || 3);
    this.windowBack = o.windowBack != null ? o.windowBack : 2;
    this.windowFwd = o.windowFwd != null ? o.windowFwd : 10;
    this.initialBurst = o.initialBurst != null ? o.initialBurst : 12;
    this.onFirstFrame = o.onFirstFrame || null;
    this.onDisabled = o.onDisabled || null;

    this.enabled = !!this.canvas && !!this.dirDesktop && !!this.dirMobile && this.count > 0 && !REDUCED;
    this.ctx = null;
    this.dpr = 1;
    this.cw = 0;
    this.ch = 0;
    this.cache = new Map();      // index -> HTMLImageElement (compressed, decode-on-draw)
    this.pending = new Set();
    this.queue = [];
    this.active = 0;
    this.direction = 1;
    this.lastQueued = -1;
    this.target = 0;
    this.current = -1;
    this.firstDrawn = false;
    this.visible = false;
    this.hidden = false;
    this.dirty = false;
    this.raf = 0;
    this.destroyed = false;

    if (!this.enabled) {
      if (this.onDisabled) this.onDisabled();
      return;
    }

    try {
      this.ctx = this.canvas.getContext('2d', { alpha: false });
      if (!this.ctx) throw new Error('2d context unavailable');
    } catch (e) {
      this.enabled = false;
      if (this.onDisabled) this.onDisabled();
      return;
    }

    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onVisibility = this._onVisibility.bind(this);
    this._tick = this._tick.bind(this);
    this._io = null;
  }

  FrameSequence.prototype.begin = function () {
    if (!this.enabled || this.destroyed) return;

    this._measure();

    // Initial burst: first frames cover the opening of the sequence.
    for (var i = 0; i < this.initialBurst && i < this.count; i++) this._request(i);

    this.lastQueued = Math.min(this.initialBurst, this.count) - 1;

    // Offscreen pause
    if ('IntersectionObserver' in global) {
      this._io = new IntersectionObserver(function (entries) {
        this.visible = entries[0].isIntersecting;
        if (this.visible) this._wake(); else this._sleep();
      }.bind(this), { threshold: 0 });
      this._io.observe(this.canvas);
    } else {
      this.visible = true;
    }

    global.addEventListener('scroll', this._onScroll, { passive: true });
    global.addEventListener('resize', this._onResize);
    global.addEventListener('orientationchange', this._onResize);
    document.addEventListener('visibilitychange', this._onVisibility);

    this.visible = true;
    this._wake();
  };

  FrameSequence.prototype.setProgress = function (p) {
    if (!this.enabled || this.destroyed) return;
    var t = Math.round(Math.min(1, Math.max(0, p)) * (this.count - 1));
    if (t !== this.target) {
      this.direction = t > this.target ? 1 : -1;
      this.target = t;
      this.dirty = true;
      this._wake();
    }
  };

  FrameSequence.prototype._onScroll = function () { /* progress set externally; wake handled by setProgress */ };
  FrameSequence.prototype._onVisibility = function () {
    this.hidden = document.hidden;
    if (this.hidden) this._sleep(); else this._wake();
  };

  FrameSequence.prototype._onResize = function () {
    if (this.destroyed) return;
    this._measure();
    if (this.current >= 0) { this.dirty = true; this._wake(); }
  };

  FrameSequence.prototype._measure = function () {
    var rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(global.devicePixelRatio || 1, 2);
    this.cw = Math.max(1, Math.round(rect.width * this.dpr));
    this.ch = Math.max(1, Math.round(rect.height * this.dpr));
    if (this.canvas.width !== this.cw) this.canvas.width = this.cw;
    if (this.canvas.height !== this.ch) this.canvas.height = this.ch;

    // If the responsive breakpoint flipped, discard frames from the other
    // sequence so a desktop-cropped frame is never drawn on mobile (and vice versa).
    var dir = this._dir();
    if (this._lastDir && this._lastDir !== dir) {
      this.cache.clear();
      this.queue.length = 0;
      this.pending.clear();
      this.current = -1;
    }
    this._lastDir = dir;
  };

  FrameSequence.prototype._dir = function () {
    var m = global.matchMedia(this.mobileMedia);
    return m && m.matches && this.dirMobile ? this.dirMobile : this.dirDesktop;
  };

  FrameSequence.prototype._src = function (i) {
    return this._dir() + '/frame_' + pad4(i + 1) + '.webp';
  };

  FrameSequence.prototype._request = function (i) {
    if (this.destroyed || i < 0 || i >= this.count) return;
    if (this.cache.has(i) || this.pending.has(i)) return;
    this.pending.add(i);
    this.queue.push(i);
    this._pump();
  };

  FrameSequence.prototype._pump = function () {
    while (this.active < this.concurrency && this.queue.length) {
      var i = this.queue.shift();
      this._load(i);
    }
  };

  FrameSequence.prototype._load = function (i) {
    var self = this;
    var img = new Image();
    this.active++;

    img.onload = function () {
      self.cache.set(i, img);
      self.pending.delete(i);
      self.active--;
      self.dirty = true;
      self._pump();
      self._wake();
    };
    img.onerror = function () {
      self.pending.delete(i);
      self.active--;
      self._pump();
      if (self.cache.size === 0 && !self.firstDrawn) {
        // Sequence unusable — keep poster permanently, stop engine.
        self.enabled = false;
        if (self.onDisabled) self.onDisabled();
      }
    };

    img.decoding = 'async';
    img.src = this._src(i);
  };

  FrameSequence.prototype._nearestLoaded = function (t) {
    if (this.cache.has(t)) return t;
    for (var d = 1; d < this.count; d++) {
      if (t - d >= 0 && this.cache.has(t - d)) return t - d;
      if (t + d < this.count && this.cache.has(t + d)) return t + d;
    }
    return -1;
  };

  FrameSequence.prototype._queueWindow = function (t) {
    var b = t - this.windowBack, f = t + this.windowFwd;
    if (this.direction < 0) { b = t - this.windowFwd; f = t + this.windowBack; }
    for (var i = Math.max(0, b); i <= Math.min(this.count - 1, f); i++) this._request(i);
  };

  FrameSequence.prototype._backgroundFill = function () {
    if (this.queue.length || this.active > 0) return;
    var d = this._dir();
    for (var i = 0; i < this.count; i++) {
      var idx = (this.lastQueued + 1 + i) % this.count;
      if (!this.cache.has(idx) && !this.pending.has(idx)) {
        this.lastQueued = idx;
        this._request(idx);
        return;
      }
    }
  };

  FrameSequence.prototype._draw = function (img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (!iw || !ih) return;
    var s = Math.max(this.cw / iw, this.ch / ih);      // cover
    var dw = iw * s, dh = ih * s;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.drawImage(img, (this.cw - dw) / 2, (this.ch - dh) / 2, dw, dh);
  };

  FrameSequence.prototype._tick = function () {
    this.raf = 0;
    if (this.destroyed || !this.enabled) return;

    if (this.dirty) {
      this.dirty = false;

      // Queue the priority window around the target.
      this._queueWindow(this.target);
      this._backgroundFill();

      var draw = this._nearestLoaded(this.target);
      if (draw >= 0 && draw !== this.current) {
        this.current = draw;
        this._draw(this.cache.get(draw));
        if (!this.firstDrawn) {
          this.firstDrawn = true;
          if (this.poster) this.poster.classList.add('is-hidden');
          if (this.onFirstFrame) this.onFirstFrame(draw);
        }
      }
    }

    if (this._needsLoop()) this._wake();
  };

  FrameSequence.prototype._needsLoop = function () {
    return this.queue.length > 0 || this.active > 0 || this.current !== this.target;
  };

  FrameSequence.prototype._wake = function () {
    if (this.raf || this.destroyed || !this.enabled) return;
    if (!this.visible || this.hidden) return;
    this.raf = global.requestAnimationFrame(this._tick);
  };

  FrameSequence.prototype._sleep = function () {
    if (this.raf) { global.cancelAnimationFrame(this.raf); this.raf = 0; }
  };

  FrameSequence.prototype.destroy = function () {
    this.destroyed = true;
    this._sleep();
    if (this._io) { this._io.disconnect(); this._io = null; }
    global.removeEventListener('scroll', this._onScroll);
    global.removeEventListener('resize', this._onResize);
    global.removeEventListener('orientationchange', this._onResize);
    document.removeEventListener('visibilitychange', this._onVisibility);
    this.cache.clear();
    this.queue.length = 0;
    this.pending.clear();
  };

  global.FrameSequence = FrameSequence;
})(window);
