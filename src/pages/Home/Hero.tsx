import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import {
  motion,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Model as RoboarmModel } from "../../../Roboarm";
import * as THREE from "three";


// ─── Camera Position Logger ───────────────────────────────────────────────────
// Logs camera position to console when you rotate, so you can find the ideal angle.
function CameraLogger() {
  const { camera } = useThree();
  const lastLog = useRef(0);

  useFrame(() => {
    const now = Date.now();
    // Log every 500ms to avoid spamming
    if (now - lastLog.current > 500) {
      lastLog.current = now;
      console.log(
        `📷 Camera Position: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`,
        `| Rotation: [${camera.rotation.x.toFixed(3)}, ${camera.rotation.y.toFixed(3)}, ${camera.rotation.z.toFixed(3)}]`
      );
    }
  });

  return null;
}

// ─── Responsive Arm Scaling ───────────────────────────────────────────────────
function ResponsiveArm({ children, scrollYProgress }: { children: React.ReactNode; scrollYProgress: any }) {
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

// ─── Scroll-Linked Camera Rig ──────────────────────────────────────────────────
interface ScrollCameraRigProps {
  scrollYProgress: any;
  controlsRef: React.RefObject<any>;
}

function ScrollCameraRig({ scrollYProgress, controlsRef }: ScrollCameraRigProps) {
  const { camera } = useThree();
  const currentTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  // Define keyframes for position and target
  // pos: [x, y, z] in world space
  // target: [x, y, z] in world space (where the camera is looking)
  const keyframes = [
    {
      t: 0.0,
      pos: [-14, -2.5, 12],     // Dramatic low-angle, far-left looking up
      target: [-1, 2.5, -4],    // Looking at the scattered gripper and upper arm parts
    },
    {
      t: 0.3,
      pos: [-10, 1.5, 15],      // Left-side shot, panning higher
      target: [-0.5, 2.0, -2],  // Looking at the assembling upper-middle segments
    },
    {
      t: 0.6,
      pos: [6, 6, 14],          // High-right, dramatic bird's-eye view looking down
      target: [0, 0.5, -1],     // Looking down at the assembling mid-lower segments
    },
    {
      t: 0.85,
      pos: [12, 4.5, 11],       // Approaching final hero angle
      target: [0, 0, -1],       // Looking towards the middle-bottom center
    },
    {
      t: 1.0,
      pos: [12, 4, 10],         // Final assembled hero position
      target: [0, 0, -1],       // Center target
    }
  ];

  useFrame(() => {
    if (!scrollYProgress) return;
    const currentS = scrollYProgress.get();

    // Enable OrbitControls and auto-rotate ONLY near full assembly (s >= 0.95)
    if (currentS >= 0.95) {
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
      return;
    }

    // Otherwise, programmatically control the camera along the cinematic path
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    // Normalize scroll progress from [0, 0.95] to [0, 1.0] for keyframe lookup
    const tNormalized = Math.min(1.0, currentS / 0.95);

    // Find interpolation keyframes
    let i = 0;
    for (; i < keyframes.length - 1; i++) {
      if (tNormalized >= keyframes[i].t && tNormalized <= keyframes[i + 1].t) {
        break;
      }
    }

    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];

    // Local progress between the two keyframes
    const localT = (tNormalized - k1.t) / (k2.t - k1.t);
    // Smooth step ease curve
    const easeT = localT * localT * (3 - 2 * localT);

    // Interpolate camera position
    const targetPos = new THREE.Vector3(
      k1.pos[0] + (k2.pos[0] - k1.pos[0]) * easeT,
      k1.pos[1] + (k2.pos[1] - k1.pos[1]) * easeT,
      k1.pos[2] + (k2.pos[2] - k1.pos[2]) * easeT
    );

    // Interpolate target
    const targetLookAt = new THREE.Vector3(
      k1.target[0] + (k2.target[0] - k1.target[0]) * easeT,
      k1.target[1] + (k2.target[1] - k1.target[1]) * easeT,
      k1.target[2] + (k2.target[2] - k1.target[2]) * easeT
    );

    // Smoothly lerp to target position and lookAt target
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

// ─── Hero Export ──────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const s = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-background pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        {/* Text Overlay — visible at top, fades out as you scroll */}
        <motion.div
          style={{
            opacity: useTransform(s, [0, 0.15], [1, 0]),
            y: useTransform(s, [0, 0.15], [0, -60]),
            scale: useTransform(s, [0, 0.15], [1, 0.92]),
          }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto text-center px-6 md:px-10">
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Building <span className="text-gradient">Intelligent Robotic Systems</span>
              <br className="hidden md:block" /> for Real-World Automation.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              RoboParadigm develops affordable, intelligent robotic systems that can understand, plan, and execute real-world tasks across laboratories, academic institutions, and small-scale industries.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-copper hover:scale-105 active:scale-95"
              >
                Explore Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 text-sm font-medium hover:bg-surface-elevated hover:border-border-strong transition-all hover:scale-105 active:scale-95"
              >
                Collaborate With Us <Users className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 3D Canvas — FULL VIEWPORT edge-to-edge */}
        <motion.div
          style={{ opacity: useTransform(s, [0.08, 0.22], [0, 1]) }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [12, 4, 10], fov: 45 }}
            style={{ background: "transparent" }}
          >

            {/* Brighter lighting setup to make colors visible */}
            <ambientLight intensity={2.5} color="#ffffff" />
            <directionalLight position={[10, 15, 10]} intensity={5.0} color="#ffffff" />
            <directionalLight position={[-8, 10, -5]} intensity={3.5} color="#cbd5e1" />
            <directionalLight position={[0, -5, 10]} intensity={2.0} color="#fde68a" />
            <pointLight position={[8, 6, 8]} intensity={45} color="#d4884c" distance={40} decay={1.0} />
            <pointLight position={[-6, -3, 4]} intensity={25} color="#2563eb" distance={30} decay={1.2} />
            <Suspense fallback={null}>
              <ResponsiveArm scrollYProgress={s}>
                <RoboarmModel scrollYProgress={s} groupScale={0.018} />
              </ResponsiveArm>
            </Suspense>

            <CameraLogger />
            <ScrollCameraRig scrollYProgress={s} controlsRef={controlsRef} />

            {/* OrbitControls: rotate only, enabled only after full assembly */}
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
      </div>
    </section>
  );
}
