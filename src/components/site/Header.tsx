import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-sm border border-primary" />
            <div className="absolute inset-1 rounded-sm bg-primary/30 group-hover:bg-primary/60 transition-colors" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Robo<span className="text-primary">Paradigm</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors data-[status=active]:text-primary"
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            Contact
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-2 py-2 text-sm text-muted-foreground hover:text-foreground data-[status=active]:text-primary"
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
