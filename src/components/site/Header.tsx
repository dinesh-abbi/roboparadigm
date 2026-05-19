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
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setOpen(false)}>
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10 group-hover:ring-primary/40 transition-all duration-300">
              <img
                src={logoImg}
                alt="RoboParadigm Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              RoboParadigm
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3.5 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 data-[status=active]:text-foreground rounded-lg hover:bg-white/[0.05]"
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
              className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-[13px] font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.05] transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-xl pt-[72px]">
          <div className="flex flex-col h-full overflow-y-auto px-6 pb-20 pt-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-4 text-xl font-display font-medium border-b border-border/40 text-muted-foreground hover:text-foreground data-[status=active]:text-primary transition-colors"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-8">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
