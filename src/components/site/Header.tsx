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
    <>
      {/* Spacer removed to eliminate top dead space */}

      {/* Floating Pill Container */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-full border ${
            scrolled
              ? "border-primary/20 bg-background/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "border-border/50 bg-background/40 backdrop-blur-xl shadow-lg"
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group ml-1" onClick={() => setOpen(false)}>
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/20 shadow-inner">
                <img
                  src={logoImg}
                  alt="RoboParadigm Logo"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col leading-none hidden sm:flex">
                <span className="font-display text-sm font-bold tracking-tight">
                  Robo<span className="text-primary">Paradigm</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-all duration-200 rounded-full hover:bg-surface/80 data-[status=active]:text-primary data-[status=active]:bg-primary/10 font-medium tracking-wide"
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center mr-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[12px] font-semibold text-primary hover:bg-primary/20 hover:border-primary/80 transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-primary),0.15)] hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Initiate Contact
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-foreground rounded-full hover:bg-surface transition-colors mr-1"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="fixed inset-x-4 top-20 z-40 lg:hidden rounded-2xl border border-primary/20 bg-background/95 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="flex flex-col p-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-surface data-[status=active]:text-primary data-[status=active]:bg-primary/10 transition-colors"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="h-px w-full bg-border/50 my-2" />
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 m-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
