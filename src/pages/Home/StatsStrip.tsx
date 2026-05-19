export function StatsStrip() {
  return (
    <section className="border-y border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-ambient-glow opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-border/60">
          {[
            { value: "3", label: "Active Platforms" },
            { value: "5-Layer", label: "Architecture Stack" },
            { value: "ROS 2", label: "Native Integration" },
            { value: "Open", label: "For Collaboration" },
            { value: "Agentic", label: "AI Pipeline" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center px-8 py-2">
              <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-[12px] text-muted-foreground mt-0.5 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
