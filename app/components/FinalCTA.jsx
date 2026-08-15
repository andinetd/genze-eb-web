import DownloadButton from "./DownloadButton";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

export default function FinalCTA({ version }) {
  return (
    <section className="band band-final band-grain">
      <div className="container center">
        <Reveal as="h2" className="section-title">
          Get Faranka
        </Reveal>
        <Reveal className="cta-row">
          <DownloadButton className="btn-primary btn-lg">
            Download APK
            <span className="btn-meta mono">v{version}</span>
            <ArrowRight />
          </DownloadButton>
        </Reveal>
        <Reveal as="p" className="hero-meta mono">
          Free to start · On-device · Android
        </Reveal>
      </div>
    </section>
  );
}
