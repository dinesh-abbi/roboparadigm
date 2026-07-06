import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate as animeAnimate, stagger as animeStagger } from "animejs";
import * as THREE from "three";
import { Model as RoboarmModel } from "@/components/robot/Roboarm";
import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";

const AMBER = "#d4884c";

/**
 * 5 chapters — each with a dramatically different camera angle.
 *
 * AXIS_OFFSETS in model-units × 0.45 × 0.018 scale = world-unit scatter:
 *   BASE      dy ≈ -1.8 wu down
 *   LOWER_ARM dx ≈ -0.73, dy ≈ -0.49, dz ≈ +0.65 wu
 *   UPPER_ARM dx ≈ +0.89, dy ≈ +0.24, dz ≈ -0.49 wu
 *   FOREARM   dx ≈ -0.65, dy ≈ +1.05, dz ≈ -0.57 wu
 *   GRIPPER   dy ≈ +2.1 wu up
 *
 * Camera is placed to frame the dismantled subsystem fully.
 * gp keyframes drive only ONE subsystem at a time:
 *   gp × 7 = continuousIndex → active subsystem = floor(continuousIndex)
 */
const CHAPTERS = [
  {
    i: 0, num: "01", label: "Introduction",
    bgWord: "ROBOTICS",
    title: ["RoboParadigm", "Intelligent Systems"],
    body: "We build affordable, state-of-the-art robotic systems designed to automate real-world complexity, beginning with our signature 7-DOF arm.",
    cam: { pos: [0, 0.66, 5.0] as [number, number, number], tgt: [0, 0.66, 1.8] as [number, number, number], fov: 38 },
    gp: 0.0, cta: false,
  },
  {
    i: 1, num: "02", label: "Perception",
    bgWord: "VISION",
    title: ["Machines", "That See"],
    body: "Deep learning and depth sensing enable real-time scene understanding — from delicate PCBs to dynamic industrial objects.",
    cam: { pos: [0, -1.5, 7] as [number, number, number], tgt: [0, -1.5, 0] as [number, number, number], fov: 48 },
    gp: 0.12, cta: false,
  },
  {
    i: 2, num: "03", label: "Intelligence",
    bgWord: "THINK",
    title: ["Robots That", "Plan and Decide"],
    body: "Our agentic AI pipeline reasons over task goals, calculates positions, and generates precise robotic execution plans in real time.",
    cam: { pos: [-7, 1.5, 4] as [number, number, number], tgt: [0, 0.5, 0] as [number, number, number], fov: 46 },
    gp: 0.38, cta: false,
  },
  {
    i: 3, num: "04", label: "Execution",
    bgWord: "PRECISION",
    title: ["Precision", "at Scale"],
    body: "0.1 mm repeatability. 44 Nm peak torque. 7 axes of intelligent force control with interchangeable end-effectors.",
    cam: { pos: [5, 5.5, 5] as [number, number, number], tgt: [0, 3.5, -1.5] as [number, number, number], fov: 44 },
    gp: 0.70, cta: false,
  },
  {
    i: 4, num: "05", label: "Deploy",
    bgWord: "DEPLOY",
    title: ["Built to", "Deploy"],
    body: "Not a prototype. Production-ready with open-source firmware, ROS 2 native integration, and a growing engineering community.",
    cam: { pos: [1, 5, -9] as [number, number, number], tgt: [0, 1.5, 0] as [number, number, number], fov: 46 },
    gp: 0.0, cta: true,
  },
];

// ── Camera with per-chapter FOV ───────────────────────────────────────────────
function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const cam = camera as THREE.PerspectiveCamera;
  const tp = useRef(new THREE.Vector3(0, 0.66, 5.0));
  const tl = useRef(new THREE.Vector3(0, 0.66, 1.8));
  const cl = useRef(new THREE.Vector3(0, 0.66, 1.8));

  const camOverrides = useControls('Camera Simulator', {
    enabled: false,
    posX: { value: 0, step: 0.1 },
    posY: { value: 0.66, step: 0.1 },
    posZ: { value: 5.0, step: 0.1 },
    tgtX: { value: 0, step: 0.1 },
    tgtY: { value: 0.66, step: 0.1 },
    tgtZ: { value: 1.8, step: 0.1 },
    fov: { value: 38, step: 1 },
    'Copy Camera Config': button((get) => {
      const o = get('Camera Simulator');
      const str = `pos: [${o.posX.toFixed(3)}, ${o.posY.toFixed(3)}, ${o.posZ.toFixed(3)}], tgt: [${o.tgtX.toFixed(3)}, ${o.tgtY.toFixed(3)}, ${o.tgtZ.toFixed(3)}], fov: ${o.fov.toFixed(1)}`;
      navigator.clipboard.writeText(str);
      alert('Copied Camera Config:\\n\\n' + str);
    })
  });

  useFrame(() => {
    if (camOverrides.enabled) {
      camera.position.lerp(new THREE.Vector3(camOverrides.posX, camOverrides.posY, camOverrides.posZ), 0.1);
      cl.current.lerp(new THREE.Vector3(camOverrides.tgtX, camOverrides.tgtY, camOverrides.tgtZ), 0.1);
      camera.lookAt(cl.current);
      cam.fov += (camOverrides.fov - cam.fov) * 0.1;
      cam.updateProjectionMatrix();
      return;
    }

    const c = progress * (CHAPTERS.length - 1);
    const b = Math.floor(c), n = Math.min(b + 1, CHAPTERS.length - 1);
    const t = c - b, et = t * t * (3 - 2 * t); // smoothstep
    const A = CHAPTERS[b].cam, B = CHAPTERS[n].cam;

    tp.current.set(
      A.pos[0] + (B.pos[0] - A.pos[0]) * et,
      A.pos[1] + (B.pos[1] - A.pos[1]) * et,
      A.pos[2] + (B.pos[2] - A.pos[2]) * et,
    );
    tl.current.set(
      A.tgt[0] + (B.tgt[0] - A.tgt[0]) * et,
      A.tgt[1] + (B.tgt[1] - A.tgt[1]) * et,
      A.tgt[2] + (B.tgt[2] - A.tgt[2]) * et,
    );

    const targetFov = A.fov + (B.fov - A.fov) * et;
    cam.fov += (targetFov - cam.fov) * 0.05;
    cam.updateProjectionMatrix();

    camera.position.lerp(tp.current, 0.04);
    cl.current.lerp(tl.current, 0.04);
    camera.lookAt(cl.current);
  });
  return null;
}

// ── interpolate arm global progress between chapter keyframes ─────────────────
function getArmGP(scrollP: number): number {
  const n = CHAPTERS.length;
  const c = scrollP * (n - 1);
  const b = Math.floor(c), nx = Math.min(b + 1, n - 1);
  const t = c - b, et = t * t * (3 - 2 * t);
  return CHAPTERS[b].gp + (CHAPTERS[nx].gp - CHAPTERS[b].gp) * et;
}

// ── Minimal anime.js-inspired text panel ─────────────────────────────────────
// Rule: only chapter number, title (2 lines), one sentence, optional CTA.
// Zero decorations — the arm IS the design.
function Panel({ ch }: { ch: typeof CHAPTERS[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".rv");
    (els as NodeListOf<HTMLElement>).forEach(e => {
      e.style.opacity = "0";
      e.style.transform = "translateY(20px)";
    });
    const id = setTimeout(() =>
      animeAnimate(els, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: animeStagger(70, { start: 60 }),
        duration: 700,
        ease: "outExpo",
      })
      , 80);
    return () => clearTimeout(id);
  }, [ch.i]);

  return (
    <motion.div
      key={ch.i}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      // Positioned in lower-left — leaves the arm's dramatic space untouched
      className="absolute bottom-20 left-12 z-20 pointer-events-auto"
      style={{ maxWidth: 400 }}
    >
      {/* Chapter number — tiny, amber */}
      <p className="rv opacity-0 font-mono text-xs tracking-widest mb-5" style={{ color: `${AMBER}70` }}>
        {ch.num} / {CHAPTERS.length}
      </p>

      {/* Title — large, white, second line amber */}
      <h2 className="rv opacity-0 font-black leading-[1.0] tracking-tight mb-5"
        style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
        <span className="text-white block">{ch.title[0]}</span>
        <span className="block" style={{ color: AMBER }}>{ch.title[1]}</span>
      </h2>

      {/* Body — one sentence only */}
      <p className="rv opacity-0 text-sm text-zinc-400 leading-relaxed mb-7" style={{ maxWidth: 340 }}>
        {ch.body}
      </p>

      {ch.cta && (
        <div className="rv opacity-0 flex gap-3">
          <Link to="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all hover:brightness-110"
            style={{ background: AMBER, color: "#000" }}>
            Explore Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/about"
            className="flex items-center px-6 py-3 rounded-full text-xs font-semibold tracking-wider text-zinc-300 border transition-all hover:bg-white/5"
            style={{ borderColor: `${AMBER}35` }}>
            About Us
          </Link>
        </div>
      )}
    </motion.div>
  );
}

// ── Bottom chapter timeline strip — replaces right-side dots ─────────────────
// Shows company narrative as a horizontal journey, not a navigation widget.
function ChapterStrip({ active, cRef }: { active: number; cRef: React.RefObject<HTMLElement | null> }) {
  const scrollTo = (i: number) => {
    const el = cRef.current; if (!el) return;
    const s = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (i / (CHAPTERS.length - 1)) * s, behavior: "smooth" });
  };
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0 pointer-events-auto">
      {CHAPTERS.map((ch, i) => (
        <React.Fragment key={i}>
          <button
            onClick={() => scrollTo(i)}
            className="flex flex-col items-center gap-1.5 px-4 group transition-all duration-300"
          >
            {/* Active indicator line above label */}
            <div className="h-[2px] rounded-full transition-all duration-500"
              style={{
                width: i === active ? "24px" : "12px",
                background: i === active ? AMBER : "#2a2a2e",
                boxShadow: i === active ? `0 0 6px ${AMBER}` : "none",
              }} />
            <span
              className="font-mono text-[9px] uppercase tracking-widest transition-all duration-300"
              style={{ color: i === active ? AMBER : "#3a3a3e" }}
            >
              {ch.label}
            </span>
          </button>
          {/* Connector between chapters */}
          {i < CHAPTERS.length - 1 && (
            <div className="w-6 h-px" style={{ background: "#1e1e22" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ArmShowcase() {
  const cRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [clickedMesh, setClickedMesh] = useState<string | null>(null);
  const [debugFullModel, setDebugFullModel] = useState(false);
  const [logoTuneMode, setLogoTuneMode] = useState(false);
  const [logoDebugRot, setLogoDebugRot] = useState({ x: -Math.PI / 2, y: 0, z: 0 });
  const [copied, setCopied] = useState(false);
  const tP = useRef(0), cP = useRef(0), anim = useRef(false), raf = useRef<number>(0);

  useEffect(() => {
    const el = cRef.current; if (!el) return;
    const gp = () => {
      const s = el.offsetHeight - window.innerHeight;
      return s <= 0 ? 0 : Math.min(1, Math.max(0, -el.getBoundingClientRect().top / s));
    };
    const init = gp(); tP.current = init; cP.current = init; setProgress(init);
    const tick = () => {
      const d = tP.current - cP.current;
      if (Math.abs(d) > 0.0005) { cP.current += d * 0.065; } else { cP.current = tP.current; anim.current = false; }
      setProgress(cP.current);
      if (anim.current) raf.current = requestAnimationFrame(tick);
    };
    const onS = () => {
      tP.current = gp();
      if (!anim.current) { anim.current = true; raf.current = requestAnimationFrame(tick); }
    };
    window.addEventListener("scroll", onS, { passive: true });
    return () => { window.removeEventListener("scroll", onS); cancelAnimationFrame(raf.current); };
  }, []);

  const ci = Math.min(CHAPTERS.length - 1, Math.max(0, Math.floor(progress * CHAPTERS.length)));
  const ch = CHAPTERS[ci];
  const armGP = getArmGP(progress);
  const handleJP = useCallback((_p: Record<string, { x: number; y: number }>) => { }, []);

  return (
    <div ref={cRef} style={{ height: `${CHAPTERS.length * 130}vh` }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden" style={{ background: "#07080a" }}>

        {/* Subtle dot grid — very faint background texture */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff0a 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Large background chapter keyword — faint, right side, typographic depth */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ch.bgWord}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none leading-none font-black tracking-tighter"
            style={{
              fontSize: "clamp(100px, 14vw, 200px)",
              color: "transparent",
              WebkitTextStroke: `1px ${AMBER}12`,
              opacity: 0.6,
              paddingRight: "3vw",
            }}
          >
            {ch.bgWord}
          </motion.div>
        </AnimatePresence>

        {/* Amber radial glow — centred on arm */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 55% 65% at 58% 50%, ${AMBER}0e 0%, transparent 62%)` }} />

        {/* Very soft edge vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 85% 85% at 55% 50%, transparent 28%, #07080a90 100%)" }} />

        {/* ── 3D Canvas — full screen, arm centred by camera ──────────────── */}
        <div className="absolute inset-0">
          <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [4, 3.5, 9], fov: 42 }}
            style={{ background: "transparent" }}
          >
            {/* Lighting — dramatic, directional to emphasise 3D depth */}
            <ambientLight intensity={1.5} color="#ffffff" />
            <directionalLight position={[8, 12, 8]} intensity={5.0} color="#ffffff" />
            <directionalLight position={[-6, 4, -4]} intensity={1.8} color="#b0c8e0" />
            <directionalLight position={[0, -6, 6]} intensity={1.0} color="#fde68a" />
            {/* Warm amber key light matching brand */}
            <pointLight position={[4, 5, 6]} intensity={60} color={AMBER} distance={45} decay={1.3} />
            {/* Cool fill from opposite side */}
            <pointLight position={[-5, -1, 4]} intensity={20} color="#3b82f6" distance={28} decay={1.6} />

            <Suspense fallback={null}>
              <group scale={0.018} position={[0, -1.5, 0]}>
                <RoboarmModel
                  groupScale={0.018}
                  globalProgress={armGP}
                  scrollProgress={progress}
                  clickedMesh={clickedMesh}
                  onMeshClick={setClickedMesh}
                  onJointPositions={handleJP}
                  debugFullModel={debugFullModel}
                  logoDebugRot={logoTuneMode ? logoDebugRot : null}
                />
              </group>
            </Suspense>
            {debugFullModel ? (
              <OrbitControls enableZoom={true} enablePan={true} />
            ) : (
              <CameraRig progress={progress} />
            )}
          </Canvas>
        </div>

        {/* Floating Part Inspector */}
        {/* Disabled for now */ false && (
          <div className="absolute top-24 right-8 z-30 flex flex-col items-end gap-3 pointer-events-auto">
            <div className="backdrop-blur-md bg-black/40 border border-white/[0.08] px-4 py-3 rounded-xl min-w-[280px] max-w-sm transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">3D Inspector</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={logoTuneMode}
                      onChange={(e) => setLogoTuneMode(e.target.checked)}
                      className="w-3 h-3 accent-cyan-400 rounded border-zinc-700 bg-zinc-800"
                    />
                    <span className="text-[10px] font-mono text-cyan-300 select-none hover:text-white transition-colors">Logo Tune</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={debugFullModel}
                      onChange={(e) => {
                        setDebugFullModel(e.target.checked);
                        setClickedMesh(null);
                      }}
                      className="w-3 h-3 accent-amber-500 rounded border-zinc-700 bg-zinc-800"
                    />
                    <span className="text-[10px] font-mono text-zinc-300 select-none hover:text-white transition-colors">Full Model</span>
                  </label>
                </div>
              </div>

              {logoTuneMode && (
                <div className="mb-3 border border-cyan-500/20 bg-cyan-500/5 rounded-lg p-2.5">
                  <p className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider mb-2">Logo Rotation Tuner</p>
                  {(['x', 'y', 'z'] as const).map((axis) => (
                    <div key={axis} className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-mono text-zinc-400 w-3 uppercase">{axis}</span>
                      <input
                        type="range"
                        min={-Math.PI}
                        max={Math.PI}
                        step={0.01}
                        value={logoDebugRot[axis]}
                        onChange={(e) => setLogoDebugRot(prev => ({ ...prev, [axis]: parseFloat(e.target.value) }))}
                        className="flex-1 h-1 accent-cyan-400"
                      />
                      <span className="text-[9px] font-mono text-cyan-300 w-12 text-right">{logoDebugRot[axis].toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="mt-2 bg-black/30 rounded p-1.5 font-mono text-[9px] text-zinc-300 leading-relaxed">
                    <div>x: {logoDebugRot.x.toFixed(4)}</div>
                    <div>y: {logoDebugRot.y.toFixed(4)}</div>
                    <div>z: {logoDebugRot.z.toFixed(4)}</div>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <button
                      onClick={() => {
                        const val = `x: ${logoDebugRot.x.toFixed(4)}, y: ${logoDebugRot.y.toFixed(4)}, z: ${logoDebugRot.z.toFixed(4)}`;
                        navigator.clipboard.writeText(val);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex-1 text-[9px] font-mono py-1 rounded border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors uppercase tracking-wider"
                    >
                      {copied ? '✓ Copied!' : 'Copy Values'}
                    </button>
                    <button
                      onClick={() => setLogoDebugRot({ x: -Math.PI / 2, y: 0, z: 0 })}
                      className="text-[9px] font-mono px-2 py-1 rounded border border-zinc-600/30 text-zinc-400 hover:bg-zinc-700/20 transition-colors uppercase"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {debugFullModel && (
                <div className="mb-2 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded">
                  <p className="text-[9px] text-amber-300 font-mono leading-tight">
                    Drag to rotate. Scroll to zoom. Click parts to inspect.
                  </p>
                </div>
              )}

              {clickedMesh ? (
                <div className="mt-1">
                  <p className="text-[10px] text-zinc-400 font-mono">Selected mesh ID:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm text-amber-500 font-bold select-all bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{clickedMesh}</span>
                    <button
                      onClick={() => setClickedMesh(null)}
                      className="text-[9px] font-mono text-zinc-500 hover:text-white uppercase tracking-wider underline underline-offset-2"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-[9px] text-zinc-500 leading-relaxed mt-2">
                    This part is highlighted in <span className="text-cyan-400 font-semibold">cyan</span>.
                  </p>
                </div>
              ) : (
                <p className="text-[10px] text-zinc-400 leading-relaxed mt-1">
                  Click any part on the 3D model to identify its ID.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Text panel — bottom-left, anime.js style ────────────────────── */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence mode="wait">
            <Panel key={ci} ch={ch} />
          </AnimatePresence>
        </div>

        {/* ── Scroll hint — only chapter 0 ────────────────────────────────── */}
        <AnimatePresence>
          {ci === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute bottom-7 left-12 z-20 flex items-center gap-2.5 pointer-events-none"
            >
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
                className="w-px h-5 rounded-full"
                style={{ background: `linear-gradient(${AMBER}, transparent)` }} />
              <span className="font-mono text-xs tracking-widest text-zinc-500">scroll</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom chapter timeline strip ──────────────────────────────── */}
        <ChapterStrip active={ci} cRef={cRef as React.RefObject<HTMLElement | null>} />

        {/* ── Hairline progress at absolute bottom ──────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px]" style={{ background: "#0f0f12" }}>
          <motion.div className="h-full" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, #b05a28, ${AMBER})` }} />
        </div>
      </div>
    </div>
  );
}
