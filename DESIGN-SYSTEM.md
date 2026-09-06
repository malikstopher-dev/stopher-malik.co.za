# SMK Web Design — Premium Design System & UX Blueprint

## Design Philosophy

**Core Principle:** This is not a web designer's portfolio. This is a digital experience studio's showcase.

**Aesthetic Direction:** Editorial luxury meets technical precision. Think Apple's product pages × Pentagram's typography × Locomotive's scroll × Stripe's micro-interactions.

**Brand Positioning:** Stopher Malik isn't selling websites. He's selling business transformation through digital craft. The design must communicate mastery, confidence, and premium quality without being pretentious.

---

## 1. Visual Language

### 1.1 Color System

**Philosophy:** Move beyond the single-cyan dark theme. Introduce a sophisticated palette with warm/cool contrast, functional color hierarchy, and section-specific accent variations.

#### Primary Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Ink** | Rich Black | `#0A0A0B` | Primary background |
| **Surface** | Warm Charcoal | `#141416` | Card backgrounds, elevated surfaces |
| **Mist** | Soft White | `#F5F5F0` | Primary text, headlines |
| **Fog** | Warm Gray | `#A09E98` | Secondary text, captions |
| **Stone** | Muted Gray | `#6B6965` | Tertiary text, borders |

#### Accent Palette (Section-Specific)

| Accent | Color | Hex | Usage |
|--------|-------|-----|-------|
| **Signal** | Electric Lime | `#C8FF00` | Primary CTA, active states, highlights |
| **Horizon** | Warm Coral | `#FF6B4A` | Portfolio accents, hover states |
| **Depth** | Deep Blue | `#2D4AFF` | Service cards, process indicators |
| **Glow** | Soft Gold | `#FFD93D` | Pricing, premium badges, testimonials |
| **Calm** | Sage Green | `#4ADE80` | Success states, WhatsApp, availability |

**Color Usage Rules:**
- Signal (lime) is reserved for primary CTAs and interactive highlights only
- Each section may use ONE accent color for emphasis, never more
- Backgrounds alternate between Ink and Surface for depth rhythm
- Text hierarchy: Mist → Fog → Stone (never pure white)

### 1.2 Typography System

**Philosophy:** Create tension between editorial display type and clean functional body type. No condensed fonts. No uppercase headings. Think Kinfolk meets Stripe.

#### Font Stack

| Role | Font | Weights | Style |
|------|------|---------|-------|
| **Display** | `Instrument Serif` | 400 | Italic for hero, section intros |
| **Heading** | `Satoshi` | 700, 900 | Clean geometric sans |
| **Body** | `Inter` | 300, 400, 500 | Refined, readable |
| **Mono** | `JetBrains Mono` | 400 | Labels, tags, codes |

#### Type Scale (Fluid)

```css
--text-hero: clamp(4rem, 10vw, 9rem);      /* Hero display */
--text-display: clamp(3rem, 7vw, 6rem);     /* Section intros */
--text-heading-1: clamp(2rem, 4vw, 3.5rem); /* Section headings */
--text-heading-2: clamp(1.5rem, 3vw, 2.5rem); /* Subheadings */
--text-heading-3: clamp(1.25rem, 2vw, 1.75rem); /* Card headings */
--text-body-lg: clamp(1.125rem, 1.5vw, 1.375rem); /* Lead paragraphs */
--text-body: 1rem;                           /* Body copy */
--text-body-sm: 0.875rem;                   /* Captions, labels */
--text-caption: 0.75rem;                    /* Tags, meta */
--text-micro: 0.625rem;                     /* Overlines */
```

#### Typography Rules

- **Hero:** Instrument Serif Italic, massive scale, single word or short phrase
- **Section Intros:** Instrument Serif Italic, 1-2 sentences max, warm and inviting
- **Section Headings:** Satoshi 900, sentence case (not uppercase), tight letter-spacing
- **Body:** Inter 400, 1.6 line-height, 65-75 character line length
- **Labels/Tags:** JetBrains Mono, uppercase, wide letter-spacing, 0.625rem
- **Overlines:** JetBrains Mono, uppercase, wide letter-spacing, accent color

### 1.3 Spacing System

**Philosophy:** Generous whitespace creates luxury. Use a 4pt base grid with deliberate vertical rhythm.

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.5rem;     /* 24px */
--space-6: 2rem;       /* 32px */
--space-7: 2.5rem;     /* 40px */
--space-8: 3rem;       /* 48px */
--space-9: 4rem;       /* 64px */
--space-10: 5rem;      /* 80px */
--space-11: 6rem;      /* 96px */
--space-12: 8rem;      /* 128px */
--space-13: 10rem;     /* 160px */
--space-14: 12rem;     /* 192px */
```

**Section Spacing:**
- Hero: 100vh min-height with centered content
- Standard sections: `--space-12` (128px) vertical padding
- Dense sections: `--space-10` (80px) vertical padding
- Between elements: `--space-8` (48px) minimum

### 1.4 Grid System

**Philosophy:** Asymmetric, editorial grids. Not card grids. Think magazine layouts.

```css
--grid-12: repeat(12, 1fr);           /* Full grid */
--grid-8: repeat(8, 1fr);            /* Content grid */
--grid-6: repeat(6, 1fr);            /* Half grid */
--grid-sidebar: 1fr 2fr;             /* Sidebar layout */
--grid-editorial: 2fr 1fr;           /* Editorial layout */
--grid-panoramic: 3fr 1fr;           /* Wide + narrow */
```

**Grid Usage:**
- Hero: Full-bleed, centered or asymmetric split
- About: Editorial (2:1) with portrait and text
- Services: Bento grid (mixed sizes)
- Portfolio: Masonry or staggered layout
- Process: Horizontal scroll or diagonal layout
- Contact: Split (form left, info right)

### 1.5 Border & Radius System

```css
--radius-none: 0;
--radius-sm: 4px;       /* Subtle rounding */
--radius-md: 8px;       /* Cards, buttons */
--radius-lg: 16px;      /* Large cards, modals */
--radius-xl: 24px;      /* Hero elements */
--radius-full: 9999px;  /* Pills, avatars */
```

**Border Rules:**
- Cards: 1px border at `Stone` at 15% opacity
- Buttons: No border, use background contrast
- Dividers: 1px horizontal, `Stone` at 10% opacity
- Hover states: Border color transitions to accent

### 1.6 Shadow & Elevation System

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
--shadow-md: 0 4px 12px rgba(0,0,0,0.4);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.5);
--shadow-xl: 0 16px 48px rgba(0,0,0,0.6);
--shadow-glow: 0 0 20px rgba(200,255,0,0.15); /* Signal glow */
--shadow-glow-accent: 0 0 30px rgba(255,107,74,0.15); /* Horizon glow */
```

### 1.7 Motion System

**Philosophy:** Motion should feel physical and intentional. Every animation has purpose. Think Apple's product page reveals × Stripe's checkout animations.

#### Easing Functions

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### Duration Scale

```css
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;
--duration-cinematic: 1200ms;
```

#### Animation Types

1. **Reveal (Scroll-triggered):**
   - Text: Clip-path wipe from bottom, stagger 50ms per word
   - Images: Scale from 1.1 to 1.0 + fade, 800ms
   - Cards: Translate Y 40px → 0 + fade, 600ms, stagger 100ms

2. **Hover (Interactive):**
   - Buttons: Scale 1.02, background shift, 200ms
   - Cards: Translate Y -4px, shadow increase, 300ms
   - Links: Underline slide-in from left, 200ms

3. **Page Transitions:**
   - Loading: Logo pulse → full-screen wipe
   - Section transitions: Parallax fade with depth shift

4. **Micro-interactions:**
   - Custom cursor: Scale on hover, color change on interactive
   - Magnetic buttons: Subtle pull toward cursor on hover
   - Toggle switches: Smooth spring animation
   - Accordion: Grid-template-rows animation, 400ms

5. **Background Motion:**
   - Gradient shift: Subtle hue rotation over 20s
   - Noise texture: Slow drift at 0.5px/s
   - Parallax layers: 3-tier depth on scroll

---

## 2. Component Architecture

### 2.1 Navigation

**Concept:** Minimal top bar that transforms on scroll. No hamburger on desktop. Clean, confident.

**Desktop:**
- Fixed top, full-width
- Left: Logo (wordmark, not icon)
- Center: Nothing (clean)
- Right: Language switcher (pill toggle) + "Let's Talk" CTA button
- On scroll: Background blur + subtle border-bottom, height reduces

**Mobile:**
- Same as desktop but logo left, hamburger right
- Full-screen overlay menu with large typography
- Menu items: Center-aligned, generous spacing
- Bottom: Language switcher + CTA

**Interactions:**
- Nav links: Underline slide-in on hover
- CTA button: Magnetic pull effect
- Mobile menu: Staggered reveal, 50ms per item
- Scroll: Smooth transition between states

### 2.2 Hero Section

**Concept:** Show, don't tell. Hero should showcase work, not just name.

**Layout:**
- Full viewport height
- Left 60%: Large display text "Websites that work as hard as you do"
- Right 40%: Floating portfolio preview (3-4 project thumbnails with subtle parallax)
- Bottom: Trust bar (client logos or "Trusted by 22+ businesses")
- Scroll indicator: Animated chevron

**Typography:**
- Overline: "WEB DESIGN • JOHANNESBURG • SOUTH AFRICA" (JetBrains Mono, Signal color)
- Display: "Websites that work as hard as you do" (Instrument Serif Italic, Mist color)
- Subtext: One sentence value prop (Inter 400, Fog color)

**Interactions:**
- Text: Character-by-character reveal on load, 50ms stagger
- Portfolio images: Parallax float on mouse move (subtle, 10px range)
- Trust bar: Fade-in after hero text reveals
- Scroll indicator: Bounce animation

### 2.3 Services Section

**Concept:** Bento grid showing services as interconnected capabilities, not isolated cards.

**Layout:**
- Section intro: "What we do" (Instrument Serif Italic)
- Bento grid: 6 items in asymmetric layout
  - Large card: Website Design (spans 2 columns)
  - Medium card: Full-Stack Development
  - Medium card: SEO & Performance
  - Small card: Cloud Deployment
  - Small card: UI/UX Design
  - Small card: Branding & Identity

**Card Design:**
- Background: Surface color
- Border: 1px Stone at 15%
- Content: Overline (JetBrains Mono, accent color) + Heading (Satoshi 700) + Description (Inter 400)
- Hover: Border color → accent, subtle Y translation

**Interactions:**
- Cards: Staggered reveal on scroll, 100ms delay between
- Hover: Border color transition + subtle lift
- Click: Expand to reveal case study or detailed info

### 2.4 Portfolio Section

**Concept:** Showcase results, not just screenshots. Each project tells a story.

**Layout:**
- Section intro: "Selected work" (Instrument Serif Italic)
- Filter bar: All / Web Design / Development / SEO (pill toggles)
- Masonry grid: 6-8 projects, mixed sizes
  - 2-3 large feature cards (spans 2 columns)
  - 4-6 standard cards

**Card Design:**
- Image: Full bleed, aspect-ratio 4:3 or 16:9
- Overlay: Gradient from transparent to Ink at 80%
- Content: Client name (Satoshi 700) + Category (JetBrains Mono) + Brief result metric
- Hover: Image scale 1.05, overlay fades, "View Project" CTA appears

**Interactions:**
- Filter: Smooth reflow with FLIP animation
- Hover: Image scale + overlay shift
- Click: Case study modal or dedicated page
- Scroll: Parallax on images

### 2.5 Process Section

**Concept:** Visual timeline showing the journey, not just steps.

**Layout:**
- Section intro: "How we work" (Instrument Serif Italic)
- Horizontal scroll or diagonal layout
- 4 steps with:
  - Step number (large, Instrument Serif Italic, accent color)
  - Title (Satoshi 700)
  - Description (Inter 400)
  - Visual indicator (icon or illustration)

**Steps:**
1. Discovery Call — "We listen, understand, and define"
2. Strategy & Design — "Plan the perfect solution"
3. Build & Optimise — "Craft with precision"
4. Launch & Grow — "Deliver and iterate"

**Interactions:**
- Horizontal scroll with pinned container
- Steps reveal as you scroll horizontally
- Each step has subtle entrance animation
- Progress indicator shows current step

### 2.6 About Section

**Concept:** Personal, warm, and professional. Show the human behind the work.

**Layout:**
- Editorial split: Left 40% portrait, Right 60% text
- Portrait: Stopher Malik, black and white or muted, with subtle grain texture
- Text:
  - Overline: "About" (JetBrains Mono)
  - Heading: "Hi, I'm Stopher" (Satoshi 900)
  - Bio: 2-3 paragraphs, warm and personal
  - Stats: 22+ Projects, 100% Satisfaction, 48h First Draft
  - Tech stack: Minimal pills showing key technologies

**Interactions:**
- Portrait: Subtle parallax on scroll
- Stats: Count-up animation on scroll into view
- Tech pills: Staggered reveal

### 2.7 Testimonials Section

**Concept:** Social proof that feels authentic, not generic.

**Layout:**
- Section intro: "Kind words" (Instrument Serif Italic)
- Carousel or stacked cards
- Each testimonial:
  - Quote (Inter 400, large size)
  - Client name (Satoshi 700)
  - Business name (JetBrains Mono, accent color)
  - Star rating (5 stars, Glow color)

**Interactions:**
- Auto-advance carousel with manual controls
- Smooth slide transition
- Quote marks as decorative elements

### 2.8 Pricing Section

**Concept:** Clear, transparent, no surprises. Guide toward the right choice.

**Layout:**
- Section intro: "Investment" (Instrument Serif Italic)
- 3-column layout
- Each tier:
  - Tier name (Satoshi 700)
  - Price range (Inter 300, large)
  - "Best for" label (JetBrains Mono, accent color)
  - Feature list (Inter 400, checkmark icons)
  - CTA button (Signal color for recommended tier)

**Recommended Tier:**
- "Growth" tier highlighted
- Border: Signal color
- CTA: Signal color background
- Badge: "Most Popular" (JetBrains Mono)

**Interactions:**
- Cards: Staggered reveal
- Hover: Subtle lift + shadow increase
- CTA: Magnetic button effect

### 2.9 Contact Section

**Concept:** Warm, inviting, and professional. Make reaching out feel easy.

**Layout:**
- Split: Left 50% form, Right 50% info
- Form:
  - Name, Email, Phone (optional), Service dropdown, Message
  - Clean, minimal inputs
  - Submit button (Signal color)
- Info:
  - Email, Phone, WhatsApp
  - Social links (icon buttons)
  - Business hours
  - Location (Paulshof, Sandton)

**Interactions:**
- Form inputs: Floating labels, focus state with accent border
- Submit: Loading spinner, success message
- Social links: Hover scale + color change

### 2.10 Footer

**Concept:** Clean, minimal, and confident. Not a link dump.

**Layout:**
- Top: CTA section (same as mid-page CTA)
- Middle: 4-column grid
  - Column 1: Logo + tagline
  - Column 2: Navigation links
  - Column 3: Services links
  - Column 4: Contact info + social
- Bottom: Legal row (copyright, privacy policy, terms)

**Interactions:**
- Footer links: Underline slide-in on hover
- Social links: Hover scale

---

## 3. Interaction Design

### 3.1 Custom Cursor

**Concept:** Premium, purposeful cursor that enhances interaction.

**States:**
- Default: Small dot (8px, Mist color)
- Hover (interactive): Scale up (24px), accent color, shows label
- Hover (text): Hide custom cursor, show text cursor
- Dragging: Scale down, color change

**Implementation:**
- Two elements: outer ring + inner dot
- Outer ring follows with spring easing
- Inner dot follows with slight delay
- On interactive hover: ring scales, dot changes color

### 3.2 Magnetic Buttons

**Concept:** Buttons that respond to cursor proximity, creating a magnetic pull effect.

**Behavior:**
- When cursor is within 100px of button, button subtly moves toward cursor
- Movement is constrained (max 10px translation)
- On hover: button scale 1.02, background shift
- On click: scale 0.98 (press effect)
- Spring easing for natural feel

### 3.3 Text Reveal Animations

**Concept:** Text that reveals character-by-character or word-by-word on scroll.

**Types:**
1. **Clip Wipe:** Text revealed from bottom via clip-path
2. **Character Split:** Each character animates individually
3. **Word Split:** Each word fades in with stagger
4. **Line Split:** Each line slides up with stagger

**Usage:**
- Hero text: Character split on load
- Section headings: Clip wipe on scroll
- Body text: Word split on scroll (subtle)
- Overlines: Fade in (no split)

### 3.4 Scroll-Triggered Reveals

**Concept:** Elements that animate into view as you scroll.

**Animation Library:**
1. **Fade Up:** Translate Y 40px → 0 + opacity 0 → 1
2. **Fade Scale:** Scale 0.95 → 1 + opacity 0 → 1
3. **Slide In Left/Right:** Translate X ±40px → 0
4. **Reveal Wipe:** Clip-path from 100% to 0%
5. **Parallax:** Background moves at different scroll speed

**Stagger Rules:**
- Cards: 100ms between each
- List items: 50ms between each
- Text lines: 50ms between each

### 3.5 Page Loading

**Concept:** Minimal, elegant loading screen that sets the tone.

**Sequence:**
1. Black screen with logo (centered)
2. Logo pulses once
3. Full-screen wipe reveals page (top to bottom)
4. Hero text begins character reveal

**Duration:** 1.5s total

### 3.6 Smooth Scrolling

**Concept:** Buttery smooth scroll with subtle momentum.

**Implementation:**
- Lenis for smooth scroll
- Parallax on images and background elements
- Scroll-triggered animations via GSAP ScrollTrigger
- Respect `prefers-reduced-motion`

---

## 4. Responsive Strategy

### 4.1 Breakpoints

```css
--bp-sm: 640px;    /* Mobile landscape */
--bp-md: 768px;    /* Tablet */
--bp-lg: 1024px;   /* Desktop */
--bp-xl: 1280px;   /* Large desktop */
--bp-2xl: 1536px;  /* Ultra-wide */
```

### 4.2 Mobile Adaptations

**Navigation:**
- Hamburger → full-screen overlay menu
- Large typography for menu items
- Language switcher at bottom

**Grid Layouts:**
- Bento grids → single column
- Masonry → single column
- Split layouts → stacked

**Typography:**
- Fluid scaling via clamp()
- Hero text scales down gracefully
- Body text remains readable

**Interactions:**
- Disable custom cursor on touch devices
- Simplify hover states
- Keep scroll animations but reduce intensity

### 4.3 Tablet Adaptations

- 2-column grids where appropriate
- Larger touch targets
- Simplified bento grid

---

## 5. Content Strategy

### 5.1 Voice & Tone

**Brand Voice:**
- Confident but not arrogant
- Technical but accessible
- Professional but warm
- Direct but not pushy

**Tone Variations:**
- Hero: Bold, aspirational
- Services: Clear, benefit-focused
- Portfolio: Results-oriented, specific
- About: Personal, authentic
- Contact: Warm, inviting

### 5.2 Messaging Framework

**Value Proposition:**
"Websites that work as hard as you do. Built to convert, designed to impress."

**Proof Points:**
- 22+ businesses transformed
- 100% client satisfaction
- 48-hour first draft delivery
- R1,500 - R9,000+ investment ranges

**Social Proof:**
- Client testimonials with specific results
- Portfolio showing real businesses
- Trust badges (payment methods, business registration)

### 5.3 SEO Keywords

**Primary:**
- Web designer Johannesburg
- Website design South Africa
- Web designer Sandton

**Secondary:**
- SEO Johannesburg
- Small business website
- E-commerce website South Africa
- React developer Johannesburg

**Long-tail:**
- How much does a website cost in South Africa
- Best web designer for small business
- Professional website design for restaurants

---

## 6. Technical Architecture

### 6.1 File Structure

```
SM-UPGRADE/
├── index.html              (homepage)
├── blog/
│   ├── index.html          (blog listing)
│   └── [slug]/
│       └── index.html      (blog posts)
├── privacy.html            (privacy policy)
├── 404.html                (custom error page)
├── css/
│   ├── tokens.css          (design tokens)
│   ├── base.css            (reset, base styles)
│   ├── components.css      (UI components)
│   ├── sections.css        (section layouts)
│   └── responsive.css      (media queries)
├── js/
│   ├── app.js              (main application)
│   ├── animations.js       (GSAP animations)
│   ├── cursor.js           (custom cursor)
│   └── translations.js     (i18n strings)
├── assets/
│   ├── images/             (optimized images)
│   └── fonts/              (self-hosted fonts)
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

### 6.2 Performance Budget

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
- Total page weight: < 500KB (excluding images)

### 6.3 Image Strategy

- Format: WebP with JPEG fallback
- Lazy loading: All below-fold images
- Responsive: srcset with 3 sizes (640w, 1024w, 1920w)
- Compression: 80% quality for photos, lossless for graphics
- Hero images: Preload critical images

### 6.4 Font Strategy

- Self-hosted fonts (no Google Fonts dependency)
- Preload critical fonts (Display + Heading)
- `font-display: swap` for all fonts
- Subset fonts to include only necessary characters

---

## 7. Animation Specifications

### 7.1 Hero Load Sequence

**Timeline (0ms → 2500ms):**

1. **0ms:** Black screen, logo appears (opacity 0 → 1, 300ms)
2. **500ms:** Logo pulses (scale 1 → 1.05 → 1, 600ms)
3. **1100ms:** Full-screen wipe (clip-path from top, 800ms)
4. **1900ms:** Overline fades in (opacity 0 → 1, 300ms)
5. **2200ms:** Hero text character reveal (50ms per character)
6. **After text:** Subtext fades in (opacity 0 → 1, 400ms)
7. **After subtext:** Trust bar slides up (translate Y 20px → 0, 400ms)

### 7.2 Scroll Reveal Sequence

**Section Entrance:**
1. Overline fades in (opacity 0 → 1, 300ms)
2. Heading clip-wipes in (clip-path 100% → 0%, 600ms)
3. Subtext fades in (opacity 0 → 1, 400ms, 200ms delay)
4. Content elements stagger in (100ms between each)

### 7.3 Hover States

**Buttons:**
- Scale: 1 → 1.02 (200ms)
- Background: Subtle shift (200ms)
- Box shadow: Increase (200ms)

**Cards:**
- Translate Y: 0 → -4px (300ms)
- Box shadow: Increase (300ms)
- Border color: Stone → Accent (300ms)

**Links:**
- Underline: Slide in from left (200ms)
- Color: Fog → Mist (200ms)

### 7.4 Micro-interactions

**Custom Cursor:**
- Position: Spring easing (0.34, 1.56, 0.64, 1)
- Scale on hover: 1 → 1.5 (200ms)
- Color change: Mist → Accent (200ms)

**Magnetic Buttons:**
- Translation: Spring easing, max 10px
- Scale: 1 → 1.02 (200ms)
- Return: Spring easing (0.34, 1.56, 0.64, 1)

**Accordion:**
- Grid-template-rows: 0fr → 1fr (400ms)
- Content opacity: 0 → 1 (300ms, 100ms delay)
- Icon rotation: 0deg → 45deg (300ms)

---

## 8. Accessibility

### 8.1 Core Requirements

- Skip-to-content link
- Semantic HTML (header, nav, main, section, article, footer)
- ARIA labels on interactive elements
- Focus visible states (custom, high-contrast)
- `prefers-reduced-motion` support (disable all animations)
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Keyboard navigation: All interactive elements focusable

### 8.2 Enhanced Accessibility

- Screen reader announcements for dynamic content
- Reduced motion: Simplified animations, no parallax
- High contrast mode: Ensure visibility
- Touch targets: Minimum 44x44px on mobile

---

## 9. Implementation Phases

### Phase 1: Foundation (This Document)
- [x] Design system documentation
- [x] UX blueprint
- [x] Component specifications
- [x] Animation specifications

### Phase 2: Homepage Build
- [ ] tokens.css (refined)
- [ ] base.css (premium reset)
- [ ] components.css (all UI components)
- [ ] sections.css (all section layouts)
- [ ] index.html (complete homepage)
- [ ] app.js (GSAP, Lenis, interactions)
- [ ] cursor.js (custom cursor)
- [ ] animations.js (scroll reveals)

### Phase 3: Remaining Pages
- [ ] Blog listing page
- [ ] Blog post template
- [ ] Privacy policy page
- [ ] 404 error page

### Phase 4: Polish & Optimization
- [ ] Performance optimization
- [ ] Image optimization
- [ ] Font optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Final animation polish

---

## 10. Success Metrics

### Visual Quality
- [ ] Design feels custom, not template-based
- [ ] Every section is visually distinct
- [ ] Typography creates clear hierarchy
- [ ] Color palette is sophisticated and varied
- [ ] Whitespace creates luxury feel

### Interaction Quality
- [ ] Animations feel smooth and purposeful
- [ ] Custom cursor enhances experience
- [ ] Magnetic buttons feel physical
- [ ] Scroll reveals are satisfying
- [ ] Page load feels premium

### Technical Quality
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals all green
- [ ] No layout shift
- [ ] Fast first paint
- [ ] Smooth scroll performance

### Business Quality
- [ ] All content preserved
- [ ] All functionality working
- [ ] SEO maintained/improved
- [ ] Contact form functional
- [ ] WhatsApp integration working
- [ ] Language switching working
- [ ] All links working

---

**Document Version:** 1.0
**Last Updated:** January 2026
**Author:** Creative Director
