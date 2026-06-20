import { ArmShowcase } from "./ArmShowcase";
import { ProjectHighlights } from "./ProjectHighlights";
import { WhyRoboParadigm } from "./WhyRoboParadigm";
import { Newsletters } from "./Newsletters";

export default function Home() {
  return (
    <>
      {/* ── 6-Act cinematic scroll experience (700vh) ── */}
      <ArmShowcase />

      {/* ── Below the showcase: standard sections ── */}
      <ProjectHighlights />
      <WhyRoboParadigm />
      <Newsletters />
    </>
  );
}
