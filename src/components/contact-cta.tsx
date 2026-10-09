import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getI18n } from "@/i18n/request";

const defaultPromises = [
  "Initial consultation 100% free",
  "Personalized expert advice",
  "Guaranteed fast response",
];

export async function ContactCta({
  ctaLabel = "Book a free consultation",
  heading = "We take care of admin. You take care of business.",
  text = "Our helpful team is on standby to get you set up and running without the admin headache.",
  promises = defaultPromises,
}: {
  ctaLabel?: string;
  heading?: string;
  text?: string;
  promises?: readonly string[];
} = {}) {
  const { tx, href } = await getI18n();

  return (
    <section className="relative overflow-hidden bg-secondary-200 px-4 py-24 text-primary sm:px-6 lg:px-12 lg:py-36" id="contact">
      <div className="absolute inset-0 opacity-12">
        <svg aria-hidden="true" className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 900 420">
          <g fill="#011936">
            {Array.from({ length: 36 }).map((_, index) => (
              <circle
                cx={80 + (index % 12) * 70}
                cy={80 + Math.floor(index / 12) * 120 + (index % 2) * 18}
                key={index}
                r={index % 3 === 0 ? 2.2 : 1.4}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 items-start gap-8">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="type-display-xl text-primary">
            <Reveal>{tx("Begin")}</Reveal>
            <Reveal delay={0.1}>{tx("together.")}</Reveal>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <h4 className="type-h4 max-w-md text-balance text-primary">{tx(heading)}</h4>
          <p className="mt-4 max-w-md text-lg leading-8 text-primary/74">{tx(text)}</p>
          <ul className="mt-6 grid max-w-md gap-2.5 text-base leading-6 text-primary">
            {promises.map((item) => (
              <li className="flex items-start gap-2.5" key={item}>
                <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                {tx(item)}
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="mt-8 h-13 w-full justify-between rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            <a href={href("/onboarding")}>
              {tx(ctaLabel)}
              <ArrowRight className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
