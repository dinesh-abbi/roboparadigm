import { createFileRoute } from "@tanstack/react-router";
import Learning from "@/pages/Learning";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning & Programs — Hands-On Robotics Training | RoboParadigm" },
      { name: "description", content: "RoboParadigm's hands-on learning programs: robotics fundamentals, ROS 2, MoveIt, AI perception, agentic AI, servo control, and robot learning." },
      { property: "og:title", content: "Building the Next Generation of Robotics Talent" },
      { property: "og:url", content: "/learning" },
    ],
    links: [{ rel: "canonical", href: "/learning" }],
  }),
  component: Learning,
});
