import { createFileRoute } from "@tanstack/react-router";
import Projects from "@/pages/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Robotic Arms, Mobile Manipulators & Agentic AI | RoboParadigm" },
      { name: "description", content: "Explore RoboParadigm's projects: 7-DOF robotic arm, ServoPilot, mobile manipulator, agentic robotics pipeline, OMX wrist-roll metrics, and robot learning." },
      { property: "og:title", content: "Projects Building the Future of Intelligent Robotics" },
      { property: "og:description", content: "A full-stack robotics ecosystem for labs, research, education, and small-scale industries." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});
