import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning & Programs — Hands-On Robotics Training | RoboParadigm" },
      { name: "description", content: "Project-based learning programs in ROS 2, MoveIt, mobile robotics, AI perception, agentic AI, servo control, robot learning, and 5-layer robotics architecture." },
      { property: "og:title", content: "Building the Next Generation of Robotics Talent" },
      { property: "og:description", content: "Students and interns work on real robotic systems — not only simulations or theory." },
      { property: "og:url", content: "/learning" },
    ],
    links: [{ rel: "canonical", href: "/learning" }],
  }),
  component: Learning,
});

const themes = [
  "Robotics fundamentals and mechanical assembly",
  "ROS 2 and MoveIt-based robotic control",
  "Mobile robotics and Nav2 navigation",
  "AI perception for robotics",
  "Agentic AI for robotic planning",
  "Servo control, PID tuning, and diagnostics",
  "Robot learning and demonstration-based training",
  "5-layer robotics architecture and full-stack robot system thinking",
];

function Learning() {
  return (
    <>
      <PageHero
        eyebrow="Learning & Programs"
        title={<>Building the next generation of <span className="text-primary">robotics talent</span>.</>}
        subtitle="RoboParadigm supports hands-on learning programs where students and interns work on real robotic systems — not only simulations or theory. The approach is project-based and focuses on practical skills needed to build, test, and improve robotic platforms."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionLabel>Program Themes</SectionLabel>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {themes.map((t, i) => (
              <div key={t} className="rounded-md border border-border bg-surface/50 p-6 hover:border-primary/40 hover:bg-surface transition-colors">
                <div className="font-mono text-xs text-primary">MODULE {String(i + 1).padStart(2, "0")}</div>
                <p className="mt-3 text-base leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
