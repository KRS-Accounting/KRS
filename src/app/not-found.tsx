import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, RevealFade } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(await pageMetadata({ title: "Page not found | KRS AI" })),
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const { tx, href } = await getI18n();

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-primary text-primary-foreground">
        <section className="relative flex min-h-[calc(100dvh-4.5rem)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(18rem,52vw,40rem)] font-light leading-none tracking-[-0.08em] text-primary-foreground/[0.045] select-none"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 300, "WONK" 1' }}
          >
            0
          </p>

          <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
            <p
              aria-hidden="true"
              className="font-heading pb-[0.06em] text-[clamp(5.5rem,14vw,9rem)] font-light leading-[0.9] tracking-[-0.07em] text-primary-foreground select-none"
              style={{
                fontVariantNumeric: "lining-nums",
                fontVariationSettings: '"opsz" 144, "wght" 300, "WONK" 1',
              }}
            >
              4
              <span className="mx-[-0.02em] inline-block px-1 text-secondary italic">0</span>
              4
            </p>

            <div className="mt-2 h-px w-16 bg-secondary" />

            <h1 className="font-heading mt-7 max-w-[14ch] text-balance text-4xl font-light leading-[1.08] tracking-[-0.045em] sm:text-5xl">
              <span className="sr-only">404. </span>
              <Reveal play="mount">{tx("This page is not on file.")}</Reveal>
            </h1>
            <RevealFade
              className="mt-5 max-w-[36ch] text-base leading-7 text-primary-foreground/78 sm:text-lg"
              delay={0.08}
              play="mount"
            >
              {tx("The address does not match a page we publish. Return home, or look through the services.")}
            </RevealFade>
            <RevealFade className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2" delay={0.16} play="mount">
              <Link
                className="inline-flex h-12 items-center gap-2 border-b border-secondary px-1 text-sm font-semibold text-primary-foreground transition hover:border-primary-foreground hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
                href={href("/")}
              >
                {tx("Back home")}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
              <Link
                className="inline-flex h-12 items-center gap-2 border-b border-primary-foreground/35 px-1 text-sm font-semibold text-primary-foreground/78 transition hover:border-primary-foreground hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
                href={href("/#services")}
              >
                {tx("See services")}
              </Link>
            </RevealFade>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
