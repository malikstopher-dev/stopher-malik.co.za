export type ProjectCategory =
  | "restaurant"
  | "business"
  | "construction"
  | "ecommerce"
  | "travel"
  | "webapp";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  image: string;
  url?: string;
}

export const PROJECT_CATEGORIES: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "restaurant", label: "Restaurants" },
  { id: "business", label: "Home Services" },
  { id: "construction", label: "Construction" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "travel", label: "Travel" },
  { id: "webapp", label: "Web Apps" },
];

export const PROJECTS: Project[] = [
  {
    name: "AK Global Trading",
    slug: "ak-global-trading",
    category: "business",
    tags: ["Trading", "Import/Export"],
    description:
      "International trading company website showcasing import/export services, product catalogue, and global logistics solutions.",
    image: "/assets/ak-globaltrading.jpg",
    url: "https://ak-globaltrading.com/",
  },
  {
    name: "Salem Home Innovation",
    slug: "salem",
    category: "business",
    tags: ["Home Services", "SEO"],
    description:
      "A full business website that started generating enquiries from day one. Built for local SEO and client conversion in the Johannesburg home services market.",
    image: "/assets/salem.jpg",
    url: "https://salemhi.co.za",
  },
  {
    name: "The Boma Cafe",
    slug: "boma",
    category: "restaurant",
    tags: ["Restaurant", "Next.js"],
    description:
      "Premium restaurant and events website for The Boma Café, showcasing food, venue, gallery, events, and contact/booking flow.",
    image: "/assets/the-boma-cafe.png",
    url: "https://the-boma-cafe.vercel.app/",
  },
  {
    name: "Selrahc Architects",
    slug: "selrahc",
    category: "construction",
    tags: ["Architecture", "Bilingual"],
    description:
      "Award-winning architecture studio in Johannesburg specializing in residential design, renovations, and technical documentation.",
    image: "/assets/selrahc.jpg",
    url: "https://www.selrahcarchitects.com/",
  },
  {
    name: "Chez Gaby",
    slug: "chez-gaby",
    category: "restaurant",
    tags: ["Fine Dining", "FR"],
    description:
      "Luxury French restaurant site in the heart of Kinshasa: reservations, menu and online ordering wrapped in an elegant gold-on-dark experience.",
    image: "/assets/chez-gaby.png",
    url: "https://chez-gaby.vercel.app/",
  },
  {
    name: "Le Centre",
    slug: "le-centre",
    category: "restaurant",
    tags: ["Lounge / Restaurant"],
    description:
      "Premium restaurant and lounge in Kinshasa. International cuisine, panoramic terrace, and late-night ambiance until 4am.",
    image: "/assets/lecentre.jpg",
    url: "https://lecentre-kin.pages.dev/",
  },
  {
    name: "JMOTO Electrical",
    slug: "jmoto",
    category: "business",
    tags: ["Electrical", "SEO"],
    description:
      "Professional electrical services website with service presentation, business credibility, and contact flow.",
    image: "/assets/jmoto.png",
    url: "https://jmoto-website.vercel.app/",
  },
  {
    name: "Cleanisa Solutions",
    slug: "cleanisa",
    category: "business",
    tags: ["Cleaning", "Lead Gen"],
    description:
      "Cleaning services website with service cards, trust-building layout, and contact conversion flow.",
    image: "/assets/cleaningsa.png",
    url: "https://cleanisa-solutions.pages.dev/",
  },
  {
    name: "Chicken Fiestas",
    slug: "fiestas",
    category: "restaurant",
    tags: ["Fast Food", "Hospitality"],
    description:
      "A vibrant fast food restaurant website with online ordering, menu showcase, and location finder for customers.",
    image: "/assets/fiestas-chicken.png",
    url: "https://chicken-fiestas2.malikstopher.workers.dev/",
  },
  {
    name: "JKJ SolarTech",
    slug: "jkj",
    category: "business",
    tags: ["Solar / CCTV", "Security"],
    description:
      "Solar, electrical, CCTV and security services website for clients across South Africa.",
    image: "/assets/jk.jpg",
    url: "https://jkjsolatech.co.za/",
  },
  {
    name: "B.E. Mhlanga Services",
    slug: "bemhlanga",
    category: "business",
    tags: ["Maintenance", "Lead Gen"],
    description:
      "Business website for maintenance, cleaning, plumbing, electrical, and general service enquiries.",
    image: "/assets/bemhlanga.png",
    url: "https://bemhlanga.co.za/",
  },
  {
    name: "Tomy Global Services",
    slug: "tomy-global",
    category: "business",
    tags: ["Business", "Cloudflare"],
    description:
      "Professional business services website with clear service presentation and streamlined contact flow.",
    image: "/assets/tomy-global.png",
    url: "https://tomy-global-services.pages.dev/",
  },
  {
    name: "Electrolight",
    slug: "electrolight",
    category: "business",
    tags: ["Electrical", "Lead Gen"],
    description:
      "Electrical services website designed for clear service communication and lead generation.",
    image: "/assets/electrolight.png",
  },
  {
    name: "UZAPA Construction",
    slug: "uzapa",
    category: "construction",
    tags: ["Construction", "React"],
    description:
      "A credibility-building website for a DRC-based construction firm. Showcases completed projects and services in French, establishing trust with enterprise clients.",
    image: "/assets/uzapa.jpg",
    url: "https://uzapardc.pages.dev/",
  },
  {
    name: "101 On Fraser",
    slug: "fraser",
    category: "restaurant",
    tags: ["Restaurant", "Bookings"],
    description:
      "A booking-first restaurant website that made table reservations easier. Elegant design that reflects the dining experience and supports direct bookings.",
    image: "/assets/fraser.jpg",
    url: "https://101onfraser.pages.dev/",
  },
  {
    name: "Cook's Bistro",
    slug: "cooks",
    category: "restaurant",
    tags: ["Fine Dining", "SEO"],
    description:
      "Premium Mediterranean restaurant in Kinshasa Mall, Gombe. Elegant design with online reservations and menu showcase.",
    image: "/assets/cooks.jpg",
    url: "https://cooks-bistro.pages.dev/",
  },
  {
    name: "Limoncello",
    slug: "limoncello",
    category: "restaurant",
    tags: ["Italian", "Node.js"],
    description:
      "Authentic Italian restaurant in Kinshasa. TripAdvisor #4 in Kinshasa with online ordering and reservation system.",
    image: "/assets/limoncello.jpg",
    url: "https://limoncello.pages.dev/",
  },
  {
    name: "Levante",
    slug: "levante",
    category: "restaurant",
    tags: ["Lebanese", "Branding"],
    description:
      "Authentic Lebanese cuisine coming soon to Kinshasa with a new branch opening.",
    image: "/assets/levante.jpg",
    url: "https://levante-kin.pages.dev/",
  },
  {
    name: "La Dolce Vita",
    slug: "dolcevita",
    category: "restaurant",
    tags: ["Italian", "Pizza"],
    description:
      "Authentic Italian dining experience in Kinshasa. Wood-fired pizza, fresh pasta, and reservation system.",
    image: "/assets/dolcevita.jpg",
    url: "https://ladolcevita-kin.pages.dev/",
  },
  {
    name: "Penzura",
    slug: "penzura",
    category: "webapp",
    tags: ["Web App", "React"],
    description:
      "Premium web application for South Africa's cleaning and hygiene supply sector.",
    image: "/assets/penzura.jpg",
    url: "https://penzura.pages.dev/",
  },
  {
    name: "Babooshka Catering",
    slug: "babooshka",
    category: "restaurant",
    tags: ["Catering", "Branding"],
    description:
      "Catering and food-service website with a professional visual presentation and enquiry flow.",
    image: "/assets/chefsbuxaba.png",
    url: "https://babooshka-catering.pages.dev/",
  },
  {
    name: "Marché LT Eben-Ezer",
    slug: "marche",
    category: "ecommerce",
    tags: ["E-Commerce", "Bilingual"],
    description:
      "E-commerce website for an Afro-Caribbean grocery store in Montréal. Bilingual (FR/EN) product catalogue connecting the African diaspora community with familiar foods.",
    image: "/assets/marche.jpg",
    url: "https://marchelteben-ezer.com",
  },
  {
    name: "Chefs Buxaba",
    slug: "buxaba",
    category: "restaurant",
    tags: ["Chef / Catering", "Branding"],
    description:
      "Chef and catering website using premium food-service branding and simple enquiry flow.",
    image: "/assets/chefsbuxaba.png",
  },
];

export const FEATURED_PROJECTS = [
  "The Boma Cafe",
  "Salem Home Innovation",
  "Tomy Global Services",
  "Le Centre",
]
  .map((name) => PROJECTS.find((project) => project.name === name))
  .filter((project): project is Project => Boolean(project));
