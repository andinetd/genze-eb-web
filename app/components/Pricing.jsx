import DownloadButton from "./DownloadButton";
import Reveal from "./Reveal";

const FREE_FEATURES = [
  "Parsing for Awash · CBE · BoA · Telebirr",
  "Categories, budgets & insights",
  "50 receipts kept",
  "90 days of history",
  "100% on-device, no ads or trackers",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Unlimited receipts & full history",
  "Encrypted cloud backup & restore",
  "Export your data (JSON / CSV)",
  "Pay via Telebirr · CBE · Awash",
];

export default function Pricing() {
  return (
    <section className="band band-pricing" id="pricing">
      <div className="container center band-head">
        <Reveal as="h2" className="section-title">
          Pricing
        </Reveal>
      </div>

      <div className="container">
        <div className="pricing-grid">
          <Reveal className="plan-card">
            <span className="mono plan-tag">Free</span>
            <p className="plan-price">
              0<span className="plan-unit"> ETB/mo</span>
            </p>
            <ul className="plan-options">
              {FREE_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <DownloadButton className="btn-ghost btn-block" >
              Download free
            </DownloadButton>
          </Reveal>

          <Reveal className="plan-card plan-card-pro" delay={0.08}>
            <span className="mono plan-tag">Pro</span>
            <p className="plan-price">
              99<span className="plan-unit"> ETB/mo</span>
              <span className="plan-alt">or 990 ETB/yr</span>
            </p>
            <p className="plan-desc">Full history, unlimited receipts, and cloud backup.</p>
            <ul className="plan-options">
              {PRO_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <DownloadButton className="btn-primary btn-block" >
              Go Pro
            </DownloadButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
