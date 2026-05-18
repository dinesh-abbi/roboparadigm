import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logos/roboparadigm-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/architecture", label: "Architecture" },
  { to: "/projects", label: "Projects" },
  { to: "/technology", label: "Technology" },
  { to: "/research", label: "Research" },
  { to: "/learning", label: "Programs" },
  { to: "/collaborations", label: "Collaborate" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/90 backdrop-blur-2xl shadow-lg shadow-black/20"
          : "border-border/50 bg-background/70 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
            <img
              src={logoImg}
              alt="RoboParadigm Logo"
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-bold tracking-tight">
              Robo<span className="text-primary">Paradigm</span>
            </span>
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">
              Intelligent Robotics
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-surface data-[status=active]:text-primary data-[status=active]:bg-primary/8 font-medium"
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-[13px] font-semibold text-primary hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground rounded-md hover:bg-surface transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-0.5">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-surface data-[status=active]:text-primary data-[status=active]:bg-primary/8 transition-colors"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
