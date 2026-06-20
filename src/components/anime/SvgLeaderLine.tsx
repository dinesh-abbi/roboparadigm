import React, { useEffect, useRef } from "react";
import { animate as animeAnimate } from "animejs";

export interface LeaderLineProps {
  /** Start point (from 3D projected world coords or fixed DOM position) */
  from: { x: number; y: number };
  /** End point (where the label sits) */
  to: { x: number; y: number };
  /** Whether to show / animate the line */
  visible: boolean;
  /** Line color */
  color?: string;
  /** Dot radius at the 'from' end */
  dotRadius?: number;
  /** Animation duration (ms) */
  duration?: number;
  className?: string;
}

/**
 * Draws an L-shaped SVG connector line from a 3D joint position
 * to a floating label — exactly like the anime.js website's leader lines.
 * Uses stroke-dashoffset animation for the draw-on effect.
 */
export function SvgLeaderLine({
  from,
  to,
  visible,
  color = "rgba(212,136,76,0.7)",
  dotRadius = 3,
  duration = 600,
  className = "",
}: LeaderLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute the L-shaped path: horizontal then vertical
  const midX = to.x;
  const d = `M ${from.x} ${from.y} L ${midX} ${from.y} L ${to.x} ${to.y}`;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength?.() ?? 100;

    if (visible) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      animeAnimate(path, {
        strokeDashoffset: [length, 0],
        duration,
        ease: "outCubic",
      });
      if (dotRef.current) {
        animeAnimate(dotRef.current, {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 300,
          delay: duration * 0.6,
          ease: "outBack",
        });
      }
    } else {
      animeAnimate(path, {
        strokeDashoffset: length,
        duration: 200,
        ease: "inCubic",
      });
      if (dotRef.current) {
        animeAnimate(dotRef.current, {
          opacity: 0,
          duration: 150,
          ease: "linear",
        });
      }
    }
  }, [visible, duration, from.x, from.y, to.x, to.y]);

  // SVG bounding box (full overlay size)
  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes followPath {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>

      {/* Glow duplicate */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeOpacity="0.15"
        filter="blur(3px)"
      />
      {/* Main line */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
        style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
      />
      {/* Flying cyber particle */}
      {visible && (
        <circle
          r="1.75"
          fill="#ffffff"
          style={{
            offsetPath: `path('${d}')`,
            animation: "followPath 1.8s infinite linear",
            filter: `drop-shadow(0 0 3px ${color})`,
          }}
        />
      )}
      {/* Origin dot */}
      <circle
        ref={dotRef}
        cx={from.x}
        cy={from.y}
        r={dotRadius}
        fill={color}
        style={{ opacity: 0 }}
      />
    </svg>
  );
}

// ─── Multi-line leader set (for exploded view) ──────────────────────────────
export interface SubsystemLabelDef {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  sublabel?: string;
  color: string;
  visible: boolean;
}

export function SubsystemLeaders({ labels }: { labels: SubsystemLabelDef[] }) {
  return (
    <>
      {labels.map((def) => (
        <React.Fragment key={def.id}>
          <SvgLeaderLine
            from={def.from}
            to={def.to}
            visible={def.visible}
            color={def.color}
            duration={700}
          />
          {/* DOM label at 'to' position */}
          <div
            className="absolute pointer-events-none transition-opacity duration-500"
            style={{
              left: def.to.x,
              top: def.to.y,
              opacity: def.visible ? 1 : 0,
              transform: def.to.x > window.innerWidth / 2 ? "translateX(8px)" : "translateX(calc(-100% - 8px))",
            }}
          >
            <div
              className="font-mono text-[9px] uppercase tracking-[0.2em] leading-tight"
              style={{ color: def.color }}
            >
              {def.label}
            </div>
            {def.sublabel && (
              <div className="font-mono text-[8px] uppercase tracking-widest mt-0.5" style={{ color: def.color, opacity: 0.5 }}>
                {def.sublabel}
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
