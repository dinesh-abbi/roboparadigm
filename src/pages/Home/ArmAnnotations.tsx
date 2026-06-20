import React, { useEffect, useRef } from "react";
import { animate as animeAnimate } from "animejs";
import { SvgLeaderLine } from "@/components/anime/SvgLeaderLine";
// @ts-expect-error — Roboarm.jsx has no TS declaration
import { JOINT_DEFS, SUBSYSTEM_GROUPS } from "../../../Roboarm";

type JointDef = { name: string; label: string; dof: string; spec: string; color: string };
type SubsystemDef = { color: string; label: string; sublabel: string; meshes: string[] };

interface JointPositions {
  [meshName: string]: { x: number; y: number };
}

interface ArmAnnotationsProps {
  /** Current act 1–6 */
  act: number;
  /** Progress within current act 0–1 */
  actProgress: number;
  /** Live 3D projected positions from Roboarm callback */
  jointPositions: JointPositions;
  /** Index of the currently spotlighted joint (Act 2) */
  activeJointIndex: number;
  /** Canvas bounding rect for positioning */
  canvasRect: DOMRect | null;
}

// ─── Act 2: Joint Spotlight Label ─────────────────────────────────────────────
function JointLabel({
  joint,
  from,
  visible,
  side,
}: {
  joint: JointDef;
  from: { x: number; y: number };
  visible: boolean;
  side: "left" | "right";
}) {
  const labelRef = useRef<HTMLDivElement>(null);

  const to = {
    x: side === "right" ? from.x + 120 : from.x - 120,
    y: from.y - 30,
  };

  useEffect(() => {
    if (!labelRef.current) return;
    animeAnimate(labelRef.current, {
      opacity: visible ? 1 : 0,
      translateX: visible ? 0 : (side === "right" ? 10 : -10),
      duration: 350,
      ease: "outCubic",
    });
  }, [visible, side]);

  return (
    <>
      <SvgLeaderLine
        from={from}
        to={to}
        visible={visible && from.x > 0}
        color={joint.color}
        duration={500}
      />
      <div
        ref={labelRef}
        className="absolute pointer-events-none"
        style={{
          left: side === "right" ? to.x + 8 : to.x - 8,
          top: to.y - 24,
          opacity: 0,
          transform: side === "left" ? "translateX(-100%)" : "none",
        }}
      >
        <div
          className="font-mono text-[8px] uppercase tracking-[0.25em] mb-0.5"
          style={{ color: joint.color, opacity: 0.7 }}
        >
          {joint.dof}
        </div>
        <div
          className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] leading-tight"
          style={{ color: joint.color }}
        >
          {joint.label}
        </div>
        <div
          className="font-mono text-[8px] mt-0.5 tracking-wider"
          style={{ color: joint.color, opacity: 0.5 }}
        >
          {joint.spec}
        </div>
      </div>
    </>
  );
}

// ─── Act 3: Subsystem Group Labels ────────────────────────────────────────────
function SubsystemAnnotations({
  visible,
  jointPositions,
  canvasW,
}: {
  visible: boolean;
  jointPositions: JointPositions;
  canvasW: number;
}) {
  // Representative mesh for each subsystem (pick one near center of group)
  const GROUP_REPS: Record<string, string> = {
    BASE: "Arm034",
    LOWER_ARM: "Arm047",
    UPPER_ARM: "Arm058",
    FOREARM: "Arm083",
    GRIPPER: "Group_Gripper",
  };

  return (
    <>
      {(Object.entries(SUBSYSTEM_GROUPS) as Array<[string, SubsystemDef]>).map(([key, group], i) => {
        const repPos = jointPositions[GROUP_REPS[key]];
        if (!repPos) return null;

        const isRight = repPos.x > canvasW / 2;
        const labelX = isRight ? repPos.x + 80 : repPos.x - 80;
        const labelY = repPos.y + (i % 2 === 0 ? -20 : 20);

        return (
          <React.Fragment key={key}>
            <SvgLeaderLine
              from={repPos}
              to={{ x: labelX, y: labelY }}
              visible={visible}
              color={group.color}
              duration={600 + i * 100}
            />
            <div
              className="absolute pointer-events-none transition-opacity duration-500"
              style={{
                left: isRight ? labelX + 8 : undefined,
                right: isRight ? undefined : `calc(100% - ${labelX - 8}px)`,
                top: labelY - 22,
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="text-[8px] font-mono uppercase tracking-[0.22em]"
                style={{ color: group.color }}
              >
                {group.label}
              </div>
              <div
                className="text-[7px] font-mono uppercase tracking-wider mt-0.5"
                style={{ color: group.color, opacity: 0.5 }}
              >
                {group.sublabel}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function ArmAnnotations({
  act,
  actProgress,
  jointPositions,
  activeJointIndex,
  canvasRect,
}: ArmAnnotationsProps) {
  const canvasW = canvasRect?.width ?? window.innerWidth;

  return (
    <div className="absolute inset-0 pointer-events-none z-30" style={{ overflow: "visible" }}>
      {/* ── Act 2: Joint spotlight labels ─────────────────────────────── */}
      {act === 2 &&
        (JOINT_DEFS as JointDef[]).map((joint, i) => {
          const pos = jointPositions[joint.name] ?? { x: 0, y: 0 };
          const isActive = i === activeJointIndex;
          const side = pos.x > canvasW / 2 ? "right" : "left";
          return (
            <JointLabel
              key={joint.name}
              joint={joint}
              from={pos}
              visible={isActive && !!jointPositions[joint.name]}
              side={side}
            />
          );
        })}

      {/* ── Act 3: Subsystem group annotations ─────────────────────────── */}
      {act === 3 && (
        <SubsystemAnnotations
          visible={actProgress > 0.15}
          jointPositions={jointPositions}
          canvasW={canvasW}
        />
      )}
    </div>
  );
}
