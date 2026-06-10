import { Link } from "@tanstack/react-router";
import { PageHero, SectionLabel } from "@/components/site/primitives";
import collabNetworkMap from "@/assets/agentic/collab_network_map.png";
import { motion } from "framer-motion";

const collabAreas = [
  { n: "01", title: "Robotics R&D",             desc: "Joint R&D on intelligent robotic systems, manipulation platforms, and applied robotics.",             hue: "blue"    as const },
  { n: "02", title: "Lab Automation",           desc: "Design and deploy intelligent automation for laboratory workflows and precision handling.",             hue: "blue"    as const },
  { n: "03", title: "Agentic Perception",       desc: "Collaborate on computer vision, agentic AI pipelines, and perception systems for real-world use.",     hue: "blue"    as const },
  { n: "04", title: "Robot Learning",           desc: "Explore learning-from-demonstration, VLA models, and foundation model applications together.",         hue: "emerald" as const },
  { n: "05", title: "Student Training",         desc: "Host students for hands-on robotics internships covering hardware, control, perception, and AI.",       hue: "copper"  as const },
  { n: "06", title: "Co-Development",           desc: "Co-design robotic systems where hardware and software evolve together from the ground up.",            hue: "copper"  as const },
];

const hueMap = {
  blue:    { border: "border-primary/25", borderHover: "hover:border-primary/50", bg: "bg-primary/5", text: "text-primary" },
  copper:  { border: "border-accent/25",  borderHover: "hover:border-accent/50",  bg: "bg-accent/5", text: "text-accent" },
  emerald: { border: "border-status-demo/25", borderHover: "hover:border-status-demo/50", bg: "bg-status-demo/5", text: "text-status-demo" },
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

export default function Collaborations() {
  return (
    <>
      <PageHero
        eyebrow="Collaborations"
        title={<>Collaborate with <span className="text-gradient">RoboParadigm</span>.</>}
        subtitle="We are open to collaborations with research institutions, academic organizations, industry partners, robotics labs, and technology companies interested in intelligent automation, lab robotics, robot learning, and applied AI systems."
      />

      {/* Collaboration network — Visual layout */}
      <section className="relative border-b border-border bg-background overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>Global Network</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight">
                Building a network of <span className="text-gradient">innovation</span>.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg mb-8">
                We believe that the future of robotics requires an ecosystem of shared knowledge, open collaboration, and hardware-software co-development. 
              </p>
              
              <div className="flex flex-col gap-4">
                {[
                  "Academic & Research Institutions",
                  "Deeptech & Robotics Startups",
                  "Biotech & Pharmaceutical Labs",
                ].map((item, idx) => (
                  <motion.div 
                    key={item} 
                    className="flex items-center gap-4 rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-sm shadow-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    </div>
                    <span className="text-sm font-semibold text-foreground/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/40 to-transparent z-10" />
                <img
                  src={collabNetworkMap}
                  alt="Global Robotics R&D Network"
                  loading="lazy"
                  className="w-full h-auto min-h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="font-mono text-xs uppercase tracking-widest text-primary font-semibold mb-2">Network Topology Active</div>
                  <div className="flex gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse delay-75" />
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-status-demo animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration areas — Animated Grid */}
      <section className="relative border-b border-border bg-surface/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <SectionLabel>Areas of Collaboration</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-bold mb-14">How we can work together</h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {collabAreas.map((c) => {
              const h = hueMap[c.hue];
              return (
                <motion.div
                  key={c.n}
                  variants={itemVariants}
                  className={`rounded-xl border ${h.border} ${h.borderHover} bg-background/50 backdrop-blur-md p-8 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all group relative`}
                >
                  <div className={`absolute -top-4 right-6 font-display text-5xl font-bold ${h.text} opacity-10 group-hover:opacity-20 transition-opacity`}>{c.n}</div>
                  <h3 className={`font-display font-semibold text-lg mb-4 group-hover:${h.text} transition-colors`}>
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed group-hover:text-muted-foreground transition-colors">{c.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
