import { Metadata } from "next";
import { ProjectsPage } from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | SMK Web Design",
  description: "Explore premium web design projects by Stopher Malik at SMK.",
  alternates: { canonical: "https://stopher-malik.co.za/projects/" },
};

export default function Projects() {
  return <ProjectsPage />;
}