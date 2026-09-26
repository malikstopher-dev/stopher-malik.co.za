import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact | SMK Web Design",
  description: "Get in touch with Stopher Malik for web design services.",
  alternates: { canonical: "https://stopher-malik.co.za/contact/" },
  openGraph: pageOpenGraph("/contact/"),
};

export default function Contact() {
  return <ContactPage />;
}