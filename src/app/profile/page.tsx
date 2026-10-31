import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./profile.module.css";

const profileUrl = "https://stopher-malik.co.za/profile/";

export const metadata: Metadata = {
  title: "Stopher Malik Kitenge | Personal Profile",
  description:
    "The personal profile of Stopher Malik Kitenge — born in Kinshasa, educated at St Victorien and Université de Lubumbashi, and now a web designer and developer in Johannesburg.",
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
  jobTitle: "Web Designer & Developer",
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
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  worksFor: {
    "@type": "Organization",
    name: "SMK Web Design",
    url: "https://stopher-malik.co.za",
  },
  sameAs: [
    "https://www.linkedin.com/in/stophermalik/",
    "https://www.instagram.com/stophermalik/",
    "https://x.com/stopher_malik",
    "https://github.com/malikstopher-dev",
  ],
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
    label: "Today",
    title: "SMK Web Design",
    detail: "Transforming communication, design and technology into meaningful digital experiences.",
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

          <div className={styles.ornament} aria-hidden="true"><span /></div>

          <p className={styles.lead}>
            Born in Kinshasa, Stopher&apos;s journey is shaped by communication, creativity and the belief that meaningful ideas deserve a powerful digital presence.
          </p>

          <dl className={styles.identityFacts}>
            <div><dt>College</dt><dd>St Victorien</dd></div>
            <div><dt>University</dt><dd>Université de Lubumbashi</dd></div>
            <div><dt>Study period</dt><dd>Communication · 2004—2009</dd></div>
            <div><dt>Based in</dt><dd>Johannesburg, South Africa</dd></div>
          </dl>

          <blockquote>
            “Communication gives an idea its voice. Design gives it a form. Technology gives it reach.”
          </blockquote>

          <div className={styles.heroActions}>
            <a href="https://wa.me/27729998863" target="_blank" rel="noopener noreferrer">Start a conversation</a>
            <a href="/stopher-malik.vcf" download>Save contact</a>
          </div>
        </div>
      </section>

      <section className={styles.journeySection} aria-labelledby="journey-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>The journey</p>
          <h2 id="journey-heading">Kinshasa to Johannesburg</h2>
          <p>
            Stopher Malik Kitenge was born on 18 August 1984 in Kinshasa, Democratic Republic of the Congo. After attending St Victorien, he studied Communication at the Université de Lubumbashi from 2004 to 2009. Those five formative years deepened his interest in storytelling, media and public engagement. That foundation still guides his work today: understand people, communicate clearly and create with intention.
          </p>
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
          <h2 id="education-heading">A foundation in communication</h2>
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
            Today, Stopher is a Johannesburg-based web designer and developer behind SMK Web Design. He combines communication strategy, brand thinking and modern development to create websites that feel credible, load quickly and help businesses connect with the people they serve.
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
