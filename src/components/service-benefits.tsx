import Image from "next/image";

import { Reveal, RevealFade } from "@/components/reveal";
import { getI18n } from "@/i18n/request";
import type { ServicePageData } from "@/lib/service-pages";

export async function ServiceBenefits({ page }: { page: ServicePageData }) {
  const { tx } = await getI18n();

  return (
    <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <h2 className="max-w-xl text-balance text-4xl font-normal leading-tight sm:text-5xl">
            <Reveal>{tx(page.benefitsTitle)}</Reveal>
          </h2>
          <RevealFade className="mt-6 max-w-md text-base leading-7 text-primary-foreground/66" delay={0.1}>
            {tx(page.benefitsDescription)}
          </RevealFade>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {page.benefits.map((benefit, index) => (
            <RevealFade delay={index * 0.06} key={benefit.title}>
              <article>
                {benefit.image ? (
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-2xl)] bg-[#e9eaec]">
                    <Image
                      alt={tx(benefit.imageAlt ?? "")}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                      src={benefit.image}
                    />
                  </div>
                ) : null}
                <h3 className="mt-5 text-xl font-semibold leading-tight">{tx(benefit.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/62">{tx(benefit.description)}</p>
              </article>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  );
}
