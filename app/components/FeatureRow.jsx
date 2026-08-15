import Reveal from "./Reveal";
import { Mockup } from "./Mockup";
import { ArrowRight } from "./icons";

export default function FeatureRow({ eyebrow, title, lede, bullets, media, reversed, cta }) {
  const ctaHref = "#pricing";
  return (
    <div className={`feature-row${reversed ? " reversed" : ""}`}>
      <Reveal className="feature-row-text">
        <span className="feature-row-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {lede && <p className="feature-row-lede">{lede}</p>}
        {bullets?.length > 0 && (
          <ul className="feature-row-list">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        <a className="feature-row-link" href={ctaHref}>
          {cta || "Learn more"}
          <ArrowRight />
        </a>
      </Reveal>
      <Reveal className="feature-row-media">
        <Mockup variant={media} />
      </Reveal>
    </div>
  );
}
