import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "RoboParadigm — Intelligent Robotic Systems for Real-World Automation" },
      { name: "description", content: "RoboParadigm develops affordable, intelligent robotic systems that perceive, plan, learn, and execute tasks across labs, research, and small industries." },
      { property: "og:title", content: "RoboParadigm — Intelligent Robotic Systems" },
      { property: "og:description", content: "Full-stack robotics: perception, planning, control, embedded hardware, robot learning, and a 5-layer architecture." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
}));
