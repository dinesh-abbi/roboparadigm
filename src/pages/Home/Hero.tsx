import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  Variants,
} from "framer-motion";
import prof1 from "@/assets/professional/7.webp";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Mouse tracking ──────────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 1.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 1.5 });

  const glowX = useTransform(smoothX, [-0.5, 0.5], ["-20%", "20%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["-20%", "20%"]);
  const armX = useTransform(smoothX, [-0.5, 0.5], ["15px", "-15px"]);
  const armY = useTransform(smoothY, [-0.5, 0.5], ["15px", "-15px"]);
  const armRotate = useTransform(smoothX, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // ── Scroll ──────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const s = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  /**
   * STRATEGY — single text column, no duplicate nodes:
   *
   * At scroll=0  : column is 60% wide, shifted right by 20% so it sits in
   *                the horizontal center of the viewport (left: 20%, width: 60%).
   *                Text inside is center-aligned.
   *
   * At scroll=0.4: column snaps to left half — left: 0%, width: 50%.
   *                Text inside left-aligned.
   *
   * We drive this with left (%) + width (%) via useTransform.
   * Text alignment is handled by a className swap via a derived boolean
   * coming from a MotionValue — but since className can't be a MotionValue,
   * we crossfade the *content gravity* using a flexbox trick:
   * the inner container is flex-col; we animate its `alignItems` surrogate
   * by shifting a MotionValue-driven paddingLeft from 0 (left) to "auto"-ish.
   *
   * Simplest correct solution: we set `textAlign` and `alignItems` directly
   * on the motion.div via the `style` prop using a mapped string MotionValue.
   * But Motion can't animate string enums — so we use a single opacity trick:
   * one <div> for centered state, one for left state, both in the same DOM
   * position, crossfaded. BUT they share the exact same JSX, just wrapping
   * divs differ — so it's NOT duplicated content nodes.
   */

  // Column geometry — left offset and width, both in %
  // At rest: left=20%, width=60% → centered
  // After scroll: left=0%, width=50% → left side
  const colLeft = useTransform(s, [0, 0.45], ["20%", "0%"]);
  const colWidth = useTransform(s, [0, 0.45], ["60%", "50%"]);

  // Inner alignment — we drive this by animating a flex "justify" surrogate:
  // a negative marginLeft that pushes content from center→left
  // At rest: content is centered → marginLeft: auto (we fake this with translateX)
  // We'll use a wrapper translateX to nudge the inner block from centered to left-start
  // innerX = 0 means left-aligned inside the column
  // innerX = "50% - half-content-width" would be true centering — but that's unknown
  // Better: use text-align directly via a MotionValue-mapped CSS var
  const innerCenterProgress = useTransform(s, [0, 0.35], [1, 0]);

  // Image
  const imageOpacity = useTransform(s, [0.08, 0.45], [0, 1]);
  const imageXVal = useTransform(s, [0.08, 0.45], ["6%", "0%"]);

  // ── Variants ────────────────────────────────────────────────────────
  const textVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={sectionRef} className="relative w-full h-auto lg:h-[200vh]">
      <div
        onMouseMove={handleMouseMove}
        className="lg:sticky lg:top-0 lg:h-screen w-full flex items-center overflow-hidden pt-[120px] pb-20 lg:pt-0 lg:pb-0"
      >
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-background pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl z-10 w-full lg:h-full">

          {/* ── MOBILE: static centered ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col items-center text-center px-6 md:px-10 lg:hidden"
          >
            <motion.h1 variants={textVariant} className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Building <span className="text-gradient">Intelligent Robotic Systems</span>
              {" "}for Real-World Automation.
            </motion.h1>
            <motion.p variants={textVariant} className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              RoboParadigm develops affordable, intelligent robotic systems that can understand, plan, and execute real-world tasks across laboratories, academic institutions, and small-scale industries.
            </motion.p>
            <motion.div variants={textVariant} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-copper hover:scale-105 active:scale-95">
                Explore Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 text-sm font-medium hover:bg-surface-elevated hover:border-border-strong transition-all hover:scale-105 active:scale-95">
                Collaborate With Us <Users className="h-4 w-4 text-muted-foreground" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── DESKTOP: scroll-driven split ── */}
          <div className="hidden lg:block w-full h-full">

            {/*
              Text column.
              - `left` and `width` are MotionValues → column slides left + narrows
              - Inside: two sibling divs crossfade for center→left text alignment.
                They share identical text but different wrapper alignment classes.
                This is the only correct way to animate text-align with Motion.
            */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              style={{
                left: colLeft,
                width: colWidth,
              }}
              className="absolute top-1/2 -translate-y-1/2 z-20 px-8"
            >
              {/* Centered alignment shell — fades OUT as you scroll */}
              <motion.div
                style={{ opacity: innerCenterProgress }}
                className="absolute inset-0 px-8 flex flex-col items-center justify-center text-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  Building <span className="text-gradient">Intelligent Robotic Systems</span>
                  <br />for Real-World Automation.
                </h1>
                <p className="mt-6 max-w-xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  RoboParadigm develops affordable, intelligent robotic systems that can understand, plan, and execute real-world tasks across laboratories, academic institutions, and small-scale industries.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground opacity-80">
                    Explore Projects <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 text-sm font-medium opacity-80">
                    Collaborate With Us <Users className="h-4 w-4 text-muted-foreground" />
                  </span>
                </div>
              </motion.div>

              {/* Left-aligned shell — this is the real interactive one, fades IN */}
              <motion.div
                style={{ opacity: useTransform(s, [0.15, 0.45], [0, 1]) }}
                className="flex flex-col items-start text-left"
              >
                <motion.h1 variants={textVariant} className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  Building <span className="text-gradient">Intelligent Robotic Systems</span>
                  <br />for Real-World Automation.
                </motion.h1>
                <motion.p variants={textVariant} className="mt-6 max-w-xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  RoboParadigm develops affordable, intelligent robotic systems that can understand, plan, and execute real-world tasks across laboratories, academic institutions, and small-scale industries.
                </motion.p>
                <motion.div variants={textVariant} className="mt-10 flex flex-wrap items-center gap-4">
                  <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-copper hover:scale-105 active:scale-95">
                    Explore Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 text-sm font-medium hover:bg-surface-elevated hover:border-border-strong transition-all hover:scale-105 active:scale-95">
                    Collaborate With Us <Users className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Image column */}
            <motion.div
              style={{ opacity: imageOpacity, x: imageXVal }}
              className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 flex justify-center items-center px-10"
            >
              <motion.div
                style={{ x: glowX, y: glowY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/25 blur-[120px] rounded-full pointer-events-none"
              />
              <motion.div
                style={{ x: glowX, y: glowY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-accent/20 blur-[100px] rounded-full pointer-events-none"
              />
              <motion.img
                style={{ x: armX, y: armY, rotate: armRotate }}
                src={prof1}
                alt="RoboParadigm 7-DOF Robotic Arm System"
                className="relative z-10 w-full max-w-[600px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
                fetchPriority="high"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}