import DownloadButton from "./DownloadButton";
import Reveal from "./Reveal";

export default function FinalCTA({ version }) {
  return (
    <section className="download-section">
      <div className="container download-inner">
        <Reveal as="h2">Ready to take control?</Reveal>
        <Reveal className="download-cta" delay={0.08}>
          <DownloadButton className="btn btn-white">Download for Android</DownloadButton>
        </Reveal>
        <Reveal as="p" className="download-meta" delay={0.14}>
          Free to download · Android 8.0+
        </Reveal>
      </div>
    </section>
  );
}