import { Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Cog, Cpu, Eye, GraduationCap, Layers, Wrench, Zap } from "lucide-react";
import { SectionLabel } from "@/components/site/primitives";

/* ── Capabilities — exactly matching the content document ── */
const capabilities = [
  { icon: Wrench, title: "Robotic Manipulation", copy: "Custom robotic arms and manipulation platforms for pick-and-place, handling, and lab automation workflows." },
  { icon: Cog, title: "Mobile Robotics", copy: "Battery-powered mobile platforms with teleoperation and autonomous navigation roadmap using Nav2." },
  { icon: Brain, title: "Agentic AI", copy: "AI pipelines that detect objects, reason over task goals, calculate positions, and generate robotic execution plans." },
  { icon: Eye, title: "Perception", copy: "Computer vision systems for object detection, segmentation, pose estimation, and scene understanding." },
  { icon: GraduationCap, title: "Robot Learning", copy: "Learning-from-demonstration and robot foundation model exploration for generalized task learning." },
  { icon: Cpu, title: "Servo Control", copy: "Servo diagnostics, PID tuning, actuator management, and performance evaluation tools." },
  { icon: Layers, title: "5-Layer Robotics Architecture", copy: "A full-stack engineering model covering AI decision-making, control, hardware interface, power, and physical structure." },
];

export function Capabilities() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-ambient-glow opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel>Core Capabilities</SectionLabel>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight max-w-xl">
              One ecosystem. Hardware to intelligence.
            </h2>
          </div>
          <Link to="/technology" className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 flex-shrink-0">
            Full tech stack <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Frosted glass grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              className={`glass-card p-6 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(var(--color-primary),0.06)] transition-all duration-300 group cursor-default ${i === 6 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-2' : ''}`}
            >
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 mb-5 group-hover:bg-primary/15 transition-colors">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
