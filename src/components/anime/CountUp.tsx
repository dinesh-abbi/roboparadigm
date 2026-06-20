import React, { useEffect, useRef } from "react";
import { animate as animeAnimate } from "animejs";

interface CountUpProps {
  /** Target value to count to */
  to: number;
  /** Optional prefix (e.g. "±") */
  prefix?: string;
  /** Optional suffix (e.g. " DOF", "°", "mm") */
  suffix?: string;
  /** Trigger animation */
  trigger?: boolean;
  /** Animation duration (ms) */
  duration?: number;
  /** Number of decimal places */
  decimals?: number;
  className?: string;
}

/**
 * Animates a number from 0 to `to` using Anime.js
 * when `trigger` becomes true.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  trigger = false,
  duration = 1200,
  decimals = 0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const obj = useRef({ value: 0 });

  useEffect(() => {
    if (!trigger || !ref.current) return;

    obj.current.value = 0;

    animeAnimate(obj.current, {
      value: to,
      duration,
      ease: "outExpo",
      onUpdate: () => {
        if (ref.current) {
          const v = decimals > 0
            ? obj.current.value.toFixed(decimals)
            : Math.round(obj.current.value);
          ref.current.textContent = `${prefix}${v}${suffix}`;
        }
      },
    });
  }, [trigger, to, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

// ─── Stats Strip component for Act 5 ────────────────────────────────────────
interface Stat {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

interface AnimatedStatsProps {
  stats: Stat[];
  trigger: boolean;
}

export function AnimatedStats({ stats, trigger }: AnimatedStatsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-amber-500/20">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex flex-col items-center px-6 py-3 group">
          <span className="font-display text-2xl md:text-3xl font-black text-white leading-none">
            <CountUp
              to={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              trigger={trigger}
              duration={1000 + i * 200}
              decimals={stat.decimals}
            />
          </span>
          <span className="mt-1 text-[9px] font-mono uppercase tracking-[0.2em] text-amber-500/60">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
