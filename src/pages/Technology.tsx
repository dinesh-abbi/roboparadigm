import { PageHero, SectionLabel } from "@/components/site/primitives";
import prof1 from "@/assets/professional/1.webp";
import techPerception from "@/assets/agentic/tech_perception.png";
import techMotion from "@/assets/agentic/tech_motion.png";
import { motion } from "framer-motion";

const techAreas = [
  {
    category: "Hardware",
    desc: "Robotic Arms (7-DOF), Mobile Manipulators, Servo Motors, Custom 3D-Printed Structures.",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    hue: "copper" as const,
    bgImg: prof1,
  },
  {
    category: "AI and Perception",
    desc: "Computer Vision, Object Detection, Scene Understanding, Agentic AI.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    hue: "blue" as const,
    bgImg: techPerception,
  },
  {
    category: "Planning and Autonomy",
    desc: "Task Planning, Agentic Workflows, Nav2, Behavior Trees.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    hue: "blue" as const,
    bgImg: techMotion,
  },
  {
    category: "Robotics Middleware",
    desc: "ROS 2 (Iron / Humble), MoveIt 2, Gazebo Sim, ros2_control.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    hue: "blue" as const,
  },
  {
    category: "Control Systems",
    desc: "PID Control, Trajectory Generation, Servo Diagnostics, State Estimation.",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    hue: "copper" as const,
  },
  {
    category: "Robot Learning",
    desc: "Learning from Demonstration, SmolVLA, Pi0.5.",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    hue: "emerald" as const,
  },
];

const hueMap = {
  blue: { border: "border-primary/25", borderHover: "group-hover:border-primary/50", bg: "bg-primary/5", text: "text-primary" },
  copper: { border: "border-accent/25", borderHover: "group-hover:border-accent/50", bg: "bg-accent/5", text: "text-accent" },
  emerald: { border: "border-status-demo/25", borderHover: "group-hover:border-status-demo/50", bg: "bg-status-demo/5", text: "text-status-demo" },
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

export default function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology Stack"
        title={<>The stack that makes robots <span className="text-gradient">think and move</span>.</>}
        subtitle="Our technology stack enables robots to move beyond fixed automation. We combine perception, planning, control, hardware interfaces, power design, mechanical engineering, and learning so that robots can adapt and perform real-world tasks with intelligence and flexibility."
      />

      {/* Tech Stack Bento Grid */}
      <section className="relative border-b border-border overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <SectionLabel>Full-Stack Approach</SectionLabel>
          <h2 className="mt-6 mb-12 font-display text-3xl font-bold">Integrated Core Technologies</h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {techAreas.map((t, idx) => {
              const h = hueMap[t.hue];
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-2xl border ${h.border} ${h.borderHover} ${h.bg} backdrop-blur-md p-6 min-h-[240px] transition-all duration-300 ${t.span}`}
                >
                  {t.bgImg && (
                    <>
                      <div className="absolute inset-0 z-0">
                        <img src={t.bgImg} alt={t.category} className="w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                      </div>
                      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
                    </>
                  )}
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <div className={`font-mono text-xs uppercase tracking-widest ${h.text} mb-3 font-semibold`}>
                      {t.category}
                    </div>
                    <h3 className="font-display font-medium text-lg md:text-xl text-foreground/90 group-hover:text-white transition-colors">
                      {t.desc}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5-Layer Architecture CSS Diagram */}
      <section className="relative border-b border-border bg-surface/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>5-Layer Architecture</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mt-6">
                Purpose-built for<br />
                <span className="text-gradient">intelligent automation.</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                We've designed a rigid yet flexible 5-layer architecture. From the physical hardware and embedded control to the higher-order cognitive layers governing task planning and AI perception.
              </p>
            </motion.div>

            <motion.div 
              className="relative rounded-2xl border border-border-strong bg-background/50 p-8 flex flex-col gap-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { name: "L5: Cognitive & Agentic Planning", color: "bg-primary/20 border-primary/40 text-primary glow-primary" },
                { name: "L4: AI Perception & Vision", color: "bg-primary/10 border-primary/30 text-primary/80" },
                { name: "L3: Middleware & Motion Planning", color: "bg-muted/30 border-border text-foreground/80" },
                { name: "L2: Embedded Control Systems", color: "bg-accent/10 border-accent/30 text-accent/80" },
                { name: "L1: Physical Hardware & Power", color: "bg-accent/20 border-accent/40 text-accent glow-accent" },
              ].map((layer, i) => (
                <div key={i} className={`relative flex items-center justify-center p-4 lg:p-5 rounded-lg border backdrop-blur-sm transition-transform hover:scale-[1.02] cursor-default ${layer.color}`}>
                  <span className="font-mono text-sm tracking-wide font-semibold">{layer.name}</span>
                </div>
              ))}
              
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-[85%] border-l-2 border-y-2 border-border/50 rounded-l-xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
