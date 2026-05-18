import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Innovation — Connecting AI with Physical Robotics | RoboParadigm" },
      { name: "description", content: "Research at RoboParadigm: agentic AI, vision-based perception, servo diagnostics, wrist-roll benchmarking, robot foundation models, and 5-layer architecture." },
      { property: "og:title", content: "Research That Connects AI With Physical Robotics" },
      { property: "og:description", content: "Simulation studies, real-robot experiments, performance benchmarking, and paper preparation." },
      { property: "og:url", content: "/research" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: Research,
});

const areas = [
  "Agentic AI for robotic task planning and decision-making",
  "Vision-based object detection, segmentation, and pose estimation",
  "Servo performance diagnostics and PID tuning methodologies",
  "Wrist-roll metrics and robotic manipulation benchmarking",
  "Learning from demonstration using robot foundation models",
  "Robot report generation and performance documentation tools",
  "Affordable lab automation through intelligent robotic workflows",
  "5-layer robotics architecture as a practical educational and engineering framework",
];

function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research & Innovation"
        title={<>Research that connects AI with <span className="text-primary">physical robotics</span>.</>}
        subtitle="We are actively exploring research areas that improve the intelligence, reliability, and adaptability of robotic systems."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionLabel>Research Areas</SectionLabel>
          <ul className="mt-10 grid md:grid-cols-2 gap-px bg-border border border-border rounded-md overflow-hidden">
            {areas.map((a, i) => (
              <li key={a} className="bg-background p-6 flex gap-4 hover:bg-surface transition-colors">
                <span className="font-mono text-xs text-primary mt-1">R{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base leading-relaxed">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <SectionLabel>Research Output</SectionLabel>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-muted-foreground">
            Our research work includes simulation studies, real-robot experiments,
            performance benchmarking, documentation tools, and ongoing paper
            preparation in areas such as servo control, wrist-roll analysis,
            intelligent manipulation, robot learning, and full-stack robotics
            architecture.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
