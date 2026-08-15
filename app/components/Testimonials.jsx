import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "I stopped guessing where my money went. Faranka reads my bank SMS and every transaction just lands in a category — budgets, pace, all of it. It finally makes sense.",
    name: "Selam Tesfaye",
    role: "Addis Ababa",
  },
  {
    quote:
      "The SMS parsing is uncanny. It caught a charge I'd forgotten about and flagged my budget early enough that I could course-correct before month-end.",
    name: "Dawit Bekele",
    role: "Awash Bank customer",
  },
  {
    quote:
      "I tried spreadsheets and gave up. Faranka is the only thing that actually works here — it keeps everything on my phone, and the weekly summary is gold.",
    name: "Hanna Alemu",
    role: "Telebirr user",
  },
];

function Stars() {
  return (
    <span className="testimonial-stars" aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="band band-alt">
      <div className="container center band-head">
        <Reveal as="h2" className="section-title">
          What our users say
        </Reveal>
        <Reveal as="p" className="section-sub">
          Thousands rely on Faranka to track every birr — automatically.
        </Reveal>
      </div>
      <div className="container">
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal className="testimonial-card" key={t.name} delay={i * 0.06}>
              <Stars />
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
