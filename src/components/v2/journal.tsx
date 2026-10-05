import Image from "next/image";

import { articles } from "@/components/v2/content";
import { FadeUp, WordsReveal } from "@/components/v2/motion";

export function Journal() {
  const [featured, ...rest] = articles;

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36" id="journal">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-3xl text-balance text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[1.02] text-primary-500">
          <WordsReveal segments={["Tax news from", { em: "Greece." }]} />
        </h2>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <FadeUp className="lg:col-span-7">
            <article className="group">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] bg-neutral-400">
                <Image
                  alt=""
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  src={featured.image}
                />
              </div>
              <ArticleMeta read={featured.read} type={featured.type} />
              <h3 className="mt-3 max-w-xl text-balance text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-[1.1] text-primary-500">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-primary-400">{featured.text}</p>
            </article>
          </FadeUp>

          <div className="flex flex-col gap-10 lg:col-span-5 lg:gap-8">
            {rest.map((article, index) => (
              <FadeUp delay={0.1 + index * 0.1} key={article.title}>
                <article className="group grid gap-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center lg:grid-cols-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-400">
                    <Image
                      alt=""
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 100vw"
                      src={article.image}
                    />
                  </div>
                  <div>
                    <ArticleMeta read={article.read} type={article.type} />
                    <h3 className="mt-2 text-balance text-xl font-normal leading-snug tracking-[-0.025em] text-primary-500">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-primary-400">{article.text}</p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleMeta({ type, read }: { type: string; read: string }) {
  return (
    <p className="mt-5 flex items-center gap-3 text-sm text-primary-400">
      <span className="rounded-full bg-secondary-50 px-3 py-1 font-medium text-secondary-800">{type}</span>
      {read}
    </p>
  );
}
