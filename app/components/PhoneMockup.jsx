export default function PhoneMockup({ src, poster, label }) {
  return (
    <video
      className="phone-screen"
      data-video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
