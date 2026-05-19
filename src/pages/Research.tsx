import { PageHero, SectionLabel } from "@/components/site/primitives";
import perception2 from "@/assets/agentic/perception2.png";
import prof2 from "@/assets/professional/2.webp";



const researchAreas = [
  { n: "01", title: "Agentic AI for Robotic Task Planning",        tags: ["Agentic AI", "Task Planning"],     hue: "blue"    as const },
  { n: "02", title: "Vision-Based Object Detection & Pose Estimation", tags: ["Computer Vision", "Pose Estimation"], hue: "blue" as const },
  { n: "03", title: "Servo Performance Diagnostics & PID Tuning",  tags: ["Servo Control", "PID"],           hue: "copper"  as const },
  { n: "04", title: "Wrist-Roll Metrics & Robotic Benchmarking",   tags: ["Benchmarking", "Metrics"],        hue: "copper"  as const },
  { n: "05", title: "Learning from Demonstration & Foundation Models", tags: ["Robot Learning", "VLA Models"], hue: "emerald" as const },
  { n: "06", title: "5-Layer Robotics Architecture",               tags: ["Architecture", "Framework"],      hue: "blue"    as const },
  { n: "07", title: "Affordable Lab Automation Workflows",         tags: ["Lab Automation", "Affordability"], hue: "copper"  as const },
  { n: "08", title: "Robot Report Generation & Performance Docs",  tags: ["Documentation", "Analytics"],     hue: "emerald" as const },
];

const hueMap = {
  blue:    { border: "border-primary/25",      bg: "bg-primary/6",      text: "text-primary",      dot: "bg-primary" },
  copper:  { border: "border-accent/25",       bg: "bg-accent/6",       text: "text-accent",       dot: "bg-accent" },
  emerald: { border: "border-status-demo/25",  bg: "bg-status-demo/6",  text: "text-status-demo",  dot: "bg-status-demo" },
};

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research & Innovation"
        title={<>Research that connects <span className="text-gradient">AI with physical robotics</span>.</>}
        subtitle="RoboParadigm is actively exploring research areas that improve the intelligence, reliability, and adaptability of robotic systems. Our work spans simulation, real-robot experiments, and ongoing paper preparation."
      />

      {/* Research areas as numbered items — no per-card images, clean text */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-4">
            {researchAreas.map((r) => {
              const h = hueMap[r.hue];
              return (
                <div
                  key={r.n}
                  className={`rounded-xl border ${h.border} p-6 hover:${h.bg} transition-all group relative`}
                >
                  <div className={`absolute top-4 right-4 font-mono text-[10px] ${h.text} opacity-40`}>{r.n}</div>
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${h.dot}`} />
                    <div>
                      <h3 className={`font-display font-bold text-base mb-2 group-hover:${h.text} transition-colors`}>
                        {r.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {r.tags.map((tag) => (
                          <span key={tag} className={`inline-flex rounded-md border ${h.border} ${h.bg}
                                                       px-2 py-0.5 font-mono text-[10px] ${h.text}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research output — with perception image as an example of real output */}
      <section className="border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel>Research Output</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
                From experiments to<br />
                <span className="text-gradient">published insights.</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Our research work includes simulation studies, real-robot experiments,
                performance benchmarking, documentation tools, and ongoing paper preparation
                in areas such as servo control, wrist-roll analysis, intelligent manipulation,
                robot learning, and full-stack robotics architecture.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Simulation studies and real-robot experiments",
                  "Performance benchmarking and metrics documentation",
                  "Automated report generation tooling",
                  "Ongoing paper preparation — servo control, robot learning",
                  "5-layer architecture as a practical engineering framework",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* prof2 — perception/AI context */}
              <div className="rounded-2xl overflow-hidden border border-border-strong">
                <img
                  src={prof2}
                  alt="RoboParadigm AI perception research — computer vision system"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
              {/* Actual perception output — meaningful research artifact */}
              <div className="rounded-xl border border-border bg-background/50 p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
                  Research Artifact — Agentic Perception Output
                </div>
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={perception2}
                    alt="Agentic AI perception output — lab object detection research"
                    loading="lazy"
                    className="w-full h-auto max-h-56 object-contain bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
