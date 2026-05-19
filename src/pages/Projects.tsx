import { PageHero, StatusBadge, TechTag } from "@/components/site/primitives";
import { ArrowUpRight } from "lucide-react";

/*
 * Image allocation — professional-images only, one per project:
 *   prof1 → 7-DOF Arm (main robotics platform, widest image 1536×1024)
 *   prof2 → Agentic Pipeline (perception/AI context)
 *   prof3 → Mobile Manipulator (mobile/rover context)
 *   prof4 → Architecture / OMX metrics (system/technical)
 *   prof5 → ServoPilot (servo/control context)
 *   prof6 → Robot Learning (research context)
 */
import prof1 from "@/assets/professional/1.webp";
import prof2 from "@/assets/professional/2.webp";
import prof3 from "@/assets/professional/3.webp";
import prof4 from "@/assets/professional/4.webp";
import prof5 from "@/assets/professional/5.webp";
import prof6 from "@/assets/professional/6.webp";
import perception1 from "@/assets/agentic/perception1.png";
import perception2 from "@/assets/agentic/perception2.png";
import prof7 from "@/assets/professional/7.webp";
import prof8 from "@/assets/professional/8.webp";
import prof9 from "@/assets/professional/9.webp";
import prof10 from "@/assets/professional/10.webp";

type Project = {
  title: string;
  status: string;
  overview: string;
  progress: string;
  focus: string[];
  roadmap: string;
  tags: string[];
  image: string;
  imageLabel: string;
  alt: string;
  /** Extra image only when truly distinct content exists (agentic pipeline has perception output) */
  extraImage?: string;
  extraImageAlt?: string;
};

const projects: Project[] = [
  {
    title: "7-DOF Robotic Arm",
    status: "Demo Ready",
    overview: "A custom-designed 7-degree-of-freedom robotic arm for precision manipulation, intelligent automation, and robotics research — built in-house with 3D-printed structures and full ROS 2 integration.",
    progress: "Design, 3D printing, assembly, ROS 2 integration, and MoveIt-based motion planning are completed. The arm is demo-ready and fully operational.",
    focus: ["Robotic manipulation", "Motion planning", "ROS 2 / MoveIt", "Kinematics", "Gripper control"],
    roadmap: "Integrate with the agentic robotics pipeline for intelligent manipulation and develop a larger arm with gearbox-based actuation.",
    tags: ["ROS 2", "MoveIt", "7-DOF", "3D Printed"],
    image: prof1,
    imageLabel: "7-DOF Arm · Demo Ready · ROS 2",
    alt: "RoboParadigm 7-DOF robotic arm — precision manipulation platform",
  },
  {
    title: "ServoPilot — Servo Management Tool",
    status: "Validated",
    overview: "A servo management, PID tuning, and real-time diagnostics tool designed to improve actuator control quality across robotic systems. Validated on the 7-DOF arm.",
    progress: "Developed and validated for PID tuning and servo management with real-time performance monitoring and diagnostics.",
    focus: ["PID tuning", "Servo diagnostics", "Actuator control", "Performance monitoring"],
    roadmap: "Perform formal metrics evaluation and prepare a research paper based on servo performance analysis.",
    tags: ["PID", "Diagnostics", "Servo Control"],
    image: prof8,
    imageLabel: "ServoPilot · Validated · PID + Diagnostics",
    alt: "ServoPilot — RoboParadigm servo diagnostics and PID tuning tool",
  },
  {
    title: "Mobile Manipulator",
    status: "Teleoperation Working",
    overview: "A mobile robotic platform combining a battery-powered rover base with manipulation capability — designed for flexible automation in lab and field environments.",
    progress: "Assembly completed with Raspberry Pi and battery-powered operation. Teleoperation is fully functional.",
    focus: ["Mobile robotics", "Raspberry Pi", "Embedded control", "Teleoperation", "Rover design"],
    roadmap: "Implement autonomous navigation using Nav2 and integrate manipulation workflows.",
    tags: ["Raspberry Pi", "Nav2", "Battery", "Teleop"],
    image: prof9,
    imageLabel: "Mobile Manipulator · Teleop Active",
    alt: "RoboParadigm mobile manipulator — battery-powered rover with Raspberry Pi",
  },
  {
    title: "Agentic Robotics Pipeline",
    status: "AI Pipeline Ready",
    overview: "An intelligent robotics pipeline that detects lab objects, calculates dynamic positions, plans actions, and prepares execution — a complete perception-to-execution system.",
    progress: "Detects and computes dynamic positions of lab objects (tubes, beakers) and supports pick-and-pour workflow planning via MoveIt modules.",
    focus: ["Agentic AI", "Computer vision", "Object localization", "Task planning", "Pick-and-pour workflows"],
    roadmap: "Integrate with the 7-DOF robotic arm for fully autonomous real-world task execution.",
    tags: ["Agentic AI", "CV", "MoveIt", "Lab Automation"],
    image: prof2,
    imageLabel: "Agentic Pipeline · AI Ready",
    alt: "RoboParadigm agentic AI perception pipeline",
    extraImage: perception1,
    extraImageAlt: "Agentic perception output — detecting lab tubes and beakers with bounding boxes",
  },
  {
    title: "OMX Wrist-Roll Arm Metrics",
    status: "Simulation Validated",
    overview: "A scientific benchmarking project focused on wrist-roll performance analysis and robot metrics generation — providing rigorous evaluation of robotic arm capabilities.",
    progress: "Simulation-based performance metrics including wrist-roll analysis completed and documented.",
    focus: ["Performance metrics", "Wrist-roll analysis", "Simulation validation", "Benchmarking"],
    roadmap: "Continue real-robot evaluation, paper writing, and development of a robot report generation tool.",
    tags: ["Simulation", "Benchmark", "Research"],
    image: prof10,
    imageLabel: "OMX Metrics · Simulation Validated",
    alt: "OMX wrist-roll performance metrics — RoboParadigm benchmarking research",
  },
  {
    title: "Robot Learning with Foundation Models",
    status: "Research Track",
    overview: "A research direction enabling robots to learn tasks from demonstrations using Vision-Language-Action models — moving beyond manual programming toward generalized robot intelligence.",
    progress: "SmolVLA experiments conducted, limitations identified. Ongoing exploration into Pi0.5 and leader arm development.",
    focus: ["Learning from demonstration", "Foundation models", "Vision-Language-Action", "Demonstration data"],
    roadmap: "Adopt Pi0.5 for generalized learning and develop a leader arm with potentiometers for demonstration-based task teaching.",
    tags: ["SmolVLA", "Pi0.5", "VLA", "LfD"],
    image: prof6,
    imageLabel: "Robot Learning · Research Track",
    alt: "RoboParadigm robot learning with foundation models — SmolVLA and Pi0.5",
  },
];

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects & Platforms"
        title={<>Projects building the future of <span className="text-gradient">intelligent robotics</span>.</>}
        subtitle="A full-stack robotics ecosystem combining mechanical design, embedded control, perception, planning, autonomous navigation, and robot learning — built to solve real-world automation challenges."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 space-y-10">
          {projects.map((p, i) => (
            <article
              key={p.title}
              id={`project-${i + 1}`}
              className="rounded-2xl border border-border bg-surface/25 overflow-hidden
                         hover:border-primary/30 transition-all duration-300"
            >
              <div className={`grid lg:grid-cols-12 ${i % 2 === 1 ? "" : ""}`}>
                {/* ── Image panel ── */}
                <div className={`lg:col-span-5 relative min-h-[280px] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  {/* Overlay gradient toward content side */}
                  <div className={`absolute inset-0 ${i % 2 === 1
                    ? "bg-gradient-to-l from-surface/10 to-background/50"
                    : "bg-gradient-to-r from-surface/10 to-background/50"
                    }`} />

                  {/* Project index badge */}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[10px] text-muted-foreground bg-background/80 backdrop-blur
                                     px-2 py-1 rounded border border-border">
                      PROJECT / {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* HUD label bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="font-mono text-[10px] text-primary/80 uppercase tracking-wider
                                    bg-background/70 backdrop-blur-sm rounded px-2 py-1 border border-primary/20 inline-block">
                      {p.imageLabel}
                    </div>
                  </div>
                </div>

                {/* ── Content panel ── */}
                <div className={`lg:col-span-7 p-7 md:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <StatusBadge status={p.status} />
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">{p.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{p.overview}</p>

                  <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
                    <div className="rounded-lg border border-border bg-background/50 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                        Current Progress
                      </div>
                      <p className="leading-relaxed text-sm">{p.progress}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background/50 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                        Roadmap
                      </div>
                      <p className="leading-relaxed text-sm">{p.roadmap}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      Focus Areas
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.focus.map((f) => <TechTag key={f}>{f}</TechTag>)}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="inline-flex items-center rounded-md border border-primary/30
                                               bg-primary/8 px-2 py-0.5 font-mono text-[10px] text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Extra image only for Agentic Pipeline — perception output is meaningful ── */}
              {p.extraImage && (
                <div className="border-t border-border p-6 bg-background/30">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    Perception Output
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border max-w-lg">
                    <img
                      src={p.extraImage}
                      alt={p.extraImageAlt}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                    {p.extraImageAlt}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
