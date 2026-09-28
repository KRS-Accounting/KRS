import type { CSSProperties } from "react";

export type StagePoint = { x: number; y: number };

export const STAGE_WIDTH = 1360;
export const STAGE_HEIGHT = 590;

const CARD_STACK_TOP = 30;

export const CARD = { x: 664, width: 264, height: 92, gap: 12 } as const;

export const WORK_PANEL_WIDTH = 316;

export const ORB = { cx: 468, size: 184, reach: 88 } as const;

export const FAN = { radius: 180, workRadius: 160, inputSpacing: 54, workSpacing: 50 } as const;

export function cardStackHeight(count: number) {
  return count * CARD.height + (count - 1) * CARD.gap;
}

export function stageCenterY(count: number) {
  return CARD_STACK_TOP + cardStackHeight(count) / 2;
}

export function cardTop(index: number) {
  return CARD_STACK_TOP + index * (CARD.height + CARD.gap);
}

export function cardLeftAnchor(index: number): StagePoint {
  return { x: CARD.x, y: cardTop(index) + CARD.height / 2 };
}

export function cardRightAnchor(index: number): StagePoint {
  return { x: CARD.x + CARD.width, y: cardTop(index) + CARD.height / 2 };
}

export function orbAnchors(count: number) {
  const y = stageCenterY(count);

  return {
    center: { x: ORB.cx, y },
    left: { x: ORB.cx - ORB.reach, y },
    right: { x: ORB.cx + ORB.reach, y },
  };
}

export function workPanelAnchor(count: number): StagePoint {
  return { x: WORK_PANEL_WIDTH, y: stageCenterY(count) };
}

/**
 * Rows sit on a circle around `center`, so every wire in a fan has a similar reach.
 * The column follows the anchor but stays inside [minY, maxY].
 */
export function fanPoints({
  center,
  count,
  direction,
  maxY,
  minY,
  radius,
  spacing,
}: {
  center: StagePoint;
  count: number;
  direction: 1 | -1;
  maxY: number;
  minY: number;
  radius: number;
  spacing: number;
}): StagePoint[] {
  const span = (count - 1) * spacing;
  const top = Math.min(Math.max(center.y - span / 2, minY), maxY - span);

  return Array.from({ length: count }, (_, index) => {
    const y = top + index * spacing;
    const dy = y - center.y;

    return { x: center.x + direction * Math.sqrt(Math.max(radius * radius - dy * dy, 0)), y };
  });
}

export function inputFanPoints(activeIndex: number, cardCount: number, inputCount: number) {
  const anchor = cardRightAnchor(activeIndex);

  return fanPoints({
    center: { x: anchor.x + 8, y: anchor.y },
    count: inputCount,
    direction: 1,
    maxY: CARD_STACK_TOP + cardStackHeight(cardCount),
    minY: CARD_STACK_TOP,
    radius: FAN.radius,
    spacing: FAN.inputSpacing,
  });
}

export function workFanPoints(cardCount: number, workCount: number) {
  const { left } = orbAnchors(cardCount);

  return fanPoints({
    center: left,
    count: workCount,
    direction: -1,
    maxY: STAGE_HEIGHT - 30,
    minY: CARD_STACK_TOP,
    radius: FAN.workRadius,
    spacing: FAN.workSpacing,
  });
}

export function wirePath(from: StagePoint, to: StagePoint) {
  const midX = (from.x + to.x) / 2;

  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

/**
 * One pass of the comet: client inputs → service card → orb → delivered work.
 * Values are milliseconds from the cycle origin; `travel` must stay at 16% of `cycle`
 * to match the `platform-comet` keyframes in globals.css.
 */
export const COMET = {
  cycle: 6000,
  travel: 960,
  entry: 450,
  inputStagger: 110,
  cardArrival: 1000,
  cardToOrb: 1350,
  orbPulse: 2200,
  orbBand: [2150, 3250] as const,
  orbToWork: 3000,
  workStagger: 90,
} as const;

/** Offsets a cycle-synced CSS animation (comet, pulse, landing glow) within the comet cycle. */
export function cycleDelay(delay: number) {
  return { "--cycle-delay": `${Math.round(delay)}ms` } as CSSProperties;
}

export const AUTO_ADVANCE_MS = 10000;
