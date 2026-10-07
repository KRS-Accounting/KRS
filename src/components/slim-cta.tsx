import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getI18n } from "@/i18n/request";

export async function SlimCta({
  heading = "Ready for an accounting file that stays ready?",
  ctaLabel = "Schedule an initial free consultation",
}: {
  heading?: string;
  ctaLabel?: string;
} = {}) {
  const { tx, href } = await getI18n();

  return (
    <section className="border-y border-primary/12 bg-card px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden size-11 items-center justify-center rounded-full bg-primary text-primary-foreground sm:flex">
            <Sparkles className="size-5 text-secondary" />
          </span>
          <p className="font-heading text-balance text-2xl font-medium leading-tight">{tx(heading)}</p>
        </div>
        <Button asChild className="h-11 w-fit rounded-full bg-primary px-5">
          <a href={href("/onboarding")}>
            {tx(ctaLabel)}
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}
