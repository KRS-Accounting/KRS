"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";

import type { PlatformService } from "./data";
import {
  COMET,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  cardLeftAnchor,
  cardRightAnchor,
  cycleDelay,
  orbAnchors,
  wirePath,
  type StagePoint,
} from "./geometry";

export type WorkSide = "panel" | "fan";

const drawEase = [0.16, 1, 0.3, 1] as const;
export const FAN_WIRE = "rgba(214, 186, 120, 0.3)";

export function MapWires({
  activeIndex,
  inputPoints,
  reducedMotion,
  services,
  workPoints,
  workSide,
}: {
  activeIndex: number;
  inputPoints: StagePoint[];
  reducedMotion: boolean;
  services: readonly PlatformService[];
  /** One point per wire that leaves the orb: the panel edge, or each row of the mirrored fan. */
  workPoints: StagePoint[];
  workSide: WorkSide;
}) {
  const gradientId = useId().replace(/:/g, "");
  const service = services[activeIndex];
  const orb = orbAnchors(services.length);
  const cardLeft = cardLeftAnchor(activeIndex);
  const cardRight = cardRightAnchor(activeIndex);
  const isFan = workSide === "fan";

  const drawIn = (index: number) =>
    reducedMotion
      ? { duration: 0 }
      : { delay: 0.08 + index * 0.05, duration: 0.6, ease: drawEase };

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-visible"
      fill="none"
      height={STAGE_HEIGHT}
      viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
      width={STAGE_WIDTH}
    >
      <defs>
        <radialGradient id={`${gradientId}-glow`}>
          <stop offset="0" stopColor="#0b3970" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#0b3970" stopOpacity="0.32" />
          <stop offset="1" stopColor="#0b3970" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradientId}-pulse`}>
          <stop offset="0" stopColor="#ae882f" stopOpacity="0.32" />
          <stop offset="0.6" stopColor="#ae882f" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ae882f" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx={orb.center.x} cy={orb.center.y} fill={`url(#${gradientId}-glow)`} rx={240} ry={210} />
      <ellipse
        className="platform-orb-pulse"
        cx={orb.center.x}
        cy={orb.center.y}
        fill={`url(#${gradientId}-pulse)`}
        key={`pulse-${service.id}`}
        rx={132}
        ry={132}
        style={cycleDelay(COMET.entry + COMET.orbPulse)}
      />

      {services.map((item, index) => {
        const active = index === activeIndex;

        return (
          <path
            d={wirePath(cardLeftAnchor(index), orb.right)}
            key={item.id}
            stroke={active ? "rgba(174, 136, 47, 0.75)" : "rgba(244, 239, 230, 0.13)"}
            strokeLinecap="round"
            strokeWidth={active ? 1.4 : 1}
            style={{ transition: "stroke 400ms ease, stroke-width 400ms ease" }}
          />
        );
      })}

      {isFan ? (
        <AnimatePresence initial={false}>
          <motion.g
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            key={`work-${service.id}`}
            transition={{ duration: 0.2 }}
          >
            {workPoints.map((point, index) => (
              <motion.path
                animate={{ opacity: 1, pathLength: 1 }}
                d={wirePath(orb.left, point)}
                initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
                key={index}
                stroke={FAN_WIRE}
                strokeLinecap="round"
                transition={drawIn(index)}
              />
            ))}
          </motion.g>
        </AnimatePresence>
      ) : (
        workPoints.map((point) => (
          <path
            d={wirePath(orb.left, point)}
            key={`${point.x}-${point.y}`}
            stroke="rgba(174, 136, 47, 0.6)"
            strokeLinecap="round"
            strokeWidth={1.3}
          />
        ))
      )}

      <AnimatePresence initial={false}>
        <motion.g
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          key={`inputs-${service.id}`}
          transition={{ duration: 0.2 }}
        >
          {inputPoints.map((point, index) => (
            <motion.path
              animate={{ opacity: 1, pathLength: 1 }}
              d={wirePath(cardRight, point)}
              initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
              key={index}
              stroke={FAN_WIRE}
              strokeLinecap="round"
              transition={drawIn(index)}
            />
          ))}
        </motion.g>
      </AnimatePresence>

      {reducedMotion ? null : (
        <g key={`comets-${service.id}`}>
          {inputPoints.map((point, index) => (
            <Comet
              d={wirePath(point, cardRight)}
              delay={COMET.entry + index * COMET.inputStagger}
              key={`input-${index}`}
            />
          ))}
          <Comet d={wirePath(cardLeft, orb.right)} delay={COMET.entry + COMET.cardToOrb} />
          {workPoints.map((point, index) => (
            <Comet
              d={wirePath(orb.left, point)}
              delay={COMET.entry + COMET.orbToWork + index * COMET.workStagger}
              key={`work-${index}`}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

export function Comet({ d, delay }: { d: string; delay: number }) {
  return (
    <g style={cycleDelay(delay)}>
      <path className="platform-comet platform-comet-halo" d={d} pathLength={1} />
      <path className="platform-comet platform-comet-core" d={d} pathLength={1} />
    </g>
  );
}
