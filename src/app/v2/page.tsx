import { AgentsSection } from "@/components/agents-section";
import { Careers } from "@/components/v2/careers";
import { Closing } from "@/components/v2/closing";
import { Faq } from "@/components/v2/faq";
import { Footer } from "@/components/v2/footer";
import { Header } from "@/components/v2/header";
import { Hero } from "@/components/v2/hero";
import { Journal } from "@/components/v2/journal";
import { Manifesto } from "@/components/v2/manifesto";
import { PlatformChapter } from "@/components/v2/platform-chapter";
import { Podcasts } from "@/components/v2/podcasts";
import { Process } from "@/components/v2/process";
import { Proof } from "@/components/v2/proof";
import { Services } from "@/components/v2/services";
import { Stats } from "@/components/v2/stats";
import { Testimonials } from "@/components/v2/testimonials";
import { Why } from "@/components/v2/why";

export default function V2Home() {
  return (
    <main className="overflow-x-clip">
      <Header />
      <Hero />
      <Proof />
      <Manifesto />
      <Stats />
      <Services />
      <PlatformChapter>
        <AgentsSection workSide="fan" />
      </PlatformChapter>
      <Process />
      <Why />
      <Testimonials />
      <Journal />
      <Careers />
      <Faq />
      <Podcasts />
      <Closing />
      <Footer />
    </main>
  );
}
