import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About RoboParadigm — Full-Stack Robotics & AI Initiative" },
      { name: "description", content: "RoboParadigm builds integrated robotic systems combining mechanical design, embedded control, AI perception, agentic planning, and robot learning." },
      { property: "og:title", content: "About RoboParadigm" },
      { property: "og:description", content: "A robotics initiative building intelligent, affordable systems for labs and small industries." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});
