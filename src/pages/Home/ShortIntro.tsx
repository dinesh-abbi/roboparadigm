import { SectionLabel } from "@/components/site/primitives";

export function ShortIntro() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-surface/30">
      <div className="absolute inset-0 bg-ambient-glow opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center">
        <SectionLabel>Introduction</SectionLabel>
        <p className="mt-8 text-xl md:text-3xl font-display font-medium leading-relaxed md:leading-normal text-foreground">
          RoboParadigm is building intelligent, low-cost robotic systems that combine AI, perception, motion planning, embedded control, and real-world hardware.
        </p>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
          Our systems are designed to reduce manual work, improve repeatability, and make automation accessible in areas where traditional automation is too expensive or inflexible.
        </p>
      </div>
    </section>
  );
}
