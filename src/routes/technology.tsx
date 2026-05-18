import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology Stack — Full-Stack Robotics | RoboParadigm" },
      { name: "description", content: "RoboParadigm's robotics technology stack: ROS 2, MoveIt, Nav2, computer vision, agentic AI, embedded systems, robot learning, and full-stack tooling." },
      { property: "og:title", content: "Full-Stack Robotics Technology" },
      { property: "og:description", content: "From mechanical structures and embedded controllers to AI perception, motion planning, and robot learning." },
      { property: "og:url", content: "/technology" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: Technology,
});

const stack = [
  { layer: "AI and Perception", items: ["Computer vision", "Object detection", "Segmentation", "Pose estimation", "Scene understanding", "Agentic AI"] },
  { layer: "Planning and Autonomy", items: ["Task planning", "Agentic workflows", "MoveIt planning", "Nav2 autonomous navigation"] },
  { layer: "Robotics Middleware", items: ["ROS 2", "MoveIt", "Gazebo", "Nav2"] },
  { layer: "Control Systems", items: ["PID tuning", "Trajectory control", "Servo diagnostics", "Motion execution"] },
  { layer: "Hardware", items: ["Robotic arms", "Mobile manipulators", "Servo motors", "Motor drivers", "Raspberry Pi", "Microcontrollers", "3D-printed structures"] },
  { layer: "Power Systems", items: ["Battery packs", "BMS", "Voltage regulation", "Power distribution", "Wiring", "Fuses", "Protection circuits"] },
  { layer: "Robot Learning", items: ["Learning from demonstration", "SmolVLA experiments", "Pi0.5 exploration", "Leader arm development"] },
  { layer: "Software Infrastructure", items: ["Python", "C++", "Docker", "GPU compute", "Model training pipelines", "Data logging", "Workflow orchestration"] },
];

function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology Stack"
        title={<>Full-stack <span className="text-primary">robotics technology</span>.</>}
        subtitle="RoboParadigm works across the complete robotics stack — from mechanical structures and embedded controllers to AI perception, motion planning, autonomous navigation, and robot learning."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-md overflow-hidden">
            {stack.map((s, i) => (
              <div key={s.layer} className="bg-background p-8 hover:bg-surface transition-colors">
                <div className="font-mono text-xs text-primary">LAYER / {String(i + 1).padStart(2, "0")}</div>
                <h2 className="mt-3 font-display text-xl md:text-2xl font-bold">{s.layer}</h2>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="inline-flex items-center rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <SectionLabel>Our Approach</SectionLabel>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-muted-foreground">
            Our technology stack enables robots to move beyond fixed automation.
            We combine perception, planning, control, hardware interfaces, power
            design, mechanical engineering, and learning so that robots can adapt
            to changing environments and perform real-world tasks with higher
            intelligence and flexibility.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
