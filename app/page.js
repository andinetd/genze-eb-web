import Link from "next/link";
import updateData from "../update.json";

const featureCards = [
  {
    title: "Awash and CBE SMS parsing",
    description:
      "The app reads supported bank messages, extracts transaction details, and turns them into structured spending records.",
  },
  {
    title: "A dashboard people can read in seconds",
    description:
      "Balances, category breakdowns, recent transactions, and charts are all built to answer the main question fast: where did the money go?",
  },
  {
    title: "Budgets, insights, and receipts",
    description:
      "Users can review transactions, open receipt details, compare trends, and keep an eye on overspend without leaving the app.",
  },
  {
    title: "Local storage with Drift",
    description:
      "Imported data stays on the device, which keeps the workflow fast and gives users a clearer privacy story.",
  },
  {
    title: "Google Sign-In and profile settings",
    description:
      "Identity, settings, and account management are already in the product flow, so the experience feels complete instead of experimental.",
  },
  {
    title: "Auto-update ready",
    description:
      "The site and the app share the same release metadata, so new Android builds can ship with a simple update path.",
  },
];

const steps = [
  {
    number: "01",
    title: "Install the Android build",
    text: "Send visitors straight to the APK and make the first conversion action obvious.",
  },
  {
    number: "02",
    title: "Grant SMS access and import",
    text: "Faranka scans supported messages, detects banks, and structures transactions automatically.",
  },
  {
    number: "03",
    title: "Review categories and trends",
    text: "Users land in a dashboard that highlights balances, spending patterns, and problem categories.",
  },
  {
    number: "04",
    title: "Keep the app current",
    text: "Release metadata from this site powers OTA checks, so the product stays easy to update.",
  },
];

const productSignals = [
  {
    value: "Awash + CBE",
    label: "Supported banks",
  },
  {
    value: "Local-first",
    label: "Data stays on device",
  },
  {
    value: "Auto-resume",
    label: "Offline parsing catches up",
  },
  {
    value: "OTA ready",
    label: "One JSON release source",
  },
];

const proofPoints = [
  {
    title: "Recent activity",
    value: "Transactions, receipts, and parsed SMS in one view",
  },
  {
    title: "Decision support",
    value: "Category trends, radar comparisons, and anomalies for spending",
  },
  {
    title: "Retention loop",
    value: "Sign in, import, analyze, update, repeat",
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
      <div className="backdrop-orbit backdrop-orbit-a" aria-hidden="true" />
      <div className="backdrop-orbit backdrop-orbit-b" aria-hidden="true" />

      <header className="top-rail reveal">
        <div>
          <p className="eyebrow">Faranka marketing site</p>
          <strong className="brand-mark">SMS finance intelligence for Android</strong>
        </div>
        <div className="top-rail-actions">
          <Link className="top-link" href="#proof">
            Product proof
          </Link>
          <Link className="top-link top-link-primary" href="#release">
            Latest release
          </Link>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy reveal">
          <p className="eyebrow">Built from the Flutter app</p>
          <h1>Turn bank SMS into a product people trust.</h1>
          <p className="hero-text">
            Faranka is the Android app that imports Awash and CBE messages,
            converts them into transactions, and gives users a clear view of
            balances, categories, receipts, budgets, and trends without making
            the workflow feel heavy.
          </p>
          <div className="cta-row">
            <a
              className={`cta cta-primary ${!updateData.apk_url ? "pending" : "active"}`}
              href={apkHref}
            >
              {apkLabel}
            </a>
            <Link className="cta cta-secondary" href="#release">
              See how the app works
            </Link>
          </div>
          <div className="hero-meta">
            <span>Version {updateData.version_name}</span>
            <span>Build {updateData.version_code}</span>
            <span>Google Sign-In, profile settings, and auto-update support</span>
          </div>

          <div className="signal-grid">
            {productSignals.map((signal) => (
              <article className="signal-card" key={signal.label}>
                <strong>{signal.value}</strong>
                <span>{signal.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal delay-1" aria-hidden="true">
          <div className="device-shell">
            <div className="device-glow device-glow-a" />
            <div className="device-glow device-glow-b" />
            <div className="device-screen">
              <div className="screen-topbar">
                <span className="screen-dot" />
                <span className="screen-label">Faranka dashboard</span>
                <span className="screen-chip">Live</span>
              </div>

              <div className="screen-hero">
                <div>
                  <span className="screen-kicker">Weekly spending</span>
                  <strong className="screen-value">ETB 18,450</strong>
                  <p className="screen-copy">Parsed from bank SMS and grouped by category.</p>
                </div>
                <div className="screen-pill-stack">
                  <span>Awash</span>
                  <span>CBE</span>
                  <span>Receipts linked</span>
                </div>
              </div>

              <div className="screen-chart">
                <span style={{ height: "44%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "36%" }} />
                <span style={{ height: "71%" }} />
                <span style={{ height: "63%" }} />
                <span style={{ height: "86%" }} />
              </div>

              <div className="screen-metrics">
                <article>
                  <span>SMS imported</span>
                  <strong>1,248</strong>
                </article>
                <article>
                  <span>Categories</span>
                  <strong>12</strong>
                </article>
                <article>
                  <span>Alerts resolved</span>
                  <strong>98%</strong>
                </article>
              </div>

              <div className="screen-feed">
                <article>
                  <span>Budget watch</span>
                  <strong>Groceries at 72%</strong>
                </article>
                <article>
                  <span>Offline scan</span>
                  <strong>Auto-resume enabled</strong>
                </article>
                <article>
                  <span>Release</span>
                  <strong>Version {updateData.version_name}</strong>
                </article>
              </div>
            </div>
          </div>

          <aside className="floating-note floating-note-a">
            <span>Trust signal</span>
            <strong>Local storage with Drift keeps the app on-device.</strong>
          </aside>

          <aside className="floating-note floating-note-b">
            <span>Release path</span>
            <strong>The site and app share one release JSON source.</strong>
          </aside>
        </div>
      </section>

      <section className="proof-strip reveal delay-2" id="proof">
        {proofPoints.map((point) => (
          <article className="proof-card" key={point.title}>
            <span>{point.title}</span>
            <strong>{point.value}</strong>
          </article>
        ))}
      </section>

      <section className="content-section reveal delay-2">
        <div className="section-heading">
          <p className="eyebrow">Why the app matters</p>
          <h2>A conversion page should sell the actual workflow, not just the idea.</h2>
          <p>
            This redesign mirrors the product more closely: supported bank SMS in,
            structured transactions out, then a dashboard that makes the data
            actionable through categories, receipts, budgets, and insights.
          </p>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <div className="feature-tag" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section flow-section reveal delay-3" id="flow">
        <div className="section-heading narrow">
          <p className="eyebrow">User flow</p>
          <h2>From message import to insight, the path stays short.</h2>
          <p>
            The app is strongest when the onboarding story is obvious: install,
            import, review, and keep up with releases.
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
        <div className="release-copy">
          <p className="eyebrow">Current release</p>
          <h2>Keep the APK and the website in sync.</h2>
          <p>
            The download button and release details are driven by the same JSON
            file the app uses for OTA checks, so the marketing page stays aligned
            with what is actually shipping.
          </p>

          <div className="release-summary">
            <article>
              <span>Version</span>
              <strong>{updateData.version_name}</strong>
            </article>
            <article>
              <span>Build</span>
              <strong>{updateData.version_code}</strong>
            </article>
            <article>
              <span>Delivery</span>
              <strong>{updateData.apk_url ? "APK available" : "APK pending"}</strong>
            </article>
          </div>
        </div>

        <div className="release-card">
          <div className={`release-banner ${updateData.apk_url ? "active" : "pending"}`}>
            <span>APK download</span>
            {updateData.apk_url ? (
              <a href={updateData.apk_url} className="apk-link">
                {updateData.apk_url}
              </a>
            ) : (
              <strong className="pending-text">Not configured yet</strong>
            )}
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