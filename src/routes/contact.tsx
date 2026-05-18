import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { PageHero, SectionLabel } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Work With RoboParadigm" },
      { name: "description", content: "Get in touch with RoboParadigm for partnerships, internships, research collaborations, and intelligent robotic automation opportunities." },
      { property: "og:title", content: "Work With RoboParadigm" },
      { property: "og:description", content: "Collaborate, learn, build, or deploy intelligent robotic systems with RoboParadigm." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Work with <span className="text-primary">RoboParadigm</span>.</>}
        subtitle="Interested in collaborating, learning, building, or deploying intelligent robotic systems? Connect with us to explore partnerships, internships, research collaborations, and automation opportunities."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <SectionLabel>Reach Us</SectionLabel>
            <a
              href="mailto:contact@roboparadigm.org"
              className="group flex items-start gap-5 rounded-md border border-border bg-surface/50 p-6 hover:border-primary/50 transition-colors"
            >
              <Mail className="h-6 w-6 text-primary shrink-0" />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="mt-1 font-display text-xl font-semibold group-hover:text-primary transition-colors">
                  contact@roboparadigm.org
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  For partnerships, internships, and research inquiries.
                </p>
              </div>
            </a>
            <div className="flex items-start gap-5 rounded-md border border-border bg-surface/50 p-6">
              <MapPin className="h-6 w-6 text-primary shrink-0" />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Location</div>
                <div className="mt-1 font-display text-xl font-semibold">India</div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-primary/30 bg-primary/5 p-8 lg:p-10">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">// closing statement</div>
            <p className="mt-5 font-display text-2xl md:text-3xl font-bold leading-tight">
              RoboParadigm is building the future of intelligent robotic automation
              — where robots can perceive, plan, learn, and execute real-world
              workflows with precision, affordability, and adaptability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:contact@roboparadigm.org?subject=Collaboration%20Inquiry"
                className="inline-flex items-center rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Collaborate With Us
              </a>
              <a
                href="mailto:contact@roboparadigm.org?subject=Join%20RoboParadigm"
                className="inline-flex items-center rounded-sm border border-border-strong px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Join RoboParadigm
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
