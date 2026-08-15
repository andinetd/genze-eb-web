import DownloadButton from "./DownloadButton";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";
import { FloatPills, Mockup } from "./Mockup";

export default function Hero({ version }) {
  return (
    <section className="hero" id="site-hero">
      <div className="hero-grid" aria-hidden="true" />

      <div className="container center hero-inner">
        <Reveal as="a" className="announce" href="/download" download="faranka.apk">
          <span className="dot" aria-hidden="true" />
          New · v{version} for Android
        </Reveal>
        <Reveal as="h1" className="hero-title" delay={0.05}>
          Track Every Frank
          <br />
          <span className="accent">Automatically.</span>
        </Reveal>
        <Reveal as="p" className="hero-sub" delay={0.1}>
          Every mobile transaction asks you to enter a reason. Faranka reads your bank SMS and
          turns those reasons into automatic budgets, categories, and insights — all on your phone.
        </Reveal>
        <Reveal className="cta-row" delay={0.15}>
          <DownloadButton className="btn-primary btn-lg">
            Download APK
            <ArrowRight />
          </DownloadButton>
          <a className="btn-secondary btn-lg" href="#features">
            See how it works
          </a>
        </Reveal>
        <Reveal as="p" className="hero-meta mono" delay={0.2}>
          Join 5,000+ members · 4.0★ on Google Play
        </Reveal>
      </div>

      <Reveal className="container mockup-zone" delay={0.25}>
        <Mockup variant="base" />
        <FloatPills />
      </Reveal>
    </section>
  );
}
