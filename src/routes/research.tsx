import { createFileRoute } from "@tanstack/react-router";
import Research from "@/pages/Research";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Innovation — Intelligent Robotics AI | RoboParadigm" },
      { name: "description", content: "RoboParadigm research: agentic AI, computer vision, servo diagnostics, wrist-roll metrics, robot learning, and 5-layer robotics architecture." },
      { property: "og:title", content: "Research That Connects AI With Physical Robotics" },
      { property: "og:url", content: "/research" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: Research,
});
