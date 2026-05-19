import { useState } from "react";
import { Mail, MapPin, Send, Users, FlaskConical, Handshake } from "lucide-react";
import { PageHero, SectionLabel } from "@/components/site/primitives";
import robot2 from "@/assets/posters/robot2.png";
import logoEnhanced from "@/assets/logos/logo-enhanced.png";



const contactReasons = [
  {
    icon: Handshake,
    title: "Collaborate",
    desc: "Research partnerships, joint development, and technology collaboration",
    color: "text-primary",
    borderColor: "border-primary/30",
    bgColor: "bg-primary/8",
  },
  {
    icon: FlaskConical,
    title: "Lab Automation",
    desc: "Deploy intelligent robotic systems in your lab or research environment",
    color: "text-[oklch(0.75_0.20_155)]",
    borderColor: "border-[oklch(0.75_0.20_155)/30]",
    bgColor: "bg-[oklch(0.75_0.20_155)/8]",
  },
  {
    icon: Users,
    title: "Join RoboParadigm",
    desc: "Internships, student programs, and career opportunities in robotics",
    color: "text-[oklch(0.82_0.20_75)]",
    borderColor: "border-[oklch(0.82_0.20_75)/30]",
    bgColor: "bg-[oklch(0.82_0.20_75)/8]",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link
    const mailtoLink = `mailto:contact@roboparadigm.org?subject=${encodeURIComponent(form.subject || "Inquiry from roboparadigm.org")}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailtoLink;
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={robot2} alt="RoboParadigm — Work With Us" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 w-full">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-display text-4xl md:text-6xl font-bold leading-[1.05]">
            Work With <span className="text-gradient">Us</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Interested in collaborating, learning, building, or deploying intelligent robotic systems?
            Connect with RoboParadigm to explore partnerships, internships, research collaborations,
            and automation opportunities.
          </p>
        </div>
      </section>

      {/* Contact reasons */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid md:grid-cols-3 gap-5">
            {contactReasons.map((r) => (
              <div key={r.title} className={`rounded-xl border ${r.borderColor} ${r.bgColor} p-6`}>
                <r.icon className={`h-6 w-6 ${r.color} mb-4`} />
                <h3 className="font-display text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact info */}
          <div>
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
              Let's build something<br />
              <span className="text-gradient">intelligent together.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Whether you're a researcher, an industry partner, an academic institution, or
              someone who wants to join our team — we'd love to hear from you.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:contact@roboparadigm.org"
                id="contact-email-link"
                className="flex items-center gap-4 rounded-xl border border-border bg-surface/40 p-4 hover:border-primary/40 hover:bg-surface transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Email</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">contact@roboparadigm.org</div>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/7kLbpDuQ4DZHTTMR8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-border bg-surface/40 p-4 hover:border-primary/40 hover:bg-surface transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Location</div>
                  <div className="text-sm font-medium leading-relaxed group-hover:text-primary transition-colors">
                    Peerzadiguda Road, Village, Uppal, Kachawanisingaram, Hyderabad, Telangana 500088
                  </div>
                </div>
              </a>
            </div>

            {/* Google Maps embed */}
            <div className="mt-10 rounded-xl overflow-hidden border border-border-strong bg-background/50 p-1">
              <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                <iframe
                  title="RoboParadigm Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                  src="https://maps.google.com/maps?q=Teleparadigm%20Towers,%20Hyderabad&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="mt-2 p-2 flex justify-between items-center font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                <span>RoboParadigm Facility</span>
                <a
                  href="https://maps.app.goo.gl/7kLbpDuQ4DZHTTMR8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Full Map →
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-border bg-surface/30 p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Message sent!</h3>
                <p className="text-sm text-muted-foreground">Your email client should have opened. We'll get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-primary hover:underline font-mono"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all placeholder:text-muted-foreground/40"
                    placeholder="Dr. Firstname Lastname"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all placeholder:text-muted-foreground/40"
                    placeholder="you@institution.org"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all text-foreground"
                  >
                    <option value="">Select a reason...</option>
                    <option value="Collaboration Inquiry">Research Collaboration</option>
                    <option value="Lab Automation Inquiry">Lab Automation</option>
                    <option value="Internship / Join RoboParadigm">Internship / Join Us</option>
                    <option value="Industry Partnership">Industry Partnership</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none placeholder:text-muted-foreground/40"
                    placeholder="Tell us about your project, institution, or what you're looking to build..."
                  />
                </div>
                <button
                  type="submit"
                  id="contact-submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
