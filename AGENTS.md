# SM-UPGRADE — Project Context

## Live URLs (correct — do not change)
- Salem Home Innovation: `https://salemhi.co.za`
- The Boma Cafe: `https://the-boma-cafe.vercel.app`
- Selrahc Architects: `https://www.selrahcarchitects.com/`
- JMOTO Electrical: `https://jmoto-website.vercel.app/`
- JKJ SolarTech: `https://jkjsolatech.co.za/`
- Cleanisa Solutions: `https://cleanisa-solutions.pages.dev/`

## Site Structure
- 10 HTML pages: index, about, projects, stack, contact, privacy, web-design, ecommerce, seo-performance, branding
- CSS: tokens, base, components, sections, effects, cosmic-bg
- JS: app, contact, cosmic-bg
- 51 blog articles under `/blog/`

## Design Tokens
- Accent (primary): `#22c55e` (green) — badge dot, globe, testimonials, buttons
- Cyan (nav name, tech pills, ghost buttons): `#378ADD`
- Font display: Bai Jamjuree, Font body: Inter
- Container max-width: 820px

## Key Layout
- Nav: fixed top, ~88px tall (56px avatar + 16px padding top/bottom), transparent initially, gets background on scroll
- Hero padding-top: 24px
- Card: border-radius 30px, padding 24px, gap 24px, max-width 800px
- Heading: 36px/24px (desktop/mobile), weight 500, line-height 1.2, color #e6e6e6
- Main content padding-top on interior pages: 110px

## Card System
- Base `.card` class: glass bg, noise overlay, aurora border, holo sheen, magnetic, flip, morph
- Hero card uses cyan sheen via `::before` linear-gradient
- Location/Skills cards: page-flip 3D on hover
- Project grid: book staggered entrance via `[data-book]`
- All motion wrapped in `@media (prefers-reduced-motion: no-preference)`

## Form
- Web3Forms access key: `23d51a8d-11fc-48a5-bae3-02ca670202c3`
- Form ID: `contact-form`
- Submit via `contact.js` fetch → WhatsApp fallback on error
