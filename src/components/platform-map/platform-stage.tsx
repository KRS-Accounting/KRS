"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

import type { PlatformService } from "./data";
import { FanList, type FanItem } from "./fan-list";
import {
  COMET,
  ORB,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  inputFanPoints,
  orbAnchors,
  workFanPoints,
  workPanelAnchor,
} from "./geometry";
import { MapWires, type WorkSide } from "./map-wires";
import { PlatformOrb } from "./platform-orb";
import { ServiceCard } from "./service-card";
import { ReviewerBadge } from "./status-ring";
import { useRovingRadio } from "./use-active-service";
import { useStageScale } from "./use-stage-scale";
import { WorkPanel } from "./work-panel";

const ORB_LABEL_WIDTH = 280;

export function PlatformStage({
  activeIndex,
  autoAdvance,
  inputItems,
  reducedMotion,
  select,
  services,
  workItems,
  workSide,
}: {
  activeIndex: number;
  autoAdvance: ReactNode;
  inputItems: readonly FanItem[];
  reducedMotion: boolean;
  select: (index: number) => void;
  services: readonly PlatformService[];
  workItems: readonly FanItem[];
  workSide: WorkSide;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cycleOriginRef = useRef(0);
  const scale = useStageScale(wrapperRef);
  const getRadioProps = useRovingRadio({ activeIndex, count: services.length, select });

  const service = services[activeIndex];
  const count = services.length;
  const orb = orbAnchors(count);
  const inputPoints = inputFanPoints(activeIndex, count, inputItems.length);
  const workPoints = workSide === "fan" ? workFanPoints(count, workItems.length) : [workPanelAnchor(count)];
  const workLanding = COMET.entry + COMET.orbToWork + COMET.travel;

  useLayoutEffect(() => {
    cycleOriginRef.current = performance.now() + COMET.entry;
  }, [service.id]);

  return (
    <div
      className="relative w-full"
      ref={wrapperRef}
      style={scale === null ? { aspectRatio: `${STAGE_WIDTH} / ${STAGE_HEIGHT}` } : { height: STAGE_HEIGHT * scale }}
    >
      <div
        className="absolute left-1/2 top-0 origin-top transition-opacity duration-300"
        style={
          {
            "--comet-cycle": `${COMET.cycle}ms`,
            height: STAGE_HEIGHT,
            opacity: scale === null ? 0 : 1,
            transform: `translateX(-50%) scale(${scale ?? 1})`,
            width: STAGE_WIDTH,
          } as CSSProperties
        }
      >
        <MapWires
          activeIndex={activeIndex}
          inputPoints={inputPoints}
          reducedMotion={reducedMotion}
          services={services}
          workPoints={workPoints}
          workSide={workSide}
        />

        {workSide === "panel" ? (
          <WorkPanel
            centerY={orb.center.y}
            landDelay={workLanding - 60}
            reducedMotion={reducedMotion}
            service={service}
          />
        ) : (
          <FanList
            items={workItems}
            label={`What KRS delivers for ${service.name}`}
            listKey={service.id}
            metaStyle="sentence"
            points={workPoints}
            pulseDelays={
              reducedMotion ? undefined : workPoints.map((_, index) => workLanding - 80 + index * COMET.workStagger)
            }
            reducedMotion={reducedMotion}
            side="left"
          />
        )}

        <div
          className="pointer-events-none absolute text-center"
          style={{ left: orb.center.x - ORB_LABEL_WIDTH / 2, top: orb.center.y - ORB.size / 2 - 54, width: ORB_LABEL_WIDTH }}
        >
          <p className="text-xl font-medium leading-tight">KRS Platform</p>
          <p className="mt-1 text-[13px] text-primary-foreground/58">
            AI + Human review ·{" "}
            <span className="font-semibold text-secondary tabular-nums">{activeIndex + 1}</span> of{" "}
            <span className="font-semibold text-secondary tabular-nums">{count}</span>
          </p>
        </div>
        <div
          className="absolute"
          style={{ left: orb.center.x - ORB.size / 2, top: orb.center.y - ORB.size / 2 }}
        >
          <PlatformOrb cycleOriginRef={cycleOriginRef} reducedMotion={reducedMotion} size={ORB.size} />
        </div>
        <div
          className="absolute flex justify-center"
          style={{ left: orb.center.x - ORB_LABEL_WIDTH / 2, top: orb.center.y + ORB.size / 2 + 8, width: ORB_LABEL_WIDTH }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              key={service.id}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
            >
              <ReviewerBadge service={service} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div aria-label="KRS services" className="pointer-events-none absolute inset-0" role="radiogroup">
          {services.map((item, index) => (
            <ServiceCard
              active={index === activeIndex}
              autoAdvance={index === activeIndex ? autoAdvance : null}
              index={index}
              key={item.id}
              radioProps={getRadioProps(index)}
              reducedMotion={reducedMotion}
              service={item}
            />
          ))}
        </div>

        <FanList
          items={inputItems}
          label={`What you send for ${service.name}`}
          listKey={service.id}
          points={inputPoints}
          pulseDelays={
            reducedMotion ? undefined : inputPoints.map((_, index) => COMET.entry + index * COMET.inputStagger)
          }
          reducedMotion={reducedMotion}
          side="right"
        />
      </div>
    </div>
  );
}
