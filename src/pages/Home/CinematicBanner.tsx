import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import prof2 from "@/assets/professional/2.webp";

export function CinematicBanner() {
  return (
    <section className="relative overflow-hidden h-64 md:h-96 border-y border-border/60">
      <img
        src={prof2}
        alt="RoboParadigm agentic AI perception pipeline in action"
        loading="lazy"
        className="w-full h-full object-cover opacity-55 hover:opacity-65 transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-2">Agentic AI Pipeline</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold max-w-sm leading-tight">
            Perception meets<br />intelligent action.
          </h3>
          <Link to="/technology" className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Explore the stack <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
