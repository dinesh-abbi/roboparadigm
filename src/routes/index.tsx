import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Brain, Cog, Cpu, Eye,
  GraduationCap, Layers, Wrench, Zap, ExternalLink, ChevronRight,
} from "lucide-react";
import { CTASection, SectionLabel, StatusBadge, TechTag } from "@/components/site/primitives";

/*
 * Professional images — each used once, in the right context:
 *   1.webp  → hero section (main showcase, wide format 1536×1024)
 *   2.webp  → capabilities: perception / computer vision (1448×1086, slightly taller)
 *   3.webp  → mobile robotics / what we do
 *   4.webp  → why RoboParadigm / architecture section
 *   5.webp  → project highlights showcase
 *   6.webp  → robot learning
 *
 * Robot renders (posters/) — AI-generated, used as decorative BG only, low opacity
 *   robot1.png  → hero background (wide 1536×1024)
 *   robot2.png  → why section right-side decoration
 */
import prof1 from "@/assets/professional/1.webp";
import prof2 from "@/assets/professional/2.webp";
import prof3 from "@/assets/professional/3.webp";
import prof4 from "@/assets/professional/4.webp";
import prof5 from "@/assets/professional/5.webp";
import prof6 from "@/assets/professional/6.webp";
import robot1 from "@/assets/posters/robot1.png";
import robot2 from "@/assets/posters/robot2.png";

export const Route = createFileRoute("/")(({
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
}));

/* ── Capabilities — only the right icon+copy, no per-card images ── */
const capabilities = [
  { icon: Wrench,        title: "Robotic Manipulation",  copy: "Custom robotic arms for pick-and-place, handling, and lab automation workflows." },
  { icon: Cog,           title: "Mobile Robotics",       copy: "Battery-powered platforms with teleoperation and autonomous Nav2 navigation roadmap." },
  { icon: Brain,         title: "Agentic AI",            copy: "AI pipelines that detect objects, reason over goals, and generate execution plans." },
  { icon: Eye,           title: "Perception",            copy: "Computer vision for object detection, segmentation, pose estimation, and scene understanding." },
  { icon: GraduationCap, title: "Robot Learning",        copy: "Learning-from-demonstration and VLA model exploration for generalized task learning." },
  { icon: Cpu,           title: "Servo Control",         copy: "Servo diagnostics, PID tuning, actuator management, and performance evaluation." },
  { icon: Layers,        title: "5-Layer Architecture",  copy: "Full-stack engineering covering AI, control, hardware interface, power, and structure." },
  { icon: Zap,           title: "Full-Stack Integration",copy: "Hardware, control, perception, planning, and learning unified into deployable platforms." },
];

const highlights = [
  { title: "7-DOF Robotic Arm",       status: "Demo Ready",             tags: ["ROS 2", "MoveIt", "3D Printed"],   img: prof1 },
  { title: "ServoPilot",              status: "Validated",              tags: ["PID Tuning", "Diagnostics"],       img: prof5 },
  { title: "Mobile Manipulator",      status: "Teleoperation Working",  tags: ["Raspberry Pi", "Nav2 Roadmap"],    img: prof3 },
  { title: "Agentic Pipeline",        status: "AI Pipeline Ready",      tags: ["CV", "Agentic AI", "MoveIt"],      img: prof2 },
  { title: "OMX Wrist-Roll Metrics",  status: "Simulation Validated",   tags: ["Benchmarking", "Research"],        img: prof4 },
  { title: "Robot Learning",          status: "Research Track",         tags: ["SmolVLA", "Pi0.5", "VLA"],         img: prof6 },
];

const newsletters = [
  { issue: "01", title: "Foundation",  desc: "Early builds, architecture decisions, and the start of the RoboParadigm journey.", href: "/newsletters/paradigm-chronicles-01.pdf" },
  { issue: "02", title: "Expansion",   desc: "Mobile platforms, agentic AI pipelines, and perception system breakthroughs.",      href: "/newsletters/paradigm-chronicles-02.pdf" },
  { issue: "03", title: "Evolution",   desc: "Robot learning experiments, benchmarking results, and the road ahead.",             href: "/newsletters/paradigm-chronicles-03.pdf" },
];

function Home() {
  return (
    <>
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Full-bleed hero image — professional showcase #1 */}
        <div className="absolute inset-0">
          <img
            src={prof1}
            alt="RoboParadigm intelligent robotic system — professional showcase"
            className="w-full h-full object-cover object-center opacity-30"
            fetchPriority="high"
          />
          {/* Left-to-right fade so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
          {/* Bottom fade into sections */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        {/* Subtle grid HUD overlay */}
        <div className="absolute inset-0 bg-grid opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        {/* Blue radial glow from top */}
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Full-Stack Robotics Initiative
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02]">
              Building Intelligent<br />
              Robotic Systems for{" "}
              <span className="text-gradient">Real-World Automation</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
              RoboParadigm develops affordable, intelligent robotic systems that can understand,
              plan, and execute real-world tasks across laboratories, academic institutions,
              and small-scale industries.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/projects"
                id="hero-cta-projects"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
              >
                Explore Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/collaborations"
                id="hero-cta-collab"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong px-6 py-3 text-sm font-medium hover:border-accent/50 hover:text-accent transition-all"
              >
                Collaborate With Us
              </Link>
            </div>

            {/* Key stats — copper accent on values */}
            <div className="mt-14 grid grid-cols-3 gap-8 max-w-xs">
              {[
                { value: "7-DOF",  label: "Robotic Arm" },
                { value: "5",      label: "Layer Stack" },
                { value: "ROS 2",  label: "Native" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-display font-bold text-gradient-copper">{s.value}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ WHAT WE DO ═══════════════════════════ */}
      <section className="border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
          {/* Text left */}
          <div className="md:col-span-5">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
              Robots that perceive,{" "}
              <span className="text-gradient-blue">plan, and execute.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We design, build, and integrate robotic systems that perceive their environment,
              plan actions intelligently, and execute physical tasks with precision — robotic arms,
              mobile manipulators, servo control tools, agentic AI pipelines, and
              learning-from-demonstration systems.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm text-primary font-mono hover:underline"
            >
              About RoboParadigm <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Image right — professional image #3 (mobile robotics context) */}
          <div className="md:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-border-strong relative">
              <img
                src={prof3}
                alt="RoboParadigm mobile robotic platform — real-world deployment"
                className="w-full h-auto"
                loading="lazy"
              />
              {/* HUD label */}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-primary/80 uppercase tracking-wider
                              bg-background/70 backdrop-blur-sm rounded px-2 py-1 border border-primary/20">
                Mobile Platform · Teleoperation Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CAPABILITIES ═══════════════════════════ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Core Capabilities</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                One ecosystem. Hardware to intelligence.
              </h2>
            </div>
            <Link to="/technology" className="text-sm text-accent hover:underline font-mono flex items-center gap-1">
              Full tech stack <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4×2 grid — clean text+icon cards, no per-card background images */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="bg-background p-6 hover:bg-surface transition-colors group cursor-default"
              >
                <c.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                <h3 className="mt-4 font-display text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ ARCHITECTURE OVERVIEW ════════════════════ */}
      <section className="border-b border-border bg-surface/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>5-Layer Intelligence Stack</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
              How a robot thinks,{" "}
              <span className="text-gradient">decides, and acts.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every robot we develop is designed across five connected layers —
              AI decision-making, control, hardware interface, power, and physical structure.
              Together, these layers let a robot perceive, reason, plan, move, and operate safely.
            </p>

            {/* Numbered list — clean, no images */}
            <ol className="mt-8 space-y-3">
              {[
                ["01", "AI / Decision Layer",  "Perceives, reasons, plans, decides."],
                ["02", "Control Layer",         "Converts intent into precise motion."],
                ["03", "Hardware Interface",    "Connects software to physical hardware."],
                ["04", "Power Layer",           "Supplies, regulates, and protects."],
                ["05", "Physical Structure",    "Body, joints, gripper, motion."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-4 group">
                  <span className="font-mono text-xs text-accent mt-0.5 w-6 flex-shrink-0">{n}</span>
                  <div>
                    <div className="font-display font-semibold text-sm group-hover:text-primary transition-colors">{t}</div>
                    <div className="text-xs text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              to="/architecture"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/8 px-4 py-2 text-sm text-primary font-medium hover:bg-primary/15 transition-all"
            >
              Explore the Architecture <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Professional image #4 — contextually suitable for architecture */}
          <div className="relative rounded-2xl overflow-hidden border border-border-strong">
            <img
              src={prof4}
              alt="RoboParadigm full-stack robotics architecture — hardware and intelligence layers"
              loading="lazy"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-primary/80 uppercase tracking-wider
                            bg-background/70 backdrop-blur-sm rounded px-2 py-1 border border-primary/20">
              Full-Stack · 5-Layer Architecture
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PROJECT HIGHLIGHTS ═══════════════════════ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Project Highlights</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                Working platforms. Not slideware.
              </h2>
            </div>
            <Link to="/projects" className="text-sm text-accent hover:underline font-mono flex items-center gap-1">
              All projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Each card uses a distinct professional image — no repeats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h) => (
              <Link
                key={h.title}
                to="/projects"
                className="group relative block rounded-xl border border-border overflow-hidden
                           hover:border-primary/40 transition-all duration-300"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={h.img}
                    alt={h.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-55
                               group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
                </div>
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <StatusBadge status={h.status} />
                  <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-primary transition-colors">
                    {h.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {h.tags.map((t) => <TechTag key={t}>{t}</TechTag>)}
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full bg-primary/20 border border-primary/30 p-1.5">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PARADIGM CHRONICLES — NEWSLETTERS ═══════════════════ */}
      <section className="border-b border-border bg-surface/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-ambient-glow opacity-70 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <SectionLabel>Paradigm Chronicles</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
                Our Fortnightly<br />
                <span className="text-gradient-copper">Newsletter</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed text-sm">
                Stay up to date with the latest from the RoboParadigm lab —
                robotics progress, AI breakthroughs, and engineering deep-dives.
                Published by K-Hub Media Labs.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
              {newsletters.map((nl) => (
                <a
                  key={nl.issue}
                  href={nl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-xl border border-border bg-background hover:border-accent/40
                             p-5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/8 block"
                >
                  {/* Copper accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r
                                  from-accent/60 via-accent to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      K-Hub Media
                    </span>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                      #{nl.issue}
                    </span>
                  </div>

                  <div className="text-2xl font-display font-bold text-gradient mb-1">
                    Issue {nl.issue}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-2">{nl.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{nl.desc}</p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-accent font-mono
                                  group-hover:gap-2.5 transition-all">
                    Download PDF <ExternalLink className="h-3 w-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHY ROBOPARADIGM ═══════════════════════ */}
      <section className="border-b border-border relative overflow-hidden">
        {/* Decorative BG image — robot render, very low opacity, right side only */}
        <div className="absolute right-0 top-0 w-5/12 h-full hidden lg:block pointer-events-none">
          <img
            src={robot2}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-8"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Why RoboParadigm</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
              Adaptive automation,<br />
              <span className="text-gradient-copper">built for the real world.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 text-muted-foreground leading-relaxed text-lg">
            <p>
              Most automation systems are either expensive, rigid, or difficult to adapt.
              RoboParadigm is building intelligent automation that is affordable, flexible,
              and suitable for laboratories and small industries. Instead of fixed machines,
              we are developing robots that can adapt, learn, and execute different workflows.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                "Affordable for labs and small industries",
                "Full-stack from mechanical to AI",
                "Platform-based, not one-off experiments",
                "Research-backed performance metrics",
              ].map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-3 rounded-md border border-border bg-surface/50 p-4
                             hover:border-primary/30 transition-colors"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional image showcase — single full-width strip using only prof5+prof6 */}
      <section className="border-b border-border grid grid-cols-2 h-44 md:h-56 overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={prof5}
            alt="RoboParadigm servo control and diagnostics platform"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/60 uppercase tracking-wider">
            Servo Control · PID Diagnostics
          </div>
        </div>
        <div className="relative overflow-hidden border-l border-border">
          <img
            src={prof6}
            alt="RoboParadigm robot learning and foundation models"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent" />
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/60 uppercase tracking-wider text-right">
            Robot Learning · Foundation Models
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
