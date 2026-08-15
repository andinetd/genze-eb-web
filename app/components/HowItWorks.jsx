import Reveal from "./Reveal";

const STEPS = [
  { num: "01", title: "Install", text: "Download the APK and install it on your Android device." },
  {
    num: "02",
    title: "Grant access",
    text: "Allow Faranka to read receipts and SMS — once.",
  },
  {
    num: "03",
    title: "See your money",
    text: "Transactions are categorized automatically. No manual entry.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="flow">
      <div className="container">
        <h2 className="section-title">Up and running in three steps</h2>
        <div className="steps">
          {STEPS.map((s) => (
            <Reveal className="step" key={s.num}>
              <span className="step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}