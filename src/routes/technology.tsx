import { createFileRoute } from "@tanstack/react-router";
import Technology from "@/pages/Technology";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology Stack — ROS 2, MoveIt, Agentic AI & More | RoboParadigm" },
      { name: "description", content: "RoboParadigm's technology stack: ROS 2, MoveIt, Nav2, computer vision, agentic AI, servo control, embedded systems, Python, C++, Docker and more." },
      { property: "og:title", content: "Technology Stack — RoboParadigm Full-Stack Robotics" },
      { property: "og:url", content: "/technology" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: Technology,
});
