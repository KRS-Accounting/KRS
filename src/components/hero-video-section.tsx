import { ArrowRight, Star } from "lucide-react";

import { HeroVideoBackground } from "@/components/hero-video-background";
import { Reveal, RevealFade } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getI18n } from "@/i18n/request";

const googleProof = {
  score: 4.8,
  count: 132,
  href: "https://www.google.com/maps/search/?api=1&query=KRS+Financial+Control+Andrea+Syngrou+Athens",
} as const;

export async function HeroVideoSection() {
  const { tx, href } = await getI18n();

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-x-clip lg:min-h-[900px] lg:flex-1">
      <HeroVideoBackground />
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-4 pb-6 pt-24 sm:px-6 lg:px-12">
        <RevealFade className="mx-auto w-full max-w-4xl text-center" delay={0.08} play="mount">
          <h1 className="hero-display-heading font-heading mx-auto max-w-5xl text-balance text-[3.25rem] font-normal leading-[1.08] tracking-[-0.048em] text-primary-foreground sm:text-6xl sm:leading-[1.1] lg:text-[clamp(4.75rem,3.4vw+4vh,6.75rem)] lg:leading-[1.06]">
            <Reveal play="mount">{tx("AI-native accounting.")}</Reveal>
            <Reveal className="hero-headline-accent-line pb-1 leading-[1.12]" delay={0.08} play="mount">
              <span className="hero-headline-accent italic text-primary-foreground">{tx("Human expertise.")}</span>
            </Reveal>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-6 text-primary-foreground/82 sm:text-lg sm:leading-7 lg:mt-6">
            {tx(
              "KRS combines licensed accounting and tax professionals with AI-native workflows that organize filings, documents, payroll obligations, and advisory questions before they become urgent.",
            )}
          </p>
          <GoogleTrustRow tx={tx} />
          <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button asChild className="h-12 rounded-full px-6 text-base shadow-[var(--shadow-md)]" variant="secondary">
              <a href={href("/onboarding")}>
                {tx("Book a free consultation")}
                <ArrowRight className="size-5" />
              </a>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full border-primary-foreground/55 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              variant="outline"
            >
              <a href={href("/pricing")}>
                {tx("Find your plan")}
                <ArrowRight className="size-5" />
              </a>
            </Button>
          </div>
        </RevealFade>
      </div>
    </section>
  );
}

function GoogleTrustRow({ tx }: { tx: (value: string) => string }) {
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center sm:gap-5">
      <a
        className="inline-flex items-center gap-3 text-primary-foreground outline-none transition hover:text-secondary focus-visible:text-secondary"
        href={googleProof.href}
        rel="noreferrer"
        target="_blank"
      >
        <GoogleMark />
        <GoogleStars score={googleProof.score} />
        <span className="text-sm font-semibold">
          {googleProof.score}
          {tx("/5 on Google")}
          <span className="ml-1.5 font-normal text-primary-foreground/62">({googleProof.count})</span>
        </span>
      </a>
      <span aria-hidden="true" className="hidden h-8 w-px bg-primary-foreground/24 sm:block" />
      <p className="mono-label hidden text-primary-foreground/62 sm:block">{tx("Trusted by hundreds of businesses")}</p>
    </div>
  );
}

function GoogleStars({ score }: { score: number }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(1, Math.max(0, score - index));

        return (
          <span className="relative size-3.5" key={index}>
            <Star className="size-3.5 text-secondary/28" strokeWidth={1.75} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-3.5 fill-secondary text-secondary" strokeWidth={1.75} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="size-5 shrink-0" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
