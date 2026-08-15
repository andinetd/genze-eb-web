import Reveal from "./Reveal";

const STEPS = [
  { num: "01", title: "Install", text: "Download the APK and install it." },
  {
    num: "02",
    title: "Import",
    text: "Grant SMS access once. Faranka scans supported messages and structures them.",
  },
  {
    num: "03",
    title: "Review",
    text: "Review balances, patterns, and problem categories.",
  },
];

export default function HowItWorks() {
  return (
    <section className="band band-alt" id="flow">
      <div className="container">
        <div className="center band-head">
          <Reveal as="h2" className="section-title">
            How it works
          </Reveal>
        </div>
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <Reveal className="step" key={step.num} delay={i * 0.06}>
              <span className="mono step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
