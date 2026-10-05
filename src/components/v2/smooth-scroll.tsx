"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return children;
  }

  return (
    <ReactLenis options={{ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -96 } }} root>
      {children}
    </ReactLenis>
  );
}
