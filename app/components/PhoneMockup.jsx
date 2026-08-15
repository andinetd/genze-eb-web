import Image from "next/image";

export default function PhoneMockup({
  src = "/home-light.webp",
  alt = "Faranka home screen",
  className = "",
  width = 842,
  height = 1867,
  priority = false,
}) {
  return (
    <div
      className={`phone-frame${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={alt}
    >
      <span className="phone-side phone-side-left" aria-hidden="true">
        <span className="phone-btn phone-btn-volup" />
        <span className="phone-btn phone-btn-voldown" />
      </span>
      <span className="phone-side phone-side-right" aria-hidden="true">
        <span className="phone-btn phone-btn-power" />
      </span>
      <div className="phone-screen">
        <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes="320px" />
      </div>
    </div>
  );
}