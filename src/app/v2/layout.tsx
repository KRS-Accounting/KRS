import type { Metadata } from "next";
import { EB_Garamond, Geologica } from "next/font/google";

import { SmoothScroll } from "@/components/v2/smooth-scroll";

import "./v2.css";

const geologica = Geologica({
  display: "swap",
  subsets: ["latin", "greek"],
  variable: "--font-geologica",
});

const garamond = EB_Garamond({
  display: "swap",
  style: ["italic"],
  subsets: ["latin", "greek"],
  variable: "--font-garamond",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "KRS | Greek accounting, rebuilt on AI",
  description:
    "Licensed accountants and tax advisors for Greek businesses, with AI doing the matching, chasing and filing prep.",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geologica.variable} ${garamond.variable} v2-root`}>
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
