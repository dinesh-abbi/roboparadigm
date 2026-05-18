import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/collaborations")({
  head: () => ({
    meta: [
      { title: "Collaborate With RoboParadigm — Robotics Research & Deployment" },
      { name: "description", content: "Partner with RoboParadigm on robotics R&D, lab automation, AI perception, agentic robotics, robot learning, internships, and pilot deployments." },
      { property: "og:title", content: "Collaborate With RoboParadigm" },
      { property: "og:description", content: "Open to research institutions, academic organizations, industry partners, and robotics labs." },
      { property: "og:url", content: "/collaborations" },
    ],
    links: [{ rel: "canonical", href: "/collaborations" }],
  }),
  component: Collaborations,
});

const areas = [
  "Robotics research and development",
  "Lab automation systems",
  "AI perception and agentic robotics",
  "Robot learning and foundation model experimentation",
  "Student training and internship programs",
  "Hardware-software co-development",
  "Pilot deployments for labs and small industries",
];

function Collaborations() {
  return (
    <>
      <PageHero
        eyebrow="Collaborations"
        title={<>Collaborate with <span className="text-primary">RoboParadigm</span>.</>}
        subtitle="We are open to collaborations with research institutions, academic organizations, industry partners, robotics labs, and technology companies interested in intelligent automation, lab robotics, robot learning, and applied AI systems."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionLabel>Collaboration Areas</SectionLabel>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((a, i) => (
              <div key={a} className="rounded-md border border-border bg-surface/50 p-6 hover:border-primary/40 transition-colors">
                <div className="font-mono text-xs text-primary">AREA {String(i + 1).padStart(2, "0")}</div>
                <p className="mt-3 text-base leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
