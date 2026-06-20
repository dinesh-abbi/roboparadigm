import React, { useRef, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
// @ts-expect-error — Roboarm.jsx has no TS declaration
import { Model as RoboarmModel } from "../../../Roboarm";
import * as THREE from "three";


// ─── Camera Position Logger ───────────────────────────────────────────────────
function CameraLogger() {
  const { camera } = useThree();
  const lastLog = useRef(0);

  useFrame(() => {
    const now = Date.now();
    if (now - lastLog.current > 500) {
      lastLog.current = now;
      console.log(
        `📷 Camera: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`
      );
    }
  });

  return null;
}

// ─── Responsive Arm Scaling ───────────────────────────────────────────────────
export function ResponsiveArm({ children, scrollYProgress }: { children: React.ReactNode; scrollYProgress: any }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 8;
  const isTablet = viewport.width >= 8 && viewport.width < 14;
  const scale = isMobile ? 0.012 : isTablet ? 0.015 : 0.018;
  const yOffset = isMobile ? -1.2 : -2;

  return (
    <group scale={scale} position={[0, yOffset, 0]}>
      {children}
    </group>
  );
}

// ─── Floor Calibration Radar ──────────────────────────────────────────────────
export function FloorRadar({ progress }: { progress: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.LineSegments>(null);
  const ringRef2 = useRef<THREE.LineSegments>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    const p = progress.get();
    if (groupRef.current) {
      // Scale up from 0 to 1 as assembly goes 0 -> 0.5, then lock at 120 (local scale size matching model base)
      const targetScale = Math.min(1.0, p / 0.5);
      groupRef.current.scale.setScalar(targetScale * 110.0);

      // Rotate concentric rings in opposite directions
      if (ringRef1.current) ringRef1.current.rotation.z = state.clock.getElapsedTime() * 0.08;
      if (ringRef2.current) ringRef2.current.rotation.z = -state.clock.getElapsedTime() * 0.15;
      
      // Fade opacity based on progress: max at 0.5 assembly progress, then settle to a subtle indicator
      const targetOpacity = p < 0.5 ? p * 0.7 : 0.35 - (p - 0.5) * 0.4;
      
      groupRef.current.traverse((child: any) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = Math.max(0.12, targetOpacity);
        }
      });
    }
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -32.0, -2.6]}>
      {/* Inner ring */}
      <lineSegments ref={ringRef1}>
        <ringGeometry args={[0.8, 0.81, 64]} />
        <lineBasicMaterial color="#d4884c" />
      </lineSegments>

      {/* Outer segmented ring */}
      <lineSegments ref={ringRef2}>
        <ringGeometry args={[1.15, 1.17, 32]} />
        <lineBasicMaterial color="#d4884c" />
      </lineSegments>

      {/* Grid pattern */}
      <gridHelper ref={gridRef} args={[2.4, 8, "#d4884c", "#5a3a20"]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

// ─── Camera Rig ───────────────────────────────────────────────────────────────
export interface ScrollCameraRigProps {
  progress: any;
  controlsRef: React.RefObject<any>;
}

export function ScrollCameraRig({ progress, controlsRef }: ScrollCameraRigProps) {
  const { camera } = useThree();
  const currentTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  const keyframes = [
    { t: 0.0,  pos: [-14, -2.5, 12], target: [-1, 2.5, -4]   },
    { t: 0.3,  pos: [-10,  1.5, 15], target: [-0.5, 2.0, -2] },
    { t: 0.6,  pos: [  6,    6, 14], target: [0, 0.5, -1]    },
    { t: 0.85, pos: [ 12,  4.5, 11], target: [0, 0, -1]      },
    { t: 1.0,  pos: [ 12,    4, 10], target: [0, 0, -1]      },
  ];

  useFrame(() => {
    if (!progress) return;
    const currentS = progress.get();

    if (currentS >= 0.95) {
      if (controlsRef.current) controlsRef.current.enabled = true;
      return;
    }
    if (controlsRef.current) controlsRef.current.enabled = false;

    const tNormalized = Math.min(1.0, currentS / 0.95);

    let i = 0;
    for (; i < keyframes.length - 1; i++) {
      if (tNormalized >= keyframes[i].t && tNormalized <= keyframes[i + 1].t) break;
    }

    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    const localT = (tNormalized - k1.t) / (k2.t - k1.t);
    const easeT = localT * localT * (3 - 2 * localT);

    const targetPos = new THREE.Vector3(
      k1.pos[0] + (k2.pos[0] - k1.pos[0]) * easeT,
      k1.pos[1] + (k2.pos[1] - k1.pos[1]) * easeT,
      k1.pos[2] + (k2.pos[2] - k1.pos[2]) * easeT
    );
    const targetLookAt = new THREE.Vector3(
      k1.target[0] + (k2.target[0] - k1.target[0]) * easeT,
      k1.target[1] + (k2.target[1] - k1.target[1]) * easeT,
      k1.target[2] + (k2.target[2] - k1.target[2]) * easeT
    );

    camera.position.lerp(targetPos, 0.08);
    currentTargetRef.current.lerp(targetLookAt, 0.08);

    if (controlsRef.current) {
      controlsRef.current.target.copy(currentTargetRef.current);
      controlsRef.current.update();
    } else {
      camera.lookAt(currentTargetRef.current);
    }
  });

  return null;
}

// ─── Assembly Status Text ─────────────────────────────────────────────────────
function AssemblyStatus({ progress }: { progress: number }) {
  const stages = [
    { at: 0.00, label: "INITIALIZING SYSTEMS..." },
    { at: 0.30, label: "CALIBRATING JOINTS..." },
    { at: 0.65, label: "LOADING KINEMATICS..." },
    { at: 0.90, label: "ASSEMBLY COMPLETE" },
  ];

  let current = stages[0].label;
  for (const stage of stages) {
    if (progress >= stage.at) current = stage.label;
  }

  const isDone = progress >= 0.99;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isDone ? 0 : 1 }}
      transition={{ delay: isDone ? 2 : 0, duration: 0.6 }}
      className="absolute left-1/2 -translate-x-1/2 bottom-16 z-30 flex items-center gap-2 pointer-events-none"
    >
      {!isDone && (
        <motion.div
          className="w-1 h-1 rounded-full bg-amber-500"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
      <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-amber-500/70">
        {current}
      </span>
    </motion.div>
  );
}

// ─── Animated Corner Bracket ──────────────────────────────────────────────────
function CornerBracket({
  position,
  delay,
}: {
  position: "tl" | "tr" | "bl" | "br";
  delay: number;
}) {
  const isTop    = position === "tl" || position === "tr";
  const isLeft   = position === "tl" || position === "bl";
  const borderV  = isTop ? "border-t" : "border-b";
  const borderH  = isLeft ? "border-l" : "border-r";
  const corner   = isTop
    ? isLeft ? "top-3 left-3" : "top-3 right-3"
    : isLeft ? "bottom-3 left-3" : "bottom-3 right-3";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${corner} w-5 h-5 ${borderV} ${borderH} border-amber-500/40`}
    />
  );
}

// ─── Hero Export ──────────────────────────────────────────────────────────────
export function Hero() {
  const controlsRef = useRef<any>(null);

  // Assembly progress motion values
  const assemblyProgress = useMotionValue(0);
  const s = useSpring(assemblyProgress, { stiffness: 28, damping: 18, restDelta: 0.001 });

  // Raw numeric progress for derived React state
  const rawProgress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(assemblyProgress, 1, {
      duration: 5.5,
      ease: [0.22, 1, 0.36, 1],
    });
    // Mirror to rawProgress so we can read it in status text
    const unsub = assemblyProgress.on("change", (v) => rawProgress.set(v));
    return () => { controls.stop(); unsub(); };
  }, []);

  // Derived motion values for visual layers
  const glowOpacity    = useTransform(s, [0, 0.5, 1], [0, 0.4, 0.65]);
  const scanY          = useTransform(assemblyProgress, [0, 1], ["-100%", "110%"]);
  const scanOpacity    = useTransform(assemblyProgress, [0, 0.05, 0.92, 1], [0, 0.55, 0.55, 0]);
  const canvasOpacity  = useTransform(s, [0.05, 0.22], [0, 1]);
  const leftX          = useTransform(s, [0, 0.6], [0, -10]);
  const rightX         = useTransform(s, [0, 0.6], [0, 10]);
  const headlineOpacity = useTransform(s, [0, 0.6], [1, 0.75]);

  return (
    <section className="relative w-full h-[100vh] md:h-[100svh] overflow-hidden bg-background">
      {/* ── Layer 0: Background ────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-background pointer-events-none" />

      {/* ── Layer 1: Pulsing Grid ─────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-grid pointer-events-none"
        animate={{ opacity: [0.03, 0.065, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Layer 2: Radial Amber Glow (behind robot) ─────────────────────── */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none z-[5]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 58%, rgba(186,100,40,0.22) 0%, rgba(186,100,40,0.06) 45%, transparent 70%)",
          }}
        />
        {/* Idle glow pulse after assembly */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 30% at 50% 58%, rgba(210,120,50,0.12) 0%, transparent 65%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 5.5 }}
        />
      </motion.div>

      {/* ── Layer 3: Dark Vignette ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[6]"
        style={{
          boxShadow: "inset 0 0 220px 80px rgba(0,0,0,0.75)",
        }}
      />

      {/* ── Layer 4: 3D Canvas ─────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: canvasOpacity }}
        className="absolute inset-0 w-full h-full z-10"
      >
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [12, 4, 10], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={2.5} color="#ffffff" />
          <directionalLight position={[10, 15, 10]} intensity={5.0} color="#ffffff" />
          <directionalLight position={[-8, 10, -5]} intensity={3.5} color="#cbd5e1" />
          <directionalLight position={[0, -5, 10]}  intensity={2.0} color="#fde68a" />
          <pointLight position={[8, 6, 8]}   intensity={45} color="#d4884c" distance={40} decay={1.0} />
          <pointLight position={[-6, -3, 4]} intensity={25} color="#2563eb" distance={30} decay={1.2} />
          <Suspense fallback={null}>
            <ResponsiveArm scrollYProgress={s}>
              <RoboarmModel scrollYProgress={s} groupScale={0.018} />
              <FloorRadar progress={s} />
            </ResponsiveArm>
          </Suspense>
          <CameraLogger />
          <ScrollCameraRig progress={s} controlsRef={controlsRef} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enableRotate={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </motion.div>

      {/* ── Layer 5: Scan Line (assembly phase only) ───────────────────────── */}
      <motion.div
        style={{ y: scanY, opacity: scanOpacity }}
        className="absolute left-0 right-0 h-[1px] z-30 pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(186,100,40,0.6) 20%, rgba(220,140,60,0.8) 50%, rgba(186,100,40,0.6) 80%, transparent 100%)",
            boxShadow: "0 0 12px 3px rgba(186,100,40,0.35)",
          }}
        />
      </motion.div>

      {/* ── Layer 6: UI Frame + Headlines ─────────────────────────────────── */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pt-20 pb-8 px-8 md:px-12">

        {/* Animated corner brackets */}
        <CornerBracket position="tl" delay={0.1} />
        <CornerBracket position="tr" delay={0.2} />
        <CornerBracket position="bl" delay={0.3} />
        <CornerBracket position="br" delay={0.4} />

        {/* Thin outer border */}
        <div className="absolute inset-0 border border-zinc-800/40 pointer-events-none" />

        {/* Headlines row */}
        <div className="flex-1 flex flex-row justify-between items-center w-full">

          {/* Left Headline */}
          <motion.div
            style={{ opacity: headlineOpacity, x: leftX }}
            className="max-w-[200px] md:max-w-sm flex flex-col items-start text-left"
          >
            <h1 className="font-display text-3xl md:text-5xl font-black leading-[1.05] tracking-tight text-white uppercase">
              Building<br />
              <span className="text-zinc-500">Intelligent</span>
            </h1>
          </motion.div>

          {/* Center spacer — robot lives here */}
          <div className="flex-1" />

          {/* Right Headline */}
          <motion.div
            style={{ opacity: headlineOpacity, x: rightX }}
            className="max-w-[200px] md:max-w-sm flex flex-col items-end text-right"
          >
            <h1 className="font-display text-3xl md:text-5xl font-black leading-[1.05] tracking-tight text-white uppercase">
              Robotic<br />
              <span className="text-zinc-500">Systems</span>
            </h1>
          </motion.div>
        </div>

        {/* Footer bar */}
        <div className="flex flex-row items-end justify-between w-full border-t border-zinc-900/60 pt-4 gap-4">

          {/* Bottom-left: descriptor */}
          <div className="max-w-[260px] text-[9px] font-mono text-zinc-500 leading-relaxed uppercase tracking-wider hidden md:block">
            Affordable intelligent robotic systems that perceive, plan, and execute real-world tasks.
          </div>

          {/* Bottom-center: CTA pill */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="px-6 py-2 bg-zinc-950/90 border border-zinc-800 rounded-full flex items-center justify-center shadow-lg shadow-black/80 hover:border-amber-500/40 transition-colors duration-300"
            >
              <Link
                to="/projects"
                className="text-[9px] md:text-[10px] font-mono font-semibold text-zinc-200 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1.5"
              >
                Explore projects <ArrowRight className="h-3 w-3 text-zinc-400" />
              </Link>
            </motion.div>
          </div>

          {/* Bottom-right: coordinates + waveform */}
          <div className="flex flex-col items-end text-right gap-2">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
              COORD: 34.0522° N, 118.2437° W
            </span>
            <div className="flex items-end gap-0.5 h-3">
              {[0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.4, 0.6, 0.8, 0.5].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                  transition={{ duration: 1.2 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[2px] bg-amber-700/60 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Layer 7: Assembly Status Readout ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute inset-0 z-30 pointer-events-none"
      >
        <AssemblyStatusDisplay progress={rawProgress} />
      </motion.div>
    </section>
  );
}

// ─── Assembly Status Display ──────────────────────────────────────────────────
function AssemblyStatusDisplay({ progress }: { progress: any }) {
  const stages = [
    { at: 0.00, label: "INITIALIZING SYSTEMS..." },
    { at: 0.30, label: "CALIBRATING JOINTS..." },
    { at: 0.65, label: "LOADING KINEMATICS..." },
    { at: 0.90, label: "ASSEMBLY COMPLETE" },
  ];

  // Use a simple counter animation to track current stage label
  const [label, setLabel] = useState(stages[0].label);
  const [done, setDone]   = useState(false);

  useEffect(() => {
    return progress.on("change", (v: number) => {
      let current = stages[0].label;
      for (const stage of stages) {
        if (v >= stage.at) current = stage.label;
      }
      setLabel(current);
      if (v >= 0.99) setDone(true);
    });
  }, []);

  return (
    <motion.div
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ delay: done ? 2.5 : 0, duration: 0.8 }}
      className="absolute bottom-[72px] left-1/2 -translate-x-1/2 flex items-center gap-2"
    >
      {!done && (
        <motion.div
          className="w-[5px] h-[5px] rounded-full bg-amber-500/80"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}
      <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-amber-500/60">
        {label}
      </span>
    </motion.div>
  );
}


