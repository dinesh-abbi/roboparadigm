import { useState } from "react";
import { Mail, MapPin, Send, Users, FlaskConical, Handshake } from "lucide-react";
import { PageHero, SectionLabel } from "@/components/site/primitives";
import contactGlobe from "@/assets/agentic/contact_globe.png";
import { motion } from "framer-motion";

const contactReasons = [
  {
    icon: Handshake,
    title: "Collaborate",
    desc: "Research partnerships, joint development, and technology collaboration",
    color: "text-primary",
    borderColor: "border-primary/30",
    bgColor: "bg-primary/5",
    hoverBorder: "hover:border-primary/60",
  },
  {
    icon: FlaskConical,
    title: "Lab Automation",
    desc: "Deploy intelligent robotic systems in your lab or research environment",
    color: "text-[oklch(0.75_0.20_155)]",
    borderColor: "border-[oklch(0.75_0.20_155)/30]",
    bgColor: "bg-[oklch(0.75_0.20_155)/5]",
    hoverBorder: "hover:border-[oklch(0.75_0.20_155)/60]",
  },
  {
    icon: Users,
    title: "Join RoboParadigm",
    desc: "Internships, student programs, and career opportunities in robotics",
    color: "text-[oklch(0.82_0.20_75)]",
    borderColor: "border-[oklch(0.82_0.20_75)/30]",
    bgColor: "bg-[oklch(0.82_0.20_75)/5]",
    hoverBorder: "hover:border-[oklch(0.82_0.20_75)/60]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:contact@roboparadigm.org?subject=${encodeURIComponent(form.subject || "Inquiry from roboparadigm.org")}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailtoLink;
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Contact"
        title={<>Work With <span className="text-gradient">Us</span>.</>}
        subtitle="Interested in collaborating, learning, building, or deploying intelligent robotic systems? Connect with RoboParadigm to explore partnerships, internships, research collaborations, and automation opportunities."
      />

      {/* Contact reasons - Animated Cards */}
      <section className="relative border-b border-border bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {contactReasons.map((r) => (
              <motion.div 
                key={r.title} 
                variants={itemVariants}
                className={`group rounded-2xl border ${r.borderColor} ${r.hoverBorder} ${r.bgColor} backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default`}
              >
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border ${r.borderColor} group-hover:scale-110 transition-transform`}>
                  <r.icon className={`h-6 w-6 ${r.color}`} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-white transition-colors">{r.title}</h3>
                <p className="text-sm text-muted-foreground/90 leading-relaxed group-hover:text-muted-foreground transition-colors">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="relative border-b border-border bg-surface/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-start relative z-10">
          
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
              Let's build something<br />
              <span className="text-gradient">intelligent together.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed mb-10">
              Whether you're a researcher, an industry partner, an academic institution, or someone who wants to join our team — we'd love to hear from you.
            </p>

            <div className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              {sent ? (
                <div className="text-center py-10">
                  <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                    <Send className="h-7 w-7 text-primary animate-pulse" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3 text-white">Message dispatched!</h3>
                  <p className="text-muted-foreground">Your email client has opened. We look forward to connecting.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-8 text-sm font-semibold text-primary hover:text-white transition-colors"
                  >
                    ← Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 focus:bg-background transition-all outline-none"
                        placeholder="Dr. Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 focus:bg-background transition-all outline-none"
                        placeholder="jane@institution.org"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 focus:bg-background transition-all outline-none text-foreground appearance-none"
                    >
                      <option value="">Select a reason...</option>
                      <option value="Collaboration Inquiry">Research Collaboration</option>
                      <option value="Lab Automation Inquiry">Lab Automation</option>
                      <option value="Internship / Join RoboParadigm">Internship / Join Us</option>
                      <option value="Industry Partnership">Industry Partnership</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 focus:bg-background transition-all outline-none resize-none"
                      placeholder="How can we build the future together?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all glow-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-[1.02]"
                  >
                    <Send className="h-4 w-4" />
                    Send Transmission
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Visuals & Info */}
          <motion.div 
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* 3D Globe Visual */}
            <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-background/30 p-2 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img src={contactGlobe} alt="Global Connection" className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3 backdrop-blur-md bg-background/60 border border-border/50 px-4 py-2 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-demo opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-status-demo"></span>
                </span>
                <span className="font-mono text-xs font-semibold text-foreground/90">Global Node Active</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:contact@roboparadigm.org"
                className="flex flex-col gap-3 rounded-xl border border-border/50 bg-surface/30 p-5 hover:border-primary/50 hover:bg-surface/60 transition-all group"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Direct Email</div>
                  <div className="text-sm font-semibold group-hover:text-primary transition-colors truncate">contact@roboparadigm.org</div>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/7kLbpDuQ4DZHTTMR8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 rounded-xl border border-border/50 bg-surface/30 p-5 hover:border-accent/50 hover:bg-surface/60 transition-all group"
              >
                <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">HQ Location</div>
                  <div className="text-sm font-semibold group-hover:text-accent transition-colors line-clamp-2">
                    Peerzadiguda Road, Hyderabad, 500088
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
