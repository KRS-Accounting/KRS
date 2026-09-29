"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import {
  FLOW_DOT_X,
  FlowHeader,
  FlowList,
  OrbGlow,
  PlatformCaption,
  ReviewerSwap,
  drawIn,
  type FlowPoint,
} from "./compact-flow";
import type { PlatformService } from "./data";
import type { FanItem } from "./fan-list";
import { COMET, cometReach, wirePath } from "./geometry";
import { Comet, FAN_WIRE } from "./map-wires";
import { PlatformOrb } from "./platform-orb";
import { ReviewerBadge } from "./status-ring";

const ROW = 50;
const HEADER = 28;
const STAGE_HEIGHT = 330;
const ORB_SIZE = 152;
const ORB_REACH = 72;
/**
 * Distance from the orb centre to the columns' inner edges. The outer wires pass beside the
 * caption and reviewer badge, so shrinking it or growing the orb makes them cross.
 */
const INNER_EDGE = ORB_SIZE / 2 + 60;
const ARC_RADIUS = 320;
const WIRE_WIDTH = 2 * (INNER_EDGE + 40);
const ORB_HOLD = 450;

const orbArrival = COMET.entry + cometReach(1);

const inputSide: CSSProperties = { left: 0, right: `calc(50% + ${INNER_EDGE}px)` };
const workSide: CSSProperties = { left: `calc(50% + ${INNER_EDGE}px)`, right: 0 };

/** Rows on a shallow arc around the orb, centred on it; the middle rows sit furthest from their inner edge. */
function arcPoints(count: number): FlowPoint[] {
  const half = ((count - 1) * ROW) / 2;
  const edge = Math.sqrt(ARC_RADIUS ** 2 - half ** 2);

  return Array.from({ length: count }, (_, index) => {
    const dy = index * ROW - half;

    return { inset: Math.sqrt(ARC_RADIUS ** 2 - dy ** 2) - edge, y: STAGE_HEIGHT / 2 + dy };
  });
}

/** Tablet layout: client inputs on the left wire into the orb, which wires out to the delivered work on the right. */
export function CompactColumns({
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

  const center = { x: WIRE_WIDTH / 2, y: STAGE_HEIGHT / 2 };
  const orbLeft = { x: center.x - ORB_REACH, y: center.y };
  const orbRight = { x: center.x + ORB_REACH, y: center.y };
  const inputPoints = arcPoints(inputItems.length);
  const workPoints = arcPoints(workItems.length);
  const inputDots = inputPoints.map((point) => ({ x: center.x - INNER_EDGE - point.inset - FLOW_DOT_X, y: point.y }));
  const workDots = workPoints.map((point) => ({ x: center.x + INNER_EDGE + point.inset + FLOW_DOT_X, y: point.y }));

  const inputStarts = inputDots.map((_, index) => COMET.entry + index * COMET.inputStagger);
  const lastInputStart = inputStarts[inputStarts.length - 1] ?? COMET.entry;
  const workStarts = workDots.map(
    (_, index) => lastInputStart + cometReach(1) + ORB_HOLD + index * COMET.workStagger
  );
  const workLandings = workStarts.map((start) => start + cometReach(1) - 40);

  useLayoutEffect(() => {
    cycleOriginRef.current = performance.now() + orbArrival - COMET.orbBand[0];
  }, [service.id]);

  return (
    <div
      className={cn("relative", className)}
      style={{ "--comet-cycle": `${COMET.cycle}ms`, height: HEADER + STAGE_HEIGHT } as CSSProperties}
    >
      <FlowHeader
        className="absolute top-0 justify-end"
        style={inputSide}
        subtitle={`${inputItems.length} client inputs`}
        title="What you send"
      />
      <FlowHeader className="absolute top-0" style={workSide} subtitle={service.workTitle} title="What KRS delivers" />

      <div className="absolute inset-x-0" style={{ height: STAGE_HEIGHT, top: HEADER }}>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 overflow-visible"
          fill="none"
          height={STAGE_HEIGHT}
          style={{ marginLeft: -WIRE_WIDTH / 2 }}
          viewBox={`0 0 ${WIRE_WIDTH} ${STAGE_HEIGHT}`}
          width={WIRE_WIDTH}
        >
          <OrbGlow center={center} pulseDelay={orbArrival} pulseKey={`pulse-${service.id}`} size={ORB_SIZE} />

          <AnimatePresence initial={false}>
            <motion.g
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 1 }}
              key={`wires-${service.id}`}
              transition={{ duration: 0.2 }}
            >
              {[
                ...inputDots.map((dot) => wirePath(orbLeft, dot)),
                ...workDots.map((dot) => wirePath(orbRight, dot)),
              ].map((d, index) => (
                <motion.path
                  animate={{ opacity: 1, pathLength: 1 }}
                  d={d}
                  initial={reducedMotion ? false : { opacity: 0, pathLength: 0 }}
                  key={index}
                  stroke={FAN_WIRE}
                  strokeLinecap="round"
                  transition={drawIn(index * 0.03, reducedMotion)}
                />
              ))}
            </motion.g>
          </AnimatePresence>

          {reducedMotion ? null : (
            <g key={`comets-${service.id}`}>
              {inputDots.map((dot, index) => (
                <Comet d={wirePath(dot, orbLeft)} delay={inputStarts[index]} key={`input-${index}`} />
              ))}
              {workDots.map((dot, index) => (
                <Comet d={wirePath(orbRight, dot)} delay={workStarts[index]} key={`work-${index}`} />
              ))}
            </g>
          )}
        </svg>

        <div className="absolute inset-y-0" style={inputSide}>
          <FlowList
            enter={{ x: 16 }}
            items={inputItems}
            label={`What you send for ${service.name}`}
            listKey={service.id}
            metaStyle="label"
            points={inputPoints}
            pulseDelays={reducedMotion ? undefined : inputStarts}
            reducedMotion={reducedMotion}
            side="end"
          />
        </div>
        <div className="absolute inset-y-0" style={workSide}>
          <FlowList
            enter={{ x: -16 }}
            items={workItems}
            label={`What KRS delivers for ${service.name}`}
            listKey={service.id}
            metaStyle="sentence"
            points={workPoints}
            pulseDelays={reducedMotion ? undefined : workLandings}
            reducedMotion={reducedMotion}
            side="start"
          />
        </div>

        <PlatformCaption
          activeIndex={activeIndex}
          className="absolute left-1/2 w-60 -translate-x-1/2 text-center"
          count={services.length}
          style={{ top: center.y - ORB_SIZE / 2 - 54 }}
        />
        <div className="absolute left-1/2" style={{ marginLeft: -ORB_SIZE / 2, top: center.y - ORB_SIZE / 2 }}>
          <PlatformOrb cycleOriginRef={cycleOriginRef} reducedMotion={reducedMotion} size={ORB_SIZE} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: center.y + ORB_SIZE / 2 + 8 }}>
          <ReviewerSwap reducedMotion={reducedMotion} swapKey={service.id}>
            <ReviewerBadge service={service} />
          </ReviewerSwap>
        </div>
      </div>
    </div>
  );
}
