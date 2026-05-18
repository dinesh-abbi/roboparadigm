import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";
import logoEnhanced from "@/assets/logos/logo-enhanced.png";
import labPhoto from "@/assets/posters/lab-photo.jpeg";
import prof2 from "@/assets/professional/2.webp";
import prof1 from "@/assets/professional/1.webp";

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
      {/* Hero — logo as very subtle background texture */}
      <section className="relative overflow-hidden border-b border-border min-h-[55vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={logoEnhanced}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-8 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 w-full">
          <SectionLabel>About RoboParadigm</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-4xl md:text-6xl font-bold leading-[1.05]">
            A robotics initiative building{" "}
            <span className="text-gradient">intelligent, adaptable</span> systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We combine mechanical design, embedded systems, motion control, AI perception,
            agentic planning, and learning-based robotics into one full-stack development ecosystem.
          </p>
        </div>
      </section>

      {/* Who We Are — text left, lab photo right */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6">
            <SectionLabel>Who We Are</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              RoboParadigm is a robotics initiative focused on building integrated, intelligent robotic
              systems that operate in real-world environments. We combine mechanical design, embedded systems,
              motion control, AI perception, agentic planning, and learning-based robotics into one
              full-stack development ecosystem.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We are building robots that are affordable, adaptable, and capable of supporting
              laboratories, research institutions, academic environments, and small-scale industries
              by automating repetitive, manual, and precision-oriented workflows.
            </p>
          </div>
          <div className="md:col-span-6">
            {/* Lab photo — landscape, genuine team/lab image */}
            <div className="rounded-2xl overflow-hidden border border-border-strong">
              <img
                src={labPhoto}
                alt="RoboParadigm lab — working on intelligent robotic systems"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground text-center uppercase tracking-wider">
              RoboParadigm lab · hands-on robotics development
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-t-xl" />
            <SectionLabel>Our Vision</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed">
              To create affordable and adaptable robotic systems that support
              laboratories, research institutions, academic environments, and
              small-scale industries by automating repetitive, manual, and
              precision-oriented workflows.
            </p>
          </div>
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/60 to-transparent rounded-t-xl" />
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

      {/* Our Approach */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold max-w-2xl">
            A systems-driven development process.
          </h2>
          <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approach.map((a, i) => (
              <li key={a} className="rounded-xl border border-border bg-surface/30 p-6 hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-2 font-mono text-xs text-accent mb-3">
                  <span className="h-5 w-5 rounded-full border border-accent/40 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-relaxed">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionLabel>What Makes Us Different</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold">
                Built different,<br />
                <span className="text-gradient">by design.</span>
              </h2>
              {/* prof1 — main arm/robot showcase */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-border-strong">
                <img
                  src={prof1}
                  alt="RoboParadigm robotics platform — professional showcase"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="lg:col-span-7 mt-0 lg:mt-14">
              <div className="grid gap-3">
                {differentiators.map((d) => (
                  <div
                    key={d}
                    className="flex gap-4 rounded-xl border border-border bg-background p-5 hover:border-primary/30 transition-all group"
                  >
                    <span className="font-mono text-accent mt-0.5 group-hover:translate-x-1 transition-transform">→</span>
                    <p className="text-sm leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
