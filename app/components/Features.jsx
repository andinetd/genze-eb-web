import FeatureRow from "./FeatureRow";

const ROWS = [
  {
    eyebrow: "Import",
    title: "It starts with a bank SMS.",
    lede:
      "Bank messages become structured records — amount, date, who you paid, and a category — parsed automatically from each supported message.",
    bullets: [
      "Structured automatically — amount, date, counterparty, and category",
      "Receipts kept — tap any transaction for full details and the original SMS",
      "Supports 4 services — Awash, CBE, BoA, and Telebirr, with more on the way",
    ],
    media: "import",
  },
  {
    eyebrow: "Categorize",
    title: "Know where your money goes.",
    lede: "Categorized by who you paid. Merge, rename, or create your own system.",
    bullets: [
      "Auto-categorization matched against categories it has seen before",
      "Bend it to your system — merge, rename, and create categories",
      "Real-time budgets per category, so the pace is always visible",
    ],
    media: "categories",
    reversed: true,
  },
  {
    eyebrow: "Insights",
    title: "It spots trouble early.",
    lede: "Real-time budgets, spending pace, and weekly trends flag overspending early.",
    bullets: [
      "Spending pace — a burn-rate gauge for every category in real time",
      "Weekly summaries — a digest of what changed, every week",
      "Overspend alerts before it’s too late",
      "See the full picture — heatmaps, radar comparisons, and top merchants",
    ],
    media: "insights",
  },
  {
    eyebrow: "Privacy",
    title: "Private by default.",
    lede:
      "Parsed and kept on-device. No analytics, no ads. Optional encrypted Pro backup.",
    bullets: [
      "On-device storage with Drift — nothing leaves unless you enable backup",
      "No trackers, no ads, no third-party SDKs",
      "Your call — optional biometric lock, plus encrypted cloud backup on Pro",
    ],
    media: "lock",
    reversed: true,
  },
];

export default function Features() {
  return (
    <>
      {ROWS.map((row) => (
        <section className={row.reversed ? "band band-alt" : "band"} key={row.eyebrow}>
          <div className="container">
            <FeatureRow {...row} />
          </div>
        </section>
      ))}
    </>
  );
}
