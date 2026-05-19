import { SectionLabel } from "@/components/site/primitives";

export function WhyRoboParadigm() {
  return (
    <section className="border-y border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-ambient-glow opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionLabel>Why RoboParadigm</SectionLabel>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
            Adaptive automation,<br />
            <span className="text-gradient-copper">built for the real world.</span>
          </h2>
        </div>
        <div className="lg:col-span-7 flex items-center text-muted-foreground leading-relaxed text-lg">
          <p>
            Most automation systems are either expensive, rigid, or difficult to adapt.
            RoboParadigm is building intelligent automation systems that are affordable, flexible,
            and suitable for laboratories and small industries. Instead of fixed machines,
            we are developing robots that can adapt, learn, and execute different workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
