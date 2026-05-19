import { PageHero, SectionLabel } from "@/components/site/primitives";
import prof6 from "@/assets/professional/6.webp";



const programThemes = [
  { n: "01", title: "Robotics Fundamentals & Assembly",          level: "Foundation",   hue: "blue"    as const },
  { n: "02", title: "ROS 2 & MoveIt Robotic Control",            level: "Intermediate", hue: "blue"    as const },
  { n: "03", title: "Mobile Robotics & Nav2 Navigation",         level: "Intermediate", hue: "blue"    as const },
  { n: "04", title: "AI Perception for Robotics",                level: "Advanced",     hue: "copper"  as const },
  { n: "05", title: "Agentic AI for Robotic Planning",           level: "Advanced",     hue: "copper"  as const },
  { n: "06", title: "Servo Control, PID Tuning & Diagnostics",   level: "Intermediate", hue: "copper"  as const },
  { n: "07", title: "Robot Learning & Demonstration Training",   level: "Research",     hue: "emerald" as const },
  { n: "08", title: "5-Layer Architecture & Full-Stack Thinking",level: "System Design",hue: "blue"    as const },
];

const hueMap = {
  blue:    { border: "border-primary/25", bg: "bg-primary/6",     text: "text-primary",      badge: "border-primary/30 bg-primary/10 text-primary" },
  copper:  { border: "border-accent/25",  bg: "bg-accent/6",      text: "text-accent",       badge: "border-accent/30 bg-accent/10 text-accent" },
  emerald: { border: "border-status-demo/25", bg: "bg-status-demo/6", text: "text-status-demo", badge: "border-status-demo/30 bg-status-demo/10 text-status-demo" },
};

export default function Learning() {
  return (
    <>
      <PageHero
        eyebrow="Learning & Programs"
        title={<>Building the next generation of <span className="text-gradient">robotics talent</span>.</>}
        subtitle="RoboParadigm supports hands-on learning programs where students and interns work on real robotic systems, not simulations or theory alone. The approach is project-based and focused on practical skills needed to build, test, and improve robotic platforms."
      />

      {/* Program themes — text cards, color-coded by level */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <SectionLabel>Program Themes</SectionLabel>
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold mb-14 max-w-2xl">
            Practical skills for the full robotics stack.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {programThemes.map((p) => {
              const h = hueMap[p.hue];
              return (
                <div
                  key={p.n}
                  className={`rounded-xl border ${h.border} ${h.bg} p-5 hover:shadow-md transition-all group`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-[10px] ${h.text}`}>{p.n}</span>
                    <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${h.badge}`}>
                      {p.level}
                    </span>
                  </div>
                  <h3 className={`font-display font-bold text-base group-hover:${h.text} transition-colors`}>
                    {p.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning philosophy — one meaningful image */}
      <section className="border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* prof6 — robot learning context, appropriate for learning page */}
            <div className="rounded-2xl overflow-hidden border border-border-strong">
              <img
                src={prof6}
                alt="Hands-on robotics learning and demonstration-based training"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <div>
              <SectionLabel>Our Approach</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
                Learn by building<br />
                <span className="text-gradient">real systems.</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                RoboParadigm supports hands-on learning programs where students and interns
                work on real robotic systems — not simulations or theory alone. The learning
                approach is project-based and focused on practical skills needed to build,
                test, and improve robotic platforms.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Work on real robots from day one",
                  "Project-based curriculum from fundamentals to advanced AI",
                  "Mentorship from practicing robotics engineers",
                  "Exposure to full-stack development — hardware to AI",
                  "Research pathways for motivated interns",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-md border border-border bg-background p-3 hover:border-primary/30 transition-colors">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
