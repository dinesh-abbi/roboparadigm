import { Hero } from "./Hero";
import { ShortIntro } from "./ShortIntro";
import { WhatWeDo } from "./WhatWeDo";
import { Capabilities } from "./Capabilities";
import { ProjectHighlights } from "./ProjectHighlights";
import { WhyRoboParadigm } from "./WhyRoboParadigm";

export default function Home() {
  return (
    <>
      <Hero />
      <ShortIntro />
      <WhatWeDo />
      <Capabilities />
      <ProjectHighlights />
      <WhyRoboParadigm />
    </>
  );
}
