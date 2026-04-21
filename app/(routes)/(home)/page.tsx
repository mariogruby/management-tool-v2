import { HomeNavbar } from "@/components/Shared/HomeNavbar/HomeNavbar";
import { HomeFooter } from "@/components/Shared/HomeFooter/HomeFooter";
import { Hero } from "./components/Hero/Hero";
import { MarqueeSection } from "./components/MarqueeSection/MarqueeSection";
import { BentoSection } from "./components/BentoSection/BentoSection";
import { StatsSection } from "./components/StatsSection/StatsSection";
import { CTASection } from "./components/CTASection/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar />
      <main className="flex flex-col flex-1">
        <Hero />
        <MarqueeSection />
        <BentoSection />
        <StatsSection />
        <CTASection />
      </main>
      <HomeFooter />
    </div>
  );
}
