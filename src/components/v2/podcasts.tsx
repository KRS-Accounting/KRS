"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

import { videos } from "@/components/v2/content";
import { FadeUp, TextLink, WordsReveal } from "@/components/v2/motion";

export function Podcasts() {
  return (
    <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36" id="podcasts">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-balance text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[1.02] text-primary-500">
            <WordsReveal segments={["The founder on", { em: "building" }, "a company."]} />
          </h2>
          <TextLink href="https://www.youtube.com/@KrsGr">More episodes on YouTube</TextLink>
        </div>

        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:mt-20 lg:gap-6">
          {videos.map((video, index) => (
            <FadeUp className="w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-auto" delay={index * 0.08} key={video.id}>
              <VideoCard {...video} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ id, title, text }: (typeof videos)[number]) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-primary-500 md:aspect-[4/5]">
        {playing ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full"
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1`}
            title={title}
          />
        ) : (
          <button
            aria-label={`Play: ${title}`}
            className="absolute inset-0 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-secondary-400"
            onClick={() => setPlaying(true)}
            type="button"
          >
            <Image
              alt=""
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              fill
              sizes="(min-width: 768px) 30vw, 78vw"
              src={`https://i.ytimg.com/vi/${id}/oardefault.jpg`}
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(1_25_54/0)_45%,rgb(1_25_54/0.75)_100%)]" />
            <span className="absolute bottom-6 left-6 flex size-14 items-center justify-center rounded-full bg-neutral-50 text-primary-500 shadow-[0_20px_40px_-20px_rgb(1_25_54/0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Play className="ml-0.5 size-5 fill-current" strokeWidth={1.5} />
            </span>
          </button>
        )}
      </div>
      <h3 className="mt-5 text-xl font-normal leading-snug tracking-[-0.025em] text-primary-500">{title}</h3>
      <p className="mt-1.5 text-[15px] text-primary-400">{text}</p>
    </article>
  );
}
