import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteName } from "../../lib/site-config";

export const metadata = {
  title: `FAQ — ${siteName}`,
  description:
    "Answers about how Faranka reads your bank SMS, parses transactions, categorizes spending, and keeps your data private on-device.",
  alternates: {
    canonical: "/faq",
  },
};

const FAQS = [
  {
    q: "What is Faranka?",
    a: "Faranka is a spending tracker for Ethiopian bank users. It reads SMS messages from Awash Bank, CBE, Bank of Abyssinia, and Telebirr, parses them into structured transactions, and categorizes your spending.",
  },
  {
    q: "How does SMS parsing work?",
    a: "Faranka scans your SMS inbox for messages from supported banks. It extracts the amount, counterparty name, date, and balance from each message and stores them as structured transactions.",
  },
  {
    q: "Why does the app need SMS permission?",
    a: "SMS permission is required to read bank transaction messages directly from your inbox. All parsing happens entirely on your device — your SMS data is never sent anywhere.",
  },
  {
    q: "Will my messages import automatically?",
    a: "Yes. After granting SMS permission, Faranka imports bank messages automatically: a background task scans for new messages on a schedule, new bank messages are processed in real time as they arrive, and you can pull down on the Home page to trigger an immediate scan. Skipping the first-time import is fine — the background tasks will still catch your messages.",
  },
  {
    q: "How do categories work?",
    a: "Each transaction is automatically categorized based on the reason field found from the receipt parsing. You can change a transaction's category by tapping it and selecting a different one, or split a transaction across multiple categories.",
  },
  {
    q: "Can I create budgets?",
    a: "Yes. Open the Budget tab in the bottom navigation to view your budgets or create a new one. Budgets can track spending across specific categories on a monthly or weekly basis.",
  },
  {
    q: "What are receipt enrichments?",
    a: "For transactions that contain a receipt link, Faranka can automatically fetch and display the PDF or HTML receipt in the background after the transaction is imported.",
  },
  {
    q: "How does the biometric lock work?",
    a: "Enable it in Settings under Security. When turned on, you'll need to authenticate with your fingerprint or face to open the app after it has been in the background.",
  },
  {
    q: "How do I back up my data?",
    a: "Sign in with Google, then use the Data Sync section in Settings to back up to the cloud. Your transactions, categories, budgets, and SMS data are uploaded to Firebase Firestore, and you can restore from any previous backup.",
  },
  {
    q: "How do I export my transactions?",
    a: "Use the Export section in Settings and choose JSON or CSV. The file is shared through your device's share sheet.",
  },
  {
    q: "How do I clear all data?",
    a: "Use Wipe All Data in Settings. This deletes all transactions, budgets, and parsed data from the local database. Cloud backups are not affected.",
  },
  {
    q: "Is my data private?",
    a: "Yes. All SMS data is processed locally on your device. If you choose to use cloud backup, your data is stored in Firebase Firestore under your account and is not shared with anyone. See the Privacy Policy for details.",
  },
  {
    q: "Where may the app be inaccurate?",
    a: "Faranka relies on automated SMS parsing, which has inherent limitations: bank SMS format changes may cause misread amounts, counterparty names, or fees; automatic categorization may not always match your intent; receipt enrichment depends on bank server availability and internet access; cash-out and mobile-money transactions may not always be detected; and duplicate detection uses fuzzy matching that may occasionally miss duplicates. You can always correct inaccuracies by editing the transaction or its category directly.",
  },
];

export default function FaqPage() {
  return (
    <main>
      <Header />
      <section className="legal">
        <div className="container">
          <div className="legal-header">
            <p className="legal-kicker">Help & FAQ</p>
            <h1 className="hero-headline" style={{ fontSize: 40 }}>
              Frequently asked questions
            </h1>
            <p className="legal-updated">
              Answers about how Faranka reads your SMS and keeps your money data organized.
            </p>
          </div>

          <div className="legal-body">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <h2>{faq.q}</h2>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
