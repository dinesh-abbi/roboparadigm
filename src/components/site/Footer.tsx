import { Link } from "@tanstack/react-router";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import logoImg from "@/assets/logos/roboparadigm-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/20 mt-24 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-ambient-glow opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="h-11 w-11 overflow-hidden rounded-md">
                <img
                  src={logoImg}
                  alt="RoboParadigm"
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-bold">
                  Robo<span className="text-primary">Paradigm</span>
                </span>
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  Intelligent Robotics
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building intelligent, affordable robotic systems for laboratories,
              research, and small-scale industries — full-stack robotics from
              mechanical structure to agentic AI.
            </p>

            <div className="mt-6 space-y-2">
              <a
                href="mailto:contact@roboparadigm.org"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="h-3.5 w-3.5 group-hover:text-primary" />
                contact@roboparadigm.org
              </a>
              <a
                href="https://maps.app.goo.gl/7kLbpDuQ4DZHTTMR8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <MapPin className="h-3.5 w-3.5 group-hover:text-primary" />
                Hyderabad, India
              </a>
            </div>

            {/* <p className="mt-8 font-mono text-[10px] text-muted-foreground/50 tracking-wider">
              // From perception to execution.
            </p> */}
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/architecture", label: "Architecture" },
                { to: "/projects", label: "Projects" },
                { to: "/technology", label: "Technology" },
                { to: "/research", label: "Research" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-5">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/learning", label: "Programs" },
                { to: "/collaborations", label: "Collaborate" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Paradigm Chronicles */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-5">
              Paradigm Chronicles
            </h4>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Our fortnightly newsletter covering the latest in robotics, AI,
              and the RoboParadigm journey.
            </p>
            <div className="space-y-2">
              {[
                { issue: "01", label: "Issue 01 — Foundation", href: "/newsletters/paradigm-chronicles-01.pdf" },
                { issue: "02", label: "Issue 02 — Expansion", href: "/newsletters/paradigm-chronicles-02.pdf" },
                { issue: "03", label: "Issue 03 — Evolution", href: "/newsletters/paradigm-chronicles-03.pdf" },
              ].map((nl) => (
                <a
                  key={nl.issue}
                  href={nl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-md border border-border bg-background/50 px-3 py-2 text-xs hover:border-primary/40 hover:bg-surface transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-primary">{nl.issue}</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{nl.label}</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row gap-3 justify-between text-[11px] text-muted-foreground/60">
          <p>© {new Date().getFullYear()} RoboParadigm. Built in India.</p>
          <p className="font-mono">Intelligent Robotics for Practical Automation</p>
        </div>
      </div>
    </footer>
  );
}
