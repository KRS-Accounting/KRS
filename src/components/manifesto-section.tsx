"use client";

import Image from "next/image";

import { RevealFade, RevealWords } from "@/components/reveal";

export function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-primary pt-24 text-primary-foreground lg:py-36" id="about">
      <div
        aria-hidden="true"
        className="font-heading pointer-events-none absolute -right-8 top-0 select-none text-[220px] font-light leading-[0.75] text-secondary/8 sm:text-[360px] lg:text-[520px]"
      >
        04
      </div>

      {/* Desktop: founder as a bottom-left background plane */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[max(3rem,calc((100%-1400px)/2+3rem))] hidden w-[min(22rem,40%)] bg-left-bottom bg-no-repeat lg:block"
        style={{
          backgroundImage: "url('/images/FounderKRS.webp')",
          backgroundSize: "min(22rem, 100%) auto",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-4 sm:px-6 lg:px-12">
        <div className="col-span-12 lg:col-span-3 lg:min-h-[520px]">
          <p className="mono-label text-secondary">Manifesto / 01</p>
          <RevealFade className="mt-5 max-w-xs text-sm leading-7 text-primary-foreground/56" delay={0.05}>
            Accounting should feel like an operating discipline, not a periodic scramble through portals, folders, and
            inboxes.
          </RevealFade>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <RevealWords
            className="font-heading text-balance text-4xl font-light leading-[1.04] sm:text-5xl md:text-6xl lg:text-7xl"
            lines={[
              [{ text: "We believe trust is built through evidence, cadence, and accountable review." }],
              [
                { text: "AI should not obscure the work.", accent: true },
                { text: "It should make the work inspectable." },
              ],
            ]}
          />
          <RevealFade className="mt-8 flex items-center gap-4 lg:hidden" delay={0.15}>
            <span className="h-px w-10 bg-secondary" />
            <p className="text-sm leading-6 text-primary-foreground/68">
              <span className="font-semibold text-primary-foreground">Konstantinos Raikos</span>, Founder and CEO
            </p>
          </RevealFade>
        </div>
      </div>

      {/* Mobile / tablet: photo sits on the bottom edge, no gradient frame */}
      <div className="relative z-10 mx-auto mt-10 max-w-[1400px] px-4 sm:px-6 lg:hidden">
        <Image
          alt="Konstantinos Raikos, founder and CEO of KRS"
          className="mx-auto h-auto w-full max-w-sm object-contain object-bottom"
          height={900}
          sizes="(max-width: 1023px) 90vw, 0px"
          src="/images/FounderKRS.webp"
          width={720}
        />
      </div>
    </section>
  );
}
