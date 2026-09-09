import { Metadata } from "next";
import { StackPage } from "./StackPage";

export const metadata: Metadata = {
  title: "Stack | SMK Web Design",
  description: "Stopher Malik's professional design and development stack at SMK.",
};

export default function Stack() {
  return <StackPage />;
}