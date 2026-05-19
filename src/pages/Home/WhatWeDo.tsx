import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/site/primitives";
import prof3 from "@/assets/professional/3.webp";

export function WhatWeDo() {
  return (
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
  );
}
