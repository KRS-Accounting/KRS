"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "KRS gives us the operating clarity we wanted from an internal finance team, without losing the judgement of real tax advisors.",
    name: "Nikos Vardakis",
    role: "Co-founder, HelioStack Technologies",
    company: "HelioStack",
    logo: "heliostack",
  },
  {
    quote:
      "The monthly close is no longer a chase. We see what is missing, who owns it, and which filings need advisor review.",
    name: "Eleni Markou",
    role: "Managing Director, Agora Foods",
    company: "Agora",
    logo: "agora",
  },
  {
    quote:
      "KRS turned payroll, myDATA, and tax questions into one accountable operating file instead of scattered reminders.",
    name: "Dimitris Pappas",
    role: "Finance Lead, Meridian Labs",
    company: "Meridian",
    logo: "meridian",
  },
] as const;

type CompanyLogoId = (typeof testimonials)[number]["logo"];

function CompanyLogo({ company, logo }: { company: string; logo: CompanyLogoId }) {
  return (
    <div className="h-8 text-primary" aria-label={company}>
      {logo === "heliostack" ? (
        <svg aria-hidden="true" className="h-8 w-auto" viewBox="0 0 178 32">
          <g fill="currentColor">
            <path d="M4.2 3.2h18.4L18.8 9.4H.6z" />
            <path d="M4.2 10.4h18.4L18.8 16.6H.6z" />
            <path d="M4.2 17.6h18.4L18.8 23.8H.6z" />
            <path d="M4.2 24.8h18.4L18.8 31H.6z" />
            <text fontFamily="var(--font-sans), ui-sans-serif, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.05em" x="30" y="22">
              HelioStack
            </text>
          </g>
        </svg>
      ) : null}
      {logo === "agora" ? (
        <svg aria-hidden="true" className="h-8 w-auto" viewBox="0 0 128 32">
          <g fill="currentColor">
            <path d="M14 2.4 27 13.2H1z" />
            <rect height="15.2" width="2.3" x="3.6" y="13.4" />
            <rect height="15.2" width="2.3" x="8.4" y="13.4" />
            <rect height="15.2" width="2.3" x="13.2" y="13.4" />
            <rect height="15.2" width="2.3" x="18" y="13.4" />
            <rect height="15.2" width="2.3" x="22.8" y="13.4" />
            <rect height="2" width="26" x="1" y="28.4" />
            <text fontFamily="var(--font-sans), ui-sans-serif, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.04em" x="34" y="22">
              Agora
            </text>
          </g>
        </svg>
      ) : null}
      {logo === "meridian" ? (
        <svg aria-hidden="true" className="h-8 w-auto" fill="none" viewBox="0 0 156 32">
          <g stroke="currentColor" strokeWidth="1.7">
            <circle cx="14" cy="16" r="12" />
            <ellipse cx="14" cy="16" rx="5.2" ry="12" />
            <path d="M2 16h24M14 4v24" />
          </g>
          <text fill="currentColor" fontFamily="var(--font-sans), ui-sans-serif, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.04em" x="34" y="22">
            Meridian
          </text>
        </svg>
      ) : null}
    </div>
  );
}

export function TestimonialsCarousel() {
  const { tx } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex] ?? testimonials[0];
  const total = testimonials.length;

  const controls = useMemo(
    () => ({
      previous: () => setActiveIndex((current) => (current - 1 + total) % total),
      next: () => setActiveIndex((current) => (current + 1) % total),
    }),
    [total]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      controls.next();
    }, 6500);

    return () => window.clearInterval(interval);
  }, [controls]);

  return (
    <section className="bg-background px-4 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-stretch">
        <div className="flex flex-col justify-between border-t border-primary/12 pt-6">
          <div>
            <p className="mono-label text-secondary">{tx("Customer testimonials")}</p>
            <h2 className="mt-5 text-balance text-5xl font-normal leading-[0.95]">
              <Reveal>{tx("Don't take our word for it. Take theirs.")}</Reveal>
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              aria-label={tx("Previous testimonial")}
              className="h-11 rounded-full px-4"
              onClick={controls.previous}
              type="button"
              variant="outline"
            >
              <ArrowLeft className="size-4" />
              {tx("Back")}
            </Button>
            <Button
              aria-label={tx("Next testimonial")}
              className="h-11 rounded-full px-4"
              onClick={controls.next}
              type="button"
              variant="outline"
            >
              {tx("Next")}
              <ArrowRight className="size-4" />
            </Button>
            <div className="ml-1 flex items-center gap-2" aria-label={tx("Testimonial position")}>
              {testimonials.map((testimonial, index) => (
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-primary/24 transition-all",
                    index === activeIndex && "w-6 bg-secondary"
                  )}
                  key={testimonial.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="gradient-shell h-[720px] shadow-[var(--shadow-xl)] sm:h-[680px] lg:h-[560px]">
          <div className="grid h-full grid-rows-[0.45fr_0.55fr] items-stretch gap-px bg-primary/12 lg:grid-cols-[0.48fr_0.52fr] lg:grid-rows-none">
            <div className="relative min-h-0 overflow-hidden bg-primary">
              <Image
                alt={tx("Portrait of testimonial speaker")}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                src="/images/krs-testimonial-profile.png"
              />
            </div>
            <div className="flex min-h-0 flex-col bg-card p-8 sm:p-10 lg:p-11" aria-live="polite">
              <CompanyLogo company={active.company} logo={active.logo} />
              <div className="flex min-h-0 flex-1 flex-col justify-center py-6">
                <span
                  aria-hidden="true"
                  className="font-heading -mb-2.5 block select-none text-5xl font-semibold leading-[0.35] text-primary sm:text-6xl"
                >
                  {"\u201C"}
                </span>
                <blockquote className="font-heading text-balance text-[30px] font-light leading-[1.32]">
                  {tx(active.quote)}
                </blockquote>
              </div>
              <div className="shrink-0 border-t border-primary/12 pt-6">
                <p className="font-semibold">{active.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{tx(active.role)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
