import Reveal from "./Reveal";
import DownloadButton from "./DownloadButton";

const FREE_FEATURES = [
  "50 receipts stored",
  "90 days of history",
  "Up to 3 banks",
  "No ads, no trackers",
];

const PRO_FEATURES = [
  "Unlimited banks & receipts",
  "Full history, forever",
  "Pay via Telebirr · CBE · Awash",
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="pricing-grid">
          <Reveal className="pricing-card">
            <span className="pricing-tier">Free</span>
            <p className="pricing-price">
              ETB 0<span className="pricing-period"> / forever</span>
            </p>
            <ul className="pricing-list">
              {FREE_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <DownloadButton className="btn btn-ink">Download for Android</DownloadButton>
          </Reveal>

          <Reveal className="pricing-card pricing-card-pro" delay={0.06}>
            <span className="pricing-tier">Pro</span>
            <p className="pricing-price">
              ETB 99<span className="pricing-period"> / month</span>
            </p>
            <p className="pricing-alt">or ETB 990 / year</p>
            <ul className="pricing-list">
              {PRO_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a className="btn btn-white" href="mailto:support@faranka.com?subject=Faranka%20Pro">
              Get Pro
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}