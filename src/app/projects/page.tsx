import { Metadata } from "next";
import { ProjectsPage } from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | SMK Web Design",
  description: "Explore premium web design projects by Stopher Malik at SMK.",
};

export default function Projects() {
  return <ProjectsPage />;
}