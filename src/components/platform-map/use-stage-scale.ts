"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

import { STAGE_WIDTH } from "./geometry";

/** Scale that fits the fixed-size stage into the wrapper width; null until measured or while hidden. */
export function useStageScale(ref: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 0;
      setScale(width > 0 ? Math.min(1, width / STAGE_WIDTH) : null);
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return scale;
}
