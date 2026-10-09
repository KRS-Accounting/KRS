import { PlatformMap, type WorkSide } from "@/components/platform-map";
import { platformServices } from "@/components/platform-map/data";
import { Reveal, RevealFade } from "@/components/reveal";
import { getI18n } from "@/i18n/request";

export async function AgentsSection({ id = "agents", workSide = "panel" }: { id?: string; workSide?: WorkSide } = {}) {
  const { tx } = await getI18n();

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-24 text-primary-foreground sm:px-6 lg:px-12" id={id}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_36%_55%,rgba(11,57,112,0.9),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(174,136,47,0.35),transparent)]"
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-14 xl:gap-16">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
          <div>
            <p className="mono-label text-secondary">{tx("How KRS technology works")}</p>
            <h2 className="type-h3 mt-5 max-w-4xl text-balance">
              <Reveal>{tx("People decide. Technology keeps the work moving.")}</Reveal>
            </h2>
          </div>
          <RevealFade className="max-w-xl text-lg leading-8 text-primary-foreground/68" delay={0.1}>
            {tx(
              "KRS technology organises information, flags what is missing, routes requests, and tracks deadlines. KRS professionals stay in control and provide the advice.",
            )}
          </RevealFade>
        </div>

        <PlatformMap services={platformServices} workSide={workSide} />
      </div>
    </section>
  );
}
