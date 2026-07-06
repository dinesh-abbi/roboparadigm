import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// ─── Subsystem Definitions ────────────────────────────────────────────────────
export const SUBSYSTEMS = {
  ALL: {
    key: "ALL",
    label: "FULL ARM",
    sublabel: "Complete 7-DOF system",
    color: "#e2e8f0",
    dof: "ALL DOF",
    spec: "7 axes · Full workspace",
    camera: { pos: [12, 4, 10] as [number,number,number], target: [0, 0, -1] as [number,number,number] },
  },
  BASE: {
    key: "BASE",
    label: "BASE & TURRET",
    sublabel: "DOF 1 · 360° rotation",
    color: "#d4884c",
    dof: "DOF 1",
    spec: "360° · Torque: 44 Nm",
    camera: { pos: [-8, -3, 18] as [number,number,number], target: [0, -1, 0] as [number,number,number] },
  },
  LOWER_ARM: {
    key: "LOWER_ARM",
    label: "LOWER ARM",
    sublabel: "DOF 2–3 · Shoulder & Elbow",
    color: "#60a5fa",
    dof: "DOF 2–3",
    spec: "±90° · Torque: 44 Nm",
    camera: { pos: [-14, 4, 16] as [number,number,number], target: [0, 2, 0] as [number,number,number] },
  },
  UPPER_ARM: {
    key: "UPPER_ARM",
    label: "UPPER ARM",
    sublabel: "DOF 4–5 · Wrist pitch & roll",
    color: "#34d399",
    dof: "DOF 4–5",
    spec: "±120° · Torque: 20 Nm",
    camera: { pos: [8, 8, 14] as [number,number,number], target: [0, 3, 0] as [number,number,number] },
  },
  FOREARM: {
    key: "FOREARM",
    label: "FOREARM MODULE",
    sublabel: "DOF 6 · Wrist yaw",
    color: "#a78bfa",
    dof: "DOF 6",
    spec: "±90° · Torque: 8 Nm",
    camera: { pos: [10, 5, 10] as [number,number,number], target: [0, 4.5, -2] as [number,number,number] },
  },
  GRIPPER: {
    key: "GRIPPER",
    label: "GRIPPER / END EFFECTOR",
    sublabel: "DOF 7 · Parallel jaw",
    color: "#f87171",
    dof: "DOF 7",
    spec: "0–100mm jaw · 5N grip",
    camera: { pos: [6, 7, 8] as [number,number,number], target: [0, 5, -4] as [number,number,number] },
  },
} as const;

export type SubsystemKey = keyof typeof SUBSYSTEMS;

// ─── PartCameraRig ─────────────────────────────────────────────────────────────
interface PartCameraRigProps {
  selectedSubsystem: SubsystemKey | null;
  controlsRef: React.RefObject<any>;
  enabled: boolean; // only active after assembly
}

export function PartCameraRig({ selectedSubsystem, controlsRef, enabled }: PartCameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(12, 4, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, -1));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, -1));
  const flying = useRef(false);
  const flyProgress = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const key = selectedSubsystem ?? "ALL";
    const cfg = SUBSYSTEMS[key].camera;
    targetPos.current.set(...cfg.pos);
    targetLookAt.current.set(...cfg.target);
    flying.current = true;
    flyProgress.current = 0;
  }, [selectedSubsystem, enabled]);

  useFrame(() => {
    if (!enabled || !flying.current) return;

    flyProgress.current = Math.min(1, flyProgress.current + 0.025);
    const t = flyProgress.current * flyProgress.current * (3 - 2 * flyProgress.current);

    camera.position.lerp(targetPos.current, t * 0.12 + 0.02);
    currentLookAt.current.lerp(targetLookAt.current, t * 0.12 + 0.02);

    if (controlsRef.current) {
      controlsRef.current.target.copy(currentLookAt.current);
      controlsRef.current.update();
    } else {
      camera.lookAt(currentLookAt.current);
    }

    if (flyProgress.current >= 1) flying.current = false;
  });

  return null;
}

// ─── PartSimulatorPanel ────────────────────────────────────────────────────────
interface PartSimulatorPanelProps {
  visible: boolean;
  selectedSubsystem: SubsystemKey;
  selectedMesh: string | null;
  onSelectSubsystem: (key: SubsystemKey) => void;
  onReset: () => void;
  editMode: boolean;
  onToggleEditMode: () => void;
}

const SUBSYSTEM_ORDER: SubsystemKey[] = ["ALL", "BASE", "LOWER_ARM", "UPPER_ARM", "FOREARM", "GRIPPER"];

export function PartSimulatorPanel({
  visible,
  selectedSubsystem,
  selectedMesh,
  onSelectSubsystem,
  onReset,
  editMode,
  onToggleEditMode,
}: PartSimulatorPanelProps) {
  const active = SUBSYSTEMS[selectedSubsystem];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-auto"
          style={{ maxWidth: 220 }}
        >
          {/* Header chip */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.color }} />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-400">3D Part Simulator</span>
          </div>

          {/* Subsystem pill buttons */}
          <div className="flex flex-col gap-1.5">
            {SUBSYSTEM_ORDER.map((key) => {
              const sys = SUBSYSTEMS[key];
              const isActive = selectedSubsystem === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => onSelectSubsystem(key)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 border"
                  style={{
                    background: isActive ? `${sys.color}18` : "rgba(9,9,11,0.75)",
                    borderColor: isActive ? `${sys.color}60` : "rgba(39,39,42,0.7)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Color dot */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: sys.color,
                      boxShadow: isActive ? `0 0 8px ${sys.color}` : "none",
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-[10px] font-mono font-semibold tracking-wider uppercase truncate"
                      style={{ color: isActive ? sys.color : "#a1a1aa" }}
                    >
                      {sys.label}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest truncate">
                      {sys.dof}
                    </span>
                  </div>
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r"
                      style={{ background: sys.color }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Selected part info card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSubsystem + (selectedMesh ?? "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 px-3 py-3 rounded-lg border"
              style={{
                background: "rgba(9,9,11,0.8)",
                borderColor: `${active.color}30`,
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: active.color }}>
                    {selectedMesh ? selectedMesh : active.label}
                  </p>
                  <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                    {selectedMesh ? `MESH SELECTED` : active.sublabel}
                  </p>
                </div>
                <span
                  className="text-[8px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0"
                  style={{ color: active.color, borderColor: `${active.color}40`, background: `${active.color}12` }}
                >
                  {active.dof}
                </span>
              </div>
              <div className="pt-1 border-t" style={{ borderColor: `${active.color}20` }}>
                <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{active.spec}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex gap-2">
            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 px-2 py-1.5 rounded-lg text-[8px] font-mono uppercase tracking-widest text-zinc-400 border border-zinc-800/60 bg-zinc-950/70 hover:border-zinc-600 hover:text-zinc-300 transition-colors backdrop-blur-md"
            >
              ↺ Reset Cam
            </motion.button>
            <motion.button
              onClick={onToggleEditMode}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 px-2 py-1.5 rounded-lg text-[8px] font-mono uppercase tracking-widest border transition-colors backdrop-blur-md"
              style={{
                background: editMode ? `${active.color}20` : "rgba(9,9,11,0.7)",
                borderColor: editMode ? `${active.color}60` : "rgba(39,39,42,0.6)",
                color: editMode ? active.color : "#71717a",
              }}
            >
              {editMode ? "⊙ Edit On" : "⊙ Edit"}
            </motion.button>
          </div>

          {/* Camera angle hint */}
          <div className="px-3 py-2 rounded-lg border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">
            <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
              Click part in viewport to inspect individual mesh
              <br />
              Orbit: drag · Rotate: touch
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Mobile bottom tab bar ────────────────────────────────────────────────────
interface MobileTabBarProps {
  visible: boolean;
  selectedSubsystem: SubsystemKey;
  onSelectSubsystem: (key: SubsystemKey) => void;
}

export function MobileTabBar({ visible, selectedSubsystem, onSelectSubsystem }: MobileTabBarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-2 rounded-full border border-zinc-800/70 bg-zinc-950/85 backdrop-blur-xl pointer-events-auto"
        >
          {SUBSYSTEM_ORDER.map((key) => {
            const sys = SUBSYSTEMS[key];
            const isActive = selectedSubsystem === key;
            return (
              <motion.button
                key={key}
                onClick={() => onSelectSubsystem(key)}
                whileTap={{ scale: 0.9 }}
                className="w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200"
                style={{
                  background: isActive ? `${sys.color}25` : "transparent",
                  borderColor: isActive ? `${sys.color}80` : "transparent",
                }}
                title={sys.label}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: sys.color,
                    boxShadow: isActive ? `0 0 6px ${sys.color}` : "none",
                  }}
                />
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
