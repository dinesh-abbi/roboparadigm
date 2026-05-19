import { createFileRoute } from "@tanstack/react-router";
import Collaborations from "@/pages/Collaborations";

export const Route = createFileRoute("/collaborations")({
  head: () => ({
    meta: [
      { title: "Collaborate — Research, Industry & Academic Partnerships | RoboParadigm" },
      { name: "description", content: "Collaborate with RoboParadigm on robotics research, lab automation, AI perception, robot learning, student training, and pilot deployments." },
      { property: "og:title", content: "Collaborate With RoboParadigm" },
      { property: "og:url", content: "/collaborations" },
    ],
    links: [{ rel: "canonical", href: "/collaborations" }],
  }),
  component: Collaborations,
});
