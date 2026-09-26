import { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { ProjectsPage } from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | SMK Web Design",
  description: "Explore premium web design projects by Stopher Malik at SMK.",
  alternates: { canonical: "https://stopher-malik.co.za/projects/" },
  openGraph: pageOpenGraph("/projects/"),
};

export default function Projects() {
  return <ProjectsPage />;
}