import PhoneMockup from "./PhoneMockup";

const MOCKUP_PROPS = {
  base: {
    src: "/videos/clip-home.mp4",
    poster: "/home-light.png",
    label: "Faranka home screen — balances, budgets, and spending pace",
  },
  import: {
    src: "/videos/clip-import.mp4",
    poster: "/transactions-light.png",
    label: "Faranka importing and structuring transactions",
  },
  categories: {
    src: "/videos/clip-categories.mp4",
    poster: "/home-light.png",
    label: "Faranka categorized spending and budgets",
  },
  insights: {
    src: "/videos/clip-insights.mp4",
    poster: "/insights-light.jpg",
    label: "Faranka insights — trends, weekly summaries, and budgets",
  },
  lock: {
    src: "/videos/clip-lock.mp4",
    poster: "/insights-dark.jpg",
    label: "Faranka biometric app lock",
  },
};

export function Mockup({ variant }) {
  const props = MOCKUP_PROPS[variant] || MOCKUP_PROPS.base;
  return (
    <div className="mockup">
      <div className="mockup-body">
        <div className="phone">
          <div className="phone-frame">
            <PhoneMockup {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatPills() {
  return (
    <>
      <div className="float-pill float-pill-tl" aria-hidden="true">
        <span className="mono">Balance</span>
        <strong>
          12,480 <span className="fp-unit">etb</span>
        </strong>
        <span className="fp-sub">updated live</span>
      </div>
      <div className="float-pill float-pill-tr" aria-hidden="true">
        <span className="mono">Budget pace</span>
        <strong>62%</strong>
        <span className="fp-sub">this week</span>
      </div>
      <div className="float-pill float-pill-bl" aria-hidden="true">
        <span className="mono">Categories</span>
        <strong>15</strong>
        <span className="fp-sub">auto assigned</span>
      </div>
    </>
  );
}
