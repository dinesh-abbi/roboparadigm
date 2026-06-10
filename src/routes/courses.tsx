import { createFileRoute } from "@tanstack/react-router";
import Courses from "@/pages/Courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Robotics Courses & Programs — RoboParadigm" },
      { name: "description", content: "Explore our robotic courses and skill programs for college and school students, including 3-day and 30-day bootcamps." },
      { property: "og:title", content: "Robotics Courses" },
      { property: "og:description", content: "Skill building programs and summer camps." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: Courses,
});
