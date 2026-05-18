import { createFileRoute, Link } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";
import prof5 from "@/assets/professional/5.webp";

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

const collabAreas = [
  { n: "01", title: "Robotics Research & Development",    desc: "Joint R&D on intelligent robotic systems, manipulation platforms, and applied robotics.",             hue: "blue"    as const },
  { n: "02", title: "Lab Automation Systems",             desc: "Design and deploy intelligent automation for laboratory workflows and precision handling.",             hue: "blue"    as const },
  { n: "03", title: "AI Perception & Agentic Robotics",   desc: "Collaborate on computer vision, agentic AI pipelines, and perception systems for real-world use.",     hue: "blue"    as const },
  { n: "04", title: "Robot Learning & Foundation Models", desc: "Explore learning-from-demonstration, VLA models, and foundation model applications together.",         hue: "emerald" as const },
  { n: "05", title: "Student Training & Internships",     desc: "Host students for hands-on robotics internships covering hardware, control, perception, and AI.",       hue: "copper"  as const },
  { n: "06", title: "Hardware-Software Co-Development",   desc: "Co-design robotic systems where hardware and software evolve together from the ground up.",            hue: "copper"  as const },
  { n: "07", title: "Pilot Deployments",                  desc: "Deploy intelligent robotic automation pilots in labs and small industries — validate and iterate.",     hue: "copper"  as const },
];

const hueMap = {
  blue:    { border: "border-primary/25", bg: "bg-primary/6",     text: "text-primary",     num: "text-primary" },
  copper:  { border: "border-accent/25",  bg: "bg-accent/6",      text: "text-accent",      num: "text-accent" },
  emerald: { border: "border-status-demo/25", bg: "bg-status-demo/6", text: "text-status-demo", num: "text-status-demo" },
};

function Collaborations() {
  return (
    <>
      <PageHero
        eyebrow="Collaborations"
        title={<>Collaborate with <span className="text-gradient">RoboParadigm</span>.</>}
        subtitle="We are open to collaborations with research institutions, academic organizations, industry partners, robotics labs, and technology companies interested in intelligent automation, lab robotics, robot learning, and applied AI systems."
      />

      {/* Collaboration areas — clean text grid */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collabAreas.map((c) => {
              const h = hueMap[c.hue];
              return (
                <div
                  key={c.n}
                  className={`rounded-xl border ${h.border} ${h.bg} p-6 hover:shadow-md transition-all group relative`}
                >
                  <span className={`absolute top-4 right-4 font-mono text-[10px] ${h.num} opacity-40`}>{c.n}</span>
                  <h3 className={`font-display font-bold text-base mb-3 group-hover:${h.text} transition-colors`}>
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we work with + CTA */}
      <section className="border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel>Who We Work With</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
                Partners who share our<br />
                <span className="text-gradient">vision for intelligent robotics.</span>
              </h2>
              <div className="mt-8 space-y-3">
                {[
                  "Research institutions and universities",
                  "Academic robotics and AI labs",
                  "Industry partners in manufacturing and automation",
                  "Robotics startups and deeptech companies",
                  "Technology companies working on applied AI",
                  "Healthcare, pharmaceutical, and biotech labs",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-md border border-border bg-background p-3 hover:border-primary/30 transition-colors">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* prof5 — servo/system image as visual for "co-development" context */}
              <div className="rounded-2xl overflow-hidden border border-border-strong">
                <img
                  src={prof5}
                  alt="RoboParadigm hardware-software co-development"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>

              <div className="rounded-xl border border-primary/25 bg-primary/6 p-6 text-center">
                <p className="text-lg font-display font-bold mb-3">Ready to collaborate?</p>
                <p className="text-sm text-muted-foreground mb-5">
                  Reach out to discuss how we can build intelligent robotic systems together.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
