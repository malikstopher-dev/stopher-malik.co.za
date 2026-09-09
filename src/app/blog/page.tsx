import { Metadata } from "next";
import { BlogIndex } from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog | SMK Web Design",
  description: "Insights on web design, SEO, e-commerce, and digital strategy for South African businesses.",
};

export default function Blog() {
  return <BlogIndex />;
}