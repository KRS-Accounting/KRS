import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { getI18n } from "@/i18n/request";
import { cn } from "@/lib/utils";

const fieldNotes = [
  {
    type: "News",
    read: "08 min",
    title: "VAT and myDATA changes Greek SMEs should track.",
    text: "What recently changed for invoices, filings, and monthly close, and what to do before the next deadline.",
  },
  {
    type: "Guide",
    read: "11 min",
    title: "How to keep myDATA current through the year.",
    text: "A practical way to collect invoices, review each month, and avoid a scramble at year-end.",
  },
  {
    type: "Insight",
    read: "17 min",
    title: "The tax question founders ask too late.",
    text: "How company structure, payroll, and reporting choices affect the business before you need outside capital.",
  },
];

export async function FieldNotesSection({
  showTopRule = true,
}: {
  showTopRule?: boolean;
} = {}) {
  const { tx } = await getI18n();

  return (
    <section className="bg-card px-4 pb-24 sm:px-6 lg:px-12" id="field-notes">
      <div
        className={cn(
          "mx-auto max-w-[1400px] pt-16",
          showTopRule && "border-t border-primary/16",
        )}
      >
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-secondary">{tx("From the KRS blog")}</p>
            <h2 className="type-h3 mt-5 text-balance">
              <Reveal>{tx("Tax news from Greece.")}</Reveal>
            </h2>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3" href="#">
            {tx("Read all articles")}
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {fieldNotes.map((note, index) => (
            <article className="group cursor-pointer" key={note.title}>
              <div
                className={cn(
                  "relative mb-5 aspect-[4/5] overflow-hidden bg-primary",
                  index === 1 && "bg-secondary",
                  index === 2 && "bg-tertiary",
                )}
              >
                {index === 0 ? (
                  <Image
                    alt=""
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    src="/images/krs-athens-operations.png"
                  />
                ) : (
                  <div className="relative flex h-full flex-col justify-between p-7 text-primary-foreground">
                    <p className="relative mono-label text-primary-foreground/58">{tx("note")} / 0{index + 1}</p>
                    <p className="font-heading relative text-balance text-5xl font-normal leading-[0.92]">
                      {tx(index === 1 ? "The month closes before year-end." : "Advisory begins with evidence.")}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>{tx(note.type)}</span>
                <span>/</span>
                <span>{tx(note.read)}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight">{tx(note.title)}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{tx(note.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
