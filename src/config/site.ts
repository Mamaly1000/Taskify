import { Metadata } from "next";
import logo from "@/app/images/logo.png";

export const siteConfig: Metadata = {
  title: {
    default: "Taskify",
    template: `%s | Taskify`,
  },
  description: "collaborate, manage projects, and reach productivity peaks.",
  keywords: "productivity, collaboration, project management",
  authors: [{ name: "Taskify Team" }],
  icons: [{ url: logo.src }],
};
