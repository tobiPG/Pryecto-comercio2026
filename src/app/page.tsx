import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { GlowBackground } from "@/components/ui/spotlight-card";
import { Collection } from "@/components/collection";
import { About } from "@/components/about";
import { Values } from "@/components/values";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <PixelHero />
      <div className="relative">
        <GlowBackground />
        <Collection />
        <About />
        <Values />
        <Contact />
      </div>
    </>
  );
}
