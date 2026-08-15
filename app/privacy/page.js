import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteName, supportEmail } from "../../lib/site-config";

export const metadata = {
  title: `Privacy Policy — ${siteName}`,
  description:
    "How Faranka accesses, processes, and stores your bank SMS data. On-device by default, no analytics or advertising SDKs.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <section className="legal">
        <div className="container">
          <div className="legal-header">
            <p className="legal-kicker">Privacy Policy</p>
            <h1 className="hero-headline" style={{ fontSize: 40 }}>
              Your financial data stays yours
            </h1>
            <p className="legal-updated">Last updated August 15, 2026</p>
          </div>

          <div className="legal-body">
            <h2>What Faranka reads</h2>
            <p>
              Faranka is built to read one thing: transaction SMS from your bank or mobile-money
              provider — currently Awash Bank, Commercial Bank of Ethiopia (CBE), Bank of
              Abyssinia (BoA), and Telebirr. When you grant SMS permission, Faranka scans incoming
              and existing messages to identify ones sent by these senders. Messages from any
              other contact or sender are ignored and never read, stored, or transmitted.
            </p>

            <h2>Where your data lives</h2>
            <p>
              By default, Faranka is <strong>local-first</strong>: parsed transactions, categories,
              and budgets are stored only in an encrypted local database on your device. Nothing
              is uploaded automatically, and Faranka ships with no analytics or advertising SDKs of
              any kind — we don&rsquo;t know how you use the app, and we don&rsquo;t sell or share
              your data with anyone.
            </p>
            <p>
              Faranka Pro offers an <em>optional</em>, user-initiated encrypted cloud backup so you
              can restore your history on a new device. This only happens if you turn it on. You
              can delete your cloud backup at any time from Settings, 
            </p>

            <h2>Permissions we request</h2>
            <ul>
              <li>
                <strong>SMS access</strong> — to detect and parse transaction messages from
                supported banks.
              </li>
              <li>
                <strong>Notification access</strong> —to give daily ,weekly, monthly and more notifications.
              </li> 
              <li>
                <strong>Biometric/lock screen</strong> (optional) — to lock the app with your
                fingerprint or face, available on Pro.
              </li>
            </ul>
            <p>
              Faranka does not request contacts, location, camera, microphone, or any permission
              unrelated to reading and organizing your transaction messages.
            </p>

            <h2>Data you control</h2>
            <p>
              You can export your data as JSON or CSV at any time (Pro), delete individual
              transactions, or clear all local data by uninstalling the app — since data is stored
              on-device by default, uninstalling removes it. If you&rsquo;ve enabled cloud backup,
              contact us to have that copy deleted as well.
            </p>

            <h2>Payments</h2>
            <p>
              Faranka Pro subscriptions are currently arranged manually via email and paid directly
              through Telebirr, CBE, or Awash Bank transfer. Faranka does not process, store, or
              have access to your card or account credentials during this process.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              If this policy changes, we&rsquo;ll update the date above and, for material changes,
              note it on this page. Continued use of Faranka after an update means you accept the
              revised policy.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about your data or this policy? Reach us on{" "}
              <a href="https://t.me/fa_ranka" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
