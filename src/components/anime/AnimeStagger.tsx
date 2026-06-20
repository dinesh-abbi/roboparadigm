import React, { useEffect, useRef } from "react";
import { animate as animeAnimate, stagger as animeStagger, createTimeline } from "animejs";

interface AnimeStaggerProps {
  /** Text content to stagger-reveal */
  text: string;
  /** Whether to split by 'chars' or 'words' */
  splitBy?: "chars" | "words";
  /** Trigger the animation */
  trigger?: boolean;
  /** Delay between each element (ms) */
  staggerDelay?: number;
  /** Total animation duration per element (ms) */
  duration?: number;
  /** CSS class for the wrapper */
  className?: string;
  /** Easing string for Anime.js v4 (e.g. "outExpo") */
  easing?: string;
}

/**
 * Splits text into char/word spans and stagger-animates them
 * with Anime.js v4 when `trigger` becomes true.
 */
export function AnimeStagger({
  text,
  splitBy = "chars",
  trigger = true,
  staggerDelay = 30,
  duration = 400,
  className = "",
  easing = "outExpo",
}: AnimeStaggerProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<ReturnType<typeof animeAnimate> | null>(null);

  const parts = splitBy === "chars" ? text.split("") : text.split(" ");

  useEffect(() => {
    if (!trigger || !containerRef.current) return;
    const spans = containerRef.current.querySelectorAll(".anime-char");
    if (!spans.length) return;

    animationRef.current?.pause?.();
    animationRef.current = animeAnimate(spans, {
      opacity: [0, 1],
      translateY: [6, 0],
      duration,
      delay: animeStagger(staggerDelay),
      ease: easing,
    });

    return () => { animationRef.current?.pause?.(); };
  }, [trigger, text, staggerDelay, duration, easing]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {parts.map((part, i) => (
        <span
          key={i}
          className="anime-char inline-block"
          style={{ opacity: 0, whiteSpace: "pre" }}
        >
          {part === " " ? "\u00A0" : part}
          {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

// ─── Typewriter variant ──────────────────────────────────────────────────────
interface TypewriterProps {
  lines: string[];
  trigger?: boolean;
  lineDelay?: number;
  charDelay?: number;
  className?: string;
}

/**
 * Terminal-style typewriter: reveals multiple lines sequentially
 * using Anime.js v4 createTimeline.
 */
export function Typewriter({
  lines,
  trigger = true,
  lineDelay = 600,
  charDelay = 28,
  className = "",
}: TypewriterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  useEffect(() => {
    if (!trigger || !ref.current) return;
    const lineEls = ref.current.querySelectorAll<HTMLElement>(".tw-line");
    if (!lineEls.length) return;

    tlRef.current?.pause?.();

    const tl = createTimeline({ defaults: { ease: "linear" } });

    lineEls.forEach((lineEl, li) => {
      const chars = lineEl.querySelectorAll<HTMLElement>(".tw-char");
      if (!chars.length) return;
      tl.add(chars, {
        opacity: [0, 1],
        duration: 1,
        delay: animeStagger(charDelay),
      }, li * lineDelay);
    });

    tlRef.current = tl;
    return () => { tlRef.current?.pause?.(); };
  }, [trigger, lines, lineDelay, charDelay]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, li) => (
        <div key={li} className="tw-line font-mono text-[10px] tracking-widest uppercase text-amber-500/70 leading-relaxed">
          {line.split("").map((ch, ci) => (
            <span key={ci} className="tw-char" style={{ opacity: 0 }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
