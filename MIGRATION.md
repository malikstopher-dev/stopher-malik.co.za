# Static-to-Next Migration Contract

## Source of truth

- Layout, copy, assets, metadata, and integrations: `../SM-UPGRADE`
- Visual direction: the Darko-inspired system in `../SM-UPGRADE/css`
- Explicit migration overrides: use `#378ADD` as the primary accent and implement the Phase 2 Three.js globe with a Bucharest marker
- Preserve intended characters when the static source contains encoding artifacts (for example, `·`, `—`, and Portuguese diacritics)

## Route strategy

- App Router pages use extensionless routes.
- Legacy `.html` URLs remain requestable through rewrites to their App Router equivalents.
- Existing blog trailing-slash URLs remain canonical.
- `google2eb5f1f9b4260ae5.html` remains a public static verification file.

## Top-level routes

| Existing URL | Next route | Phase |
| --- | --- | --- |
| `/` | `/` | 1 |
| `/index.html` | rewrite to `/` | 4 |
| `/about.html` | `/about/` | 2 |
| `/projects.html` | `/projects/` | 2 |
| `/stack.html` | `/stack/` | 2 |
| `/contact.html` | `/contact/` | 2 |
| `/web-design.html` | `/web-design/` | 2 |
| `/ecommerce.html` | `/ecommerce/` | 2 |
| `/seo-performance.html` | `/seo-performance/` | 2 |
| `/branding.html` | `/branding/` | 2 |
| `/privacy.html` | `/privacy/` | 2 |
| `/blog/` | `/blog/` | 3 |
| `/google2eb5f1f9b4260ae5.html` | public static file | 4 |

## Blog article routes

The static site has 50 article routes. Together with `/blog/`, these account for 51 blog HTML documents.

1. `/blog/affordable-web-design-south-africa/`
2. `/blog/architect-website-design/`
3. `/blog/brand-identity-website-design/`
4. `/blog/branding-strategy-for-small-businesses/`
5. `/blog/cleaning-company-website-design/`
6. `/blog/color-psychology-in-web-design/`
7. `/blog/construction-company-website-design/`
8. `/blog/content-marketing-strategy-guide/`
9. `/blog/conversion-rate-optimization-guide/`
10. `/blog/custom-website-vs-template/`
11. `/blog/digital-marketing-strategy-small-business/`
12. `/blog/ecommerce-website-development-south-africa/`
13. `/blog/electrical-contractor-website/`
14. `/blog/google-business-profile-optimization/`
15. `/blog/high-converting-website-design/`
16. `/blog/hire-web-designer-south-africa/`
17. `/blog/how-much-does-a-website-cost/`
18. `/blog/keyword-research-strategy/`
19. `/blog/link-building-strategies-for-seo/`
20. `/blog/local-seo-strategy-johannesburg/`
21. `/blog/mobile-first-responsive-web-design/`
22. `/blog/modern-website-design-trends-2026/`
23. `/blog/on-page-seo-best-practices/`
24. `/blog/online-reputation-management-business/`
25. `/blog/progressive-web-apps-for-business/`
26. `/blog/real-estate-website-design/`
27. `/blog/restaurant-website-design-guide/`
28. `/blog/seo-analytics-reporting-guide/`
29. `/blog/seo-for-small-businesses-south-africa/`
30. `/blog/seo-vs-paid-ads/`
31. `/blog/single-page-vs-multi-page-websites/`
32. `/blog/social-media-integration-website/`
33. `/blog/technical-seo-audit-checklist/`
34. `/blog/typography-guide-for-websites/`
35. `/blog/ui-vs-ux-design-explained/`
36. `/blog/visual-hierarchy-in-web-design/`
37. `/blog/voice-search-seo-optimization/`
38. `/blog/web-design-cost-south-africa-2026/`
39. `/blog/web-design-johannesburg/`
40. `/blog/web-design-south-africa/`
41. `/blog/website-accessibility-compliance-south-africa/`
42. `/blog/website-design-johannesburg/`
43. `/blog/website-development-process-explained/`
44. `/blog/website-for-small-business/`
45. `/blog/website-maintenance-importance/`
46. `/blog/website-redesign-strategy/`
47. `/blog/website-speed-optimization-techniques/`
48. `/blog/what-is-seo-and-how-it-works/`
49. `/blog/why-seo-takes-time/`
50. `/blog/why-your-business-needs-a-website/`

## Phase 1 boundary

- Shared root metadata and fonts
- Responsive navigation
- Cinematic homepage hero
- Skills/expertise section
- Shared footer
- No globe and no blog implementation
