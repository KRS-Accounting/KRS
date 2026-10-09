import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, MessageSquareText, ShieldCheck } from "lucide-react";

import { OnboardingFlow } from "@/components/onboarding-flow";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/request";

export function generateMetadata() {
  return pageMetadata({
    title: "Book a free consultation | KRS",
    description: "Tell us a little about your business and request a consultation with a KRS advisor.",
  });
}

const advisorImages = [
  "/images/krs-expert-tax-advisor.webp",
  "/images/krs-expert-payroll-advisor.webp",
  "/images/krs-expert-accounting-advisor.webp",
] as const;

export default async function OnboardingPage() {
  const { tx, href } = await getI18n();

  return (
    <main className="min-h-[100dvh] bg-[#FDF8F0] text-foreground">
      <header className="border-b border-primary/12 bg-[#FDF8F0]">
        <div className="flex h-18 w-full items-center justify-between px-4 sm:px-6 lg:px-12">
          <Link aria-label={tx("KRS home")} href={href("/")}>
            <Image
              alt="KRS"
              className="h-14 w-auto"
              height={416}
              priority
              src="/logos/Full%20logo%20Dark.png"
              unoptimized
              width={1008}
            />
          </Link>
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-primary transition hover:bg-primary/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:px-4"
            href={href("/")}
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            {tx("Back to KRS")}
          </Link>
        </div>
      </header>

      <div className="grid min-h-[calc(100dvh-4.5rem)] lg:grid-cols-[0.4fr_0.6fr]">
        <aside className="bg-primary px-4 py-8 text-primary-foreground sm:px-8 lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-14 xl:px-16">
          <div className="max-w-xl">
            <p className="mono-label text-secondary">{tx("A useful first conversation")}</p>
            <h1 className="mt-5 max-w-lg text-balance text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl">
              {tx("Start with the right advisor.")}
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-primary-foreground/68 lg:text-lg lg:leading-8">
              {tx("Share the essentials and we will match your business with the KRS specialist best placed to help.")}
            </p>
          </div>

          <div className="mt-8 hidden max-w-md lg:block">
            <div className="flex -space-x-2">
              {advisorImages.map((src, index) => (
                <div className="relative size-12 overflow-hidden rounded-full border-2 border-primary" key={src}>
                  <Image
                    alt={tx(["KRS tax advisor", "KRS payroll specialist", "KRS accounting advisor"][index])}
                    className="object-cover"
                    fill
                    sizes="48px"
                    src={src}
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-primary-foreground">{tx("Reviewed by a real KRS advisor")}</p>
            <p className="mt-1 text-sm leading-6 text-primary-foreground/58">
              {tx("Your answers help us prepare before we speak.")}
            </p>

            <div className="mt-9 grid gap-5 border-t border-primary-foreground/16 pt-7">
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <Clock3 className="mt-0.5 size-5 text-secondary" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold">{tx("Around two minutes")}</p>
                  <p className="mt-1 text-sm leading-6 text-primary-foreground/58">{tx("Only the details that improve your call.")}</p>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <MessageSquareText className="mt-0.5 size-5 text-secondary" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold">{tx("A focused conversation")}</p>
                  <p className="mt-1 text-sm leading-6 text-primary-foreground/58">{tx("Accounting, tax, payroll, or growth advice.")}</p>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <ShieldCheck className="mt-0.5 size-5 text-secondary" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold">{tx("Private and non-binding")}</p>
                  <p className="mt-1 text-sm leading-6 text-primary-foreground/58">{tx("No documents or commitment required.")}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="px-4 py-10 sm:px-8 sm:py-14 lg:flex lg:items-center lg:px-12 xl:px-20">
          <div className="mx-auto w-full max-w-2xl">
            <OnboardingFlow />
          </div>
        </section>
      </div>
    </main>
  );
}
