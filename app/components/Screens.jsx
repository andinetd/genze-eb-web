import Reveal from "./Reveal";
import PhoneMockup from "./PhoneMockup";

const SCREENS = [
  {
    src: "/home-dark.webp",
    alt: "Faranka home screen showing balance, categories and recent transactions",
    label: "Home",
    text: "Balance, category breakdown and budgets at a glance.",
    width: 842,
    height: 1771,
  },
  {
    src: "/transactions-light.webp",
    alt: "Faranka transactions list",
    label: "Transactions",
    text: "Every bank SMS becomes a clean, searchable transaction.",
    width: 921,
    height: 1707,
  },
  {
    src: "/insights-dark.webp",
    alt: "Faranka insights screen",
    label: "Insights",
    text: "Heatmaps, weekly summaries and spending anomalies.",
    width: 1080,
    height: 2400,
  },
];

export default function Screens() {
  return (
    <section className="screens">
      <div className="container">
        <Reveal>
          <p className="screens-kicker">Real screens</p>
          <h2 className="section-title">What you&rsquo;ll see on your phone</h2>
        </Reveal>
        <div className="screens-grid">
          {SCREENS.map((s, i) => (
            <Reveal className="screens-item" key={s.label} delay={i * 0.06}>
              <PhoneMockup
                src={s.src}
                alt={s.alt}
                className="phone-frame-sm"
                width={s.width}
                height={s.height}
              />
              <h3>{s.label}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}