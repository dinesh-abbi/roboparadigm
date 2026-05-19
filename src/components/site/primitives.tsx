import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Status =
  | "Demo Ready"
  | "Prototype Complete"
  | "In Active Development"
  | "Simulation Validated"
  | "Research in Progress"
  | "Roadmap"
  | "AI Pipeline Ready"
  | "Teleoperation Working"
  | "Research Track"
  | "Validated";

const statusStyles: Record<string, string> = {
  "Demo Ready": "bg-status-demo/15 text-status-demo border-status-demo/30",
  "Prototype Complete": "bg-status-demo/15 text-status-demo border-status-demo/30",
  "Validated": "bg-status-demo/15 text-status-demo border-status-demo/30",
  "In Active Development": "bg-status-dev/15 text-status-dev border-status-dev/30",
  "Teleoperation Working": "bg-status-dev/15 text-status-dev border-status-dev/30",
  "AI Pipeline Ready": "bg-status-sim/15 text-status-sim border-status-sim/30",
  "Simulation Validated": "bg-status-sim/15 text-status-sim border-status-sim/30",
  "Research Track": "bg-status-research/15 text-status-research border-status-research/30",
  "Research in Progress": "bg-status-research/15 text-status-research border-status-research/30",
  "Roadmap": "bg-muted text-muted-foreground border-border-strong",
};

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? statusStyles["Roadmap"];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
      {children}
    </span>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-accent">
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-6 max-w-4xl font-display text-4xl md:text-6xl font-bold leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="border-t border-border bg-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-ambient-glow opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 text-center">
        <SectionLabel>Join Us</SectionLabel>
        <h2 className="mt-6 mx-auto max-w-3xl font-display text-3xl md:text-5xl font-bold leading-tight">
          Join RoboParadigm and build the future of{" "}
          <span className="text-gradient">intelligent robotic automation.</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/collaborations"
            id="cta-collaborate"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
          >
            Collaborate With Us
          </Link>
          <Link
            to="/contact"
            id="cta-contact"
            className="inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/8 px-6 py-3 text-sm font-medium text-accent hover:bg-accent/15 hover:border-accent/50 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
