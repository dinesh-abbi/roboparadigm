import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, StatusBadge, TechTag } from "@/components/site/primitives";
import heroArm from "@/assets/hero-arm.jpg";
import mobile from "@/assets/mobile-manipulator.jpg";
import perception from "@/assets/perception.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Robotic Arms, Mobile Manipulators & Agentic AI | RoboParadigm" },
      { name: "description", content: "Explore RoboParadigm's projects: 7-DOF robotic arm, ServoPilot, mobile manipulator, agentic robotics pipeline, OMX wrist-roll metrics, and robot learning." },
      { property: "og:title", content: "Projects Building the Future of Intelligent Robotics" },
      { property: "og:description", content: "A full-stack robotics ecosystem for labs, research, education, and small-scale industries." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

type Project = {
  title: string;
  status: string;
  overview: string;
  progress: string;
  focus: string[];
  roadmap: string;
  tags: string[];
  image?: string;
  alt?: string;
};

const projects: Project[] = [
  {
    title: "7-DOF Robotic Arm",
    status: "Demo Ready",
    overview: "A custom-designed robotic arm developed for precision manipulation, intelligent automation, and robotics research.",
    progress: "Design, 3D printing, assembly, ROS 2 integration, and MoveIt-based motion planning are completed. The arm is ready for demo.",
    focus: ["Robotic manipulation", "Motion planning", "ROS 2 / MoveIt", "Kinematics", "Gripper control"],
    roadmap: "Integrate with the agentic robotics pipeline for intelligent manipulation and develop a larger arm with gearbox-based actuation.",
    tags: ["ROS 2", "MoveIt", "7-DOF", "3D Printed"],
    image: heroArm,
    alt: "Custom 7-DOF robotic arm built by RoboParadigm",
  },
  {
    title: "ServoPilot — Servo Management Tool",
    status: "Validated",
    overview: "A servo management, PID tuning, and diagnostics tool designed to improve actuator control quality in robotic systems.",
    progress: "Developed and validated on the 7-DOF robotic arm for PID tuning and servo management.",
    focus: ["PID tuning", "Servo diagnostics", "Actuator control", "Performance monitoring"],
    roadmap: "Perform formal metrics evaluation and prepare a research paper based on servo performance analysis.",
    tags: ["PID", "Diagnostics", "Servo Control"],
  },
  {
    title: "Mobile Manipulator",
    status: "Teleoperation Working",
    overview: "A mobile robotic platform combining a battery-powered rover base with robotic manipulation capability.",
    progress: "Assembly completed with Raspberry Pi and battery-powered operation. Basic movement through teleoperation has been achieved.",
    focus: ["Mobile robotics", "Raspberry Pi", "Embedded control", "Teleoperation", "Rover design"],
    roadmap: "Implement autonomous navigation using Nav2 and integrate the platform with manipulation workflows.",
    tags: ["Raspberry Pi", "Nav2", "Battery", "Teleop"],
    image: mobile,
    alt: "RoboParadigm mobile manipulator rover with Raspberry Pi",
  },
  {
    title: "Agentic Robotics Pipeline",
    status: "AI Pipeline Ready",
    overview: "An intelligent robotics pipeline that detects lab objects, calculates dynamic positions, plans actions, and prepares execution through robotic control modules.",
    progress: "The system detects and computes dynamic positions of lab objects such as tubes and beakers and supports pick-and-pour workflow planning using MoveIt modules.",
    focus: ["Agentic AI", "Computer vision", "Object localization", "Task planning", "Pick-and-pour workflows"],
    roadmap: "Integrate with the 7-DOF robotic arm for real-world autonomous task execution.",
    tags: ["Agentic AI", "CV", "MoveIt", "Lab Automation"],
    image: perception,
    alt: "Agentic perception detecting lab tubes and beakers",
  },
  {
    title: "OMX Wrist-Roll Arm Metrics",
    status: "Simulation Validated",
    overview: "A robotic benchmarking and research project focused on wrist-roll performance analysis and robot metrics generation.",
    progress: "Simulation-based performance metrics, including wrist-roll analysis, have been completed.",
    focus: ["Performance metrics", "Wrist-roll analysis", "Simulation validation", "Benchmarking"],
    roadmap: "Continue real-robot performance evaluation, paper writing, documentation, and development of a robot report generation tool.",
    tags: ["Simulation", "Benchmark", "Research"],
  },
  {
    title: "Robot Learning with Foundation Models",
    status: "Research Track",
    overview: "A research direction focused on enabling robots to learn tasks from demonstrations instead of being manually programmed for every task.",
    progress: "Experiments were conducted with SmolVLA and limitations were identified.",
    focus: ["Learning from demonstration", "Foundation models", "Vision-Language-Action", "Demonstration data"],
    roadmap: "Adopt and explore Pi0.5 for generalized robot learning and develop a leader arm with potentiometers for demonstration-based task teaching.",
    tags: ["SmolVLA", "Pi0.5", "VLA", "LfD"],
  },
];

function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects & Platforms"
        title={<>Projects building the future of <span className="text-primary">intelligent robotics</span>.</>}
        subtitle="A full-stack robotics ecosystem combining mechanical design, embedded control, perception, planning, autonomous navigation, and robot learning — built to solve real-world automation challenges."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 space-y-12">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="grid lg:grid-cols-12 gap-8 rounded-lg border border-border bg-surface/40 p-6 md:p-10 hover:border-primary/40 transition-colors"
            >
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">PROJECT / {String(i + 1).padStart(2, "0")}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold leading-tight">{p.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{p.overview}</p>

                <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-sm border border-border bg-background p-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-primary">Current Progress</div>
                    <p className="mt-2 leading-relaxed">{p.progress}</p>
                  </div>
                  <div className="rounded-sm border border-border bg-background p-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-primary">Roadmap</div>
                    <p className="mt-2 leading-relaxed">{p.roadmap}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Focus Areas</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.focus.map((f) => <TechTag key={f}>{f}</TechTag>)}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="inline-flex items-center rounded-sm border border-primary/30 bg-primary/5 px-2 py-0.5 font-mono text-[11px] text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2">
                {p.image ? (
                  <div className="rounded-md overflow-hidden border border-border-strong h-full min-h-[240px]">
                    <img
                      src={p.image}
                      alt={p.alt ?? p.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-md border border-border bg-background h-full min-h-[240px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute inset-0 bg-radial-glow" />
                    <div className="relative h-full flex items-center justify-center p-8">
                      <div className="font-mono text-xs text-muted-foreground text-center">
                        <div className="text-primary text-lg mb-2">{`<${p.title.split(" ")[0]}/>`}</div>
                        Visual asset
                        <br />incoming
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
