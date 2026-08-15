import DownloadButton from "./DownloadButton";
import Reveal from "./Reveal";
import PhoneMockup from "./PhoneMockup";

export default function Hero({ version }) {
  return (
    <section className="hero" id="site-hero">
      <div className="container">
        <div className="hero-card">
          <Reveal className="hero-copy">
            <h1 className="hero-headline">
              Track Every Frank.<br />
              Automatically.
            </h1>
            <p className="hero-sub">
              Faranka reads your bank SMS, downloads your receipts, and automatically
              categorizes every transaction based on the reason field.
            </p>
            <div className="hero-cta">
              <DownloadButton className="btn btn-ink">Download for Android</DownloadButton>
              <span className="hero-version mono">v{version}</span>
            </div>
          </Reveal>

          <Reveal className="hero-media" delay={0.1}>
            <PhoneMockup priority />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
