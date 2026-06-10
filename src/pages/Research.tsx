import { PageHero, SectionLabel } from "@/components/site/primitives";
import perception2 from "@/assets/agentic/perception2.png";
import researchVla from "@/assets/agentic/research_vla.png";
import prof2 from "@/assets/professional/2.webp";
import { motion } from "framer-motion";

const researchAreas = [
  { n: "01", title: "Agentic AI for Robotic Task Planning",        tags: ["Agentic AI", "Task Planning"],     hue: "blue"    as const },
  { n: "02", title: "Vision-Based Object Detection",               tags: ["Computer Vision", "Pose Estimation"], hue: "blue" as const },
  { n: "03", title: "Servo Performance Diagnostics",               tags: ["Servo Control", "PID"],           hue: "copper"  as const },
  { n: "04", title: "Wrist-Roll Metrics & Benchmarking",           tags: ["Benchmarking", "Metrics"],        hue: "copper"  as const },
  { n: "05", title: "Learning from Demonstration",                 tags: ["Robot Learning", "VLA Models"], hue: "emerald" as const },
  { n: "06", title: "5-Layer Robotics Architecture",               tags: ["Architecture", "Framework"],      hue: "blue"    as const },
  { n: "07", title: "Affordable Lab Automation Workflows",         tags: ["Lab Automation", "Affordability"], hue: "copper"  as const },
  { n: "08", title: "Automated Report Generation",                 tags: ["Documentation", "Analytics"],     hue: "emerald" as const },
];

const hueMap = {
  blue:    { border: "border-primary/25", borderHover: "group-hover:border-primary/50", bg: "bg-primary/5", text: "text-primary", dot: "bg-primary" },
  copper:  { border: "border-accent/25", borderHover: "group-hover:border-accent/50", bg: "bg-accent/5", text: "text-accent", dot: "bg-accent" },
  emerald: { border: "border-status-demo/25", borderHover: "group-hover:border-status-demo/50", bg: "bg-status-demo/5", text: "text-status-demo", dot: "bg-status-demo" },
};

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research & Innovation"
        title={<>Research that connects <span className="text-gradient">AI with physical robotics</span>.</>}
        subtitle="RoboParadigm is actively exploring research areas that improve the intelligence, reliability, and adaptability of robotic systems. Our work spans simulation, real-robot experiments, and ongoing paper preparation."
      />

      {/* Sticky Scroll Research Areas */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start relative">
            
            {/* Sticky Visuals Left Side */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SectionLabel>Core Research</SectionLabel>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">
                  Pushing the boundaries of <span className="text-gradient">intelligent autonomy</span>.
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed text-lg mb-8">
                  We are developing foundation models for robotics and conducting rigorous diagnostics on our 7-DOF arms to achieve sub-millimeter precision.
                </p>
              </motion.div>
              
              <motion.div 
                className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
                <img src={researchVla} alt="Vision-Language-Action Model Research" className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">VLA Model Diagnostics</div>
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary" initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1.5 }} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Scrolling Areas Right Side */}
            <div className="lg:col-span-7 grid gap-4 pt-10 lg:pt-0">
              {researchAreas.map((r, i) => {
                const h = hueMap[r.hue];
                return (
                  <motion.div
                    key={r.n}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`rounded-xl border ${h.border} ${h.borderHover} bg-background/40 backdrop-blur-md p-6 lg:p-8 hover:shadow-lg transition-all group relative overflow-hidden`}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity" style={{ color: h.text.replace('text-', 'var(--') + ')' }} />
                    <div className={`absolute top-6 right-6 font-display text-4xl font-bold ${h.text} opacity-10 group-hover:opacity-20 transition-opacity`}>{r.n}</div>
                    
                    <div className="flex items-start gap-4">
                      <span className={`mt-2 h-2.5 w-2.5 rounded-full flex-shrink-0 ${h.dot} animate-pulse`} />
                      <div>
                        <h3 className={`font-display font-semibold text-xl md:text-2xl mb-3 group-hover:${h.text} transition-colors`}>
                          {r.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {r.tags.map((tag) => (
                            <span key={tag} className={`inline-flex items-center rounded-md border ${h.border} ${h.bg}
                                                         px-2.5 py-1 font-mono text-[10px] uppercase ${h.text}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
          </div>
        </div>
      </section>

      {/* Research output — with perception image as an example of real output */}
      <section className="border-b border-border bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>Research Output</SectionLabel>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold leading-tight">
                From experiments to<br />
                <span className="text-gradient">published insights.</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                Our research work includes simulation studies, real-robot experiments,
                performance benchmarking, documentation tools, and ongoing paper preparation
                in areas such as servo control, wrist-roll analysis, intelligent manipulation,
                robot learning, and full-stack robotics architecture.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Simulation studies and real-robot experiments",
                  "Performance benchmarking and metrics documentation",
                  "Automated report generation tooling",
                  "Ongoing paper preparation — servo control, robot learning",
                ].map((item, idx) => (
                  <motion.div 
                    key={item} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 hover:border-primary/40 transition-colors"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* prof2 — perception/AI context */}
              <div className="rounded-2xl overflow-hidden border border-border-strong group relative">
                <img
                  src={prof2}
                  alt="RoboParadigm AI perception research — computer vision system"
                  loading="lazy"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </div>
              {/* Actual perception output — meaningful research artifact */}
              <div className="rounded-xl border border-border bg-background/50 p-6 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="font-mono text-xs uppercase tracking-widest text-accent">
                    Artifact — Agentic Output
                  </div>
                  <div className="h-2 w-2 rounded-full bg-status-demo animate-pulse" />
                </div>
                <div className="rounded-lg overflow-hidden border border-border shadow-inner">
                  <img
                    src={perception2}
                    alt="Agentic AI perception output — lab object detection research"
                    loading="lazy"
                    className="w-full h-auto max-h-56 object-contain bg-background"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
