import { createFileRoute } from "@tanstack/react-router";
import Model3D from "@/pages/Model3D";

export const Route = createFileRoute("/3d-arm")({
  head: () => ({
    meta: [
      { title: "3D Robotic Arm Model Exploration | RoboParadigm" },
      { name: "description", content: "Explore the interactive 3D model of our flagship 7-DOF industrial robotic arm in a high-fidelity cinematic exploded view." },
      { property: "og:title", content: "3D Robotic Arm Model | RoboParadigm" },
      { property: "og:description", content: "Interactive 3D model exploration of our industrial robotic arm." },
      { property: "og:url", content: "/3d-arm" },
    ],
    links: [{ rel: "canonical", href: "/3d-arm" }],
  }),
  component: Model3D,
});
