import { PageHero, SectionLabel } from "@/components/site/primitives";
import prof6 from "@/assets/professional/6.webp";
import hologramAi from "@/assets/agentic/hologram_ai.png";
import hologramGear from "@/assets/agentic/hologram_gear.png";
import badgeCert from "@/assets/agentic/badge_certificate.png";
import { motion } from "framer-motion";

const programThemes = [
  { n: "01", title: "Robotics Fundamentals",          level: "Foundation",   hue: "blue"    as const, icon: hologramGear },
  { n: "02", title: "ROS 2 & MoveIt Control",         level: "Intermediate", hue: "blue"    as const, icon: badgeCert },
  { n: "03", title: "Mobile & Nav2 Navigation",       level: "Intermediate", hue: "blue"    as const, icon: badgeCert },
  { n: "04", title: "AI Perception for Robotics",     level: "Advanced",     hue: "copper"  as const, icon: hologramAi },
  { n: "05", title: "Agentic AI for Planning",        level: "Advanced",     hue: "copper"  as const, icon: hologramAi },
  { n: "06", title: "Servo Control, PID Tuning",      level: "Intermediate", hue: "copper"  as const, icon: hologramGear },
  { n: "07", title: "Robot Learning & VLA Models",    level: "Research",     hue: "emerald" as const, icon: hologramAi },
  { n: "08", title: "5-Layer Full-Stack Design",      level: "System Design",hue: "blue"    as const, icon: badgeCert },
];

const hueMap = {
  blue:    { border: "border-primary/25", borderHover: "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]", bg: "bg-primary/5",     text: "text-primary",      badge: "border-primary/30 bg-primary/10 text-primary" },
  copper:  { border: "border-accent/25",  borderHover: "hover:border-accent/50 hover:shadow-[0_0_20px_rgba(var(--accent),0.1)]", bg: "bg-accent/5",      text: "text-accent",       badge: "border-accent/30 bg-accent/10 text-accent" },
  emerald: { border: "border-status-demo/25", borderHover: "hover:border-status-demo/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]", bg: "bg-status-demo/5", text: "text-status-demo", badge: "border-status-demo/30 bg-status-demo/10 text-status-demo" },
};

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

export default function Learning() {
  return (
    <>
      <PageHero
        eyebrow="Learning & Programs"
        title={<>Building the next generation of <span className="text-gradient">robotics talent</span>.</>}
        subtitle="RoboParadigm supports hands-on learning programs where students and interns work on real robotic systems, not simulations or theory alone. The approach is project-based and focused on practical skills needed to build, test, and improve robotic platforms."
      />

      {/* Program themes — Immersive glass cards */}
      <section className="relative border-b border-border overflow-hidden bg-background">
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
          <SectionLabel>Program Themes</SectionLabel>
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold mb-14 max-w-2xl">
            Practical skills for the full robotics stack.
          </h2>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {programThemes.map((p, idx) => {
              const h = hueMap[p.hue];
              return (
                <motion.div
                  key={p.n}
                  variants={itemVariants}
                  className={`relative rounded-xl border ${h.border} ${h.bg} backdrop-blur-md p-6 ${h.borderHover} transition-all duration-300 group overflow-hidden`}
                >
                  <div className="absolute -right-12 -top-12 opacity-10 group-hover:opacity-30 transition-opacity duration-500 blur-sm group-hover:blur-none group-hover:scale-110 pointer-events-none">
                    <img src={p.icon} alt="Icon" className="w-48 h-48 object-cover" />
                  </div>
                  
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <span className={`font-mono text-xs font-bold ${h.text}`}>{p.n}</span>
                      <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${h.badge}`}>
                        {p.level}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <h3 className={`font-display font-semibold text-lg leading-snug group-hover:${h.text} transition-colors`}>
                        {p.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Learning philosophy — Immersive split layout */}
      <section className="relative border-b border-border bg-surface/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <img
                  src={prof6}
                  alt="Hands-on robotics learning and demonstration-based training"
                  loading="lazy"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"><img src={prof6} className="w-full h-full object-cover scale-150" /></div>
                    <div className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"><img src={prof6} className="w-full h-full object-cover scale-150 object-right" /></div>
                  </div>
                  <div className="text-sm font-semibold">Active Learning Environments</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SectionLabel>Our Approach</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
                Learn by building<br />
                <span className="text-gradient">real systems.</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                RoboParadigm supports hands-on learning programs where students and interns
                work on real robotic systems — not simulations or theory alone. The learning
                approach is project-based and focused on practical skills.
              </p>
              
              <div className="mt-8 space-y-4">
                {[
                  "Work on real robots from day one",
                  "Project-based curriculum from fundamentals to advanced AI",
                  "Mentorship from practicing robotics engineers",
                  "Exposure to full-stack development — hardware to AI",
                  "Research pathways for motivated interns",
                ].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-4 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent/10 border border-accent/20">
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
