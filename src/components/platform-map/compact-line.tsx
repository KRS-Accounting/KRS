"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { FLOW_DOT_X, FLOW_DOT_Y, FlowHeader, FlowList, OrbGlow, PlatformCaption, ReviewerSwap, drawIn } from "./compact-flow";
import type { PlatformService } from "./data";
import type { FanItem } from "./fan-list";
import { COMET, cometReach, type StagePoint } from "./geometry";
import { Comet, FAN_WIRE } from "./map-wires";
import { PlatformOrb } from "./platform-orb";
import { ReviewerBadge } from "./status-ring";

const ROW = 52;
const HEADER = 30;
const TEXT_X = 22;
const ORB_SIZE = 112;
const ORB_REACH = 54;
const ORB_TEXT_GAP = 16;
const GAP_ABOVE_ORB = 36;
const GAP_BELOW_ORB = 44;
/** Must fit in GAP_ABOVE_ORB plus the empty bottom of the last row, or the bend cuts through its text. */
const BEND = 48;
const ORB_HOLD = 800;

const inputStart = COMET.entry;
const orbArrival = inputStart + cometReach(1);
const workStart = orbArrival + ORB_HOLD;

/** Vertical S-bend: leaves `from` heading down and arrives at `to` heading down. */
function bend(from: StagePoint, to: StagePoint) {
  const midY = (from.y + to.y) / 2;

  return `C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
}

function bendLength(from: StagePoint, to: StagePoint) {
  const midY = (from.y + to.y) / 2;
  let length = 0;
  let previous = from;

  for (let step = 1; step <= 24; step += 1) {
    const t = step / 24;
    const a = (1 - t) ** 3;
    const b = 3 * (1 - t) ** 2 * t;
    const c = 3 * (1 - t) * t * t;
    const d = t ** 3;
    const point = { x: (a + b) * from.x + (c + d) * to.x, y: a * from.y + (b + c) * midY + d * to.y };
    length += Math.hypot(point.x - previous.x, point.y - previous.y);
    previous = point;
  }

  return length;
}

/**
 * Phone layout: one line runs down through every client input, swings into the orb,
 * and carries on through the delivered work. A single comet rides each half of the line.
 */
export function CompactLine({
  activeIndex,
  className,
  inputItems,
  reducedMotion,
  services,
  workItems,
}: {
  activeIndex: number;
  className?: string;
  inputItems: readonly FanItem[];
  reducedMotion: boolean;
  services: readonly PlatformService[];
  workItems: readonly FanItem[];
}) {
  const cycleOriginRef = useRef(0);
  const service = services[activeIndex];

  const inputRows = Math.max(...services.map((item) => item.inputs.length));
  const workRows = Math.max(...services.map((item) => item.work.length));
  const orbTop = HEADER + inputRows * ROW + GAP_ABOVE_ORB;
  const orb = { x: ORB_SIZE / 2, y: orbTop + ORB_SIZE / 2 };
  const workHeaderTop = orbTop + ORB_SIZE + GAP_BELOW_ORB;
  const workTop = workHeaderTop + HEADER;
  const height = workTop + workRows * ROW;

  const inputYs = inputItems.map((_, index) => HEADER + index * ROW + FLOW_DOT_Y);
  const workYs = workItems.map((_, index) => workTop + index * ROW + FLOW_DOT_Y);

  const bendInFrom = { x: FLOW_DOT_X, y: orbTop - BEND };
  const bendInTo = { x: orb.x, y: orb.y - ORB_REACH };
  const bendOutFrom = { x: orb.x, y: orb.y + ORB_REACH };
  const bendOutTo = { x: FLOW_DOT_X, y: workHeaderTop + 6 };
  const firstInput = inputYs[0] ?? bendInFrom.y;
  const lastWork = workYs[workYs.length - 1] ?? bendOutTo.y;

  const inputPath = `M ${FLOW_DOT_X} ${firstInput} L ${bendInFrom.x} ${bendInFrom.y} ${bend(bendInFrom, bendInTo)}`;
  const workPath = `M ${bendOutFrom.x} ${bendOutFrom.y} ${bend(bendOutFrom, bendOutTo)} L ${FLOW_DOT_X} ${lastWork}`;
  const inputLength = bendInFrom.y - firstInput + bendLength(bendInFrom, bendInTo);
  const bendOutLength = bendLength(bendOutFrom, bendOutTo);
  const workLength = bendOutLength + lastWork - bendOutTo.y;

  const inputPulses = inputYs.map((y) => inputStart + cometReach((y - firstInput) / inputLength));
  const workPulses = workYs.map((y) => workStart + cometReach((bendOutLength + y - bendOutTo.y) / workLength));

  useLayoutEffect(() => {
    cycleOriginRef.current = performance.now() + orbArrival - COMET.orbBand[0];
  }, [service.id]);

  return (
    <div
      className={cn("relative", className)}
      style={{ "--comet-cycle": `${COMET.cycle}ms`, height } as CSSProperties}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 overflow-visible"
        fill="none"
        height={height}
        viewBox={`0 0 ${ORB_SIZE} ${height}`}
        width={ORB_SIZE}
      >
        <OrbGlow center={orb} pulseDelay={orbArrival} pulseKey={`pulse-${service.id}`} size={ORB_SIZE} />

        <AnimatePresence initial={false}>
          <motion.g
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            key={`line-${service.id}`}
            transition={{ duration: 0.2 }}
          >
            {[inputPath, workPath].map((d, index) => (
              <motion.path
                animate={{ opacity: 1, pathLength: 1 }}
                d={d}
                initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
                key={index}
                stroke={FAN_WIRE}
                strokeLinecap="round"
                transition={drawIn(index * 0.2, reducedMotion)}
              />
            ))}
          </motion.g>
        </AnimatePresence>

        {reducedMotion ? null : (
          <g key={`comets-${service.id}`}>
            <Comet d={inputPath} delay={inputStart} />
            <Comet d={workPath} delay={workStart} />
          </g>
        )}
      </svg>

      <FlowHeader
        className="absolute right-0 top-0 justify-between"
        style={{ left: TEXT_X }}
        subtitle={`${inputItems.length} client inputs`}
        title="What you send"
      />
      <FlowList
        enter={{ y: 6 }}
        items={inputItems}
        label={`What you send for ${service.name}`}
        listKey={service.id}
        metaStyle="label"
        points={inputYs.map((y) => ({ inset: 0, y }))}
        pulseDelays={reducedMotion ? undefined : inputPulses}
        reducedMotion={reducedMotion}
        side="start"
      />

      <div className="absolute left-0" style={{ top: orbTop }}>
        <PlatformOrb cycleOriginRef={cycleOriginRef} reducedMotion={reducedMotion} size={ORB_SIZE} />
      </div>
      <div
        className="absolute right-0 flex flex-col justify-center"
        style={{ height: ORB_SIZE, left: ORB_SIZE + ORB_TEXT_GAP, top: orbTop }}
      >
        <PlatformCaption activeIndex={activeIndex} count={services.length} />
        <ReviewerSwap className="mt-3" reducedMotion={reducedMotion} swapKey={service.id}>
          <ReviewerBadge service={service} />
        </ReviewerSwap>
      </div>

      <FlowHeader
        className="absolute right-0 justify-between"
        style={{ left: TEXT_X, top: workHeaderTop }}
        subtitle={service.workTitle}
        title="What KRS delivers"
      />
      <FlowList
        enter={{ y: 6 }}
        items={workItems}
        label={`What KRS delivers for ${service.name}`}
        listKey={service.id}
        metaStyle="sentence"
        points={workYs.map((y) => ({ inset: 0, y }))}
        pulseDelays={reducedMotion ? undefined : workPulses}
        reducedMotion={reducedMotion}
        side="start"
      />
    </div>
  );
}
