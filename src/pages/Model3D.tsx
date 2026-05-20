import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useScroll, useTransform, motion } from "framer-motion";
import { Cpu, MousePointerClick, ZoomIn, ZoomOut } from "lucide-react";
// @ts-ignore
import { ExplodedScene } from "./ExplodedArmModel";

// ─── Camera Controller ────────────────────────────────────────────────────────
function CameraController({ zoom }: { zoom: number }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.z = 12 / zoom;
    camera.updateProjectionMatrix();
  }, [zoom, camera]);
  return null;
}

// ─── GLTF Loader Bridge ───────────────────────────────────────────────────────
// Loads the GLTF and passes nodes/materials to the ExplodedScene
function ModelBridge({ scrollYProgress }: { scrollYProgress: any }) {
  const { nodes, materials, animations } = useGLTF('/black-honey.glb') as any;
  useAnimations(animations);

  return (
    <ExplodedScene
      nodes={nodes}
      materials={materials}
      scrollYProgress={scrollYProgress}
    />
  );
}

useGLTF.preload('/black-honey.glb');

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Model3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // HUD opacity — keyed to scroll progress
  const initialOpacity = useTransform(scrollYProgress, [0, 0.05, 0.18], [1, 1, 0]);
  const structuralOpacity = useTransform(scrollYProgress, [0.22, 0.32, 0.45, 0.55], [0, 1, 1, 0]);
  const detailOpacity = useTransform(scrollYProgress, [0.60, 0.70, 0.90, 1], [0, 1, 1, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] scroll-track bg-background">

      {/* Sticky viewport */}
      <div className="sticky top-[72px] h-[calc(100vh-72px)] w-full overflow-hidden border-y border-border"
        style={{
          background: `
    linear-gradient(
      135deg,
      #f8f7f4 0%,
      #f1efe9 25%,
      #e7eaee 55%,
      #dbe3ea 100%
    )
  `
        }}
      >

        {/* Subtle warm grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />

        {/* Warm amber glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,180,50,0.45) 0%, transparent 65%)' }} />
        <div className="absolute top-1/4 right-[-80px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,220,130,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,100,20,0.25) 0%, transparent 70%)' }} />

        {/* Instruction pill */}
        <div className="absolute bottom-8 left-8 z-20 pointer-events-none flex items-center gap-3 bg-surface-elevated/80 backdrop-blur-md border border-border px-4 py-2.5 rounded-full shadow-lg">
          <MousePointerClick className="h-4 w-4 text-primary" />
          <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">
            Drag to Rotate · Scroll to Explode
          </span>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 bg-surface-elevated/90 backdrop-blur-md border border-border px-3 py-1.5 rounded-full shadow-2xl">
          <button
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.25))}
            className="h-8 w-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest min-w-[70px] text-center select-none border-x border-border/50 px-2">
            Scale: {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.min(2.5, prev + 0.25))}
            className="h-8 w-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>

        {/* HUD status overlays */}
        <div className="absolute top-12 left-12 md:top-16 md:left-16 z-20 pointer-events-none">

          <motion.div style={{ opacity: initialOpacity }} className="absolute top-0 left-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary uppercase tracking-widest">Status: Integrated</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-2 whitespace-nowrap">Full System Assembly</h2>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              A seamless integration of actuation, transmission, and structural mechanics.
            </p>
          </motion.div>

          <motion.div style={{ opacity: structuralOpacity }} className="absolute top-0 left-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-xs text-accent uppercase tracking-widest">Status: Separation</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-2 whitespace-nowrap">Modular Architecture</h2>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              Base assembly and main robotic linkages detaching to reveal independent control zones.
            </p>
          </motion.div>

          <motion.div style={{ opacity: detailOpacity }} className="absolute top-0 left-0">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-3 w-3 text-status-demo" />
              <span className="font-mono text-xs text-status-demo uppercase tracking-widest">Status: Exploded</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-2 whitespace-nowrap">Actuation &amp; Interface</h2>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              Deep dive into the localized precision gearboxes, encoders, and the highly adaptable end effector assembly.
            </p>
          </motion.div>

        </div>

        {/* 3D Canvas */}
        <div className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 2, 12], fov: 45 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
            <ambientLight intensity={1.8} color="#ffffff" />

            <directionalLight
              position={[10, 12, 10]}
              intensity={3.5}
              color="#ffffff"
            />

            <directionalLight
              position={[-10, 8, 6]}
              intensity={1.8}
              color="#dbeafe"
            />

            <directionalLight
              position={[0, -8, 8]}
              intensity={1.2}
              color="#f8fafc"
            />

            <pointLight
              position={[6, 8, 6]}
              intensity={25}
              color="#7dd3fc"
              distance={24}
              decay={1.4}
            />

            <pointLight
              position={[-6, -4, 4]}
              intensity={12}
              color="#c4b5fd"
              distance={18}
              decay={1.5}
            />
            <Suspense fallback={null}>
              <group scale={4} position={[0, -2, 0]}>
                <ModelBridge scrollYProgress={scrollYProgress} />
              </group>
            </Suspense>

            <CameraController zoom={zoom} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>
        </div>

      </div>
    </div>
  );
}