"use client";

import Link from "next/link";

const posts = [
  { slug: "what-is-seo-and-how-it-works", title: "What Is SEO and How It Works - Explained Simply", category: "SEO", date: "20 March 2026", excerpt: "SEO doesn't have to be confusing. Here's a simple explanation of how search engine optimisation works and why your business needs it.", readTime: "6 min read" },
  { slug: "web-design-johannesburg", title: "Web Design Johannesburg - Professional Websites for Local Businesses", category: "SEO", date: "15 August 2026", excerpt: "Professional web design services in Johannesburg. Get a high-performance website that helps your local business grow.", readTime: "5 min read" },
  { slug: "affordable-web-design-south-africa", title: "Affordable Web Design South Africa - Quality Websites at Fair Prices", category: "SEO", date: "10 September 2026", excerpt: "Quality web design at fair prices is what we do. Here's what you get at each price point.", readTime: "5 min read" },
  { slug: "architect-website-design", title: "Architect Website Design - Portfolio Sites That Win Projects", category: "Web Design", date: "15 September 2026", excerpt: "How to build an architecture website that showcases your portfolio and converts visitors into clients.", readTime: "6 min read" },
  { slug: "brand-identity-website-design", title: "Brand Identity Website Design - Consistent Visual Language", category: "Branding", date: "20 September 2026", excerpt: "Why your website needs a cohesive brand identity system and how to implement it.", readTime: "5 min read" },
  { slug: "branding-strategy-for-small-businesses", title: "Branding Strategy for Small Businesses - Stand Out in South Africa", category: "Branding", date: "25 September 2026", excerpt: "A practical guide to building a memorable brand on a small business budget.", readTime: "7 min read" },
  { slug: "cleaning-company-website-design", title: "Cleaning Company Website Design - Trust-Building Layouts", category: "Web Design", date: "30 September 2026", excerpt: "Design patterns that build trust and convert visitors for cleaning service businesses.", readTime: "5 min read" },
  { slug: "color-psychology-in-web-design", title: "Color Psychology in Web Design - Choose Colours That Convert", category: "Web Design", date: "5 October 2026", excerpt: "How colour choices affect user behaviour and conversion rates on South African websites.", readTime: "6 min read" },
  { slug: "construction-company-website-design", title: "Construction Company Website Design - Project Showcases That Sell", category: "Web Design", date: "10 October 2026", excerpt: "Essential elements for construction websites that win tenders and attract clients.", readTime: "6 min read" },
  { slug: "content-marketing-strategy-guide", title: "Content Marketing Strategy Guide - Blog Posts That Rank", category: "SEO", date: "15 October 2026", excerpt: "How to create a content strategy that drives organic traffic and generates leads.", readTime: "8 min read" },
  { slug: "conversion-rate-optimization-guide", title: "Conversion Rate Optimisation Guide - Turn Visitors Into Clients", category: "SEO", date: "20 October 2026", excerpt: "Proven CRO techniques for South African business websites.", readTime: "7 min read" },
  { slug: "custom-website-vs-template", title: "Custom Website vs Template - Which Is Right for Your Business?", category: "Web Design", date: "25 October 2026", excerpt: "Comparing custom development and template solutions for different business needs.", readTime: "6 min read" },
  { slug: "digital-marketing-strategy-small-business", title: "Digital Marketing Strategy for Small Business - South Africa Focus", category: "SEO", date: "30 October 2026", excerpt: "A complete digital marketing framework tailored for South African SMEs.", readTime: "8 min read" },
  { slug: "ecommerce-website-development-south-africa", title: "E-Commerce Website Development South Africa - Online Stores That Sell", category: "E-Commerce", date: "5 November 2026", excerpt: "Building conversion-optimised online stores for the South African market.", readTime: "7 min read" },
  { slug: "electrical-contractor-website", title: "Electrical Contractor Website - Professional Services Online", category: "Web Design", date: "10 November 2026", excerpt: "Key website elements for electrical contractors to win commercial and residential work.", readTime: "5 min read" },
  { slug: "google-business-profile-optimization", title: "Google Business Profile Optimisation - Local SEO Essentials", category: "SEO", date: "15 November 2026", excerpt: "Step-by-step guide to optimising your Google Business Profile for local search dominance.", readTime: "6 min read" },
  { slug: "high-converting-website-design", title: "High-Converting Website Design - Psychology of Persuasion", category: "Web Design", date: "20 November 2026", excerpt: "Design principles that turn visitors into paying customers.", readTime: "7 min read" },
  { slug: "hire-web-designer-south-africa", title: "Hire Web Designer South Africa - What to Look For", category: "Web Design", date: "25 November 2026", excerpt: "How to evaluate and hire the right web designer for your South African business.", readTime: "5 min read" },
  { slug: "how-much-does-a-website-cost", title: "How Much Does a Website Cost in South Africa? 2026 Pricing Guide", category: "Web Design", date: "30 November 2026", excerpt: "Transparent pricing breakdown for different website types and complexities.", readTime: "6 min read" },
  { slug: "keyword-research-strategy", title: "Keyword Research Strategy - Find Terms Your Customers Search", category: "SEO", date: "5 December 2026", excerpt: "Effective keyword research methods for South African search markets.", readTime: "7 min read" },
  { slug: "link-building-strategies-for-seo", title: "Link Building Strategies for SEO - Quality Over Quantity", category: "SEO", date: "10 December 2026", excerpt: "White-hat link building tactics that work in South Africa.", readTime: "7 min read" },
  { slug: "local-seo-strategy-johannesburg", title: "Local SEO Strategy Johannesburg - Dominate Your Neighbourhood", category: "SEO", date: "15 December 2026", excerpt: "Hyper-local SEO tactics for Johannesburg businesses.", readTime: "6 min read" },
  { slug: "mobile-first-responsive-web-design", title: "Mobile-First Responsive Web Design - Design for the 70%+ Mobile Traffic", category: "Web Design", date: "20 December 2026", excerpt: "Why mobile-first is non-negotiable for South African websites.", readTime: "5 min read" },
  { slug: "modern-website-design-trends-2026", title: "Modern Website Design Trends 2026 - What's In and What's Out", category: "Web Design", date: "25 December 2026", excerpt: "The design trends shaping South African websites this year.", readTime: "6 min read" },
  { slug: "on-page-seo-best-practices", title: "On-Page SEO Best Practices - Complete Checklist", category: "SEO", date: "30 December 2026", excerpt: "Technical on-page SEO checklist for every page you publish.", readTime: "7 min read" },
  { slug: "online-reputation-management-business", title: "Online Reputation Management for Business - Protect Your Brand", category: "SEO", date: "5 January 2027", excerpt: "How to monitor and improve your business reputation online.", readTime: "6 min read" },
  { slug: "progressive-web-apps-for-business", title: "Progressive Web Apps for Business - App-Like Web Experiences", category: "Web Design", date: "10 January 2027", excerpt: "When and why to build a PWA for your South African business.", readTime: "6 min read" },
  { slug: "real-estate-website-design", title: "Real Estate Website Design - Listings That Convert", category: "Web Design", date: "15 January 2027", excerpt: "Essential features for real estate websites in South Africa.", readTime: "6 min read" },
  { slug: "restaurant-website-design-guide", title: "Restaurant Website Design Guide - Menus, Booking & More", category: "Web Design", date: "20 January 2027", excerpt: "Everything a restaurant website needs to drive reservations.", readTime: "7 min read" },
  { slug: "seo-analytics-reporting-guide", title: "SEO Analytics & Reporting Guide - Measure What Matters", category: "SEO", date: "25 January 2027", excerpt: "Setting up GA4, Search Console, and custom SEO dashboards.", readTime: "7 min read" },
  { slug: "seo-for-small-businesses-south-africa", title: "SEO for Small Businesses South Africa - Complete Guide", category: "SEO", date: "30 January 2027", excerpt: "A practical guide to SEO for small businesses in South Africa. Learn how to get found on Google without breaking the bank.", readTime: "8 min read" },
  { slug: "seo-vs-paid-ads", title: "SEO vs Paid Ads - Which Should You Choose?", category: "SEO", date: "5 February 2027", excerpt: "Comparing organic search and paid advertising for South African businesses.", readTime: "6 min read" },
  { slug: "single-page-vs-multi-page-websites", title: "Single-Page vs Multi-Page Websites - Which Converts Better?", category: "Web Design", date: "10 February 2027", excerpt: "When to use single-page vs multi-page layouts for your business.", readTime: "5 min read" },
  { slug: "social-media-integration-website", title: "Social Media Integration Website - Connect Your Channels", category: "Web Design", date: "15 February 2027", excerpt: "How to seamlessly integrate social media into your website.", readTime: "5 min read" },
  { slug: "technical-seo-audit-checklist", title: "Technical SEO Audit Checklist - Find & Fix Issues", category: "SEO", date: "20 February 2027", excerpt: "Complete technical SEO audit checklist for South African websites.", readTime: "7 min read" },
  { slug: "typography-guide-for-websites", title: "Typography Guide for Websites - Fonts That Read Well", category: "Web Design", date: "25 February 2027", excerpt: "Choosing and implementing web typography for readability and brand.", readTime: "6 min read" },
  { slug: "ui-vs-ux-design-explained", title: "UI vs UX Design Explained - The Difference That Matters", category: "Web Design", date: "1 March 2027", excerpt: "Understanding the distinction between UI and UX for better outcomes.", readTime: "5 min read" },
  { slug: "visual-hierarchy-in-web-design", title: "Visual Hierarchy in Web Design - Guide the Eye", category: "Web Design", date: "5 March 2027", excerpt: "How visual hierarchy directs user attention and improves conversions.", readTime: "6 min read" },
  { slug: "voice-search-seo-optimization", title: "Voice Search SEO Optimisation - Ready for the Future", category: "SEO", date: "10 March 2027", excerpt: "Optimising for voice search in the South African context.", readTime: "5 min read" },
  { slug: "web-design-cost-south-africa-2026", title: "Web Design Cost South Africa 2026 - Complete Price Breakdown", category: "Web Design", date: "15 March 2027", excerpt: "Detailed pricing for every type of website in the South African market.", readTime: "6 min read" },
  { slug: "web-design-south-africa", title: "Web Design South Africa - Nationwide Services", category: "Web Design", date: "20 March 2027", excerpt: "Remote web design services for businesses across South Africa.", readTime: "5 min read" },
  { slug: "website-accessibility-compliance-south-africa", title: "Website Accessibility Compliance South Africa - WCAG Guide", category: "Web Design", date: "25 March 2027", excerpt: "Making your website accessible to all users and compliant with regulations.", readTime: "6 min read" },
  { slug: "website-design-johannesburg", title: "Website Design Johannesburg - Custom Solutions for Local Business", category: "Web Design", date: "20 March 2027", excerpt: "Bespoke website design for Johannesburg businesses that want to stand out.", readTime: "5 min read" },
  { slug: "website-development-process-explained", title: "Website Development Process Explained - From Brief to Launch", category: "Web Design", date: "30 March 2027", excerpt: "Our step-by-step website development process from discovery to deployment.", readTime: "6 min read" },
  { slug: "website-for-small-business", title: "Website for Small Business - Essential Features", category: "Web Design", date: "5 April 2027", excerpt: "The must-have features every small business website needs.", readTime: "5 min read" },
  { slug: "website-maintenance-importance", title: "Website Maintenance Importance - Keep Your Site Running", category: "Web Design", date: "10 April 2027", excerpt: "Why ongoing maintenance is critical for security and performance.", readTime: "5 min read" },
  { slug: "website-redesign-strategy", title: "Website Redesign Strategy - When and How to Refresh", category: "Web Design", date: "15 April 2027", excerpt: "Signs you need a redesign and how to execute it without losing SEO.", readTime: "7 min read" },
  { slug: "website-speed-optimization-techniques", title: "Website Speed Optimisation Techniques - Core Web Vitals", category: "SEO", date: "20 April 2027", excerpt: "Practical speed optimisation techniques for faster South African websites.", readTime: "7 min read" },
  { slug: "why-seo-takes-time", title: "Why SEO Takes Time - The Reality of Organic Growth", category: "SEO", date: "25 April 2027", excerpt: "Understanding the timeline of SEO and why patience pays off.", readTime: "5 min read" },
  { slug: "why-your-business-needs-a-website", title: "Why Your Business Needs a Website - The Digital Imperative", category: "Web Design", date: "30 April 2027", excerpt: "The business case for having a professional website in 2027.", readTime: "5 min read" },
];

const today = new Date();
const publishedPosts = posts.filter((post) => {
  const d = new Date(post.date);
  return d <= today;
});

export function BlogIndex() {
  return (
    <main className="main-content">
      <section className="internal-page about-hero">
        <div className="container">
          <div className="internal-page__hero hero__card card" data-tilt data-magnetic data-holo>
            <h1 className="hero__title" data-reveal>Insights & Guides</h1>
          </div>

          <div className="internal-panel section-card card" data-tilt data-morph data-holo>
            <div className="internal-panel__header">
              <h2 className="section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true"><polygon points="12,3 21,12 12,21 3,12"/></svg>
                Published Articles
              </h2>
            </div>
            <p className="internal-panel__intro">
              Practical guides on web design, SEO, e-commerce, and digital strategy for South African businesses.
            </p>
            {publishedPosts.length === 0 ? (
              <p style={{ color: "var(--white-muted)", textAlign: "center", padding: "var(--space-2xl)" }}>No published articles yet. Check back soon.</p>
            ) : (
              <div className="blog-listing">
                {publishedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="stack-card card"
                    data-tilt
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div>
                      <div style={{ display: "flex", gap: "var(--space-md)", fontSize: "var(--label-sm)", color: "var(--white-muted)", marginBottom: "var(--space-sm)" }}>
                        <span>{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--body-lg)", color: "var(--white)", marginBottom: "var(--space-sm)" }}>{post.title}</h3>
                      <p style={{ fontSize: "var(--body-sm)", color: "var(--white-muted)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-sm)" }}>{post.excerpt}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", fontSize: "var(--label-sm)", color: "var(--accent)" }}>
                        <span>{post.readTime}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
