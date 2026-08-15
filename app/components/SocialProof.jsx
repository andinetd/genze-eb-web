import Reveal from "./Reveal";

const BANK_LOGOS = [
  { src: "/awash-logo.png", webp: "/awash-logo.webp", alt: "Awash Bank", className: "bank-logo-word", width: "456", height: "93" },
  { src: "/cbe-word.png", webp: "/cbe-word.webp", alt: "Commercial Bank of Ethiopia", className: "bank-logo-word bank-logo-square", width: "500", height: "500" },
  { src: "/boa-word.png", webp: "/boa-word.webp", alt: "Bank of Abyssinia", className: "bank-logo-word bank-logo-lg", width: "854", height: "292" },
  { src: "/telebirr-word.png", webp: "/telebirr-word.webp", alt: "Telebirr", className: "bank-logo-word bank-logo-square", width: "683", height: "683" },
];

const STATS = [
  { value: "5,000+", label: "members", star: false },
  { value: "4.0", label: "on Google Play", star: true },
];

export default function SocialProof() {
  return (
    <Reveal className="container">
      <div className="social-proof">
        <div className="social-proof-stats">
          {STATS.map((s) => (
            <span className="social-proof-stat" key={s.label}>
              <strong>
                {s.value}
                {s.star && <span className="sp-star"> ★</span>}
              </strong>
              {s.label}
            </span>
          ))}
        </div>
        <div className="social-proof-banks">
          {BANK_LOGOS.map((logo) => (
            <picture key={logo.src}>
              <source srcSet={logo.webp} type="image/webp" />
              <img
                className={logo.className}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
              />
            </picture>
          ))}
        </div>
        <span className="mono social-proof-label">Supported banks</span>
      </div>
    </Reveal>
  );
}
