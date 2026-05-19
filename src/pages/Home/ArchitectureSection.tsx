import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/site/primitives";
import prof4 from "@/assets/professional/4.webp";

export function ArchitectureSection() {
  return (
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
          <ol className="mt-8 space-y-2">
            {[
              ["01", "AI / Decision Layer", "Perceives, reasons, plans, decides."],
              ["02", "Control Layer", "Converts intent into precise motion."],
              ["03", "Hardware Interface", "Connects software to physical hardware."],
              ["04", "Power Layer", "Supplies, regulates, and protects."],
              ["05", "Physical Structure", "Body, joints, gripper, motion."],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-4 group pl-4 border-l-2 border-border hover:border-primary transition-colors duration-300 py-2">
                <span className="font-mono text-[11px] text-primary/60 flex-shrink-0 w-5">{n}</span>
                <div>
                  <div className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{d}</div>
                </div>
              </li>
            ))}
          </ol>

          <Link
            to="/architecture"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
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
  );
}
