import { useEffect, useRef, useState } from "react";

export type Act = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ScrollActState {
  act: Act;
  actProgress: number;
  globalProgress: number;
}

// 8 equal sections
export const ACT_RANGES: Array<[number, number]> = Array.from({ length: 8 }, (_, i) => [
  i / 8,
  (i + 1) / 8,
]) as Array<[number, number]>;

export function useScrollAct(containerRef: React.RefObject<HTMLElement | null>): ScrollActState {
  const [state, setState] = useState<ScrollActState>({ act: 1, actProgress: 0, globalProgress: 0 });
  const rafRef = useRef<number>(0);
  
  const targetGlobal = useRef(0);
  const currentGlobal = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const compute = () => {
      const diff = targetGlobal.current - currentGlobal.current;
      
      if (Math.abs(diff) > 0.0001) {
        currentGlobal.current += diff * 0.07;
      } else {
        currentGlobal.current = targetGlobal.current;
        isAnimating.current = false;
      }

      // Compute discrete act and relative progress using the smoothed global value
      let act: Act = 1;
      let actProgress = 0;
      for (let i = 0; i < ACT_RANGES.length; i++) {
        const [start, end] = ACT_RANGES[i];
        if (currentGlobal.current >= start) {
          act = (i + 1) as Act;
          actProgress = Math.min(1, (currentGlobal.current - start) / (end - start));
        }
      }

      setState({ act, actProgress, globalProgress: currentGlobal.current });

      if (isAnimating.current) {
        rafRef.current = requestAnimationFrame(compute);
      }
    };

    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, -container.getBoundingClientRect().top);
      targetGlobal.current = Math.min(1, scrolled / scrollable);

      if (!isAnimating.current) {
        isAnimating.current = true;
        rafRef.current = requestAnimationFrame(compute);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial calculate
    const scrollable = container.offsetHeight - window.innerHeight;
    if (scrollable > 0) {
      const scrolled = Math.max(0, -container.getBoundingClientRect().top);
      targetGlobal.current = Math.min(1, scrolled / scrollable);
      currentGlobal.current = targetGlobal.current;
      
      let act: Act = 1;
      let actProgress = 0;
      for (let i = 0; i < ACT_RANGES.length; i++) {
        const [start, end] = ACT_RANGES[i];
        if (currentGlobal.current >= start) {
          act = (i + 1) as Act;
          actProgress = Math.min(1, (currentGlobal.current - start) / (end - start));
        }
      }
      setState({ act, actProgress, globalProgress: currentGlobal.current });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return state;
}
