import Image from "next/image";
import Reveal from "./Reveal";

const BANKS = [
  { name: "Awash Bank", logo: "/awash-logo.webp", w: 128, h: 26 },
  { name: "CBE", logo: "/cbe-logo.webp", w: 22, h: 22 },
  { name: "Bank of Abyssinia", logo: "/boa-word.webp", w: 100, h: 26 },
  { name: "Telebirr", logo: "/telebirr-logo.webp", w: 22, h: 22 },
];

export default function Trust() {
  return (
    <section className="trust">
      <div className="container">
        <Reveal className="trust-split">
          <ul className="trust-badges" aria-label="Supported banks">
            {BANKS.map((b) => (
              <li key={b.name} className="trust-pill">
                <Image src={b.logo} alt={b.name} width={b.w} height={b.h} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="container">
        <Reveal as="p" className="trust-verify">
          Local-first by default.
        </Reveal>
      </div>
    </section>
  );
}