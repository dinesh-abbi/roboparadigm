import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel, CTASection } from "@/components/site/primitives";

// Kahuna images
import k1 from "@/assets/courses/kahuna/k1.jpg";
import k2 from "@/assets/courses/kahuna/k2.jpg";
import k3 from "@/assets/courses/kahuna/k3.jpg";
import k4 from "@/assets/courses/kahuna/k4.jpg";
import k5 from "@/assets/courses/kahuna/k5.jpg";
import k6 from "@/assets/courses/kahuna/k6.jpg";
import k7 from "@/assets/courses/kahuna/k7.jpg";
import k8 from "@/assets/courses/kahuna/k8.jpg";
import kVid from "@/assets/courses/kahuna/k_vid.mp4";

// VV images
import v1 from "@/assets/courses/vv/v1.jpg";
import v2 from "@/assets/courses/vv/v2.jpg";
import v3 from "@/assets/courses/vv/v3.jpg";
import v4 from "@/assets/courses/vv/v4.jpg";
import v5 from "@/assets/courses/vv/v5.jpg";
import v6 from "@/assets/courses/vv/v6.jpg";
import v7 from "@/assets/courses/vv/v7.jpg";
import v8 from "@/assets/courses/vv/v8.jpg";

// Bambu lab
import bambuLabSetup from "@/assets/agentic/bambu_lab_setup.png";

/* ─── Gallery: drag + touch + wheel scrollable ─── */
function Gallery({ items }: { items: { src: string; type?: "video" }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
    if (ref.current) ref.current.style.cursor = "grabbing";
  };
  const onMouseLeave = () => {
    isDown.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  };
  const onMouseUp = () => {
    isDown.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const onWheel = (e: React.WheelEvent) => {
    if (ref.current) ref.current.scrollLeft += e.deltaY + e.deltaX;
  };

  return (
    <div
      ref={ref}
      className="flex gap-3 overflow-x-auto pb-2 select-none"
      style={{ cursor: "grab", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onWheel={onWheel}
    >
      {items.map((item, i) => (
        <div key={i} className="flex-shrink-0 w-64 md:w-80 aspect-video rounded-xl overflow-hidden border border-border/40">
          {item.type === "video" ? (
            <video src={item.src} autoPlay loop muted playsInline className="w-full h-full object-cover pointer-events-none" />
          ) : (
            <img src={item.src} alt="" draggable={false} className="w-full h-full object-cover pointer-events-none" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Stat pill ─── */
function Stat({ value, label, hue }: { value: string; label: string; hue: "blue" | "copper" }) {
  const cls = hue === "blue" ? "border-primary/30 bg-primary/8 text-primary" : "border-accent/30 bg-accent/8 text-accent";
  return (
    <div className={`rounded-2xl border ${cls} px-6 py-5 text-center`}>
      <div className="font-display text-3xl md:text-4xl font-bold">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

/* ─── Page ─── */
export default function Courses() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-radial-glow opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Courses & Bootcamps</SectionLabel>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-4xl">
              Where <span className="text-gradient">RoboParadigm</span> meets the classroom.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We partner with institutions to deliver hands-on robotics education. Students don't just learn — they build, wire, program, and ship real robots.
            </p>
          </motion.div>

          {/* Partner anchors */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 max-w-xl">
            {[
              { logo: "/other-logos/kahuna-logo.svg", type: "svg", label: "RoboParadigm × Kahuna", meta: "B.Tech · 3-Day Bootcamp", anchor: "#kahuna" },
              { logo: "/other-logos/vv-kaksha.png", type: "img", label: "RoboParadigm × VV Kaksha", meta: "School · 30-Day Camp", anchor: "#vv-kaksha" },
            ].map((p, i) => (
              <motion.a
                key={p.label}
                href={p.anchor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-surface/30 backdrop-blur-md px-5 py-4 hover:border-primary/40 hover:bg-primary/5 transition-all no-underline"
              >
                {p.type === "svg"
                  ? <img src={p.logo} alt="Logo" className="h-7 w-auto brightness-0 invert flex-shrink-0" />
                  : <img src={p.logo} alt="Logo" className="h-8 w-auto flex-shrink-0" />}
                <div>
                  <div className="font-display font-semibold text-sm text-foreground">{p.label}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{p.meta}</div>
                </div>
                <span className="ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── KAHUNA MISSION ── */}
      <section id="kahuna" className="relative border-b border-border overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 space-y-16">

          {/* Badge + headline */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 mb-8">
              <img src="/other-logos/kahuna-logo.svg" alt="Kahuna" className="h-6 w-auto brightness-0 invert" />
              <span className="text-muted-foreground/50 font-bold">×</span>
              <span className="font-display font-bold text-sm text-white">RoboParadigm</span>
              <div className="border-l border-primary/30 pl-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold">B.Tech · 3-Day Bootcamp</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                  B.Tech Robotics<br /><span className="text-gradient">Intensive Bootcamp.</span>
                </h2>
                <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                  RoboParadigm deployed a team to the Kahuna campus to run a focused 3-day bootcamp. <strong className="text-foreground">35 kits were prepared</strong> — with 2 students working together on each robot, teams learned through collaboration and real problem-solving.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Built the Otto Humanoid DIY Robot from scratch",
                    "ESP32-CAM integrated for real-time computer vision",
                    "Trained on what to do and what NOT to do with electrical components",
                    "Detailed documentation and visual step-by-step guides provided",
                    "Custom 3D-printed parts pre-built by the RoboParadigm team",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Stat value="3" label="Intensive Days" hue="blue" />
                <Stat value="35" label="Kits Prepared" hue="blue" />
                <Stat value="2" label="Students Per Robot" hue="blue" />
                <Stat value="100%" label="Hands-On" hue="blue" />
              </div>
            </div>
          </motion.div>

          {/* 3-Day schedule */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">3-Day Schedule</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { day: "Day 1", title: "Foundations & Safety", desc: "Electrical safety basics — what to do and NOT to do. Understanding components, circuits, and the robot's anatomy before any assembly begins." },
                { day: "Day 2", title: "Robot Assembly", desc: "Hands-on build session. Students assemble the Otto Humanoid robot using pre-printed 3D parts, servo motors, and custom hardware kits." },
                { day: "Day 3", title: "ESP32 & Integration", desc: "Programming the ESP32-CAM, adding computer vision, wiring the full system, and testing the final robot." },
              ].map((d) => (
                <div key={d.day} className="rounded-xl border border-border/50 bg-surface/30 p-5 hover:border-primary/30 transition-all">
                  <div className="font-mono text-xs text-primary font-bold mb-2">{d.day}</div>
                  <div className="font-display font-semibold text-base mb-2">{d.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{d.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Kahuna Gallery */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Gallery</span>
              <div className="h-px flex-1 bg-border/60" />
              <span className="text-[10px] text-muted-foreground/50 font-mono">drag · scroll · swipe</span>
            </div>
            <Gallery items={[
              { src: k1 }, { src: k2 }, { src: k3 }, { src: k4 },
              { src: kVid, type: "video" },
              { src: k5 }, { src: k6 }, { src: k7 }, { src: k8 },
            ]} />
          </motion.div>

          {/* Manufacturing lab */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Manufacturing Lab</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h3 className="font-display text-2xl md:text-3xl font-bold">
                  Every part, <span className="text-gradient">precision printed</span> in-house.
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Before the bootcamp, RoboParadigm's team designs and prints every structural component. Students receive pre-built parts alongside raw kits — learning why each component was designed the way it was.
                </p>
                <div className="space-y-2.5">
                  {[
                    { model: "Bambu Lab P1S + AMS 2 Pro", role: "Primary Production" },
                    { model: "Bambu Lab A1", role: "Volume Print Farm" },
                    { model: "Bambu Lab A1 Mini", role: "Rapid Prototype Station" },
                  ].map((p) => (
                    <div key={p.model} className="flex items-center justify-between rounded-lg border border-border/40 bg-surface/30 px-4 py-3 hover:border-primary/30 transition-all">
                      <span className="text-sm font-semibold text-foreground">{p.model}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider border border-primary/25 bg-primary/8 text-primary px-2 py-0.5 rounded">{p.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-xl group">
                <img src={bambuLabSetup} alt="RoboParadigm 3D printing lab" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-white/70 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                  RoboParadigm Manufacturing Lab
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VV SUMMER CAMP ── */}
      <section id="vv-kaksha" className="relative border-b border-border overflow-hidden scroll-mt-20 bg-surface/20">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 space-y-16">

          {/* Badge + headline */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-5 py-3 mb-8">
              <img src="/other-logos/vv-kaksha.png" alt="VV Kaksha" className="h-8 w-auto" />
              <span className="text-muted-foreground/50 font-bold">×</span>
              <span className="font-display font-bold text-sm text-white">RoboParadigm</span>
              <div className="border-l border-accent/30 pl-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">School Students · 30-Day Summer Camp</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                  30-Day Summer<br /><span className="text-gradient-copper">Robotics Camp.</span>
                </h2>
                <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                  A month-long immersive journey for school students. Starting from absolute zero — understanding components, circuits, and code — all the way to building a walking, dancing Otto robot.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Started from scratch: circuits, components & electronics basics",
                    "Assembled the Otto DIY bipedal robot step-by-step",
                    "Block-based programming: walk, dance & obstacle avoidance",
                    "Grand finale showcase — live demonstration to audience",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat value="30" label="Days of Training" hue="copper" />
                <Stat value="School" label="Level Students" hue="copper" />
                <Stat value="0→1" label="From Scratch" hue="copper" />
                <Stat value="Otto" label="Robot Built" hue="copper" />
              </div>
            </div>
          </motion.div>

          {/* VV Gallery */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Gallery</span>
              <div className="h-px flex-1 bg-border/60" />
              <span className="text-[10px] text-muted-foreground/50 font-mono">drag · scroll · swipe</span>
            </div>
            <Gallery items={[
              { src: v1 }, { src: v2 }, { src: v3 }, { src: v4 },
              { src: v5 }, { src: v6 }, { src: v7 }, { src: v8 },
            ]} />
          </motion.div>

          {/* 4 phases */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Camp Phases</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: "01", title: "Foundations", desc: "Electronics, circuits, and basic mechanical structures." },
                { n: "02", title: "Otto Assembly", desc: "Hands-on bipedal robot assembly and spatial reasoning." },
                { n: "03", title: "Programming", desc: "Block-based logic: walk, dance & obstacle avoidance." },
                { n: "04", title: "Final Showcase", desc: "Students demonstrated their robots to a live audience." },
              ].map((p) => (
                <div key={p.n} className="rounded-xl border border-accent/20 bg-accent/5 p-5 hover:border-accent/40 transition-all">
                  <div className="font-mono text-xs text-accent font-bold mb-2">{p.n}</div>
                  <div className="font-display font-semibold text-sm mb-1.5">{p.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{p.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
