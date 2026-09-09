import { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact | SMK Web Design",
  description: "Get in touch with Stopher Malik for web design services.",
};

export default function Contact() {
  return <ContactPage />;
}