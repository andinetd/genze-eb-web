import Reveal from "./Reveal";
import Counter from "./Counter";

const STATS = [
  { target: 4, label: "banks supported" },
  { target: 90, label: "days free history" },
  { target: 50, label: "free receipts" },
];

export default function Stats() {
  return (
    <section className="band band-stats">
      <div className="container center">
        <Reveal as="h2" className="section-title">
          At a glance.
        </Reveal>
        <Reveal className="stats-grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <p className="stat-num">
                <Counter target={s.target} />
              </p>
              <span className="mono stat-label">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
