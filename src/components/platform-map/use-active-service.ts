"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Server-safe: renders with motion on the server, then settles on the user's preference after hydration. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

/**
 * Active service plus auto-advance state. Auto-advance runs only while the map is in view
 * and not hovered or focused, and stops for good once the visitor picks a service.
 */
export function useActiveService({
  count,
  reducedMotion,
  rootRef,
}: {
  count: number;
  reducedMotion: boolean;
  rootRef: RefObject<HTMLElement | null>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.3,
    });
    observer.observe(root);

    return () => observer.disconnect();
  }, [rootRef]);

  const select = useCallback(
    (index: number) => {
      setManual(true);
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const advance = useCallback(() => setActiveIndex((index) => (index + 1) % count), [count]);

  const autoEnabled = !reducedMotion && !manual;

  const holdHandlers = {
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
    },
    onFocus: () => setFocused(true),
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
  };

  return {
    activeIndex,
    advance,
    autoEnabled,
    autoRunning: autoEnabled && inView && !hovered && !focused,
    holdHandlers,
    manual,
    select,
  };
}

export type RadioItemProps = {
  "aria-checked": boolean;
  onClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  ref: (node: HTMLButtonElement | null) => void;
  role: "radio";
  tabIndex: number;
  type: "button";
};

function nextRadioIndex(key: string, index: number, count: number) {
  if (key === "ArrowDown" || key === "ArrowRight") return (index + 1) % count;
  if (key === "ArrowUp" || key === "ArrowLeft") return (index - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}

/** Roving-tabindex radiogroup: one tab stop, arrow keys move selection and focus together. */
export function useRovingRadio({
  activeIndex,
  count,
  select,
}: {
  activeIndex: number;
  count: number;
  select: (index: number) => void;
}) {
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  return (index: number): RadioItemProps => ({
    "aria-checked": index === activeIndex,
    onClick: () => select(index),
    onKeyDown: (event) => {
      const next = nextRadioIndex(event.key, index, count);
      if (next === null) return;

      event.preventDefault();
      select(next);
      itemsRef.current[next]?.focus();
    },
    ref: (node) => {
      itemsRef.current[index] = node;
    },
    role: "radio",
    tabIndex: index === activeIndex ? 0 : -1,
    type: "button",
  });
}
