import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Work With RoboParadigm | Collaborate & Join Us" },
      { name: "description", content: "Connect with RoboParadigm to explore partnerships, internships, research collaborations, and automation opportunities. Building intelligent robotic systems together." },
      { property: "og:title", content: "Work With RoboParadigm" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});
