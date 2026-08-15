import Reveal from "./Reveal";

const FAQS = [
  {
    q: "What is Faranka?",
    a: "An Android app that turns bank SMS and receipts into clear spending records — budgets, categories, and trends, on your device.",
  },
  {
    q: "Which banks are supported?",
    a: "Awash, CBE, Bank of Abyssinia, and Telebirr, with more coming.",
  },
  {
    q: "Is my data stored in the cloud?",
    a: "No by default — parsed and kept on-device. No analytics or ads. Optional encrypted Pro backup.",
  },
  {
    q: "How do I get started?",
    a: "Download the APK, sign in with Google, and grant SMS permission once.",
  },
  {
    q: "Can I edit categories?",
    a: "Yes — rename, merge, or create categories anytime.",
  },
];

export default function FAQ() {
  return (
    <section className="band" id="faq">
      <div className="container center band-head-narrow">
        <Reveal as="h2" className="section-title">
          Frequently asked questions
        </Reveal>
      </div>

      <Reveal className="container faq-list">
        {FAQS.map((faq) => (
          <div className="faq-row" key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
