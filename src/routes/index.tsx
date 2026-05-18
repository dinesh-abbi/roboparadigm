import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Cog, Cpu, Eye, GraduationCap, Layers, Wrench, Zap } from "lucide-react";
import heroArm from "@/assets/hero-arm.jpg";
import archStack from "@/assets/architecture-stack.jpg";
import { CTASection, SectionLabel, StatusBadge, TechTag } from "@/components/site/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RoboParadigm — Intelligent Robotic Systems for Real-World Automation" },
      { name: "description", content: "RoboParadigm develops affordable, intelligent robotic systems that perceive, plan, learn, and execute tasks across labs, research, and small industries." },
      { property: "og:title", content: "RoboParadigm — Intelligent Robotic Systems" },
      { property: "og:description", content: "Full-stack robotics: perception, planning, control, embedded hardware, robot learning, and a 5-layer architecture." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const capabilities = [
  { icon: Wrench, title: "Robotic Manipulation", copy: "Custom robotic arms and manipulation platforms for pick-and-place, handling, and lab automation workflows." },
  { icon: Cog, title: "Mobile Robotics", copy: "Battery-powered mobile platforms with teleoperation and autonomous navigation roadmap using Nav2." },
  { icon: Brain, title: "Agentic AI", copy: "AI pipelines that detect objects, reason over task goals, calculate positions, and generate robotic execution plans." },
  { icon: Eye, title: "Perception", copy: "Computer vision systems for object detection, segmentation, pose estimation, and scene understanding." },
  { icon: GraduationCap, title: "Robot Learning", copy: "Learning-from-demonstration and robot foundation model exploration for generalized task learning." },
  { icon: Cpu, title: "Servo Control", copy: "Servo diagnostics, PID tuning, actuator management, and performance evaluation tools." },
  { icon: Layers, title: "5-Layer Architecture", copy: "A full-stack engineering model covering AI decision-making, control, hardware interface, power, and physical structure." },
  { icon: Zap, title: "Full-Stack Integration", copy: "Hardware, control, perception, planning, and learning unified into deployable platforms." },
];

const highlights = [
  { title: "7-DOF Robotic Arm", status: "Demo Ready", tags: ["ROS 2", "MoveIt", "3D Printed"] },
  { title: "ServoPilot", status: "Validated", tags: ["PID Tuning", "Diagnostics"] },
  { title: "Mobile Manipulator", status: "Teleoperation Working", tags: ["Raspberry Pi", "Nav2 Roadmap"] },
  { title: "Agentic Pipeline", status: "AI Pipeline Ready", tags: ["CV", "Agentic AI", "MoveIt"] },
  { title: "OMX Wrist-Roll Metrics", status: "Simulation Validated", tags: ["Benchmarking", "Research"] },
  { title: "Robot Learning", status: "Research Track", tags: ["SmolVLA", "Pi0.5", "VLA"] },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionLabel>Full-Stack Robotics Initiative</SectionLabel>
            <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02]">
              Building Intelligent Robotic Systems for{" "}
              <span className="text-gradient">Real-World Automation</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              RoboParadigm develops affordable, intelligent robotic systems that
              can understand, plan, and execute real-world tasks across
              laboratories, academic institutions, and small-scale industries.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors glow-cyan"
              >
                Explore Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/collaborations"
                className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Collaborate With Us
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md font-mono text-xs">
              <div>
                <div className="text-2xl font-display font-bold text-primary">7-DOF</div>
                <div className="text-muted-foreground mt-1">Robotic Arm</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-primary">5</div>
                <div className="text-muted-foreground mt-1">Layer Stack</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-primary">ROS 2</div>
                <div className="text-muted-foreground mt-1">Native</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-md overflow-hidden border border-border-strong glow-cyan">
              <img
                src={heroArm}
                alt="7-DOF robotic arm in a deeptech robotics lab"
                width={1600}
                height={1100}
                className="w-full h-auto"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 rounded-sm bg-background/80 backdrop-blur px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Live System
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
              Robots that perceive, plan, and execute.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              RoboParadigm is building intelligent, low-cost robotic systems that
              combine AI, perception, motion planning, embedded control, and
              real-world hardware. Our systems reduce manual work, improve
              repeatability, and make automation accessible where traditional
              automation is too expensive or inflexible.
            </p>
            <p>
              We design, build, and integrate robotic systems that perceive their
              environment, plan actions intelligently, and execute physical tasks
              with precision — robotic arms, mobile manipulators, servo control
              tools, agentic AI pipelines, and learning-from-demonstration systems.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Core Capabilities</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                One ecosystem. Hardware to intelligence.
              </h2>
            </div>
            <Link to="/technology" className="text-sm text-primary hover:underline font-mono">
              View full tech stack →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-md overflow-hidden">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-background p-6 hover:bg-surface transition-colors group">
                <c.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE OVERVIEW */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>5-Layer Intelligence Stack</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
              How a robot thinks, decides, and acts.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every robot we develop is designed across five connected layers —
              AI decision-making, control, hardware interface, power, and
              physical structure. Together, these layers let a robot perceive,
              reason, plan, move, interact, and operate safely.
            </p>
            <ol className="mt-8 space-y-3">
              {[
                ["01", "AI / Decision Layer", "Perceives, reasons, plans, decides."],
                ["02", "Control Layer", "Converts intent into precise motion."],
                ["03", "Hardware Interface", "Connects software to physical hardware."],
                ["04", "Power Layer", "Supplies, regulates, and protects."],
                ["05", "Physical Structure", "Body, joints, gripper, motion."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-4 group">
                  <span className="font-mono text-xs text-primary mt-1">{n}</span>
                  <div>
                    <div className="font-display font-semibold group-hover:text-primary transition-colors">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/architecture" className="mt-8 inline-flex items-center gap-2 text-primary font-mono text-sm hover:underline">
              Explore the architecture <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative rounded-md overflow-hidden border border-border-strong">
            <img
              src={archStack}
              alt="Robotics architecture diagram showing RoboParadigm's five-layer robotics intelligence stack"
              width={1400}
              height={1000}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* PROJECT HIGHLIGHTS */}
      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Project Highlights</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                Working platforms. Not slideware.
              </h2>
            </div>
            <Link to="/projects" className="text-sm text-primary hover:underline font-mono">
              All projects →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <Link
                key={h.title}
                to="/projects"
                className="group block rounded-md border border-border bg-background p-6 hover:border-primary/50 hover:bg-surface transition-colors"
              >
                <StatusBadge status={h.status} />
                <h3 className="mt-4 font-display text-xl font-semibold group-hover:text-primary transition-colors">
                  {h.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {h.tags.map((t) => <TechTag key={t}>{t}</TechTag>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Why RoboParadigm</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
              Adaptive automation, built for the real world.
            </h2>
          </div>
          <div className="lg:col-span-7 text-muted-foreground leading-relaxed text-lg">
            <p>
              Most automation systems are either expensive, rigid, or difficult
              to adapt. RoboParadigm is building intelligent automation that is
              affordable, flexible, and suitable for laboratories and small
              industries. Instead of fixed machines, we are developing robots
              that can adapt, learn, and execute different workflows.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                "Affordable for labs and small industries",
                "Full-stack from mechanical to AI",
                "Platform-based, not one-off experiments",
                "Research-backed performance metrics",
              ].map((s) => (
                <div key={s} className="flex items-start gap-3 rounded-sm border border-border bg-surface/50 p-4">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
