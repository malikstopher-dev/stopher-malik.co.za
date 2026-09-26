import { Metadata } from "next";
import { EcommercePage } from "./EcommercePage";

export const metadata: Metadata = {
  title: "E-Commerce Website Development | SMK Web Design",
  description: "Professional e-commerce website development for South African businesses. Custom online stores with secure payment gateways, inventory management, and pages built to sell.",
  alternates: { canonical: "https://stopher-malik.co.za/ecommerce/" },
};

export default function Ecommerce() {
  return <EcommercePage />;
}