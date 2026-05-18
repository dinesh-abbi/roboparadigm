import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, SectionLabel } from "@/components/site/primitives";
import prof1 from "@/assets/professional/1.webp";
import prof3 from "@/assets/professional/3.webp";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology Stack — ROS 2, MoveIt, Agentic AI & More | RoboParadigm" },
      { name: "description", content: "RoboParadigm's technology stack: ROS 2, MoveIt, Nav2, computer vision, agentic AI, servo control, embedded systems, Python, C++, Docker and more." },
      { property: "og:title", content: "Technology Stack — RoboParadigm Full-Stack Robotics" },
      { property: "og:url", content: "/technology" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: Technology,
});

/* Tech areas from PDF — displayed as styled cards with no per-card images */
const techAreas = [
  {
    category: "AI and Perception",
    items: ["Computer Vision", "Object Detection", "Image Segmentation", "Pose Estimation", "Scene Understanding", "Agentic AI Pipelines"],
    hue: "blue" as const,
  },
  {
    category: "Planning and Autonomy",
    items: ["Task Planning", "Agentic Workflows", "MoveIt Motion Planning", "Nav2 Navigation", "SLAM", "Behavior Trees"],
    hue: "blue" as const,
  },
  {
    category: "Robotics Middleware",
    items: ["ROS 2 (Iron / Humble)", "MoveIt 2", "Gazebo Sim", "Nav2", "ros2_control", "TF2"],
    hue: "blue" as const,
  },
  {
    category: "Control Systems",
    items: ["PID Control", "Trajectory Generation", "Servo Diagnostics", "Motion Execution", "Feedback Control", "State Estimation"],
    hue: "copper" as const,
  },
  {
    category: "Hardware",
    items: ["Robotic Arms (7-DOF)", "Mobile Manipulators", "Servo Motors", "Motor Drivers", "Raspberry Pi", "Microcontrollers", "3D-Printed Structures"],
    hue: "copper" as const,
  },
  {
    category: "Power Systems",
    items: ["Battery Packs", "BMS (Battery Management)", "DC-DC Converters", "Power Distribution", "Protection Circuits", "Voltage Regulation"],
    hue: "copper" as const,
  },
  {
    category: "Robot Learning",
    items: ["Learning from Demonstration", "SmolVLA", "Pi0.5 (Exploration)", "Vision-Language-Action Models", "Leader Arm", "Demonstration Data"],
    hue: "emerald" as const,
  },
  {
    category: "Software Infrastructure",
    items: ["Python", "C++", "Docker", "GPU Compute", "Training Pipelines", "Data Logging", "Workflow Orchestration"],
    hue: "blue" as const,
  },
];

const hueMap = {
  blue:    { border: "border-primary/25", bg: "bg-primary/6",  text: "text-primary",      dot: "bg-primary" },
  copper:  { border: "border-accent/25",  bg: "bg-accent/6",   text: "text-accent",        dot: "bg-accent" },
  emerald: { border: "border-status-demo/25", bg: "bg-status-demo/6", text: "text-status-demo", dot: "bg-status-demo" },
};

function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology Stack"
        title={<>The stack that makes robots <span className="text-gradient">think and move</span>.</>}
        subtitle="Our technology stack enables robots to move beyond fixed automation. We combine perception, planning, control, hardware interfaces, power design, mechanical engineering, and learning so that robots can adapt and perform real-world tasks with intelligence and flexibility."
      />

      {/* 4×2 grid — styled text cards with color-coding, no images */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techAreas.map((t) => {
              const h = hueMap[t.hue];
              return (
                <div
                  key={t.category}
                  className={`rounded-xl border ${h.border} ${h.bg} p-5 hover:shadow-lg transition-all group`}
                >
                  <div className={`font-mono text-[10px] uppercase tracking-widest ${h.text} mb-4`}>
                    {t.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-md border border-border bg-background
                                   px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why our stack — one image, well-chosen */}
      <section className="border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>Why Our Stack</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mt-6">
                Purpose-built for<br />
                <span className="text-gradient">intelligent automation.</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Our technology stack enables robots to move beyond fixed automation.
                We combine perception, planning, control, hardware interfaces, power design,
                mechanical engineering, and robot learning — so that robots can adapt to
                changing environments and perform real-world tasks with higher intelligence.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "ROS 2",    label: "Native middleware" },
                  { value: "5-Layer",  label: "Architecture" },
                  { value: "7-DOF",    label: "Arm precision" },
                  { value: "Agentic",  label: "AI pipelines" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-border bg-background p-4">
                    <div className="font-display text-xl font-bold text-gradient-copper">{s.value}</div>
                    <div className="font-mono text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* prof1 — main robot platform, wide format */}
            <div className="rounded-2xl overflow-hidden border border-border-strong">
              <img
                src={prof1}
                alt="RoboParadigm full-stack robotics platform"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
