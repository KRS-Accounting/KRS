"use client";

import { useEffect, useRef, type RefObject } from "react";

import { cn } from "@/lib/utils";

import { COMET } from "./geometry";

type OrbPoint = { x: number; y: number; z: number };

const CREAM = [244, 239, 230] as const;
const GOLD = [226, 192, 112] as const;
const TILT = -0.42;
const SPIN_PER_MS = 0.00016;
const BAND_HALF_WIDTH = 0.2;
const REFERENCE_SIZE = 184;

function spherePoints(count: number): OrbPoint[] {
  const golden = Math.PI * (3 - Math.sqrt(5));

  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (index / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * index;

    return { x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring };
  });
}

function bandPosition(phase: number) {
  const [start, end] = COMET.orbBand;
  if (phase < start || phase > end) return null;

  const t = (phase - start) / (end - start);
  const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

  return -1.35 + eased * 2.7;
}

function drawOrb(
  context: CanvasRenderingContext2D,
  points: OrbPoint[],
  size: number,
  pixelRatio: number,
  rotation: number,
  band: number | null
) {
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, size, size);

  const center = size / 2;
  const radius = size * 0.43;
  const dotScale = Math.max(size / REFERENCE_SIZE, 0.6);
  const cosSpin = Math.cos(rotation);
  const sinSpin = Math.sin(rotation);
  const cosTilt = Math.cos(TILT);
  const sinTilt = Math.sin(TILT);

  for (const point of points) {
    const x = point.x * cosSpin + point.z * sinSpin;
    const spunZ = point.z * cosSpin - point.x * sinSpin;
    const y = point.y * cosTilt - spunZ * sinTilt;
    const z = point.y * sinTilt + spunZ * cosTilt;
    const depth = (z + 1) / 2;

    let glow = 0;
    if (band !== null) {
      const axis = x * 0.5 + y * 0.866;
      glow = Math.max(0, 1 - Math.abs(axis - band) / BAND_HALF_WIDTH) * (0.3 + depth * 0.7);
    }

    const alpha = Math.min(1, 0.07 + depth * depth * 0.62 + glow * 0.5);
    const dot = Math.max(0.4, (0.45 + depth * 0.95 + glow * 0.75) * dotScale);
    const red = Math.round(CREAM[0] + (GOLD[0] - CREAM[0]) * glow);
    const green = Math.round(CREAM[1] + (GOLD[1] - CREAM[1]) * glow);
    const blue = Math.round(CREAM[2] + (GOLD[2] - CREAM[2]) * glow);

    context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`;
    context.beginPath();
    context.arc(center + x * radius, center + y * radius, dot, 0, Math.PI * 2);
    context.fill();
  }
}

export function PlatformOrb({
  className,
  cycleOriginRef,
  reducedMotion,
  size,
}: {
  className?: string;
  /** performance.now() timestamp of the current comet cycle, so the light band crosses as the comet arrives. */
  cycleOriginRef?: RefObject<number>;
  reducedMotion: boolean;
  size: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * pixelRatio);
    canvas.height = Math.round(size * pixelRatio);

    const points = spherePoints(size > 140 ? 760 : 420);

    if (reducedMotion) {
      drawOrb(context, points, size, pixelRatio, 0.9, 0.12);
      return;
    }

    const mountedAt = performance.now();
    let frame = 0;
    let running = false;

    const render = (now: number) => {
      const origin = cycleOriginRef?.current || mountedAt;
      const phase = (((now - origin) % COMET.cycle) + COMET.cycle) % COMET.cycle;
      drawOrb(context, points, size, pixelRatio, now * SPIN_PER_MS, bandPosition(phase));
    };

    const tick = (now: number) => {
      render(now);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    render(mountedAt);

    const observer = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()), {
      rootMargin: "160px",
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [cycleOriginRef, reducedMotion, size]);

  return (
    <canvas
      aria-hidden="true"
      className={cn("pointer-events-none block", className)}
      ref={canvasRef}
      style={{ height: size, width: size }}
    />
  );
}
