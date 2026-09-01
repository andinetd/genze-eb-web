import { getReleaseData } from "../lib/release-data";
import { getJsonLd } from "../lib/site-config";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Trust from "./components/Trust";
import Features from "./components/Features";
import Screens from "./components/Screens";
import HowItWorks from "./components/HowItWorks";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";

export default async function Home() {
  const releaseData = await getReleaseData();
  const version = releaseData?.version_name || "1.0.0";

  return (
    <main>
      <StructuredData data={getJsonLd(version)} />
      <Header />
      <Hero version={version} />
      <Trust />
      <Features />
      <Screens />
      <HowItWorks />
      <FinalCTA version={version} />
      <Footer />
    </main>
  );
}