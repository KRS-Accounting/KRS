import { press } from "@/components/v2/content";
import { FadeUp } from "@/components/v2/motion";

export function Proof() {
  return (
    <section aria-label="Press" className="px-5 pb-10 pt-14 sm:px-8 lg:px-12 lg:pt-20">
      <FadeUp className="mx-auto flex max-w-[1400px] flex-col gap-6 border-b border-primary-500/8 pb-10 md:flex-row md:items-center md:justify-between">
        <p className="text-[15px] text-primary-400">As featured in</p>
        <ul className="grid grid-cols-2 gap-x-10 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-14">
          {press.map((item) => (
            <li key={item.label}>
              <a
                className="text-xl font-medium tracking-[-0.03em] text-primary-500/40 outline-none transition-colors duration-300 hover:text-primary-500 focus-visible:text-primary-500 sm:text-2xl"
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
