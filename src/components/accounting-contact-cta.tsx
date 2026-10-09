import { Check } from "lucide-react";

import { OnboardingFlow } from "@/components/onboarding-flow";
import { Reveal } from "@/components/reveal";
import { getI18n } from "@/i18n/request";

const promises = [
  "Initial consultation 100% free",
  "Personalized expert advice",
  "Guaranteed fast response",
];

export async function AccountingContactCta({
  subheading = "We take care of the books. You take care of the business.",
  body = "Share a few details and we will match you with a KRS accountant for a free first call.",
  defaultServices = ["Accounting and myDATA"],
}: {
  subheading?: string;
  body?: string;
  defaultServices?: readonly string[];
} = {}) {
  const { tx } = await getI18n();

  return (
    <section
      className="relative overflow-x-clip bg-secondary-200 px-4 py-16 text-primary sm:px-6 lg:px-12 lg:py-20"
      id="contact"
    >
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

      <div className="relative mx-auto grid max-w-[1400px] items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:col-span-4">
          <h2 className="font-heading max-w-[8ch] text-5xl font-normal leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            <Reveal>{tx("Begin")}</Reveal>
            <Reveal delay={0.1}>{tx("together.")}</Reveal>
          </h2>
          <h3 className="mt-7 max-w-sm text-balance text-xl font-medium leading-snug sm:text-2xl">
            {tx(subheading)}
          </h3>
          <p className="mt-4 max-w-sm text-base leading-7 text-primary/74">{tx(body)}</p>
          <ul className="mt-6 grid max-w-sm gap-2.5 text-sm leading-6">
            {promises.map((item) => (
              <li className="flex items-start gap-2.5" key={item}>
                <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                {tx(item)}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <div className="border border-primary/12 bg-[#fdf8f0] p-5 sm:p-8 lg:p-10">
            <OnboardingFlow compact defaultServices={defaultServices} />
          </div>
        </div>
      </div>
    </section>
  );
}
