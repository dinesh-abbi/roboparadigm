import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About RoboParadigm — Full-Stack Robotics & AI Initiative" },
      { name: "description", content: "RoboParadigm builds integrated robotic systems combining mechanical design, embedded control, AI perception, agentic planning, and robot learning." },
      { property: "og:title", content: "About RoboParadigm" },
      { property: "og:description", content: "A robotics initiative building intelligent, affordable systems for labs and small industries." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const approach = [
  "Design and build robotic hardware in-house",
  "Integrate control systems using ROS 2, MoveIt, and embedded controllers",
  "Develop AI perception systems for object understanding",
  "Use agentic AI for task planning and execution logic",
  "Validate systems through simulation and real hardware testing",
  "Iterate toward deployable automation platforms",
];

const differentiators = [
  "Full-stack robotics development from mechanical structure to AI planning",
  "Focus on affordable automation for underserved environments",
  "Strong practical orientation with working robotic platforms",
  "Research direction in robot learning, metrics, and performance evaluation",
  "Platform-based development rather than isolated experiments",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About RoboParadigm"
        title={<>A robotics initiative building <span className="text-primary">intelligent, adaptable</span> systems.</>}
        subtitle="We combine mechanical design, embedded systems, motion control, AI perception, agentic planning, and learning-based robotics into one full-stack development ecosystem."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12">
          <div className="rounded-md border border-border bg-surface/50 p-8">
            <SectionLabel>Our Vision</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed">
              To create affordable and adaptable robotic systems that support
              laboratories, research institutions, academic environments, and
              small-scale industries by automating repetitive, manual, and
              precision-oriented workflows.
            </p>
          </div>
          <div className="rounded-md border border-border bg-surface/50 p-8">
            <SectionLabel>Our Mission</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed">
              To design and develop intelligent robotic platforms capable of
              perception, planning, execution, and workflow traceability —
              enabling robots to perform end-to-end tasks with minimal human
              intervention.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold max-w-2xl">
            A systems-driven development process.
          </h2>
          <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approach.map((a, i) => (
              <li key={a} className="rounded-md border border-border bg-background p-6">
                <div className="font-mono text-xs text-primary">STEP {String(i + 1).padStart(2, "0")}</div>
                <p className="mt-3 text-base leading-relaxed">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionLabel>What Makes Us Different</SectionLabel>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {differentiators.map((d) => (
              <div key={d} className="flex gap-4 rounded-md border border-border bg-surface/50 p-6">
                <span className="font-mono text-primary">→</span>
                <p className="text-base leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
