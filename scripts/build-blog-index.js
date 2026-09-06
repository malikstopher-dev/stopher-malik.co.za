/**
 * SM-UPGRADE — Blog Index Builder
 *
 * Scans all blog post directories, extracts meta info, and generates
 * the blog listing page (blog/index.html) using the current design system.
 *
 * Usage: node scripts/build-blog-index.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const OUTPUT = path.join(BLOG_DIR, 'index.html');

// ─── SHARED SHELL FRAGMENTS ───────────────────────────────────────────────

const SHELL_TOP = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — SMK Web Design | Web Design Tips, SEO Guides & Business Growth</title>
  <meta name="description" content="Expert advice on web design, SEO, and digital marketing for South African businesses. Learn how to grow your business online with SMK Web Design.">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://www.stopher-malik.co.za/blog/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.stopher-malik.co.za/blog/">
  <meta property="og:title" content="Blog — SMK Web Design | Web Design Tips, SEO Guides & Business Growth">
  <meta property="og:description" content="Expert advice on web design, SEO, and digital marketing for South African businesses. Learn how to grow your business online with SMK Web Design.">
  <meta property="og:image" content="https://www.stopher-malik.co.za/assets/og-image-1200x630.png">
  <meta property="og:site_name" content="SMK Web Design">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Blog — SMK Web Design | Web Design Tips, SEO Guides & Business Growth">
  <meta name="twitter:description" content="Expert advice on web design, SEO, and digital marketing for South African businesses. Learn how to grow your business online with SMK Web Design.">
  <meta name="twitter:image" content="https://www.stopher-malik.co.za/assets/og-image-1200x630.png">
  <meta name="theme-color" content="#03070f">
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/sections.css">
  <link rel="stylesheet" href="/css/effects.css">
  <link rel="stylesheet" href="/css/cosmic-bg.css">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <noscript>
    <style>
      [data-reveal] { opacity: 1 !important; transform: none !important; }
    </style>
  </noscript>
  <style>
    .blog-grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-lg);
    }
    .blog-card-link {
      text-decoration: none;
      display: block;
      height: 100%;
    }
    .blog-card-link .card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .blog-card-link .card__body {
      flex: 1;
    }
    .blog-card-link:hover {
      transform: none;
    }
    .blog-filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-bottom: var(--space-xl);
    }
    .blog-filter-btn {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      color: var(--white-muted);
      padding: 8px 20px;
      border-radius: 100px;
      cursor: pointer;
      font-size: var(--label-sm);
      font-family: var(--font-body);
      transition: all var(--transition-fluid);
    }
    .blog-filter-btn:hover,
    .blog-filter-btn.active {
      background: var(--accent-cyan);
      border-color: var(--accent-cyan);
      color: var(--white);
    }
  </style>
</head>
<body>

  <div id="cosmic-bg" aria-hidden="true">
    <div id="cosmic-gradient"></div>
    <div id="cosmic-vignette"></div>
    <div id="cosmic-nebula-1"></div>
    <div id="cosmic-nebula-2"></div>
    <canvas id="cosmic-star-canvas"></canvas>
    <div id="cosmic-moon"></div>
    <div id="planet-1"></div>
    <div id="planet-2"></div>
    <div id="planet-3"></div>
    <div id="planet-4"></div>
  </div>
  <div id="noise-overlay" aria-hidden="true"></div>
  <div id="cursor" aria-hidden="true"></div>
  <canvas id="starfield" aria-hidden="true"></canvas>

  <nav class="nav nav--static" id="nav">
    <div class="container nav__inner">
      <a href="/" class="nav__profile">
        <div class="nav__avatar nav__avatar--portrait"><img src="/assets/stopher-portrait.png" alt="Stopher Malik" loading="eager" decoding="async"></div>
        <div class="nav__identity">
          <span class="nav__name">Stopher Malik</span>
          <span class="nav__role">Web Designer & Developer</span>
        </div>
      </a>
      <span class="badge">
        <span class="badge__dot"></span>
        Available for work
      </span>
      <div class="nav__socials">
        <a href="https://www.facebook.com/profile.php?id=61584357221305" target="_blank" rel="noopener" class="nav__social-icon" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
        </a>
        <a href="https://www.instagram.com/stophermalik/" target="_blank" rel="noopener" class="nav__social-icon" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/stophermalik/" target="_blank" rel="noopener" class="nav__social-icon" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://x.com/stopher_malik" target="_blank" rel="noopener" class="nav__social-icon" aria-label="X">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.tiktok.com/@stopher_malik" target="_blank" rel="noopener" class="nav__social-icon" aria-label="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
        </a>
        <a href="https://www.youtube.com/channel/UCh92kSW3JN6gLHXo1kenLWQ" target="_blank" rel="noopener" class="nav__social-icon" aria-label="YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="/projects.html" class="nav__social-icon" aria-label="Portfolio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        </a>
      </div>
    </div>
  </nav>

  <main class="main-content">
    <section class="about-hero">
      <div class="container">

        <div class="hero__card card" data-tilt data-magnetic data-holo>
          <h1 class="hero__title tilt-layer--lg">Expert Guides &amp; Insights</h1>
          <p class="hero__desc tilt-layer" style="margin-bottom: 0;">Web design tips, SEO guides, and digital marketing advice to help your South African business grow online.</p>
        </div>

        <div class="section-card card" data-tilt data-morph data-holo style="margin-bottom: var(--space-3xl);">
`;

const SHELL_BOTTOM = `
        </div>

        <div style="text-align:center;margin-top:var(--space-xl);margin-bottom:var(--space-3xl);">
          <a href="/contact.html" class="btn btn--ghost btn--lg">Let's Work Together</a>
        </div>

      </div>
    </section>
  </main>

  <footer class="footer" style="padding-bottom: 120px;">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="footer__logo">
            <div class="footer__logo-mark">S</div>
            <span class="footer__logo-text">SMK</span>
          </div>
          <p class="footer__tagline">Premium web design for South African businesses. Built to convert, designed to impress.</p>
        </div>
        <div>
          <h3 class="footer__column-title">Navigation</h3>
          <ul class="footer__links">
            <li><a href="/projects.html" class="footer__link">Projects</a></li>
            <li><a href="/stack.html" class="footer__link">Stack</a></li>
            <li><a href="/blog/" class="footer__link">Blog</a></li>
            <li><a href="/about.html" class="footer__link">About</a></li>
            <li><a href="/contact.html" class="footer__link">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer__column-title">Services</h3>
          <ul class="footer__links">
            <li><a href="/web-design.html" class="footer__link">Web Design</a></li>
            <li><a href="/ecommerce.html" class="footer__link">E-Commerce</a></li>
            <li><a href="/seo-performance.html" class="footer__link">SEO & Performance</a></li>
            <li><a href="/branding.html" class="footer__link">Branding</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer__column-title">Connect</h3>
          <ul class="footer__links">
            <li><a href="mailto:info@stopher-malik.co.za" class="footer__link">info@stopher-malik.co.za</a></li>
            <li><a href="tel:+27729998863" class="footer__link">+27 72 999 8863</a></li>
            <li><a href="https://wa.me/27825100050" class="footer__link" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="https://www.google.com/maps?q=Paulshof,Sandton,Johannesburg" class="footer__link" target="_blank" rel="noopener">Johannesburg, South Africa</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copyright">&copy; 2026 SMK Web Design. All rights reserved.</p>
        <div class="footer__legal">
          <a href="/privacy.html" class="footer__legal-link">Privacy Policy</a>
          <a href="/contact.html" class="footer__legal-link">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <div class="floating-nav" data-reveal>
    <a href="/" class="floating-nav__item" aria-label="Home">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
    </a>
    <a href="/about.html" class="floating-nav__item" aria-label="About">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
    <a href="/projects.html" class="floating-nav__item" aria-label="Projects">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    </a>
    <a href="/stack.html" class="floating-nav__item" aria-label="Stack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </a>
    <a href="/contact.html" class="floating-nav__item" aria-label="Contact">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
    </a>
  </div>

  <a href="https://wa.me/27825100050" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>

  <div class="toast" id="toast"><p class="toast__message" id="toastMessage"></p></div>

  <script src="/js/app.js"></script>
  <script src="/js/cosmic-bg.js" defer></script>
  __FILTER_SCRIPT__
</body>
</html>`;

// ─── EXTRACT META FROM A TRANSFORMED BLOG POST ───────────────────────────

function parsePostMeta(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1].replace(/ \| SMK Web Design$/, '').trim() : '';

  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  const description = descMatch ? descMatch[1] : '';

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  const canonicalUrl = canonical ? canonical[1] : '';

  const h1Match = html.match(/<h1 class="hero__title[^"]*"[^>]*>([^<]+)<\/h1>/);
  const h1 = h1Match ? h1Match[1].trim() : title;

  // Category from badge inside the hero card (before hero__title)
  const catMatch = html.match(/<span class="badge__dot"><\/span>([^<]+)<\/span>\s*<\/div>\s*<h1 class="hero__title/);
  const category = catMatch ? catMatch[1].trim() : '';

  // Date and read time
  const descDiv = html.match(/<div class="hero__desc[^"]*"[^>]*>([^<]+)<\/div>/);
  const metaText = descDiv ? descDiv[1].trim() : '';
  const dateMatch = metaText.match(/(\d+\s+\w+\s+\d{4})/);
  const date = dateMatch ? dateMatch[1] : '';
  const readMatch = metaText.match(/(\d+\s*min\s*read)/);
  const readTime = readMatch ? readMatch[1] : '';

  // Extract directory name from canonical URL
  const dirMatch = canonicalUrl.match(/\/blog\/([^/]+)\//);
  const dirName = dirMatch ? dirMatch[1] : '';

  return { title, description, canonicalUrl, h1, category, date, readTime, dirName };
}

// ─── CATEGORY COUNTS ───────────────────────────────────────────────────────

function getCategoryCounts(posts) {
  const counts = {};
  for (const p of posts) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return counts;
}

// ─── BUILD BLOG INDEX ────────────────────────────────────────────────────

function buildIndex(posts) {
  const catCounts = getCategoryCounts(posts);
  const catOrder = ['All', ...Object.keys(catCounts).sort()];

  // Filter buttons
  let filters = '<div class="blog-filters">';
  catOrder.forEach((cat, i) => {
    const count = cat === 'All' ? posts.length : catCounts[cat];
    const active = i === 0 ? ' active' : '';
    const dataCat = cat === 'All' ? 'all' : cat.toLowerCase().replace(/\s+/g, '-');
    filters += `<button class="blog-filter-btn${active}" data-filter="${dataCat}">${cat} <span style="opacity:0.6">(${count})</span></button>\n`;
  });
  filters += '</div>';

  // Blog cards
  let cards = '<div class="blog-grid-3">\n';
  posts.forEach((p, i) => {
    const catClass = p.category.toLowerCase().replace(/\s+/g, '-');
    const delay = (i % 6) + 1;
    const href = `/blog/${p.dirName}/`;
    cards += `
      <a href="${href}" class="blog-card-link" data-filter-cat="${catClass}">
        <div class="card" data-tilt data-morph data-holo>
          <div class="card__body" style="padding:var(--space-md);flex:1;display:flex;flex-direction:column;">
            <div style="display:flex;gap:var(--space-md);font-size:var(--label-sm);color:var(--white-muted);margin-bottom:var(--space-sm);">
              <span style="color:var(--accent-cyan);font-weight:600;">${p.category}</span>
              <span>${p.date}${p.readTime ? ' · ' + p.readTime : ''}</span>
            </div>
            <h3 style="font-family:var(--font-display);font-weight:600;font-size:var(--body-lg);color:var(--white);margin-bottom:var(--space-sm);line-height:var(--leading-snug);">${p.h1}</h3>
            <p style="font-size:var(--body-sm);color:var(--white-muted);line-height:var(--leading-relaxed);flex:1;">${p.description}</p>
            <div style="display:flex;align-items:center;gap:var(--space-xs);margin-top:var(--space-md);color:var(--accent-cyan);font-size:var(--label-sm);font-weight:600;">
              Read More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </a>\n`;
  });
  cards += '</div>';

  // Simple filter JS
  const filterJS = `
  <script>
    (function(){
      var btns = document.querySelectorAll('.blog-filter-btn');
      var cards = document.querySelectorAll('[data-filter-cat]');
      btns.forEach(function(btn){
        btn.addEventListener('click', function(){
          btns.forEach(function(b){ b.classList.remove('active'); });
          this.classList.add('active');
          var filter = this.getAttribute('data-filter');
          cards.forEach(function(card){
            if(filter === 'all' || card.getAttribute('data-filter-cat') === filter){
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    })();
  </script>`;

  return SHELL_TOP + filters + cards + SHELL_BOTTOM.replace('__FILTER_SCRIPT__', filterJS);
}

// ─── RUN ─────────────────────────────────────────────────────────────────

console.log('SM-UPGRADE — Blog Index Builder');
console.log('================================\n');

const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
const postDirs = entries.filter(e => e.isDirectory());

let posts = [];
for (const dir of postDirs) {
  const indexPath = path.join(BLOG_DIR, dir.name, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.log(`  ✗ ${dir.name}/ (no index.html)`);
    continue;
  }
  try {
    const meta = parsePostMeta(indexPath);
    if (meta.dirName) {
      posts.push(meta);
      console.log(`  ✓ ${meta.dirName}`);
    }
  } catch (err) {
    console.log(`  ✗ ${dir.name}/ (${err.message})`);
  }
}

// Sort by date descending (newest first)
posts.sort((a, b) => {
  const parseDate = (d) => {
    const parts = d.split(' ');
    const months = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
    return new Date(parseInt(parts[2]), months[parts[1].toLowerCase().slice(0,3)], parseInt(parts[0]));
  };
  return parseDate(b.date) - parseDate(a.date);
});

console.log(`\nParsed ${posts.length} posts. Building index...`);

const html = buildIndex(posts);
fs.writeFileSync(OUTPUT, html, 'utf-8');

console.log(`Done: ${OUTPUT}`);
