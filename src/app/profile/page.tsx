import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./profile.module.css";

const profileUrl = "https://stopher-malik.co.za/profile/";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61584357221305" },
  { name: "Instagram", href: "https://www.instagram.com/stophermalik/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/stophermalik/" },
  { name: "X", href: "https://x.com/stopher_malik" },
  { name: "TikTok", href: "https://www.tiktok.com/@stopher_malik" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCh92kSW3JN6gLHXo1kenLWQ" },
  { name: "GitHub", href: "https://github.com/malikstopher-dev" },
  { name: "WhatsApp", href: "https://wa.me/27729998863" },
];

// Current roles supplied directly; earlier roles transcribed from LinkedIn screenshots.
const experience = [
  {
    period: "2023—Present", title: "Stock Control Manager & Administrator",
    employer: "The Boma Cafe", location: "Sandton, South Africa",
    detail: "Managing stock control and administration alongside independent web design and development work.",
  },
  {
    period: "Current · Independent", title: "Web Designer & Developer",
    employer: "SMK Web Design", location: "Johannesburg, South Africa",
    detail: "Working independently to design and develop websites for businesses.",
  },
  {
    period: "June 2023—March 2025", title: "Tracking Clerk",
    employer: "KCT Logistics", location: "Johannesburg, Gauteng",
    detail: "Tracked incoming and outgoing shipments and maintained logistics records and tracking systems.",
  },
  {
    period: "January—May 2023 · Seasonal", title: "Construction Worker",
    employer: "MAbatho Construction", location: "Durban, KwaZulu-Natal",
    detail: "Assisted skilled workers on construction sites and loaded and unloaded materials.",
  },
  {
    period: "March 2021—January 2023", title: "Sales Representative",
    employer: "Linklayer", location: "Durban, KwaZulu-Natal",
    detail: "Promoted company products and maintained customer relationships.",
  },
  {
    period: "December 2012—January 2021", title: "Maintenance Manager",
    employer: "Marulani Game Ranch", location: "Waterberg, Limpopo",
    detail: "Managed maintenance and repair work and supervised daily work activities.",
  },
  {
    period: "September 2009—December 2012", title: "Security Guard",
    employer: "ISFO Security", location: "Johannesburg, Gauteng",
    detail: "Monitored facilities, controlled access, responded to incidents and prepared security reports.",
  },
];

export const metadata: Metadata = {
  title: "Stopher Malik Kitenge | Personal Profile",
  description:
    "Discover Stopher Malik Kitenge's journey from Communication at Université de Lubumbashi to IT studies at Boston City College and a diploma at the University of South Africa.",
  alternates: { canonical: profileUrl },
  openGraph: {
    type: "profile",
    url: profileUrl,
    title: "Stopher Malik Kitenge | Personal Profile",
    description:
      "Discover Stopher Malik Kitenge's story, education, professional work and contact details.",
    images: [
      {
        url: "/assets/stopher-portrait.webp",
        width: 848,
        height: 1264,
        alt: "Portrait of Stopher Malik Kitenge",
      },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Stopher Malik Kitenge",
  birthDate: "1984-08-18",
  birthPlace: {
    "@type": "Place",
    name: "Kinshasa, Democratic Republic of the Congo",
  },
  jobTitle: ["Stock Control Manager & Administrator", "Independent Web Designer & Developer"],
  url: profileUrl,
  image: "https://stopher-malik.co.za/assets/stopher-portrait.webp",
  email: "mailto:info@stopher-malik.co.za",
  telephone: "+27729998863",
  alumniOf: [
    { "@type": "EducationalOrganization", name: "St Victorien" },
    {
      "@type": "CollegeOrUniversity",
      name: "Université de Lubumbashi",
      department: "Communication",
    },
    { "@type": "EducationalOrganization", name: "Boston City College" },
    { "@type": "CollegeOrUniversity", name: "University of South Africa" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  worksFor: [
    { "@type": "Organization", name: "The Boma Cafe", location: "Sandton, South Africa" },
    { "@type": "Organization", name: "SMK Web Design", url: "https://stopher-malik.co.za" },
  ],
  sameAs: socialLinks.filter(link => link.name !== "WhatsApp").map(link => link.href),
};

const education = [
  {
    label: "Early education",
    title: "St Victorien",
    detail: "A formative chapter that nurtured curiosity, discipline and an early interest in language, culture and people.",
  },
  {
    label: "University · 2004—2009",
    title: "Université de Lubumbashi",
    detail: "Communication studies spanning storytelling, media, public engagement and the power of a well-shaped message.",
  },
  {
    label: "IT studies · First institution",
    title: "Boston City College",
    detail: "Computer and Information Technology studies, beginning the next chapter of his education before continuing at the University of South Africa.",
  },
  {
    label: "IT studies · Diploma",
    title: "University of South Africa",
    detail: "Continued his education at UNISA, earning a diploma. His combined period of IT study at Boston City College and UNISA spanned 2010–2017.",
  },
];

function ContactIcon({ name }: { name: "mail" | "phone" | "web" | "pin" }) {
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M7.5 3.5 10 8 7.8 9.6a15 15 0 0 0 6.6 6.6L16 14l4.5 2.5-.8 4a2 2 0 0 1-2 1.5C9.1 21.5 2.5 14.9 2 6.3a2 2 0 0 1 1.5-2l4-.8Z" />,
    web: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function ProfilePage() {
  return (
    <main className={`${styles.page} qr-profile-page`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className={styles.ambientGlow} aria-hidden="true" />

      <section className={styles.signature} aria-labelledby="profile-name">
        <div className={styles.portraitPanel}>
          <Image
            src="/assets/stopher-portrait.webp"
            alt="Portrait of Stopher Malik Kitenge"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 46vw"
            className={styles.portrait}
          />
          <div className={styles.portraitLight} aria-hidden="true" />
          <div className={styles.originBadge}>
            <span>Born</span>
            <strong>18 August 1984</strong>
            <small>Kinshasa · DRC</small>
          </div>
        </div>

        <div className={styles.storyPanel}>
          <div className={styles.goldFrame} aria-hidden="true" />
          <div className={styles.monogram} aria-label="SMK Web Design">
            <span>SMK</span>
            <small>Web Design</small>
          </div>

          <p className={styles.kicker}>Personal profile</p>
          <h1 id="profile-name">Stopher Malik<br />Kitenge</h1>
          <p className={styles.role}>Communicator · Designer · Developer</p>

          <div className={styles.heroActions}>
            <a href="https://wa.me/27729998863" target="_blank" rel="noopener noreferrer">Let&apos;s chat</a>
            <a href="/stopher-malik.vcf" download>Save contact</a>
          </div>

          <div className={styles.ornament} aria-hidden="true"><span /></div>

          <p className={styles.lead}>
            Born in Kinshasa, Stopher&apos;s journey is shaped by communication, creativity and the belief that meaningful ideas deserve a powerful digital presence.
          </p>

          <dl className={styles.identityFacts}>
            <div><dt>College</dt><dd>St Victorien</dd></div>
            <div><dt>University</dt><dd>Université de Lubumbashi</dd></div>
            <div><dt>Study period</dt><dd>Communication · 2004—2009</dd></div>
            <div><dt>IT education</dt><dd>Boston City College, then UNISA · 2010—2017</dd></div>
            <div><dt>Qualification</dt><dd>Diploma · University of South Africa</dd></div>
            <div><dt>Current role</dt><dd>Stock Control Manager &amp; Administrator · The Boma Cafe</dd></div>
            <div><dt>Independent work</dt><dd>Web Designer &amp; Developer</dd></div>
            <div><dt>Based in</dt><dd>Johannesburg, South Africa</dd></div>
          </dl>

          <blockquote>
            “Communication gives an idea its voice. Design gives it a form. Technology gives it reach.”
          </blockquote>

        </div>
      </section>

      <section className={styles.journeySection} aria-labelledby="journey-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>The journey</p>
          <h2 id="journey-heading">Kinshasa to Johannesburg</h2>
          <div className={styles.journeyCopy}>
          <p>
            Stopher Malik Kitenge was born on 18 August 1984 in Kinshasa, Democratic Republic of the Congo. After attending St Victorien, he studied Communication at the Université de Lubumbashi from 2004 to 2009. Those five formative years deepened his interest in storytelling, media and public engagement. That foundation still guides his work today: understand people, communicate clearly and create with intention.
          </p>
          <p>
            From 2010 to 2017, he pursued Computer and Information Technology studies, first at Boston City College and then at the University of South Africa (UNISA), where he earned a diploma. This technical education complements his communication background and informs his work in web design and development.
          </p>
          </div>
        </div>

        <div className={styles.route} aria-label="Personal journey route">
          <div><span>01</span><strong>Kinshasa</strong><small>Origins</small></div>
          <i aria-hidden="true" />
          <div><span>02</span><strong>Lubumbashi</strong><small>Education</small></div>
          <i aria-hidden="true" />
          <div><span>03</span><strong>Johannesburg</strong><small>Building today</small></div>
        </div>
      </section>

      <section className={styles.educationSection} aria-labelledby="education-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Education &amp; purpose</p>
          <h2 id="education-heading">A foundation in communication &amp; technology</h2>
        </div>
        <div className={styles.educationGrid}>
          {education.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.label}</small>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.professionalSection}>
        <div>
          <p className={styles.kicker}>Professional profile</p>
          <h2>Ideas made visible.</h2>
          <p>
            Since 2023, Stopher has worked as Stock Control Manager and Administrator at The Boma Cafe in Sandton. Alongside this role, he works independently as a web designer and developer through SMK Web Design, bringing together his communication and IT education with practical experience in logistics, sales, maintenance and customer service.
          </p>
          <Link href="/projects/">Explore selected work <span aria-hidden="true">→</span></Link>
        </div>
        <ul>
          <li><span>01</span>Web design &amp; development</li>
          <li><span>02</span>Communication strategy</li>
          <li><span>03</span>Brand identity</li>
          <li><span>04</span>SEO &amp; performance</li>
        </ul>
      </section>

      <section className={styles.educationSection} aria-labelledby="experience-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Work experience</p>
          <h2 id="experience-heading">Operations, service &amp; digital work</h2>
        </div>
        <div className={`${styles.educationGrid} ${styles.experienceGrid}`}>
          {experience.map((job) => (
            <article key={`${job.employer}-${job.title}`}>
              <small>{job.period}</small>
              <h3>{job.title}</h3>
              <p><strong>{job.employer}</strong><br />{job.location}</p>
              <p>{job.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.educationSection} aria-labelledby="social-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Stay connected</p>
          <h2 id="social-heading">Find me online</h2>
        </div>
        <ul className={styles.socialLinks}>
          {socialLinks.map(link => (
            <li key={link.name}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.name}<span aria-hidden="true"> ↗</span></a></li>
          ))}
        </ul>
      </section>

      <section className={styles.contactSection} aria-labelledby="contact-heading">
        <div className={styles.contactCopy}>
          <p className={styles.kicker}>Connect</p>
          <h2 id="contact-heading">Let&apos;s create something meaningful.</h2>
          <p>Reach Stopher directly or save this digital profile to your contacts.</p>
        </div>
        <div className={styles.contactList}>
          <a href="mailto:info@stopher-malik.co.za"><ContactIcon name="mail" /><span><small>Email</small>info@stopher-malik.co.za</span></a>
          <a href="tel:+27729998863"><ContactIcon name="phone" /><span><small>Call / WhatsApp</small>+27 72 999 8863</span></a>
          <a href="https://stopher-malik.co.za"><ContactIcon name="web" /><span><small>Website</small>stopher-malik.co.za</span></a>
          <div><ContactIcon name="pin" /><span><small>Location</small>Johannesburg, Gauteng</span></div>
        </div>
        <div className={styles.qrSeal}>
          <Image src="/assets/stopher-profile-qr.svg" alt="QR code for this profile" width={164} height={164} />
          <span>Share this profile</span>
        </div>
      </section>

      <footer className={styles.profileFooter}>
        <span>Stopher Malik Kitenge</span>
        <a href="/downloads/stopher-malik-business-card.pdf?v=approved-artwork-2" download>Download business card</a>
        <span>SMK · Johannesburg</span>
      </footer>
    </main>
  );
}
