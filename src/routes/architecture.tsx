import { createFileRoute } from "@tanstack/react-router";
import Architecture from "@/pages/Architecture";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Robotics Architecture — The 5-Layer Intelligence Stack | RoboParadigm" },
      { name: "description", content: "RoboParadigm's 5-layer robotics architecture: AI decision, control, hardware interface, power, and physical structure — full-stack robotics engineering." },
      { property: "og:title", content: "The 5-Layer Robotics Intelligence Stack" },
      { property: "og:description", content: "From intelligence to movement — how a robot thinks, decides, connects, powers, and acts." },
      { property: "og:url", content: "/architecture" },
    ],
    links: [{ rel: "canonical", href: "/architecture" }],
  }),
  component: Architecture,
});
