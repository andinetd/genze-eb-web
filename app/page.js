import Link from "next/link";
import updateData from "../update.json";

const featureCards = [
  {
    title: "SMS parsing that stays quiet until it matters",
    description:
      "Faranka reads bank messages, extracts transaction details, and keeps the noise out of your dashboard.",
  },
  {
    title: "Categories that make spending readable",
    description:
      "See where money goes with clean category grouping, trend summaries, and a chart-first layout.",
  },
  {
    title: "Local-first by design",
    description:
      "Keep personal financial data on-device with a workflow built for speed, privacy, and simple recovery.",
  },
  {
    title: "Built for the next release cycle",
    description:
      "Update delivery is driven by the same JSON file your app already checks on startup.",
  },
];

const steps = [
  {
    number: "01",
    title: "Install the APK",
    text: "Ship the Android build and point the site CTA at the current release.",
  },
  {
    number: "02",
    title: "Import SMS messages",
    text: "Faranka scans supported bank messages and transforms them into structured transactions.",
  },
  {
    number: "03",
    title: "Review insights fast",
    text: "Spend less time sorting records and more time acting on the categories that matter.",
  },
];

const releaseNotes = updateData.release_notes
  .split(/\.\s+/)
  .map((note) => note.trim())
  .filter(Boolean);

const apkHref = updateData.apk_url?.trim() || "#release";
const apkLabel = updateData.apk_url?.trim() ? "Download APK" : "APK link pending";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="page-noise" aria-hidden="true" />
      <section className="hero-section">
        <div className="hero-copy reveal">
          <p className="eyebrow">Faranka for Genzeb</p>
          <h1>Turn bank SMS into a clean product story.</h1>
          <p className="hero-text">
            Faranka is the Android companion that parses transaction messages,
            surfaces spending patterns, and keeps your financial data easy to
            understand at a glance.
          </p>
          <div className="cta-row">
            <a className={`cta cta-primary ${!updateData.apk_url ? "pending" : "active"}`} href={apkHref}>
              {apkLabel}
            </a>
            <Link className="cta cta-secondary" href="#release">
              See the latest release
            </Link>
          </div>
          <div className="hero-meta">
            <span>Version {updateData.version_name}</span>
            <span>Build {updateData.version_code}</span>
            <span>{releaseNotes[0] || "Release notes configured in update.json"}</span>
          </div>
        </div>

        <div className="hero-visual reveal delay-1" aria-hidden="true">
          <div className="visual-orb visual-orb-a" />
          <div className="visual-orb visual-orb-b" />
          <div className="dashboard-card dashboard-card-main">
            <div className="card-topline">
              <span className="card-chip">Live snapshot</span>
              <span className="card-subtle">Today</span>
            </div>
            <div className="metric-stack">
              <p className="metric-label">Spending this week</p>
              <strong className="metric-value">ETB 18,450</strong>
              <span className="metric-trend">+8% from last week</span>
            </div>
            <div className="chart-bars" role="presentation">
              <span style={{ height: "36%" }} />
              <span style={{ height: "52%" }} />
              <span style={{ height: "41%" }} />
              <span style={{ height: "68%" }} />
              <span style={{ height: "57%" }} />
              <span style={{ height: "82%" }} />
            </div>
            <div className="mini-grid">
              <article>
                <span>Parsed SMS</span>
                <strong>1,248</strong>
              </article>
              <article>
                <span>Active categories</span>
                <strong>12</strong>
              </article>
              <article>
                <span>Alerts resolved</span>
                <strong>98%</strong>
              </article>
            </div>
          </div>
          <div className="dashboard-card dashboard-card-float">
            <span className="card-chip">Auto-update</span>
            <strong>Version {updateData.version_name}</strong>
            <p>{updateData.release_notes}</p>
          </div>
        </div>
      </section>

      <section className="stats-section reveal delay-2">
        <article>
          <span>Fast setup</span>
          <strong>Single APK flow</strong>
        </article>
        <article>
          <span>Designed for trust</span>
          <strong>Local-first storage</strong>
        </article>
        <article>
          <span>Clarity over clutter</span>
          <strong>Charts, categories, summaries</strong>
        </article>
      </section>

      <section className="content-section reveal delay-2">
        <div className="section-heading">
          <p className="eyebrow">Product value</p>
          <h2>Everything the site needs to sell the app in one page.</h2>
          <p>
            The design is intentionally focused: one sharp promise, a clean
            release path, and enough proof to make the app feel real before the
            user installs it.
          </p>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split-section reveal delay-3">
        <div className="section-heading narrow">
          <p className="eyebrow">How it works</p>
          <h2>Simple enough for users, structured enough for updates.</h2>
          <p>
            This keeps the marketing story aligned with the actual app flow:
            install, parse, review, and update.
          </p>
        </div>

        <div className="steps-list">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="release-section reveal delay-3" id="release">
        <div>
          <p className="eyebrow">Current release</p>
          <h2>Ready for the next build whenever you are.</h2>
          <p>
            The CTA on this page reads directly from the same release data the
            app uses for OTA checks.
          </p>
        </div>

        <div className="release-card">
          <div className="release-row">
            <span>Version</span>
            <strong>{updateData.version_name}</strong>
          </div>
          <div className="release-row">
            <span>Build</span>
            <strong>{updateData.version_code}</strong>
          </div>
          <div className={`release-row apk-row ${updateData.apk_url ? "active" : "pending"}`}>
            <div>
              <span>APK Download</span>
              {updateData.apk_url ? (
                <a href={updateData.apk_url} className="apk-link">
                  {updateData.apk_url}
                </a>
              ) : (
                <strong className="pending-text">Not configured yet</strong>
              )}
            </div>
          </div>
          <div className="release-notes">
            <span>Release notes</span>
            <ul>
              {releaseNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}