const SITE_URL = "https://stopher-malik.co.za";
const SMK_URL = "https://smk.stopher-malik.co.za";
const PHONE = "+27729998863";
const EMAIL = "info@stopher-malik.co.za";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stopher Malik | Web Designer Johannesburg",
    alternateName: "SMK Web Design",
    url: SITE_URL,
    description:
      "Web designer in Johannesburg helping South African businesses get more clients. High-converting websites built for performance and real results.",
    inLanguage: "en-ZA",
    publisher: { "@type": "Person", name: "Stopher Malik" },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Stopher Malik",
    url: SITE_URL,
    image: `${SITE_URL}/assets/stopher-portrait.webp`,
    jobTitle: "Web Designer & Full-Stack Developer",
    description:
      "Stopher Malik is a professional web designer and developer based in Johannesburg, South Africa. Founder of SMK Web Design, he builds websites for businesses in South Africa and internationally.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sandton",
      addressRegion: "Gauteng",
      addressCountry: "ZA",
    },
    telephone: PHONE,
    email: EMAIL,
    worksFor: {
      "@type": "Organization",
      name: "SMK Web Design",
      url: SMK_URL,
    },
    knowsAbout: [
      "Web Design",
      "Website Development",
      "SEO",
      "UI/UX Design",
      "React",
      "Next.js",
      "Johannesburg Business Websites",
      "South Africa Digital Marketing",
      "Local SEO",
    ],
    sameAs: [
      "https://www.instagram.com/stophermalik",
      "https://x.com/stopher_malik",
      "https://www.linkedin.com/in/stophermalik/",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "SMK Web Design",
    alternateName: "Stopher Malik Web Design",
    url: SITE_URL,
    sameAs: [SMK_URL],
    image: `${SITE_URL}/assets/stopher-portrait.webp`,
    telephone: PHONE,
    email: EMAIL,
    description:
      "SMK Web Design is a web design studio in Johannesburg, South Africa. We build performance-optimised websites that help businesses attract more clients and grow online.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sandton",
      addressRegion: "Gauteng",
      addressCountry: "ZA",
    },
    geo: { "@type": "GeoCoordinates", latitude: -26.05, longitude: 28.05 },
    areaServed: [
      { "@type": "City", name: "Johannesburg" },
      { "@type": "City", name: "Sandton" },
      { "@type": "City", name: "Pretoria" },
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Democratic Republic of the Congo" },
      { "@type": "Country", name: "Mozambique" },
      { "@type": "Country", name: "Canada" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: "R1500–R9000+",
    currenciesAccepted: "ZAR",
    paymentAccepted: "EFT, SnapScan, Card",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "WhatsApp",
      url: "https://wa.me/27729998863",
    },
  };
}

export function articleSchema(post: {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    ...(post.description ? { description: post.description } : {}),
    author: { "@type": "Person", name: "Stopher Malik", url: SITE_URL },
    publisher: { "@type": "Organization", name: "SMK Web Design", url: SMK_URL },
    image: `${SITE_URL}/assets/og-image-1200x630.png`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.date
      ? { datePublished: post.date, dateModified: post.date }
      : {}),
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
