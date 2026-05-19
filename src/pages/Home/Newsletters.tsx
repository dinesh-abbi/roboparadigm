import { ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/site/primitives";

const newsletters = [
  { issue: "01", title: "Foundation", desc: "Early builds, architecture decisions, and the start of the RoboParadigm journey.", href: "/newsletters/paradigm-chronicles-01.pdf" },
  { issue: "02", title: "Expansion", desc: "Mobile platforms, agentic AI pipelines, and perception system breakthroughs.", href: "/newsletters/paradigm-chronicles-02.pdf" },
  { issue: "03", title: "Evolution", desc: "Robot learning experiments, benchmarking results, and the road ahead.", href: "/newsletters/paradigm-chronicles-03.pdf" },
];

export function Newsletters() {
  return (
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
  );
}
