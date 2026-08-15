import { getReleaseData } from "../lib/release-data";
import { getJsonLd } from "../lib/site-config";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import VideoDriver from "./components/VideoDriver";

export default async function Home() {
  const releaseData = await getReleaseData();
  const version = releaseData?.version_name || "1.0.0";

  return (
    <main>
      <StructuredData data={getJsonLd(version)} />
      <Header />
      <Hero version={version} />
      <SocialProof />
      <Features />
      <Stats />
      <Testimonials />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <FinalCTA version={version} />
      <Footer />
      <VideoDriver />
    </main>
  );
}
