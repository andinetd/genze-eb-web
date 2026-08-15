import Reveal from "./Reveal";
import { PhoneIcon, LockIcon, ChartIcon } from "./icons";

const FEATURES = [
  {
    icon: PhoneIcon,
    title: "Automatic",
    text: "Reads your SMS and downloads receipts without you lifting a finger.",
  },
  {
    icon: LockIcon,
    title: "Private",
    text: "Local-first on your device, with optional encrypted backup and biometric lock for Pro.",
  },
  {
    icon: ChartIcon,
    title: "Smart",
    text: "Categorizes spending, tracks budgets, and shows where your money actually goes.",
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">
          Tracking your money, <span className="no-wrap">on autopilot</span>
        </h2>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <Reveal className="feature-card" key={f.title} delay={i * 0.06}>
              <span className="feature-icon">
                <f.icon />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}