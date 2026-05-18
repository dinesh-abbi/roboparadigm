import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 rounded-sm border border-primary" />
              <div className="absolute inset-1 rounded-sm bg-primary/30" />
            </div>
            <span className="font-display text-base font-bold">
              Robo<span className="text-primary">Paradigm</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Building intelligent, affordable robotic systems for laboratories,
            research, and small-scale industries — full-stack robotics from
            mechanical structure to agentic AI.
          </p>
          <p className="mt-6 font-mono text-xs text-muted-foreground/70">
            // From perception to execution.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/architecture" className="hover:text-primary transition-colors">Architecture</Link></li>
            <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link to="/technology" className="hover:text-primary transition-colors">Technology</Link></li>
            <li><Link to="/research" className="hover:text-primary transition-colors">Research</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Connect
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/learning" className="hover:text-primary transition-colors">Programs</Link></li>
            <li><Link to="/collaborations" className="hover:text-primary transition-colors">Collaborate</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li>
              <a href="mailto:contact@roboparadigm.org" className="hover:text-primary transition-colors font-mono text-xs">
                contact@roboparadigm.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} RoboParadigm. Built in India.</p>
          <p className="font-mono">Intelligent Robotics for Practical Automation</p>
        </div>
      </div>
    </footer>
  );
}
