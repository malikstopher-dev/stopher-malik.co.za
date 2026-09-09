import { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About | SMK Web Design",
  description: "Get to know Stopher Malik, lead web designer and developer at SMK.",
};

export default function About() {
  return <AboutPage />;
}